// Borsh schema definitions for serialization

export const initializeSurveySchema = new Map([
  [
    'InitializeSurveySchema',
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['survey_id', 'string'],
        ['sol_reward_amount', 'u64'],
        ['token_reward_amount', 'u64'],
        ['max_participants', 'u32'],
      ],
    },
  ],
]);

export const claimRewardSchema = new Map([
  [
    'ClaimRewardSchema',
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['survey_id', 'string'],
      ],
    },
  ],
]);

export const distributeNftSchema = new Map([
  [
    'DistributeNftSchema',
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['survey_id', 'string'],
      ],
    },
  ],
]);

export const closeSurveySchema = new Map([
  [
    'CloseSurveySchema',
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['survey_id', 'string'],
      ],
    },
  ],
]);

export const surveyAccountSchema = new Map([
  [
    'SurveyAccount',
    {
      kind: 'struct',
      fields: [
        ['is_initialized', 'bool'],
        ['survey_id', 'string'],
        ['owner', [32]],
        ['sol_reward_amount', 'u64'],
        ['token_reward_amount', 'u64'],
        ['token_mint', [32]],
        ['max_participants', 'u32'],
        ['current_participants', 'u32'],
        ['created_at', 'i64'],
        ['is_active', 'bool'],
        ['nft_collection', { kind: 'option', type: [32] }],
      ],
    },
  ],
]);

export const participantAccountSchema = new Map([
  [
    'ParticipantAccount',
    {
      kind: 'struct',
      fields: [
        ['is_initialized', 'bool'],
        ['survey_id', 'string'],
        ['participant', [32]],
        ['has_claimed_sol', 'bool'],
        ['has_claimed_token', 'bool'],
        ['has_received_nft', 'bool'],
        ['claimed_at', { kind: 'option', type: 'i64' }],
      ],
    },
  ],
]);