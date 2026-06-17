import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default async function ProviderDashboard() {
  const session = await auth()
  if (!session?.user) return null

  const [inboxCount, assignments, activeConversations] = await Promise.all([
    prisma.message.count({ where: { senderType: "PATIENT", deliveryStatus: "QUEUED" } }),
    prisma.providerAssignment.findMany({
      where: { providerId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.conversation.count({ where: { providerId: session.user.id, status: "ACTIVE" } }),
  ])

  const myAssignmentIds = assignments.map((a) => a.id)
  const myContactAttempts = await prisma.providerContactAttempt.findMany({
    where: { assignmentId: { in: myAssignmentIds } },
  })
  const myContactAttemptIds = myContactAttempts.map((c) => c.id)
  const responses = await prisma.providerResponse.findMany({
    where: { contactAttemptId: { in: myContactAttemptIds } },
    orderBy: { createdAt: "desc" },
    take: 5,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Provider Dashboard</h1>
        <p className="text-muted-foreground">Manage your assignments, availability, and patient communications.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="text-2xl font-bold">{inboxCount}</div>
          <div className="text-sm text-muted-foreground">Unread Messages</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{assignments.length}</div>
          <div className="text-sm text-muted-foreground">Recent Assignments</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{activeConversations}</div>
          <div className="text-sm text-muted-foreground">Active Conversations</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{responses.length}</div>
          <div className="text-sm text-muted-foreground">Your Responses</div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Assignments</h2>
          {assignments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No assignments yet.</p>
          ) : (
            <ul className="space-y-2">
              {assignments.map((a) => (
                <li key={a.id} className="text-sm border-b pb-2">
                  <Link href={`/provider/assignments`} className="hover:text-primary">
                    Assignment #{a.id.slice(0, 8)} — {a.status}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Responses</h2>
          {responses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No responses recorded.</p>
          ) : (
            <ul className="space-y-2">
              {responses.map((r) => (
                <li key={r.id} className="text-sm border-b pb-2">
                  {r.responseType} — {r.satisfied === true ? "SATISFIED" : r.satisfied === false ? "UNSATISFIED" : "PENDING"}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}
