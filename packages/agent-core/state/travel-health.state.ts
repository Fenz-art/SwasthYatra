import { TravelHealthSession, HealthPassport, MedicalMemory, Provider } from "@prisma/client"

export enum SeverityLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum CareRecommendation {
  SELF_CARE = "SELF_CARE",
  PHARMACY = "PHARMACY",
  CLINIC = "CLINIC",
  HOSPITAL = "HOSPITAL",
  EMERGENCY = "EMERGENCY",
}

export interface MedicationResult {
  brandName: string
  activeIngredient: string
  country: string
  regulatoryCategory: string
  confidence: number
}

export interface TravelHealthState {
  userId: string
  journeyId: string
  goal: string
  symptoms: string[]
  country?: string
  city?: string
  severity?: SeverityLevel
  recommendation?: CareRecommendation
  passport?: HealthPassport | null
  memories?: MedicalMemory[]
  providers?: Provider[]
  selectedProvider?: Provider
  medicationSuggestions?: MedicationResult[]
  outcome?: string
  confidence?: number
  requiresHumanReview?: boolean
  messages: any[]
}

export const initialState = (overrides: Partial<TravelHealthState>): TravelHealthState => ({
  userId: "",
  journeyId: "",
  goal: "",
  symptoms: [],
  messages: [],
  ...overrides,
})
