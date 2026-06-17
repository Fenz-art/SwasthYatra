export enum CarePathway {
  SELF_CARE = "SELF_CARE",
  PHARMACY = "PHARMACY",
  CLINIC = "CLINIC",
  HOSPITAL = "HOSPITAL",
  EMERGENCY = "EMERGENCY",
}

export interface NavigationInput {
  symptoms: string[]
  duration?: string
  country: string
  age?: number
  allergies?: string[]
  conditions?: string[]
  pregnant?: boolean
}

export interface NavigationDecision {
  severity: string
  pathway: CarePathway
  reason: string
  confidence: number
  requiresHumanReview: boolean
}
