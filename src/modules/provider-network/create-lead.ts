"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { auditService } from "@/server/audit/service"

export type LeadInput = {
  name: string
  type: string
  country: string
  city?: string
  address?: string
  lat?: number
  lng?: number
  phone?: string
  email?: string
  website?: string
  source: "GEOAPIFY" | "OSM" | "MANUAL" | "REFERRAL" | "WEBSITE" | "AGENT_DISCOVERY"
  sourceId?: string
  confidence?: number
}

export async function createProviderLead(input: LeadInput) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const existing = await prisma.providerLead.findFirst({
    where: {
      OR: [
        ...(input.phone ? [{ phone: input.phone }] : []),
        ...(input.email ? [{ email: input.email }] : []),
        ...(input.sourceId ? [{ sourceId: input.sourceId }] : []),
      ],
    },
  })

  if (existing) {
    return { lead: existing, duplicate: true }
  }

  const lead = await prisma.providerLead.create({
    data: {
      ...input,
      status: "NEW",
      source: input.source as any,
    },
  })

  await auditService.log({
    event: "PROVIDER_SEARCHED",
    actorId: session.user.id,
    resource: "ProviderLead",
    resourceId: lead.id,
    metadata: { name: input.name, country: input.country },
  })

  return { lead, duplicate: false }
}
