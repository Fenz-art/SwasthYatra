"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { assertJourneyOwnership } from "@/server/security/ownership"
import { auditService } from "@/server/audit/service"
import { computeOutcomeStats } from "@/packages/healthcare-graph/outcomes/aggregation"

export async function recordOutcome(data: {
  sessionId: string
  result: string
  recoveryTimeHours?: number
  followUpRequired?: boolean
  rating?: number
  reviewNotes?: string
  medicationUsed?: string
  providerId?: string
  providerType?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await assertJourneyOwnership(data.sessionId, session.user.id)

  const ths = await prisma.travelHealthSession.findUnique({
    where: { id: data.sessionId }
  })
  if (!ths) throw new Error("Session not found")

  const outcome = await prisma.outcomeInsight.create({
    data: {
      travelHealthSessionId: data.sessionId,
      userId: session.user.id,
      country: ths.country,
      city: ths.city,
      severity: ths.severityLevel || undefined,
      symptoms: (ths.symptoms as string[]) || [],
      symptomDuration: ths.duration || undefined,
      providerType: data.providerType || undefined,
      providerId: data.providerId || undefined,
      medicationUsed: data.medicationUsed || undefined,
      result: data.result as any,
      recoveryTimeHours: data.recoveryTimeHours || undefined,
      followUpRequired: data.followUpRequired || false,
      rating: data.rating || undefined,
      reviewNotes: data.reviewNotes || undefined,
    }
  })

  await prisma.travelHealthSession.update({
    where: { id: data.sessionId },
    data: { status: "RESOLVED", outcomeId: outcome.id }
  })

  await auditService.log({
    event: "JOURNEY_COMPLETED",
    actorId: session.user.id,
    resource: "OutcomeInsight",
    resourceId: outcome.id,
    metadata: { sessionId: data.sessionId, result: data.result }
  })

  revalidatePath("/dashboard/outcomes")
  revalidatePath("/dashboard/journeys")
  return outcome
}

export async function getOutcomeInsights() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const outcomes = await prisma.outcomeInsight.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  })

  const totalCases = outcomes.length
  const recovered = outcomes.filter(o => o.result === "RECOVERED").length
  const recoveryRate = totalCases > 0 ? (recovered / totalCases) * 100 : 0
  const avgRecoveryTime = outcomes.reduce((sum, o) => sum + (o.recoveryTimeHours || 0), 0) / totalCases || 0

  const byMedication: Record<string, number> = {}
  const byProviderType: Record<string, number> = {}
  const byCountry: Record<string, number> = {}

  outcomes.forEach(o => {
    if (o.medicationUsed) byMedication[o.medicationUsed] = (byMedication[o.medicationUsed] || 0) + 1
    if (o.providerType) byProviderType[o.providerType] = (byProviderType[o.providerType] || 0) + 1
    if (o.country) byCountry[o.country] = (byCountry[o.country] || 0) + 1
  })

  return {
    totalCases,
    recovered,
    recoveryRate: Math.round(recoveryRate),
    avgRecoveryTime: Math.round(avgRecoveryTime),
    byMedication,
    byProviderType,
    byCountry,
    outcomes,
  }
}
