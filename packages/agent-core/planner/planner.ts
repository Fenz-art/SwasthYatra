export interface PlanStep {
  id: string
  action: string
  tool: string
  input: Record<string, unknown>
  dependsOn?: string[]
}

export function buildPlan(goal: string, context: Record<string, unknown>): PlanStep[] {
  const plan: PlanStep[] = []

  plan.push({
    id: "load-passport",
    action: "Retrieve user health passport",
    tool: "passport",
    input: {},
  })

  plan.push({
    id: "load-memories",
    action: "Retrieve medical memories",
    tool: "memory",
    input: {},
  })

  if (goal.toLowerCase().includes("medication") || goal.toLowerCase().includes("medicine")) {
    plan.push({
      id: "search-medication",
      action: "Search for medication equivalents",
      tool: "medication",
      input: { country: context.country as string },
      dependsOn: ["load-passport"],
    })
  }

  if (goal.toLowerCase().includes("provider") || goal.toLowerCase().includes("doctor") || goal.toLowerCase().includes("hospital")) {
    plan.push({
      id: "find-provider",
      action: "Search for nearby healthcare providers",
      tool: "provider",
      input: { country: context.country as string, city: context.city as string },
    })
  }

  plan.push({
    id: "generate-plan",
    action: "Generate healthcare navigation plan",
    tool: "plan",
    input: {},
    dependsOn: ["load-passport", "load-memories"],
  })

  return plan
}
