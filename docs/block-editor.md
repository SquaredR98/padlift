# Block Editor & Templates

The block editor is a visual page builder where users compose pages from reusable blocks. Each block is a React component with schema-driven content fields and design token overrides.

## Key Files

| File | Purpose |
|------|---------|
| `lib/templates/block-types.ts` | Core types: `BlockInstance`, `PageData`, `TemplateBranding`, `BlockStyles` |
| `lib/templates/block-registry.ts` | `BLOCK_REGISTRY` — maps block type IDs to components + schemas |
| `lib/templates/content-schema.ts` | Field definitions for block content (text, image, list, color, etc.) |
| `lib/templates/presets.ts` | 25+ template presets (pre-composed block sequences) |
| `lib/templates/font-pairs.ts` | 10 curated heading + body font presets |
| `lib/templates/block-anchors.ts` | Anchor ID resolution for navigation links |
| `lib/templates/sections/` | 100+ block components + SSR static variants |
| `components/dashboard/block-editor/` | Editor UI: canvas, toolbar, operations hook |
| `components/dashboard/template-picker/` | Template selection grid |
| `app/dashboard/sites/[siteId]/edit/` | Editor page + sub-components |

## Core Data Model

### BlockInstance
A single block on a page:
```typescript
interface BlockInstance {
  id: string;              // nanoid
  blockType: string;       // e.g. 'hero-centered', 'features-grid'
  content: Record<string, unknown>;  // Schema-driven field values
  styles: Partial<BlockStyles>;      // Design token overrides
}
```

### PageData
A page's complete state:
```typescript
interface PageData {
  branding: TemplateBranding;  // Company name, colors, fonts, theme
  blocks: BlockInstance[];     // Ordered list of blocks
}
```

### TemplateBranding
Site-level branding applied to all blocks:
```typescript
interface TemplateBranding {
  companyName: string;
  tagline: string;
  primaryColor: string;      // Hex color
  logoUrl: string;
  headingFont: string;       // Google Font family
  bodyFont: string;
  defaultTheme: 'dark' | 'light';
}
```

### BlockStyles (Design Tokens)
Per-block style overrides:
- **Layout:** `maxWidth`, `paddingX/Y`, `columns`, `gap`
- **Colors:** `backgroundColor`, `textColor`, `accentColor`, `gradientFrom/To/Direction`
- **Cards:** `borderRadius`, `shadow`, `borderWidth`, `cardStyle` (flat/outlined/elevated/filled)
- **Typography:** `headingSize`, `bodySize`, `letterSpacing`, `lineHeight`, `textTransform`, `textAlign`
- **Effects:** `animation`, `animationDelay`, `backgroundImage`, `backgroundOverlay`, `showDecorations`

## Block Registry

`BLOCK_REGISTRY` is a `Record<string, BlockRegistryEntry>` mapping block type IDs to their metadata:

```typescript
interface BlockRegistryEntry {
  blockType: string;
  label: string;
  description: string;
  category: string;           // navigation, hero, features, etc.
  component: React.ComponentType;      // Editor preview component
  ssrComponent?: React.ComponentType;  // Static variant for publishing
  schema: FieldDef[];         // Content form schema
  defaultContent: Record<string, unknown>;
  defaultStyles: Partial<BlockStyles>;
  applicableStyles?: string[];  // Which design tokens this block supports
}
```

### Block Categories (19)
`navigation`, `hero`, `logos`, `features`, `process`, `testimonials`, `pricing`, `faq`, `cta`, `waitlist`, `stats`, `comparison`, `gallery`, `content`, `footer`, `divider`, `embed`, `layout`, `countdown`

### SSR-Safe Static Variants
Blocks with client hooks (modals, tabs, animations, carousels) have separate static variants for publishing:
- `FaqAccordion` → `FaqAccordionStatic`
- `TestimonialsMarquee` → `TestimonialsMarqueeStatic`
- `PricingToggle` → `PricingToggleStatic`
- `NavStandard` → `NavStandardStatic`
- etc.

Static variants use pure HTML/CSS instead of React state/effects.

## Content Schema

Each block's content form is defined by a `FieldDef[]` array:

```typescript
interface FieldDef {
  key: string;           // Field name in content object
  label: string;         // Display label
  type: FieldType;       // text | textarea | color | url | image | list | boolean
  placeholder?: string;
  defaultValue: unknown;
  listFields?: FieldDef[];  // Sub-schema for list items
}
```

**Field Types:**
- `text` — single-line input
- `textarea` — multi-line input
- `color` — color picker
- `url` — URL input
- `image` — image upload (via ImageField component) or URL
- `list` — repeatable group (e.g., features list, testimonials)
- `boolean` — toggle switch

The `DynamicField` component renders the appropriate input for each field type. `ImageField` supports both file upload (via media API) and direct URL input.

## Template Presets

25+ pre-composed templates, each defining a block sequence + default branding:

```typescript
interface TemplatePreset {
  id: string;           // 'saas-starter', 'viral-waitlist'
  name: string;
  description: string;
  category: string;     // saas, waitlist, newsletter, agency, etc.
  blocks: Array<{ blockType: string; content: Record<string, unknown> }>;
  branding: Partial<TemplateBranding>;
  seo: { title: string; description: string };
}
```

**Available presets:** saas-starter, viral-waitlist, minimal-waitlist, gradient-waitlist, yc-waitlist, indie-hacker, newsletter, coming-soon, agency, ai-product, dev-tool, dark-mode-saas, glassmorphism-launch, startup-bold, mobile-app, marketplace, productivity-tool, community-launch, fintech-launch, ecommerce-teaser, and more.

## Template Selection Flow

### What happens when a user creates a new site:

1. **User visits `/dashboard/sites/new`** — 3-step wizard:
   - **Step 1:** Enter site name and slug
   - **Step 2:** Browse template grid, select a preset (or "Blank")
   - **Step 3:** Confirm and create

2. **Template grid** shows cards with category tabs (All, Waitlist, SaaS, etc.). Each card has an accent color, icon, name, description, and category badge.

3. **On "Create" click** → `POST /api/templates/{templateId}/claim`:
   - Server calls `buildPageDataFromPreset(templateId)` which:
     - Looks up the preset definition
     - Creates `BlockInstance` objects with `nanoid()` IDs
     - Merges preset content with registry defaults
     - Combines preset branding with user-provided name/colors
   - Creates `Site` record with `templateId` reference
   - Saves `PageData` to `site.templateContent` (branding) and `page.contentJson` (blocks)
   - Returns `{ siteId }`, client redirects to `/dashboard/sites/{siteId}/edit`

## Editor UI

The editor is a full-screen 3-panel layout:

### Left Panel — Block Picker
Lists all available block types grouped by category. Clicking a block adds it after the currently selected block (or at the end).

### Center Panel — Block Canvas
Live preview of the page. Features:
- **Drag-and-drop reordering** via `@dnd-kit/core` + `@dnd-kit/sortable`
- **Block selection** — click a block to select it, shows blue border
- **Block hover overlay** — move up/down, duplicate, delete buttons
- **Font loading** — dynamically injects Google Fonts `<link>` tags
- **Theme application** — `data-site-theme` attribute + CSS variables
- **Empty state** — "No blocks yet, add your first block" prompt

### Right Panel — Properties Editor
When a block is selected, shows:
1. **Content tab** — auto-generated form from block schema (`DynamicField` components)
2. **Style tab** — `StyleEditor` with 6 groups:
   - Colors (background, text, accent)
   - Background (image, overlay, gradient)
   - Layout (max width, columns, gap, padding)
   - Cards & Surfaces (border radius, shadow, border width, card style)
   - Typography (heading size, body size, text align)
   - Effects (animation, decorations)

When no block is selected, shows the **Branding Editor** (company name, tagline, colors, logo, fonts, theme).

### Toolbar
Top bar with: site name link, page selector dropdown, save status indicator, undo/redo, save button, publish button.

## Block Operations

The `useBlockOperations` hook manages all editor state:

| Operation | Description |
|-----------|-------------|
| `addBlock(blockType)` | Insert new block (after selected, or at end) |
| `deleteBlock(blockId)` | Remove block |
| `duplicateBlock(blockId)` | Clone block with new ID |
| `moveBlock(blockId, direction)` | Move up or down |
| `reorderBlocks(activeId, overId)` | Drag-and-drop reorder |
| `updateBlockContent(blockId, key, value)` | Edit content field |
| `updateBlockStyle(blockId, key, value)` | Edit design token |
| `updateBranding(key, value)` | Edit site branding |
| `handleUndo()` / `handleRedo()` | History navigation |
| `save()` | Persist to API |

### Auto-Save
Changes trigger a 2-second debounced save. The toolbar shows status: "Saving..." → "Saved" → "Error".

### Undo/Redo
- `useHistory` hook maintains a state stack (max 50 entries)
- Deep clones state on every mutation
- Keyboard shortcuts: `Ctrl+Z` (undo), `Ctrl+Y` (redo)

### Keyboard Shortcuts
- `Escape` — deselect block
- `Ctrl+S` — force save
- `Delete` — delete selected block

## Multi-Page Support

Sites can have multiple pages. The `Page` model has:
- `slug` — `null` for homepage, string for sub-pages
- `title` — page display name
- `contentJson` — blocks for this page
- Unique constraint: `@@unique([siteId, slug])`

Branding is shared across all pages (stored in `Site.templateContent`). Blocks are per-page (stored in `Page.contentJson`).

The **PageSelector** dropdown in the editor toolbar lets users:
- Switch between pages
- Create new sub-pages (plan-gated)
- Delete sub-pages (homepage cannot be deleted)

## Design Token Resolution

When rendering blocks, `resolveTokenClasses(styles)` converts token values to Tailwind classes:

```typescript
// Example: styles = { maxWidth: 'xl', columns: '3', borderRadius: 'lg', shadow: 'md' }
// Returns: { maxWidth: 'max-w-xl', columns: 'grid-cols-3', borderRadius: 'rounded-lg', shadow: 'shadow-md' }
```

`resolveBlockInlineStyles(block, branding)` generates inline styles for dynamic colors that can't be Tailwind classes (brand colors, gradients, background images).

Rule: **Tailwind classes for layout/spacing/typography. Inline styles ONLY for dynamic brand colors/gradients/images.**

## Font System

### Font Pairs
10 curated presets combining heading + body fonts:

```typescript
interface FontPair {
  id: string;
  label: string;
  heading: string;  // Google Font family for h1-h6
  body: string;     // Google Font family for body text
}
```

The `FontPairPicker` component shows a preset grid + custom font dropdowns (heading and body separately).

### CSS Enforcement
Heading font is applied via CSS rule to `h1-h6` elements. Body font is applied to the page wrapper `fontFamily` style. Both are loaded via Google Fonts `<link>` tags.

### Backward Compatibility
`resolveFonts(branding)` handles old data that stored a single `fontFamily` field instead of separate `headingFont` + `bodyFont`.

## Navigation Anchors

`block-anchors.ts` provides:
- `CATEGORY_ANCHOR_MAP` — maps block categories to semantic IDs (e.g., `features` → `features`, `pricing` → `pricing`)
- `resolveAnchorIds(blocks)` — generates unique anchor IDs for each block, deduplicating with `-2` suffix

Blocks get `id` attributes in both the editor canvas and published HTML. Nav links use `#features`, `#pricing`, etc. for smooth scrolling (`scroll-behavior: smooth; scroll-padding-top: 80px`).
