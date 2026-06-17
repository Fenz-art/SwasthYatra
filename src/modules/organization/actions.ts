"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auditService } from "@/server/audit/service"
import { notificationService } from "@/server/notifications/service"
import crypto from "crypto"

export async function createOrganization(data: {
  name: string
  slug: string
  type: string
  country?: string
  city?: string
  description?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const org = await prisma.organization.create({
    data: {
      name: data.name,
      slug: data.slug,
      type: data.type,
      country: data.country,
      city: data.city,
      description: data.description,
    }
  })

  await prisma.organizationMember.create({
    data: {
      userId: session.user.id,
      organizationId: org.id,
      role: "ORG_ADMIN",
      createdBy: session.user.id,
    }
  })

  await auditService.log({
    event: "ORG_CREATED",
    actorId: session.user.id,
    resource: "Organization",
    resourceId: org.id,
    metadata: { name: data.name, type: data.type }
  })

  revalidatePath("/dashboard/organizations")
  return org
}

export async function inviteMember(data: {
  organizationId: string
  email: string
  role: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const member = await prisma.organizationMember.findFirst({
    where: { organizationId: data.organizationId, userId: session.user.id, isActive: true }
  })
  if (!member || !["ORG_ADMIN", "SUPER_ADMIN"].includes(member.role)) {
    throw new Error("Insufficient permissions")
  }

  const existing = await prisma.organizationMember.findFirst({
    where: { organizationId: data.organizationId, user: { email: data.email } }
  })
  if (existing) throw new Error("User is already a member")

  const token = crypto.randomBytes(32).toString("hex")

  const invitation = await prisma.organizationInvitation.create({
    data: {
      email: data.email,
      organizationId: data.organizationId,
      role: data.role as any,
      token,
      inviterId: session.user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "PENDING",
    }
  })

  await auditService.log({
    event: "ORG_INVITATION_SENT",
    actorId: session.user.id,
    resource: "OrganizationInvitation",
    resourceId: invitation.id,
    metadata: { email: data.email, role: data.role }
  })

  revalidatePath(`/dashboard/organizations/${data.organizationId}/members`)
  return invitation
}

export async function acceptInvitation(token: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const invitation = await prisma.organizationInvitation.findUnique({
    where: { token }
  })
  if (!invitation || invitation.status !== "PENDING") throw new Error("Invalid invitation")
  if (invitation.email !== session.user.email) throw new Error("This invitation was for a different email")
  if (invitation.expiresAt < new Date()) throw new Error("Invitation expired")

  await prisma.organizationMember.create({
    data: {
      userId: session.user.id,
      organizationId: invitation.organizationId,
      role: invitation.role,
      createdBy: invitation.inviterId,
    }
  })

  await prisma.organizationInvitation.update({
    where: { id: invitation.id },
    data: { status: "ACCEPTED", acceptedAt: new Date() }
  })

  await auditService.log({
    event: "ORG_INVITATION_ACCEPTED",
    actorId: session.user.id,
    resource: "Organization",
    resourceId: invitation.organizationId,
  })

  revalidatePath("/dashboard/organizations")
}

export async function removeMember(organizationId: string, memberId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const member = await prisma.organizationMember.findFirst({
    where: { organizationId, userId: session.user.id, isActive: true }
  })
  if (!member || !["ORG_ADMIN", "SUPER_ADMIN"].includes(member.role)) {
    throw new Error("Insufficient permissions")
  }

  await prisma.organizationMember.update({
    where: { id: memberId },
    data: { isActive: false }
  })

  await auditService.log({
    event: "ORG_MEMBER_REMOVED",
    actorId: session.user.id,
    resource: "OrganizationMember",
    resourceId: memberId,
    metadata: { organizationId }
  })

  revalidatePath(`/dashboard/organizations/${organizationId}/members`)
}

export async function getOrganizationMembers(organizationId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.organizationMember.findMany({
    where: { organizationId, isActive: true },
    include: { user: { select: { id: true, name: true, email: true, image: true } } },
    orderBy: { createdAt: "asc" }
  })
}

export async function getUserOrganizations() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return prisma.organizationMember.findMany({
    where: { userId: session.user.id, isActive: true },
    include: { organization: true },
    orderBy: { createdAt: "desc" }
  })
}
