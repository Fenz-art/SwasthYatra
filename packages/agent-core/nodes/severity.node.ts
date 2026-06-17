import { TravelHealthState, SeverityLevel } from "../state"

const CRITICAL_SYMPTOMS = [
  "chest pain", "difficulty breathing", "shortness of breath",
  "unconscious", "unresponsive", "severe bleeding",
  "stroke symptoms", "seizure", "anaphylaxis",
]

const HIGH_RISK_SYMPTOMS = [
  "high fever", "persistent vomiting", "dehydration",
  "severe abdominal pain", "severe headache",
]

export async function severityNode(state: TravelHealthState): Promise<Partial<TravelHealthState>> {
  const normalized = state.symptoms.map((s) => s.toLowerCase())

  const hasCritical = normalized.some((s) =>
    CRITICAL_SYMPTOMS.some((c) => s.includes(c))
  )
  if (hasCritical) {
    return { severity: SeverityLevel.CRITICAL }
  }

  const hasHigh = normalized.some((s) =>
    HIGH_RISK_SYMPTOMS.some((h) => s.includes(h))
  )
  if (hasHigh) {
    return { severity: SeverityLevel.HIGH }
  }

  const hasFever = normalized.some((s) => s.includes("fever"))
  const hasPain = normalized.some((s) => s.includes("pain"))
  if (hasFever || (hasPain && normalized.length >= 2)) {
    return { severity: SeverityLevel.MEDIUM }
  }

  return { severity: SeverityLevel.LOW }
}
