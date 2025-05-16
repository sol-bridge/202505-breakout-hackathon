"use client"

import { ChatWindow } from "@/components/chat-window"

export default function ChatPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">AIアシスタント</h1>
      <ChatWindow />
    </div>
  )
}
