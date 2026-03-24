import { redirect } from 'next/navigation';
import { getAuthProfile } from '@/lib/api-auth';
import { sitesService } from '@/lib/service-container';
import { NotFoundError } from '@launchpad/services';
import { SiteContextProvider } from '../../components/site-context';
import { getPlanConfig } from '@/lib/plan-gate';

export default async function SiteLayout({
  params,
  children,
}: {
  params: Promise<{ siteId: string }>;
  children: React.ReactNode;
}) {
  const profile = await getAuthProfile();
  if (!profile) redirect('/login');

  const { siteId } = await params;

  let site;
  try {
    site = await sitesService.findById(siteId);
  } catch (err) {
    if (err instanceof NotFoundError) redirect('/dashboard/sites');
    throw err;
  }

  if (site.profileId !== profile.id) redirect('/dashboard/sites');

  const cfg = await getPlanConfig(profile.plan);

  return (
    <SiteContextProvider site={{
      id: site.id,
      name: site.name,
      slug: site.slug,
      planFeatures: {
        maxSites: cfg.maxSites,
        maxPages: cfg.maxPages,
        maxWaitlistEntries: cfg.maxWaitlistEntries,
        maxPaymentLinks: cfg.maxPaymentLinks,
        customDomain: cfg.customDomain,
        googleSheets: cfg.googleSheets,
        webhooks: cfg.webhooks,
        analytics: cfg.analytics,
        removeBranding: cfg.removeBranding,
      },
    }}>
      {children}
    </SiteContextProvider>
  );
}
