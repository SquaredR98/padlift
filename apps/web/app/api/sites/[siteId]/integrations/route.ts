import { NextRequest } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { sitesService, integrationsService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';

/**
 * GET /api/sites/:siteId/integrations
 * List all integrations for a site.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { siteId } = await params;

  try {
    const site = await sitesService.findById(siteId);
    if (site.profileId !== profile.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const integrations = await integrationsService.getIntegrations(siteId);
    // Strip credentials from response
    const safe = integrations.map(({ credentials, ...rest }) => rest);
    return Response.json(safe);
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
