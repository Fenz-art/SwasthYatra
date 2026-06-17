import { TravelHealthState, initialState } from "../state"
import {
  loadContextNode,
  severityNode,
  routerNode,
  providerNode,
  medicationNode,
  interpreterNode,
  planNode,
  reflectionNode,
} from "../nodes"

export type NodeName =
  | "LOAD_CONTEXT"
  | "SEVERITY"
  | "ROUTER"
  | "PROVIDER_SEARCH"
  | "MEDICATION_SEARCH"
  | "INTERPRETER_PREP"
  | "PLAN"
  | "REFLECT"

export const NODE_ORDER: NodeName[] = [
  "LOAD_CONTEXT",
  "SEVERITY",
  "ROUTER",
  "PROVIDER_SEARCH",
  "MEDICATION_SEARCH",
  "INTERPRETER_PREP",
  "PLAN",
  "REFLECT",
]

export const NODE_EXECUTORS: Record<NodeName, (state: TravelHealthState) => Promise<Partial<TravelHealthState>>> = {
  LOAD_CONTEXT: loadContextNode,
  SEVERITY: severityNode,
  ROUTER: routerNode,
  PROVIDER_SEARCH: providerNode,
  MEDICATION_SEARCH: medicationNode,
  INTERPRETER_PREP: interpreterNode,
  PLAN: planNode,
  REFLECT: reflectionNode,
}

export interface WorkflowResult {
  state: TravelHealthState
  nodeResults: Array<{ node: NodeName; output: Partial<TravelHealthState> }>
  success: boolean
  error?: string
}

export async function executeTravelNavigation(input: Partial<TravelHealthState>): Promise<WorkflowResult> {
  let state = initialState(input)
  const nodeResults: Array<{ node: NodeName; output: Partial<TravelHealthState> }> = []

  try {
    for (const nodeName of NODE_ORDER) {
      const executor = NODE_EXECUTORS[nodeName]
      const output = await executor(state)
      state = { ...state, ...output }
      nodeResults.push({ node: nodeName, output })
    }

    return { state, nodeResults, success: true }
  } catch (error) {
    return {
      state,
      nodeResults,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error in workflow",
    }
  }
}
