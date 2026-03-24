import { nanoid } from 'nanoid';
import type { PageData, BlockInstance, TemplateBranding } from './block-types';
import { BLOCK_REGISTRY } from './block-registry';

// ─── Preset Types ────────────────────────────────────────────

export interface TemplatePreset {
  id: string;
  name: string;
  description: string;
  category: string;
  blocks: Array<{ blockType: string; content: Record<string, unknown> }>;
  branding: Partial<TemplateBranding>;
  seo: { title: string; description: string };
}

// ─── Presets ─────────────────────────────────────────────────

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: 'saas-starter',
    name: 'SaaS Starter',
    description: 'Full-featured SaaS landing page with hero, features, pricing, testimonials, FAQ, and CTA.',
    category: 'saas',
    blocks: [
      { blockType: 'nav-standard', content: { ctaText: 'Get Started Free', links: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }, { label: 'Testimonials', href: '#testimonials' }, { label: 'FAQ', href: '#faq' }] } },
      { blockType: 'hero-centered', content: { badge: 'Now in Public Beta', ctaPrimary: 'Get Started Free', ctaSecondary: 'See how it works' } },
      { blockType: 'features-grid', content: {} },
      { blockType: 'pricing-cards', content: {} },
      { blockType: 'testimonials-cards', content: {} },
      { blockType: 'cta-gradient', content: {} },
      { blockType: 'faq-accordion', content: {} },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'LaunchKit', tagline: 'Ship products faster', primaryColor: '#3b82f6', headingFont: 'Plus Jakarta Sans', bodyFont: 'Inter' },
    seo: { title: 'SaaS Starter Template', description: 'A conversion-optimized SaaS landing page.' },
  },
  {
    id: 'viral-waitlist',
    name: 'Viral Waitlist',
    description: 'Waitlist-focused page designed for pre-launch with split hero and email capture.',
    category: 'waitlist',
    blocks: [
      { blockType: 'nav-transparent', content: { ctaText: 'Join the Waitlist', links: [{ label: 'Features', href: '#features' }, { label: 'Waitlist', href: '#waitlist' }] } },
      { blockType: 'hero-split', content: { subheadline: 'Be the first to experience the future of product launches. Join the waitlist for early access and exclusive perks.', ctaPrimary: 'Join the Waitlist', ctaSecondary: 'Learn More' } },
      { blockType: 'features-alternating', content: {} },
      { blockType: 'waitlist-form', content: {} },
      { blockType: 'testimonials-quote', content: {} },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'Waitly', tagline: 'The future of product launches', primaryColor: '#8b5cf6', headingFont: 'Space Grotesk', bodyFont: 'DM Sans' },
    seo: { title: 'Viral Waitlist Template', description: 'A pre-launch waitlist page with split hero and email capture.' },
  },
  {
    id: 'minimal-waitlist',
    name: 'Minimal Waitlist',
    description: 'Ultra-clean waitlist page. Centered hero, email capture, nothing else.',
    category: 'waitlist',
    blocks: [
      { blockType: 'nav-minimal', content: { links: [{ label: 'About', href: '#about' }] } },
      { blockType: 'hero-centered', content: { badge: 'Coming Soon', subheadline: "We're building something new. Be the first to know when we launch.", ctaPrimary: 'Join the Waitlist', ctaSecondary: '' } },
      { blockType: 'waitlist-form', content: {} },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'Launchly', tagline: 'Something new is coming', primaryColor: '#06b6d4' },
    seo: { title: 'Minimal Waitlist Template', description: 'An ultra-clean waitlist landing page.' },
  },
  {
    id: 'gradient-waitlist',
    name: 'Gradient Waitlist',
    description: 'Eye-catching waitlist page with split hero and social proof.',
    category: 'waitlist',
    blocks: [
      { blockType: 'nav-transparent', content: { ctaText: 'Get Early Access', links: [{ label: 'Waitlist', href: '#waitlist' }, { label: 'Testimonials', href: '#testimonials' }] } },
      { blockType: 'hero-split', content: { subheadline: 'Join thousands of early adopters already on the list.', ctaPrimary: 'Get Early Access', ctaSecondary: 'Learn More' } },
      { blockType: 'waitlist-form', content: {} },
      { blockType: 'testimonials-quote', content: {} },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'Gradient', tagline: 'The future, reimagined', primaryColor: '#a855f7' },
    seo: { title: 'Gradient Waitlist Template', description: 'A vibrant waitlist page with social proof.' },
  },
  {
    id: 'yc-waitlist',
    name: 'YC Waitlist',
    description: 'Startup-grade waitlist page with social proof, stats, and email capture.',
    category: 'waitlist',
    blocks: [
      { blockType: 'nav-minimal', content: { links: [{ label: 'About', href: '#about' }, { label: 'Stats', href: '#stats' }] } },
      { blockType: 'hero-centered', content: { badge: 'Backed by Y Combinator', subheadline: "We're reimagining the way teams build products.", ctaPrimary: 'Request Access', ctaSecondary: 'See the Vision' } },
      { blockType: 'logo-cloud', content: {} },
      { blockType: 'waitlist-form', content: {} },
      { blockType: 'stats-counter', content: {} },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'FounderKit', tagline: 'Ship faster, scale smarter', primaryColor: '#f97316' },
    seo: { title: 'YC Waitlist Template', description: 'A startup-grade waitlist page.' },
  },
  {
    id: 'indie-hacker',
    name: 'Indie Hacker',
    description: 'Lean landing page for solo builders with pricing and a bold CTA.',
    category: 'saas',
    blocks: [
      { blockType: 'nav-standard', content: { ctaText: 'Start Building Free', links: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }] } },
      { blockType: 'hero-split', content: { subheadline: 'Ship your MVP this weekend. One platform for your landing page, payments, and waitlist.', ctaPrimary: 'Start Building Free', ctaSecondary: 'See Pricing' } },
      { blockType: 'features-grid', content: { title: 'Ship faster with less', subtitle: "Everything an indie builder needs. Nothing you don't." } },
      { blockType: 'pricing-cards', content: {} },
      { blockType: 'cta-gradient', content: { title: 'Stop building infrastructure. Start building products.', subtitle: 'Join thousands of indie hackers who launched faster.', ctaPrimary: 'Start Free', ctaSecondary: 'See Pricing' } },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'ShipFast', tagline: 'Build. Ship. Grow.', primaryColor: '#f59e0b' },
    seo: { title: 'Indie Hacker Template', description: 'A lean landing page for indie hackers.' },
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    description: 'Newsletter subscription page with email capture, social proof, and FAQ.',
    category: 'newsletter',
    blocks: [
      { blockType: 'nav-minimal', content: { links: [{ label: 'Subscribe', href: '#subscribe' }, { label: 'FAQ', href: '#faq' }] } },
      { blockType: 'hero-centered', content: { badge: 'Free Newsletter', subheadline: "Curated analysis and actionable takeaways delivered to your inbox.", ctaPrimary: 'Subscribe Now', ctaSecondary: 'Read Archive' } },
      { blockType: 'waitlist-form', content: { title: 'Get every issue in your inbox', subtitle: 'Join readers who get actionable insights every week.', ctaText: 'Subscribe Free' } },
      { blockType: 'testimonials-quote', content: {} },
      { blockType: 'faq-accordion', content: {} },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'The Weekly Byte', tagline: 'Actionable tech insights, every Friday', primaryColor: '#f43f5e' },
    seo: { title: 'Newsletter Template', description: 'A newsletter subscription page.' },
  },
  {
    id: 'coming-soon',
    name: 'Coming Soon',
    description: 'Pre-launch page with countdown timer and waitlist capture.',
    category: 'coming-soon',
    blocks: [
      { blockType: 'nav-minimal', content: { links: [{ label: 'Features', href: '#features' }, { label: 'Notify Me', href: '#waitlist' }] } },
      { blockType: 'hero-centered', content: { badge: 'Coming Soon', ctaPrimary: 'Get Notified', ctaSecondary: 'Learn More' } },
      { blockType: 'countdown-timer', content: {} },
      { blockType: 'features-grid', content: { title: 'What to expect', subtitle: "Here's a glimpse at what we're building." } },
      { blockType: 'waitlist-form', content: { title: 'Be the first to know', subtitle: "Drop your email and we'll notify you at launch.", ctaText: 'Notify Me' } },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'NovaTech', tagline: 'The future is almost here', primaryColor: '#f59e0b' },
    seo: { title: 'Coming Soon Template', description: 'A pre-launch coming soon page.' },
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'Portfolio-driven agency page with project showcase and stats.',
    category: 'agency',
    blocks: [
      { blockType: 'nav-transparent', content: { ctaText: 'Start a Project', links: [{ label: 'Work', href: '#work' }, { label: 'Testimonials', href: '#testimonials' }, { label: 'Contact', href: '#contact' }] } },
      { blockType: 'hero-split', content: { ctaPrimary: 'Start a Project', ctaSecondary: 'View Our Work' } },
      { blockType: 'logo-cloud', content: { title: 'Trusted by leading brands' } },
      { blockType: 'project-showcase', content: {} },
      { blockType: 'testimonials-cards', content: {} },
      { blockType: 'stats-counter', content: {} },
      { blockType: 'cta-gradient', content: { title: 'Ready to elevate your brand?', ctaPrimary: 'Get in Touch', ctaSecondary: 'View Portfolio' } },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'Pixel & Code', tagline: 'Digital experiences that convert', primaryColor: '#ec4899', headingFont: 'Playfair Display', bodyFont: 'Inter' },
    seo: { title: 'Agency Template', description: 'A portfolio-driven agency landing page.' },
  },
  {
    id: 'ai-product',
    name: 'AI Product',
    description: 'AI-focused product page with social proof and pricing.',
    category: 'ai',
    blocks: [
      { blockType: 'nav-standard', content: { ctaText: 'Try Free', links: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }, { label: 'FAQ', href: '#faq' }] } },
      { blockType: 'hero-centered', content: { badge: 'Powered by AI', ctaPrimary: 'Try Free', ctaSecondary: 'See Demo' } },
      { blockType: 'logo-cloud', content: { title: 'Used by teams at' } },
      { blockType: 'features-alternating', content: {} },
      { blockType: 'pricing-cards', content: {} },
      { blockType: 'testimonials-cards', content: {} },
      { blockType: 'faq-accordion', content: {} },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'Cortex AI', tagline: 'Intelligence that scales with you', primaryColor: '#6366f1' },
    seo: { title: 'AI Product Template', description: 'An AI product landing page.' },
  },
  {
    id: 'dev-tool',
    name: 'Dev Tool',
    description: 'Developer tool landing page with stats and pricing.',
    category: 'devtool',
    blocks: [
      { blockType: 'nav-standard', content: { ctaText: 'Get Started Free', links: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }, { label: 'Docs', href: '#docs' }] } },
      { blockType: 'hero-split', content: { ctaPrimary: 'Get Started Free', ctaSecondary: 'Read Docs' } },
      { blockType: 'stats-counter', content: { stats: [{ value: '2M+', label: 'npm downloads' }, { value: '15K', label: 'GitHub stars' }, { value: '99.99%', label: 'API uptime' }, { value: '<50ms', label: 'Avg response time' }] } },
      { blockType: 'features-grid', content: {} },
      { blockType: 'testimonials-quote', content: {} },
      { blockType: 'pricing-cards', content: {} },
      { blockType: 'cta-gradient', content: { title: 'Start building today', ctaPrimary: 'Create Free Account', ctaSecondary: 'Read Documentation' } },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'DevForge', tagline: 'Build better software, faster', primaryColor: '#10b981', headingFont: 'JetBrains Mono', bodyFont: 'Inter' },
    seo: { title: 'Dev Tool Template', description: 'A developer tool landing page.' },
  },
  {
    id: 'dark-mode-saas',
    name: 'Dark Mode SaaS',
    description: 'Sleek dark-themed page with comparison table and waitlist.',
    category: 'devtool',
    blocks: [
      { blockType: 'nav-standard', content: { ctaText: 'Get API Key', links: [{ label: 'Features', href: '#features' }, { label: 'Compare', href: '#compare' }, { label: 'Docs', href: '#docs' }] } },
      { blockType: 'hero-centered', content: { badge: 'Built for Developers', subheadline: 'The API-first platform that lets you ship production features in minutes.', ctaPrimary: 'Get API Key', ctaSecondary: 'Read Docs' } },
      { blockType: 'features-grid', content: { title: 'Developer-first features', subtitle: 'Built by developers, for developers.' } },
      { blockType: 'comparison-table', content: { competitor: 'Legacy tools', rows: [{ feature: 'Setup time', yours: '5 minutes', theirs: '2-3 hours' }, { feature: 'TypeScript support', yours: 'true', theirs: 'false' }, { feature: 'Starting price', yours: 'Free', theirs: '$99/mo' }] } },
      { blockType: 'waitlist-form', content: { title: 'Get early access', ctaText: 'Join Developer Preview' } },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'NightShift', tagline: 'Code at the speed of thought', primaryColor: '#22d3ee' },
    seo: { title: 'Dark Mode SaaS Template', description: 'A sleek dark-themed SaaS landing page.' },
  },
  {
    id: 'glassmorphism-launch',
    name: 'Glassmorphism Launch',
    description: 'Premium frosted-glass aesthetic with pricing and waitlist.',
    category: 'saas',
    blocks: [
      { blockType: 'nav-transparent', content: { ctaText: 'Join the Waitlist', links: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }] } },
      { blockType: 'hero-centered', content: { badge: 'Launching Soon', subheadline: 'Experience the next evolution of design tools.', ctaPrimary: 'Join the Waitlist', ctaSecondary: 'See Features' } },
      { blockType: 'features-alternating', content: { title: 'Crafted for creators', subtitle: 'Every pixel, every interaction — designed with intention.' } },
      { blockType: 'pricing-cards', content: {} },
      { blockType: 'waitlist-form', content: { title: 'Be among the first', ctaText: 'Reserve My Spot' } },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'Prism', tagline: 'Design without limits', primaryColor: '#a78bfa' },
    seo: { title: 'Glassmorphism Launch Template', description: 'A premium frosted-glass landing page.' },
  },
  {
    id: 'startup-bold',
    name: 'Startup Bold',
    description: 'High-energy startup page with social proof and bold CTA.',
    category: 'saas',
    blocks: [
      { blockType: 'nav-transparent', content: { ctaText: 'Start Free Trial', links: [{ label: 'Features', href: '#features' }, { label: 'About', href: '#about' }] } },
      { blockType: 'hero-split', content: { subheadline: 'We raised $4.2M to build the operating system for modern startups.', ctaPrimary: 'Start Free Trial', ctaSecondary: 'Book a Demo' } },
      { blockType: 'social-proof-bar', content: { items: [{ value: '$4.2M', text: 'raised' }, { value: '1,800+', text: 'founders' }, { value: '4.9/5', text: 'rating' }, { value: '< 5min', text: 'to launch' }] } },
      { blockType: 'features-grid', content: { title: 'Everything you need, nothing you don\'t' } },
      { blockType: 'cta-gradient', content: { title: 'Your product deserves better.', ctaPrimary: 'Launch Now', ctaSecondary: 'See Plans' } },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'Launchbase', tagline: 'The startup operating system', primaryColor: '#f43f5e' },
    seo: { title: 'Startup Bold Template', description: 'A high-energy startup landing page.' },
  },
  {
    id: 'mobile-app',
    name: 'Mobile App',
    description: 'Mobile app pre-launch page with benefits and how-it-works.',
    category: 'mobile',
    blocks: [
      { blockType: 'nav-transparent', content: { ctaText: 'Get Early Access', links: [{ label: 'Benefits', href: '#benefits' }, { label: 'How It Works', href: '#how-it-works' }, { label: 'Waitlist', href: '#waitlist' }] } },
      { blockType: 'hero-split', content: { subheadline: 'The app that replaces 5 others. Track habits, set goals, and build streaks.', ctaPrimary: 'Get Early Access', ctaSecondary: 'See How It Works' } },
      { blockType: 'benefit-cards', content: { title: 'Why 50,000+ people are waiting', cards: [{ emoji: '\uD83D\uDCF1', headline: 'Beautifully simple', description: 'No clutter, no overwhelm.' }, { emoji: '\uD83D\uDD14', headline: 'Smart reminders', description: 'Gentle nudges at the right time.' }, { emoji: '\uD83D\uDCCA', headline: 'Visual progress', description: 'See your streaks grow.' }, { emoji: '\uD83E\uDD1D', headline: 'Accountability groups', description: 'Join circles of like-minded people.' }] } },
      { blockType: 'testimonials-cards', content: { title: 'Beta testers love it' } },
      { blockType: 'how-it-works', content: { title: 'Get started in 60 seconds', steps: [{ number: '1', title: 'Download the app', description: 'Available on iOS and Android.' }, { number: '2', title: 'Set your first goal', description: 'Choose from templates or create custom.' }, { number: '3', title: 'Build your streak', description: 'Check in daily and watch consistency compound.' }] } },
      { blockType: 'waitlist-form', content: { title: 'Be first in line', ctaText: 'Join 50,000+ Waiters' } },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'Streaks', tagline: 'Build habits that stick', primaryColor: '#8b5cf6' },
    seo: { title: 'Mobile App Template', description: 'A mobile app pre-launch page.' },
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Two-sided marketplace launch page with social proof.',
    category: 'marketplace',
    blocks: [
      { blockType: 'nav-transparent', content: { ctaText: 'Find a Designer', links: [{ label: 'How It Works', href: '#how-it-works' }, { label: 'Testimonials', href: '#testimonials' }, { label: 'Join', href: '#waitlist' }] } },
      { blockType: 'hero-centered', content: { badge: 'Marketplace', subheadline: 'Connect with vetted freelance designers in minutes.', ctaPrimary: 'Find a Designer', ctaSecondary: 'Join as Designer' } },
      { blockType: 'features-grid', content: { title: 'How the marketplace works' } },
      { blockType: 'social-proof-bar', content: { items: [{ value: '10,000+', text: 'vetted designers' }, { value: '$2.8M', text: 'paid to freelancers' }, { value: '4.8/5', text: 'avg rating' }] } },
      { blockType: 'testimonials-cards', content: { title: 'Trusted by both sides' } },
      { blockType: 'waitlist-form', content: { title: 'Join the waitlist', ctaText: 'Get Early Access' } },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'DesignMatch', tagline: 'Where great design meets great talent', primaryColor: '#ec4899' },
    seo: { title: 'Marketplace Template', description: 'A two-sided marketplace launch page.' },
  },
  {
    id: 'productivity-tool',
    name: 'Productivity Tool',
    description: 'Clean B2B page with comparison table and pricing.',
    category: 'productivity',
    blocks: [
      { blockType: 'nav-standard', content: { ctaText: 'Start Free Trial', links: [{ label: 'Features', href: '#features' }, { label: 'Compare', href: '#compare' }, { label: 'Pricing', href: '#pricing' }] } },
      { blockType: 'hero-split', content: { subheadline: 'Replace scattered docs and endless email threads with one unified workspace.', ctaPrimary: 'Start Free Trial', ctaSecondary: 'Watch 2-Min Demo' } },
      { blockType: 'features-alternating', content: { title: 'One tool for everything' } },
      { blockType: 'comparison-table', content: { competitor: 'Notion + Slack + Asana', rows: [{ feature: 'All-in-one workspace', yours: 'true', theirs: 'false' }, { feature: 'Built-in chat', yours: 'true', theirs: 'false' }, { feature: 'Monthly cost (10 users)', yours: '$49', theirs: '$150+' }] } },
      { blockType: 'pricing-cards', content: {} },
      { blockType: 'waitlist-form', content: { title: 'Get on the list', ctaText: 'Request Access' } },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'Teamflow', tagline: 'Where teams do their best work', primaryColor: '#0ea5e9' },
    seo: { title: 'Productivity Tool Template', description: 'A clean B2B landing page.' },
  },
  {
    id: 'community-launch',
    name: 'Community Launch',
    description: 'People-focused community page with stats and benefits.',
    category: 'community',
    blocks: [
      { blockType: 'nav-transparent', content: { ctaText: 'Apply to Join', links: [{ label: 'Members', href: '#members' }, { label: 'Benefits', href: '#benefits' }, { label: 'Apply', href: '#apply' }] } },
      { blockType: 'hero-centered', content: { badge: 'Join the Community', subheadline: 'A private community of 500+ founders sharing playbooks and warm intros.', ctaPrimary: 'Apply to Join', ctaSecondary: "See Who's Inside" } },
      { blockType: 'stats-counter', content: { title: 'A growing community of builders', stats: [{ value: '500+', label: 'Active Members' }, { value: '12', label: 'Countries' }, { value: '$40M+', label: 'Combined ARR' }, { value: '200+', label: 'Warm Intros Made' }] } },
      { blockType: 'testimonials-cards', content: { title: 'What members say' } },
      { blockType: 'benefit-cards', content: { title: 'What you get as a member', cards: [{ emoji: '\uD83E\uDD1D', headline: 'Warm introductions', description: 'Get introduced to investors and partners.' }, { emoji: '\uD83D\uDCDA', headline: 'Founder playbooks', description: 'Battle-tested strategies.' }, { emoji: '\uD83D\uDCAC', headline: 'Weekly AMAs', description: 'Candid Q&A with experienced founders.' }, { emoji: '\uD83C\uDFAF', headline: 'Accountability pods', description: 'Small groups that meet weekly.' }] } },
      { blockType: 'waitlist-form', content: { title: 'Apply for membership', ctaText: 'Submit Application' } },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'Founders Circle', tagline: 'Where builders help builders', primaryColor: '#f59e0b' },
    seo: { title: 'Community Launch Template', description: 'A community launch page.' },
  },
  {
    id: 'fintech-launch',
    name: 'Fintech Launch',
    description: 'Trust-focused fintech page with social proof and FAQ.',
    category: 'fintech',
    blocks: [
      { blockType: 'nav-standard', content: { ctaText: 'Open Free Account', links: [{ label: 'Features', href: '#features' }, { label: 'FAQ', href: '#faq' }] } },
      { blockType: 'hero-centered', content: { badge: 'FDIC Insured', subheadline: 'The business banking account that helps you grow. Earn 4.5% APY.', ctaPrimary: 'Open Free Account', ctaSecondary: 'See All Features' } },
      { blockType: 'social-proof-bar', content: { items: [{ value: '$180M+', text: 'deposits protected' }, { value: '15,000+', text: 'businesses' }, { value: '4.5%', text: 'APY' }, { value: '0', text: 'hidden fees' }] } },
      { blockType: 'features-grid', content: { title: 'Banking built for business' } },
      { blockType: 'faq-accordion', content: { title: 'Common questions' } },
      { blockType: 'waitlist-form', content: { title: 'Join 15,000+ businesses', ctaText: 'Open Free Account' } },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'Vault', tagline: 'Banking that builds your business', primaryColor: '#059669', headingFont: 'Sora', bodyFont: 'Nunito Sans' },
    seo: { title: 'Fintech Launch Template', description: 'A trust-focused fintech landing page.' },
  },
  {
    id: 'ecommerce-teaser',
    name: 'E-Commerce Teaser',
    description: 'Product-focused pre-launch page with countdown and waitlist.',
    category: 'ecommerce',
    blocks: [
      { blockType: 'nav-transparent', content: { ctaText: 'Pre-Order Now', links: [{ label: 'About', href: '#about' }, { label: 'Reviews', href: '#reviews' }, { label: 'Waitlist', href: '#waitlist' }] } },
      { blockType: 'hero-split', content: { subheadline: 'Handcrafted from sustainable materials. Designed to last a lifetime.', ctaPrimary: 'Pre-Order Now', ctaSecondary: 'See Materials' } },
      { blockType: 'benefit-cards', content: { title: 'Why people are obsessed', cards: [{ emoji: '\uD83C\uDF3F', headline: 'Sustainable materials', description: '100% recycled ocean plastics and organic cotton.' }, { emoji: '\u2728', headline: 'Lifetime warranty', description: 'If it breaks, we fix or replace it. Forever.' }, { emoji: '\uD83D\uDCE6', headline: 'Free carbon-neutral shipping', description: 'We offset 200% of our shipping emissions.' }, { emoji: '\u2764\uFE0F', headline: '1% for the planet', description: 'One percent of every sale goes to ocean cleanup.' }] } },
      { blockType: 'testimonials-cards', content: { title: 'Early reviews are in' } },
      { blockType: 'countdown-timer', content: { title: 'Drop day is coming', launchDate: '2026-06-01' } },
      { blockType: 'waitlist-form', content: { title: 'Get notified at launch', ctaText: 'Join VIP List' } },
      { blockType: 'footer-standard', content: {} },
    ],
    branding: { companyName: 'Tideline', tagline: 'Sustainable goods, beautifully made', primaryColor: '#14b8a6', headingFont: 'Cormorant Garamond', bodyFont: 'Lato' },
    seo: { title: 'E-Commerce Teaser Template', description: 'A product-focused pre-launch page.' },
  },
];

// ─── Lookup ──────────────────────────────────────────────────

/** Look up a template preset by ID */
export function getPreset(id: string): TemplatePreset | undefined {
  return TEMPLATE_PRESETS.find((p) => p.id === id);
}

/** Build a PageData from a preset, ready to save to Site.templateContent */
export function buildPageDataFromPreset(presetId: string): PageData | null {
  const preset = getPreset(presetId);
  if (!preset) return null;

  const blocks: BlockInstance[] = preset.blocks.map((b) => {
    const entry = BLOCK_REGISTRY[b.blockType];
    const defaultContent = entry?.defaultContent ?? {};
    return {
      id: nanoid(),
      blockType: b.blockType,
      content: { ...defaultContent, ...b.content },
      styles: { ...(entry?.defaultStyles ?? {}) },
    };
  });

  return {
    branding: {
      companyName: preset.branding.companyName ?? 'My Company',
      tagline: preset.branding.tagline ?? '',
      primaryColor: preset.branding.primaryColor ?? '#3b82f6',
      secondaryColor: preset.branding.secondaryColor ?? preset.branding.primaryColor ?? '#3b82f6',
      logoUrl: preset.branding.logoUrl ?? null,
      headingFont: preset.branding.headingFont ?? 'Inter',
      bodyFont: preset.branding.bodyFont ?? 'Inter',
      defaultTheme: preset.branding.defaultTheme ?? 'dark',
    },
    blocks,
  };
}
