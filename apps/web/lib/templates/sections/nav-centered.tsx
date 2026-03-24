'use client';

import { useState } from 'react';
import type { BlockComponentProps } from '../block-types';

interface NavLink { label: string; href: string; }

export function NavCentered({ branding, content }: BlockComponentProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const ctaText = (content.ctaText as string) ?? 'Get Started';
  const ctaUrl = (content.ctaUrl as string) ?? '#';
  const rawLinks = (content.links ?? []) as Record<string, unknown>[];
  const links: NavLink[] = rawLinks.map((l) => ({ label: (l.label as string) ?? '', href: (l.href as string) ?? '#' }));

  const half = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, half);
  const rightLinks = links.slice(half);

  return (
    <header
      data-lp-section="nav-centered"
      className="relative z-50 border-b border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-bg)]"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left links (desktop) */}
        <div className="hidden flex-1 items-center justify-end gap-6 lg:flex">
          {leftLinks.map((link, i) => (
            <a key={i} href={link.href} className="text-sm font-medium text-[var(--lp-site-body)] transition-colors hover:text-[var(--lp-site-heading)]">
              {link.label}
            </a>
          ))}
        </div>

        {/* Center logo */}
        <a href="/" className="mx-6 shrink-0 text-xl font-bold text-[var(--lp-site-heading)]" data-lp-brand="company">
          {branding.companyName}
        </a>

        {/* Right links + CTA (desktop) */}
        <div className="hidden flex-1 items-center gap-6 lg:flex">
          {rightLinks.map((link, i) => (
            <a key={i} href={link.href} className="text-sm font-medium text-[var(--lp-site-body)] transition-colors hover:text-[var(--lp-site-heading)]">
              {link.label}
            </a>
          ))}
          <a
            href={ctaUrl}
            className="ml-auto rounded-lg px-5 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: branding.primaryColor }}
          >
            {ctaText}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-[var(--lp-site-heading)]"
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
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--lp-site-border)] bg-[var(--lp-site-bg)] px-6 py-4 lg:hidden">
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
    </header>
  );
}
