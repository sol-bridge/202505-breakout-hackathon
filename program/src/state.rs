use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    clock::UnixTimestamp,
    program_error::ProgramError,
    pubkey::Pubkey,
};

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]
pub struct SurveyAccount {
    pub is_initialized: bool,
    pub survey_id: String,
    pub owner: Pubkey,
    pub sol_reward_amount: u64,
    pub token_reward_amount: u64,
    pub token_mint: Pubkey,
    pub max_participants: u32,
    pub current_participants: u32,
    pub created_at: UnixTimestamp,
    pub is_active: bool,
    pub nft_collection: Option<Pubkey>,
}

impl SurveyAccount {
    pub const LEN: usize = 1 + // is_initialized
        4 + 64 + // survey_id (max 64 chars)
        32 + // owner
        8 + // sol_reward_amount
        8 + // token_reward_amount
        32 + // token_mint
        4 + // max_participants
        4 + // current_participants
        8 + // created_at
        1 + // is_active
        1 + 32; // nft_collection (Option)
    
    pub fn new(
        survey_id: String,
        owner: Pubkey,
        sol_reward_amount: u64,
        token_reward_amount: u64,
        token_mint: Pubkey,
        max_participants: u32,
        created_at: UnixTimestamp,
    ) -> Self {
        Self {
            is_initialized: true,
            survey_id,
            owner,
            sol_reward_amount,
            token_reward_amount,
            token_mint,
            max_participants,
            current_participants: 0,
            created_at,
            is_active: true,
            nft_collection: None,
        }
    }
}

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]
pub struct ParticipantAccount {
    pub is_initialized: bool,
    pub survey_id: String,
    pub participant: Pubkey,
    pub has_claimed_sol: bool,
    pub has_claimed_token: bool,
    pub has_received_nft: bool,
    pub claimed_at: Option<UnixTimestamp>,
}

impl ParticipantAccount {
    pub const LEN: usize = 1 + // is_initialized
        4 + 64 + // survey_id (max 64 chars)
        32 + // participant
        1 + // has_claimed_sol
        1 + // has_claimed_token
        1 + // has_received_nft
        1 + 8; // claimed_at (Option)
    
    pub fn new(survey_id: String, participant: Pubkey) -> Self {
        Self {
            is_initialized: true,
            survey_id,
            participant,
            has_claimed_sol: false,
            has_claimed_token: false,
            has_received_nft: false,
            claimed_at: None,
        }
    }
}