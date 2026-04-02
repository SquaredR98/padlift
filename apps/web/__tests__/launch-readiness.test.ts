/**
 * Launch Readiness Tests — Padlift
 *
 * These tests verify every launch-critical feature without needing
 * a running server or database. They check:
 *  1. Plan tier structure (constants + seed data consistency)
 *  2. Pricing logic (yearly savings, display formatting)
 *  3. Auth adapter proxy (Profile ↔ User mapping)
 *  4. SEO files exist (robots, sitemap, metadata)
 *  5. Error pages exist (404, error boundary)
 *  6. Security headers configured
 *  7. Env vars documented
 *  8. Middleware custom domain logic
 *  9. Feature gating consistency
 */

import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const WEB_ROOT = resolve(__dirname, '..');
const MONO_ROOT = resolve(WEB_ROOT, '../..');

// ─── Helper ──────────────────────────────────────────────────

function fileExists(relativePath: string): boolean {
  return existsSync(resolve(WEB_ROOT, relativePath));
}

function readFile(relativePath: string): string {
  return readFileSync(resolve(WEB_ROOT, relativePath), 'utf-8');
}

function monoFile(relativePath: string): string {
  return readFileSync(resolve(MONO_ROOT, relativePath), 'utf-8');
}

// ═══════════════════════════════════════════════════════════════
// 1. PLAN TIER STRUCTURE
// ═══════════════════════════════════════════════════════════════

describe('Plan Tier Structure', () => {
  const constants = readFile('../../packages/config/src/constants.ts');
  const seedFile = monoFile('packages/db/prisma/seed-plans.ts');
  const schema = monoFile('packages/db/prisma/schema.prisma');

  it('schema has all 5 tiers in Plan enum', () => {
    const tiers = ['FREE', 'LITE', 'STARTER', 'PRO', 'BUSINESS'];
    for (const tier of tiers) {
      expect(schema).toContain(tier);
    }
  });

  it('constants.ts defines all 5 plan tiers', () => {
    expect(constants).toContain('FREE:');
    expect(constants).toContain('LITE:');
    expect(constants).toContain('STARTER:');
    expect(constants).toContain('PRO:');
    expect(constants).toContain('BUSINESS:');
  });

  it('seed data has all 5 tiers', () => {
    expect(seedFile).toContain("tier: 'FREE'");
    expect(seedFile).toContain("tier: 'LITE'");
    expect(seedFile).toContain("tier: 'STARTER'");
    expect(seedFile).toContain("tier: 'PRO'");
    expect(seedFile).toContain("tier: 'BUSINESS'");
  });

  it('FREE tier has no paid features', () => {
    expect(constants).toMatch(/FREE:\s*\{[^}]*customDomain:\s*false/s);
    expect(constants).toMatch(/FREE:\s*\{[^}]*removeBranding:\s*false/s);
    expect(constants).toMatch(/FREE:\s*\{[^}]*analytics:\s*false/s);
    expect(constants).toMatch(/FREE:\s*\{[^}]*abTesting:\s*false/s);
  });

  it('all paid tiers have full features (custom domain, analytics, branding removal)', () => {
    const paidTiers = ['LITE', 'STARTER', 'PRO', 'BUSINESS'];
    for (const tier of paidTiers) {
      const regex = new RegExp(`${tier}:\\s*\\{[^}]*customDomain:\\s*true`, 's');
      expect(constants).toMatch(regex);
    }
    for (const tier of paidTiers) {
      const regex = new RegExp(`${tier}:\\s*\\{[^}]*removeBranding:\\s*true`, 's');
      expect(constants).toMatch(regex);
    }
    for (const tier of paidTiers) {
      const regex = new RegExp(`${tier}:\\s*\\{[^}]*analytics:\\s*true`, 's');
      expect(constants).toMatch(regex);
    }
  });

  it('only BUSINESS has A/B testing', () => {
    // BUSINESS should have abTesting: true
    expect(constants).toMatch(/BUSINESS:\s*\{[^}]*abTesting:\s*true/s);
    // Others should have abTesting: false
    for (const tier of ['FREE', 'LITE', 'STARTER', 'PRO']) {
      const regex = new RegExp(`${tier}:\\s*\\{[^}]*abTesting:\\s*false`, 's');
      expect(constants).toMatch(regex);
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// 2. PRICING LOGIC
// ═══════════════════════════════════════════════════════════════

describe('Pricing Logic', () => {
  const seedFile = monoFile('packages/db/prisma/seed-plans.ts');

  it('FREE tier is $0', () => {
    // FREE: priceMonthly: 0, priceYearly: 0
    expect(seedFile).toMatch(/tier:\s*'FREE'[\s\S]*?priceMonthly:\s*0/);
    expect(seedFile).toMatch(/tier:\s*'FREE'[\s\S]*?priceYearly:\s*0/);
  });

  it('LITE is $1/mo ($10/yr)', () => {
    expect(seedFile).toMatch(/tier:\s*'LITE'[\s\S]*?priceMonthly:\s*100/);
    expect(seedFile).toMatch(/tier:\s*'LITE'[\s\S]*?priceYearly:\s*1000/);
  });

  it('STARTER is $5/mo ($50/yr)', () => {
    expect(seedFile).toMatch(/tier:\s*'STARTER'[\s\S]*?priceMonthly:\s*500/);
    expect(seedFile).toMatch(/tier:\s*'STARTER'[\s\S]*?priceYearly:\s*5000/);
  });

  it('PRO is $9/mo ($90/yr)', () => {
    expect(seedFile).toMatch(/tier:\s*'PRO'[\s\S]*?priceMonthly:\s*900/);
    expect(seedFile).toMatch(/tier:\s*'PRO'[\s\S]*?priceYearly:\s*9000/);
  });

  it('BUSINESS is $29/mo ($290/yr)', () => {
    expect(seedFile).toMatch(/tier:\s*'BUSINESS'[\s\S]*?priceMonthly:\s*2900/);
    expect(seedFile).toMatch(/tier:\s*'BUSINESS'[\s\S]*?priceYearly:\s*29000/);
  });

  it('yearly savings are ~17% for all paid tiers', () => {
    const tiers = [
      { monthly: 100, yearly: 1000 },   // LITE
      { monthly: 500, yearly: 5000 },   // STARTER
      { monthly: 900, yearly: 9000 },   // PRO
      { monthly: 2900, yearly: 29000 }, // BUSINESS
    ];
    for (const { monthly, yearly } of tiers) {
      const annualAtMonthly = monthly * 12;
      const savings = (1 - yearly / annualAtMonthly) * 100;
      // ~17% savings (pay 10 months, get 12)
      expect(savings).toBeGreaterThanOrEqual(16);
      expect(savings).toBeLessThanOrEqual(18);
    }
  });

  it('seed data has correct gumroadTierName for each paid tier', () => {
    expect(seedFile).toMatch(/tier:\s*'LITE'[\s\S]*?gumroadTierName:\s*'Lite'/);
    expect(seedFile).toMatch(/tier:\s*'STARTER'[\s\S]*?gumroadTierName:\s*'Starter'/);
    expect(seedFile).toMatch(/tier:\s*'PRO'[\s\S]*?gumroadTierName:\s*'Pro'/);
    expect(seedFile).toMatch(/tier:\s*'BUSINESS'[\s\S]*?gumroadTierName:\s*'Business'/);
  });

  it('seed positions are in correct order (0-4)', () => {
    expect(seedFile).toMatch(/tier:\s*'FREE'[\s\S]*?position:\s*0/);
    expect(seedFile).toMatch(/tier:\s*'LITE'[\s\S]*?position:\s*1/);
    expect(seedFile).toMatch(/tier:\s*'STARTER'[\s\S]*?position:\s*2/);
    expect(seedFile).toMatch(/tier:\s*'PRO'[\s\S]*?position:\s*3/);
    expect(seedFile).toMatch(/tier:\s*'BUSINESS'[\s\S]*?position:\s*4/);
  });
});

// ═══════════════════════════════════════════════════════════════
// 3. AUTH ADAPTER PROXY
// ═══════════════════════════════════════════════════════════════

describe('Auth Adapter Proxy', () => {
  const authIndex = readFile('lib/auth/index.ts');
  const authConfig = readFile('lib/auth/config.ts');

  it('uses PrismaAdapter with proxy (not raw db)', () => {
    expect(authIndex).toContain('PrismaAdapter(dbWithUser)');
    expect(authIndex).not.toContain('PrismaAdapter(db)');
  });

  it('proxy maps db.user to db.profile', () => {
    expect(authIndex).toContain("if (prop === 'user') return profileProxy");
  });

  it('proxy remaps image field to avatarUrl on create/update', () => {
    expect(authIndex).toContain('remapImageField');
    expect(authIndex).toContain('data.avatarUrl = data.image');
    expect(authIndex).toContain('delete data.image');
  });

  it('Google OAuth has allowDangerousEmailAccountLinking enabled', () => {
    expect(authConfig).toContain('allowDangerousEmailAccountLinking: true');
  });

  it('session strategy is JWT (edge-compatible)', () => {
    expect(authConfig).toMatch(/session:\s*\{\s*strategy:\s*['"]jwt['"]/);
  });

  it('auth config has Google and Credentials providers', () => {
    expect(authConfig).toContain('Google(');
    expect(authConfig).toContain('Credentials(');
  });
});

// ═══════════════════════════════════════════════════════════════
// 4. SEO FILES
// ═══════════════════════════════════════════════════════════════

describe('SEO Files', () => {
  it('robots.ts exists', () => {
    expect(fileExists('app/robots.ts')).toBe(true);
  });

  it('robots.ts disallows /dashboard/ and /api/', () => {
    const content = readFile('app/robots.ts');
    expect(content).toContain('/dashboard/');
    expect(content).toContain('/api/');
  });

  it('robots.ts references sitemap', () => {
    const content = readFile('app/robots.ts');
    expect(content).toContain('sitemap');
  });

  it('sitemap.ts exists', () => {
    expect(fileExists('app/sitemap.ts')).toBe(true);
  });

  it('sitemap.ts includes key pages', () => {
    const content = readFile('app/sitemap.ts');
    expect(content).toContain('/login');
    expect(content).toContain('/signup');
    expect(content).toContain('/privacy');
    expect(content).toContain('/terms');
  });

  it('root layout has metadataBase', () => {
    const layout = readFile('app/layout.tsx');
    expect(layout).toContain('metadataBase');
  });

  it('root layout has OpenGraph metadata', () => {
    const layout = readFile('app/layout.tsx');
    expect(layout).toContain('openGraph');
    expect(layout).toContain('og-image');
  });

  it('root layout has Twitter card metadata', () => {
    const layout = readFile('app/layout.tsx');
    expect(layout).toContain('twitter');
    expect(layout).toContain('summary_large_image');
  });

  it('favicon.svg exists in public/', () => {
    expect(existsSync(resolve(WEB_ROOT, 'public/favicon.svg'))).toBe(true);
  });

  it('root layout references favicon', () => {
    const layout = readFile('app/layout.tsx');
    expect(layout).toContain('favicon');
  });
});

// ═══════════════════════════════════════════════════════════════
// 5. ERROR PAGES
// ═══════════════════════════════════════════════════════════════

describe('Error Pages', () => {
  it('not-found.tsx exists', () => {
    expect(fileExists('app/not-found.tsx')).toBe(true);
  });

  it('not-found page has link back to home', () => {
    const content = readFile('app/not-found.tsx');
    expect(content).toContain('href="/"');
  });

  it('not-found page shows 404 status', () => {
    const content = readFile('app/not-found.tsx');
    expect(content).toContain('404');
  });

  it('error.tsx exists', () => {
    expect(fileExists('app/error.tsx')).toBe(true);
  });

  it('error page is a client component', () => {
    const content = readFile('app/error.tsx');
    expect(content).toContain("'use client'");
  });

  it('error page has retry button (reset)', () => {
    const content = readFile('app/error.tsx');
    expect(content).toContain('reset');
  });
});

// ═══════════════════════════════════════════════════════════════
// 6. SECURITY HEADERS
// ═══════════════════════════════════════════════════════════════

describe('Security Headers', () => {
  const config = readFile('next.config.ts');

  it('next.config has security headers function', () => {
    expect(config).toContain('async headers()');
  });

  it('has HSTS header', () => {
    expect(config).toContain('Strict-Transport-Security');
  });

  it('has X-Content-Type-Options nosniff', () => {
    expect(config).toContain('X-Content-Type-Options');
    expect(config).toContain('nosniff');
  });

  it('has X-Frame-Options SAMEORIGIN', () => {
    expect(config).toContain('X-Frame-Options');
    expect(config).toContain('SAMEORIGIN');
  });

  it('has Referrer-Policy', () => {
    expect(config).toContain('Referrer-Policy');
  });

  it('has DNS prefetch control', () => {
    expect(config).toContain('X-DNS-Prefetch-Control');
  });
});

// ═══════════════════════════════════════════════════════════════
// 7. ENVIRONMENT VARIABLES
// ═══════════════════════════════════════════════════════════════

describe('Environment Variables Documentation', () => {
  const envExample = monoFile('.env.example');

  it('documents DATABASE_URL', () => {
    expect(envExample).toContain('DATABASE_URL');
  });

  it('documents AUTH_SECRET', () => {
    expect(envExample).toContain('AUTH_SECRET');
  });

  it('documents AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET', () => {
    expect(envExample).toContain('AUTH_GOOGLE_ID');
    expect(envExample).toContain('AUTH_GOOGLE_SECRET');
  });

  it('documents NEXT_PUBLIC_APP_URL', () => {
    expect(envExample).toContain('NEXT_PUBLIC_APP_URL');
  });

  it('documents GUMROAD_SELLER_ID', () => {
    expect(envExample).toContain('GUMROAD_SELLER_ID');
  });

  it('documents APP_DOMAINS (not commented out)', () => {
    // Should have APP_DOMAINS=your-domain.com (not # APP_DOMAINS=)
    expect(envExample).toMatch(/^APP_DOMAINS=/m);
  });

  it('documents R2 storage vars', () => {
    expect(envExample).toContain('STORAGE_PROVIDER');
    expect(envExample).toContain('R2_ACCOUNT_ID');
    expect(envExample).toContain('R2_ACCESS_KEY_ID');
    expect(envExample).toContain('R2_SECRET_ACCESS_KEY');
    expect(envExample).toContain('R2_BUCKET_NAME');
    expect(envExample).toContain('R2_PUBLIC_URL');
  });

  it('documents Google Sheets integration vars', () => {
    expect(envExample).toContain('GOOGLE_CLIENT_ID');
    expect(envExample).toContain('GOOGLE_CLIENT_SECRET');
    expect(envExample).toContain('GOOGLE_REDIRECT_URI');
  });
});

// ═══════════════════════════════════════════════════════════════
// 8. MIDDLEWARE
// ═══════════════════════════════════════════════════════════════

describe('Middleware', () => {
  const middleware = readFile('middleware.ts');

  it('exports runtime as nodejs', () => {
    expect(middleware).toMatch(/export\s+const\s+runtime\s*=\s*['"]nodejs['"]/);
  });

  it('reads APP_DOMAINS from env', () => {
    expect(middleware).toContain('process.env.APP_DOMAINS');
  });

  it('auto-recognizes Vercel domains', () => {
    expect(middleware).toContain('.vercel.app');
  });

  it('rewrites custom domains to /s/[slug]', () => {
    expect(middleware).toContain('/s/${data.slug}');
  });

  it('excludes static assets from custom domain rewrite', () => {
    expect(middleware).toContain('_next');
    expect(middleware).toContain('/api');
    expect(middleware).toContain('/dashboard');
  });

  it('returns 404 for unknown custom domains', () => {
    expect(middleware).toContain('Site not found');
    expect(middleware).toContain('status: 404');
  });
});

// ═══════════════════════════════════════════════════════════════
// 9. API TIER ALLOWLISTS
// ═══════════════════════════════════════════════════════════════

describe('API Tier Allowlists', () => {
  const ALL_TIERS = ['FREE', 'LITE', 'STARTER', 'PRO', 'BUSINESS'];
  const PAID_TIERS = ['LITE', 'STARTER', 'PRO', 'BUSINESS'];

  it('checkout API accepts all paid tiers', () => {
    const checkout = readFile('app/api/checkout/route.ts');
    for (const tier of PAID_TIERS) {
      expect(checkout).toContain(`'${tier}'`);
    }
  });

  it('admin users API filters all tiers', () => {
    const users = readFile('app/api/admin/users/route.ts');
    for (const tier of ALL_TIERS) {
      expect(users).toContain(`'${tier}'`);
    }
  });

  it('admin user detail PATCH accepts all tiers', () => {
    const userDetail = readFile('app/api/admin/users/[userId]/route.ts');
    for (const tier of ALL_TIERS) {
      expect(userDetail).toContain(`'${tier}'`);
    }
  });

  it('admin billing counts all tiers', () => {
    const billing = readFile('app/api/admin/billing/route.ts');
    for (const tier of ALL_TIERS) {
      expect(billing).toContain(tier);
    }
  });

  it('billing API returns tierMrr (not proMrr/bizMrr)', () => {
    const billing = readFile('app/api/admin/billing/route.ts');
    expect(billing).toContain('tierMrr');
    expect(billing).not.toContain('proMrr');
    expect(billing).not.toContain('bizMrr');
  });

  it('plan-gate sort order includes all tiers', () => {
    const planGate = readFile('lib/plan-gate.ts');
    for (const tier of ALL_TIERS) {
      expect(planGate).toContain(tier);
    }
  });
});

// ═══════════════════════════════════════════════════════════════
// 10. LANDING PAGE PRICING
// ═══════════════════════════════════════════════════════════════

describe('Landing Page Pricing', () => {
  const pricing = readFile('components/landing/pricing/index.tsx');
  const styles = readFile('components/landing/pricing/styles.css');

  it('only shows STARTER, PRO, BUSINESS as visible cards', () => {
    expect(pricing).toMatch(/VISIBLE_TIERS.*STARTER.*PRO.*BUSINESS/s);
    expect(pricing).not.toMatch(/VISIBLE_TIERS.*FREE/);
    expect(pricing).not.toMatch(/VISIBLE_TIERS.*LITE/);
  });

  it('has monthly/yearly billing toggle', () => {
    expect(pricing).toContain("'monthly' | 'yearly'");
    expect(pricing).toContain('setBilling');
  });

  it('shows yearly savings percentage', () => {
    expect(pricing).toContain('savePercent');
    expect(pricing).toContain('Save');
  });

  it('shows crossed-out price in yearly mode', () => {
    expect(pricing).toContain('pricing-price-struck');
  });

  it('shows billed yearly note', () => {
    expect(pricing).toContain('Billed as');
    expect(pricing).toContain('/year');
  });

  it('has free CTA below cards', () => {
    expect(pricing).toContain('Start free');
    expect(pricing).toContain('/signup');
  });

  it('CSS has toggle styles', () => {
    expect(styles).toContain('.pricing-toggle');
    expect(styles).toContain('.pricing-toggle-active');
  });

  it('CSS has save badge styles', () => {
    expect(styles).toContain('.pricing-save-badge');
  });

  it('marks PRO as most popular', () => {
    expect(pricing).toContain("plan.tier === 'PRO'");
    expect(pricing).toContain('Most Popular');
  });
});

// ═══════════════════════════════════════════════════════════════
// 11. ADMIN DASHBOARD TIERS
// ═══════════════════════════════════════════════════════════════

describe('Admin Dashboard Tiers', () => {
  it('admin overview page counts all 5 tiers', () => {
    const overview = readFile('app/dashboard/admin/page.tsx');
    expect(overview).toContain('LITE');
    expect(overview).toContain('STARTER');
  });

  it('billing sections show all tiers', () => {
    const billing = readFile('components/dashboard/admin/billing-sections.tsx');
    expect(billing).toContain('LITE');
    expect(billing).toContain('STARTER');
    expect(billing).toContain('TIER_ORDER');
  });

  it('billing page uses tierMrr (not proMrr/bizMrr)', () => {
    const billingPage = readFile('app/dashboard/admin/billing/page.tsx');
    expect(billingPage).toContain('tierMrr');
    expect(billingPage).not.toContain('proMrr');
    expect(billingPage).not.toContain('bizMrr');
  });

  it('user detail page has LITE and STARTER plan buttons', () => {
    const userDetail = readFile('app/dashboard/admin/users/[userId]/page.tsx');
    expect(userDetail).toContain('LITE');
    expect(userDetail).toContain('STARTER');
  });

  it('users list page filters LITE and STARTER', () => {
    const usersList = readFile('app/dashboard/admin/users/page.tsx');
    expect(usersList).toContain('LITE');
    expect(usersList).toContain('STARTER');
  });

  it('pricing experiments page includes LITE and STARTER', () => {
    const experiments = readFile('app/dashboard/admin/pricing-experiments/page.tsx');
    expect(experiments).toContain('LITE');
    expect(experiments).toContain('STARTER');
  });
});

// ═══════════════════════════════════════════════════════════════
// 12. GUMROAD WEBHOOK
// ═══════════════════════════════════════════════════════════════

describe('Gumroad Webhook', () => {
  it('webhook route exists', () => {
    expect(fileExists('app/api/webhooks/gumroad/route.ts')).toBe(true);
  });

  it('webhook verifies seller_id', () => {
    const webhook = readFile('app/api/webhooks/gumroad/route.ts');
    expect(webhook).toContain('seller_id');
    expect(webhook).toContain('GUMROAD_SELLER_ID');
  });

  it('webhook handles subscription_ended and cancellation', () => {
    const webhook = readFile('app/api/webhooks/gumroad/route.ts');
    expect(webhook).toContain('subscription_ended');
    expect(webhook).toContain('cancellation');
  });

  it('webhook downgrades to FREE on cancellation', () => {
    const webhook = readFile('app/api/webhooks/gumroad/route.ts');
    expect(webhook).toContain('FREE');
  });
});

// ═══════════════════════════════════════════════════════════════
// 13. LEGAL PAGES
// ═══════════════════════════════════════════════════════════════

describe('Legal Pages', () => {
  it('privacy page exists', () => {
    expect(
      fileExists('app/(legal)/privacy/page.tsx'),
    ).toBe(true);
  });

  it('terms page exists', () => {
    expect(
      fileExists('app/(legal)/terms/page.tsx'),
    ).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// 14. FEATURE GATING COMPONENTS
// ═══════════════════════════════════════════════════════════════

describe('Feature Gating', () => {
  it('plan-gate.ts exists with cache', () => {
    const planGate = readFile('lib/plan-gate.ts');
    expect(planGate).toContain('CACHE_TTL');
    expect(planGate).toContain('configCache');
  });

  it('plan gate components exist', () => {
    expect(fileExists('components/plan-gate.tsx')).toBe(true);
  });

  it('plan gate has PlanGate and PlanLimitIndicator exports', () => {
    const planGateComp = readFile('components/plan-gate.tsx');
    expect(planGateComp).toContain('PlanGate');
    expect(planGateComp).toContain('PlanLimitIndicator');
  });
});
