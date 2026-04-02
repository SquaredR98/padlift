import { PLANS } from '@launchpad/config';
import { db } from '@launchpad/db';
import type { Plan } from '@prisma/client';

// ── In-memory cache for plan configs (5-min TTL) ──

export interface PlanConfigData {
  displayName: string;
  priceMonthly: number;
  priceYearly: number;
  gumroadMonthlyUrl: string | null;
  gumroadYearlyUrl: string | null;
  gumroadTierName: string | null;
  maxSites: number;
  maxWaitlistEntries: number;
  maxPages: number;
  maxPaymentLinks: number;
  customDomain: boolean;
  removeBranding: boolean;
  googleSheets: boolean;
  webhooks: boolean;
  analytics: boolean;
  abTesting: boolean;
  maxStorageMb: number;
}

let configCache: Map<Plan, PlanConfigData> | null = null;
let cacheExpiresAt = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function loadPlanConfigs(): Promise<Map<Plan, PlanConfigData>> {
  if (configCache && Date.now() < cacheExpiresAt) return configCache;

  try {
    const rows = await db.planConfig?.findMany({ where: { isActive: true } });
    if (rows && rows.length > 0) {
      const map = new Map<Plan, PlanConfigData>();
      for (const r of rows) {
        map.set(r.tier, {
          displayName: r.displayName,
          priceMonthly: r.priceMonthly,
          priceYearly: r.priceYearly,
          gumroadMonthlyUrl: r.gumroadMonthlyUrl,
          gumroadYearlyUrl: r.gumroadYearlyUrl,
          gumroadTierName: r.gumroadTierName,
          maxSites: r.maxSites,
          maxWaitlistEntries: r.maxWaitlistEntries,
          maxPages: r.maxPages,
          maxPaymentLinks: r.maxPaymentLinks,
          customDomain: r.customDomain,
          removeBranding: r.removeBranding,
          googleSheets: r.googleSheets,
          webhooks: r.webhooks,
          analytics: r.analytics,
          abTesting: r.abTesting,
          maxStorageMb: r.maxStorageMb,
        });
      }
      configCache = map;
      cacheExpiresAt = Date.now() + CACHE_TTL;
      return map;
    }
  } catch (err) {
    console.error('[plan-gate] DB query failed, using hardcoded fallback:', err);
  }

  return getHardcodedConfigs();
}

/** Fallback: convert PLANS constant to PlanConfigData map */
function getHardcodedConfigs(): Map<Plan, PlanConfigData> {
  const map = new Map<Plan, PlanConfigData>();
  for (const [tier, cfg] of Object.entries(PLANS)) {
    map.set(tier as Plan, {
      displayName: cfg.name,
      priceMonthly: cfg.priceMonthly,
      priceYearly: cfg.priceYearly,
      gumroadMonthlyUrl: null,
      gumroadYearlyUrl: null,
      gumroadTierName: null,
      maxSites: cfg.maxSites,
      maxWaitlistEntries: cfg.maxWaitlistEntries,
      maxPages: cfg.maxPages,
      maxPaymentLinks: cfg.maxPaymentLinks,
      customDomain: cfg.customDomain,
      removeBranding: cfg.removeBranding,
      googleSheets: cfg.googleSheets,
      webhooks: cfg.webhooks,
      analytics: cfg.analytics,
      abTesting: cfg.abTesting,
      maxStorageMb: cfg.maxStorageMb,
    });
  }
  return map;
}

/** Force-clear the cache (e.g. after admin updates plans) */
export function invalidatePlanCache() {
  configCache = null;
  cacheExpiresAt = 0;
}

// ── Public API ──

/**
 * Get the full plan configuration for a given plan tier.
 */
export async function getPlanConfig(plan: Plan): Promise<PlanConfigData> {
  const configs = await loadPlanConfigs();
  return configs.get(plan) ?? configs.get('FREE')!;
}

/**
 * Get all plan configs (for settings/pricing pages).
 */
export async function getAllPlanConfigs(): Promise<Array<{ tier: Plan } & PlanConfigData>> {
  const configs = await loadPlanConfigs();
  return Array.from(configs.entries())
    .map(([tier, cfg]) => ({ tier, ...cfg }))
    .sort((a, b) => {
      const order: Record<string, number> = { FREE: 0, LITE: 1, STARTER: 2, PRO: 3, BUSINESS: 4 };
      return (order[a.tier] ?? 99) - (order[b.tier] ?? 99);
    });
}

/**
 * Check if a plan allows custom domains.
 */
export async function canUseCustomDomain(plan: Plan): Promise<boolean> {
  return (await getPlanConfig(plan)).customDomain;
}

/**
 * Check if a plan allows Google Sheets integration.
 */
export async function canUseGoogleSheets(plan: Plan): Promise<boolean> {
  return (await getPlanConfig(plan)).googleSheets;
}

/**
 * Check if a plan allows webhooks.
 */
export async function canUseWebhooks(plan: Plan): Promise<boolean> {
  return (await getPlanConfig(plan)).webhooks;
}

/**
 * Check if a plan includes analytics.
 */
export async function canUseAnalytics(plan: Plan): Promise<boolean> {
  return (await getPlanConfig(plan)).analytics;
}

/**
 * Check if a plan can remove branding badge.
 */
export async function canRemoveBranding(plan: Plan): Promise<boolean> {
  return (await getPlanConfig(plan)).removeBranding;
}

/**
 * Get max payment links for a plan. Returns 0 if not allowed.
 */
export async function getMaxPaymentLinks(plan: Plan): Promise<number> {
  return (await getPlanConfig(plan)).maxPaymentLinks;
}

/**
 * Get max waitlist entries for a plan.
 */
export async function getMaxWaitlistEntries(plan: Plan): Promise<number> {
  return (await getPlanConfig(plan)).maxWaitlistEntries;
}

/**
 * Get max sites for a plan.
 */
export async function getMaxSites(plan: Plan): Promise<number> {
  return (await getPlanConfig(plan)).maxSites;
}

/**
 * Get max pages per site for a plan.
 */
export async function getMaxPages(plan: Plan): Promise<number> {
  return (await getPlanConfig(plan)).maxPages;
}

/**
 * Get max storage in MB for a plan.
 */
export async function getMaxStorageMb(plan: Plan): Promise<number> {
  return (await getPlanConfig(plan)).maxStorageMb;
}

/**
 * Build a 403 JSON response with an upgrade message.
 */
export async function planLimitResponse(feature: string, currentPlan: Plan) {
  const config = await getPlanConfig(currentPlan);
  return Response.json(
    {
      error: `Your ${config.displayName} plan does not include ${feature}. Please upgrade to unlock this feature.`,
      code: 'PLAN_LIMIT',
    },
    { status: 403 },
  );
}
