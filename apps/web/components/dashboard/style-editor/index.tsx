'use client';

import type { BlockStyles, StyleTokenKey } from '@/lib/templates/block-types';
import { ColorField } from '@/components/dashboard/form-fields';
import { ImageField } from '@/app/dashboard/sites/[siteId]/edit/_components/ImageField';
import { PillSelect, RangeField, StyleGroup } from './helpers';
import {
  PADDING_OPTIONS, PADDING_X_OPTIONS, MAX_WIDTH_OPTIONS, COLUMNS_OPTIONS, GAP_OPTIONS,
  RADIUS_OPTIONS, SHADOW_OPTIONS, BORDER_WIDTH_OPTIONS, CARD_STYLE_OPTIONS,
  HEADING_SIZE_OPTIONS, BODY_SIZE_OPTIONS, TEXT_ALIGN_OPTIONS,
  LETTER_SPACING_OPTIONS, LINE_HEIGHT_OPTIONS, TEXT_TRANSFORM_OPTIONS,
  ANIMATION_OPTIONS, ANIMATION_DELAY_OPTIONS, GRADIENT_DIRECTION_OPTIONS,
} from './data';

interface StyleEditorProps {
  styles: BlockStyles;
  onChange: (key: string, value: unknown) => void;
  applicableStyles?: StyleTokenKey[];
}

export function StyleEditor({ styles, onChange, applicableStyles }: StyleEditorProps) {
  const has = (key: StyleTokenKey) => !applicableStyles || applicableStyles.includes(key);

  const hasColors = has('backgroundColor') || has('textColor') || has('accentColor');
  const hasGradient = has('gradientFrom') || has('gradientTo') || has('gradientDirection');
  const hasBackground = has('backgroundImage') || has('backgroundOverlay') || has('backgroundOpacity') || hasGradient;
  const hasLayout = has('maxWidth') || has('paddingX') || has('paddingY') || has('paddingTop') || has('paddingBottom') || has('columns') || has('gap');
  const hasCards = has('borderRadius') || has('shadow') || has('borderWidth') || has('cardStyle');
  const hasTypography = has('headingSize') || has('bodySize') || has('textAlign') || has('letterSpacing') || has('lineHeight') || has('textTransform');
  const hasEffects = has('animation') || has('animationDelay') || has('showDecorations');

  return (
    <div className="space-y-1">
      {hasColors && (
        <StyleGroup label="Colors" defaultOpen={true}>
          {has('backgroundColor') && <ColorField label="Background Color" value={styles.backgroundColor ?? ''} onChange={(v) => onChange('backgroundColor', v)} />}
          {has('textColor') && <ColorField label="Text Color" value={styles.textColor ?? ''} onChange={(v) => onChange('textColor', v)} />}
          {has('accentColor') && <ColorField label="Accent Color" value={styles.accentColor ?? ''} onChange={(v) => onChange('accentColor', v)} />}
        </StyleGroup>
      )}

      {hasBackground && (
        <StyleGroup label="Background">
          {has('backgroundImage') && <ImageField label="Background Image" value={styles.backgroundImage ?? ''} onChange={(v) => onChange('backgroundImage', v)} placeholder="Upload background image" />}
          {has('backgroundOverlay') && styles.backgroundImage && <ColorField label="Background Overlay" value={styles.backgroundOverlay ?? ''} onChange={(v) => onChange('backgroundOverlay', v)} />}
          {has('gradientFrom') && <ColorField label="Gradient Start" value={styles.gradientFrom ?? ''} onChange={(v) => onChange('gradientFrom', v)} />}
          {has('gradientTo') && <ColorField label="Gradient End" value={styles.gradientTo ?? ''} onChange={(v) => onChange('gradientTo', v)} />}
          {has('gradientDirection') && (styles.gradientFrom || styles.gradientTo) && (
            <PillSelect label="Gradient Direction" options={GRADIENT_DIRECTION_OPTIONS} value={styles.gradientDirection ?? 'to-b'} onChange={(v) => onChange('gradientDirection', v)} />
          )}
          {has('backgroundOpacity') && <RangeField label="Opacity" value={styles.backgroundOpacity ?? 100} onChange={(v) => onChange('backgroundOpacity', v)} />}
        </StyleGroup>
      )}

      {hasLayout && (
        <StyleGroup label="Layout">
          {has('maxWidth') && <PillSelect label="Max Width" options={MAX_WIDTH_OPTIONS} value={styles.maxWidth ?? 'lg'} onChange={(v) => onChange('maxWidth', v)} />}
          {has('paddingY') && !has('paddingTop') && <PillSelect label="Vertical Padding" options={PADDING_OPTIONS} value={styles.paddingY ?? 'none'} onChange={(v) => onChange('paddingY', v)} />}
          {has('paddingTop') && <PillSelect label="Top Padding" options={PADDING_OPTIONS} value={styles.paddingTop ?? styles.paddingY ?? 'none'} onChange={(v) => onChange('paddingTop', v)} />}
          {has('paddingBottom') && <PillSelect label="Bottom Padding" options={PADDING_OPTIONS} value={styles.paddingBottom ?? styles.paddingY ?? 'none'} onChange={(v) => onChange('paddingBottom', v)} />}
          {has('paddingX') && <PillSelect label="Horizontal Padding" options={PADDING_X_OPTIONS} value={styles.paddingX ?? 'md'} onChange={(v) => onChange('paddingX', v)} />}
          {has('columns') && <PillSelect label="Columns" options={COLUMNS_OPTIONS} value={String(styles.columns ?? 3)} onChange={(v) => onChange('columns', Number(v))} />}
          {has('gap') && <PillSelect label="Gap" options={GAP_OPTIONS} value={styles.gap ?? 'md'} onChange={(v) => onChange('gap', v)} />}
        </StyleGroup>
      )}

      {hasCards && (
        <StyleGroup label="Cards & Surfaces">
          {has('cardStyle') && <PillSelect label="Card Style" options={CARD_STYLE_OPTIONS} value={styles.cardStyle ?? 'outlined'} onChange={(v) => onChange('cardStyle', v)} />}
          {has('borderRadius') && <PillSelect label="Corner Radius" options={RADIUS_OPTIONS} value={styles.borderRadius ?? 'md'} onChange={(v) => onChange('borderRadius', v)} />}
          {has('shadow') && <PillSelect label="Shadow" options={SHADOW_OPTIONS} value={styles.shadow ?? 'none'} onChange={(v) => onChange('shadow', v)} />}
          {has('borderWidth') && <PillSelect label="Border Width" options={BORDER_WIDTH_OPTIONS} value={styles.borderWidth ?? 'thin'} onChange={(v) => onChange('borderWidth', v)} />}
        </StyleGroup>
      )}

      {hasTypography && (
        <StyleGroup label="Typography">
          {has('headingSize') && <PillSelect label="Heading Size" options={HEADING_SIZE_OPTIONS} value={styles.headingSize ?? 'md'} onChange={(v) => onChange('headingSize', v)} />}
          {has('bodySize') && <PillSelect label="Body Size" options={BODY_SIZE_OPTIONS} value={styles.bodySize ?? 'md'} onChange={(v) => onChange('bodySize', v)} />}
          {has('textAlign') && <PillSelect label="Text Alignment" options={TEXT_ALIGN_OPTIONS} value={styles.textAlign ?? 'center'} onChange={(v) => onChange('textAlign', v)} />}
          {has('letterSpacing') && <PillSelect label="Letter Spacing" options={LETTER_SPACING_OPTIONS} value={styles.letterSpacing ?? 'tight'} onChange={(v) => onChange('letterSpacing', v)} />}
          {has('lineHeight') && <PillSelect label="Line Height" options={LINE_HEIGHT_OPTIONS} value={styles.lineHeight ?? 'normal'} onChange={(v) => onChange('lineHeight', v)} />}
          {has('textTransform') && <PillSelect label="Text Transform" options={TEXT_TRANSFORM_OPTIONS} value={styles.textTransform ?? 'none'} onChange={(v) => onChange('textTransform', v)} />}
        </StyleGroup>
      )}

      {hasEffects && (
        <StyleGroup label="Effects">
          {has('animation') && (
            <div>
              <span className="text-xs font-medium text-[var(--lp-text-muted)] mb-1.5 block">Entrance Animation</span>
              <select
                value={styles.animation ?? 'none'}
                onChange={(e) => onChange('animation', e.target.value)}
                className="w-full rounded-md border border-[var(--lp-border)] bg-[var(--lp-bg-surface)] px-3 py-2 text-sm text-[var(--lp-text)] focus:border-[var(--lp-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--lp-accent-muted)] transition-colors"
              >
                {ANIMATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          )}
          {has('animationDelay') && styles.animation && styles.animation !== 'none' && (
            <PillSelect label="Animation Delay" options={ANIMATION_DELAY_OPTIONS} value={styles.animationDelay ?? 'none'} onChange={(v) => onChange('animationDelay', v)} />
          )}
          {has('showDecorations') && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={styles.showDecorations !== false}
                onChange={(e) => onChange('showDecorations', e.target.checked)}
                className="h-4 w-4 rounded border-[var(--lp-border)] bg-[var(--lp-bg-surface)] text-[var(--lp-accent)] focus:ring-[var(--lp-accent-muted)]"
              />
              <span className="text-xs font-medium text-[var(--lp-text-muted)]">Show Decorations</span>
            </label>
          )}
        </StyleGroup>
      )}
    </div>
  );
}
