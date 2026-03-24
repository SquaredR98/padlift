import { NextRequest, NextResponse } from 'next/server';
import { db } from '@launchpad/db';
import { getAuthProfile } from '@/lib/api-auth';
import { hasPermission, ADMIN_PERMISSIONS } from '@/lib/admin';
import { invalidatePlanCache } from '@/lib/plan-gate';

export async function GET() {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_PLANS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const plans = await db.planConfig.findMany({
      orderBy: { position: 'asc' },
    });
    return NextResponse.json(plans);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function PUT(req: NextRequest) {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_PLANS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const { id, ...data } = body;

  if (!id) {
    return NextResponse.json({ error: 'Missing plan config id' }, { status: 400 });
  }

  // Only allow updating specific fields
  const allowedFields = [
    'displayName',
    'priceMonthly',
    'priceYearly',
    'gumroadProductId',
    'gumroadMonthlyUrl',
    'gumroadYearlyUrl',
    'gumroadTierName',
    'maxSites',
    'maxWaitlistEntries',
    'maxPages',
    'maxPaymentLinks',
    'customDomain',
    'removeBranding',
    'googleSheets',
    'webhooks',
    'analytics',
    'abTesting',
    'maxStorageMb',
    'position',
    'isActive',
  ] as const;

  const updateData: Record<string, unknown> = {};
  for (const key of allowedFields) {
    if (key in data) {
      updateData[key] = data[key];
    }
  }

  let updated;
  try {
    updated = await db.planConfig.update({
      where: { id },
      data: updateData,
    });
  } catch (err) {
    console.error('[Admin Plans] Failed to update plan config:', err);
    return NextResponse.json({ error: 'Failed to update plan config' }, { status: 500 });
  }

  // Clear the cache so changes take effect immediately
  invalidatePlanCache();

  return NextResponse.json(updated);
}
