import { NextRequest, NextResponse } from 'next/server';
import {
  Connection,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';
import { connection, getAdminKeypair } from '@/lib/solana/config';
import { createClaimRewardInstruction } from '@/lib/solana/instructions';
import { deriveSurveyAddress, deriveParticipantAddress } from '@/lib/solana/account-utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { surveyId, participantWallet, tokenMint } = body;

    if (!surveyId || !participantWallet) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Get admin keypair (for paying transaction fees)
    const adminKeypair = getAdminKeypair();
    if (!adminKeypair) {
      return NextResponse.json(
        { error: 'Admin configuration not set' },
        { status: 500 }
      );
    }

    // Parse participant wallet
    const participant = new PublicKey(participantWallet);
    
    // Derive account addresses
    const [surveyAccount] = await deriveSurveyAddress(surveyId);
    const [participantAccount] = await deriveParticipantAddress(surveyId, participant);
    
    // Get token accounts
    const tokenMintPubkey = new PublicKey(tokenMint);
    const participantTokenAccount = await getAssociatedTokenAddress(
      tokenMintPubkey,
      participant
    );
    const surveyTokenAccount = await getAssociatedTokenAddress(
      tokenMintPubkey,
      surveyAccount,
      true // Allow PDA owner
    );

    // Create transaction
    const transaction = new Transaction();

    // Add create associated token account instruction if needed
    const tokenAccountInfo = await connection.getAccountInfo(participantTokenAccount);
    if (!tokenAccountInfo) {
      transaction.add(
        createAssociatedTokenAccountInstruction(
          adminKeypair.publicKey,
          participantTokenAccount,
          participant,
          tokenMintPubkey
        )
      );
    }

    // Add claim reward instruction
    transaction.add(
      createClaimRewardInstruction(
        participant,
        surveyAccount,
        participantAccount,
        participantTokenAccount,
        surveyTokenAccount,
        surveyId
      )
    );

    // NOTE: In production, this transaction should be signed by the participant
    // Here we're using admin keypair for demo purposes
    // In a real app, you would return the transaction for the user to sign
    
    // For production, return the transaction to be signed by the user's wallet
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    return NextResponse.json({
      success: true,
      transaction: serializedTransaction.toString('base64'),
      message: 'Transaction created. Please sign and submit from your wallet.',
      accounts: {
        surveyAccount: surveyAccount.toBase58(),
        participantAccount: participantAccount.toBase58(),
        participantTokenAccount: participantTokenAccount.toBase58(),
      },
    });
  } catch (error: any) {
    console.error('Error claiming reward:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to claim reward' },
      { status: 500 }
    );
  }
}