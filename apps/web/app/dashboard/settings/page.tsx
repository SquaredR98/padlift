import { getAuthProfile } from '@/lib/api-auth';
import { redirect } from 'next/navigation';
import {
  User,
  Mail,
  CreditCard,
  Check,
  Crown,
  Zap,
  Building2,
  Star,
  Rocket,
} from 'lucide-react';
import { PageHeader } from '../components/ui/page-header';
import { Badge } from '../components/ui/badge';
import { getAllPlanConfigs, type PlanConfigData } from '@/lib/plan-gate';
import { UpgradeButton } from './_components/UpgradeButton';
import { TestimonialForm } from './_components/TestimonialForm';

function formatPrice(cents: number): string {
  if (cents === 0) return '$0';
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

function buildFeatureList(cfg: PlanConfigData): string[] {
  const features: string[] = [];
  const sites = cfg.maxSites >= 999999 ? 'Unlimited sites' : `${cfg.maxSites} site${cfg.maxSites === 1 ? '' : 's'}`;
  features.push(sites);
  const entries = cfg.maxWaitlistEntries >= 999999 ? 'Unlimited waitlist entries' : `${cfg.maxWaitlistEntries.toLocaleString()} waitlist entries`;
  features.push(entries);
  if (cfg.customDomain) features.push('Custom domain');
  if (cfg.googleSheets) features.push('Google Sheets sync');
  if (cfg.webhooks) features.push('Webhooks');
  if (cfg.removeBranding) features.push('No branding badge');
  if (cfg.analytics) features.push('Analytics dashboard');
  if (cfg.abTesting) features.push('A/B testing');
  return features;
}

const TIER_ICONS: Record<string, typeof Zap> = {
  FREE: Zap,
  LITE: Star,
  STARTER: Rocket,
  PRO: Crown,
  BUSINESS: Building2,
};

const TIER_COLORS: Record<string, string> = {
  FREE: 'border-border',
  LITE: 'border-green-800',
  STARTER: 'border-cyan-800',
  PRO: 'border-blue-800',
  BUSINESS: 'border-purple-800',
};

export default async function SettingsPage() {
  const profile = await getAuthProfile();
  if (!profile) redirect('/login');

  const planConfigs = await getAllPlanConfigs();

  return (
    <div>
      <PageHeader
        title="Account"
        description="Manage your profile and subscription."
      />

      <div className="space-y-8 px-5 pb-8 pt-5">
      <div className="max-w-3xl space-y-6">
        {/* Profile */}
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-5 py-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Profile</h2>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-xl font-bold text-foreground">
                {profile.name?.charAt(0)?.toUpperCase() ??
                  profile.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">
                  {profile.name ?? 'User'}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  {profile.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Plan */}
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Plan</h2>
            </div>
            <Badge
              variant={
                profile.plan === 'FREE'
                  ? 'default'
                  : profile.plan === 'PRO'
                    ? 'info'
                    : 'purple'
              }
            >
              {profile.plan}
            </Badge>
          </div>
          <div className="p-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {planConfigs.map((plan) => {
                const isCurrent = profile.plan === plan.tier;
                const isUpgrade = !isCurrent && plan.priceMonthly > 0;
                const Icon = TIER_ICONS[plan.tier] ?? Zap;
                const borderColor = TIER_COLORS[plan.tier] ?? 'border-border';
                const features = buildFeatureList(plan);

                return (
                  <div
                    key={plan.tier}
                    className={`relative rounded-lg border ${
                      isCurrent ? borderColor + ' bg-muted/30' : 'border-border'
                    } p-4`}
                  >
                    {plan.tier === 'PRO' && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                        Popular
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-semibold text-foreground">{plan.displayName}</p>
                    </div>
                    <p className="mt-1 text-2xl font-bold text-foreground">
                      {formatPrice(plan.priceMonthly)}
                      {plan.priceMonthly > 0 && <span className="text-sm font-normal text-muted-foreground">/mo</span>}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Check className="h-3 w-3 text-dimmed-foreground" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {isCurrent ? (
                      <div className="mt-4 rounded-md bg-muted py-1.5 text-center text-xs font-medium text-muted-foreground">
                        Current plan
                      </div>
                    ) : isUpgrade ? (
                      <UpgradeButton tier={plan.tier} />
                    ) : null}
                  </div>
                );
              })}
            </div>
            {profile.plan !== 'FREE' && (
              <p className="mt-4 text-xs text-muted-foreground">
                Manage your subscription from your payment provider dashboard. Changes sync automatically via webhook.
              </p>
            )}
          </div>
        </div>
        {/* Testimonial */}
        <TestimonialForm />
      </div>
      </div>
    </div>
  );
}
