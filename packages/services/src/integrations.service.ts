import type { PrismaClient } from '@prisma/client';
import { NotFoundError, ForbiddenError, ValidationError } from './errors';
import { createHmac } from 'crypto';

interface GoogleTokens {
  access_token: string;
  refresh_token: string;
  expiry_date: number;
  token_type: string;
  scope: string;
}

interface SheetsConfig {
  spreadsheetId: string;
  sheetName: string;
}

interface WebhookConfig {
  url: string;
  secret?: string;
}

export class IntegrationsService {
  constructor(private db: PrismaClient) {}

  /* ── Google Sheets ──────────────────────────────── */

  async connectGoogleSheets(
    siteId: string,
    userId: string,
    tokens: GoogleTokens,
    spreadsheetId: string,
    sheetName: string,
  ) {
    // Verify ownership
    const site = await this.db.site.findUnique({ where: { id: siteId } });
    if (!site) throw new NotFoundError('Site', siteId);
    if (site.profileId !== userId) throw new ForbiddenError('Not your site');

    const config: SheetsConfig = { spreadsheetId, sheetName };

    return this.db.siteIntegration.upsert({
      where: { siteId_type: { siteId, type: 'google_sheets' } },
      create: { siteId, type: 'google_sheets', config: config as any, credentials: tokens as any },
      update: { config: config as any, credentials: tokens as any, enabled: true, lastSyncError: null },
    });
  }

  async disconnectGoogleSheets(siteId: string, userId: string) {
    const site = await this.db.site.findUnique({ where: { id: siteId } });
    if (!site) throw new NotFoundError('Site', siteId);
    if (site.profileId !== userId) throw new ForbiddenError('Not your site');

    await this.db.siteIntegration.deleteMany({
      where: { siteId, type: 'google_sheets' },
    });
  }

  async getGoogleSheetsIntegration(siteId: string) {
    return this.db.siteIntegration.findUnique({
      where: { siteId_type: { siteId, type: 'google_sheets' } },
    });
  }

  /**
   * Sync waitlist entries to Google Sheets.
   * Returns the number of rows appended.
   */
  async syncToGoogleSheets(siteId: string): Promise<{ rowsSynced: number }> {
    const integration = await this.db.siteIntegration.findUnique({
      where: { siteId_type: { siteId, type: 'google_sheets' } },
    });

    if (!integration || !integration.enabled) {
      return { rowsSynced: 0 };
    }

    const config = integration.config as unknown as SheetsConfig;
    const tokens = integration.credentials as unknown as GoogleTokens;

    if (!tokens?.access_token || !config?.spreadsheetId) {
      return { rowsSynced: 0 };
    }

    try {
      // Get entries since last sync (or all if first sync)
      const where: { siteId: string; joinedAt?: { gt: Date } } = { siteId };
      if (integration.lastSyncAt) {
        where.joinedAt = { gt: integration.lastSyncAt };
      }

      const entries = await this.db.waitlistEntry.findMany({
        where,
        orderBy: { position: 'asc' },
      });

      if (entries.length === 0) {
        return { rowsSynced: 0 };
      }

      // Check if token needs refresh
      let accessToken = tokens.access_token;
      if (tokens.expiry_date && Date.now() >= tokens.expiry_date - 60_000) {
        accessToken = await this.refreshGoogleToken(integration.id, tokens);
      }

      // If first sync, write headers first
      if (!integration.lastSyncAt) {
        await this.appendToSheet(
          accessToken,
          config.spreadsheetId,
          config.sheetName,
          [['Email', 'Position', 'Referral Code', 'Referral Count', 'Joined At']],
        );
      }

      // Append rows
      const rows = entries.map((e) => [
        e.email,
        String(e.position),
        e.referralCode,
        String(e.referralCount),
        e.joinedAt.toISOString(),
      ]);

      await this.appendToSheet(accessToken, config.spreadsheetId, config.sheetName, rows);

      // Update last sync
      await this.db.siteIntegration.update({
        where: { id: integration.id },
        data: { lastSyncAt: new Date(), lastSyncError: null },
      });

      return { rowsSynced: entries.length };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown sync error';
      await this.db.siteIntegration.update({
        where: { id: integration.id },
        data: { lastSyncError: message },
      });
      throw err;
    }
  }

  /**
   * Full re-sync: clear sheet and write all entries.
   */
  async fullSyncToGoogleSheets(siteId: string): Promise<{ rowsSynced: number }> {
    const integration = await this.db.siteIntegration.findUnique({
      where: { siteId_type: { siteId, type: 'google_sheets' } },
    });

    if (!integration || !integration.enabled) {
      return { rowsSynced: 0 };
    }

    const config = integration.config as unknown as SheetsConfig;
    const tokens = integration.credentials as unknown as GoogleTokens;

    if (!tokens?.access_token || !config?.spreadsheetId) {
      return { rowsSynced: 0 };
    }

    try {
      let accessToken = tokens.access_token;
      if (tokens.expiry_date && Date.now() >= tokens.expiry_date - 60_000) {
        accessToken = await this.refreshGoogleToken(integration.id, tokens);
      }

      // Clear existing data
      await this.clearSheet(accessToken, config.spreadsheetId, config.sheetName);

      // Get all entries
      const entries = await this.db.waitlistEntry.findMany({
        where: { siteId },
        orderBy: { position: 'asc' },
      });

      // Write headers + all data
      const rows = [
        ['Email', 'Position', 'Referral Code', 'Referral Count', 'Joined At'],
        ...entries.map((e) => [
          e.email,
          String(e.position),
          e.referralCode,
          String(e.referralCount),
          e.joinedAt.toISOString(),
        ]),
      ];

      await this.appendToSheet(accessToken, config.spreadsheetId, config.sheetName, rows);

      await this.db.siteIntegration.update({
        where: { id: integration.id },
        data: { lastSyncAt: new Date(), lastSyncError: null },
      });

      return { rowsSynced: entries.length };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown sync error';
      await this.db.siteIntegration.update({
        where: { id: integration.id },
        data: { lastSyncError: message },
      });
      throw err;
    }
  }

  private async refreshGoogleToken(integrationId: string, tokens: GoogleTokens): Promise<string> {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) throw new Error('Google OAuth not configured');

    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: tokens.refresh_token,
        grant_type: 'refresh_token',
      }),
    });

    if (!res.ok) {
      throw new Error(`Token refresh failed: ${res.status}`);
    }

    const data = await res.json();
    const updatedTokens: GoogleTokens = {
      ...tokens,
      access_token: data.access_token,
      expiry_date: Date.now() + (data.expires_in ?? 3600) * 1000,
    };

    await this.db.siteIntegration.update({
      where: { id: integrationId },
      data: { credentials: updatedTokens as any },
    });

    return data.access_token;
  }

  private async appendToSheet(
    accessToken: string,
    spreadsheetId: string,
    sheetName: string,
    rows: string[][],
  ) {
    const range = encodeURIComponent(`${sheetName}!A:E`);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: rows }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Sheets API append failed: ${res.status} ${text}`);
    }
  }

  private async clearSheet(accessToken: string, spreadsheetId: string, sheetName: string) {
    const range = encodeURIComponent(`${sheetName}!A:E`);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:clear`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Sheets API clear failed: ${res.status} ${text}`);
    }
  }

  /* ── Webhooks ───────────────────────────────────── */

  async setWebhook(siteId: string, userId: string, url: string, secret?: string) {
    const site = await this.db.site.findUnique({ where: { id: siteId } });
    if (!site) throw new NotFoundError('Site', siteId);
    if (site.profileId !== userId) throw new ForbiddenError('Not your site');

    if (!url.startsWith('https://')) {
      throw new ValidationError('Webhook URL must use HTTPS');
    }

    const config: WebhookConfig = { url, secret };

    return this.db.siteIntegration.upsert({
      where: { siteId_type: { siteId, type: 'webhook' } },
      create: { siteId, type: 'webhook', config: config as any },
      update: { config: config as any, enabled: true, lastSyncError: null },
    });
  }

  async removeWebhook(siteId: string, userId: string) {
    const site = await this.db.site.findUnique({ where: { id: siteId } });
    if (!site) throw new NotFoundError('Site', siteId);
    if (site.profileId !== userId) throw new ForbiddenError('Not your site');

    await this.db.siteIntegration.deleteMany({
      where: { siteId, type: 'webhook' },
    });
  }

  async getWebhookIntegration(siteId: string) {
    return this.db.siteIntegration.findUnique({
      where: { siteId_type: { siteId, type: 'webhook' } },
    });
  }

  /**
   * Fire webhook (fire-and-forget, 5s timeout).
   */
  async fireWebhook(siteId: string, event: string, payload: unknown): Promise<void> {
    const integration = await this.db.siteIntegration.findUnique({
      where: { siteId_type: { siteId, type: 'webhook' } },
    });

    if (!integration || !integration.enabled) return;

    const config = integration.config as unknown as WebhookConfig;
    if (!config?.url) return;

    const body = JSON.stringify({ event, data: payload, timestamp: new Date().toISOString() });

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (config.secret) {
      headers['X-Launchpad-Signature'] = createHmac('sha256', config.secret)
        .update(body)
        .digest('hex');
    }

    try {
      await fetch(config.url, {
        method: 'POST',
        headers,
        body,
        signal: AbortSignal.timeout(5000),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Webhook failed';
      await this.db.siteIntegration.update({
        where: { id: integration.id },
        data: { lastSyncError: message },
      }).catch(() => {});
    }
  }

  /* ── List all integrations ─────────────────────── */

  async getIntegrations(siteId: string) {
    return this.db.siteIntegration.findMany({ where: { siteId } });
  }
}
