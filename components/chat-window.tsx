"use client"

import type React from "react"

import { useState } from "react"
import { Send, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LocationBreadcrumb } from "@/components/location-breadcrumb"
import { SampleQuestions } from "@/components/sample-questions"
import { LanguageSwitcher, type Language } from "@/components/language-switcher"
import { translateUI } from "@/lib/translations"
import { getFallbackResponse } from "@/lib/ai-fallback"
import { Alert, AlertDescription } from "@/components/ui/alert"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI assistant. Ask me about local information, events, transportation, job opportunities, campaigns, or administrative information.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("")
  const [language, setLanguage] = useState<Language>("en")
  const [useLocalFallback, setUseLocalFallback] = useState(false)
  const [isCached, setIsCached] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // APIを呼び出す関数
  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      // エラーをリセット
      setError(null)

      // ユーザーメッセージを追加
      const userMessage = { role: "user", content: input }
      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)
      setIsCached(false)

      try {
        // ローカルフォールバックモードが有効な場合は、APIを呼び出さずにフォールバック応答を使用
        if (useLocalFallback) {
          setTimeout(() => {
            const fallbackResponse = getFallbackResponse(userMessage.content, language, selectedLocation)
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: fallbackResponse,
              },
            ])
            setIsLoading(false)
          }, 500)
          return
        }

        // 位置情報を含めたコンテキストを作成
        const contextMessage = selectedLocation
          ? {
              role: "system" as const,
              content:
                language === "ja"
                  ? `ユーザーは${selectedLocation}について質問しています。この地域に関連する情報を提供してください。`
                  : `The user is asking about ${selectedLocation}. Please provide information related to this location.`,
            }
          : null

        // APIに送信するメッセージを準備
        const apiMessages = [...messages.filter((msg) => msg.role === "user" || msg.role === "assistant"), userMessage]

        // 位置情報のコンテキストがあれば追加
        if (contextMessage) {
          apiMessages.push(contextMessage)
        }

        // APIを呼び出す
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: apiMessages,
            language,
          }),
        }).catch((error) => {
          console.error("Fetch error:", error)
          setError(`ネットワークエラー: ${error.message}`)
          throw error
        })

        if (!response.ok) {
          const errorText = await response.text().catch(() => "No error details available")
          console.error("API error response:", errorText)
          setError(`APIエラー (${response.status}): ${errorText}`)
          throw new Error(`API response error: ${response.status}`)
        }

        const data = await response.json().catch((error) => {
          console.error("JSON parse error:", error)
          setError(`JSONパースエラー: ${error.message}`)
          throw error
        })

        // キャッシュ状態を設定
        setIsCached(!!data.cached)

        // フォールバックモードが使用された場合
        if (data.fallback) {
          setUseLocalFallback(true)
        }

        if (data.response) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: data.response,
            },
          ])
        } else {
          console.error("Invalid response format:", data)
          setError("無効なレスポンス形式")
          throw new Error("Invalid response format")
        }
      } catch (error) {
        console.error("Error sending message:", error)

        // エラーが発生した場合、ローカルフォールバックを使用
        const fallbackResponse = getFallbackResponse(userMessage.content, language, selectedLocation)

        // エラーメッセージとフォールバック応答を表示
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              language === "ja"
                ? "申し訳ありません。AIサービスとの通信中に問題が発生しました。ローカルモードで応答します。"
                : "Sorry, there was an issue communicating with the AI service. Responding in local mode.",
          },
          {
            role: "assistant",
            content: fallbackResponse,
          },
        ])

        // ローカルフォールバックモードを有効化
        setUseLocalFallback(true)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleLocationChange = (location: { id: string; name: string; path: string[] }) => {
    // Update the selected location
    const fullPath = location.path.join(", ")
    setSelectedLocation(fullPath)

    // Add a system message about the location change
    const message =
      language === "ja"
        ? `場所が${fullPath}に更新されました。この地域に関する情報について、どのようにお手伝いできますか？`
        : `Location updated to ${fullPath}. How can I help you with information about this area?`

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: message,
      },
    ])
  }

  const handleSelectQuestion = (question: string) => {
    setInput(question)
  }

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)

    // 言語変更メッセージを追加
    const message =
      newLanguage === "ja"
        ? "言語が日本語に変更されました。どのようにお手伝いできますか？"
        : "Language changed to English. How can I help you?"

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: message,
      },
    ])
  }

  // ローカルモードを切り替える関数
  const toggleLocalMode = () => {
    setUseLocalFallback(!useLocalFallback)

    // モード変更メッセージを追加
    const message = !useLocalFallback
      ? language === "ja"
        ? "ローカルモードに切り替えました。APIを使用せずに応答します。"
        : "Switched to local mode. Responding without using the API."
      : language === "ja"
        ? "APIモードに切り替えました。AIサービスを使用して応答します。"
        : "Switched to API mode. Responding using the AI service."

    setMessages((prev) => [
      ...prev,
      {
        role: "system",
        content: message,
      },
    ])
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{translateUI("Ask AI Assistant", language)}</CardTitle>
        <div className="flex items-center gap-2">
          {/* {useLocalFallback && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
              {language === "ja" ? "ローカルモード" : "Local Mode"}
            </span>
          )} */}
          {/* {isCached && (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md">
              {language === "ja" ? "キャッシュ" : "Cached"}
            </span>
          )} */}
          {/* <Button variant="outline" size="sm" onClick={toggleLocalMode} className="text-xs">
            {useLocalFallback
              ? language === "ja"
                ? "APIモードに切替"
                : "Switch to API"
              : language === "ja"
                ? "ローカルモードに切替"
                : "Switch to Local"}
          </Button> */}
          <LanguageSwitcher currentLanguage={language} onLanguageChange={handleLanguageChange} />
        </div>
      </CardHeader>
      <CardContent>
        <LocationBreadcrumb onLocationChange={handleLocationChange} language={language} />

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {messages.map(
              (message, index) =>
                message.role !== "system" && (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="flex items-start gap-3 max-w-[80%]">
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.role === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ),
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3 max-w-[80%]">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-gray-100 text-gray-900">
                    <p className="text-sm">{language === "ja" ? "考えています..." : "Thinking..."}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder={translateUI("Type your message...", language)}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            disabled={isLoading}
          />
          <Button size="icon" onClick={handleSend} disabled={isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">{translateUI("Send", language)}</span>
          </Button>
        </div>
        <SampleQuestions location={selectedLocation} onSelectQuestion={handleSelectQuestion} language={language} />
      </CardFooter>
    </Card>
  )
}
