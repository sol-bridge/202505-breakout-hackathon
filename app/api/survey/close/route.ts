import { NextRequest, NextResponse } from 'next/server';
import {
  Connection,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { connection, getAdminKeypair } from '@/lib/solana/config';
import { createCloseSurveyInstruction } from '@/lib/solana/instructions';
import { deriveSurveyAddress } from '@/lib/solana/account-utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { surveyId } = body;

    if (!surveyId) {
      return NextResponse.json(
        { error: 'Survey ID is required' },
        { status: 400 }
      );
    }

    // Get admin keypair
    const adminKeypair = getAdminKeypair();
    if (!adminKeypair) {
      return NextResponse.json(
        { error: 'Admin configuration not set' },
        { status: 500 }
      );
    }

    // Derive survey account address
    const [surveyAccount] = await deriveSurveyAddress(surveyId);

    // Create close survey instruction
    const instruction = createCloseSurveyInstruction(
      adminKeypair.publicKey,
      surveyAccount,
      adminKeypair.publicKey, // Return funds to admin
      surveyId
    );

    // Create and send transaction
    const transaction = new Transaction().add(instruction);
    
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
      signature,
      message: 'Survey closed successfully',
    });
  } catch (error: any) {
    console.error('Error closing survey:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to close survey' },
      { status: 500 }
    );
  }
}