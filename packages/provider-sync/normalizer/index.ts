export interface NormalizedProvider {
  name: string
  type: string
  country: string
  city: string
  address?: string
  lat?: number
  lng?: number
  phone?: string
  email?: string
  website?: string
  languages: string[]
  specialties: string[]
  source: string
  sourceId: string
  hours?: Record<string, { open: string; close: string }>
}

export function normalizeOsmProvider(osm: Record<string, unknown>): NormalizedProvider | null {
  const tags = (osm.tags as Record<string, string>) ?? {}

  const name = tags.name ?? osm.name as string ?? ""
  if (!name) return null

  const type = mapOsmAmenity(tags.amenity ?? "")
  const lat = parseFloat(osm.lat as string) || undefined
  const lng = parseFloat(osm.lon as string) || undefined

  return {
    name,
    type,
    country: tags["addr:country"] ?? "",
    city: tags["addr:city"] ?? tags["addr:town"] ?? tags["addr:village"] ?? "",
    address: [tags["addr:street"], tags["addr:housenumber"]].filter(Boolean).join(" ") || undefined,
    lat,
    lng,
    phone: tags.phone ?? tags["contact:phone"] ?? undefined,
    email: tags.email ?? tags["contact:email"] ?? undefined,
    website: tags.website ?? tags["contact:website"] ?? undefined,
    languages: [],
    specialties: [],
    source: "OSM",
    sourceId: String(osm.id ?? ""),
    hours: parseOpeningHours(tags.opening_hours ?? ""),
  }
}

export function normalizeGeoapifyProvider(geo: Record<string, unknown>): NormalizedProvider | null {
  const properties = (geo.properties as Record<string, unknown>) ?? {}
  const name = (properties.name as string) ?? ""
  if (!name) return null

  return {
    name,
    type: mapGeoapifyType((properties.categories as string) ?? ""),
    country: (properties.country as string) ?? "",
    city: (properties.city as string) ?? "",
    address: (properties.formatted as string) ?? undefined,
    lat: (properties.lat as number) ?? (geo.lat as number) ?? undefined,
    lng: (properties.lon as number) ?? (geo.lon as number) ?? undefined,
    phone: (properties.phone as string) ?? undefined,
    email: (properties.email as string) ?? undefined,
    website: (properties.website as string) ?? undefined,
    languages: [],
    specialties: [],
    source: "GEOAPIFY",
    sourceId: (properties.place_id as string) ?? "",
  }
}

function mapOsmAmenity(amenity: string): string {
  const map: Record<string, string> = {
    hospital: "HOSPITAL",
    clinic: "CLINIC",
    pharmacy: "PHARMACY",
    doctors: "CLINIC",
    dentist: "CLINIC",
    veterinary: "CLINIC",
  }
  return map[amenity] ?? "CLINIC"
}

function mapGeoapifyType(categories: string): string {
  if (categories.includes("hospital")) return "HOSPITAL"
  if (categories.includes("pharmacy")) return "PHARMACY"
  if (categories.includes("clinic") || categories.includes("doctor")) return "CLINIC"
  return "CLINIC"
}

function parseOpeningHours(hours: string): Record<string, { open: string; close: string }> | undefined {
  if (!hours) return undefined
  return {}
}
