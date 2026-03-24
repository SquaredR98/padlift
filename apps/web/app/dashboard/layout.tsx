import { redirect } from 'next/navigation';
import { getAuthProfile } from '@/lib/api-auth';
import { Sidebar } from './components/sidebar';
import { SupportWidget } from '@/components/dashboard/support-widget';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getAuthProfile();
  if (!profile) redirect('/login');

  return (
    <div className="flex h-screen bg-background">
      <Sidebar profile={profile} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      <SupportWidget />
    </div>
  );
}
