export interface FontPair {
  label: string;
  headingFont: string;
  bodyFont: string;
}

export const FONT_PAIRS: FontPair[] = [
  { label: 'Modern Clean', headingFont: 'Inter', bodyFont: 'Inter' },
  { label: 'Editorial', headingFont: 'Playfair Display', bodyFont: 'Inter' },
  { label: 'Startup', headingFont: 'Plus Jakarta Sans', bodyFont: 'Inter' },
  { label: 'Bold & Friendly', headingFont: 'Space Grotesk', bodyFont: 'DM Sans' },
  { label: 'Classic Serif', headingFont: 'Lora', bodyFont: 'Source Sans 3' },
  { label: 'Tech', headingFont: 'JetBrains Mono', bodyFont: 'Inter' },
  { label: 'Elegant', headingFont: 'Cormorant Garamond', bodyFont: 'Lato' },
  { label: 'Geometric', headingFont: 'Sora', bodyFont: 'Nunito Sans' },
  { label: 'Minimal', headingFont: 'Outfit', bodyFont: 'Work Sans' },
  { label: 'Professional', headingFont: 'Montserrat', bodyFont: 'Open Sans' },
];
