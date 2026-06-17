import Link from "next/link"

const PROBLEMS = [
  {
    icon: "01",
    title: "No Direction",
    desc: "Travelers get sick abroad with no idea where to go",
  },
  {
    icon: "02",
    title: "Language Barriers",
    desc: "Language barriers prevent effective care",
  },
  {
    icon: "03",
    title: "Disconnected",
    desc: "No system connects travelers to the right provider in real-time",
  },
]

const STEPS = [
  { num: 1, title: "Symptom Report", desc: "Traveler reports symptoms -> severity is assessed" },
  { num: 2, title: "Care Option Selection", desc: "Navigation Assistant searches and prioritizes providers by outcome probability" },
  { num: 3, title: "Assignment", desc: "Provider contacted via WhatsApp -> accepts assignment" },
  { num: 4, title: "Treatment", desc: "Interpreter enables communication -> treatment delivered" },
  { num: 5, title: "Outcome Recording", desc: "Outcome recorded -> provider and care outcomes are updated" },
]

const NODES = [
  { emoji: "01", label: "Traveler" },
  { emoji: "02", label: "Navigation Assistant" },
  { emoji: "03", label: "Provider Network" },
  { emoji: "04", label: "Communication Layer" },
  { emoji: "05", label: "Provider OS" },
  { emoji: "06", label: "Care Outcomes" },
]

const MOATS = [
  {
    title: "Provider Network Learning",
    desc: "Every interaction improves provider ranking. More usage = better recommendations.",
  },
  {
    title: "Care Outcome Learning",
    desc: "Treatment outcomes are tracked and fed back into the system. We learn what works, where.",
  },
  {
    title: "Network Effects",
    desc: "More travelers attract more providers. More providers attract more travelers. Data moat grows with every journey.",
  },
]

const IMPACTS = [
  { stat: "10,482", label: "Providers onboarded" },
  { stat: "241", label: "Travelers protected" },
  { stat: "18m", label: "Average resolution time" },
  { stat: "91%", label: "Outcome satisfaction" },
]

export default function PitchPage() {
  return (
    <div className="max-w-4xl mx-auto pt-4">
      {/* 1. Hero */}
      <section className="text-center mb-16 mt-12">
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text mb-3">
          SwasthYatra
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-6">
          Healthcare Navigation Layer for Global Travelers
        </p>
        <p className="text-sm text-white/50 tracking-wide">
          10,482 providers · 32 countries · 241 travelers protected · 94% assignment success
        </p>
      </section>

      {/* 2. Problem */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">The Problem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded border border-white/15 bg-white/[0.04] text-[10px] font-mono text-white/60">{p.icon}</div>
              <h3 className="font-bold text-white text-sm mb-1">{p.title}</h3>
              <p className="text-sm text-white/60">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Solution */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">The Solution</h2>
        <p className="text-base text-white/70 leading-relaxed max-w-3xl">
          SwasthYatra is a healthcare navigation layer that connects travelers to the right
          provider through a proactive navigation assistant, coordinates care via WhatsApp/voice, records outcomes,
          and continuously learns from every interaction to improve future recommendations.
        </p>
      </section>

      {/* 4. How It Works */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">How It Works</h2>
        <div className="relative pl-10">
          {STEPS.map((step, i) => (
            <div key={step.num} className="relative pb-10 last:pb-0">
              {i < STEPS.length - 1 && (
                <div className="absolute left-[17px] top-10 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 to-white/10" />
              )}
              <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-sm font-bold text-cyan-300">
                {step.num}
              </div>
              <div className="pl-6">
                <h3 className="font-bold text-white text-sm mb-0.5">{step.title}</h3>
                <p className="text-sm text-white/50">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Architecture */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Architecture</h2>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {NODES.map((node, i) => (
            <div key={node.label} className="flex items-center gap-1">
              <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-center flex-shrink-0">
                <div className="text-[10px] font-mono text-white/60">{node.emoji}</div>
                <div className="text-[10px] text-white/50 whitespace-nowrap">{node.label}</div>
              </div>
              {i < NODES.length - 1 && (
                <span className="text-white/30 text-xs flex-shrink-0">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. Moat */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">The Moat</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOATS.map((m) => (
            <div key={m.title} className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.03] p-4">
              <h3 className="font-bold text-cyan-300 text-sm mb-1">{m.title}</h3>
              <p className="text-sm text-white/60">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Impact */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {IMPACTS.map((item) => (
            <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
              <div className="text-3xl font-bold text-cyan-300 mb-1">{item.stat}</div>
              <div className="text-sm text-white/50">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Call to Action */}
      <section className="text-center pb-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/demo/scenarios"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
          >
            Explore the full demo →
          </Link>
          <Link
            href="/demo/judge"
            className="px-6 py-3 rounded-xl border border-white/20 text-white/70 font-semibold text-sm hover:bg-white/[0.05] hover:text-white transition-all"
          >
            Or open Judge Mode for a guided tour →
          </Link>
        </div>
      </section>
    </div>
  )
}
