import { prisma } from "@/lib/prisma"

export interface IngredientMatch {
  ingredientId: string
  ingredientName: string
  confidence: number
}

export async function findIngredientByBrand(brandName: string): Promise<IngredientMatch | null> {
  const medication = await prisma.medication.findFirst({
    where: { brandName: { equals: brandName, mode: "insensitive" } },
    include: { activeIngredient: true },
  })

  if (!medication) return null

  return {
    ingredientId: medication.activeIngredient.id,
    ingredientName: medication.activeIngredient.name,
    confidence: 0.95,
  }
}

export async function findIngredientByName(name: string): Promise<IngredientMatch | null> {
  const ingredient = await prisma.activeIngredient.findFirst({
    where: { name: { equals: name, mode: "insensitive" } },
  })

  if (!ingredient) return null

  return {
    ingredientId: ingredient.id,
    ingredientName: ingredient.name,
    confidence: 0.98,
  }
}

export async function brandToIngredientMap(brandName: string): Promise<{
  brand: string
  ingredient: string | null
  countryVariants: string[]
}> {
  const match = await findIngredientByBrand(brandName)

  if (!match) {
    return { brand: brandName, ingredient: null, countryVariants: [] }
  }

  const countryMeds = await prisma.countryMedication.findMany({
    where: { activeIngredientId: match.ingredientId },
    select: { commonBrands: true, country: true },
  })

  const countryVariants = countryMeds.flatMap((cm) => cm.commonBrands)

  return {
    brand: brandName,
    ingredient: match.ingredientName,
    countryVariants: [...new Set(countryVariants)],
  }
}
