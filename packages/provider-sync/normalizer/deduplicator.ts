import { prisma } from "@/lib/prisma"
import type { NormalizedProvider } from "./index"

export async function deduplicateProvider(provider: NormalizedProvider): Promise<{
  duplicate: boolean
  existingId?: string
}> {
  if (provider.sourceId) {
    const existing = await prisma.providerLead.findFirst({
      where: { sourceId: provider.sourceId },
    })
    if (existing) return { duplicate: true, existingId: existing.id }
  }

  if (provider.phone) {
    const existing = await prisma.providerLead.findFirst({
      where: { phone: provider.phone },
    })
    if (existing) return { duplicate: true, existingId: existing.id }
  }

  if (provider.name && provider.country && provider.city) {
    const existing = await prisma.provider.findFirst({
      where: {
        name: { equals: provider.name, mode: "insensitive" },
        country: { equals: provider.country, mode: "insensitive" },
        city: { equals: provider.city, mode: "insensitive" },
      },
    })
    if (existing) return { duplicate: true, existingId: existing.id }
  }

  return { duplicate: false }
}
