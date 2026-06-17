import { TravelHealthState } from "../state"
import { passportTool, memoryTool } from "../tools"

export async function loadContextNode(state: TravelHealthState): Promise<Partial<TravelHealthState>> {
  const passport = await passportTool.getPassport(state.userId)
  const memories = await memoryTool.getMemories(state.userId)

  return { passport, memories }
}
