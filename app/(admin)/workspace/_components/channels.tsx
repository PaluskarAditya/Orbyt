"use client"

import { cn } from '@/lib/utils'
import { Hash, Users, ChevronDown, Search } from 'lucide-react'
import { useState } from 'react'

const workspace = {
  name: "Automata",
  plan: "Pro"
}

const channels = [
  { id: 1, name: 'general', online: 12, total: 48, unread: 0, active: false },
  { id: 2, name: 'automata-server-dev', online: 5, total: 20, unread: 3, active: false },
  { id: 3, name: 'frontend-revamp', online: 8, total: 32, unread: 0, active: false },
  { id: 4, name: 'ai-product-research', online: 21, total: 76, unread: 0, active: true },
  { id: 5, name: 'marketing-growth', online: 9, total: 27, unread: 7, active: false },
  { id: 6, name: 'design-system', online: 14, total: 50, unread: 0, active: false },
]

export default function Channels() {
  const [active, setActive] = useState(4)

  return (
    <div className="h-full w-[220px] flex-shrink-0 flex flex-col border-r border-white/[0.06] py-3">

      {/* Workspace header */}
      <div className="px-3 mb-4">
        <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-indigo-500 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">A</span>
            </div>
            <span className="text-sm font-semibold text-white tracking-tight">{workspace.name}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-medium">{workspace.plan}</span>
          </div>
          <ChevronDown size={13} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 mb-4">
        <div className="flex items-center w-full gap-2 bg-white/[0.04] border border-white/[0.07] rounded-lg px-2.5 py-1.5">
          <Search size={12} className="text-zinc-600" />
          <input
            placeholder="Search..."
            className="flex-1 bg-transparent text-xs text-zinc-300 placeholder:text-zinc-600 outline-none"
          />
          {/* <kbd className="text-[10px] text-zinc-700 font-mono">⌘K</kbd> */}
        </div>
      </div>

      {/* Channels label */}
      <div className="px-3 mb-1.5 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">Channels</span>
        <span className="text-[10px] text-zinc-700">{channels.length}</span>
      </div>

      {/* Channel list */}
      <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-0.5">
        {channels.map(ch => (
          <button
            key={ch.id}
            onClick={() => setActive(ch.id)}
            className={cn(
              "w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-all duration-150 group cursor-pointer",
              active === ch.id
                ? "bg-white/[0.08] text-white"
                : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
            )}
          >
            <Hash size={13} className={cn(
              "flex-shrink-0 transition-colors",
              active === ch.id ? "text-indigo-400" : "text-zinc-600 group-hover:text-zinc-400"
            )} />

            <span className="flex-1 text-xs font-medium tracking-tight truncate">{ch.name}</span>

            {ch.unread > 0 && active !== ch.id && (
              <span className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">
                {ch.unread}
              </span>
            )}

            {active === ch.id && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-zinc-500">{ch.online}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Bottom: online count */}
      <div className="px-3 pt-3 border-t border-white/[0.06] mt-2">
        <div className="flex items-center gap-2 text-zinc-600">
          <Users size={12} />
          <span className="text-xs">
            <span className="text-emerald-400 font-medium">
              {channels.reduce((a, c) => a + c.online, 0)}
            </span>
            <span className="text-zinc-700"> / {channels.reduce((a, c) => a + c.total, 0)} online</span>
          </span>
        </div>
      </div>
    </div>
  )
}