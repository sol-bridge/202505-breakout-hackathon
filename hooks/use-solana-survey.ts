"use client";

import { useState, useCallback } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

interface SurveyStatus {
  surveyId: string;
  owner: string;
  solRewardAmount: number;
  tokenRewardAmount: number;
  tokenMint: string;
  maxParticipants: number;
  currentParticipants: number;
  createdAt: string;
  isActive: boolean;
  remainingSlots: number;
  participantStatus?: {
    hasClaimedSol: boolean;
    hasClaimedToken: boolean;
    hasReceivedNft: boolean;
    claimedAt: string | null;
  };
}

export function useSolanaSurvey() {
  const { user } = usePrivy();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeSurvey = useCallback(async (params: {
    surveyTitle: string;
    tokenMint: string;
    solRewardAmount?: number;
    tokenRewardAmount?: number;
    maxParticipants?: number;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/survey/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize survey");
      }

      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const claimReward = useCallback(async (surveyId: string, tokenMint: string) => {
    if (!user?.wallet?.address) {
      throw new Error("Wallet not connected");
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/survey/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surveyId,
          participantWallet: user.wallet.address,
          tokenMint,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to claim reward");
      }

      // In production, sign transaction with user's wallet
      // This is a placeholder for the actual wallet integration
      if (data.transaction) {
        console.log("Transaction ready for signing:", data.transaction);
        // TODO: Integrate with wallet adapter to sign and submit transaction
      }

      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const getSurveyStatus = useCallback(async (surveyId: string): Promise<SurveyStatus> => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ surveyId });
      
      if (user?.wallet?.address) {
        params.append("participant", user.wallet.address);
      }

      const response = await fetch(`/api/survey/status?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch survey status");
      }

      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const closeSurvey = useCallback(async (surveyId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/survey/close", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surveyId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to close survey");
      }

      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    initializeSurvey,
    claimReward,
    getSurveyStatus,
    closeSurvey,
    loading,
    error,
  };
}