'use client';

import { useState } from 'react';
import { ExternalLink, Loader2, Sparkles, X } from 'lucide-react';

export function UpgradeButton({ tier }: { tier: string }) {
  const [loading, setLoading] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, billing: 'monthly' }),
      });

      if (!res.ok) {
        const err = await res.json();
        if (err.code === 'PAYMENTS_DISABLED') {
          setShowComingSoon(true);
          return;
        }
        alert(err.error || 'Failed to create checkout');
        return;
      }

      const { url } = await res.json();
      if (url) {
        window.open(url, '_blank');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-md bg-blue-600 py-1.5 text-center text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <ExternalLink className="h-3 w-3" />
        )}
        {loading ? 'Loading...' : 'Upgrade'}
      </button>

      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                  <Sparkles className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-base font-semibold text-foreground">Coming Soon</h3>
              </div>
              <button
                onClick={() => setShowComingSoon(false)}
                className="rounded-md p-1 text-muted-foreground transition hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Paid plans are launching soon! You&apos;re already on the free plan — keep building, and we&apos;ll notify you as soon as upgrades are available.
            </p>
            <button
              onClick={() => setShowComingSoon(false)}
              className="mt-5 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
