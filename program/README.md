# SolBridge Rewards Program

A Solana smart contract for distributing rewards (SOL, tokens, and NFTs) to survey participants.

## Features

- Initialize survey campaigns with configurable rewards
- Distribute SOL and token rewards to participants
- Mint and distribute NFTs as incentives
- Track participant claims to prevent double rewards
- Close surveys and return unused funds

## Instructions

### 1. Initialize Survey
Creates a new survey campaign with specified rewards.

**Parameters:**
- `survey_id`: Unique identifier for the survey
- `sol_reward_amount`: Amount of SOL to reward each participant
- `token_reward_amount`: Amount of tokens to reward each participant
- `max_participants`: Maximum number of participants allowed

### 2. Claim Reward
Allows participants to claim their rewards after completing a survey.

**Parameters:**
- `survey_id`: The ID of the survey to claim rewards from

### 3. Distribute NFT
Allows survey owners to distribute NFTs to participants.

**Parameters:**
- `survey_id`: The ID of the survey

### 4. Close Survey
Closes a survey and returns remaining funds to the owner.

**Parameters:**
- `survey_id`: The ID of the survey to close

## Setup and Installation

### Prerequisites

1. Install Rust and Solana CLI tools by running the setup script:
```bash
./build.sh
```

This script will:
- Install Rust (if not already installed)
- Install Solana CLI tools
- Install BPF build tools
- Configure Solana for devnet

### Manual Installation

If you prefer manual installation:

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/v1.16.0/install)"

# Add Solana to PATH
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"

# Install BPF tools
cargo install --git https://github.com/solana-labs/cargo-build-bpf
```

## Build and Deploy

```bash
# Build the program
cargo build-bpf

# Alternative build command
solana program build

# Run tests
cargo test-bpf

# Deploy to devnet
solana program deploy target/deploy/solbridge_rewards.so

# Deploy with specific keypair
solana program deploy target/deploy/solbridge_rewards.so --program-id <PROGRAM_ID>
```

## Testing

```bash
# Run unit tests
cargo test

# Run integration tests
cargo test-bpf

# Run specific test
cargo test test_initialize_survey
```

## Account Structure

### Survey Account
- `is_initialized`: Whether the account is initialized
- `survey_id`: Unique survey identifier
- `owner`: Survey creator's public key
- `sol_reward_amount`: SOL reward per participant
- `token_reward_amount`: Token reward per participant
- `token_mint`: Token mint address for rewards
- `max_participants`: Maximum allowed participants
- `current_participants`: Current participant count
- `created_at`: Unix timestamp of creation
- `is_active`: Whether the survey is active
- `nft_collection`: Optional NFT collection address

### Participant Account
- `is_initialized`: Whether the account is initialized
- `survey_id`: Associated survey ID
- `participant`: Participant's public key
- `has_claimed_sol`: SOL reward claim status
- `has_claimed_token`: Token reward claim status
- `has_received_nft`: NFT receipt status
- `claimed_at`: Unix timestamp of claim

## Web API Integration

The program is designed to work with web APIs:

1. Web API registers survey responses with user wallet addresses
2. Backend calls the smart contract to distribute rewards
3. Participants can claim rewards through the web interface or directly