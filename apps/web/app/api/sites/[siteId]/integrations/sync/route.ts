import { NextRequest } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { integrationsService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';

/**
 * POST /api/sites/:siteId/integrations/sync
 * Full re-sync all waitlist entries to Google Sheets.
 */
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { siteId } = await params;

  try {
    const result = await integrationsService.fullSyncToGoogleSheets(siteId);
    return Response.json(result);
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
