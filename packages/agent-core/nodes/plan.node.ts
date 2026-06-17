import { TravelHealthState } from "../state"

export async function planNode(state: TravelHealthState): Promise<Partial<TravelHealthState>> {
  const providerInfo = state.providers?.length
    ? `Found ${state.providers.length} providers`
    : "No providers found"

  const medicationInfo = state.medicationSuggestions?.length
    ? `Found ${state.medicationSuggestions.length} medication options`
    : "No medications found"

  const outcome = [
    `Severity: ${state.severity}`,
    `Recommendation: ${state.recommendation}`,
    providerInfo,
    medicationInfo,
  ].join(". ")

  return { outcome }
}
