import { NextRequest, NextResponse } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { hasPermission, ADMIN_PERMISSIONS } from '@/lib/admin';
import { featureRequestsService } from '@/lib/service-container';
import type { FeatureStatus } from '@prisma/client';

const VALID_STATUSES: FeatureStatus[] = ['OPEN', 'PLANNED', 'IN_PROGRESS', 'SHIPPED', 'DECLINED'];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_SETTINGS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  if (body.status && VALID_STATUSES.includes(body.status)) {
    const r = await featureRequestsService.updateStatus(id, body.status);
    return NextResponse.json({ request: r });
  }

  return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_SETTINGS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  await featureRequestsService.delete(id);
  return NextResponse.json({ ok: true });
}
