import { NextRequest, NextResponse } from 'next/server';
import { db } from '@launchpad/db';
import { getAuthProfile } from '@/lib/api-auth';
import { canUseAnalytics } from '@/lib/plan-gate';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { siteId } = await params;

  // Verify ownership
  const site = await db.site.findUnique({ where: { id: siteId }, select: { profileId: true } });
  if (!site || site.profileId !== profile.id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // Plan gate
  const allowed = await canUseAnalytics(profile.plan);
  if (!allowed) {
    return NextResponse.json({ error: 'Analytics requires an upgrade' }, { status: 403 });
  }

  // Parse date range
  const url = new URL(req.url);
  const period = url.searchParams.get('period') || '30d';
  const daysMap: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90 };
  const days = daysMap[period] || 30;
  const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const [
    totalVisitors,
    totalPageViews,
    totalSignups,
    visitors,
    topReferrers,
    topPages,
    dailyVisitors,
  ] = await Promise.all([
    // Total unique visitors
    db.visitor.count({ where: { siteId, firstSeen: { gte: from } } }),
    // Total page views
    db.analyticsEvent.count({
      where: { siteId, eventName: 'page_view', timestamp: { gte: from } },
    }),
    // Waitlist signups in the same period
    db.waitlistEntry.count({ where: { siteId, joinedAt: { gte: from } } }),
    // All-time visitors
    db.visitor.count({ where: { siteId } }),
    // Top referrers
    db.visitor.groupBy({
      by: ['referrer'],
      where: { siteId, firstSeen: { gte: from }, referrer: { not: null } },
      _count: { referrer: true },
      orderBy: { _count: { referrer: 'desc' } },
      take: 10,
    }),
    // Top pages
    db.analyticsEvent.groupBy({
      by: ['propertiesJson'],
      where: { siteId, eventName: 'page_view', timestamp: { gte: from } },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    }),
    // Daily visitor counts (raw query for date grouping)
    db.$queryRaw<Array<{ day: string; count: bigint }>>`
      SELECT DATE(first_seen) as day, COUNT(*) as count
      FROM visitors
      WHERE site_id = ${siteId} AND first_seen >= ${from}
      GROUP BY DATE(first_seen)
      ORDER BY day ASC
    `,
  ]);

  const conversionRate = totalVisitors > 0
    ? ((totalSignups / totalVisitors) * 100).toFixed(1)
    : '0';

  // Build daily data array for chart
  const dailyData = dailyVisitors.map((d) => ({
    day: String(d.day).slice(0, 10),
    count: Number(d.count),
  }));

  return NextResponse.json({
    visitors: totalVisitors,
    visitorsAllTime: visitors,
    pageViews: totalPageViews,
    signups: totalSignups,
    conversionRate,
    topReferrers: topReferrers.map((r) => ({
      referrer: r.referrer || 'Direct',
      count: r._count.referrer,
    })),
    topPages: topPages.map((p) => {
      const props = p.propertiesJson as Record<string, unknown> | null;
      return {
        path: (props?.path as string) || '/',
        count: p._count.id,
      };
    }),
    dailyVisitors: dailyData,
    period,
  });
}
