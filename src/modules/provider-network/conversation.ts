"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function createConversation(data: {
  assignmentId: string
  channel: "WHATSAPP" | "SMS" | "PHONE" | "EMAIL" | "IN_APP" | "WEBSITE_FORM"
  participants: string[]
  externalThreadId?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const conversation = await prisma.providerConversation.create({
    data: {
      assignmentId: data.assignmentId,
      channel: data.channel as any,
      participants: data.participants,
      externalThreadId: data.externalThreadId,
      status: "ACTIVE",
    },
  })

  return conversation
}

export async function getConversationMessages(conversationId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.providerConversation.findUnique({
    where: { id: conversationId },
  })
}

export async function getProviderAssignments(journeyId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.providerAssignment.findMany({
    where: { journeyId },
    include: { conversations: true, escalation: true, contactAttempts: true },
    orderBy: { priority: "asc" },
  })
}

export async function getActiveAssignments(providerId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.providerAssignment.findMany({
    where: { providerId, status: "ACTIVE" },
    include: { conversations: true },
  })
}
