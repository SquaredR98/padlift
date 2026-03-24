/**
 * Google Fonts service.
 *
 * Fetches fonts from the Google Fonts API when GOOGLE_FONTS_API_KEY is set.
 * Falls back to a curated list of ~50 popular fonts when no key is available.
 */

export interface GoogleFont {
  family: string;
  category: string;
  variants: string[];
}

// ── Fallback: popular fonts when no API key ────────────────────
const POPULAR_FONTS: GoogleFont[] = [
  { family: 'Inter', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Roboto', category: 'sans-serif', variants: ['400', '500', '700'] },
  { family: 'Open Sans', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Lato', category: 'sans-serif', variants: ['400', '700'] },
  { family: 'Montserrat', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Poppins', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Raleway', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Nunito', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Work Sans', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'DM Sans', category: 'sans-serif', variants: ['400', '500', '700'] },
  { family: 'Plus Jakarta Sans', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Manrope', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Space Grotesk', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Outfit', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Sora', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Figtree', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Rubik', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Noto Sans', category: 'sans-serif', variants: ['400', '500', '700'] },
  { family: 'Source Sans 3', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Karla', category: 'sans-serif', variants: ['400', '500', '700'] },
  { family: 'Josefin Sans', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Cabin', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Barlow', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Mulish', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Lexend', category: 'sans-serif', variants: ['400', '500', '600', '700'] },
  { family: 'Playfair Display', category: 'serif', variants: ['400', '500', '600', '700'] },
  { family: 'Merriweather', category: 'serif', variants: ['400', '700'] },
  { family: 'Lora', category: 'serif', variants: ['400', '500', '600', '700'] },
  { family: 'Libre Baskerville', category: 'serif', variants: ['400', '700'] },
  { family: 'Crimson Pro', category: 'serif', variants: ['400', '500', '600', '700'] },
  { family: 'Source Serif 4', category: 'serif', variants: ['400', '500', '600', '700'] },
  { family: 'DM Serif Display', category: 'serif', variants: ['400'] },
  { family: 'Cormorant', category: 'serif', variants: ['400', '500', '600', '700'] },
  { family: 'Bitter', category: 'serif', variants: ['400', '500', '600', '700'] },
  { family: 'Noto Serif', category: 'serif', variants: ['400', '700'] },
  { family: 'JetBrains Mono', category: 'monospace', variants: ['400', '500', '600', '700'] },
  { family: 'Fira Code', category: 'monospace', variants: ['400', '500', '600', '700'] },
  { family: 'Source Code Pro', category: 'monospace', variants: ['400', '500', '600', '700'] },
  { family: 'Space Mono', category: 'monospace', variants: ['400', '700'] },
  { family: 'IBM Plex Mono', category: 'monospace', variants: ['400', '500', '600', '700'] },
  { family: 'Inconsolata', category: 'monospace', variants: ['400', '500', '600', '700'] },
  { family: 'Dancing Script', category: 'handwriting', variants: ['400', '500', '600', '700'] },
  { family: 'Pacifico', category: 'handwriting', variants: ['400'] },
  { family: 'Caveat', category: 'handwriting', variants: ['400', '500', '600', '700'] },
  { family: 'Satisfy', category: 'handwriting', variants: ['400'] },
  { family: 'Bebas Neue', category: 'display', variants: ['400'] },
  { family: 'Righteous', category: 'display', variants: ['400'] },
  { family: 'Fredoka', category: 'display', variants: ['400', '500', '600', '700'] },
  { family: 'Archivo Black', category: 'display', variants: ['400'] },
  { family: 'Anton', category: 'display', variants: ['400'] },
];

/**
 * Fetch fonts from Google Fonts API (with 24h server cache).
 * Falls back to curated list if no API key.
 */
export async function getGoogleFonts(): Promise<GoogleFont[]> {
  const apiKey = process.env.GOOGLE_FONTS_API_KEY;
  if (!apiKey) return POPULAR_FONTS;

  try {
    const res = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`,
      { next: { revalidate: 86400 } }, // 24h cache
    );
    if (!res.ok) return POPULAR_FONTS;

    const data = await res.json();
    const items = data.items as Array<{
      family: string;
      category: string;
      variants: string[];
    }>;

    return items.map((f) => ({
      family: f.family,
      category: f.category,
      variants: f.variants,
    }));
  } catch {
    return POPULAR_FONTS;
  }
}

/**
 * Search fonts by query and optional category filter.
 */
export async function searchFonts(
  query?: string,
  category?: string,
  limit = 50,
): Promise<GoogleFont[]> {
  const fonts = await getGoogleFonts();
  let filtered = fonts;

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter((f) => f.family.toLowerCase().includes(q));
  }

  if (category) {
    filtered = filtered.filter((f) => f.category === category);
  }

  return filtered.slice(0, limit);
}
