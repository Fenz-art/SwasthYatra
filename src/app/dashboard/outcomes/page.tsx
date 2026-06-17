"use server"

import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OutcomeCharts } from "./_components/outcome-charts"

export default async function OutcomesPage() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const { getOutcomeInsights } = await import("@/modules/outcomes/insights")
  const insights = await getOutcomeInsights()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Outcome Intelligence</h1>
        <p className="text-muted-foreground">Track your healthcare outcomes across journeys</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Cases</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{insights.totalCases}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Recovered</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold text-green-600">{insights.recovered}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Recovery Rate</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{insights.recoveryRate}%</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Avg Recovery</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">{insights.avgRecoveryTime}h</p></CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>By Provider Type</CardTitle></CardHeader>
          <CardContent>
            {Object.keys(insights.byProviderType).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(insights.byProviderType).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <Badge variant="outline">{type}</Badge>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-muted-foreground">No data yet</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>By Country</CardTitle></CardHeader>
          <CardContent>
            {Object.keys(insights.byCountry).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(insights.byCountry).map(([country, count]) => (
                  <div key={country} className="flex items-center justify-between">
                    <span className="text-sm">{country}</span>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-muted-foreground">No data yet</p>}
          </CardContent>
        </Card>
      </div>

      {insights.totalCases > 0 && (
        <Card>
          <CardHeader><CardTitle>Visualizations</CardTitle></CardHeader>
          <CardContent>
            <OutcomeCharts insights={insights} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
