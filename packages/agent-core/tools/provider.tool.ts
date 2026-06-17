import { prisma } from "@/lib/prisma"

interface ProviderSearchInput {
  journeyId: string
  recommendation?: string
  country?: string
  city?: string
  limit?: number
}

export const providerTool = {
  async searchNearby(input: ProviderSearchInput) {
    const typeMap: Record<string, string> = {
      SELF_CARE: "",
      PHARMACY: "PHARMACY",
      CLINIC: "CLINIC",
      HOSPITAL: "HOSPITAL",
      EMERGENCY: "HOSPITAL",
    }

    const providerType = input.recommendation ? typeMap[input.recommendation] : undefined

    return prisma.provider.findMany({
      where: {
        ...(providerType ? { type: providerType as any } : {}),
        ...(input.country ? { country: { equals: input.country, mode: "insensitive" } } : {}),
        ...(input.city ? { city: { equals: input.city, mode: "insensitive" } } : {}),
      },
      take: input.limit ?? 5,
      include: { availability: true, reviews: true },
    })
  },

  async findById(id: string) {
    return prisma.provider.findUnique({
      where: { id },
      include: { availability: true, reviews: true },
    })
  },
}
