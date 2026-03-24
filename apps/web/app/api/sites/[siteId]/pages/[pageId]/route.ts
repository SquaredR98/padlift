import { NextRequest } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { sitesService, pagesService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';

// GET /api/sites/[siteId]/pages/[pageId] — load page content
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ siteId: string; pageId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { siteId, pageId } = await params;
    const site = await sitesService.findById(siteId);

    if (site.profileId !== profile.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const page = await pagesService.findById(pageId);

    // Verify page belongs to this site
    if (page.siteId !== siteId) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    return Response.json(page);
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}

// PUT /api/sites/[siteId]/pages/[pageId] — save page content
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string; pageId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { siteId, pageId } = await params;
    const site = await sitesService.findById(siteId);

    if (site.profileId !== profile.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Verify page belongs to this site
    const existingPage = await pagesService.findById(pageId);
    if (existingPage.siteId !== siteId) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const page = await pagesService.saveById(pageId, body.contentJson);

    return Response.json(page);
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}

// DELETE /api/sites/[siteId]/pages/[pageId] — delete a sub-page
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ siteId: string; pageId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { siteId, pageId } = await params;
    const site = await sitesService.findById(siteId);

    if (site.profileId !== profile.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const page = await pagesService.findById(pageId);
    if (page.siteId !== siteId) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    await pagesService.deletePage(pageId);
    return Response.json({ success: true });
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
