"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import crypto from "crypto"
import { assertPassportOwnership } from "@/server/security/ownership"
import { auditService } from "@/server/audit/service"
import { notificationService } from "@/server/notifications/service"

export async function generatePassport() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const memory = await prisma.medicalMemory.findMany({ where: { userId: session.user.id } })

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })

  const passportData = {
    conditions: memory.filter(m => m.type === "CONDITION").map(m => m.data),
    allergies: memory.filter(m => m.type === "ALLERGY").map(m => m.data),
    medications: memory.filter(m => m.type === "MEDICATION").map(m => m.data),
    bloodType: user?.bloodType || null,
    emergencyContact: user?.emergencyContact || null,
    insurance: user?.insuranceInfo || null,
  }

  const shareToken = crypto.randomBytes(32).toString("hex")

  const passport = await prisma.healthPassport.create({
    data: {
      userId: session.user.id,
      data: passportData,
      shareToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  })

  await auditService.log({
    event: "PASSPORT_CREATED",
    actorId: session.user.id,
    resource: "HealthPassport",
    resourceId: passport.id,
  })

  revalidatePath("/dashboard/passport")
  return passport
}

export async function sharePassport(passportId: string, expiresInHours = 48) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await assertPassportOwnership(passportId, session.user.id)

  const token = crypto.randomBytes(32).toString("hex")

  const link = await prisma.passportShareLink.create({
    data: {
      passportId,
      token,
      expiresAt: new Date(Date.now() + expiresInHours * 60 * 60 * 1000),
    }
  })

  await auditService.log({
    event: "PASSPORT_SHARED",
    actorId: session.user.id,
    resource: "PassportShareLink",
    resourceId: link.id,
    metadata: { expiresInHours },
  })

  revalidatePath("/dashboard/passport")
  return {
    shareUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/passport/public/${token}`,
    token,
    expiresAt: link.expiresAt,
  }
}

export async function revokePassportShare(shareLinkId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const link = await prisma.passportShareLink.findFirst({
    where: { id: shareLinkId, passport: { userId: session.user.id } }
  })
  if (!link) throw new Error("Share link not found")

  await prisma.passportShareLink.update({
    where: { id: shareLinkId },
    data: { revoked: true }
  })

  await auditService.log({
    event: "PASSPORT_REVOKED",
    actorId: session.user.id,
    resource: "PassportShareLink",
    resourceId: shareLinkId,
  })

  revalidatePath("/dashboard/passport")
}

export async function getPassportShareLinks(passportId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await assertPassportOwnership(passportId, session.user.id)

  return prisma.passportShareLink.findMany({
    where: { passportId },
    include: { accessLogs: true },
    orderBy: { createdAt: "desc" }
  })
}
