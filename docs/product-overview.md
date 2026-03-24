# LAUNCHPAD — Complete Product Documentation

> **The all-in-one SaaS launch platform that replaces 7 tools with 1.**
> Built by Ravi Ranjan · [squaredr.tech](https://squaredr.tech)
> Last updated: February 2026

---

## Table of Contents

1. [The One-Liner](#1-the-one-liner)
2. [The Problem](#2-the-problem)
3. [The Solution](#3-the-solution)
4. [Why Now & Why Me](#4-why-now--why-me)
5. [Target Customer](#5-target-customer)
6. [Competitive Landscape](#6-competitive-landscape)
7. [Killer Differentiators](#7-killer-differentiators)
8. [What Sells — Conversion Research](#8-what-sells--conversion-research)
9. [Template Library Strategy](#9-template-library-strategy)
10. [Technical Architecture](#10-technical-architecture)
11. [Database Schema](#11-database-schema)
12. [GA4 / GTM Integration Spec](#12-ga4--gtm-integration-spec)
13. [6-Week Implementation Plan](#13-6-week-implementation-plan)
14. [Pricing Strategy](#14-pricing-strategy)
15. [Revenue Projections](#15-revenue-projections)
16. [Go-to-Market & Twitter Build-in-Public](#16-go-to-market--twitter-build-in-public)
17. [Risks & Mitigations](#17-risks--mitigations)
18. [Success Metrics](#18-success-metrics)
19. [Post-Launch Roadmap](#19-post-launch-roadmap)
20. [The Mindset Note](#20-the-mindset-note)

---

## 1. The One-Liner

**Launchpad lets SaaS founders build a landing page, collect payments, run a viral waitlist, A/B test for revenue, and track analytics — all from a single dashboard, in under 5 minutes.**

Twitter pitch: *"Built a tool that gives SaaS founders a landing page, payments, viral waitlist, and GA4 tracking in 5 minutes. Replaces $300/mo in tools."*

---

## 2. The Problem

SaaS founders build incredible products but waste 2-3 weeks and $200-500/month stitching together fragmented tools just to go from "product built" to "first paying customer."

### The Typical Launch Stack (Before Launchpad)

| Tool Category | Typical Cost | The Pain |
|---|---|---|
| Landing Page Builder | $19-99/mo | Generic templates that don't understand SaaS conversion patterns |
| Waitlist Tool | $15-39/mo | Separate platform, separate login, no connection to the page |
| Payment Integration | Hours of dev time | API keys, webhooks, test mode, PCI compliance headaches |
| A/B Testing Platform | $99-500/mo | Tracks clicks, not revenue. Can't tell which variant makes money |
| Analytics Configuration | Hours of setup | Tag managers, event schemas, data layers — before a single visitor |
| Social Proof Widget | $29-79/mo | Fake-looking popups with no connection to actual data |
| Changelog Tool | $29-49/mo | Yet another separate tool to maintain |
| **Total** | **$200-500/mo** | **6-7 tools that don't talk to each other** |

### What Founders Say (Reddit / IndieHackers)

- *"Driving traffic is easy, converting it feels like filling a bucket with a hole in the bottom"*
- *"I spent more time setting up Stripe webhooks than building my actual feature"*
- *"Every 1-second improvement in load time = 7% conversion boost but my page is loaded with third-party scripts"*
- *"I have analytics in 4 different dashboards and still can't tell you which headline makes more money"*

---

## 3. The Solution

Launchpad is a **unified SaaS launch platform** — not just a page builder. It owns the entire funnel from landing page to payment conversion, which means it can do things no combination of separate tools can do.

### What Launchpad Replaces

| Separate Tool | What Launchpad Does Instead |
|---|---|
| Carrd / Framer | Drag-and-drop builder with 7 SaaS-specific blocks and conversion-optimized templates |
| Stripe setup (hours) | Paste Payment Links — zero credentials, zero webhooks, money goes directly to creator |
| GetWaitlist / Waitlister | Viral waitlist with referral queue, position tracking, gamified sharing |
| Unbounce / VWO | A/B testing with **revenue-per-variant** tracking (only possible because we own the payment layer) |
| GA4 + GTM config (hours) | One input field for Measurement ID — auto-tracks page_view, cta_click, checkout_start, purchase |
| Beamer / Headway | Built-in changelog with subscriber notifications, RSS, embeddable widget |
| Proof / Fomo | Auto-generated social proof from real waitlist and payment data — zero configuration |

### The Key Insight

Because Launchpad owns the entire funnel (page → click → checkout redirect → success page), it can connect data that no stitched-together stack can. It can tell you: "Variant B generated ₹3.2L more revenue this month" — because it knows which variant the visitor saw AND whether they completed payment. No other tool in the market can do this.

---

## 4. Why Now & Why Me

### Why Now

- The MarTech market hit $465B in 2024 with 14,000+ solutions — consolidation fatigue is driving preference for platforms over point solutions
- Companies average 106 SaaS applications — founders actively want fewer tools
- The waitlist tool market alone is $1.2-3B, growing 5-13% annually
- "Build in public" culture on Twitter means solo builders can compete with funded companies through distribution, not just product
- AI hype has created a wave of new SaaS products launching weekly — each one is a potential Launchpad customer

### Why Me (Ravi Ranjan)

- 4+ years full-stack development (React, Next.js, Node.js, NestJS, PostgreSQL)
- Deep Stripe integration expertise from years of client work across healthcare, fintech, and e-commerce
- GA4/GTM specialist — the analytics auto-configuration isn't a gimmick, it's built on real implementation experience
- Running squaredr.tech agency — direct access to the exact customer segment (SaaS founders who need launch infrastructure)
- Can build the full MVP solo in 6 weeks — no fundraising, no team dependency, no burn rate

---

## 5. Target Customer

### Primary: The Indie SaaS Founder

- Solo developer or tiny team (1-3 people)
- Has built the product (or is close to finishing)
- Has NOT built the landing page, payment flow, or launch infrastructure
- Budget-conscious — won't pay $500/mo for enterprise tools
- Active on Twitter, IndieHackers, Reddit r/SaaS
- Values speed over perfection — wants to launch this week, not next quarter

### Secondary: Small SaaS Teams (5-20 people)

- Has an existing site but wants conversion-optimized components (embed mode)
- Wants A/B testing tied to actual revenue, not vanity metrics
- Currently paying for 3-4 separate tools that Launchpad could replace

### Anti-Customer (Not For)

- Enterprise companies with dedicated marketing teams and $10K+/mo budgets
- E-commerce stores (Shopify ecosystem is their world)
- Content creators / bloggers (too far from SaaS use case)

---

## 6. Competitive Landscape

### Direct Competitors (Landing Page Builders)

| Competitor | Price | Strength | Weakness (Launchpad's Opening) |
|---|---|---|---|
| Carrd | $19/yr | Dead simple, cheap | No payments, no analytics, no waitlist, no A/B testing |
| Framer | $5-20/mo | Beautiful design | Design-first, not conversion-first. No payments or waitlist |
| Webflow | $14-39/mo | Design flexibility | Complex, steep learning curve, no payment integration |
| Unbounce | $99+/mo | A/B testing | Expensive, tracks clicks not revenue, no waitlist |
| Leadpages | $49+/mo | Lead gen focus | Dated, no waitlist, no SaaS-specific features |

### Adjacent Competitors (Specific Tools)

| Tool | Category | Price | vs Launchpad |
|---|---|---|---|
| Waitlister | Waitlist | $15-39/mo | Launchpad includes waitlist + everything else for same price |
| GetWaitlist | Waitlist | Free-$50/mo | No landing page, no payments, no analytics |
| Prefinery | Waitlist | $499/mo | Enterprise-priced for a single feature |
| Beamer | Changelog | $49-249/mo | Standalone changelog. Launchpad bundles it |
| Headway | Changelog | $29/mo | Same — standalone tool that Launchpad includes |

### Launchpad's Positioning

**Not** "another landing page builder" → **"Replace 7 tools with 1 for your entire pre-launch to post-launch journey"**

The moat: Only platform where all data is connected across the entire funnel (waitlist → page views → CTA clicks → checkout → payment → variant attribution → changelog engagement). This enables insights impossible with stitched-together tools.

---

## 7. Killer Differentiators

### 7.1 Revenue-Per-Variant A/B Testing (FLAGSHIP)

No existing tool tracks actual payment conversions tied to page variants. Unbounce tracks clicks. VWO tracks form submissions. Only Launchpad can say **"Variant B generated ₹3.2L more revenue"** because it owns both the page and the payment redirect layer.

**How it works:** Visitor is assigned variant via MurmurHash3 → sees variant page → clicks Payment Link → completes checkout on Stripe → returns to success page → Launchpad attributes conversion + estimated revenue to the variant.

**Twitter moment:** Screenshot showing "Variant B: 47% more conversions, ₹32,000 more revenue. No other tool can tell you that."

### 7.2 One-Click Waitlist → Live Switch

Current process for founders: manually tear down waitlist page → build new live page → set up payments separately → manually email waitlist. With Launchpad: flip ONE toggle → CTA changes from "Join Waitlist" to "Start Free Trial" → Payment Links already configured → all waitlist subscribers auto-notified via email. Nobody else offers this seamless transition.

### 7.3 Referral Waitlist with Gamification (Viral Growth Engine)

Standalone referral waitlist tools charge $29-99/mo. Launchpad bundles this for free: show position number, jump ahead by sharing (unique referral link), leaderboard, pre-written share copy for Twitter/LinkedIn/email.

**Proven model:** Dropbox grew 3,900% in 15 months using referral waitlist. Superhuman built an $825M company on waitlist exclusivity. 92% of people trust peer recommendations over advertising.

**Built-in virality:** Every waitlist page creators build advertises the Launchpad platform (powered by badge on free tier). Each waitlist = a distribution channel for Launchpad itself.

### 7.4 Auto-Generated Social Proof Widgets

Separate social proof tools (Proof, Fomo, UseProof) cost $29-79/mo and require manual configuration. Launchpad auto-populates from existing data:

- "Sarah from London joined 2 minutes ago" (from waitlist entries)
- "247 people on the waitlist" (live counter)
- "12 customers signed up today" (from Stripe success page hits)

Zero configuration needed — the data already exists in the unified platform.

### 7.5 Embed Mode (10x Market Expansion)

Many SaaS founders already have a Next.js/Webflow/WordPress site. They don't want a full replacement — they want conversion-optimized components. Launchpad lets you export any section as a `<script>` tag:

- Pricing table with Payment Links + analytics
- Waitlist form with referral mechanics
- Social proof widget
- Changelog widget

This expands the market from "people building new landing pages" to "every SaaS founder wanting better conversion tools on their existing site."

### 7.6 Zero-Credential Payment Architecture

No API keys stored. No Stripe Connect complexity. No PCI compliance burden. Creators paste public Payment Link URLs. Money flows directly to their Stripe account. Launchpad never touches funds. This is architecturally simpler, legally cleaner, and removes the biggest trust barrier.

### 7.7 Built-In SaaS Launch Playbook

Founders don't just struggle with tools — they struggle with strategy. Launchpad's onboarding guides them through phases:

1. **Pre-Launch:** "You're in waitlist mode. Focus on email capture and referral growth."
2. **Launch Day:** "Switch to live mode. Your waitlist subscribers will be notified. Here's what your page should focus on."
3. **Post-Launch:** "Now optimize. Run A/B tests on your headline and pricing page. Here's how to read the data."

This turns Launchpad from a tool into a framework (higher retention, stickier product).

---

## 8. What Sells — Conversion Research

This section summarizes findings from Unbounce (44,000+ landing pages, 33M conversions), First Page Sage, DesignRevision, KlientBoost, and other conversion studies. Every template and default in Launchpad should be built on this data.

### 8.1 The Baseline Numbers

| Metric | Value | Source |
|---|---|---|
| Median SaaS conversion rate | 3.8% | Unbounce (44K pages) |
| Median all-industry conversion rate | 6.6% | Unbounce |
| Top-performing SaaS pages | 11-15% | Multiple studies |
| Conversion drop per 1s load delay | -7% | Google |
| Conversion decrease with multiple offers | -266% | Unbounce |
| Conversion lift from testimonials | +34% | KlientBoost |
| Conversion lift from reducing fields (11→4) | +120% | ConvertLab |
| Landing page traffic from mobile | 82.9% | Unbounce |
| Desktop converts better than mobile by | 8% | Unbounce |

**Key insight:** SaaS has the worst conversion rate of any major industry. The gap between 3.8% median and 11-15% top performers is entirely about page design, copy, and structure. That gap is Launchpad's value proposition.

### 8.2 Optimal Section Order

High-converting SaaS landing pages use 5-8 sections in this order:

1. **Hero Section** — Benefit headline + CTA + product visual, all above the fold. 75% judge within 3 seconds.
2. **Social Proof Bar** — Logo bar directly below hero. Client logos boost conversions by 69% (comScore). Median social proof lift: 37%.
3. **Problem → Solution** — Name the pain, show the cure. Outcome-focused copy converts 27% better than feature-focused.
4. **Features as Benefits** — 3-6 features max, framed as outcomes. Show, don't tell.
5. **Testimonials (Deep)** — Full quotes with name, photo, role, specific results. Video testimonials boost 80% vs text.
6. **Pricing Table** — 3 tiers, "Most Popular" highlighted, annual default with monthly toggle visible.
7. **FAQ** — 4-6 questions killing real objections. Reduces support inquiries by 60%.
8. **Final CTA** — Repeat hero CTA. Mirror the messaging.

### 8.3 Hero Section Rules

- Headline: under 8 words, 44 characters max, benefit-focused, 5th-7th grade reading level
- CTA above the fold — 66% of visitors only read headline + CTA button
- Best CTA labels: "Start free trial", "Try it free", "Get started" — appeared on 9 of 12 top-converting SaaS pages
- Worst CTA labels: "Submit", "Learn more", "Sign up" (generic, no value stated)
- Personalized CTAs convert 202% better than generic ones
- 73% of top pages feature human faces in hero; 25% use NO image (forces focus on headline + CTA — both valid)
- Video above fold can boost 80% BUT only if: under 90 seconds, autoplay muted, lazy-loaded

### 8.4 Pricing Page Rules

- 3 tiers optimal (Good/Better/Best). 5+ tiers = decision fatigue
- "Most Popular" badge directs 60-70% of signups to your target plan
- Annual default with 16-20% discount ("2 months free") increases annual uptake by 25-35%
- Hiding pricing behind "Contact Sales" = 30% abandonment for self-serve SaaS
- 5 key differentiators per plan max. Frame as outcomes, not specs ("Enough for a 50-person team" > "10,000 API calls")
- "Who is this for?" one-liner per tier helps self-selection

### 8.5 Conversion Killers (What to Avoid)

| Killer | Impact | Launchpad Prevention |
|---|---|---|
| Slow page load (>3s) | -21% conversions | Templates optimized for <2s. Lazy-load, minify, async scripts |
| Multiple CTAs to different actions | -266% | Templates enforce single primary CTA |
| Navigation menus on landing page | -20-30% | No nav by default. Only 16% of pages remove nav — opportunity |
| No social proof | Miss 34-270% lift | Every template includes social proof bar + testimonial section |
| Hidden pricing | -30% abandonment | Pricing block is prominent in every commercial template |
| Too many form fields (10+) | -120% vs 4 fields | Email-only for waitlist. Name + email for trials. Never phone on first touch |
| Clever headline instead of clear | Up to -95% vs benefit headline | Template guidance + pre-publish audit |
| Not mobile-optimized | Lose 83% of traffic | All templates mobile-first |
| No trust signals near CTA | -61% (trust seals study) | Social proof badges adjacent to every CTA |

### 8.6 Pre-Publish Conversion Audit

Before publishing, Launchpad auto-checks the page:

- [ ] Benefit headline above fold (<8 words)
- [ ] Primary CTA visible without scrolling
- [ ] Social proof present (logos, testimonials, or auto-widgets)
- [ ] Single primary CTA (not multiple competing actions)
- [ ] Pricing visible and transparent
- [ ] Mobile responsive (all sections stack properly)
- [ ] Page load time <3 seconds
- [ ] FAQ section present
- [ ] GA4 Measurement ID configured
- [ ] Meta title and Open Graph tags set

**This audit is Launchpad's moat.** No other builder at $29/mo checks your page against conversion research before publishing.

---

## 9. Template Library Strategy

Templates are named by **strategy, not aesthetics**. Each one is a conversion framework with research-backed defaults.

### Template 1: "The Classic Converter"

**For:** Any SaaS product wanting maximum conversion.
**Sections:** Hero (benefit headline + CTA + screenshot) → Logo bar → Problem/Solution → 3 feature cards → Testimonial spotlight → Pricing (3 tiers) → FAQ → Final CTA.
**Design:** Clean white, single accent color, generous whitespace, no nav.
**Why:** Follows the exact 8-section formula from Unbounce's 44K-page study.

### Template 2: "The Viral Waitlist"

**For:** Pre-launch SaaS building audience before shipping.
**Sections:** Hero (urgency headline + email capture + "Join X others") → Countdown/queue position → Problem statement → Teaser features (blurred) → Referral mechanics → Social proof counter.
**Design:** Dark theme, minimal sections, single goal = email capture.
**Why:** Dropbox (3,900% growth), Superhuman ($825M) — referral waitlist is the proven pre-launch playbook.

### Template 3: "Pricing-Forward"

**For:** SaaS with product-market fit, ready to maximize revenue.
**Sections:** Hero (one-line value prop + "See Pricing" anchor) → Logo bar → Pricing (center of page) → Feature comparison → ROI calculator → Testimonials with revenue metrics → FAQ → Final CTA.
**Design:** Pricing is the hero. Everything supports the purchase decision.
**Why:** Visitors on pricing pages have highest purchase intent. Remove everything between them and buying.

### Template 4: "The Developer Tool"

**For:** API-first or developer-focused SaaS.
**Sections:** Hero (technical value prop + dual CTA: "Get Started" + "Read Docs") → Code snippet preview → Integration logos → 3 technical features with code → Stats bar (uptime, latency) → Community stats → Usage-based pricing → FAQ.
**Design:** Dark theme, monospace accents, terminal-style previews. Zero marketing fluff.
**Why:** Developer pages need to show, not tell. Secondary docs CTA is validated (Stripe model).

### Template 5: "The AI Tool"

**For:** AI/ML SaaS products cutting through noise.
**Sections:** Hero (outcome headline, NOT "AI-powered" + interactive demo) → Before vs After → 3 use cases → Social proof with specific results → Transparent usage-based pricing → FAQ addressing trust/accuracy.
**Design:** Modern, clean. Product demo above fold. No stereotypical purple-gradient AI aesthetic.
**Why:** AI tools win by showing the product in action immediately.

### Template 6: "Embed Components" (Not a Full Page)

**For:** Founders with existing sites wanting conversion-optimized components.
**Components:** Pricing table embed, Waitlist form embed, Social proof widget embed, Changelog widget embed.
**Delivery:** Each component as a `<script>` tag. Works on Next.js, WordPress, Webflow, Framer, plain HTML.
**Why:** 10x market expansion. Not every founder wants a new site — every founder wants better conversion tools.

---

## 10. Technical Architecture

### Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | Next.js 14+ (App Router), React 18, TypeScript | SSR for page speed, React ecosystem, type safety |
| Page Builder | Craft.js (primary), GrapesJS (fallback) | Best React-native drag-and-drop builder |
| Backend | NestJS with TypeScript | Structured, scalable, great for REST + WebSocket |
| Database | PostgreSQL via Prisma ORM | Relational data model, Prisma for developer speed |
| Cache / Sessions | Redis | A/B variant persistence, rate limiting, real-time counters |
| Frontend Hosting | Vercel | Auto-scaling, edge functions, Next.js native |
| Backend Hosting | Railway | Simple deployment for NestJS + PostgreSQL + Redis |
| Custom Domains | Cloudflare DNS API + auto-SSL | Programmatic domain management, free SSL |
| Email | Resend | Transactional + waitlist drip sequences |
| Analytics | Custom events + GA4 Measurement Protocol + GTM | Full control + integration with creator's existing GA4 |
| Billing (Launchpad) | Gumroad → Lemon Squeezy at $2K MRR → Stripe at $10K MRR | Progressive billing sophistication as revenue grows |

### Payment Architecture: Zero Credential Storage

This is the most critical architectural decision:

1. Creator generates Payment Links in their own Stripe Dashboard (2 min)
2. Creator pastes the public Payment Link URLs into Launchpad pricing block
3. Visitor clicks pricing button → Launchpad redirects to Stripe hosted checkout
4. Launchpad appends `?client_reference_id={visitor_id}` to the redirect URL
5. After payment, Stripe redirects to the creator's success page
6. Launchpad's tracking script detects the `client_reference_id`, logs conversion
7. Conversion attributed to A/B variant, traffic source, and session
8. GA4 `purchase` event + GTM `dataLayer.push` fire automatically

**What we store:** Only public Payment Link URLs (non-sensitive strings).
**What we never store:** API keys, tokens, customer payment data, funds.
**Limitation:** Revenue uses plan price as estimated value (no exact Stripe amount without webhooks). ~95% accurate for fixed-price SaaS.

### A/B Testing Architecture

- **Variant assignment:** MurmurHash3(visitor_id + test_id) for deterministic, even distribution
- **Session persistence:** Redis stores visitor → variant mapping
- **No client-side flicker:** Correct variant rendered server-side on first load
- **Revenue attribution:** Success page conversion linked to active variant
- **Statistical significance:** Chi-squared test, auto-flag winner at 95% confidence
- **Concurrent tests:** Supports multiple tests on different sections simultaneously

---

## 11. Database Schema

### Core Tables

```
users
├── id (uuid, PK)
├── email (unique)
├── name
├── avatar_url
├── plan (free | pro | business)
├── gumroad_sub_id
├── created_at
└── updated_at

sites
├── id (uuid, PK)
├── user_id (FK → users)
├── name
├── slug (unique)
├── custom_domain
├── mode (waitlist | live)
├── published_at
├── ga4_measurement_id
├── gtm_container_id
├── clarity_project_id
├── created_at
└── updated_at

pages
├── id (uuid, PK)
├── site_id (FK → sites)
├── content_json (JSONB — Craft.js serialized state)
├── version
├── template_id
├── status (draft | published)
├── created_at
└── updated_at

blocks
├── id (uuid, PK)
├── page_id (FK → pages)
├── type (hero | features | pricing | testimonials | faq | cta | footer)
├── props_json (JSONB)
├── order (integer)
└── section

payment_links
├── id (uuid, PK)
├── site_id (FK → sites)
├── plan_name
├── price (decimal)
├── billing_cycle (monthly | yearly)
├── stripe_url
├── position (integer)
└── created_at

waitlist_entries
├── id (uuid, PK)
├── site_id (FK → sites)
├── email
├── referral_code (unique)
├── referred_by (FK → waitlist_entries, nullable)
├── position (integer)
├── referral_count (integer, default 0)
├── joined_at
└── notified_at

visitors
├── id (uuid, PK)
├── site_id (FK → sites)
├── visitor_hash (anonymized)
├── first_seen
├── last_seen
├── utm_source
├── utm_medium
├── utm_campaign
├── device_type
└── referrer

conversions
├── id (uuid, PK)
├── visitor_id (FK → visitors)
├── site_id (FK → sites)
├── event_type (waitlist_signup | checkout_start | purchase)
├── plan_name
├── estimated_value (decimal)
├── variant_id (FK → ab_variants, nullable)
├── created_at
└── attributed_source

ab_tests
├── id (uuid, PK)
├── site_id (FK → sites)
├── name
├── hypothesis
├── scope (full_page | section)
├── status (draft | running | paused | completed)
├── traffic_split (JSONB)
├── winner_variant_id (FK → ab_variants, nullable)
├── created_at
└── ended_at

ab_variants
├── id (uuid, PK)
├── test_id (FK → ab_tests)
├── name (e.g., "Control", "Variant B")
├── content_json (JSONB)
├── visitors_count (integer)
├── conversions_count (integer)
├── revenue_total (decimal)
└── created_at

changelog_entries
├── id (uuid, PK)
├── site_id (FK → sites)
├── title
├── body_md (markdown)
├── category (new | improved | fixed)
├── published_at
└── created_at

analytics_events
├── id (uuid, PK)
├── site_id (FK → sites)
├── visitor_id (FK → visitors)
├── event_name
├── properties_json (JSONB)
├── variant_id (FK → ab_variants, nullable)
└── timestamp
```

---

## 12. GA4 / GTM Integration Spec

### Auto-Tracked Events

| Event | Trigger | Parameters |
|---|---|---|
| `page_view` | Page load | page_title, page_location, utm_source, utm_medium, utm_campaign |
| `cta_click` | Any CTA button click | cta_text, cta_position, section_name |
| `pricing_view` | Pricing section enters viewport | plans_count, billing_cycle_default |
| `plan_select` | Payment Link button clicked | plan_name, plan_price, billing_cycle |
| `checkout_start` | Redirect to Stripe | plan_name, plan_price, currency, payment_link_id |
| `purchase` | Success page load | plan_name, estimated_value, currency, client_reference_id |
| `waitlist_signup` | Email submitted | referral_source, queue_position |
| `referral_share` | Share button click | share_method (twitter/linkedin/email/link) |
| `ab_variant_served` | Variant renders | test_id, test_name, variant_id, variant_name |
| `social_proof_impression` | Social proof widget viewed | widget_type, content |
| `social_proof_click` | Social proof widget clicked | widget_type |

### Custom Dimensions (GA4 User Properties)

- `ab_test_variant` — Active variant ID. Enables segmenting ALL GA4 reports by variant.
- `traffic_segment` — organic / paid / referral / direct. Auto-detected from UTM and referrer.
- `visitor_type` — new / returning. Based on visitor_id persistence.

### GTM DataLayer Format

All events pushed as: `dataLayer.push({ event: 'event_name', ...parameters })`

Creators can use these in GTM to fire Facebook Pixel, Google Ads conversions, LinkedIn Insight tags, or any other marketing pixel — without Launchpad integrating with each platform.

---

## 13. 6-Week Implementation Plan

### Sprint 1: Foundation + MVP Launch (Weeks 1-2)

**Goal:** Ship a working product. The MVP announcement: *"Landing page, payments, viral waitlist, GA4 tracking — in 5 minutes."*

#### Week 1: Core Infrastructure

| Task | Days | Priority |
|---|---|---|
| Project scaffolding (Next.js + NestJS + Prisma + Redis + CI/CD) | 1 | P0 |
| Authentication (Email + Google OAuth, JWT, protected routes) | 1.5 | P0 |
| Page builder engine (Craft.js, drag-and-drop, auto-save, undo/redo) | 2.5 | P0 |
| SaaS block library — 7 blocks (Hero, Features, Pricing, Testimonials, CTA, FAQ, Footer) | 2 | P0 |

#### Week 2: Payments + Waitlist + Analytics + Launch

| Task | Days | Priority |
|---|---|---|
| Pricing table + Payment Links integration (paste URLs, monthly/yearly toggle) | 1 | P0 |
| Success page conversion tracking (client_reference_id detection, attribution) | 0.5 | P0 |
| Waitlist mode with referral queue (email capture, unique referral links, position tracking, move-up logic) | 1.5 | P0 |
| Waitlist emails via Resend (welcome + referral link, weekly update, launch notification) | 0.5 | P0 |
| GA4 + GTM auto-integration (inject gtag.js/GTM, auto-track all events) | 1 | P0 |
| 3 SaaS templates (Classic, AI Tool, Developer) | 1 | P0 |
| Publish + custom domain (Cloudflare DNS API, auto-SSL, subdomain fallback) | 1 | P0 |
| MVP launch prep (dogfood, Twitter thread, early access waitlist) | 0.5 | P0 |

### Sprint 2: Analytics + A/B Testing + Growth (Weeks 3-4)

**Goal:** Build the features that make Launchpad irreplaceable. The screenshot: *"Variant B drove 47% more revenue."*

#### Week 3: Analytics + Social Proof + One-Click Switch

| Task | Days | Priority |
|---|---|---|
| Analytics dashboard v1 (visitors, traffic sources, conversion funnel, date picker, CSV export) | 2 | P0 |
| One-click waitlist → live switch (toggle, auto-notify subscribers, page rebuild) | 1 | P0 |
| Auto social proof widgets (live signup toasts, counter badges, testimonial carousel) | 1.5 | P0 |
| GA4 enhanced events (waitlist_signup, referral_share, social_proof events) | 0.5 | P1 |
| Microsoft Clarity integration (heatmaps + session recordings) | 0.5 | P1 |

#### Week 4: A/B Testing Engine (Core Differentiator)

| Task | Days | Priority |
|---|---|---|
| A/B test creation UI (scope selection, variant editor, traffic split, controls) | 1.5 | P0 |
| Traffic splitting engine (MurmurHash3, Redis persistence, server-side rendering, no flicker) | 2 | P0 |
| Revenue-per-variant tracking (success page → variant attribution, revenue dashboard) | 1.5 | P0 |
| Statistical significance engine (chi-squared, 95% confidence, auto-flag winner, apply winner) | 1 | P0 |
| GA4 A/B variant sync (custom dimension, dataLayer event) | 0.5 | P1 |

### Sprint 3: Ecosystem + Embed + Billing + Launch (Weeks 5-6)

**Goal:** Complete the ecosystem, launch embed mode, wire billing, execute full launch campaign.

#### Week 5: Changelog + Embed + Billing

| Task | Days | Priority |
|---|---|---|
| Changelog system (markdown editor, categories, email notifications, RSS, embeddable widget) | 1.5 | P1 |
| Embed mode — script tag export (pricing, waitlist, social proof, changelog as `<script>` tags) | 2 | P0 |
| Gumroad billing integration (Free/Pro/Business, webhook activation, upgrade/downgrade) | 2 | P0 |
| Status page (/status, manual toggle, uptime badge) | 0.5 | P2 |

#### Week 6: Onboarding + Polish + Full Launch

| Task | Days | Priority |
|---|---|---|
| SaaS Launch Playbook onboarding wizard (5-step guided setup, phase transitions) | 1.5 | P0 |
| Performance optimization (<2s load, lazy-load, minify, WebP, Lighthouse 90+) | 1 | P0 |
| SEO + social sharing (meta editor, Open Graph, Twitter Cards, sitemap, JSON-LD) | 1 | P1 |
| Mobile responsiveness audit (all templates + builder preview) | 1 | P0 |
| Full launch campaign (ProductHunt, Twitter thread, IndieHackers, Reddit) | 1.5 | P0 |

---

## 14. Pricing Strategy

### Plans

| Plan | Price | Target | Includes |
|---|---|---|---|
| **Starter** | $0/mo | Validation-stage founders | 1 site, Launchpad branding, waitlist mode, basic analytics, 1K visitors/mo, 3 templates |
| **Pro** | $29/mo ($39 monthly) | Serious SaaS founders | 5 sites, no branding, A/B testing with revenue tracking, embed mode, social proof widgets, 50K visitors/mo, all templates, priority support |
| **Business** | $79/mo ($99 monthly) | Scaling teams & agencies | Unlimited sites, unlimited visitors, white-label embed, changelog + status page, team collaboration, API access, dedicated support |

### Why This Pricing Works

- Waitlist tools alone charge $15-499/mo
- A/B testing tools charge $99-500/mo
- Changelog tools charge $29-249/mo
- Landing page builders charge $19-99/mo
- Total stack: $200-500/mo → Launchpad at $29/mo is massive value consolidation

### Billing Infrastructure

| Phase | Provider | Fees | Trigger |
|---|---|---|---|
| Launch | Gumroad | ~10% + 30¢ | Day 1 |
| Growth | Lemon Squeezy | 5% + 50¢ | $2K MRR |
| Scale | Stripe direct | 2.9% + 30¢ | $10K MRR |

---

## 15. Revenue Projections

| Timeline | Users | Mix (Free/Pro/Business) | MRR |
|---|---|---|---|
| Month 1 | 50 | 40 / 10 / 0 | $290 |
| Month 2 | 150 | 120 / 25 / 5 | $1,120 |
| Month 3 | 400 | 300 / 80 / 20 | $3,900 |
| Month 6 | 1,200 | 900 / 240 / 60 | $11,700 |
| Month 12 | 3,000+ | - | $25,000-40,000 |

**₹5L MRR target** ≈ ~$6K MRR ≈ achievable by Month 4-5 with consistent organic growth.

---

## 16. Go-to-Market & Twitter Build-in-Public

### Week-by-Week Content Plan

| Week | Theme | Content |
|---|---|---|
| 1 | Problem | Thread: "SaaS founders use 7 tools just to launch. I'm building one to replace them all." + screen recording of building a page in 2 min |
| 2 | MVP Launch | Thread: "Built in 2 weeks. Payment Links, GA4, GTM, viral waitlist, custom domain. Zero setup." + early access link + demo GIF |
| 3 | Technical Deep Dive | Thread: "How I built a viral referral queue that costs $0 to run." + explain move-up logic + waitlist dashboard screenshot |
| 4 | Money Shot | Thread: "Variant B drove 47% more conversions AND ₹32K more revenue. No other tool can tell you that." + revenue dashboard screenshot |
| 5 | Feature Walkthrough | "Everything Launchpad does in 60 seconds" video + embed mode demo |
| 6 | Full Launch | ProductHunt launch + metrics thread: "6 weeks. Solo dev. Here are the numbers." + IndieHackers write-up |

### Distribution Channels

- **Twitter:** Primary channel. Build-in-public, 3-5 posts/week, engage with SaaS founder community
- **IndieHackers:** Launch post + ongoing build journal
- **Reddit:** r/SaaS, r/Entrepreneur, r/webdev — genuine value posts, not spam
- **ProductHunt:** Week 6 launch (prepare listing, screenshots, maker comment)
- **Viral loop:** Every free-tier waitlist page has "Powered by Launchpad" badge = organic distribution

---

## 17. Risks & Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| **Page builder complexity** (Craft.js limitations) | HIGH | Spike Day 1. If too rigid → GrapesJS fallback. If both fail → custom renderer with predefined layouts (+1 day) |
| **6-week scope pressure** | HIGH | Strict P0/P1/P2 priorities. All P0 non-negotiable. P1 ships if time allows. P2 slides to Week 7-8. MVP ships regardless |
| **Payment Link UX friction** (creators must generate links in Stripe) | MED | In-app guide with screenshots. Video walkthrough. Process takes <2 min. Most founders already have Stripe |
| **Conversion tracking accuracy** (success page detection ~95%) | MED | Unique token in success URL, validate against active sessions, 30-min expiry |
| **Custom domain DNS delays** (24-48 hours) | LOW | Status indicator, auto-check every 5 min, email when live, subdomain always available as fallback |
| **Gumroad reliability** | MED | Abstract billing behind internal interface. Can swap to Lemon Squeezy in <1 day |
| **Embed mode cross-site CSS conflicts** | MED | Shadow DOM for style isolation. Namespaced CSS. <15KB JS. Test on top 5 frameworks |
| **"Someone copies the idea"** | LOW | Idea isn't the moat. Execution + Stripe expertise + analytics knowledge + speed is. Market supports 10+ products. Need only 200 paying users for ₹5L MRR |

---

## 18. Success Metrics

### Launch Targets (Week 6)

| Metric | Target | Measurement |
|---|---|---|
| Waitlist signups (pre-launch) | 500+ | Waitlist dashboard + Resend |
| Day 1 signups | 100+ | Database user count |
| Free → Pro conversion (Month 1) | 15-20% | Billing data |
| Published pages | 50+ | Sites with published_at ≠ null |
| ProductHunt ranking | Top 5 of the day | ProductHunt dashboard |
| Twitter impressions | 100K+ across 6 weeks | Twitter Analytics |

### Growth Targets (Months 1-6)

| Metric | Target | Measurement |
|---|---|---|
| MRR | $1K by Month 2, $5K by Month 4 | Billing dashboard |
| Monthly active users | 500 by Month 3 | Unique logins |
| Pages published | 1,000 by Month 6 | Database query |
| Embed installations | 200 by Month 6 | Embed script load events |
| Organic signups (no paid ads) | 80%+ | UTM attribution |
| Monthly churn | <5% | Billing churn reports |
| NPS score | 50+ | In-app survey at Day 14 |

---

## 19. Post-Launch Roadmap

### Near-Term (Weeks 7-12)

- Stripe Connect OAuth (Business tier) — automated product creation, real-time webhooks, exact revenue tracking
- Email marketing integrations — Mailchimp, ConvertKit, Beehiiv auto-sync
- 10+ additional templates based on user requests (fintech, healthtech, devtools, AI, marketplace)
- Custom CSS editor for Pro/Business users
- Migrate billing to Lemon Squeezy

### Medium-Term (Months 3-6)

- Team collaboration — multiple editors, role-based permissions
- White-label reselling — agencies use Launchpad under their brand ($199/mo agency plan)
- API access — programmatic page creation, analytics queries, A/B test management
- AI copy suggestions — Claude API for headlines, CTAs, feature descriptions (opt-in, cost passed to user or included in Business plan)
- Multi-language support for international SaaS products

### Long-Term Vision

Launchpad evolves from a landing page builder into the definitive SaaS launch and growth platform. The end state: a creator signs up, builds their page, runs a viral waitlist, launches with payments, A/B tests every element for revenue, and manages post-launch communication — all without leaving Launchpad. The embed mode creates a trojan horse distribution model where even founders with existing sites adopt individual components.

---

## 20. The Mindset Note

This section exists because building a product is as much a psychological challenge as a technical one.

**On the fear of being copied:** The idea of a unified SaaS launch platform is not a secret. It's obvious to anyone who's felt the pain. The moat isn't the idea — it's the execution. Deep Stripe knowledge, GA4/GTM expertise, full-stack speed, and the willingness to do unsexy infrastructure work. A person with 100K followers but no full-stack depth would hire a team, burn 3 months, and ship something mediocre. You can ship something sharp in 6 weeks solo.

**On the starter kit experience:** The starter kit operated in a saturated commodity market. Launchpad has sharper positioning ("replace 7 tools with 1"), a clear distribution story (Twitter build-in-public + viral waitlist loop), and validated market pain. Different games.

**On the math that matters:** The SaaS landing page market is not winner-take-all. Multiple products coexist profitably. You need 200 paying users at $29/month to hit ₹5L MRR. That's 200 people out of millions of SaaS founders worldwide.

**On what to do right now:** Ship the waitlist page this weekend. Not the product — just the landing page. Post it on Twitter. If 50-100 people sign up in 2 weeks with zero ad spend, you have signal. Set a kill number before writing a single line of product code. "If I can't get 100 waitlist signups by [date], I stop." This removes the emotional decision later.

**On building while anxious:** Separate "building time" from "judging time." When coding, just code. Evaluation happens at pre-set checkpoints with pre-set numbers. Don't let the "is this going to fail?" loop run while implementing a drag-and-drop block. That loop has no useful information at that stage.

The worst outcome isn't that Launchpad fails. The worst outcome is never shipping anything because the fear of failure keeps you in permanent research mode. The research phase is done. This document is the proof. The next step is action.

---

*Document version: 2.0 · February 2026*
*Total research sources: Unbounce (44K pages), First Page Sage, DesignRevision, KlientBoost, Reddit, IndieHackers, and 20+ additional conversion studies*
*All competitive references are to tool categories, not specific brands*
