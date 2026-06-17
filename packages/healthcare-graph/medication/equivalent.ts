import { prisma } from "@/lib/prisma"

export interface EquivalentResult {
  sourceBrand: string
  sourceCountry: string
  targetCountry: string
  targetBrand: string
  activeIngredient: string
  confidence: number
}

export async function findEquivalent(
  brandName: string,
  sourceCountry: string,
  targetCountry: string
): Promise<EquivalentResult | null> {
  const direct = await prisma.medicationEquivalent.findFirst({
    where: {
      sourceCountry: { equals: sourceCountry, mode: "insensitive" },
      sourceBrand: { equals: brandName, mode: "insensitive" },
      targetCountry: { equals: targetCountry, mode: "insensitive" },
    },
    include: { activeIngredient: true },
  })

  if (direct) {
    return {
      sourceBrand: direct.sourceBrand,
      sourceCountry: direct.sourceCountry,
      targetCountry: direct.targetCountry,
      targetBrand: direct.targetBrand,
      activeIngredient: direct.activeIngredient.name,
      confidence: direct.confidence,
    }
  }

  const medication = await prisma.medication.findFirst({
    where: { brandName: { equals: brandName, mode: "insensitive" } },
    include: { activeIngredient: true },
  })

  if (!medication) return null

  const countryMed = await prisma.countryMedication.findFirst({
    where: {
      activeIngredientId: medication.activeIngredient.id,
      country: { equals: targetCountry, mode: "insensitive" },
    },
  })

  if (!countryMed || !countryMed.commonBrands.length) return null

  return {
    sourceBrand: brandName,
    sourceCountry,
    targetCountry,
    targetBrand: countryMed.commonBrands[0],
    activeIngredient: medication.activeIngredient.name,
    confidence: 0.85,
  }
}

export async function findEquivalents(
  brandName: string,
  targetCountry: string
): Promise<EquivalentResult[]> {
  const medication = await prisma.medication.findFirst({
    where: { brandName: { equals: brandName, mode: "insensitive" } },
    include: { activeIngredient: true },
  })

  if (!medication) return []

  const equivalents = await prisma.medicationEquivalent.findMany({
    where: {
      activeIngredientId: medication.activeIngredient.id,
      targetCountry: { equals: targetCountry, mode: "insensitive" },
    },
    include: { activeIngredient: true },
  })

  if (equivalents.length > 0) {
    return equivalents.map((eq) => ({
      sourceBrand: eq.sourceBrand,
      sourceCountry: eq.sourceCountry,
      targetCountry: eq.targetCountry,
      targetBrand: eq.targetBrand,
      activeIngredient: eq.activeIngredient.name,
      confidence: eq.confidence,
    }))
  }

  const countryMed = await prisma.countryMedication.findFirst({
    where: {
      activeIngredientId: medication.activeIngredient.id,
      country: { equals: targetCountry, mode: "insensitive" },
    },
  })

  if (!countryMed || !countryMed.commonBrands.length) return []

  return [
    {
      sourceBrand: brandName,
      sourceCountry: "",
      targetCountry,
      targetBrand: countryMed.commonBrands[0],
      activeIngredient: medication.activeIngredient.name,
      confidence: 0.8,
    },
  ]
}
