import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default async function ProviderInbox() {
  const session = await auth()
  if (!session?.user) return null

  const conversations = await prisma.conversation.findMany({
    where: { providerId: session.user.id },
    include: {
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { lastMessageAt: "desc" },
  })

  const unreadCount = conversations.filter(
    (c) => c.messages[0]?.deliveryStatus !== "READ",
  ).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inbox</h1>
          <p className="text-muted-foreground">Patient messages and conversation threads.</p>
        </div>
        {unreadCount > 0 && (
          <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
            {unreadCount} unread
          </span>
        )}
      </div>

      {conversations.length === 0 ? (
        <Card className="p-12 text-center text-muted-foreground">
          <p className="text-lg font-medium mb-1">No conversations yet</p>
          <p className="text-sm">New patient inquiries will appear here when travelers search for providers.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {conversations.map((c) => {
            const lastMsg = c.messages[0]
            const isUnread = lastMsg?.deliveryStatus !== "READ"

            return (
              <Link key={c.id} href={`/provider/conversations/${c.id}`}>
                <Card className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${isUnread ? "border-l-4 border-l-primary" : ""}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium capitalize">{c.channel.toLowerCase()}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        c.status === "ACTIVE" ? "bg-green-100 text-green-700" :
                        c.status === "WAITING" ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>{c.status}</span>
                      {isUnread && <span className="h-2 w-2 rounded-full bg-primary" />}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {c.lastMessageAt?.toLocaleDateString() ?? "—"}
                    </span>
                  </div>
                  {lastMsg && (
                    <p className={`text-sm mt-2 truncate ${isUnread ? "font-medium" : "text-muted-foreground"}`}>
                      {lastMsg.content}
                    </p>
                  )}
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs px-2 py-1 rounded bg-green-50 text-green-700 hover:bg-green-100">
                      Accept
                    </span>
                    <span className="text-xs px-2 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100">
                      Decline
                    </span>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
