'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { BlockComponentProps } from '../block-types';

interface NavLink {
  label: string;
  href: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
];

export function NavMinimal({ branding, content, styles }: BlockComponentProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoUrl = content.logoUrl as string | undefined;
  const rawLinks = (content.links ?? DEFAULT_LINKS) as Record<string, unknown>[];
  const links = rawLinks.map((l) => ({
    label: (l.label as string) ?? '',
    href: (l.href as string) ?? '#',
  }));

  return (
    <header
      data-lp-section="nav-minimal"
      className="relative z-50 bg-[var(--lp-site-bg)]"
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        {/* Logo / Company name */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          {logoUrl ? (
            <img src={logoUrl} alt={branding.companyName} className="h-7 w-auto" />
          ) : (
            <span className="text-base font-semibold text-[var(--lp-site-heading)]">{branding.companyName}</span>
          )}
        </a>

        {/* Desktop links — right side */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[var(--lp-site-body)] hover:text-[var(--lp-site-heading)] transition-colors"
            >
              {link.label}
            </a>
          ))}
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
        <div className="md:hidden border-t border-[var(--lp-site-border-subtle)] bg-[var(--lp-site-bg)]">
          <div className="space-y-1 px-6 py-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm text-[var(--lp-site-body)] hover:text-[var(--lp-site-heading)] hover:bg-[var(--lp-site-ghost-hover)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
