import { TravelHealthState, SeverityLevel, CareRecommendation } from "../state"

export async function routerNode(state: TravelHealthState): Promise<Partial<TravelHealthState>> {
  const recommendationMap: Record<SeverityLevel, CareRecommendation> = {
    [SeverityLevel.LOW]: CareRecommendation.SELF_CARE,
    [SeverityLevel.MEDIUM]: CareRecommendation.PHARMACY,
    [SeverityLevel.HIGH]: CareRecommendation.CLINIC,
    [SeverityLevel.CRITICAL]: CareRecommendation.EMERGENCY,
  }

  const recommendation = recommendationMap[state.severity!] ?? CareRecommendation.CLINIC

  return { recommendation }
}
