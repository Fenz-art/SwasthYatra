import { DEMO_CONVERSATIONS, DEMO_OUTCOMES } from "@/lib/demo-data"

export default function DoctorOS() {
  const conversation = DEMO_CONVERSATIONS[0]
  const outcomes = DEMO_OUTCOMES

  return (
    <div className="max-w-5xl mx-auto pt-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Doctor OS</h1>
        <p className="text-sm text-white/60">Dr. Kenji Sato — Tokyo Medical Clinic</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Inbox</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-cyan-400">3</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Active Assignments</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-white/80">1</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Completed Today</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-green-400">2</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Rating</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-medium text-yellow-400">4.8★</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-sm font-semibold text-white/80 mb-3">Active Assignment</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs"><span className="text-white/40">Patient</span><span className="text-white/80 font-medium">Sarah Johnson</span></div>
            <div className="flex justify-between text-xs"><span className="text-white/40">Issue</span><span className="text-white/80">Food Poisoning</span></div>
            <div className="flex justify-between text-xs"><span className="text-white/40">Language</span><span className="text-white/80">English</span></div>
            <div className="flex justify-between text-xs"><span className="text-white/40">Insurance</span><span className="text-white/80">Aetna Global</span></div>
          </div>
          <div className="border-t border-white/10 pt-3 mb-4">
            <div className="text-[11px] text-white/40 uppercase tracking-wider mb-2">Key Exchange</div>
            <div className="space-y-2">
              {conversation.messages.filter((m) => m.sender !== "system").map((msg, i) => (
                <div key={i} className={`text-xs p-2 rounded-lg ${
                  msg.sender === "patient" ? "bg-cyan-500/10 text-cyan-200 ml-8" : "bg-white/5 text-white/70 mr-8"
                }`}>
                  <span className="text-[10px] text-white/30 block">{msg.sender === "patient" ? "Patient" : "Clinic"} · {msg.time}</span>
                  {msg.content}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-lg text-sm font-medium hover:bg-emerald-500/30 transition cursor-default">
              Accept
            </button>
            <button className="flex-1 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-300/60 rounded-lg text-sm font-medium cursor-default">
              Decline
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-sm font-semibold text-white/80 mb-3">Interpreter Session</h3>
          <div className="text-[11px] text-white/40 uppercase tracking-wider mb-3">English ↔ Japanese</div>
          <div className="space-y-3">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-[10px] text-white/30 mb-1">English</div>
              <div className="text-xs text-white/80">&quot;I have severe stomach pain&quot;</div>
            </div>
            <div className="text-center text-white/20 text-xs">↓</div>
            <div className="bg-cyan-500/10 rounded-lg p-3 border border-cyan-500/20">
              <div className="text-[10px] text-cyan-300/60 mb-1">Japanese</div>
              <div className="text-xs text-cyan-200">激しい腹痛があります</div>
            </div>
            <div className="border-t border-white/10 pt-3">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-[10px] text-white/30 mb-1">Japanese Response</div>
                <div className="text-xs text-white/60">経口補水塩を服用してください</div>
              </div>
              <div className="text-center text-white/20 text-xs py-1">↓</div>
              <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                <div className="text-[10px] text-emerald-300/60 mb-1">English</div>
                <div className="text-xs text-emerald-200">&quot;Please take oral rehydration salts&quot;</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <h3 className="text-sm font-semibold text-white/80 mb-3">Recent Patients</h3>
        <div className="space-y-2">
          {outcomes.slice(1).map((o) => (
            <div key={o.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-lg">{o.travelerName === "Michael Chen" ? "🇹🇭" : "🇩🇪"}</span>
                <div>
                  <div className="text-sm text-white/80">{o.travelerName}</div>
                  <div className="text-[11px] text-white/40">{o.providerName} · {o.treatment}</div>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-300">{o.resolution}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
