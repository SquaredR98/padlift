# Launchpad — Technical Implementation Plan

> **Architecture: Next.js API Routes Now, NestJS Backend Later (1-Day Swap)**
> Built by Ravi Ranjan · [squaredr.tech](https://squaredr.tech)
> February 2026

---

## Table of Contents

1. [Architecture Decision](#1-architecture-decision)
2. [Chosen Stack](#2-chosen-stack)
3. [Monorepo Structure](#3-monorepo-structure)
4. [Service Layer Pattern](#4-service-layer-pattern)
5. [Services Overview](#5-services-overview)
6. [Database Schema (Prisma)](#6-database-schema-prisma)
7. [API Route Structure](#7-api-route-structure)
8. [Auth Flow (Supabase)](#8-auth-flow-supabase)
9. [Key Technical Decisions](#9-key-technical-decisions)
10. [Package Dependencies](#10-package-dependencies)
11. [Sprint-by-Sprint Breakdown](#11-sprint-by-sprint-breakdown)
12. [NestJS Extraction Playbook](#12-nestjs-extraction-playbook)
13. [Verification Plan](#13-verification-plan)
14. [Day 1 Checklist](#14-day-1-checklist)

---

## 1. Architecture Decision

**Problem:** Building a full NestJS backend from Day 1 adds deployment complexity, doubles the infrastructure, and slows down iteration — all before we know if anyone wants the product.

**Solution:** Use Next.js API routes as thin controllers that call a **shared service layer** in `packages/services/`. All business logic lives in framework-agnostic TypeScript classes. If traction happens and traffic grows, we add `apps/api/` (NestJS) to the monorepo, create thin NestJS controllers that call the **exact same services**, swap a URL in the frontend, and we're done. Zero business logic rewrite.

**The rule:** Services never import anything from Next.js or NestJS. They accept dependencies (Prisma, Redis, Resend) via constructor injection and return plain objects.

---

## 2. Chosen Stack

| Layer | Choice | Why | Cost |
|---|---|---|---|
| Monorepo | Turborepo + pnpm | Clean workspace separation, easy to add `apps/api` later | Free |
| Frontend | Next.js 14+ (App Router) | SSR for published pages, API routes for backend | Free (Vercel) |
| Auth | Supabase Auth | Email + Google OAuth out of the box, saves 1.5 days | Free tier |
| Database | Neon Postgres + Prisma ORM | Serverless, auto-scaling, excellent Prisma support | Free (500MB) |
| Redis | Upstash | A/B variant persistence, rate limiting, real-time counters | Free (10K cmd/day) |
| Email | Resend | Waitlist drip sequences + launch notifications | Free (100 emails/day) |
| Page Builder | Craft.js | React-native drag-and-drop, serializable JSON output | Free (MIT) |
| Hosting | Vercel | Native Next.js, edge functions, auto-scaling | Free tier |
| UI | shadcn/ui + Tailwind CSS | Fast to build, professional, accessible | Free |
| **Total infrastructure cost** | | | **$0/month** |

---

## 3. Monorepo Structure

```
launchpad/
├── apps/
│   └── web/                              # Next.js 14+ (App Router)
│       ├── app/
│       │   ├── (marketing)/              # Launchpad's own landing page
│       │   │   └── page.tsx
│       │   ├── (auth)/                   # Public auth pages
│       │   │   ├── login/page.tsx
│       │   │   ├── signup/page.tsx
│       │   │   └── callback/route.ts     # Supabase OAuth callback
│       │   ├── (dashboard)/              # Protected creator dashboard
│       │   │   ├── layout.tsx            # Auth guard + sidebar nav
│       │   │   ├── page.tsx              # Dashboard home
│       │   │   ├── sites/
│       │   │   │   ├── page.tsx                  # List all sites
│       │   │   │   ├── new/page.tsx              # Create site (template picker)
│       │   │   │   └── [siteId]/
│       │   │   │       ├── page.tsx              # Site overview
│       │   │   │       ├── editor/page.tsx       # Page builder (Craft.js)
│       │   │   │       ├── waitlist/page.tsx     # Waitlist management
│       │   │   │       ├── analytics/page.tsx    # Analytics dashboard
│       │   │   │       ├── ab-tests/page.tsx     # A/B test management
│       │   │   │       ├── changelog/page.tsx    # Changelog entries
│       │   │   │       └── settings/page.tsx     # Site settings
│       │   │   └── settings/page.tsx     # Account settings
│       │   ├── api/                       # Thin API routes → call services
│       │   │   ├── sites/
│       │   │   │   ├── route.ts                   # GET (list), POST (create)
│       │   │   │   └── [siteId]/
│       │   │   │       ├── route.ts               # GET, PATCH, DELETE
│       │   │   │       ├── publish/route.ts       # POST (publish site)
│       │   │   │       └── pages/route.ts         # GET, PUT (page content)
│       │   │   ├── waitlist/
│       │   │   │   ├── [siteId]/route.ts          # GET entries, POST config
│       │   │   │   └── join/route.ts              # POST (public — visitor joins)
│       │   │   ├── analytics/
│       │   │   │   ├── [siteId]/route.ts          # GET dashboard data
│       │   │   │   └── track/route.ts             # POST (public — track event)
│       │   │   ├── ab-tests/
│       │   │   │   ├── [siteId]/route.ts          # CRUD tests
│       │   │   │   └── variant/route.ts           # GET (assign variant)
│       │   │   ├── payment-links/
│       │   │   │   └── [siteId]/route.ts          # CRUD payment links
│       │   │   ├── changelog/
│       │   │   │   └── [siteId]/route.ts          # CRUD changelog entries
│       │   │   └── webhooks/
│       │   │       └── supabase/route.ts          # Auth webhooks
│       │   └── s/[slug]/                 # Published site renderer (SSR)
│       │       ├── page.tsx              # Main published page
│       │       └── success/page.tsx      # Post-payment conversion tracking
│       ├── components/
│       │   ├── builder/                  # Craft.js editor + blocks
│       │   │   ├── Editor.tsx            # Main editor wrapper
│       │   │   ├── Viewport.tsx          # Canvas area
│       │   │   ├── Toolbar.tsx           # Block properties panel
│       │   │   └── blocks/
│       │   │       ├── HeroBlock.tsx
│       │   │       ├── FeaturesBlock.tsx
│       │   │       ├── PricingBlock.tsx
│       │   │       ├── TestimonialsBlock.tsx
│       │   │       ├── FAQBlock.tsx
│       │   │       ├── CTABlock.tsx
│       │   │       └── FooterBlock.tsx
│       │   ├── dashboard/               # Dashboard-specific components
│       │   ├── published/               # Read-only block renderers (for SSR)
│       │   └── ui/                      # shadcn/ui components
│       ├── lib/
│       │   ├── service-container.ts     # Composition root — instantiates services
│       │   ├── supabase/
│       │   │   ├── client.ts            # Browser Supabase client
│       │   │   ├── server.ts            # Server Supabase client
│       │   │   └── middleware.ts         # Auth middleware helper
│       │   └── utils.ts
│       ├── middleware.ts                # Next.js middleware (auth guard)
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   ├── db/                               # Prisma schema + client
│   │   ├── prisma/
│   │   │   ├── schema.prisma            # Full schema (12 models)
│   │   │   └── migrations/
│   │   ├── src/
│   │   │   └── index.ts                 # Export PrismaClient singleton
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── services/                         # Business logic — THE KEY PACKAGE
│   │   ├── src/
│   │   │   ├── index.ts                 # Barrel export for all services
│   │   │   ├── sites.service.ts
│   │   │   ├── pages.service.ts
│   │   │   ├── waitlist.service.ts
│   │   │   ├── analytics.service.ts
│   │   │   ├── ab-testing.service.ts
│   │   │   ├── payments.service.ts
│   │   │   ├── changelog.service.ts
│   │   │   ├── social-proof.service.ts
│   │   │   └── types/                   # Shared Zod schemas + TS types
│   │   │       ├── index.ts
│   │   │       ├── sites.types.ts
│   │   │       ├── waitlist.types.ts
│   │   │       ├── analytics.types.ts
│   │   │       ├── ab-testing.types.ts
│   │   │       ├── payments.types.ts
│   │   │       └── changelog.types.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── config/                           # Shared env validation + constants
│       ├── src/
│       │   ├── env.ts                   # Zod env schema
│       │   └── constants.ts             # Plan limits, feature flags, etc.
│       ├── package.json
│       └── tsconfig.json
│
├── turbo.json                            # Turborepo pipeline config
├── pnpm-workspace.yaml                   # Workspace definition
├── package.json                          # Root package.json
├── .env.example                          # All env vars documented
├── .gitignore
└── README.md
```

### Future Addition (When NestJS is Needed)

```
├── apps/
│   ├── web/          # Already exists
│   └── api/          # NEW — NestJS backend
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── services.module.ts    # Provides same @launchpad/services
│       │   ├── sites/
│       │   │   └── sites.controller.ts
│       │   ├── waitlist/
│       │   │   └── waitlist.controller.ts
│       │   └── ...
│       └── package.json
```

---

## 4. Service Layer Pattern

This is the architectural keystone. Every service follows the same pattern:

### Pattern

```typescript
// packages/services/src/sites.service.ts
import type { PrismaClient } from '@launchpad/db';
import { z } from 'zod';

// Input validation schema
const CreateSiteInput = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  profileId: z.string().uuid(),
});

export type CreateSiteInput = z.infer<typeof CreateSiteInput>;

export class SitesService {
  constructor(private db: PrismaClient) {}

  async create(input: CreateSiteInput) {
    const data = CreateSiteInput.parse(input);
    return this.db.site.create({
      data: {
        name: data.name,
        slug: data.slug,
        profileId: data.profileId,
      },
    });
  }

  async findByProfileId(profileId: string) {
    return this.db.site.findMany({
      where: { profileId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    return this.db.site.findUnique({
      where: { slug },
      include: { pages: true, paymentLinks: true },
    });
  }

  async publish(siteId: string) {
    return this.db.site.update({
      where: { id: siteId },
      data: { publishedAt: new Date(), pages: { updateMany: { where: {}, data: { status: 'PUBLISHED' } } } },
    });
  }
}
```

### Rules (Non-Negotiable)

1. **Constructor injection** — Services receive `PrismaClient`, `Redis`, `Resend` via constructor, never import them directly
2. **No framework imports** — Never import `cookies()`, `NextResponse`, `@nestjs/*`, or any framework API
3. **Zod validation** — All inputs validated with Zod schemas, exported for reuse
4. **Plain returns** — Return Prisma objects or plain TS objects, never `Response` or `HttpException`
5. **Typed errors** — Throw custom error classes (`NotFoundError`, `ValidationError`, `ConflictError`), let the controller layer map them to HTTP status codes

### Composition Root

```typescript
// apps/web/lib/service-container.ts
import { PrismaClient } from '@launchpad/db';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import {
  SitesService,
  PagesService,
  WaitlistService,
  AnalyticsService,
  AbTestingService,
  PaymentsService,
  ChangelogService,
  SocialProofService,
} from '@launchpad/services';

// Infrastructure singletons
const db = new PrismaClient();
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
const resend = new Resend(process.env.RESEND_API_KEY!);

// Service instances
export const sitesService = new SitesService(db);
export const pagesService = new PagesService(db);
export const waitlistService = new WaitlistService(db, redis, resend);
export const analyticsService = new AnalyticsService(db, redis);
export const abTestingService = new AbTestingService(db, redis);
export const paymentsService = new PaymentsService(db);
export const changelogService = new ChangelogService(db);
export const socialProofService = new SocialProofService(db, redis);
```

### Thin API Route Example

```typescript
// apps/web/app/api/sites/route.ts
import { NextRequest } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { sitesService } from '@/lib/service-container';

export async function GET() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const sites = await sitesService.findByProfileId(user.id);
  return Response.json(sites);
}

export async function POST(req: NextRequest) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const site = await sitesService.create({ ...body, profileId: user.id });
  return Response.json(site, { status: 201 });
}
```

---

## 5. Services Overview

| Service | Constructor Deps | Methods | What It Does |
|---|---|---|---|
| **SitesService** | `db` | `create`, `findByProfileId`, `findBySlug`, `findById`, `update`, `delete`, `publish`, `unpublish`, `toggleMode` | CRUD sites, slug uniqueness check, publish/unpublish, waitlist↔live mode toggle |
| **PagesService** | `db` | `save`, `load`, `applyTemplate`, `getVersionHistory`, `restoreVersion` | Save/load Craft.js JSON, template application, version history |
| **WaitlistService** | `db`, `redis`, `resend` | `join`, `getEntries`, `getPosition`, `processReferral`, `moveUp`, `notifyAll`, `getStats` | Join waitlist, generate referral code, position tracking, move-up on referral, bulk notify on launch |
| **AnalyticsService** | `db`, `redis` | `trackEvent`, `getDashboard`, `getFunnel`, `getSourceBreakdown`, `getDateRange` | Track page_view/cta_click/etc., aggregate for dashboard, funnel visualization |
| **AbTestingService** | `db`, `redis` | `createTest`, `assignVariant`, `trackConversion`, `getResults`, `calculateSignificance`, `declareWinner` | Create A/B tests, MurmurHash3 assignment, Redis persistence, revenue-per-variant, chi-squared test |
| **PaymentsService** | `db` | `addLink`, `updateLink`, `removeLink`, `getLinks`, `attributeConversion` | CRUD payment links, attribute conversion from success page `client_reference_id` |
| **ChangelogService** | `db` | `create`, `update`, `delete`, `list`, `publish`, `generateRSS` | CRUD changelog entries, RSS feed generation, publish/draft |
| **SocialProofService** | `db`, `redis` | `getRecentSignups`, `getWaitlistCount`, `getTodayConversions`, `getProofData` | Pull real-time social proof from existing waitlist + conversion data |

---

## 6. Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
}

// ─── Enums ────────────────────────────────────────────────

enum Plan {
  FREE
  PRO
  BUSINESS
}

enum SiteMode {
  WAITLIST
  LIVE
}

enum PageStatus {
  DRAFT
  PUBLISHED
}

enum AbTestStatus {
  DRAFT
  RUNNING
  PAUSED
  COMPLETED
}

enum AbTestScope {
  FULL_PAGE
  SECTION
}

enum EventType {
  WAITLIST_SIGNUP
  CHECKOUT_START
  PURCHASE
}

enum ChangelogCategory {
  NEW
  IMPROVED
  FIXED
}

enum BillingCycle {
  MONTHLY
  YEARLY
}

// ─── Models ───────────────────────────────────────────────

/// Maps to Supabase Auth user. Created via webhook on signup.
model Profile {
  id              String   @id @default(uuid())
  supabaseUserId  String   @unique @map("supabase_user_id")
  email           String   @unique
  name            String?
  avatarUrl       String?  @map("avatar_url")
  plan            Plan     @default(FREE)
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")

  sites           Site[]

  @@map("profiles")
}

/// A creator's site/project. One creator can have multiple sites.
model Site {
  id               String    @id @default(uuid())
  profileId        String    @map("profile_id")
  name             String
  slug             String    @unique
  customDomain     String?   @unique @map("custom_domain")
  mode             SiteMode  @default(WAITLIST)
  publishedAt      DateTime? @map("published_at")
  ga4MeasurementId String?   @map("ga4_measurement_id")
  gtmContainerId   String?   @map("gtm_container_id")
  clarityProjectId String?   @map("clarity_project_id")
  createdAt        DateTime  @default(now()) @map("created_at")
  updatedAt        DateTime  @updatedAt @map("updated_at")

  profile          Profile          @relation(fields: [profileId], references: [id], onDelete: Cascade)
  pages            Page[]
  paymentLinks     PaymentLink[]
  waitlistEntries  WaitlistEntry[]
  visitors         Visitor[]
  conversions      Conversion[]
  abTests          AbTest[]
  changelogEntries ChangelogEntry[]
  analyticsEvents  AnalyticsEvent[]

  @@index([profileId])
  @@map("sites")
}

/// Page content stored as Craft.js serialized JSON.
model Page {
  id          String     @id @default(uuid())
  siteId      String     @map("site_id")
  contentJson Json       @map("content_json")
  version     Int        @default(1)
  templateId  String?    @map("template_id")
  status      PageStatus @default(DRAFT)
  createdAt   DateTime   @default(now()) @map("created_at")
  updatedAt   DateTime   @updatedAt @map("updated_at")

  site        Site       @relation(fields: [siteId], references: [id], onDelete: Cascade)

  @@index([siteId])
  @@map("pages")
}

/// Stripe Payment Links pasted by creator. No API keys stored.
model PaymentLink {
  id           String       @id @default(uuid())
  siteId       String       @map("site_id")
  planName     String       @map("plan_name")
  price        Decimal      @db.Decimal(10, 2)
  billingCycle BillingCycle @map("billing_cycle")
  stripeUrl    String       @map("stripe_url")
  position     Int          @default(0)
  createdAt    DateTime     @default(now()) @map("created_at")

  site         Site         @relation(fields: [siteId], references: [id], onDelete: Cascade)

  @@index([siteId])
  @@map("payment_links")
}

/// Waitlist signups with viral referral mechanics.
model WaitlistEntry {
  id            String    @id @default(uuid())
  siteId        String    @map("site_id")
  email         String
  referralCode  String    @unique @map("referral_code")
  referredById  String?   @map("referred_by_id")
  position      Int
  referralCount Int       @default(0) @map("referral_count")
  joinedAt      DateTime  @default(now()) @map("joined_at")
  notifiedAt    DateTime? @map("notified_at")

  site          Site           @relation(fields: [siteId], references: [id], onDelete: Cascade)
  referredBy    WaitlistEntry? @relation("Referrals", fields: [referredById], references: [id])
  referrals     WaitlistEntry[] @relation("Referrals")

  @@unique([siteId, email])
  @@index([siteId])
  @@index([referralCode])
  @@map("waitlist_entries")
}

/// Anonymous visitor tracking for analytics + A/B attribution.
model Visitor {
  id          String   @id @default(uuid())
  siteId      String   @map("site_id")
  visitorHash String   @map("visitor_hash")
  firstSeen   DateTime @default(now()) @map("first_seen")
  lastSeen    DateTime @default(now()) @map("last_seen")
  utmSource   String?  @map("utm_source")
  utmMedium   String?  @map("utm_medium")
  utmCampaign String?  @map("utm_campaign")
  deviceType  String?  @map("device_type")
  referrer    String?

  site        Site             @relation(fields: [siteId], references: [id], onDelete: Cascade)
  conversions Conversion[]
  events      AnalyticsEvent[]

  @@unique([siteId, visitorHash])
  @@index([siteId])
  @@map("visitors")
}

/// Conversion events: waitlist signup, checkout start, purchase.
model Conversion {
  id               String    @id @default(uuid())
  visitorId        String    @map("visitor_id")
  siteId           String    @map("site_id")
  eventType        EventType @map("event_type")
  planName         String?   @map("plan_name")
  estimatedValue   Decimal?  @db.Decimal(10, 2) @map("estimated_value")
  variantId        String?   @map("variant_id")
  attributedSource String?   @map("attributed_source")
  createdAt        DateTime  @default(now()) @map("created_at")

  visitor          Visitor    @relation(fields: [visitorId], references: [id])
  site             Site       @relation(fields: [siteId], references: [id], onDelete: Cascade)
  variant          AbVariant? @relation(fields: [variantId], references: [id])

  @@index([siteId])
  @@index([variantId])
  @@map("conversions")
}

/// A/B test configuration.
model AbTest {
  id              String       @id @default(uuid())
  siteId          String       @map("site_id")
  name            String
  hypothesis      String?
  scope           AbTestScope  @default(FULL_PAGE)
  status          AbTestStatus @default(DRAFT)
  trafficSplit    Json?        @map("traffic_split")
  winnerVariantId String?      @map("winner_variant_id")
  createdAt       DateTime     @default(now()) @map("created_at")
  endedAt         DateTime?    @map("ended_at")

  site            Site         @relation(fields: [siteId], references: [id], onDelete: Cascade)
  variants        AbVariant[]

  @@index([siteId])
  @@map("ab_tests")
}

/// Individual A/B test variant with aggregated metrics.
model AbVariant {
  id               String   @id @default(uuid())
  testId           String   @map("test_id")
  name             String
  contentJson      Json?    @map("content_json")
  visitorsCount    Int      @default(0) @map("visitors_count")
  conversionsCount Int      @default(0) @map("conversions_count")
  revenueTotal     Decimal  @default(0) @db.Decimal(10, 2) @map("revenue_total")
  createdAt        DateTime @default(now()) @map("created_at")

  test             AbTest       @relation(fields: [testId], references: [id], onDelete: Cascade)
  conversions      Conversion[]
  events           AnalyticsEvent[]

  @@index([testId])
  @@map("ab_variants")
}

/// Changelog entries for post-launch communication.
model ChangelogEntry {
  id          String            @id @default(uuid())
  siteId      String            @map("site_id")
  title       String
  bodyMd      String            @map("body_md")
  category    ChangelogCategory @default(NEW)
  publishedAt DateTime?         @map("published_at")
  createdAt   DateTime          @default(now()) @map("created_at")

  site        Site              @relation(fields: [siteId], references: [id], onDelete: Cascade)

  @@index([siteId])
  @@map("changelog_entries")
}

/// Raw analytics events for granular tracking.
model AnalyticsEvent {
  id             String    @id @default(uuid())
  siteId         String    @map("site_id")
  visitorId      String?   @map("visitor_id")
  eventName      String    @map("event_name")
  propertiesJson Json?     @map("properties_json")
  variantId      String?   @map("variant_id")
  timestamp      DateTime  @default(now())

  site           Site       @relation(fields: [siteId], references: [id], onDelete: Cascade)
  visitor        Visitor?   @relation(fields: [visitorId], references: [id])
  variant        AbVariant? @relation(fields: [variantId], references: [id])

  @@index([siteId, timestamp])
  @@index([eventName])
  @@map("analytics_events")
}
```

---

## 7. API Route Structure

All API routes follow the same pattern: authenticate → extract user → call service → return JSON.

### Protected Routes (Creator Dashboard)

| Method | Route | Service Call | Description |
|---|---|---|---|
| `GET` | `/api/sites` | `sitesService.findByProfileId(userId)` | List creator's sites |
| `POST` | `/api/sites` | `sitesService.create(body)` | Create new site |
| `GET` | `/api/sites/[siteId]` | `sitesService.findById(siteId)` | Get site details |
| `PATCH` | `/api/sites/[siteId]` | `sitesService.update(siteId, body)` | Update site settings |
| `DELETE` | `/api/sites/[siteId]` | `sitesService.delete(siteId)` | Delete site |
| `POST` | `/api/sites/[siteId]/publish` | `sitesService.publish(siteId)` | Publish site |
| `GET` | `/api/sites/[siteId]/pages` | `pagesService.load(siteId)` | Get page content |
| `PUT` | `/api/sites/[siteId]/pages` | `pagesService.save(siteId, body)` | Save page content |
| `GET` | `/api/payment-links/[siteId]` | `paymentsService.getLinks(siteId)` | List payment links |
| `POST` | `/api/payment-links/[siteId]` | `paymentsService.addLink(siteId, body)` | Add payment link |
| `GET` | `/api/waitlist/[siteId]` | `waitlistService.getEntries(siteId)` | List waitlist entries |
| `GET` | `/api/analytics/[siteId]` | `analyticsService.getDashboard(siteId, params)` | Analytics dashboard data |
| `GET` | `/api/ab-tests/[siteId]` | `abTestingService.getTests(siteId)` | List A/B tests |
| `POST` | `/api/ab-tests/[siteId]` | `abTestingService.createTest(siteId, body)` | Create A/B test |
| `GET` | `/api/changelog/[siteId]` | `changelogService.list(siteId)` | List changelog entries |
| `POST` | `/api/changelog/[siteId]` | `changelogService.create(siteId, body)` | Create changelog entry |

### Public Routes (Visitor-Facing)

| Method | Route | Service Call | Description |
|---|---|---|---|
| `POST` | `/api/waitlist/join` | `waitlistService.join(body)` | Join a waitlist (public) |
| `POST` | `/api/analytics/track` | `analyticsService.trackEvent(body)` | Track analytics event (public) |
| `GET` | `/api/ab-tests/variant` | `abTestingService.assignVariant(query)` | Get variant assignment (public) |

---

## 8. Auth Flow (Supabase)

### Signup Flow

1. User visits `/signup` → enters email + password (or clicks "Sign in with Google")
2. Supabase Auth creates user in `auth.users`
3. Supabase webhook fires → hits `/api/webhooks/supabase` → creates `Profile` row in Neon DB
4. User redirected to `/callback` → Supabase exchanges code for session
5. Next.js middleware detects session → allows access to `/(dashboard)` routes

### Auth Middleware

```typescript
// apps/web/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Skip public routes
  if (request.nextUrl.pathname.startsWith('/s/') ||
      request.nextUrl.pathname.startsWith('/api/waitlist/join') ||
      request.nextUrl.pathname.startsWith('/api/analytics/track')) {
    return NextResponse.next();
  }

  const supabase = createServerClient(/* env vars */, {
    cookies: { /* cookie handlers */ },
  });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith('/api/')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!user && !request.nextUrl.pathname.startsWith('/(auth)')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
```

---

## 9. Key Technical Decisions

### 9.1 Page Builder: Craft.js

- Serialize page state to JSON → store in `pages.content_json`
- Each block (Hero, Pricing, etc.) is a React component with editable props
- Builder mode: Craft.js `<Editor>` with drag-and-drop + property panel
- Published mode: Read-only renderer that maps JSON → React components (no Craft.js loaded)
- **Fallback:** If Craft.js proves too limiting on Day 1, switch to predefined layouts with editable content zones (similar to Carrd)

### 9.2 Published Sites: SSR via `/s/[slug]`

- Dynamic route `app/s/[slug]/page.tsx` fetches site + page data
- Server-side renders the page from Craft.js JSON using read-only block components
- Injects GA4/GTM/Clarity scripts based on site settings
- Handles A/B variant assignment server-side (no flicker)
- Custom domains handled via Vercel domain mapping → same route

### 9.3 A/B Testing: MurmurHash3 + Upstash Redis

- Variant assignment: `MurmurHash3(visitorId + testId) % variantCount`
- Deterministic — same visitor always sees same variant
- Redis stores `visitor:{visitorId}:test:{testId} → variantId` with TTL
- Server-side rendering ensures no flash of wrong variant
- Revenue attribution: success page conversion linked to stored variant

### 9.4 Payments: Zero-Credential Architecture

- Creator generates Payment Links in their Stripe Dashboard
- Creator pastes public URLs into Launchpad pricing block
- Visitor clicks pricing → redirect to Stripe with `?client_reference_id={visitorId}`
- After payment → Stripe redirects to success page
- Success page detects `client_reference_id` → attributes conversion to visitor + variant
- **We never store API keys, tokens, or customer payment data**

### 9.5 Email: Resend

- Waitlist welcome email (with referral link)
- Referral success notification
- Launch notification (bulk email to all waitlist entries)
- Weekly waitlist growth update to creator

---

## 10. Package Dependencies

### Root `package.json`

```json
{
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "db:migrate": "pnpm --filter @launchpad/db prisma migrate dev",
    "db:push": "pnpm --filter @launchpad/db prisma db push",
    "db:studio": "pnpm --filter @launchpad/db prisma studio"
  },
  "devDependencies": {
    "turbo": "^2",
    "typescript": "^5"
  }
}
```

### `pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### `packages/db/package.json`

```json
{
  "name": "@launchpad/db",
  "dependencies": {
    "@prisma/client": "^6",
    "@neondatabase/serverless": "^0.10",
    "@prisma/adapter-neon": "^6"
  },
  "devDependencies": {
    "prisma": "^6"
  }
}
```

### `packages/services/package.json`

```json
{
  "name": "@launchpad/services",
  "dependencies": {
    "zod": "^3",
    "@upstash/redis": "^1",
    "resend": "^4",
    "murmurhash3js": "^3"
  },
  "peerDependencies": {
    "@launchpad/db": "workspace:*"
  }
}
```

### `packages/config/package.json`

```json
{
  "name": "@launchpad/config",
  "dependencies": {
    "zod": "^3"
  }
}
```

### `apps/web/package.json`

```json
{
  "name": "@launchpad/web",
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "react-dom": "^19",
    "@craftjs/core": "^0.2",
    "@supabase/supabase-js": "^2",
    "@supabase/ssr": "^0.5",
    "@upstash/redis": "^1",
    "tailwindcss": "^4",
    "@radix-ui/react-slot": "^1",
    "class-variance-authority": "^0.7",
    "clsx": "^2",
    "tailwind-merge": "^2",
    "lucide-react": "^0.460",
    "recharts": "^2",
    "zod": "^3",
    "@launchpad/db": "workspace:*",
    "@launchpad/services": "workspace:*",
    "@launchpad/config": "workspace:*"
  }
}
```

---

## 11. Sprint-by-Sprint Breakdown

### Sprint 1: Foundation + MVP (Weeks 1-2)

#### Week 1: Infrastructure + Page Builder

| # | Task | Key Files | Days |
|---|---|---|---|
| 1 | Scaffold Turborepo monorepo (pnpm workspaces, tsconfig, turbo.json) | `turbo.json`, `pnpm-workspace.yaml`, all `package.json`, all `tsconfig.json` | 0.5 |
| 2 | Set up `packages/db` — Prisma schema with all 12 models, Neon connection, run initial migration | `packages/db/prisma/schema.prisma`, `packages/db/src/index.ts` | 0.5 |
| 3 | Set up `packages/config` — Zod env validation for all env vars | `packages/config/src/env.ts` | 0.25 |
| 4 | Set up `apps/web` — Next.js 14 App Router, Tailwind CSS, shadcn/ui init | `apps/web/` (config files + basic layout) | 0.5 |
| 5 | Supabase Auth — login/signup pages, Google OAuth, callback route, middleware, profile webhook sync | `apps/web/app/(auth)/`, `middleware.ts`, `lib/supabase/`, `api/webhooks/supabase/` | 1 |
| 6 | Dashboard layout — sidebar navigation, protected route layout, sites list page | `apps/web/app/(dashboard)/layout.tsx`, `sites/page.tsx` | 0.5 |
| 7 | `SitesService` + `PagesService` + API routes — full CRUD for sites and pages | `packages/services/src/sites.service.ts`, `pages.service.ts`, `apps/web/app/api/sites/` | 0.75 |
| 8 | Craft.js page builder — Editor component, Viewport, Toolbar, drag-and-drop, auto-save | `apps/web/components/builder/Editor.tsx`, `Viewport.tsx`, `Toolbar.tsx` | 2 |
| 9 | 7 SaaS blocks with editable props — Hero, Features, Pricing, Testimonials, FAQ, CTA, Footer | `apps/web/components/builder/blocks/*.tsx` | 2 |

#### Week 2: Payments + Waitlist + Analytics + Publish

| # | Task | Key Files | Days |
|---|---|---|---|
| 10 | `PaymentsService` + API routes — CRUD payment links | `packages/services/src/payments.service.ts` | 0.5 |
| 11 | Wire Pricing block to Payment Links — monthly/yearly toggle, redirect with `client_reference_id` | `components/builder/blocks/PricingBlock.tsx` | 0.5 |
| 12 | Success page + conversion tracking — detect `client_reference_id`, attribute to visitor/variant | `apps/web/app/s/[slug]/success/page.tsx`, `packages/services/src/payments.service.ts` | 0.5 |
| 13 | `WaitlistService` — join, referral code generation, position calculation, move-up on referral | `packages/services/src/waitlist.service.ts` | 1 |
| 14 | Waitlist emails via Resend — welcome email with referral link, launch notification | `packages/services/src/waitlist.service.ts` (email methods) | 0.5 |
| 15 | `AnalyticsService` — track events, inject GA4 gtag.js snippet in published pages | `packages/services/src/analytics.service.ts` | 0.5 |
| 16 | Published site renderer — SSR from Craft.js JSON, read-only block components, tracking injection | `apps/web/app/s/[slug]/page.tsx`, `components/published/*.tsx` | 1 |
| 17 | 3 starter templates — Classic Converter, AI Tool, Developer Tool (as JSON presets) | `apps/web/lib/templates/*.json` or seeded in DB | 1 |
| 18 | Subdomain support — `slug.launchpad.site` via Vercel wildcard domain | Vercel config + middleware routing | 0.5 |
| 19 | MVP dogfooding — test full flow end-to-end, fix critical bugs | All | 1 |

**Sprint 1 Deliverable:** Working product where a creator can sign up, build a page with drag-and-drop, configure pricing with Payment Links, set up a viral waitlist, auto-track GA4 events, and publish to `slug.launchpad.site`.

---

### Sprint 2: Analytics + A/B Testing (Weeks 3-4)

#### Week 3: Analytics Dashboard + Social Proof + Mode Switch

| # | Task | Days |
|---|---|---|
| 20 | Analytics dashboard UI — visitors over time, traffic sources, conversion funnel, date range picker, CSV export | 2 |
| 21 | One-click waitlist → live switch — mode toggle in dashboard, auto-swap CTA, auto-notify all waitlist entries | 1 |
| 22 | `SocialProofService` + widgets — live "X just joined" toasts, waitlist counter badge, today's signups | 1.5 |
| 23 | Microsoft Clarity integration — paste Project ID, auto-inject script in published pages | 0.5 |

#### Week 4: A/B Testing Engine (Flagship Differentiator)

| # | Task | Days |
|---|---|---|
| 24 | A/B test creation UI — select scope (full page / section), variant editor, traffic split slider | 1.5 |
| 25 | Traffic splitting engine — MurmurHash3 assignment, Upstash Redis persistence, SSR (no flicker) | 2 |
| 26 | Revenue-per-variant tracking — success page conversion attributed to active variant, revenue dashboard | 1.5 |
| 27 | Statistical significance — chi-squared test, 95% confidence threshold, auto-flag winner, apply winner button | 1 |

**Sprint 2 Deliverable:** Creator can see analytics dashboard, flip from waitlist to live mode with one click, see real-time social proof on published pages, and run A/B tests with revenue-per-variant tracking.

---

### Sprint 3: Ecosystem + Launch (Weeks 5-6)

#### Week 5: Changelog + Embed + Billing

| # | Task | Days |
|---|---|---|
| 28 | `ChangelogService` + UI — markdown editor, categories (new/improved/fixed), publish/draft, RSS feed | 1.5 |
| 29 | Embed mode — export pricing table, waitlist form, social proof, changelog as `<script>` tags with Shadow DOM | 2 |
| 30 | Gumroad billing — Free/Pro/Business plan gates, webhook activation, upgrade/downgrade flow | 2 |

#### Week 6: Onboarding + Polish + Launch

| # | Task | Days |
|---|---|---|
| 31 | SaaS Launch Playbook — 5-step onboarding wizard, phase-aware guidance (pre-launch → launch → optimize) | 1.5 |
| 32 | Performance optimization — Lighthouse 90+, lazy-load images, minify, code splitting | 1 |
| 33 | SEO + social sharing — meta editor, Open Graph tags, Twitter Cards, sitemap.xml, JSON-LD | 1 |
| 34 | Mobile responsiveness audit — all templates + builder preview mode | 1 |
| 35 | Launch campaign — ProductHunt listing, Twitter thread, IndieHackers post, Reddit posts | 1.5 |

**Sprint 3 Deliverable:** Full product with changelog, embeddable widgets, billing, onboarding, and launched to the world.

---

## 12. NestJS Extraction Playbook

When traffic grows and you need a dedicated backend, here's the 1-day extraction:

### Step 1: Add NestJS to Monorepo (2 hours)

```bash
cd apps
npx @nestjs/cli new api --package-manager pnpm --skip-git
```

Update `pnpm-workspace.yaml` — already includes `apps/*`.

### Step 2: Create Services Module (1 hour)

```typescript
// apps/api/src/services.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaClient } from '@launchpad/db';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import {
  SitesService, WaitlistService, AbTestingService, // ...
} from '@launchpad/services';

@Global()
@Module({
  providers: [
    { provide: PrismaClient, useValue: new PrismaClient() },
    { provide: Redis, useValue: new Redis({ url: '...', token: '...' }) },
    { provide: Resend, useValue: new Resend('...') },
    { provide: SitesService, useFactory: (db: PrismaClient) => new SitesService(db), inject: [PrismaClient] },
    { provide: WaitlistService, useFactory: (db, redis, resend) => new WaitlistService(db, redis, resend), inject: [PrismaClient, Redis, Resend] },
    // ... same for all services
  ],
  exports: [SitesService, WaitlistService, /* ... */],
})
export class ServicesModule {}
```

### Step 3: Create Thin Controllers (3 hours)

```typescript
// apps/api/src/sites/sites.controller.ts
import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { SitesService } from '@launchpad/services';
import { AuthGuard } from '../auth/auth.guard';

@Controller('sites')
@UseGuards(AuthGuard)
export class SitesController {
  constructor(private sitesService: SitesService) {}

  @Get()
  list(@Request() req) {
    return this.sitesService.findByProfileId(req.user.id);
  }

  @Post()
  create(@Request() req, @Body() body) {
    return this.sitesService.create({ ...body, profileId: req.user.id });
  }
}
```

### Step 4: Swap Frontend API URL (15 minutes)

```env
# .env — change one variable
NEXT_PUBLIC_API_URL=https://api.launchpad.site  # was: /api (relative)
```

### Step 5: Deploy (1 hour)

Deploy NestJS to Railway. Update DNS. Done.

**Total: ~1 working day. Zero business logic changes.**

---

## 13. Verification Plan

### After Monorepo Scaffolding (Tasks 1-4)

- [ ] `pnpm install` succeeds without errors
- [ ] `pnpm turbo build` compiles all packages
- [ ] Prisma generates client: `pnpm --filter @launchpad/db prisma generate`
- [ ] Migration runs on Neon: `pnpm --filter @launchpad/db prisma migrate dev`
- [ ] Prisma Studio opens and shows empty tables: `pnpm --filter @launchpad/db prisma studio`

### After Auth (Task 5)

- [ ] Navigate to `/sites` → redirected to `/login`
- [ ] Sign up with email → receive confirmation → login → see dashboard
- [ ] Sign in with Google → redirected to dashboard
- [ ] `Profile` row created in Neon DB
- [ ] Log out → redirected to login

### After Sites CRUD (Task 7)

- [ ] Create site via dashboard → site appears in list
- [ ] `POST /api/sites` returns 201 with site data
- [ ] `GET /api/sites` returns creator's sites only
- [ ] Unauthenticated request to `/api/sites` returns 401

### After Page Builder (Tasks 8-9)

- [ ] Open editor → see empty canvas
- [ ] Drag Hero block → see it render
- [ ] Edit headline text → see live update
- [ ] Add all 7 blocks → reorder via drag
- [ ] Save → refresh → all content persisted

### After Publish (Task 16)

- [ ] Publish site → visit `/s/my-slug` → see rendered page
- [ ] Page loads in <2 seconds
- [ ] GA4 tracking code present in page source (if configured)
- [ ] Mobile view renders correctly

### After Waitlist (Tasks 13-14)

- [ ] Visit published page in waitlist mode → see email capture form
- [ ] Submit email → receive welcome email with referral link
- [ ] Open referral link → join via referral → original user's referral count increases
- [ ] Dashboard shows waitlist entries with positions

### After A/B Testing (Tasks 24-27)

- [ ] Create A/B test with 2 variants
- [ ] Visit published page → consistently see same variant (MurmurHash determinism)
- [ ] Different visitor ID → may see different variant
- [ ] Complete purchase flow → conversion attributed to correct variant
- [ ] Dashboard shows revenue-per-variant breakdown

---

## 14. Day 1 Checklist

The first coding session should prove the entire architecture works end-to-end:

```
□ 1. Initialize Turborepo monorepo with pnpm
□ 2. Create packages/db — Prisma schema, connect to Neon, run migration
□ 3. Create packages/config — Zod env validation
□ 4. Create packages/services — SitesService as first service
□ 5. Create apps/web — Next.js 14, Tailwind, shadcn/ui
□ 6. Wire Supabase Auth (signup + login + middleware)
□ 7. Create service-container.ts (composition root)
□ 8. Wire POST /api/sites + GET /api/sites
□ 9. Create basic sites list page in dashboard
□ 10. Test: signup → create site → see in list → verify in Neon DB
```

If all 10 items work, the architecture is proven. Everything after is feature development on a solid foundation.

---

## Environment Variables

```env
# Neon Postgres
DATABASE_URL=postgresql://user:pass@host.neon.tech/launchpad?sslmode=require

# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=AX...

# Resend
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=/api
```

---

*This document is the technical implementation companion to `LAUNCHPAD-COMPLETE.md`.*
*Stack: Turborepo + pnpm · Next.js 15 · Supabase Auth · Neon Postgres · Prisma · Upstash Redis · Craft.js · shadcn/ui*
*Total infrastructure cost at launch: $0/month*
