"use client"

import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import { translateQuestion, translateUI } from "@/lib/translations"
import type { Language } from "@/components/language-switcher"

type SampleQuestionsProps = {
  location?: string
  onSelectQuestion: (question: string) => void
  language: Language
}

export function SampleQuestions({ location = "", onSelectQuestion, language }: SampleQuestionsProps) {
  // 地域に基づいた質問例を生成
  const getQuestions = () => {
    const locationName = location || "this area"
    const locationParts = location.split(", ")
    const lastPart = locationParts[locationParts.length - 1] || ""
    const country = locationParts[0] || ""

    // 特定の国や都市に関連する質問
    if (location) {
      // UAEの場合
      if (country === "United Arab Emirates") {
        return [
          "What are the top attractions in {location}?",
          "What is the best time to visit {location}?",
          "Tell me about shopping malls in {location}?",
          "What are the luxury hotels in {location}?",
          "How is the public transportation in {location}?",
          "What are the visa requirements for visiting {location}?",
        ]
      }

      // シンガポールの場合
      if (country === "Singapore") {
        return [
          "What are the must-visit attractions in {location}?",
          "Tell me about food options in {location}?",
          "What are the best hawker centers in {location}?",
          "How do I use public transportation in Singapore?",
          "What are the shopping areas in {location}?",
          "What events are happening in Singapore this month?",
        ]
      }

      // マレーシアの場合
      if (country === "Malaysia") {
        return [
          "What are popular tourist spots in {location}?",
          "Tell me about local food in {location}?",
          "What are the cultural attractions in {location}?",
          "How is the weather in {location} right now?",
          "What are the shopping malls in {location}?",
          "What festivals are celebrated in {location}?",
        ]
      }

      // 日本の都道府県や市町村に関連する質問
      if (country === "Japan") {
        const isCity = locationParts.length > 2
        const cityOrPrefecture = lastPart

        return [
          "What are popular tourist attractions in {location}?",
          "Tell me about local festivals in {location}?",
          "What is the best season to visit {location}?",
          "What are famous local foods in {location}?",
          "How is the public transportation system in {location}?",
          isCity ? "Are there any job opportunities in {location}?" : "What are the major cities in {location}?",
        ]
      }
    }

    const generalQuestions = [
      "What are popular events happening in {location} this weekend?",
      "Tell me about public transportation options in {location}.",
      "What are the best restaurants in {location}?",
      "Are there any job opportunities in tech in {location}?",
      "What administrative services are available online in {location}?",
      "Tell me about upcoming festivals in {location}.",
    ]

    // 地域が選択されている場合は、より具体的な質問を追加
    if (location) {
      return [
        ...generalQuestions,
        "What's the weather like in {location} today?",
        "What are the tourist attractions in {location}?",
        "Are there any local markets in {location}?",
      ]
    }

    return generalQuestions
  }

  const questions = getQuestions()

  // 質問例をクリックした時に、翻訳済みの質問を渡すように修正
  const handleQuestionClick = (question: string) => {
    // 翻訳済みの質問を渡す
    const translatedQuestion = translateQuestion(question, language, lastPart(location))
    onSelectQuestion(translatedQuestion)
  }

  return (
    <div className="mt-4">
      <div className="flex items-center mb-2">
        <HelpCircle className="h-4 w-4 mr-2 text-purple-600" />
        <span className="text-sm font-medium">{translateUI("Sample Questions:", language)}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.slice(0, 5).map((question, index) => {
          const translatedQuestion = translateQuestion(question, language, lastPart(location))
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleQuestionClick(question)}
            >
              {translatedQuestion}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

// ヘルパー関数: 地域パスの最後の部分を取得
function lastPart(location: string): string {
  if (!location) return ""
  const parts = location.split(", ")
  return parts[parts.length - 1]
}
