# Architecture

## Stack

- **Framework:** Next.js 15 (App Router) with React 19
- **Styling:** Tailwind CSS 4, shadcn/ui (New York style)
- **Database:** Prisma 6.6 + PostgreSQL (local dev), Neon (production)
- **Auth:** Auth.js v5 (NextAuth) — JWT sessions, credentials + Google OAuth
- **Build:** Turborepo + pnpm monorepo
- **Payments:** Gumroad (membership product with tiers)
- **Storage:** Local filesystem (dev) / Cloudflare R2 (prod)

## Monorepo Structure

```
launchpad/
├── apps/
│   └── web/                        # Next.js application
├── packages/
│   ├── db/                         # Prisma schema + client
│   ├── services/                   # Business logic (framework-agnostic)
│   └── config/                     # Zod env validation, constants
├── docs/                           # This documentation
├── turbo.json                      # Build orchestration
├── pnpm-workspace.yaml             # Workspace config
└── docker-compose.yml              # Local Postgres
```

## Package Details

### `packages/db`
Prisma schema, migrations, seed scripts. Exports the `db` client singleton.

```
packages/db/
├── src/index.ts                    # Re-exports PrismaClient
├── prisma/
│   ├── schema.prisma               # All models
│   ├── seed-plans.ts               # FREE/PRO/BUSINESS tier seed
│   ├── seed-templates.ts           # Template preset seed
│   └── migrations/                 # Auto-generated
```

### `packages/services`
Framework-agnostic business logic. Each service receives a Prisma `db` client via constructor injection. No HTTP/Next.js dependencies.

```
packages/services/src/
├── index.ts                        # Re-exports all services
├── errors.ts                       # ServiceError hierarchy
├── sites.service.ts                # Sites CRUD
├── pages.service.ts                # Multi-page management
├── waitlist.service.ts             # Waitlist + referrals
├── media.service.ts                # File upload/delete
├── integrations.service.ts         # Google Sheets + webhooks
├── templates.service.ts            # Template claiming
├── testimonials.service.ts         # Testimonial moderation
├── feature-requests.service.ts     # Feature voting
├── support.service.ts              # Support tickets
└── storage/
    ├── storage-adapter.ts          # Interface
    ├── local-adapter.ts            # Filesystem (dev)
    └── r2-adapter.ts               # Cloudflare R2 (prod)
```

### `packages/config`
Zod-validated environment variables and shared constants.

## `apps/web` Structure

### App Router (`app/`)

```
app/
├── page.tsx                        # Landing page (marketing)
├── layout.tsx                      # Root layout + providers
├── globals.css                     # Tailwind + CSS variables
│
├── (auth)/                         # Auth pages (no sidebar)
│   ├── actions.ts                  # Server actions: login, signup, signOut
│   ├── login/page.tsx
│   └── signup/page.tsx
│
├── (legal)/                        # Privacy, Terms
│   ├── layout.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
│
├── dashboard/                      # Authenticated dashboard
│   ├── layout.tsx                  # Sidebar + auth guard
│   ├── page.tsx                    # Dashboard home
│   ├── sites/                      # Sites CRUD
│   │   ├── page.tsx                # Sites list
│   │   ├── new/page.tsx            # Template selection wizard
│   │   └── [siteId]/
│   │       ├── page.tsx            # Site overview
│   │       ├── edit/               # Block editor
│   │       ├── waitlist/           # Waitlist entries
│   │       ├── analytics/          # Analytics dashboard
│   │       └── settings/           # Site settings
│   ├── media/page.tsx              # Media library
│   ├── settings/page.tsx           # Account + billing
│   ├── templates/page.tsx          # Template browser
│   └── admin/                      # Admin dashboard
│       ├── layout.tsx              # RBAC guard
│       ├── page.tsx                # Admin overview
│       ├── users/                  # User management
│       ├── sites/                  # All sites
│       ├── billing/                # Revenue overview
│       ├── plans/                  # Plan config editor
│       ├── pricing-experiments/    # A/B pricing tests
│       └── settings/               # Admin settings
│
├── s/[slug]/                       # Published site serving
│   ├── route.ts                    # Homepage handler
│   └── [...path]/route.ts          # Sub-page handler
│
├── feature-requests/page.tsx       # Public feature board
│
└── api/                            # API routes (see below)
```

### Components (`components/`)

```
components/
├── ui/                             # shadcn/ui primitives
├── auth/                           # Login/signup forms, visual panel
├── landing/                        # Landing page sections
│   ├── nav/
│   ├── hero/
│   ├── features/
│   ├── pricing/
│   ├── faq/
│   ├── cta/
│   ├── footer/
│   └── motion.tsx                  # Framer Motion helpers
├── dashboard/                      # Dashboard-specific components
│   ├── admin/                      # Admin sub-components
│   ├── block-editor/               # Editor components
│   └── template-picker/            # Template selection UI
├── plan-gate.tsx                   # PlanGate + PlanLimitIndicator
├── theme-provider.tsx              # next-themes provider
└── theme-toggle.tsx                # Dark/light toggle
```

### Lib (`lib/`)

```
lib/
├── auth/
│   ├── config.ts                   # Auth.js config (providers, callbacks)
│   └── index.ts                    # NextAuth initialization
├── templates/
│   ├── block-types.ts              # Core types + design tokens
│   ├── block-registry.ts           # Block component registry
│   ├── content-schema.ts           # Field schemas for block content
│   ├── presets.ts                   # 25+ template presets
│   ├── font-pairs.ts               # 10 curated font pair presets
│   ├── block-anchors.ts            # Anchor ID resolution
│   └── sections/                   # 100+ block components + SSR statics
├── render-page-html.ts             # Blocks → static HTML
├── render-site.ts                  # Full HTML document for published sites
├── service-container.ts            # Service singleton composition root
├── plan-gate.ts                    # Plan feature gating (DB-backed, cached)
├── app-settings.ts                 # Key-value app settings
├── admin.ts                        # RBAC roles + permissions
├── api-auth.ts                     # getAuthProfile() helper
├── google-fonts.ts                 # Font catalog with 24h cache
└── utils.ts                        # cn() and other utilities
```

### API Routes

```
api/
├── auth/[...nextauth]/             # Auth.js handlers
├── sites/[siteId]/
│   ├── content/                    # Save/load page content
│   ├── pages/                      # Multi-page CRUD
│   ├── publish/                    # Render + publish
│   ├── waitlist/                   # Waitlist entries
│   ├── analytics/                  # Analytics data
│   ├── integrations/               # Google Sheets, webhooks
│   └── payment-links/              # Payment link CRUD
├── waitlist/join/                   # Public waitlist signup
├── media/                          # Upload/delete files
├── checkout/                       # Payment checkout
├── pricing-experiment/             # A/B pricing assignment
├── payments-status/                # Payments enabled check
├── fonts/                          # Google Fonts search
├── templates/[id]/claim/           # Template claiming
├── testimonials/                   # Public testimonial submit
├── feature-requests/               # Feature voting
├── support/tickets/                # Support ticket CRUD
├── admin/                          # Admin-only routes
│   ├── users/                      # User management
│   ├── plans/                      # Plan editing
│   ├── pricing-experiments/        # A/B test CRUD
│   ├── settings/                   # App settings
│   ├── billing/                    # Revenue data
│   ├── sites/                      # All sites
│   ├── testimonials/               # Moderation
│   ├── feature-requests/           # Status management
│   └── support/                    # Ticket management
├── webhooks/
│   └── gumroad/                    # Gumroad subscription events
└── internal/
    └── domain-lookup/              # Custom domain resolution
```

## Design Patterns

### Service Layer Pattern
Business logic lives in `packages/services`. API routes are thin controllers that:
1. Authenticate the request
2. Check permissions / plan limits
3. Call a service method
4. Return the response

```typescript
// API route (controller)
export async function POST(req: NextRequest) {
  const profile = await getAuthProfile();
  if (!profile) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const result = await waitlistService.join({ siteId: body.siteId, email: body.email });
  return Response.json(result, { status: 201 });
}
```

### Composition Root
All service instances are created once in `lib/service-container.ts` and imported throughout the app:

```typescript
import { db } from '@launchpad/db';
const storageAdapter = createStorageAdapter();

export const sitesService = new SitesService(db);
export const mediaService = new MediaService(db, storageAdapter);
// ... all other services
```

### Service Error Hierarchy
Services throw typed errors that routes catch and convert to HTTP:

```typescript
ServiceError (base, code + statusCode)
├── NotFoundError (404)
├── ConflictError (409)
├── ValidationError (400)
└── ForbiddenError (403)
```

### Storage Adapter Pattern
`MediaService` delegates file operations to a `StorageAdapter` interface. The factory function reads `STORAGE_PROVIDER` env var:

- `local` → `LocalStorageAdapter` (writes to `public/uploads/`)
- `r2` → `R2StorageAdapter` (Cloudflare R2 via AWS SDK)

### Plan Gating
`lib/plan-gate.ts` provides async, DB-backed feature checks with a 5-minute in-memory cache:

```typescript
const config = await getPlanConfig(profile.plan);
if (!config.customDomain) {
  return planLimitResponse('custom domains', profile.plan);
}
```

Hardcoded fallback values ensure the app works even if the DB is unreachable.
