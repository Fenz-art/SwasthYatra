import { prisma } from "@/lib/prisma"
import { normalizeOsmProvider, type NormalizedProvider } from "../normalizer"
import { deduplicateProvider } from "../normalizer/deduplicator"

export async function syncFromOsm(country: string, city: string): Promise<{
  found: number
  created: number
  duplicates: number
  errors: number
}> {
  let found = 0
  let created = 0
  let duplicates = 0
  let errors = 0

  const overpassQuery = `
    [out:json];
    area["name"="${city}"]->.searchArea;
    (
      node["amenity"~"hospital|clinic|pharmacy"](area.searchArea);
      way["amenity"~"hospital|clinic|pharmacy"](area.searchArea);
    );
    out body;
  `

  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: `data=${encodeURIComponent(overpassQuery)}`,
    })

    if (!response.ok) {
      return { found: 0, created: 0, duplicates: 0, errors: 1 }
    }

    const data = await response.json()
    const elements = data.elements ?? []

    for (const element of elements) {
      found++
      const normalized = normalizeOsmProvider(element)
      if (!normalized) {
        errors++
        continue
      }

      normalized.country = country
      normalized.city = city

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
            source: "OSM",
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

  return { found, created, duplicates, errors }
}
