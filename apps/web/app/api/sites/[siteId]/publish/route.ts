import { NextRequest } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { sitesService, pagesService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';
import { renderPageToHtml } from '@/lib/render-page-html';
import { isLegacyContent, migrateToPageData, type PageData, type TemplateBranding } from '@/lib/templates/block-types';
import { getPreset, buildPageDataFromPreset } from '@/lib/templates/presets';

// POST /api/sites/[siteId]/publish — publish site
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { siteId } = await params;
    const site = await sitesService.findById(siteId);

    if (site.profileId !== profile.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (site.pages.length > 0) {
      const raw = site.templateContent as Record<string, unknown> | null;

      // Check if this site uses the new per-page content model
      // (branding stored at site level, blocks stored per-page)
      const isPerPageModel = raw && 'companyName' in raw && !('blocks' in raw);

      if (isPerPageModel) {
        // New multi-page model: branding in site.templateContent, blocks in each page.contentJson
        const branding = raw as unknown as TemplateBranding;

        for (const page of site.pages) {
          const pageContent = page.contentJson as Record<string, unknown> | null;
          const blocks = pageContent && 'blocks' in pageContent
            ? (pageContent as { blocks: unknown[] }).blocks
            : [];

          if (Array.isArray(blocks) && blocks.length > 0) {
            const pageData: PageData = {
              branding,
              blocks: blocks as PageData['blocks'],
            };
            const html = await renderPageToHtml(pageData);
            await pagesService.publishPage(page.id, html, '', '');
          } else {
            // Empty page — publish with empty HTML
            await pagesService.publishPage(page.id, '', '', '');
          }
        }
      } else {
        // Legacy single-page model: full PageData in site.templateContent
        let pageData: PageData | null = null;

        if (raw && 'blocks' in raw && Array.isArray(raw.blocks)) {
          pageData = raw as unknown as PageData;
        } else if (raw && isLegacyContent(raw)) {
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
          }
        } else if (site.templateId) {
          pageData = buildPageDataFromPreset(site.templateId);
        }

        if (pageData) {
          const html = await renderPageToHtml(pageData);
          await pagesService.publishPage(site.pages[0].id, html, '', '');
        } else {
          let body: { html?: string; css?: string; js?: string } = {};
          try {
            body = await req.json();
          } catch {
            // No body
          }
          if (body.html) {
            await pagesService.publishPage(
              site.pages[0].id,
              body.html,
              body.css ?? '',
              body.js ?? '',
            );
          }
        }
      }
    }

    const published = await sitesService.publish(siteId);
    return Response.json(published);
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
