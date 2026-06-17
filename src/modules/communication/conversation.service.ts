import { prisma } from "@/lib/prisma"
import { publishers } from "@/packages/event-bus"
import type { CommunicationChannel, ConversationStatus } from "@prisma/client"

export const conversationService = {
  async create(data: {
    journeyId: string
    providerId?: string
    assignmentId?: string
    channel: CommunicationChannel
  }) {
    return prisma.conversation.create({ data })
  },

  async findById(id: string) {
    return prisma.conversation.findUnique({
      where: { id },
      include: { messages: { orderBy: { createdAt: "asc" } }, callSessions: true },
    })
  },

  async findByJourney(journeyId: string) {
    return prisma.conversation.findMany({
      where: { journeyId },
      orderBy: { createdAt: "desc" },
      include: { messages: { take: 1, orderBy: { createdAt: "desc" } } },
    })
  },

  async updateStatus(id: string, status: ConversationStatus) {
    return prisma.conversation.update({ where: { id }, data: { status } })
  },

  async markLastMessage(id: string) {
    return prisma.conversation.update({
      where: { id },
      data: { lastMessageAt: new Date() },
    })
  },
}
