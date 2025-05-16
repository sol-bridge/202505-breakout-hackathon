use solana_program_test::*;
use solana_sdk::{
    account::Account,
    instruction::{AccountMeta, Instruction},
    program_pack::Pack,
    pubkey::Pubkey,
    rent::Rent,
    signature::Keypair,
    signer::Signer,
    system_instruction,
    transaction::Transaction,
};
use spl_token::state::Mint;
use borsh::BorshSerialize;

use solbridge_rewards::{
    instruction::SurveyInstruction,
    state::{SurveyAccount, ParticipantAccount},
};

#[tokio::test]
async fn test_initialize_survey() {
    let program_id = Pubkey::new_unique();
    let mut program_test = ProgramTest::new(
        "solbridge_rewards",
        program_id,
        processor!(solbridge_rewards::process_instruction),
    );
    
    // Create test accounts
    let owner = Keypair::new();
    let survey_account = Keypair::new();
    let token_mint = Keypair::new();
    let token_pool = Keypair::new();
    
    // Fund owner account
    program_test.add_account(
        owner.pubkey(),
        Account {
            lamports: 10_000_000_000,
            ..Default::default()
        },
    );
    
    // Start test
    let (mut banks_client, payer, recent_blockhash) = program_test.start().await;
    
    // Create initialize survey instruction
    let survey_id = "test_survey_001".to_string();
    let sol_reward_amount = 1_000_000; // 0.001 SOL
    let token_reward_amount = 100_000_000; // 100 tokens
    let max_participants = 1000;
    
    let init_ix = Instruction {
        program_id,
        accounts: vec![
            AccountMeta::new(owner.pubkey(), true),
            AccountMeta::new(survey_account.pubkey(), false),
            AccountMeta::new_readonly(token_mint.pubkey(), false),
            AccountMeta::new(token_pool.pubkey(), false),
            AccountMeta::new_readonly(solana_sdk::system_program::id(), false),
            AccountMeta::new_readonly(solana_sdk::sysvar::rent::id(), false),
        ],
        data: SurveyInstruction::InitializeSurvey {
            survey_id: survey_id.clone(),
            sol_reward_amount,
            token_reward_amount,
            max_participants,
        }.try_to_vec().unwrap(),
    };
    
    // Create and send transaction
    let mut transaction = Transaction::new_with_payer(
        &[init_ix],
        Some(&payer.pubkey()),
    );
    transaction.sign(&[&payer, &owner], recent_blockhash);
    
    banks_client.process_transaction(transaction).await.unwrap();
    
    // Verify survey account was created
    let survey = banks_client
        .get_account(survey_account.pubkey())
        .await
        .unwrap()
        .expect("Survey account not found");
    
    assert_eq!(survey.owner, program_id);
}

#[tokio::test]
async fn test_claim_reward() {
    // Similar test setup for claiming rewards
    // This would include creating a survey first, then testing the claim process
}

#[tokio::test]
async fn test_distribute_nft() {
    // Test NFT distribution functionality
}

#[tokio::test]
async fn test_close_survey() {
    // Test survey closing functionality
}