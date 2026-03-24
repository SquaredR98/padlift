import { NextRequest } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';
import { integrationsService } from '@/lib/service-container';
import { ServiceError } from '@launchpad/services';

/**
 * DELETE /api/sites/:siteId/integrations/google
 * Disconnect Google Sheets integration.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> },
) {
  const profile = await getAuthProfile();
  if (!profile) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { siteId } = await params;

  try {
    await integrationsService.disconnectGoogleSheets(siteId, profile.id);
    return Response.json({ ok: true });
  } catch (err) {
    if (err instanceof ServiceError) {
      return Response.json({ error: err.message }, { status: err.statusCode });
    }
    throw err;
  }
}
