'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BlockComponentProps } from '../block-types';

interface NavLink {
  label: string;
  href: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export function NavTransparent({ branding, content, styles }: BlockComponentProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoUrl = content.logoUrl as string | undefined;
  const ctaText = content.ctaText as string ?? 'Get Started';
  const ctaUrl = content.ctaUrl as string ?? '#';
  const rawLinks = (content.links ?? DEFAULT_LINKS) as Record<string, unknown>[];
  const links = rawLinks.map((l) => ({
    label: (l.label as string) ?? '',
    href: (l.href as string) ?? '#',
  }));

  return (
    <header
      data-lp-section="nav-transparent"
      className="relative z-50"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo / Company name */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          {logoUrl ? (
            <img src={logoUrl} alt={branding.companyName} className="h-8 w-auto" />
          ) : (
            <span className="text-lg font-bold text-[var(--lp-site-heading)]">{branding.companyName}</span>
          )}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[var(--lp-site-body)] hover:text-[var(--lp-site-heading)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button
            size="sm"
            variant="outline"
            className="rounded-lg px-5 text-sm font-semibold text-[var(--lp-site-heading)] border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-badge-bg)] backdrop-blur-sm hover:bg-[var(--lp-site-ghost-hover)] hover:border-white/30 transition-all"
            asChild
          >
            <a href={ctaUrl}>{ctaText}</a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden rounded-md p-2 text-[var(--lp-site-body)] hover:text-[var(--lp-site-heading)] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--lp-site-bg)] backdrop-blur-md border-t border-[var(--lp-site-border-subtle)]">
          <div className="space-y-1 px-6 py-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-[var(--lp-site-body)] hover:text-[var(--lp-site-heading)] hover:bg-[var(--lp-site-ghost-hover)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <Button
                size="sm"
                variant="outline"
                className="w-full rounded-lg text-sm font-semibold text-[var(--lp-site-heading)] border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-badge-bg)] hover:bg-[var(--lp-site-ghost-hover)] transition-all"
                asChild
              >
                <a href={ctaUrl}>{ctaText}</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
