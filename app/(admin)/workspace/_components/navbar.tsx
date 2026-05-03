"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Settings, LogOut } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const workspaces = [
  { id: 1, name: 'Automata', image: 'https://github.com/shadcn.png', active: true },
  { id: 2, name: 'Design Co.', image: 'https://github.com/shadcn.png', active: false },
  { id: 3, name: 'SideProject', image: 'https://github.com/shadcn.png', active: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(1)

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm border-white/10 bg-zinc-900 text-white">
          <form>
            <DialogHeader>
              <DialogTitle className="text-white font-medium tracking-tight">New Workspace</DialogTitle>
              <DialogDescription className="text-zinc-400 text-xs">
                Create a workspace for your team.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 flex flex-col gap-1.5">
              <Label htmlFor="ws-name" className="text-xs text-zinc-400">Name</Label>
              <Input
                id="ws-name"
                placeholder="My Workspace"
                className="bg-zinc-800 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500/50 h-9 text-sm"
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5 text-xs cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs cursor-pointer">
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <TooltipProvider delayDuration={200}>
        <div className="h-full w-[60px] flex flex-col items-center py-3 gap-2 border-r border-white/[0.06]">

          {/* Workspaces */}
          <div className="flex-1 flex flex-col items-center gap-2 w-full px-2 pt-1">
            {workspaces.map(ws => (
              <Tooltip key={ws.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setActive(ws.id)}
                    className="relative group cursor-pointer"
                  >
                    {/* Active indicator */}
                    <span className={cn(
                      "absolute -left-2 top-1/2 -translate-y-1/2 w-0.5 rounded-full bg-white transition-all duration-200",
                      active === ws.id ? "h-5 opacity-100" : "h-0 opacity-0 group-hover:h-3 group-hover:opacity-60"
                    )} />
                    <Avatar className={cn(
                      "w-9 h-9 transition-all duration-200 ring-2",
                      active === ws.id
                        ? "rounded-xl ring-indigo-500/60"
                        : "rounded-2xl ring-transparent hover:rounded-xl hover:ring-white/10"
                    )}>
                      <AvatarImage src={ws.image} />
                      <AvatarFallback className="bg-zinc-800 text-zinc-400 text-xs">
                        {ws.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs text-white">
                  {ws.name}
                </TooltipContent>
              </Tooltip>
            ))}

            {/* Divider */}
            <div className="w-6 h-px bg-white/10 my-1" />

            {/* Add Workspace */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setOpen(true)}
                  className="w-9 h-9 rounded-2xl hover:rounded-xl border border-dashed border-white/20 hover:border-white/40 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-all duration-200 cursor-pointer"
                >
                  <Plus size={15} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-zinc-800 border-white/10 text-xs text-white">
                Add workspace
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Bottom actions */}
          <div className="flex flex-col items-center gap-2 px-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-600 hover:text-zinc-300 hover:bg-white/5 transition-all cursor-pointer">
                  <Settings size={15} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-zinc-800 border-white/10 text-xs text-white">Settings</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer">
                  <LogOut size={15} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-zinc-800 border-white/10 text-xs text-white">Sign out</TooltipContent>
            </Tooltip>

            {/* User avatar */}
            <div className="mt-1">
              <Avatar className="w-8 h-8 rounded-xl ring-2 ring-white/10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-indigo-600 text-white text-xs">U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </>
  )
}