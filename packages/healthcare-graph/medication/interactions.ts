import { prisma } from "@/lib/prisma"

export interface InteractionResult {
  ingredientA: string
  ingredientB: string
  severity: string
  description: string
  mechanism: string | null
  recommendation: string | null
}

export async function checkInteraction(
  ingredientA: string,
  ingredientB: string
): Promise<InteractionResult | null> {
  const interaction = await prisma.drugInteraction.findFirst({
    where: {
      OR: [
        { ingredientA: { equals: ingredientA, mode: "insensitive" }, ingredientB: { equals: ingredientB, mode: "insensitive" } },
        { ingredientA: { equals: ingredientB, mode: "insensitive" }, ingredientB: { equals: ingredientA, mode: "insensitive" } },
      ],
    },
  })

  if (!interaction) return null

  return {
    ingredientA: interaction.ingredientA,
    ingredientB: interaction.ingredientB,
    severity: interaction.severity,
    description: interaction.description,
    mechanism: interaction.mechanism,
    recommendation: interaction.recommendation,
  }
}

export async function checkAllInteractions(ingredients: string[]): Promise<InteractionResult[]> {
  const results: InteractionResult[] = []

  for (let i = 0; i < ingredients.length; i++) {
    for (let j = i + 1; j < ingredients.length; j++) {
      const result = await checkInteraction(ingredients[i], ingredients[j])
      if (result) {
        results.push(result)
      }
    }
  }

  return results
}

const SEVERITY_ORDER: Record<string, number> = {
  MAJOR: 3,
  MODERATE: 2,
  MINOR: 1,
}

export function getHighestSeverityInteractions(interactions: InteractionResult[]): InteractionResult[] {
  return interactions.sort(
    (a, b) => (SEVERITY_ORDER[b.severity] ?? 0) - (SEVERITY_ORDER[a.severity] ?? 0)
  )
}
