import { NextRequest } from 'next/server';
import { sitesService } from '@/lib/service-container';
import { renderSiteHtml } from '@/lib/render-site';
import { ServiceError } from '@launchpad/services';
import { canRemoveBranding, canUseAnalytics } from '@/lib/plan-gate';
import { db } from '@launchpad/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  let site;
  try {
    site = await sitesService.findBySlug(slug);
  } catch (err) {
    if (err instanceof ServiceError && err.statusCode === 404) {
      return new Response('Site not found', { status: 404 });
    }
    throw err;
  }

  if (!site.publishedAt) {
    return new Response('Site not published', { status: 404 });
  }

  // Extract theme and font from branding in templateContent
  const tc = site.templateContent as Record<string, unknown> | null;
  // New per-page model stores branding at root level; old model nests it under .branding
  const branding = (tc && 'companyName' in tc ? tc : (tc?.branding ?? {})) as Record<string, unknown>;
  const defaultTheme = (branding.defaultTheme as 'dark' | 'light') || 'dark';
  const headingFont = (branding.headingFont as string) || (branding.fontFamily as string) || 'Inter';
  const bodyFont = (branding.bodyFont as string) || (branding.fontFamily as string) || 'Inter';

  // Check plan features for badge and analytics
  const owner = await db.profile.findUnique({ where: { id: site.profileId }, select: { plan: true } });
  const showBadge = owner ? !(await canRemoveBranding(owner.plan)) : true;
  const analyticsEnabled = owner ? await canUseAnalytics(owner.plan) : false;

  // Find homepage (slug=null) among published pages
  const homepageIndex = site.pages.findIndex((p: Record<string, unknown>) => p.slug === null || p.slug === undefined);
  const response = renderSiteHtml({
    ...site,
    defaultTheme,
    headingFont,
    bodyFont,
    showBadge,
    analyticsEnabled,
  }, homepageIndex >= 0 ? homepageIndex : 0);
  if (!response) {
    return new Response('No published content', { status: 404 });
  }

  return response;
}
