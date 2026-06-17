import { DEMO_TRAVELERS, DEMO_PROVIDERS } from "@/lib/demo-data"
import Link from "next/link"

export default function PatientOS() {
  const traveler = DEMO_TRAVELERS[0]
  const provider = DEMO_PROVIDERS[0]
  const lastInProgress = [...traveler.timeline].reverse().find((e) => e.status === "in-progress")

  return (
    <div className="max-w-5xl mx-auto pt-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Patient OS</h1>
        <p className="text-sm text-white/60">Sarah Johnson — {traveler.city}, {traveler.country}</p>
      </div>

      <div className="grid grid-cols-5 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Health Passport</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-green-400">Valid and ready</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Medical Vault</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-white/80">2 records</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Active Journey</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-cyan-400">1</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Provider Matches</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-white/80">24</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Outcome</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-yellow-400">Pending</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-sm font-semibold text-white/80 mb-3">Active Journey</h3>
          <div className="text-lg font-bold text-white mb-2">{traveler.issue}</div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {traveler.symptoms.map((s) => (
              <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">{s}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 font-medium">{traveler.severity}</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-medium">{traveler.pathway}</span>
          </div>
          <Link href="/demo/agent-workspace" className="text-xs text-cyan-400 hover:text-cyan-300 transition">
            Open Navigation Assistant →
          </Link>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-sm font-semibold text-white/80 mb-3">Timeline</h3>
          <div className="space-y-1">
            {traveler.timeline.map((event, i) => {
              const isInProgress = event.status === "in-progress"
              const isLastInProgress = lastInProgress && event === lastInProgress
              return (
                <div key={i} className={`flex items-center gap-2 py-1 ${
                  isLastInProgress ? "animate-pulse" : ""
                }`}>
                  <span className="text-[10px] text-white/30 w-10 flex-shrink-0">{event.time}</span>
                  <span className={`text-xs flex-1 ${
                    event.status === "completed" ? "text-white/70" :
                    event.status === "in-progress" ? "text-cyan-300 font-medium" :
                    "text-white/30"
                  }`}>{event.action}</span>
                  {event.status === "completed" && <span className="text-green-400 text-xs">✓</span>}
                  {event.status === "in-progress" && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white/80">Recommended Care Option</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Matched</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-white">{provider.name}</div>
            <div className="text-xs text-white/50 mt-0.5">Score: {provider.score}</div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {provider.reasons.map((r) => (
                <span key={r} className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded">{r}</span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-cyan-400">{provider.score}</div>
            <div className="text-[10px] text-white/40">match score</div>
          </div>
        </div>
      </div>
    </div>
  )
}
