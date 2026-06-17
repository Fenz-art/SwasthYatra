import { Severity } from "./severity-engine"

export interface EscalationInput {
  severity: Severity
  age?: number
  pregnant?: boolean
  conditions?: string[]
  duration?: string
}

export function applyEscalationRules(input: EscalationInput): Severity {
  let severity = input.severity

  if (input.pregnant && severity === "HIGH") {
    return "CRITICAL"
  }

  if (input.age && input.age > 75 && severity === "HIGH") {
    return "CRITICAL"
  }

  if (input.age && input.age < 3 && severity === "HIGH") {
    return "CRITICAL"
  }

  if (input.conditions?.some((c) => c.toLowerCase().includes("heart disease") || c.toLowerCase().includes("diabetes"))) {
    if (severity === "HIGH") return "CRITICAL"
    if (severity === "MEDIUM") return "HIGH"
  }

  if (input.conditions?.some((c) => c.toLowerCase().includes("pregnancy"))) {
    if (severity === "MEDIUM") return "HIGH"
  }

  const isPersistent = (input.duration ?? "").toLowerCase().includes("month")
  if (isPersistent && severity === "LOW") {
    severity = "MEDIUM"
  }

  return severity
}
