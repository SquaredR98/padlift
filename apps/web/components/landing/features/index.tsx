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
  Paintbrush,
  Link2,
  TableProperties,
  Webhook,
} from 'lucide-react';
import { FadeIn, HoverCard, motion, staggerContainer, staggerItem } from '../motion';
import './styles.css';

const FEATURES = [
  {
    icon: Zap,
    title: 'Launch in Minutes',
    desc: 'Pick a template, tweak the copy, hit publish. Your page is live with a shareable link before your coffee gets cold.',
  },
  {
    icon: Paintbrush,
    title: '80+ Blocks, Zero Code',
    desc: 'Drag-and-drop hero sections, feature grids, pricing tables, testimonials, FAQs and more. Customize colors, fonts, and layout visually.',
  },
  {
    icon: Globe,
    title: 'Custom Domain + SSL',
    desc: 'Connect your own domain in one click. Automatic HTTPS, no server config. Your brand, your URL.',
  },
  {
    icon: Users,
    title: 'Viral Waitlist Built In',
    desc: 'Every signup gets a unique referral link and queue position. Top referrers move up. Growth on autopilot — no third-party widget needed.',
  },
  {
    icon: BarChart3,
    title: 'Privacy-First Analytics',
    desc: 'See visitors, signups, conversion rate, top pages and referrers. No cookies, no third-party scripts, fully GDPR-friendly.',
  },
  {
    icon: CreditCard,
    title: 'Collect Payments',
    desc: 'Add Gumroad payment links to any page. Subscriptions or one-time payments in seconds — no Stripe setup required.',
  },
  {
    icon: Moon,
    title: 'Dark & Light Themes',
    desc: 'Every template supports automatic dark and light mode. Your visitors choose their preference with a single click.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Everywhere',
    desc: 'Pixel-perfect on phones, tablets, and desktops. Fast loading, optimized images, clean semantic HTML.',
  },
  {
    icon: TableProperties,
    title: 'Google Sheets Sync',
    desc: 'Push every waitlist signup to a Google Sheet automatically. Your data lives where you already work.',
  },
  {
    icon: Webhook,
    title: 'Webhooks & Integrations',
    desc: 'Trigger webhooks on every signup. Connect to Zapier, Make, n8n, or your own backend with zero code.',
  },
  {
    icon: Link2,
    title: 'Shareable Referral Links',
    desc: 'Each waitlist entry gets a unique referral link. Track referrals, rank by performance, and reward your early adopters.',
  },
  {
    icon: Layers,
    title: 'Scale When Ready',
    desc: 'Start free, upgrade when you grow. Multi-page sites, A/B testing, remove branding — everything scales with your product.',
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="landing-features">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="mb-4 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-blue-500 dark:text-blue-400">Features</p>
        </FadeIn>
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Everything you need to launch. Nothing you don&apos;t.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Other tools make you pay for 10 subscriptions and glue them together.
            Padlift gives you one dashboard with every feature built in.
          </p>
        </FadeIn>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
