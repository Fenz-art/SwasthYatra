import { DEMO_TRAVELERS } from "@/lib/demo-data"
import Link from "next/link"

export default function Demoscenarios() {
  return (
    <div className="max-w-5xl mx-auto pt-8">
      <h1 className="text-3xl font-bold mb-2">Demo Scenarios</h1>
      <p className="text-white/50 text-sm mb-8">Choose a scenario to begin the healthcare navigation journey</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {DEMO_TRAVELERS.map((t) => (
          <Link key={t.id} href={`/demo/agent-workspace?travelerId=${t.id}`}
            className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-cyan-400/50 transition-all hover:bg-white/[0.06]"
          >
            <div className="text-3xl mb-3">{t.flag}</div>
            <div className="font-medium text-sm">{t.name}</div>
            <div className="text-xs text-white/40 mb-2">{t.city}, {t.country}</div>
            <div className="text-sm font-medium text-cyan-300 mb-2">{t.issue}</div>
            <div className="flex flex-wrap gap-1 mb-3">
              {t.symptoms.slice(0, 2).map((s) => (
                <span key={s} className="text-[10px] bg-white/10 text-white/60 px-1.5 py-0.5 rounded">{s}</span>
              ))}
              {t.symptoms.length > 2 && (
                <span className="text-[10px] bg-white/10 text-white/40 px-1.5 py-0.5 rounded">+{t.symptoms.length - 2}</span>
              )}
            </div>
            <div className="flex gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                t.severity === "HIGH" ? "bg-red-500/20 text-red-300" :
                t.severity === "MEDIUM" ? "bg-yellow-500/20 text-yellow-300" :
                "bg-green-500/20 text-green-300"
              }`}>{t.severity}</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">{t.pathway}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
