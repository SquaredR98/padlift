'use server';

import { signIn, signOut as authSignOut } from '@/lib/auth';
import { db } from '@launchpad/db';
import bcrypt from 'bcryptjs';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    // Auth.js throws a NEXT_REDIRECT when signIn succeeds
    // Only actual errors should be caught here
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error; // Let Next.js handle the redirect
    }
    return { error: 'Invalid email or password' };
  }
}

export async function loginWithGoogle() {
  await signIn('google', { redirectTo: '/dashboard' });
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  const existing = await db.profile.findUnique({ where: { email } });
  if (existing) {
    return { error: 'An account with this email already exists' };
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters' };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.profile.create({
    data: { email, passwordHash, name: name || null },
  });

  // Auto-login after signup
  return login(formData);
}

export async function signOut() {
  await authSignOut({ redirectTo: '/login' });
}
