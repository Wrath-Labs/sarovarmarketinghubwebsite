/* ------------------------------------------------------------------
   Single place the whole site reads its content from.
   Want to change a word, a price, an image or a colour?  Edit the JSON
   in /content — nothing in /src needs to be touched.
------------------------------------------------------------------- */
import siteJson from '@content/site.json';
import themeJson from '@content/theme.json';
import homeJson from '@content/home.json';
import servicesJson from '@content/services.json';
import whyUsJson from '@content/whyus.json';
import contactJson from '@content/contact.json';

import type { Site, Theme } from './types';

export const site = siteJson as unknown as Site;
export const theme = themeJson as unknown as Theme;
export const home = homeJson as unknown as Record<string, any>;
export const services = servicesJson as unknown as Record<string, any>;
export const whyUsPage = whyUsJson as unknown as Record<string, any>;
export const contact = contactJson as unknown as Record<string, any>;

/** Resolves a theme role (e.g. "primary") to the hex value in theme.colors. */
export function roleColor(role: string, fallback = '#5511ED') {
  const key = theme.roles?.[role];
  return (key && theme.colors?.[key]) || theme.colors?.[role] || fallback;
}

export const palette = {
  primary: roleColor('primary'),
  primaryDark: roleColor('primaryDark', '#2B0080'),
  page: roleColor('pageBackground', '#FFFFFF'),
  section: roleColor('sectionBackground', '#F5F2FC'),
  dark: roleColor('darkBackground', '#1C1C1C'),
  heading: roleColor('heading', '#1C1C1C'),
  body: roleColor('body', '#6B6580'),
  border: roleColor('border', '#E6E0F5'),
  accent: roleColor('accent', '#8C6BFF'),
};

/** The CSS custom properties consumed by globals.css / Tailwind tokens. */
export function themeCssVariables() {
  const { layout, effects, fonts, typography } = theme;
  return {
    '--c-primary': palette.primary,
    '--c-primary-dark': palette.primaryDark,
    '--c-page': palette.page,
    '--c-section': palette.section,
    '--c-dark': palette.dark,
    '--c-heading': palette.heading,
    '--c-body': palette.body,
    '--c-border': palette.border,
    '--c-accent': palette.accent,
    '--f-heading': `"${fonts.heading}", ui-sans-serif, system-ui, sans-serif`,
    '--f-body': `"${fonts.body}", ui-sans-serif, system-ui, sans-serif`,
    '--t-heading-weight': String(typography?.headingWeight ?? 700),
    '--t-heading-tracking': typography?.headingLetterSpacing ?? '-0.03em',
    '--t-body-weight': String(typography?.bodyWeight ?? 400),
    '--l-max-width': layout.maxWidth,
    '--l-section-y': layout.sectionPaddingY,
    '--r-card': layout.radius,
    '--r-soft': layout.radiusSmall,
    '--r-pill': layout.radiusPill,
    '--e-shadow-soft': effects.shadowSoft,
    '--e-shadow-card': effects.shadowCard,
  } as Record<string, string>;
}

export const motionConfig = {
  enabled: theme.effects?.enableAnimations !== false,
  duration: theme.effects?.revealDuration ?? 0.7,
  distance: theme.effects?.revealDistance ?? 28,
  stagger: theme.effects?.staggerDelay ?? 0.09,
};
