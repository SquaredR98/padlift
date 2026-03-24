# Publishing & Rendering

When a user publishes a site, the block editor's `PageData` is rendered to static HTML and served as a complete HTML document.

## Key Files

| File | Purpose |
|------|---------|
| `lib/render-page-html.ts` | Converts `PageData` → static HTML (React SSR) |
| `lib/render-site.ts` | Wraps HTML in full document with fonts, analytics, theme |
| `app/api/sites/[siteId]/publish/route.ts` | Publish endpoint |
| `app/s/[slug]/route.ts` | Serve published homepage |
| `app/s/[slug]/[...path]/route.ts` | Serve published sub-pages |
| `middleware.ts` | Custom domain → slug rewriting |

## Publishing Flow

### Step 1: User Clicks "Publish"

The editor calls `POST /api/sites/{siteId}/publish`. The endpoint:

1. Loads the site with all pages
2. Determines the content model:
   - **Per-page model** (new): branding from `site.templateContent`, blocks from `page.contentJson`
   - **Legacy model** (old): full `PageData` in `site.templateContent`
3. For each page:
   - Combines branding + blocks into `PageData`
   - Calls `renderPageToHtml(pageData)` → static HTML string
   - Saves to `page.publishedHtml` + sets `status: PUBLISHED`
4. Sets `site.publishedAt` timestamp

### Step 2: renderPageToHtml()

Converts blocks to static HTML using React's `renderToStaticMarkup()`:

1. **Prepare branding** with defaults (company name, colors, fonts)
2. **Resolve anchor IDs** for internal navigation (`#features`, `#pricing`)
3. **For each block:**
   - Look up component from `BLOCK_REGISTRY`
   - Use `ssrComponent` if available (static variant without hooks)
   - Calculate wrapper classes (`resolveBlockClasses`) and inline styles (`resolveBlockInlineStyles`)
   - Handle background overlays (colored div on top of background images)
   - Override `primaryColor` if block has `accentColor` style
   - Create React element with `createElement()`
4. **Render** all block elements to static markup string
5. Return HTML string (just the blocks, no `<html>` wrapper yet)

### Step 3: renderSiteHtml()

Wraps the pre-rendered block HTML in a complete HTML document:

```html
<!DOCTYPE html>
<html lang="en" data-site-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Site Name</title>

  <!-- Google Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />

  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Theme CSS variables -->
  <style>
    [data-site-theme="dark"] { --lp-site-bg: #030712; ... }
    [data-site-theme="light"] { --lp-site-bg: #ffffff; ... }
    html { scroll-behavior: smooth; scroll-padding-top: 80px; }
    h1,h2,h3 { font-family: 'Plus Jakarta Sans', system-ui; }
    body { font-family: 'Inter', system-ui; }
  </style>

  <!-- Analytics (GA4, GTM, Clarity) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"></script>
</head>
<body>
  <!-- Pre-rendered block HTML -->
  <div data-lp-published class="min-h-screen bg-[var(--lp-site-bg)]" data-site-theme="dark">
    <div id="nav" data-lp-section="nav-standard">...</div>
    <div id="hero" data-lp-section="hero-centered">...</div>
    <div id="features" data-lp-section="features-grid">...</div>
    ...
  </div>

  <!-- Scroll reveal animations -->
  <style>...</style>
  <script>/* IntersectionObserver for reveal */</script>

  <!-- Theme toggle (Sun/Moon floating button) -->
  <script>/* localStorage-backed theme toggle */</script>

  <!-- "Built with Padlift" badge -->
  <a href="https://padlift.dev" class="lp-badge">Built with Padlift</a>

  <!-- Padlift analytics beacon -->
  <script>/* Privacy-safe visitor tracking */</script>
</body>
</html>
```

## Serving Published Sites

### Homepage: `/s/[slug]`

Route handler looks up the site by slug, returns `renderSiteHtml(site)`.

### Sub-pages: `/s/[slug]/[...path]`

Route handler finds the page by slug + path, returns the rendered HTML for that specific page.

### Custom Domains

The middleware intercepts requests to non-app hosts:
1. Extracts the hostname
2. Calls `/api/internal/domain-lookup?d=example.com`
3. Finds the site with matching `customDomain`
4. Rewrites the request to `/s/[slug]`

`APP_HOSTS` whitelist (localhost + `APP_DOMAINS` env var) determines which hosts belong to the app vs. customer domains.

## What Gets Injected

### Analytics (if configured on the site)
- **GA4** — Google Analytics 4 measurement ID
- **GTM** — Google Tag Manager container ID + noscript fallback
- **Clarity** — Microsoft Clarity project ID

### Padlift Analytics Beacon
If `analyticsEnabled` is true for the site, a lightweight script is injected that:
- Generates a privacy-safe visitor hash (no cookies, no PII)
- Sends `page_view` events to `/api/analytics/collect`
- Tracks page URL and referrer

### Theme Toggle
A floating Sun/Moon button in the bottom-right corner. Persists choice to `localStorage`. Toggles `data-site-theme` attribute between `dark` and `light`.

### Scroll Reveal Animations
Scoped to `[data-lp-published]` so they don't affect the editor canvas. Uses `IntersectionObserver` to fade in sections as they scroll into view.

### "Built with Padlift" Badge
Fixed bottom-left badge. Shown unless the user's plan includes `removeBranding` and it's toggled off. Semi-transparent, theme-aware styling.

## Content Models (Migration Path)

The system supports three content formats for backward compatibility:

### 1. Per-Page Model (current)
- Branding in `site.templateContent` (shared across pages)
- Blocks in `page.contentJson` (per-page)
- Detected by: `templateContent` has `companyName` but no `blocks` key

### 2. Single-Page Model (old)
- Full `PageData` (branding + blocks) in `site.templateContent`
- Detected by: `templateContent` has a `blocks` array

### 3. Legacy Sections Model (very old)
- Pre-block-builder format with `sections` key
- Auto-migrated to block format using `migrateToPageData()`
- Migration is persisted on first load

The editor page (`edit/page.tsx`) detects the format and normalizes it before passing to the client.
