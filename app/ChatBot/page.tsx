"use client"

import { useState, useRef, useEffect } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
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
//AIzaSyDMBdH1PLNQEhQjZUUvONKHLh7iPsJzmxg
const genAI = new GoogleGenerativeAI("AIzaSyDMBdH1PLNQEhQjZUUvONKHLh7iPsJzmxg")

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your AI programming assistant. How can I help you today?", sender: "bot" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const generateResponse = async (userInput: string) => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
    
    try {
      const result = await model.generateContent(userInput)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error("API Error:", error)
      return "Sorry, I'm having trouble understanding. Could you please rephrase your question?"
    }
  }

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return

    const userMessage = input
    setInput("")
    setMessages(prev => [...prev, { text: userMessage, sender: "user" }])
    setIsLoading(true)

    try {
      const aiResponse = await generateResponse(userMessage)
      setMessages(prev => [...prev, { text: aiResponse, sender: "bot" }])
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "An error occurred while processing your request. Please try again.", 
        sender: "bot" 
      }])
    } finally {
      setIsLoading(false)
    }
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
                <div className={`flex items-start space-x-2 gap-1 ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div
                    className={`p-2 rounded-lg ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    {message.sender === "user" ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                  </div>
                  <div
                    className={`p-2 rounded-lg ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start space-x-2">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Bot className="w-6 h-6 animate-pulse" />
                  </div>
                </div>
              </div>
            )}
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
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}