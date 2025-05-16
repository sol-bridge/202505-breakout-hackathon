use solana_program::program_error::ProgramError;
use thiserror::Error;

#[derive(Error, Debug, Copy, Clone)]
pub enum SurveyError {
    #[error("Invalid Instruction")]
    InvalidInstruction,
    
    #[error("Account not initialized")]
    NotInitialized,
    
    #[error("Survey already exists")]
    SurveyAlreadyExists,
    
    #[error("Survey not found")]
    SurveyNotFound,
    
    #[error("Already claimed reward")]
    AlreadyClaimed,
    
    #[error("Survey is full")]
    SurveyFull,
    
    #[error("Survey is closed")]
    SurveyClosed,
    
    #[error("Invalid owner")]
    InvalidOwner,
    
    #[error("Insufficient funds")]
    InsufficientFunds,
    
    #[error("Invalid reward amount")]
    InvalidRewardAmount,
    
    #[error("Overflow")]
    Overflow,
    
    #[error("Invalid metadata")]
    InvalidMetadata,
}

impl From<SurveyError> for ProgramError {
    fn from(e: SurveyError) -> Self {
        ProgramError::Custom(e as u32)
    }
}