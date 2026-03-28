'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Trash2, ChevronDown, Clock } from 'lucide-react';
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

  const currentPage = pages.find((p) => p.id === currentPageId);

  const switchPage = (pageId: string) => {
    setOpen(false);
    if (pageId !== currentPageId) {
      router.push(`/dashboard/sites/${siteId}/edit?pageId=${pageId}`);
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
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

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

            {/* Multi-page — Coming Soon */}
            <div className="flex items-center gap-2 rounded-b-lg px-3 py-2.5 text-sm text-[var(--lp-text-muted)]">
              <Clock className="h-3.5 w-3.5" />
              <span>Multi-page — Coming Soon</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
