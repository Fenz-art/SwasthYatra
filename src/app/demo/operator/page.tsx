export default function OperatorOS() {
  const activityLog = [
    { time: "09:14", event: "Outcome recorded for Sarah Johnson (Tokyo Medical Clinic)" },
    { time: "09:12", event: "Treatment received for Sarah Johnson" },
    { time: "09:08", event: "Assignment accepted by Tokyo Medical Clinic" },
    { time: "09:07", event: "WhatsApp message delivered to Tokyo Medical Clinic" },
    { time: "09:05", event: "Provider search completed (24 results for Tokyo)" },
  ]

  return (
    <div className="max-w-5xl mx-auto pt-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Operator OS</h1>
        <p className="text-sm text-white/60">Operations center for live journey coordination</p>
      </div>

      <div className="grid grid-cols-5 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Active Journeys</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-cyan-400">3</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Pending Outreach</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-yellow-400">1</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Failed Assignments</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-emerald-400">0</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Escalations</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-emerald-400">0</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Avg Response</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-white/80">2.4m</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-white/80 font-medium">No active escalations</p>
          <p className="text-xs text-white/40 mt-1">All journeys are moving normally</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-white/80 font-medium">No failed assignments</p>
          <p className="text-xs text-white/40 mt-1">Provider network healthy</p>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <h3 className="text-sm font-semibold text-white/80 mb-3">Activity Log</h3>
        <div className="space-y-1">
          {activityLog.map((entry, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
              <span className="text-[11px] text-white/40 font-mono min-w-[40px] pt-0.5">{entry.time}</span>
              <span className="text-sm text-white/70">{entry.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
