import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default async function AdminProviderNetwork() {
  const session = await auth()
  if (!session?.user) return null

  const [totalLeads, byStatus, bySource, metrics, cityStats] = await Promise.all([
    prisma.providerLead.count(),
    prisma.providerLead.groupBy({ by: ["status"], _count: true }),
    prisma.providerLead.groupBy({ by: ["source"], _count: true }),
    prisma.providerNetworkMetrics.findMany({
      orderBy: { date: "desc" },
      take: 30,
    }),
    prisma.providerLead.groupBy({
      by: ["city", "status"],
      _count: true,
      where: { city: { not: null } },
    }),
  ])

  const statusMap = Object.fromEntries(byStatus.map((s) => [s.status, s._count]))
  const sourceMap = Object.fromEntries(bySource.map((s) => [s.source, s._count]))

  const latestMetrics = metrics[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Provider Network</h1>
        <p className="text-muted-foreground">Pipeline overview and growth tracking.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card className="p-4">
          <div className="text-2xl font-bold">{totalLeads}</div>
          <div className="text-sm text-muted-foreground">Total Leads</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{statusMap["ACTIVE"] ?? 0}</div>
          <div className="text-sm text-muted-foreground">Active Providers</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{statusMap["ONBOARDED"] ?? 0}</div>
          <div className="text-sm text-muted-foreground">Onboarded</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{statusMap["CONTACTED"] ?? 0}</div>
          <div className="text-sm text-muted-foreground">Contacted</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{latestMetrics ? `${Math.round(latestMetrics.conversionRate ?? 0)}%` : "—"}</div>
          <div className="text-sm text-muted-foreground">Conversion Rate</div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Pipeline by Status</h2>
          <div className="space-y-2">
            {Object.entries(statusMap).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between text-sm">
                <span className="capitalize">{status.toLowerCase()}</span>
                <div className="flex items-center gap-2">
                  <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(count / totalLeads) * 100}%` }}
                    />
                  </div>
                  <span className="text-muted-foreground w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Leads by Source</h2>
          <div className="space-y-2">
            {Object.entries(sourceMap).map(([source, count]) => (
              <div key={source} className="flex items-center justify-between text-sm">
                <span className="capitalize">{source.toLowerCase()}</span>
                <span className="text-muted-foreground">{count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {cityStats.length > 0 && (
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">City Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 font-medium">City</th>
                  <th className="pb-2 font-medium">Total</th>
                  <th className="pb-2 font-medium">Active</th>
                  <th className="pb-2 font-medium">Onboarded</th>
                  <th className="pb-2 font-medium">Pending</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(
                  cityStats.reduce((acc, c) => {
                    const city = c.city ?? "Unknown"
                    if (!acc[city]) acc[city] = { total: 0, active: 0, onboarded: 0, pending: 0 }
                    acc[city].total += c._count
                    if (c.status === "ACTIVE") acc[city].active += c._count
                    else if (c.status === "ONBOARDED") acc[city].onboarded += c._count
                    else acc[city].pending += c._count
                    return acc
                  }, {} as Record<string, { total: number; active: number; onboarded: number; pending: number }>)
                ).map(([city, stats]) => (
                  <tr key={city} className="border-b">
                    <td className="py-2">{city}</td>
                    <td className="py-2">{stats.total}</td>
                    <td className="py-2 text-green-600">{stats.active}</td>
                    <td className="py-2 text-blue-600">{stats.onboarded}</td>
                    <td className="py-2 text-yellow-600">{stats.pending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {metrics.length > 0 && (
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Daily Metrics (Last {metrics.length} days)</h2>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {metrics.map((m) => (
              <div key={m.id} className="flex items-center justify-between text-xs border-b py-1">
                <span>{m.date.toLocaleDateString()}</span>
                <span className="text-muted-foreground">
                  Leads: {m.totalLeads} &middot; Contacted: {m.totalAssignments} &middot; Conv: {m.totalConversations} &middot; Esc: {m.totalEscalations}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
