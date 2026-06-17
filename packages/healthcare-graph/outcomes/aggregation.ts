import { prisma } from "@/lib/prisma"

export interface OutcomeStats {
  totalCases: number
  recoveredCount: number
  recoveryRate: number
  avgRecoveryHours: number | null
  hospitalizationRate: number | null
  breakdowns: {
    byProviderType: Record<string, number>
    byCountry: Record<string, number>
    bySeverity: Record<string, number>
  }
}

export async function computeOutcomeStats(): Promise<OutcomeStats> {
  const outcomes = await prisma.outcomeInsight.findMany()

  const totalCases = outcomes.length
  const recoveredCount = outcomes.filter((o) => o.result === "RECOVERED").length
  const recoveryRate = totalCases > 0 ? (recoveredCount / totalCases) * 100 : 0

  const recovered = outcomes.filter((o) => o.recoveryTimeHours != null)
  const avgRecoveryHours =
    recovered.length > 0
      ? recovered.reduce((sum, o) => sum + (o.recoveryTimeHours ?? 0), 0) / recovered.length
      : null

  const hospitalized = outcomes.filter((o) => o.result === "REQUIRED_HOSPITALIZATION").length
  const hospitalizationRate = totalCases > 0 ? (hospitalized / totalCases) * 100 : null

  const byProviderType: Record<string, number> = {}
  const byCountry: Record<string, number> = {}
  const bySeverity: Record<string, number> = {}

  for (const o of outcomes) {
    if (o.providerType) byProviderType[o.providerType] = (byProviderType[o.providerType] ?? 0) + 1
    if (o.country) byCountry[o.country] = (byCountry[o.country] ?? 0) + 1
    if (o.severity) bySeverity[o.severity] = (bySeverity[o.severity] ?? 0) + 1
  }

  return {
    totalCases,
    recoveredCount,
    recoveryRate: Math.round(recoveryRate * 100) / 100,
    avgRecoveryHours: avgRecoveryHours ? Math.round(avgRecoveryHours * 100) / 100 : null,
    hospitalizationRate: hospitalizationRate ? Math.round(hospitalizationRate * 100) / 100 : null,
    breakdowns: { byProviderType, byCountry, bySeverity },
  }
}

export async function computeOutcomeAggregations(): Promise<void> {
  const stats = await computeOutcomeStats()

  for (const [providerType, count] of Object.entries(stats.breakdowns.byProviderType)) {
    if (count > 0) {
      const avgRecoveryHours = stats.avgRecoveryHours ?? 0
      await prisma.outcomeAggregation.upsert({
        where: { id: `provider-${providerType}` },
        update: {
          totalCases: count,
          recoveredCount: stats.recoveredCount,
          avgRecoveryHours,
          hospitalizationRate: stats.hospitalizationRate ?? 0,
          computedAt: new Date(),
        },
        create: {
          id: `provider-${providerType}`,
          country: "GLOBAL",
          providerType,
          totalCases: count,
          recoveredCount: stats.recoveredCount,
          avgRecoveryHours,
          hospitalizationRate: stats.hospitalizationRate ?? 0,
          periodStart: new Date(0),
          periodEnd: new Date(),
          computedAt: new Date(),
        },
      })
    }
  }
}
