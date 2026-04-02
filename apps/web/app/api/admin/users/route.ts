import { NextRequest, NextResponse } from 'next/server';
import { db } from '@launchpad/db';
import { getAuthProfile } from '@/lib/api-auth';
import { hasPermission, ADMIN_PERMISSIONS } from '@/lib/admin';

export async function GET(req: NextRequest) {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_USERS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const url = req.nextUrl;
  const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1'));
  const pageSize = Math.min(50, Math.max(1, parseInt(url.searchParams.get('pageSize') ?? '25')));
  const search = url.searchParams.get('search') ?? '';
  const planFilter = url.searchParams.get('plan') ?? '';
  const roleFilter = url.searchParams.get('role') ?? '';

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { email: { contains: search, mode: 'insensitive' } },
      { name: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (planFilter && ['FREE', 'LITE', 'STARTER', 'PRO', 'BUSINESS'].includes(planFilter)) {
    where.plan = planFilter;
  }

  if (roleFilter && ['USER', 'ADMIN', 'SUPER_ADMIN'].includes(roleFilter)) {
    where.role = roleFilter;
  }

  const [users, total] = await Promise.all([
    db.profile.findMany({
      where: where as any,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        plan: true,
        role: true,
        adminPermissions: true,
        createdAt: true,
        updatedAt: true,
        gumroadSubscriptionId: true,
        planExpiresAt: true,
        _count: { select: { sites: true } },
      },
    }),
    db.profile.count({ where: where as any }),
  ]);

  return NextResponse.json({ users, total });
}
