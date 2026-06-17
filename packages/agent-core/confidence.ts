export interface ConfidenceScore {
  overall: number
  factors: ConfidenceFactor[]
}

export interface ConfidenceFactor {
  name: string
  score: number
  weight: number
}

export function calculateConfidence(factors: ConfidenceFactor[]): ConfidenceScore {
  const totalWeight = factors.reduce((sum, f) => sum + f.weight, 0)

  if (totalWeight === 0) {
    return { overall: 0.5, factors }
  }

  const weightedSum = factors.reduce((sum, f) => sum + f.score * f.weight, 0)
  const overall = weightedSum / totalWeight

  return { overall: Math.round(overall * 100) / 100, factors }
}
