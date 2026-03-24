import { LandingNav } from '@/components/landing/nav';
import { LandingFooter } from '@/components/landing/footer';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        {children}
      </main>
      <LandingFooter />
    </div>
  );
}
