# Billing & Plans

## Plan Tiers

| Tier | Price | Key Limits |
|------|-------|------------|
| FREE | $0/mo | 1 site, 100 waitlist, 50 MB storage, no integrations |
| PRO | $9/mo | 5 sites, 10K waitlist, 500 MB, all integrations |
| BUSINESS | $29/mo | Unlimited sites, unlimited waitlist, 5 GB, A/B testing |

All limits are configurable from the admin dashboard (stored in `PlanConfig` DB table).

## Key Files

| File | Purpose |
|------|---------|
| `lib/plan-gate.ts` | Plan feature checks (DB-backed, 5-min cache) |
| `components/plan-gate.tsx` | `PlanGate` + `PlanLimitIndicator` components |
| `app/dashboard/components/site-context.tsx` | `SiteContext` with `PlanFeatures` |
| `packages/db/prisma/seed-plans.ts` | Default plan config seed |
| `app/api/checkout/route.ts` | Payment checkout endpoint |
| `app/api/webhooks/gumroad/route.ts` | Gumroad subscription events |
| `app/api/payments-status/route.ts` | Public payments-enabled check |
| `lib/app-settings.ts` | `isPaymentsEnabled()` helper |
| `app/dashboard/settings/_components/UpgradeButton.tsx` | Upgrade button with Coming Soon |
| `components/landing/pricing/` | Landing page pricing cards |
| `app/dashboard/admin/plans/page.tsx` | Admin plan editor |
| `components/dashboard/admin/plan-editor/` | Plan editing UI components |
| `app/api/admin/plans/route.ts` | Admin plan config API |

## Plan Configuration (DB-Backed)

The `PlanConfig` model stores all plan settings:

```
displayName, priceMonthly, priceYearly,
gumroadMonthlyUrl, gumroadYearlyUrl, gumroadProductId, gumroadTierName,
maxSites, maxWaitlistEntries, maxPages, maxPaymentLinks, maxStorageMb,
customDomain, removeBranding, googleSheets, webhooks, analytics, abTesting
```

### Caching
`plan-gate.ts` loads plan configs with a 5-minute in-memory TTL cache. If the database is unreachable, hardcoded fallback values are used:

```typescript
const PLANS: Record<Plan, PlanConfigData> = {
  FREE: { maxSites: 1, maxWaitlistEntries: 100, maxStorageMb: 50, ... },
  PRO: { maxSites: 5, maxWaitlistEntries: 10000, maxStorageMb: 500, ... },
  BUSINESS: { maxSites: 999999, maxWaitlistEntries: 999999, maxStorageMb: 5000, ... },
};
```

### Public API
```typescript
getPlanConfig(plan)          // Full config for a plan
getAllPlanConfigs()           // All tiers, sorted FREE → PRO → BUSINESS
canUseCustomDomain(plan)     // Boolean check
canUseGoogleSheets(plan)
canUseWebhooks(plan)
canUseAnalytics(plan)
canRemoveBranding(plan)
getMaxSites(plan)            // Number limits
getMaxWaitlistEntries(plan)
getMaxPages(plan)
getMaxStorageMb(plan)
planLimitResponse(feature, plan)  // 403 JSON response
```

## Feature Gating

### Component: `<PlanGate>`
Wraps content that requires a specific plan feature. Shows an overlay with upgrade prompt when the feature is not available:

```tsx
<PlanGate requires="googleSheets" plan={profile.plan}>
  <GoogleSheetsSettings />
</PlanGate>
```

### Component: `<PlanLimitIndicator>`
Shows usage count with a progress indicator:
```tsx
<PlanLimitIndicator current={sites.length} max={maxSites} label="sites" />
```

### Where Gates Are Applied
- **Sites page:** Site count limit + disabled create button
- **Site settings:** Custom domain, Google Sheets, webhooks gated with overlay
- **Waitlist:** Dynamic limit from plan config
- **Page selector:** Page count + disabled create at limit
- **Analytics:** Full-page upgrade prompt when not allowed
- **Media:** Storage quota enforcement on upload
- **Badge:** "Built with Padlift" shown unless `removeBranding` is true

## Gumroad Payments

### Membership Product
Padlift uses a single Gumroad membership product with multiple tiers (Pro, Business). All tiers share the same Gumroad `product_id`. The tier is differentiated via the `variants` JSON field in the Gumroad webhook payload.

### Checkout Flow

1. User clicks "Upgrade" on settings or pricing page
2. `POST /api/checkout` with `{ tier, billing: 'monthly' | 'yearly', experimentId? }`
3. Endpoint checks:
   - `isPaymentsEnabled()` — if false, returns `{ code: 'PAYMENTS_DISABLED' }`
   - If `experimentId` provided, increments experiment conversions counter
4. Returns Gumroad checkout URL from plan config (with email pre-fill)
5. Client opens checkout URL in new tab

### Webhook: Gumroad
`POST /api/webhooks/gumroad`
- **Seller ID** verification using `GUMROAD_SELLER_ID` env var
- Parses `variants` JSON to extract tier name (e.g. `{"Tier": "Pro"}`)
- Two-strategy plan matching:
  1. Match by `gumroadTierName` (case-insensitive) for membership products
  2. Fallback to `gumroadProductId` for simple products
- Handles events: `sale`, `subscription_updated`, `subscription_restarted`
- Handles cancellation: `cancelled === 'true'` or `resource_name === 'cancellation'`
- Handles subscription ended: `resource_name === 'subscription_ended'`
- Auto-upgrades/downgrades user plan
- Updates `gumroadSubscriptionId` and `gumroadCustomerId` on profile

## Payments Toggle

### Admin Control
Admin settings page has a "Payments" toggle:
- **Enabled:** Checkout is live — users can purchase paid plans
- **Disabled:** Upgrade buttons show "Coming Soon" message

The setting is stored in the `AppSetting` table (key: `paymentsEnabled`).

### Public API
`GET /api/payments-status` returns `{ paymentsEnabled: boolean }`. Used by:
- Landing page pricing cards — show "Coming Soon" button instead of "Start Free Trial"
- Dashboard upgrade button — shows popup instead of opening checkout

### Coming Soon UX
When payments are disabled:
- Landing page: "Coming Soon" button → popup with "Sign Up Free" CTA
- Dashboard: "Upgrade" button → popup with "Paid plans are launching soon!" message

## Pricing A/B Testing

### Purpose
Test different price points to optimize conversion. Same person always sees the same variant (localStorage + cookie persistence).

### Schema: `PricingExperiment`
```
id, name, isActive, weight (traffic share),
variants (JSON — tier overrides),
views (counter), conversions (counter),
createdAt, updatedAt
```

### Variant Structure
```typescript
interface PricingVariant {
  tier: 'FREE' | 'PRO' | 'BUSINESS';
  displayName?: string;      // Override display name
  priceMonthly?: number;     // Override price (cents)
  priceYearly?: number;
  gumroadUrl?: string;       // Override Gumroad checkout URL
}
```

### Assignment Flow
1. Landing page loads → checks `localStorage` for `padlift_pricing_eid`
2. If found → `GET /api/pricing-experiment?eid=<stored>` (return to same variant)
3. If not found → `GET /api/pricing-experiment` (random weighted assignment)
4. Server increments `views` counter
5. Client stores `experimentId` in `localStorage`
6. Variant overrides are merged onto base plan prices

### Checkout Integration
When `experimentId` is passed to `/api/checkout`:
1. Look up the experiment
2. Increment `conversions` counter
3. Checkout URL comes from the plan config (experiment tracks attribution only)

### Admin Management
`/dashboard/admin/pricing-experiments` page:
- List experiments with views/conversions/conversion rate
- Create/edit: name, weight, active toggle
- Per-tier variant overrides: displayName, priceMonthly, priceYearly, gumroadUrl
- Activate/deactivate experiments
- Delete experiments

### Key Rules
1. **Same person = same variant** (localStorage persistence)
2. **Honor the displayed price** (checkout must match the shown price)
3. **Weighted random** selection for new visitors
4. **Graceful fallback** — if no experiments or API error, show default prices
