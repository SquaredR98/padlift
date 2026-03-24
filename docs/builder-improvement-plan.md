# Builder Improvement Plan

## Philosophy
Opinionated blocks with smart defaults. Users edit content fast, not fiddle with CSS.
The builder IS the product. If it feels clunky, nothing else matters.

---

## BUGS TO FIX (Broken Right Now)

### 1. Global Settings Disappear on Block Select
**Root cause**: When a block is selected, `PropsEditor` shows block properties instead of `BrandingEditor`. There is NO way to deselect a block and return to global settings.
- `BlockWrapper.tsx` calls `e.stopPropagation()` + `onSelect()` on click
- No toggle logic (clicking selected block doesn't deselect)
- No Escape key handler
- No "Global Settings" button in the panel

**Fix**:
- Add Escape key handler in `BlockEditor` → `setSelectedBlockId(null)`
- Toggle selection: clicking already-selected block deselects it
- Add a persistent "Site Settings" tab/button in the right panel header
- Clicking empty canvas area already works (just hard to reach when blocks fill the page)

### 2. Countdown Timer Blocks Don't Work
**Two blocks, both broken differently:**

**countdown-timer** (the worse one):
- Editor shows HARDCODED "14:08:42:19" — never calculates from `launchDate`
- Published site shows same hardcoded values forever
- `launchDate` field exists in schema but is completely ignored

**cta-countdown** (partially works):
- Editor preview WORKS — has `useState` + `setInterval` + `getTimeLeft()`
- Published site shows "--:--:--:--" forever — static SSR has no JS
- Need to inject client-side countdown script into published HTML

**Fix**:
- countdown-timer: Rewrite to use `getTimeLeft()` like cta-countdown
- Both static versions: Inject `<script>` with countdown logic + target date
- Render initial values at SSR time, hydrate with JS tick
- Add date picker field (currently just a text input for "YYYY-MM-DD")

---

## STORAGE LIMITS (No Quota System Exists)

**Current state**: 5MB per file limit. No per-user quota. Unlimited uploads.

**What to build**:

| Plan | Max File Size | Total Storage | Max Files |
|------|--------------|---------------|-----------|
| Free | 2 MB | 50 MB | 20 |
| Pro ($5) | 5 MB | 500 MB | 200 |
| Business ($12) | 10 MB | 5 GB | Unlimited |

**Implementation**:
- Add `storageUsed` field to Profile model (track cumulative bytes)
- Before upload: check `storageUsed + fileSize <= planLimit`
- On delete: decrement `storageUsed`
- Show storage usage bar in Media Library
- Plan constants in `packages/config`

**Also needed**:
- Client-side file size check before upload (not just server)
- Orphaned file cleanup: when user cascade-deletes, clean storage too
- SVG sanitization (SVGs can contain scripts — security risk)

---

## STYLE SYSTEM GAPS (Current vs. Needed)

### Currently Available (21 tokens)
Colors (3) + Background (2) + Layout (5) + Cards (4) + Typography (3) + Effects (3) + showDecorations

### What to Add for Launch

**High impact, low effort:**

1. **Background gradient** — 2-color linear gradient with direction picker
   - Add `backgroundGradient` token: `{ color1, color2, direction }`
   - Preset directions: to-right, to-bottom-right, to-bottom
   - Falls back to backgroundColor if not set

2. **Section spacing control** — individual top/bottom padding
   - Replace `paddingY` preset with `paddingTop` + `paddingBottom` sliders
   - Or add "Compact / Normal / Spacious / Extra" presets

3. **Letter spacing + line height** for headings
   - `letterSpacing`: tight / normal / wide
   - `lineHeight`: tight / normal / relaxed

4. **Text transform** — uppercase, lowercase, capitalize, normal
   - Especially useful for headings and badges

5. **More animation presets**
   - `bounce`, `blur-in`, `slide-left`, `slide-right`
   - Animation delay: none / short / medium / long

6. **Opacity control** — for background overlays and decorative elements
   - `backgroundOpacity`: 10% / 25% / 50% / 75% / 100%

**Post-launch:**
- Per-card color overrides
- Hover state editor
- Custom shadow colors
- Border style (dashed, dotted)
- Responsive token overrides per breakpoint

---

## BUILDER UX IMPROVEMENTS (Priority Order)

### 1. Undo/Redo (~1 day)
- State history stack (max 50 entries)
- Push snapshot on: add/remove/reorder/edit block, change branding
- Ctrl+Z / Ctrl+Y keyboard shortcuts
- Undo/Redo buttons in toolbar

### 2. Inline Text Editing (~2 days)
- `contentEditable` on heading, subtitle, paragraph elements in canvas
- `onBlur` → update block content in state
- Side panel stays for non-text fields (images, lists, URLs)
- Visual indicator: text gets a subtle blue outline on hover

### 3. Drag-and-Drop Block Reorder (~1.5 days)
- `@dnd-kit/sortable` on block list
- Drag handle on block toolbar (already has grip icon, just disabled)
- Drop indicator line between blocks
- Keep move up/down buttons as fallback

### 4. Mobile Preview (~0.5 day)
- Toggle in toolbar: Desktop / Tablet / Phone
- Canvas wraps in iframe or div with constrained width
- Desktop: 100%, Tablet: 768px, Phone: 375px
- No actual responsive editing — just preview

### 5. SEO Fields (~1 day)
- Add to BrandingEditor or separate "SEO" tab
- Fields: meta title, meta description, OG image (image upload)
- Store in Page model or Site.templateContent
- Inject into published HTML `<head>`

### 6. Icon Picker (~1 day)
- Replace emoji text inputs with Lucide icon picker
- Searchable modal with all ~1400 Lucide icons
- Store as icon name string (e.g., "zap", "shield", "rocket")
- Render with `<DynamicLucideIcon name={iconName} />`
- Keep emoji as fallback option

### 7. Block Variant Switching (~1 day)
- Group related blocks: features-grid, features-list, features-bento, etc.
- When a features block is selected, show variant switcher in toolbar
- Switching preserves content, changes layout
- Content fields that exist in both variants transfer, extras get defaults

### 8. Richer Block Content (~1.5 days)
- Feature cards: allow image OR icon (toggle in schema)
- Testimonial cards: optional photo field
- CTA blocks: secondary button option
- Add `image` field type to more schemas where it makes sense

---

## IMPLEMENTATION ORDER

**Phase 1 (Days 1-3): Critical Fixes**
- Fix global settings bug (Escape + toggle + tab)
- Fix countdown timers (both blocks + published site JS)
- Undo/Redo system

**Phase 2 (Days 4-6): Core UX**
- Inline text editing
- Drag-and-drop block reorder
- Mobile preview toggle

**Phase 3 (Days 7-9): Content & Polish**
- Icon picker (Lucide)
- SEO fields
- Block variant switching

**Phase 4 (Days 10-12): Style Expansion**
- Background gradients
- Section spacing (top/bottom padding)
- Letter spacing + line height + text transform
- More animation presets + opacity control

**Phase 5 (Days 13-14): Storage & Limits**
- Tenant storage quotas
- Client-side file validation
- SVG sanitization
- Storage usage UI

**Phase 6 (Days 15-17): Business Features**
- Gumroad billing integration
- Feature gating UI
- "Built with" badge

**Phase 7 (Days 18-20): Launch Prep**
- Landing page (dogfood the builder)
- Bug fixes from testing
- Final polish
