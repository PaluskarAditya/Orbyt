"use client"

import { useState, useRef, useEffect } from 'react'
import { Send, Hash, Users, MoreHorizontal, Pin, Search, Smile } from 'lucide-react'
import { cn } from '@/lib/utils'

type Message = {
  id: number
  role: 'ai' | 'user'
  content: string
  time: string
}

const initialMessages: Message[] = [
  { id: 1, role: 'ai', content: "Hey 👋 I'm your AI assistant. What are you building?", time: "10:28 PM" },
  { id: 2, role: 'user', content: "I'm building a Teams-like app", time: "10:29 PM" },
  { id: 3, role: 'ai', content: "Nice 🔥 Are you focusing on chat, video, or full collaboration?", time: "10:29 PM" },
  { id: 4, role: 'user', content: "Chat + screen sharing for now", time: "10:30 PM" },
  { id: 5, role: 'ai', content: "Perfect. Start with chat using sockets, then layer WebRTC for screen sharing. Keep your architecture modular — it'll save you later.", time: "10:30 PM" },
  { id: 6, role: 'user', content: "Got it. Should I use TanStack Query here?", time: "10:31 PM" },
  { id: 7, role: 'ai', content: "Use TanStack for API data (users, channels). For real-time chat, rely on sockets — not queries.", time: "10:31 PM" },
]

function MessageBubble({ msg, prevRole }: { msg: Message; prevRole?: string }) {
  const isAI = msg.role === 'ai'
  const isGrouped = prevRole === msg.role

  return (
    <div className={cn(
      "flex gap-2.5",
      isAI ? "justify-start" : "justify-end",
      isGrouped ? "mt-0.5" : "mt-3"
    )}>
      {/* AI avatar */}
      {isAI && !isGrouped && (
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg shadow-indigo-500/20">
          <span className="text-white text-[10px] font-bold">AI</span>
        </div>
      )}
      {isAI && isGrouped && <div className="w-7 flex-shrink-0" />}

      <div className={cn(
        "max-w-[72%] flex flex-col",
        isAI ? "items-start" : "items-end"
      )}>
        {!isGrouped && (
          <span className={cn(
            "text-[10px] mb-1 px-1",
            isAI ? "text-zinc-600" : "text-zinc-600"
          )}>
            {isAI ? "Automata AI" : "You"} · {msg.time}
          </span>
        )}
        <div className={cn(
          "px-3 py-2 rounded-2xl text-xs leading-relaxed",
          isAI
            ? "bg-white/[0.06] text-zinc-200 border border-white/[0.07] rounded-tl-sm"
            : "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 rounded-tr-sm"
        )}>
          {msg.content}
        </div>
      </div>
    </div>
  )
}

export default function Main() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: input.trim(), time: now }])
    setInput('')
  }

  return (
    <div className="h-full flex flex-col rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
            <Hash size={13} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white tracking-tight leading-none">ai-product-research</h1>
            <p className="text-[11px] text-zinc-600 mt-0.5 leading-none">21 online · 76 members</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.06] transition-all cursor-pointer">
            <Search size={14} />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.06] transition-all cursor-pointer">
            <Pin size={14} />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.06] transition-all cursor-pointer">
            <Users size={14} />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.06] transition-all cursor-pointer">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin">
        {messages.map((msg, i) => (
          <MessageBubble key={msg.id} msg={msg} prevRole={messages[i - 1]?.role} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 flex-shrink-0">
        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 focus-within:border-indigo-500/40 focus-within:bg-white/[0.06] transition-all">
          <button className="text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer flex-shrink-0">
            <Smile size={16} />
          </button>

          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder={`Message #ai-product-research`}
            className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 outline-none"
          />

          <button
            onClick={send}
            disabled={!input.trim()}
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer flex-shrink-0",
              input.trim()
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                : "text-zinc-700 cursor-not-allowed"
            )}
          >
            <Send size={13} />
          </button>
        </div>
        <p className="text-[10px] text-zinc-700 mt-1.5 px-1">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  )
}