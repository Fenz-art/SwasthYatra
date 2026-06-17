import { prisma } from "@/lib/prisma"
import { Role, RegulatoryCategory, ProviderType, OutcomeResult } from "@prisma/client"

async function seedUsers() {
  const users = [
    {
      email: "maria@example.com",
      name: "Maria Rodriguez",
      role: "PATIENT" as Role,
      onboardingCompleted: true,
      bloodType: "O+",
      emergencyContact: { name: "Carlos Rodriguez", phone: "+52-555-123-4567", relation: "Spouse" },
      insuranceInfo: { provider: "AXA Travel Insurance", number: "AXA-2024-MX-789" }
    },
    {
      email: "sarah.chen@travelwell.com",
      name: "Dr. Sarah Chen",
      role: "DOCTOR" as Role,
      onboardingCompleted: true,
    },
    {
      email: "hiro.tanaka@tokyo-pharmacy.jp",
      name: "Hiro Tanaka",
      role: "PHARMACIST" as Role,
      onboardingCompleted: true,
    },
    {
      email: "admin@swasthyatra.com",
      name: "Demo Admin",
      role: "SUPER_ADMIN" as Role,
      onboardingCompleted: true,
    },
  ]

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: u,
      create: u,
    })
  }
  console.log("Seeded users")
}

async function seedActiveIngredients() {
  const ingredients = [
    { name: "Paracetamol", description: "Analgesic and antipyretic", mechanismOfAction: "COX inhibitor" },
    { name: "Ibuprofen", description: "NSAID for pain and inflammation", mechanismOfAction: "COX-1/COX-2 inhibitor" },
    { name: "Amoxicillin", description: "Penicillin antibiotic", mechanismOfAction: "Cell wall synthesis inhibitor" },
    { name: "Diphenhydramine", description: "First-generation antihistamine", mechanismOfAction: "H1 receptor antagonist" },
    { name: "Loratadine", description: "Second-generation antihistamine", mechanismOfAction: "H1 receptor antagonist" },
    { name: "Omeprazole", description: "Proton pump inhibitor", mechanismOfAction: "Gastric H+/K+ ATPase inhibitor" },
    { name: "Cetirizine", description: "Second-generation antihistamine", mechanismOfAction: "H1 receptor antagonist" },
    { name: "Azithromycin", description: "Macrolide antibiotic", mechanismOfAction: "50S ribosomal inhibitor" },
    { name: "Metformin", description: "Biguanide antidiabetic", mechanismOfAction: "AMPK activator" },
    { name: "Aspirin", description: "NSAID and antiplatelet", mechanismOfAction: "COX-1/COX-2 inhibitor" },
    { name: "Loperamide", description: "Antidiarrheal", mechanismOfAction: "Mu-opioid receptor agonist" },
    { name: "Diclofenac", description: "NSAID", mechanismOfAction: "COX-2 inhibitor" },
  ]

  for (const ing of ingredients) {
    await prisma.activeIngredient.upsert({
      where: { name: ing.name },
      update: ing,
      create: ing,
    })
  }
  console.log("Seeded active ingredients")
}

async function seedCountryMedications() {
  const data: { ingredient: string; country: string; brands: string[]; category: RegulatoryCategory; rx: boolean }[] = [
    { ingredient: "Paracetamol", country: "IN", brands: ["Crocin", "Calpol", "Dolo"], category: "OTC", rx: false },
    { ingredient: "Paracetamol", country: "US", brands: ["Tylenol", "Mapap", "Ofirmev"], category: "OTC", rx: false },
    { ingredient: "Paracetamol", country: "UK", brands: ["Calpol", "Panadol", "Hedex"], category: "OTC", rx: false },
    { ingredient: "Paracetamol", country: "JP", brands: ["Bufferin", "Pabron"], category: "OTC", rx: false },
    { ingredient: "Paracetamol", country: "MX", brands: ["Tempra", "Dolprone"], category: "OTC", rx: false },
    { ingredient: "Paracetamol", country: "AU", brands: ["Panadol", "Panamax"], category: "OTC", rx: false },
    { ingredient: "Paracetamol", country: "TH", brands: ["Paraceta", "Tylenol Thailand", "Sara"], category: "OTC", rx: false },
    { ingredient: "Paracetamol", country: "AE", brands: ["Panadol", "Adol"], category: "OTC", rx: false },
    { ingredient: "Paracetamol", country: "SG", brands: ["Panadol", "Tylenol"], category: "OTC", rx: false },
    { ingredient: "Paracetamol", country: "DE", brands: ["Ben-u-ron", "Paracetamol-ratiopharm"], category: "OTC", rx: false },

    { ingredient: "Ibuprofen", country: "IN", brands: ["Brufen", "Ibugesic", "Combiflam"], category: "OTC", rx: false },
    { ingredient: "Ibuprofen", country: "US", brands: ["Advil", "Motrin", "Midol"], category: "OTC", rx: false },
    { ingredient: "Ibuprofen", country: "UK", brands: ["Nurofen", "Calprofen", "Brufen"], category: "OTC", rx: false },
    { ingredient: "Ibuprofen", country: "JP", brands: ["EVE", "Brufen"], category: "PHARMACIST_ONLY", rx: false },
    { ingredient: "Ibuprofen", country: "TH", brands: ["Brufen Thailand", "Nurofen Thailand"], category: "OTC", rx: false },
    { ingredient: "Ibuprofen", country: "DE", brands: ["Dolormin", "Nurofen"], category: "OTC", rx: false },

    { ingredient: "Amoxicillin", country: "IN", brands: ["Mox", "Amoxil"], category: "PRESCRIPTION", rx: true },
    { ingredient: "Amoxicillin", country: "US", brands: ["Trimox", "Amoxil", "Moxatag"], category: "PRESCRIPTION", rx: true },
    { ingredient: "Amoxicillin", country: "UK", brands: ["Amoxil", "Galpram"], category: "PRESCRIPTION", rx: true },
    { ingredient: "Amoxicillin", country: "JP", brands: ["Amoxicillin Sawai", "Pasetocin"], category: "PRESCRIPTION", rx: true },
    { ingredient: "Amoxicillin", country: "MX", brands: ["Amoxicilina MK", "Amoxil"], category: "PRESCRIPTION", rx: true },

    { ingredient: "Diphenhydramine", country: "US", brands: ["Benadryl", "Unisom"], category: "OTC", rx: false },
    { ingredient: "Diphenhydramine", country: "UK", brands: ["Benadryl Allergy", "Nytol"], category: "OTC", rx: false },
    { ingredient: "Diphenhydramine", country: "JP", brands: ["Restamin", "Dramamine"], category: "OTC", rx: false },
    { ingredient: "Diphenhydramine", country: "IN", brands: ["Benadryl", "Draminate"], category: "OTC", rx: false },

    { ingredient: "Loratadine", country: "US", brands: ["Claritin", "Alavert"], category: "OTC", rx: false },
    { ingredient: "Loratadine", country: "UK", brands: ["Clarityn"], category: "OTC", rx: false },
    { ingredient: "Loratadine", country: "IN", brands: ["Lorfast", "Lorina"], category: "OTC", rx: false },
    { ingredient: "Loratadine", country: "DE", brands: ["Loratadin-ratiopharm", "Lisino"], category: "OTC", rx: false },

    { ingredient: "Omeprazole", country: "US", brands: ["Prilosec"], category: "OTC", rx: false },
    { ingredient: "Omeprazole", country: "UK", brands: ["Losec"], category: "OTC", rx: false },
    { ingredient: "Omeprazole", country: "IN", brands: ["Omez", "Omepro"], category: "OTC", rx: false },
    { ingredient: "Omeprazole", country: "DE", brands: ["Omeprazol-ratiopharm", "Antra"], category: "OTC", rx: false },

    { ingredient: "Cetirizine", country: "US", brands: ["Zyrtec"], category: "OTC", rx: false },
    { ingredient: "Cetirizine", country: "UK", brands: ["Zirtek"], category: "OTC", rx: false },
    { ingredient: "Cetirizine", country: "IN", brands: ["Zycet", "Alerid"], category: "OTC", rx: false },
    { ingredient: "Cetirizine", country: "DE", brands: ["Cetirizin-ratiopharm"], category: "OTC", rx: false },

    { ingredient: "Azithromycin", country: "IN", brands: ["Azee", "Azithral"], category: "PRESCRIPTION", rx: true },
    { ingredient: "Azithromycin", country: "US", brands: ["Zithromax", "Zmax"], category: "PRESCRIPTION", rx: true },
    { ingredient: "Azithromycin", country: "UK", brands: ["Zithromax"], category: "PRESCRIPTION", rx: true },
    { ingredient: "Azithromycin", country: "MX", brands: ["Azitromicina MK", "Zitromax"], category: "PRESCRIPTION", rx: true },

    { ingredient: "Metformin", country: "IN", brands: ["Glyciphage", "Metforic"], category: "PRESCRIPTION", rx: true },
    { ingredient: "Metformin", country: "US", brands: ["Glucophage", "Fortamet", "Glumetza"], category: "PRESCRIPTION", rx: true },
    { ingredient: "Metformin", country: "UK", brands: ["Glucophage"], category: "PRESCRIPTION", rx: true },
    { ingredient: "Metformin", country: "JP", brands: ["Metformin Hydrochloride Sawai", "Glycoran"], category: "PRESCRIPTION", rx: true },

    { ingredient: "Aspirin", country: "IN", brands: ["Disprin", "Ecotrin"], category: "OTC", rx: false },
    { ingredient: "Aspirin", country: "US", brands: ["Bayer Aspirin", "Ecotrin", "Bufferin"], category: "OTC", rx: false },
    { ingredient: "Aspirin", country: "UK", brands: ["Aspro", "Nu-Seals"], category: "OTC", rx: false },
    { ingredient: "Aspirin", country: "DE", brands: ["Aspirin", "ASS-ratiopharm"], category: "OTC", rx: false },
    { ingredient: "Aspirin", country: "JP", brands: ["Bufferin"], category: "OTC", rx: false },

    { ingredient: "Loperamide", country: "IN", brands: ["Lopamide", "Immodium"], category: "OTC", rx: false },
    { ingredient: "Loperamide", country: "US", brands: ["Imodium A-D"], category: "OTC", rx: false },
    { ingredient: "Loperamide", country: "UK", brands: ["Imodium"], category: "OTC", rx: false },
    { ingredient: "Loperamide", country: "JP", brands: ["Stopper", "Imodium Japan"], category: "OTC", rx: false },
    { ingredient: "Loperamide", country: "TH", brands: ["Imodium Thailand", "Lopamide Thailand"], category: "OTC", rx: false },

    { ingredient: "Diclofenac", country: "IN", brands: ["Voveran", "Diclomol"], category: "OTC", rx: false },
    { ingredient: "Diclofenac", country: "US", brands: ["Voltaren", "Cambia"], category: "OTC", rx: false },
    { ingredient: "Diclofenac", country: "UK", brands: ["Voltarol", "DicloMax"], category: "OTC", rx: false },
    { ingredient: "Diclofenac", country: "DE", brands: ["Voltaren", "Diclofenac-ratiopharm"], category: "OTC", rx: false },
  ]

  for (const d of data) {
    const ingredient = await prisma.activeIngredient.findUnique({ where: { name: d.ingredient } })
    if (!ingredient) continue

    await prisma.countryMedication.upsert({
      where: { activeIngredientId_country: { activeIngredientId: ingredient.id, country: d.country } },
      update: {
        commonBrands: d.brands,
        regulatoryCategory: d.category,
        requiresPrescription: d.rx,
      },
      create: {
        activeIngredientId: ingredient.id,
        country: d.country,
        commonBrands: d.brands,
        regulatoryCategory: d.category,
        requiresPrescription: d.rx,
      },
    })
  }
  console.log("Seeded country medications")
}

async function seedProviders() {
  const providers = [
    { name: "Tokyo Central Pharmacy", type: "PHARMACY" as ProviderType, country: "Japan", city: "Tokyo", lat: 35.6762, lng: 139.6503, languages: ["Japanese", "English"], specialties: ["General Pharmacy"], phone: "+81-3-1234-5678", estimatedCost: "¥2,000-5,000", costCurrency: "JPY", touristFriendly: true },
    { name: "Shinjuku Medical Clinic", type: "CLINIC" as ProviderType, country: "Japan", city: "Tokyo", lat: 35.6895, lng: 139.7004, languages: ["Japanese", "English", "Mandarin"], specialties: ["General Medicine", "Travel Medicine"], phone: "+81-3-2345-6789", estimatedCost: "¥10,000-20,000", costCurrency: "JPY", touristFriendly: true },
    { name: "St. Luke's International Hospital", type: "HOSPITAL" as ProviderType, country: "Japan", city: "Tokyo", lat: 35.6654, lng: 139.7746, languages: ["Japanese", "English", "French", "Spanish"], specialties: ["Emergency", "Internal Medicine", "Cardiology"], phone: "+81-3-3541-5151", estimatedCost: "¥50,000-200,000", costCurrency: "JPY", touristFriendly: true },
    { name: "Bangkok Pharmacy", type: "PHARMACY" as ProviderType, country: "Thailand", city: "Bangkok", lat: 13.7563, lng: 100.5018, languages: ["Thai", "English"], specialties: ["General Pharmacy"], phone: "+66-2-123-4567", touristFriendly: true },
    { name: "Bumrungrad International Clinic", type: "CLINIC" as ProviderType, country: "Thailand", city: "Bangkok", lat: 13.7495, lng: 100.5517, languages: ["Thai", "English", "Arabic", "Japanese"], specialties: ["General Medicine", "Travel Medicine", "Dermatology"], phone: "+66-2-667-1000", estimatedCost: "THB 3,000-10,000", costCurrency: "THB", touristFriendly: true },
    { name: "Bumrungrad International Hospital", type: "HOSPITAL" as ProviderType, country: "Thailand", city: "Bangkok", lat: 13.7490, lng: 100.5520, languages: ["Thai", "English", "Arabic", "Chinese", "Japanese"], specialties: ["Emergency", "Cardiology", "Orthopedics", "Pediatrics"], phone: "+66-2-667-1000", touristFriendly: true },
    { name: "Apollo Pharmacy", type: "PHARMACY" as ProviderType, country: "India", city: "Mumbai", lat: 19.0760, lng: 72.8777, languages: ["Hindi", "English", "Marathi"], specialties: ["General Pharmacy"], phone: "+91-22-1234-5678", touristFriendly: false },
    { name: "Medanta Medicity", type: "HOSPITAL" as ProviderType, country: "India", city: "Delhi", lat: 28.4665, lng: 77.0966, languages: ["Hindi", "English"], specialties: ["Cardiology", "Neurology", "Orthopedics", "Oncology"], phone: "+91-124-4141414", estimatedCost: "₹10,000-50,000", costCurrency: "INR", touristFriendly: true },
    { name: "Travel Medicine Clinic Dubai", type: "CLINIC" as ProviderType, country: "UAE", city: "Dubai", lat: 25.2048, lng: 55.2708, languages: ["Arabic", "English", "Hindi", "Urdu"], specialties: ["Travel Medicine", "General Medicine"], phone: "+971-4-123-4567", touristFriendly: true },
    { name: "Boots Pharmacy", type: "PHARMACY" as ProviderType, country: "UK", city: "London", lat: 51.5074, lng: -0.1278, languages: ["English"], specialties: ["General Pharmacy"], phone: "+44-20-1234-5678", touristFriendly: true },
  ]

  for (const p of providers) {
    const existing = await prisma.provider.findFirst({
      where: { name: p.name, country: p.country }
    })
    if (!existing) {
      await prisma.provider.create({ data: p as any })
    }
  }
  console.log("Seeded providers")
}

async function seedCountryHealthcareProfiles() {
  const profiles = [
    { country: "Japan", emergencyNumber: "119", prescriptionRules: "Most medications require Japanese prescription. Some OTC available at pharmacies with pharmacist consultation.", insuranceNotes: "Japan has universal healthcare. Tourists should have travel insurance.", touristGuidance: "Pharmacies (yakkyoku) are common. Look for green cross signs. Many hospitals have English-speaking staff." },
    { country: "Thailand", emergencyNumber: "1669", prescriptionRules: "Many medications available OTC that require prescription elsewhere. Antibiotics often available without prescription.", insuranceNotes: "Private hospitals are expensive. Travel insurance strongly recommended.", touristGuidance: "Pharmacies (ร้านขายยา) are everywhere. 7-Eleven sells basic OTC meds. International hospitals in Bangkok." },
    { country: "India", emergencyNumber: "112", prescriptionRules: "Most medications available without prescription, but controlled substances require prescription.", insuranceNotes: "Private hospitals offer high-quality care at fraction of Western costs.", touristGuidance: "Pharmacies (medical stores) are everywhere. Generic medications widely available and very affordable." },
    { country: "UAE", emergencyNumber: "998", prescriptionRules: "Strict prescription requirements. Some OTC meds available. Narcotics strictly controlled.", insuranceNotes: "Healthcare is high quality but expensive without insurance.", touristGuidance: "Pharmacies widely available. Many hospitals have 24/7 emergency. English widely spoken." },
    { country: "UK", emergencyNumber: "999", prescriptionRules: "Stringent prescription system. Most medications require GP prescription.", insuranceNotes: "NHS covers residents. Tourists need travel insurance.", touristGuidance: "Pharmacies (Boots, Lloyds) on every high street. Walk-in clinics available for minor issues." },
    { country: "Germany", emergencyNumber: "112", prescriptionRules: "Strict prescription system. Some medications OTC only at pharmacies.", insuranceNotes: "Universal healthcare for residents. Travel insurance essential for tourists.", touristGuidance: "Apotheke (pharmacy) signs are red. Pharmacists speak English in major cities. Notfallapotheke for emergency." },
    { country: "Mexico", emergencyNumber: "911", prescriptionRules: "Many medications available OTC. Antibiotics sometimes available without prescription.", insuranceNotes: "Private hospitals are affordable by US standards. Travel insurance recommended.", touristGuidance: "Farmacias everywhere. Ask for 'genérico' for cheaper generic versions. Major tourist areas have English-speaking doctors." },
    { country: "Australia", emergencyNumber: "000", prescriptionRules: "Strict prescription system. PBS subsidy for residents.", insuranceNotes: "Medicare covers residents. Tourists need travel insurance.", touristGuidance: "Chemist Warehouse and Priceline are common pharmacies. After-hours clinics available in cities." },
    { country: "Singapore", emergencyNumber: "995", prescriptionRules: "Stringent prescription requirements. Strict drug laws.", insuranceNotes: "Public healthcare subsidized for residents. Private healthcare expensive.", touristGuidance: "Pharmacies (Guardian, Watsons) in every mall. Strict penalties for drug possession. Excellent healthcare system." },
    { country: "Indonesia", emergencyNumber: "118", prescriptionRules: "Many medications available OTC. Some antibiotics require prescription.", insuranceNotes: "Healthcare quality varies. Travel insurance essential.", touristGuidance: "Apotek (pharmacy) signs are green. Bring basic medications. International clinics in Bali." },
  ]

  for (const p of profiles) {
    await prisma.countryHealthcareProfile.upsert({
      where: { country: p.country },
      update: p,
      create: p,
    })
  }
  console.log("Seeded country healthcare profiles")
}

async function seedDemoJourneys() {
  const maria = await prisma.user.findUnique({ where: { email: "maria@example.com" } })
  if (!maria) return

  const existingSession = await prisma.travelHealthSession.findFirst({
    where: { userId: maria.id }
  })
  if (existingSession) return

  // Journey 1: Food poisoning in Tokyo
  const session1 = await prisma.travelHealthSession.create({
    data: {
      userId: maria.id,
      country: "Japan",
      city: "Tokyo",
      language: "Spanish",
      symptoms: ["nausea", "vomiting", "diarrhea", "fever 38.5°C"],
      duration: "2 days",
      allergies: ["Penicillin", "Shellfish"],
      medications: ["Metformin 500mg", "Lisinopril 10mg"],
      severityLevel: "MEDIUM",
      status: "RESOLVED",
    }
  })

  // Also seed the passport for Maria
  await prisma.healthPassport.upsert({
    where: { userId: maria.id },
    update: {},
    create: {
      userId: maria.id,
      data: {
        conditions: [{ name: "Type 2 Diabetes", diagnosedAt: "2020-03-15" }, { name: "Hypertension", diagnosedAt: "2021-06-01" }],
        allergies: [{ allergen: "Penicillin", severity: "HIGH" }, { allergen: "Shellfish", severity: "MEDIUM" }],
        medications: [{ medication: "Metformin", dosage: "500mg", frequency: "Twice daily" }, { medication: "Lisinopril", dosage: "10mg", frequency: "Once daily" }],
        bloodType: "O+",
        emergencyContact: { name: "Carlos Rodriguez", phone: "+52-555-123-4567", relation: "Spouse" },
        insurance: { provider: "AXA Travel Insurance", number: "AXA-2024-MX-789" }
      },
      shareToken: "demo-share-token-maria",
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    }
  })

  const timeline1 = [
    { sessionId: session1.id, eventType: "SYMPTOM_ADDED", data: { symptoms: ["nausea", "vomiting"] } },
    { sessionId: session1.id, eventType: "SEVERITY_CALCULATED", data: { severity: "MEDIUM", reason: "Fever with GI symptoms" } },
    { sessionId: session1.id, eventType: "ROUTE_ASSIGNED", data: { route: "PHARMACY", recommendation: "Visit pharmacy for ORS and antidiarrheal" } },
    { sessionId: session1.id, eventType: "MED_RECOMMENDATION", data: { recommendation: "Smecta (diosmectite) available OTC in Japan. ORS at any pharmacy." } },
    { sessionId: session1.id, eventType: "PROVIDER_FOUND", data: { providerName: "Tokyo Central Pharmacy", type: "PHARMACY" } },
    { sessionId: session1.id, eventType: "INTERPRETER_STARTED", data: { patientLanguage: "Spanish", providerLanguage: "Japanese" } },
    { sessionId: session1.id, eventType: "OUTCOME_RECORDED", data: { result: "RECOVERED", recoveryTimeHours: 24 } },
  ]
  await prisma.journeyTimelineEvent.createMany({ data: timeline1 })

  await prisma.outcomeInsight.create({
    data: {
      travelHealthSessionId: session1.id,
      userId: maria.id,
      country: "Japan",
      city: "Tokyo",
      severity: "MEDIUM",
      symptoms: ["nausea", "vomiting", "diarrhea", "fever 38.5°C"],
      providerType: "PHARMACY",
      medicationUsed: "Smecta + ORS",
      result: "RECOVERED",
      recoveryTimeHours: 24,
    }
  })

  // Journey 2: Cold in Bangkok
  const session2 = await prisma.travelHealthSession.create({
    data: {
      userId: maria.id,
      country: "Thailand",
      city: "Bangkok",
      language: "Spanish",
      symptoms: ["sore throat", "cough", "runny nose", "low fever 37.8°C"],
      duration: "3 days",
      severityLevel: "LOW",
      status: "RESOLVED",
    }
  })

  await prisma.outcomeInsight.create({
    data: {
      travelHealthSessionId: session2.id,
      userId: maria.id,
      country: "Thailand",
      city: "Bangkok",
      severity: "LOW",
      symptoms: ["sore throat", "cough", "runny nose", "low fever 37.8°C"],
      providerType: "SELF_CARE",
      medicationUsed: "Paracetamol + rest",
      result: "RECOVERED",
      recoveryTimeHours: 72,
    }
  })

  console.log("Seeded demo journeys")
}

async function seedDrugInteractions() {
  const interactions = [
    { ingredientA: "Metformin", ingredientB: "Alcohol", severity: "MODERATE", description: "Increased risk of lactic acidosis", recommendation: "Limit alcohol intake while taking Metformin" },
    { ingredientA: "Aspirin", ingredientB: "Ibuprofen", severity: "MODERATE", description: "Increased risk of gastrointestinal bleeding", recommendation: "Avoid concurrent use of multiple NSAIDs" },
    { ingredientA: "Lisinopril", ingredientB: "Ibuprofen", severity: "MODERATE", description: "Reduced antihypertensive effect", recommendation: "Monitor blood pressure" },
    { ingredientA: "Metformin", ingredientB: "Lisinopril", severity: "MILD", description: "Potential for hyperkalemia", recommendation: "Monitor potassium levels" },
  ]

  for (const i of interactions) {
    await prisma.drugInteraction.upsert({
      where: { ingredientA_ingredientB: { ingredientA: i.ingredientA, ingredientB: i.ingredientB } },
      update: i,
      create: i,
    })
  }
  console.log("Seeded drug interactions")
}

async function seedNotificationTemplates() {
  const templates = [
    {
      key: "passport_shared",
      channels: { in_app: { title: "Passport Shared", body: "Your health passport was accessed." }, email: { subject: "Health Passport Shared", body: "Your SwasthYatra health passport was accessed by a provider." } },
      variables: ["userName"],
    },
    {
      key: "memory_approved",
      channels: { in_app: { title: "Medical Memory Updated", body: "New medical memory has been approved." }, email: { subject: "Medical Memory Updated", body: "A new medical record was added to your profile." } },
      variables: ["userName", "memoryType"],
    },
    {
      key: "candidates_ready",
      channels: { in_app: { title: "Candidates Ready for Review", body: "New document extractions are ready for your review." } },
      variables: ["userName", "count"],
    },
    {
      key: "provider_message",
      channels: { in_app: { title: "New Message", body: "You have a new message in your inbox." } },
      variables: ["providerName"],
    },
  ]

  for (const t of templates) {
    await prisma.notificationTemplate.upsert({
      where: { key: t.key },
      update: t,
      create: t,
    })
  }
  console.log("Seeded notification templates")
}

async function main() {
  await seedUsers()
  await seedActiveIngredients()
  await seedCountryMedications()
  await seedProviders()
  await seedCountryHealthcareProfiles()
  await seedDemoJourneys()
  await seedDrugInteractions()
  await seedNotificationTemplates()
  console.log("Seed complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
