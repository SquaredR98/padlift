'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Rocket, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { AnimatePresence, motion } from '../motion';
import './styles.css';

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`landing-nav ${scrolled ? 'landing-nav-scrolled' : ''}`}>
      <div className="landing-nav-inner">
        <Link href="/" className="landing-nav-logo">
          <Rocket className="h-6 w-6 text-blue-500 dark:text-blue-400" />
          <span className="text-lg font-bold text-foreground">Padlift</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 sm:flex">
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a>
          <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Pricing</a>
          <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
          <ThemeToggle />
          <Link href="/login" className="landing-nav-login">Sign in</Link>
          <Link href="/signup" className="landing-nav-cta">Get Started</Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="sm:hidden p-2 text-muted-foreground">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border sm:hidden"
          >
            <div className="flex flex-col gap-3 px-6 py-4">
              <a href="#features" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground">Features</a>
              <a href="#pricing" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground">Pricing</a>
              <a href="#faq" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground">FAQ</a>
              <div className="flex items-center gap-3 pt-2">
                <ThemeToggle />
                <Link href="/login" className="text-sm text-muted-foreground">Sign in</Link>
                <Link href="/signup" className="landing-nav-cta text-center">Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
