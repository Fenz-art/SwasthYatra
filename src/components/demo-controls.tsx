"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DemoControls() {
  const router = useRouter()

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault()
          break
        case "ArrowLeft":
          e.preventDefault()
          break
        case " ":
          e.preventDefault()
          router.push("/demo/agent-workspace")
          break
        case "d":
        case "D":
          router.push("/demo/docs")
          break
        case "j":
        case "J":
          router.push("/demo/judge")
          break
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [router])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      <button
        onClick={() => router.push("/demo")}
        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white text-[10px] rounded-lg transition"
        title="Reset Demo"
      >
        ↻ Reset
      </button>
      <div className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/30 text-[10px] rounded-lg hidden md:block">
        → ← Space D J
      </div>
    </div>
  )
}
