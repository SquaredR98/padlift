import type { BlockCategory, BlockInstance } from './block-types';
import { BLOCK_REGISTRY } from './block-registry';

// ─── Category → Anchor ID mapping ──────────────────────────

const CATEGORY_ANCHOR_MAP: Record<BlockCategory, string | null> = {
  navigation: null,
  hero: 'hero',
  logos: 'logos',
  features: 'features',
  process: 'how-it-works',
  testimonials: 'testimonials',
  pricing: 'pricing',
  faq: 'faq',
  cta: 'cta',
  waitlist: 'waitlist',
  stats: 'stats',
  comparison: 'comparison',
  gallery: 'gallery',
  content: 'content',
  footer: null,
  divider: null,
  embed: 'embed',
  layout: 'layout',
};

/** Get the anchor ID for a given block type, or null if it shouldn't have one */
export function getAnchorId(blockType: string): string | null {
  const entry = BLOCK_REGISTRY[blockType];
  if (!entry) return null;
  return CATEGORY_ANCHOR_MAP[entry.category];
}

/**
 * Resolve anchor IDs for a list of blocks, handling duplicates.
 * Second block in same category gets "-2", third gets "-3", etc.
 * Returns Map<blockInstanceId, anchorId>.
 */
export function resolveAnchorIds(blocks: BlockInstance[]): Map<string, string> {
  const result = new Map<string, string>();
  const counts = new Map<string, number>();

  for (const block of blocks) {
    const base = getAnchorId(block.blockType);
    if (!base) continue;

    const count = (counts.get(base) ?? 0) + 1;
    counts.set(base, count);

    const id = count === 1 ? base : `${base}-${count}`;
    result.set(block.id, id);
  }

  return result;
}
