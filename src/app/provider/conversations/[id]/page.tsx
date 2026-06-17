import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { notFound } from "next/navigation"

export default async function ProviderConversation({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await auth()
  if (!session?.user) return null

  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
      callSessions: { orderBy: { startedAt: "desc" } },
    },
  })

  if (!conversation || conversation.providerId !== session.user.id) {
    notFound()
  }

  const assignment = conversation.assignmentId
    ? await prisma.providerAssignment.findUnique({ where: { id: conversation.assignmentId } })
    : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Conversation</h1>
          <p className="text-muted-foreground capitalize">{conversation.channel.toLowerCase()} thread</p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full ${
          conversation.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
        }`}>{conversation.status}</span>
      </div>

      {assignment && (
        <Card className="p-4 border-l-4 border-l-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Assignment #{assignment.id.slice(0, 8)}</p>
              <p className="text-xs text-muted-foreground">Status: {assignment.status} · Priority: {assignment.priority}</p>
            </div>
            <div className="flex gap-2">
              {assignment.status === "PENDING" && (
                <>
                  <form action={`/api/assignments/${assignment.id}/accept`} method="POST">
                    <button className="text-xs px-3 py-1.5 rounded bg-green-600 text-white hover:bg-green-700">
                      Accept
                    </button>
                  </form>
                  <form action={`/api/assignments/${assignment.id}/decline`} method="POST">
                    <button className="text-xs px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-700">
                      Decline
                    </button>
                  </form>
                </>
              )}
              {assignment.status === "ACCEPTED" && (
                <form action={`/api/assignments/${assignment.id}/complete`} method="POST">
                  <button className="text-xs px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700">
                    Mark Complete
                  </button>
                </form>
              )}
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {conversation.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderType === "PROVIDER" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-lg rounded-lg px-4 py-2 ${
              msg.senderType === "PROVIDER"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium">{msg.senderType}</span>
                <span className="text-xs opacity-70">{msg.createdAt.toLocaleTimeString()}</span>
              </div>
              <p className="text-sm">{msg.content}</p>
              {msg.deliveryStatus && (
                <p className="text-xs mt-1 opacity-60">{msg.deliveryStatus}</p>
              )}
            </div>
          </div>
        ))}
        {conversation.messages.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">
            No messages yet. Reply to start the conversation.
          </Card>
        )}
      </div>

      <div className="border rounded-lg p-4">
        <textarea
          className="w-full min-h-[80px] border-0 resize-none focus:outline-none text-sm"
          placeholder="Type your response..."
        />
        <div className="flex justify-end mt-2">
          <button className="text-sm px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
