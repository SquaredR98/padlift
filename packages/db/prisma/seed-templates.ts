import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const TEMPLATES = [
  { slug: 'saas-starter', name: 'SaaS Starter', description: 'Classic SaaS landing page with hero, features, pricing, testimonials, and FAQ.', category: 'saas' },
  { slug: 'viral-waitlist', name: 'Viral Waitlist', description: 'Pre-launch page built for signups with referral-ready waitlist and social proof.', category: 'waitlist' },
  { slug: 'pricing-first', name: 'Pricing First', description: 'Lead with pricing to qualify buyers fast, backed by features and social proof.', category: 'saas' },
  { slug: 'dev-tool', name: 'Developer Tool', description: 'Video demo hero with icon features and comparison pricing for dev tools.', category: 'devtool' },
  { slug: 'ai-product', name: 'AI Product', description: 'Split hero with alternating features — designed for AI/ML product launches.', category: 'ai' },
  { slug: 'product-launch', name: 'Product Launch', description: 'Video hero with waitlist form — perfect for launch day with built-in virality.', category: 'waitlist' },
  { slug: 'agency-portfolio', name: 'Agency Portfolio', description: 'Sleek agency page with alternating features, testimonials, and gradient CTA.', category: 'agency' },
  { slug: 'newsletter', name: 'Newsletter', description: 'Compact hero with waitlist form and social proof — built for newsletter signups.', category: 'waitlist' },
];

async function main() {
  console.log('Seeding templates...');

  for (const t of TEMPLATES) {
    await db.template.upsert({
      where: { slug: t.slug },
      create: {
        slug: t.slug,
        name: t.name,
        description: t.description,
        category: t.category,
        contentJson: {},
      },
      update: {
        name: t.name,
        description: t.description,
        category: t.category,
      },
    });
    console.log(`  ✓ ${t.slug}`);
  }

  console.log('Done! Seeded', TEMPLATES.length, 'templates.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
