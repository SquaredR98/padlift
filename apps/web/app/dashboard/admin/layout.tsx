import { redirect } from 'next/navigation';
import { getAuthProfile } from '@/lib/api-auth';
import { isAdmin } from '@/lib/admin';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getAuthProfile();
  if (!profile || !isAdmin(profile)) redirect('/dashboard');

  return <>{children}</>;
}
