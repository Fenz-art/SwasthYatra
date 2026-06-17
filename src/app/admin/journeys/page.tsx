import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"

export default async function AdminJourneys() {
  const session = await auth()
  if (!session?.user) return null

  const journeys = await prisma.travelHealthSession.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { _count: { select: { timeline: true } } },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Journey Monitor</h1>
        <p className="text-muted-foreground">All active and recent healthcare journeys.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="text-2xl font-bold">{journeys.filter((j) => j.status === "ACTIVE").length}</div>
          <div className="text-sm text-muted-foreground">Active</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{journeys.filter((j) => j.status === "RESOLVED").length}</div>
          <div className="text-sm text-muted-foreground">Resolved</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{journeys.length}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">
            {journeys.reduce((sum, j) => sum + j._count.timeline, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Timeline Events</div>
        </Card>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="pb-3 font-medium">Journey</th>
              <th className="pb-3 font-medium">Country</th>
              <th className="pb-3 font-medium">Severity</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Events</th>
              <th className="pb-3 font-medium">Symptoms</th>
              <th className="pb-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {journeys.map((j) => (
              <tr key={j.id} className="border-b hover:bg-muted/50">
                <td className="py-2.5 font-mono text-xs">{j.id.slice(0, 8)}</td>
                <td className="py-2.5">{j.country}</td>
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    j.severityLevel === "CRITICAL" ? "bg-red-100 text-red-700" :
                    j.severityLevel === "HIGH" ? "bg-orange-100 text-orange-700" :
                    j.severityLevel === "MEDIUM" ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"
                  }`}>{j.severityLevel}</span>
                </td>
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    j.status === "ACTIVE" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                  }`}>{j.status}</span>
                </td>
                <td className="py-2.5 text-muted-foreground">{j._count.timeline}</td>
                <td className="py-2.5 max-w-xs truncate text-muted-foreground">
                  {(j.symptoms as string[] ?? []).slice(0, 3).join(", ")}
                </td>
                <td className="py-2.5 text-muted-foreground">{j.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
            {journeys.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-muted-foreground">
                  No journeys recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
