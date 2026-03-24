'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Plus, Trash2, ChevronDown, Lock } from 'lucide-react';
import type { PageMeta } from '@/lib/templates/block-types';

interface PageSelectorProps {
  siteId: string;
  pages: PageMeta[];
  currentPageId: string;
  onPagesChange: (pages: PageMeta[]) => void;
  maxPages: number;
}

export function PageSelector({ siteId, pages, currentPageId, onPagesChange, maxPages }: PageSelectorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newSlug, setNewSlug] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState('');

  const currentPage = pages.find((p) => p.id === currentPageId);

  const switchPage = (pageId: string) => {
    setOpen(false);
    if (pageId !== currentPageId) {
      router.push(`/dashboard/sites/${siteId}/edit?pageId=${pageId}`);
    }
  };

  const handleCreate = async () => {
    if (!newSlug || !newTitle) {
      setError('Slug and title are required');
      return;
    }

    setError('');
    try {
      const res = await fetch(`/api/sites/${siteId}/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: newSlug, title: newTitle }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to create page');
        return;
      }

      const page = await res.json();
      onPagesChange([...pages, { id: page.id, slug: page.slug, title: page.title, status: page.status }]);
      setCreating(false);
      setNewSlug('');
      setNewTitle('');
      // Navigate to the new page
      router.push(`/dashboard/sites/${siteId}/edit?pageId=${page.id}`);
    } catch {
      setError('Failed to create page');
    }
  };

  const handleDelete = async (pageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const page = pages.find((p) => p.id === pageId);
    if (!page || page.slug === null) return;

    if (!confirm(`Delete "${page.title}" page?`)) return;

    try {
      const res = await fetch(`/api/sites/${siteId}/pages/${pageId}`, { method: 'DELETE' });
      if (res.ok) {
        const remaining = pages.filter((p) => p.id !== pageId);
        onPagesChange(remaining);
        // If we deleted the current page, switch to homepage
        if (pageId === currentPageId) {
          const homepage = remaining.find((p) => p.slug === null);
          if (homepage) {
            router.push(`/dashboard/sites/${siteId}/edit?pageId=${homepage.id}`);
          }
        }
      }
    } catch {
      // Ignore
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-[var(--lp-text-secondary)] hover:text-[var(--lp-text)] hover:bg-[var(--lp-bg-hover)] transition-colors"
      >
        <FileText className="h-3.5 w-3.5" />
        {currentPage?.title || 'Home'}
        <ChevronDown className="h-3 w-3 text-[var(--lp-text-muted)]" />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => { setOpen(false); setCreating(false); }} />

          <div className="absolute top-full left-0 z-50 mt-1 w-64 rounded-lg border border-[var(--lp-border)] bg-[var(--lp-bg-panel)] shadow-xl">
            {/* Page list */}
            <div className="max-h-60 overflow-y-auto p-1">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => switchPage(page.id)}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                    page.id === currentPageId
                      ? 'bg-[var(--lp-accent-muted)] text-[var(--lp-accent)]'
                      : 'text-[var(--lp-text-secondary)] hover:bg-[var(--lp-bg-hover)] hover:text-[var(--lp-text)]'
                  }`}
                >
                  <span className="truncate">
                    {page.title}
                    {page.slug !== null && (
                      <span className="ml-1.5 text-xs text-[var(--lp-text-muted)]">/{page.slug}</span>
                    )}
                  </span>
                  {page.slug !== null && (
                    <button
                      onClick={(e) => handleDelete(page.id, e)}
                      className="ml-2 shrink-0 rounded p-0.5 text-[var(--lp-text-muted)] hover:text-[var(--lp-error)] transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-[var(--lp-border)]" />

            {/* Page count */}
            {maxPages < 999999 && (
              <div className="px-3 py-1.5 text-[10px] text-[var(--lp-text-muted)]">
                {pages.length} / {maxPages} pages
              </div>
            )}

            {/* Create new page */}
            {pages.length >= maxPages ? (
              <div className="flex items-center gap-2 rounded-b-lg px-3 py-2.5 text-sm text-[var(--lp-text-muted)]">
                <Lock className="h-3.5 w-3.5" />
                <span>Page limit reached</span>
              </div>
            ) : creating ? (
              <div className="p-3 space-y-2">
                <input
                  type="text"
                  placeholder="Page title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-md border border-[var(--lp-border)] bg-[var(--lp-bg-surface)] px-3 py-1.5 text-sm text-[var(--lp-text)] placeholder-[var(--lp-text-muted)] outline-none focus:border-[var(--lp-accent)]"
                  autoFocus
                />
                <input
                  type="text"
                  placeholder="slug (e.g. about)"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="w-full rounded-md border border-[var(--lp-border)] bg-[var(--lp-bg-surface)] px-3 py-1.5 text-sm text-[var(--lp-text)] placeholder-[var(--lp-text-muted)] outline-none focus:border-[var(--lp-accent)]"
                />
                {error && <p className="text-xs text-[var(--lp-error)]">{error}</p>}
                <div className="flex gap-2">
                  <button
                    onClick={handleCreate}
                    className="flex-1 rounded-md bg-[var(--lp-accent)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--lp-accent-hover)] transition-colors"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => { setCreating(false); setError(''); }}
                    className="rounded-md px-3 py-1.5 text-sm text-[var(--lp-text-secondary)] hover:text-[var(--lp-text)] hover:bg-[var(--lp-bg-hover)] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setCreating(true)}
                className="flex w-full items-center gap-2 rounded-b-lg px-3 py-2.5 text-sm text-[var(--lp-text-secondary)] hover:text-[var(--lp-text)] hover:bg-[var(--lp-bg-hover)] transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Page
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
