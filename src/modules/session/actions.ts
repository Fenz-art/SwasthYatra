"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { assertJourneyOwnership } from "@/server/security/ownership"
import { auditService } from "@/server/audit/service"
import { publishers } from "@/packages/event-bus"
import { followupEngine } from "@/packages/followup-engine"
import { calculateSeverity, Severity } from "@/modules/triage/severity-engine"
import { routeBySeverity, applyCountryOverrides } from "@/modules/triage/router"

export async function createTravelHealthSession(data: {
  country: string
  city: string
  language: string
  symptoms: string[]
  duration?: string
  allergies?: string[]
  medications?: string[]
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const severity = calculateSeverity({ symptoms: data.symptoms, duration: data.duration })
  let route = routeBySeverity(severity)
  route = applyCountryOverrides(route, data.country, data.symptoms)

  const ths = await prisma.travelHealthSession.create({
    data: {
      userId: session.user.id,
      country: data.country,
      city: data.city,
      language: data.language,
      symptoms: data.symptoms,
      duration: data.duration,
      allergies: data.allergies,
      medications: data.medications,
      severityLevel: severity,
      status: "ACTIVE",
    }
  })

  await prisma.journeyTimelineEvent.create({
    data: {
      sessionId: ths.id,
      eventType: "SYMPTOM_ADDED",
      data: { symptoms: data.symptoms }
    }
  })

  await prisma.journeyTimelineEvent.create({
    data: {
      sessionId: ths.id,
      eventType: "SEVERITY_CALCULATED",
      data: { severity, route }
    }
  })

  await auditService.log({
    event: "JOURNEY_CREATED",
    actorId: session.user.id,
    resource: "TravelHealthSession",
    resourceId: ths.id,
    metadata: { country: data.country, severity }
  })

  publishers.journeyCreated({
    journeyId: ths.id,
    userId: session.user.id,
    country: data.country,
    severity,
  })

  revalidatePath("/dashboard/journeys")
  return { ...ths, severity, route }
}

export async function closeJourney(sessionId: string, outcome: {
  result: string
  recoveryTimeHours?: number
  followUpRequired?: boolean
  medicationUsed?: string
  providerId?: string
  providerType?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await assertJourneyOwnership(sessionId, session.user.id)

  const ths = await prisma.travelHealthSession.update({
    where: { id: sessionId },
    data: { status: "RESOLVED" }
  })

  await prisma.journeyTimelineEvent.create({
    data: {
      sessionId,
      eventType: "OUTCOME_RECORDED",
      data: outcome,
    }
  })

  await auditService.log({
    event: "JOURNEY_COMPLETED",
    actorId: session.user.id,
    resource: "TravelHealthSession",
    resourceId: sessionId,
    metadata: { result: outcome.result }
  })

  publishers.journeyClosed({
    journeyId: sessionId,
    userId: session.user.id,
    result: outcome.result,
  })

  await followupEngine.schedule(sessionId)

  revalidatePath("/dashboard/journeys")
  return ths
}

export async function getJourneyTimeline(sessionId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await assertJourneyOwnership(sessionId, session.user.id)

  return prisma.journeyTimelineEvent.findMany({
    where: { sessionId },
    orderBy: { createdAt: "asc" }
  })
}

export async function updateSessionSeverity(sessionId: string, severity: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await assertJourneyOwnership(sessionId, session.user.id)

  const ths = await prisma.travelHealthSession.update({
    where: { id: sessionId },
    data: { severityLevel: severity }
  })

  await prisma.journeyTimelineEvent.create({
    data: {
      sessionId,
      eventType: "SEVERITY_CALCULATED",
      data: { severity }
    }
  })

  return ths
}

export async function getRecentJourneys() {
  const session = await auth()
  if (!session?.user?.id) return []

  return prisma.travelHealthSession.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 3,
  })
}
