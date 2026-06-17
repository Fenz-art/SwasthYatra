import { prisma } from "@/lib/prisma"

export const journeyTool = {
  async getJourney(journeyId: string) {
    return prisma.travelHealthSession.findUnique({
      where: { id: journeyId },
      include: { timeline: true },
    })
  },

  async getJourneysByUser(userId: string) {
    return prisma.travelHealthSession.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
    })
  },
}
