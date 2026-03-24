'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { PageData, PageMeta } from '@/lib/templates/block-types';
import { BlockPicker } from '@/app/dashboard/sites/[siteId]/edit/_components/BlockPicker';
import { BlockCanvas } from '@/app/dashboard/sites/[siteId]/edit/_components/BlockCanvas';
import { PropsEditor } from '@/app/dashboard/sites/[siteId]/edit/_components/PropsEditor';
import { useBlockOperations } from './use-block-operations';
import { EditorToolbar } from './editor-toolbar';
import './styles.css';

interface BlockEditorProps {
  siteId: string;
  siteName: string;
  siteSlug: string;
  initialPageData: PageData;
  isPublished: boolean;
  pageId: string;
  initialPages: PageMeta[];
  maxPages: number;
}

export default function BlockEditor({
  siteId,
  siteName,
  siteSlug,
  initialPageData,
  isPublished: initialIsPublished,
  pageId,
  initialPages,
  maxPages,
}: BlockEditorProps) {
  const [pages, setPages] = useState<PageMeta[]>(initialPages);
  const [publishing, setPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(initialIsPublished);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'phone'>('desktop');

  const ops = useBlockOperations(initialPageData, siteId, pageId);

  // ─── Keyboard shortcuts ───────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const isTextInput = tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable;

      if (e.key === 'Escape') { ops.setSelectedBlockId(null); return; }

      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (ops.saveTimer.current) clearTimeout(ops.saveTimer.current);
        ops.save();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        if (isTextInput) return;
        e.preventDefault(); ops.handleUndo(); return;
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        if (isTextInput) return;
        e.preventDefault(); ops.handleRedo(); return;
      }

      if (e.key === 'Delete' && ops.selectedBlockId) {
        if (isTextInput) return;
        e.preventDefault(); ops.pushHistory();
        ops.deleteBlock(ops.selectedBlockId);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ops]);

  // ─── Publish ────────────────────────────────────────────
  const handlePublish = async () => {
    if (ops.saveTimer.current) clearTimeout(ops.saveTimer.current);
    await ops.save();
    setPublishing(true);
    try {
      const res = await fetch(`/api/sites/${siteId}/publish`, { method: 'POST' });
      if (res.ok) setIsPublished(true);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-[var(--lp-bg)]">
      <EditorToolbar
        siteId={siteId}
        siteName={siteName}
        siteSlug={siteSlug}
        isPublished={isPublished}
        pages={pages}
        currentPageId={pageId}
        maxPages={maxPages}
        onPagesChange={setPages}
        saveStatus={ops.saveStatus}
        publishing={publishing}
        canUndo={ops.history.canUndo}
        canRedo={ops.history.canRedo}
        previewMode={previewMode}
        onUndo={ops.handleUndo}
        onRedo={ops.handleRedo}
        onPreviewModeChange={setPreviewMode}
        onSave={ops.save}
        onPublish={handlePublish}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="be-panel-left">
          <BlockPicker onAddBlock={ops.addBlock} />
        </div>

        <div className="flex-1 overflow-y-auto bg-[var(--lp-canvas-bg)]">
          <div
            className={cn(
              'mx-auto transition-all duration-300',
              previewMode === 'tablet' && 'max-w-[768px] border-x border-[var(--lp-border)]',
              previewMode === 'phone' && 'max-w-[375px] border-x border-[var(--lp-border)]',
            )}
          >
            <BlockCanvas
              blocks={ops.pageData.blocks}
              branding={ops.pageData.branding}
              selectedBlockId={ops.selectedBlockId}
              onSelectBlock={ops.setSelectedBlockId}
              onMoveBlock={ops.moveBlock}
              onDuplicateBlock={ops.duplicateBlock}
              onDeleteBlock={ops.deleteBlock}
              onInlineEdit={ops.handleInlineEdit}
              onReorderBlocks={ops.reorderBlocks}
            />
          </div>
        </div>

        <div className="be-panel-right">
          <PropsEditor
            selectedBlock={ops.selectedBlock}
            branding={ops.pageData.branding}
            onBlockContentChange={ops.updateBlockContent}
            onBlockStyleChange={ops.updateBlockStyle}
            onBrandingChange={ops.updateBranding}
            onDeselectBlock={ops.deselectBlock}
          />
        </div>
      </div>
    </div>
  );
}
