import { DEMO_CONVERSATIONS } from "@/lib/demo-data"

const STATUS_COLORS: Record<string, string> = {
  completed: "text-green-400 bg-green-500/20",
  pending: "text-yellow-400 bg-yellow-500/20",
  active: "text-cyan-400 bg-cyan-500/20",
}

const STATUS_BUBBLE: Record<string, string> = {
  sent: "text-white/30",
  delivered: "text-white/50",
  read: "text-cyan-400",
  pending: "text-yellow-400/70",
  completed: "text-green-400",
}

function ConversationCard({ convId }: { convId: string }) {
  const conv = DEMO_CONVERSATIONS.find((c) => c.id === convId)
  if (!conv) return null

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div>
          <h3 className="font-medium text-sm">{conv.providerName}</h3>
          <p className="text-xs text-white/40">{conv.travelerName}</p>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[conv.status] ?? "text-white/40 bg-white/10"}`}>
          {conv.status}
        </span>
      </div>

      {/* Messages */}
      <div className="space-y-2.5 flex-1">
        {conv.messages.map((msg, i) => {
          const isSystem = msg.sender === "system"
          const isClinic = msg.sender === "clinic"
          const isPatient = msg.sender === "patient"

          if (isSystem) {
            return (
              <div key={i} className="flex items-center justify-between">
                <p className="text-xs text-white/40 italic">{msg.content}</p>
                {msg.status && (
                  <span className={`text-[10px] ml-2 flex-shrink-0 ${STATUS_BUBBLE[msg.status] ?? "text-white/30"}`}>
                    {msg.status === "sent" ? "✓" : msg.status === "delivered" ? "✓✓" : msg.status === "read" ? "✓✓" : msg.status}
                  </span>
                )}
              </div>
            )
          }

          const bubbleStyle = isClinic
            ? "bg-cyan-500/20 text-cyan-200 ml-8 rounded-tl-md"
            : isPatient
            ? "bg-white/10 text-white/70 mr-8 rounded-tr-md"
            : "bg-white/10 text-white/70"

          return (
            <div key={i} className={`flex flex-col ${isClinic ? "items-end" : "items-start"}`}>
              <div className={`max-w-[85%] px-3 py-2 rounded-lg text-xs leading-relaxed ${bubbleStyle}`}>
                {msg.content}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-white/20">{msg.time}</span>
                {msg.status && (
                  <span className={`text-[10px] ${STATUS_BUBBLE[msg.status] ?? "text-white/20"}`}>
                    {msg.status === "sent" ? "✓" : msg.status === "delivered" ? "✓✓" : msg.status === "read" ? "✓✓" : msg.status}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function DemoCommunication() {
  const allMessages = DEMO_CONVERSATIONS.flatMap((c) => c.messages)
  const delivered = allMessages.filter((m) => m.status === "delivered" || m.status === "read").length
  const read = allMessages.filter((m) => m.status === "read" || m.status === "completed").length
  const responses = allMessages.filter((m) => m.sender === "patient" || m.sender === "clinic").length

  return (
    <div className="max-w-5xl mx-auto pt-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Communication</h1>
        <p className="text-sm text-white/50 mt-1">WhatsApp outreach simulation &mdash; real-time provider messaging</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ConversationCard convId="conv-1" />
        <ConversationCard convId="conv-3" />
      </div>

      {/* Communication Network Summary */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <h3 className="text-xs text-white/40 uppercase tracking-wider mb-4">Communication Network</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold text-white">3</div>
            <div className="text-xs text-white/40 mt-1">Outreach Attempts</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{delivered}</div>
            <div className="text-xs text-white/40 mt-1">Delivered</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{read}</div>
            <div className="text-xs text-white/40 mt-1">Read</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{responses}</div>
            <div className="text-xs text-white/40 mt-1">Responses</div>
          </div>
        </div>
      </div>
    </div>
  )
}
