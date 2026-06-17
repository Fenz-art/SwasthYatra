"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { auditService } from "@/server/audit/service"

export type ContactInput = {
  leadId?: string
  assignmentId?: string
  providerId: string
  channel: "WHATSAPP" | "SMS" | "PHONE" | "EMAIL" | "IN_APP" | "WEBSITE_FORM"
  destination: string
  message?: string
  attemptNumber?: number
  maxAttempts?: number
}

export async function contactProvider(input: ContactInput) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const attempt = await prisma.providerContactAttempt.create({
    data: {
      leadId: input.leadId,
      assignmentId: input.assignmentId,
      providerId: input.providerId,
      channel: input.channel as any,
      destination: input.destination,
      message: input.message,
      attemptNumber: input.attemptNumber ?? 1,
      maxAttempts: input.maxAttempts ?? 3,
      status: "SENT",
      sentAt: new Date(),
    },
  })

  await auditService.log({
    event: "PROVIDER_CONTACTED",
    actorId: session.user.id,
    resource: "ProviderContactAttempt",
    resourceId: attempt.id,
    metadata: { channel: input.channel, providerId: input.providerId },
  })

  return attempt
}
