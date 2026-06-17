import { prisma } from "@/lib/prisma"

export const outcomeTool = {
  async getOutcomeByJourney(journeyId: string) {
    return prisma.outcomeInsight.findUnique({
      where: { travelHealthSessionId: journeyId },
    })
  },

  async getOutcomesByUser(userId: string) {
    return prisma.outcomeInsight.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
    })
  },
}
