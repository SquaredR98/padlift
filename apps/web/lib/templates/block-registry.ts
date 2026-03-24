import type { BlockRegistryEntry, BlockCategory } from './block-types';
import type { FieldDef } from './content-schema';

// ── Section component imports ──────────────────────────────
import { HeroCentered } from './sections/hero-centered';
import { HeroSplit } from './sections/hero-split';
import { FeaturesGrid } from './sections/features-grid';
import { FeaturesAlternating } from './sections/features-alternating';
import PricingCards from './sections/pricing-cards';
import TestimonialsCards from './sections/testimonials-cards';
import TestimonialsQuote from './sections/testimonials-quote';
import CtaGradient from './sections/cta-gradient';
import { FaqAccordion } from './sections/faq-accordion';
import { WaitlistForm } from './sections/waitlist-form';
import { FooterStandard } from './sections/footer-standard';
import { CountdownTimer } from './sections/countdown-timer';
import { StatsCounter } from './sections/stats-counter';
import { LogoCloud } from './sections/logo-cloud';
import { ProjectShowcase } from './sections/project-showcase';
import { ComparisonTable } from './sections/comparison-table';
import { SocialProofBar } from './sections/social-proof-bar';
import { HowItWorks } from './sections/how-it-works';
import { BenefitCards } from './sections/benefit-cards';
import { NavStandard } from './sections/nav-standard';
import { NavTransparent } from './sections/nav-transparent';
import { NavMinimal } from './sections/nav-minimal';
import { ContentRichText } from './sections/content-rich-text';
import { ContentSectionHeader } from './sections/content-section-header';
import { ContentCallout } from './sections/content-callout';
import { DividerSpacer } from './sections/divider-spacer';
import { DividerLine } from './sections/divider-line';
import { DividerWave } from './sections/divider-wave';
import { HeroVideo } from './sections/hero-video';
import { HeroImage } from './sections/hero-image';
import { HeroWaitlist } from './sections/hero-waitlist';
import { HeroGradientMesh } from './sections/hero-gradient-mesh';
import { HeroAppDownload } from './sections/hero-app-download';
import { LogosMarquee } from './sections/logos-marquee';
import { LogosGrid } from './sections/logos-grid';
import { FeaturesList } from './sections/features-list';
import { FeaturesBento } from './sections/features-bento';
import { FeaturesTabs } from './sections/features-tabs';
import { FeaturesScreenshot } from './sections/features-screenshot';
import { FeaturesNumbered } from './sections/features-numbered';
import { ProcessVertical } from './sections/process-vertical';
import { ProcessTimeline } from './sections/process-timeline';
import { TestimonialsMarquee } from './sections/testimonials-marquee';
import { TestimonialsWall } from './sections/testimonials-wall';
import { TestimonialsTweet } from './sections/testimonials-tweet';
import { TestimonialsAvatarRow } from './sections/testimonials-avatar-row';
import { PricingTwoTier } from './sections/pricing-two-tier';
import { PricingToggle } from './sections/pricing-toggle';
import { PricingComparison } from './sections/pricing-comparison';
import { FaqTwoColumn } from './sections/faq-two-column';
import { FaqWithCta } from './sections/faq-with-cta';
import { CtaSimple } from './sections/cta-simple';
import { CtaSplit } from './sections/cta-split';
import { CtaBanner } from './sections/cta-banner';
import { WaitlistMinimal } from './sections/waitlist-minimal';
import { WaitlistMultiField } from './sections/waitlist-multi-field';
import { WaitlistWithBenefits } from './sections/waitlist-with-benefits';
import { StatsCards } from './sections/stats-cards';
import { StatsWithDescription } from './sections/stats-with-description';
import { ComparisonBeforeAfter } from './sections/comparison-before-after';
import { ComparisonFeatureList } from './sections/comparison-feature-list';
import { GalleryMasonry } from './sections/gallery-masonry';
import { GalleryPhoneMockup } from './sections/gallery-phone-mockup';
import { GalleryBrowserMockup } from './sections/gallery-browser-mockup';
import { FooterMinimal } from './sections/footer-minimal';
import { FooterColumns } from './sections/footer-columns';
import { NavCentered } from './sections/nav-centered';
import { NavAnnouncement } from './sections/nav-announcement';

// ── Phase 3: Creative block imports ────────────────────────
import { HeroBackgroundImage } from './sections/hero-background-image';
import { HeroVideoBg } from './sections/hero-video-bg';
import { EmbedVideo } from './sections/embed-video';
import { EmbedCustom } from './sections/embed-custom';
import { ContentVideoSide } from './sections/content-video-side';
import { FeaturesLargeImage } from './sections/features-large-image';
import { ContentImageOverlap } from './sections/content-image-overlap';
import { CustomHtml } from './sections/custom-html';
import { HeroAsymmetric } from './sections/hero-asymmetric';
import { HeroStackedCards } from './sections/hero-stacked-cards';
import { SectionSplitColor } from './sections/section-split-color';
import { ContentFullwidthImage } from './sections/content-fullwidth-image';
import { TestimonialsVideo } from './sections/testimonials-video';
import { CaseStudyCards } from './sections/case-study-cards';
import { LogosBanner } from './sections/logos-banner';
import { ContentTwoColumn } from './sections/content-two-column';
import { ContentImageGrid } from './sections/content-image-grid';
import { CtaCountdown } from './sections/cta-countdown';
import { FeaturesIconGrid } from './sections/features-icon-grid';
import { FeaturesStickyScroll } from './sections/features-sticky-scroll';

// ── SSR static variants ────────────────────────────────────
import { FaqAccordionStatic } from './sections/faq-accordion-static';
import { WaitlistFormStatic } from './sections/waitlist-form-static';
import { CountdownTimerStatic } from './sections/countdown-timer-static';
import { HeroWaitlistStatic } from './sections/hero-waitlist-static';
import { LogosMarqueeStatic } from './sections/logos-marquee-static';
import { FeaturesTabsStatic } from './sections/features-tabs-static';
import { TestimonialsMarqueeStatic } from './sections/testimonials-marquee-static';
import { TestimonialsAvatarRowStatic } from './sections/testimonials-avatar-row-static';
import { PricingToggleStatic } from './sections/pricing-toggle-static';
import { FaqTwoColumnStatic } from './sections/faq-two-column-static';
import { FaqWithCtaStatic } from './sections/faq-with-cta-static';
import { NavStandardStatic } from './sections/nav-standard-static';
import { NavTransparentStatic } from './sections/nav-transparent-static';
import { NavMinimalStatic } from './sections/nav-minimal-static';
import { WaitlistMinimalStatic } from './sections/waitlist-minimal-static';
import { WaitlistMultiFieldStatic } from './sections/waitlist-multi-field-static';
import { WaitlistWithBenefitsStatic } from './sections/waitlist-with-benefits-static';
import { NavCenteredStatic } from './sections/nav-centered-static';
import { NavAnnouncementStatic } from './sections/nav-announcement-static';
import { HeroVideoBgStatic } from './sections/hero-video-bg-static';
import { CtaCountdownStatic } from './sections/cta-countdown-static';
import { FeaturesStickyScrollStatic } from './sections/features-sticky-scroll-static';

// ── Section schemas (reused from content-schema) ───────────
import { SECTION_SCHEMAS } from './content-schema';

// ── Helper to get schema fields ────────────────────────────
function schemaFields(sectionId: string): FieldDef[] {
  return SECTION_SCHEMAS[sectionId]?.fields ?? [];
}

// ── Block Registry ─────────────────────────────────────────

export const BLOCK_REGISTRY: Record<string, BlockRegistryEntry> = {
  'nav-standard': {
    blockType: 'nav-standard',
    label: 'Navigation',
    description: 'Standard header with logo, nav links, and CTA button',
    category: 'navigation',
    component: NavStandard as any,
    ssrComponent: NavStandardStatic as any,
    schema: schemaFields('nav-standard'),
    defaultContent: {
      logoUrl: '',
      ctaText: 'Get Started',
      ctaUrl: '#',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
    defaultStyles: {},
  },

  'nav-transparent': {
    blockType: 'nav-transparent',
    label: 'Navigation (Transparent)',
    description: 'Transparent overlay header with glass-style CTA',
    category: 'navigation',
    component: NavTransparent as any,
    ssrComponent: NavTransparentStatic as any,
    schema: schemaFields('nav-transparent'),
    defaultContent: {
      logoUrl: '',
      ctaText: 'Get Started',
      ctaUrl: '#',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
    defaultStyles: {},
  },

  'nav-minimal': {
    blockType: 'nav-minimal',
    label: 'Navigation (Minimal)',
    description: 'Clean minimal header with logo and links only',
    category: 'navigation',
    component: NavMinimal as any,
    ssrComponent: NavMinimalStatic as any,
    schema: schemaFields('nav-minimal'),
    defaultContent: {
      logoUrl: '',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'About', href: '#about' },
      ],
    },
    defaultStyles: {},
  },

  'hero-centered': {
    blockType: 'hero-centered',
    label: 'Hero Centered',
    description: 'Full-screen centered hero with badge, headline, tagline, and CTAs',
    category: 'hero',
    component: HeroCentered as any,
    schema: schemaFields('hero-centered'),
    defaultContent: {
      badge: 'Now in Public Beta',
      headline: '',
      subheadline: 'The all-in-one launch platform. Landing pages, payments, waitlists, and analytics — one dashboard, zero complexity.',
      ctaPrimary: 'Get Started Free',
      ctaSecondary: 'See how it works',
      heroImageUrl: '',
    },
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'hero-split': {
    blockType: 'hero-split',
    label: 'Hero Split',
    description: 'Two-column hero with text left and image/graphic right',
    category: 'hero',
    component: HeroSplit as any,
    schema: schemaFields('hero-split'),
    defaultContent: {
      headline: '',
      subheadline: 'Build, launch, and grow your product with everything you need in one place. No more juggling a dozen different tools.',
      ctaPrimary: 'Start Building Free',
      ctaSecondary: 'Watch Demo',
      heroImageUrl: '',
    },
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'hero-video': {
    blockType: 'hero-video',
    label: 'Hero Video',
    description: 'Centered hero with embedded video below CTAs',
    category: 'hero',
    component: HeroVideo as any,
    schema: schemaFields('hero-video'),
    defaultContent: {
      badge: '',
      headline: '',
      subheadline: 'See our product in action. Watch how teams are shipping faster than ever.',
      ctaPrimary: 'Get Started Free',
      ctaSecondary: 'Learn More',
      videoUrl: '',
      videoThumbnail: '',
    },
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'hero-image': {
    blockType: 'hero-image',
    label: 'Hero with Screenshot',
    description: 'Centered hero with browser-frame mockup screenshot',
    category: 'hero',
    component: HeroImage as any,
    schema: schemaFields('hero-image'),
    defaultContent: {
      badge: '',
      headline: '',
      subheadline: 'The all-in-one launch platform. Landing pages, payments, waitlists, and analytics — one dashboard, zero complexity.',
      ctaPrimary: 'Get Started Free',
      ctaSecondary: 'See how it works',
      screenshotUrl: '',
    },
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'hero-waitlist': {
    blockType: 'hero-waitlist',
    label: 'Hero with Waitlist',
    description: 'Hero with inline email capture instead of buttons',
    category: 'hero',
    component: HeroWaitlist as any,
    ssrComponent: HeroWaitlistStatic as any,
    schema: schemaFields('hero-waitlist'),
    defaultContent: {
      badge: '',
      headline: '',
      subheadline: 'Be the first to experience the future of product launches. Join our waitlist for early access.',
      placeholder: 'you@example.com',
      ctaText: 'Join Waitlist',
      socialProofText: '2,000+ founders already signed up',
    },
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'hero-gradient-mesh': {
    blockType: 'hero-gradient-mesh',
    label: 'Hero Gradient Mesh',
    description: 'Hero with multi-color gradient blob background',
    category: 'hero',
    component: HeroGradientMesh as any,
    schema: schemaFields('hero-gradient-mesh'),
    defaultContent: {
      headline: '',
      subheadline: 'The all-in-one launch platform. Landing pages, payments, waitlists, and analytics — one dashboard, zero complexity.',
      ctaPrimary: 'Get Started Free',
      ctaSecondary: 'Learn More',
    },
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'hero-app-download': {
    blockType: 'hero-app-download',
    label: 'Hero App Download',
    description: 'Split hero with app store buttons and phone mockup',
    category: 'hero',
    component: HeroAppDownload as any,
    schema: schemaFields('hero-app-download'),
    defaultContent: {
      headline: '',
      subheadline: 'Available on iOS and Android. Download now and start building.',
      appStoreUrl: '#',
      playStoreUrl: '#',
      phoneImageUrl: '',
    },
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'features-grid': {
    blockType: 'features-grid',
    label: 'Features Grid',
    description: '3-column grid of feature cards with icons',
    category: 'features',
    component: FeaturesGrid as any,
    schema: schemaFields('features-grid'),
    defaultContent: {
      title: 'Everything you need to launch',
      subtitle: 'Replace your entire tool stack with one platform built for speed.',
      features: [
        { icon: '\u26A1', title: 'Lightning Fast', description: 'Optimized for speed at every layer. Your pages load in milliseconds, not seconds.' },
        { icon: '\uD83D\uDD12', title: 'Secure by Default', description: 'Enterprise-grade security built in. SSL, encryption, and compliance out of the box.' },
        { icon: '\uD83D\uDCC8', title: 'Analytics & Insights', description: 'Track every visitor, conversion, and revenue metric from a single dashboard.' },
        { icon: '\uD83C\uDFA8', title: 'Beautiful Templates', description: 'Start with conversion-tested designs. Customize every pixel to match your brand.' },
        { icon: '\uD83D\uDD17', title: 'Integrations', description: 'Connect with Stripe, Zapier, Slack, and 50+ tools your team already uses.' },
        { icon: '\uD83D\uDE80', title: 'One-Click Publish', description: 'Go live in seconds. Custom domains, SSL certificates, and CDN included automatically.' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'features-alternating': {
    blockType: 'features-alternating',
    label: 'Features Alternating',
    description: 'Alternating left-right feature sections with images',
    category: 'features',
    component: FeaturesAlternating as any,
    schema: schemaFields('features-alternating'),
    defaultContent: {
      title: 'How it works',
      subtitle: 'Three simple steps to go from idea to live product.',
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'features-list': {
    blockType: 'features-list',
    label: 'Features List',
    description: 'Vertical list with icon circles and descriptions',
    category: 'features',
    component: FeaturesList as any,
    schema: schemaFields('features-list'),
    defaultContent: {
      title: 'Why choose us',
      subtitle: 'Everything you need to launch and grow your product.',
      features: [
        { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for speed at every layer. Your pages load in milliseconds.' },
        { icon: '🔒', title: 'Secure by Default', description: 'Enterprise-grade security built in. SSL, encryption, and compliance.' },
        { icon: '📈', title: 'Analytics', description: 'Track every visitor, conversion, and revenue metric from one dashboard.' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'features-bento': {
    blockType: 'features-bento',
    label: 'Features Bento Grid',
    description: 'Asymmetric bento-box grid layout for features',
    category: 'features',
    component: FeaturesBento as any,
    schema: schemaFields('features-bento'),
    defaultContent: {
      title: 'Everything you need',
      subtitle: 'A powerful set of tools designed for modern teams.',
      features: [
        { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for speed at every layer.' },
        { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security built in.' },
        { icon: '📈', title: 'Analytics', description: 'Track every metric.' },
        { icon: '🎨', title: 'Beautiful Design', description: 'Pixel-perfect templates you can customize.' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'features-tabs': {
    blockType: 'features-tabs',
    label: 'Features Tabs',
    description: 'Tabbed feature showcase with image per tab',
    category: 'features',
    component: FeaturesTabs as any,
    ssrComponent: FeaturesTabsStatic as any,
    schema: schemaFields('features-tabs'),
    defaultContent: {
      title: 'Powerful features',
      subtitle: 'Explore what makes our platform stand out.',
      tabs: [
        { label: 'Dashboard', title: 'Intuitive Dashboard', description: 'Monitor all your metrics from a single, beautifully designed dashboard.' },
        { label: 'Analytics', title: 'Deep Analytics', description: 'Understand your audience with powerful analytics and insights.' },
        { label: 'Automation', title: 'Smart Automation', description: 'Automate repetitive tasks and focus on what matters most.' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'features-screenshot': {
    blockType: 'features-screenshot',
    label: 'Feature Screenshot',
    description: 'Single feature with large screenshot and bullet points',
    category: 'features',
    component: FeaturesScreenshot as any,
    schema: schemaFields('features-screenshot'),
    defaultContent: {
      title: 'See it in action',
      description: 'Our intuitive interface makes complex tasks simple. See how teams are using our platform to ship faster.',
      screenshotUrl: '',
      bullets: 'Drag-and-drop editor\nReal-time collaboration\nOne-click publishing',
      imagePosition: 'right',
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'features-numbered': {
    blockType: 'features-numbered',
    label: 'Numbered Features',
    description: 'Large step numbers with feature descriptions',
    category: 'features',
    component: FeaturesNumbered as any,
    schema: schemaFields('features-numbered'),
    defaultContent: {
      title: 'Why we stand out',
      subtitle: 'Three reasons teams choose our platform.',
      features: [
        { title: 'Ship in Minutes', description: 'Go from idea to live product in minutes, not weeks. Our templates and tools handle the heavy lifting.' },
        { title: 'Built for Growth', description: 'Every feature is designed to help you acquire users, convert visitors, and grow revenue.' },
        { title: 'Developer Friendly', description: 'Clean APIs, great docs, and integrations with the tools you already use.' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'pricing-cards': {
    blockType: 'pricing-cards',
    label: 'Pricing Cards',
    description: 'Tiered pricing cards with features and CTAs',
    category: 'pricing',
    component: PricingCards as any,
    schema: schemaFields('pricing-cards'),
    defaultContent: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose the plan that fits your needs. Upgrade or downgrade at any time.',
      tiers: [
        { name: 'Starter', price: 'Free', period: '', description: 'For side projects', cta: 'Get Started', highlighted: 'false', features: ['Up to 3 projects', '1 GB storage', 'Community support', 'Basic analytics'] },
        { name: 'Pro', price: '$29', period: '/month', description: 'For growing teams', cta: 'Start Free Trial', highlighted: 'true', features: ['Unlimited projects', '50 GB storage', 'Priority support', 'Advanced analytics', 'Custom domains', 'Team collaboration'] },
        { name: 'Enterprise', price: '$99', period: '/month', description: 'For large organizations', cta: 'Contact Sales', highlighted: 'false', features: ['Everything in Pro', '500 GB storage', 'Dedicated support', 'SSO & SAML', 'Audit logs', 'Custom SLA'] },
      ],
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'pricing-two-tier': {
    blockType: 'pricing-two-tier',
    label: 'Pricing Two Tier',
    description: 'Side-by-side two-plan comparison',
    category: 'pricing',
    component: PricingTwoTier as any,
    schema: schemaFields('pricing-two-tier'),
    defaultContent: {
      title: 'Simple pricing',
      subtitle: 'Choose the plan that works for you.',
      tiers: [
        { name: 'Free', price: '$0', period: '/month', description: 'For side projects', features: 'Up to 3 projects\n1 GB storage\nCommunity support', cta: 'Get Started', highlighted: false },
        { name: 'Pro', price: '$29', period: '/month', description: 'For growing teams', features: 'Unlimited projects\n50 GB storage\nPriority support\nAdvanced analytics\nCustom domains', cta: 'Start Free Trial', highlighted: true },
      ],
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'pricing-toggle': {
    blockType: 'pricing-toggle',
    label: 'Pricing with Toggle',
    description: 'Monthly/annual toggle with discount badge',
    category: 'pricing',
    component: PricingToggle as any,
    ssrComponent: PricingToggleStatic as any,
    schema: schemaFields('pricing-toggle'),
    defaultContent: {
      title: 'Simple, transparent pricing',
      subtitle: 'Choose the plan that fits your needs.',
      discountLabel: 'Save 20%',
      tiers: [
        { name: 'Starter', priceMonthly: '$9', priceAnnual: '$7', period: '/mo', description: 'For individuals', features: '3 projects\n1 GB storage\nBasic analytics', cta: 'Get Started', highlighted: false },
        { name: 'Pro', priceMonthly: '$29', priceAnnual: '$23', period: '/mo', description: 'For teams', features: 'Unlimited projects\n50 GB storage\nAdvanced analytics\nPriority support', cta: 'Start Free Trial', highlighted: true },
        { name: 'Enterprise', priceMonthly: '$99', priceAnnual: '$79', period: '/mo', description: 'For organizations', features: 'Everything in Pro\nSSO & SAML\nDedicated support\nCustom SLA', cta: 'Contact Sales', highlighted: false },
      ],
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'pricing-comparison': {
    blockType: 'pricing-comparison',
    label: 'Pricing Comparison Table',
    description: 'Full feature comparison table across plans',
    category: 'pricing',
    component: PricingComparison as any,
    schema: schemaFields('pricing-comparison'),
    defaultContent: {
      title: 'Compare plans',
      subtitle: 'Find the perfect plan for your needs.',
      plans: [
        { name: 'Free', price: '$0', period: '/mo', cta: 'Get Started', highlighted: false },
        { name: 'Pro', price: '$29', period: '/mo', cta: 'Start Trial', highlighted: true },
        { name: 'Enterprise', price: '$99', period: '/mo', cta: 'Contact Sales', highlighted: false },
      ],
      features: [
        { name: 'Projects', values: '3|Unlimited|Unlimited' },
        { name: 'Storage', values: '1 GB|50 GB|500 GB' },
        { name: 'Analytics', values: 'Basic|Advanced|Custom' },
        { name: 'Support', values: 'Community|Priority|Dedicated' },
        { name: 'Custom Domains', values: 'false|true|true' },
        { name: 'SSO', values: 'false|false|true' },
      ],
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'testimonials-cards': {
    blockType: 'testimonials-cards',
    label: 'Testimonials Cards',
    description: 'Grid of testimonial cards with avatar, name, and quote',
    category: 'testimonials',
    component: TestimonialsCards as any,
    schema: schemaFields('testimonials-cards'),
    defaultContent: {
      title: 'Loved by Teams Everywhere',
      subtitle: 'See what people are saying about their experience.',
      testimonials: [
        { quote: 'This tool cut our launch time by 80%. Absolutely incredible.', name: 'Sarah Chen', role: 'CEO, TechVenture', avatar: '' },
        { quote: 'The best investment we made this quarter. Hands down.', name: 'Marcus Johnson', role: 'Head of Growth, ScaleUp', avatar: '' },
        { quote: 'I shipped my product in a weekend. No exaggeration.', name: 'Priya Patel', role: 'Indie Hacker', avatar: '' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'testimonials-quote': {
    blockType: 'testimonials-quote',
    label: 'Testimonial Quote',
    description: 'Single large testimonial quote with attribution',
    category: 'testimonials',
    component: TestimonialsQuote as any,
    schema: schemaFields('testimonials-quote'),
    defaultContent: {
      quote: "This platform completely transformed how we ship products. What used to take our team weeks now takes days. It's not just a tool — it's become the backbone of our entire workflow.",
      name: 'Alex Rivera',
      role: 'Co-founder & CEO, Luminary Labs',
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'testimonials-marquee': {
    blockType: 'testimonials-marquee',
    label: 'Testimonials Marquee',
    description: 'Auto-scrolling testimonial cards in two rows',
    category: 'testimonials',
    component: TestimonialsMarquee as any,
    ssrComponent: TestimonialsMarqueeStatic as any,
    schema: schemaFields('testimonials-marquee'),
    defaultContent: {
      title: 'What people are saying',
      subtitle: '',
      testimonials: [
        { quote: 'This tool cut our launch time by 80%.', name: 'Sarah Chen', role: 'CEO, TechVenture', avatar: '' },
        { quote: 'The best investment we made this quarter.', name: 'Marcus Johnson', role: 'Head of Growth, ScaleUp', avatar: '' },
        { quote: 'I shipped my product in a weekend.', name: 'Priya Patel', role: 'Indie Hacker', avatar: '' },
        { quote: 'Incredible product. Highly recommended.', name: 'James Kim', role: 'CTO, CloudBase', avatar: '' },
        { quote: 'Simple, fast, and beautiful.', name: 'Emily Davis', role: 'Designer, PixelCo', avatar: '' },
        { quote: 'Replaced 5 tools with one platform.', name: 'Carlos Rivera', role: 'Founder, LaunchPad', avatar: '' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'testimonials-wall': {
    blockType: 'testimonials-wall',
    label: 'Testimonials Wall',
    description: 'CSS-columns masonry grid of quote cards',
    category: 'testimonials',
    component: TestimonialsWall as any,
    schema: schemaFields('testimonials-wall'),
    defaultContent: {
      title: 'Wall of love',
      subtitle: '',
      testimonials: [
        { quote: 'This tool cut our launch time by 80%. Absolutely incredible.', name: 'Sarah Chen', role: 'CEO, TechVenture', avatar: '', rating: 5 },
        { quote: 'The best investment we made this quarter. Hands down.', name: 'Marcus Johnson', role: 'Head of Growth', avatar: '', rating: 5 },
        { quote: 'I shipped my product in a weekend. No exaggeration. The templates are amazing.', name: 'Priya Patel', role: 'Indie Hacker', avatar: '', rating: 5 },
        { quote: 'Simple, fast, beautiful.', name: 'James Kim', role: 'CTO, CloudBase', avatar: '', rating: 5 },
        { quote: 'Replaced five tools with one platform.', name: 'Emily Davis', role: 'Designer', avatar: '', rating: 5 },
        { quote: 'Outstanding support and product quality.', name: 'Carlos Rivera', role: 'Founder', avatar: '', rating: 4 },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'testimonials-tweet': {
    blockType: 'testimonials-tweet',
    label: 'Tweet-Style Testimonials',
    description: 'Social media post styled testimonials',
    category: 'testimonials',
    component: TestimonialsTweet as any,
    schema: schemaFields('testimonials-tweet'),
    defaultContent: {
      title: 'What people are saying',
      subtitle: '',
      tweets: [
        { quote: 'Just launched my product in under 15 minutes. This is insane.', name: 'Sarah Chen', handle: '@sarahchen', avatar: '' },
        { quote: 'Finally a tool that gets it. Simple, fast, and actually beautiful.', name: 'Marcus Johnson', handle: '@marcusj', avatar: '' },
        { quote: 'Replaced Webflow + Stripe + Mailchimp with one platform. Mind blown.', name: 'Priya Patel', handle: '@priyabuilds', avatar: '' },
        { quote: 'The waitlist feature alone saved me 20 hours of dev work.', name: 'James Kim', handle: '@jameskim_dev', avatar: '' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'testimonials-avatar-row': {
    blockType: 'testimonials-avatar-row',
    label: 'Testimonials with Avatars',
    description: 'Large quote with clickable avatar row',
    category: 'testimonials',
    component: TestimonialsAvatarRow as any,
    ssrComponent: TestimonialsAvatarRowStatic as any,
    schema: schemaFields('testimonials-avatar-row'),
    defaultContent: {
      title: 'Hear from our customers',
      testimonials: [
        { quote: 'This platform completely changed how we approach launches. What used to take weeks now takes hours.', name: 'Sarah Chen', role: 'CEO, TechVenture', avatar: '' },
        { quote: 'The best investment we made this quarter. Our conversion rate doubled.', name: 'Marcus Johnson', role: 'Head of Growth, ScaleUp', avatar: '' },
        { quote: 'I shipped my product in a weekend. The templates are gorgeous.', name: 'Priya Patel', role: 'Indie Hacker', avatar: '' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'cta-gradient': {
    blockType: 'cta-gradient',
    label: 'CTA Gradient',
    description: 'Full-width call-to-action with gradient background',
    category: 'cta',
    component: CtaGradient as any,
    schema: schemaFields('cta-gradient'),
    defaultContent: {
      title: 'Ready to Get Started?',
      subtitle: 'Join thousands of teams already building better products. Start your free trial today — no credit card required.',
      ctaPrimary: 'Start Free Trial',
      ctaSecondary: 'Talk to Sales',
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'faq-accordion': {
    blockType: 'faq-accordion',
    label: 'FAQ Accordion',
    description: 'Expandable FAQ accordion with questions and answers',
    category: 'faq',
    component: FaqAccordion as any,
    ssrComponent: FaqAccordionStatic as any,
    schema: schemaFields('faq-accordion'),
    defaultContent: {
      title: 'Frequently asked questions',
      subtitle: 'Everything you need to know before getting started',
      faqs: [
        { question: 'How quickly can I get my landing page live?', answer: 'Most users go from signup to a live, published landing page in under 15 minutes.' },
        { question: 'Do I need a developer to set up payments?', answer: 'Not at all. Paste a Stripe Payment Link into the dashboard and we handle the rest.' },
        { question: 'Can I connect my own custom domain?', answer: 'Yes. Add a CNAME record pointing to our servers, enter the domain in your site settings, and we provision an SSL certificate automatically.' },
        { question: 'What happens if I outgrow the free plan?', answer: 'The free plan is generous enough for validating ideas. When you need more, you can upgrade instantly from the dashboard.' },
      ],
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'faq-two-column': {
    blockType: 'faq-two-column',
    label: 'FAQ Two Column',
    description: 'Two-column FAQ grid for compact display',
    category: 'faq',
    component: FaqTwoColumn as any,
    ssrComponent: FaqTwoColumnStatic as any,
    schema: schemaFields('faq-two-column'),
    defaultContent: {
      title: 'Frequently asked questions',
      subtitle: '',
      faqs: [
        { question: 'How quickly can I launch?', answer: 'Most users go from signup to a live page in under 15 minutes.' },
        { question: 'Do I need a developer?', answer: 'Not at all. Our drag-and-drop editor handles everything.' },
        { question: 'Can I use my own domain?', answer: 'Yes. Add a CNAME record and we handle SSL automatically.' },
        { question: 'What about payments?', answer: 'Paste a Stripe link and you can accept payments immediately.' },
        { question: 'Is there a free plan?', answer: 'Yes! Our free plan is generous enough to validate any idea.' },
        { question: 'Can I cancel anytime?', answer: 'Absolutely. No contracts, no questions asked.' },
      ],
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'faq-with-cta': {
    blockType: 'faq-with-cta',
    label: 'FAQ with CTA',
    description: 'FAQ accordion with CTA card at bottom',
    category: 'faq',
    component: FaqWithCta as any,
    ssrComponent: FaqWithCtaStatic as any,
    schema: schemaFields('faq-with-cta'),
    defaultContent: {
      title: 'Frequently asked questions',
      subtitle: '',
      faqs: [
        { question: 'How quickly can I launch?', answer: 'Most users go from signup to a live page in under 15 minutes.' },
        { question: 'Do I need a developer?', answer: 'Not at all. Our drag-and-drop editor handles everything.' },
        { question: 'Can I use my own domain?', answer: 'Yes. Add a CNAME record and we handle SSL automatically.' },
      ],
      ctaTitle: 'Still have questions?',
      ctaBody: "Can't find the answer you're looking for? Our team is here to help.",
      ctaButton: 'Contact Support',
      ctaUrl: '#',
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'waitlist-form': {
    blockType: 'waitlist-form',
    label: 'Waitlist Form',
    description: 'Email capture form with social proof avatars',
    category: 'waitlist',
    component: WaitlistForm as any,
    ssrComponent: WaitlistFormStatic as any,
    schema: schemaFields('waitlist-form'),
    defaultContent: {
      title: 'Get early access',
      subtitle: 'Be the first to know when we launch. No spam, just one email on launch day.',
      placeholder: 'you@example.com',
      ctaText: 'Join the Waitlist',
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'footer-standard': {
    blockType: 'footer-standard',
    label: 'Footer Standard',
    description: 'Standard footer with logo, links, and copyright',
    category: 'footer',
    component: FooterStandard as any,
    schema: schemaFields('footer-standard'),
    defaultContent: {
      logoUrl: '',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Privacy', href: '#privacy' },
        { label: 'Terms', href: '#terms' },
      ],
    },
    applicableStyles: ['maxWidth', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity'] as any,
    defaultStyles: {},
  },

  'countdown-timer': {
    blockType: 'countdown-timer',
    label: 'Countdown Timer',
    description: 'Countdown timer with launch date and email capture',
    category: 'cta',
    component: CountdownTimer as any,
    ssrComponent: CountdownTimerStatic as any,
    schema: schemaFields('countdown-timer'),
    defaultContent: {
      title: 'Something Big is Coming',
      subtitle: "We're working on something incredible. Be the first to know when we launch.",
      launchDate: '2026-06-01',
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'stats-counter': {
    blockType: 'stats-counter',
    label: 'Stats Counter',
    description: 'Row of key metrics/stats with labels',
    category: 'stats',
    component: StatsCounter as any,
    schema: schemaFields('stats-counter'),
    defaultContent: {
      title: 'Trusted by teams worldwide',
      stats: [
        { value: '10K+', label: 'Active Users' },
        { value: '500+', label: 'Companies' },
        { value: '99.9%', label: 'Uptime' },
        { value: '4.9/5', label: 'Rating' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'logo-cloud': {
    blockType: 'logo-cloud',
    label: 'Logo Cloud',
    description: 'Row of partner/client logos with trust title',
    category: 'logos',
    component: LogoCloud as any,
    schema: schemaFields('logo-cloud'),
    defaultContent: {
      title: 'Trusted by innovative teams',
      logos: [
        { name: 'Acme Corp', logoUrl: '' },
        { name: 'TechStart', logoUrl: '' },
        { name: 'CloudBase', logoUrl: '' },
        { name: 'DataFlow', logoUrl: '' },
        { name: 'BuildCo', logoUrl: '' },
      ],
    },
    applicableStyles: ['maxWidth', 'gap', 'headingSize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'logos-marquee': {
    blockType: 'logos-marquee',
    label: 'Logo Marquee',
    description: 'Infinitely scrolling horizontal logo strip',
    category: 'logos',
    component: LogosMarquee as any,
    ssrComponent: LogosMarqueeStatic as any,
    schema: schemaFields('logos-marquee'),
    defaultContent: {
      title: 'Trusted by innovative teams',
      logos: [
        { name: 'Acme Corp', logoUrl: '' },
        { name: 'TechStart', logoUrl: '' },
        { name: 'CloudBase', logoUrl: '' },
        { name: 'DataFlow', logoUrl: '' },
        { name: 'BuildCo', logoUrl: '' },
        { name: 'ScaleUp', logoUrl: '' },
      ],
    },
    applicableStyles: ['maxWidth', 'gap', 'headingSize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'logos-grid': {
    blockType: 'logos-grid',
    label: 'Logo Grid',
    description: 'Structured grid of partner logos with hover effect',
    category: 'logos',
    component: LogosGrid as any,
    schema: schemaFields('logos-grid'),
    defaultContent: {
      title: 'Our Partners',
      subtitle: 'Trusted by leading companies worldwide.',
      logos: [
        { name: 'Acme Corp', logoUrl: '', href: '' },
        { name: 'TechStart', logoUrl: '', href: '' },
        { name: 'CloudBase', logoUrl: '', href: '' },
        { name: 'DataFlow', logoUrl: '', href: '' },
      ],
    },
    applicableStyles: ['maxWidth', 'gap', 'headingSize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'project-showcase': {
    blockType: 'project-showcase',
    label: 'Project Showcase',
    description: 'Portfolio-style grid of project cards with images',
    category: 'gallery',
    component: ProjectShowcase as any,
    schema: schemaFields('project-showcase'),
    defaultContent: {
      title: 'Our Work',
      subtitle: 'Selected projects that showcase our expertise.',
      projects: [
        { title: 'Brand Redesign', description: 'Complete visual identity overhaul for a fintech startup.', tag: 'Branding', imageUrl: '' },
        { title: 'E-Commerce Platform', description: 'High-performance storefront with real-time inventory.', tag: 'Development', imageUrl: '' },
        { title: 'Mobile App', description: 'iOS and Android app for fitness tracking.', tag: 'Mobile', imageUrl: '' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'comparison-table': {
    blockType: 'comparison-table',
    label: 'Comparison Table',
    description: 'Side-by-side feature comparison with competitor',
    category: 'comparison',
    component: ComparisonTable as any,
    schema: schemaFields('comparison-table'),
    defaultContent: {
      title: 'See the difference',
      subtitle: 'Compare us to the alternatives and see why teams are switching.',
      yourBrand: '',
      competitor: 'Others',
      rows: [
        { feature: 'Setup time', yours: '5 minutes', theirs: '2-3 hours' },
        { feature: 'Free tier', yours: 'true', theirs: 'false' },
        { feature: 'Custom domains', yours: 'true', theirs: 'true' },
        { feature: 'Analytics', yours: 'true', theirs: 'false' },
      ],
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'shadow', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'social-proof-bar': {
    blockType: 'social-proof-bar',
    label: 'Social Proof Bar',
    description: 'Horizontal bar of key metrics and social proof',
    category: 'stats',
    component: SocialProofBar as any,
    schema: schemaFields('social-proof-bar'),
    defaultContent: {
      items: [
        { value: '2,847', text: 'founders on the waitlist' },
        { value: '4.9/5', text: 'average rating' },
        { value: '$2M+', text: 'revenue generated' },
        { value: '< 5min', text: 'to launch' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'how-it-works': {
    blockType: 'how-it-works',
    label: 'How It Works',
    description: 'Numbered step-by-step process with descriptions',
    category: 'process',
    component: HowItWorks as any,
    schema: schemaFields('how-it-works'),
    defaultContent: {
      title: 'How it works',
      subtitle: 'Go from zero to launched in three simple steps.',
      steps: [
        { number: '1', title: 'Sign up', description: 'Create your free account in seconds. No credit card required.', imageUrl: '' },
        { number: '2', title: 'Customize', description: 'Pick a template and make it yours. Change colors, copy, and images.', imageUrl: '' },
        { number: '3', title: 'Launch', description: 'Hit publish and share your page with the world. Done.', imageUrl: '' },
      ],
    },
    applicableStyles: ['maxWidth', 'gap', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'process-vertical': {
    blockType: 'process-vertical',
    label: 'Vertical Process',
    description: 'Vertical timeline with connected steps',
    category: 'process',
    component: ProcessVertical as any,
    schema: schemaFields('process-vertical'),
    defaultContent: {
      title: 'How it works',
      subtitle: 'Get started in three simple steps.',
      steps: [
        { number: '1', title: 'Create your account', description: 'Sign up in seconds. No credit card required.', icon: '🚀' },
        { number: '2', title: 'Build your page', description: 'Choose a template and customize it to match your brand.', icon: '🎨' },
        { number: '3', title: 'Go live', description: 'Hit publish and share with the world.', icon: '🌍' },
      ],
    },
    applicableStyles: ['maxWidth', 'gap', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'process-timeline': {
    blockType: 'process-timeline',
    label: 'Horizontal Timeline',
    description: 'Horizontal timeline with milestone markers',
    category: 'process',
    component: ProcessTimeline as any,
    schema: schemaFields('process-timeline'),
    defaultContent: {
      title: 'Our roadmap',
      subtitle: 'Key milestones on our journey.',
      milestones: [
        { date: 'Q1 2026', title: 'Beta Launch', description: 'Open beta to the first 1,000 users.' },
        { date: 'Q2 2026', title: 'Public Launch', description: 'Full release with all core features.' },
        { date: 'Q3 2026', title: 'Enterprise', description: 'Team features, SSO, and dedicated support.' },
        { date: 'Q4 2026', title: 'API & Integrations', description: 'Open API and third-party integrations.' },
      ],
    },
    applicableStyles: ['maxWidth', 'gap', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'benefit-cards': {
    blockType: 'benefit-cards',
    label: 'Benefit Cards',
    description: 'Grid of benefit/value proposition cards with emojis',
    category: 'features',
    component: BenefitCards as any,
    schema: schemaFields('benefit-cards'),
    defaultContent: {
      title: 'Why teams choose us',
      cards: [
        { emoji: '\uD83D\uDE80', headline: 'Launch in minutes', description: 'Go from idea to live page in under 15 minutes.', iconUrl: '' },
        { emoji: '\uD83D\uDCB0', headline: 'Save thousands', description: 'Replace expensive tools with one affordable platform.', iconUrl: '' },
        { emoji: '\uD83D\uDCC8', headline: 'Grow faster', description: 'Built-in analytics and conversion optimization.', iconUrl: '' },
        { emoji: '\u2764\uFE0F', headline: 'Loved by users', description: '4.9/5 rating from thousands of happy customers.', iconUrl: '' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'] as any,
    defaultStyles: {},
  },

  'content-rich-text': {
    blockType: 'content-rich-text',
    label: 'Content Text',
    description: 'Rich text content section with heading, body, and optional image',
    category: 'content',
    component: ContentRichText as any,
    schema: schemaFields('content-rich-text'),
    defaultContent: {
      title: 'About Us',
      body: 'We are building the future of product launches. Our mission is to give every founder the tools they need to go from idea to revenue — fast.\n\nWith a focus on simplicity and speed, we help teams validate ideas, capture demand, and start selling in minutes instead of months.',
      imageUrl: '',
      imagePosition: 'none',
    },
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'textAlign', 'borderRadius', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'content-section-header': {
    blockType: 'content-section-header',
    label: 'Section Header',
    description: 'Standalone heading with subtitle and optional badge',
    category: 'content',
    component: ContentSectionHeader as any,
    schema: schemaFields('content-section-header'),
    defaultContent: {
      badge: 'Why Us',
      title: 'Built for the modern web',
      subtitle: 'We believe in simplicity, speed, and giving founders the power to launch without a team of engineers.',
      alignment: 'center',
    },
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'textAlign', 'borderRadius', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'content-callout': {
    blockType: 'content-callout',
    label: 'Callout Box',
    description: 'Highlighted notice box with icon, title, and body',
    category: 'content',
    component: ContentCallout as any,
    schema: schemaFields('content-callout'),
    defaultContent: {
      emoji: '💡',
      title: 'Did you know?',
      body: 'Our platform processes over 10 million requests per day with 99.99% uptime. That means your landing pages are always fast, always available.',
      variant: 'info',
    },
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'textAlign', 'borderRadius', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'divider-spacer': {
    blockType: 'divider-spacer',
    label: 'Spacer',
    description: 'Empty vertical space between sections',
    category: 'divider',
    component: DividerSpacer as any,
    schema: schemaFields('divider-spacer'),
    defaultContent: {
      height: 'md',
    },
    defaultStyles: {},
  },

  'divider-line': {
    blockType: 'divider-line',
    label: 'Divider Line',
    description: 'Horizontal line with optional centered label',
    category: 'divider',
    component: DividerLine as any,
    schema: schemaFields('divider-line'),
    defaultContent: {
      label: '',
      style: 'solid',
    },
    defaultStyles: {},
  },

  'divider-wave': {
    blockType: 'divider-wave',
    label: 'Wave Divider',
    description: 'SVG wave shape between sections',
    category: 'divider',
    component: DividerWave as any,
    schema: schemaFields('divider-wave'),
    defaultContent: {
      flip: false,
      color: 'brand',
    },
    defaultStyles: {},
  },

  'cta-simple': {
    blockType: 'cta-simple',
    label: 'CTA Simple',
    description: 'Clean minimal CTA with heading, subtitle, and button',
    category: 'cta',
    component: CtaSimple as any,
    schema: schemaFields('cta-simple'),
    defaultContent: {
      title: 'Ready to get started?',
      subtitle: 'Join thousands of teams already building better products.',
      ctaText: 'Get Started Free',
      ctaUrl: '#',
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'cta-split': {
    blockType: 'cta-split',
    label: 'CTA Split',
    description: 'Two-column CTA with text left, image right',
    category: 'cta',
    component: CtaSplit as any,
    schema: schemaFields('cta-split'),
    defaultContent: {
      title: 'Ready to transform your workflow?',
      subtitle: 'Start your free trial today and see results in minutes. No credit card required.',
      ctaPrimary: 'Start Free Trial',
      ctaSecondary: 'Learn More',
      imageUrl: '',
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'cta-banner': {
    blockType: 'cta-banner',
    label: 'CTA Banner',
    description: 'Full-width brand-colored banner with inline CTA',
    category: 'cta',
    component: CtaBanner as any,
    schema: schemaFields('cta-banner'),
    defaultContent: {
      title: 'Start building for free today',
      ctaText: 'Get Started',
      ctaUrl: '#',
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'waitlist-minimal': {
    blockType: 'waitlist-minimal',
    label: 'Waitlist Minimal',
    description: 'Ultra-compact inline email capture',
    category: 'waitlist',
    component: WaitlistMinimal as any,
    ssrComponent: WaitlistMinimalStatic as any,
    schema: schemaFields('waitlist-minimal'),
    defaultContent: {
      placeholder: 'you@example.com',
      ctaText: 'Join Waitlist',
      successMessage: "You're on the list!",
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'waitlist-multi-field': {
    blockType: 'waitlist-multi-field',
    label: 'Waitlist with Details',
    description: 'Name + email + optional custom field waitlist form',
    category: 'waitlist',
    component: WaitlistMultiField as any,
    ssrComponent: WaitlistMultiFieldStatic as any,
    schema: schemaFields('waitlist-multi-field'),
    defaultContent: {
      title: 'Join the waitlist',
      subtitle: 'Be among the first to try our product when it launches.',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'you@example.com',
      extraFieldLabel: '',
      extraFieldPlaceholder: '',
      ctaText: 'Join Waitlist',
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'waitlist-with-benefits': {
    blockType: 'waitlist-with-benefits',
    label: 'Waitlist with Benefits',
    description: 'Email capture with benefits list',
    category: 'waitlist',
    component: WaitlistWithBenefits as any,
    ssrComponent: WaitlistWithBenefitsStatic as any,
    schema: schemaFields('waitlist-with-benefits'),
    defaultContent: {
      title: 'Get early access',
      subtitle: 'Sign up to be first in line when we launch.',
      placeholder: 'you@example.com',
      ctaText: 'Join Waitlist',
      benefits: [
        { text: 'Early access to all features' },
        { text: 'Exclusive founder pricing' },
        { text: 'Priority support' },
        { text: 'Shape the product roadmap' },
      ],
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'stats-cards': {
    blockType: 'stats-cards',
    label: 'Stats Cards',
    description: 'Metrics in individual bordered cards',
    category: 'stats',
    component: StatsCards as any,
    schema: schemaFields('stats-cards'),
    defaultContent: {
      title: 'Our impact in numbers',
      subtitle: '',
      stats: [
        { value: '10K+', label: 'Active Users', description: 'Growing every day' },
        { value: '500+', label: 'Companies', description: 'Trust our platform' },
        { value: '99.9%', label: 'Uptime', description: 'Enterprise-grade reliability' },
        { value: '4.9/5', label: 'Rating', description: 'From happy customers' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'stats-with-description': {
    blockType: 'stats-with-description',
    label: 'Stats with Description',
    description: 'Stats alongside descriptive paragraph',
    category: 'stats',
    component: StatsWithDescription as any,
    schema: schemaFields('stats-with-description'),
    defaultContent: {
      title: 'Trusted by teams worldwide',
      description: 'We have been helping teams launch products faster since 2024. Our platform powers thousands of landing pages and waitlists across the globe.',
      stats: [
        { value: '10K+', label: 'Active Users' },
        { value: '500+', label: 'Companies' },
        { value: '99.9%', label: 'Uptime' },
        { value: '$2M+', label: 'Revenue Generated' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'comparison-before-after': {
    blockType: 'comparison-before-after',
    label: 'Before & After',
    description: 'Side-by-side before/after comparison',
    category: 'comparison',
    component: ComparisonBeforeAfter as any,
    schema: schemaFields('comparison-before-after'),
    defaultContent: {
      title: 'Before vs. After',
      subtitle: 'See the difference our platform makes.',
      beforeLabel: 'Before',
      afterLabel: 'After',
      rows: [
        { aspect: 'Setup time', before: 'Hours of coding', after: '5 minutes' },
        { aspect: 'Cost', before: '$500+/month in tools', after: 'Free to start' },
        { aspect: 'Maintenance', before: 'Constant updates needed', after: 'Fully managed' },
        { aspect: 'Analytics', before: 'Scattered across tools', after: 'One unified dashboard' },
      ],
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'shadow', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'comparison-feature-list': {
    blockType: 'comparison-feature-list',
    label: 'Multi-Product Comparison',
    description: 'Feature comparison across multiple products',
    category: 'comparison',
    component: ComparisonFeatureList as any,
    schema: schemaFields('comparison-feature-list'),
    defaultContent: {
      title: 'How we compare',
      subtitle: 'See how we stack up against the competition.',
      products: [
        { name: 'Us', highlighted: true },
        { name: 'Competitor A', highlighted: false },
        { name: 'Competitor B', highlighted: false },
      ],
      features: [
        { name: 'Free tier', values: 'true|false|true' },
        { name: 'Custom domains', values: 'true|true|false' },
        { name: 'Analytics', values: 'Advanced|Basic|Basic' },
        { name: 'Support', values: 'Priority|Email|Community' },
        { name: 'API access', values: 'true|false|false' },
      ],
    },
    applicableStyles: ['maxWidth', 'borderRadius', 'shadow', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'gallery-masonry': {
    blockType: 'gallery-masonry',
    label: 'Image Gallery',
    description: 'CSS-columns masonry image grid',
    category: 'gallery',
    component: GalleryMasonry as any,
    schema: schemaFields('gallery-masonry'),
    defaultContent: {
      title: 'Gallery',
      subtitle: '',
      images: [
        { imageUrl: '', caption: 'Beautiful dashboard', tag: 'Design' },
        { imageUrl: '', caption: 'Analytics view', tag: 'Product' },
        { imageUrl: '', caption: 'Team collaboration', tag: 'Feature' },
        { imageUrl: '', caption: 'Mobile experience', tag: 'Mobile' },
        { imageUrl: '', caption: 'Settings panel', tag: 'Design' },
        { imageUrl: '', caption: 'Integrations', tag: 'Product' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'gallery-phone-mockup': {
    blockType: 'gallery-phone-mockup',
    label: 'Phone Mockup Gallery',
    description: 'Screenshots in phone frames',
    category: 'gallery',
    component: GalleryPhoneMockup as any,
    schema: schemaFields('gallery-phone-mockup'),
    defaultContent: {
      title: 'Screenshots',
      subtitle: '',
      screens: [
        { imageUrl: '', label: 'Home Screen' },
        { imageUrl: '', label: 'Dashboard' },
        { imageUrl: '', label: 'Settings' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'gallery-browser-mockup': {
    blockType: 'gallery-browser-mockup',
    label: 'Browser Mockup Gallery',
    description: 'Screenshots in browser window frames',
    category: 'gallery',
    component: GalleryBrowserMockup as any,
    schema: schemaFields('gallery-browser-mockup'),
    defaultContent: {
      title: 'Product Screenshots',
      subtitle: '',
      screens: [
        { imageUrl: '', label: 'Dashboard', url: 'app.example.com' },
        { imageUrl: '', label: 'Analytics', url: 'app.example.com/analytics' },
      ],
    },
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'] as any,
    defaultStyles: {},
  },

  'footer-minimal': {
    blockType: 'footer-minimal',
    label: 'Footer Minimal',
    description: 'Copyright and optional links in a single row',
    category: 'footer',
    component: FooterMinimal as any,
    schema: schemaFields('footer-minimal'),
    defaultContent: {
      links: [
        { label: 'Privacy', href: '#privacy' },
        { label: 'Terms', href: '#terms' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    applicableStyles: ['maxWidth', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity'] as any,
    defaultStyles: {},
  },

  'footer-columns': {
    blockType: 'footer-columns',
    label: 'Footer with Columns',
    description: 'Multi-column footer with link groups and social links',
    category: 'footer',
    component: FooterColumns as any,
    schema: schemaFields('footer-columns'),
    defaultContent: {
      description: 'Building the future of product launches.',
      columns: [
        { heading: 'Product', links: 'Features|#features\nPricing|#pricing\nChangelog|#changelog' },
        { heading: 'Company', links: 'About|#about\nBlog|#blog\nCareers|#careers' },
        { heading: 'Legal', links: 'Privacy|#privacy\nTerms|#terms' },
      ],
      socialLinks: [
        { platform: 'twitter', url: '#' },
        { platform: 'github', url: '#' },
      ],
    },
    applicableStyles: ['maxWidth', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity'] as any,
    defaultStyles: {},
  },

  'nav-centered': {
    blockType: 'nav-centered',
    label: 'Navigation (Centered)',
    description: 'Centered logo with links split on both sides',
    category: 'navigation',
    component: NavCentered as any,
    ssrComponent: NavCenteredStatic as any,
    schema: schemaFields('nav-centered'),
    defaultContent: {
      ctaText: 'Get Started',
      ctaUrl: '#',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'About', href: '#about' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
    defaultStyles: {},
  },

  'nav-announcement': {
    blockType: 'nav-announcement',
    label: 'Navigation with Banner',
    description: 'Standard nav with dismissible announcement bar',
    category: 'navigation',
    component: NavAnnouncement as any,
    ssrComponent: NavAnnouncementStatic as any,
    schema: schemaFields('nav-announcement'),
    defaultContent: {
      ctaText: 'Get Started',
      ctaUrl: '#',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'FAQ', href: '#faq' },
      ],
      announcementText: 'We just launched v2.0! Check out the new features.',
      announcementUrl: '',
    },
    defaultStyles: {},
  },

  // ─── Phase 3: Creative Blocks ────────────────────────────

  'hero-background-image': {
    blockType: 'hero-background-image',
    label: 'Hero Background Image',
    description: 'Full-viewport hero with background image and overlay',
    category: 'hero',
    component: HeroBackgroundImage as any,
    schema: schemaFields('hero-background-image'),
    defaultContent: {
      badge: '',
      headline: '',
      subheadline: 'Build something extraordinary. Ship faster than ever before.',
      ctaPrimary: 'Get Started Free',
      ctaSecondary: 'Learn More',
      backgroundImageUrl: '',
      overlayOpacity: '60',
      textPosition: 'center',
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'],
  },

  'hero-video-bg': {
    blockType: 'hero-video-bg',
    label: 'Hero Video Background',
    description: 'Full-viewport hero with autoplay video background',
    category: 'hero',
    component: HeroVideoBg as any,
    ssrComponent: HeroVideoBgStatic as any,
    schema: schemaFields('hero-video-bg'),
    defaultContent: {
      badge: '',
      headline: '',
      subheadline: 'Experience the future of building products.',
      ctaPrimary: 'Get Started Free',
      ctaSecondary: 'Learn More',
      videoUrl: '',
      posterUrl: '',
      overlayOpacity: '50',
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'],
  },

  'embed-video': {
    blockType: 'embed-video',
    label: 'Video Embed',
    description: 'Standalone video player with YouTube/Vimeo/Loom auto-detection',
    category: 'embed',
    component: EmbedVideo as any,
    schema: schemaFields('embed-video'),
    defaultContent: {
      title: '',
      subtitle: '',
      videoUrl: '',
      thumbnailUrl: '',
      aspectRatio: '16:9',
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'borderRadius', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'],
  },

  'embed-custom': {
    blockType: 'embed-custom',
    label: 'Custom Embed',
    description: 'Raw HTML/iframe embed for any third-party widget',
    category: 'embed',
    component: EmbedCustom as any,
    schema: schemaFields('embed-custom'),
    defaultContent: {
      title: '',
      embedCode: '',
      height: 'md',
      maxWidth: 'lg',
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'borderRadius', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity'],
  },

  'content-video-side': {
    blockType: 'content-video-side',
    label: 'Content with Video',
    description: 'Side-by-side video embed and text with bullets',
    category: 'content',
    component: ContentVideoSide as any,
    schema: schemaFields('content-video-side'),
    defaultContent: {
      title: 'See it in action',
      description: 'Watch how our platform helps teams ship products faster than ever before.',
      videoUrl: '',
      thumbnailUrl: '',
      bullets: '',
      videoPosition: 'right',
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'textAlign', 'borderRadius', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'],
  },

  'features-large-image': {
    blockType: 'features-large-image',
    label: 'Feature with Large Image',
    description: 'Asymmetric layout with large image and text with bullets',
    category: 'features',
    component: FeaturesLargeImage as any,
    schema: schemaFields('features-large-image'),
    defaultContent: {
      title: 'Powerful dashboard',
      description: 'Everything you need to manage your business in one intuitive interface.',
      imageUrl: '',
      bullets: 'Real-time analytics\nTeam management\nCustom workflows',
      imagePosition: 'right',
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'borderRadius', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'],
  },

  'content-image-overlap': {
    blockType: 'content-image-overlap',
    label: 'Image with Overlapping Text',
    description: 'Image with a text card that overlaps the edge',
    category: 'content',
    component: ContentImageOverlap as any,
    schema: schemaFields('content-image-overlap'),
    defaultContent: {
      title: 'Our story',
      description: 'We started with a simple idea: make it easy for anyone to launch a product online. Today, thousands of teams use our platform to go from idea to revenue.',
      imageUrl: '',
      imagePosition: 'left',
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'borderRadius'],
  },

  'custom-html': {
    blockType: 'custom-html',
    label: 'Custom HTML',
    description: 'User-provided HTML content in a sandboxed container',
    category: 'embed',
    component: CustomHtml as any,
    schema: schemaFields('custom-html'),
    defaultContent: {
      htmlContent: '',
      maxWidth: 'lg',
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity'],
  },

  'hero-asymmetric': {
    blockType: 'hero-asymmetric',
    label: 'Hero Asymmetric',
    description: '60/40 split hero with image bleeding to the edge',
    category: 'hero',
    component: HeroAsymmetric as any,
    schema: schemaFields('hero-asymmetric'),
    defaultContent: {
      badge: '',
      headline: '',
      subheadline: 'The modern platform for launching products. Fast, beautiful, and built for growth.',
      ctaPrimary: 'Get Started Free',
      ctaSecondary: 'Learn More',
      imageUrl: '',
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'],
  },

  'hero-stacked-cards': {
    blockType: 'hero-stacked-cards',
    label: 'Hero Stacked Cards',
    description: 'Headline with angled product screenshot cards',
    category: 'hero',
    component: HeroStackedCards as any,
    schema: schemaFields('hero-stacked-cards'),
    defaultContent: {
      headline: '',
      subheadline: 'See what teams are building with our platform.',
      ctaPrimary: 'Get Started Free',
      ctaSecondary: 'Learn More',
      cards: [
        { imageUrl: '', label: 'Dashboard' },
        { imageUrl: '', label: 'Analytics' },
        { imageUrl: '', label: 'Settings' },
      ],
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations', 'borderRadius'],
  },

  'section-split-color': {
    blockType: 'section-split-color',
    label: 'Split Color Section',
    description: 'Two-tone background section with contrasting halves',
    category: 'layout',
    component: SectionSplitColor as any,
    schema: schemaFields('section-split-color'),
    defaultContent: {
      title: 'Two sides of the story',
      leftTitle: 'The Problem',
      leftBody: 'Teams waste weeks juggling multiple tools just to launch a simple product page.',
      rightTitle: 'The Solution',
      rightBody: 'One platform to build, launch, and grow. Ship in minutes, not weeks.',
      leftColor: '',
      rightColor: '',
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'],
  },

  'content-fullwidth-image': {
    blockType: 'content-fullwidth-image',
    label: 'Full-Width Image',
    description: 'Edge-to-edge image with optional caption overlay',
    category: 'content',
    component: ContentFullwidthImage as any,
    schema: schemaFields('content-fullwidth-image'),
    defaultContent: {
      imageUrl: '',
      alt: '',
      caption: '',
      aspectRatio: '16:9',
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'borderRadius', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity'],
  },

  'testimonials-video': {
    blockType: 'testimonials-video',
    label: 'Video Testimonials',
    description: 'Video testimonial cards with play buttons',
    category: 'testimonials',
    component: TestimonialsVideo as any,
    schema: schemaFields('testimonials-video'),
    defaultContent: {
      title: 'Hear from our customers',
      subtitle: '',
      testimonials: [
        { name: 'Sarah Chen', role: 'CEO, TechVenture', videoUrl: '', thumbnailUrl: '' },
        { name: 'Marcus Johnson', role: 'Head of Growth', videoUrl: '', thumbnailUrl: '' },
        { name: 'Priya Patel', role: 'Indie Hacker', videoUrl: '', thumbnailUrl: '' },
      ],
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'],
  },

  'case-study-cards': {
    blockType: 'case-study-cards',
    label: 'Case Study Cards',
    description: 'Rich case study cards with company logos and metrics',
    category: 'testimonials',
    component: CaseStudyCards as any,
    schema: schemaFields('case-study-cards'),
    defaultContent: {
      title: 'Customer Stories',
      subtitle: 'See how teams are using our platform to grow.',
      cases: [
        { logoUrl: '', company: 'Acme Corp', metric: '3x', metricLabel: 'Revenue growth', story: 'Acme Corp tripled their revenue within 6 months of switching to our platform.', linkUrl: '' },
        { logoUrl: '', company: 'TechStart', metric: '50%', metricLabel: 'Cost reduction', story: 'TechStart cut their tooling costs in half by consolidating onto one platform.', linkUrl: '' },
      ],
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'cardStyle', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'],
  },

  'logos-banner': {
    blockType: 'logos-banner',
    label: 'Logo Banner',
    description: 'Ultra-minimal full-width logo strip with hover effects',
    category: 'logos',
    component: LogosBanner as any,
    schema: schemaFields('logos-banner'),
    defaultContent: {
      bgColor: 'subtle',
      logos: [
        { name: 'Acme Corp', logoUrl: '' },
        { name: 'TechStart', logoUrl: '' },
        { name: 'CloudBase', logoUrl: '' },
        { name: 'DataFlow', logoUrl: '' },
        { name: 'BuildCo', logoUrl: '' },
      ],
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'gap', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity'],
  },

  'content-two-column': {
    blockType: 'content-two-column',
    label: 'Two Column Content',
    description: 'Two equal-width rich text columns with optional divider',
    category: 'content',
    component: ContentTwoColumn as any,
    schema: schemaFields('content-two-column'),
    defaultContent: {
      leftTitle: 'Our Mission',
      leftBody: 'We believe every founder deserves access to world-class tools. Our platform makes it possible to launch beautiful products without a team of engineers.',
      rightTitle: 'Our Vision',
      rightBody: 'A world where building a product is as simple as having an idea. Where technology empowers creators, not limits them.',
      divider: 'none',
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'textAlign', 'gap', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'],
  },

  'content-image-grid': {
    blockType: 'content-image-grid',
    label: 'Image Grid',
    description: 'Clean image grid with hover zoom and caption overlay',
    category: 'gallery',
    component: ContentImageGrid as any,
    schema: schemaFields('content-image-grid'),
    defaultContent: {
      title: '',
      subtitle: '',
      columns: 3,
      images: [
        { imageUrl: '', caption: 'Product dashboard' },
        { imageUrl: '', caption: 'Analytics view' },
        { imageUrl: '', caption: 'Team workspace' },
        { imageUrl: '', caption: 'Mobile app' },
        { imageUrl: '', caption: 'Settings panel' },
        { imageUrl: '', caption: 'Integration hub' },
      ],
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'headingSize', 'bodySize', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'],
  },

  'cta-countdown': {
    blockType: 'cta-countdown',
    label: 'CTA with Countdown',
    description: 'CTA with live countdown timer to a target date',
    category: 'cta',
    component: CtaCountdown as any,
    ssrComponent: CtaCountdownStatic as any,
    schema: schemaFields('cta-countdown'),
    defaultContent: {
      title: 'Launching Soon',
      subtitle: 'Get in before the deadline.',
      targetDate: '2026-06-01',
      ctaText: 'Join Now',
      ctaUrl: '#',
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'borderRadius', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'],
  },

  'features-icon-grid': {
    blockType: 'features-icon-grid',
    label: 'Icon Feature Grid',
    description: 'Centered icon-based feature grid with configurable columns',
    category: 'features',
    component: FeaturesIconGrid as any,
    schema: schemaFields('features-icon-grid'),
    defaultContent: {
      title: 'Features',
      subtitle: '',
      columns: 4,
      features: [
        { icon: '\u26A1', title: 'Lightning Fast', description: 'Optimized for speed at every layer.' },
        { icon: '\uD83D\uDD12', title: 'Secure', description: 'Enterprise-grade security built in.' },
        { icon: '\uD83D\uDCC8', title: 'Analytics', description: 'Track every metric from one dashboard.' },
        { icon: '\uD83C\uDFA8', title: 'Beautiful', description: 'Pixel-perfect designs you can customize.' },
        { icon: '\uD83D\uDD17', title: 'Integrations', description: 'Connect with 50+ tools.' },
        { icon: '\uD83D\uDE80', title: 'One-Click Deploy', description: 'Go live in seconds.' },
        { icon: '\uD83D\uDCF1', title: 'Mobile Ready', description: 'Responsive on every device.' },
        { icon: '\uD83E\uDD1D', title: 'Team Collaboration', description: 'Work together seamlessly.' },
      ],
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'columns', 'gap', 'borderRadius', 'shadow', 'headingSize', 'bodySize', 'textAlign', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay'],
  },

  'features-sticky-scroll': {
    blockType: 'features-sticky-scroll',
    label: 'Sticky Scroll Features',
    description: 'Click-through features with sticky image preview',
    category: 'features',
    component: FeaturesStickyScroll as any,
    ssrComponent: FeaturesStickyScrollStatic as any,
    schema: schemaFields('features-sticky-scroll'),
    defaultContent: {
      title: 'Features',
      subtitle: '',
      features: [
        { title: 'Intuitive Dashboard', description: 'Monitor all your metrics from a single, beautifully designed dashboard.', imageUrl: '' },
        { title: 'Deep Analytics', description: 'Understand your audience with powerful analytics and insights.', imageUrl: '' },
        { title: 'Smart Automation', description: 'Automate repetitive tasks and focus on what matters most.', imageUrl: '' },
      ],
    },
    defaultStyles: {},
    applicableStyles: ['maxWidth', 'headingSize', 'bodySize', 'borderRadius', 'letterSpacing', 'lineHeight', 'textTransform', 'paddingTop', 'paddingBottom', 'gradientFrom', 'gradientTo', 'gradientDirection', 'backgroundOpacity', 'animationDelay', 'showDecorations'],
  },
};

/** Get a block registry entry by block type */
export function getBlockEntry(blockType: string): BlockRegistryEntry | undefined {
  return BLOCK_REGISTRY[blockType];
}

/** Get all block types for a given category */
export function getBlocksByCategory(category: BlockCategory): BlockRegistryEntry[] {
  return Object.values(BLOCK_REGISTRY).filter((e) => e.category === category);
}

/** Get all unique categories with their blocks */
export function getBlockCategories(): Array<{ category: BlockCategory; label: string; blocks: BlockRegistryEntry[] }> {
  const categoryLabels: Record<BlockCategory, string> = {
    navigation: 'Navigation',
    hero: 'Hero',
    logos: 'Logos & Trust',
    features: 'Features',
    process: 'Process',
    testimonials: 'Testimonials',
    pricing: 'Pricing',
    faq: 'FAQ',
    cta: 'Call to Action',
    waitlist: 'Waitlist',
    stats: 'Stats',
    comparison: 'Comparison',
    gallery: 'Gallery',
    content: 'Content',
    footer: 'Footer',
    divider: 'Divider',
    embed: 'Embed & Media',
    layout: 'Layout',
  };

  const categories: Array<{ category: BlockCategory; label: string; blocks: BlockRegistryEntry[] }> = [];
  const seen = new Set<BlockCategory>();

  for (const entry of Object.values(BLOCK_REGISTRY)) {
    if (!seen.has(entry.category)) {
      seen.add(entry.category);
      categories.push({
        category: entry.category,
        label: categoryLabels[entry.category],
        blocks: getBlocksByCategory(entry.category),
      });
    }
  }

  return categories;
}
