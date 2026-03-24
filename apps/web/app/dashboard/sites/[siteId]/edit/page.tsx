import { redirect } from 'next/navigation';
import { getAuthProfile } from '@/lib/api-auth';
import { getMaxPages } from '@/lib/plan-gate';
import { sitesService, pagesService } from '@/lib/service-container';
import { NotFoundError } from '@launchpad/services';
import { getPreset } from '@/lib/templates/presets';
import {
  isLegacyContent,
  migrateToPageData,
  createEmptyPageData,
  combinePageData,
  type PageData,
  type PageMeta,
  type TemplateBranding,
  type PageContent,
} from '@/lib/templates/block-types';
import BlockEditor from '@/components/dashboard/block-editor';

export default async function EditPage({
  params,
  searchParams,
}: {
  params: Promise<{ siteId: string }>;
  searchParams: Promise<{ pageId?: string }>;
}) {
  const profile = await getAuthProfile();
  if (!profile) redirect('/login');

  const { siteId } = await params;
  const { pageId: requestedPageId } = await searchParams;

  let site;
  try {
    site = await sitesService.findById(siteId);
  } catch (err) {
    if (err instanceof NotFoundError) redirect('/dashboard/sites');
    throw err;
  }

  if (site.profileId !== profile.id) redirect('/dashboard/sites');

  const maxPages = await getMaxPages(profile.plan);

  // ─── Build pages list ─────────────────────────────────
  const pagesList: PageMeta[] = site.pages.map((p) => ({
    id: p.id,
    slug: (p as Record<string, unknown>).slug as string | null,
    title: ((p as Record<string, unknown>).title as string) || 'Home',
    status: p.status,
  }));

  // Determine which page to load
  const activePageId = requestedPageId && pagesList.some((p) => p.id === requestedPageId)
    ? requestedPageId
    : pagesList[0]?.id;

  if (!activePageId) redirect('/dashboard/sites');

  const activePage = site.pages.find((p) => p.id === activePageId)!;

  // ─── Resolve PageData ───────────────────────────────────
  let pageData: PageData;
  const raw = site.templateContent as Record<string, unknown> | null;

  // Check if site uses new per-page model (branding only at site level)
  const isPerPageModel = raw && 'companyName' in raw && !('blocks' in raw);

  if (isPerPageModel) {
    // New model: branding from site.templateContent, blocks from page.contentJson
    const branding = raw as unknown as TemplateBranding;
    const pageContent = activePage.contentJson as Record<string, unknown> | null;
    const blocks = pageContent && 'blocks' in pageContent
      ? (pageContent as unknown as PageContent).blocks
      : [];
    pageData = combinePageData(branding, { blocks });
  } else if (raw && 'blocks' in raw && Array.isArray(raw.blocks)) {
    // Old single-page format (full PageData in templateContent)
    pageData = raw as unknown as PageData;
  } else if (raw && isLegacyContent(raw)) {
    // Legacy TemplateContent format — migrate
    const preset = site.templateId ? getPreset(site.templateId) : null;
    if (preset) {
      const legacySections = preset.blocks.map((b) => ({
        sectionId: b.blockType,
        props: b.content,
      }));
      pageData = migrateToPageData(
        legacySections,
        raw as { branding: { companyName: string; tagline: string; primaryColor: string; logoUrl: string | null }; sections: Record<string, Record<string, unknown>> },
      );
      // Persist migrated data so it's new format next time
      await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/sites/${siteId}/content`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ templateContent: pageData }),
        },
      ).catch(() => {});
    } else {
      pageData = createEmptyPageData();
    }
  } else {
    // No content or blank site
    pageData = createEmptyPageData();
    // Pre-populate company name from site name
    pageData.branding.companyName = site.name;
  }

  return (
    <BlockEditor
      siteId={siteId}
      siteName={site.name}
      siteSlug={site.slug}
      initialPageData={pageData}
      isPublished={!!site.publishedAt}
      pageId={activePageId}
      initialPages={pagesList}
      maxPages={maxPages}
    />
  );
}
