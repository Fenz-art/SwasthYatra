import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"

export default async function AdminFailedAssignments() {
  const session = await auth()
  if (!session?.user) return null

  const [cancelled, escalated] = await Promise.all([
    prisma.providerAssignment.findMany({
      where: { status: "CANCELLED" },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.providerAssignment.findMany({
      where: { status: "ESCALATED" },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Failed Assignments</h1>
        <p className="text-muted-foreground">Assignments that require human intervention.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600">{cancelled.length}</div>
          <div className="text-sm text-muted-foreground">Cancelled (No Response)</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-orange-600">{escalated.length}</div>
          <div className="text-sm text-muted-foreground">Escalated</div>
        </Card>
      </div>

      {cancelled.length > 0 && (
        <>
          <h2 className="text-lg font-semibold">Cancelled Assignments</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Assignment</th>
                  <th className="pb-3 font-medium">Journey</th>
                  <th className="pb-3 font-medium">Provider</th>
                  <th className="pb-3 font-medium">Priority</th>
                  <th className="pb-3 font-medium">Resolution</th>
                  <th className="pb-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {cancelled.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-muted/50">
                    <td className="py-2.5 font-mono text-xs">{a.id.slice(0, 8)}</td>
                    <td className="py-2.5 font-mono text-xs text-muted-foreground">{a.journeyId.slice(0, 8)}</td>
                    <td className="py-2.5 font-mono text-xs text-muted-foreground">{a.providerId.slice(0, 8)}</td>
                    <td className="py-2.5">{a.priority}</td>
                    <td className="py-2.5 text-muted-foreground text-xs">{a.resolution ?? "—"}</td>
                    <td className="py-2.5 text-muted-foreground">{a.createdAt.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {escalated.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-6">Escalated Assignments</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Assignment</th>
                  <th className="pb-3 font-medium">Journey</th>
                  <th className="pb-3 font-medium">Provider</th>
                  <th className="pb-3 font-medium">Priority</th>
                  <th className="pb-3 font-medium">Resolution</th>
                  <th className="pb-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {escalated.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-muted/50">
                    <td className="py-2.5 font-mono text-xs">{a.id.slice(0, 8)}</td>
                    <td className="py-2.5 font-mono text-xs text-muted-foreground">{a.journeyId.slice(0, 8)}</td>
                    <td className="py-2.5 font-mono text-xs text-muted-foreground">{a.providerId.slice(0, 8)}</td>
                    <td className="py-2.5">{a.priority}</td>
                    <td className="py-2.5 text-muted-foreground text-xs">{a.resolution ?? "—"}</td>
                    <td className="py-2.5 text-muted-foreground">{a.createdAt.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {cancelled.length === 0 && escalated.length === 0 && (
        <Card className="p-8 text-center text-muted-foreground">
          No failed assignments. The agent system is operating without errors.
        </Card>
      )}
    </div>
  )
}
