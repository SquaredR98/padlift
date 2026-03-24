'use client';

import { useState, useEffect, useCallback } from 'react';
import { Eye, MousePointerClick, Users, TrendingUp, Lock, Loader2, Globe } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '../../../components/ui/page-header';
import { StatCard } from '../../../components/ui/stat-card';
import { MiniChart } from '../../../components/ui/mini-chart';
import { useSiteContext } from '../../../components/site-context';

interface AnalyticsData {
  visitors: number;
  visitorsAllTime: number;
  pageViews: number;
  signups: number;
  conversionRate: string;
  topReferrers: Array<{ referrer: string; count: number }>;
  topPages: Array<{ path: string; count: number }>;
  dailyVisitors: Array<{ day: string; count: number }>;
  period: string;
}

export default function AnalyticsPage() {
  const site = useSiteContext();
  const hasAnalytics = site?.planFeatures?.analytics ?? false;
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30d');

  const fetchData = useCallback(async () => {
    if (!site || !hasAnalytics) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/sites/${site.id}/analytics?period=${period}`);
      if (res.ok) {
        setData(await res.json());
      }
    } finally {
      setLoading(false);
    }
  }, [site, hasAnalytics, period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!hasAnalytics) {
    const placeholderBars = [2, 5, 3, 8, 6, 10, 7, 12, 9, 15, 11, 8];
    return (
      <div>
        <PageHeader
          title="Analytics"
          description="Track visitors, conversions, and growth."
        />
        <div className="px-5 pb-8 pt-5">
          <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card py-16">
            <div className="relative mb-6 w-full max-w-sm opacity-10">
              <MiniChart data={placeholderBars} height={80} />
            </div>
            <Lock className="h-10 w-10 text-amber-400/60" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Analytics is a Pro feature
            </h3>
            <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
              Upgrade to Pro to unlock visitor tracking, conversion rates, traffic sources, and more.
            </p>
            <Link
              href="/dashboard/settings"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Upgrade Plan
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div>
        <PageHeader title="Analytics" description="Track visitors, conversions, and growth." />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-dimmed-foreground" />
        </div>
      </div>
    );
  }

  const chartData = data?.dailyVisitors.map((d) => d.count) ?? [];

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Track visitors, conversions, and growth."
      />

      <div className="space-y-6 px-5 pb-8 pt-5">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Visitors"
            value={data?.visitors ?? 0}
            icon={Eye}
            subtitle={`${data?.visitorsAllTime ?? 0} all time`}
          />
          <StatCard label="Page Views" value={data?.pageViews ?? 0} icon={MousePointerClick} />
          <StatCard label="Waitlist Signups" value={data?.signups ?? 0} icon={Users} />
          <StatCard
            label="Conversion Rate"
            value={`${data?.conversionRate ?? '0'}%`}
            icon={TrendingUp}
            subtitle="visitors \u2192 signups"
          />
        </div>

        {/* Visitors chart */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Visitors over time</h3>
            <div className="flex gap-1 rounded-lg border border-border bg-background p-0.5">
              {(['7d', '30d', '90d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setPeriod(range)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    period === range
                      ? 'bg-muted text-foreground'
                      : 'text-dimmed-foreground hover:text-muted-foreground'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {chartData.length > 0 ? (
            <MiniChart data={chartData} height={160} />
          ) : (
            <div className="flex h-40 items-center justify-center text-sm text-dimmed-foreground">
              No visitor data yet. Data will appear once your site receives traffic.
            </div>
          )}
        </div>

        {/* Two-column: Top Pages + Traffic Sources */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Pages */}
          <div className="rounded-lg border border-border bg-card">
            <div className="border-b border-border px-4 py-3">
              <h3 className="text-sm font-medium text-muted-foreground">Top Pages</h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-dimmed-foreground">Path</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-dimmed-foreground">Views</th>
                </tr>
              </thead>
              <tbody>
                {data?.topPages && data.topPages.length > 0 ? (
                  data.topPages.map((p, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="px-4 py-2.5 text-foreground font-mono text-xs">{p.path}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{p.count}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-4 py-8 text-center text-sm text-dimmed-foreground">
                      No page data yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Traffic Sources */}
          <div className="rounded-lg border border-border bg-card">
            <div className="border-b border-border px-4 py-3">
              <h3 className="text-sm font-medium text-muted-foreground">Traffic Sources</h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-dimmed-foreground">Source</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-dimmed-foreground">Visitors</th>
                </tr>
              </thead>
              <tbody>
                {data?.topReferrers && data.topReferrers.length > 0 ? (
                  data.topReferrers.map((r, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <Globe className="h-3.5 w-3.5 text-dimmed-foreground" />
                          <span className="text-foreground text-xs">{r.referrer}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{r.count}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="px-4 py-8 text-center text-sm text-dimmed-foreground">
                      No traffic source data yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
