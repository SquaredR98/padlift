// ─── Types ──────────────────────────────────────────────────

export type FieldType = 'text' | 'textarea' | 'color' | 'url' | 'list' | 'image' | 'boolean';

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue: unknown;
  /** Schema for list item fields (only used when type = 'list') */
  listFields?: FieldDef[];
}

export interface SectionSchema {
  sectionId: string;
  label: string;
  fields: FieldDef[];
}

export interface TemplateContent {
  branding: {
    companyName: string;
    tagline: string;
    primaryColor: string;
    logoUrl: string | null;
  };
  /** Section-specific content overrides. Key = sectionId from template definition. */
  sections: Record<string, Record<string, unknown>>;
}

// ─── Branding Fields ────────────────────────────────────────

export const BRANDING_FIELDS: FieldDef[] = [
  { key: 'companyName', label: 'Company Name', type: 'text', placeholder: 'Your company', defaultValue: '' },
  { key: 'tagline', label: 'Tagline', type: 'text', placeholder: 'Your tagline', defaultValue: '' },
  { key: 'primaryColor', label: 'Brand Color', type: 'color', defaultValue: '#3b82f6' },
];

// ─── Section Schemas ────────────────────────────────────────

export const SECTION_SCHEMAS: Record<string, SectionSchema> = {
  'hero-centered': {
    sectionId: 'hero-centered',
    label: 'Hero',
    fields: [
      { key: 'badge', label: 'Badge Text', type: 'text', placeholder: 'Now in Public Beta', defaultValue: 'Now in Public Beta' },
      { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Company Name (auto-filled if empty)', defaultValue: '' },
      { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Describe your product...', defaultValue: 'The all-in-one launch platform. Landing pages, payments, waitlists, and analytics — one dashboard, zero complexity.' },
      { key: 'ctaPrimary', label: 'Primary Button', type: 'text', placeholder: 'Get Started Free', defaultValue: 'Get Started Free' },
      { key: 'ctaSecondary', label: 'Secondary Button', type: 'text', placeholder: 'See how it works', defaultValue: 'See how it works' },
      { key: 'heroImageUrl', label: 'Hero Image', type: 'image', placeholder: 'Upload a hero screenshot or graphic', defaultValue: '' },
    ],
  },

  'hero-split': {
    sectionId: 'hero-split',
    label: 'Hero',
    fields: [
      { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Company Name (auto-filled if empty)', defaultValue: '' },
      { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Describe your product...', defaultValue: 'Build, launch, and grow your product with everything you need in one place. No more juggling a dozen different tools.' },
      { key: 'ctaPrimary', label: 'Primary Button', type: 'text', placeholder: 'Start Building Free', defaultValue: 'Start Building Free' },
      { key: 'ctaSecondary', label: 'Secondary Button', type: 'text', placeholder: 'Watch Demo', defaultValue: 'Watch Demo' },
      { key: 'heroImageUrl', label: 'Hero Image', type: 'image', placeholder: 'Upload a hero image for the right side', defaultValue: '' },
    ],
  },

  'hero-video': {
    sectionId: 'hero-video',
    label: 'Hero Video',
    fields: [
      { key: 'badge', label: 'Badge Text', type: 'text', placeholder: 'Now in Public Beta', defaultValue: '' },
      { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Company Name (auto-filled if empty)', defaultValue: '' },
      { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Describe your product...', defaultValue: 'See our product in action. Watch how teams are shipping faster than ever.' },
      { key: 'ctaPrimary', label: 'Primary Button', type: 'text', placeholder: 'Get Started Free', defaultValue: 'Get Started Free' },
      { key: 'ctaSecondary', label: 'Secondary Button', type: 'text', placeholder: 'Learn More', defaultValue: 'Learn More' },
      { key: 'videoUrl', label: 'Video Embed URL', type: 'url', placeholder: 'https://youtube.com/embed/...', defaultValue: '' },
      { key: 'videoThumbnail', label: 'Video Thumbnail', type: 'image', placeholder: 'Upload thumbnail image', defaultValue: '' },
    ],
  },

  'hero-image': {
    sectionId: 'hero-image',
    label: 'Hero with Screenshot',
    fields: [
      { key: 'badge', label: 'Badge Text', type: 'text', placeholder: 'Now in Public Beta', defaultValue: '' },
      { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Company Name (auto-filled if empty)', defaultValue: '' },
      { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Describe your product...', defaultValue: 'The all-in-one launch platform. Landing pages, payments, waitlists, and analytics — one dashboard, zero complexity.' },
      { key: 'ctaPrimary', label: 'Primary Button', type: 'text', placeholder: 'Get Started Free', defaultValue: 'Get Started Free' },
      { key: 'ctaSecondary', label: 'Secondary Button', type: 'text', placeholder: 'See how it works', defaultValue: 'See how it works' },
      { key: 'screenshotUrl', label: 'Product Screenshot', type: 'image', placeholder: 'Upload a product screenshot', defaultValue: '' },
    ],
  },

  'hero-waitlist': {
    sectionId: 'hero-waitlist',
    label: 'Hero with Waitlist',
    fields: [
      { key: 'badge', label: 'Badge Text', type: 'text', placeholder: 'Coming Soon', defaultValue: '' },
      { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Company Name (auto-filled if empty)', defaultValue: '' },
      { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Describe your product...', defaultValue: 'Be the first to experience the future of product launches. Join our waitlist for early access.' },
      { key: 'placeholder', label: 'Email Placeholder', type: 'text', placeholder: 'you@example.com', defaultValue: 'you@example.com' },
      { key: 'ctaText', label: 'Button Text', type: 'text', placeholder: 'Join Waitlist', defaultValue: 'Join Waitlist' },
      { key: 'socialProofText', label: 'Social Proof Text', type: 'text', placeholder: '2,000+ founders already signed up', defaultValue: '2,000+ founders already signed up' },
    ],
  },

  'hero-gradient-mesh': {
    sectionId: 'hero-gradient-mesh',
    label: 'Hero Gradient Mesh',
    fields: [
      { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Company Name (auto-filled if empty)', defaultValue: '' },
      { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Describe your product...', defaultValue: 'The all-in-one launch platform. Landing pages, payments, waitlists, and analytics — one dashboard, zero complexity.' },
      { key: 'ctaPrimary', label: 'Primary Button', type: 'text', placeholder: 'Get Started Free', defaultValue: 'Get Started Free' },
      { key: 'ctaSecondary', label: 'Secondary Button', type: 'text', placeholder: 'Learn More', defaultValue: 'Learn More' },
    ],
  },

  'hero-app-download': {
    sectionId: 'hero-app-download',
    label: 'Hero App Download',
    fields: [
      { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Company Name (auto-filled if empty)', defaultValue: '' },
      { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Available on iOS and Android...', defaultValue: 'Available on iOS and Android. Download now and start building.' },
      { key: 'appStoreUrl', label: 'App Store URL', type: 'url', placeholder: 'https://apps.apple.com/...', defaultValue: '#' },
      { key: 'playStoreUrl', label: 'Play Store URL', type: 'url', placeholder: 'https://play.google.com/...', defaultValue: '#' },
      { key: 'phoneImageUrl', label: 'Phone Screenshot', type: 'image', placeholder: 'Upload app screenshot', defaultValue: '' },
    ],
  },

  'features-grid': {
    sectionId: 'features-grid',
    label: 'Features',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Everything you need to launch', defaultValue: 'Everything you need to launch' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'Replace your entire tool stack...', defaultValue: 'Replace your entire tool stack with one platform built for speed.' },
      {
        key: 'features', label: 'Feature Cards', type: 'list', defaultValue: [],
        listFields: [
          { key: 'icon', label: 'Icon Emoji', type: 'text', placeholder: '⚡', defaultValue: '⚡' },
          { key: 'title', label: 'Title', type: 'text', placeholder: 'Feature name', defaultValue: '' },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Feature description', defaultValue: '' },
        ],
      },
    ],
  },

  'features-alternating': {
    sectionId: 'features-alternating',
    label: 'How It Works',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'How it works', defaultValue: 'How it works' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'Three simple steps...', defaultValue: 'Three simple steps to go from idea to live product.' },
      {
        key: 'features', label: 'Feature Sections', type: 'list', defaultValue: [],
        listFields: [
          { key: 'title', label: 'Title', type: 'text', placeholder: 'Build stunning pages', defaultValue: '' },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Feature description...', defaultValue: '' },
          { key: 'bullets', label: 'Bullet Points (one per line)', type: 'textarea', placeholder: 'Drag-and-drop editor\nConversion-optimized\nFull customization', defaultValue: '' },
        ],
      },
    ],
  },

  'pricing-cards': {
    sectionId: 'pricing-cards',
    label: 'Pricing',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Simple, Transparent Pricing', defaultValue: 'Simple, Transparent Pricing' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'Choose the plan...', defaultValue: 'Choose the plan that fits your needs. Upgrade or downgrade at any time.' },
      {
        key: 'tiers', label: 'Pricing Tiers', type: 'list', defaultValue: [],
        listFields: [
          { key: 'name', label: 'Plan Name', type: 'text', placeholder: 'Pro', defaultValue: '' },
          { key: 'price', label: 'Price', type: 'text', placeholder: '$29', defaultValue: '' },
          { key: 'period', label: 'Period', type: 'text', placeholder: '/month', defaultValue: '/month' },
          { key: 'description', label: 'Description', type: 'text', placeholder: 'For growing teams', defaultValue: '' },
          { key: 'features', label: 'Features (one per line)', type: 'textarea', placeholder: 'Unlimited projects\n50 GB storage\nPriority support', defaultValue: '' },
          { key: 'cta', label: 'Button Text', type: 'text', placeholder: 'Get Started', defaultValue: 'Get Started' },
          { key: 'highlighted', label: 'Featured Plan', type: 'boolean', defaultValue: false },
        ],
      },
    ],
  },

  'testimonials-cards': {
    sectionId: 'testimonials-cards',
    label: 'Testimonials',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Loved by Teams Everywhere', defaultValue: 'Loved by Teams Everywhere' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'See what people are saying...', defaultValue: 'See what people are saying about their experience.' },
      {
        key: 'testimonials', label: 'Testimonials', type: 'list', defaultValue: [],
        listFields: [
          { key: 'quote', label: 'Quote', type: 'textarea', placeholder: 'Their testimonial...', defaultValue: '' },
          { key: 'name', label: 'Name', type: 'text', placeholder: 'Sarah Chen', defaultValue: '' },
          { key: 'role', label: 'Role', type: 'text', placeholder: 'CEO, Company', defaultValue: '' },
          { key: 'avatar', label: 'Avatar', type: 'image', placeholder: 'Upload avatar photo', defaultValue: '' },
        ],
      },
    ],
  },

  'testimonials-quote': {
    sectionId: 'testimonials-quote',
    label: 'Testimonial Quote',
    fields: [
      { key: 'quote', label: 'Quote', type: 'textarea', placeholder: 'Their testimonial...', defaultValue: "This platform completely transformed how we ship products. What used to take our team weeks now takes days. It's not just a tool — it's become the backbone of our entire workflow." },
      { key: 'name', label: 'Name', type: 'text', placeholder: 'Alex Rivera', defaultValue: 'Alex Rivera' },
      { key: 'role', label: 'Role', type: 'text', placeholder: 'Co-founder & CEO, Luminary Labs', defaultValue: 'Co-founder & CEO, Luminary Labs' },
    ],
  },

  'cta-gradient': {
    sectionId: 'cta-gradient',
    label: 'Call to Action',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Ready to Get Started?', defaultValue: 'Ready to Get Started?' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Join thousands of teams...', defaultValue: 'Join thousands of teams already building better products. Start your free trial today — no credit card required.' },
      { key: 'ctaPrimary', label: 'Primary Button', type: 'text', placeholder: 'Start Free Trial', defaultValue: 'Start Free Trial' },
      { key: 'ctaSecondary', label: 'Secondary Button', type: 'text', placeholder: 'Talk to Sales', defaultValue: 'Talk to Sales' },
    ],
  },

  'faq-accordion': {
    sectionId: 'faq-accordion',
    label: 'FAQ',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Frequently asked questions', defaultValue: 'Frequently asked questions' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'text', placeholder: 'Everything you need to know...', defaultValue: 'Everything you need to know before getting started' },
      {
        key: 'faqs', label: 'Questions', type: 'list', defaultValue: [],
        listFields: [
          { key: 'question', label: 'Question', type: 'text', placeholder: 'How does it work?', defaultValue: '' },
          { key: 'answer', label: 'Answer', type: 'textarea', placeholder: 'Explain the answer...', defaultValue: '' },
        ],
      },
    ],
  },

  'waitlist-form': {
    sectionId: 'waitlist-form',
    label: 'Waitlist Form',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Get early access', defaultValue: 'Get early access' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Be the first to know...', defaultValue: 'Be the first to know when we launch. No spam, just one email on launch day.' },
      { key: 'placeholder', label: 'Email Placeholder', type: 'text', placeholder: 'you@example.com', defaultValue: 'you@example.com' },
      { key: 'ctaText', label: 'Button Text', type: 'text', placeholder: 'Join the Waitlist', defaultValue: 'Join the Waitlist' },
    ],
  },

  'footer-standard': {
    sectionId: 'footer-standard',
    label: 'Footer',
    fields: [
      { key: 'logoUrl', label: 'Logo', type: 'image', placeholder: 'Upload your company logo', defaultValue: '' },
      {
        key: 'links', label: 'Footer Links', type: 'list', defaultValue: [],
        listFields: [
          { key: 'label', label: 'Label', type: 'text', placeholder: 'About', defaultValue: '' },
          { key: 'href', label: 'URL', type: 'url', placeholder: '#about', defaultValue: '#' },
        ],
      },
    ],
  },

  'countdown-timer': {
    sectionId: 'countdown-timer',
    label: 'Countdown Timer',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Something Big is Coming', defaultValue: 'Something Big is Coming' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: "We're working on something incredible...", defaultValue: "We're working on something incredible. Be the first to know when we launch." },
      { key: 'launchDate', label: 'Launch Date', type: 'text', placeholder: '2026-06-01', defaultValue: '2026-06-01' },
    ],
  },

  'stats-counter': {
    sectionId: 'stats-counter',
    label: 'Stats',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Trusted by teams worldwide', defaultValue: 'Trusted by teams worldwide' },
      {
        key: 'stats', label: 'Stats', type: 'list', defaultValue: [],
        listFields: [
          { key: 'value', label: 'Value', type: 'text', placeholder: '10K+', defaultValue: '' },
          { key: 'label', label: 'Label', type: 'text', placeholder: 'Active Users', defaultValue: '' },
        ],
      },
    ],
  },

  'logo-cloud': {
    sectionId: 'logo-cloud',
    label: 'Logo Cloud',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Trusted by innovative teams', defaultValue: 'Trusted by innovative teams' },
      {
        key: 'logos', label: 'Company Names', type: 'list', defaultValue: [],
        listFields: [
          { key: 'name', label: 'Name', type: 'text', placeholder: 'Acme Corp', defaultValue: '' },
          { key: 'logoUrl', label: 'Logo', type: 'image', placeholder: 'Upload company logo', defaultValue: '' },
        ],
      },
    ],
  },

  'project-showcase': {
    sectionId: 'project-showcase',
    label: 'Project Showcase',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Our Work', defaultValue: 'Our Work' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'Selected projects...', defaultValue: 'Selected projects that showcase our expertise.' },
      {
        key: 'projects', label: 'Projects', type: 'list', defaultValue: [],
        listFields: [
          { key: 'title', label: 'Title', type: 'text', placeholder: 'Project name', defaultValue: '' },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Project description', defaultValue: '' },
          { key: 'tag', label: 'Tag', type: 'text', placeholder: 'Web Design', defaultValue: '' },
          { key: 'imageUrl', label: 'Screenshot', type: 'image', placeholder: 'Upload project screenshot', defaultValue: '' },
        ],
      },
    ],
  },
  'comparison-table': {
    sectionId: 'comparison-table',
    label: 'Comparison Table',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'See the difference', defaultValue: 'See the difference' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'Compare us to the alternatives...', defaultValue: 'Compare us to the alternatives and see why teams are switching.' },
      { key: 'yourBrand', label: 'Your Brand Name', type: 'text', placeholder: 'Us (auto from company name)', defaultValue: '' },
      { key: 'competitor', label: 'Competitor Label', type: 'text', placeholder: 'Others', defaultValue: 'Others' },
      {
        key: 'rows', label: 'Comparison Rows', type: 'list', defaultValue: [],
        listFields: [
          { key: 'feature', label: 'Feature', type: 'text', placeholder: 'Setup time', defaultValue: '' },
          { key: 'yours', label: 'Yours', type: 'text', placeholder: 'true / text value', defaultValue: 'true' },
          { key: 'theirs', label: 'Theirs', type: 'text', placeholder: 'false / text value', defaultValue: 'false' },
        ],
      },
    ],
  },

  'social-proof-bar': {
    sectionId: 'social-proof-bar',
    label: 'Social Proof Bar',
    fields: [
      {
        key: 'items', label: 'Proof Items', type: 'list', defaultValue: [],
        listFields: [
          { key: 'value', label: 'Value', type: 'text', placeholder: '2,847', defaultValue: '' },
          { key: 'text', label: 'Label', type: 'text', placeholder: 'founders on the waitlist', defaultValue: '' },
        ],
      },
    ],
  },

  'how-it-works': {
    sectionId: 'how-it-works',
    label: 'How It Works',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'How it works', defaultValue: 'How it works' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'Go from zero to launched...', defaultValue: 'Go from zero to launched in three simple steps.' },
      {
        key: 'steps', label: 'Steps', type: 'list', defaultValue: [],
        listFields: [
          { key: 'number', label: 'Step Number', type: 'text', placeholder: '1', defaultValue: '' },
          { key: 'title', label: 'Title', type: 'text', placeholder: 'Sign up', defaultValue: '' },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Step description', defaultValue: '' },
          { key: 'imageUrl', label: 'Step Image', type: 'image', placeholder: 'Optional step illustration', defaultValue: '' },
        ],
      },
    ],
  },

  'nav-standard': {
    sectionId: 'nav-standard',
    label: 'Navigation',
    fields: [
      { key: 'logoUrl', label: 'Logo', type: 'image', placeholder: 'Upload your logo', defaultValue: '' },
      { key: 'ctaText', label: 'CTA Button Text', type: 'text', placeholder: 'Get Started', defaultValue: 'Get Started' },
      { key: 'ctaUrl', label: 'CTA Button URL', type: 'url', placeholder: '#', defaultValue: '#' },
      {
        key: 'links', label: 'Nav Links', type: 'list', defaultValue: [],
        listFields: [
          { key: 'label', label: 'Label', type: 'text', placeholder: 'Features', defaultValue: '' },
          { key: 'href', label: 'URL', type: 'url', placeholder: '#features', defaultValue: '#' },
        ],
      },
    ],
  },

  'nav-transparent': {
    sectionId: 'nav-transparent',
    label: 'Navigation (Transparent)',
    fields: [
      { key: 'logoUrl', label: 'Logo', type: 'image', placeholder: 'Upload your logo', defaultValue: '' },
      { key: 'ctaText', label: 'CTA Button Text', type: 'text', placeholder: 'Get Started', defaultValue: 'Get Started' },
      { key: 'ctaUrl', label: 'CTA Button URL', type: 'url', placeholder: '#', defaultValue: '#' },
      {
        key: 'links', label: 'Nav Links', type: 'list', defaultValue: [],
        listFields: [
          { key: 'label', label: 'Label', type: 'text', placeholder: 'Features', defaultValue: '' },
          { key: 'href', label: 'URL', type: 'url', placeholder: '#features', defaultValue: '#' },
        ],
      },
    ],
  },

  'nav-minimal': {
    sectionId: 'nav-minimal',
    label: 'Navigation (Minimal)',
    fields: [
      { key: 'logoUrl', label: 'Logo', type: 'image', placeholder: 'Upload your logo', defaultValue: '' },
      {
        key: 'links', label: 'Nav Links', type: 'list', defaultValue: [],
        listFields: [
          { key: 'label', label: 'Label', type: 'text', placeholder: 'Features', defaultValue: '' },
          { key: 'href', label: 'URL', type: 'url', placeholder: '#features', defaultValue: '#' },
        ],
      },
    ],
  },

  'logos-marquee': {
    sectionId: 'logos-marquee',
    label: 'Logo Marquee',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Trusted by innovative teams', defaultValue: 'Trusted by innovative teams' },
      {
        key: 'logos', label: 'Logos', type: 'list', defaultValue: [],
        listFields: [
          { key: 'name', label: 'Company Name', type: 'text', placeholder: 'Acme Corp', defaultValue: '' },
          { key: 'logoUrl', label: 'Logo', type: 'image', placeholder: 'Upload logo', defaultValue: '' },
        ],
      },
    ],
  },

  'logos-grid': {
    sectionId: 'logos-grid',
    label: 'Logo Grid',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Our Partners', defaultValue: 'Our Partners' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Trusted by leading companies...', defaultValue: 'Trusted by leading companies worldwide.' },
      {
        key: 'logos', label: 'Logos', type: 'list', defaultValue: [],
        listFields: [
          { key: 'name', label: 'Company Name', type: 'text', placeholder: 'Acme Corp', defaultValue: '' },
          { key: 'logoUrl', label: 'Logo', type: 'image', placeholder: 'Upload logo', defaultValue: '' },
          { key: 'href', label: 'Link URL', type: 'url', placeholder: 'https://...', defaultValue: '' },
        ],
      },
    ],
  },

  'features-list': {
    sectionId: 'features-list',
    label: 'Features List',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Why choose us', defaultValue: 'Why choose us' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'Everything you need...', defaultValue: 'Everything you need to launch and grow your product.' },
      {
        key: 'features', label: 'Features', type: 'list', defaultValue: [],
        listFields: [
          { key: 'icon', label: 'Icon Emoji', type: 'text', placeholder: '⚡', defaultValue: '⚡' },
          { key: 'title', label: 'Title', type: 'text', placeholder: 'Feature name', defaultValue: '' },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Feature description', defaultValue: '' },
        ],
      },
    ],
  },

  'features-bento': {
    sectionId: 'features-bento',
    label: 'Features Bento Grid',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Everything you need', defaultValue: 'Everything you need' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'A powerful set of tools...', defaultValue: 'A powerful set of tools designed for modern teams.' },
      {
        key: 'features', label: 'Features', type: 'list', defaultValue: [],
        listFields: [
          { key: 'icon', label: 'Icon Emoji', type: 'text', placeholder: '⚡', defaultValue: '⚡' },
          { key: 'title', label: 'Title', type: 'text', placeholder: 'Feature name', defaultValue: '' },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Feature description', defaultValue: '' },
          { key: 'imageUrl', label: 'Background Image', type: 'image', placeholder: 'Optional image', defaultValue: '' },
        ],
      },
    ],
  },

  'features-tabs': {
    sectionId: 'features-tabs',
    label: 'Features Tabs',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Powerful features', defaultValue: 'Powerful features' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'Explore what makes us...', defaultValue: 'Explore what makes our platform stand out.' },
      {
        key: 'tabs', label: 'Tabs', type: 'list', defaultValue: [],
        listFields: [
          { key: 'label', label: 'Tab Label', type: 'text', placeholder: 'Dashboard', defaultValue: '' },
          { key: 'title', label: 'Title', type: 'text', placeholder: 'Feature title', defaultValue: '' },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Feature description', defaultValue: '' },
          { key: 'imageUrl', label: 'Image', type: 'image', placeholder: 'Upload image', defaultValue: '' },
        ],
      },
    ],
  },

  'features-screenshot': {
    sectionId: 'features-screenshot',
    label: 'Feature Screenshot',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'See it in action', defaultValue: 'See it in action' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the feature...', defaultValue: 'Our intuitive interface makes complex tasks simple. See how teams are using our platform to ship faster.' },
      { key: 'screenshotUrl', label: 'Screenshot', type: 'image', placeholder: 'Upload screenshot', defaultValue: '' },
      { key: 'bullets', label: 'Bullet Points (one per line)', type: 'textarea', placeholder: 'Drag-and-drop editor\nReal-time collaboration\nOne-click publishing', defaultValue: 'Drag-and-drop editor\nReal-time collaboration\nOne-click publishing' },
      { key: 'imagePosition', label: 'Image Position (left/right)', type: 'text', placeholder: 'right', defaultValue: 'right' },
    ],
  },

  'features-numbered': {
    sectionId: 'features-numbered',
    label: 'Numbered Features',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Why we stand out', defaultValue: 'Why we stand out' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'Three reasons teams choose us...', defaultValue: 'Three reasons teams choose our platform.' },
      {
        key: 'features', label: 'Features', type: 'list', defaultValue: [],
        listFields: [
          { key: 'title', label: 'Title', type: 'text', placeholder: 'Feature name', defaultValue: '' },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Feature description', defaultValue: '' },
        ],
      },
    ],
  },

  'process-vertical': {
    sectionId: 'process-vertical',
    label: 'Vertical Process',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'How it works', defaultValue: 'How it works' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'Get started in three simple steps...', defaultValue: 'Get started in three simple steps.' },
      {
        key: 'steps', label: 'Steps', type: 'list', defaultValue: [],
        listFields: [
          { key: 'number', label: 'Number', type: 'text', placeholder: '1', defaultValue: '' },
          { key: 'title', label: 'Title', type: 'text', placeholder: 'Step title', defaultValue: '' },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Step description', defaultValue: '' },
          { key: 'icon', label: 'Icon Emoji', type: 'text', placeholder: '🚀', defaultValue: '' },
        ],
      },
    ],
  },

  'process-timeline': {
    sectionId: 'process-timeline',
    label: 'Horizontal Timeline',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Our roadmap', defaultValue: 'Our roadmap' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'Key milestones...', defaultValue: 'Key milestones on our journey.' },
      {
        key: 'milestones', label: 'Milestones', type: 'list', defaultValue: [],
        listFields: [
          { key: 'date', label: 'Date', type: 'text', placeholder: 'Q1 2026', defaultValue: '' },
          { key: 'title', label: 'Title', type: 'text', placeholder: 'Milestone title', defaultValue: '' },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Milestone description', defaultValue: '' },
        ],
      },
    ],
  },

  'content-section-header': {
    sectionId: 'content-section-header',
    label: 'Section Header',
    fields: [
      { key: 'badge', label: 'Badge Text', type: 'text', placeholder: 'Our Mission', defaultValue: '' },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Built for the modern web', defaultValue: 'Built for the modern web' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'A short description...', defaultValue: 'We believe in simplicity, speed, and giving founders the power to launch without a team of engineers.' },
      { key: 'alignment', label: 'Alignment (center/left)', type: 'text', placeholder: 'center', defaultValue: 'center' },
    ],
  },

  'content-callout': {
    sectionId: 'content-callout',
    label: 'Callout Box',
    fields: [
      { key: 'emoji', label: 'Icon Emoji', type: 'text', placeholder: '💡', defaultValue: '💡' },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Did you know?', defaultValue: 'Did you know?' },
      { key: 'body', label: 'Body', type: 'textarea', placeholder: 'Callout message...', defaultValue: 'Our platform processes over 10 million requests per day with 99.99% uptime. That means your landing pages are always fast, always available.' },
      { key: 'variant', label: 'Variant (info/success/warning)', type: 'text', placeholder: 'info', defaultValue: 'info' },
    ],
  },

  'content-rich-text': {
    sectionId: 'content-rich-text',
    label: 'Content Text',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'About Us', defaultValue: 'About Us' },
      { key: 'body', label: 'Body Text', type: 'textarea', placeholder: 'Write your content here...', defaultValue: 'We are building the future of product launches. Our mission is to give every founder the tools they need to go from idea to revenue — fast.\n\nWith a focus on simplicity and speed, we help teams validate ideas, capture demand, and start selling in minutes instead of months.' },
      { key: 'imageUrl', label: 'Image', type: 'image', placeholder: 'Upload an image', defaultValue: '' },
      { key: 'imagePosition', label: 'Image Position (none/left/right/top)', type: 'text', placeholder: 'none', defaultValue: 'none' },
    ],
  },

  'divider-spacer': {
    sectionId: 'divider-spacer',
    label: 'Spacer',
    fields: [
      { key: 'height', label: 'Height (sm/md/lg/xl)', type: 'text', placeholder: 'md', defaultValue: 'md' },
    ],
  },

  'divider-line': {
    sectionId: 'divider-line',
    label: 'Divider Line',
    fields: [
      { key: 'label', label: 'Center Label', type: 'text', placeholder: 'Optional label', defaultValue: '' },
      { key: 'style', label: 'Style (solid/dashed/gradient)', type: 'text', placeholder: 'solid', defaultValue: 'solid' },
    ],
  },

  'divider-wave': {
    sectionId: 'divider-wave',
    label: 'Wave Divider',
    fields: [
      { key: 'flip', label: 'Flip Vertically', type: 'boolean', defaultValue: false },
      { key: 'color', label: 'Color (brand/subtle/bg)', type: 'text', placeholder: 'brand', defaultValue: 'brand' },
    ],
  },

  'benefit-cards': {
    sectionId: 'benefit-cards',
    label: 'Benefits',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Why teams choose us', defaultValue: 'Why teams choose us' },
      {
        key: 'cards', label: 'Benefit Cards', type: 'list', defaultValue: [],
        listFields: [
          { key: 'emoji', label: 'Emoji Icon', type: 'text', placeholder: '🚀', defaultValue: '✨' },
          { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Launch in minutes', defaultValue: '' },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Benefit description', defaultValue: '' },
          { key: 'iconUrl', label: 'Custom Icon', type: 'image', placeholder: 'Upload icon (overrides emoji)', defaultValue: '' },
        ],
      },
    ],
  },

  'testimonials-marquee': {
    sectionId: 'testimonials-marquee',
    label: 'Testimonials Marquee',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'What people are saying', defaultValue: 'What people are saying' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: '', defaultValue: '' },
      {
        key: 'testimonials', label: 'Testimonials', type: 'list', defaultValue: [],
        listFields: [
          { key: 'quote', label: 'Quote', type: 'textarea', placeholder: 'Their testimonial...', defaultValue: '' },
          { key: 'name', label: 'Name', type: 'text', placeholder: 'Sarah Chen', defaultValue: '' },
          { key: 'role', label: 'Role', type: 'text', placeholder: 'CEO, Company', defaultValue: '' },
          { key: 'avatar', label: 'Avatar', type: 'image', placeholder: 'Upload avatar', defaultValue: '' },
        ],
      },
    ],
  },

  'testimonials-wall': {
    sectionId: 'testimonials-wall',
    label: 'Testimonials Wall',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Wall of love', defaultValue: 'Wall of love' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: '', defaultValue: '' },
      {
        key: 'testimonials', label: 'Testimonials', type: 'list', defaultValue: [],
        listFields: [
          { key: 'quote', label: 'Quote', type: 'textarea', placeholder: 'Their testimonial...', defaultValue: '' },
          { key: 'name', label: 'Name', type: 'text', placeholder: 'Sarah Chen', defaultValue: '' },
          { key: 'role', label: 'Role', type: 'text', placeholder: 'CEO, Company', defaultValue: '' },
          { key: 'avatar', label: 'Avatar', type: 'image', placeholder: 'Upload avatar', defaultValue: '' },
          { key: 'rating', label: 'Star Rating (1-5)', type: 'text', placeholder: '5', defaultValue: '5' },
        ],
      },
    ],
  },

  'testimonials-tweet': {
    sectionId: 'testimonials-tweet',
    label: 'Tweet-Style Testimonials',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'What people are saying', defaultValue: 'What people are saying' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: '', defaultValue: '' },
      {
        key: 'tweets', label: 'Tweets', type: 'list', defaultValue: [],
        listFields: [
          { key: 'quote', label: 'Tweet', type: 'textarea', placeholder: 'Tweet text...', defaultValue: '' },
          { key: 'name', label: 'Name', type: 'text', placeholder: 'Sarah Chen', defaultValue: '' },
          { key: 'handle', label: 'Handle', type: 'text', placeholder: '@sarahchen', defaultValue: '' },
          { key: 'avatar', label: 'Avatar', type: 'image', placeholder: 'Upload avatar', defaultValue: '' },
        ],
      },
    ],
  },

  'testimonials-avatar-row': {
    sectionId: 'testimonials-avatar-row',
    label: 'Testimonials with Avatars',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Hear from our customers', defaultValue: 'Hear from our customers' },
      {
        key: 'testimonials', label: 'Testimonials', type: 'list', defaultValue: [],
        listFields: [
          { key: 'quote', label: 'Quote', type: 'textarea', placeholder: 'Their testimonial...', defaultValue: '' },
          { key: 'name', label: 'Name', type: 'text', placeholder: 'Sarah Chen', defaultValue: '' },
          { key: 'role', label: 'Role', type: 'text', placeholder: 'CEO, Company', defaultValue: '' },
          { key: 'avatar', label: 'Avatar', type: 'image', placeholder: 'Upload avatar', defaultValue: '' },
        ],
      },
    ],
  },

  'pricing-two-tier': {
    sectionId: 'pricing-two-tier',
    label: 'Pricing Two Tier',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Simple pricing', defaultValue: 'Simple pricing' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'Choose the plan...', defaultValue: 'Choose the plan that works for you.' },
      {
        key: 'tiers', label: 'Tiers', type: 'list', defaultValue: [],
        listFields: [
          { key: 'name', label: 'Plan Name', type: 'text', placeholder: 'Pro', defaultValue: '' },
          { key: 'price', label: 'Price', type: 'text', placeholder: '$29', defaultValue: '' },
          { key: 'period', label: 'Period', type: 'text', placeholder: '/month', defaultValue: '/month' },
          { key: 'description', label: 'Description', type: 'text', placeholder: 'For growing teams', defaultValue: '' },
          { key: 'features', label: 'Features (one per line)', type: 'textarea', placeholder: 'Unlimited projects\n50 GB storage', defaultValue: '' },
          { key: 'cta', label: 'Button Text', type: 'text', placeholder: 'Get Started', defaultValue: 'Get Started' },
          { key: 'highlighted', label: 'Featured Plan', type: 'boolean', defaultValue: false },
        ],
      },
    ],
  },

  'pricing-toggle': {
    sectionId: 'pricing-toggle',
    label: 'Pricing with Toggle',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Simple, transparent pricing', defaultValue: 'Simple, transparent pricing' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'Choose the plan...', defaultValue: 'Choose the plan that fits your needs.' },
      { key: 'discountLabel', label: 'Annual Discount Label', type: 'text', placeholder: 'Save 20%', defaultValue: 'Save 20%' },
      {
        key: 'tiers', label: 'Tiers', type: 'list', defaultValue: [],
        listFields: [
          { key: 'name', label: 'Plan Name', type: 'text', placeholder: 'Pro', defaultValue: '' },
          { key: 'priceMonthly', label: 'Monthly Price', type: 'text', placeholder: '$29', defaultValue: '' },
          { key: 'priceAnnual', label: 'Annual Price', type: 'text', placeholder: '$23', defaultValue: '' },
          { key: 'period', label: 'Period', type: 'text', placeholder: '/mo', defaultValue: '/mo' },
          { key: 'description', label: 'Description', type: 'text', placeholder: 'For teams', defaultValue: '' },
          { key: 'features', label: 'Features (one per line)', type: 'textarea', placeholder: 'Unlimited projects\n50 GB storage', defaultValue: '' },
          { key: 'cta', label: 'Button Text', type: 'text', placeholder: 'Get Started', defaultValue: 'Get Started' },
          { key: 'highlighted', label: 'Featured Plan', type: 'boolean', defaultValue: false },
        ],
      },
    ],
  },

  'pricing-comparison': {
    sectionId: 'pricing-comparison',
    label: 'Pricing Comparison Table',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Compare plans', defaultValue: 'Compare plans' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: 'Find the perfect plan...', defaultValue: 'Find the perfect plan for your needs.' },
      {
        key: 'plans', label: 'Plans', type: 'list', defaultValue: [],
        listFields: [
          { key: 'name', label: 'Plan Name', type: 'text', placeholder: 'Pro', defaultValue: '' },
          { key: 'price', label: 'Price', type: 'text', placeholder: '$29', defaultValue: '' },
          { key: 'period', label: 'Period', type: 'text', placeholder: '/mo', defaultValue: '/mo' },
          { key: 'cta', label: 'Button Text', type: 'text', placeholder: 'Start Trial', defaultValue: 'Start Trial' },
          { key: 'highlighted', label: 'Featured', type: 'boolean', defaultValue: false },
        ],
      },
      {
        key: 'features', label: 'Features', type: 'list', defaultValue: [],
        listFields: [
          { key: 'name', label: 'Feature Name', type: 'text', placeholder: 'Storage', defaultValue: '' },
          { key: 'values', label: 'Values (pipe-separated)', type: 'text', placeholder: '1 GB|50 GB|500 GB', defaultValue: '' },
        ],
      },
    ],
  },

  'faq-two-column': {
    sectionId: 'faq-two-column',
    label: 'FAQ Two Column',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Frequently asked questions', defaultValue: 'Frequently asked questions' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'text', placeholder: '', defaultValue: '' },
      {
        key: 'faqs', label: 'Questions', type: 'list', defaultValue: [],
        listFields: [
          { key: 'question', label: 'Question', type: 'text', placeholder: 'How does it work?', defaultValue: '' },
          { key: 'answer', label: 'Answer', type: 'textarea', placeholder: 'Explain the answer...', defaultValue: '' },
        ],
      },
    ],
  },

  'faq-with-cta': {
    sectionId: 'faq-with-cta',
    label: 'FAQ with CTA',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Frequently asked questions', defaultValue: 'Frequently asked questions' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'text', placeholder: '', defaultValue: '' },
      {
        key: 'faqs', label: 'Questions', type: 'list', defaultValue: [],
        listFields: [
          { key: 'question', label: 'Question', type: 'text', placeholder: 'How does it work?', defaultValue: '' },
          { key: 'answer', label: 'Answer', type: 'textarea', placeholder: 'Explain the answer...', defaultValue: '' },
        ],
      },
      { key: 'ctaTitle', label: 'CTA Title', type: 'text', placeholder: 'Still have questions?', defaultValue: 'Still have questions?' },
      { key: 'ctaBody', label: 'CTA Body', type: 'textarea', placeholder: "Can't find the answer?", defaultValue: "Can't find the answer you're looking for? Our team is here to help." },
      { key: 'ctaButton', label: 'CTA Button', type: 'text', placeholder: 'Contact Support', defaultValue: 'Contact Support' },
      { key: 'ctaUrl', label: 'CTA URL', type: 'url', placeholder: '#', defaultValue: '#' },
    ],
  },

  'cta-simple': {
    sectionId: 'cta-simple',
    label: 'CTA Simple',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Ready to get started?', defaultValue: 'Ready to get started?' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Join thousands of teams...', defaultValue: 'Join thousands of teams already building better products.' },
      { key: 'ctaText', label: 'Button Text', type: 'text', placeholder: 'Get Started Free', defaultValue: 'Get Started Free' },
      { key: 'ctaUrl', label: 'Button URL', type: 'url', placeholder: '#', defaultValue: '#' },
    ],
  },

  'cta-split': {
    sectionId: 'cta-split',
    label: 'CTA Split',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Ready to transform your workflow?', defaultValue: 'Ready to transform your workflow?' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Start your free trial...', defaultValue: 'Start your free trial today and see results in minutes. No credit card required.' },
      { key: 'ctaPrimary', label: 'Primary Button', type: 'text', placeholder: 'Start Free Trial', defaultValue: 'Start Free Trial' },
      { key: 'ctaSecondary', label: 'Secondary Button', type: 'text', placeholder: 'Learn More', defaultValue: 'Learn More' },
      { key: 'imageUrl', label: 'Image', type: 'image', placeholder: 'Upload CTA image', defaultValue: '' },
    ],
  },

  'cta-banner': {
    sectionId: 'cta-banner',
    label: 'CTA Banner',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Start building for free today', defaultValue: 'Start building for free today' },
      { key: 'ctaText', label: 'Button Text', type: 'text', placeholder: 'Get Started', defaultValue: 'Get Started' },
      { key: 'ctaUrl', label: 'Button URL', type: 'url', placeholder: '#', defaultValue: '#' },
    ],
  },

  'waitlist-minimal': {
    sectionId: 'waitlist-minimal',
    label: 'Waitlist Minimal',
    fields: [
      { key: 'placeholder', label: 'Email Placeholder', type: 'text', placeholder: 'you@example.com', defaultValue: 'you@example.com' },
      { key: 'ctaText', label: 'Button Text', type: 'text', placeholder: 'Join Waitlist', defaultValue: 'Join Waitlist' },
      { key: 'successMessage', label: 'Success Message', type: 'text', placeholder: "You're on the list!", defaultValue: "You're on the list!" },
    ],
  },

  'waitlist-multi-field': {
    sectionId: 'waitlist-multi-field',
    label: 'Waitlist with Details',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Join the waitlist', defaultValue: 'Join the waitlist' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Be among the first...', defaultValue: 'Be among the first to try our product when it launches.' },
      { key: 'namePlaceholder', label: 'Name Placeholder', type: 'text', placeholder: 'Your name', defaultValue: 'Your name' },
      { key: 'emailPlaceholder', label: 'Email Placeholder', type: 'text', placeholder: 'you@example.com', defaultValue: 'you@example.com' },
      { key: 'extraFieldLabel', label: 'Extra Field Label', type: 'text', placeholder: 'Company (optional)', defaultValue: '' },
      { key: 'extraFieldPlaceholder', label: 'Extra Field Placeholder', type: 'text', placeholder: 'Your company', defaultValue: '' },
      { key: 'ctaText', label: 'Button Text', type: 'text', placeholder: 'Join Waitlist', defaultValue: 'Join Waitlist' },
    ],
  },

  'waitlist-with-benefits': {
    sectionId: 'waitlist-with-benefits',
    label: 'Waitlist with Benefits',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Get early access', defaultValue: 'Get early access' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Sign up to be first in line...', defaultValue: 'Sign up to be first in line when we launch.' },
      { key: 'placeholder', label: 'Email Placeholder', type: 'text', placeholder: 'you@example.com', defaultValue: 'you@example.com' },
      { key: 'ctaText', label: 'Button Text', type: 'text', placeholder: 'Join Waitlist', defaultValue: 'Join Waitlist' },
      {
        key: 'benefits', label: 'Benefits', type: 'list', defaultValue: [],
        listFields: [
          { key: 'text', label: 'Benefit', type: 'text', placeholder: 'Early access to all features', defaultValue: '' },
        ],
      },
    ],
  },

  'stats-cards': {
    sectionId: 'stats-cards',
    label: 'Stats Cards',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Our impact in numbers', defaultValue: 'Our impact in numbers' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: '', defaultValue: '' },
      {
        key: 'stats', label: 'Stats', type: 'list', defaultValue: [],
        listFields: [
          { key: 'value', label: 'Value', type: 'text', placeholder: '10K+', defaultValue: '' },
          { key: 'label', label: 'Label', type: 'text', placeholder: 'Active Users', defaultValue: '' },
          { key: 'description', label: 'Description', type: 'text', placeholder: 'Short description', defaultValue: '' },
        ],
      },
    ],
  },

  'stats-with-description': {
    sectionId: 'stats-with-description',
    label: 'Stats with Description',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Trusted by teams worldwide', defaultValue: 'Trusted by teams worldwide' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'We have been helping teams...', defaultValue: 'We have been helping teams launch products faster since 2024. Our platform powers thousands of landing pages and waitlists across the globe.' },
      {
        key: 'stats', label: 'Stats', type: 'list', defaultValue: [],
        listFields: [
          { key: 'value', label: 'Value', type: 'text', placeholder: '10K+', defaultValue: '' },
          { key: 'label', label: 'Label', type: 'text', placeholder: 'Active Users', defaultValue: '' },
        ],
      },
    ],
  },

  'comparison-before-after': {
    sectionId: 'comparison-before-after',
    label: 'Before & After',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Before vs. After', defaultValue: 'Before vs. After' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'See the difference...', defaultValue: 'See the difference our platform makes.' },
      { key: 'beforeLabel', label: 'Before Label', type: 'text', placeholder: 'Before', defaultValue: 'Before' },
      { key: 'afterLabel', label: 'After Label', type: 'text', placeholder: 'After', defaultValue: 'After' },
      {
        key: 'rows', label: 'Comparison Rows', type: 'list', defaultValue: [],
        listFields: [
          { key: 'aspect', label: 'Aspect', type: 'text', placeholder: 'Setup time', defaultValue: '' },
          { key: 'before', label: 'Before', type: 'text', placeholder: 'Hours of coding', defaultValue: '' },
          { key: 'after', label: 'After', type: 'text', placeholder: '5 minutes', defaultValue: '' },
        ],
      },
    ],
  },

  'comparison-feature-list': {
    sectionId: 'comparison-feature-list',
    label: 'Multi-Product Comparison',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'How we compare', defaultValue: 'How we compare' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'See how we stack up...', defaultValue: 'See how we stack up against the competition.' },
      {
        key: 'products', label: 'Products', type: 'list', defaultValue: [],
        listFields: [
          { key: 'name', label: 'Product Name', type: 'text', placeholder: 'Our Product', defaultValue: '' },
          { key: 'highlighted', label: 'Highlighted', type: 'boolean', defaultValue: false },
        ],
      },
      {
        key: 'features', label: 'Features', type: 'list', defaultValue: [],
        listFields: [
          { key: 'name', label: 'Feature Name', type: 'text', placeholder: 'Free tier', defaultValue: '' },
          { key: 'values', label: 'Values (pipe-separated)', type: 'text', placeholder: 'true|false|false', defaultValue: '' },
        ],
      },
    ],
  },

  'gallery-masonry': {
    sectionId: 'gallery-masonry',
    label: 'Image Gallery',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Gallery', defaultValue: 'Gallery' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: '', defaultValue: '' },
      {
        key: 'images', label: 'Images', type: 'list', defaultValue: [],
        listFields: [
          { key: 'imageUrl', label: 'Image', type: 'image', placeholder: 'Upload image', defaultValue: '' },
          { key: 'caption', label: 'Caption', type: 'text', placeholder: 'Image caption', defaultValue: '' },
          { key: 'tag', label: 'Tag', type: 'text', placeholder: 'Design', defaultValue: '' },
        ],
      },
    ],
  },

  'gallery-phone-mockup': {
    sectionId: 'gallery-phone-mockup',
    label: 'Phone Mockup Gallery',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Screenshots', defaultValue: 'Screenshots' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: '', defaultValue: '' },
      {
        key: 'screens', label: 'Screens', type: 'list', defaultValue: [],
        listFields: [
          { key: 'imageUrl', label: 'Screenshot', type: 'image', placeholder: 'Upload screenshot', defaultValue: '' },
          { key: 'label', label: 'Label', type: 'text', placeholder: 'Home Screen', defaultValue: '' },
        ],
      },
    ],
  },

  'gallery-browser-mockup': {
    sectionId: 'gallery-browser-mockup',
    label: 'Browser Mockup Gallery',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Product Screenshots', defaultValue: 'Product Screenshots' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: '', defaultValue: '' },
      {
        key: 'screens', label: 'Screens', type: 'list', defaultValue: [],
        listFields: [
          { key: 'imageUrl', label: 'Screenshot', type: 'image', placeholder: 'Upload screenshot', defaultValue: '' },
          { key: 'label', label: 'Label', type: 'text', placeholder: 'Dashboard', defaultValue: '' },
          { key: 'url', label: 'URL Bar Text', type: 'text', placeholder: 'app.example.com', defaultValue: '' },
        ],
      },
    ],
  },

  'footer-minimal': {
    sectionId: 'footer-minimal',
    label: 'Footer Minimal',
    fields: [
      {
        key: 'links', label: 'Links', type: 'list', defaultValue: [],
        listFields: [
          { key: 'label', label: 'Label', type: 'text', placeholder: 'Privacy', defaultValue: '' },
          { key: 'href', label: 'URL', type: 'url', placeholder: '#privacy', defaultValue: '#' },
        ],
      },
    ],
  },

  'footer-columns': {
    sectionId: 'footer-columns',
    label: 'Footer with Columns',
    fields: [
      { key: 'description', label: 'Company Description', type: 'textarea', placeholder: 'A short description...', defaultValue: 'Building the future of product launches.' },
      {
        key: 'columns', label: 'Link Columns', type: 'list', defaultValue: [],
        listFields: [
          { key: 'heading', label: 'Heading', type: 'text', placeholder: 'Product', defaultValue: '' },
          { key: 'links', label: 'Links (Label|URL per line)', type: 'textarea', placeholder: 'Features|#features\nPricing|#pricing', defaultValue: '' },
        ],
      },
      {
        key: 'socialLinks', label: 'Social Links', type: 'list', defaultValue: [],
        listFields: [
          { key: 'platform', label: 'Platform', type: 'text', placeholder: 'twitter', defaultValue: '' },
          { key: 'url', label: 'URL', type: 'url', placeholder: 'https://twitter.com/...', defaultValue: '' },
        ],
      },
    ],
  },

  'nav-centered': {
    sectionId: 'nav-centered',
    label: 'Navigation (Centered)',
    fields: [
      { key: 'ctaText', label: 'CTA Button Text', type: 'text', placeholder: 'Get Started', defaultValue: 'Get Started' },
      { key: 'ctaUrl', label: 'CTA Button URL', type: 'url', placeholder: '#', defaultValue: '#' },
      {
        key: 'links', label: 'Nav Links', type: 'list', defaultValue: [],
        listFields: [
          { key: 'label', label: 'Label', type: 'text', placeholder: 'Features', defaultValue: '' },
          { key: 'href', label: 'URL', type: 'url', placeholder: '#features', defaultValue: '#' },
        ],
      },
    ],
  },

  'nav-announcement': {
    sectionId: 'nav-announcement',
    label: 'Navigation with Banner',
    fields: [
      { key: 'ctaText', label: 'CTA Button Text', type: 'text', placeholder: 'Get Started', defaultValue: 'Get Started' },
      { key: 'ctaUrl', label: 'CTA Button URL', type: 'url', placeholder: '#', defaultValue: '#' },
      {
        key: 'links', label: 'Nav Links', type: 'list', defaultValue: [],
        listFields: [
          { key: 'label', label: 'Label', type: 'text', placeholder: 'Features', defaultValue: '' },
          { key: 'href', label: 'URL', type: 'url', placeholder: '#features', defaultValue: '#' },
        ],
      },
      { key: 'announcementText', label: 'Announcement Text', type: 'text', placeholder: 'We just launched v2.0!', defaultValue: 'We just launched v2.0! Check out the new features.' },
      { key: 'announcementUrl', label: 'Announcement URL', type: 'url', placeholder: '#', defaultValue: '' },
    ],
  },

  // ─── Phase 3: Creative Blocks ────────────────────────────

  'hero-background-image': {
    sectionId: 'hero-background-image',
    label: 'Hero Background Image',
    fields: [
      { key: 'badge', label: 'Badge Text', type: 'text', placeholder: 'Now Live', defaultValue: '' },
      { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Company Name (auto-filled if empty)', defaultValue: '' },
      { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Describe your product...', defaultValue: 'Build something extraordinary. Ship faster than ever before.' },
      { key: 'ctaPrimary', label: 'Primary Button', type: 'text', placeholder: 'Get Started', defaultValue: 'Get Started Free' },
      { key: 'ctaSecondary', label: 'Secondary Button', type: 'text', placeholder: 'Learn More', defaultValue: 'Learn More' },
      { key: 'backgroundImageUrl', label: 'Background Image', type: 'image', placeholder: 'Upload a background image', defaultValue: '' },
      { key: 'overlayOpacity', label: 'Overlay Opacity (0-100)', type: 'text', placeholder: '60', defaultValue: '60' },
      { key: 'textPosition', label: 'Text Position (left/center/right)', type: 'text', placeholder: 'center', defaultValue: 'center' },
    ],
  },

  'hero-video-bg': {
    sectionId: 'hero-video-bg',
    label: 'Hero Video Background',
    fields: [
      { key: 'badge', label: 'Badge Text', type: 'text', placeholder: 'Now Live', defaultValue: '' },
      { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Company Name (auto-filled if empty)', defaultValue: '' },
      { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Describe your product...', defaultValue: 'Experience the future of building products.' },
      { key: 'ctaPrimary', label: 'Primary Button', type: 'text', placeholder: 'Get Started', defaultValue: 'Get Started Free' },
      { key: 'ctaSecondary', label: 'Secondary Button', type: 'text', placeholder: 'Learn More', defaultValue: 'Learn More' },
      { key: 'videoUrl', label: 'Video URL (MP4)', type: 'url', placeholder: 'https://example.com/video.mp4', defaultValue: '' },
      { key: 'posterUrl', label: 'Poster Image (Fallback)', type: 'image', placeholder: 'Upload a poster image', defaultValue: '' },
      { key: 'overlayOpacity', label: 'Overlay Opacity (0-100)', type: 'text', placeholder: '50', defaultValue: '50' },
    ],
  },

  'embed-video': {
    sectionId: 'embed-video',
    label: 'Video Embed',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Watch our demo', defaultValue: '' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: '', defaultValue: '' },
      { key: 'videoUrl', label: 'Video URL (YouTube/Vimeo/Loom)', type: 'url', placeholder: 'https://youtube.com/watch?v=...', defaultValue: '' },
      { key: 'thumbnailUrl', label: 'Thumbnail Image', type: 'image', placeholder: 'Upload thumbnail (optional)', defaultValue: '' },
      { key: 'aspectRatio', label: 'Aspect Ratio (16:9/4:3/1:1)', type: 'text', placeholder: '16:9', defaultValue: '16:9' },
    ],
  },

  'embed-custom': {
    sectionId: 'embed-custom',
    label: 'Custom Embed',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: '', defaultValue: '' },
      { key: 'embedCode', label: 'Embed Code (HTML/iframe)', type: 'textarea', placeholder: '<iframe src="..." ...></iframe>', defaultValue: '' },
      { key: 'height', label: 'Height (sm/md/lg/xl)', type: 'text', placeholder: 'md', defaultValue: 'md' },
      { key: 'maxWidth', label: 'Max Width (sm/md/lg/full)', type: 'text', placeholder: 'lg', defaultValue: 'lg' },
    ],
  },

  'content-video-side': {
    sectionId: 'content-video-side',
    label: 'Content with Video',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'See it in action', defaultValue: 'See it in action' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Feature description...', defaultValue: 'Watch how our platform helps teams ship products faster than ever before.' },
      { key: 'videoUrl', label: 'Video URL (YouTube/Vimeo/Loom)', type: 'url', placeholder: 'https://youtube.com/watch?v=...', defaultValue: '' },
      { key: 'thumbnailUrl', label: 'Video Thumbnail', type: 'image', placeholder: 'Upload thumbnail (optional)', defaultValue: '' },
      { key: 'bullets', label: 'Bullet Points (one per line)', type: 'textarea', placeholder: 'Easy to use\nFast setup\nBeautiful results', defaultValue: '' },
      { key: 'videoPosition', label: 'Video Position (left/right)', type: 'text', placeholder: 'right', defaultValue: 'right' },
    ],
  },

  'features-large-image': {
    sectionId: 'features-large-image',
    label: 'Feature with Large Image',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Powerful dashboard', defaultValue: 'Powerful dashboard' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Feature description...', defaultValue: 'Everything you need to manage your business in one intuitive interface.' },
      { key: 'imageUrl', label: 'Feature Image', type: 'image', placeholder: 'Upload a large image', defaultValue: '' },
      { key: 'bullets', label: 'Bullet Points (one per line)', type: 'textarea', placeholder: 'Real-time analytics\nTeam management\nCustom workflows', defaultValue: 'Real-time analytics\nTeam management\nCustom workflows' },
      { key: 'imagePosition', label: 'Image Position (left/right)', type: 'text', placeholder: 'right', defaultValue: 'right' },
    ],
  },

  'content-image-overlap': {
    sectionId: 'content-image-overlap',
    label: 'Image with Overlapping Text',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Our story', defaultValue: 'Our story' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Tell your story...', defaultValue: 'We started with a simple idea: make it easy for anyone to launch a product online. Today, thousands of teams use our platform to go from idea to revenue.' },
      { key: 'imageUrl', label: 'Image', type: 'image', placeholder: 'Upload an image', defaultValue: '' },
      { key: 'imagePosition', label: 'Image Position (left/right)', type: 'text', placeholder: 'left', defaultValue: 'left' },
    ],
  },

  'custom-html': {
    sectionId: 'custom-html',
    label: 'Custom HTML',
    fields: [
      { key: 'htmlContent', label: 'HTML Code', type: 'textarea', placeholder: '<div>Your custom HTML here...</div>', defaultValue: '' },
      { key: 'maxWidth', label: 'Max Width (sm/md/lg/full)', type: 'text', placeholder: 'lg', defaultValue: 'lg' },
    ],
  },

  'hero-asymmetric': {
    sectionId: 'hero-asymmetric',
    label: 'Hero Asymmetric',
    fields: [
      { key: 'badge', label: 'Badge Text', type: 'text', placeholder: 'New', defaultValue: '' },
      { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Company Name (auto-filled if empty)', defaultValue: '' },
      { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Describe your product...', defaultValue: 'The modern platform for launching products. Fast, beautiful, and built for growth.' },
      { key: 'ctaPrimary', label: 'Primary Button', type: 'text', placeholder: 'Get Started', defaultValue: 'Get Started Free' },
      { key: 'ctaSecondary', label: 'Secondary Button', type: 'text', placeholder: 'Learn More', defaultValue: 'Learn More' },
      { key: 'imageUrl', label: 'Hero Image', type: 'image', placeholder: 'Upload product image', defaultValue: '' },
    ],
  },

  'hero-stacked-cards': {
    sectionId: 'hero-stacked-cards',
    label: 'Hero Stacked Cards',
    fields: [
      { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Company Name (auto-filled if empty)', defaultValue: '' },
      { key: 'subheadline', label: 'Subheadline', type: 'textarea', placeholder: 'Describe your product...', defaultValue: 'See what teams are building with our platform.' },
      { key: 'ctaPrimary', label: 'Primary Button', type: 'text', placeholder: 'Get Started', defaultValue: 'Get Started Free' },
      { key: 'ctaSecondary', label: 'Secondary Button', type: 'text', placeholder: 'Learn More', defaultValue: 'Learn More' },
      {
        key: 'cards', label: 'Screenshot Cards', type: 'list', defaultValue: [],
        listFields: [
          { key: 'imageUrl', label: 'Screenshot', type: 'image', placeholder: 'Upload screenshot', defaultValue: '' },
          { key: 'label', label: 'Label', type: 'text', placeholder: 'Dashboard', defaultValue: '' },
        ],
      },
    ],
  },

  'section-split-color': {
    sectionId: 'section-split-color',
    label: 'Split Color Section',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Two sides of the story', defaultValue: 'Two sides of the story' },
      { key: 'leftTitle', label: 'Left Title', type: 'text', placeholder: 'Before', defaultValue: 'The Problem' },
      { key: 'leftBody', label: 'Left Body', type: 'textarea', placeholder: 'Describe the problem...', defaultValue: 'Teams waste weeks juggling multiple tools just to launch a simple product page.' },
      { key: 'rightTitle', label: 'Right Title', type: 'text', placeholder: 'After', defaultValue: 'The Solution' },
      { key: 'rightBody', label: 'Right Body', type: 'textarea', placeholder: 'Describe the solution...', defaultValue: 'One platform to build, launch, and grow. Ship in minutes, not weeks.' },
      { key: 'leftColor', label: 'Left Background Color', type: 'color', defaultValue: '' },
      { key: 'rightColor', label: 'Right Background Color', type: 'color', defaultValue: '' },
    ],
  },

  'content-fullwidth-image': {
    sectionId: 'content-fullwidth-image',
    label: 'Full-Width Image',
    fields: [
      { key: 'imageUrl', label: 'Image', type: 'image', placeholder: 'Upload a full-width image', defaultValue: '' },
      { key: 'alt', label: 'Alt Text', type: 'text', placeholder: 'Image description', defaultValue: '' },
      { key: 'caption', label: 'Caption', type: 'text', placeholder: 'Optional caption', defaultValue: '' },
      { key: 'aspectRatio', label: 'Aspect Ratio (16:9/21:9/auto)', type: 'text', placeholder: '16:9', defaultValue: '16:9' },
    ],
  },

  'testimonials-video': {
    sectionId: 'testimonials-video',
    label: 'Video Testimonials',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Hear from our customers', defaultValue: 'Hear from our customers' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: '', defaultValue: '' },
      {
        key: 'testimonials', label: 'Video Testimonials', type: 'list', defaultValue: [],
        listFields: [
          { key: 'name', label: 'Name', type: 'text', placeholder: 'Sarah Chen', defaultValue: '' },
          { key: 'role', label: 'Role', type: 'text', placeholder: 'CEO, TechCo', defaultValue: '' },
          { key: 'videoUrl', label: 'Video URL (YouTube/Vimeo)', type: 'url', placeholder: 'https://youtube.com/watch?v=...', defaultValue: '' },
          { key: 'thumbnailUrl', label: 'Thumbnail', type: 'image', placeholder: 'Upload thumbnail', defaultValue: '' },
        ],
      },
    ],
  },

  'case-study-cards': {
    sectionId: 'case-study-cards',
    label: 'Case Study Cards',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Customer Stories', defaultValue: 'Customer Stories' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: '', defaultValue: 'See how teams are using our platform to grow.' },
      {
        key: 'cases', label: 'Case Studies', type: 'list', defaultValue: [],
        listFields: [
          { key: 'logoUrl', label: 'Company Logo', type: 'image', placeholder: 'Upload logo', defaultValue: '' },
          { key: 'company', label: 'Company Name', type: 'text', placeholder: 'Acme Corp', defaultValue: '' },
          { key: 'metric', label: 'Key Metric', type: 'text', placeholder: '3x growth', defaultValue: '' },
          { key: 'metricLabel', label: 'Metric Label', type: 'text', placeholder: 'Revenue increase', defaultValue: '' },
          { key: 'story', label: 'Story', type: 'textarea', placeholder: 'Brief case study...', defaultValue: '' },
          { key: 'linkUrl', label: 'Read More URL', type: 'url', placeholder: '#', defaultValue: '' },
        ],
      },
    ],
  },

  'logos-banner': {
    sectionId: 'logos-banner',
    label: 'Logo Banner',
    fields: [
      { key: 'bgColor', label: 'Background (brand/subtle/dark)', type: 'text', placeholder: 'subtle', defaultValue: 'subtle' },
      {
        key: 'logos', label: 'Logos', type: 'list', defaultValue: [],
        listFields: [
          { key: 'name', label: 'Company Name', type: 'text', placeholder: 'Acme Corp', defaultValue: '' },
          { key: 'logoUrl', label: 'Logo', type: 'image', placeholder: 'Upload logo', defaultValue: '' },
        ],
      },
    ],
  },

  'content-two-column': {
    sectionId: 'content-two-column',
    label: 'Two Column Content',
    fields: [
      { key: 'leftTitle', label: 'Left Title', type: 'text', placeholder: 'Our Mission', defaultValue: 'Our Mission' },
      { key: 'leftBody', label: 'Left Body', type: 'textarea', placeholder: 'Left column text...', defaultValue: 'We believe every founder deserves access to world-class tools. Our platform makes it possible to launch beautiful products without a team of engineers.' },
      { key: 'rightTitle', label: 'Right Title', type: 'text', placeholder: 'Our Vision', defaultValue: 'Our Vision' },
      { key: 'rightBody', label: 'Right Body', type: 'textarea', placeholder: 'Right column text...', defaultValue: 'A world where building a product is as simple as having an idea. Where technology empowers creators, not limits them.' },
      { key: 'divider', label: 'Divider (none/line)', type: 'text', placeholder: 'none', defaultValue: 'none' },
    ],
  },

  'content-image-grid': {
    sectionId: 'content-image-grid',
    label: 'Image Grid',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Gallery', defaultValue: '' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: '', defaultValue: '' },
      { key: 'columns', label: 'Columns (2/3)', type: 'text', placeholder: '3', defaultValue: '3' },
      {
        key: 'images', label: 'Images', type: 'list', defaultValue: [],
        listFields: [
          { key: 'imageUrl', label: 'Image', type: 'image', placeholder: 'Upload image', defaultValue: '' },
          { key: 'caption', label: 'Caption', type: 'text', placeholder: 'Image caption', defaultValue: '' },
        ],
      },
    ],
  },

  'cta-countdown': {
    sectionId: 'cta-countdown',
    label: 'CTA with Countdown',
    fields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Launching Soon', defaultValue: 'Launching Soon' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Get in before the deadline...', defaultValue: 'Get in before the deadline.' },
      { key: 'targetDate', label: 'Target Date (YYYY-MM-DD)', type: 'text', placeholder: '2026-06-01', defaultValue: '2026-06-01' },
      { key: 'ctaText', label: 'Button Text', type: 'text', placeholder: 'Join Now', defaultValue: 'Join Now' },
      { key: 'ctaUrl', label: 'Button URL', type: 'url', placeholder: '#', defaultValue: '#' },
    ],
  },

  'features-icon-grid': {
    sectionId: 'features-icon-grid',
    label: 'Icon Feature Grid',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Features', defaultValue: 'Features' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: '', defaultValue: '' },
      { key: 'columns', label: 'Columns (2/3/4)', type: 'text', placeholder: '4', defaultValue: '4' },
      {
        key: 'features', label: 'Features', type: 'list', defaultValue: [],
        listFields: [
          { key: 'icon', label: 'Icon Emoji', type: 'text', placeholder: '\u26A1', defaultValue: '' },
          { key: 'title', label: 'Title', type: 'text', placeholder: 'Feature name', defaultValue: '' },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Feature description', defaultValue: '' },
        ],
      },
    ],
  },

  'features-sticky-scroll': {
    sectionId: 'features-sticky-scroll',
    label: 'Sticky Scroll Features',
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Features', defaultValue: 'Features' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'textarea', placeholder: '', defaultValue: '' },
      {
        key: 'features', label: 'Features', type: 'list', defaultValue: [],
        listFields: [
          { key: 'title', label: 'Title', type: 'text', placeholder: 'Feature name', defaultValue: '' },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Feature description', defaultValue: '' },
          { key: 'imageUrl', label: 'Image', type: 'image', placeholder: 'Upload feature image', defaultValue: '' },
        ],
      },
    ],
  },
};

// ─── Block Builder — Branding Fields ────────────────────────

export const BLOCK_BRANDING_FIELDS: FieldDef[] = [
  { key: 'companyName', label: 'Company Name', type: 'text', placeholder: 'Your company', defaultValue: '' },
  { key: 'tagline', label: 'Tagline', type: 'text', placeholder: 'Your tagline', defaultValue: '' },
  { key: 'primaryColor', label: 'Primary Color', type: 'color', defaultValue: '#3b82f6' },
  { key: 'secondaryColor', label: 'Secondary Color', type: 'color', defaultValue: '#8b5cf6' },
  { key: 'headingFont', label: 'Heading Font', type: 'text', placeholder: 'Inter', defaultValue: 'Inter' },
  { key: 'bodyFont', label: 'Body Font', type: 'text', placeholder: 'Inter', defaultValue: 'Inter' },
];

// ─── Block Builder — Style Schema ───────────────────────────

export const BLOCK_STYLES_SCHEMA: FieldDef[] = [
  { key: 'backgroundColor', label: 'Background Color', type: 'color', defaultValue: '' },
  { key: 'textColor', label: 'Text Color', type: 'color', defaultValue: '' },
  { key: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '' },
  { key: 'paddingY', label: 'Vertical Padding', type: 'text', placeholder: 'none | sm | md | lg | xl', defaultValue: 'none' },
  { key: 'backgroundImage', label: 'Background Image', type: 'image', placeholder: 'Upload background image', defaultValue: '' },
  { key: 'backgroundOverlay', label: 'Background Overlay', type: 'color', defaultValue: '' },
  { key: 'animation', label: 'Animation', type: 'text', placeholder: 'none | fade | slide | scale', defaultValue: 'none' },
];

// ─── Block Builder — Schema Lookup ──────────────────────────

/**
 * Get the content schema fields for a block type.
 * Direct lookup into SECTION_SCHEMAS by blockType key.
 */
export function getBlockSchema(blockType: string): FieldDef[] {
  return SECTION_SCHEMAS[blockType]?.fields ?? [];
}

