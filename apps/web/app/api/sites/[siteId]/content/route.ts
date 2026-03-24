import { NextRequest } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { sitesService, pagesService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';

// GET /api/sites/[siteId]/content — load template content
export async function GET(
  _req: NextRequest,
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

    return Response.json({
      templateId: site.templateId,
      templateContent: site.templateContent,
    });
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}

// PUT /api/sites/[siteId]/content — save template content
// Accepts optional `pageId` in body for per-page saves:
//   - With pageId: saves branding to Site.templateContent, blocks to Page.contentJson
//   - Without pageId: old behavior (saves full templateContent to site)
export async function PUT(
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

    if (!site.templateId) {
      return Response.json(
        { error: 'Site is not a template site' },
        { status: 400 },
      );
    }

    const body = await req.json();

    if (body.pageId) {
      // Per-page save: branding → site, blocks → page
      const page = await pagesService.findById(body.pageId);
      if (page.siteId !== siteId) {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }

      // Save branding to site (shared across all pages)
      await sitesService.saveTemplateContent(siteId, body.branding);

      // Save blocks to specific page
      const updatedPage = await pagesService.saveById(body.pageId, body.blocks);

      return Response.json({
        branding: body.branding,
        page: { id: updatedPage.id, contentJson: updatedPage.contentJson },
      });
    }

    // Legacy: save full templateContent to site
    const updated = await sitesService.saveTemplateContent(siteId, body.templateContent);

    return Response.json({ templateContent: updated.templateContent });
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
