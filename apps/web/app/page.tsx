import { getAllPlanConfigs } from '@/lib/plan-gate';
import { testimonialsService } from '@/lib/service-container';
import { LandingNav } from '@/components/landing/nav';
import { LandingHero } from '@/components/landing/hero';
import { LandingSocialProof } from '@/components/landing/social-proof';
import { LandingFeatures } from '@/components/landing/features';
import { LandingHowItWorks } from '@/components/landing/how-it-works';
import { LandingPricing } from '@/components/landing/pricing';
import { LandingFAQ } from '@/components/landing/faq';
import { LandingCTA } from '@/components/landing/cta';
import { LandingFooter } from '@/components/landing/footer';

// Revalidate every 60s — serves static HTML to visitors,
// refreshes plan data from DB in the background.
export const revalidate = 60;

export default async function LandingPage() {
  const [planConfigs, testimonials] = await Promise.all([
    getAllPlanConfigs(),
    testimonialsService.getApprovedFeatured().catch(() => []),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <LandingHero />
      <LandingSocialProof testimonials={testimonials} />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingPricing plans={planConfigs} />
      <LandingFAQ />
      <LandingCTA />
      <LandingFooter />
    </div>
  );
}
