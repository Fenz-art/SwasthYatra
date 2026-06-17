import { DEMO_OUTCOMES } from "@/lib/demo-data"

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? "text-yellow-400" : "text-white/20"}>★</span>
      ))}
    </div>
  )
}

const outcomeUpdates = [
  { label: "Provider performance updated", detail: "Tokyo Medical Clinic +5 outcome score", time: "09:15" },
  { label: "Care outcome recorded", detail: "Food Poisoning -> Recovered (6h)", time: "09:15" },
  { label: "Medication guidance improved", detail: "Oral Rehydration Therapy efficacy confirmed", time: "09:16" },
]

export default function DemoOutcome() {
  const outcome = DEMO_OUTCOMES[0]

  return (
    <div className="max-w-5xl mx-auto pt-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Outcome Recorded</h1>
        <p className="text-sm text-white/50 mt-1">Treatment outcome captured and learning signals updated</p>
      </div>

      {/* Outcome Card */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">Treatment</h3>
            <p className="text-base font-medium text-cyan-300">{outcome.treatment}</p>

            <h3 className="text-xs text-white/40 uppercase tracking-wider mt-5 mb-3">Resolution</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-400 font-medium">{outcome.resolution}</span>
            </div>

            <h3 className="text-xs text-white/40 uppercase tracking-wider mt-5 mb-3">Symptoms Resolved</h3>
            <div className="flex flex-wrap gap-1.5">
              {outcome.symptoms.map((s) => (
                <span key={s} className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded-md line-through decoration-white/30">{s}</span>
              ))}
            </div>
          </div>

          <div className="md:border-l md:border-white/10 md:pl-6">
            <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">Patient Rating</h3>
            <StarRating rating={outcome.rating} />

            <h3 className="text-xs text-white/40 uppercase tracking-wider mt-5 mb-2">Recovery Time</h3>
            <p className="text-2xl font-bold text-white">{outcome.recoveryHours} <span className="text-sm font-normal text-white/40">hours</span></p>

            <h3 className="text-xs text-white/40 uppercase tracking-wider mt-5 mb-2">Provider</h3>
            <p className="text-sm text-white/70">{outcome.providerName}</p>

            <h3 className="text-xs text-white/40 uppercase tracking-wider mt-5 mb-2">Traveler</h3>
            <p className="text-sm text-white/70">{outcome.travelerName}</p>
          </div>
        </div>
      </div>

      {/* Outcome Updates */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 mb-6">
        <h3 className="text-xs text-white/40 uppercase tracking-wider mb-4">Learning Updates</h3>
        <div className="space-y-3">
          {outcomeUpdates.map((update, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-[10px] flex-shrink-0">✓</span>
              <div className="flex-1">
                <span className="text-white/80 font-medium">{update.label}</span>
                <span className="text-white/50 ml-1">&mdash; {update.detail}</span>
              </div>
              <span className="text-[11px] text-white/30 flex-shrink-0">{update.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Journey Complete */}
      <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-6">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-semibold text-green-300">Journey Complete</h3>
            <p className="text-sm text-white/60 mt-1">
              Full loop executed for {outcome.travelerName}: triage, provider selection, WhatsApp outreach, treatment, outcome recording, and network learning update.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
