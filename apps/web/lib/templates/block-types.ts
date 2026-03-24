import type { ComponentType, CSSProperties } from 'react';
import type { FieldDef } from './content-schema';

// ─── Branding ────────────────────────────────────────────────

export interface TemplateBranding {
  companyName: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string | null;
  headingFont: string;
  bodyFont: string;
  /** @deprecated Use headingFont + bodyFont instead */
  fontFamily?: string;
  defaultTheme: 'dark' | 'light';
}

/** Resolve fonts from branding, handling backward compat with old `fontFamily` field */
export function resolveFonts(branding: TemplateBranding | Record<string, unknown>): { headingFont: string; bodyFont: string } {
  const b = branding as Record<string, unknown>;
  const fallback = (b.fontFamily as string) || 'Inter';
  return {
    headingFont: (b.headingFont as string) || fallback,
    bodyFont: (b.bodyFont as string) || fallback,
  };
}

// ─── Block Categories ────────────────────────────────────────

export type BlockCategory =
  | 'navigation'
  | 'hero'
  | 'logos'
  | 'features'
  | 'process'
  | 'testimonials'
  | 'pricing'
  | 'faq'
  | 'cta'
  | 'waitlist'
  | 'stats'
  | 'comparison'
  | 'gallery'
  | 'content'
  | 'footer'
  | 'divider'
  | 'embed'
  | 'layout';

// ─── Block Styles ────────────────────────────────────────────

export interface BlockStyles {
  /** Override background color — applied via inline style (dynamic hex) */
  backgroundColor?: string;
  /** Override text color — applied via inline style (dynamic hex) */
  textColor?: string;
  /** Override branding.primaryColor for this block — applied via inline style */
  accentColor?: string;
  /** Vertical padding preset — mapped to Tailwind classes */
  paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Background image URL — applied via inline style */
  backgroundImage?: string;
  /** Background overlay color (hex) — applied via inline style */
  backgroundOverlay?: string;
  /** Entrance animation — mapped to Tailwind classes */
  animation?: 'none' | 'fade' | 'slide' | 'scale' | 'blur-in' | 'slide-left' | 'slide-right' | 'bounce';

  // ─── Design Tokens (Phase 3) ───────────────────────────────
  /** Section max-width constraint */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Horizontal padding */
  paddingX?: 'none' | 'sm' | 'md' | 'lg';
  /** Grid column count for grid-based blocks */
  columns?: 1 | 2 | 3 | 4;
  /** Gap between grid/flex items */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Card/element border radius */
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  /** Card elevation shadow */
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  /** Card border thickness */
  borderWidth?: 'none' | 'thin' | 'medium';
  /** Card visual treatment preset */
  cardStyle?: 'flat' | 'outlined' | 'elevated' | 'filled';
  /** Section heading font size */
  headingSize?: 'sm' | 'md' | 'lg' | 'xl';
  /** Body text font size */
  bodySize?: 'sm' | 'md' | 'lg';
  /** Section text alignment */
  textAlign?: 'left' | 'center' | 'right';
  /** Show decorative elements (gradient orbs, dividers, etc.) */
  showDecorations?: boolean;
  /** Bottom section divider style */
  dividerStyle?: 'none' | 'line' | 'gradient' | 'dots';

  // ─── Phase 4: Expanded Style Tokens ─────────────────────────
  /** Separate top padding (overrides paddingY) */
  paddingTop?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Separate bottom padding (overrides paddingY) */
  paddingBottom?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Heading letter spacing */
  letterSpacing?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider';
  /** Body line height */
  lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose';
  /** Text transform for headings */
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  /** Animation delay */
  animationDelay?: 'none' | 'short' | 'medium' | 'long';
  /** Background gradient start color */
  gradientFrom?: string;
  /** Background gradient end color */
  gradientTo?: string;
  /** Background gradient direction */
  gradientDirection?: 'to-r' | 'to-br' | 'to-b' | 'to-bl' | 'to-l' | 'to-tl' | 'to-t' | 'to-tr';
  /** Section background opacity (0-100) */
  backgroundOpacity?: number;
}

/** Keys of BlockStyles that are design tokens (for applicableStyles filtering) */
export type StyleTokenKey =
  | 'backgroundColor' | 'textColor' | 'accentColor' | 'paddingY'
  | 'backgroundImage' | 'backgroundOverlay' | 'animation'
  | 'maxWidth' | 'paddingX' | 'columns' | 'gap'
  | 'borderRadius' | 'shadow' | 'borderWidth' | 'cardStyle'
  | 'headingSize' | 'bodySize' | 'textAlign'
  | 'showDecorations' | 'dividerStyle'
  | 'paddingTop' | 'paddingBottom'
  | 'letterSpacing' | 'lineHeight' | 'textTransform'
  | 'animationDelay'
  | 'gradientFrom' | 'gradientTo' | 'gradientDirection'
  | 'backgroundOpacity';

// ─── Block Instance (stored in DB) ───────────────────────────

export interface BlockInstance {
  /** Unique ID per block instance — generated via nanoid */
  id: string;
  /** Block type key — maps to BLOCK_REGISTRY */
  blockType: string;
  /** Block-specific content data */
  content: Record<string, unknown>;
  /** Per-block style overrides */
  styles: BlockStyles;
}

// ─── Page Data (stored in Site.templateContent) ──────────────

export interface PageData {
  branding: TemplateBranding;
  blocks: BlockInstance[];
}

// ─── Multi-page helpers ─────────────────────────────────────

/** Per-page content (stored in Page.contentJson) */
export interface PageContent {
  blocks: BlockInstance[];
}

/** Page metadata returned from the pages list API */
export interface PageMeta {
  id: string;
  slug: string | null;
  title: string;
  status: string;
}

/** Split PageData into site-level branding and page-level content */
export function splitPageData(pd: PageData): { branding: TemplateBranding; pageContent: PageContent } {
  return {
    branding: pd.branding,
    pageContent: { blocks: pd.blocks },
  };
}

/** Combine site branding and page content into a PageData */
export function combinePageData(branding: TemplateBranding, content: PageContent): PageData {
  return { branding, blocks: content.blocks };
}

// ─── Block Component Props ───────────────────────────────────

export interface BlockComponentProps {
  branding: TemplateBranding;
  content: Record<string, unknown>;
  styles: BlockStyles;
}

// ─── Block Registry Entry ────────────────────────────────────

export interface BlockRegistryEntry {
  blockType: string;
  label: string;
  description: string;
  category: BlockCategory;
  /** React component for preview and editor canvas */
  component: ComponentType<BlockComponentProps>;
  /** SSR-safe component (no client hooks) — used for publish if provided */
  ssrComponent?: ComponentType<BlockComponentProps>;
  /** Content schema fields for the PropsEditor form */
  schema: FieldDef[];
  /** Default content values for new instances */
  defaultContent: Record<string, unknown>;
  /** Default style overrides for new instances */
  defaultStyles: Partial<BlockStyles>;
  /** Which design tokens this block supports in the style editor. Omit = colors/padding/animation only. */
  applicableStyles?: StyleTokenKey[];
}

// ─── Tailwind Class Maps ─────────────────────────────────────

/**
 * Padding preset → Tailwind classes.
 * Applied via cn() on the BlockWrapper, NOT via inline style.
 * Components have minimal built-in padding (py-6 sm:py-8);
 * this adds extra spacing when the user wants more breathing room.
 */
export const PADDING_CLASSES = {
  none: '',
  sm: 'py-4 sm:py-6',
  md: 'py-8 sm:py-12',
  lg: 'py-12 sm:py-20',
  xl: 'py-20 sm:py-28',
} as const;

/**
 * Animation preset → Tailwind animation class.
 * Custom @keyframes defined in globals.css.
 */
export const ANIMATION_CLASSES = {
  none: '',
  fade: 'animate-fade-in',
  slide: 'animate-slide-up',
  scale: 'animate-scale-in',
  'blur-in': 'animate-blur-in',
  'slide-left': 'animate-slide-left',
  'slide-right': 'animate-slide-right',
  bounce: 'animate-bounce-in',
} as const;

export const ANIMATION_DELAY_CLASSES = {
  none: '',
  short: '[animation-delay:150ms]',
  medium: '[animation-delay:300ms]',
  long: '[animation-delay:500ms]',
} as const;

// ─── Design Token Class Maps ─────────────────────────────────

export const MAX_WIDTH_CLASSES = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
} as const;

export const PADDING_X_CLASSES = {
  none: 'px-0',
  sm: 'px-4',
  md: 'px-6',
  lg: 'px-8 sm:px-12',
} as const;

export const COLUMNS_CLASSES = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
} as const;

export const GAP_CLASSES = {
  none: 'gap-0',
  sm: 'gap-3',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
} as const;

export const BORDER_RADIUS_CLASSES = {
  none: 'rounded-none',
  sm: 'rounded-md',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: 'rounded-full',
} as const;

export const SHADOW_CLASSES = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-xl',
} as const;

export const BORDER_WIDTH_CLASSES = {
  none: 'border-0',
  thin: 'border',
  medium: 'border-2',
} as const;

export const HEADING_SIZE_CLASSES = {
  sm: 'text-2xl sm:text-3xl',
  md: 'text-3xl sm:text-4xl',
  lg: 'text-4xl sm:text-5xl',
  xl: 'text-5xl sm:text-6xl lg:text-7xl',
} as const;

export const BODY_SIZE_CLASSES = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg sm:text-xl',
} as const;

export const TEXT_ALIGN_CLASSES = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

/**
 * Card visual treatment presets.
 * flat — no border, no shadow (clean/minimal look)
 * outlined — visible border, no shadow
 * elevated — shadow, no border (floating cards)
 * filled — tinted background with subtle border
 */
export const CARD_STYLE_CLASSES = {
  flat: '',
  outlined: 'border border-[var(--lp-site-border)]',
  elevated: 'shadow-lg border-0',
  filled: 'bg-[var(--lp-site-card)] border border-[var(--lp-site-border-subtle)]',
} as const;

// ─── Phase 4: Expanded Token Class Maps ──────────────────────

export const PADDING_TOP_CLASSES = {
  none: 'pt-0',
  sm: 'pt-4 sm:pt-6',
  md: 'pt-8 sm:pt-12',
  lg: 'pt-12 sm:pt-20',
  xl: 'pt-20 sm:pt-28',
} as const;

export const PADDING_BOTTOM_CLASSES = {
  none: 'pb-0',
  sm: 'pb-4 sm:pb-6',
  md: 'pb-8 sm:pb-12',
  lg: 'pb-12 sm:pb-20',
  xl: 'pb-20 sm:pb-28',
} as const;

export const LETTER_SPACING_CLASSES = {
  tighter: 'tracking-tighter',
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
  wider: 'tracking-wider',
} as const;

export const LINE_HEIGHT_CLASSES = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
} as const;

export const TEXT_TRANSFORM_CLASSES = {
  none: '',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
} as const;

export const GRADIENT_DIRECTION_CLASSES = {
  'to-r': 'bg-linear-to-r',
  'to-br': 'bg-linear-to-br',
  'to-b': 'bg-linear-to-b',
  'to-bl': 'bg-linear-to-bl',
  'to-l': 'bg-linear-to-l',
  'to-tl': 'bg-linear-to-tl',
  'to-t': 'bg-linear-to-t',
  'to-tr': 'bg-linear-to-tr',
} as const;

// ─── Style Resolvers ─────────────────────────────────────────

/**
 * Returns Tailwind class names for block wrapper.
 * Handles padding, animation, and horizontal padding — everything expressible as Tailwind classes.
 */
export function resolveBlockClasses(block: BlockInstance): string {
  const classes: string[] = [];

  // Vertical padding — paddingTop/paddingBottom override paddingY
  if (block.styles.paddingTop || block.styles.paddingBottom) {
    const pt = block.styles.paddingTop ?? block.styles.paddingY ?? 'none';
    const pb = block.styles.paddingBottom ?? block.styles.paddingY ?? 'none';
    if (pt !== 'none') classes.push(PADDING_TOP_CLASSES[pt]);
    if (pb !== 'none') classes.push(PADDING_BOTTOM_CLASSES[pb]);
  } else if (block.styles.paddingY && block.styles.paddingY !== 'none') {
    classes.push(PADDING_CLASSES[block.styles.paddingY]);
  }

  // Horizontal padding (wrapper-level)
  if (block.styles.paddingX && block.styles.paddingX !== 'none') {
    classes.push(PADDING_X_CLASSES[block.styles.paddingX]);
  }

  // Animation
  const animation = block.styles.animation ?? 'none';
  const animClass = ANIMATION_CLASSES[animation];
  if (animClass) classes.push(animClass);

  // Animation delay
  const delay = block.styles.animationDelay ?? 'none';
  const delayClass = ANIMATION_DELAY_CLASSES[delay];
  if (delayClass) classes.push(delayClass);

  return classes.join(' ');
}

/**
 * Resolve design token classes for use INSIDE block components.
 * Components call this to get classes for tokens they support.
 * Returns individual token classes so components can apply them to the right elements.
 */
export function resolveTokenClasses(styles: BlockStyles): {
  maxWidth: string;
  columns: string;
  gap: string;
  borderRadius: string;
  shadow: string;
  borderWidth: string;
  cardStyle: string;
  headingSize: string;
  bodySize: string;
  textAlign: string;
  letterSpacing: string;
  lineHeight: string;
  textTransform: string;
} {
  return {
    maxWidth: MAX_WIDTH_CLASSES[styles.maxWidth ?? 'lg'],
    columns: COLUMNS_CLASSES[styles.columns ?? 3],
    gap: GAP_CLASSES[styles.gap ?? 'md'],
    borderRadius: BORDER_RADIUS_CLASSES[styles.borderRadius ?? 'md'],
    shadow: SHADOW_CLASSES[styles.shadow ?? 'none'],
    borderWidth: BORDER_WIDTH_CLASSES[styles.borderWidth ?? 'thin'],
    cardStyle: CARD_STYLE_CLASSES[styles.cardStyle ?? 'outlined'],
    headingSize: HEADING_SIZE_CLASSES[styles.headingSize ?? 'md'],
    bodySize: BODY_SIZE_CLASSES[styles.bodySize ?? 'md'],
    textAlign: TEXT_ALIGN_CLASSES[styles.textAlign ?? 'center'],
    letterSpacing: LETTER_SPACING_CLASSES[styles.letterSpacing ?? 'tight'],
    lineHeight: LINE_HEIGHT_CLASSES[styles.lineHeight ?? 'normal'],
    textTransform: TEXT_TRANSFORM_CLASSES[styles.textTransform ?? 'none'],
  };
}

/**
 * Returns ONLY inline styles for values Tailwind can't express:
 * dynamic colors, gradients, background images.
 */
export function resolveBlockInlineStyles(
  block: BlockInstance,
  _branding: TemplateBranding,
): CSSProperties {
  const style: CSSProperties = {};

  if (block.styles.backgroundColor) {
    style.backgroundColor = block.styles.backgroundColor;
  }

  if (block.styles.textColor) {
    style.color = block.styles.textColor;
  }

  // Background gradient (overridden by backgroundImage if both set)
  if (block.styles.gradientFrom && block.styles.gradientTo && !block.styles.backgroundImage) {
    const dir = block.styles.gradientDirection ?? 'to-b';
    const cssDir = dir.replace('to-', 'to ').replace('-', ' ');
    style.backgroundImage = `linear-gradient(${cssDir}, ${block.styles.gradientFrom}, ${block.styles.gradientTo})`;
  }

  if (block.styles.backgroundImage) {
    style.backgroundImage = `url(${block.styles.backgroundImage})`;
    style.backgroundSize = 'cover';
    style.backgroundPosition = 'center';
  }

  // Background opacity
  if (block.styles.backgroundOpacity != null && block.styles.backgroundOpacity < 100) {
    style.opacity = block.styles.backgroundOpacity / 100;
  }

  return style;
}

// ─── Legacy Format Detection & Migration ─────────────────────

/**
 * Detect old TemplateContent format:
 * has `sections` key (Record<string, Record<string, unknown>>), no `blocks` key.
 */
export function isLegacyContent(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  return 'sections' in obj && !('blocks' in obj);
}

/**
 * Convert old TemplateContent to PageData format.
 * Uses template definition's section order to create BlockInstance array.
 */
export function migrateToPageData(
  templateSections: Array<{ sectionId: string; props: Record<string, unknown> }>,
  oldContent: {
    branding: { companyName: string; tagline: string; primaryColor: string; logoUrl: string | null };
    sections: Record<string, Record<string, unknown>>;
  },
): PageData {
  // Import nanoid lazily to avoid issues in edge environments
  const { nanoid } = require('nanoid');

  const blocks: BlockInstance[] = templateSections.map((section) => ({
    id: nanoid(),
    blockType: section.sectionId,
    content: {
      ...section.props,
      ...(oldContent.sections[section.sectionId] ?? {}),
    },
    styles: {},
  }));

  return {
    branding: {
      companyName: oldContent.branding.companyName,
      tagline: oldContent.branding.tagline,
      primaryColor: oldContent.branding.primaryColor,
      secondaryColor: oldContent.branding.primaryColor,
      logoUrl: oldContent.branding.logoUrl,
      headingFont: 'Inter',
      bodyFont: 'Inter',
      defaultTheme: 'dark',
    },
    blocks,
  };
}

/**
 * Create an empty PageData with default branding.
 */
export function createEmptyPageData(): PageData {
  return {
    branding: {
      companyName: 'My Company',
      tagline: 'Your tagline here',
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      logoUrl: null,
      headingFont: 'Inter',
      bodyFont: 'Inter',
      defaultTheme: 'dark',
    },
    blocks: [],
  };
}
