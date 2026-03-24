import Link from 'next/link';
import { Clock, Globe, Mail, ArrowRight } from 'lucide-react';
import { Badge } from '@/app/dashboard/components/ui/badge';

// ─── Quick Links ─────────────────────────────────────────────

export function QuickLinks({ links }: {
  links: { href: string; label: string; description: string; icon: React.ComponentType<{ className?: string }>; color: string }[];
}) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">Manage</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition hover:border-muted-foreground/30"
          >
            <div className={`rounded-lg p-2.5 ${link.color.split(' ')[0]}`}>
              <link.icon className={`h-5 w-5 ${link.color.split(' ')[1]} transition group-hover:scale-110`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{link.label}</p>
              <p className="text-xs text-dimmed-foreground">{link.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-dimmed-foreground transition group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Plan Distribution ───────────────────────────────────────

export function PlanDistribution({ plans, totalUsers }: { plans: Record<string, number>; totalUsers: number }) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">Plan Distribution</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <PlanCard label="Free" count={plans.FREE} total={totalUsers} />
        <PlanCard label="Pro" count={plans.PRO} total={totalUsers} variant="blue" />
        <PlanCard label="Business" count={plans.BUSINESS} total={totalUsers} variant="purple" />
      </div>
    </section>
  );
}

function PlanCard({ label, count, total, variant }: {
  label: string; count: number; total: number; variant?: 'blue' | 'purple';
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  const cls = variant === 'blue'
    ? 'border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/30'
    : variant === 'purple'
      ? 'border-purple-200 bg-purple-50 dark:border-purple-900/50 dark:bg-purple-950/30'
      : 'border-border bg-card';
  const textCls = variant === 'blue' ? 'text-blue-600 dark:text-blue-400' : variant === 'purple' ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground';
  const badgeCls = variant === 'blue' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : variant === 'purple' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' : 'bg-muted text-muted-foreground';
  const numCls = variant === 'blue' ? 'text-blue-700 dark:text-blue-300' : variant === 'purple' ? 'text-purple-700 dark:text-purple-300' : 'text-foreground';

  return (
    <div className={`rounded-lg border p-5 ${cls}`}>
      <div className="flex items-center justify-between">
        <p className={`text-sm font-medium ${textCls}`}>{label}</p>
        <span className={`rounded px-2 py-0.5 text-xs font-medium ${badgeCls}`}>{pct}%</span>
      </div>
      <p className={`mt-2 text-3xl font-bold ${numCls}`}>{count}</p>
    </div>
  );
}

// ─── Recent Tables ───────────────────────────────────────────

export function RecentUsers({ users, timeAgo }: {
  users: { id: string; email: string; name: string | null; plan: string; createdAt: Date }[];
  timeAgo: (d: Date) => string;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Clock className="h-4 w-4 text-dimmed-foreground" /> Recent Users
        </h2>
        <Link href="/dashboard/admin/users" className="text-sm text-muted-foreground transition hover:text-foreground">View all</Link>
      </div>
      <div className="rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium text-dimmed-foreground">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3 text-right">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border/50 last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/dashboard/admin/users/${user.id}`} className="hover:underline">
                    <p className="font-medium text-foreground">{user.name || 'Unnamed'}</p>
                    <p className="text-xs text-dimmed-foreground">{user.email}</p>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={user.plan === 'BUSINESS' ? 'purple' : user.plan === 'PRO' ? 'info' : 'default'}>{user.plan}</Badge>
                </td>
                <td className="px-4 py-3 text-right text-dimmed-foreground">{timeAgo(user.createdAt)}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-dimmed-foreground">No users yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function RecentSites({ sites }: {
  sites: { id: string; name: string; slug: string; publishedAt: Date | null; profile: { email: string }; _count: { waitlistEntries: number } }[];
}) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Globe className="h-4 w-4 text-dimmed-foreground" /> Recent Sites
        </h2>
        <Link href="/dashboard/admin/sites" className="text-sm text-muted-foreground transition hover:text-foreground">View all</Link>
      </div>
      <div className="rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium text-dimmed-foreground">
              <th className="px-4 py-3">Site</th>
              <th className="px-4 py-3">Waitlist</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site.id} className="border-b border-border/50 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{site.name}</p>
                  <p className="text-xs text-dimmed-foreground">{site.profile.email} &middot; /s/{site.slug}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-muted-foreground"><Mail className="h-3 w-3" />{site._count.waitlistEntries}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Badge variant={site.publishedAt ? 'success' : 'default'}>{site.publishedAt ? 'Live' : 'Draft'}</Badge>
                </td>
              </tr>
            ))}
            {sites.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-dimmed-foreground">No sites yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Growth Summary ──────────────────────────────────────────

export function GrowthSummary({ usersThisMonth, totalUsers, totalSites, publishedSites, totalWaitlistEntries, waitlistThisWeek }: {
  usersThisMonth: number; totalUsers: number; totalSites: number; publishedSites: number; totalWaitlistEntries: number; waitlistThisWeek: number;
}) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">Growth Summary</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Users (30d)</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{usersThisMonth}</p>
          <div className="mt-3 h-1.5 rounded-full bg-muted">
            <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${totalUsers > 0 ? Math.min((usersThisMonth / totalUsers) * 100, 100) : 0}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-dimmed-foreground">{totalUsers > 0 ? Math.round((usersThisMonth / totalUsers) * 100) : 0}% of all users</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Avg Sites/User</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{totalUsers > 0 ? (totalSites / totalUsers).toFixed(1) : '0'}</p>
          <p className="mt-3 text-xs text-dimmed-foreground">{publishedSites} published of {totalSites} total</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Avg Waitlist/Site</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{totalSites > 0 ? (totalWaitlistEntries / totalSites).toFixed(1) : '0'}</p>
          <p className="mt-3 text-xs text-dimmed-foreground">{waitlistThisWeek} entries this week</p>
        </div>
      </div>
    </section>
  );
}
