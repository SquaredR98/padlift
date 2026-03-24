import { auth } from '@/lib/auth';
import { db } from '@launchpad/db';

export async function getAuthProfile() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return db.profile.findUnique({ where: { id: session.user.id } });
}
