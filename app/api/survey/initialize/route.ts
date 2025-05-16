import { NextRequest, NextResponse } from 'next/server';
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token';
import { 
  connection, 
  getAdminKeypair,
  DEFAULT_SOL_REWARD,
  DEFAULT_TOKEN_REWARD 
} from '@/lib/solana/config';
import { createInitializeSurveyInstruction } from '@/lib/solana/instructions';
import { deriveSurveyAddress, generateSurveyId } from '@/lib/solana/account-utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      surveyTitle,
      tokenMint,
      solRewardAmount = DEFAULT_SOL_REWARD,
      tokenRewardAmount = DEFAULT_TOKEN_REWARD,
      maxParticipants = 1000,
    } = body;

    // Get admin keypair
    const adminKeypair = getAdminKeypair();
    if (!adminKeypair) {
      return NextResponse.json(
        { error: 'Admin configuration not set' },
        { status: 500 }
      );
    }

    // Generate unique survey ID
    const surveyId = await generateSurveyId(surveyTitle?.toLowerCase() || 'survey');
    
    // Derive survey account PDA
    const [surveyAccount] = await deriveSurveyAddress(surveyId);
    
    // Parse token mint
    const tokenMintPubkey = new PublicKey(tokenMint);
    
    // Get or create associated token account for the survey
    const tokenPool = await getAssociatedTokenAddress(
      tokenMintPubkey,
      surveyAccount,
      true // Allow PDA owner
    );

    // Create transaction
    const transaction = new Transaction();

    // Add create associated token account instruction if needed
    const tokenAccountInfo = await connection.getAccountInfo(tokenPool);
    if (!tokenAccountInfo) {
      transaction.add(
        createAssociatedTokenAccountInstruction(
          adminKeypair.publicKey,
          tokenPool,
          surveyAccount,
          tokenMintPubkey
        )
      );
    }

    // Add initialize survey instruction
    transaction.add(
      createInitializeSurveyInstruction(
        adminKeypair.publicKey,
        surveyAccount,
        tokenMintPubkey,
        tokenPool,
        surveyId,
        solRewardAmount,
        tokenRewardAmount,
        maxParticipants
      )
    );

    // Send transaction
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [adminKeypair],
      {
        commitment: 'confirmed',
      }
    );

    return NextResponse.json({
      success: true,
      surveyId,
      surveyAccount: surveyAccount.toBase58(),
      tokenPool: tokenPool.toBase58(),
      signature,
    });
  } catch (error: any) {
    console.error('Error initializing survey:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize survey' },
      { status: 500 }
    );
  }
}