import { NextRequest, NextResponse } from 'next/server';
import { db } from '@launchpad/db';
import { getAuthProfile } from '@/lib/api-auth';
import { hasPermission, ADMIN_PERMISSIONS } from '@/lib/admin';

export async function GET(req: NextRequest) {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_SITES)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const url = req.nextUrl;
  const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1'));
  const pageSize = Math.min(50, Math.max(1, parseInt(url.searchParams.get('pageSize') ?? '25')));
  const search = url.searchParams.get('search') ?? '';
  const status = url.searchParams.get('status') ?? 'all';

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { slug: { contains: search, mode: 'insensitive' } },
      { profile: { email: { contains: search, mode: 'insensitive' } } },
    ];
  }

  if (status === 'published') {
    where.publishedAt = { not: null };
  } else if (status === 'draft') {
    where.publishedAt = null;
  }

  const [sites, total] = await Promise.all([
    db.site.findMany({
      where: where as any,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        slug: true,
        mode: true,
        publishedAt: true,
        customDomain: true,
        createdAt: true,
        profile: { select: { id: true, email: true, name: true } },
        _count: { select: { waitlistEntries: true, visitors: true, pages: true } },
      },
    }),
    db.site.count({ where: where as any }),
  ]);

  return NextResponse.json({ sites, total });
}
