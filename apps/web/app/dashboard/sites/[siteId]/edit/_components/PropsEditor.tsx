'use client';

import { useState } from 'react';
import { Settings2, X } from 'lucide-react';
import type { BlockInstance, TemplateBranding } from '@/lib/templates/block-types';
import { BLOCK_REGISTRY } from '@/lib/templates/block-registry';
import { DynamicField, SectionGroup } from '@/components/dashboard/form-fields';
import { StyleEditor } from '@/components/dashboard/style-editor';
import { BrandingEditor } from './BrandingEditor';

interface PropsEditorProps {
  selectedBlock: BlockInstance | null;
  branding: TemplateBranding;
  onBlockContentChange: (blockId: string, key: string, value: unknown) => void;
  onBlockStyleChange: (blockId: string, key: string, value: unknown) => void;
  onBrandingChange: (key: string, value: unknown) => void;
  onDeselectBlock?: () => void;
}

export function PropsEditor({
  selectedBlock,
  branding,
  onBlockContentChange,
  onBlockStyleChange,
  onBrandingChange,
  onDeselectBlock,
}: PropsEditorProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');

  // No block selected → show branding editor
  if (!selectedBlock) {
    return <BrandingEditor branding={branding} onChange={onBrandingChange} />;
  }

  const entry = BLOCK_REGISTRY[selectedBlock.blockType];
  if (!entry) {
    return (
      <div className="p-4 text-sm text-[var(--lp-text-muted)]">
        Unknown block type: {selectedBlock.blockType}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Block header with deselect buttons */}
      <div className="px-4 py-3 border-b border-[var(--lp-border)]">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-[var(--lp-text)] truncate">{entry.label}</h3>
            <p className="text-xs text-[var(--lp-text-muted)] mt-0.5 truncate">{entry.description}</p>
          </div>
          {onDeselectBlock && (
            <div className="flex items-center gap-0.5 ml-2 shrink-0">
              <button
                type="button"
                title="Back to site settings"
                onClick={onDeselectBlock}
                className="rounded-md p-1.5 text-[var(--lp-text-muted)] hover:text-[var(--lp-text)] hover:bg-[var(--lp-bg-hover)] transition-colors"
              >
                <Settings2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                title="Deselect block (Esc)"
                onClick={onDeselectBlock}
                className="rounded-md p-1.5 text-[var(--lp-text-muted)] hover:text-[var(--lp-text)] hover:bg-[var(--lp-bg-hover)] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--lp-border)]">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`flex-1 px-4 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'content'
              ? 'text-[var(--lp-text)] border-b-2 border-[var(--lp-accent)]'
              : 'text-[var(--lp-text-muted)] hover:text-[var(--lp-text-secondary)]'
          }`}
        >
          Content
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('style')}
          className={`flex-1 px-4 py-2.5 text-xs font-medium transition-colors ${
            activeTab === 'style'
              ? 'text-[var(--lp-text)] border-b-2 border-[var(--lp-accent)]'
              : 'text-[var(--lp-text-muted)] hover:text-[var(--lp-text-secondary)]'
          }`}
        >
          Style
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'content' ? (
          <SectionGroup label="Block Content" defaultOpen={true}>
            {entry.schema.map((field) => (
              <DynamicField
                key={field.key}
                field={field}
                value={selectedBlock.content[field.key] ?? field.defaultValue}
                onChange={(v) => onBlockContentChange(selectedBlock.id, field.key, v)}
              />
            ))}
          </SectionGroup>
        ) : (
          <div className="p-4">
            <StyleEditor
              styles={selectedBlock.styles}
              onChange={(key, value) => onBlockStyleChange(selectedBlock.id, key, value)}
              applicableStyles={entry.applicableStyles}
            />
          </div>
        )}
      </div>
    </div>
  );
}
