'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FadeIn, SpringIn } from '../motion';
import './styles.css';

export function LandingHero() {
  return (
    <section className="landing-hero">
      {/* Gradient mesh backdrop */}
      <div className="landing-hero-glow landing-hero-glow-blue" />
      <div className="landing-hero-glow landing-hero-glow-cyan" />
      <div className="landing-hero-dots" />

      <div className="landing-hero-inner">
        <SpringIn delay={0.1}>
          <div className="landing-hero-badge">
            <Sparkles className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
            <span className="text-muted-foreground">Free to start &mdash; no credit card required</span>
          </div>
        </SpringIn>

        <FadeIn delay={0.3} className="landing-hero-title">
          <h1>
            Stop Juggling 10 Tools <br className="hidden sm:block" />
            <span className="landing-hero-highlight">to Launch a Landing Page</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.5}>
          <p className="landing-hero-desc">
            One dashboard. Waitlist, payments, analytics, custom domain &mdash; ready in minutes, not weeks.
          </p>
        </FadeIn>

        <FadeIn delay={0.7}>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/signup" className="landing-hero-cta">
              Start Free &mdash; No Credit Card
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              See what&apos;s included &rarr;
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
