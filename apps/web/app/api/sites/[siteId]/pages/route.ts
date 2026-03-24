import { NextRequest } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { sitesService, pagesService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';

// GET /api/sites/[siteId]/pages — list all pages for a site
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

    const pages = await pagesService.listBySite(siteId);
    return Response.json(pages);
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}

// POST /api/sites/[siteId]/pages — create a new sub-page
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

    const body = await req.json();
    const { slug, title } = body;

    if (!slug || !title) {
      return Response.json({ error: 'slug and title are required' }, { status: 400 });
    }

    const page = await pagesService.createPage(siteId, slug, title);
    return Response.json(page, { status: 201 });
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
