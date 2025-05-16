use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    instruction::{AccountMeta, Instruction},
    program_error::ProgramError,
    pubkey::Pubkey,
    system_program,
    sysvar,
};
use spl_token;

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]
pub enum SurveyInstruction {
    /// Initialize a new survey campaign
    /// 
    /// Accounts expected:
    /// 0. `[signer]` The account initializing the survey (owner)
    /// 1. `[writable]` The survey account to be created
    /// 2. `[]` The token mint for rewards
    /// 3. `[writable]` The token account to hold reward tokens
    /// 4. `[]` System program
    /// 5. `[]` Rent sysvar
    InitializeSurvey {
        survey_id: String,
        sol_reward_amount: u64,
        token_reward_amount: u64,
        max_participants: u32,
    },
    
    /// Claim rewards for completing a survey
    /// 
    /// Accounts expected:
    /// 0. `[signer]` The participant claiming rewards
    /// 1. `[writable]` The survey account
    /// 2. `[writable]` The participant account
    /// 3. `[writable]` The participant's token account
    /// 4. `[writable]` The survey's token account
    /// 5. `[]` Token program
    /// 6. `[]` System program
    ClaimReward {
        survey_id: String,
    },
    
    /// Distribute NFT to a participant
    /// 
    /// Accounts expected:
    /// 0. `[signer]` The survey owner
    /// 1. `[writable]` The survey account
    /// 2. `[writable]` The participant account
    /// 3. `[writable]` The participant's NFT token account
    /// 4. `[writable]` The NFT mint account
    /// 5. `[]` Token program
    /// 6. `[]` System program
    /// 7. `[]` Rent sysvar
    DistributeNft {
        survey_id: String,
    },
    
    /// Close a survey campaign
    /// 
    /// Accounts expected:
    /// 0. `[signer]` The survey owner
    /// 1. `[writable]` The survey account
    /// 2. `[writable]` The owner's SOL account (to receive rent)
    CloseSurvey {
        survey_id: String,
    },
}

impl SurveyInstruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (tag, rest) = input.split_first().ok_or(ProgramError::InvalidInstructionData)?;
        
        match tag {
            0 => {
                let payload = InitializeSurveyPayload::try_from_slice(rest)?;
                Ok(SurveyInstruction::InitializeSurvey {
                    survey_id: payload.survey_id,
                    sol_reward_amount: payload.sol_reward_amount,
                    token_reward_amount: payload.token_reward_amount,
                    max_participants: payload.max_participants,
                })
            }
            1 => {
                let payload = ClaimRewardPayload::try_from_slice(rest)?;
                Ok(SurveyInstruction::ClaimReward {
                    survey_id: payload.survey_id,
                })
            }
            2 => {
                let payload = DistributeNftPayload::try_from_slice(rest)?;
                Ok(SurveyInstruction::DistributeNft {
                    survey_id: payload.survey_id,
                })
            }
            3 => {
                let payload = CloseSurveyPayload::try_from_slice(rest)?;
                Ok(SurveyInstruction::CloseSurvey {
                    survey_id: payload.survey_id,
                })
            }
            _ => Err(ProgramError::InvalidInstructionData),
        }
    }
}

#[derive(BorshSerialize, BorshDeserialize)]
struct InitializeSurveyPayload {
    survey_id: String,
    sol_reward_amount: u64,
    token_reward_amount: u64,
    max_participants: u32,
}

#[derive(BorshSerialize, BorshDeserialize)]
struct ClaimRewardPayload {
    survey_id: String,
}

#[derive(BorshSerialize, BorshDeserialize)]
struct DistributeNftPayload {
    survey_id: String,
}

#[derive(BorshSerialize, BorshDeserialize)]
struct CloseSurveyPayload {
    survey_id: String,
}