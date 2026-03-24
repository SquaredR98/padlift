'use client';

import { FadeIn, motion, staggerContainer, staggerItem } from '../motion';
import './styles.css';

const STEPS = [
  { num: '1', title: 'Pick a Starting Point', desc: 'Choose from 20+ templates designed to convert. Each one is fully customizable.' },
  { num: '2', title: 'Make It Yours', desc: 'Customize branding, content, and layout in the visual editor. No code needed.' },
  { num: '3', title: 'Launch & Grow', desc: 'Publish to your domain and start collecting signups, payments, and insights.' },
];

export function LandingHowItWorks() {
  return (
    <section className="landing-how-it-works">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Live in three steps</h2>
          <p className="mt-4 text-lg text-muted-foreground">From zero to published in one afternoon.</p>
        </FadeIn>

        <motion.div
          className="landing-steps-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {STEPS.map((s, i) => (
            <motion.div key={s.num} variants={staggerItem} className="landing-step">
              <div className="landing-step-num">{s.num}</div>
              {i < STEPS.length - 1 && (
                <div className="landing-step-connector" />
              )}
              <h3 className="mt-4 font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
