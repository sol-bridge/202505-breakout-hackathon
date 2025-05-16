# SolBridge - AI-Powered Local Information Support

SolBridge is a decentralized platform that combines AI-powered local information services with Solana blockchain token rewards. This monorepo contains both the Next.js web application and the Solana smart contract program.

## Project Structure

```
├── app/              # Next.js application
├── components/       # React components
├── lib/              # Utility libraries
├── program/          # Solana smart contract
│   ├── src/          # Program source code
│   ├── tests/        # Integration tests
│   └── target/       # Build artifacts
└── public/           # Static assets
```

## Getting Started

### Prerequisites

- Node.js 20+ and pnpm
- Rust and Solana CLI tools (for program development)
- Solana wallet (Phantom, Solflare, or other Solana-compatible wallets)

### Supported Authentication Methods

- Email authentication
- Google OAuth
- Solana wallet connections (via Privy)
  - Automatic wallet support for all Solana-compatible wallets
  - No additional configuration needed for specific wallets

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Environment Variable Setup

To run this application, you need to set the following environment variables:

### Required Environment Variables

- `NEXT_PUBLIC_PRIVY_APP_ID`: App ID used for Privy authentication (if using authentication features)
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: WalletConnect project ID (optional, for wallet connections)
- `NEXT_PUBLIC_SOLANA_NETWORK`: Solana network to use (mainnet-beta, devnet, testnet)
- `NEXT_PUBLIC_SOLANA_RPC_URL`: Solana RPC endpoint URL
- `NEXT_PUBLIC_PROGRAM_ID`: Deployed Solana program ID
- `NEXT_PUBLIC_REWARD_TOKEN_MINT`: SPL token mint address for rewards
- `SOLANA_ADMIN_SECRET_KEY`: Admin wallet secret key (server-side only, for transactions)

### AI API Provider Settings

You can configure the AI provider using the following environment variables:

- `AI_PROVIDER`: The AI provider to use. Specify one of the following:
  - `openai` (default): Use OpenAI API
  - `groq`: Use Groq API
  - `gemini`: Use Google Gemini API

### OpenAI Settings (when AI_PROVIDER=openai)

- `OPENAI_API_KEY`: OpenAI API key
- `OPENAI_MODEL`: Model to use (default: `gpt-4o`)
  - Other options: `gpt-4-turbo`, `gpt-3.5-turbo`, etc.

### Groq Settings (when AI_PROVIDER=groq)

- `GROQ_API_KEY`: Groq API key
- `GROQ_MODEL`: Model to use (default: `llama3-70b-8192`)
  - Other options: `llama3-8b-8192`, `mixtral-8x7b-32768`, etc.

### Google Gemini Settings (when AI_PROVIDER=gemini)

- `GOOGLE_API_KEY`: Google AI API key
- `GEMINI_MODEL`: Model to use (default: `gemini-1.5-pro`)
  - Other options: `gemini-1.0-pro`, `gemini-1.5-flash`, etc.

### Cache Settings

Caching is currently disabled. When enabled, use the following environment variables:

- `ENABLE_CACHE`: Whether to enable caching (default: `false`)
  - `true`: Enable caching
  - `false`: Disable caching
- `ADMIN_API_KEY`: Access key for cache management API

The cache management screen is available at `/admin/cache` when caching is enabled.

## How to Set Environment Variables

### Local Development Environment

Create a `.env.local` file and set the environment variables as follows:

\`\`\`
NEXT_PUBLIC_PRIVY_APP_ID=your-privy-app-id
AI_PROVIDER=openai
OPENAI_API_KEY=your-openai-api-key
\`\`\`

### When Deploying to Vercel

Set environment variables from the Vercel dashboard under "Settings" → "Environment Variables".

## Solana Program Development

The Solana smart contract is located in the `program/` directory. This program handles token distribution for surveys, job applications, and other reward mechanisms.

### Smart Contract Overview

The SolBridge Rewards Program is a Solana smart contract that enables:

1. **Survey Campaign Management**
   - Initialize campaigns with configurable rewards (SOL, tokens, NFTs)
   - Set participant limits and reward amounts
   - Track participant claims and prevent double rewards

2. **Reward Distribution**
   - Automatic SOL transfers to participants
   - SPL token distribution for completed surveys
   - NFT minting and distribution as special incentives

3. **Campaign Analytics**
   - Track participant count and claim status
   - Monitor reward distribution progress
   - Close campaigns and return unused funds

### Setup

1. Run the setup script to install all dependencies:
```bash
cd program
./build.sh
```

This will install:
- Rust toolchain
- Solana CLI tools
- BPF build tools
- Configure Solana for devnet

2. Create a new keypair:
```bash
solana-keygen new
```

### Building and Deploying

```bash
cd program

# Build the program
cargo build-bpf

# Run tests
cargo test-bpf

# Deploy to devnet
solana program deploy target/deploy/solbridge_rewards.so

# Get program ID
solana program show --programs
```

### Program Architecture

The Solana program includes:
- **Survey Account**: Stores campaign configuration and reward pools
- **Participant Account**: Tracks individual participant claims
- **Reward Distribution**: Handles SOL, token, and NFT transfers
- **Security Features**: Owner validation and double-claim prevention

### Integration with Web API

1. Web API creates survey campaigns by calling `InitializeSurvey`
2. API records participant responses with wallet addresses
3. Backend triggers reward distribution via `ClaimReward`
4. Optional NFT rewards distributed via `DistributeNft`
5. Campaigns closed and funds recovered via `CloseSurvey`

### Testing

```bash
# Run unit tests
cargo test

# Run integration tests
cargo test-bpf

# Run local validator for testing
solana-test-validator
```

## Development Workflow

1. **Frontend Development**: Use `pnpm dev` to start the Next.js dev server
2. **Program Development**: Use `cargo watch` in the `program/` directory
3. **Testing**: Run both frontend tests (`pnpm test`) and program tests (`cargo test-bpf`)
4. **Deployment**: Deploy the program to devnet, then update the frontend with the new program ID

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
