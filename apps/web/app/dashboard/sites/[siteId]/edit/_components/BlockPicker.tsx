'use client';

import { useState } from 'react';
import { Search, Layout, Type, Star, MessageSquare, CreditCard, HelpCircle, Megaphone, Mail, BarChart3, GitCompare, Image, FileText, Footprints, Minus, Navigation, Handshake, ListOrdered, Play, Columns } from 'lucide-react';
import { getBlockCategories } from '@/lib/templates/block-registry';
import type { BlockCategory, BlockRegistryEntry } from '@/lib/templates/block-types';

interface BlockPickerProps {
  onAddBlock: (blockType: string) => void;
}

const CATEGORY_ICONS: Record<BlockCategory, React.ComponentType<{ className?: string }>> = {
  navigation: Navigation,
  hero: Layout,
  logos: Handshake,
  features: Star,
  process: ListOrdered,
  testimonials: MessageSquare,
  pricing: CreditCard,
  faq: HelpCircle,
  cta: Megaphone,
  waitlist: Mail,
  stats: BarChart3,
  comparison: GitCompare,
  gallery: Image,
  content: FileText,
  footer: Footprints,
  divider: Minus,
  embed: Play,
  layout: Columns,
};

export function BlockPicker({ onAddBlock }: BlockPickerProps) {
  const [search, setSearch] = useState('');
  const categories = getBlockCategories();

  const filteredCategories = search.trim()
    ? categories
        .map((cat) => ({
          ...cat,
          blocks: cat.blocks.filter(
            (b) =>
              b.label.toLowerCase().includes(search.toLowerCase()) ||
              b.description.toLowerCase().includes(search.toLowerCase()),
          ),
        }))
        .filter((cat) => cat.blocks.length > 0)
    : categories;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--lp-border)]">
        <h3 className="text-sm font-semibold text-[var(--lp-text)]">Blocks</h3>
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-[var(--lp-border)]">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--lp-text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blocks..."
            className="w-full rounded-md border border-[var(--lp-border)] bg-[var(--lp-bg-surface)] pl-8 pr-3 py-1.5 text-sm text-[var(--lp-text)] placeholder:text-[var(--lp-text-muted)] focus:border-[var(--lp-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--lp-accent-muted)] transition-colors"
          />
        </div>
      </div>

      {/* Block list */}
      <div className="flex-1 overflow-y-auto">
        {filteredCategories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.category];
          return (
            <div key={cat.category} className="border-b border-[var(--lp-border)]">
              <div className="flex items-center gap-2 px-4 py-2.5">
                <Icon className="h-3.5 w-3.5 text-[var(--lp-text-muted)]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--lp-text-muted)]">
                  {cat.label}
                </span>
              </div>
              <div className="px-3 pb-2 space-y-0.5">
                {cat.blocks.map((block) => (
                  <BlockPickerItem
                    key={block.blockType}
                    block={block}
                    onAdd={() => onAddBlock(block.blockType)}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-[var(--lp-text-muted)]">No blocks match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}

function BlockPickerItem({
  block,
  onAdd,
}: {
  block: BlockRegistryEntry;
  onAdd: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="w-full rounded-md px-3 py-2 text-left transition-colors hover:bg-[var(--lp-bg-hover)] group"
    >
      <div className="text-sm font-medium text-[var(--lp-text-secondary)] group-hover:text-[var(--lp-text)] transition-colors">
        {block.label}
      </div>
      <div className="text-xs text-[var(--lp-text-muted)] mt-0.5 line-clamp-1">
        {block.description}
      </div>
    </button>
  );
}
