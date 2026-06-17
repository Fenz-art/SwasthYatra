import { prisma } from "@/lib/prisma"
import type { EscalationSeverity, EscalationReason, EscalationStatus } from "@prisma/client"

export const escalationService = {
  async create(data: {
    journeyId: string
    providerId?: string
    assignmentId?: string
    severity: EscalationSeverity
    reason: EscalationReason
  }) {
    return prisma.escalationCase.create({ data })
  },

  async findById(id: string) {
    return prisma.escalationCase.findUnique({ where: { id } })
  },

  async findAll(status?: EscalationStatus) {
    const where = status ? { status } : {}
    return prisma.escalationCase.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })
  },

  async assignOperator(id: string, operatorId: string) {
    return prisma.escalationCase.update({
      where: { id },
      data: { status: "ASSIGNED", assignedOperatorId: operatorId },
    })
  },

  async setInProgress(id: string) {
    return prisma.escalationCase.update({
      where: { id },
      data: { status: "IN_PROGRESS" },
    })
  },

  async resolve(id: string, notes?: string) {
    return prisma.escalationCase.update({
      where: { id },
      data: {
        status: "RESOLVED",
        resolvedAt: new Date(),
        operatorNotes: notes,
      },
    })
  },

  async close(id: string) {
    return prisma.escalationCase.update({
      where: { id },
      data: { status: "CLOSED" },
    })
  },

  async getStats() {
    const [byStatus, bySeverity, byReason, total] = await Promise.all([
      prisma.escalationCase.groupBy({ by: ["status"], _count: true }),
      prisma.escalationCase.groupBy({ by: ["severity"], _count: true }),
      prisma.escalationCase.groupBy({ by: ["reason"], _count: true }),
      prisma.escalationCase.count(),
    ])

    return {
      total,
      byStatus: Object.fromEntries(byStatus.map((s) => [s.status, s._count])),
      bySeverity: Object.fromEntries(bySeverity.map((s) => [s.severity, s._count])),
      byReason: Object.fromEntries(byReason.map((s) => [s.reason, s._count])),
    }
  },

  async getJourneyTimeline(journeyId: string) {
    const [session, escalations, assignments, conversations] = await Promise.all([
      prisma.travelHealthSession.findUnique({
        where: { id: journeyId },
        include: { timeline: { orderBy: { createdAt: "asc" } } },
      }),
      prisma.escalationCase.findMany({
        where: { journeyId },
        orderBy: { createdAt: "asc" },
      }),
      prisma.providerAssignment.findMany({
        where: { journeyId },
        orderBy: { createdAt: "asc" },
      }),
      prisma.conversation.findMany({
        where: { journeyId },
        include: { messages: { take: 3, orderBy: { createdAt: "desc" } } },
        orderBy: { createdAt: "asc" },
      }),
    ])

    return { session, escalations, assignments, conversations }
  },

  async getFailedAssignments() {
    return prisma.providerAssignment.findMany({
      where: { status: "CANCELLED" },
      orderBy: { createdAt: "desc" },
      take: 50,
    })
  },
}
