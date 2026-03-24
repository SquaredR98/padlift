# Theming

Padlift has three separate theming systems, each with its own CSS variable namespace.

## Three Theme Namespaces

| Namespace | Scope | Variables | Toggle |
|-----------|-------|-----------|--------|
| shadcn vars | Dashboard UI | `--background`, `--foreground`, `--card`, etc. | `next-themes` (class attribute) |
| `--lp-*` vars | Editor UI | `--lp-bg`, `--lp-border`, etc. | Inherited from dashboard |
| `--lp-site-*` vars | Published sites | `--lp-site-bg`, `--lp-site-card`, etc. | `data-site-theme` attribute |

These three namespaces must never be mixed.

## Dashboard Theme

### Setup
- **Provider:** `next-themes` (wraps the app in `ThemeProvider`)
- **Strategy:** `class` attribute on `<html>` — adds `.dark` class
- **Toggle:** `ThemeToggle` component in sidebar profile dropdown
- **Default:** System preference

### CSS Variables
shadcn/ui variables defined in `globals.css`. The `.dark` block overrides them with dark palette values:

```css
.dark {
  --background: #030712;     /* gray-950 */
  --card: #111827;           /* gray-900 */
  --muted: #1f2937;          /* gray-800 */
  --foreground: #f9fafb;     /* gray-50 */
  --muted-foreground: #9ca3af; /* gray-400 */
  --dimmed-foreground: #6b7280; /* gray-500 — custom 4th text level */
  --border: #1f2937;         /* gray-800 */
}
```

All dashboard pages use semantic classes: `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `text-dimmed-foreground`, `border-border`, `bg-muted`.

### Custom Variable: `--dimmed-foreground`
A 4th text level beyond shadcn's default 3 (foreground, muted-foreground, dimmed-foreground). Used for subtle labels, empty states, and disabled text.

## Published Site Theme

### CSS Variables
Scoped by `[data-site-theme="dark"]` and `[data-site-theme="light"]` selectors:

```css
[data-site-theme="dark"] {
  --lp-site-bg: #030712;
  --lp-site-card: #111827;
  --lp-site-card-hover: #1f2937;
  --lp-site-heading: #ffffff;
  --lp-site-body: #334155;         /* Adjusted for contrast */
  --lp-site-muted: #64748b;       /* Adjusted for contrast */
  --lp-site-border: #1e293b;
  --lp-site-input-bg: #0f172a;
}

[data-site-theme="light"] {
  --lp-site-bg: #ffffff;
  --lp-site-card: #f3f4f6;
  --lp-site-heading: #1f2937;
  --lp-site-body: #4b5563;
  --lp-site-border: #e5e7eb;
}
```

### Block Components
All 100+ section components use `var(--lp-site-*)` variables instead of hardcoded colors. This ensures they work in both dark and light themes.

### Default Theme
Each site has a `defaultTheme` field in `TemplateBranding` (default: `dark`). Set via the BrandingEditor's theme picker.

### Visitor Toggle
Published sites include a floating Sun/Moon button that:
- Toggles `data-site-theme` between `dark` and `light`
- Persists choice to `localStorage` (key: site-specific)
- Respects the site's `defaultTheme` on first visit

## Editor Theme

### Editor UI Variables (`--lp-*`)
The editor canvas and panels use `--lp-*` variables for their own UI (separate from both the dashboard theme and the site preview theme). This prevents the site preview from affecting the editor chrome.

### Site Preview in Editor
The editor canvas renders blocks inside a `<div data-site-theme="...">` wrapper, so blocks display with their site theme while the surrounding editor uses dashboard theme.

## Font System

### Dashboard Font
**DM Sans** — loaded via `next/font/google` in the root layout. Applied to all dashboard pages.

### Published Site Fonts
Two configurable fonts per site:
- **Heading font** — applied to `h1-h6` via CSS rule
- **Body font** — applied to `body` / page wrapper via `fontFamily` style

Loaded via Google Fonts CDN `<link>` tags in published HTML. Editor loads them dynamically via injected `<link>` tags.

### Font Pairs
10 curated presets combining heading + body fonts (e.g., "Plus Jakarta Sans + Inter", "Playfair Display + Source Sans 3"). Users can also pick custom fonts from the full Google Fonts catalog.

### Backward Compatibility
Old sites stored a single `fontFamily` field. `resolveFonts(branding)` handles this by using the old value for both heading and body if the new fields aren't set.

## Styling Rules

### Tailwind Classes vs Inline Styles
- **Tailwind classes** for: layout, spacing, typography, transitions, static colors
- **Inline styles** for: dynamic brand colors (`primaryColor`, `accentColor`), gradients, background images
- **Never** inline styles for layout, spacing, or typography

### Tailwind CDN Compatibility
Published sites use Tailwind CDN (v3). The editor uses Tailwind CSS v4. To maintain compatibility:
- Use `var()` syntax (`bg-[var(--lp-site-bg)]`) instead of v4 shorthand (`bg-(--lp-site-bg)`)
- Use `bg-linear-to-r` in the app but traditional `bg-gradient-to-r` in published HTML
- Use `shrink-0` (v4) in the app
