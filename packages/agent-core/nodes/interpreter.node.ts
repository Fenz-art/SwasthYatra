import { TravelHealthState } from "../state"

export async function interpreterNode(state: TravelHealthState): Promise<Partial<TravelHealthState>> {
  return {
    messages: [
      ...state.messages,
      {
        role: "system",
        content: `Interpreter context prepared: ${state.memories?.length ?? 0} medical memories available`,
      },
    ],
  }
}
