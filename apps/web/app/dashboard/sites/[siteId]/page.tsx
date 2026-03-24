import Link from 'next/link';
import {
  Paintbrush,
  Users,
  BarChart3,
  FlaskConical,
  Settings,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { sitesService, waitlistService } from '@/lib/service-container';
import { StatCard } from '../../components/ui/stat-card';
import { PageHeader } from '../../components/ui/page-header';
import { Badge } from '../../components/ui/badge';
import { RecentWaitlistTable, PaymentLinksSection } from '@/components/dashboard/site-overview-sections';

export default async function SiteOverviewPage({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const { siteId } = await params;

  const [site, waitlistCount, waitlistData] = await Promise.all([
    sitesService.findById(siteId),
    waitlistService.getCount(siteId),
    waitlistService.getEntries(siteId, { limit: 5 }),
  ]);

  const editorHref = `/dashboard/sites/${site.id}/edit`;

  const quickLinks = [
    { href: editorHref, label: 'Page Editor', description: 'Edit your page content and layout', icon: Paintbrush, color: 'bg-blue-600/10 text-blue-400' },
    { href: `/dashboard/sites/${site.id}/waitlist`, label: 'Waitlist', description: 'Manage signups & referrals', icon: Users, color: 'bg-green-600/10 text-green-400' },
    { href: `/dashboard/sites/${site.id}/analytics`, label: 'Analytics', description: 'Visitors, conversions, funnel', icon: BarChart3, color: 'bg-purple-600/10 text-purple-400' },
    { href: `/dashboard/sites/${site.id}/ab-tests`, label: 'A/B Tests', description: 'Test variants for revenue', icon: FlaskConical, color: 'bg-orange-600/10 text-orange-400' },
    { href: `/dashboard/sites/${site.id}/settings`, label: 'Settings', description: 'Domain, analytics, config', icon: Settings, color: 'bg-gray-600/10 text-gray-400' },
  ];

  return (
    <div>
      <PageHeader
        title={site.name}
        description={`/s/${site.slug}`}
        badge={<Badge variant={site.mode === 'WAITLIST' ? 'warning' : 'success'} dot>{site.mode === 'WAITLIST' ? 'Waitlist' : 'Live'}</Badge>}
        actions={
          <div className="flex items-center gap-2">
            <Link href={editorHref} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
              <Paintbrush className="h-4 w-4" />
              {site.templateId ? 'Edit Content' : 'Open Editor'}
            </Link>
            {site.publishedAt && (
              <a href={`/s/${site.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted">
                <ExternalLink className="h-3.5 w-3.5" /> View Live
              </a>
            )}
          </div>
        }
      />
      <div className="space-y-8 px-5 pb-8 pt-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Status" value={site.publishedAt ? 'Published' : 'Draft'} icon={Eye} subtitle={site.publishedAt ? `Since ${new Date(site.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : 'Not published yet'} />
          <StatCard label="Mode" value={site.mode === 'WAITLIST' ? 'Waitlist' : 'Live'} icon={Users} />
          <StatCard label="Waitlist Entries" value={waitlistCount} icon={Users} />
          <StatCard label="Pages" value={site.pages.length} icon={Paintbrush} />
        </div>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Manage</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition hover:border-muted-foreground/30">
                <div className={`rounded-lg p-2.5 ${link.color.split(' ')[0]}`}>
                  <link.icon className={`h-5 w-5 ${link.color.split(' ')[1]} transition group-hover:scale-110`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{link.label}</p>
                  <p className="text-xs text-dimmed-foreground">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <RecentWaitlistTable siteId={site.id} entries={waitlistData.entries} total={waitlistCount} />
        <PaymentLinksSection siteId={site.id} links={site.paymentLinks} />
      </div>
    </div>
  );
}
