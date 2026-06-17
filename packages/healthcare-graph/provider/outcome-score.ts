import { prisma } from "@/lib/prisma"

export async function outcomeScore(providerId: string): Promise<number> {
  const outcomes = await prisma.providerOutcome.findMany({
    where: { providerId },
  })

  if (!outcomes.length) return 0

  const validScores = outcomes
    .map((o) => {
      const qualityMap: Record<string, number> = {
        EXCELLENT: 10,
        GOOD: 7,
        AVERAGE: 5,
        POOR: 2,
      }
      return o.consultationQuality ? qualityMap[o.consultationQuality] ?? 5 : 5
    })
    .filter((s): s is number => s !== undefined)

  if (!validScores.length) return 0

  return validScores.reduce((sum, s) => sum + s, 0) / validScores.length
}
