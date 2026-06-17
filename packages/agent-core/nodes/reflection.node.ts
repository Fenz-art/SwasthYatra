import { TravelHealthState } from "../state"

export async function reflectionNode(state: TravelHealthState): Promise<Partial<TravelHealthState>> {
  let confidence = 0.95

  if (!state.providers?.length && state.recommendation !== "SELF_CARE") {
    confidence -= 0.2
  }

  if (!state.medicationSuggestions?.length && state.recommendation !== "SELF_CARE") {
    confidence -= 0.1
  }

  if (state.severity === "CRITICAL") {
    confidence = Math.min(confidence, 0.7)
  }

  return {
    confidence,
    requiresHumanReview: confidence < 0.7 || state.severity === "CRITICAL",
  }
}
