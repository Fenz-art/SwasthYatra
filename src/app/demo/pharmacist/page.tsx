export default function PharmacistOS() {
  const requests = [
    { traveler: "Sarah Johnson", medication: "Oral Rehydration Salts", status: "Filled", time: "5 min ago" },
    { traveler: "Michael Chen", medication: "Antihistamine Cream", status: "Pending", time: "12 min ago" },
    { traveler: "Emma Schmidt", medication: "Salbutamol Inhaler", status: "Verified", time: "28 min ago" },
  ]

  return (
    <div className="max-w-5xl mx-auto pt-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pharmacist OS</h1>
        <p className="text-sm text-white/60">Medication Intelligence Dashboard</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Medication Requests</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-white/80">12</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Active Prescriptions</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-cyan-400">8</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Equivalents Available</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-green-400">156</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Interactions Checked</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-purple-400">342</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <h3 className="text-sm font-semibold text-white/80 mb-4">Medication Intelligence Demo</h3>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 mb-4">
          <span className="text-xs text-white/40">Search:</span>
          <span className="text-sm font-medium text-cyan-300">Tylenol</span>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <div className="text-[11px] text-white/40 uppercase tracking-wider mb-2">Active Ingredient</div>
            <div className="text-sm font-medium text-white/90">Acetaminophen</div>
            <div className="text-[10px] text-white/40 mt-1">Paracetamol</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <div className="text-[11px] text-white/40 uppercase tracking-wider mb-2">Japan Equivalent</div>
            <div className="text-sm font-medium text-cyan-300">Calonal</div>
            <div className="text-[10px] text-green-400 mt-1">Available OTC</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <div className="text-[11px] text-white/40 uppercase tracking-wider mb-2">Interactions</div>
            <div className="text-sm font-medium text-emerald-400">No critical interactions</div>
            <div className="text-[10px] text-white/40 mt-1">Safe with common medications</div>
          </div>
        </div>
        <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 flex items-start gap-2">
          <p className="text-xs text-yellow-300/80 leading-relaxed">
            Always verify local regulations. Paracetamol/Acetaminophen is available OTC in Japan at pharmacies.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <h3 className="text-sm font-semibold text-white/80 mb-3">Recent Requests</h3>
        <div className="space-y-2">
          {requests.map((req, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div>
                <div className="text-sm text-white/80">{req.traveler}</div>
                <div className="text-[11px] text-white/40">{req.medication}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                  req.status === "Filled" ? "bg-emerald-500/20 text-emerald-300" :
                  req.status === "Verified" ? "bg-blue-500/20 text-blue-300" :
                  "bg-yellow-500/20 text-yellow-300"
                }`}>{req.status}</span>
                <span className="text-[10px] text-white/30">{req.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
