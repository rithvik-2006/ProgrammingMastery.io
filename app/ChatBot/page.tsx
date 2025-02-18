"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Bot } from "lucide-react"
import Navbar from "@/components/Navbar"

interface Message {
  text: string
  sender: "user" | "bot"
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your AI programming assistant. How can I help you today?", sender: "bot" },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [])

  const handleSend = async () => {
    if (input.trim() === "") return

    const newMessages = [...messages, { text: input, sender: "user" as const }]
    setMessages(newMessages)
    setInput("")

    // Simulate AI response (replace with actual API call in production)
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          text: `I understand you're asking about "${input}". As an AI assistant, I can provide information on various programming topics. Could you please specify which aspect of this topic you'd like to know more about?`,
          sender: "bot",
        },
      ])
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <Navbar/>
      <Card className="w-full mt-10 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>AI Programming Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
                <div className={`flex items-start space-x-2 ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div
                    className={`p-2 rounded-lg ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    {message.sender === "user" ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>
          <div className="flex mt-4">
            <Input
              type="text"
              placeholder="Ask a programming question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-grow mr-2"
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

