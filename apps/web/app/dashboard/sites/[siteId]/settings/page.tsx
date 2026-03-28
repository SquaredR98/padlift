'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, Globe, BarChart3, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSiteContext } from '../../../components/site-context';
import { PageHeader } from '../../../components/ui/page-header';
import { SectionCard, FeatureGate, InputField } from '@/components/dashboard/settings/shared';
import { IntegrationsSection } from '@/components/dashboard/settings/integrations';
import { PaymentLinksSection } from '@/components/dashboard/settings/payment-links';
import { DangerZoneSection } from '@/components/dashboard/settings/danger-zone';
import '@/components/dashboard/settings/styles.css';

interface SiteSettings {
  id: string;
  name: string;
  slug: string;
  customDomain: string | null;
  ga4MeasurementId: string | null;
  gtmContainerId: string | null;
  clarityProjectId: string | null;
  paymentLinks: { id: string; planName: string; price: number; billingCycle: string; stripeUrl: string }[];
}

interface Integration {
  id: string;
  type: string;
  config: Record<string, unknown>;
  enabled: boolean;
  lastSyncAt: string | null;
  lastSyncError: string | null;
}

export default function SiteSettingsPage() {
  const site = useSiteContext();
  const pf = site?.planFeatures;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  const [name, setName] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [ga4, setGa4] = useState('');
  const [gtm, setGtm] = useState('');
  const [clarity, setClarity] = useState('');

  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookSecret, setWebhookSecret] = useState('');
  const [savingWebhook, setSavingWebhook] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(0);

  const fetchIntegrations = useCallback(async () => {
    if (!site) return;
    const res = await fetch(`/api/sites/${site.id}/integrations`);
    if (res.ok) {
      const data = await res.json();
      setIntegrations(data);
      const wh = data.find((i: Integration) => i.type === 'webhook');
      if (wh) {
        setWebhookUrl((wh.config as { url?: string })?.url ?? '');
        setWebhookSecret('');
      }
    }
    const wcRes = await fetch(`/api/sites/${site.id}/waitlist?limit=0`);
    if (wcRes.ok) {
      const wc = await wcRes.json();
      setWaitlistCount(wc.total ?? 0);
    }
  }, [site]);

  const fetchSettings = useCallback(async () => {
    if (!site) return;
    const res = await fetch(`/api/sites/${site.id}`);
    if (res.ok) {
      const data = await res.json();
      setSettings(data);
      setName(data.name);
      setCustomDomain(data.customDomain ?? '');
      setGa4(data.ga4MeasurementId ?? '');
      setGtm(data.gtmContainerId ?? '');
      setClarity(data.clarityProjectId ?? '');
    }
    setLoading(false);
  }, [site]);

  useEffect(() => {
    fetchSettings();
    fetchIntegrations();
  }, [fetchSettings, fetchIntegrations]);

  const handleSave = async () => {
    if (!site) return;
    setSaving(true);
    try {
      await fetch(`/api/sites/${site.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          customDomain: customDomain || null,
          ga4MeasurementId: ga4 || null,
          gtmContainerId: gtm || null,
          clarityProjectId: clarity || null,
        }),
      });
      await fetchSettings();
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSite = async () => {
    if (!site) return;
    await fetch(`/api/sites/${site.id}`, { method: 'DELETE' });
    router.push('/dashboard/sites');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-dimmed-foreground" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your site configuration."
        actions={
          <button onClick={handleSave} disabled={saving} className="settings-save-btn">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </button>
        }
      />

      <div className="space-y-6 px-5 pb-8 pt-5">
        <div className="max-w-2xl space-y-6">
          <SectionCard title="General" icon={Globe}>
            <div className="space-y-4">
              <InputField label="Site Name" value={name} onChange={setName} />
              <InputField label="URL Slug" value={settings?.slug ?? ''} readOnly mono />
            </div>
          </SectionCard>

          <FeatureGate allowed={pf?.customDomain ?? false} feature="Custom domains">
            <SectionCard title="Custom Domain" icon={Globe}>
              <InputField label="Domain" value={customDomain} onChange={setCustomDomain} placeholder="app.yourdomain.com" mono />
              <p className="mt-2 text-xs text-dimmed-foreground">
                Point your domain&apos;s CNAME record to your Padlift URL, then enter it here.
              </p>
            </SectionCard>
          </FeatureGate>

          <SectionCard title="Analytics" icon={BarChart3}>
            <div className="space-y-4">
              <InputField label="GA4 Measurement ID" value={ga4} onChange={setGa4} placeholder="G-XXXXXXXXXX" mono />
              <InputField label="GTM Container ID" value={gtm} onChange={setGtm} placeholder="GTM-XXXXXXX" mono />
              <InputField label="Clarity Project ID" value={clarity} onChange={setClarity} placeholder="xxxxxxxxxx" mono />
            </div>
          </SectionCard>

          <IntegrationsSection
            integrations={integrations}
            webhookUrl={webhookUrl}
            webhookSecret={webhookSecret}
            syncing={syncing}
            savingWebhook={savingWebhook}
            waitlistCount={waitlistCount}
            maxWaitlistEntries={pf?.maxWaitlistEntries ?? 100}
            googleSheetsAllowed={pf?.googleSheets ?? false}
            webhooksAllowed={pf?.webhooks ?? false}
            onWebhookUrlChange={setWebhookUrl}
            onWebhookSecretChange={setWebhookSecret}
            onConnectGoogle={() => site && (window.location.href = `/api/integrations/google/auth?siteId=${site.id}`)}
            onDisconnectGoogle={async () => {
              if (!site) return;
              await fetch(`/api/sites/${site.id}/integrations/google`, { method: 'DELETE' });
              await fetchIntegrations();
            }}
            onSyncNow={async () => {
              if (!site) return;
              setSyncing(true);
              try {
                await fetch(`/api/sites/${site.id}/integrations/sync`, { method: 'POST' });
                await fetchIntegrations();
              } finally {
                setSyncing(false);
              }
            }}
            onSaveWebhook={async () => {
              if (!site || !webhookUrl) return;
              setSavingWebhook(true);
              try {
                await fetch(`/api/sites/${site.id}/integrations/webhook`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ url: webhookUrl, secret: webhookSecret || undefined }),
                });
                await fetchIntegrations();
              } finally {
                setSavingWebhook(false);
              }
            }}
            onRemoveWebhook={async () => {
              if (!site) return;
              await fetch(`/api/sites/${site.id}/integrations/webhook`, { method: 'DELETE' });
              setWebhookUrl('');
              setWebhookSecret('');
              await fetchIntegrations();
            }}
          />

          <PaymentLinksSection />

          <DangerZoneSection
            siteName={settings?.name ?? ''}
            onDelete={handleDeleteSite}
          />
        </div>
      </div>
    </div>
  );
}
