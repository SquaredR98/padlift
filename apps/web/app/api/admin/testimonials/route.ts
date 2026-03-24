import { NextRequest, NextResponse } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { hasPermission, ADMIN_PERMISSIONS } from '@/lib/admin';
import { testimonialsService } from '@/lib/service-container';
import type { TestimonialStatus } from '@prisma/client';

export async function GET(req: NextRequest) {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_SETTINGS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const url = req.nextUrl;
  const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1'));
  const pageSize = Math.min(50, Math.max(1, parseInt(url.searchParams.get('pageSize') ?? '25')));
  const status = url.searchParams.get('status') as TestimonialStatus | null;

  const { items, total } = await testimonialsService.list({
    status: status ?? undefined,
    page,
    pageSize,
  });

  return NextResponse.json({ items, total });
}
