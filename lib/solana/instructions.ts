import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { serialize } from 'borsh';
import { PROGRAM_ID } from './config';
import {
  initializeSurveySchema,
  claimRewardSchema,
  distributeNftSchema,
  closeSurveySchema,
} from './borsh-schema';

// Instruction Types
export enum SurveyInstruction {
  InitializeSurvey = 0,
  ClaimReward = 1,
  DistributeNft = 2,
  CloseSurvey = 3,
}

// Instruction Data Classes
export class InitializeSurveyData {
  instruction: number;
  survey_id: string;
  sol_reward_amount: bigint;
  token_reward_amount: bigint;
  max_participants: number;

  constructor(fields: {
    survey_id: string;
    sol_reward_amount: bigint;
    token_reward_amount: bigint;
    max_participants: number;
  }) {
    this.instruction = SurveyInstruction.InitializeSurvey;
    this.survey_id = fields.survey_id;
    this.sol_reward_amount = fields.sol_reward_amount;
    this.token_reward_amount = fields.token_reward_amount;
    this.max_participants = fields.max_participants;
  }
}

export class ClaimRewardData {
  instruction: number;
  survey_id: string;

  constructor(fields: { survey_id: string }) {
    this.instruction = SurveyInstruction.ClaimReward;
    this.survey_id = fields.survey_id;
  }
}

export class DistributeNftData {
  instruction: number;
  survey_id: string;

  constructor(fields: { survey_id: string }) {
    this.instruction = SurveyInstruction.DistributeNft;
    this.survey_id = fields.survey_id;
  }
}

export class CloseSurveyData {
  instruction: number;
  survey_id: string;

  constructor(fields: { survey_id: string }) {
    this.instruction = SurveyInstruction.CloseSurvey;
    this.survey_id = fields.survey_id;
  }
}

// Helper functions to create instructions
export function createInitializeSurveyInstruction(
  owner: PublicKey,
  surveyAccount: PublicKey,
  tokenMint: PublicKey,
  tokenPool: PublicKey,
  surveyId: string,
  solRewardAmount: number,
  tokenRewardAmount: number,
  maxParticipants: number
): TransactionInstruction {
  const data = serialize(
    initializeSurveySchema,
    new InitializeSurveyData({
      survey_id: surveyId,
      sol_reward_amount: BigInt(Math.floor(solRewardAmount * 1e9)),
      token_reward_amount: BigInt(tokenRewardAmount),
      max_participants: maxParticipants,
    })
  );

  return new TransactionInstruction({
    keys: [
      { pubkey: owner, isSigner: true, isWritable: false },
      { pubkey: surveyAccount, isSigner: false, isWritable: true },
      { pubkey: tokenMint, isSigner: false, isWritable: false },
      { pubkey: tokenPool, isSigner: false, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
    ],
    programId: PROGRAM_ID,
    data: Buffer.from(data),
  });
}

export function createClaimRewardInstruction(
  participant: PublicKey,
  surveyAccount: PublicKey,
  participantAccount: PublicKey,
  participantTokenAccount: PublicKey,
  surveyTokenAccount: PublicKey,
  surveyId: string
): TransactionInstruction {
  const data = serialize(
    claimRewardSchema,
    new ClaimRewardData({ survey_id: surveyId })
  );

  return new TransactionInstruction({
    keys: [
      { pubkey: participant, isSigner: true, isWritable: true },
      { pubkey: surveyAccount, isSigner: false, isWritable: true },
      { pubkey: participantAccount, isSigner: false, isWritable: true },
      { pubkey: participantTokenAccount, isSigner: false, isWritable: true },
      { pubkey: surveyTokenAccount, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    programId: PROGRAM_ID,
    data: Buffer.from(data),
  });
}

export function createDistributeNftInstruction(
  owner: PublicKey,
  surveyAccount: PublicKey,
  participantAccount: PublicKey,
  participantNftAccount: PublicKey,
  nftMint: PublicKey,
  surveyId: string
): TransactionInstruction {
  const data = serialize(
    distributeNftSchema,
    new DistributeNftData({ survey_id: surveyId })
  );

  return new TransactionInstruction({
    keys: [
      { pubkey: owner, isSigner: true, isWritable: false },
      { pubkey: surveyAccount, isSigner: false, isWritable: true },
      { pubkey: participantAccount, isSigner: false, isWritable: true },
      { pubkey: participantNftAccount, isSigner: false, isWritable: true },
      { pubkey: nftMint, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
    ],
    programId: PROGRAM_ID,
    data: Buffer.from(data),
  });
}

export function createCloseSurveyInstruction(
  owner: PublicKey,
  surveyAccount: PublicKey,
  ownerSolAccount: PublicKey,
  surveyId: string
): TransactionInstruction {
  const data = serialize(
    closeSurveySchema,
    new CloseSurveyData({ survey_id: surveyId })
  );

  return new TransactionInstruction({
    keys: [
      { pubkey: owner, isSigner: true, isWritable: false },
      { pubkey: surveyAccount, isSigner: false, isWritable: true },
      { pubkey: ownerSolAccount, isSigner: false, isWritable: true },
    ],
    programId: PROGRAM_ID,
    data: Buffer.from(data),
  });
}