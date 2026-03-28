'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Clock, Puzzle, DollarSign } from 'lucide-react';
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
            Your Idea Deserves a <br className="hidden sm:block" />
            <span className="landing-hero-highlight">Launch Page in Minutes</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.5}>
          <p className="landing-hero-desc">
            Waitlist, payments, analytics, custom domain &mdash; everything you need to validate
            your next product. One dashboard, zero complexity.
          </p>
        </FadeIn>

        {/* Pain points */}
        <FadeIn delay={0.6}>
          <div className="landing-hero-pain">
            <div className="landing-hero-pain-item">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">No more spending weeks on setup</span>
            </div>
            <div className="landing-hero-pain-item">
              <Puzzle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">No more stitching 10 tools together</span>
            </div>
            <div className="landing-hero-pain-item">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">No more $50/mo for a simple page</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.8}>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/signup" className="landing-hero-cta">
              Start Free &mdash; No Credit Card
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              See how it works &rarr;
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
