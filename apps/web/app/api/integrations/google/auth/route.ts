import { NextRequest } from 'next/server';
import { getAuthProfile } from '@/lib/api-auth';

/**
 * GET /api/integrations/google/auth?siteId=xxx
 * Redirects to Google OAuth consent screen for Sheets access.
 */
export async function GET(req: NextRequest) {
  const profile = await getAuthProfile();
  if (!profile) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const siteId = req.nextUrl.searchParams.get('siteId');
  if (!siteId) {
    return Response.json({ error: 'siteId is required' }, { status: 400 });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return Response.json(
      { error: 'Google OAuth is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_REDIRECT_URI.' },
      { status: 500 },
    );
  }

  // Encode siteId + userId in state param
  const state = Buffer.from(JSON.stringify({ siteId, userId: profile.id })).toString('base64url');

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    access_type: 'offline',
    prompt: 'consent',
    state,
  });

  return Response.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
