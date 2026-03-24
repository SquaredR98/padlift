'use client';

import { useState } from 'react';
import type { BlockComponentProps } from '../block-types';

interface NavLink { label: string; href: string; }

export function NavAnnouncement({ branding, content }: BlockComponentProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const ctaText = (content.ctaText as string) ?? 'Get Started';
  const ctaUrl = (content.ctaUrl as string) ?? '#';
  const rawLinks = (content.links ?? []) as Record<string, unknown>[];
  const links: NavLink[] = rawLinks.map((l) => ({ label: (l.label as string) ?? '', href: (l.href as string) ?? '#' }));
  const announcementText = (content.announcementText as string) ?? 'We just launched v2.0! Check out the new features.';
  const announcementUrl = (content.announcementUrl as string) ?? '';

  return (
    <header data-lp-section="nav-announcement" className="relative z-50">
      {/* Announcement bar */}
      {!bannerDismissed && announcementText && (
        <div className="relative px-6 py-2 text-center text-sm text-white" style={{ backgroundColor: branding.primaryColor }}>
          {announcementUrl ? (
            <a href={announcementUrl} className="font-medium hover:underline">{announcementText}</a>
          ) : (
            <span className="font-medium">{announcementText}</span>
          )}
          <button
            onClick={() => setBannerDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
            aria-label="Dismiss"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Nav bar */}
      <nav className="border-b border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-bg)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="text-xl font-bold text-[var(--lp-site-heading)]" data-lp-brand="company">
            {branding.companyName}
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {links.map((link, i) => (
              <a key={i} href={link.href} className="text-sm font-medium text-[var(--lp-site-body)] transition-colors hover:text-[var(--lp-site-heading)]">
                {link.label}
              </a>
            ))}
            <a
              href={ctaUrl}
              className="rounded-lg px-5 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: branding.primaryColor }}
            >
              {ctaText}
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[var(--lp-site-heading)]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-[var(--lp-site-border)] bg-[var(--lp-site-bg)] px-6 py-4 md:hidden">
            <div className="space-y-3">
              {links.map((link, i) => (
                <a key={i} href={link.href} className="block text-sm font-medium text-[var(--lp-site-body)]">
                  {link.label}
                </a>
              ))}
              <a
                href={ctaUrl}
                className="mt-3 block rounded-lg px-5 py-2.5 text-center text-sm font-semibold text-white"
                style={{ backgroundColor: branding.primaryColor }}
              >
                {ctaText}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
