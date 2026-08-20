import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Turns "Deep Royal Purple" style hex + percentage into an rgba() string. */
export function hexToRgba(hex: string, alpha = 1) {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Splits a heading and wraps the words in `highlight` for gradient styling. */
export function splitHighlight(heading = '', highlight = '') {
  if (!highlight || !heading.includes(highlight)) return [{ text: heading, accent: false }];
  const [before, ...rest] = heading.split(highlight);
  return [
    { text: before, accent: false },
    { text: highlight, accent: true },
    { text: rest.join(highlight), accent: false },
  ].filter((part) => part.text !== '');
}

/** Google Fonts stylesheet URL for any font names set in theme.json. */
export function googleFontsHref(families: string[]) {
  const unique = Array.from(new Set(families.filter(Boolean)));
  const params = unique
    .map((f) => `family=${encodeURIComponent(f).replace(/%20/g, '+')}:wght@300;400;500;600;700;800`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}
