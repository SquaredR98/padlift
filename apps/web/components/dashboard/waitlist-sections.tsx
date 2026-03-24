'use client';

import { useState } from 'react';
import { Link2, Copy, Check, Trophy } from 'lucide-react';
import { Badge } from '@/app/dashboard/components/ui/badge';

// ─── Share Link Card ─────────────────────────────────────────

export function ShareLinkCard({ siteUrl }: { siteUrl: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Link2 className="h-4 w-4 text-blue-400" />
        Share your waitlist
      </div>
      <p className="mt-1 text-xs text-dimmed-foreground">Share this URL to start collecting signups.</p>
      <div className="mt-3 flex gap-2">
        <input readOnly value={siteUrl} className="flex-1 rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground outline-none" />
        <button
          onClick={() => {
            navigator.clipboard.writeText(siteUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

// ─── Referral Leaderboard ────────────────────────────────────

interface LeaderboardEntry {
  id: string;
  email: string;
  referralCount: number;
}

export function ReferralLeaderboard({ entries }: { entries: LeaderboardEntry[] }) {
  const topReferrers = entries
    .filter((e) => e.referralCount > 0)
    .sort((a, b) => b.referralCount - a.referralCount)
    .slice(0, 5);

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Trophy className="h-4 w-4 text-amber-400" />
        Referral Leaderboard
      </div>
      <div className="mt-3 space-y-2">
        {topReferrers.map((e, i) => (
          <div key={e.id} className="flex items-center gap-3 text-sm">
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
              i === 0 ? 'bg-amber-500/20 text-amber-400' :
              i === 1 ? 'bg-gray-500/20 text-muted-foreground' :
              i === 2 ? 'bg-orange-500/20 text-orange-400' :
              'bg-muted text-dimmed-foreground'
            }`}>
              {i + 1}
            </span>
            <span className="flex-1 truncate text-foreground">{e.email}</span>
            <Badge variant="success">{e.referralCount} referrals</Badge>
          </div>
        ))}
        {topReferrers.length === 0 && (
          <p className="py-4 text-center text-xs text-dimmed-foreground">
            No referrals yet. Share the waitlist link to get started.
          </p>
        )}
      </div>
    </div>
  );
}
