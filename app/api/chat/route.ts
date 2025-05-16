import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { groq } from "@ai-sdk/groq"
import { google } from "@ai-sdk/google"
import { getFallbackResponse } from "@/lib/ai-fallback"
import type { Language } from "@/components/language-switcher"
import { getCachedResponse, cacheResponse } from "@/lib/cache-utils"

// AIプロバイダーの設定
const AI_PROVIDER = process.env.AI_PROVIDER || "openai" // デフォルトはOpenAI
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o"
const GROQ_MODEL = process.env.GROQ_MODEL || "llama3-70b-8192"
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-pro"

// キャッシュを有効にするかどうか
const ENABLE_CACHE = false // キャッシュを無効化

// プロダクションモードを強制するフラグ（デバッグ中は無効化）
const FORCE_PRODUCTION_MODE = false // プロダクションモードを強制しない

export async function POST(req: NextRequest) {
  try {
    const { messages, language = "en" } = await req.json()

    // 最後のユーザーメッセージを取得
    const lastUserMessage = [...messages].reverse().find((msg) => msg.role === "user")
    const userQuery = lastUserMessage?.content || ""

    // 位置情報を含むシステムメッセージを探す
    const locationMessage = messages.find(
      (msg) => msg.role === "system" && (msg.content.includes("asking about") || msg.content.includes("について質問")),
    )

    // 位置情報を抽出
    let location = ""
    if (locationMessage) {
      const match =
        locationMessage.content.match(/about\s+([^.]+)\./) || locationMessage.content.match(/は([^について]+)について/)
      location = match ? match[1] : ""
    }

    // キャッシュが有効な場合、キャッシュからレスポンスを取得
    if (ENABLE_CACHE) {
      const cachedResponse = getCachedResponse(userQuery, language as Language, location)
      if (cachedResponse) {
        return NextResponse.json({
          response: cachedResponse,
          cached: true,
        })
      }
    }

    // APIキーが設定されているか確認
    const hasValidApiKey =
      (AI_PROVIDER === "openai" && process.env.OPENAI_API_KEY) ||
      (AI_PROVIDER === "groq" && process.env.GROQ_API_KEY) ||
      (AI_PROVIDER === "gemini" && process.env.GOOGLE_API_KEY)

    // APIキーが設定されていない場合はフォールバックモードを使用
    if (!hasValidApiKey) {
      console.warn(`API key for ${AI_PROVIDER} is not set. Using fallback mode.`)
      const fallbackResponse = getFallbackResponse(userQuery, language as Language, location)

      // フォールバックレスポンスもキャッシュする
      if (ENABLE_CACHE) {
        cacheResponse(userQuery, fallbackResponse, language as Language, location, "fallback")
      }

      return NextResponse.json({
        response: fallbackResponse,
        fallback: true,
      })
    }

    // システムプロンプトを言語に応じて設定
    const systemPrompt =
      language === "ja"
        ? `あなたは地域情報、イベント、交通機関、求人情報、キャンペーン、行政情報に特化したAIアシスタントです。
ユーザーの質問に対して、友好的かつ正確な情報を提供してください。
地域固有の情報については、一般的な回答を提供し、必要に応じて詳細を尋ねてください。`
        : `You are an AI assistant specialized in local information, events, transportation, job opportunities, campaigns, and administrative information.
Provide friendly and accurate information in response to user questions.
For location-specific information, provide general answers and ask for more details if needed.`

    // システムプロンプトを追加
    const fullMessages = [
      { role: "system", content: systemPrompt },
      ...messages.filter(
        (msg) => msg.role !== "system" || msg.content.includes("asking about") || msg.content.includes("について質問"),
      ),
    ]

    // 選択されたAIプロバイダーに基づいてモデルを設定
    let model
    try {
      switch (AI_PROVIDER.toLowerCase()) {
        case "groq":
          model = groq(GROQ_MODEL)
          break
        case "gemini":
          model = google(GEMINI_MODEL)
          break
        case "openai":
        default:
          model = openai(OPENAI_MODEL)
          break
      }

      // AI SDKを使用してレスポンスを生成
      const { text } = await generateText({
        model,
        messages: fullMessages,
      })

      // レスポンスをキャッシュに保存
      if (ENABLE_CACHE) {
        cacheResponse(userQuery, text, language as Language, location, AI_PROVIDER)
      }

      return NextResponse.json({ response: text })
    } catch (error) {
      console.error(`Error with ${AI_PROVIDER} API:`, error)

      // エラーメッセージを言語に応じて設定
      const errorMessage =
        language === "ja"
          ? `AIサービス(${AI_PROVIDER})との通信中にエラーが発生しました。しばらくしてからもう一度お試しください。`
          : `An error occurred while communicating with the AI service (${AI_PROVIDER}). Please try again later.`

      // フォールバックレスポンスを使用
      const fallbackResponse = getFallbackResponse(userQuery, language as Language, location)

      return NextResponse.json({
        response: fallbackResponse,
        error: String(error),
        fallback: true,
      })
    }
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      {
        response: "An unexpected error occurred. Please try again later.",
        error: String(error),
      },
      { status: 500 },
    )
  }
}
