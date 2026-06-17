import { prisma } from "@/lib/prisma"
import type { ProviderNode } from "./index"

class ProviderGraph {
  async findBestForSymptom(symptom: string, country: string): Promise<ProviderNode[]> {
    const outcomes = await prisma.outcomeInsight.findMany({
      where: {
        country,
        symptoms: { has: symptom },
        providerId: { not: null },
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    })

    const providerStats = new Map<string, { count: number; totalRecovery: number; successes: number }>()

    for (const o of outcomes) {
      if (!o.providerId) continue
      const stats = providerStats.get(o.providerId) ?? { count: 0, totalRecovery: 0, successes: 0 }
      stats.count++
      stats.totalRecovery += o.recoveryTimeHours ?? 0
      if (o.result === "RECOVERED") stats.successes++
      providerStats.set(o.providerId, stats)
    }

    const results: ProviderNode[] = []

    for (const [providerId, stats] of providerStats) {
      const provider = await prisma.provider.findUnique({ where: { id: providerId } })
      if (!provider) continue

      results.push({
        id: providerId,
        type: provider.type,
        ratingAverage: provider.ratingAverage ?? 0,
        successRate: stats.successes / stats.count,
        avgRecoveryHours: stats.totalRecovery / stats.count,
      })
    }

    return results.sort((a, b) => b.successRate - a.successRate)
  }
}

export const providerGraph = new ProviderGraph()
