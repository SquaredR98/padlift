# Auth System

Padlift uses **Auth.js v5** (NextAuth) with JWT sessions, supporting email/password credentials and Google OAuth.

## Key Files

| File | Purpose |
|------|---------|
| `lib/auth/config.ts` | Auth.js configuration (providers, callbacks, pages) |
| `lib/auth/index.ts` | NextAuth initialization with PrismaAdapter |
| `middleware.ts` | Auth guard + custom domain routing |
| `app/(auth)/actions.ts` | Server actions: `login()`, `signup()`, `signOut()`, `loginWithGoogle()` |
| `app/(auth)/login/page.tsx` | Login page |
| `app/(auth)/signup/page.tsx` | Signup page |
| `components/auth/login-form/` | Login form component |
| `components/auth/signup-form/` | Signup form component |
| `components/auth/auth-visual-panel.tsx` | Decorative right panel |
| `lib/api-auth.ts` | `getAuthProfile()` helper for API routes |
| `app/api/auth/[...nextauth]/route.ts` | Auth.js route handler |
| `types/next-auth.d.ts` | Session type augmentation |

## Providers

### Credentials (Email/Password)
- Password hashed with **bcryptjs** (10 salt rounds)
- Validates against `Profile.passwordHash` in database
- Returns `{ id, email, name }` on success

### Google OAuth
- Uses `next-auth/providers/google`
- Configured via `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` env vars
- Redirects to `/dashboard` on success

## Session Strategy

**JWT** (not database sessions) — edge-compatible, no session table needed.

The `session` callback enriches the JWT token with `user.id` so API routes can identify the user:

```typescript
callbacks: {
  async session({ session, token }) {
    if (token.sub && session.user) {
      session.user.id = token.sub;
    }
    return session;
  },
}
```

## Auth Flow

### Signup
1. User submits name + email + password on `/signup`
2. Server action `signup()` validates:
   - Email not already taken
   - Password >= 6 characters
3. Hashes password, creates `Profile` record
4. Auto-calls `login()` to sign in immediately
5. Redirects to `/dashboard`

### Login
1. User submits email + password on `/login`
2. Server action `login()` calls `signIn('credentials', { ... })`
3. Auth.js `authorize()` callback:
   - Looks up profile by email
   - Compares password hash with bcrypt
   - Returns user object or null
4. On success: JWT created, redirect to `/dashboard`
5. On failure: returns `{ error: 'Invalid email or password' }`

### Google OAuth
1. User clicks "Continue with Google"
2. Server action `loginWithGoogle()` calls `signIn('google', { redirectTo: '/dashboard' })`
3. Auth.js redirects to Google consent screen
4. On callback: PrismaAdapter creates/links profile
5. Redirects to `/dashboard`

## Middleware

The middleware (`middleware.ts`) does two things:

### 1. Custom Domain Routing
If the request host is not in `APP_HOSTS`, it's a customer's custom domain:
- Looks up the slug via `/api/internal/domain-lookup`
- Rewrites the request to `/s/[slug]`
- Skips app routes (`/_next`, `/api`, `/dashboard`, etc.)

### 2. Auth Guard (via `authorized` callback)
Public paths (no auth required):
- `/login`, `/signup`
- `/api/auth/` (OAuth callbacks)
- `/api/waitlist/join` (public signup)
- `/s/` (published sites)
- `/preview/` (template previews)

Protected paths:
- `/dashboard/*` — requires `isLoggedIn`
- `/api/*` (except `/api/webhooks`) — requires `isLoggedIn`

Everything else (landing page, legal pages) — public.

## API Auth Helper

`lib/api-auth.ts` provides `getAuthProfile()` for use in API routes:

```typescript
export async function getAuthProfile() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return db.profile.findUnique({ where: { id: session.user.id } });
}
```

Returns the full `Profile` record (including `plan`, `role`, `adminPermissions`) or `null`.

## UI Components

### Login/Signup Pages
Split layout: form on left, decorative panel on right (hidden on mobile).

Both forms:
- Show error messages inline
- Have loading spinners during submission
- Include Google OAuth button with official SVG icon
- Link to the other page ("Don't have an account?" / "Already have an account?")

### Auth Visual Panel
Decorative component with gradient meshes, floating UI mockup cards, and a value proposition message. Pure CSS animations.
