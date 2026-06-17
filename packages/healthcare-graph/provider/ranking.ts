import { prisma } from "@/lib/prisma"
import { Provider } from "@prisma/client"

const R = 6371

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export interface RankedProvider {
  provider: Provider
  score: number
  distanceKm: number
  reasons: string[]
}

export interface RankingInput {
  latitude: number
  longitude: number
  country: string
  language?: string
  insurance?: string
  providerType?: string
  symptoms?: string[]
}

export async function rankProviders(providers: Provider[], input: RankingInput): Promise<RankedProvider[]> {
  const ranked = providers.map((provider) => {
    let score = 0
    const reasons: string[] = []

    const distance = calculateDistance(
      input.latitude,
      input.longitude,
      provider.lat ?? 0,
      provider.lng ?? 0
    )

    if (distance < 2) {
      score += 40
      reasons.push("Very close location")
    } else if (distance < 5) {
      score += 25
      reasons.push("Nearby location")
    } else if (distance < 10) {
      score += 15
    }

    if (input.language && provider.languages.some((l) => l.toLowerCase() === input.language!.toLowerCase())) {
      score += 30
      reasons.push("Speaks your language")
    }

    if (input.insurance && provider.insuranceAccepted.some((i) => i.toLowerCase() === input.insurance!.toLowerCase())) {
      score += 20
      reasons.push("Accepts your insurance")
    }

    if (provider.touristFriendly) {
      score += 15
      reasons.push("Tourist friendly")
    }

    score += (provider.ratingAverage ?? 0) * 5

    if (provider.verificationStatus === "VERIFIED") {
      score += 15
      reasons.push("Verified provider")
    }

    return { provider, score, distanceKm: Math.round(distance * 100) / 100, reasons }
  })

  return ranked.sort((a, b) => b.score - a.score)
}

export async function searchAndRank(input: RankingInput): Promise<RankedProvider[]> {
  const providers = await prisma.provider.findMany({
    where: {
      country: { equals: input.country, mode: "insensitive" },
      ...(input.providerType ? { type: input.providerType as any } : {}),
      verificationStatus: "VERIFIED",
    },
    include: { availability: true, reviews: true },
  })

  return rankProviders(providers, input)
}
