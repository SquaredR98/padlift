# Database Schema

Prisma 6.6 + PostgreSQL. Schema at `packages/db/prisma/schema.prisma`.

## Entity Relationship Diagram

```
Profile (1) ──→ (many) Site
Profile (1) ──→ (many) Account (OAuth connections)
Profile (1) ──→ (many) MediaFile
Profile (1) ──→ (many) Testimonial
Profile (1) ──→ (many) FeatureRequest
Profile (1) ──→ (many) FeatureVote
Profile (1) ──→ (many) SupportTicket

Site (1) ──→ (many) Page
Site (1) ──→ (many) WaitlistEntry
Site (1) ──→ (many) PaymentLink
Site (1) ──→ (many) Visitor
Site (1) ──→ (many) Conversion
Site (1) ──→ (many) AbTest
Site (1) ──→ (many) AnalyticsEvent
Site (1) ──→ (many) SiteIntegration
Site (1) ──→ (many) MediaFile
Site (1) ──→ (many) ChangelogEntry

WaitlistEntry (many) ←→ WaitlistEntry (self-referral)

AbTest (1) ──→ (many) AbVariant
AbVariant (1) ──→ (many) Conversion
Visitor (1) ──→ (many) Conversion
Visitor (1) ──→ (many) AnalyticsEvent

FeatureRequest (1) ──→ (many) FeatureVote
SupportTicket (1) ──→ (many) SupportMessage
```

## Enums

| Enum | Values |
|------|--------|
| `Plan` | FREE, PRO, BUSINESS |
| `SiteMode` | WAITLIST, LIVE |
| `PageStatus` | DRAFT, PUBLISHED |
| `AdminRole` | USER, ADMIN, SUPER_ADMIN |
| `AbTestStatus` | DRAFT, RUNNING, PAUSED, COMPLETED |
| `AbTestScope` | FULL_PAGE, SECTION |
| `EventType` | WAITLIST_SIGNUP, CHECKOUT_START, PURCHASE |
| `BillingCycle` | MONTHLY, YEARLY |
| `ChangelogCategory` | NEW, IMPROVED, FIXED |
| `TestimonialStatus` | PENDING, APPROVED, REJECTED |
| `FeatureStatus` | OPEN, PLANNED, IN_PROGRESS, SHIPPED, DECLINED |
| `TicketStatus` | OPEN, IN_PROGRESS, RESOLVED, CLOSED |
| `TicketPriority` | LOW, MEDIUM, HIGH |
| `MessageSender` | USER, ADMIN |

## Core Models

### Profile
The user account. Central to all ownership relationships.

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| email | String | Unique |
| passwordHash | String? | bcrypt hash (null for OAuth-only) |
| name | String? | Display name |
| plan | Plan | DEFAULT: FREE |
| role | AdminRole | DEFAULT: USER |
| adminPermissions | String[] | Granular permissions for ADMIN role |
| gumroadSubscriptionId | String? | Gumroad billing |
| gumroadCustomerId | String? | Gumroad customer ID |
| planExpiresAt | DateTime? | Subscription expiry |

### Site
A landing page project owned by a profile.

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| profileId | UUID | Foreign key to Profile |
| name | String | Display name |
| slug | String | Unique, used in `/s/[slug]` URL |
| customDomain | String? | Unique, e.g. `launch.example.com` |
| mode | SiteMode | WAITLIST or LIVE |
| publishedAt | DateTime? | Set on publish |
| templateId | String? | Which template preset was used |
| templateContent | Json? | Branding data (shared across pages) |
| ga4MeasurementId | String? | Google Analytics 4 |
| gtmContainerId | String? | Google Tag Manager |
| clarityProjectId | String? | Microsoft Clarity |

### Page
Per-page content within a site. Supports multi-page sites.

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| siteId | UUID | Foreign key to Site |
| slug | String? | null = homepage, string = sub-page path |
| title | String | DEFAULT: "Home" |
| contentJson | Json | Block data `{ blocks: BlockInstance[] }` |
| publishedHtml | String? | Pre-rendered HTML for serving |
| publishedCss | String? | Custom CSS |
| publishedJs | String? | Custom JS |
| version | Int | Auto-incrementing |
| status | PageStatus | DRAFT or PUBLISHED |

**Unique constraint:** `@@unique([siteId, slug])` — one page per slug per site.

### WaitlistEntry
Waitlist signups with referral tracking.

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| siteId | UUID | Foreign key to Site |
| email | String | Subscriber email |
| referralCode | String | Unique, base64url (6 bytes) |
| referredById | UUID? | Self-referral to WaitlistEntry |
| position | Int | Auto-incrementing per site |
| referralCount | Int | Number of successful referrals |

**Unique constraint:** `@@unique([siteId, email])` — one entry per email per site.

### PlanConfig
Admin-configurable plan tiers. Stored in DB to allow changes without code deploys.

| Field | Type | Notes |
|-------|------|-------|
| tier | Plan | Unique (FREE/PRO/BUSINESS) |
| displayName | String | e.g., "Pro", "Business" |
| priceMonthly | Int | Price in cents |
| priceYearly | Int | Price in cents |
| maxSites, maxPages, etc. | Int | Numeric limits |
| customDomain, analytics, etc. | Boolean | Feature flags |
| maxStorageMb | Int | Per-user storage quota |
| gumroadTierName | String? | Membership tier name (e.g. "Pro") |
| gumroadMonthlyUrl | String? | Gumroad product URL |

### SiteIntegration
Pluggable integrations per site.

| Field | Type | Notes |
|-------|------|-------|
| siteId | UUID | Foreign key to Site |
| type | String | `"google_sheets"` or `"webhook"` |
| config | Json | Integration-specific config |
| credentials | Json? | OAuth tokens (Google) |
| lastSyncAt | DateTime? | Last successful sync |
| lastSyncError | String? | Last error message |

**Unique constraint:** `@@unique([siteId, type])` — one integration per type per site.

### MediaFile
Uploaded files tracked in DB, stored via storage adapter.

| Field | Type | Notes |
|-------|------|-------|
| userId | UUID | Foreign key to Profile (owner) |
| siteId | UUID? | Optional site association |
| filename | String | Original filename |
| key | String | Unique storage key |
| url | String | Public URL |
| contentType | String | MIME type |
| size | Int | File size in bytes |

### PricingExperiment
A/B pricing test configuration.

| Field | Type | Notes |
|-------|------|-------|
| name | String | Experiment name |
| isActive | Boolean | Whether experiment is live |
| weight | Int | Relative traffic weight |
| variants | Json | `PricingVariant[]` — tier overrides |
| views | Int | Impression counter |
| conversions | Int | Checkout counter |

### AppSetting
Simple key-value store for app-wide settings.

| Field | Type | Notes |
|-------|------|-------|
| key | String | Primary key (e.g., `"paymentsEnabled"`) |
| value | String | Setting value |

## Auth.js Models

Auth.js requires `Account`, `Session`, and `VerificationToken` models. These are managed by the PrismaAdapter and should not be modified directly.

- **Account** — OAuth provider connections (Google)
- **Session** — Database sessions (not used with JWT strategy, but required by adapter)
- **VerificationToken** — Email verification tokens

## Community Models

### Testimonial
User-submitted testimonials with moderation workflow.

### FeatureRequest + FeatureVote
Feature voting board. `voteCount` is denormalized on `FeatureRequest` for efficient sorting.

### SupportTicket + SupportMessage
Support ticket system with message threads. Messages track sender type (USER/ADMIN).

## Analytics Models

### Visitor
Privacy-safe visitor tracking. `visitorHash` is a daily hash (IP + UA + date), not PII.

### AnalyticsEvent
Raw event log. `eventName` is typically `"page_view"`. `propertiesJson` stores URL, referrer, etc.

### Conversion
Conversion funnel events (waitlist signup, checkout start, purchase). Can be attributed to A/B test variants.

## Naming Conventions

- Tables use `snake_case` via `@@map()` (e.g., `@@map("waitlist_entries")`)
- Columns use `camelCase` in Prisma, mapped to `snake_case` via `@map()` (e.g., `@map("profile_id")`)
- Primary keys are UUIDs (`@id @default(uuid())`)
- Timestamps: `createdAt` + `updatedAt` on most models
- Cascade deletes on most parent-child relationships
