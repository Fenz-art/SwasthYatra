import { TravelHealthState } from "../state"
import { providerTool } from "../tools"

export async function providerNode(state: TravelHealthState): Promise<Partial<TravelHealthState>> {
  const providers = await providerTool.searchNearby({
    journeyId: state.journeyId,
    recommendation: state.recommendation,
    country: state.country,
    city: state.city,
  })

  return { providers }
}
