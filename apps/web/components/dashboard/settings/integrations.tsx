'use client';

import Link from 'next/link';
import { RefreshCw, Webhook, Link2 } from 'lucide-react';
import { SectionCard, FeatureGate, InputField } from './shared';

interface Integration {
  id: string;
  type: string;
  config: Record<string, unknown>;
  enabled: boolean;
  lastSyncAt: string | null;
  lastSyncError: string | null;
}

interface IntegrationsSectionProps {
  integrations: Integration[];
  webhookUrl: string;
  webhookSecret: string;
  syncing: boolean;
  savingWebhook: boolean;
  waitlistCount: number;
  maxWaitlistEntries: number;
  googleSheetsAllowed: boolean;
  webhooksAllowed: boolean;
  onWebhookUrlChange: (v: string) => void;
  onWebhookSecretChange: (v: string) => void;
  onConnectGoogle: () => void;
  onDisconnectGoogle: () => void;
  onSyncNow: () => void;
  onSaveWebhook: () => void;
  onRemoveWebhook: () => void;
}

export function IntegrationsSection({
  integrations,
  webhookUrl,
  webhookSecret,
  syncing,
  savingWebhook,
  waitlistCount,
  maxWaitlistEntries,
  googleSheetsAllowed,
  webhooksAllowed,
  onWebhookUrlChange,
  onWebhookSecretChange,
  onConnectGoogle,
  onDisconnectGoogle,
  onSyncNow,
  onSaveWebhook,
  onRemoveWebhook,
}: IntegrationsSectionProps) {
  const googleIntegration = integrations.find((i) => i.type === 'google_sheets');
  const webhookIntegration = integrations.find((i) => i.type === 'webhook');
  const isUnlimited = maxWaitlistEntries >= 999999;
  const pct = isUnlimited ? 0 : Math.min((waitlistCount / maxWaitlistEntries) * 100, 100);

  return (
    <SectionCard title="Integrations" icon={Link2}>
      <div className="space-y-5">
        <FeatureGate allowed={googleSheetsAllowed} feature="Google Sheets sync">
          <GoogleSheetsBlock
            integration={googleIntegration ?? null}
            syncing={syncing}
            onConnect={onConnectGoogle}
            onDisconnect={onDisconnectGoogle}
            onSync={onSyncNow}
          />
        </FeatureGate>

        <div className="border-t border-border" />

        <FeatureGate allowed={webhooksAllowed} feature="Webhooks">
          <WebhookBlock
            integration={webhookIntegration ?? null}
            webhookUrl={webhookUrl}
            webhookSecret={webhookSecret}
            saving={savingWebhook}
            onUrlChange={onWebhookUrlChange}
            onSecretChange={onWebhookSecretChange}
            onSave={onSaveWebhook}
            onRemove={onRemoveWebhook}
          />
        </FeatureGate>

        <div className="border-t border-border" />

        <WaitlistLimitBlock count={waitlistCount} max={maxWaitlistEntries} pct={pct} isUnlimited={isUnlimited} />
      </div>
    </SectionCard>
  );
}

function GoogleSheetsBlock({ integration, syncing, onConnect, onDisconnect, onSync }: {
  integration: Integration | null;
  syncing: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onSync: () => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" fill="#0F9D58" />
          <path d="M7 7h10M7 11h10M7 15h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-sm font-medium text-foreground">Google Sheets</span>
        {integration && (
          <span className="settings-connected-badge">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400" />
            Connected
          </span>
        )}
      </div>

      {integration ? (
        <div className="space-y-3">
          <div className="space-y-2 rounded-lg border border-border bg-background p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Spreadsheet ID</p>
                <p className="max-w-xs truncate font-mono text-sm text-foreground">
                  {(integration.config as { spreadsheetId?: string })?.spreadsheetId ?? '—'}
                </p>
              </div>
            </div>
            {integration.lastSyncAt && (
              <p className="text-xs text-dimmed-foreground">
                Last synced: {new Date(integration.lastSyncAt).toLocaleString()}
              </p>
            )}
            {integration.lastSyncError && (
              <p className="text-xs text-red-600 dark:text-red-400">Error: {integration.lastSyncError}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onSync} disabled={syncing} className="settings-btn-sync">
              <RefreshCw className={`h-3.5 w-3.5 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing...' : 'Sync Now'}
            </button>
            <button onClick={onDisconnect} className="settings-btn-danger-sm">Disconnect</button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-3 text-sm text-dimmed-foreground">
            Auto-sync waitlist signups to a Google Sheet. New entries appear instantly.
          </p>
          <button onClick={onConnect} className="settings-btn-sync">
            Connect Google Sheets
          </button>
        </div>
      )}
    </div>
  );
}

function WebhookBlock({ integration, webhookUrl, webhookSecret, saving, onUrlChange, onSecretChange, onSave, onRemove }: {
  integration: Integration | null;
  webhookUrl: string;
  webhookSecret: string;
  saving: boolean;
  onUrlChange: (v: string) => void;
  onSecretChange: (v: string) => void;
  onSave: () => void;
  onRemove: () => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Webhook className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Webhook</span>
        {integration && (
          <span className="settings-active-badge">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            Active
          </span>
        )}
      </div>
      <p className="mb-3 text-xs text-dimmed-foreground">
        Receive POST requests on waitlist signup. Compatible with Zapier, Make, n8n.
      </p>
      <div className="space-y-3">
        <InputField label="Webhook URL" value={webhookUrl} onChange={onUrlChange} placeholder="https://hooks.zapier.com/..." mono />
        <InputField label="Secret (optional)" value={webhookSecret} onChange={onSecretChange} placeholder="Used for X-Padlift-Signature HMAC" mono />
        {integration?.lastSyncError && (
          <p className="text-xs text-red-600 dark:text-red-400">Last error: {integration.lastSyncError}</p>
        )}
        <div className="flex items-center gap-2">
          <button onClick={onSave} disabled={!webhookUrl || saving} className="settings-btn-primary-sm">
            {saving ? 'Saving...' : integration ? 'Update Webhook' : 'Save Webhook'}
          </button>
          {integration && (
            <button onClick={onRemove} className="settings-btn-danger-sm">Remove</button>
          )}
        </div>
      </div>
    </div>
  );
}

function WaitlistLimitBlock({ count, max, pct, isUnlimited }: {
  count: number;
  max: number;
  pct: number;
  isUnlimited: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Waitlist Entries</span>
        <span className="text-xs text-muted-foreground">
          {count} / {isUnlimited ? '\u221e' : max}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: isUnlimited ? '0%' : `${pct}%`,
            backgroundColor: pct >= 90 ? '#ef4444' : pct >= 70 ? '#f59e0b' : '#22c55e',
          }}
        />
      </div>
      {!isUnlimited && count >= max * 0.8 && (
        <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
          Approaching limit.{' '}
          <Link href="/dashboard/settings" className="underline">Upgrade</Link> for more entries.
        </p>
      )}
    </div>
  );
}
