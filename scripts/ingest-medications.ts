import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Mock data representing what would be fetched from FDA / WHO ATC APIs
const medicationDataset = [
  { ingredient: "Paracetamol", country: "India", brand: "Crocin", otc: true },
  { ingredient: "Paracetamol", country: "USA", brand: "Tylenol", otc: true },
  { ingredient: "Paracetamol", country: "Japan", brand: "Bufferin", otc: true },
  { ingredient: "Paracetamol", country: "Mexico", brand: "Tempra", otc: true },
  { ingredient: "Loperamide", country: "India", brand: "Eldoper", otc: true },
  { ingredient: "Loperamide", country: "USA", brand: "Imodium", otc: true },
  { ingredient: "Loperamide", country: "Japan", brand: "Loperin", otc: true },
  { ingredient: "Ibuprofen", country: "India", brand: "Brufen", otc: true },
  { ingredient: "Ibuprofen", country: "USA", brand: "Advil", otc: true },
  { ingredient: "Ibuprofen", country: "Japan", brand: "Ibuprofen", otc: true },
];

async function main() {
  console.log("Starting Medication Graph ingestion...");

  for (const med of medicationDataset) {
    // 1. Upsert Active Ingredient
    const ingredient = await prisma.activeIngredient.upsert({
      where: { name: med.ingredient },
      update: {},
      create: { name: med.ingredient },
    });

    // 2. Upsert Country Medication mapping
    const existing = await prisma.countryMedication.findFirst({
      where: { activeIngredientId: ingredient.id, country: med.country }
    })

    if (existing) {
      const brands = existing.commonBrands
      if (!brands.includes(med.brand)) {
        brands.push(med.brand)
      }
      await prisma.countryMedication.update({
        where: { id: existing.id },
        data: { commonBrands: brands },
      })
    } else {
      await prisma.countryMedication.create({
        data: {
          activeIngredientId: ingredient.id,
          country: med.country,
          commonBrands: [med.brand],
        },
      })
    }

    console.log(`[OK] ${med.ingredient} -> ${med.country} -> ${med.brand}`);
  }

  console.log("Medication Graph ingestion complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
