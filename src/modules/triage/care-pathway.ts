import { Severity } from "./severity-engine"

export type CarePathway = "SELF_CARE" | "PHARMACY" | "CLINIC" | "HOSPITAL" | "EMERGENCY"

export function selectCarePathway(severity: Severity): CarePathway {
  switch (severity) {
    case "LOW":
      return "SELF_CARE"
    case "MEDIUM":
      return "PHARMACY"
    case "HIGH":
      return "CLINIC"
    case "CRITICAL":
      return "EMERGENCY"
    default:
      return "CLINIC"
  }
}

export function getCarePathwayLabel(pathway: CarePathway): string {
  const labels: Record<CarePathway, string> = {
    SELF_CARE: "Self Care",
    PHARMACY: "Visit a Pharmacy",
    CLINIC: "Visit a Clinic",
    HOSPITAL: "Go to a Hospital",
    EMERGENCY: "Emergency - Call Immediately",
  }
  return labels[pathway]
}

export function getCarePathwayInstructions(pathway: CarePathway): string {
  const instructions: Record<CarePathway, string> = {
    SELF_CARE: "Rest, stay hydrated, and monitor symptoms. Use over-the-counter medications as needed.",
    PHARMACY: "Visit a local pharmacy for consultation. Pharmacists can recommend appropriate treatments.",
    CLINIC: "Visit a nearby clinic. A doctor can assess your condition and provide treatment.",
    HOSPITAL: "Go to a hospital emergency department or urgent care center.",
    EMERGENCY: "Call emergency services immediately. Do not wait.",
  }
  return instructions[pathway]
}
