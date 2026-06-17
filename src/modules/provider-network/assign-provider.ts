"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { auditService } from "@/server/audit/service"

export async function assignProvider(data: {
  journeyId: string
  providerId: string
  priority?: number
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const assignment = await prisma.providerAssignment.create({
    data: {
      journeyId: data.journeyId,
      providerId: data.providerId,
      userId: session.user.id,
      assignedBy: session.user.id,
      priority: data.priority ?? 0,
      status: "ACTIVE",
    },
  })

  await auditService.log({
    event: "PROVIDER_ROUTED",
    actorId: session.user.id,
    resource: "ProviderAssignment",
    resourceId: assignment.id,
    metadata: { journeyId: data.journeyId, providerId: data.providerId },
  })

  return assignment
}
