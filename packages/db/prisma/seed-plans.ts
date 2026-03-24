import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const PLAN_CONFIGS = [
  {
    tier: 'FREE' as const,
    displayName: 'Free',
    priceMonthly: 0,
    priceYearly: 0,
    gumroadTierName: null as string | null,
    maxSites: 1,
    maxWaitlistEntries: 100,
    maxPages: 1,
    maxPaymentLinks: 0,
    customDomain: false,
    removeBranding: false,
    googleSheets: false,
    webhooks: false,
    analytics: false,
    abTesting: false,
    maxStorageMb: 50,
    position: 0,
  },
  {
    tier: 'PRO' as const,
    displayName: 'Pro',
    priceMonthly: 900, // $9/mo in cents
    priceYearly: 9000, // $90/yr in cents ($7.50/mo effective)
    gumroadTierName: 'Pro',
    maxSites: 5,
    maxWaitlistEntries: 999999,
    maxPages: 5,
    maxPaymentLinks: 5,
    customDomain: true,
    removeBranding: false,
    googleSheets: true,
    webhooks: true,
    analytics: false,
    abTesting: false,
    maxStorageMb: 500,
    position: 1,
  },
  {
    tier: 'BUSINESS' as const,
    displayName: 'Business',
    priceMonthly: 2900, // $29/mo in cents
    priceYearly: 29000, // $290/yr in cents
    gumroadTierName: 'Business',
    maxSites: 999999,
    maxWaitlistEntries: 999999,
    maxPages: 999999,
    maxPaymentLinks: 999999,
    customDomain: true,
    removeBranding: true,
    googleSheets: true,
    webhooks: true,
    analytics: true,
    abTesting: true,
    maxStorageMb: 5000,
    position: 2,
  },
];

async function main() {
  console.log('Seeding plan configs...');

  for (const config of PLAN_CONFIGS) {
    await db.planConfig.upsert({
      where: { tier: config.tier },
      update: config,
      create: config,
    });
    console.log(`  ${config.tier} → ${config.displayName} ($${config.priceMonthly / 100}/mo)`);
  }

  console.log('Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
