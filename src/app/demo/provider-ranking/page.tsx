import { DEMO_PROVIDERS } from "@/lib/demo-data"

export default function DemoProviderRanking() {
  const providers = DEMO_PROVIDERS.filter((p) => p.city === "Tokyo").sort((a, b) => b.score - a.score)

  return (
    <div className="max-w-5xl mx-auto pt-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Recommended Care Options</h1>
        <p className="text-sm text-white/50 mt-1">
          Best outcome probability, not nearest &mdash; Tokyo &middot; {providers.length} providers ranked
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
        {providers.map((provider, i) => (
          <div
            key={provider.id}
            className={`rounded-xl border p-5 transition ${
              i === 0
                ? "border-cyan-400/60 bg-cyan-500/5"
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            <div className="flex items-center gap-5">
              {/* Rank */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 ${
                i === 0 ? "bg-cyan-500 text-black" : "bg-white/10 text-white/60"
              }`}>
                {i + 1}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-semibold ${i === 0 ? "text-cyan-300" : "text-white"}`}>{provider.name}</h3>
                  <span className={`text-2xl font-bold tabular-nums ${i === 0 ? "text-cyan-400" : "text-white/70"}`}>
                    {provider.score}
                  </span>
                </div>

                {/* Score bar */}
                <div className="w-full h-1.5 bg-white/10 rounded-full mb-3 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#00E5FF]"
                    style={{ width: `${provider.score}%` }}
                  />
                </div>

                {/* Reasons */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
                  {provider.reasons.map((r, ri) => (
                    <span key={ri}>{r}</span>
                  ))}
                </div>

                {/* Price */}
                <div className="text-xs text-white/40 mt-1.5">
                  {provider.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explanation card */}
      <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-sm text-white/60 leading-relaxed">
          Care options are prioritized using recovery history, language compatibility, availability, and insurance support &mdash; not only distance.
        </p>
      </div>
    </div>
  )
}
