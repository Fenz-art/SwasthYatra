export interface OutcomeNode {
  id: string
  symptomGroup: string
  country: string
  ageRange?: string
  conditions?: string[]
}

export interface ProviderNode {
  id: string
  type: string
  ratingAverage: number | null
  successRate: number
  avgRecoveryHours: number
}

export interface MedicationNode {
  id: string
  name: string
  ingredient: string
  avgRecoveryHours: number
  confidence: number
}

export interface PredictedPath {
  provider: ProviderNode
  medication?: MedicationNode
  predictedRecoveryHours: number
  confidence: number
  sampleSize: number
}
