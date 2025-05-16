import fs from "fs"
import path from "path"
import crypto from "crypto"
import type { Language } from "@/components/language-switcher"

// キャッシュのインターフェース
interface CacheItem {
  response: string
  timestamp: number
  provider: string
}

interface CacheData {
  [key: string]: CacheItem
}

// キャッシュの設定
const CACHE_DIR = path.join(process.cwd(), ".cache")
const CACHE_FILE = path.join(CACHE_DIR, "ai-responses.json")
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000 // 7日間（ミリ秒）

// キャッシュディレクトリの作成
function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true })
  }
}

// キャッシュファイルの読み込み
function readCache(): CacheData {
  ensureCacheDir()

  if (!fs.existsSync(CACHE_FILE)) {
    return {}
  }

  try {
    const data = fs.readFileSync(CACHE_FILE, "utf-8")
    return JSON.parse(data) as CacheData
  } catch (error) {
    console.error("キャッシュファイルの読み込みエラー:", error)
    return {}
  }
}

// キャッシュファイルの書き込み
function writeCache(data: CacheData) {
  ensureCacheDir()

  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2), "utf-8")
  } catch (error) {
    console.error("キャッシュファイルの書き込みエラー:", error)
  }
}

// 質問の正規化（余分な空白の削除、小文字化など）
function normalizeQuery(query: string): string {
  return query.trim().toLowerCase()
}

// キャッシュキーの生成
export function generateCacheKey(query: string, language: Language, location = ""): string {
  const normalizedQuery = normalizeQuery(query)
  const dataToHash = `${normalizedQuery}|${language}|${location}`
  return crypto.createHash("md5").update(dataToHash).digest("hex")
}

// キャッシュからレスポンスを取得
export function getCachedResponse(query: string, language: Language, location = ""): string | null {
  const cacheKey = generateCacheKey(query, language, location)
  const cache = readCache()

  if (cache[cacheKey]) {
    const { response, timestamp } = cache[cacheKey]
    const now = Date.now()

    // キャッシュの有効期限をチェック
    if (now - timestamp < CACHE_EXPIRY) {
      console.log("キャッシュヒット:", cacheKey)
      return response
    } else {
      console.log("キャッシュ期限切れ:", cacheKey)
      // 期限切れのキャッシュを削除
      delete cache[cacheKey]
      writeCache(cache)
    }
  }

  return null
}

// レスポンスをキャッシュに保存
export function cacheResponse(
  query: string,
  response: string,
  language: Language,
  location = "",
  provider = "unknown",
): void {
  const cacheKey = generateCacheKey(query, language, location)
  const cache = readCache()

  cache[cacheKey] = {
    response,
    timestamp: Date.now(),
    provider,
  }

  writeCache(cache)
  console.log("キャッシュに保存:", cacheKey)
}

// キャッシュの統計情報を取得
export function getCacheStats(): { count: number; size: number; providers: Record<string, number> } {
  const cache = readCache()
  const keys = Object.keys(cache)

  const providers: Record<string, number> = {}
  keys.forEach((key) => {
    const provider = cache[key].provider
    providers[provider] = (providers[provider] || 0) + 1
  })

  return {
    count: keys.length,
    size: Buffer.byteLength(JSON.stringify(cache), "utf-8"),
    providers,
  }
}

// キャッシュをクリア
export function clearCache(): void {
  ensureCacheDir()

  if (fs.existsSync(CACHE_FILE)) {
    fs.unlinkSync(CACHE_FILE)
  }

  console.log("キャッシュをクリアしました")
}

// 期限切れのキャッシュをクリア
export function clearExpiredCache(): number {
  const cache = readCache()
  const keys = Object.keys(cache)
  const now = Date.now()
  let clearedCount = 0

  keys.forEach((key) => {
    if (now - cache[key].timestamp >= CACHE_EXPIRY) {
      delete cache[key]
      clearedCount++
    }
  })

  if (clearedCount > 0) {
    writeCache(cache)
    console.log(`${clearedCount}件の期限切れキャッシュをクリアしました`)
  }

  return clearedCount
}
