# Launch Plan — April 7, 2026

## Product Name
TBD (deciding separately)

## Handle
@SquaredR7284

## What It Is
All-in-one SaaS launch platform: block-based page builder, waitlist collection, publishing, custom domains, integrations.

---

## Pricing (3 Tiers via Gumroad)

| Feature                        | Free      | Starter ($1/mo) | Pro ($5/mo)  |
|--------------------------------|-----------|------------------|--------------|
| Sites                          | 1         | 3                | Unlimited    |
| Waitlist entries               | 100       | 1,000            | Unlimited    |
| Templates                      | All 20    | All 20           | All 20       |
| Blocks                         | All 88    | All 88           | All 88       |
| Custom domain                  | No        | Yes              | Yes          |
| Google Sheets sync             | No        | Yes              | Yes          |
| Webhooks                       | No        | Yes              | Yes          |
| Remove branding badge          | No        | No               | Yes          |
| Analytics dashboard            | No        | No               | Yes          |
| A/B Testing                    | No        | No               | Yes          |
| Pages per site                 | 1         | 3                | Unlimited    |

## Payment Flow
- 2 Gumroad products: Starter ($1/mo) and Pro ($5/mo)
- Gumroad webhook → POST `/api/webhooks/gumroad` → auto-upgrade user plan in DB
- Upgrade UI: buttons in dashboard sidebar + settings page + feature gate modals
- No Stripe (remove all existing Stripe placeholder code)

---

## Implementation Roadmap

### Phase 1: Core Infrastructure (Mar 17-20) — 4 days
1. **Remove Stripe code** — clean out all placeholder Stripe references
2. **Add `plan` field to User model** — `FREE | STARTER | PRO`, default FREE
3. **Gumroad webhook endpoint** — `/api/webhooks/gumroad`
   - Verify webhook signature
   - Map Gumroad product ID → plan tier
   - Update user plan in DB
   - Handle subscription cancellation → downgrade to FREE
4. **Plan constants** — `packages/config/src/plans.ts`
   - Feature limits per tier (sites, entries, pages)
   - Feature flags per tier (customDomain, sheets, webhooks, analytics, abTesting, removeBadge)

### Phase 2: Feature Gating (Mar 21-23) — 3 days
5. **Server-side enforcement** — check plan in API routes
   - Site creation: enforce site limit
   - Waitlist join: enforce entry limit
   - Page creation: enforce pages-per-site limit
   - Custom domain: check plan allows it
   - Google Sheets / Webhooks: check plan
6. **Client-side gating UI**
   - Locked feature overlay/modal with upgrade CTA
   - Greyed-out buttons for features above user's tier
   - Upgrade prompts that link to Gumroad checkout
7. **"Built with [Product]" badge** — inject into published site HTML for Free/Starter
   - Small fixed badge in bottom-right corner
   - Links back to product landing page
   - Pro users: badge removed

### Phase 3: Analytics Backend (Mar 24-27) — 4 days
8. **Tracking pixel/script** — lightweight JS injected into published sites
   - Page view events (path, referrer, device, timestamp)
   - Waitlist form submission events
   - No cookies, privacy-friendly (count-based, not user-tracking)
9. **Analytics DB models** — `PageView`, `AnalyticsDaily` (aggregated)
   - Daily rollup job or on-read aggregation
10. **Analytics API routes** — `/api/sites/[siteId]/analytics`
    - Visitors over time (7d, 30d, 90d)
    - Top referrers
    - Device breakdown
    - Waitlist conversion rate (views → signups)
11. **Analytics dashboard UI** — replace placeholder page with real data
    - Stat cards with real numbers
    - Line/bar chart for visitors over time
    - Referrer table
    - Pro-only gate (show blurred preview for lower tiers)

### Phase 4: A/B Testing (Mar 28-31) — 4 days
12. **A/B Test model** — `AbTest` with `siteId`, `variantPageId`, `trafficSplit`, `status`
13. **Traffic splitting** — in published site route handler
    - Cookie-based: assign visitor to A or B, persist with cookie
    - 50/50 default split
14. **Results tracking** — tie analytics events to variant A or B
15. **A/B Test UI** — replace placeholder page
    - Create test: pick original page vs variant page
    - Show conversion rates side-by-side
    - Declare winner + apply
    - Pro-only gate

### Phase 5: Audit & Polish (Apr 1-3) — 3 days
16. **Audit Google Sheets integration** — test end-to-end flow
17. **Audit webhooks** — test dispatch to a real endpoint
18. **Audit payment links** — verify they work on published sites
19. **Audit custom domains** — verify DNS + SSL flow
20. **Light mode polish** — scan all dashboard pages
21. **Mobile responsive check** — all dashboard + published sites
22. **Template verification** — publish each of the 20 templates, check output

### Phase 6: Landing Page + Launch Prep (Apr 4-6) — 3 days
23. **Build landing page** — using the product itself (dogfooding)
    - Hero with demo/screenshots
    - Feature highlights
    - Pricing table
    - Waitlist/signup CTA
24. **Create Gumroad products** — Starter + Pro with monthly billing
25. **Final testing** — full signup → build → publish → upgrade flow
26. **Record demo video** — 60-second walkthrough

### Launch Day (Apr 7)
27. **Go live** — landing page published, Gumroad products active
28. **Launch post on X** — see x-content-plan.md
29. **Monitor** — watch for bugs, respond to signups

---

## Risk Mitigation
- **If analytics takes too long**: Ship with GA4 embed option, build native analytics post-launch
- **If A/B testing takes too long**: Ship as "Coming Soon (Pro)" badge, build in first week post-launch
- **If audits reveal broken features**: Disable the broken feature rather than blocking launch

---

## What's Already Done
- Auth (email/password + Google OAuth)
- Dashboard with all pages
- Block-based editor (88 blocks, 16 categories)
- 20 template presets
- Publishing + custom domains (needs audit)
- Waitlist collection with referral system
- Media library (local + R2 storage)
- Google Sheets + webhook integrations (needs audit)
- Theme system (dark/light, dashboard + published sites)
- Google Fonts + font pairs
- Design token system (style editor → blocks)
- Multi-page support
- Navigation anchor links
