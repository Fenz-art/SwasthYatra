"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auditService } from "@/server/audit/service"
import { notificationService } from "@/server/notifications/service"

export async function approveCandidate(candidateId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const candidate = await prisma.medicalMemoryCandidate.findUnique({
    where: { id: candidateId },
    include: { vaultDoc: true }
  })
  if (!candidate) throw new Error("Candidate not found")

  const memory = await prisma.medicalMemory.create({
    data: {
      userId: candidate.userId,
      type: candidate.extractedType || "GENERAL",
      data: candidate.extractedData as any,
      confidence: candidate.confidence || undefined,
      sourceDocumentId: candidate.documentId || undefined,
      sourceType: candidate.vaultDoc?.type || undefined,
      verifiedAt: new Date(),
      verifiedBy: session.user.id,
    }
  })

  await prisma.medicalMemoryCandidate.update({
    where: { id: candidateId },
    data: { status: "APPROVED", reviewedBy: session.user.id }
  })

  await auditService.log({
    event: "MEMORY_APPROVED",
    actorId: session.user.id,
    resource: "MedicalMemory",
    resourceId: memory.id,
    metadata: { candidateId, type: candidate.extractedType }
  })

  await notificationService.send({
    userId: candidate.userId,
    channel: "IN_APP",
    title: "Medical Memory Updated",
    body: `New ${candidate.extractedType?.toLowerCase() || "medical"} record added to your profile.`,
    actionUrl: "/dashboard/memory",
  })

  revalidatePath("/dashboard/memory")
  return memory
}

export async function rejectCandidate(candidateId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const candidate = await prisma.medicalMemoryCandidate.findUnique({
    where: { id: candidateId }
  })
  if (!candidate) throw new Error("Candidate not found")

  await prisma.medicalMemoryCandidate.update({
    where: { id: candidateId },
    data: { status: "REJECTED", reviewedBy: session.user.id }
  })

  await auditService.log({
    event: "MEMORY_REJECTED",
    actorId: session.user.id,
    resource: "MedicalMemoryCandidate",
    resourceId: candidateId,
  })

  revalidatePath("/dashboard/memory")
}

export async function mergeCandidate(candidateId: string, targetMemoryId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const [candidate, target] = await Promise.all([
    prisma.medicalMemoryCandidate.findUnique({ where: { id: candidateId } }),
    prisma.medicalMemory.findUnique({ where: { id: targetMemoryId } })
  ])
  if (!candidate || !target) throw new Error("Not found")

  const mergedData = {
    ...(target.data as any),
    ...(candidate.extractedData as any),
  }

  await prisma.medicalMemory.update({
    where: { id: targetMemoryId },
    data: { data: mergedData }
  })

  await prisma.medicalMemoryCandidate.update({
    where: { id: candidateId },
    data: { status: "MERGED", reviewedBy: session.user.id }
  })

  await auditService.log({
    event: "MEMORY_MERGED",
    actorId: session.user.id,
    resource: "MedicalMemory",
    resourceId: targetMemoryId,
    metadata: { candidateId }
  })

  revalidatePath("/dashboard/memory")
}

export async function deleteMemory(memoryId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const memory = await prisma.medicalMemory.findFirst({
    where: { id: memoryId, userId: session.user.id }
  })
  if (!memory) throw new Error("Memory not found")

  await prisma.medicalMemory.delete({ where: { id: memoryId } })

  await auditService.log({
    event: "MEMORY_DELETED",
    actorId: session.user.id,
    resource: "MedicalMemory",
    resourceId: memoryId,
  })

  revalidatePath("/dashboard/memory")
}
