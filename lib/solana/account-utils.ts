import { PublicKey } from '@solana/web3.js';
import { sha256 } from 'crypto-hash';
import { PROGRAM_ID } from './config';

// PDA seed constants
const SURVEY_SEED = 'survey';
const PARTICIPANT_SEED = 'participant';

// Derive PDA for survey account
export async function deriveSurveyAddress(
  surveyId: string
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress(
    [
      Buffer.from(SURVEY_SEED),
      Buffer.from(surveyId),
    ],
    PROGRAM_ID
  );
}

// Derive PDA for participant account
export async function deriveParticipantAddress(
  surveyId: string,
  participant: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress(
    [
      Buffer.from(PARTICIPANT_SEED),
      Buffer.from(surveyId),
      participant.toBuffer(),
    ],
    PROGRAM_ID
  );
}

// Generate unique survey ID
export async function generateSurveyId(prefix: string = 'survey'): Promise<string> {
  const timestamp = Date.now().toString();
  const randomBytes = Math.random().toString(36).substring(2, 15);
  const hash = await sha256(`${prefix}_${timestamp}_${randomBytes}`);
  return `${prefix}_${hash.substring(0, 16)}`;
}