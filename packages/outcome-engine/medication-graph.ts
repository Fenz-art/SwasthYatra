import { prisma } from "@/lib/prisma"
import type { MedicationNode } from "./index"

class MedicationGraph {
  async findBySymptom(symptom: string): Promise<MedicationNode[]> {
    const outcomes = await prisma.outcomeInsight.findMany({
      where: {
        symptoms: { has: symptom },
        medicationUsed: { not: null },
        result: "RECOVERED",
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    })

    const medStats = new Map<string, { count: number; totalRecovery: number; name: string; ingredient: string }>()

    for (const o of outcomes) {
      if (!o.medicationUsed) continue
      const stats = medStats.get(o.medicationUsed) ?? {
        count: 0,
        totalRecovery: 0,
        name: o.medicationUsed,
        ingredient: o.medicationIngredient ?? o.medicationUsed,
      }
      stats.count++
      stats.totalRecovery += o.recoveryTimeHours ?? 0
      medStats.set(o.medicationUsed, stats)
    }

    return Array.from(medStats.values())
      .map((s) => ({
        id: s.name,
        name: s.name,
        ingredient: s.ingredient,
        avgRecoveryHours: Math.round(s.totalRecovery / s.count),
        confidence: Math.min(s.count / 15, 1),
      }))
      .sort((a, b) => b.confidence - a.confidence)
  }
}

export const medicationGraph = new MedicationGraph()
