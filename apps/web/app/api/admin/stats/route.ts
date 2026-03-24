import { NextResponse } from 'next/server';
import { db } from '@launchpad/db';
import { getAuthProfile } from '@/lib/api-auth';
import { hasPermission, ADMIN_PERMISSIONS } from '@/lib/admin';

export async function GET() {
  const profile = await getAuthProfile();
  if (!profile || !hasPermission(profile, ADMIN_PERMISSIONS.VIEW_ANALYTICS)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    usersToday,
    usersThisWeek,
    usersThisMonth,
    totalSites,
    publishedSites,
    sitesToday,
    totalWaitlistEntries,
    waitlistToday,
    waitlistThisWeek,
    totalTemplatesClaimed,
    planDistribution,
    recentUsers,
    topSites,
  ] = await Promise.all([
    db.profile.count(),
    db.profile.count({ where: { createdAt: { gte: todayStart } } }),
    db.profile.count({ where: { createdAt: { gte: weekAgo } } }),
    db.profile.count({ where: { createdAt: { gte: monthAgo } } }),
    db.site.count(),
    db.site.count({ where: { publishedAt: { not: null } } }),
    db.site.count({ where: { createdAt: { gte: todayStart } } }),
    db.waitlistEntry.count(),
    db.waitlistEntry.count({ where: { joinedAt: { gte: todayStart } } }),
    db.waitlistEntry.count({ where: { joinedAt: { gte: weekAgo } } }),
    db.template.count({ where: { claimedAt: { not: null } } }),
    db.profile.groupBy({ by: ['plan'], _count: { plan: true } }),
    db.profile.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: { id: true, email: true, name: true, plan: true, createdAt: true, _count: { select: { sites: true } } },
    }),
    db.site.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        _count: { select: { waitlistEntries: true, visitors: true, pages: true } },
        profile: { select: { email: true } },
      },
    }),
  ]);

  return NextResponse.json({
    users: { total: totalUsers, today: usersToday, thisWeek: usersThisWeek, thisMonth: usersThisMonth },
    sites: { total: totalSites, published: publishedSites, today: sitesToday },
    waitlist: { total: totalWaitlistEntries, today: waitlistToday, thisWeek: waitlistThisWeek },
    templates: { claimed: totalTemplatesClaimed },
    plans: planDistribution.reduce((acc, p) => ({ ...acc, [p.plan]: p._count.plan }), {} as Record<string, number>),
    recentUsers,
    topSites: topSites.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      ownerEmail: s.profile.email,
      published: !!s.publishedAt,
      waitlistEntries: s._count.waitlistEntries,
      visitors: s._count.visitors,
      pages: s._count.pages,
      createdAt: s.createdAt,
    })),
  });
}
