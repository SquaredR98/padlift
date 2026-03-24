# Admin Dashboard

## RBAC System

### Roles
| Role | Access |
|------|--------|
| `USER` | Standard user — no admin access |
| `ADMIN` | Partial admin — only granted permissions |
| `SUPER_ADMIN` | Full admin — all permissions, no checks |

### Permissions
| Permission | Description |
|------------|-------------|
| `manage_users` | View, edit, manage user accounts |
| `manage_billing` | View revenue, subscriptions, billing |
| `manage_plans` | Edit plan tiers, pricing, feature limits |
| `manage_sites` | View and manage all sites |
| `view_analytics` | Platform-wide analytics |
| `manage_settings` | Manage admin users, system config |

### Bootstrap Emails
Hardcoded in `lib/admin.ts`. Bootstrap emails always have full access, regardless of their database role. This prevents lockout scenarios.

```typescript
const BOOTSTRAP_EMAILS = new Set(['mail@ravi-ranjan.in']);
```

### Authorization Functions
```typescript
isAdmin(profile)        // ADMIN or SUPER_ADMIN or bootstrap email
isSuperAdmin(profile)   // SUPER_ADMIN or bootstrap email
hasPermission(profile, permission)  // Check specific permission
```

`SUPER_ADMIN` and bootstrap emails bypass all permission checks. `ADMIN` users are checked against their `adminPermissions` string array.

## Key Files

| File | Purpose |
|------|---------|
| `lib/admin.ts` | Roles, permissions, bootstrap emails, auth functions |
| `app/dashboard/admin/layout.tsx` | Server component auth guard (redirects non-admins) |
| `app/dashboard/admin/page.tsx` | Admin overview |
| `app/dashboard/admin/users/page.tsx` | User list |
| `app/dashboard/admin/users/[userId]/page.tsx` | User detail + edit |
| `app/dashboard/admin/sites/page.tsx` | All sites |
| `app/dashboard/admin/billing/page.tsx` | Revenue overview |
| `app/dashboard/admin/plans/page.tsx` | Plan config editor |
| `app/dashboard/admin/pricing-experiments/page.tsx` | A/B pricing tests |
| `app/dashboard/admin/settings/page.tsx` | Admin settings + payments toggle |
| `components/dashboard/admin/` | Shared admin components |

## Admin Layout

`admin/layout.tsx` is a server component that:
1. Calls `getAuthProfile()`
2. Checks `isAdmin(profile)`
3. Redirects to `/dashboard` if not an admin

The sidebar shows admin-specific navigation (mutually exclusive with site nav):
- Overview, Users, Sites, Billing, Plans, Pricing, Settings

## Admin Pages

### Overview
Platform stats: total users, total sites, total waitlist entries, recent signups.

### Users
- Paginated user list with search, filter by plan/role
- Each row: name, email, plan, role, site count, join date
- Click through to user detail page

### User Detail
- View user info, sites, subscription status
- **Change plan** — dropdown to change FREE/PRO/BUSINESS
- **Change role** — USER/ADMIN/SUPER_ADMIN
- **Granular permissions** — toggle individual permissions for ADMIN role
- **Safety checks:**
  - Cannot demote bootstrap email users
  - Cannot demote the last SUPER_ADMIN
  - Cannot change own role (prevents self-lockout)

### Sites
All sites across all users. View site name, owner, slug, status, entries count.

### Billing
- Shows subscription info from whichever payment provider is active
- Displays Gumroad subscription IDs
- Revenue overview

### Plans
`PlanEditor` component for editing all three tiers:
- Display name, monthly/yearly price
- Gumroad URLs + tier name (for membership products)
- Feature limits: max sites, max waitlist entries, max pages, max payment links, max storage MB
- Feature flags: custom domain, remove branding, Google Sheets, webhooks, analytics, A/B testing

Changes are saved to the `PlanConfig` database table.

### Pricing Experiments
A/B pricing test management (see [Billing docs](billing.md#pricing-ab-testing)).

### Settings
- **Payments toggle** — enable/disable checkout globally
- **Admin users list** — shows all ADMIN and SUPER_ADMIN users
- **Bootstrap emails** — displays hardcoded bootstrap emails
- **System info** — total users, sites, entries

## API Routes

| Route | Method | Permission | Purpose |
|-------|--------|------------|---------|
| `/api/admin/users` | GET | `manage_users` | List users (paginated, searchable) |
| `/api/admin/users/[userId]` | GET | `manage_users` | User detail |
| `/api/admin/users/[userId]` | PATCH | `manage_users` | Update plan, role, permissions |
| `/api/admin/sites` | GET | `manage_sites` | List all sites |
| `/api/admin/billing` | GET | `manage_billing` | Billing overview |
| `/api/admin/plans` | GET/PATCH | `manage_plans` | Plan config CRUD |
| `/api/admin/settings` | GET/PATCH | `manage_settings` | App settings |
| `/api/admin/pricing-experiments` | GET/POST | `manage_plans` | Experiment list + create |
| `/api/admin/pricing-experiments/[id]` | PATCH/DELETE | `manage_plans` | Experiment update + delete |
| `/api/admin/testimonials` | GET | `manage_settings` | List testimonials |
| `/api/admin/testimonials/[id]` | PATCH/DELETE | `manage_settings` | Moderate testimonials |
| `/api/admin/feature-requests` | GET | `manage_settings` | List feature requests |
| `/api/admin/feature-requests/[id]` | PATCH/DELETE | `manage_settings` | Update status, delete |
| `/api/admin/support` | GET | `manage_settings` | List support tickets |
| `/api/admin/support/[id]` | GET/PATCH | `manage_settings` | View + reply to tickets |
| `/api/admin/stats` | GET | `view_analytics` | Platform stats |
