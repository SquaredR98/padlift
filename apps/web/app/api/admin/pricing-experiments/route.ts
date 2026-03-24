import { NextRequest, NextResponse } from 'next/server';
import { db } from '@launchpad/db';
import { getAuthProfile } from '@/lib/api-auth';
import { hasPermission, ADMIN_PERMISSIONS } from '@/lib/admin';

export async function GET() {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_PLANS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const experiments = await db.pricingExperiment.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(experiments);
}

export async function POST(req: NextRequest) {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_PLANS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const { name, weight, isActive, variants } = body;

  if (!name || !variants) {
    return NextResponse.json({ error: 'name and variants required' }, { status: 400 });
  }

  const experiment = await db.pricingExperiment.create({
    data: {
      name,
      weight: weight ?? 1,
      isActive: isActive ?? false,
      variants: variants as any,
    },
  });

  return NextResponse.json(experiment, { status: 201 });
}
