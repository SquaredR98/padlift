import { NextRequest } from 'next/server';
import { integrationsService, sitesService } from '@/lib/service-container';

/**
 * GET /api/integrations/google/callback
 * Google OAuth callback — exchanges code for tokens, creates spreadsheet, saves integration.
 */
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const stateParam = req.nextUrl.searchParams.get('state');
  const error = req.nextUrl.searchParams.get('error');

  if (error) {
    return Response.redirect(
      new URL('/dashboard/sites?error=google_auth_denied', req.nextUrl.origin),
    );
  }

  if (!code || !stateParam) {
    return Response.redirect(
      new URL('/dashboard/sites?error=missing_params', req.nextUrl.origin),
    );
  }

  let state: { siteId: string; userId: string };
  try {
    state = JSON.parse(Buffer.from(stateParam, 'base64url').toString());
  } catch {
    return Response.redirect(
      new URL('/dashboard/sites?error=invalid_state', req.nextUrl.origin),
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return Response.redirect(
      new URL('/dashboard/sites?error=oauth_not_configured', req.nextUrl.origin),
    );
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      console.error('Google token exchange failed:', text);
      return Response.redirect(
        new URL(`/dashboard/sites/${state.siteId}/settings?error=token_exchange_failed`, req.nextUrl.origin),
      );
    }

    const tokenData = await tokenRes.json();
    const tokens = {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expiry_date: Date.now() + (tokenData.expires_in ?? 3600) * 1000,
      token_type: tokenData.token_type,
      scope: tokenData.scope,
    };

    // Get site name for spreadsheet title
    const site = await sitesService.findById(state.siteId);
    const sheetTitle = `${site.name} — Waitlist`;

    // Create a new Google Spreadsheet
    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: { title: sheetTitle },
        sheets: [{ properties: { title: 'Waitlist' } }],
      }),
    });

    if (!createRes.ok) {
      const text = await createRes.text();
      console.error('Sheets creation failed:', text);
      return Response.redirect(
        new URL(`/dashboard/sites/${state.siteId}/settings?error=sheet_creation_failed`, req.nextUrl.origin),
      );
    }

    const sheetData = await createRes.json();
    const spreadsheetId = sheetData.spreadsheetId;

    // Save integration to database
    await integrationsService.connectGoogleSheets(
      state.siteId,
      state.userId,
      tokens,
      spreadsheetId,
      'Waitlist',
    );

    // Redirect back to site settings with success
    return Response.redirect(
      new URL(`/dashboard/sites/${state.siteId}/settings?google_connected=true`, req.nextUrl.origin),
    );
  } catch (err) {
    console.error('Google OAuth callback error:', err);
    return Response.redirect(
      new URL(`/dashboard/sites/${state.siteId}/settings?error=oauth_failed`, req.nextUrl.origin),
    );
  }
}
