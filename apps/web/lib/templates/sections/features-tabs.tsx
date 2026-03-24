'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { resolveTokenClasses, type BlockComponentProps } from '../block-types';

export function FeaturesTabs({ branding, content, styles }: BlockComponentProps) {
  const tokens = resolveTokenClasses(styles);
  const title = (content.title as string) ?? 'Powerful features';
  const subtitle = (content.subtitle as string) ?? 'Explore what makes our platform stand out.';
  const tabs = (content.tabs as Array<{ label: string; title: string; description: string; imageUrl?: string }>) ?? [
    { label: 'Dashboard', title: 'Intuitive Dashboard', description: 'Monitor all your metrics from a single, beautifully designed dashboard.' },
    { label: 'Analytics', title: 'Deep Analytics', description: 'Understand your audience with powerful analytics and insights.' },
    { label: 'Automation', title: 'Smart Automation', description: 'Automate repetitive tasks and focus on what matters most.' },
  ];

  const [active, setActive] = useState(0);
  const activeTab = tabs[active] ?? tabs[0];

  return (
    <section
      data-lp-section="features-tabs"
      className="bg-[var(--lp-site-bg)] px-6 py-20 sm:py-28"
    >
      <div className={cn('mx-auto', tokens.maxWidth)}>
        <div className={cn(tokens.textAlign)}>
          <h2 className={cn('font-bold text-[var(--lp-site-heading)]', tokens.headingSize, tokens.letterSpacing, tokens.lineHeight, tokens.textTransform)}>
            {title}
          </h2>
          {subtitle && (
            <p className={cn('mt-4 text-[var(--lp-site-body)]', tokens.bodySize)}>{subtitle}</p>
          )}
        </div>

        {/* Tab bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-colors',
                i === active
                  ? 'text-white'
                  : 'bg-[var(--lp-site-card)] text-[var(--lp-site-body)] hover:bg-[var(--lp-site-card-hover)]'
              )}
              style={i === active ? { backgroundColor: branding.primaryColor } : undefined}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab && (
          <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold text-[var(--lp-site-heading)]">
                {activeTab.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[var(--lp-site-body)]">
                {activeTab.description}
              </p>
            </div>
            <div className={cn('overflow-hidden bg-[var(--lp-site-card)]', tokens.cardStyle, tokens.borderRadius)}>
              {activeTab.imageUrl ? (
                <img
                  src={activeTab.imageUrl}
                  alt={activeTab.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="flex aspect-video items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${branding.primaryColor}10, ${branding.secondaryColor}10)` }}
                >
                  <p className="text-sm text-[var(--lp-site-muted)]">Upload an image</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
