import { TravelHealthState } from "../state"
import { medicationTool } from "../tools"

export async function medicationNode(state: TravelHealthState): Promise<Partial<TravelHealthState>> {
  if (!state.country) return {}

  const suggestions = await medicationTool.search({
    country: state.country,
    symptoms: state.symptoms,
  })

  const medicationSuggestions = suggestions.map((m) => ({
    brandName: m.commonBrands[0] ?? "",
    activeIngredient: m.activeIngredient.name,
    country: m.country,
    regulatoryCategory: m.regulatoryCategory,
    confidence: 0.85,
  }))

  return { medicationSuggestions }
}
