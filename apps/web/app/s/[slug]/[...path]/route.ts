import { NextRequest } from 'next/server';
import { sitesService } from '@/lib/service-container';
import { renderSiteHtml } from '@/lib/render-site';
import { ServiceError } from '@launchpad/services';
import { canRemoveBranding, canUseAnalytics } from '@/lib/plan-gate';
import { db } from '@launchpad/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string; path: string[] }> },
) {
  const { slug, path } = await params;
  const pageSlug = path[0]; // e.g. "about" from /s/my-site/about

  if (!pageSlug) {
    return new Response('Page not found', { status: 404 });
  }

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

  // Find the sub-page by slug
  const pageIndex = site.pages.findIndex(
    (p: Record<string, unknown>) => p.slug === pageSlug,
  );

  if (pageIndex < 0) {
    return new Response('Page not found', { status: 404 });
  }

  // Extract theme and font from branding
  const tc = site.templateContent as Record<string, unknown> | null;
  const branding = (tc && 'companyName' in tc ? tc : (tc?.branding ?? {})) as Record<string, unknown>;
  const defaultTheme = (branding.defaultTheme as 'dark' | 'light') || 'dark';
  const headingFont = (branding.headingFont as string) || (branding.fontFamily as string) || 'Inter';
  const bodyFont = (branding.bodyFont as string) || (branding.fontFamily as string) || 'Inter';

  // Check plan features for badge and analytics
  const owner = await db.profile.findUnique({ where: { id: site.profileId }, select: { plan: true } });
  const showBadge = owner ? !(await canRemoveBranding(owner.plan)) : true;
  const analyticsEnabled = owner ? await canUseAnalytics(owner.plan) : false;

  const response = renderSiteHtml({
    ...site,
    defaultTheme,
    headingFont,
    bodyFont,
    showBadge,
    analyticsEnabled,
  }, pageIndex);

  if (!response) {
    return new Response('No published content', { status: 404 });
  }

  return response;
}
