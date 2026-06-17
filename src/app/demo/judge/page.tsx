import Link from "next/link"

const STEPS = [
  { num: 1, title: "Start Patient Journey", route: "/demo/scenarios", desc: "Choose a traveler scenario to begin" },
  { num: 2, title: "Watch Assistant Execute", route: "/demo/agent-workspace", desc: "Navigation Assistant assesses, searches, outreaches, and assigns in real-time" },
  { num: 3, title: "View Doctor Side", route: "/demo/doctor", desc: "See the provider inbox, accept assignment, and treat the patient" },
  { num: 4, title: "View Pharmacist Side", route: "/demo/pharmacist", desc: "Medication intelligence and prescription management" },
  { num: 5, title: "View Organization Side", route: "/demo/organization", desc: "Enterprise overview of travelers, cases, and outcomes" },
  { num: 6, title: "View Outcome", route: "/demo/outcome", desc: "Treatment recorded, care outcomes updated, journey complete" },
  { num: 7, title: "Review Documentation", route: "/demo/docs", desc: "Architecture, SDK, API, and workflow documentation" },
]

export default function JudgePage() {
  return (
    <div className="max-w-5xl mx-auto pt-4">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Judge Mode</h1>
        <p className="text-sm text-white/50 mt-1">Guided tour &mdash; 4-5 minutes</p>
      </div>

      <div className="relative">
        {STEPS.map((step, i) => (
          <div key={step.num} className="flex gap-5 pb-8 last:pb-0">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full border-2 border-cyan-400 bg-cyan-500/10 flex items-center justify-center text-sm font-bold text-cyan-300 flex-shrink-0">
                {step.num}
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-px flex-1 mt-2 bg-gradient-to-b from-cyan-500/40 to-white/10" />
              )}
            </div>
            <div className="flex-1 pb-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-cyan-400/30 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-white/50">{step.desc}</p>
                  </div>
                  <Link
                    href={step.route}
                    className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-white/20 text-xs text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all"
                  >
                    View &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
