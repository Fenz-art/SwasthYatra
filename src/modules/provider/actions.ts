"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auditService } from "@/server/audit/service"
import { publishers } from "@/packages/event-bus"
import { searchAndRank, rankProviders } from "@/packages/healthcare-graph/provider/ranking"

export async function searchProviders(params: {
  country: string
  city?: string
  type?: string
  language?: string
  specialty?: string
  latitude?: number
  longitude?: number
  insurance?: string
  symptoms?: string[]
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  let providers: any
  let total: number

  if (params.latitude && params.longitude) {
    const ranked = await searchAndRank({
      latitude: params.latitude,
      longitude: params.longitude,
      country: params.country,
      language: params.language,
      insurance: params.insurance,
      providerType: params.type,
      symptoms: params.symptoms,
    })
    providers = ranked.slice(0, 20)
    total = ranked.length
  } else {
    const where: any = {
      country: { equals: params.country, mode: "insensitive" },
    }

    if (params.city) where.city = { equals: params.city, mode: "insensitive" }
    if (params.type) where.type = params.type as any
    if (params.language) where.languages = { has: params.language }
    if (params.specialty) where.specialties = { has: params.specialty }

    const results = await prisma.provider.findMany({
      where,
      orderBy: [{ ratingAverage: "desc" }, { name: "asc" }],
      take: 20,
    })
    providers = results
    total = results.length
  }

  await auditService.log({
    event: "PROVIDER_SEARCHED",
    actorId: session.user.id,
    resource: "Provider",
    metadata: params as any,
  })

  return { providers, total }
}

export async function getProviderDetail(providerId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const provider = await prisma.provider.findUnique({
    where: { id: providerId },
    include: {
      reviews: { orderBy: { createdAt: "desc" }, take: 10 },
      availability: true,
      contactChannels: true,
    }
  })
  if (!provider) throw new Error("Provider not found")

  await auditService.log({
    event: "PROVIDER_VIEWED",
    actorId: session.user.id,
    resource: "Provider",
    resourceId: providerId,
  })

  return provider
}

export async function createProviderReview(data: {
  providerId: string
  rating: number
  comment?: string
  language?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const existing = await prisma.providerReview.findUnique({
    where: { providerId_userId: { providerId: data.providerId, userId: session.user.id } }
  })
  if (existing) throw new Error("You have already reviewed this provider")

  const review = await prisma.providerReview.create({
    data: {
      providerId: data.providerId,
      userId: session.user.id,
      userName: session.user.name || undefined,
      rating: data.rating,
      comment: data.comment,
      language: data.language,
    }
  })

  // Update provider rating average
  const stats = await prisma.providerReview.aggregate({
    where: { providerId: data.providerId },
    _avg: { rating: true },
    _count: true,
  })

  await prisma.provider.update({
    where: { id: data.providerId },
    data: {
      ratingAverage: stats._avg.rating || 0,
      ratingCount: stats._count,
    }
  })

  await auditService.log({
    event: "PROVIDER_REVIEWED",
    actorId: session.user.id,
    resource: "ProviderReview",
    resourceId: review.id,
    metadata: { providerId: data.providerId, rating: data.rating }
  })

  revalidatePath(`/dashboard/providers/${data.providerId}`)
  return review
}

export async function contactProvider(providerId: string, message: string, channel: string = "IN_APP") {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const inbox = await prisma.providerInbox.create({
    data: {
      providerId,
      sessionId: undefined,
      title: `Message from ${session.user.name || "Traveler"}`,
      message,
      priority: "NORMAL",
      status: "UNREAD",
    }
  })

  await auditService.log({
    event: "PROVIDER_CONTACTED",
    actorId: session.user.id,
    resource: "ProviderInbox",
    resourceId: inbox.id,
    metadata: { providerId, channel }
  })

  publishers.providerContacted({
    providerId,
    userId: session.user.id,
    channel,
    messageId: inbox.id,
  })

  return inbox
}
