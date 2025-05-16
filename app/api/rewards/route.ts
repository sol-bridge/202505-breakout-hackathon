import { type NextRequest, NextResponse } from "next/server"
import { sendTokenReward } from "@/app/solana-utils"

export async function POST(req: NextRequest) {
  try {
    const { walletAddress, taskId, taskType, amount } = await req.json()

    // Validation
    if (!walletAddress || !taskId || !taskType || !amount) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Send token reward
    const success = await sendTokenReward(walletAddress, amount, taskId)

    if (success) {
      return NextResponse.json({
        success: true,
        message: `${amount} tokens successfully sent`,
        transactionId: `tx_${Date.now()}`,
      })
    } else {
      return NextResponse.json({ error: "Failed to send tokens" }, { status: 500 })
    }
  } catch (error) {
    console.error("Rewards API error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
