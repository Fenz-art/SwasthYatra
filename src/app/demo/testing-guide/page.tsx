import Link from "next/link"

const items = [
  { step: 1, title: "Open Patient OS", href: "/demo/patient", desc: "View the traveler's dashboard with active journey and timeline" },
  { step: 2, title: "Start Journey", href: "/demo/scenarios", desc: "Choose the Tokyo food poisoning scenario" },
  { step: 3, title: "Watch Assistant Activity", href: "/demo/agent-workspace", desc: "Press Start and watch the assistant complete 13 coordination steps" },
  { step: 4, title: "Open Doctor OS", href: "/demo/doctor", desc: "See the provider inbox with Sarah's case" },
  { step: 5, title: "Accept Assignment", href: "/demo/doctor", desc: "Click Accept and view the interpreter session" },
  { step: 6, title: "View Organization OS", href: "/demo/organization", desc: "See Aetna Global's enterprise dashboard with 241 travelers" },
  { step: 7, title: "Review Outcome", href: "/demo/outcome", desc: "Treatment recorded, care outcomes updated, journey complete" },
  { step: 8, title: "Explore Architecture", href: "/demo/architecture", desc: "Understand how coordinated care layers work together" },
  { step: 9, title: "Explore Documentation", href: "/demo/docs", desc: "Review API, SDK, and workflow documentation" },
]

const minutes = [
  { num: 1, text: "Traveler gets sick in Tokyo" },
  { num: 2, text: "Navigation Assistant coordinates workflow" },
  { num: 3, text: "Provider accepts request" },
  { num: 4, text: "Interpreter enables communication" },
  { num: 5, text: "Outcome recorded - care outcomes updated - system improves" },
]

export default function TestingGuide() {
  return (
    <div className="max-w-5xl mx-auto pt-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Testing Guide</h1>
        <p className="text-sm text-white/60 mt-1">What judges should test — 4-5 minute tour</p>
      </div>

      {/* Checklist */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 mb-8">
        {items.map((item) => (
          <div key={item.step} className="border-b border-white/10 pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 flex-shrink-0 mt-0.5 border-2 border-white/20 rounded" />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-white/40">{item.step}.</span>
                  <span className="text-sm font-semibold text-white">{item.title}</span>
                </div>
                <p className="text-xs text-white/60 mt-0.5">{item.desc}</p>
              </div>
              <Link href={item.href} className="text-sm text-cyan-400 hover:text-cyan-300 transition flex-shrink-0 mt-1">
                →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Demo Narrative */}
      <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6">
        <h2 className="text-sm font-semibold text-white/80 mb-4">Demo Narrative — 5 Minute Pitch</h2>
        <div className="space-y-2">
          {minutes.map((m) => (
            <div key={m.num} className="flex items-start gap-3">
              <span className="text-xs font-mono text-cyan-400 w-20 flex-shrink-0">Minute {m.num}:</span>
              <span className="text-sm text-white/70">{m.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
