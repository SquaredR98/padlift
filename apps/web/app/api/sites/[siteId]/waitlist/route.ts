import { NextRequest } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { sitesService, waitlistService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';

// GET /api/sites/[siteId]/waitlist — list waitlist entries (paginated)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { siteId } = await params;
    const site = await sitesService.findById(siteId);
    if (site.profileId !== profile.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') ?? '50', 10);
    const offset = parseInt(url.searchParams.get('offset') ?? '0', 10);
    const search = url.searchParams.get('search') ?? '';

    const result = await waitlistService.getEntries(siteId, { limit, offset, search });
    return Response.json(result);
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
