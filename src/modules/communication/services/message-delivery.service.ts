import { prisma } from "@/lib/prisma"
import type { CommunicationChannel, DeliveryStatus } from "@prisma/client"

export const messageDeliveryService = {
  async create(data: {
    conversationId?: string
    providerId?: string
    attemptId?: string
    channel: CommunicationChannel
  }) {
    return prisma.messageDelivery.create({ data })
  },

  async markSent(id: string, externalId: string) {
    return prisma.messageDelivery.update({
      where: { id },
      data: { status: "SENT", externalId },
    })
  },

  async markDelivered(id: string) {
    return prisma.messageDelivery.update({
      where: { id },
      data: { status: "DELIVERED", deliveredAt: new Date() },
    })
  },

  async markRead(id: string) {
    return prisma.messageDelivery.update({
      where: { id },
      data: { status: "READ", readAt: new Date() },
    })
  },

  async markFailed(id: string, errorCode?: string, errorMessage?: string) {
    return prisma.messageDelivery.update({
      where: { id },
      data: { status: "FAILED", errorCode, errorMessage },
    })
  },

  async findByExternalId(externalId: string) {
    return prisma.messageDelivery.findFirst({ where: { externalId } })
  },

  async updateStatus(id: string, status: DeliveryStatus) {
    return prisma.messageDelivery.update({ where: { id }, data: { status } })
  },

  async getStats() {
    const [byStatus, total] = await Promise.all([
      prisma.messageDelivery.groupBy({ by: ["status"], _count: true }),
      prisma.messageDelivery.count(),
    ])

    const map = Object.fromEntries(byStatus.map((s) => [s.status, s._count]))
    const sent = map["SENT"] ?? 0
    const delivered = map["DELIVERED"] ?? 0
    const read = map["READ"] ?? 0
    const failed = map["FAILED"] ?? 0

    return {
      total,
      sent,
      delivered,
      read,
      failed,
      deliveryRate: total > 0 ? ((delivered + read) / total) * 100 : 0,
      readRate: delivered + read > 0 ? (read / (delivered + read)) * 100 : 0,
    }
  },
}
