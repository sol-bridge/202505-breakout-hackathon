# SolBridge Solana API Documentation

This document describes the Solana smart contract integration APIs available in the Next.js application.

## Overview

The SolBridge platform integrates with Solana blockchain to distribute rewards (SOL, tokens, and NFTs) to survey participants. The API provides endpoints for survey management and reward distribution.

## API Endpoints

### 1. Initialize Survey

Creates a new survey campaign with reward configuration.

**Endpoint:** `POST /api/survey/initialize`

**Request Body:**
```json
{
  "surveyTitle": "Customer Satisfaction Survey",
  "tokenMint": "token_mint_address",
  "solRewardAmount": 0.001,
  "tokenRewardAmount": 100,
  "maxParticipants": 1000
}
```

**Response:**
```json
{
  "success": true,
  "surveyId": "survey_abc123",
  "surveyAccount": "survey_pda_address",
  "tokenPool": "token_pool_address",
  "signature": "transaction_signature"
}
```

### 2. Claim Reward

Allows participants to claim rewards after completing a survey.

**Endpoint:** `POST /api/survey/claim`

**Request Body:**
```json
{
  "surveyId": "survey_abc123",
  "participantWallet": "participant_wallet_address",
  "tokenMint": "token_mint_address"
}
```

**Response:**
```json
{
  "success": true,
  "transaction": "base64_encoded_transaction",
  "message": "Transaction created. Please sign and submit from your wallet.",
  "accounts": {
    "surveyAccount": "survey_pda_address",
    "participantAccount": "participant_pda_address",
    "participantTokenAccount": "token_account_address"
  }
}
```

### 3. Get Survey Status

Retrieves current status of a survey campaign.

**Endpoint:** `GET /api/survey/status`

**Query Parameters:**
- `surveyId` (required): Survey identifier
- `participant` (optional): Participant wallet address

**Response:**
```json
{
  "surveyId": "survey_abc123",
  "owner": "owner_wallet_address",
  "solRewardAmount": 0.001,
  "tokenRewardAmount": 100,
  "tokenMint": "token_mint_address",
  "maxParticipants": 1000,
  "currentParticipants": 250,
  "createdAt": "2024-01-15T10:30:00Z",
  "isActive": true,
  "remainingSlots": 750,
  "participantStatus": {
    "hasClaimedSol": false,
    "hasClaimedToken": false,
    "hasReceivedNft": false,
    "claimedAt": null
  }
}
```

### 4. Close Survey

Closes a survey campaign and returns remaining funds to owner.

**Endpoint:** `POST /api/survey/close`

**Request Body:**
```json
{
  "surveyId": "survey_abc123"
}
```

**Response:**
```json
{
  "success": true,
  "signature": "transaction_signature",
  "message": "Survey closed successfully"
}
```

## React Hook Usage

The `useSolanaSurvey` hook provides a convenient interface for interacting with the Solana APIs.

### Installation

```typescript
import { useSolanaSurvey } from '@/hooks/use-solana-survey';
```

### Basic Usage

```typescript
export function SurveyManager() {
  const {
    initializeSurvey,
    claimReward,
    getSurveyStatus,
    closeSurvey,
    loading,
    error
  } = useSolanaSurvey();

  // Initialize a new survey
  const handleCreateSurvey = async () => {
    try {
      const result = await initializeSurvey({
        surveyTitle: "Customer Feedback",
        tokenMint: "TOKEN_MINT_ADDRESS",
        solRewardAmount: 0.001,
        tokenRewardAmount: 100,
        maxParticipants: 1000
      });
      console.log('Survey created:', result.surveyId);
    } catch (error) {
      console.error('Failed to create survey:', error);
    }
  };

  // Claim rewards
  const handleClaimReward = async (surveyId: string) => {
    try {
      const result = await claimReward(surveyId, "TOKEN_MINT_ADDRESS");
      // Sign transaction with wallet adapter
      console.log('Ready to sign:', result.transaction);
    } catch (error) {
      console.error('Failed to claim reward:', error);
    }
  };

  // Check survey status
  const checkStatus = async (surveyId: string) => {
    try {
      const status = await getSurveyStatus(surveyId);
      console.log('Survey status:', status);
    } catch (error) {
      console.error('Failed to get status:', error);
    }
  };

  return (
    <div>
      {/* Your UI components */}
    </div>
  );
}
```

## Component Usage

The `SurveyRewardClaim` component provides a ready-to-use UI for claiming rewards.

```tsx
import { SurveyRewardClaim } from '@/components/survey-reward-claim';

export function MyPage() {
  return (
    <SurveyRewardClaim 
      surveyId="survey_abc123" 
      tokenMint="TOKEN_MINT_ADDRESS" 
    />
  );
}
```

## Configuration

### Environment Variables

```env
# Network configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# Program configuration
NEXT_PUBLIC_PROGRAM_ID=YourProgramIdHere
NEXT_PUBLIC_REWARD_TOKEN_MINT=YourTokenMintAddress

# Server-side only
SOLANA_ADMIN_SECRET_KEY=[secret_key_array]
```

### Wallet Integration

The API is designed to work with Solana wallet adapters. For claim operations, the API returns unsigned transactions that must be signed by the user's wallet.

```typescript
// Example wallet integration
const { user } = usePrivy();
const walletAdapter = useWallet();

const handleClaim = async () => {
  const { transaction } = await claimReward(surveyId, tokenMint);
  
  // Decode and sign transaction
  const tx = Transaction.from(Buffer.from(transaction, 'base64'));
  const signedTx = await walletAdapter.signTransaction(tx);
  
  // Send transaction
  const signature = await connection.sendRawTransaction(signedTx.serialize());
  await connection.confirmTransaction(signature);
};
```

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "status": 400
}
```

Common error codes:
- `400`: Bad request (missing parameters)
- `404`: Resource not found
- `500`: Server error

## Security Considerations

1. **Admin Keys**: Admin secret keys should only be used server-side
2. **User Transactions**: All user transactions must be signed client-side
3. **RPC Endpoints**: Use appropriate RPC endpoints for your environment
4. **Validation**: Always validate user inputs and wallet addresses

## Best Practices

1. Check survey status before claiming rewards
2. Handle transaction failures gracefully
3. Implement proper wallet connection flows
4. Cache survey status to reduce RPC calls
5. Use appropriate gas estimates for transactions

## Troubleshooting

### Common Issues

1. **"Admin configuration not set"**
   - Ensure `SOLANA_ADMIN_SECRET_KEY` is properly configured

2. **"Survey not found"**
   - Verify the survey ID exists on the configured network

3. **"Failed to claim reward"**
   - Check if participant has already claimed
   - Verify survey is still active
   - Ensure sufficient slots remain

### Development Tips

- Use devnet for testing
- Monitor transaction status on Solana Explorer
- Keep track of program deployment IDs
- Test with small reward amounts first