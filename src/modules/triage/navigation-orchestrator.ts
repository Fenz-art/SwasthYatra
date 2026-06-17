"use server"

import { prisma } from "@/lib/prisma"
import { calculateSeverity, Severity, SeverityInput } from "./severity-engine"
import { applyEscalationRules, EscalationInput } from "./escalation-engine"
import { selectCarePathway, CarePathway } from "./care-pathway"
import { routeBySeverity, applyCountryOverrides } from "./router"
import { navigationOrchestrator, type NavigationInput, type NavigationDecision } from "./orchestrator"

export async function orchestrateNavigation(sessionId: string) {
  const session = await prisma.travelHealthSession.findUnique({
    where: { id: sessionId },
    include: { user: { include: { memory: true } } },
  })

  if (!session) throw new Error("Session not found")

  const symptomsList = Array.isArray(session.symptoms) ? (session.symptoms as string[]) : []
  const memory = session.user.memory
  const conditions = memory.filter((m) => m.type === "CONDITION").map((m) => String(m.data))

  const decision = await navigationOrchestrator.route({
    symptoms: symptomsList,
    duration: session.duration || undefined,
    country: session.country,
    city: session.city,
    conditions,
  })

  let route = routeBySeverity(decision.severity)
  route = applyCountryOverrides(route, session.country, symptomsList)

  let medicationRecommendations: any[] = []
  let providerRecommendations: any[] = []

  if (route === "PHARMACY" || route === "CLINIC") {
    medicationRecommendations = await prisma.countryMedication.findMany({
      where: { country: { equals: session.country, mode: "insensitive" } },
      include: { activeIngredient: true },
      take: 3,
    })

    providerRecommendations = await prisma.provider.findMany({
      where: {
        country: { equals: session.country, mode: "insensitive" },
        city: { equals: session.city, mode: "insensitive" },
        type: route === "PHARMACY" ? "PHARMACY" : "CLINIC",
      },
      take: 5,
    })
  }

  if (route === "HOSPITAL" || route === "EMERGENCY") {
    providerRecommendations = await prisma.provider.findMany({
      where: {
        country: { equals: session.country, mode: "insensitive" },
        city: { equals: session.city, mode: "insensitive" },
        type: "HOSPITAL",
      },
      take: 5,
    })
  }

  const updatedSession = await prisma.travelHealthSession.update({
    where: { id: sessionId },
    data: {
      severityLevel: decision.severity,
      providerOptions: providerRecommendations as any,
      localMedicationRecommendations: medicationRecommendations as any,
      interpreterContext: {
        severity: decision.severity,
        route,
        patientHistory: memory,
      } as any,
    },
  })

  return {
    severity: decision.severity,
    route,
    decision,
    medications: medicationRecommendations,
    providers: providerRecommendations,
    session: updatedSession,
  }
}
