'use client';

import {
  Zap,
  Globe,
  Users,
  CreditCard,
  BarChart3,
  Moon,
  Smartphone,
  Layers,
} from 'lucide-react';
import { FadeIn, HoverCard, motion, staggerContainer, staggerItem } from '../motion';
import './styles.css';

const FEATURES = [
  { icon: Zap, title: 'Launch in Minutes, Not Weeks', desc: 'Drag-and-drop builder with 20+ templates and 80+ blocks. No code, no headaches.' },
  { icon: Globe, title: 'Your Brand, Your Domain', desc: 'Connect your own domain with automatic SSL. Full control over colors, fonts, and layout.' },
  { icon: Users, title: 'Built-in Waitlist That Goes Viral', desc: 'Referral tracking, auto-ranking, and one-click Google Sheets export. Growth on autopilot.' },
  { icon: BarChart3, title: 'Know What\'s Working', desc: 'Privacy-friendly analytics with conversion tracking. No cookies, no third-party scripts.' },
  { icon: CreditCard, title: 'Collect Payments Instantly', desc: 'Native payment links via Gumroad. Add subscriptions and one-time payments in seconds.' },
  { icon: Moon, title: 'Dark Mode That Actually Works', desc: 'Auto dark and light themes for your visitors. Looks great on every screen, every time.' },
  { icon: Smartphone, title: 'Works Everywhere', desc: 'Responsive on every device. Fast loading, optimized images, clean code out of the box.' },
  { icon: Layers, title: 'Grow Without Limits', desc: 'Multi-page sites, A/B testing, webhooks, and more. Scale from idea to product-market fit.' },
];

export function LandingFeatures() {
  return (
    <section id="features" className="landing-features">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stop stitching together 10 different tools. One dashboard does it all.
          </p>
        </FadeIn>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {FEATURES.map((f) => (
            <motion.div key={f.title} variants={staggerItem}>
              <HoverCard className="landing-feature-card">
                <div className="landing-feature-icon">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </HoverCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
