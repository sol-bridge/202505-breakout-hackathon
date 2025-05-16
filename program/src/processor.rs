use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    clock::Clock,
    entrypoint::ProgramResult,
    msg,
    program::{invoke, invoke_signed},
    program_error::ProgramError,
    pubkey::Pubkey,
    rent::Rent,
    system_instruction,
    sysvar::Sysvar,
};
use spl_token::instruction::{mint_to, transfer};

use crate::{
    error::SurveyError,
    state::{ParticipantAccount, SurveyAccount},
};

pub struct Processor;

impl Processor {
    pub fn process_initialize_survey(
        accounts: &[AccountInfo],
        program_id: &Pubkey,
        survey_id: String,
        sol_reward_amount: u64,
        token_reward_amount: u64,
        max_participants: u32,
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        
        let owner = next_account_info(account_info_iter)?;
        let survey_account = next_account_info(account_info_iter)?;
        let token_mint = next_account_info(account_info_iter)?;
        let token_pool = next_account_info(account_info_iter)?;
        let system_program = next_account_info(account_info_iter)?;
        let rent_sysvar = next_account_info(account_info_iter)?;
        
        if !owner.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }
        
        let rent = &Rent::from_account_info(rent_sysvar)?;
        
        if !rent.is_exempt(survey_account.lamports(), SurveyAccount::LEN) {
            return Err(SurveyError::InsufficientFunds.into());
        }
        
        let clock = Clock::get()?;
        
        let survey = SurveyAccount::new(
            survey_id.clone(),
            *owner.key,
            sol_reward_amount,
            token_reward_amount,
            *token_mint.key,
            max_participants,
            clock.unix_timestamp,
        );
        
        survey.serialize(&mut &mut survey_account.data.borrow_mut()[..])?;
        
        msg!("Survey initialized: {}", survey_id);
        Ok(())
    }
    
    pub fn process_claim_reward(
        accounts: &[AccountInfo],
        program_id: &Pubkey,
        survey_id: String,
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        
        let participant = next_account_info(account_info_iter)?;
        let survey_account = next_account_info(account_info_iter)?;
        let participant_account = next_account_info(account_info_iter)?;
        let participant_token_account = next_account_info(account_info_iter)?;
        let survey_token_account = next_account_info(account_info_iter)?;
        let token_program = next_account_info(account_info_iter)?;
        let system_program = next_account_info(account_info_iter)?;
        
        if !participant.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }
        
        let mut survey = SurveyAccount::try_from_slice(&survey_account.data.borrow())?;
        
        if !survey.is_initialized {
            return Err(SurveyError::NotInitialized.into());
        }
        
        if survey.survey_id != survey_id {
            return Err(SurveyError::SurveyNotFound.into());
        }
        
        if !survey.is_active {
            return Err(SurveyError::SurveyClosed.into());
        }
        
        // Check if participant has already claimed
        let mut participant_data = ParticipantAccount::try_from_slice(&participant_account.data.borrow())
            .unwrap_or(ParticipantAccount::new(survey_id.clone(), *participant.key));
        
        if participant_data.has_claimed_sol || participant_data.has_claimed_token {
            return Err(SurveyError::AlreadyClaimed.into());
        }
        
        // Transfer SOL reward
        if survey.sol_reward_amount > 0 {
            **survey_account.lamports.borrow_mut() -= survey.sol_reward_amount;
            **participant.lamports.borrow_mut() += survey.sol_reward_amount;
            participant_data.has_claimed_sol = true;
        }
        
        // Transfer token reward
        if survey.token_reward_amount > 0 {
            let transfer_ix = transfer(
                &spl_token::id(),
                survey_token_account.key,
                participant_token_account.key,
                survey_account.key,
                &[],
                survey.token_reward_amount,
            )?;
            
            invoke(
                &transfer_ix,
                &[
                    survey_token_account.clone(),
                    participant_token_account.clone(),
                    survey_account.clone(),
                    token_program.clone(),
                ],
            )?;
            
            participant_data.has_claimed_token = true;
        }
        
        // Update participant account
        let clock = Clock::get()?;
        participant_data.claimed_at = Some(clock.unix_timestamp);
        participant_data.serialize(&mut &mut participant_account.data.borrow_mut()[..])?;
        
        // Update survey participant count
        survey.current_participants += 1;
        survey.serialize(&mut &mut survey_account.data.borrow_mut()[..])?;
        
        msg!("Rewards claimed for survey: {}", survey_id);
        Ok(())
    }
    
    pub fn process_distribute_nft(
        accounts: &[AccountInfo],
        program_id: &Pubkey,
        survey_id: String,
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        
        let owner = next_account_info(account_info_iter)?;
        let survey_account = next_account_info(account_info_iter)?;
        let participant_account = next_account_info(account_info_iter)?;
        let participant_nft_account = next_account_info(account_info_iter)?;
        let nft_mint = next_account_info(account_info_iter)?;
        let token_program = next_account_info(account_info_iter)?;
        let system_program = next_account_info(account_info_iter)?;
        let rent_sysvar = next_account_info(account_info_iter)?;
        
        if !owner.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }
        
        let survey = SurveyAccount::try_from_slice(&survey_account.data.borrow())?;
        
        if survey.owner != *owner.key {
            return Err(SurveyError::InvalidOwner.into());
        }
        
        let mut participant_data = ParticipantAccount::try_from_slice(&participant_account.data.borrow())?;
        
        if participant_data.has_received_nft {
            return Err(SurveyError::AlreadyClaimed.into());
        }
        
        // Mint NFT to participant
        let mint_to_ix = mint_to(
            &spl_token::id(),
            nft_mint.key,
            participant_nft_account.key,
            owner.key,
            &[],
            1,
        )?;
        
        invoke(
            &mint_to_ix,
            &[
                nft_mint.clone(),
                participant_nft_account.clone(),
                owner.clone(),
                token_program.clone(),
            ],
        )?;
        
        participant_data.has_received_nft = true;
        participant_data.serialize(&mut &mut participant_account.data.borrow_mut()[..])?;
        
        msg!("NFT distributed for survey: {}", survey_id);
        Ok(())
    }
    
    pub fn process_close_survey(
        accounts: &[AccountInfo],
        program_id: &Pubkey,
        survey_id: String,
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        
        let owner = next_account_info(account_info_iter)?;
        let survey_account = next_account_info(account_info_iter)?;
        let owner_sol_account = next_account_info(account_info_iter)?;
        
        if !owner.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }
        
        let mut survey = SurveyAccount::try_from_slice(&survey_account.data.borrow())?;
        
        if survey.owner != *owner.key {
            return Err(SurveyError::InvalidOwner.into());
        }
        
        if survey.survey_id != survey_id {
            return Err(SurveyError::SurveyNotFound.into());
        }
        
        survey.is_active = false;
        survey.serialize(&mut &mut survey_account.data.borrow_mut()[..])?;
        
        // Return remaining SOL to owner
        let remaining_lamports = survey_account.lamports();
        **survey_account.lamports.borrow_mut() = 0;
        **owner_sol_account.lamports.borrow_mut() += remaining_lamports;
        
        msg!("Survey closed: {}", survey_id);
        Ok(())
    }
}