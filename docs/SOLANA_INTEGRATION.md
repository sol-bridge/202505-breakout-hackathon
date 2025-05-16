# Solana Integration Guide

This guide explains how to integrate Solana blockchain functionality into the SolBridge application.

## Quick Start

### 1. Set Up Environment

Create a `.env.local` file with the following configuration:

```env
# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_PROGRAM_ID=<your-deployed-program-id>
NEXT_PUBLIC_REWARD_TOKEN_MINT=<your-token-mint-address>
SOLANA_ADMIN_SECRET_KEY=[1,2,3,...] # Admin keypair as JSON array
```

### 2. Install Dependencies

The required dependencies are already included in `package.json`:
- `@solana/web3.js`
- `@solana/spl-token`
- `bs58`

### 3. Basic Implementation

```typescript
// Import the custom hook
import { useSolanaSurvey } from '@/hooks/use-solana-survey';

// Use in your component
function MySurveyComponent() {
  const { initializeSurvey, claimReward, getSurveyStatus } = useSolanaSurvey();
  
  const createSurvey = async () => {
    const result = await initializeSurvey({
      surveyTitle: "Product Feedback",
      tokenMint: process.env.NEXT_PUBLIC_REWARD_TOKEN_MINT!,
      solRewardAmount: 0.001, // 0.001 SOL
      tokenRewardAmount: 100, // 100 tokens
      maxParticipants: 500
    });
    
    console.log('Survey created:', result.surveyId);
  };
  
  return (
    <button onClick={createSurvey}>Create Survey</button>
  );
}
```

## Architecture Overview

### Smart Contract

The Solana program manages:
- Survey campaigns with reward pools
- Participant tracking and claim status
- SOL and token distribution
- NFT minting (optional)

### API Layer

Next.js API routes handle:
- Transaction creation and preparation
- Account derivation (PDAs)
- RPC communication
- Error handling

### Frontend Integration

React components and hooks provide:
- User-friendly interfaces
- Wallet connection management
- Transaction signing flows
- Status updates

## Development Workflow

### 1. Deploy Smart Contract

```bash
cd program
./build.sh
solana program deploy target/deploy/solbridge_rewards.so
```

### 2. Configure Environment

Update `.env.local` with:
- Deployed program ID
- Token mint address
- RPC endpoint
- Admin keypair

### 3. Test Integration

```typescript
// Test survey creation
const testSurvey = await initializeSurvey({
  surveyTitle: "Test Survey",
  tokenMint: "...",
  solRewardAmount: 0.0001,
  tokenRewardAmount: 1,
  maxParticipants: 10
});

// Test status check
const status = await getSurveyStatus(testSurvey.surveyId);
console.log('Participants:', status.currentParticipants);
```

## Advanced Features

### Custom Token Integration

```typescript
// Create survey with custom token
const customTokenSurvey = await initializeSurvey({
  surveyTitle: "Custom Token Survey",
  tokenMint: "CustomTokenMintAddress",
  solRewardAmount: 0,
  tokenRewardAmount: 1000,
  maxParticipants: 100
});
```

### Batch Operations

```typescript
// Process multiple claims
const batchClaim = async (surveyId: string, participants: string[]) => {
  const results = await Promise.all(
    participants.map(wallet => 
      claimReward(surveyId, tokenMint, wallet)
    )
  );
  return results;
};
```

### Real-time Monitoring

```typescript
// Monitor survey progress
const monitorSurvey = async (surveyId: string) => {
  const interval = setInterval(async () => {
    const status = await getSurveyStatus(surveyId);
    
    if (status.currentParticipants >= status.maxParticipants) {
      clearInterval(interval);
      console.log('Survey full!');
    }
  }, 5000); // Check every 5 seconds
};
```

## Production Considerations

### 1. Network Selection

For production, update configuration:

```env
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

### 2. RPC Optimization

Consider using dedicated RPC providers:
- Alchemy
- QuickNode
- Helius

### 3. Error Handling

Implement comprehensive error handling:

```typescript
try {
  const result = await claimReward(surveyId, tokenMint);
} catch (error) {
  if (error.message.includes('AlreadyClaimed')) {
    // Handle duplicate claim
  } else if (error.message.includes('SurveyFull')) {
    // Handle full survey
  } else {
    // Handle other errors
  }
}
```

### 4. Security

- Never expose admin keys client-side
- Validate all user inputs
- Implement rate limiting
- Monitor for suspicious activity

## Maintenance

### Update Program

```bash
# Deploy new version
solana program deploy --program-id <existing-id> target/deploy/solbridge_rewards.so
```

### Monitor Health

```typescript
// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const connection = new Connection(RPC_URL);
    const version = await connection.getVersion();
    res.json({ status: 'ok', solana: version });
  } catch (error) {
    res.status(500).json({ status: 'error' });
  }
});
```

## Support Resources

- [Solana Documentation](https://docs.solana.com)
- [SPL Token Documentation](https://spl.solana.com/token)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [GitHub Issues](https://github.com/sol-bridge/202505-breakout-hackathon/issues)