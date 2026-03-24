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

  const counts: Record<string, number> = { FREE: 0, PRO: 0, BUSINESS: 0 };
  planDistribution.forEach((p) => {
    counts[p.plan] = p._count.plan;
  });

  const proConfig = planConfigs.find((c) => c.tier === 'PRO');
  const bizConfig = planConfigs.find((c) => c.tier === 'BUSINESS');

  const proMonthly = proConfig ? proConfig.priceMonthly / 100 : 0;
  const bizMonthly = bizConfig ? bizConfig.priceMonthly / 100 : 0;

  const proMrr = counts.PRO * proMonthly;
  const bizMrr = counts.BUSINESS * bizMonthly;
  const mrr = proMrr + bizMrr;
  const arr = mrr * 12;

  return NextResponse.json({
    mrr,
    arr,
    proMrr,
    bizMrr,
    paidUsers: counts.PRO + counts.BUSINESS,
    freeUsers: counts.FREE,
    counts,
    subscriptions,
  });
}
