import { NextRequest, NextResponse } from 'next/server';
import { db } from '@launchpad/db';
import { getAuthProfile } from '@/lib/api-auth';
import { hasPermission, getBootstrapAdminEmails, ADMIN_PERMISSIONS } from '@/lib/admin';
import { getAppSetting, setAppSetting } from '@/lib/app-settings';

export async function GET() {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_SETTINGS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const [admins, totalUsers, totalSites, totalEntries, paymentsEnabled] = await Promise.all([
    db.profile.findMany({
      where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        adminPermissions: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    }),
    db.profile.count(),
    db.site.count(),
    db.waitlistEntry.count(),
    getAppSetting('paymentsEnabled'),
  ]);

  return NextResponse.json({
    admins,
    bootstrapEmails: getBootstrapAdminEmails(),
    stats: { totalUsers, totalSites, totalEntries },
    paymentsEnabled: paymentsEnabled === 'true',
  });
}

export async function PATCH(req: NextRequest) {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.MANAGE_SETTINGS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();

  if ('paymentsEnabled' in body) {
    await setAppSetting('paymentsEnabled', body.paymentsEnabled ? 'true' : 'false');
  }

  return NextResponse.json({ ok: true });
}
