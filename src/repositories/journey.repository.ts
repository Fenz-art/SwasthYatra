import { prisma } from "@/lib/prisma"

export const journeyRepository = {
  async findById(id: string) {
    return prisma.travelHealthSession.findUnique({
      where: { id },
      include: { timeline: true, outcome: true },
    })
  },

  async findByUser(userId: string) {
    return prisma.travelHealthSession.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { timeline: true },
    })
  },

  async create(data: {
    userId: string
    country: string
    city: string
    language: string
    symptoms: string[]
    severityLevel?: string
    duration?: string
    allergies?: string[]
    medications?: string[]
  }) {
    return prisma.travelHealthSession.create({
      data: {
        userId: data.userId,
        country: data.country,
        city: data.city,
        language: data.language,
        symptoms: data.symptoms,
        severityLevel: data.severityLevel,
        duration: data.duration,
        allergies: data.allergies,
        medications: data.medications,
        status: "ACTIVE",
      },
    })
  },

  async update(id: string, data: Record<string, unknown>) {
    return prisma.travelHealthSession.update({ where: { id }, data: data as any })
  },

  async close(id: string) {
    return prisma.travelHealthSession.update({
      where: { id },
      data: { status: "RESOLVED" },
    })
  },

  async addTimelineEvent(sessionId: string, eventType: string, data: unknown) {
    return prisma.journeyTimelineEvent.create({
      data: { sessionId, eventType, data: data as any },
    })
  },

  async getTimeline(sessionId: string) {
    return prisma.journeyTimelineEvent.findMany({
      where: { sessionId },
      orderBy: { createdAt: "asc" },
    })
  },

  async getActiveByUser(userId: string) {
    return prisma.travelHealthSession.findMany({
      where: { userId, status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
    })
  },
}
