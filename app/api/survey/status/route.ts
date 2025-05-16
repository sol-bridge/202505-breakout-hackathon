import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { deserialize } from 'borsh';
import { connection } from '@/lib/solana/config';
import { deriveSurveyAddress, deriveParticipantAddress } from '@/lib/solana/account-utils';
import { surveyAccountSchema, participantAccountSchema } from '@/lib/solana/borsh-schema';

// Account Data Classes
export class SurveyAccount {
  is_initialized: boolean = false;
  survey_id: string = '';
  owner: Uint8Array = new Uint8Array(32);
  sol_reward_amount: bigint = BigInt(0);
  token_reward_amount: bigint = BigInt(0);
  token_mint: Uint8Array = new Uint8Array(32);
  max_participants: number = 0;
  current_participants: number = 0;
  created_at: bigint = BigInt(0);
  is_active: boolean = false;
  nft_collection?: Uint8Array;

  constructor(fields: Partial<SurveyAccount> = {}) {
    Object.assign(this, fields);
  }
}

export class ParticipantAccount {
  is_initialized: boolean = false;
  survey_id: string = '';
  participant: Uint8Array = new Uint8Array(32);
  has_claimed_sol: boolean = false;
  has_claimed_token: boolean = false;
  has_received_nft: boolean = false;
  claimed_at?: bigint;

  constructor(fields: Partial<ParticipantAccount> = {}) {
    Object.assign(this, fields);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const surveyId = searchParams.get('surveyId');
    const participantWallet = searchParams.get('participant');

    if (!surveyId) {
      return NextResponse.json(
        { error: 'Survey ID is required' },
        { status: 400 }
      );
    }

    // Get survey account
    const [surveyAddress] = await deriveSurveyAddress(surveyId);
    const surveyAccountInfo = await connection.getAccountInfo(surveyAddress);

    if (!surveyAccountInfo) {
      return NextResponse.json(
        { error: 'Survey not found' },
        { status: 404 }
      );
    }

    // Deserialize survey account
    const surveyAccount = deserialize(
      surveyAccountSchema,
      SurveyAccount,
      surveyAccountInfo.data
    );

    const response: any = {
      surveyId: surveyAccount.survey_id,
      owner: new PublicKey(surveyAccount.owner).toBase58(),
      solRewardAmount: Number(surveyAccount.sol_reward_amount) / 1e9,
      tokenRewardAmount: Number(surveyAccount.token_reward_amount),
      tokenMint: new PublicKey(surveyAccount.token_mint).toBase58(),
      maxParticipants: surveyAccount.max_participants,
      currentParticipants: surveyAccount.current_participants,
      createdAt: new Date(Number(surveyAccount.created_at) * 1000).toISOString(),
      isActive: surveyAccount.is_active,
      remainingSlots: surveyAccount.max_participants - surveyAccount.current_participants,
    };

    // If participant wallet is provided, get participant status
    if (participantWallet) {
      try {
        const participant = new PublicKey(participantWallet);
        const [participantAddress] = await deriveParticipantAddress(surveyId, participant);
        const participantAccountInfo = await connection.getAccountInfo(participantAddress);

        if (participantAccountInfo) {
          const participantAccount = deserialize(
            participantAccountSchema,
            ParticipantAccount,
            participantAccountInfo.data
          );

          response.participantStatus = {
            hasClaimedSol: participantAccount.has_claimed_sol,
            hasClaimedToken: participantAccount.has_claimed_token,
            hasReceivedNft: participantAccount.has_received_nft,
            claimedAt: participantAccount.claimed_at
              ? new Date(Number(participantAccount.claimed_at) * 1000).toISOString()
              : null,
          };
        } else {
          response.participantStatus = {
            hasClaimedSol: false,
            hasClaimedToken: false,
            hasReceivedNft: false,
            claimedAt: null,
          };
        }
      } catch (error) {
        console.error('Error fetching participant status:', error);
      }
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error fetching survey status:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch survey status' },
      { status: 500 }
    );
  }
}