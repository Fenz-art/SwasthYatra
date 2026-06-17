import { calculateSeverity, Severity } from "./severity-engine"
import { applyEscalationRules } from "./escalation-engine"
import { selectCarePathway, CarePathway } from "./care-pathway"

export interface NavigationInput {
  symptoms: string[]
  duration?: string
  country: string
  city?: string
  age?: number
  allergies?: string[]
  conditions?: string[]
  pregnant?: boolean
  userId?: string
}

export interface NavigationDecision {
  severity: Severity
  pathway: CarePathway
  reason: string
  confidence: number
  requiresHumanReview: boolean
}

export class NavigationOrchestrator {
  async route(input: NavigationInput): Promise<NavigationDecision> {
    let severity = calculateSeverity({
      symptoms: input.symptoms,
      duration: input.duration,
      age: input.age,
      conditions: input.conditions,
      pregnant: input.pregnant,
    })

    severity = applyEscalationRules({
      severity,
      age: input.age,
      pregnant: input.pregnant,
      conditions: input.conditions,
      duration: input.duration,
    })

    const pathway = selectCarePathway(severity)

    return {
      severity,
      pathway,
      reason: `Severity assessed as ${severity}. Recommended pathway: ${pathway}.`,
      confidence: severity === "CRITICAL" ? 0.95 : 0.9,
      requiresHumanReview: severity === "CRITICAL",
    }
  }
}

export const navigationOrchestrator = new NavigationOrchestrator()
