import { DEMO_ORGANIZATION, DEMO_TRAVELERS, DEMO_OUTCOMES, DEMO_PROVIDERS } from "@/lib/demo-data"

export default function OrganizationOS() {
  const org = DEMO_ORGANIZATION

  return (
    <div className="max-w-5xl mx-auto pt-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Organization OS</h1>
        <p className="text-sm text-white/60">Aetna Global — Enterprise Dashboard</p>
      </div>

      <div className="grid grid-cols-5 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Travelers Protected</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-cyan-400">{org.travelers}</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Active Cases</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-yellow-400">{org.activeCases}</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Resolved Cases</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-emerald-400">{org.resolvedCases}</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Avg Resolution</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-white/80">{org.avgResolution}</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Network Providers</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-white/80">{org.networkProviders}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white/80 mb-3">Active Travelers</h3>
        <div className="grid grid-cols-3 gap-3">
          {DEMO_TRAVELERS.slice(0, 3).map((t, i) => {
            const statuses = ["In Progress", "Resolved", "In Progress"]
            const statusColors = ["bg-cyan-500/20 text-cyan-300", "bg-emerald-500/20 text-emerald-300", "bg-cyan-500/20 text-cyan-300"]
            return (
              <div key={t.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{t.flag}</span>
                  <span className="text-sm font-medium text-white/80">{t.name}</span>
                </div>
                <div className="text-xs text-white/40 mb-2">{t.city}, {t.country}</div>
                <div className="text-xs text-white/60 mb-3">{t.issue}</div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${statusColors[i]}`}>{statuses[i]}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-sm font-semibold text-white/80 mb-3">Outcome Analytics</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="text-white/40 border-b border-white/10">
                <th className="text-left font-medium pb-2">Traveler</th>
                <th className="text-left font-medium pb-2">Treatment</th>
                <th className="text-left font-medium pb-2">Resolution</th>
                <th className="text-right font-medium pb-2">Rating</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_OUTCOMES.map((o) => (
                <tr key={o.id} className="border-b border-white/5">
                  <td className="py-2 text-white/80">{o.travelerName}</td>
                  <td className="py-2 text-white/60 max-w-[140px] truncate">{o.treatment}</td>
                  <td className="py-2">
                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">{o.resolution}</span>
                  </td>
                  <td className="py-2 text-right text-yellow-400">{'★'.repeat(o.rating)}{'☆'.repeat(5 - o.rating)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-sm font-semibold text-white/80 mb-3">Provider Network</h3>
          <div className="space-y-3">
            {DEMO_PROVIDERS.slice(0, 3).map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div>
                  <div className="text-sm text-white/80">{p.name}</div>
                  <div className="text-[11px] text-white/40">{p.city} · {p.specialty}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-yellow-400">{p.score}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
