"use client";

import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle, Coins, Trophy } from "lucide-react";
import { useSolanaSurvey } from "@/hooks/use-solana-survey";

interface SurveyRewardClaimProps {
  surveyId: string;
  tokenMint: string;
}

export function SurveyRewardClaim({ surveyId, tokenMint }: SurveyRewardClaimProps) {
  const { user, authenticated } = usePrivy();
  const { getSurveyStatus, claimReward, loading, error } = useSolanaSurvey();
  const [surveyStatus, setSurveyStatus] = useState<any>(null);
  const [claimStatus, setClaimStatus] = useState<"idle" | "claiming" | "success" | "error">("idle");

  useEffect(() => {
    if (surveyId) {
      loadSurveyStatus();
    }
  }, [surveyId]);

  const loadSurveyStatus = async () => {
    try {
      const status = await getSurveyStatus(surveyId);
      setSurveyStatus(status);
    } catch (err) {
      console.error("Failed to load survey status:", err);
    }
  };

  const handleClaimReward = async () => {
    if (!authenticated || !user?.wallet?.address) {
      alert("Please connect your wallet first");
      return;
    }

    setClaimStatus("claiming");
    try {
      await claimReward(surveyId, tokenMint);
      setClaimStatus("success");
      await loadSurveyStatus(); // Reload status after claiming
    } catch (err) {
      setClaimStatus("error");
      console.error("Failed to claim reward:", err);
    }
  };

  if (loading && !surveyStatus) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!surveyStatus) {
    return (
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertDescription>Survey not found</AlertDescription>
      </Alert>
    );
  }

  const canClaim = 
    authenticated && 
    user?.wallet?.address && 
    surveyStatus.isActive &&
    surveyStatus.remainingSlots > 0 &&
    (!surveyStatus.participantStatus?.hasClaimedSol || !surveyStatus.participantStatus?.hasClaimedToken);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Survey Rewards
          {surveyStatus.isActive ? (
            <Badge variant="default">Active</Badge>
          ) : (
            <Badge variant="secondary">Closed</Badge>
          )}
        </CardTitle>
        <CardDescription>
          Claim your rewards for completing the survey
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">SOL Reward</p>
            <p className="text-lg font-semibold">{surveyStatus.solRewardAmount} SOL</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Token Reward</p>
            <p className="text-lg font-semibold">{surveyStatus.tokenRewardAmount} Tokens</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Participants</p>
            <p className="text-lg font-semibold">
              {surveyStatus.currentParticipants} / {surveyStatus.maxParticipants}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Available Slots</p>
            <p className="text-lg font-semibold">{surveyStatus.remainingSlots}</p>
          </div>
        </div>

        {surveyStatus.participantStatus && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold mb-2">Your Status</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">SOL Claimed</span>
                {surveyStatus.participantStatus.hasClaimedSol ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tokens Claimed</span>
                {surveyStatus.participantStatus.hasClaimedToken ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-gray-400" />
                )}
              </div>
              {surveyStatus.participantStatus.claimedAt && (
                <p className="text-xs text-muted-foreground">
                  Claimed on: {new Date(surveyStatus.participantStatus.claimedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {claimStatus === "success" && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Rewards claimed successfully!</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleClaimReward}
          disabled={!canClaim || claimStatus === "claiming"}
          className="w-full"
        >
          {claimStatus === "claiming" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Claiming...
            </>
          ) : claimStatus === "success" ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Claimed
            </>
          ) : (
            <>
              <Coins className="mr-2 h-4 w-4" />
              Claim Rewards
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}