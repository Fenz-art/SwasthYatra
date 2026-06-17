"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { findEquivalent, findEquivalents } from "@/packages/healthcare-graph/medication/equivalent"
import { brandToIngredientMap, findIngredientByBrand } from "@/packages/healthcare-graph/medication/ingredient"
import { checkInteraction, checkAllInteractions } from "@/packages/healthcare-graph/medication/interactions"

export async function searchMedicationEquivalents(params: {
  brandName?: string
  activeIngredient?: string
  sourceCountry?: string
  targetCountry: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  if (params.brandName && params.sourceCountry) {
    const equivalents = await findEquivalents(params.brandName, params.targetCountry)
    if (equivalents.length > 0) {
      return { found: true, ingredient: equivalents[0].activeIngredient, equivalents }
    }
  }

  const mapping = params.brandName
    ? await brandToIngredientMap(params.brandName)
    : null

  let ingredient

  if (params.activeIngredient) {
    ingredient = await prisma.activeIngredient.findFirst({
      where: { name: { contains: params.activeIngredient, mode: "insensitive" } },
      include: {
        medications: true,
        countryMeds: {
          where: { country: params.targetCountry }
        }
      }
    })
  } else if (mapping?.ingredient) {
    ingredient = await prisma.activeIngredient.findUnique({
      where: { name: mapping.ingredient },
      include: {
        countryMeds: { where: { country: params.targetCountry } }
      }
    })
  }

  if (!ingredient) {
    return { found: false, equivalents: [] }
  }

  return {
    found: true,
    ingredient: ingredient.name,
    equivalents: ingredient.countryMeds.map(cm => ({
      country: cm.country,
      brands: cm.commonBrands,
      regulatoryCategory: cm.regulatoryCategory,
      requiresPrescription: cm.requiresPrescription,
      estimatedCost: cm.estimatedCost,
    }))
  }
}

export async function getMedicationDetail(medicationId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const medication = await prisma.medication.findUnique({
    where: { id: medicationId },
    include: {
      activeIngredient: {
        include: {
          countryMeds: true
        }
      }
    }
  })
  if (!medication) throw new Error("Medication not found")

  return medication
}

export async function checkDrugInteraction(medicationA: string, medicationB: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const result = await checkInteraction(medicationA, medicationB)
  return result
}

export async function checkDrugInteractions(ingredients: string[]) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return checkAllInteractions(ingredients)
}
