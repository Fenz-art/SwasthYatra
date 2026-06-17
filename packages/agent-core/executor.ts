import { passportTool, memoryTool, providerTool, medicationTool, journeyTool } from "./tools"

type ToolName = "passport" | "memory" | "provider" | "medication" | "journey"

export async function executeTool(toolName: ToolName, input: Record<string, unknown>) {
  switch (toolName) {
    case "passport":
      return passportTool.getPassport(input.userId as string)
    case "memory":
      return memoryTool.getMemories(input.userId as string)
    case "provider":
      return providerTool.searchNearby(input as any)
    case "medication":
      return medicationTool.search(input as any)
    case "journey":
      return journeyTool.getJourney(input.journeyId as string)
    default:
      throw new Error(`Unknown tool: ${toolName}`)
  }
}
