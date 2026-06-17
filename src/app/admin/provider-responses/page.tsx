import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"

export default async function AdminProviderResponses() {
  const session = await auth()
  if (!session?.user) return null

  const responses = await prisma.providerResponse.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { contactAttempt: { include: { lead: { select: { name: true, city: true } } } } },
  })

  const satisfied = responses.filter((r) => r.satisfied === true).length
  const unsatisfied = responses.filter((r) => r.satisfied === false).length
  const pending = responses.filter((r) => r.satisfied === null).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Provider Responses</h1>
        <p className="text-muted-foreground">Incoming responses from contacted providers.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">{satisfied}</div>
          <div className="text-sm text-muted-foreground">Positive</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600">{unsatisfied}</div>
          <div className="text-sm text-muted-foreground">Negative</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-yellow-600">{pending}</div>
          <div className="text-sm text-muted-foreground">Pending Review</div>
        </Card>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="pb-3 font-medium">Provider</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Intent</th>
              <th className="pb-3 font-medium">Response</th>
              <th className="pb-3 font-medium">Satisfied</th>
              <th className="pb-3 font-medium">Response Time</th>
              <th className="pb-3 font-medium">Received</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((r) => (
              <tr key={r.id} className="border-b hover:bg-muted/50">
                <td className="py-2.5 font-medium">{r.contactAttempt?.lead?.name ?? r.contactAttemptId.slice(0, 8)}</td>
                <td className="py-2.5 text-muted-foreground">{r.responseType}</td>
                <td className="py-2.5 text-muted-foreground">{r.intent ?? "—"}</td>
                <td className="py-2.5 max-w-xs truncate text-muted-foreground">{r.responseText ?? "—"}</td>
                <td className="py-2.5">
                  {r.satisfied === true ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : r.satisfied === false ? (
                    <span className="text-red-600 font-medium">No</span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="py-2.5 text-muted-foreground">
                  {r.responseTimeSeconds ? `${Math.floor(r.responseTimeSeconds / 60)}m` : "—"}
                </td>
                <td className="py-2.5 text-muted-foreground">{r.receivedAt.toLocaleDateString()}</td>
              </tr>
            ))}
            {responses.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-muted-foreground">
                  No responses recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
