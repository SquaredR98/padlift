'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown, Copy, Trash2, GripVertical } from 'lucide-react';
import type { BlockInstance, TemplateBranding } from '@/lib/templates/block-types';
import { resolveBlockClasses, resolveBlockInlineStyles } from '@/lib/templates/block-types';
import { BLOCK_REGISTRY } from '@/lib/templates/block-registry';
import { InlineEditLayer } from './inline-edit-layer';

interface BlockWrapperProps {
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
  dragHandleProps?: Record<string, unknown>;
}

export function BlockWrapper({
  block, branding, anchorId, isSelected, isFirst, isLast,
  onSelect, onMoveUp, onMoveDown, onDuplicate, onDelete, onInlineEdit, dragHandleProps,
}: BlockWrapperProps) {
  const entry = BLOCK_REGISTRY[block.blockType];
  const wrapperRef = useRef<HTMLDivElement>(null);
  if (!entry) return null;

  const Component = entry.component;
  const blockClasses = resolveBlockClasses(block);
  const blockInlineStyles = resolveBlockInlineStyles(block, branding);

  const effectiveBranding = block.styles.accentColor
    ? { ...branding, primaryColor: block.styles.accentColor }
    : branding;

  return (
    <div
      ref={wrapperRef}
      id={anchorId}
      className={cn(
        'group relative cursor-pointer transition-all duration-150',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2 ring-offset-[var(--lp-site-bg)]',
      )}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
    >
      {/* Hover toolbar */}
      <div
        className={cn(
          'absolute top-2 right-2 z-20 flex items-center gap-0.5 rounded-lg border border-[var(--lp-border)] bg-[var(--lp-bg-surface)]/95 px-1 py-0.5 shadow-lg backdrop-blur-sm transition-opacity',
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        )}
      >
        <ToolbarButton icon={GripVertical} title="Drag to reorder" className="cursor-grab" extraProps={dragHandleProps} />
        <ToolbarButton icon={ArrowUp} title="Move up" onClick={onMoveUp} disabled={isFirst} />
        <ToolbarButton icon={ArrowDown} title="Move down" onClick={onMoveDown} disabled={isLast} />
        <div className="mx-0.5 h-4 w-px bg-[var(--lp-border)]" />
        <ToolbarButton icon={Copy} title="Duplicate" onClick={onDuplicate} />
        <ToolbarButton icon={Trash2} title="Delete" onClick={onDelete} className="hover:text-red-400" />
      </div>

      {/* Block type label */}
      <div
        className={cn(
          'absolute top-2 left-2 z-20 rounded-md bg-[var(--lp-bg-surface)]/90 px-2 py-0.5 text-[10px] font-medium text-[var(--lp-text-muted)] backdrop-blur-sm transition-opacity',
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        )}
      >
        {entry.label}
      </div>

      {/* Block content */}
      <div className={cn('relative', blockClasses)} style={blockInlineStyles}>
        {block.styles.backgroundOverlay && block.styles.backgroundImage && (
          <div className="absolute inset-0 z-0" style={{ backgroundColor: block.styles.backgroundOverlay }} aria-hidden="true" />
        )}
        <div className="relative z-10">
          <Component branding={effectiveBranding} content={block.content} styles={block.styles} />
        </div>
      </div>

      {isSelected && onInlineEdit && (
        <InlineEditLayer wrapperRef={wrapperRef} blockId={block.id} onInlineEdit={onInlineEdit} />
      )}
    </div>
  );
}

// ── Toolbar Button ──

function ToolbarButton({ icon: Icon, title, onClick, disabled, className, extraProps }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  extraProps?: Record<string, unknown>;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      disabled={disabled}
      className={cn(
        'rounded p-1 text-[var(--lp-text-muted)] transition-colors hover:text-[var(--lp-text)] disabled:opacity-30 disabled:cursor-not-allowed',
        className,
      )}
      {...extraProps}
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}
