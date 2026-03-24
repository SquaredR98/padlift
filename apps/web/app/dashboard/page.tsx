import Link from 'next/link';
import {
  Globe,
  Eye,
  Users,
  FileCheck,
  Plus,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { getAuthProfile } from '@/lib/api-auth';
import { sitesService } from '@/lib/service-container';
import { redirect } from 'next/navigation';
import { StatCard } from './components/ui/stat-card';
import { PageHeader } from './components/ui/page-header';
import { Badge } from './components/ui/badge';
import { EmptyState } from './components/ui/empty-state';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export default async function DashboardPage() {
  const profile = await getAuthProfile();
  if (!profile) redirect('/login');

  const sites = await sitesService.findByProfileId(profile.id);

  const totalVisitors = sites.reduce((sum, s) => sum + s._count.visitors, 0);
  const totalWaitlist = sites.reduce((sum, s) => sum + s._count.waitlistEntries, 0);
  const publishedCount = sites.filter((s) => s.publishedAt).length;
  const displayName = profile.name ?? profile.email.split('@')[0] ?? 'there';

  return (
    <div>
      <PageHeader
        title={`${getGreeting()}, ${displayName}`}
        description="Here's what's happening across your sites."
      />

      <div className="space-y-8 px-5 pb-8 pt-5">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Sites" value={sites.length} icon={Globe} />
        <StatCard label="Total Visitors" value={totalVisitors} icon={Eye} subtitle="all time" />
        <StatCard label="Waitlist Signups" value={totalWaitlist} icon={Users} />
        <StatCard label="Published" value={publishedCount} icon={FileCheck} subtitle={`of ${sites.length} sites`} />
      </div>

      {/* Recent sites */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Sites</h2>
          {sites.length > 0 && (
            <Link
              href="/dashboard/sites"
              className="flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        {sites.length === 0 ? (
          <EmptyState
            icon={Globe}
            title="No sites yet"
            description="Create your first site to start building a landing page, collecting waitlist entries, and launching your product."
            action={
              <Link
                href="/dashboard/sites/new"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Create your first site
              </Link>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sites.slice(0, 6).map((site) => (
              <Link
                key={site.id}
                href={`/dashboard/sites/${site.id}`}
                className="group rounded-lg border border-border bg-card p-5 transition hover:border-muted-foreground/30 hover:bg-card/80"
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-medium text-foreground group-hover:text-blue-400 transition">
                      {site.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-dimmed-foreground">/s/{site.slug}</p>
                  </div>
                  <Badge
                    variant={site.mode === 'WAITLIST' ? 'warning' : 'success'}
                    dot
                  >
                    {site.mode === 'WAITLIST' ? 'Waitlist' : 'Live'}
                  </Badge>
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-dimmed-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {site._count.visitors}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {site._count.waitlistEntries}
                  </span>
                  <Badge variant={site.publishedAt ? 'success' : 'default'}>
                    {site.publishedAt ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/dashboard/sites/new"
            className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition hover:border-blue-600/50 hover:bg-card/80"
          >
            <div className="rounded-lg bg-blue-600/10 p-2.5">
              <Plus className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Create new site</p>
              <p className="text-xs text-dimmed-foreground">Start with a template or blank page</p>
            </div>
          </Link>
          <Link
            href="/dashboard/settings"
            className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition hover:border-muted-foreground/30 hover:bg-card/80"
          >
            <div className="rounded-lg bg-purple-600/10 p-2.5">
              <Zap className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Account settings</p>
              <p className="text-xs text-dimmed-foreground">Manage your plan and preferences</p>
            </div>
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
}
