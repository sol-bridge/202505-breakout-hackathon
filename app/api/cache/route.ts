import { type NextRequest, NextResponse } from "next/server"
import { getCacheStats, clearCache, clearExpiredCache } from "@/lib/cache-utils"

// 管理者APIキー（実際の実装では環境変数から取得するべき）
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "admin-key"

// APIキーの検証
function validateApiKey(req: NextRequest): boolean {
  const apiKey = req.headers.get("x-api-key")
  return apiKey === ADMIN_API_KEY
}

// キャッシュ統計情報の取得
export async function GET(req: NextRequest) {
  if (!validateApiKey(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const stats = getCacheStats()
  return NextResponse.json(stats)
}

// キャッシュのクリア
export async function DELETE(req: NextRequest) {
  if (!validateApiKey(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const expiredOnly = searchParams.get("expiredOnly") === "true"

  if (expiredOnly) {
    const clearedCount = clearExpiredCache()
    return NextResponse.json({
      message: `${clearedCount} expired cache entries cleared`,
    })
  } else {
    clearCache()
    return NextResponse.json({
      message: "Cache cleared successfully",
    })
  }
}
