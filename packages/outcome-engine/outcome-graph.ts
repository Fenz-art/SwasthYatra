import { prisma } from "@/lib/prisma"
import type { PredictedPath, ProviderNode, MedicationNode } from "./index"

class OutcomeGraph {
  async findBestPath(params: {
    symptomGroup: string
    country: string
    age?: number
    conditions?: string[]
  }): Promise<PredictedPath[]> {
    const recentOutcomes = await prisma.outcomeInsight.findMany({
      where: {
        country: params.country,
        symptoms: { hasSome: params.symptomGroup.split(",") },
        result: "RECOVERED",
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    })

    const providerStats = new Map<string, { count: number; totalRecovery: number; successes: number }>()
    const medicationStats = new Map<string, { count: number; totalRecovery: number }>()

    for (const o of recentOutcomes) {
      if (o.providerId) {
        const stats = providerStats.get(o.providerId) ?? { count: 0, totalRecovery: 0, successes: 0 }
        stats.count++
        stats.totalRecovery += o.recoveryTimeHours ?? 0
        if (o.result === "RECOVERED") stats.successes++
        providerStats.set(o.providerId, stats)
      }
      if (o.medicationUsed) {
        const key = o.medicationUsed
        const stats = medicationStats.get(key) ?? { count: 0, totalRecovery: 0 }
        stats.count++
        stats.totalRecovery += o.recoveryTimeHours ?? 0
        medicationStats.set(key, stats)
      }
    }

    const paths: PredictedPath[] = []

    for (const [providerId, stats] of providerStats) {
      const provider = await prisma.provider.findUnique({ where: { id: providerId } })
      if (!provider) continue

      const providerNode: ProviderNode = {
        id: providerId,
        type: provider.type,
        ratingAverage: provider.ratingAverage,
        successRate: stats.successes / stats.count,
        avgRecoveryHours: stats.totalRecovery / stats.count,
      }

      const avgRecovery = stats.totalRecovery / stats.count
      const confidence = Math.min(stats.count / 20, 1)

      paths.push({
        provider: providerNode,
        predictedRecoveryHours: Math.round(avgRecovery),
        confidence,
        sampleSize: stats.count,
      })
    }

    return paths.sort((a, b) => b.confidence - a.confidence || a.predictedRecoveryHours - b.predictedRecoveryHours)
  }
}

export const outcomeGraph = new OutcomeGraph()
