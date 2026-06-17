import { prisma } from "@/lib/prisma"

interface MedicationSearchInput {
  country?: string
  symptoms?: string[]
  ingredientName?: string
  limit?: number
}

export const medicationTool = {
  async search(input: MedicationSearchInput) {
    if (input.ingredientName) {
      const ingredient = await prisma.activeIngredient.findFirst({
        where: { name: { contains: input.ingredientName, mode: "insensitive" } },
      })
      if (!ingredient) return []

      return prisma.countryMedication.findMany({
        where: {
          activeIngredientId: ingredient.id,
          ...(input.country ? { country: { equals: input.country, mode: "insensitive" } } : {}),
        },
        include: { activeIngredient: true },
        take: input.limit ?? 5,
      })
    }

    return prisma.countryMedication.findMany({
      where: {
        ...(input.country ? { country: { equals: input.country, mode: "insensitive" } } : {}),
      },
      include: { activeIngredient: true },
      take: input.limit ?? 5,
    })
  },
}
