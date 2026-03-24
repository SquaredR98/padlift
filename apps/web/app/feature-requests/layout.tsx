import { LandingNav } from '@/components/landing/nav';
import { LandingFooter } from '@/components/landing/footer';

export const metadata = {
  title: 'Feature Requests — Padlift',
  description: 'Vote on upcoming features and submit your ideas.',
};

export default function FeatureRequestsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      {children}
      <LandingFooter />
    </div>
  );
}
