export default function JudgeScriptPage() {
  const minutes = [
    {
      n: 1,
      title: "The Problem",
      accent: "from-red-500",
      paragraphs: [
        "Imagine you're a traveler in Tokyo. You wake up with severe food poisoning. You don't speak Japanese. You don't know which doctor to trust. You don't know whether your insurance is accepted. You don't know what medication is available locally. Most solutions either give generic advice or show a list of nearby providers. Neither solves the problem.",
      ],
      note: "Open /demo/patient to see the traveler's perspective",
    },
    {
      n: 2,
      title: "The Navigation Assistant",
      accent: "from-cyan-500",
      paragraphs: [
        "Open Agent Workspace. The Navigation Assistant doesn't just answer questions. It coordinates care. Watch the execution timeline: assesses severity, selects the right pathway, searches providers, prioritizes care options, contacts providers, creates an assignment, and opens the conversation.",
      ],
      note: "Open /demo/agent-workspace and press Start Execution",
    },
    {
      n: 3,
      title: "The Provider Network",
      accent: "from-emerald-500",
      paragraphs: [
        "Open Communication. The agent reaches real providers through WhatsApp and phone channels. This is not a provider directory. It is a provider coordination network. Providers can accept, decline, or respond directly. Assignments are created automatically.",
      ],
      note: "Open /demo/communication to see WhatsApp outreach",
    },
    {
      n: 4,
      title: "The Human Layer",
      accent: "from-purple-500",
      paragraphs: [
        "Open Doctor OS. The same journey appears from the provider perspective. The doctor receives context, language information, and interpreter support. Open Interpreter Session. The patient speaks English. The doctor speaks Japanese. The platform bridges the communication gap.",
      ],
      note: "Open /demo/doctor to see the provider's view",
    },
    {
      n: 5,
      title: "The Learning System",
      accent: "from-amber-500",
      paragraphs: [
        "Open Outcome. When treatment is completed, care outcomes, provider performance, and medication guidance all update. Every journey improves future recommendations.",
      ],
      note: "Open /demo/outcome to see the recorded outcome",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto pt-4 px-4">
      <h1 className="text-3xl font-bold mb-2">Judge Demo Script</h1>
      <p className="text-sm text-white/50 mb-8">
        5-minute narrated tour — Read this aloud while navigating the demo
      </p>

      {minutes.map((m) => (
        <div
          key={m.n}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-6 mb-6"
        >
          <div className="flex gap-4">
            <div className={`w-1 shrink-0 rounded-full bg-gradient-to-b ${m.accent}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold bg-gradient-to-br ${m.accent} text-white`}
                >
                  {m.n}
                </span>
                <h2 className="text-lg font-semibold text-white">
                  Minute {m.n} — {m.title}
                </h2>
              </div>
              {m.paragraphs.map((p, i) => (
                <p key={i} className="text-white/60 leading-relaxed mb-3 last:mb-0">
                  {p}
                </p>
              ))}
              <p className="text-white/40 text-sm mt-4">{m.note}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/[0.05] p-8 text-center mb-10">
        <h2 className="text-xl font-bold text-white mb-3">Closing Statement</h2>
        <p className="text-white/60 leading-relaxed max-w-2xl mx-auto">
          SwasthYatra is not a chatbot. It is not a provider directory. It is a
          healthcare coordination network connecting travelers, providers,
          hospitals, organizations, operators, and navigation assistants through a unified
          operating system.
        </p>
      </div>
    </div>
  );
}
