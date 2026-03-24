'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Globe, Check, Loader2, ExternalLink, Undo2, Redo2, Monitor, Tablet, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageSelector } from '@/app/dashboard/sites/[siteId]/edit/_components/PageSelector';
import type { PageMeta } from '@/lib/templates/block-types';
import './styles.css';

interface EditorToolbarProps {
  siteId: string;
  siteName: string;
  siteSlug: string;
  isPublished: boolean;
  pages: PageMeta[];
  currentPageId: string;
  maxPages: number;
  onPagesChange: (pages: PageMeta[]) => void;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  publishing: boolean;
  canUndo: boolean;
  canRedo: boolean;
  previewMode: 'desktop' | 'tablet' | 'phone';
  onUndo: () => void;
  onRedo: () => void;
  onPreviewModeChange: (mode: 'desktop' | 'tablet' | 'phone') => void;
  onSave: () => void;
  onPublish: () => void;
}

const PREVIEW_MODES = [
  { mode: 'desktop' as const, icon: Monitor, title: 'Desktop' },
  { mode: 'tablet' as const, icon: Tablet, title: 'Tablet (768px)' },
  { mode: 'phone' as const, icon: Smartphone, title: 'Phone (375px)' },
];

export function EditorToolbar({
  siteId,
  siteName,
  siteSlug,
  isPublished,
  pages,
  currentPageId,
  maxPages,
  onPagesChange,
  saveStatus,
  publishing,
  canUndo,
  canRedo,
  previewMode,
  onUndo,
  onRedo,
  onPreviewModeChange,
  onSave,
  onPublish,
}: EditorToolbarProps) {
  const router = useRouter();

  return (
    <div className="be-toolbar">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push(`/dashboard/sites/${siteId}`)}
          className="be-toolbar-back"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="be-toolbar-divider" />
        <span className="text-sm font-medium text-[var(--lp-text)]">{siteName}</span>
        <div className="be-toolbar-divider" />
        <PageSelector
          siteId={siteId}
          pages={pages}
          currentPageId={currentPageId}
          onPagesChange={onPagesChange}
          maxPages={maxPages}
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5">
          <button type="button" title="Undo (Ctrl+Z)" onClick={onUndo} disabled={!canUndo} className="be-toolbar-icon-btn">
            <Undo2 className="h-4 w-4" />
          </button>
          <button type="button" title="Redo (Ctrl+Y)" onClick={onRedo} disabled={!canRedo} className="be-toolbar-icon-btn">
            <Redo2 className="h-4 w-4" />
          </button>
        </div>

        <div className="be-toolbar-divider" />

        {/* Responsive preview toggle */}
        <div className="be-preview-toggle">
          {PREVIEW_MODES.map(({ mode, icon: Icon, title }) => (
            <button
              key={mode}
              type="button"
              title={title}
              onClick={() => onPreviewModeChange(mode)}
              className={cn(
                'rounded-md p-1.5 transition-colors',
                previewMode === mode
                  ? 'bg-[var(--lp-bg-hover)] text-[var(--lp-text)]'
                  : 'text-[var(--lp-text-muted)] hover:text-[var(--lp-text)]',
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <div className="be-toolbar-divider" />

        {/* Save status */}
        <span className="flex items-center gap-1.5 text-xs text-[var(--lp-text-muted)]">
          {saveStatus === 'saving' && (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Saving...
            </>
          )}
          {saveStatus === 'saved' && (
            <>
              <Check className="h-3 w-3 text-[var(--lp-success)]" />
              Saved
            </>
          )}
          {saveStatus === 'error' && (
            <span className="text-[var(--lp-error)]">Save failed</span>
          )}
        </span>

        <button onClick={onSave} className="be-save-btn">
          <Save className="h-3.5 w-3.5" />
          Save
        </button>

        <button onClick={onPublish} disabled={publishing} className="be-publish-btn">
          {publishing ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Globe className="h-3.5 w-3.5" />
          )}
          {publishing ? 'Publishing...' : 'Publish'}
        </button>

        {isPublished && (
          <a
            href={`/s/${siteSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="be-external-link"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
