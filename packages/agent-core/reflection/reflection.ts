export interface ReflectionResult {
  score: number
  findings: string[]
  safe: boolean
}

export function evaluateExecution(goal: string, result: Record<string, unknown>): ReflectionResult {
  const findings: string[] = []
  let score = 1.0

  if (!result || Object.keys(result).length === 0) {
    score -= 0.5
    findings.push("No result produced")
  }

  if (result.error) {
    score -= 0.4
    findings.push(`Execution error: ${result.error}`)
  }

  if (result.providers && Array.isArray(result.providers) && result.providers.length === 0) {
    score -= 0.1
    findings.push("No providers found in the area")
  }

  if (result.medicationSuggestions && Array.isArray(result.medicationSuggestions) && result.medicationSuggestions.length === 0) {
    score -= 0.1
    findings.push("No medication suggestions found")
  }

  if (score >= 0.8) {
    findings.push("Execution completed with high confidence")
  } else if (score >= 0.5) {
    findings.push("Execution completed with moderate confidence")
  } else {
    findings.push("Execution completed with low confidence - may require human review")
  }

  return {
    score: Math.max(0, score),
    findings,
    safe: score >= 0.5,
  }
}
