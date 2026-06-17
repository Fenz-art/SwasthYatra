const comparisonRows = [
  {
    traditional: "Answers questions",
    swasth: "Coordinates care",
  },
  {
    traditional: "No provider network",
    swasth: "Provider network (156 connected)",
  },
  {
    traditional: "No communication layer",
    swasth: "WhatsApp + Voice",
  },
  {
    traditional: "No assignment system",
    swasth: "Provider assignment & scheduling",
  },
  {
    traditional: "No outcome tracking",
    swasth: "Care outcomes (learns & improves)",
  },
  {
    traditional: "No human escalation",
    swasth: "Operator OS (escalation layer)",
  },
]

const cards = [
  {
    icon: "01",
    title: "Healthcare Navigation Layer",
    color: "from-cyan-400 to-blue-500",
    description:
      "Routes travelers to the right care pathway based on symptoms, severity, and context. Acts as the intelligent triage layer.",
  },
  {
    icon: "02",
    title: "Provider Network",
    color: "from-emerald-400 to-teal-500",
    description:
      "Connects to 150+ vetted providers across 14 countries. Real-time availability, insurance matching, and language filtering.",
  },
  {
    icon: "03",
    title: "Communication Network",
    color: "from-amber-400 to-orange-500",
    description:
      "Multi-channel outreach via WhatsApp, voice, and SMS. Delivery tracking, read receipts, and automated fallbacks.",
  },
  {
    icon: "04",
    title: "Medication Guide Network",
    color: "from-rose-400 to-pink-500",
    description:
      "Global medication intelligence. Maps brand names to active ingredients across countries. Finds local equivalents instantly.",
  },
  {
    icon: "05",
    title: "Care Outcomes",
    color: "from-violet-400 to-purple-500",
    description:
      "Records treatment outcomes and feeds learnings back into the ranking system. Every interaction improves future recommendations.",
  },
  {
    icon: "06",
    title: "Navigation Assistant",
    color: "from-sky-400 to-indigo-500",
    description:
      "Autonomous assistants execute the full navigation workflow with resilient task handling and clear progress states.",
  },
  {
    icon: "07",
    title: "Human Escalation Layer",
    color: "from-red-400 to-rose-500",
    description:
      "When agents fail, cases automatically route to human operators. Escalation queue with context and traveler timeline.",
  },
]

export default function DemoArchitecture() {
  return (
    <div className="max-w-5xl mx-auto pt-4">
      {/* Why Not ChatGPT? */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">Why Not ChatGPT?</h2>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-white/10">
            <div className="p-3 text-xs uppercase tracking-wider text-white/40 text-center bg-white/[0.02]">
              Traditional Assistant
            </div>
            <div className="p-3 text-xs uppercase tracking-wider text-cyan-400 text-center bg-white/[0.02]">
              SwasthYatra
            </div>
          </div>
          {comparisonRows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10"
            >
              <div className="p-3 text-sm text-white/30">{row.traditional}</div>
              <div className="p-3 text-sm text-cyan-300">{row.swasth}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Explorer */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Architecture Explorer</h1>
        <p className="text-sm text-white/50 mt-1">
          The subsystems that power the healthcare navigation layer
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {cards.map((card, i) => (
          <div key={i} className="relative flex rounded-xl border border-white/10 bg-white/[0.03] p-5 overflow-hidden">
            <div
              className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${card.color} rounded-l-xl`}
            />
            <div className="pl-4 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded border border-white/15 bg-white/[0.04] text-[10px] font-mono text-white/60">{card.icon}</span>
                <h3 className="text-sm font-semibold text-white/90">{card.title}</h3>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Final Takeaway */}
      <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-8 text-center">
        <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
          <span className="text-cyan-300 font-semibold">SwasthYatra</span>
          {" — "}Healthcare Navigation Layer — Connects Travelers · Doctors · Pharmacists · Hospitals · Organizations · Operators · Navigation Assistants through a unified operating system. Not a chatbot. Not a provider directory. A healthcare coordination network.
        </p>
      </div>

      {/* Why We Win */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-2">Why We Win</h2>
        <p className="text-sm text-white/50 mb-6">SwasthYatra vs the alternatives</p>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden max-w-4xl mx-auto">
          {/* Header */}
          <div className="grid bg-white/[0.06]" style={{ gridTemplateColumns: '2fr 1fr 1fr 2fr' }}>
            <div className="p-3 text-xs uppercase tracking-wider text-white/50">Solution</div>
            <div className="p-3 text-xs uppercase tracking-wider text-white/50 text-center">ChatGPT</div>
            <div className="p-3 text-xs uppercase tracking-wider text-white/50 text-center">Doctor Directory</div>
            <div className="p-3 text-xs uppercase tracking-wider text-cyan-400 text-center font-semibold">SwasthYatra</div>
          </div>
          {/* Rows */}
          {[
            { solution: "Guided Triage", chatgpt: "Yes", directory: "No", swasth: "Yes" },
            { solution: "Provider Network", chatgpt: "No", directory: "Yes", swasth: "Yes" },
            { solution: "WhatsApp Outreach", chatgpt: "No", directory: "No", swasth: "Yes" },
            { solution: "Live Interpreter", chatgpt: "No", directory: "No", swasth: "Yes" },
            { solution: "Outcome Tracking", chatgpt: "No", directory: "No", swasth: "Yes" },
            { solution: "Human Escalation", chatgpt: "No", directory: "No", swasth: "Yes" },
            { solution: "Learning System", chatgpt: "No", directory: "No", swasth: "Yes" },
          ].map((row, i) => (
            <div key={i} className="grid border-t border-white/10" style={{ gridTemplateColumns: '2fr 1fr 1fr 2fr' }}>
              <div className="p-3 text-sm text-white/80">{row.solution}</div>
              <div className="p-3 text-sm text-center">
                <span className={row.chatgpt === "Yes" ? "text-green-400" : "text-red-400"}>{row.chatgpt}</span>
              </div>
              <div className="p-3 text-sm text-center">
                <span className={row.directory === "Yes" ? "text-green-400" : "text-red-400"}>{row.directory}</span>
              </div>
              <div className="p-3 text-sm text-center bg-cyan-500/5">
                <span className="text-cyan-400 font-semibold">{row.swasth}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
