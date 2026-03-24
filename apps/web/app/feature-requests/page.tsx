'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronUp, Send, Lightbulb } from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  status: string;
  voteCount: number;
  _count: { votes: number };
  profile: { name: string | null; email: string } | null;
  createdAt: string;
}

const STATUS_TABS = ['All', 'OPEN', 'PLANNED', 'IN_PROGRESS', 'SHIPPED'] as const;
const SORT_OPTIONS = ['votes', 'newest'] as const;

const STATUS_COLORS: Record<string, string> = {
  OPEN: 'bg-gray-500/20 text-gray-400',
  PLANNED: 'bg-blue-500/20 text-blue-400',
  IN_PROGRESS: 'bg-amber-500/20 text-amber-400',
  SHIPPED: 'bg-green-500/20 text-green-400',
};

export default function FeatureRequestsPage() {
  const [items, setItems] = useState<FeatureItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>('All');
  const [sort, setSort] = useState<'votes' | 'newest'>('votes');
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());

  // Submit form
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchData = useCallback(async () => {
    const params = new URLSearchParams({ page: String(page), sort });
    if (status !== 'All') params.set('status', status);
    const res = await fetch(`/api/feature-requests?${params}`);
    if (res.ok) {
      const data = await res.json();
      setItems(data.items);
      setTotal(data.total);
    }
  }, [page, status, sort]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleVote = async (id: string) => {
    const res = await fetch(`/api/feature-requests/${id}/vote`, { method: 'POST' });
    if (res.status === 401) {
      window.location.href = '/login';
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setVotedIds((prev) => {
        const next = new Set(prev);
        data.voted ? next.add(id) : next.delete(id);
        return next;
      });
      fetchData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/feature-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), description: description.trim() }),
      });
      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        setSubmitError(data.error || 'Something went wrong');
        return;
      }
      setTitle('');
      setDescription('');
      setShowForm(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
      fetchData();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
          <Lightbulb className="h-6 w-6 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Feature Requests</h1>
        <p className="mt-2 text-muted-foreground">Vote on features you&apos;d love to see, or suggest your own.</p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap rounded-lg border border-border bg-card p-0.5">
          {STATUS_TABS.map((t) => (
            <button
              key={t}
              onClick={() => { setStatus(t); setPage(1); }}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                status === t ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t === 'All' ? 'All' : t.replace('_', ' ')}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as 'votes' | 'newest')}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-foreground focus:outline-none"
          >
            <option value="votes">Most Voted</option>
            <option value="newest">Newest</option>
          </select>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-500"
          >
            {showForm ? 'Cancel' : 'Submit Idea'}
          </button>
        </div>
      </div>

      {/* Submit form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-lg border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Submit a Feature Request</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Feature title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder-muted-foreground transition focus:border-border focus:outline-none focus:ring-1 focus:ring-border"
            />
            <textarea
              placeholder="Describe the feature you'd like..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder-muted-foreground transition focus:border-border focus:outline-none focus:ring-1 focus:ring-border"
            />
            {submitError && <p className="text-sm text-red-500">{submitError}</p>}
            <button
              type="submit"
              disabled={submitting || !title.trim() || !description.trim()}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              Submit
            </button>
          </div>
        </form>
      )}

      {submitSuccess && (
        <div className="mb-4 rounded-lg border border-green-800/30 bg-green-950/20 px-4 py-3 text-sm text-green-400">
          Your feature request has been submitted!
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 rounded-lg border border-border bg-card p-4 transition hover:border-muted-foreground/30">
            {/* Vote button */}
            <button
              onClick={() => handleVote(item.id)}
              className={`flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-lg border transition ${
                votedIds.has(item.id)
                  ? 'border-blue-600 bg-blue-600/10 text-blue-400'
                  : 'border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground'
              }`}
            >
              <ChevronUp className="h-4 w-4" />
              <span className="text-sm font-semibold">{item.voteCount}</span>
            </button>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-2">
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_COLORS[item.status] || STATUS_COLORS.OPEN}`}>
                  {item.status.replace('_', ' ')}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
              <p className="mt-2 text-xs text-dimmed-foreground">
                {item.profile?.name || 'Anonymous'} &middot; {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <Lightbulb className="mx-auto mb-3 h-8 w-8 text-dimmed-foreground" />
            <p>No feature requests yet. Be the first to submit one!</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {total > 25 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-xs text-dimmed-foreground">Page {page} of {Math.ceil(total / 25)}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= Math.ceil(total / 25)}
            className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
