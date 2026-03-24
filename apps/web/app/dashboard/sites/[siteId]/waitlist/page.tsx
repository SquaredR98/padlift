'use client';

import { useState, useEffect, useCallback } from 'react';
import { Download, Search, Users, TrendingUp, Trophy } from 'lucide-react';
import { useSiteContext } from '../../../components/site-context';
import { PageHeader } from '../../../components/ui/page-header';
import { StatCard } from '../../../components/ui/stat-card';
import { Badge } from '../../../components/ui/badge';
import { EmptyState } from '../../../components/ui/empty-state';
import { DataTable, type Column } from '../../../components/ui/data-table';
import { ShareLinkCard, ReferralLeaderboard } from '@/components/dashboard/waitlist-sections';

interface WaitlistEntry {
  id: string;
  email: string;
  referralCode: string;
  referredById: string | null;
  position: number;
  referralCount: number;
  joinedAt: string;
}

export default function WaitlistPage() {
  const site = useSiteContext();
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const pageSize = 25;

  const siteUrl = site ? `${window.location.origin}/s/${site.slug}` : '';

  const fetchEntries = useCallback(async () => {
    if (!site) return;
    setLoading(true);
    try {
      const offset = (page - 1) * pageSize;
      const res = await fetch(
        `/api/sites/${site.id}/waitlist?limit=${pageSize}&offset=${offset}&search=${encodeURIComponent(search)}`,
      );
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries);
        setTotal(data.total);
      }
    } finally {
      setLoading(false);
    }
  }, [site, page, search]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const todayCount = entries.filter((e) => {
    const d = new Date(e.joinedAt);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  }).length;

  const topReferrer = entries.reduce<WaitlistEntry | null>((top, e) => {
    if (!top || e.referralCount > top.referralCount) return e;
    return top;
  }, null);

  const columns: Column<WaitlistEntry>[] = [
    { key: 'position', header: '#', className: 'w-16', render: (row) => <span className="text-dimmed-foreground">{row.position}</span> },
    { key: 'email', header: 'Email', render: (row) => <span className="font-medium text-foreground">{row.email}</span> },
    { key: 'referralCode', header: 'Referral Code', render: (row) => <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">{row.referralCode}</code> },
    { key: 'referrals', header: 'Referrals', className: 'w-24', render: (row) => row.referralCount > 0 ? <Badge variant="success">{row.referralCount}</Badge> : <span className="text-dimmed-foreground">0</span> },
    { key: 'joinedAt', header: 'Joined', render: (row) => <span className="text-dimmed-foreground">{new Date(row.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span> },
  ];

  const handleExportCSV = () => {
    if (entries.length === 0) return;
    const header = 'Position,Email,Referral Code,Referrals,Referred By,Joined\n';
    const rows = entries.map((e) => `${e.position},"${e.email}",${e.referralCode},${e.referralCount},${e.referredById || ''},${new Date(e.joinedAt).toISOString()}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${site?.name ?? 'export'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader
        title="Waitlist"
        badge={<Badge variant="info">{total} signups</Badge>}
        actions={
          <button onClick={handleExportCSV} disabled={total === 0} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        }
      />
      <div className="space-y-6 px-5 pb-8 pt-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Total Signups" value={total} icon={Users} />
          <StatCard label="Today" value={todayCount} icon={TrendingUp} />
          <StatCard label="Top Referrer" value={topReferrer?.referralCount ?? 0} icon={Trophy} subtitle={topReferrer?.email ? topReferrer.email.split('@')[0] + '...' : 'No referrals yet'} />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ShareLinkCard siteUrl={siteUrl} />
          <ReferralLeaderboard entries={entries} />
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dimmed-foreground" />
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-dimmed-foreground transition focus:border-border focus:outline-none focus:ring-1 focus:ring-border"
          />
        </div>

        {total === 0 && !loading ? (
          <EmptyState icon={Users} title="No waitlist entries yet" description="Share your site to start collecting signups. Entries will appear here in real time." />
        ) : (
          <DataTable columns={columns} data={entries} keyExtractor={(row) => row.id} pagination={{ page, pageSize, total, onPageChange: setPage }} emptyMessage={search ? 'No entries matching your search' : 'No entries yet'} />
        )}
      </div>
    </div>
  );
}
