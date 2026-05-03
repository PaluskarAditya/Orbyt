"use client"

import Channels from "./_components/channels"
import Main from "./_components/main"
import Navbar from "./_components/navbar"

export default function Page() {
  return (
    <div className="h-screen w-full flex overflow-hidden" style={{
      background: `
        radial-gradient(ellipse 80% 60% at 10% 10%, rgba(99,102,241,0.12), transparent 55%),
        radial-gradient(ellipse 60% 50% at 85% 80%, rgba(168,85,247,0.10), transparent 55%),
        radial-gradient(ellipse 50% 40% at 50% 50%, rgba(14,165,233,0.06), transparent 60%),
        #09090b
      `
    }}>
      <Navbar />
      <Channels />
      <div className="flex-1 min-w-0 p-3 pl-0">
        <Main />
      </div>
    </div>
  )
}