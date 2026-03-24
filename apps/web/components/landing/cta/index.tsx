'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '../motion';
import './styles.css';

export function LandingCTA() {
  return (
    <section className="landing-cta-section">
      <div className="landing-cta-glow" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Your Next Launch Starts Here</h2>
          <p className="mt-4 text-lg text-blue-100/80">
            Stop overthinking and start shipping. Launch your landing page in minutes.
          </p>
          <Link href="/signup" className="landing-cta-button">
            Start Free &mdash; No Credit Card
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
