import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@launchpad/db';
import { authConfig } from './config';

// PrismaAdapter expects `db.user` but our schema uses `model Profile`.
// It also sends `image` field but our model uses `avatarUrl`.
// This proxy remaps both so the adapter works without schema changes.
function remapImageField(args: Record<string, unknown>) {
  const data = args.data as Record<string, unknown> | undefined;
  if (data && 'image' in data) {
    data.avatarUrl = data.image;
    delete data.image;
  }
  return args;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const profileDelegate = db.profile as any;

const profileProxy = new Proxy(profileDelegate, {
  get(target: any, prop: string | symbol) {
    const val = target[prop];
    if (typeof val !== 'function') return val;
    if (prop === 'create' || prop === 'update') {
      return (args: Record<string, unknown>) =>
        val.call(target, remapImageField(args));
    }
    return val;
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dbWithUser = new Proxy(db as any, {
  get(target: any, prop: string | symbol) {
    if (prop === 'user') return profileProxy;
    return target[prop];
  },
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(dbWithUser),
  ...authConfig,
});
