import { Users, Globe, CreditCard, Settings2, Shield, TrendingUp, Mail } from 'lucide-react';
import { db } from '@launchpad/db';
import { PageHeader } from '../components/ui/page-header';
import { StatCard } from '../components/ui/stat-card';
import { Badge } from '../components/ui/badge';
import { QuickLinks, PlanDistribution, RecentUsers, RecentSites, GrowthSummary } from '@/components/dashboard/admin/overview-sections';

export default async function AdminOverviewPage() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalUsers, usersToday, usersThisWeek, usersThisMonth,
    totalSites, publishedSites, sitesToday,
    totalWaitlistEntries, waitlistToday, waitlistThisWeek,
    planDistribution, recentUsers, topSites, planConfigs,
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
    db.profile.groupBy({ by: ['plan'], _count: { plan: true } }),
    db.profile.findMany({
      orderBy: { createdAt: 'desc' }, take: 5,
      select: { id: true, email: true, name: true, plan: true, role: true, createdAt: true, _count: { select: { sites: true } } },
    }),
    db.site.findMany({
      orderBy: { createdAt: 'desc' }, take: 5,
      include: { _count: { select: { waitlistEntries: true, visitors: true } }, profile: { select: { email: true } } },
    }),
    db.planConfig?.findMany({ orderBy: { position: 'asc' } }).catch(() => []) ?? Promise.resolve([]),
  ]);

  const plans: Record<string, number> = { FREE: 0, LITE: 0, STARTER: 0, PRO: 0, BUSINESS: 0 };
  planDistribution.forEach((p) => { plans[p.plan] = p._count.plan; });

  let totalARR = 0;
  for (const cfg of planConfigs) {
    if (cfg.tier === 'FREE') continue;
    totalARR += (plans[cfg.tier] ?? 0) * cfg.priceMonthly * 12 / 100;
  }

  function timeAgo(date: Date) {
    const diff = now.getTime() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }

  const quickLinks = [
    { href: '/dashboard/admin/users', label: 'Users', description: 'Manage accounts and roles', icon: Users, color: 'bg-blue-600/10 text-blue-500' },
    { href: '/dashboard/admin/sites', label: 'Sites', description: 'Browse all sites', icon: Globe, color: 'bg-green-600/10 text-green-500' },
    { href: '/dashboard/admin/billing', label: 'Billing', description: 'Revenue and subscriptions', icon: CreditCard, color: 'bg-purple-600/10 text-purple-500' },
    { href: '/dashboard/admin/plans', label: 'Plans', description: 'Tiers, pricing, limits', icon: Settings2, color: 'bg-amber-600/10 text-amber-500' },
    { href: '/dashboard/admin/settings', label: 'Settings', description: 'Admin access and config', icon: Shield, color: 'bg-red-600/10 text-red-500' },
  ];

  return (
    <div>
      <PageHeader title="Admin" badge={<Badge variant="warning" dot>Super Admin</Badge>} />
      <div className="space-y-8 px-5 pb-8 pt-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Users" value={totalUsers} icon={Users} trend={usersToday > 0 ? { value: `${usersToday} today`, positive: true } : undefined} subtitle={`${usersThisWeek} this week`} />
          <StatCard label="Total Sites" value={totalSites} icon={Globe} trend={sitesToday > 0 ? { value: `${sitesToday} today`, positive: true } : undefined} subtitle={`${publishedSites} published`} />
          <StatCard label="Waitlist Entries" value={totalWaitlistEntries} icon={Mail} trend={waitlistToday > 0 ? { value: `${waitlistToday} today`, positive: true } : undefined} subtitle={`${waitlistThisWeek} this week`} />
          <StatCard label="Est. ARR" value={`$${totalARR.toFixed(0)}`} icon={TrendingUp} subtitle={`$${(totalARR / 12).toFixed(0)}/mo MRR`} />
        </div>
        <QuickLinks links={quickLinks} />
        <PlanDistribution plans={plans} totalUsers={totalUsers} />
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentUsers users={recentUsers} timeAgo={timeAgo} />
          <RecentSites sites={topSites} />
        </div>
        <GrowthSummary usersThisMonth={usersThisMonth} totalUsers={totalUsers} totalSites={totalSites} publishedSites={publishedSites} totalWaitlistEntries={totalWaitlistEntries} waitlistThisWeek={waitlistThisWeek} />
      </div>
    </div>
  );
}
