# SwasthYatra Quick Reference Guide

## 🚀 Quick Start (5 minutes)

```bash
# 1. Setup environment
cp .env.example .env.local
# Edit .env.local with your database and OAuth credentials

# 2. Install and migrate
npm install
npm run db:generate
npm run db:migrate

# 3. Run development server
npm run dev

# 4. Visit http://localhost:3000
```

## 📁 Project Layout

```
src/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Public pages
│   ├── (dashboard)/              # Protected pages
│   ├── api/                       # API routes
│   └── layout.tsx & globals.css
├── components/                   # React components
│   ├── ui/                        # shadcn/ui components
│   └── dashboard/                # Dashboard specific
├── lib/                           # Utilities
│   ├── auth.ts                    # Auth.js config
│   ├── prisma.ts                  # Prisma client
│   └── utils.ts                   # Helper functions
└── modules/                       # Business logic (Server Actions)
    ├── vault/
    ├── memory/
    ├── passport/
    ├── session/
    ├── medication/
    ├── provider/
    ├── agent/
    ├── interpreter/
    └── outcomes/
```

## 🔑 Core Concepts

### Server Actions
All backend operations use Server Actions (no REST API):

```typescript
// src/modules/vault/actions.ts
"use server"
export async function uploadVaultDocument(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")
  // Business logic here
}
```

### Pages Call Server Actions
Client components call server actions directly:

```typescript
// src/app/(dashboard)/vault/_components/upload-form.tsx
"use client"
import { uploadVaultDocument } from "@/modules/vault/actions"

export function UploadForm() {
  const handleSubmit = async (e) => {
    const formData = new FormData(e.currentTarget)
    await uploadVaultDocument(formData)  // Direct call!
  }
}
```

### Database Access
Server components can query Prisma directly:

```typescript
// src/app/(dashboard)/vault/page.tsx
import { prisma } from "@/lib/prisma"

export default async function VaultPage() {
  const documents = await prisma.vaultDocument.findMany({
    where: { userId: session.user.id }
  })
}
```

## 📋 Common Tasks

### Add a New Page

1. Create file: `src/app/(dashboard)/[feature]/page.tsx`
2. Import components and use them
3. Add to sidebar in `src/components/dashboard/sidebar.tsx`

### Add a New Server Action

1. Create file: `src/modules/[feature]/actions.ts`
2. Mark with `"use server"`
3. Add `auth()` check
4. Import in client components

### Add a Database Model

1. Edit `prisma/schema.prisma`
2. Run: `npm run db:migrate`
3. Use in Prisma queries

### Add a UI Component

1. Create in `src/components/ui/[component].tsx`
2. Export from component
3. Use in pages: `import { Component } from "@/components/ui/component"`

## 🔐 Authentication

### Check if User is Authenticated
```typescript
import { auth } from "@/lib/auth"

const session = await auth()
if (!session) redirect("/api/auth/signin")
```

### Add User to Auth Session
User data is automatically added via callbacks in `src/lib/auth.ts`

### Protected Routes
Routes under `(dashboard)` are automatically protected by middleware.

## 💾 Database

### Run Migrations
```bash
npm run db:migrate
```

### Generate Prisma Client
```bash
npm run db:generate
```

### View Database (GUI)
```bash
npx prisma studio
```

### Query Examples
```typescript
// Find one
const user = await prisma.user.findUnique({
  where: { id: "uuid" }
})

// Find many
const docs = await prisma.vaultDocument.findMany({
  where: { userId: session.user.id },
  include: { candidates: true }
})

// Create
const doc = await prisma.vaultDocument.create({
  data: { userId, type, fileUrl, fileName }
})

// Update
await prisma.vaultDocument.update({
  where: { id: "uuid" },
  data: { status: "PROCESSED" }
})

// Delete
await prisma.vaultDocument.delete({
  where: { id: "uuid" }
})
```

## 🎨 UI Components

### Button
```tsx
<Button>Click me</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Input
```tsx
<Input placeholder="Enter text" />
<Input type="email" />
<Input disabled />
```

### Badge
```tsx
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

## 🌐 API Routes

### Public Routes
- `GET /api/passport/public/[token]` - View shared passport

### Authentication Routes
- `GET|POST /api/auth/[...nextauth]` - OAuth flow

## 📦 Environment Variables

### Required
```
DATABASE_URL              # PostgreSQL connection
GOOGLE_CLIENT_ID         # OAuth client ID
GOOGLE_CLIENT_SECRET     # OAuth client secret
NEXTAUTH_SECRET          # Session secret
```

### Optional
```
NEXT_PUBLIC_APP_URL      # Application URL (default: localhost:3000)
```

## 🔍 Debugging

### View Database Contents
```bash
npx prisma studio
```

### Check Logs
- Browser console: Press F12
- Server logs: Check terminal running `npm run dev`
- Database logs: Check Prisma query logs

### TypeScript Errors
```bash
npx tsc --noEmit
```

## 📊 Data Flow

```
User Action
    ↓
Client Component
    ↓
Server Action (Server Side)
    ↓
Prisma ORM Query
    ↓
PostgreSQL Database
    ↓
Result returned to Client
    ↓
UI Updated with revalidatePath()
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys
# Add environment variables in Vercel dashboard
```

### Build Locally
```bash
npm run build
npm run start
```

## 🧪 Testing Flows

### User Registration
1. Click "Get Started"
2. Sign in with Google
3. Redirected to dashboard

### Create Journey
1. Click "Healthcare Journeys"
2. Click "New Journey"
3. Fill form and submit
4. Journey appears in list

### Upload Document
1. Go to "Health Vault"
2. Enter file URL and name
3. Click Upload
4. Check "Medical Memory" for candidates

## 📞 Module Reference

| Module | Files | Key Action |
|--------|-------|-----------|
| Vault | `vault/actions.ts` | `uploadVaultDocument()` |
| Memory | `memory/actions.ts` | `approveCandidate()` |
| Passport | `passport/actions.ts` | `generatePassport()` |
| Session | `session/actions.ts` | `createTravelHealthSession()` |
| Medication | `medication/actions.ts` | `searchMedicationEquivalents()` |
| Provider | `provider/actions.ts` | `searchProviders()` |
| Agent | `agent/actions.ts` | `executeAgentGoal()` |
| Interpreter | `interpreter/actions.ts` | `startInterpreterSession()` |
| Outcomes | `outcomes/insights.ts` | `getOutcomeInsights()` |

## 🐛 Common Issues

### Database Connection Error
```
Check DATABASE_URL in .env.local
Make sure PostgreSQL is running
Test with: npm run db:generate
```

### OAuth Not Working
```
Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
Check OAuth callback URL matches env
```

### Prisma Sync Error
```bash
npm run db:generate
npx prisma migrate dev
```

### Page Not Found
```
Check file path in src/app/(dashboard)/
Check sidebar navigation includes page
Restart dev server
```

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Auth.js Docs](https://authjs.dev/)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

## ✅ Quality Checklist

Before deploying:
- [ ] All environment variables set
- [ ] Database migrations run
- [ ] TypeScript compiles: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] User flows tested
- [ ] OAuth working
- [ ] Database queries optimized

---

**Last Updated**: 2025-06-17  
**Version**: 1.0  
**Status**: Production Ready
