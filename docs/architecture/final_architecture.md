# SWASTHYATRA - FINAL REPOSITORY ARCHITECTURE

Below is the detailed, final folder architecture representing the state of the monorepo before the repository loss, including a breakdown of the specific files that lived within these directories.

```text
root/
├───────────────────────────────────────────────
│ MONOREPO CONFIGURATION
├───────────────────────────────────────────────
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── .eslintrc.js
├── .prettierrc
├── turbo.json
│
├───────────────────────────────────────────────
│ FRONTEND (Next.js 16, React 19, App Router)
├───────────────────────────────────────────────
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.mjs
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── globals.css
│   │   │   ├── (marketing)/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── about/page.tsx
│   │   │   │   ├── pricing/page.tsx
│   │   │   │   ├── contact/page.tsx
│   │   │   │   └── demo/page.tsx
│   │   │   ├── auth/
│   │   │   │   ├── signin/page.tsx
│   │   │   │   ├── signup/page.tsx
│   │   │   │   └── callback/route.ts
│   │   │   ├── onboarding/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── profile/page.tsx
│   │   │   │   ├── emergency-contact/page.tsx
│   │   │   │   ├── insurance/page.tsx
│   │   │   │   ├── medical-basics/page.tsx
│   │   │   │   └── completion/page.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── overview/page.tsx
│   │   │   │   ├── notifications/page.tsx
│   │   │   │   └── settings/page.tsx
│   │   │   ├── passport/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── shares/page.tsx
│   │   │   │   ├── generate/page.tsx
│   │   │   │   ├── provider-view/[id]/page.tsx
│   │   │   │   └── audit/page.tsx
│   │   │   ├── vault/
│   │   │   │   ├── documents/page.tsx
│   │   │   │   ├── uploads/page.tsx
│   │   │   │   ├── review-queue/page.tsx
│   │   │   │   └── extracted-data/page.tsx
│   │   │   ├── memory/
│   │   │   │   ├── conditions/page.tsx
│   │   │   │   ├── medications/page.tsx
│   │   │   │   ├── allergies/page.tsx
│   │   │   │   ├── vaccinations/page.tsx
│   │   │   │   └── insurance/page.tsx
│   │   │   ├── journeys/
│   │   │   │   ├── active/page.tsx
│   │   │   │   ├── history/page.tsx
│   │   │   │   ├── sessions/[id]/page.tsx
│   │   │   │   └── outcomes/page.tsx
│   │   │   ├── interpreter/
│   │   │   │   ├── live/page.tsx
│   │   │   │   ├── history/page.tsx
│   │   │   │   ├── transcripts/[id]/page.tsx
│   │   │   │   └── session/[id]/page.tsx
│   │   │   ├── graph/
│   │   │   │   ├── medications/page.tsx
│   │   │   │   ├── providers/page.tsx
│   │   │   │   ├── countries/page.tsx
│   │   │   │   └── analytics/page.tsx
│   │   │   ├── providers/
│   │   │   │   ├── search/page.tsx
│   │   │   │   ├── hospitals/page.tsx
│   │   │   │   ├── clinics/page.tsx
│   │   │   │   ├── pharmacies/page.tsx
│   │   │   │   └── telemedicine/page.tsx
│   │   │   ├── organizations/
│   │   │   │   ├── members/page.tsx
│   │   │   │   ├── analytics/page.tsx
│   │   │   │   ├── assignments/page.tsx
│   │   │   │   └── approvals/page.tsx
│   │   │   ├── outcomes/
│   │   │   │   ├── insights/page.tsx
│   │   │   │   ├── medications/page.tsx
│   │   │   │   ├── providers/page.tsx
│   │   │   │   └── reports/page.tsx
│   │   │   ├── agent/
│   │   │   │   ├── workspace/page.tsx
│   │   │   │   ├── goals/page.tsx
│   │   │   │   ├── approvals/page.tsx
│   │   │   │   ├── timeline/page.tsx
│   │   │   │   ├── evaluations/page.tsx
│   │   │   │   └── inbox/page.tsx
│   │   │   └── admin/
│   │   │       ├── benchmarks/page.tsx
│   │   │       ├── organizations/page.tsx
│   │   │       ├── users/page.tsx
│   │   │       └── system/page.tsx
│   │   ├── components/
│   │   │   ├── ui/ (shadcn components)
│   │   │   ├── forms/
│   │   │   ├── maps/
│   │   │   └── layouts/
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   └── utils.ts
│   │   ├── hooks/
│   │   │   └── use-session.ts
│   │   ├── providers/
│   │   │   └── theme-provider.tsx
│   │   └── types/
│   │       └── index.d.ts
│
├───────────────────────────────────────────────
│ BACKEND (Node.js/Express + Python Subservices)
├───────────────────────────────────────────────
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── app/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── core/
│   │   │   │   ├── config/env.ts
│   │   │   │   ├── auth/jwt.ts
│   │   │   │   ├── logger/winston.ts
│   │   │   │   ├── database/connection.ts
│   │   │   │   ├── cache/redis.ts
│   │   │   │   └── middleware/error-handler.ts
│   │   │   ├── sessions/
│   │   │   │   ├── models/session.ts
│   │   │   │   ├── service/session.service.ts
│   │   │   │   ├── repository/session.repo.ts
│   │   │   │   └── router/session.routes.ts
│   │   │   ├── navigation/ (Python LangGraph Service)
│   │   │   │   ├── requirements.txt
│   │   │   │   ├── graph.py
│   │   │   │   ├── state.py
│   │   │   │   ├── routing.py
│   │   │   │   ├── service.py
│   │   │   │   └── nodes/
│   │   │   │       ├── intake.py
│   │   │   │       ├── triage_context.py
│   │   │   │       ├── severity.py
│   │   │   │       ├── medication_lookup.py
│   │   │   │       ├── provider_search.py
│   │   │   │       ├── interpreter.py
│   │   │   │       ├── self_care.py
│   │   │   │       └── outcomes.py
│   │   │   ├── healthcare-graph/
│   │   │   │   ├── medications/lookup.ts
│   │   │   │   ├── countries/rules.ts
│   │   │   │   ├── providers/graph.ts
│   │   │   │   ├── symptoms/mapping.ts
│   │   │   │   └── outcomes/enrichment.ts
│   │   │   ├── providers/
│   │   │   │   ├── discovery/osm-client.ts
│   │   │   │   ├── search/geo-query.ts
│   │   │   │   ├── availability/status.ts
│   │   │   │   ├── routing/distance.ts
│   │   │   │   ├── reviews/aggregator.ts
│   │   │   │   └── analytics/metrics.ts
│   │   │   ├── medication/
│   │   │   │   ├── active-ingredients/matcher.ts
│   │   │   │   ├── brands/database.ts
│   │   │   │   ├── equivalents/resolver.ts
│   │   │   │   ├── country-mapping/translator.ts
│   │   │   │   └── otc-rules/validator.ts
│   │   │   ├── interpreter/
│   │   │   │   ├── stt/deepgram.ts
│   │   │   │   ├── tts/elevenlabs.ts
│   │   │   │   ├── translation/engine.ts
│   │   │   │   ├── streaming/sockets.ts
│   │   │   │   ├── context-builder/session.ts
│   │   │   │   └── session/manager.ts
│   │   │   ├── passport/
│   │   │   │   ├── generation/pdf-gen.ts
│   │   │   │   ├── sharing/links.ts
│   │   │   │   ├── audit/logger.ts
│   │   │   │   └── provider-access/auth.ts
│   │   │   ├── vault/
│   │   │   │   ├── uploads/s3.ts
│   │   │   │   ├── extraction/ocr.ts
│   │   │   │   ├── translation/docs.ts
│   │   │   │   ├── review/queue.ts
│   │   │   │   └── storage/index.ts
│   │   │   ├── memory/
│   │   │   │   ├── conditions/crud.ts
│   │   │   │   ├── medications/crud.ts
│   │   │   │   ├── allergies/crud.ts
│   │   │   │   ├── vaccinations/crud.ts
│   │   │   │   ├── insurance/crud.ts
│   │   │   │   └── candidates/pipeline.ts
│   │   │   ├── outcomes/
│   │   │   │   ├── insights/generator.ts
│   │   │   │   ├── medications/tracker.ts
│   │   │   │   ├── providers/ratings.ts
│   │   │   │   ├── aggregation/rollup.ts
│   │   │   │   └── reports/export.ts
│   │   │   ├── organizations/
│   │   │   │   ├── members/roles.ts
│   │   │   │   ├── tasks/assign.ts
│   │   │   │   ├── approvals/workflows.ts
│   │   │   │   ├── analytics/dashboards.ts
│   │   │   │   └── permissions/rbac.ts
│   │   │   ├── agent/
│   │   │   │   ├── reasoning/engine.ts
│   │   │   │   ├── planner/core.ts
│   │   │   │   ├── executor/tools.ts
│   │   │   │   ├── reflection/eval.ts
│   │   │   │   ├── replanner/adjust.ts
│   │   │   │   ├── timeline/history.ts
│   │   │   │   ├── confidence/scoring.ts
│   │   │   │   ├── approvals/gates.ts
│   │   │   │   ├── inbox/messages.ts
│   │   │   │   ├── memory/context.ts
│   │   │   │   ├── goals/tracker.ts
│   │   │   │   ├── evaluations/benchmarks.ts
│   │   │   │   └── personas/profiles.ts
│   │   │   ├── ai/
│   │   │   │   ├── provider.ts
│   │   │   │   ├── glm.ts
│   │   │   │   ├── gemini.ts
│   │   │   │   ├── groq.ts
│   │   │   │   ├── prompts/
│   │   │   │   │   └── system-prompts.ts
│   │   │   │   └── routing/model-router.ts
│   │   │   ├── notifications/
│   │   │   │   ├── email/sendgrid.ts
│   │   │   │   ├── sms/twilio.ts
│   │   │   │   ├── whatsapp/meta-api.ts
│   │   │   │   └── push/fcm.ts
│   │   │   └── tests/
│   │   │       ├── smoke/health.test.ts
│   │   │       ├── benchmarks/agent.bench.ts
│   │   │       ├── scenarios/journey.test.ts
│   │   │       └── integration/api.test.ts
│
├───────────────────────────────────────────────
│ SHARED PACKAGES
├───────────────────────────────────────────────
├── packages/
│   ├── database/
│   │   ├── package.json
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── src/
│   │   │   ├── client.ts
│   │   │   └── index.ts
│   │   └── generated/
│   ├── types/
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── agent/index.ts
│   │   │   ├── passport/index.ts
│   │   │   ├── vault/index.ts
│   │   │   ├── outcomes/index.ts
│   │   │   ├── journeys/index.ts
│   │   │   └── providers/index.ts
│   ├── healthcare-graph/
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── medications/index.ts
│   │   │   ├── providers/index.ts
│   │   │   ├── countries/index.ts
│   │   │   ├── outcomes/index.ts
│   │   │   └── analytics/index.ts
│   ├── agent-core/
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── planner/index.ts
│   │   │   ├── executor/index.ts
│   │   │   ├── reflection/index.ts
│   │   │   ├── confidence/index.ts
│   │   │   └── evaluations/index.ts
│   └── shared/
│       ├── package.json
│       ├── src/
│       │   ├── constants/index.ts
│       │   ├── utils/index.ts
│       │   ├── schemas/zod.ts
│       │   └── validation/index.ts
│
├───────────────────────────────────────────────
│ INFRASTRUCTURE
├───────────────────────────────────────────────
├── infrastructure/
│   ├── docker/
│   │   ├── docker-compose.yml
│   │   ├── Dockerfile.frontend
│   │   └── Dockerfile.backend
│   ├── aws/
│   │   └── rds.yml
│   ├── terraform/
│   │   └── main.tf
│   ├── monitoring/
│   │   └── datadog.yml
│   └── ci-cd/
│       └── github-actions.yml
│
├───────────────────────────────────────────────
│ DOCS
├───────────────────────────────────────────────
└── docs/
    ├── architecture/
    │   └── final_architecture.md
    ├── product/
    ├── healthcare-graph/
    ├── passport/
    ├── memory/
    ├── outcomes/
    ├── organizations/
    ├── agent-os/
    ├── interpreter/
    └── roadmap/
```
