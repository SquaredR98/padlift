import type { NextAuthConfig, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from '@launchpad/db';

export const authConfig: NextAuthConfig = {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const profile = await db.profile.findUnique({
          where: { email: credentials.email as string },
        });

        if (!profile?.passwordHash) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          profile.passwordHash
        );

        if (!valid) return null;

        return {
          id: profile.id,
          email: profile.email,
          name: profile.name,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    authorized({ auth, request }: { auth: Session | null; request: NextRequest }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;

      // Public routes (include /api/auth for OAuth callbacks)
      const publicPaths = ['/login', '/signup', '/api/auth/', '/api/waitlist/join', '/s/', '/preview/'];
      if (publicPaths.some((p) => pathname.startsWith(p))) return true;

      // Protect dashboard
      if (pathname.startsWith('/dashboard')) return isLoggedIn;
      if (pathname.startsWith('/api') && !pathname.startsWith('/api/webhooks')) {
        return isLoggedIn;
      }

      return true;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: { strategy: 'jwt' }, // Edge-compatible
};
