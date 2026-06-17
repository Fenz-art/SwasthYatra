"use server"

import { prisma } from "@/lib/prisma"
import { calculateSeverity } from "@/modules/triage/severity-engine"
import { routeBySeverity, applyCountryOverrides } from "@/modules/triage/router"
import { Severity } from "@/modules/triage/severity-engine"

export async function runNavigationEngine(sessionId: string) {
  const session = await prisma.travelHealthSession.findUnique({
    where: { id: sessionId },
    include: { user: { include: { memory: true } } }
  })

  if (!session) throw new Error("Session not found")

  const symptomsList = Array.isArray(session.symptoms) ? (session.symptoms as string[]) : [];

  // 1. TRIAGE & SEVERITY
  const severity = calculateSeverity({
    symptoms: symptomsList,
    duration: session.duration || undefined
  })
  
  let route = routeBySeverity(severity as Severity)
  route = applyCountryOverrides(route, session.country, symptomsList)

  // Log Triage Event
  await prisma.journeyTimelineEvent.create({
    data: { sessionId, eventType: "SEVERITY_CALCULATED", data: { severity, route } }
  })

  // 2. COUNTRY CONTEXT
  const countryProfile = await prisma.countryHealthcareProfile.findUnique({
    where: { country: session.country }
  })

  // 3. ACTION PLAN GENERATION (Based on Route)
  let medications: any[] = []
  let providers: any[] = []
  let interpreterContext: any = null

  if (route === "PHARMACY" || route === "CLINIC" || route === "HOSPITAL") {
    // Fetch Meds (Only if not Hospital/Emergency)
    if (route !== "HOSPITAL") {
      medications = await prisma.countryMedication.findMany({
        where: { country: { equals: session.country, mode: "insensitive" } },
        include: { activeIngredient: true },
        take: 3
      })
    }

    // Fetch Providers based on route
    const providerType = route === "PHARMACY" ? "PHARMACY" : route === "CLINIC" ? "CLINIC" : "HOSPITAL"
    providers = await prisma.provider.findMany({
      where: { 
        country: { equals: session.country, mode: "insensitive" }, 
        city: { equals: session.city, mode: "insensitive" },
        type: providerType
      },
      take: 3
    })

    // Build Interpreter Context
    const memory = session.user.memory
    interpreterContext = {
      severity,
      route,
      symptoms: session.symptoms,
      allergies: memory.filter(m => m.type === "ALLERGY").map(m => m.data),
      medications: memory.filter(m => m.type === "MEDICATION").map(m => m.data),
    }
  }

  // 4. UPDATE SESSION
  const updatedSession = await prisma.travelHealthSession.update({
    where: { id: sessionId },
    data: {
      severityLevel: severity,
      providerOptions: providers as any,
      localMedicationRecommendations: medications.map(m => ({...m, brandName: m.commonBrands?.[0] || m.id})) as any,
      interpreterContext: interpreterContext as any
    }
  })

  // Log Action Plan Created
  await prisma.journeyTimelineEvent.create({
    data: { sessionId, eventType: "ROUTE_ASSIGNED", data: { route, providerCount: providers.length, medCount: medications.length } }
  })

  // 5. RETURN UNIFIED ACTION PLAN
  return {
    severity,
    route,
    confidence: 0.82, // Mock confidence score
    countryProfile,
    actionPlan: {
      medications,
      providers,
      interpreterReady: !!interpreterContext
    },
    session: updatedSession
  }
}

// Specialized Flow: Medication Refill
export async function runRefillFlow(sessionId: string, lostMedicationName: string) {
  // 1. Find active ingredient of the lost medication from Memory or DB
  // (In production, use advanced matchers)
  const localEquivalent = await prisma.countryMedication.findFirst({
    where: { 
      country: "Japan", 
      activeIngredient: { name: { contains: lostMedicationName, mode: "insensitive" } } 
    }
  })

  // 3. Find Pharmacy
  const pharmacy = await prisma.provider.findFirst({
    where: { type: "PHARMACY", country: "Japan" }
  })

  await prisma.journeyTimelineEvent.create({
    data: { sessionId, eventType: "MED_REFILL_FLOW", data: { requested: lostMedicationName, found: localEquivalent?.commonBrands?.[0] } }
  })

  return { localEquivalent, pharmacy }
}
