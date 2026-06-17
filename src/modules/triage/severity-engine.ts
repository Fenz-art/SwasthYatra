import { hasRedFlags } from "./red-flags"

export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"

export interface SeverityInput {
  symptoms: string[]
  duration?: string
  age?: number
  conditions?: string[]
  pregnant?: boolean
}

const CRITICAL_SYMPTOMS = [
  "chest pain", "difficulty breathing", "shortness of breath",
  "unconscious", "unresponsive", "severe bleeding",
  "stroke symptoms", "seizure", "anaphylaxis", "severe head trauma",
]

const HIGH_RISK_SYMPTOMS = [
  "high fever", "persistent vomiting", "dehydration",
  "severe abdominal pain", "severe headache", "severe pain",
]

export function calculateSeverity(input: SeverityInput): Severity {
  if (hasRedFlags(input.symptoms) || input.symptoms.some((s) =>
    CRITICAL_SYMPTOMS.some((c) => s.toLowerCase().includes(c))
  )) {
    return "CRITICAL"
  }

  const hasSeverePain = input.symptoms.some((s) => s.toLowerCase().includes("severe"))
  const isLongDuration = (input.duration ?? "").toLowerCase().includes("week") || (input.duration ?? "").toLowerCase().includes("month")

  if (hasSeverePain || isLongDuration) {
    return "HIGH"
  }

  const hasHighRisk = input.symptoms.some((s) =>
    HIGH_RISK_SYMPTOMS.some((h) => s.toLowerCase().includes(h))
  )
  if (hasHighRisk) {
    return "HIGH"
  }

  const hasFever = input.symptoms.some((s) => s.toLowerCase().includes("fever"))
  const hasPain = input.symptoms.some((s) => s.toLowerCase().includes("pain"))
  const isShortDuration = (input.duration ?? "").toLowerCase().includes("hour") || (input.duration ?? "").toLowerCase().includes("day")

  if (hasFever || (hasPain && isShortDuration)) {
    return "MEDIUM"
  }

  if (input.symptoms.length >= 3) {
    return "MEDIUM"
  }

  return "LOW"
}
