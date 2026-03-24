import { db } from '@launchpad/db';
import { PageHeader } from '../../components/ui/page-header';
import { PlanEditor } from '@/components/dashboard/admin/plan-editor';

export default async function AdminPlansPage() {
  const planConfigs = await db.planConfig?.findMany({ orderBy: { position: 'asc' } }).catch(() => []) ?? [];

  return (
    <div>
      <PageHeader
        title="Plans"
        description="Configure plan tiers, pricing, and feature limits."
      />
      <div className="px-5 pb-8 pt-5">
        <PlanEditor
          initialPlans={planConfigs.map((c) => ({
            id: c.id,
            tier: c.tier,
            displayName: c.displayName,
            priceMonthly: c.priceMonthly,
            priceYearly: c.priceYearly,
            gumroadProductId: c.gumroadProductId,
            gumroadMonthlyUrl: c.gumroadMonthlyUrl,
            gumroadYearlyUrl: c.gumroadYearlyUrl,
            gumroadTierName: c.gumroadTierName,
            maxSites: c.maxSites,
            maxWaitlistEntries: c.maxWaitlistEntries,
            maxPages: c.maxPages,
            maxPaymentLinks: c.maxPaymentLinks,
            customDomain: c.customDomain,
            removeBranding: c.removeBranding,
            googleSheets: c.googleSheets,
            webhooks: c.webhooks,
            analytics: c.analytics,
            abTesting: c.abTesting,
            maxStorageMb: c.maxStorageMb,
            position: c.position,
            isActive: c.isActive,
          }))}
        />
      </div>
    </div>
  );
}
