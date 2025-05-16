import { Connection, Keypair, PublicKey } from '@solana/web3.js';

// Solana Network Configuration
export const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
export const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';

// Program Configuration
export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || '11111111111111111111111111111111'
);

// Token Configuration
export const REWARD_TOKEN_MINT = process.env.NEXT_PUBLIC_REWARD_TOKEN_MINT
  ? new PublicKey(process.env.NEXT_PUBLIC_REWARD_TOKEN_MINT)
  : null;

// Default Reward Amounts
export const DEFAULT_SOL_REWARD = 0.001; // 0.001 SOL
export const DEFAULT_TOKEN_REWARD = 100; // 100 tokens

// Connection instance
export const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

// Admin wallet (for server-side operations)
export const getAdminKeypair = (): Keypair | null => {
  const adminSecretKey = process.env.SOLANA_ADMIN_SECRET_KEY;
  if (!adminSecretKey) {
    console.warn('Admin secret key not configured');
    return null;
  }
  
  try {
    const secretKey = JSON.parse(adminSecretKey);
    return Keypair.fromSecretKey(new Uint8Array(secretKey));
  } catch (error) {
    console.error('Invalid admin secret key format');
    return null;
  }
};