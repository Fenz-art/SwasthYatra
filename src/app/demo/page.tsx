import { DEMO_ROLES } from "@/lib/demo-data"
import Link from "next/link"

const METRICS = [
  { value: "10,482", label: "Providers in Network" },
  { value: "32", label: "Countries" },
  { value: "241", label: "Active Travelers" },
  { value: "94%", label: "Assignment Success" },
  { value: "18m", label: "Avg Resolution" },
  { value: "91%", label: "Outcome Satisfaction" },
]

export default function DemoLanding() {
  return (
    <div className="max-w-5xl mx-auto pt-12 text-center">
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4 grid grid-cols-3 md:grid-cols-6 gap-4 text-center mb-12">
        {METRICS.map((m) => (
          <div key={m.label}>
            <div className="text-2xl font-bold text-cyan-300">{m.value}</div>
            <div className="text-xs text-white/50">{m.label}</div>
          </div>
        ))}
      </div>
      <div className="mb-4 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/50">
        Interactive Demo · 3-5 minutes
      </div>
      <h1 className="text-5xl font-bold mb-3">
        <span className="text-[#E6FBFF]">SwasthYatra</span>
      </h1>
      <p className="text-xl text-white/60 mb-2">Healthcare Navigation Layer for Global Travelers</p>
      <p className="text-sm text-white/40 mb-12 max-w-lg mx-auto">
        Trusted care options, real-time coordination, and clear journey progress
      </p>
      <h2 className="text-lg font-semibold text-white/80 mb-6">Choose Your Role</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {DEMO_ROLES.map((role) => (
          <Link key={role.id} href={role.route}
            className="group relative rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left hover:border-white/30 transition-all hover:bg-white/[0.06]"
          >
            <div className="text-2xl mb-2">{role.icon}</div>
            <div className="font-medium text-sm mb-1">{role.label}</div>
            <div className="text-xs text-white/40">{role.description}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
