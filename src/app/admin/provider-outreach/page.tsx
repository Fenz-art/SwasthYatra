import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"

export default async function AdminProviderOutreach() {
  const session = await auth()
  if (!session?.user) return null

  const [attempts, leadStatusSummary] = await Promise.all([
    prisma.providerContactAttempt.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { lead: { select: { name: true, city: true, phone: true } } },
    }),
    prisma.providerLead.groupBy({ by: ["status"], _count: true }),
  ])

  const pendingContact = leadStatusSummary.find((s) => s.status === "NEW" || s.status === "QUALIFIED")
  const contactedCount = leadStatusSummary.find((s) => s.status === "CONTACTED")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Outreach Queue</h1>
        <p className="text-muted-foreground">Track and manage provider contact attempts.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="text-2xl font-bold">{pendingContact?._count ?? 0}</div>
          <div className="text-sm text-muted-foreground">Awaiting Contact</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{contactedCount?._count ?? 0}</div>
          <div className="text-sm text-muted-foreground">Currently Contacted</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{attempts.length}</div>
          <div className="text-sm text-muted-foreground">Recent Attempts</div>
        </Card>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="pb-3 font-medium">Provider</th>
              <th className="pb-3 font-medium">Channel</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Attempt</th>
              <th className="pb-3 font-medium">Sent</th>
              <th className="pb-3 font-medium">Delivered</th>
              <th className="pb-3 font-medium">Responded</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((a) => (
              <tr key={a.id} className="border-b hover:bg-muted/50">
                <td className="py-2.5 font-medium">{a.lead?.name ?? a.providerId.slice(0, 8)}</td>
                <td className="py-2.5">{a.channel}</td>
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    a.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                    a.status === "DELIVERED" ? "bg-blue-100 text-blue-700" :
                    a.status === "RESPONDED" ? "bg-green-100 text-green-700" :
                    a.status === "FAILED" ? "bg-red-100 text-red-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>{a.status}</span>
                </td>
                <td className="py-2.5 text-muted-foreground">{a.attemptNumber}/{a.maxAttempts}</td>
                <td className="py-2.5 text-muted-foreground">{a.sentAt?.toLocaleDateString() ?? "—"}</td>
                <td className="py-2.5 text-muted-foreground">{a.deliveredAt?.toLocaleDateString() ?? "—"}</td>
                <td className="py-2.5 text-muted-foreground">{a.respondedAt?.toLocaleDateString() ?? "—"}</td>
              </tr>
            ))}
            {attempts.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-muted-foreground">
                  No contact attempts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
