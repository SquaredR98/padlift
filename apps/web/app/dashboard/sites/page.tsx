import Link from 'next/link';
import { Plus, Globe, Users, Eye, ExternalLink } from 'lucide-react';
import { getAuthProfile } from '@/lib/api-auth';
import { sitesService } from '@/lib/service-container';
import { redirect } from 'next/navigation';
import { PageHeader } from '../components/ui/page-header';
import { Badge } from '../components/ui/badge';
import { EmptyState } from '../components/ui/empty-state';
import { getMaxSites } from '@/lib/plan-gate';
import { PlanLimitIndicator } from '@/components/plan-gate';

export default async function SitesPage() {
  const profile = await getAuthProfile();
  if (!profile) redirect('/login');

  const [sites, maxSites] = await Promise.all([
    sitesService.findByProfileId(profile.id),
    getMaxSites(profile.plan),
  ]);
  const atLimit = sites.length >= maxSites;

  return (
    <div>
      <PageHeader
        title="Sites"
        description={`${sites.length} site${sites.length !== 1 ? 's' : ''}`}
        actions={
          atLimit ? (
            <span className="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed">
              <Plus className="h-4 w-4" />
              New Site
            </span>
          ) : (
            <Link
              href="/dashboard/sites/new"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              New Site
            </Link>
          )
        }
      />
      <div className="space-y-6 px-5 pb-8 pt-5">

      <PlanLimitIndicator label="Sites" current={sites.length} max={maxSites} />

      {sites.length === 0 ? (
        <EmptyState
          icon={Globe}
          title="No sites yet"
          description="Create your first site to start building landing pages, collecting emails, and launching your product."
          action={
            <Link
              href="/dashboard/sites/new"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Create Site
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <Link
              key={site.id}
              href={`/dashboard/sites/${site.id}`}
              className="group relative rounded-lg border border-border bg-card transition hover:border-muted-foreground/30"
            >
              {/* Colored top accent */}
              <div
                className={`h-1 rounded-t-lg ${
                  site.mode === 'WAITLIST'
                    ? 'bg-linear-to-r from-yellow-500/60 to-yellow-600/30'
                    : 'bg-linear-to-r from-blue-500/60 to-blue-600/30'
                }`}
              />

              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-foreground transition group-hover:text-blue-400">
                      {site.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-dimmed-foreground">/s/{site.slug}</p>
                  </div>
                  <div className="ml-3 flex flex-col items-end gap-1.5">
                    <Badge
                      variant={site.mode === 'WAITLIST' ? 'warning' : 'success'}
                      dot
                    >
                      {site.mode === 'WAITLIST' ? 'Waitlist' : 'Live'}
                    </Badge>
                    <Badge variant={site.publishedAt ? 'info' : 'default'}>
                      {site.publishedAt ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                </div>

                {/* Stats row */}
                <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {site._count.visitors} visitors
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {site._count.waitlistEntries} signups
                  </span>
                </div>

                {/* Last updated */}
                <p className="mt-2 text-xs text-dimmed-foreground">
                  Updated {new Date(site.updatedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>

              {/* Quick external link */}
              {site.publishedAt && (
                <div className="absolute right-3 top-4 opacity-0 transition group-hover:opacity-100">
                  <span className="rounded-md bg-muted p-1">
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                  </span>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
