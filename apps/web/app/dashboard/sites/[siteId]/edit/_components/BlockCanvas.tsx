'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { LayoutGrid } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { BlockInstance, TemplateBranding } from '@/lib/templates/block-types';
import { resolveFonts } from '@/lib/templates/block-types';
import { resolveAnchorIds } from '@/lib/templates/block-anchors';
import { BlockWrapper } from '@/components/dashboard/block-wrapper';

interface BlockCanvasProps {
  blocks: BlockInstance[];
  branding: TemplateBranding;
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  onMoveBlock: (id: string, direction: 'up' | 'down') => void;
  onDuplicateBlock: (id: string) => void;
  onDeleteBlock: (id: string) => void;
  onInlineEdit?: (blockId: string, key: string, value: string) => void;
  onReorderBlocks?: (activeId: string, overId: string) => void;
}

export function BlockCanvas({
  blocks,
  branding,
  selectedBlockId,
  onSelectBlock,
  onMoveBlock,
  onDuplicateBlock,
  onDeleteBlock,
  onInlineEdit,
  onReorderBlocks,
}: BlockCanvasProps) {
  const { headingFont, bodyFont } = resolveFonts(branding);
  const anchorIds = useMemo(() => resolveAnchorIds(blocks), [blocks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      onReorderBlocks?.(active.id as string, over.id as string);
    },
    [onReorderBlocks],
  );

  // Load selected Google Font CSS for editor preview
  useEffect(() => {
    const fonts = [...new Set([headingFont, bodyFont])];
    const url = `https://fonts.googleapis.com/css2?${fonts
      .map((f) => `family=${encodeURIComponent(f)}:wght@400;500;600;700`)
      .join('&')}&display=swap`;
    const id = 'lp-canvas-font';
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [headingFont, bodyFont]);

  if (blocks.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center" data-site-theme={branding.defaultTheme || 'dark'}>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--lp-site-border)] bg-[var(--lp-site-card)]">
            <LayoutGrid className="h-7 w-7 text-[var(--lp-site-dimmed)]" />
          </div>
          <h3 className="text-lg font-medium text-[var(--lp-site-body)]">No blocks yet</h3>
          <p className="mt-1 text-sm text-[var(--lp-site-muted)]">
            Add your first block from the left panel
          </p>
        </div>
      </div>
    );
  }

  const blockIds = blocks.map((b) => b.id);

  return (
    <div
      className="min-h-full bg-[var(--lp-site-bg)]"
      data-site-theme={branding.defaultTheme || 'dark'}
      style={{ fontFamily: `'${bodyFont}', 'Inter', system-ui, sans-serif` }}
      onClick={() => onSelectBlock(null)}
    >
      {/* Heading font rule — applied via injected style tag */}
      <style>{`[data-site-theme] h1, [data-site-theme] h2, [data-site-theme] h3, [data-site-theme] h4, [data-site-theme] h5, [data-site-theme] h6 { font-family: '${headingFont}', 'Inter', system-ui, sans-serif; }`}</style>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
          {blocks.map((block, index) => (
            <SortableBlock
              key={block.id}
              block={block}
              branding={branding}
              anchorId={anchorIds.get(block.id)}
              isSelected={block.id === selectedBlockId}
              isFirst={index === 0}
              isLast={index === blocks.length - 1}
              onSelect={() => onSelectBlock(block.id)}
              onMoveUp={() => onMoveBlock(block.id, 'up')}
              onMoveDown={() => onMoveBlock(block.id, 'down')}
              onDuplicate={() => onDuplicateBlock(block.id)}
              onDelete={() => onDeleteBlock(block.id)}
              onInlineEdit={onInlineEdit}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

// ── Sortable wrapper for each block ──

function SortableBlock({
  block,
  branding,
  anchorId,
  isSelected,
  isFirst,
  isLast,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onInlineEdit,
}: {
  block: BlockInstance;
  branding: TemplateBranding;
  anchorId?: string;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onInlineEdit?: (blockId: string, key: string, value: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <BlockWrapper
        block={block}
        branding={branding}
        anchorId={anchorId}
        isSelected={isSelected}
        isFirst={isFirst}
        isLast={isLast}
        onSelect={onSelect}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
        onInlineEdit={onInlineEdit}
        dragHandleProps={listeners}
      />
    </div>
  );
}
