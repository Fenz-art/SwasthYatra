"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { assertJourneyOwnership } from "@/server/security/ownership"
import { auditService } from "@/server/audit/service"
import { translationService, deepgramService, elevenLabsService } from "./services"
import { buildInterpreterContext } from "./context-builder"

export async function startInterpreterSession(data: {
  sessionId: string
  patientLanguage: string
  providerLanguage: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await assertJourneyOwnership(data.sessionId, session.user.id)

  const userMemory = await prisma.medicalMemory.findMany({
    where: { userId: session.user.id }
  })

  const journey = await prisma.travelHealthSession.findUnique({
    where: { id: data.sessionId }
  })

  const medicalContext = {
    symptoms: journey?.symptoms,
    allergies: userMemory.filter(m => m.type === "ALLERGY").map(m => m.data),
    medications: userMemory.filter(m => m.type === "MEDICATION").map(m => m.data),
    conditions: userMemory.filter(m => m.type === "CONDITION").map(m => m.data),
    severity: journey?.severityLevel,
    duration: journey?.duration,
  }

  const interpreterSession = await prisma.interpreterSession.create({
    data: {
      travelHealthSessionId: data.sessionId,
      patientLanguage: data.patientLanguage,
      providerLanguage: data.providerLanguage,
      medicalContext: medicalContext as any,
      status: "ACTIVE",
      startedAt: new Date(),
    }
  })

  const contextString = buildInterpreterContext(medicalContext as any)

  await prisma.interpreterContext.create({
    data: {
      interpreterSessionId: interpreterSession.id,
      symptoms: journey?.symptoms as any,
      medications: userMemory.filter(m => m.type === "MEDICATION").map(m => m.data) as any,
      allergies: userMemory.filter(m => m.type === "ALLERGY").map(m => m.data) as any,
      conditions: userMemory.filter(m => m.type === "CONDITION").map(m => m.data) as any,
      severity: journey?.severityLevel,
    }
  })

  await auditService.log({
    event: "INTERPRETER_STARTED",
    actorId: session.user.id,
    resource: "InterpreterSession",
    resourceId: interpreterSession.id,
    metadata: { patientLang: data.patientLanguage, providerLang: data.providerLanguage }
  })

  revalidatePath("/dashboard/interpreter")
  return interpreterSession
}

export async function processPatientAudio(data: {
  interpreterSessionId: string
  text: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const interpreterSession = await prisma.interpreterSession.findUnique({
    where: { id: data.interpreterSessionId }
  })

  const translation = await translationService.translateWithContext(
    data.text,
    interpreterSession?.patientLanguage ?? "en",
    interpreterSession?.providerLanguage ?? "en",
    data.interpreterSessionId
  )

  const msg = await prisma.conversationMessage.create({
    data: {
      interpreterSessionId: data.interpreterSessionId,
      speaker: "PATIENT",
      sequence: await prisma.conversationMessage.count({
        where: { interpreterSessionId: data.interpreterSessionId }
      }) + 1,
      originalText: data.text,
      translatedText: translation.translatedText,
      sttConfidence: 0.92,
      translationConfidence: translation.confidence,
      recordedAt: new Date(),
      translatedAt: new Date(),
    }
  })

  return msg
}

export async function processProviderResponse(data: {
  interpreterSessionId: string
  text: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const interpreterSession = await prisma.interpreterSession.findUnique({
    where: { id: data.interpreterSessionId }
  })

  const translation = await translationService.translateWithContext(
    data.text,
    interpreterSession?.providerLanguage ?? "en",
    interpreterSession?.patientLanguage ?? "en",
    data.interpreterSessionId
  )

  const msg = await prisma.conversationMessage.create({
    data: {
      interpreterSessionId: data.interpreterSessionId,
      speaker: "PROVIDER",
      sequence: await prisma.conversationMessage.count({
        where: { interpreterSessionId: data.interpreterSessionId }
      }) + 1,
      originalText: data.text,
      translatedText: translation.translatedText,
      sttConfidence: 0.95,
      translationConfidence: translation.confidence,
      recordedAt: new Date(),
      translatedAt: new Date(),
    }
  })

  return msg
}

export async function endInterpreterSession(interpreterSessionId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const interpreterSession = await prisma.interpreterSession.update({
    where: { id: interpreterSessionId },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
    }
  })

  if (interpreterSession.startedAt) {
    const durationSeconds = Math.round(
      (Date.now() - interpreterSession.startedAt.getTime()) / 1000
    )
    await prisma.interpreterSession.update({
      where: { id: interpreterSessionId },
      data: { durationSeconds }
    })
  }

  await auditService.log({
    event: "INTERPRETER_COMPLETED",
    actorId: session.user.id,
    resource: "InterpreterSession",
    resourceId: interpreterSessionId,
  })

  revalidatePath("/dashboard/interpreter")
}

export async function getConversationMessages(interpreterSessionId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.conversationMessage.findMany({
    where: { interpreterSessionId },
    orderBy: { sequence: "asc" }
  })
}

export async function getSynthesizedSpeech(text: string, language: string = "en") {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return elevenLabsService.synthesizeSpeech(text, language)
}
