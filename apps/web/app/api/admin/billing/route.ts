import { NextResponse } from 'next/server';
import { db } from '@launchpad/db';
import { getAuthProfile } from '@/lib/api-auth';
import { hasPermission, ADMIN_PERMISSIONS } from '@/lib/admin';
import { getAllPlanConfigs } from '@/lib/plan-gate';

export async function GET() {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_BILLING)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const [planDistribution, planConfigs, subscriptions] = await Promise.all([
    db.profile.groupBy({ by: ['plan'], _count: { plan: true } }),
    getAllPlanConfigs(),
    db.profile.findMany({
      where: {
        OR: [
          { plan: 'LITE' },
          { plan: 'STARTER' },
          { plan: 'PRO' },
          { plan: 'BUSINESS' },
        ],
      },
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        gumroadSubscriptionId: true,
        gumroadCustomerId: true,
        planExpiresAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const counts: Record<string, number> = { FREE: 0, LITE: 0, STARTER: 0, PRO: 0, BUSINESS: 0 };
  planDistribution.forEach((p) => {
    counts[p.plan] = p._count.plan;
  });

  // Calculate MRR from all paid tiers
  let mrr = 0;
  const tierMrr: Record<string, number> = {};
  for (const cfg of planConfigs) {
    if (cfg.tier === 'FREE') continue;
    const monthly = cfg.priceMonthly / 100;
    const tierCount = counts[cfg.tier] ?? 0;
    tierMrr[cfg.tier] = tierCount * monthly;
    mrr += tierMrr[cfg.tier];
  }
  const arr = mrr * 12;

  return NextResponse.json({
    mrr,
    arr,
    tierMrr,
    paidUsers: (counts.LITE ?? 0) + (counts.STARTER ?? 0) + counts.PRO + counts.BUSINESS,
    freeUsers: counts.FREE,
    counts,
    subscriptions,
  });
}
