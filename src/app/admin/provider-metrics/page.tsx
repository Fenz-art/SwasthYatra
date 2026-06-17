import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { messageDeliveryService } from "@/modules/communication/services/message-delivery.service"
import { followupEngine } from "@/packages/followup-engine"

export default async function AdminProviderMetrics() {
  const session = await auth()
  if (!session?.user) return null

  const [metrics, leadsByCity, leadsByStatus] = await Promise.all([
    prisma.providerNetworkMetrics.findMany({
      orderBy: { date: "desc" },
      take: 60,
    }),
    prisma.providerLead.groupBy({
      by: ["city", "status"],
      _count: true,
      where: { city: { not: null } },
    }),
    prisma.providerLead.groupBy({ by: ["status"], _count: true }),
  ])

  const deliveryStats = await messageDeliveryService.getStats()
  const outcomeCollectionRate = await followupEngine.getOutcomeCollectionRate()

  const statusMap = Object.fromEntries(leadsByStatus.map((s) => [s.status, s._count]))
  const totalLeads = Object.values(statusMap).reduce((a, b) => a + b, 0)
  const activeProviders = statusMap["ACTIVE"] ?? 0
  const onboardedProviders = statusMap["ONBOARDED"] ?? 0
  const contactedProviders = statusMap["CONTACTED"] ?? 0
  const conversionRate = totalLeads > 0 ? Math.round((activeProviders / totalLeads) * 100) : 0

  const cityAggregated = Object.entries(
    leadsByCity.reduce((acc, c) => {
      const city = c.city ?? "Unknown"
      if (!acc[city]) acc[city] = { total: 0, active: 0, onboarded: 0, contacted: 0, responded: 0 }
      acc[city].total += c._count
      if (c.status === "ACTIVE") acc[city].active += c._count
      else if (c.status === "ONBOARDED") acc[city].onboarded += c._count
      else if (c.status === "CONTACTED") acc[city].contacted += c._count
      else if (c.status === "RESPONDED") acc[city].responded += c._count
      return acc
    }, {} as Record<string, { total: number; active: number; onboarded: number; contacted: number; responded: number }>)
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Network Metrics</h1>
        <p className="text-muted-foreground">KPIs and conversion analytics for the provider network.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="p-4">
          <div className="text-2xl font-bold">{totalLeads}</div>
          <div className="text-sm text-muted-foreground">Total Leads</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{contactedProviders}</div>
          <div className="text-sm text-muted-foreground">Contacted</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{onboardedProviders}</div>
          <div className="text-sm text-muted-foreground">Onboarded</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{activeProviders}</div>
          <div className="text-sm text-muted-foreground">Active</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{conversionRate}%</div>
          <div className="text-sm text-muted-foreground">Lead→Active</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{deliveryStats.deliveryRate.toFixed(1)}%</div>
          <div className="text-sm text-muted-foreground">Msg Delivery Rate</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{deliveryStats.readRate.toFixed(1)}%</div>
          <div className="text-sm text-muted-foreground">Msg Read Rate</div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="text-2xl font-bold">{deliveryStats.sent}</div>
          <div className="text-sm text-muted-foreground">Messages Sent</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{deliveryStats.delivered}</div>
          <div className="text-sm text-muted-foreground">Delivered</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{deliveryStats.read}</div>
          <div className="text-sm text-muted-foreground">Read</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold">{outcomeCollectionRate.toFixed(1)}%</div>
          <div className="text-sm text-muted-foreground">Outcome Collection</div>
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">City Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-3 font-medium">City</th>
                <th className="pb-3 font-medium">Found</th>
                <th className="pb-3 font-medium">Contacted</th>
                <th className="pb-3 font-medium">Responded</th>
                <th className="pb-3 font-medium">Onboarded</th>
                <th className="pb-3 font-medium">Active</th>
                <th className="pb-3 font-medium">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {cityAggregated.map(([city, stats]) => (
                <tr key={city} className="border-b hover:bg-muted/50">
                  <td className="py-2.5 font-medium">{city}</td>
                  <td className="py-2.5">{stats.total}</td>
                  <td className="py-2.5 text-yellow-600">{stats.contacted}</td>
                  <td className="py-2.5 text-purple-600">{stats.responded}</td>
                  <td className="py-2.5 text-blue-600">{stats.onboarded}</td>
                  <td className="py-2.5 text-green-600">{stats.active}</td>
                  <td className="py-2.5 font-medium">
                    {stats.total > 0 ? `${Math.round((stats.active / stats.total) * 100)}%` : "—"}
                  </td>
                </tr>
              ))}
              {cityAggregated.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    No city data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {metrics.length > 0 && (
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Historical Metrics (Last {metrics.length} days)</h2>
          <div className="space-y-1 max-h-80 overflow-y-auto">
            {metrics.map((m) => (
              <div key={m.id} className="flex items-center justify-between text-xs border-b py-1.5">
                <span className="font-medium">{m.date.toLocaleDateString()}</span>
                <span className="text-muted-foreground">
                  Leads: {m.totalLeads} &middot; Conv: {m.totalConversations} &middot; AvgResp: {m.avgResponseTimeSeconds ? `${Math.floor(m.avgResponseTimeSeconds / 60)}m` : "—"}s &middot; Esc: {m.totalEscalations}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
