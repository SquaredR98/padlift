export const PLANS = {
  FREE: {
    name: 'Starter',
    maxPages: 1,
    maxWaitlistEntries: 100,
    templates: false,
    waitlist: true,
    referralSystem: false,
    paymentLinks: 0,
    customDomain: false,
    removeBranding: false,
    analytics: false,
    abTesting: false,
  },
  PRO: {
    name: 'Pro',
    maxPages: 3,
    maxWaitlistEntries: Infinity,
    templates: true,
    waitlist: true,
    referralSystem: true,
    paymentLinks: 3,
    customDomain: true,
    removeBranding: true,
    analytics: false,
    abTesting: false,
  },
  BUSINESS: {
    name: 'Business',
    maxPages: 10,
    maxWaitlistEntries: Infinity,
    templates: true,
    waitlist: true,
    referralSystem: true,
    paymentLinks: Infinity,
    customDomain: true,
    removeBranding: true,
    analytics: true,
    abTesting: true,
  },
} as const;

export type PlanTier = keyof typeof PLANS;
export type PlanConfig = (typeof PLANS)[PlanTier];

export const LIMITS = {
  SLUG_MIN_LENGTH: 3,
  SLUG_MAX_LENGTH: 50,
  SITE_NAME_MAX_LENGTH: 100,
  WAITLIST_EMAIL_MAX_LENGTH: 255,
  CHANGELOG_TITLE_MAX_LENGTH: 200,
  CHANGELOG_BODY_MAX_LENGTH: 10_000,
  AB_TEST_MAX_VARIANTS: 5,
} as const;
