import { DEMO_TRAVELERS } from "@/lib/demo-data"

const STATUS_ICON: Record<string, { icon: string; style: string }> = {
  completed: { icon: "✓", style: "bg-green-500 text-white" },
  "in-progress": { icon: "▶", style: "bg-cyan-500 text-black animate-pulse" },
  pending: { icon: "", style: "bg-white/10 text-white/40" },
}

export default function DemoJourney() {
  const traveler = DEMO_TRAVELERS[0]

  return (
    <div className="max-w-5xl mx-auto pt-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Active Journey</h1>
        <p className="text-sm text-white/50 mt-1">
          Real-time patient journey status for {traveler.name} &mdash; {traveler.city}, {traveler.country}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left — Traveler Info + Symptoms + Badges */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-start gap-4 mb-5">
            <div className="text-4xl">{traveler.flag}</div>
            <div>
              <h2 className="text-lg font-semibold">{traveler.name}</h2>
              <p className="text-sm text-white/50">{traveler.city}, {traveler.country}</p>
              <p className="text-xs text-white/40 mt-1">{traveler.language} &middot; {traveler.insurance}</p>
            </div>
          </div>

          <div className="mb-5">
            <h3 className="text-xs text-white/40 uppercase tracking-wider mb-2">Issue</h3>
            <p className="text-base font-medium text-cyan-300">{traveler.issue}</p>
          </div>

          <div className="mb-5">
            <h3 className="text-xs text-white/40 uppercase tracking-wider mb-2">Symptoms</h3>
            <div className="flex flex-wrap gap-1.5">
              {traveler.symptoms.map((s) => (
                <span key={s} className="text-xs bg-white/10 text-white/70 px-2.5 py-1 rounded-md">{s}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              traveler.severity === "HIGH" ? "bg-red-500/20 text-red-300" :
              traveler.severity === "MEDIUM" ? "bg-yellow-500/20 text-yellow-300" :
              "bg-green-500/20 text-green-300"
            }`}>{traveler.severity}</span>
            <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-medium">{traveler.pathway}</span>
          </div>
        </div>

        {/* Right — Timeline */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-xs text-white/40 uppercase tracking-wider mb-4">Timeline</h3>
          <div className="space-y-1">
            {traveler.timeline.map((event, i) => {
              const status = STATUS_ICON[event.status] ?? STATUS_ICON.pending
              return (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] flex-shrink-0 ${status.style}`}>
                    {status.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white/80">{event.action}</div>
                    {event.detail && <div className="text-[11px] text-white/40 truncate">{event.detail}</div>}
                  </div>
                  <div className="text-[11px] text-white/30 flex-shrink-0">{event.time}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
