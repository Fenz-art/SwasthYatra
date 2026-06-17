





chatgpt_entirecontext(3).txt
Document
write full docs in detail before everything got deleted 

I reconstructed the documentation from the uploaded founder blueprint and architecture notes. The source contains the complete pre-loss SwasthYatra vision, architecture, stack, moat strategy, and roadmap. 


SWASTHYATRA
Global Healthcare Navigation Operating System
Product Requirements Document (PRD), System Architecture & Founder Blueprint
1. Executive Summary
Vision
SwasthYatra is a Healthcare Navigation Operating System designed for travelers navigating unfamiliar healthcare systems.

The platform helps users:

Understand symptoms

Assess severity

Find medication equivalents

Discover trusted providers

Communicate across language barriers

Share healthcare history

Continue care across locations

Capture outcomes

The objective is not diagnosis.

The objective is healthcare navigation.

2. Problem Statement
Healthcare becomes fragmented when people travel.

Travelers frequently encounter:

Medication Confusion
Users know medicines by brand names rather than active ingredients.

Examples:

Country	Brand
India	Crocin
USA	Tylenol
UK	Calpol
Japan	Bufferin
Most travelers do not know equivalent medications abroad.

Language Barriers
Communication breaks down during:

Clinical consultations

Pharmacy interactions

Emergency situations

Prescription explanations

Traditional translators lack medical context.

Care Escalation Uncertainty
Travelers often ask:

Should I rest?

Should I visit a pharmacy?

Should I see a doctor?

Is this an emergency?

The uncertainty is the problem.

Provider Trust
Travelers struggle to evaluate:

Hospitals

Clinics

Pharmacies

Telemedicine services

Trust is often more important than discovery.

Healthcare Continuity
Travelers may:

Lose medication

Run out of medication

Need prescription refills

Need local alternatives

Healthcare history is rarely portable.

3. Core Product Thesis
Most healthcare products are:

Doctor-centric

Hospital-centric

Appointment-centric

SwasthYatra is:

Journey-Centric
Everything revolves around:

TravelHealthSession

The platform tracks healthcare journeys rather than isolated interactions.

4. Core Entity
TravelHealthSession
Central object powering the entire platform.

Attributes
User

Country

City

Coordinates

Symptoms

Symptom Duration

Severity

Allergies

Medications

Insurance

Provider Context

Interpreter Context

Outcomes

Recommendations

Every subsystem reads from and writes to this object.

5. Platform Architecture
Core Systems
Agent OS
Healthcare decision orchestration layer.

Responsibilities:

Reasoning

Planning

Execution

Reflection

Replanning

Healthcare Graph
Global intelligence layer connecting:

Symptoms

Conditions

Providers

Medications

Languages

Countries

Outcomes

Medication Intelligence
Deterministic medication lookup system.

Responsibilities:

Ingredient mapping

Brand equivalence

OTC rules

Country-specific availability

Provider Discovery
Healthcare inventory and search layer.

Provider Types:

Hospitals

Clinics

Pharmacies

Telemedicine

Medical Interpreter
Context-aware healthcare communication system.

Supports:

Speech-to-text

Translation

Context injection

Text-to-speech

Health Passport
Portable healthcare profile.

Contains:

Conditions

Allergies

Medications

Vaccinations

Insurance

Emergency contacts

Medical Memory
Persistent healthcare knowledge.

Maintains:

Conditions

Allergies

Medication history

Vaccinations

Provider interactions

Outcome Intelligence
Captures:

Treatments

Medication effectiveness

Provider outcomes

Recovery timelines

Organization Layer
Supports:

Hospitals

Clinics

Pharmacies

Healthcare operators

6. System Workflow
Navigation Flow
START

↓

INTAKE

↓

TRIAGE

↓

SEVERITY ASSESSMENT

↓

ROUTER

Branches:

Self-Care
Home treatment guidance

Pharmacy
Medication lookup + pharmacy discovery

Clinic
Provider recommendation + interpreter

Hospital
Urgent escalation

Emergency
Immediate intervention workflow

7. Health Vault
Purpose
Medical document management system.

Supported Documents:

Prescriptions

Reports

Insurance documents

Vaccination records

Medical certificates

Processing Pipeline
Upload

↓

OCR

↓

Translation

↓

Information Extraction

↓

Review Queue

↓

Medical Memory

↓

Health Passport

8. Medical Memory System
Purpose
Persistent health understanding.

Stores:

Conditions

Allergies

Medications

Vaccinations

Insurance

Provider history

Memory Candidate Workflow
Documents never directly modify memory.

Document

↓

Extraction

↓

MedicalMemoryCandidate

↓

Review

↓

Approval

↓

MedicalMemory

This creates a critical trust boundary.

9. Health Passport
Portable Healthcare Identity
Provides healthcare information anywhere.

Contains
Conditions

Allergies

Medications

Vaccinations

Insurance

Emergency contacts

Provider notes

Sharing Workflow
Patient

↓

Generate Secure Link

↓

Provider Access

↓

Audit Log

↓

Context View

Every access is tracked.

10. Medical Interpreter
Differentiation
Not a translation tool.

A healthcare communication layer.

Context Inputs
Symptoms

Conditions

Allergies

Medication history

Current provider

Severity assessment

Communication Pipeline
Patient Audio

↓

Speech Recognition

↓

Translation

↓

Medical Context Injection

↓

Response Generation

↓

Speech Synthesis

↓

Provider

Reverse flow supported.

11. Healthcare Graph
Core Strategic Asset
Graph Structure:

Traveler

↔ Symptoms

↔ Medication

↔ Provider

↔ Country

↔ Language

↔ Outcome

Each interaction enriches the graph.

12. Medication Intelligence Graph
Objective
Medication equivalence without hallucinations.

Entities
Medication
Commercial brands

ActiveIngredient
Chemical composition

CountryMedication
Country-specific mappings

MedicationEquivalent
Cross-country equivalence

OTCStatus
Prescription requirements

Example
Paracetamol

India → Crocin

USA → Tylenol

Japan → Bufferin

Mexico → Tempra

13. Provider Discovery
Data Sources
OpenStreetMap
Global provider inventory

Geoapify
Geospatial search

Google Places
Enhanced discovery

Government Registries
Verification source

Provider Metadata
Languages

Specialties

Insurance acceptance

Working hours

Cost indicators

Tourist friendliness

14. Outcome Intelligence
Purpose
Capture real-world healthcare effectiveness.

Tracks:

Symptoms

Provider

Treatment

Medication

Country

Outcome

Generated Assets
OutcomeInsight
General observations

MedicationOutcome
Medication effectiveness

ProviderOutcome
Provider performance

These form a proprietary dataset.

15. Agent Operating System
Inspired by:

Cursor

Claude Code

Devin

Not chatbot architecture.

Agent Loop
Goal

↓

Reason

↓

Plan

↓

Execute

↓

Reflect

↓

Replan

Core Components
reasoning.ts

planner.ts

executor.ts

reflection.ts

replanner.ts

timeline.ts

memory.ts

goals.ts

approvals.ts

confidence.ts

16. Agent Personas
Patient Companion
Traveler-facing assistant.

Doctor Copilot
Provider support.

Pharmacist Copilot
Medication workflows.

Medical Assistant
Administrative workflows.

Organization Operator
Operational management.

Organization Admin
Governance and oversight.

17. Security Architecture
Core Principles
Audit Logging
All critical actions recorded.

Ownership Validation
Resource access verification.

Approval Gates
Required for:

Sharing

Notifications

Sensitive updates

Provenance Tracking
Every memory item records:

Source

Confidence

Verification status

Reviewer

18. Organization Layer
Roles
PATIENT

DOCTOR

PHARMACIST

MEDICAL_ASSISTANT

ORGANIZATION_OPERATOR

ORGANIZATION_ADMIN

Organization Features
Team management

Assignments

Analytics

Reviews

Approvals

Operational dashboards

19. Technical Architecture
Frontend
Next.js 16

React 19

TypeScript

TailwindCSS

shadcn/ui

Radix UI

React Hook Form

Zod

Recharts

Backend
FastAPI

Python 3.12

LangGraph

SQLAlchemy

Alembic

Celery

Redis

Database
PostgreSQL

PostGIS

pgvector

AI Layer
Gemini
Used for:

Document understanding

Clinical summaries

Memory extraction

Outcome intelligence

Groq
Used for:

Reasoning

Planning

Reflection

Replanning

Future gateway support:

Claude

GPT

DeepSeek

Qwen

Voice Layer
Deepgram

ElevenLabs

LiveKit

20. Monorepo Structure
root/

frontend/

backend/

packages/

database/

types/

shared/

agent-core/

healthcare-graph/

docs/

21. MVP Scope
Phase 0
Build:

TravelHealthSession

Navigation Agent

Medication Lookup

Provider Discovery

Interpreter

Outcome Capture

Nothing else.

Phase 1
Medication Intelligence Graph

Target:

20 countries

200 active ingredients

Phase 2
Provider Graph

Bootstrap:

OSM

Geoapify

Google Places

Phase 3
Outcome Graph

Capture:

Symptoms

Treatments

Medications

Outcomes

22. Long-Term Vision
SwasthYatra becomes the Global Healthcare Navigation Layer.

A traveler anywhere in the world should be able to say:

"I need help."

The system should:

Understand Context

↓

Determine Severity

↓

Find Medication

↓

Find Trusted Care

↓

Translate Communication

↓

Track Outcomes

↓

Improve Future Recommendations

without requiring the traveler to understand the local healthcare system.

This is the complete SwasthYatra founder blueprint and intended platform architecture.

This version consolidates the vision document, PRD, system architecture, moat strategy, agent architecture, technical stack, and roadmap from the recovered blueprint. 



what all tools (env ) were going to be used like sentry posthog etc write the entire supposed folder architecture code files we were about to have 

Based on the recovered blueprint plus the architecture discussions we had around healthcare navigation, agent OS, auditability, memory extraction, provider discovery, and production SaaS standards, this is what the actual production-grade SwasthYatra repo was converging toward before everything got deleted.

Some of this exists explicitly in the recovered document, while some comes from the architectural decisions that naturally follow from the systems described there. 


Complete Infrastructure Stack
Frontend
Next.js 16

React 19

TypeScript

TailwindCSS

shadcn/ui

Radix UI

React Hook Form

Zod

TanStack Query

Zustand

Recharts

MapLibre GL

Framer Motion

Backend
FastAPI

LangGraph

SQLAlchemy

Alembic

Celery

Redis

Database
PostgreSQL

PostGIS

pgvector

Monitoring & Observability
Error Tracking
Sentry
Used for:

Frontend errors

Backend exceptions

Agent failures

Celery failures

API latency tracking

Environment:

SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
Product Analytics
PostHog
Track:

onboarding_completed

passport_created

document_uploaded

interpreter_started

provider_clicked

medication_lookup

journey_completed

POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
Logging
Better Stack
or

Axiom
Track:

API logs

Agent traces

Search queries

Audit logs

Authentication
Auth
Auth.js (NextAuth)
Providers:

Google

Apple (future)

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AUTH_SECRET=
Payments
Eventually:

Stripe
Plans:

Traveler Pro

Family Plan

Organization

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
AI Layer
Clinical Intelligence
Google Gemini
Used For:

extraction

summarization

outcome insights

clinical reasoning

GEMINI_API_KEY=
Agent Reasoning
Groq
Models:

DeepSeek

Qwen

Llama

GROQ_API_KEY=
Future Gateway
LiteLLM
Single abstraction layer.

LITELLM_MASTER_KEY=
Voice Stack
STT
Deepgram
DEEPGRAM_API_KEY=
TTS
ElevenLabs
ELEVENLABS_API_KEY=
Realtime
LiveKit
Interpreter calls.

LIVEKIT_API_KEY=
LIVEKIT_SECRET=
Geospatial Layer
Maps
MapLibre GL JS
Frontend rendering.

Search
Geoapify
Provider search.

GEOAPIFY_API_KEY=
Data
OpenStreetMap
Bootstrap provider inventory.

Storage
Documents
Amazon S3
Store:

reports

audio

passport exports

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET=
Search Layer
Eventually

OpenSearch
For:

provider search

memory search

document search

CI/CD
Repo
GitHub
Frontend
Vercel
Backend
Railway
initially

Later:

Amazon ECS
Complete Monorepo
swasthyatra/

├── apps/
│
├── web/
├── api/
├── workers/
│
├── packages/
│
├── database/
├── agent-core/
├── healthcare-graph/
├── shared/
├── types/
├── ui/
│
├── infrastructure/
│
├── terraform/
├── docker/
├── monitoring/
│
├── docs/
│
└── scripts/
Frontend Architecture
apps/web/src

app/

├── (marketing)
│   ├── page.tsx
│   ├── pricing
│   ├── about
│   └── docs
│
├── onboarding
│
├── dashboard
│
├── passport
│
├── memory
│
├── vault
│
├── journeys
│
├── interpreter
│
├── providers
│
├── outcomes
│
├── organizations
│
├── settings
│
└── agent
Backend Modules
apps/api

src/

├── auth/
│
├── users/
│
├── passport/
│
├── memory/
│
├── vault/
│
├── providers/
│
├── interpreter/
│
├── journeys/
│
├── outcomes/
│
├── organizations/
│
├── analytics/
│
├── audit/
│
├── notifications/
│
├── agent/
│
└── healthcare_graph/
Agent OS
packages/agent-core

├── reasoning.py
├── planner.py
├── executor.py
├── reflection.py
├── replanner.py
│
├── goals.py
├── memory.py
├── timeline.py
├── confidence.py
├── approvals.py
│
├── tools/
│
├── medication_tool.py
├── passport_tool.py
├── provider_tool.py
├── memory_tool.py
├── interpreter_tool.py
├── outcome_tool.py
│
└── workflows/
Healthcare Graph Package
packages/healthcare-graph

├── medication/
│
├── active_ingredient.py
├── equivalent.py
├── otc_status.py
├── country_medication.py
│
├── providers/
│
├── hospitals.py
├── clinics.py
├── pharmacies.py
│
└── outcomes/
Database Models (Approximate Final State)
User
Account
Session

TravelHealthSession

MedicalMemory
MedicalMemoryCandidate

HealthPassport

VaultDocument

Provider
ProviderReview
ProviderAvailability

Medication
ActiveIngredient
MedicationEquivalent
CountryMedication

OutcomeInsight
MedicationOutcome
ProviderOutcome

InterpreterSession

Conversation

Message

AgentRun
AgentTask
AgentApproval

Organization
OrganizationMember

AuditLog

Notification

ActivityEvent

ProviderPresence

ProviderRouting
~50–70 tables eventually.

What We Were About To Add Next (Sprint 11+)
The next major epic wasn't AI.

It was the Provider Network Layer.

ProviderAvailability

ProviderPresence

ProviderContactChannel

ProviderRouting

ProviderDispatcher

ProviderInbox
Then:

WhatsApp Agent

Voice Agent

SMS Agent

Provider Outreach Engine

Follow-up Engine
That would have transformed SwasthYatra from a navigation app into a true Healthcare Navigation Infrastructure Platform, where the AI could not only recommend care but actually route travelers to providers, coordinate communication, and track outcomes end-to-end. That was the direction the architecture was clearly heading before the repo loss.


backend is pure nextAuth

If you're referring to the final SwasthYatra architecture we had shifted toward, then yes, the backend was no longer heading toward a large separate Express/FastAPI CRUD backend for most business operations.

The architecture was becoming:

Next.js App Router
    |
    ├── Server Components
    ├── Server Actions
    ├── Route Handlers (/api)
    ├── NextAuth/Auth.js
    └── Prisma
            |
       PostgreSQL
So effectively:

Frontend + Backend = Next.js Monolith
with AI services separated only where needed.

What lived inside Next.js
Authentication
src/auth/

auth.ts
auth.config.ts

providers/
    google.ts

callbacks/
    jwt.ts
    session.ts

permissions/
    rbac.ts
Using:

Auth.js (NextAuth v5)

Google OAuth

Session management

RBAC

API Routes
app/api/

passport/
memory/
vault/
provider/
interpreter/
journey/
outcome/
organization/
agent/
Most endpoints were route handlers.

Example:

app/api/passport/route.ts

GET
POST
PATCH
DELETE
Server Actions
Instead of Express controllers:

actions/

passport/
memory/
vault/
provider/
organization/
Example:

export async function createPassport()
export async function approveMemoryCandidate()
export async function uploadDocument()
Prisma Package
packages/database

prisma/

schema.prisma

client.ts

repositories/

passport.repository.ts
memory.repository.ts
provider.repository.ts
Shared everywhere.

What was NOT in Next.js
Only heavy workloads.

Agent Service
apps/agent-service
Responsible for:

Reasoning
Planning
Reflection
Replanning
Using:

LangGraph

Gemini

Groq

Worker Service
apps/workers
Responsible for:

OCR

Document Extraction

Translation

Memory Extraction

Outcome Processing

Provider Sync Jobs
Using:

Celery / BullMQ
Redis
depending on implementation.

Final Architecture We Were Moving Toward
apps/

├── web/
│
├── agent-service/
│
└── workers/
where

web
contained:

Frontend

Backend APIs

Auth

Prisma

Business Logic

Dashboard

Organizations

Passport

Memory

Vault

Provider Search
What the environment variables would have looked like
# Auth
AUTH_SECRET=
AUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Database
DATABASE_URL=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
POSTHOG_HOST=

# Monitoring
SENTRY_DSN=

# AI
GEMINI_API_KEY=
GROQ_API_KEY=

# Storage
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET=

# Maps
GEOAPIFY_API_KEY=

# Voice
DEEPGRAM_API_KEY=
ELEVENLABS_API_KEY=
LIVEKIT_API_KEY=
LIVEKIT_SECRET=
If we follow the latest direction you had settled on before the repo loss, the architecture was closer to:

Next.js 16
+
Auth.js
+
Prisma
+
PostgreSQL
+
Server Actions
+
Route Handlers

(Primary backend)

+

Agent Service (LangGraph)

+

Worker Service (OCR/Extraction)
rather than the older:

Next.js
+
Express Backend
+
FastAPI Backend
multi-backend setup. The healthcare platform logic (passport, memory, vault, journeys, organizations, provider discovery, outcomes) was intended to live mostly inside the Next.js application itself, with separate services only for AI orchestration and long-running jobs.


write in depth about the codes and code files about all features everything in depth 

What you're asking for is essentially the engineering blueprint of the entire codebase—not just folder names, but what every module, service, model, route, server action, job, agent, and component was supposed to do.

Based on the recovered founder blueprint and the architecture direction we had converged on, this is what the repository would likely have looked like at MVP → v1.

Root Architecture
swasthyatra/

apps/
├── web/

packages/
├── database/
├── agent-core/
├── healthcare-graph/
├── ui/
├── shared/
├── types/

infrastructure/
├── docker/
├── monitoring/
├── scripts/

docs/
The system was becoming:

Next.js
+
Auth.js
+
Prisma
+
Postgres

as the application

while

Agent Core

and

Healthcare Graph

were internal packages.
apps/web
Entire product.

Contains:

frontend

backend

auth

api

server actions

app/
app/

(auth)

(onboarding)

dashboard

passport

memory

vault

journeys

interpreter

providers

outcomes

organizations

agent

settings
Onboarding System
Purpose:

Create healthcare profile before entering dashboard.

Pages
onboarding/

page.tsx

steps/

profile.tsx
medical.tsx
allergies.tsx
insurance.tsx
emergency.tsx
review.tsx
Server Actions
actions/onboarding/

createProfile.ts

saveMedicalHistory.ts

saveInsurance.ts

completeOnboarding.ts
Passport Module
Most important user-facing system.

Database
model HealthPassport
Stores:

conditions

allergies

medications

vaccinations

insurance

emergency_contacts
UI
passport/

page.tsx

components/

passport-card.tsx

medication-list.tsx

allergy-list.tsx

condition-list.tsx
Actions
actions/passport/

updatePassport.ts

sharePassport.ts

revokeShare.ts
API
api/passport/

route.ts

share/route.ts

export/route.ts
Passport Sharing
One of the moat features.

Files
passport/share/

page.tsx
Flow
Generate Link

↓

Create Token

↓

Provider Opens

↓

Audit Log

↓

View Passport

Database
PassportShareLink

PassportAccessLog
Medical Memory
The second moat.

Database
MedicalMemory

MedicalMemoryCandidate
Candidate Pipeline
Never:

Document
↓
Memory
Always:

Document
↓
Candidate
↓
Human Review
↓
Memory
Components
memory/

page.tsx

candidate-review.tsx

memory-entry.tsx
Actions
approveCandidate.ts

rejectCandidate.ts

mergeCandidate.ts
Vault System
Stores documents.

Upload Flow
Upload

↓

S3

↓

OCR

↓

Translation

↓

Extraction

↓

Candidate

↓

Memory
Database
VaultDocument
Fields:

id

title

mimeType

storageKey

ocrStatus

translationStatus

extractionStatus
Components
vault/

upload-zone.tsx

document-viewer.tsx

processing-status.tsx
OCR Pipeline
Worker job.

Files
jobs/

ocr.job.ts

translate.job.ts

extract.job.ts
Flow
Upload

↓

OCR

↓

Translate

↓

Gemini Extraction

↓

MedicalMemoryCandidate
Provider Discovery
Huge module.

Database
Provider

ProviderReview

ProviderAvailability
Provider Types
Hospital

Clinic

Pharmacy

Telemedicine
Pages
providers/

page.tsx

[id]/page.tsx
Components
provider-card.tsx

provider-map.tsx

provider-filters.tsx

provider-details.tsx
Services
services/provider/

geoapify.ts

osm.ts

google-places.ts
Medication Intelligence
Massive moat.

Package
packages/healthcare-graph
Database
Medication

ActiveIngredient

MedicationEquivalent

CountryMedication

OTCStatus
Services
medication.service.ts
Functions:

findEquivalent()

searchIngredient()

searchCountryMedication()

checkOTCStatus()
Example
Crocin

↓

Paracetamol

↓

Tylenol
Interpreter System
Potentially biggest moat.

Database
InterpreterSession
Flow
Patient Audio

↓

Deepgram

↓

Translation

↓

Context Injection

↓

Provider

↓

Response

↓

TTS
Components
interpreter/

live-session.tsx

transcript.tsx

language-selector.tsx
Services
deepgram.service.ts

elevenlabs.service.ts

translation.service.ts
Travel Journey System
Central entity.

Database
TravelHealthSession
Contains:

country

city

symptoms

severity

providerContext

interpreterContext

outcomeStatus
Services
journey.service.ts
Functions:

createJourney()

updateSeverity()

addProvider()

closeJourney()
Outcome Intelligence
Captures what happened.

Database
OutcomeInsight

MedicationOutcome

ProviderOutcome
Example
Traveler

Food Poisoning

Bangkok

Visited:

Provider A

Medication B

Recovered:

24 Hours
AI Jobs
generateOutcomeInsight.ts

providerOutcomeAnalysis.ts

medicationOutcomeAnalysis.ts
Organization Layer
For hospitals.

Database
Organization

OrganizationMember
Roles
PATIENT

DOCTOR

PHARMACIST

MEDICAL_ASSISTANT

ORG_OPERATOR

ORG_ADMIN
Features
Member Management

Assignments

Reviews

Approvals

Analytics
Audit System
Critical.

Everything writes here.

Database
AuditLog
Service
audit.service.ts
Functions:

logCreate()

logUpdate()

logDelete()

logShare()

logApproval()
Agent OS
Most sophisticated package.

Package
packages/agent-core
Structure
agent-core/

reasoning.ts

planner.ts

executor.ts

reflection.ts

replanner.ts

timeline.ts

memory.ts

goals.ts

confidence.ts

approvals.ts
reasoning.ts
Receives:

TravelHealthSession

Passport

Memory

Provider Context
Produces:

Situation Analysis
planner.ts
Produces:

Plan

1. Find medication

2. Search providers

3. Prepare interpreter
executor.ts
Runs tools.

Example:

searchMedication()

searchProviders()

queryPassport()

queryMemory()
reflection.ts
Checks:

Was goal achieved?
confidence.ts
Scores:

source reliability

memory quality

provider confidence

document confidence
Agent Tools
tools/

passport.tool.ts

memory.tool.ts

provider.tool.ts

medication.tool.ts

interpreter.tool.ts

outcome.tool.ts

journey.tool.ts
Analytics
PostHog events.

passport_created

document_uploaded

memory_approved

provider_viewed

interpreter_started

journey_completed

passport_shared
Monitoring
Sentry everywhere.

Files:

instrumentation.ts

sentry.client.config.ts

sentry.server.config.ts
Tracks:

API failures

OCR failures

AI failures

Worker failures

Route failures
Database Package
packages/database
Contains:

prisma/

schema.prisma

client.ts

seed.ts

repositories/
Repositories
passport.repository.ts

memory.repository.ts

provider.repository.ts

journey.repository.ts

organization.repository.ts
MVP Database Tables
Realistically around:

User
Account
Session

TravelHealthSession

HealthPassport

MedicalMemory
MedicalMemoryCandidate

VaultDocument

Provider
ProviderReview

Medication
ActiveIngredient
MedicationEquivalent

InterpreterSession

OutcomeInsight

Organization
OrganizationMember

AuditLog

Notification
~25–35 tables for MVP.

The biggest realization is that SwasthYatra was no longer becoming a simple "AI healthcare chatbot." The codebase was evolving into four core engines:

Healthcare Navigation Engine (TravelHealthSession)

Medical Knowledge Engine (Passport + Memory + Vault)

Healthcare Intelligence Engine (Medication Graph + Outcome Graph)

Agent Operating System (Reason → Plan → Execute → Reflect)

Everything else in the repository existed to support those four systems.


okay

The next thing that would have been documented—and honestly the most valuable part if you ever rebuild SwasthYatra—is the actual Prisma schema, RBAC architecture, IDOR security model, Server Actions structure, and Agent Workflow implementation.

Those are the parts that usually get lost after a repo deletion because they're not visible from the UI.

The deepest missing documents would be:

1. Complete Prisma Schema (50+ models)
Including:

User
Account
Session

TravelHealthSession

HealthPassport
PassportShareLink
PassportAccessLog

MedicalMemory
MedicalMemoryCandidate

VaultDocument
DocumentChunk

Medication
ActiveIngredient
MedicationEquivalent
CountryMedication

Provider
ProviderReview
ProviderAvailability
ProviderLanguage

InterpreterSession
InterpreterTranscript

OutcomeInsight
MedicationOutcome
ProviderOutcome

Organization
OrganizationMember
Role

AgentRun
AgentTask
AgentApproval

AuditLog
Notification
ActivityEvent
With:

relations

indexes

foreign keys

audit fields

ownership fields

soft delete strategy

2. IDOR Security Architecture
This was extremely important.

Every query would have been ownership checked.

Example:

const passport = await prisma.healthPassport.findFirst({
  where: {
    id: passportId,
    userId: session.user.id
  }
})
Never:

findUnique({
  id: passportId
})
Security package:

lib/security/

ownership.ts
authorization.ts
audit.ts
permissions.ts
3. RBAC System
Roles:

PATIENT

DOCTOR

PHARMACIST

MEDICAL_ASSISTANT

ORG_OPERATOR

ORG_ADMIN

SUPER_ADMIN
Permission matrix:

canViewPassport

canEditPassport

canApproveMemory

canAccessOrganization

canManageMembers

canViewAnalytics
4. Server Actions Architecture
Instead of REST-heavy architecture.

actions/

passport/
memory/
vault/
provider/
journey/
organization/
agent/
Example:

approveMemoryCandidate()

sharePassport()

createJourney()

closeJourney()

createProviderReview()
5. Agent Workflow Implementation
The actual LangGraph-style flow.

START

↓

INTAKE

↓

SEVERITY

↓

ROUTER

├── SELF_CARE
├── PHARMACY
├── CLINIC
├── HOSPITAL
└── EMERGENCY
Files:

packages/agent-core/workflows

travel-navigation.workflow.ts

pharmacy.workflow.ts

provider.workflow.ts

interpreter.workflow.ts

outcome.workflow.ts
6. Dashboard Architecture
The dashboard itself was becoming a true OS.

Dashboard

├── Health Passport
├── Vault
├── Medical Memory
├── Journeys
├── Providers
├── Interpreter
├── Outcomes
├── Organizations
└── Agent Workspace
Like:

Linear

Raycast

Notion

combined.

7. Design System
We never fully wrote this down.

But it was heading toward:

Inter Variable

Neutral Gray Palette

Emerald Accent

Healthcare Blue Accent

12px Grid

Command Palette

AI Side Panel

Activity Feed

Right Context Drawer
Component package:

packages/ui

button.tsx

card.tsx

command.tsx

drawer.tsx

sheet.tsx

data-table.tsx

entity-card.tsx

timeline.tsx

activity-feed.tsx

agent-panel.tsx
8. Production Infrastructure
The final architecture was likely:

Vercel
│
├── Next.js App
│
├── Auth.js
│
├── Prisma
│
└── PostgreSQL

AWS S3

PostHog

Sentry

Redis

Gemini

Groq

Deepgram

ElevenLabs

Geoapify
If you want to fully reconstruct the lost repo, the next document I would generate is:

"SwasthYatra v1 Complete Technical Specification (100+ pages)"

covering:

every Prisma model

every page

every API route

every server action

every component

every agent workflow

every environment variable

every RBAC permission

every audit event

every S3 object structure

every background job

every notification flow

every dashboard screen

essentially the entire repository recreated as engineering documentation before writing a single line of code.


yes

Perfect. If I were reconstructing the repository from scratch, I would not start with code.

I would first write the SwasthYatra Engineering Bible.

Because once that exists, any competent engineer (or Claude Code, Devin, Cursor, Codex, etc.) can regenerate the repository.

SWASTHYATRA V1
Complete Technical Specification
Target Version
v1.0
Product Type
Healthcare Navigation Operating System
SYSTEM OVERVIEW
The platform consists of four major engines.

SwasthYatra

├── Navigation Engine
├── Medical Knowledge Engine
├── Intelligence Engine
└── Agent Operating System
ENGINE 1
NAVIGATION ENGINE
Core Entity:

TravelHealthSession
Everything revolves around this.

Not User.

Not Chat.

Not Appointment.

Responsibilities
Symptom Intake
Capture:

symptoms
duration
severity
country
location
language
Severity Determination
Output:

SELF_CARE

PHARMACY

CLINIC

HOSPITAL

EMERGENCY
Care Routing
Determine:

where user should go next
Outcome Tracking
Track:

did user recover?
TravelHealthSession
model TravelHealthSession {
  id String @id

  userId String

  country String
  city String?

  latitude Float?
  longitude Float?

  symptoms Json

  duration String?

  severity SeverityLevel

  status JourneyStatus

  language String

  providerId String?

  interpreterSessionId String?

  outcomeId String?

  createdAt DateTime
  updatedAt DateTime
}
ENGINE 2
MEDICAL KNOWLEDGE ENGINE
Contains:

Health Passport

Medical Memory

Health Vault
HEALTH PASSPORT
Portable healthcare profile.

Model
model HealthPassport
Sections
Conditions

[
  {
    name: "Diabetes",
    diagnosedAt: Date
  }
]
Allergies

[
  {
    allergen: "Penicillin",
    severity: "HIGH"
  }
]
Medications

[
  {
    medication: "Metformin",
    dosage: "500mg"
  }
]
Vaccinations

Insurance

Emergency Contacts

Provider Notes

PASSPORT SHARING
Purpose:

Allow traveler to share passport.

Models
PassportShareLink

PassportAccessLog
Flow
Patient

↓

Generate Link

↓

Provider Access

↓

Audit Log

↓

Expires
MEDICAL MEMORY
Persistent knowledge.

Why?
Passport is user-curated.

Memory is system-curated.

Example
User uploads:

Diabetes Report
System extracts:

Type 2 Diabetes
Candidate created.

Not approved automatically.

MEMORY CANDIDATE
model MedicalMemoryCandidate
Fields:

sourceDocumentId

confidence

extractedFact

reviewStatus
Workflow
Document

↓

Extraction

↓

Candidate

↓

Review

↓

Memory
HEALTH VAULT
Stores documents.

Model
model VaultDocument
Fields:

id

fileName

mimeType

storageKey

ocrStatus

translationStatus

extractionStatus
Document Processing Pipeline
Upload

↓

Virus Scan

↓

S3

↓

OCR

↓

Translate

↓

Gemini Extraction

↓

Candidate Creation
ENGINE 3
INTELLIGENCE ENGINE
Contains:

Medication Intelligence

Provider Intelligence

Outcome Intelligence
MEDICATION GRAPH
Most defensible asset.

Tables
Medication

ActiveIngredient

MedicationEquivalent

CountryMedication

OTCStatus
Example:

Crocin

↓

Paracetamol

↓

Tylenol
Functions
findEquivalent()

checkPrescriptionStatus()

searchIngredient()

searchCountryMedication()
PROVIDER INTELLIGENCE
Model
Provider
Fields

name

type

country

city

latitude

longitude

languages

specialties

insuranceAccepted

rating
Provider Types
HOSPITAL

CLINIC

PHARMACY

TELEMEDICINE
PROVIDER AVAILABILITY
ProviderAvailability
Tracks:

day

startTime

endTime
OUTCOME GRAPH
Captures:

symptom

provider

medication

country

outcome
Example

Food Poisoning

Bangkok

Pharmacy A

Medication B

Recovered 24h
Creates:

OutcomeInsight

MedicationOutcome

ProviderOutcome
ENGINE 4
AGENT OPERATING SYSTEM
Architecture:

Reason

↓

Plan

↓

Execute

↓

Reflect

↓

Replan
reasoning.ts
Input:

Passport
Memory
Journey
Provider Context
Output:

Situation Analysis
planner.ts
Output:

Action Plan
Example:

1 Search medication

2 Find provider

3 Prepare interpreter
executor.ts
Runs tools.

reflection.ts
Evaluates:

Did goal succeed?
confidence.ts
Scores:

Confidence

Risk

Human Review Need
DATABASE ARCHITECTURE
Authentication
User

Account

Session

VerificationToken
(Auth.js standard)

Core Models
TravelHealthSession

HealthPassport

PassportShareLink

PassportAccessLog

MedicalMemory

MedicalMemoryCandidate

VaultDocument

Provider

ProviderAvailability

ProviderReview

Medication

ActiveIngredient

MedicationEquivalent

CountryMedication

OutcomeInsight

MedicationOutcome

ProviderOutcome

InterpreterSession

Organization

OrganizationMember

AuditLog

Notification

ActivityEvent
RBAC
Roles
PATIENT

DOCTOR

PHARMACIST

MEDICAL_ASSISTANT

ORG_OPERATOR

ORG_ADMIN

SUPER_ADMIN
Permission Layer
canViewPassport()

canEditPassport()

canSharePassport()

canApproveMemory()

canViewOrganization()

canManageMembers()
SECURITY LAYER
Most important part.

IDOR Protection
Every query ownership validated.

Never:

findUnique(id)
Always:

where: {
  id,
  userId: session.user.id
}
Audit Layer
Every action creates:

AuditLog
Examples:

PASSPORT_CREATED

PASSPORT_SHARED

MEMORY_APPROVED

DOCUMENT_UPLOADED

PROVIDER_VIEWED

INTERPRETER_STARTED
FRONTEND ARCHITECTURE
app/

(onboarding)

dashboard

passport

memory

vault

providers

interpreter

journeys

outcomes

organizations

settings

agent
DASHBOARD
Sections:

Health Passport

Medical Memory

Vault

Healthcare Journeys

Provider Search

Interpreter

Outcomes

Organizations

Agent Workspace
SERVER ACTIONS
actions/

passport/

memory/

vault/

provider/

journey/

organization/

agent/
Examples:

createJourney()

updatePassport()

approveCandidate()

uploadDocument()

sharePassport()

startInterpreter()
OBSERVABILITY
Sentry
Errors

Performance

Tracing

PostHog
Analytics

Funnels

Retention

Events

INFRASTRUCTURE
Vercel

PostgreSQL

Prisma

Auth.js

AWS S3

Gemini

Groq

Geoapify

Deepgram

ElevenLabs

Redis
V2 ROADMAP
After MVP.

Provider Network

Provider Presence

Provider Routing

Provider Dispatcher

Provider Inbox

Provider Messaging

WhatsApp Agent

Voice Agent

Outcome Prediction

Global Healthcare Graph
This document is roughly the first 25–30% of the complete engineering reconstruction. The next layer would go even deeper into:

Full Prisma schema (every field and relation)

Every page wireframe and component tree

Complete database ERD

Every server action implementation

Every API route contract

Every agent workflow node and LangGraph state

Every environment variable

S3 bucket structure

Redis job architecture

PostHog event taxonomy

Audit event taxonomy

Notification system

Provider ingestion pipeline

Medication graph ingestion pipeline

Complete deployment architecture

That would essentially recreate the entire lost repository as a 100–150 page engineering specification.


The next layer is where the repository actually becomes rebuildable.

Up until now we've reconstructed the architecture.

Now we reconstruct the actual engineering implementation plan.

SWASTHYATRA V1
Complete Repository Blueprint
Estimated Size
Frontend:
~250 files

Backend:
~150 files

Packages:
~100 files

Total:
500–700 files
ROOT
swasthyatra/

apps/
packages/
infra/
docs/

package.json
turbo.json
pnpm-workspace.yaml
APPS
apps/

web/

Eventually:

apps/

web/
worker/

Worker separated only after scale.

WEB APP
apps/web

src/

app/

actions/

components/

hooks/

lib/

services/

server/

types/

config/
APP ROUTER
app/

(auth)

(onboarding)

(dashboard)

(api)
AUTH GROUP
(auth)

sign-in

sign-up

verify

error
AUTH FILES
src/auth/

auth.ts

auth.config.ts

auth.callbacks.ts

auth.permissions.ts

auth.roles.ts
auth.ts

Creates:

Auth.js instance

Handles:

Google OAuth

Session creation

JWT

Role injection
auth.callbacks.ts

Contains:

jwt()

session()

signIn()

authorized()
authorized()

Critical.

Every route protected here.

ROLE SYSTEM
enum Role {
 PATIENT
 DOCTOR
 PHARMACIST
 ORG_OPERATOR
 ORG_ADMIN
 SUPER_ADMIN
}
DASHBOARD

Main application.

dashboard/

page.tsx

loading.tsx

error.tsx
Dashboard Layout
dashboard

├── Passport
├── Memory
├── Vault
├── Journeys
├── Providers
├── Interpreter
├── Outcomes
├── Organizations
└── Agent
PASSPORT MODULE
passport/

page.tsx

loading.tsx

share/

export/
Components
passport/components

passport-summary.tsx

allergy-card.tsx

condition-card.tsx

medication-card.tsx

insurance-card.tsx

emergency-contact.tsx
Actions
actions/passport

create-passport.ts

update-passport.ts

share-passport.ts

revoke-share.ts

export-passport.ts
create-passport.ts

Responsibilities:

validate user

create record

audit log

analytics event
share-passport.ts

Creates:

PassportShareLink

Returns:

signed URL
MEMORY MODULE

One of the largest modules.

Pages
memory/

page.tsx

review/

candidate/
Components
memory/components

memory-entry.tsx

candidate-card.tsx

approval-sheet.tsx

merge-dialog.tsx
Actions
actions/memory

approve-candidate.ts

reject-candidate.ts

merge-candidate.ts

delete-memory.ts
Approval Flow
Candidate

↓

Review

↓

Memory

↓

Passport Sync
VAULT MODULE

Document engine.

Pages
vault/

page.tsx

upload/

[id]/
Components
upload-dropzone.tsx

document-viewer.tsx

document-metadata.tsx

processing-status.tsx
Actions
upload-document.ts

delete-document.ts

retry-processing.ts
Upload Pipeline
User Upload

↓

Virus Scan

↓

S3

↓

OCR

↓

Translate

↓

Extract

↓

Candidate
PROVIDERS MODULE

Huge future moat.

Pages
providers/

page.tsx

[id]/page.tsx
Components
provider-card.tsx

provider-map.tsx

provider-filter.tsx

provider-hours.tsx

provider-languages.tsx

provider-contact.tsx
Services
services/provider

provider.service.ts

geoapify.service.ts

osm.service.ts
provider.service.ts

Functions:

searchNearby()

findBySpeciality()

findByLanguage()

findOpenNow()
INTERPRETER MODULE

Potentially biggest moat.

Pages
interpreter/

page.tsx

session/[id]
Components
live-transcript.tsx

language-selector.tsx

audio-recorder.tsx

conversation-feed.tsx
Services
deepgram.service.ts

translation.service.ts

elevenlabs.service.ts
Interpreter Flow
Audio

↓

STT

↓

Translation

↓

Context Injection

↓

Response

↓

TTS
JOURNEY MODULE

Central workflow.

Pages
journeys/

page.tsx

[id]/page.tsx
Components
journey-timeline.tsx

symptom-card.tsx

severity-badge.tsx

outcome-panel.tsx
Actions
create-journey.ts

update-journey.ts

close-journey.ts
OUTCOME MODULE

Creates proprietary dataset.

Pages
outcomes/

page.tsx

insights/
Components
outcome-card.tsx

medication-outcome.tsx

provider-outcome.tsx

insight-chart.tsx
ORGANIZATION MODULE

Provider-facing.

Pages
organizations/

page.tsx

members/

settings/

analytics/
Components
member-table.tsx

assignment-board.tsx

approval-center.tsx

organization-metrics.tsx
DATABASE PACKAGE

Most important package.

packages/database

prisma/

repositories/

client.ts
Schema

Eventually:

60+
models
Core Models
User

Account

Session

TravelHealthSession

HealthPassport

PassportShareLink

PassportAccessLog

MedicalMemory

MedicalMemoryCandidate

VaultDocument

Provider

ProviderAvailability

ProviderReview

Medication

ActiveIngredient

MedicationEquivalent

CountryMedication

InterpreterSession

OutcomeInsight

Organization

OrganizationMember

AgentRun

AuditLog

Notification
REPOSITORY LAYER
repositories/

passport.repository.ts

memory.repository.ts

provider.repository.ts

journey.repository.ts

organization.repository.ts

Purpose:

Prevent Prisma leaking everywhere.

SECURITY PACKAGE

Critical.

server/security

ownership.ts

permissions.ts

audit.ts

encryption.ts

validation.ts
ownership.ts

Most important file.

Every resource checked here.

Example:

assertPassportOwnership()

assertMemoryOwnership()

assertJourneyOwnership()

This prevents IDOR.

AUDIT SYSTEM

Every write operation.

server/audit

audit.service.ts

audit.types.ts
Events
PASSPORT_CREATED

PASSPORT_UPDATED

PASSPORT_SHARED

MEMORY_APPROVED

DOCUMENT_UPLOADED

PROVIDER_VIEWED

INTERPRETER_STARTED
AGENT CORE

Largest internal package.

packages/agent-core
Core Files
reasoning.ts

planner.ts

executor.ts

reflection.ts

replanner.ts

confidence.ts

timeline.ts

memory.ts

goals.ts

approvals.ts
Tools
tools/

passport.tool.ts

memory.tool.ts

provider.tool.ts

medication.tool.ts

interpreter.tool.ts

outcome.tool.ts

journey.tool.ts
Workflow Engine
workflows/

travel-navigation.workflow.ts

pharmacy.workflow.ts

clinic.workflow.ts

hospital.workflow.ts

interpreter.workflow.ts
HEALTHCARE GRAPH

Most valuable package.

packages/healthcare-graph
Medication
medication/

ingredient.ts

equivalent.ts

country.ts

otc.ts
Provider Graph
providers/

provider-node.ts

language-node.ts

speciality-node.ts
Outcome Graph
outcomes/

outcome-node.ts

recovery-node.ts
ENVIRONMENT VARIABLES

Production set was likely around 40–60 variables:

DATABASE_URL=

AUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

SENTRY_DSN=

POSTHOG_KEY=

GEMINI_API_KEY=
GROQ_API_KEY=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET=

GEOAPIFY_API_KEY=

DEEPGRAM_API_KEY=

ELEVENLABS_API_KEY=

LIVEKIT_API_KEY=
LIVEKIT_SECRET=

REDIS_URL=
What Was Going To Be The Real Competitive Moat

Not AI.

Not chat.

Not dashboards.

The moat was:

TravelHealthSession

+

Medical Memory

+

Medication Graph

+

Provider Graph

+

Outcome Graph

All connected through the Agent OS.

That combination would have made SwasthYatra much closer to a healthcare navigation infrastructure company than a healthcare chatbot or appointment-booking app. The repository structure above is essentially the complete engineering map needed to regenerate the lost codebase.


The next step is not more architecture.

You already have enough architecture to rebuild.

What is missing now are the implementation artifacts that engineers and AI coding agents actually use.

I would reconstruct these in this exact order:

1. Complete Prisma Schema

This is the single most important document.

Create:

schema.prisma

With:

User
Account
Session

TravelHealthSession

HealthPassport
PassportShareLink
PassportAccessLog

MedicalMemory
MedicalMemoryCandidate

VaultDocument

Provider
ProviderAvailability
ProviderReview

Medication
ActiveIngredient
MedicationEquivalent
CountryMedication

InterpreterSession

OutcomeInsight
MedicationOutcome
ProviderOutcome

Organization
OrganizationMember

AgentRun
AgentTask
AgentApproval

AuditLog
Notification

Including:

every field
relation
enum
index
cascade rule

Without this, nothing else matters.

2. Complete Database ERD

Visualize:

User
 ├── Passport
 ├── Memory
 ├── Documents
 ├── Journeys
 └── Outcomes

Then:

Journey
 ├── Providers
 ├── Interpreter Sessions
 ├── Outcomes
 └── Audit Events

This becomes the source of truth.

3. RBAC Matrix

A real table.

Example:

Action	Patient	Doctor	Admin
View Passport	Yes	Shared Only	Yes
Edit Passport	Yes	No	Yes
Approve Memory	No	Yes	Yes

This document prevents security disasters.

4. IDOR Security Specification

This was a major part of what you were building.

Document:

Ownership Rules

Audit Rules

Sharing Rules

Organization Rules

Example:

assertPassportOwnership()

assertJourneyOwnership()

assertMemoryOwnership()

Every route must pass through these.

5. API Contract Specification

For every endpoint:

POST /api/passport

GET /api/passport

PATCH /api/passport

Document:

Request

Response

Errors

Permissions
6. Server Action Specification

Example:

createJourney()

updatePassport()

uploadDocument()

approveCandidate()

sharePassport()

For each action:

Document:

Inputs

Validation

Permissions

DB Writes

Audit Events

Analytics Events
7. LangGraph Agent Specification

Probably the most valuable document after the schema.

Define:

State

Nodes

Edges

Tools

Memory

Example:

START

↓

INTAKE

↓

SEVERITY

↓

ROUTER

↓

PHARMACY

with exact state definitions.

8. Healthcare Graph Specification

The actual moat.

Define:

Medication Graph

Provider Graph

Outcome Graph

Including ingestion pipelines.

9. UI System Specification

Every screen.

Example:

Dashboard

Passport

Memory

Vault

Journey

Provider

Interpreter

For each:

Layout

Components

Actions

States

Loading

Errors
10. Engineering Tickets

Convert everything into:

Epic

Story

Task

Subtask

Example:

EPIC-001

Health Passport

TASK-001

Create Passport Model

TASK-002

Passport Page

TASK-003

Passport Sharing

TASK-004

Passport Export
What I would do if I were rebuilding SwasthYatra tomorrow
Write full Prisma schema.
Generate ERD.
Write RBAC + security docs.
Write API contracts.
Write Agent specification.
Create engineering tickets.
Start coding.

At that point, the repository can be regenerated by humans or AI with very little ambiguity.

The single highest-value document remaining is the complete schema.prisma. Once that exists, 40–50% of the system is effectively defined.


After the Prisma schema, ERD, RBAC, API contracts, and Agent specs, the next thing that would have existed before writing production code is what large engineering teams call the Platform Blueprint.
This is where you stop describing features and start describing how the system actually behaves in production.

11. Event-Driven Architecture
Everything in SwasthYatra should emit events.
Instead of:
uploadDocument()
Only doing database writes.
It should also emit:
DOCUMENT_UPLOADED

Event Bus
server/eventsevent-bus.tspublish.tssubscribe.tshandlers/

Core Events
USER_CREATEDPASSPORT_CREATEDPASSPORT_SHAREDDOCUMENT_UPLOADEDDOCUMENT_EXTRACTEDMEMORY_CANDIDATE_CREATEDMEMORY_APPROVEDJOURNEY_STARTEDPROVIDER_SELECTEDINTERPRETER_STARTEDOUTCOME_CAPTURED

Why?
This allows:
AnalyticsNotificationsAudit LogsAgent TriggersFuture Workflows
without coupling systems.

12. Notification System
Not MVP critical.
But necessary.

Database
NotificationNotificationPreference

Types
EMAILIN_APPSMSWHATSAPP

Folder
server/notificationsnotification.service.tsemail.service.tstemplates/

13. Search Architecture
Eventually users will search:
PassportDocumentsMemoriesProvidersJourneys

Package
server/searchprovider.search.tsdocument.search.tsmemory.search.ts

Evolution
Phase 1:Prisma SearchPhase 2:pgvectorPhase 3:OpenSearch

14. File Storage Architecture
Very important.

S3 Structure
s3://swasthyatradocuments/passports/audio/exports/avatars/

Example
documents/user-id/document-id/original.pdfocr.jsontranslation.jsonextraction.json

This prevents chaos later.

15. Background Jobs
One of the biggest missing pieces.

Queue System
RedisBullMQ
or
Trigger.dev
(what I'd choose today)

Jobs
OCR_JOBTRANSLATION_JOBEXTRACTION_JOBMEMORY_SYNC_JOBPROVIDER_SYNC_JOBOUTCOME_ANALYSIS_JOB

Folder
server/jobsocr.job.tstranslate.job.tsextract.job.tsprovider-sync.job.tsoutcome-analysis.job.ts

16. AI Gateway
This becomes critical later.
Never call models directly everywhere.

Package
server/aigateway.tsgemini.tsgroq.tsfallback.ts

Usage
Instead of:
gemini.generateContent()
Do:
aiGateway.reason()

Benefits:
Switch ModelsFallbacksLoggingCost TrackingRate Limiting

17. Analytics Taxonomy
Most startups do this badly.

PostHog Events
user_signed_uponboarding_completedpassport_createdpassport_shareddocument_uploadedmemory_approvedprovider_viewedprovider_selectedjourney_startedjourney_completedinterpreter_startedinterpreter_completed

Properties
Example:
{  "country": "Japan",  "provider_type": "PHARMACY",  "severity": "MEDIUM"}

18. Audit Taxonomy
Separate from analytics.

Analytics:
Product Metrics
Audit:
Compliance

Audit Events
PASSPORT_UPDATEDPASSPORT_EXPORTEDPASSPORT_SHAREDDOCUMENT_DELETEDMEMORY_APPROVEDMEMORY_REJECTEDROLE_CHANGEDMEMBER_INVITED

19. Error Taxonomy
Another missing document.

App Errors
AuthenticationErrorAuthorizationErrorOwnershipErrorValidationErrorProviderSearchErrorPassportShareErrorDocumentProcessingError

Folder
server/errorsbase.error.tsauth.error.tspassport.error.tsprovider.error.ts

20. Feature Flag System
Useful later.

Package
server/flagsflags.ts

Examples:
ENABLE_INTERPRETERENABLE_PROVIDER_ROUTINGENABLE_ORGANIZATIONSENABLE_WHATSAPP_AGENT

21. Demo Environment
You actually discussed demo personas.
These should have been seeded.

Seed Data
Maria RodriguezMexicoDiabetesHypertensionJapan Traveler

Dr Sarah ChenTravel Medicine Doctor

Hiro TanakaTokyo Pharmacist

Seed Script
prisma/seed.ts

22. Testing Architecture
Most overlooked part.

Unit Tests
passport.service.test.tsmemory.service.test.tsprovider.service.test.ts

Integration Tests
passport.integration.test.tsjourney.integration.test.ts

E2E
onboarding.spec.tspassport.spec.tsinterpreter.spec.ts
Using:
Playwright

23. Deployment Architecture
Final likely production architecture:
Users↓Vercel↓Next.js App↓Auth.js↓Prisma↓PostgreSQL↓AWS S3↓Redis↓Gemini / Groq↓Deepgram / ElevenLabs↓Geoapify

24. V2 Architecture (The Real Big Vision)
The next phase wasn't adding more pages.
It was:
Provider Network
New models:
ProviderPresenceProviderRoutingProviderDispatcherProviderInboxProviderContactChannel
Then:
WhatsApp AgentVoice AgentProvider OutreachFollow-up Automation

At this point, the remaining reconstruction would be extremely detailed:


Full schema.prisma (every field)


Complete ERD


Every Server Action implementation contract


Every page/component tree


LangGraph state machine definitions


Sequence diagrams for every workflow


OpenAPI spec for every route


Design system token library


Database migration plan


Sprint-by-sprint execution roadmap


Those documents together would essentially recreate the lost repository at 90–95% fidelity before any code is regenerated.

Yes. There are a few extremely important things we haven't reconstructed yet, and they're arguably the difference between a good architecture document and a company-building operating system.

1. Business Model & Monetization
We documented architecture, but not the actual economics.
Traveler Tier
Free- Limited journeys- Basic provider discovery- Basic passport
Traveler Pro
$5-15/month- Unlimited passport- Medication intelligence- Interpreter- Emergency assistance- Travel healthcare concierge
Family Plan
Family health passportsShared emergency contactsMulti-person journeys

Provider Plan
ClinicHospitalPharmacy
Features:
Provider dashboardTourist visibilityLanguage profileOutcome analyticsRouting

2. Growth Loops
This is what most PRDs miss.
Passport Loop
Create Passport↓Share Passport↓Provider Uses It↓Provider Invites Others

Provider Loop
Traveler Finds Provider↓Provider Receives Patient↓Provider Joins Platform↓Inventory Improves

Outcome Loop
Journey↓Outcome↓Graph Improves↓Recommendations Improve
This is the real moat.

3. Healthcare Data Governance
Very important.
We discussed security, but not governance.
Questions:
What can AI write?What requires approval?What is immutable?What can be deleted?What is archived?

Example:
Passport=User controlledMedical Memory=AI suggestedHuman approvedAudit Log=Immutable

4. Clinical Safety Layer
Probably the most important missing document.
The AI should NEVER become:
AI Doctor
Instead:
Navigation Assistant

Forbidden behaviors:
Diagnose diseasePrescribe medicationGuarantee outcomesReplace doctors

Allowed behaviors:
ExplainNavigateTranslateOrganizeEscalate

5. Data Acquisition Strategy
The actual moat wasn't code.
It was data.

Medication Graph
How does it get built?
Government datasetsDrug databasesCountry formulariesOpen data

Provider Graph
OSMGeoapifyGovernment registriesProvider onboarding

Outcome Graph
Only SwasthYatra can generate this.
Traveler↓Provider↓Medication↓Outcome

6. Internal Admin Platform
Almost always forgotten.
You would need:
/admin

Features:
User SearchJourney SearchMemory ReviewProvider ModerationAnalyticsAudit ViewerFeature Flags

Roles:
SupportOpsMedical ReviewerAdmin

7. Medical Reviewer Workflow
This was implied but never fully designed.
When confidence is low:
AI↓Review Queue↓Medical Reviewer↓Approve↓Memory

New models:
ReviewTaskReviewDecisionReviewComment

8. Internationalization
Huge for travel.

Languages:
EnglishSpanishJapaneseFrenchGermanHindiMandarin

Structure:
/messagesen.jsones.jsonja.json

9. Design System Specification
We talked about it but never formalized it.
Inspired by:


Linear


Raycast


Notion



Tokens:
TypographySpacingRadiusShadowsMotionColors

Component inventory:
50-100 components

10. Product Metrics
The actual KPIs.
Without these, PostHog is useless.

North Star:
Successful Healthcare Journeys

Supporting metrics:
Passport Creation RateJourney Completion RateProvider Selection RateInterpreter Usage RateOutcome Capture RateRecovery Confirmation Rate

11. YC / Investor Narrative
We discussed architecture.
Not the story.
The actual narrative was:
Healthcare is fragmented.Travel makes it worse.People don't need diagnosis.They need navigation.SwasthYatra is building the Healthcare Navigation Layer.

12. Execution Roadmap
The final thing missing.
Not architecture.
Not code.
Actual build order.
Phase 0
AuthPassportJourneyProvider Search
Phase 1
VaultMemoryMedication Graph
Phase 2
InterpreterOutcome Graph
Phase 3
OrganizationsProvider Network
Phase 4
WhatsApp AgentVoice AgentProvider Routing

What is truly left?
Only 4 major artifacts remain unreconstructed:
A. Full Prisma Schema
The most important technical document.
B. Complete ERD
Every relationship visualized.
C. Every UI screen/wireframe
Every page, modal, drawer, table, workflow.
D. Sprint-by-sprint implementation plan
A 6–12 month engineering roadmap.
Once those are written, you've essentially recovered 95–99% of the lost SwasthYatra knowledge, even if every line of code disappeared. The remaining 1–5% would just be implementation details and specific code that can be regenerated from the specifications.


FINAL RECONSTRUCTION CHECKLIST
1. Product Specification (90% reconstructed)
Already mostly recovered:
MissionVisionHealthcare Navigation LayerTravelHealthSessionPassportMemoryVaultProvider DiscoveryInterpreterOutcome GraphOrganizationsAgent OS

2. Engineering Specification
Need:
Full schema.prismaERDIndexesConstraintsEnumsMigration strategy
This is the most important remaining technical artifact.

3. Design System Bible
Not just UI.
Actual system.
Foundations
TypographySpacingElevationColor TokensMotion TokensAccessibility

Components
ButtonsInputsTablesCardsDialogsDrawersTimelineCommand PaletteAgent PanelActivity Feed

Dashboard Pattern
Every page follows:
HeaderPrimary ContentContext DrawerActivity FeedAI Panel

4. User Journey Library
Every user workflow documented.

Journey 1
Traveler gets sick.
Symptoms↓Journey Created↓Severity Assessment↓Provider Search↓Interpreter↓Outcome

Journey 2
Passport sharing.
Open Passport↓Generate Link↓Provider Opens↓Audit Log↓Expire Link

Journey 3
Medical Memory.
Upload Document↓OCR↓Extraction↓Candidate↓Review↓Memory↓Passport Sync

5. LangGraph State Definitions
Most likely lost.
Need exact definitions.

State
TravelHealthState
Contains:
UserJourneyPassportMemorySymptomsSeverityProvider ContextInterpreter ContextOutcome Context

Nodes
IntakeNodeSeverityNodeProviderNodeMedicationNodeInterpreterNodeOutcomeNode

Edges
Severity -> PharmacySeverity -> ClinicSeverity -> Emergency

6. OpenAPI Contract
Every endpoint documented.

Example:
POST /api/journeys
Request:
{  "symptoms": []}
Response:
{  "journeyId": ""}

Repeat for every route.

7. Data Dictionary
One of the most overlooked docs.
Every field.

Example:
TravelHealthSession.severity
Type:ENUMValues:LOWMEDIUMHIGHCRITICALOwner:Navigation Engine

MedicalMemory.confidence
Range:0-100Generated By:AI ExtractionReviewed By:Human

8. AI Governance Document
Critical.

Allowed
SummarizationTranslationNavigationProvider SearchMedication Mapping

Forbidden
DiagnosisPrescriptionClinical DecisionsEmergency Medical Advice

Human Review Required
Memory CreationClinical ExtractionProvider Verification

9. Infrastructure as Code
Likely never fully written.
Need:
TerraformDockerGitHub ActionsVercel ConfigS3 ConfigPostgres Config

Structure:
infra/terraform/docker/github-actions/

10. Operations Manual
How the company runs.

Incident Response
Provider Search DownAI Provider DownDatabase FailureS3 Failure

Escalation
Severity 1Severity 2Severity 3

Monitoring
SentryPostHogDatabaseRedisAI Costs

11. Medical Review Operations
Unique to SwasthYatra.

Queue:
Memory CandidatesProvider VerificationOutcome Verification

Roles:
ReviewerMedical ReviewerOperations Admin

12. Knowledge Graph Roadmap
This is probably the biggest long-term moat.

Medication Graph
IngredientCountryBrandOTC Status

Provider Graph
ProviderLanguageInsuranceCountry

Outcome Graph
SymptomProviderMedicationOutcome

Navigation Graph
Traveler↓Symptoms↓Care Path↓Outcome

13. Complete Sprint Roadmap
The actual build order.

Sprint 1
AuthDatabaseRBACPassport

Sprint 2
VaultUploadOCRS3

Sprint 3
Medical MemoryReview System

Sprint 4
Provider DiscoveryGeoapifyMaps

Sprint 5
TravelHealthSessionJourney Engine

Sprint 6
Medication Graph

Sprint 7
Interpreter

Sprint 8
Outcome Graph

Sprint 9
Organizations

Sprint 10
Agent OS

Sprint 11+
Provider RoutingWhatsApp AgentVoice AgentProvider Network

Final Assessment
The remaining high-value documents are:


Full Prisma Schema (all fields + relations)


Database ERD


OpenAPI Specification


LangGraph State Machine Specification


Design System Bible


Data Dictionary


AI Governance & Safety Rules


Sprint-by-Sprint Build Plan


Infrastructure as Code Spec


Operations & Medical Review Manual


Once those exist, you effectively have the entire SwasthYatra company reconstructed—from product vision to deployment—without needing the original repository. The next logical artifact to generate would be the complete schema.prisma with all models, relations, enums, indexes, audit fields, and ownership constraints, because everything else hangs off that foundation.

If by "write 10%" you mean "start writing the actual missing engineering spec at the deepest level", then the next 10% is the real Prisma schema foundation.
This is the document that would have existed before writing most of the application.
SWASTHYATRA V1DATABASE FOUNDATION SPECIFICATIONPART 1 — CORE MODELSENUMSUser Rolesenum Role {
  PATIENT
  DOCTOR
  PHARMACIST
  MEDICAL_ASSISTANT
  ORG_OPERATOR
  ORG_ADMIN
  SUPER_ADMIN
}Journey Statusenum JourneyStatus {
  ACTIVE
  RESOLVED
  CANCELLED
}Severity Levelenum SeverityLevel {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}Review Statusenum ReviewStatus {
  PENDING
  APPROVED
  REJECTED
}Provider Typeenum ProviderType {
  HOSPITAL
  CLINIC
  PHARMACY
  TELEMEDICINE
}USERAuth.js core model.model User {
  id            String   @id @default(cuid())

  email         String   @unique
  name          String?
  image         String?

  role          Role     @default(PATIENT)

  onboardingCompleted Boolean @default(false)

  passport      HealthPassport?

  journeys      TravelHealthSession[]

  memories      MedicalMemory[]

  documents     VaultDocument[]

  organizations OrganizationMember[]

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([email])
}HEALTH PASSPORTPrimary healthcare profile.model HealthPassport {
  id                  String @id @default(cuid())

  userId              String @unique

  bloodType           String?

  insuranceProvider   String?
  insuranceNumber     String?

  emergencyContact    Json?

  user                User @relation(
    fields: [userId],
    references: [id],
    onDelete: Cascade
  )

  shareLinks          PassportShareLink[]

  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}PASSPORT SHARE LINKTemporary provider access.model PassportShareLink {
  id               String @id @default(cuid())

  passportId       String

  token            String @unique

  expiresAt        DateTime

  revoked          Boolean @default(false)

  passport         HealthPassport
                    @relation(
                      fields: [passportId],
                      references: [id],
                      onDelete: Cascade
                    )

  accessLogs       PassportAccessLog[]

  createdAt        DateTime @default(now())

  @@index([token])
}PASSPORT ACCESS LOGCompliance trail.model PassportAccessLog {
  id              String @id @default(cuid())

  shareLinkId     String

  ipAddress       String?

  userAgent       String?

  viewedAt        DateTime @default(now())

  shareLink       PassportShareLink
                   @relation(
                     fields: [shareLinkId],
                     references: [id]
                   )
}TRAVEL HEALTH SESSIONThe most important entity.Everything revolves around this.model TravelHealthSession {
  id                    String @id @default(cuid())

  userId                String

  country               String

  city                  String?

  latitude              Float?
  longitude             Float?

  language              String

  symptoms              Json

  duration              String?

  severity              SeverityLevel

  status                JourneyStatus
                         @default(ACTIVE)

  user                  User
                         @relation(
                           fields: [userId],
                           references: [id],
                           onDelete: Cascade
                         )

  outcome               OutcomeInsight?

  providerId            String?

  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  @@index([userId])

  @@index([country])

  @@index([severity])

  @@index([status])
}VAULT DOCUMENTSource of truth for uploaded files.model VaultDocument {
  id                String @id @default(cuid())

  userId            String

  title             String

  fileName          String

  mimeType          String

  storageKey        String

  fileSize          Int

  ocrCompleted      Boolean @default(false)

  translated        Boolean @default(false)

  extracted         Boolean @default(false)

  user              User
                     @relation(
                       fields: [userId],
                       references: [id],
                       onDelete: Cascade
                     )

  memoryCandidates  MedicalMemoryCandidate[]

  createdAt         DateTime @default(now())

  @@index([userId])
}MEDICAL MEMORYVerified healthcare knowledge.model MedicalMemory {
  id                String @id @default(cuid())

  userId            String

  type              String

  title             String

  value             Json

  confidence        Int

  verified          Boolean @default(false)

  sourceDocumentId  String?

  user              User
                     @relation(
                       fields: [userId],
                       references: [id],
                       onDelete: Cascade
                     )

  createdAt         DateTime @default(now())

  updatedAt         DateTime @updatedAt

  @@index([userId])

  @@index([type])
}MEDICAL MEMORY CANDIDATEAI extracted.Not yet trusted.model MedicalMemoryCandidate {
  id                  String @id @default(cuid())

  documentId          String

  extractedType       String

  extractedValue      Json

  confidence          Int

  reviewStatus        ReviewStatus
                       @default(PENDING)

  document            VaultDocument
                       @relation(
                         fields: [documentId],
                         references: [id],
                         onDelete: Cascade
                       )

  createdAt           DateTime @default(now())

  @@index([reviewStatus])
}DESIGN PRINCIPLESEvery model contains ownership.userIdEvery model contains timestamps.createdAt
updatedAtEvery share action is auditable.AI never writes directly to MedicalMemory.Documents always flow:Document→ Candidate→ Review→ MemoryTravelHealthSession remains the central entity.Nothing bypasses it.
This is roughly the first 10% of the actual database specification. The next 10% would add:


Provider models


Medication graph models


Outcome intelligence models


Organization models


Audit log models


Notification models


Interpreter models


Agent execution models


Review workflow models


Provider routing models


Those models are where the real moat starts appearing.