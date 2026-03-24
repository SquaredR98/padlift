'use client';

import { useEffect } from 'react';
import { FONT_PAIRS } from '@/lib/templates/font-pairs';
import { SingleFontSelect } from './single-font-select';

interface FontPairPickerProps {
  headingFont: string;
  bodyFont: string;
  onChangeHeading: (font: string) => void;
  onChangeBody: (font: string) => void;
}

export function FontPairPicker({ headingFont, bodyFont, onChangeHeading, onChangeBody }: FontPairPickerProps) {
  // Load preset fonts for preview
  useEffect(() => {
    const families = [...new Set(FONT_PAIRS.flatMap((p) => [p.headingFont, p.bodyFont]))];
    const url = `https://fonts.googleapis.com/css2?${families
      .map((f) => `family=${encodeURIComponent(f)}:wght@400;600`)
      .join('&')}&display=swap`;
    const id = 'lp-font-pair-preview';
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = url;
  }, []);

  return (
    <div className="space-y-3">
      <div>
        <span className="text-xs font-medium text-[var(--lp-text-secondary)] mb-1.5 block">
          Font Pair Presets
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {FONT_PAIRS.map((pair) => {
            const isActive = pair.headingFont === headingFont && pair.bodyFont === bodyFont;
            return (
              <button
                key={pair.label}
                type="button"
                onClick={() => { onChangeHeading(pair.headingFont); onChangeBody(pair.bodyFont); }}
                className={`rounded-lg border p-2.5 text-left transition ${
                  isActive
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-[var(--lp-border)] hover:border-[var(--lp-text-muted)]'
                }`}
              >
                <p
                  className="text-sm font-semibold text-[var(--lp-text)] truncate leading-tight"
                  style={{ fontFamily: `'${pair.headingFont}', sans-serif` }}
                >
                  {pair.label}
                </p>
                <p
                  className="mt-0.5 text-[10px] text-[var(--lp-text-muted)] truncate"
                  style={{ fontFamily: `'${pair.bodyFont}', sans-serif` }}
                >
                  {pair.headingFont === pair.bodyFont
                    ? pair.headingFont
                    : `${pair.headingFont} + ${pair.bodyFont}`}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-medium text-[var(--lp-text-secondary)] block">
          Custom Fonts
        </span>
        <SingleFontSelect label="Heading Font" value={headingFont} onChange={onChangeHeading} />
        <SingleFontSelect label="Body Font" value={bodyFont} onChange={onChangeBody} />
      </div>
    </div>
  );
}
