import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { escalationService } from "@/modules/escalation"

export default async function AdminOperatorDashboard() {
  const session = await auth()
  if (!session?.user) return null

  const [openCases, activeJourneys, stats] = await Promise.all([
    escalationService.findAll("OPEN"),
    prisma.travelHealthSession.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        timeline: { orderBy: { createdAt: "desc" }, take: 5 },
      },
    }),
    escalationService.getStats(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Operator Dashboard</h1>
        <p className="text-muted-foreground">Human operations center — agent failures, active journeys, and case management.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600">{openCases.length}</div>
          <div className="text-sm text-muted-foreground">Open Escalations</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600">{activeJourneys.length}</div>
          <div className="text-sm text-muted-foreground">Active Journeys</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total Cases Resolved</div>
        </Card>
      </div>

      {openCases.length > 0 && (
        <Card className="p-4 border-red-200">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            Open Cases — Action Required
          </h2>
          <div className="space-y-3">
            {openCases.map((c) => (
              <div key={c.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{c.id.slice(0, 8)}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      c.severity === "CRITICAL" ? "bg-red-100 text-red-700" :
                      c.severity === "HIGH" ? "bg-orange-100 text-orange-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>{c.severity}</span>
                    <span className="text-xs text-muted-foreground">{c.reason.replace(/_/g, " ").toLowerCase()}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{c.createdAt.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Journey: <span className="font-mono">{c.journeyId.slice(0, 8)}</span>
                  {c.providerId && <> · Provider: <span className="font-mono">{c.providerId.slice(0, 8)}</span></>}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      <h2 className="text-lg font-semibold">Active Journeys</h2>
      <div className="space-y-3">
        {activeJourneys.map((j) => (
          <Card key={j.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs">{j.id.slice(0, 8)}</span>
                <span className="text-sm">{j.country} — {j.city}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  j.severityLevel === "CRITICAL" ? "bg-red-100 text-red-700" :
                  j.severityLevel === "HIGH" ? "bg-orange-100 text-orange-700" :
                  j.severityLevel === "MEDIUM" ? "bg-yellow-100 text-yellow-700" :
                  "bg-green-100 text-green-700"
                }`}>{j.severityLevel}</span>
              </div>
              <span className="text-xs text-muted-foreground">{j.createdAt.toLocaleString()}</span>
            </div>

            <div className="text-xs text-muted-foreground mb-2">
              Symptoms: {(j.symptoms as string[] ?? []).join(", ")}
            </div>

            {j.timeline.length > 0 && (
              <div className="border-t pt-2 mt-2">
                <p className="text-xs font-medium mb-1">Recent Timeline</p>
                <div className="space-y-1">
                  {j.timeline.map((e) => (
                    <div key={e.id} className="text-xs text-muted-foreground flex justify-between">
                      <span>{e.eventType}</span>
                      <span>{e.createdAt.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-3 flex gap-2">
              <span className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 cursor-pointer hover:bg-blue-100">
                View Details
              </span>
              <span className="text-xs px-2 py-1 rounded bg-green-50 text-green-700 cursor-pointer hover:bg-green-100">
                Assign Provider
              </span>
              <span className="text-xs px-2 py-1 rounded bg-orange-50 text-orange-700 cursor-pointer hover:bg-orange-100">
                Escalate
              </span>
            </div>
          </Card>
        ))}
        {activeJourneys.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">
            No active journeys.
          </Card>
        )}
      </div>
    </div>
  )
}
