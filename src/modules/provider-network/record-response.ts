"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function recordProviderResponse(data: {
  contactAttemptId: string
  responseText?: string
  responseType?: string
  intent?: string
  satisfied?: boolean
  followUpRequired?: boolean
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const attempt = await prisma.providerContactAttempt.update({
    where: { id: data.contactAttemptId },
    data: {
      status: "RESPONDED",
      respondedAt: new Date(),
    },
  })

  const response = await prisma.providerResponse.create({
    data: {
      contactAttemptId: data.contactAttemptId,
      responseText: data.responseText,
      responseType: data.responseType ?? "MESSAGE",
      intent: data.intent,
      satisfied: data.satisfied,
      followUpRequired: data.followUpRequired ?? false,
      receivedAt: new Date(),
      responseTimeSeconds: attempt.sentAt
        ? Math.round((Date.now() - attempt.sentAt.getTime()) / 1000)
        : undefined,
    },
  })

  if (attempt.leadId) {
    await prisma.providerLead.update({
      where: { id: attempt.leadId },
      data: {
        status: "RESPONDED",
        respondedAt: new Date(),
      },
    })
  }

  return response
}
