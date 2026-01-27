"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hi! I'm HashTurn's AI assistant. I can help you learn about our services, projects, and how we can help automate your business. What would you like to know?",
  },
]

const quickReplies = [
  "What services do you offer?",
  "Tell me about RPA solutions",
  "How can I get a quote?",
  "What makes HashTurn different?",
]

export function ChatBot() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>(initialMessages)
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("service") || lowerMessage.includes("offer")) {
      return "HashTurn offers a comprehensive range of digital solutions:\n\n• **Web Development** - Modern, responsive websites and web applications\n• **RPA Solutions** - Automate repetitive tasks and workflows\n• **API Development & Integration** - Connect your systems seamlessly\n• **SaaS Development** - Scalable cloud applications\n• **Ecommerce Solutions** - Build your online store\n• **Custom Automation Bots** - Data scraping and reporting automation\n\nWould you like more details about any specific service?"
    }

    if (lowerMessage.includes("rpa") || lowerMessage.includes("automation")) {
      return "Our RPA (Robotic Process Automation) solutions help businesses:\n\n• Automate repetitive manual tasks\n• Reduce operational costs by up to 70%\n• Eliminate human errors in data processing\n• Free up your team for strategic work\n• Process invoices, reports, and data automatically\n\nWe've helped clients save dozens of hours weekly. Want to discuss your automation needs?"
    }

    if (lowerMessage.includes("quote") || lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "To get a personalized quote, you can:\n\n1. Visit our **Contact page** and fill out the form\n2. Email us at **contact@hashturn.net**\n3. WhatsApp us for quick response\n\nWe'll schedule a free consultation to understand your requirements and provide a detailed proposal. Would you like to proceed?"
    }

    if (lowerMessage.includes("different") || lowerMessage.includes("why") || lowerMessage.includes("choose")) {
      return "What makes HashTurn stand out:\n\n• **Expert Team** - Experienced engineers and designers\n• **Automation-First** - We prioritize efficiency in every solution\n• **Scalable Solutions** - Built for growth and performance\n• **Transparent Communication** - Clear updates throughout\n• **Proven Track Record** - Successful launches across industries\n• **Continuous Support** - Reliable post-launch assistance\n\nWe don't just build - we partner with you for success!"
    }

    if (lowerMessage.includes("contact") || lowerMessage.includes("reach")) {
      return "You can reach HashTurn through:\n\n• **Email**: contact@hashturn.net\n• **Phone**: +92 300 1234567\n• **WhatsApp**: Click the green button below\n• **Contact Form**: Visit our Contact page\n\nWe typically respond within 24 hours!"
    }

    if (lowerMessage.includes("team")) {
      return "HashTurn is led by a passionate team of experts:\n\n• **Zeeshan Bilal** - Founder & CEO\n• **Muhammad Awais Anwar** - CTO\n• **Qazi Zubair** - MERN Stack Developer\n• **Muhammad Zaid Nehal** - Senior Software Engineer\n• **Rizwan Khan** - AI Automation Engineer\n• **Muhammad Abubakar** - React/Next.js Developer\n• **Ahsan Raza Alvi** - UI/UX Designer\n\nVisit our Team page to learn more!"
    }

    if (lowerMessage.includes("project") || lowerMessage.includes("portfolio") || lowerMessage.includes("work")) {
      return "We've delivered impactful projects including:\n\n• **E-commerce Web Apps** - Full-featured online stores\n• **Invoice Automation Bots** - Automated document processing\n• **Analytics Dashboards** - Data visualization platforms\n• **Mobile Banking Apps** - Secure financial applications\n• **Cloud Migration** - Infrastructure modernization\n\nVisit our Projects page to see our full portfolio!"
    }

    return "Thanks for your message! HashTurn specializes in Web Development, RPA Solutions, and Custom Automation. We help businesses save time and reduce costs through smart digital solutions.\n\nFeel free to ask about our services, pricing, team, or anything else!"
  }

  const handleSend = async (message: string = input) => {
    if (!message.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: generateResponse(message),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors",
          isOpen ? "bg-foreground text-background" : "bg-primary text-primary-foreground",
        )}
        aria-label="Toggle chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">HashTurn Assistant</h3>
                <p className="text-xs text-primary-foreground/80">Always here to help</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md",
                    )}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="text-xs bg-muted hover:bg-muted/80 text-foreground px-3 py-1.5 rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="p-4 border-t border-border flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" className="rounded-full" disabled={!input.trim() || isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
