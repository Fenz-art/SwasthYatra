import { prisma } from "@/lib/prisma"
import { channelRouter } from "./channel-router"
import { conversationService } from "./conversation.service"
import { messageService } from "./message.service"
import { publishers } from "@/packages/event-bus"

export interface OutreachResult {
  conversationId: string
  channel: string
  success: boolean
  error?: string
}

export const providerOutreach = {
  async contact(data: {
    journeyId: string
    providerId: string
    assignmentId?: string
    message: string
  }): Promise<OutreachResult> {
    const channels = await channelRouter.routeWithFallback(data.providerId)
    let lastError: string | undefined

    for (const channel of channels) {
      try {
        const conversation = await conversationService.create({
          journeyId: data.journeyId,
          providerId: data.providerId,
          assignmentId: data.assignmentId,
          channel,
        })

        await messageService.send({
          conversationId: conversation.id,
          senderType: "AGENT",
          content: data.message,
        })

        publishers.providerContacted({
          providerId: data.providerId,
          userId: data.journeyId,
          channel,
          messageId: conversation.id,
        })

        return { conversationId: conversation.id, channel, success: true }
      } catch (err) {
        lastError = err instanceof Error ? err.message : "Unknown error"
        continue
      }
    }

    return { conversationId: "", channel: "", success: false, error: lastError }
  },

  async retry(conversationId: string, newMessage?: string) {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    })
    if (!conversation) throw new Error("Conversation not found")

    const channels = await channelRouter.routeWithFallback(
      conversation.providerId!,
    )
    const nextChannel = channels.find((c) => c !== conversation.channel)
    if (!nextChannel) return { escalated: true, reason: "No remaining channels" }

    const newConversation = await conversationService.create({
      journeyId: conversation.journeyId,
      providerId: conversation.providerId ?? undefined,
      assignmentId: conversation.assignmentId ?? undefined,
      channel: nextChannel,
    })

    if (newMessage) {
      await messageService.send({
        conversationId: newConversation.id,
        senderType: "AGENT",
        content: newMessage,
      })
    }

    return { conversationId: newConversation.id, channel: nextChannel, escalated: false }
  },
}
