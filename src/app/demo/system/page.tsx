"use client"

import { useEffect, useState } from "react"

const layers = [
  { icon: "01", name: "Patient OS", subtitle: "Traveler identity, health passport, medical vault" },
  { icon: "02", name: "Navigation Assistant", subtitle: "Proactive care coordination and next-step guidance" },
  { icon: "03", name: "Provider Network", subtitle: "156 vetted providers across 14 countries" },
  { icon: "04", name: "Communication Layer", subtitle: "WhatsApp, voice, SMS with delivery tracking" },
  { icon: "05", name: "Provider OS", subtitle: "Inbox, scheduling, interpreter sessions" },
  { icon: "06", name: "Care Outcomes", subtitle: "Treatment records and continuous service improvement" },
]

const traffic = [
  { time: "09:02", event: "Journey created -> Navigation Assistant" },
  { time: "09:04", event: "Severity Assessment → Provider Network" },
  { time: "09:06", event: "Outreach → Communication Layer" },
  { time: "09:08", event: "Assignment → Provider OS" },
  { time: "09:14", event: "Outcome recorded -> Care Outcomes" },
]

export default function SystemView() {
  const [visibleArrows, setVisibleArrows] = useState<number[]>([])
  const [visibleTraffic, setVisibleTraffic] = useState<number[]>([])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < layers.length - 1; i++) {
      timers.push(setTimeout(() => setVisibleArrows((prev) => [...prev, i]), (i + 1) * 300))
    }
    for (let i = 0; i < traffic.length; i++) {
      timers.push(setTimeout(() => setVisibleTraffic((prev) => [...prev, i]), i * 400))
    }
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="max-w-5xl mx-auto pt-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">System View</h1>
        <p className="text-sm text-white/60 mt-1">How each layer coordinates a care journey from start to outcome</p>
      </div>

      {/* Topology Flow */}
      <div className="flex flex-col items-center mb-12">
        {layers.map((layer, i) => (
          <div key={layer.name} className="flex flex-col items-center">
            <div className="w-72 rounded-xl border border-white/20 bg-white/[0.06] p-6 text-center">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/[0.05] text-[11px] font-mono text-white/70">
                {layer.icon}
              </span>
              <h3 className="text-base font-semibold text-white mt-2">{layer.name}</h3>
              <p className="text-xs text-white/60 mt-1">{layer.subtitle}</p>
            </div>
            {i < layers.length - 1 && (
              <div
                className={`flex items-center justify-center h-10 transition-all duration-500 ${
                  visibleArrows.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
              >
                <svg className="w-6 h-6 text-white/30 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Traffic Flow */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-sm font-semibold text-white/80 mb-4">Traffic Flow</h2>
        <div className="space-y-2">
          {traffic.map((t, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 transition-all duration-500 ${
                visibleTraffic.includes(i) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <span className="text-xs text-white/40 font-mono w-12 flex-shrink-0">{t.time}</span>
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
              <span className="text-sm text-white/70">{t.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
