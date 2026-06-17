import { prisma } from "@/lib/prisma"

export const providerRepository = {
  async findById(id: string) {
    return prisma.provider.findUnique({
      where: { id },
      include: { reviews: true, availability: true, contactChannels: true },
    })
  },

  async search(params: {
    country?: string
    city?: string
    type?: string
    language?: string
    specialty?: string
    lat?: number
    lng?: number
    radiusKm?: number
    limit?: number
  }) {
    const where: any = {}

    if (params.country) where.country = { equals: params.country, mode: "insensitive" }
    if (params.city) where.city = { equals: params.city, mode: "insensitive" }
    if (params.type) where.type = params.type as any
    if (params.language) where.languages = { has: params.language }
    if (params.specialty) where.specialties = { has: params.specialty }

    return prisma.provider.findMany({
      where,
      orderBy: [{ ratingAverage: "desc" }, { name: "asc" }],
      take: params.limit ?? 20,
    })
  },

  async create(data: {
    name: string
    type: string
    country: string
    city: string
    lat?: number
    lng?: number
    phone?: string
    email?: string
    languages?: string[]
    specialties?: string[]
  }) {
    return prisma.provider.create({ data: data as any })
  },

  async update(id: string, data: Record<string, unknown>) {
    return prisma.provider.update({ where: { id }, data: data as any })
  },

  async getReviews(providerId: string) {
    return prisma.providerReview.findMany({
      where: { providerId },
      orderBy: { createdAt: "desc" },
    })
  },

  async getAvailability(providerId: string) {
    return prisma.providerAvailability.findMany({
      where: { providerId },
      orderBy: { dayOfWeek: "asc" },
    })
  },

  async getLeads(params: { status?: string; country?: string; limit?: number }) {
    const where: any = {}
    if (params.status) where.status = params.status
    if (params.country) where.country = params.country
    return prisma.providerLead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: params.limit ?? 50,
    })
  },

  async getAssignments(journeyId: string) {
    return prisma.providerAssignment.findMany({
      where: { journeyId },
      include: { contactAttempts: true, conversations: true },
      orderBy: { priority: "asc" },
    })
  },
}
