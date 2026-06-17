# SWASTHYATRA V1 — Complete Engineering Specification

> Target Version: v1.0  
> Product: Healthcare Navigation Operating System  
> Build Target: Next.js 16 + Auth.js + Prisma + PostgreSQL  

---

## 1. COMPLETE PRISMA SCHEMA — REMAINING MODELS

### 1.1 Provider System (Deepened)

```prisma
// ENUMS
enum ProviderType {
  HOSPITAL
  CLINIC
  PHARMACY
  TELEMEDICINE
  LABORATORY
  DIAGNOSTIC_CENTER
}

enum ProviderVerificationStatus {
  UNVERIFIED
  VERIFIED
  PENDING_REVIEW
  FLAGGED
}

enum ProviderAvailabilityStatus {
  AVAILABLE
  BUSY
  OFFLINE
  ON_CALL
}

// CORE PROVIDER
model Provider {
  id          String   @id @default(uuid())
  name        String
  type        ProviderType
  subtype     String?  // e.g. "DENTAL_CLINIC", "WALK_IN", "SPECIALTY"
  
  description String?
  website     String?
  phone       String?
  email       String?
  
  // Location
  country     String
  city        String
  address     String?
  postalCode  String?
  lat         Float?
  lng         Float?
  
  // Verification
  verificationStatus ProviderVerificationStatus @default(UNVERIFIED)
  verifiedAt         DateTime?
  verifiedBy         String?  // admin user ID
  
  // Metadata
  languages   String[]
  specialties String[]
  insuranceAccepted String[]
  paymentMethods    String[]
  
  estimatedCost String?
  costCurrency  String?
  touristFriendly Boolean @default(false)
  
  // Ratings
  ratingAverage Float?   @default(0)
  ratingCount   Int      @default(0)
  
  // Hours
  hours Json?  // { "monday": { "open": "09:00", "close": "17:00" }, ... }
  
  // Relations
  reviews        ProviderReview[]
  availability   ProviderAvailability[]
  contactChannels ProviderContactChannel[]
  outcomes       ProviderOutcome[]
  sessions       TravelHealthSession[]  // sessions routed here
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([country, city])
  @@index([type])
  @@index([lat, lng])
  @@index([name])
}

// PROVIDER REVIEW
model ProviderReview {
  id         String   @id @default(uuid())
  providerId String
  provider   Provider @relation(fields: [providerId], references: [id], onDelete: Cascade)
  userId     String
  userName   String?
  
  rating     Int      // 1-5
  comment    String?
  language   String?
  
  createdAt DateTime @default(now())

  @@unique([providerId, userId])
}

// PROVIDER AVAILABILITY
model ProviderAvailability {
  id         String   @id @default(uuid())
  providerId String
  provider   Provider @relation(fields: [providerId], references: [id], onDelete: Cascade)
  
  dayOfWeek  Int      // 0-6 (Sunday-Saturday)
  startTime  String   // "HH:mm" format
  endTime    String   // "HH:mm" format
  isAvailable Boolean @default(true)
  
  slotDuration Int?   // minutes, for booking
  bufferMinutes Int?  // between appointments

  @@unique([providerId, dayOfWeek])
}

// PROVIDER CONTACT CHANNEL
model ProviderContactChannel {
  id         String   @id @default(uuid())
  providerId String
  provider   Provider @relation(fields: [providerId], references: [id], onDelete: Cascade)
  
  channel    String   // PHONE, EMAIL, WHATSAPP, TELEGRAM, SMS, WEBSITE
  value      String   // the actual contact info
  label      String?  // e.g. "Main Line", "Emergency"
  priority   Int      @default(0)
  
  @@unique([providerId, channel, value])
}

// PROVIDER ROUTING
model ProviderRouting {
  id              String   @id @default(uuid())
  providerId      String
  provider        Provider @relation(fields: [providerId], references: [id], onDelete: Cascade)
  
  active          Boolean  @default(true)
  priority        Int      @default(0)  // lower = higher priority
  
  // Routing conditions
  symptomKeywords String[] // matched symptoms trigger this route
  severityLevels  String[] // LOW, MEDIUM, HIGH, CRITICAL
  languages       String[]
  timeOfDay       String?  // "24/7", "09:00-17:00", etc
  
  // Routing limits
  maxDailyPatients Int?
  currentDailyCount Int   @default(0)
  lastResetDate    DateTime?

  @@index([active, priority])
}

// PROVIDER DISPATCHER
model ProviderDispatcher {
  id              String   @id @default(uuid())
  providerId      String
  provider        Provider @relation(fields: [providerId], references: [id], onDelete: Cascade)
  sessionId       String?
  
  status          String   // QUEUED, SENT, DELIVERED, READ, RESPONDED, FAILED
  channel         String   // WHATSAPP, SMS, EMAIL, IN_APP
  
  message         Json?
  response        Json?
  
  attemptedAt     DateTime?
  deliveredAt     DateTime?
  respondedAt     DateTime?
  
  createdAt       DateTime @default(now())
}

// PROVIDER INBOX
model ProviderInbox {
  id          String   @id @default(uuid())
  providerId  String
  provider    Provider @relation(fields: [providerId], references: [id], onDelete: Cascade)
  
  sessionId   String?  // linked TravelHealthSession
  title       String
  message     String
  priority    String   @default("NORMAL") // URGENT, NORMAL, LOW
  status      String   @default("UNREAD") // UNREAD, READ, ARCHIVED
  
  readAt      DateTime?
  createdAt   DateTime @default(now())

  @@index([providerId, status])
}
```

### 1.2 Medication Intelligence Graph (Full)

```prisma
// ENUMS
enum RegulatoryCategory {
  OTC
  PHARMACIST_ONLY
  PRESCRIPTION
  CONTROLLED
  NARCOTIC
}

enum DosageForm {
  TABLET
  CAPSULE
  SYRUP
  INJECTION
  CREAM
  INHALER
  DROPS
  PATCH
}

// MEDICATION — canonical drug entity
model Medication {
  id              String   @id @default(uuid())
  
  // Core identity
  activeIngredientId String
  activeIngredient   ActiveIngredient @relation(fields: [activeIngredientId], references: [id])
  
  brandName       String
  genericName     String?
  manufacturer    String?
  
  dosageForm      DosageForm?
  strength        String?  // e.g. "500mg"
  
  // Classification
  therapeuticClass String?  // e.g. "NSAID", "Antibiotic", "Antihypertensive"
  atcCode         String?   // Anatomical Therapeutic Chemical code
  isControlled    Boolean   @default(false)
  
  // Safety
  commonSideEffects String[]
  contraindications String[]
  pregnancyCategory String?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([brandName])
  @@index([activeIngredientId])
}

// ACTIVE INGREDIENT — chemical entity
model ActiveIngredient {
  id                  String   @id @default(uuid())
  name                String   @unique
  
  description         String?
  mechanismOfAction   String?
  
  medications         Medication[]
  countryMeds         CountryMedication[]
  equivalents         MedicationEquivalent[]
  
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}

// COUNTRY-SPECIFIC MEDICATION
model CountryMedication {
  id                  String   @id @default(uuid())
  activeIngredientId  String
  activeIngredient    ActiveIngredient @relation(fields: [activeIngredientId], references: [id])
  
  country             String
  
  // Marketed brands in this country
  commonBrands        String[]   // e.g. ["Crocin", "Calpol"]
  regulatoryCategory  RegulatoryCategory @default(OTC)
  
  // Prescription rules
  requiresPrescription Boolean @default(false)
  maxSupplyDays       Int?     // if prescription, max days supplied
  refillAllowed       Boolean  @default(true)
  
  // Cost data
  estimatedCost       String?   // e.g. "₹50", "$10"
  costCurrency        String?
  costLastUpdated     DateTime?
  
  // Availability
  isAvailable         Boolean @default(true)
  stockoutRisk        String?  // LOW, MEDIUM, HIGH
  commonAlternatives  String[] // other ingredients used as alternatives in this country
  
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  @@unique([activeIngredientId, country])
  @@index([country])
}

// CROSS-COUNTRY EQUIVALENCE
model MedicationEquivalent {
  id                    String   @id @default(uuid())
  activeIngredientId    String
  activeIngredient      ActiveIngredient @relation(fields: [activeIngredientId], references: [id])
  
  sourceCountry         String
  sourceBrand           String
  targetCountry         String
  targetBrand           String
  
  equivalenceType       String   @default("DIRECT") // DIRECT, ALTERNATIVE, GENERIC
  confidence            Float    @default(1.0)
  
  notes                 String?
  
  createdAt             DateTime @default(now())

  @@unique([sourceCountry, sourceBrand, targetCountry])
  @@index([activeIngredientId])
}

// INTERACTION DATABASE
model DrugInteraction {
  id             String   @id @default(uuid())
  ingredientA    String
  ingredientB    String
  
  severity       String   // MILD, MODERATE, SEVERE, CONTRAINDICATED
  description    String
  mechanism      String?
  recommendation String?
  
  source         String?
  
  createdAt      DateTime @default(now())

  @@unique([ingredientA, ingredientB])
  @@index([severity])
}

// MEDICATION CLASSIFICATION HIERARCHY
model TherapeuticClass {
  id          String   @id @default(uuid())
  name        String   @unique
  parentId    String?
  parent      TherapeuticClass? @relation("ClassHierarchy", fields: [parentId], references: [id])
  children    TherapeuticClass[] @relation("ClassHierarchy")
  
  description String?
  
  medications Medication[]
}
```

### 1.3 Outcome Intelligence (Full)

```prisma
// ENUMS
enum OutcomeResult {
  RECOVERED
  IMPROVED
  UNCHANGED
  WORSENED
  REQUIRED_HOSPITALIZATION
  REFERRED_SPECIALIST
}

// OUTCOME INSIGHT — base outcome for a journey
model OutcomeInsight {
  id                    String   @id @default(uuid())
  travelHealthSessionId String   @unique
  userId                String
  
  // Journey context
  country               String
  city                  String?
  severity              String?
  
  // What happened
  symptoms              String[]
  symptomDuration       String?
  
  // What was done
  providerType          String?   // PHARMACY, CLINIC, HOSPITAL, SELF_CARE
  providerId            String?
  medicationUsed        String?
  medicationIngredient  String?
  
  // Result
  result                OutcomeResult
  recoveryTimeHours     Int?      // how long to recover
  followUpRequired      Boolean   @default(false)
  followUpCompleted     Boolean?
  
  // Quality
  wouldRecommend        Boolean?  // would the traveler recommend this provider
  rating                Int?      // 1-5
  reviewNotes           String?
  
  // Relations
  session               TravelHealthSession @relation(fields: [travelHealthSessionId], references: [id])
  
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  @@index([userId])
  @@index([country, result])
  @@index([medicationIngredient])
  @@index([providerId])
}

// MEDICATION OUTCOME — medication-specific effectiveness
model MedicationOutcome {
  id                String   @id @default(uuid())
  outcomeInsightId  String
  outcome           OutcomeInsight @relation(fields: [outcomeInsightId], references: [id])
  
  medicationName    String
  activeIngredient  String?
  dosage            String?
  durationDays      Int?
  
  effectiveness     String   // VERY_EFFECTIVE, SOMEWHAT, NEUTRAL, INEFFECTIVE, SIDE_EFFECTS
  sideEffects       String[]
  
  createdAt         DateTime @default(now())

  @@index([activeIngredient, effectiveness])
  @@index([medicationName])
}

// PROVIDER OUTCOME — provider-specific performance
model ProviderOutcome {
  id                String   @id @default(uuid())
  outcomeInsightId  String
  outcome           OutcomeInsight @relation(fields: [outcomeInsightId], references: [id])
  
  providerId        String
  provider          Provider  @relation(fields: [providerId], references: [id])
  
  waitTimeMinutes   Int?
  consultationQuality String? // EXCELLENT, GOOD, AVERAGE, POOR
  costSatisfaction  String?  // REASONABLE, EXPENSIVE, VERY_EXPENSIVE
  languageBarrier   Boolean  @default(false)
  wouldReturn       Boolean?
  
  createdAt         DateTime @default(now())

  @@index([providerId])
}

// OUTCOME AGGREGATION — denormalized analytics (computed periodically)
model OutcomeAggregation {
  id                String   @id @default(uuid())
  
  // Dimension
  country           String
  providerType      String?
  medicationIngredient String?
  symptom           String?
  severity          String?
  
  // Metrics
  totalCases        Int      @default(0)
  recoveredCount    Int      @default(0)
  avgRecoveryHours  Float?
  hospitalizationRate Float?
  
  // Time period
  periodStart       DateTime
  periodEnd         DateTime
  
  computedAt        DateTime @default(now())

  @@index([country, providerType])
  @@index([periodStart, periodEnd])
}
```

### 1.4 Organization & RBAC (Full)

```prisma
// ENUMS
enum OrgRole {
  PATIENT
  DOCTOR
  PHARMACIST
  MEDICAL_ASSISTANT
  ORG_OPERATOR
  ORG_ADMIN
}

enum InvitationStatus {
  PENDING
  ACCEPTED
  REJECTED
  EXPIRED
}

// ORGANIZATION
model Organization {
  id          String   @id @default(uuid())
  name        String
  slug        String   @unique
  type        String   // HOSPITAL, CLINIC_PHARMACY, TELEMEDICINE_PLATFORM, INSURANCE
  
  description String?
  logoUrl     String?
  website     String?
  country     String?
  city        String?
  
  settings    Json?    // org-specific configuration
  
  members     OrganizationMember[]
  invitations OrganizationInvitation[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([slug])
}

// ORGANIZATION MEMBER
model OrganizationMember {
  id              String       @id @default(uuid())
  userId          String
  user            User         @relation(fields: [userId], references: [id])
  organizationId  String
  organization    Organization @relation(fields: [organizationId], references: [id])
  
  role            OrgRole
  
  // Doctor-specific fields
  licenseNumber   String?
  specialization  String?
  languages       String[]
  
  // Activity
  isActive        Boolean      @default(true)
  lastActiveAt    DateTime?
  
  createdBy       String?      // admin who added this member
  createdAt       DateTime     @default(now())

  @@unique([userId, organizationId])
  @@index([organizationId, role])
}

// ORGANIZATION INVITATION
model OrganizationInvitation {
  id              String            @id @default(uuid())
  email           String
  organizationId  String
  organization    Organization      @relation(fields: [organizationId], references: [id])
  role            OrgRole
  token           String            @unique
  status          InvitationStatus  @default(PENDING)
  inviterId       String
  
  invitedUserName  String?
  message          String?
  
  expiresAt       DateTime
  acceptedAt      DateTime?
  createdAt       DateTime          @default(now())

  @@index([email])
  @@index([token])
  @@index([organizationId, status])
}

// PERMISSION MATRIX (stored as config, not DB)
// This lives in code, not DB:
//
// Action                     PATIENT  DOCTOR  PHARM  MED_ASST  ORG_OP  ORG_ADMIN
// ─────────────────────────────────────────────────────────────────────────────
// view:passport.own          ✅       ✅      ✅     ✅        ✅      ✅
// view:passport.shared       ❌       ✅      ✅     ✅        ✅      ✅
// edit:passport.own          ✅       ❌      ❌     ❌        ❌      ❌
// create:memory              ❌       ✅      ✅     ✅        ✅      ✅
// approve:memory             ❌       ✅      ✅     ❌        ✅      ✅
// view:analytics             ❌       ❌      ❌     ❌        ✅      ✅
// manage:members             ❌       ❌      ❌     ❌        ❌      ✅
// manage:org                 ❌       ❌      ❌     ❌        ❌      ✅

// Role hierarchy:
// SUPER_ADMIN > ORG_ADMIN > ORG_OPERATOR > DOCTOR > PHARMACIST > MEDICAL_ASSISTANT > PATIENT
```

### 1.5 Audit System (Full)

```prisma
// ENUMS
enum AuditEventType {
  // Auth
  USER_SIGNED_IN
  USER_SIGNED_UP
  USER_DELETED
  
  // Passport
  PASSPORT_CREATED
  PASSPORT_UPDATED
  PASSPORT_SHARED
  PASSPORT_VIEWED
  PASSPORT_EXPORTED
  PASSPORT_REVOKED
  
  // Memory
  MEMORY_CANDIDATE_CREATED
  MEMORY_APPROVED
  MEMORY_REJECTED
  MEMORY_MERGED
  MEMORY_DELETED
  
  // Documents
  DOCUMENT_UPLOADED
  DOCUMENT_VIEWED
  DOCUMENT_DELETED
  DOCUMENT_PROCESSED
  DOCUMENT_EXTRACTED
  
  // Journeys
  JOURNEY_CREATED
  JOURNEY_UPDATED
  JOURNEY_COMPLETED
  JOURNEY_CANCELLED
  SEVERITY_ASSESSED
  PROVIDER_ROUTED
  
  // Provider
  PROVIDER_SEARCHED
  PROVIDER_VIEWED
  PROVIDER_CONTACTED
  PROVIDER_REVIEWED
  
  // Interpreter
  INTERPRETER_STARTED
  INTERPRETER_COMPLETED
  
  // Organizations
  ORG_CREATED
  ORG_MEMBER_ADDED
  ORG_MEMBER_REMOVED
  ORG_INVITATION_SENT
  ORG_INVITATION_ACCEPTED
  ORG_ROLE_CHANGED
  
  // Agent
  AGENT_TASK_STARTED
  AGENT_TASK_COMPLETED
  AGENT_TOOL_EXECUTED
  AGENT_APPROVAL_REQUESTED
  AGENT_APPROVAL_GRANTED
  AGENT_APPROVAL_DENIED
  
  // Admin
  ADMIN_ACTION
  SETTINGS_CHANGED
  FEATURE_FLAG_CHANGED
  
  // Security
  OWNERSHIP_VIOLATION
  UNAUTHORIZED_ACCESS
  RATE_LIMIT_HIT
}

// AUDIT LOG — immutable record
model AuditLog {
  id          String   @id @default(uuid())
  
  event       AuditEventType
  actorId     String?  // user who performed action
  actorEmail  String?
  actorRole   String?
  
  resource    String   // e.g. "Passport", "Memory", "Document"
  resourceId  String?  // the ID of the affected resource
  
  targetId    String?  // for sharing/viewing, who was the target
  
  metadata    Json?    // flexible context — ip, userAgent, diff, reason
  
  severity    String   @default("INFO") // INFO, WARN, ERROR, CRITICAL
  ipAddress   String?
  userAgent   String?
  
  organizationId String? // if action happened in org context
  
  createdAt   DateTime @default(now())

  @@index([actorId])
  @@index([event])
  @@index([resource, resourceId])
  @@index([createdAt])
  @@index([organizationId])

  // This table will grow fast. Consider partitioning by month.
}
```

### 1.6 Notification System

```prisma
// ENUMS
enum NotificationChannel {
  EMAIL
  IN_APP
  PUSH
  WHATSAPP
  SMS
}

enum NotificationPriority {
  LOW
  NORMAL
  HIGH
  URGENT
}

// NOTIFICATION
model Notification {
  id              String   @id @default(uuid())
  userId          String
  
  channel         NotificationChannel
  priority        NotificationPriority @default(NORMAL)
  
  title           String
  body            String
  actionUrl       String?  // deep link
  
  metadata        Json?    // template data
  
  // Delivery tracking
  status          String   @default("PENDING") // PENDING, SENT, DELIVERED, READ, FAILED
  sentAt          DateTime?
  deliveredAt     DateTime?
  readAt          DateTime?
  failedAt        DateTime?
  failureReason   String?
  
  // Grouping (e.g., "you have 3 unread messages")
  groupKey        String?
  groupCount      Int      @default(1)
  
  createdAt       DateTime @default(now())

  @@index([userId, status])
  @@index([userId, createdAt])
}

// NOTIFICATION PREFERENCE
model NotificationPreference {
  id              String   @id @default(uuid())
  userId          String   @unique
  
  emailEnabled    Boolean  @default(true)
  pushEnabled     Boolean  @default(true)
  whatsappEnabled Boolean  @default(false)
  smsEnabled      Boolean  @default(false)
  
  // Per-type opt-in
  passportUpdates  Boolean @default(true)
  memoryUpdates    Boolean @default(true)
  journeyUpdates   Boolean @default(true)
  providerMessages Boolean @default(true)
  promoMessages    Boolean @default(false)
  
  updatedAt DateTime @updatedAt
}

// NOTIFICATION TEMPLATE
model NotificationTemplate {
  id        String @id @default(uuid())
  key       String @unique  // e.g. "passport_shared", "memory_approved"
  
  channels  Json   // { "email": { "subject": "...", "body": "..." }, "in_app": { "title": "...", "body": "..." } }
  
  variables String[] // e.g. ["userName", "passportUrl"]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 1.7 Interpreter System (Deepened)

```prisma
// ENUMS
enum InterpreterStatus {
  PENDING
  ACTIVE
  PAUSED
  COMPLETED
  FAILED
}

enum SpeakerRole {
  PATIENT
  PROVIDER
  SYSTEM
}

// INTERPRETER SESSION
model InterpreterSession {
  id                    String   @id @default(uuid())
  travelHealthSessionId String
  session               TravelHealthSession @relation(fields: [travelHealthSessionId], references: [id])
  
  status                InterpreterStatus @default(ACTIVE)
  
  patientLanguage       String
  providerLanguage      String
  systemLanguage        String   @default("en")  // fallback
  
  // Medical context injected into translation
  medicalContext        Json?    // current symptoms, medications, allergies
  
  // Audio settings
  patientVoiceId        String?  // ElevenLabs voice ID for TTS
  providerVoiceId       String?
  
  messages              ConversationMessage[]
  
  startedAt             DateTime @default(now())
  completedAt           DateTime?
  durationSeconds       Int?
  
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  @@index([travelHealthSessionId])
}

// CONVERSATION MESSAGE
model ConversationMessage {
  id                   String   @id @default(uuid())
  interpreterSessionId String
  session              InterpreterSession @relation(fields: [interpreterSessionId], references: [id])
  
  speaker              SpeakerRole
  sequence             Int      // order in conversation
  
  originalText         String
  translatedText       String?  // null if not yet translated
  
  // Audio
  originalAudioUrl     String?
  translatedAudioUrl   String?
  
  // Confidence
  sttConfidence        Float?   // speech-to-text confidence
  translationConfidence Float?  // translation confidence
  
  // Timing
  recordedAt           DateTime?
  translatedAt         DateTime?
  
  metadata             Json?    // context injection data
  
  createdAt            DateTime @default(now())

  @@index([interpreterSessionId, sequence])
}

// INTERPRETER CONTEXT SNAPSHOT
model InterpreterContext {
  id                String   @id @default(uuid())
  interpreterSessionId String
  session           InterpreterSession @relation(fields: [interpreterSessionId], references: [id])
  
  // Snapshot of what the interpreter knew
  symptoms          Json?
  medications       Json?
  allergies         Json?
  conditions        Json?
  severity          String?
  
  injectedAt        DateTime @default(now())
}
```

### 1.8 Agent Execution System (Full)

```prisma
// ENUMS
enum AgentTaskStatus {
  PLANNING
  AWAITING_APPROVAL
  EXECUTING
  COMPLETED
  FAILED
  CANCELLED
}

enum AgentNodeType {
  INTAKE
  SEVERITY
  ROUTER
  MEDICATION_LOOKUP
  PROVIDER_SEARCH
  INTERPRETER
  OUTCOME_CAPTURE
  REFLECTION
  HUMAN_APPROVAL
}

// AGENT TASK
model AgentTask {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  sessionId   String?  // linked TravelHealthSession
  
  // Goal
  goal        String   // user's natural language request
  context     Json?    // snapshot of user state at task creation
  
  // Plan
  plan        Json?    // { "steps": [{ "node": "INTAKE", "params": {} }, ...] }
  currentNode String?  // current step being executed
  
  status      AgentTaskStatus @default(PLANNING)
  
  // Execution
  reasoning   String?  // LLM reasoning trace
  result      Json?    // final output
  
  // Reflection
  reflection  String?  // self-evaluation
  confidence  Float?   // 0-1 how confident
  
  // Human-in-loop
  needsApproval Boolean @default(false)
  approvedAt    DateTime?
  approvedBy    String?
  approvalNote  String?
  
  // Duration
  startedAt     DateTime?
  completedAt   DateTime?
  durationMs    Int?
  
  // Relations
  nodeExecutions AgentNodeExecution[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId, status])
  @@index([sessionId])
}

// AGENT NODE EXECUTION — individual step execution log
model AgentNodeExecution {
  id            String   @id @default(uuid())
  taskId        String
  task          AgentTask @relation(fields: [taskId], references: [id])
  
  nodeType      AgentNodeType
  sequence      Int
  
  input         Json?
  output        Json?
  
  toolCalls     Json?    // which tools were called, their inputs/outputs
  
  status        String   @default("PENDING") // PENDING, RUNNING, SUCCESS, FAILED, SKIPPED
  
  startedAt     DateTime?
  completedAt   DateTime?
  durationMs    Int?
  
  error         String?
  
  createdAt     DateTime @default(now())

  @@index([taskId, sequence])
}

// AGENT TOOL CALL REGISTRY
model AgentToolCall {
  id            String   @id @default(uuid())
  taskId        String
  task          AgentTask @relation(fields: [taskId], references: [id])
  
  toolName      String   // medication_tool, provider_tool, passport_tool, etc
  input         Json
  output        Json?
  
  status        String   @default("PENDING") // PENDING, SUCCESS, FAILED
  error         String?
  
  durationMs    Int?
  
  createdAt     DateTime @default(now())
}

// AGENT APPROVAL
model AgentApproval {
  id            String   @id @default(uuid())
  taskId        String
  task          AgentTask @relation(fields: [taskId], references: [id])
  
  requestType   String   // SHARE_PASSPORT, APPROVE_MEMORY, CONTACT_PROVIDER, SENSITIVE_ACTION
  reason        String
  
  status        String   @default("PENDING") // PENDING, APPROVED, DENIED
  decidedBy     String?
  decidedAt     DateTime?
  note          String?
  
  createdAt     DateTime @default(now())
}
```

### 1.9 Review Workflow System

```prisma
// ENUMS
enum ReviewResourceType {
  MEDICAL_MEMORY_CANDIDATE
  PROVIDER_VERIFICATION
  OUTCOME_VERIFICATION
  DOCUMENT_CLASSIFICATION
}

enum ReviewPriority {
  LOW
  NORMAL
  HIGH
  URGENT
}

// REVIEW TASK
model ReviewTask {
  id              String   @id @default(uuid())
  
  resourceType    ReviewResourceType
  resourceId      String   // ID of the resource to review
  
  priority        ReviewPriority @default(NORMAL)
  status          String   @default("PENDING") // PENDING, ASSIGNED, IN_REVIEW, COMPLETED, SKIPPED
  
  assignedTo      String?  // user ID of reviewer
  assignedAt      DateTime?
  
  completedBy     String?
  completedAt     DateTime?
  decision        String?  // APPROVED, REJECTED, FLAGGED
  decisionNote    String?
  
  // Escalation
  isEscalated     Boolean @default(false)
  escalatedTo     String?
  escalationReason String?
  
  confidenceScore Float?   // AI's confidence (0-1)
  requiresSecondOpinion Boolean @default(false)
  secondOpinionBy       String?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([status, priority])
  @@index([resourceType, resourceId])
  @@index([assignedTo, status])
}

// REVIEW COMMENT
model ReviewComment {
  id            String   @id @default(uuid())
  reviewTaskId  String
  task          ReviewTask @relation(fields: [reviewTaskId], references: [id])
  authorId      String
  comment       String
  createdAt     DateTime @default(now())
}

// REVIEW QUEUE CONFIG
model ReviewQueueConfig {
  id          String @id @default(uuid())
  
  resourceType ReviewResourceType @unique
  
  // Auto-assignment rules
  autoAssignRole String?     // which role gets these automatically
  maxQueueSize   Int     @default(50)
  priorityFormula String?  // "severity * confidence" etc
  
  // SLAs
  targetHours    Int     @default(24) // target time to review
  escalationHours Int    @default(48) // auto-escalate after
  
  updatedAt DateTime @updatedAt
}
```

---

## 2. COMPLETE SERVER ACTIONS CONTRACT

### 2.1 Action File Organization

```
src/modules/
├── auth/
│   └── actions.ts
├── onboarding/
│   └── actions.ts
├── passport/
│   ├── actions.ts
│   └── share.ts
├── memory/
│   ├── actions.ts
│   └── merge.ts
├── vault/
│   ├── actions.ts
│   └── pipeline.ts
├── provider/
│   ├── actions.ts
│   └── routing.ts
├── medication/
│   └── actions.ts
├── interpreter/
│   └── actions.ts
├── journey/
│   └── actions.ts
├── outcome/
│   └── actions.ts
├── organization/
│   ├── actions.ts
│   └── invitations.ts
├── agent/
│   ├── actions.ts
│   ├── executor.ts
│   ├── planner.ts
│   └── tools/
│       ├── passport.tool.ts
│       ├── memory.tool.ts
│       ├── provider.tool.ts
│       ├── medication.tool.ts
│       ├── interpreter.tool.ts
│       └── outcome.tool.ts
├── notification/
│   └── actions.ts
├── review/
│   └── actions.ts
├── audit/
│   └── service.ts        (internal, not a server action)
├── triage/
│   ├── severity-engine.ts
│   ├── red-flags.ts
│   └── router.ts
└── navigation/
    └── engine.ts
```

### 2.2 Action Specifications

Every server action must follow this contract pattern:

```typescript
// PATTERN
export async function actionName(input: InputType): Promise<ActionResult> {
  // 1. Auth check
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")
  
  // 2. Validation (Zod)
  const validated = schema.parse(input)
  
  // 3. Ownership check (IDOR)
  await assertOwnership(resourceId, session.user.id)
  
  // 4. Permission check (RBAC)
  await assertPermission(session.user.role, "action:resource")
  
  // 5. Business logic
  const result = await prisma.model.operation({ ... })
  
  // 6. Audit log
  await auditService.log({
    event: "EVENT_TYPE",
    actorId: session.user.id,
    resource: "Resource",
    resourceId: result.id,
    metadata: { /** relevant context */ }
  })
  
  // 7. Notification (if applicable)
  await notificationService.send({ ... })
  
  // 8. Analytics event
  posthog.capture({
    event: "event_name",
    distinctId: session.user.id,
    properties: { ... }
  })
  
  // 9. Revalidation
  revalidatePath(path)
  
  // 10. Return
  return { success: true, data: result }
}
```

#### Passport Actions

```
generatePassport()
  Input:  {}
  Logic:  Aggregate User medical data -> create HealthPassport record -> audit log
  Output: { passportId, shareToken, expiresAt }
  Auth:   Required, PATIENT+
  
sharePassport()
  Input:  { passportId, expiresInHours?: number }
  Logic:  Assert ownership -> create PassportShareLink with random token -> audit log -> notification
  Output: { shareUrl, token, expiresAt }
  Auth:   Required, PATIENT+
  
revokePassportShare()
  Input:  { shareLinkId }
  Logic:  Assert ownership -> mark revoked -> audit log
  Output: { success: true }
  Auth:   Required, PATIENT+
  
viewPassportPublic()
  Input:  { token }
  Logic:  Lookup share link -> check expiry -> create PassportAccessLog -> return sanitized data
  Output: { user: { name, bloodType, allergies, medications, conditions, emergencyContact } }
  Auth:   Public (no session required)

exportPassport()
  Input:  { passportId, format: "JSON" | "PDF" }
  Logic:  Assert ownership -> generate PDF/JSON -> upload to S3 -> audit log
  Output: { downloadUrl }
  Auth:   Required, PATIENT+
```

#### Memory Actions

```
approveCandidate()
  Input:  { candidateId }
  Logic:  Assert role (DOCTOR+) -> lookup candidate -> create MedicalMemory record -> mark candidate APPROVED -> sync passport -> audit log -> notification
  Output: { memoryId }
  Auth:   Required, DOCTOR+
  
rejectCandidate()
  Input:  { candidateId, reason: string }
  Logic:  Assert role -> mark candidate REJECTED -> audit log
  Output: { success: true }
  Auth:   Required, DOCTOR+
  
mergeCandidate()
  Input:  { candidateId, targetMemoryId }
  Logic:  Assert role -> merge data into existing memory -> mark merged -> audit
  Output: { memoryId }
  Auth:   Required, DOCTOR+
  
deleteMemory()
  Input:  { memoryId }
  Logic:  Assert ownership or admin -> soft delete -> audit
  Output: { success: true }
  Auth:   Required, PATIENT+ or ORG_ADMIN
```

#### Vault Actions

```
uploadDocument()
  Input:  { fileName, mimeType, fileData: base64 }   // or FormData
  Logic:  Validate file type/size -> upload to S3 -> create VaultDocument record -> audit log -> trigger processing pipeline (async)
  Output: { documentId, uploadUrl }
  Auth:   Required, PATIENT+

triggerReprocess()
  Input:  { documentId }
  Logic:  Assert ownership -> reset processing flags -> re-trigger pipeline -> audit
  Output: { success: true }
  Auth:   Required, PATIENT+

deleteDocument()
  Input:  { documentId }
  Logic:  Assert ownership -> delete from S3 -> soft delete -> audit
  Output: { success: true }
  Auth:   Required, PATIENT+
```

#### Provider Actions

```
searchProviders()
  Input:  { country, city?, type?, language?, specialty?, lat?, lng?, radiusKm?, openNow? }
  Logic:  Build Prisma query from filters -> return matches -> audit search
  Output: { providers: Provider[], total: number }
  Auth:   Required, PATIENT+
  
getProviderDetail()
  Input:  { providerId }
  Logic:  Lookup provider -> increment view count -> audit
  Output: { provider: ProviderDetail }
  Auth:   Required, PATIENT+
  
createProviderReview()
  Input:  { providerId, rating, comment?, language? }
  Logic:  Assert no existing review -> create -> update provider avg rating -> audit
  Output: { reviewId }
  Auth:   Required, PATIENT+

contactProvider()
  Input:  { providerId, channel, message }
  Logic:  Lookup provider contact -> create ProviderInbox record -> send notification -> audit
  Output: { success: true }
  Auth:   Required, PATIENT+

flagProvider()
  Input:  { providerId, reason }
  Logic:  Assert role -> create flag -> notify admin -> audit
  Output: { success: true }
  Auth:   Required, PATIENT+
```

#### Medication Actions

```
searchMedicationEquivalents()
  Input:  { brandName?, activeIngredient?, sourceCountry, targetCountry }
  Logic:  Lookup active ingredient -> find equivalents in target country -> return
  Output: { input: { brand, ingredient, country }, equivalents: CountryMedication[] }
  Auth:   Required, PATIENT+
  
getMedicationDetail()
  Input:  { medicationId }
  Logic:  Lookup medication -> include ingredient, interactions, country data
  Output: { medication: MedicationDetail }
  Auth:   Required, PATIENT+
  
checkDrugInteraction()
  Input:  { medicationA, medicationB }
  Logic:  Lookup interaction in DrugInteraction table -> return severity + recommendations
  Output: { interaction: DrugInteraction | null }
  Auth:   Required, PATIENT+
```

#### Journey Actions

```
createTravelHealthSession()
  Input:  { country, city?, language, symptoms, duration?, allergies?, medications?, location? }
  Logic:  Create session -> run triage engine -> create timeline event -> return with severity + route
  Output: { sessionId, severity, route, recommendations }
  Auth:   Required, PATIENT+
  
updateSessionSeverity()
  Input:  { sessionId, severity, reason? }
  Logic:  Assert ownership -> update -> timeline event -> if change, re-trigger router
  Output: { severity, route }
  Auth:   Required, PATIENT+
  
closeJourney()
  Input:  { sessionId, outcome }
  Logic:  Assert ownership -> mark RESOLVED -> create OutcomeInsight -> audit
  Output: { success: true }
  Auth:   Required, PATIENT+
  
getJourneyTimeline()
  Input:  { sessionId }
  Logic:  Assert ownership -> fetch ordered timeline events
  Output: { events: TimelineEvent[] }
  Auth:   Required, PATIENT+
```

#### Interpreter Actions

```
startInterpreterSession()
  Input:  { sessionId, patientLanguage, providerLanguage }
  Logic:  Assert journey ownership -> create InterpreterSession -> build medical context from passport/memory -> audit
  Output: { interpreterSessionId, initialContext }
  Auth:   Required, PATIENT+
  
processPatientAudio()
  Input:  { interpreterSessionId, audioData: base64 }
  Logic:  Send to STT (Deepgram) -> translate -> inject medical context -> TTS (ElevenLabs) -> save message -> return translation
  Output: { originalText, translatedText, providerAudioUrl }
  Auth:   Required, PATIENT+

processProviderResponse()
  Input:  { interpreterSessionId, text }
  Logic:  Translate -> TTS in patient language -> save -> return
  Output: { translatedText, patientAudioUrl }
  Auth:   Required, PATIENT+ or DOCTOR+

endInterpreterSession()
  Input:  { interpreterSessionId }
  Logic:  Mark completed -> calculate duration -> audit
  Output: { success: true, durationSeconds }
  Auth:   Required, PATIENT+
```

#### Outcome Actions

```
recordOutcome()
  Input:  { sessionId, result, recoveryTimeHours?, followUpRequired?, rating?, reviewNotes?, medicationUsed?, providerId? }
  Logic:  Assert journey ownership -> create OutcomeInsight -> optionally create MedicationOutcome / ProviderOutcome -> update session outcomeStatus -> audit
  Output: { outcomeId }
  Auth:   Required, PATIENT+

getOutcomeInsights()
  Input:  { userId }
  Logic:  Aggregate user's outcomes -> compute recovery rate, common symptoms, med effectiveness
  Output: { totalCases, recoveryRate, avgRecoveryTime, byMedication, byProviderType, byCountry }
  Auth:   Required, PATIENT+
```

#### Organization Actions

```
createOrganization()
  Input:  { name, slug, type, country?, city?, description? }
  Logic:  Create org -> add creator as ORG_ADMIN -> audit -> event
  Output: { organizationId }
  Auth:   Required, any user (creator becomes admin)

inviteMember()
  Input:  { organizationId, email, role }
  Logic:  Assert permission (manage:members) -> check not already member -> create invitation -> send email
  Output: { invitationId }
  Auth:   Required, ORG_ADMIN or higher

acceptInvitation()
  Input:  { token }
  Logic:  Validate token -> create OrganizationMember -> mark invitation ACCEPTED -> audit
  Output: { organizationId, role }
  Auth:   Required, must match invited email

removeMember()
  Input:  { organizationId, memberId }
  Logic:  Assert permission -> remove -> audit
  Output: { success: true }
  Auth:   Required, ORG_ADMIN

changeMemberRole()
  Input:  { organizationId, memberId, newRole }
  Logic:  Assert permission -> update role -> audit
  Output: { success: true }
  Auth:   Required, ORG_ADMIN
```

#### Agent Actions

```
executeAgentGoal()
  Input:  { sessionId?, goal: string }
  Logic:  Create AgentTask -> call reasoning (Groq) -> generate plan -> execute steps -> reflect -> return result
  Output: { taskId, plan, steps: { node, status, output }[], reflection }
  Auth:   Required, PATIENT+

requestAgentApproval()
  Input:  { taskId, requestType, reason }
  Logic:  Create AgentApproval record -> set task needsApproval -> notify user/provider -> pause execution
  Output: { approvalId }
  Auth:   Required, PATIENT+

respondToApproval()
  Input:  { approvalId, decision: "APPROVED" | "DENIED", note? }
  Logic:  Update approval status -> resume or cancel task -> audit
  Output: { success: true }
  Auth:   Required, PATIENT or relevant role
```

---

## 3. AGENT OS — LANGGRAPH WORKFLOW SPECIFICATION

### 3.1 State Definition

```typescript
// packages/agent-core/types.ts

interface AgentState {
  // Identity & Context
  userId: string
  sessionId?: string
  
  // Goal
  goal: string
  context: {
    passport?: PassportSummary
    memory?: MedicalMemory[]
    currentJourney?: TravelHealthSession
    activeMedications?: string[]
    allergies?: string[]
    conditions?: string[]
  }
  
  // Workflow
  currentNode: AgentNodeType
  history: NodeExecution[]
  plan: PlanStep[]
  
  // Triage
  symptoms?: Symptom[]
  severity?: SeverityLevel
  route?: CareRoute
  
  // Data
  medicationResults?: MedicationResult[]
  providerResults?: ProviderResult[]
  interpreterSession?: InterpreterSession
  
  // Outcome
  outcome?: OutcomeResult
  
  // Control
  needsHumanApproval: boolean
  pendingApproval?: ApprovalRequest
  error?: string
  completed: boolean
}

interface PlanStep {
  node: AgentNodeType
  params: Record<string, unknown>
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'SKIPPED'
  output?: unknown
}

interface NodeExecution {
  nodeType: AgentNodeType
  input: unknown
  output: unknown
  durationMs: number
  timestamp: Date
}
```

### 3.2 Workflow Graph

```
                    ┌──────────┐
                    │  START   │
                    └────┬─────┘
                         │
                    ┌────▼─────┐
                    │  INTAKE  │  ← Collect symptoms, context, location
                    └────┬─────┘
                         │
                    ┌────▼──────┐
                    │  SEVERITY │  ← Calculate severity (LOW/MEDIUM/HIGH/EMERGENCY)
                    └────┬──────┘
                         │
                    ┌────▼──────┐
                    │ CHECK_RED │  ← Red flag detection
                    │   FLAGS   │
                    └────┬──────┘
                         │
                    ┌────▼──────┐
                    │  ROUTER   │  ← Route based on severity + red flags
                    └────┬──────┘
                         │
           ┌─────────────┼─────────────┬──────────────┐
           │             │             │              │
    ┌──────▼─────┐ ┌────▼──────┐ ┌───▼──────┐ ┌─────▼──────┐
    │ SELF_CARE  │ │ PHARMACY  │ │  CLINIC  │ │  HOSPITAL  │
    └──────┬─────┘ └────┬──────┘ └───┬──────┘ └─────┬──────┘
           │            │            │              │
           │     ┌──────▼──────┐     │              │
           │     │ MED_LOOKUP  │     │              │
           │     └──────┬──────┘     │              │
           │            │            │              │
           │     ┌──────▼──────┐     │              │
           │     │ PROV_SEARCH │     │              │
           │     └──────┬──────┘     │              │
           │            │            │              │
           └──────┬─────┴────────────┴──────────────┘
                  │
           ┌──────▼──────┐
           │  INTERPRETER│  ← Only if language mismatch
           └──────┬──────┘
                  │
           ┌──────▼──────┐
           │    DONE     │  ← Present results to user
           └──────┬──────┘
                  │
           ┌──────▼──────────┐
           │ OUTCOME_CAPTURE │  ← Ask "did this work?"
           └──────┬──────────┘
                  │
           ┌──────▼──────┐
           │   REFLECT   │  ← Agent self-evaluation
           └──────┬──────┘
                  │
           ┌──────▼──────┐
           │    END      │
           └─────────────┘
```

### 3.3 Node Implementations

#### Intake Node
```typescript
// Input: empty or partial session
// Output: enriched session with symptoms, location, language

async function intakeNode(state: AgentState): Promise<Partial<AgentState>> {
  // If session exists, load it
  // If not, ask user for: symptoms, duration, country, city, language
  // Return enriched state
  return {
    symptoms: state.symptoms || [],
    context: { ...state.context }
  }
}
```

#### Severity Node
```typescript
// Input: symptoms + duration + context
// Output: severity level (LOW/MEDIUM/HIGH/EMERGENCY)

async function severityNode(state: AgentState): Promise<Partial<AgentState>> {
  const severity = calculateSeverity({
    symptoms: state.symptoms!,
    allergies: state.context.allergies,
    conditions: state.context.conditions,
    medications: state.context.activeMedications
  })
  
  return { severity }
}

// severity-engine.ts
function calculateSeverity(input: SeverityInput): SeverityLevel {
  // 1. Check red flags (chest pain, difficulty breathing, etc.)
  if (hasRedFlags(input.symptoms)) return 'EMERGENCY'
  
  // 2. Check high-risk symptoms
  if (hasHighRiskSymptoms(input.symptoms, input.conditions)) return 'HIGH'
  
  // 3. Check duration
  if (hasProlongedDuration(input.symptoms, input.duration)) return 'MEDIUM'
  
  // 4. Default
  return 'LOW'
}
```

#### Router Node
```typescript
// Input: severity
// Output: care route

async function routerNode(state: AgentState): Promise<Partial<AgentState>> {
  const route = routeBySeverity(state.severity!, state.symptoms!)
  
  return { route }
}

// router.ts
function routeBySeverity(severity: SeverityLevel, symptoms: Symptom[]): CareRoute {
  if (severity === 'EMERGENCY') return 'HOSPITAL'
  if (severity === 'HIGH') {
    if (symptoms.some(s => s.type === 'GASTROINTESTINAL')) return 'CLINIC'
    return 'HOSPITAL'
  }
  if (severity === 'MEDIUM') {
    if (needsMedication(symptoms)) return 'PHARMACY'
    return 'CLINIC'
  }
  return 'SELF_CARE'
}
```

#### Medication Lookup Node
```typescript
// Input: current medications + country + severity
// Output: medication equivalents + recommendations

async function medicationLookupNode(state: AgentState): Promise<Partial<AgentState>> {
  const country = state.context.currentJourney?.country || 'global'
  const medications = state.context.activeMedications || []
  
  const results = await Promise.all(
    medications.map(med => 
      findEquivalent(med, 'source-country', country)
    )
  )
  
  return { medicationResults: results }
}
```

#### Provider Search Node
```typescript
// Input: country + city + type + severity
// Output: provider recommendations

async function providerSearchNode(state: AgentState): Promise<Partial<AgentState>> {
  const { currentJourney } = state.context
  if (!currentJourney) return {}
  
  const providers = await searchProviders({
    country: currentJourney.country,
    city: currentJourney.city,
    type: mapRouteToProviderType(state.route!),
    language: currentJourney.language,
    severity: state.severity
  })
  
  return { providerResults: providers.slice(0, 5) }
}
```

### 3.4 Tool Definitions

```typescript
// Tool Registry
interface AgentTool {
  name: string
  description: string
  parameters: Record<string, unknown>
  execute: (input: Record<string, unknown>) => Promise<Record<string, unknown>>
}

const toolRegistry: AgentTool[] = [
  {
    name: 'navigateSymptoms',
    description: 'Analyze symptoms and determine severity',
    parameters: { symptoms: 'string[]' },
    execute: async ({ symptoms }) => ({ severity: calculateSeverity(symptoms) })
  },
  {
    name: 'queryPassport',
    description: 'Get user healthcare passport data',
    parameters: {},
    execute: async (_, userId) => {
      const passport = await prisma.healthPassport.findUnique({ where: { userId } })
      return { passport }
    }
  },
  {
    name: 'queryMemory',
    description: 'Query medical memory for relevant facts',
    parameters: { query: 'string', type: 'string' },
    execute: async ({ query, type }, userId) => {
      const memories = await prisma.medicalMemory.findMany({
        where: { userId, type: type as string }
      })
      return { memories }
    }
  },
  {
    name: 'searchMedication',
    description: 'Find medication equivalents in a target country',
    parameters: { medication: 'string', targetCountry: 'string' },
    execute: async ({ medication, targetCountry }) => {
      const equivalents = await medicationService.findEquivalent(medication, targetCountry)
      return { equivalents }
    }
  },
  {
    name: 'searchProvider',
    description: 'Find healthcare providers near a location',
    parameters: { country: 'string', city: 'string', type: 'string' },
    execute: async ({ country, city, type }) => {
      const providers = await providerService.searchProviders({ country, city, type })
      return { providers }
    }
  },
  {
    name: 'startInterpreter',
    description: 'Start a medical interpreter session',
    parameters: { patientLanguage: 'string', providerLanguage: 'string' },
    execute: async ({ patientLanguage, providerLanguage }, userId, sessionId) => {
      const session = await interpreterService.startSession(sessionId, patientLanguage, providerLanguage)
      return { session }
    }
  },
  {
    name: 'recordOutcome',
    description: 'Record healthcare outcome',
    parameters: { result: 'string', recoveryTime: 'number' },
    execute: async ({ result, recoveryTime }, userId, sessionId) => {
      const outcome = await outcomeService.recordOutcome(sessionId, { result, recoveryTime })
      return { outcome }
    }
  }
]
```

### 3.5 Reflection Engine

```typescript
// Input: full task execution history
// Output: confidence score + reflection

async function reflect(executions: NodeExecution[]): Promise<{
  confidence: number
  reflection: string
  suggestions: string[]
}> {
  const successful = executions.filter(e => e.output && !e.error).length
  const total = executions.length
  const confidence = total > 0 ? successful / total : 0
  
  return {
    confidence,
    reflection: `Completed ${successful}/${total} steps successfully.`,
    suggestions: confidence < 0.8 ? ['Manual review recommended'] : []
  }
}
```

---

## 4. IDOR SECURITY LAYER — COMPLETE SPEC

### 4.1 Ownership Assertions

```typescript
// server/security/ownership.ts

// Every function follows:
// 1. Look up resource
// 2. If not found, throw (don't reveal existence)
// 3. If userId doesn't match, throw (same message)
// 4. If org-scoped, check org membership

export async function assertPassportOwnership(passportId: string, userId: string) {
  const passport = await prisma.healthPassport.findFirst({
    where: { id: passportId, userId }
  })
  if (!passport) throw new Error("Passport not found")
  return passport
}

export async function assertDocumentOwnership(documentId: string, userId: string) {
  const doc = await prisma.vaultDocument.findFirst({
    where: { id: documentId, userId }
  })
  if (!doc) throw new Error("Document not found")
  return doc
}

export async function assertMemoryOwnership(memoryId: string, userId: string) {
  const memory = await prisma.medicalMemory.findFirst({
    where: { id: memoryId, userId }
  })
  if (!memory) throw new Error("Memory not found")
  return memory
}

export async function assertJourneyOwnership(sessionId: string, userId: string) {
  const session = await prisma.travelHealthSession.findFirst({
    where: { id: sessionId, userId }
  })
  if (!session) throw new Error("Journey not found")
  return session
}

export async function assertOutcomeOwnership(outcomeId: string, userId: string) {
  const outcome = await prisma.outcomeInsight.findFirst({
    where: { id: outcomeId, userId }
  })
  if (!outcome) throw new Error("Outcome not found")
  return outcome
}

// For shared passport access
export async function assertCanViewPassport(passportId: string, currentUserId: string) {
  // Own passport?
  const owned = await prisma.healthPassport.findFirst({
    where: { id: passportId, userId: currentUserId }
  })
  if (owned) return owned
  
  // Shared with this user?
  const shared = await prisma.passportShareLink.findFirst({
    where: {
      passportId,
      expiresAt: { gt: new Date() },
      revoked: false
    }
  })
  if (shared) return shared  // user has token
  // If this is called from public API via token, we check token not userId
  
  throw new Error("Passport not found")
}
```

### 4.2 RBAC Permission Checks

```typescript
// server/security/permissions.ts

type Permission =
  | 'passport:view'
  | 'passport:edit'
  | 'passport:share'
  | 'memory:create'
  | 'memory:approve'
  | 'memory:delete'
  | 'document:upload'
  | 'document:delete'
  | 'provider:search'
  | 'provider:review'
  | 'journey:create'
  | 'journey:manage'
  | 'interpreter:use'
  | 'outcome:record'
  | 'analytics:view'
  | 'org:manage'
  | 'org:members'
  | 'admin:system'

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  PATIENT: [
    'passport:view', 'passport:edit', 'passport:share',
    'memory:delete',
    'document:upload', 'document:delete',
    'provider:search', 'provider:review',
    'journey:create', 'journey:manage',
    'interpreter:use',
    'outcome:record',
  ],
  DOCTOR: [
    'passport:view',
    'memory:create', 'memory:approve',
    'provider:search',
    'interpreter:use',
    'outcome:record',
  ],
  PHARMACIST: [
    'passport:view',
    'memory:create', 'memory:approve',
    'provider:search',
    'interpreter:use',
  ],
  MEDICAL_ASSISTANT: [
    'passport:view',
    'memory:create',
    'document:upload',
    'provider:search',
  ],
  ORG_OPERATOR: [
    'passport:view',
    'memory:create', 'memory:approve',
    'document:upload',
    'provider:search',
    'analytics:view',
    'journey:manage',
  ],
  ORG_ADMIN: [
    ...ORG_OPERATOR,
    'org:manage', 'org:members',
  ],
  SUPER_ADMIN: [
    'admin:system',
    ...ORG_ADMIN,
  ],
}

export function assertPermission(role: Role, permission: Permission) {
  const allowed = ROLE_PERMISSIONS[role] || []
  if (!allowed.includes(permission)) {
    throw new Error("Insufficient permissions")
  }
}
```

### 4.3 Audit Service

```typescript
// server/audit/service.ts

export const auditService = {
  async log(params: {
    event: AuditEventType
    actorId?: string
    actorEmail?: string
    actorRole?: string
    resource: string
    resourceId?: string
    targetId?: string
    metadata?: Record<string, unknown>
    severity?: string
    ipAddress?: string
    organizationId?: string
  }) {
    await prisma.auditLog.create({ data: params })
    
    // If critical, send immediate alert
    if (params.severity === 'CRITICAL') {
      await alertService.send({ ...params })
    }
  }
}
```

---

## 5. DOCUMENT PROCESSING PIPELINE — FULL SPEC

### 5.1 Pipeline Stages

```
UPLOAD
  │
  ├─ [1] Validate (type, size, virus scan)
  │
  ├─ [2] Upload to S3
  │     path: /documents/{userId}/{documentId}/original.{ext}
  │
  ├─ [3] OCR (if image/PDF)
  │     └─ store: VaultDocument.ocrText
  │     └─ store: DocumentChunk[]
  │
  ├─ [4] Translate (if not English)
  │     └─ store: VaultDocument.translatedText
  │
  ├─ [5] Extract (Gemini)
  │     └─ input: OCR text + document type
  │     └─ output: structured medical data
  │
  ├─ [6] Create MedicalMemoryCandidate
  │     └─ per extracted fact
  │
  └─ [7] Notification: "New candidates ready for review"
```

### 5.2 S3 Bucket Structure

```
s3://swasthyatra-{env}/
  ├── documents/{userId}/{documentId}/
  │     ├── original.pdf
  │     ├── ocr.json
  │     └── extraction.json
  │
  ├── passport-exports/{userId}/
  │     └── passport-{date}.pdf
  │
  ├── interpreter/{sessionId}/
  │     ├── patient-msg-{sequence}.webm
  │     └── provider-msg-{sequence}.mp3
  │
  └── avatars/
        └── {userId}.jpg
```

### 5.3 Background Job Definitions

```typescript
// jobs/ocr.job.ts
// Triggered after document upload
// 1. Download from S3
// 2. Run OCR (Tesseract / Google Vision)
// 3. Store result in VaultDocument.ocrText
// 4. Mark ocrCompleted = true
// 5. If successful, trigger translation job

// jobs/translate.job.ts
// Triggered after OCR
// 1. Read OCR text
// 2. Detect language
// 3. Translate to English (Gemini)
// 4. Store in translatedText
// 5. Mark translated = true
// 6. If successful, trigger extraction job

// jobs/extract.job.ts
// Triggered after translation
// 1. Call Gemini with document type + translated text
// 2. Extract structured data: conditions, allergies, medications, vaccinations
// 3. Create MedicalMemoryCandidate for each extracted fact
// 4. Mark extracted = true

// jobs/provider-sync.job.ts
// Runs daily
// 1. Check which provider data sources to sync
// 2. Pull new providers from OSM/Geoapify
// 3. Match with existing providers
// 4. Create/update Provider records
// 5. Log sync stats

// jobs/outcome-analysis.job.ts
// Runs weekly
// 1. Aggregate recent OutcomeInsight records
// 2. Compute OutcomeAggregation rows
// 3. Update provider rating averages
// 4. Generate insight reports
```

---

## 6. NOTIFICATION SYSTEM — FULL SPEC

### 6.1 Event -> Notification Mapping

```
PASSPORT_SHARED
  → In-App: "Passport shared with provider"
  → Email: "Your health passport was accessed by [provider]"

MEMORY_APPROVED
  → In-App: "New medical memory approved"
  → Email: (if configured)

MEMORY_CANDIDATE_CREATED
  → In-App: "New memory candidates ready for review" (DOCTOR+ only)
  
DOCUMENT_PROCESSING_COMPLETE
  → In-App: "Document processing complete"
  
JOURNEY_CREATED
  → In-App: "New healthcare journey started"

OUTCOME_REQUEST
  → In-App: "How did your treatment go?"

INTERPRETER_SESSION_ACTIVE
  → In-App: "Interpreter session active"

PROVIDER_INBOX_MESSAGE
  → In-App: "New message from traveler"
  → Email/Push: "You have a new message from a traveler"

ORG_INVITATION
  → Email: "[Name] invited you to join [Organization]"
  
APPROVAL_REQUESTED
  → In-App: "Action requires your approval"
```

### 6.2 Notification Service

```typescript
// server/notifications/service.ts

export const notificationService = {
  async send(params: {
    userId: string
    channel: NotificationChannel
    templateKey: string
    variables: Record<string, string>
    priority?: NotificationPriority
    actionUrl?: string
  }) {
    // 1. Check user preferences
    const prefs = await prisma.notificationPreference.findUnique({
      where: { userId: params.userId }
    })
    if (!prefs?.[`${params.channel}Enabled`]) return
    
    // 2. Get template
    const template = await prisma.notificationTemplate.findUnique({
      where: { key: params.templateKey }
    })
    if (!template) return
    
    // 3. Render content
    const content = renderTemplate(template, params.variables)
    
    // 4. Send via channel
    switch (params.channel) {
      case 'EMAIL':
        await emailService.send(params.userId, content)
        break
      case 'IN_APP':
        await prisma.notification.create({
          data: {
            userId: params.userId,
            channel: 'IN_APP',
            title: content.title,
            body: content.body,
            actionUrl: params.actionUrl,
            priority: params.priority || 'NORMAL'
          }
        })
        break
      // etc.
    }
  }
}
```

---

## 7. POSTHOG ANALYTICS TAXONOMY

### 7.1 Events

```
Product Events:
  user_signed_up              Properties: { method: "google" }
  onboarding_completed        Properties: { stepsCompleted: 5 }
  passport_created            Properties: { countries: number }
  passport_shared             Properties: { method: "link" }
  passport_viewed             Properties: { byProvider: boolean }
  document_uploaded           Properties: { type: "prescription", size: "2MB" }
  document_processed          Properties: { ocrMs: 3500, extractionMs: 4200 }
  memory_candidate_created    Properties: { count: 3, documentType: "lab_report" }
  memory_approved             Properties: { type: "condition" }
  memory_rejected             Properties: { type: "medication" }
  journey_created             Properties: { country: "Japan", severity: "LOW" }
  journey_completed           Properties: { outcome: "RECOVERED" }
  severity_assessed           Properties: { level: "HIGH", trigger: "chest_pain" }
  provider_searched           Properties: { country: "Thailand", type: "PHARMACY" }
  provider_viewed             Properties: { providerType: "CLINIC", hasReviews: true }
  provider_contacted          Properties: { channel: "PHONE" }
  medication_looked_up        Properties: { ingredient: "Paracetamol", target: "Japan" }
  interpreter_started         Properties: { patientLang: "en", providerLang: "ja" }
  interpreter_completed       Properties: { duration: 450, numMessages: 12 }
  outcome_recorded            Properties: { result: "RECOVERED", recoveryHours: 24 }
  agent_task_started          Properties: { goal: "find medication for headache" }
  agent_task_completed        Properties: { steps: 4, confidence: 0.92 }
  approval_requested          Properties: { type: "share_passport" }
  approval_responded          Properties: { decision: "APPROVED" }

Business Events:
  organization_created        Properties: { type: "HOSPITAL" }
  member_invited              Properties: { role: "DOCTOR" }
  member_joined               Properties: { orgType: "CLINIC" }
```

### 7.2 User Properties

```
Properties set on user:
  role: PATIENT | DOCTOR | ...
  onboarding_completed: true | false
  passport_count: number
  journey_count: number
  memory_count: number
  document_count: number
  countries_visited: string[]
  interpreter_sessions: number
  first_country: string
  provider_reviews_left: number
```

---

## 8. SEED DATA SPECIFICATION

### 8.1 Seed Script Structure

```typescript
// prisma/seed.ts

async function main() {
  // 1. Demo Users
  await seedUsers()
  
  // 2. Active Ingredients
  await seedActiveIngredients()
  
  // 3. Country Medications (20+ countries)
  await seedCountryMedications()
  
  // 4. Providers (major tourist destinations)
  await seedProviders()
  
  // 5. Demo Journeys (pre-populated for demo)
  await seedDemoJourneys()
  
  // 6. Demo Outcomes
  await seedDemoOutcomes()
  
  // 7. Country Healthcare Profiles
  await seedCountryProfiles()
  
  // 8. Drug Interactions
  await seedDrugInteractions()
  
  // 9. Notification Templates
  await seedNotificationTemplates()
}

// Demo Users:
// 1. Maria Rodriguez - Mexico, traveler to Japan, diabetes + hypertension
// 2. Rahul Sharma - India, traveler to Thailand
// 3. Sarah Chen - USA, doctor at TravelWell Clinic
// 4. Hiro Tanaka - Japan, pharmacist at Tokyo Central Pharmacy
// 5. DemoAdmin - super admin

// Medication Data (starter set):
// Paracetamol: Crocin (IN), Tylenol (US), Calpol (UK), Panadol (AU), Tachipirina (IT)
// Ibuprofen: Brufen (IN), Advil (US), Nurofen (UK), Algifor (CH)
// Amoxicillin: Amoxil (global), Mox (IN), Trimox (US)
// Diphenhydramine: Benadryl (US), Benadryl Allergy (UK), Nytol (UK)
// Loratadine: Claritin (US), Clarityn (UK), Lorfast (IN)
// Omeprazole: Prilosec (US), Losec (UK), Omez (IN)
// Cetirizine: Zyrtec (US/US), Zirtek (UK), Zytec (IN)
// Azithromycin: Zithromax (global), Azee (IN), Zmax (US)
// Metformin: Glucophage (global), Glyciphage (IN)
// Aspirin: Disprin (IN), Bayer Aspirin (US/DE)
```

### 8.2 Demo Journeys

```typescript
// Pre-seeded journeys for demo:
// 1. Maria's food poisoning in Tokyo
//    - Symptoms: nausea, vomiting, diarrhea, fever
//    - Severity: MEDIUM
//    - Route: PHARMACY → CLINIC
//    - Outcome: RECOVERED (24h)
//
// 2. Rahul's cold in Bangkok
//    - Symptoms: sore throat, cough, runny nose
//    - Severity: LOW
//    - Route: PHARMACY
//    - Outcome: RECOVERED (48h)
//
// 3. Sunburn in Bali
//    - Symptoms: sunburn, pain
//    - Severity: LOW
//    - Route: SELF_CARE
//    - Outcome: RECOVERED (72h)
//
// 4. Allergic reaction in Dubai
//    - Symptoms: hives, swelling, itching (had allergy to shellfish)
//    - Severity: HIGH
//    - Route: CLINIC
//    - Outcome: RECOVERED (12h with antihistamine)
```

---

## 9. UI COMPONENT INVENTORY

### 9.1 Complete Component Tree

```
packages/ui/
├── atoms/
│   ├── button.tsx          // 5 variants, 3 sizes, icon, loading
│   ├── input.tsx           // text, email, password, search
│   ├── textarea.tsx        // resizable, character count
│   ├── label.tsx           // form label with optional indicator
│   ├── badge.tsx           // 4 variants, with dot option
│   ├── avatar.tsx          // image fallback to initials
│   ├── icon.tsx            // Lucide wrapper
│   └── spinner.tsx         // loading indicator, sizes
│
├── molecules/
│   ├── card.tsx            // header, content, footer, with hover
│   ├── select.tsx          // native enhanced, searchable
│   ├── dialog.tsx          // Radix Dialog, sizes
│   ├── sheet.tsx           // Radix Sheet (slide-over), sides
│   ├── drawer.tsx          // Radix Drawer
│   ├── dropdown-menu.tsx   // Radix DropdownMenu
│   ├── command.tsx         // Cmd+K search palette
│   ├── data-table.tsx      // sortable, filterable, paginated
│   ├── tabs.tsx            // Radix Tabs
│   ├── toggle.tsx          // on/off, boolean
│   ├── popover.tsx         // Radix Popover
│   ├── tooltip.tsx         // Radix Tooltip
│   ├── progress.tsx        // linear progress bar
│   ├── skeleton.tsx        // loading skeleton
│   └── toast.tsx           // Sonner toast
│
├── organisms/
│   ├── entity-card.tsx     // generic entity card (provider, memory, etc.)
│   ├── timeline.tsx        // vertical timeline with nodes
│   ├── activity-feed.tsx   // scrollable activity list
│   ├── agent-panel.tsx     // AI assistant side panel
│   ├── map-view.tsx        // MapLibre GL wrapper
│   ├── upload-zone.tsx     // drag-and-drop file upload
│   ├── language-selector.tsx // language picker with autocomplete
│   ├── severity-badge.tsx  // colored severity indicator
│   └── data-grid.tsx       // spreadsheet-like display
│
└── templates/
    ├── dashboard-layout.tsx // sidebar + header + main + context drawer
    ├── auth-layout.tsx      // centered card with logo
    ├── onboarding-layout.tsx // stepper with progress
    └── public-layout.tsx    // shared passport view

// Per-page components (in apps/web/src/app/*/_components/)
├── dashboard/
│   ├── stats-cards.tsx
│   ├── quick-start.tsx
│   └── recent-activity.tsx
│
├── passport/
│   ├── passport-card.tsx
│   ├── condition-list.tsx
│   ├── medication-list.tsx
│   ├── allergy-list.tsx
│   ├── insurance-card.tsx
│   └── emergency-contact.tsx
│
├── memory/
│   ├── memory-entry.tsx
│   ├── candidate-card.tsx
│   ├── approval-sheet.tsx
│   └── merge-dialog.tsx
│
├── vault/
│   ├── document-card.tsx
│   ├── document-viewer.tsx
│   └── processing-status.tsx
│
├── provider/
│   ├── provider-card.tsx
│   ├── provider-map.tsx
│   ├── provider-filters.tsx
│   ├── provider-hours.tsx
│   ├── provider-languages.tsx
│   ├── provider-contact.tsx
│   └── provider-reviews.tsx
│
├── journey/
│   ├── journey-timeline.tsx
│   ├── symptom-card.tsx
│   ├── severity-badge.tsx
│   └── outcome-panel.tsx
│
├── interpreter/
│   ├── live-transcript.tsx
│   ├── audio-recorder.tsx
│   └── conversation-feed.tsx
│
├── outcome/
│   ├── outcome-card.tsx
│   ├── medication-outcome.tsx
│   ├── provider-outcome.tsx
│   └── insight-chart.tsx
│
├── organization/
│   ├── member-table.tsx
│   ├── invitation-form.tsx
│   ├── role-selector.tsx
│   └── org-metrics.tsx
│
└── agent/
    ├── execution-timeline.tsx
    ├── tool-call-card.tsx
    └── approval-dialog.tsx
```

### 9.2 Dashboard Page Specifications

```
DASHBOARD OVERVIEW (/dashboard)
Layout: Sidebar + Header + Main Content
Main Content:
  ├── Stats Cards Row (4)
  │     ├── Active Journeys
  │     ├── Vault Documents
  │     ├── Medical Memories
  │     └── Health Passport
  ├── Quick Start Card
  │     ├── "Start New Journey"
  │     ├── "Upload Document"
  │     ├── "Create Passport"
  │     └── "Find Provider"
  └── Recent Activity Feed

PASSPORT PAGE (/dashboard/passport)
Layout: Sidebar + Header + Main (full width)
Main Content:
  ├── Section: Personal Info
  │     ├── Name, Blood Type, DOB
  │     └── Edit button
  ├── Section: Conditions
  │     ├── Condition cards
  │     └── Add button
  ├── Section: Allergies
  │     ├── Allergy cards (with severity badge)
  │     └── Add button
  ├── Section: Medications
  │     ├── Medication cards (with dosage)
  │     └── Add button
  ├── Section: Insurance
  │     ├── Provider + Number
  │     └── Edit button
  ├── Section: Emergency Contacts
  │     ├── Contact cards
  │     └── Add button
  └── Actions Bar
        ├── "Share Passport" → generates link
        ├── "Export" → PDF/JSON
        └── "View Access Log" → audit drawer

MEDICAL MEMORY (/dashboard/memory)
Layout: Sidebar + Header + Main (with tabs)
Tabs:
  ├── "Approved" (MedicalMemory records)
  │     └── Searchable list with type filter
  └── "Pending Review" (MedicalMemoryCandidate)
        ├── Candidate cards with:
        │     ├── Extracted data preview
        │     ├── Confidence score
        │     ├── Source document link
        │     └── Approve / Reject buttons
        └── Bulk actions bar

HEALTH VAULT (/dashboard/vault)
Layout: Sidebar + Header + Main
Main Content:
  ├── File Upload Zone (drag & drop)
  ├── Document List
  │     ├── Document cards with:
  │     │     ├── File name, type, size
  │     │     ├── Status badge (UPLOADED, PROCESSING, COMPLETED, FAILED)
  │     │     ├── Processing progress
  │     │     └── Actions: View, Delete, Reprocess
  │     └── Empty state: illustration + CTA

PROVIDER SEARCH (/dashboard/providers)
Layout: Sidebar + Header + Main + Map Drawer
Main Content:
  ├── Search Filters
  │     ├── Country (autocomplete)
  │     ├── City (autocomplete)
  │     ├── Type (dropdown: Hospital/Clinic/Pharmacy/Telemedicine)
  │     ├── Language (multi-select)
  │     ├── Specialty (multi-select)
  │     └── Open Now (toggle)
  ├── Results Grid
  │     └── Provider cards with:
  │           ├── Name, Type
  │           ├── Languages badges
  │           ├── Rating
  │           ├── Estimated cost
  │           └── Contact button
  └── Map Panel (toggle)
        └── MapLibre GL with pins

INTERPRETER (/dashboard/interpreter)
Layout: Sidebar + Header + Main (full width)
Main Content:
  ├── Session Setup
  │     ├── Session ID select/input
  │     ├── Patient Language
  │     └── Provider Language
  ├── Active Session
  │     ├── Conversation Feed
  │     │     ├── Message bubbles (patient left, provider right)
  │     │     ├── Original + Translation
  │     │     └── Audio play button
  │     ├── Audio Controls
  │     │     ├── Record button (hold to record)
  │     │     └── Status indicator
  │     └── Context Panel
  │           ├── Current symptoms
  │           ├── Active medications
  │           └── Known allergies
  └── Session History

AGENT WORKSPACE (/dashboard/agent)
Layout: Sidebar + Header + Main + Right Panel
Main Content:
  ├── Goal Input
  │     └── "What do you need help with?"
  ├── Execution Timeline
  │     ├── Node steps with status (PENDING, RUNNING, SUCCESS, FAILED)
  │     ├── Expandable details per step
  │     └── Tool call results inline
  ├── Result Panel
  │     ├── Summary
  │     ├── Recommendations
  │     └── Action buttons
  └── Right Panel
        ├── Agent Context (what it knows)
        ├── Confidence Score
        └── Approval Request (if needed)
```

---

## 10. INFRASTRUCTURE & DEPLOYMENT

### 10.1 Environment Variables (Complete)

```
# === AUTH ===
AUTH_SECRET=
AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# === DATABASE ===
DATABASE_URL=
DIRECT_URL=                          # for migrations

# === ANALYTICS ===
NEXT_PUBLIC_POSTHOG_KEY=
POSTHOG_HOST=
NEXT_PUBLIC_POSTHOG_HOST=

# === MONITORING ===
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=

# === AI LAYER ===
GEMINI_API_KEY=
GROQ_API_KEY=
LITELLM_MASTER_KEY=                  # future

# === STORAGE ===
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET=
AWS_BUCKET_PUBLIC=                   # for avatars, exports

# === MAPS ===
NEXT_PUBLIC_GEOAPIFY_KEY=
GEOAPIFY_API_KEY=

# === VOICE ===
DEEPGRAM_API_KEY=
ELEVENLABS_API_KEY=
LIVEKIT_API_KEY=
LIVEKIT_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=

# === REDIS ===
REDIS_URL=
REDIS_TOKEN=

# === NEXT.JS ===
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPPORT_EMAIL=

# === FEATURE FLAGS ===
FLAG_INTERPRETER_ENABLED=true
FLAG_ORGANIZATIONS_ENABLED=false
FLAG_PROVIDER_ROUTING_ENABLED=false
FLAG_AGENT_ENABLED=true
FLAG_WHATSAPP_AGENT_ENABLED=false

# === PAYMENTS (future) ===
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### 10.2 Docker Compose (Development)

```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgis/postgis:16-3.4
    environment:
      POSTGRES_DB: swasthyatra
      POSTGRES_USER: swasthyatra
      POSTGRES_PASSWORD: swasthyatra
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  minio:
    image: minio/minio
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - miniodata:/data
    command: server /data --console-address ":9001"

volumes:
  pgdata:
  miniodata:
```

### 10.3 Vercel Configuration

```json
// vercel.json (apps/web)
{
  "framework": "nextjs",
  "buildCommand": "npx prisma generate && next build",
  "outputDirectory": ".next",
  "crons": [
    {
      "path": "/api/crons/outcome-analysis",
      "schedule": "0 0 * * 0"
    },
    {
      "path": "/api/crons/provider-sync",
      "schedule": "0 6 * * *"
    }
  ]
}
```

---

## 11. SPRINT-BY-SPRINT EXECUTION ROADMAP

```
SPRINT 0 — Foundation (Week 1)
  [ ] PostgreSQL + Prisma setup
  [ ] Auth.js v5 with Google OAuth
  [ ] User model + onboarding check
  [ ] Middleware (route protection)
  [ ] Dashboard layout + sidebar
  [ ] shadcn/ui components (Button, Card, Input, Badge)
  [ ] Server Action pattern (auth → validate → execute → audit → revalidate)
  [ ] Deployment: Vercel + PostgreSQL

SPRINT 1 — Health Passport (Week 2)
  [ ] HealthPassport model
  [ ] Passport page (view all sections)
  [ ] Passport edit actions
  [ ] Passport sharing (link + token)
  [ ] Passport access logs
  [ ] Public passport view API
  [ ] Passport export (JSON)

SPRINT 2 — Travel Health Session + Triage (Week 3)
  [ ] TravelHealthSession model
  [ ] Create journey page
  [ ] Journey list + detail view
  [ ] Severity engine (LOW/MEDIUM/HIGH/EMERGENCY)
  [ ] Red flag detection
  [ ] Care router (SELF_CARE/PHARMACY/CLINIC/HOSPITAL)
  [ ] Journey timeline events
  [ ] Navigation orchestrator

SPRINT 3 — Medical Memory + Vault (Week 4)
  [ ] VaultDocument model
  [ ] Document upload (mock S3)
  [ ] Document OCR pipeline (mock → real)
  [ ] MedicalMemoryCandidate creation
  [ ] Candidate review system (approve/reject)
  [ ] MedicalMemory model
  [ ] Memory → Passport sync
  [ ] Document processing status UI
  [ ] Memory list + filter

SPRINT 4 — Provider Discovery (Week 5)
  [ ] Provider model
  [ ] Provider search (country/city/type)
  [ ] Provider detail page
  [ ] Provider review system
  [ ] Provider map (MapLibre GL)
  [ ] Language badges + filters
  [ ] Provider contact (ProviderInbox)
  [ ] Seed data for 5+ countries

SPRINT 5 — Medication Intelligence (Week 6)
  [ ] ActiveIngredient + CountryMedication models
  [ ] Medication lookup (ingredient → equivalents)
  [ ] Cross-country brand mapping
  [ ] OTC/Prescription status display
  [ ] Drug interaction check (basic)
  [ ] Medication search page
  [ ] Seed data: 50+ active ingredients, 10 countries

SPRINT 6 — Medical Interpreter (Week 7)
  [ ] InterpreterSession model
  [ ] Session creation + context injection
  [ ] STT integration (Deepgram)
  [ ] Translation engine (Gemini)
  [ ] TTS integration (ElevenLabs)
  [ ] Conversation message model
  [ ] Live transcript UI
  [ ] Language auto-detect + selector
  [ ] Audio recorder component

SPRINT 7 — Outcome Intelligence (Week 8)
  [ ] OutcomeInsight model
  [ ] Outcome recording flow
  [ ] MedicationOutcome model
  [ ] ProviderOutcome model
  [ ] Outcome analytics dashboard
  [ ] Recovery metrics + charts (Recharts)
  [ ] OutcomeAggregation service
  [ ] Weekly outcome analysis job

SPRINT 8 — Agent OS v1 (Week 9-10)
  [ ] AgentTask model
  [ ] Reasoning node (Groq integration)
  [ ] Planner node (step generation)
  [ ] Executor node (tool dispatch)
  [ ] Tool registry (passport, memory, medication, provider, interpreter, outcome)
  [ ] Reflection node
  [ ] Agent workspace UI
  [ ] Execution timeline
  [ ] Confidence scoring
  [ ] Human-in-loop approvals

SPRINT 9 — Organizations + RBAC (Week 11)
  [ ] Organization model
  [ ] OrganizationMember model
  [ ] Invitation system
  [ ] Full RBAC enforcement
  [ ] Audit system (all event types)
  [ ] Organization pages (members, settings)
  [ ] Role-based UI (hide/disable per role)

SPRINT 10 — Notifications + Production Polish (Week 12)
  [ ] Notification system
  [ ] In-app notifications
  [ ] Email templates (Resend/SendGrid)
  [ ] Notification preferences
  [ ] Error boundaries (every page)
  [ ] Loading skeletons
  [ ] Empty states
  [ ] Form validation (Zod everywhere)
  [ ] Onboarding flow pages
  [ ] Custom sign-in page
  [ ] Feature flags

SPRINT 11+ — Provider Network Layer (V2)
  [ ] ProviderContactChannel model
  [ ] ProviderRouting model
  [ ] ProviderDispatcher model
  [ ] ProviderInbox model
  [ ] Real S3 file upload
  [ ] Real OCR (Google Vision)
  [ ] WhatsApp agent (Twilio)
  [ ] Voice agent (LiveKit)
  [ ] Provider sync jobs (OSM, Geoapify)
  [ ] Provider outreach engine
  [ ] Follow-up automation
  [ ] Outcome prediction ML
```

---

## 12. TESTING STRATEGY

### 12.1 Test File Organization

```
tests/
├── unit/
│   ├── services/
│   │   ├── passport.service.test.ts
│   │   ├── memory.service.test.ts
│   │   ├── provider.service.test.ts
│   │   ├── medication.service.test.ts
│   │   └── interpreter.service.test.ts
│   ├── triage/
│   │   ├── severity-engine.test.ts
│   │   ├── red-flags.test.ts
│   │   └── router.test.ts
│   ├── agent/
│   │   ├── planner.test.ts
│   │   ├── executor.test.ts
│   │   ├── reflection.test.ts
│   │   └── tool-registry.test.ts
│   └── security/
│       ├── ownership.test.ts
│       ├── permissions.test.ts
│       └── audit.test.ts
│
├── integration/
│   ├── passport.integration.test.ts
│   ├── memory.integration.test.ts
│   ├── journey.integration.test.ts
│   ├── interpreter.integration.test.ts
│   └── organization.integration.test.ts
│
└── e2e/
    ├── auth.spec.ts
    ├── onboarding.spec.ts
    ├── passport.spec.ts
    ├── journey.spec.ts
    ├── vault.spec.ts
    ├── provider-search.spec.ts
    ├── interpreter.spec.ts
    └── agent.spec.ts
```

### 12.2 Test Patterns

```typescript
// Unit test pattern
describe('SeverityEngine', () => {
  it('should return EMERGENCY for chest pain', () => {
    const result = calculateSeverity({
      symptoms: [{ type: 'CHEST_PAIN', severity: 'SEVERE' }],
      conditions: [],
      medications: []
    })
    expect(result).toBe('EMERGENCY')
  })
  
  it('should return LOW for mild cold symptoms', () => {
    const result = calculateSeverity({
      symptoms: [{ type: 'COUGH', severity: 'MILD' }],
      conditions: [],
      medications: []
    })
    expect(result).toBe('LOW')
  })
})

// Integration test pattern
describe('Passport Sharing', () => {
  it('should create share link and allow access', async () => {
    const passport = await createPassport(userId)
    const share = await sharePassport(passport.id)
    expect(share.token).toBeDefined()
    
    const access = await viewPassportPublic(share.token)
    expect(access.user.name).toBeDefined()
    
    const logs = await prisma.passportAccessLog.findMany({
      where: { shareLinkId: share.id }
    })
    expect(logs.length).toBe(1)
  })
})
```

---

## 13. FILE STORAGE & DATA RETENTION POLICY

### 13.1 S3 Object Lifecycle

```
documents/{userId}/{documentId}/original.{ext}
  → Storage Class: STANDARD
  → Retention: 90 days after last access
  → Then: GLACIER (archive)
  → Deletion: 7 years after account deletion

passport-exports/{userId}/passport-{date}.pdf
  → Storage Class: STANDARD
  → Retention: 30 days
  → Then: auto-delete

interpreter/{sessionId}/*.webm
  → Storage Class: STANDARD
  → Retention: 90 days
  → Then: auto-delete

avatars/{userId}.jpg
  → Storage Class: STANDARD
  → Retention: until account deletion
```

### 13.2 Database Retention

```
AuditLog: 90 days (stream to cold storage after)
AgentTask: 30 days
AgentNodeExecution: 30 days
ConversationMessage: 90 days
InterpreterSession: 90 days
Notification: 30 days
ReviewTask: 90 days
PassportAccessLog: 90 days
VaultAuditLog: 90 days
TravelHealthSession: Indefinite (user data)
HealthPassport: Indefinite (user data)
MedicalMemory: Indefinite (user data)
OutcomeInsight: Indefinite (anonymized after user deletion)
```

---

## 14. ERROR HANDLING TAXONOMY

```typescript
// server/errors/

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public httpStatus: number = 400,
    public metadata?: Record<string, unknown>
  ) {
    super(message)
  }
}

export class AuthError extends AppError {
  constructor(msg = 'Authentication required') {
    super('AUTH_REQUIRED', msg, 401)
  }
}

export class PermissionError extends AppError {
  constructor(msg = 'Insufficient permissions') {
    super('PERMISSION_DENIED', msg, 403)
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super('NOT_FOUND', `${resource} not found`, 404)
  }
}

export class OwnershipError extends AppError {
  constructor(resource = 'Resource') {
    super('OWNERSHIP_VIOLATION', `${resource} access denied`, 403)
  }
}

export class ValidationError extends AppError {
  constructor(errors: Record<string, string[]>) {
    super('VALIDATION_ERROR', 'Validation failed', 400, { errors })
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super('RATE_LIMITED', 'Too many requests', 429)
  }
}

// Error codes used across the system:
// AUTH_REQUIRED, PERMISSION_DENIED, NOT_FOUND, OWNERSHIP_VIOLATION,
// VALIDATION_ERROR, RATE_LIMITED, PASSPORT_EXPIRED, PASSPORT_REVOKED,
// DOCUMENT_PROCESSING_FAILED, AI_SERVICE_DOWN, STT_FAILED, TTS_FAILED,
// PROVIDER_SEARCH_FAILED, MEDICATION_NOT_FOUND, DUPLICATE_RESOURCE,
// ORG_INVITATION_EXPIRED, ORG_ALREADY_MEMBER, SESSION_EXPIRED
```

---

## 15. DEMO ENVIRONMENT SPECIFICATION

### 15.1 Demo Users

```typescript
const DEMO_USERS = [
  {
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    role: 'PATIENT',
    onboardingCompleted: true,
    bloodType: 'O+',
    emergencyContact: { name: 'Carlos Rodriguez', phone: '+52-555-123-4567' },
    insuranceInfo: { provider: 'AXA Travel Insurance', number: 'AXA-2024-MX-789' },
    // Pre-seeded medical data:
    conditions: ['Type 2 Diabetes', 'Hypertension'],
    allergies: ['Penicillin', 'Shellfish'],
    medications: ['Metformin 500mg', 'Lisinopril 10mg']
  },
  {
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@travelwell.com',
    role: 'DOCTOR',
    onboardingCompleted: true,
    specialization: 'Travel Medicine',
    languages: ['English', 'Mandarin', 'Spanish']
  },
  {
    name: 'Hiro Tanaka',
    email: 'hiro.tanaka@tokyo-pharmacy.jp',
    role: 'PHARMACIST',
    onboardingCompleted: true,
    languages: ['Japanese', 'English']
  },
  {
    name: 'Demo Admin',
    email: 'admin@swasthyatra.com',
    role: 'SUPER_ADMIN',
    onboardingCompleted: true
  }
]
```

### 15.2 Demo Journeys (Pre-seeded)

```typescript
const DEMO_JOURNEYS = [
  {
    userEmail: 'maria@example.com',
    country: 'Japan',
    city: 'Tokyo',
    language: 'Spanish',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'fever 38.5C'],
    duration: '2 days',
    severity: 'MEDIUM',
    status: 'RESOLVED',
    timeline: [
      { eventType: 'SYMPTOM_ADDED', data: { symptoms: ['nausea', 'vomiting'] } },
      { eventType: 'SEVERITY_CALCULATED', data: { severity: 'MEDIUM' } },
      { eventType: 'ROUTE_ASSIGNED', data: { route: 'PHARMACY' } },
      { eventType: 'MED_RECOMMENDATION', data: { recommendation: 'Traveler should visit a pharmacy for oral rehydration salts and an antidiarrheal. Found equivalent: Smecta (diosmectite) available OTC in Japan.' } },
      { eventType: 'PROVIDER_FOUND', data: { providerName: 'Tokyo Central Pharmacy', type: 'PHARMACY' } },
      { eventType: 'INTERPRETER_STARTED', data: { patientLanguage: 'Spanish', providerLanguage: 'Japanese' } },
      { eventType: 'OUTCOME_RECORDED', data: { result: 'RECOVERED', recoveryTimeHours: 24 } }
    ],
    outcome: { result: 'RECOVERED', recoveryTimeHours: 24, medicationUsed: 'Smecta + ORS', providerType: 'PHARMACY' }
  },
  {
    userEmail: 'maria@example.com',
    country: 'Thailand',
    city: 'Bangkok',
    language: 'Spanish',
    symptoms: ['sore throat', 'cough', 'runny nose', 'low fever 37.8C'],
    duration: '3 days',
    severity: 'LOW',
    status: 'RESOLVED',
    outcome: { result: 'RECOVERED', recoveryTimeHours: 72, medicationUsed: 'Paracetamol + rest', providerType: 'SELF_CARE' }
  }
]
```

---

## 16. DESIGN SYSTEM TOKENS

```css
/* globals.css - Design Tokens */

:root {
  /* Typography */
  --font-sans: 'Inter Variable', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Font sizes */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  
  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Spacing (4px grid) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  
  /* Border radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  
  /* Z-index scale */
  --z-dropdown: 50;
  --z-sticky: 100;
  --z-drawer: 200;
  --z-modal: 300;
  --z-toast: 400;
  
  /* Sidebar */
  --sidebar-width: 16rem;
  --sidebar-collapsed-width: 4rem;
}
```

---

## 17. COMPLETE APP ROUTER STRUCTURE

```
src/app/
├── (marketing)/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Public layout
│   └── pricing/
│       └── page.tsx
│
├── (auth)/
│   ├── sign-in/
│   │   └── page.tsx               # Custom sign-in with Google
│   └── error/
│       └── page.tsx               # Auth error page
│
├── onboarding/
│   ├── layout.tsx                 # Stepper layout
│   └── steps/
│       ├── profile/
│       │   └── page.tsx           # Name, email confirmation
│       ├── medical/
│       │   └── page.tsx           # Conditions, blood type
│       ├── allergies/
│       │   └── page.tsx           # Allergy entry
│       ├── insurance/
│       │   └── page.tsx           # Insurance info
│       ├── emergency/
│       │   └── page.tsx           # Emergency contacts
│       └── complete/
│           └── page.tsx           # Success + redirect to dashboard
│
├── dashboard/
│   ├── layout.tsx                 # Protected layout + sidebar
│   ├── page.tsx                   # Overview
│   ├── loading.tsx                # Dashboard loading skeleton
│   ├── passport/
│   │   ├── page.tsx               # Passport view
│   │   └── share/
│   │       └── page.tsx           # Share passport UI
│   ├── vault/
│   │   ├── page.tsx               # Document list
│   │   └── [id]/
│   │       └── page.tsx           # Document detail
│   ├── memory/
│   │   ├── page.tsx               # Memory list + candidates
│   │   └── review/
│   │       └── page.tsx           # Candidate review queue
│   ├── journeys/
│   │   ├── page.tsx               # Journey list
│   │   ├── new/
│   │   │   └── page.tsx           # Create journey
│   │   └── [id]/
│   │       └── page.tsx           # Journey detail + timeline
│   ├── medications/
│   │   ├── page.tsx               # Medication search
│   │   └── [id]/
│   │       └── page.tsx           # Medication detail
│   ├── providers/
│   │   ├── page.tsx               # Provider search
│   │   └── [id]/
│   │       └── page.tsx           # Provider detail
│   ├── interpreter/
│   │   ├── page.tsx               # Interpreter setup
│   │   └── session/
│   │       └── [id]/
│   │           └── page.tsx       # Active session
│   ├── outcomes/
│   │   └── page.tsx               # Outcome analytics
│   ├── organizations/
│   │   ├── page.tsx               # Org list (patient) / dashboard (admin)
│   │   ├── [id]/
│   │   │   ├── page.tsx           # Org dashboard
│   │   │   ├── members/
│   │   │   │   └── page.tsx       # Member management
│   │   │   ├── invitations/
│   │   │   │   └── page.tsx       # Invitations
│   │   │   └── analytics/
│   │   │       └── page.tsx       # Org analytics
│   │   └── new/
│   │       └── page.tsx           # Create organization
│   ├── agent/
│   │   └── page.tsx               # Agent workspace
│   ├── settings/
│   │   └── page.tsx               # User settings
│   └── notifications/
│       └── page.tsx               # Notification history
│
├── api/
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts           # Auth.js handler
│   ├── passport/
│   │   └── public/
│   │       └── [token]/
│   │           └── route.ts       # Public passport access
│   ├── upload/
│   │   └── route.ts               # S3 presigned upload
│   ├── webhooks/
│   │   ├── stripe/
│   │   │   └── route.ts
│   │   └── deepgram/
│   │       └── route.ts
│   └── crons/
│       ├── outcome-analysis/
│       │   └── route.ts
│       └── provider-sync/
│           └── route.ts
│
├── layout.tsx                     # Root layout
├── globals.css                    # Global styles + design tokens
└── not-found.tsx                  # 404 page
```
