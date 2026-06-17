"use client"

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface InsightsProps {
  insights: {
    byMedication: Record<string, number>
    byProviderType: Record<string, number>
    byCountry: Record<string, number>
    totalCases: number
  }
}

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]

export function OutcomeCharts({ insights }: InsightsProps) {
  const recoveryData = Object.entries(insights.byProviderType).map(([name, value]) => ({
    name,
    value,
  }))

  const medicationData = Object.entries(insights.byMedication).map(([name, value]) => ({
    name: name.length > 20 ? name.slice(0, 20) + "..." : name,
    value,
  }))

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <p className="text-sm font-medium mb-4">By Provider Type</p>
        {recoveryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={recoveryData} cx="50%" cy="50%" labelLine={false} outerRadius={80} dataKey="value">
                {recoveryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-muted-foreground">No data</p>
        )}
      </div>

      <div>
        <p className="text-sm font-medium mb-4">Medication Effectiveness</p>
        {medicationData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={medicationData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-muted-foreground">No data</p>
        )}
      </div>
    </div>
  )
}
