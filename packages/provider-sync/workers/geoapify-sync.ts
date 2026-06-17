import { prisma } from "@/lib/prisma"
import { normalizeGeoapifyProvider } from "../normalizer"
import { deduplicateProvider } from "../normalizer/deduplicator"

export async function syncFromGeoapify(country: string, city: string): Promise<{
  found: number
  created: number
  duplicates: number
  errors: number
}> {
  const apiKey = process.env.GEOAPIFY_API_KEY
  if (!apiKey) {
    return { found: 0, created: 0, duplicates: 0, errors: 1 }
  }

  let found = 0
  let created = 0
  let duplicates = 0
  let errors = 0

  const categories = ["healthcare.hospital", "healthcare.pharmacy", "healthcare.clinic"]

  for (const category of categories) {
    try {
      const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=countrycode:${country.toLowerCase()}&filter=city:${encodeURIComponent(city)}&limit=20&apiKey=${apiKey}`
      const response = await fetch(url)

      if (!response.ok) continue

      const data = await response.json()
      const features = (data.features as Record<string, unknown>[]) ?? []

      for (const feature of features) {
        found++
        const normalized = normalizeGeoapifyProvider(feature)
        if (!normalized) {
          errors++
          continue
        }

        const { duplicate } = await deduplicateProvider(normalized)
        if (duplicate) {
          duplicates++
          continue
        }

        try {
          await prisma.providerLead.create({
            data: {
              name: normalized.name,
              type: normalized.type,
              country: normalized.country,
              city: normalized.city,
              address: normalized.address,
              lat: normalized.lat,
              lng: normalized.lng,
              phone: normalized.phone,
              email: normalized.email,
              website: normalized.website,
              source: "GEOAPIFY",
              sourceId: normalized.sourceId,
              status: "NEW",
            },
          })
          created++
        } catch {
          errors++
        }
      }
    } catch {
      errors++
    }
  }

  return { found, created, duplicates, errors }
}
