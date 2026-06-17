import { prisma } from "@/lib/prisma"

export async function assertPassportOwnership(passportId: string, userId: string) {
  const passport = await prisma.healthPassport.findFirst({
    where: { id: passportId, userId }
  })
  if (!passport) throw new Error("Passport not found")
  return passport
}

export async function assertDocumentOwnership(documentId: string, userId: string) {
  const doc = await prisma.vaultDocument.findFirst({
    where: { id: documentId, userId }
  })
  if (!doc) throw new Error("Document not found")
  return doc
}

export async function assertMemoryOwnership(memoryId: string, userId: string) {
  const memory = await prisma.medicalMemory.findFirst({
    where: { id: memoryId, userId }
  })
  if (!memory) throw new Error("Memory not found")
  return memory
}

export async function assertJourneyOwnership(sessionId: string, userId: string) {
  const session = await prisma.travelHealthSession.findFirst({
    where: { id: sessionId, userId }
  })
  if (!session) throw new Error("Journey not found")
  return session
}

export async function assertOutcomeOwnership(outcomeId: string, userId: string) {
  const outcome = await prisma.outcomeInsight.findFirst({
    where: { id: outcomeId, userId }
  })
  if (!outcome) throw new Error("Outcome not found")
  return outcome
}

export async function assertOrganizationAccess(organizationId: string, userId: string) {
  const member = await prisma.organizationMember.findFirst({
    where: { organizationId, userId, isActive: true }
  })
  if (!member) throw new Error("Organization access denied")
  return member
}

export async function assertOrgRole(organizationId: string, userId: string, allowedRoles: string[]) {
  const member = await prisma.organizationMember.findFirst({
    where: { organizationId, userId, isActive: true }
  })
  if (!member || !allowedRoles.includes(member.role)) {
    throw new Error("Insufficient organization permissions")
  }
  return member
}
