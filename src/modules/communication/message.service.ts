import { prisma } from "@/lib/prisma"
import { conversationService } from "./conversation.service"
import type { SenderType } from "@prisma/client"

export const messageService = {
  async send(data: {
    conversationId: string
    senderType: SenderType
    senderId?: string
    content: string
    language?: string
  }) {
    const message = await prisma.message.create({ data })
    await conversationService.markLastMessage(data.conversationId)
    return message
  },

  async findByConversation(conversationId: string) {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    })
  },

  async markDelivered(messageId: string) {
    return prisma.message.update({
      where: { id: messageId },
      data: { deliveryStatus: "DELIVERED", deliveredAt: new Date() },
    })
  },

  async markRead(messageId: string) {
    return prisma.message.update({
      where: { id: messageId },
      data: { deliveryStatus: "READ", readAt: new Date() },
    })
  },
}
