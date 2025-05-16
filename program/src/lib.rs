use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program::{invoke, invoke_signed},
    program_error::ProgramError,
    pubkey::Pubkey,
    rent::Rent,
    system_instruction,
    sysvar::Sysvar,
};
use spl_associated_token_account::instruction::create_associated_token_account;
use spl_token::instruction::{mint_to, transfer};

pub mod error;
pub mod instruction;
pub mod processor;
pub mod state;

use crate::error::SurveyError;
use crate::instruction::SurveyInstruction;
use crate::processor::Processor;

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = SurveyInstruction::unpack(instruction_data)?;
    
    match instruction {
        SurveyInstruction::InitializeSurvey { 
            survey_id, 
            sol_reward_amount,
            token_reward_amount,
            max_participants,
        } => {
            msg!("Instruction: InitializeSurvey");
            Processor::process_initialize_survey(
                accounts,
                program_id,
                survey_id,
                sol_reward_amount,
                token_reward_amount,
                max_participants,
            )
        }
        SurveyInstruction::ClaimReward { survey_id } => {
            msg!("Instruction: ClaimReward");
            Processor::process_claim_reward(accounts, program_id, survey_id)
        }
        SurveyInstruction::DistributeNft { survey_id } => {
            msg!("Instruction: DistributeNft");
            Processor::process_distribute_nft(accounts, program_id, survey_id)
        }
        SurveyInstruction::CloseSurvey { survey_id } => {
            msg!("Instruction: CloseSurvey");
            Processor::process_close_survey(accounts, program_id, survey_id)
        }
    }
}