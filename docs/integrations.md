# Waitlist & Integrations

## Waitlist System

### How It Works
Each site can collect waitlist signups. Entries are stored in the `WaitlistEntry` model with position tracking and referral codes.

### Public Signup: `POST /api/waitlist/join`
No auth required. Request body: `{ siteId, email, referralCode? }`

Flow:
1. Validate email format (`z.string().email()`)
2. Check site exists
3. Check plan limit (`maxWaitlistEntries`)
4. Prevent duplicate signups (unique: `siteId` + `email`)
5. If `referralCode` provided, find the referrer and increment their `referralCount`
6. Generate new referral code (`base64url`, 6 bytes)
7. Auto-increment position
8. Fire webhook if configured
9. Sync to Google Sheets if connected
10. Return `{ position, referralCode, totalEntries }`

### Referral System
- Each entry gets a unique `referralCode`
- Sharing the code with friends tracks referrals via `referredById` foreign key
- `referralCount` is incremented on the referrer's entry
- Referral chain is one level deep (no multi-level tracking)

### Dashboard: `/dashboard/sites/[siteId]/waitlist`
Shows paginated waitlist entries with:
- Email, position, referral code, referral count, join date
- Search by email (case-insensitive)
- Export to CSV

### Plan Limits
`maxWaitlistEntries` is configurable per plan tier:
- FREE: 100
- PRO: 10,000
- BUSINESS: 999,999 (effectively unlimited)

## Google Sheets Integration

### Setup Flow
1. User clicks "Connect Google Sheets" on site settings
2. `GET /api/integrations/google/auth` → redirects to Google OAuth consent
3. User grants access to Google Sheets + Google Drive APIs
4. `GET /api/integrations/google/callback` → exchanges code for tokens
5. Tokens stored in `SiteIntegration` (encrypted config JSON)
6. User provides spreadsheet ID and sheet name

### Sync Mechanism
- **Incremental sync:** Only new entries since `lastSyncAt`
- **Full sync:** Clears sheet, writes all entries with headers
- **Auto-sync:** Triggered on each new waitlist signup
- **Manual sync:** `POST /api/sites/{siteId}/integrations/sync`

### Token Refresh
OAuth tokens have a ~1 hour expiry. Before each API call:
1. Check if `expiry_date` is within 60 seconds
2. If expired, `POST https://oauth2.googleapis.com/token` with `refresh_token`
3. Update stored tokens in DB

### Sheet Format
```
| Email              | Position | Referral Code | Referral Count | Joined At            |
|--------------------|----------|---------------|----------------|----------------------|
| alice@example.com  | 1        | abc123        | 3              | 2026-03-15T10:30:00Z |
```

### Implementation
Uses raw `fetch()` to Google Sheets API v4 (no googleapis SDK). Keeps the bundle lean and avoids dependency issues.

### Plan Gate
Google Sheets integration requires `googleSheets: true` on the plan (PRO and BUSINESS only).

## Webhook Integration

### Setup
`POST /api/sites/{siteId}/integrations/webhook`
Body: `{ url: "https://...", secret?: "optional-hmac-secret" }`

URL must be HTTPS. Secret enables HMAC-SHA256 signature verification.

### Events
Currently fires on:
- `waitlist.entry.added` — new waitlist signup

### Payload Format
```json
{
  "event": "waitlist.entry.added",
  "data": {
    "email": "user@example.com",
    "position": 42,
    "referralCode": "abc123"
  },
  "timestamp": "2026-03-15T10:30:00.000Z"
}
```

### Signature Verification
If a secret is configured, the webhook includes an `X-Launchpad-Signature` header:
```
HMAC-SHA256(secret, JSON.stringify(body))
```

### Delivery
Fire-and-forget with 5-second timeout. No retry mechanism. Errors are logged to `lastSyncError` on the integration record.

### Plan Gate
Webhooks require `webhooks: true` on the plan (PRO and BUSINESS only).

## Analytics

### Collection: `POST /api/analytics/collect`
Privacy-safe visitor tracking (no cookies, no PII). The beacon script:
1. Generates a daily visitor hash from IP + User-Agent + date
2. Sends `page_view` events with URL and referrer
3. Stores in `AnalyticsEvent` model

### Dashboard: `/dashboard/sites/[siteId]/analytics`
Shows:
- **Stat cards:** unique visitors, page views, signups, conversion rate
- **Daily chart:** MiniChart component with sparkline
- **Period picker:** 7d / 30d / 90d
- **Top pages:** most viewed pages by URL
- **Top referrers:** traffic sources

### Plan Gate
Analytics dashboard requires `analytics: true` (PRO and BUSINESS only). FREE plan shows an upgrade prompt.

### Third-Party Analytics
Sites can also configure:
- **GA4** — Google Analytics 4 measurement ID
- **GTM** — Google Tag Manager container ID
- **Clarity** — Microsoft Clarity project ID

These are injected as script tags in the published HTML.

## Custom Domains

### Setup
User enters a custom domain in site settings (plan-gated: PRO+ only).

### DNS Configuration
User must add a CNAME record pointing to the Padlift deployment.

### Routing
The middleware checks incoming requests:
1. If host is not in `APP_HOSTS` → it's a custom domain
2. Calls `/api/internal/domain-lookup?d=example.com`
3. Finds site with matching `customDomain` field
4. Rewrites request to `/s/[slug]`

### APP_HOSTS
Whitelist of app-owned hosts. Set via `APP_DOMAINS` env var (comma-separated).
