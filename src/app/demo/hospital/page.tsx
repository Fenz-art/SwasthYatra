export default function HospitalOS() {
  return (
    <div className="max-w-5xl mx-auto pt-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Hospital OS</h1>
        <p className="text-sm text-white/60">Tokyo Medical Center — Network Dashboard</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Incoming Cases</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-cyan-400">3</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Active Doctors</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-emerald-400">12</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Bed Capacity</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-yellow-400">68%</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Interpreter Requests</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-white/80">2</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-sm font-semibold text-white/80 mb-3">Incoming Cases</h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-white/80 font-medium">Sarah Johnson</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">Doctor Assigned</span>
              </div>
              <div className="text-xs text-white/40">Food Poisoning</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-white/80 font-medium">Michael Chen</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300">Interpreter Ready</span>
              </div>
              <div className="text-xs text-white/40">Skin Rash</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-white/80 font-medium">Emma Schmidt</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/50">Awaiting Assignment</span>
              </div>
              <div className="text-xs text-white/40">Medication Refill</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-sm font-semibold text-white/80 mb-3">Emergency Queue</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300">HIGH</span>
                <div>
                  <div className="text-sm text-white/80">Emma Schmidt</div>
                  <div className="text-[11px] text-white/40">Inhaler refill needed</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300">MEDIUM</span>
                <div>
                  <div className="text-sm text-white/80">Sarah Johnson</div>
                  <div className="text-[11px] text-white/40">Rehydration therapy</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white/10 text-white/50">LOW</span>
                <div>
                  <div className="text-sm text-white/80">Michael Chen</div>
                  <div className="text-[11px] text-white/40">Dermatology consult</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Provider Network</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-white/80">156 connected</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Interpreter Sessions</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-cyan-400">4 active</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Avg Response Time</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-emerald-400">2.4 min</span>
          </div>
        </div>
      </div>
    </div>
  )
}
