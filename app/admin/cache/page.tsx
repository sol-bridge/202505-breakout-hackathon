"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, RefreshCw, Trash2, AlertTriangle } from "lucide-react"

type CacheStats = {
  count: number
  size: number
  providers: Record<string, number>
}

export default function CacheAdminPage() {
  const [stats, setStats] = useState<CacheStats | null>(null)
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const fetchStats = async () => {
    if (!apiKey) {
      setError("APIキーを入力してください")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/cache", {
        headers: {
          "x-api-key": apiKey,
        },
      })

      if (!response.ok) {
        throw new Error(`エラー: ${response.status}`)
      }

      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(`統計情報の取得に失敗しました: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsLoading(false)
    }
  }

  const clearCache = async (expiredOnly = false) => {
    if (!apiKey) {
      setError("APIキーを入力してください")
      return
    }

    if (!confirm(expiredOnly ? "期限切れのキャッシュをクリアしますか？" : "すべてのキャッシュをクリアしますか？")) {
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const url = expiredOnly ? "/api/cache?expiredOnly=true" : "/api/cache"
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "x-api-key": apiKey,
        },
      })

      if (!response.ok) {
        throw new Error(`エラー: ${response.status}`)
      }

      const data = await response.json()
      setSuccess(data.message)

      // 統計情報を更新
      fetchStats()
    } catch (err) {
      setError(`キャッシュのクリアに失敗しました: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsLoading(false)
    }
  }

  // サイズを人間が読みやすい形式に変換
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">キャッシュ管理</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>認証</CardTitle>
          <CardDescription>管理者APIキーを入力してください</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="管理者APIキー"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <Button onClick={fetchStats} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              統計取得
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>エラー</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertTitle>成功</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>キャッシュ統計情報</CardTitle>
            <CardDescription>AIレスポンスのキャッシュ状態</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">キャッシュエントリ数</div>
                  <div className="text-2xl font-bold">{stats.count}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">キャッシュサイズ</div>
                  <div className="text-2xl font-bold">{formatSize(stats.size)}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">プロバイダー数</div>
                  <div className="text-2xl font-bold">{Object.keys(stats.providers).length}</div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">プロバイダー別キャッシュ数</h3>
                <div className="space-y-2">
                  {Object.entries(stats.providers).map(([provider, count]) => (
                    <div key={provider} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                      <span className="font-medium">{provider}</span>
                      <span className="text-gray-600">{count}件</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => clearCache(true)} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              期限切れのキャッシュをクリア
            </Button>
            <Button variant="destructive" onClick={() => clearCache(false)} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
              すべてのキャッシュをクリア
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
