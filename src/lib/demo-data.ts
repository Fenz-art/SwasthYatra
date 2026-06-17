export interface DemoTimelineEvent {
  time: string
  action: string
  status: "completed" | "in-progress" | "pending"
  detail?: string
}

export interface DemoTraveler {
  id: string
  name: string
  country: string
  flag: string
  city: string
  issue: string
  symptoms: string[]
  language: string
  insurance: string
  severity: string
  pathway: string
  timeline: DemoTimelineEvent[]
}

export interface DemoProvider {
  id: string
  name: string
  city: string
  country: string
  specialty: string
  score: number
  languages: string[]
  acceptsInsurance: boolean
  openNow: boolean
  rating: number
  phone: string
  address: string
  reasons: string[]
  price: string
}

export interface DemoConversation {
  id: string
  providerId: string
  providerName: string
  travelerId: string
  travelerName: string
  messages: { sender: string; content: string; time: string; status?: string }[]
  status: string
}

export interface DemoOutcome {
  id: string
  travelerId: string
  travelerName: string
  providerId: string
  providerName: string
  treatment: string
  resolution: string
  rating: number
  recoveryHours: number
  date: string
  symptoms: string[]
}

export interface DemoRole {
  id: string
  label: string
  icon: string
  description: string
  route: string
  color: string
}

export const DEMO_ROLES: DemoRole[] = [
  { id: "patient", label: "Patient OS", icon: "🛡️", description: "See the journey through the traveler's eyes", route: "/demo/patient", color: "from-blue-500 to-cyan-500" },
  { id: "doctor", label: "Doctor OS", icon: "🩺", description: "Provider inbox, assignments, interpreter", route: "/demo/doctor", color: "from-emerald-500 to-teal-500" },
  { id: "pharmacist", label: "Pharmacist OS", icon: "💊", description: "Medication intelligence & equivalents", route: "/demo/pharmacist", color: "from-purple-500 to-violet-500" },
  { id: "hospital", label: "Hospital OS", icon: "🏥", description: "Capacity, network, emergency queue", route: "/demo/hospital", color: "from-rose-500 to-pink-500" },
  { id: "organization", label: "Organization OS", icon: "🏢", description: "Insurance & enterprise overview", route: "/demo/organization", color: "from-amber-500 to-orange-500" },
  { id: "operator", label: "Operator OS", icon: "🎛️", description: "Escalations, monitoring, oversight", route: "/demo/operator", color: "from-slate-600 to-slate-800" },
  { id: "agent-workspace", label: "Agent Workspace", icon: "🤖", description: "Watch the AI execute in real-time", route: "/demo/agent-workspace", color: "from-indigo-500 to-purple-600" },
  { id: "docs", label: "Documentation Hub", icon: "📚", description: "Architecture, API, SDK, workflows", route: "/demo/docs", color: "from-gray-600 to-gray-800" },
]

export const DEMO_TRAVELERS: DemoTraveler[] = [
  {
    id: "sarah",
    name: "Sarah Johnson",
    country: "Japan",
    flag: "🇯🇵",
    city: "Tokyo",
    issue: "Food Poisoning",
    symptoms: ["Vomiting", "Diarrhea", "Stomach Pain", "Dehydration"],
    language: "English",
    insurance: "Aetna Global",
    severity: "MEDIUM",
    pathway: "PHARMACY",
    timeline: [
      { time: "09:02", action: "Journey Created", status: "completed" },
      { time: "09:03", action: "Passport Loaded", status: "completed" },
      { time: "09:03", action: "Medical Memory Loaded", status: "completed" },
      { time: "09:04", action: "Severity Assessed", status: "completed", detail: "MEDIUM - Requires prompt care" },
      { time: "09:04", action: "Care Pathway Routed", status: "completed", detail: "PHARMACY - Oral rehydration + antiemetics" },
      { time: "09:05", action: "Provider Search Started", status: "completed", detail: "24 providers found in Tokyo" },
      { time: "09:06", action: "Providers Ranked", status: "completed", detail: "Top score: 92" },
      { time: "09:07", action: "WhatsApp Outreach Sent", status: "completed", detail: "Tokyo Medical Clinic" },
      { time: "09:08", action: "Provider Accepted", status: "completed" },
      { time: "09:08", action: "Conversation Created", status: "completed" },
      { time: "09:09", action: "Interpreter Prepared", status: "completed", detail: "English ↔ Japanese" },
      { time: "09:10", action: "Care Plan Generated", status: "completed" },
      { time: "09:12", action: "Treatment Received", status: "completed" },
      { time: "09:14", action: "Outcome Recorded", status: "completed" },
    ],
  },
  {
    id: "michael",
    name: "Michael Chen",
    country: "Thailand",
    flag: "🇹🇭",
    city: "Bangkok",
    issue: "Skin Rash",
    symptoms: ["Redness", "Itching", "Swelling", "Warmth"],
    language: "Mandarin",
    insurance: "Blue Cross Travel",
    severity: "LOW",
    pathway: "DERMATOLOGY",
    timeline: [
      { time: "10:15", action: "Journey Created", status: "completed" },
      { time: "10:16", action: "Passport Loaded", status: "completed" },
      { time: "10:16", action: "Severity Assessed", status: "completed", detail: "LOW - Non-urgent" },
      { time: "10:17", action: "Provider Search Started", status: "completed", detail: "8 dermatologists found" },
      { time: "10:18", action: "Providers Ranked", status: "completed" },
      { time: "10:19", action: "WhatsApp Outreach Sent", status: "completed" },
      { time: "10:21", action: "Provider Accepted", status: "completed" },
      { time: "10:22", action: "Conversation Created", status: "completed" },
      { time: "10:25", action: "Treatment Received", status: "completed" },
      { time: "10:27", action: "Outcome Recorded", status: "completed" },
    ],
  },
  {
    id: "emma",
    name: "Emma Schmidt",
    country: "Germany",
    flag: "🇩🇪",
    city: "Berlin",
    issue: "Medication Refill",
    symptoms: ["Asthma", "Shortness of Breath", "Wheezing"],
    language: "German",
    insurance: "Allianz Global",
    severity: "HIGH",
    pathway: "PRESCRIPTION",
    timeline: [
      { time: "14:00", action: "Journey Created", status: "completed" },
      { time: "14:01", action: "Passport Loaded", status: "completed" },
      { time: "14:01", action: "Medical Memory Loaded", status: "completed" },
      { time: "14:02", action: "Severity Assessed", status: "completed", detail: "HIGH - Requires urgent prescription" },
      { time: "14:02", action: "Care Pathway Routed", status: "completed", detail: "PRESCRIPTION - Inhaler refill" },
      { time: "14:03", action: "Provider Search Started", status: "completed", detail: "12 providers found" },
      { time: "14:04", action: "Providers Ranked", status: "completed" },
      { time: "14:05", action: "WhatsApp Outreach Sent", status: "completed" },
      { time: "14:07", action: "Provider Accepted", status: "completed" },
      { time: "14:10", action: "Prescription Verified", status: "completed" },
      { time: "14:15", action: "Outcome Recorded", status: "completed" },
    ],
  },
  {
    id: "sarah-2",
    name: "Sarah Johnson",
    country: "Japan",
    flag: "🇯🇵",
    city: "Tokyo",
    issue: "Food Poisoning",
    symptoms: ["Vomiting", "Diarrhea", "Stomach Pain"],
    language: "English",
    insurance: "Aetna Global",
    severity: "MEDIUM",
    pathway: "PHARMACY",
    timeline: [
      { time: "09:02", action: "Journey Created", status: "completed" },
      { time: "09:03", action: "Passport Loaded", status: "completed" },
      { time: "09:03", action: "Medical Memory Loaded", status: "completed" },
      { time: "09:04", action: "Severity Assessed", status: "completed", detail: "MEDIUM" },
      { time: "09:04", action: "Care Pathway Routed", status: "completed", detail: "PHARMACY" },
      { time: "09:05", action: "Provider Search Started", status: "completed", detail: "24 providers found" },
      { time: "09:06", action: "Providers Ranked", status: "completed", detail: "Top score: 92" },
      { time: "09:06", action: "WhatsApp Outreach Sent", status: "in-progress" },
      { time: "09:07", action: "Provider Accepted", status: "pending" },
      { time: "09:08", action: "Conversation Created", status: "pending" },
      { time: "09:09", action: "Interpreter Prepared", status: "pending" },
      { time: "09:12", action: "Treatment Received", status: "pending" },
      { time: "09:14", action: "Outcome Recorded", status: "pending" },
    ],
  },
]

export const DEMO_PROVIDERS: DemoProvider[] = [
  {
    id: "tokyo-clinic-1",
    name: "Tokyo Medical Clinic",
    city: "Tokyo",
    country: "Japan",
    specialty: "General Practice | Pharmacy",
    score: 92,
    languages: ["English", "Japanese"],
    acceptsInsurance: true,
    openNow: true,
    rating: 4.8,
    phone: "+81-3-1234-5678",
    address: "2-1-1 Minato, Tokyo",
    reasons: ["✓ English Speaking", "✓ Open Now", "✓ Accepts Insurance", "✓ 4.8★ Rating", "✓ 5min away"],
    price: "Insurance covered",
  },
  {
    id: "tokyo-clinic-2",
    name: "Shinjuku Pharmacy",
    city: "Tokyo",
    country: "Japan",
    specialty: "Pharmacy",
    score: 85,
    languages: ["English", "Japanese"],
    acceptsInsurance: true,
    openNow: true,
    rating: 4.5,
    phone: "+81-3-2345-6789",
    address: "1-2-3 Shinjuku, Tokyo",
    reasons: ["✓ English Speaking", "✓ Open Now", "✓ Accepts Insurance", "✓ 10min away"],
    price: "¥3,000-5,000",
  },
  {
    id: "tokyo-clinic-3",
    name: "Roppongi Medical Center",
    city: "Tokyo",
    country: "Japan",
    specialty: "Urgent Care",
    score: 78,
    languages: ["English", "Japanese", "French"],
    acceptsInsurance: true,
    openNow: false,
    rating: 4.3,
    phone: "+81-3-3456-7890",
    address: "3-4-5 Roppongi, Tokyo",
    reasons: ["✓ English Speaking", "✓ Accepts Insurance", "✗ Closed Now", "✓ 15min away"],
    price: "¥8,000-12,000",
  },
  {
    id: "tokyo-clinic-4",
    name: "Akasaka International Clinic",
    city: "Tokyo",
    country: "Japan",
    specialty: "General Practice",
    score: 71,
    languages: ["English", "Japanese", "Spanish"],
    acceptsInsurance: false,
    openNow: true,
    rating: 4.1,
    phone: "+81-3-4567-8901",
    address: "5-6-7 Akasaka, Tokyo",
    reasons: ["✓ English Speaking", "✗ Insurance Not Accepted", "✓ Open Now", "✓ 20min away"],
    price: "¥15,000-20,000",
  },
  {
    id: "bangkok-clinic-1",
    name: "Bangkok Health Center",
    city: "Bangkok",
    country: "Thailand",
    specialty: "Dermatology",
    score: 90,
    languages: ["English", "Thai", "Mandarin"],
    acceptsInsurance: true,
    openNow: true,
    rating: 4.7,
    phone: "+66-2-123-4567",
    address: "123 Sukhumvit Rd, Bangkok",
    reasons: ["✓ English Speaking", "✓ Open Now", "✓ Accepts Insurance", "✓ 4.7★ Rating"],
    price: "฿1,000-2,000",
  },
  {
    id: "berlin-clinic-1",
    name: "Berlin Family Practice",
    city: "Berlin",
    country: "Germany",
    specialty: "General Practice | Prescriptions",
    score: 95,
    languages: ["German", "English"],
    acceptsInsurance: true,
    openNow: true,
    rating: 4.9,
    phone: "+49-30-1234-5678",
    address: "Friedrichstraße 100, Berlin",
    reasons: ["✓ German Speaking", "✓ Open Now", "✓ Accepts Insurance", "✓ 4.9★ Rating"],
    price: "Insurance covered",
  },
]

export const DEMO_CONVERSATIONS: DemoConversation[] = [
  {
    id: "conv-1",
    providerId: "tokyo-clinic-1",
    providerName: "Tokyo Medical Clinic",
    travelerId: "sarah",
    travelerName: "Sarah Johnson",
    status: "completed",
    messages: [
      { sender: "system", content: "WhatsApp outreach initiated", time: "09:07", status: "sent" },
      { sender: "system", content: "Message delivered to Tokyo Medical Clinic", time: "09:07", status: "delivered" },
      { sender: "system", content: "Message read", time: "09:07", status: "read" },
      { sender: "clinic", content: "Yes, we can help. Send the patient.", time: "09:08", status: "read" },
      { sender: "system", content: "Provider accepted. Assignment created.", time: "09:08", status: "completed" },
      { sender: "patient", content: "I have severe stomach pain and vomiting.", time: "09:09" },
      { sender: "clinic", content: "Please come to our clinic. We have English-speaking staff.", time: "09:09" },
      { sender: "patient", content: "On my way. Thank you.", time: "09:10" },
      { sender: "clinic", content: "We'll prepare oral rehydration therapy for you.", time: "09:10" },
      { sender: "patient", content: "Treatment received. Feeling better.", time: "09:12" },
    ],
  },
  {
    id: "conv-2",
    providerId: "bangkok-clinic-1",
    providerName: "Bangkok Health Center",
    travelerId: "michael",
    travelerName: "Michael Chen",
    status: "completed",
    messages: [
      { sender: "system", content: "WhatsApp outreach initiated", time: "10:19" },
      { sender: "system", content: "Provider accepted", time: "10:21" },
      { sender: "patient", content: "I have a skin rash that's getting worse.", time: "10:22" },
      { sender: "clinic", content: "Can you send a photo of the rash?", time: "10:22" },
      { sender: "patient", content: "[Photo sent]", time: "10:23" },
      { sender: "clinic", content: "This looks like contact dermatitis. We'll prescribe a cream.", time: "10:24" },
      { sender: "patient", content: "Thank you! Treatment received.", time: "10:25" },
    ],
  },
  {
    id: "conv-3",
    providerId: "tokyo-clinic-2",
    providerName: "Shinjuku Pharmacy",
    travelerId: "sarah",
    travelerName: "Sarah Johnson",
    status: "pending",
    messages: [
      { sender: "system", content: "WhatsApp outreach initiated", time: "09:06", status: "sent" },
      { sender: "system", content: "Message delivered", time: "09:06", status: "delivered" },
      { sender: "system", content: "Waiting for response...", time: "09:07", status: "pending" },
    ],
  },
]

export const DEMO_OUTCOMES: DemoOutcome[] = [
  {
    id: "outcome-1",
    travelerId: "sarah",
    travelerName: "Sarah Johnson",
    providerId: "tokyo-clinic-1",
    providerName: "Tokyo Medical Clinic",
    treatment: "Oral Rehydration Therapy + Antiemetics",
    resolution: "Recovered",
    rating: 5,
    recoveryHours: 6,
    date: "Today",
    symptoms: ["Vomiting", "Diarrhea", "Stomach Pain"],
  },
  {
    id: "outcome-2",
    travelerId: "michael",
    travelerName: "Michael Chen",
    providerId: "bangkok-clinic-1",
    providerName: "Bangkok Health Center",
    treatment: "Topical Corticosteroid + Antihistamine",
    resolution: "Recovered",
    rating: 4,
    recoveryHours: 48,
    date: "Yesterday",
    symptoms: ["Redness", "Itching", "Swelling"],
  },
  {
    id: "outcome-3",
    travelerId: "emma",
    travelerName: "Emma Schmidt",
    providerId: "berlin-clinic-1",
    providerName: "Berlin Family Practice",
    treatment: "Inhaler Prescription Refill",
    resolution: "Medication Received",
    rating: 5,
    recoveryHours: 1,
    date: "2 days ago",
    symptoms: ["Asthma", "Shortness of Breath"],
  },
]

export const DEMO_ORGANIZATION = {
  name: "Aetna Global",
  travelers: 241,
  activeCases: 12,
  resolvedCases: 228,
  avgResolution: "18 minutes",
  activeCountries: 14,
  networkProviders: 156,
  monthlySavings: "47%",
}
