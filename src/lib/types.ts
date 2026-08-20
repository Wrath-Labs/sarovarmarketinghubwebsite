/* Shapes of the JSON content files. Everything optional-friendly so you can
   delete keys you don't need without breaking the build. */

export type CTA = { label: string; href: string; icon?: string };
export type NavLink = { label: string; href: string };
export type IconItem = { icon?: string; label?: string; text?: string; title?: string };

export type Theme = {
  colors: Record<string, string>;
  roles: Record<string, string>;
  fonts: { heading: string; body: string };
  typography: { headingWeight: number; headingLetterSpacing: string; bodyWeight: number };
  layout: {
    maxWidth: string;
    sectionPaddingY: string;
    radius: string;
    radiusSmall: string;
    radiusPill: string;
  };
  effects: {
    enableAnimations: boolean;
    enableGrainTexture: boolean;
    enableCursorGlow: boolean;
    enableScrollProgressBar: boolean;
    revealDuration: number;
    revealDistance: number;
    staggerDelay: number;
    shadowSoft: string;
    shadowCard: string;
  };
};

export type Site = {
  brand: {
    name: string;
    shortName: string;
    logoText: string;
    logoTextAccent: string;
    logoImage?: string;
    logoImageDark?: string;
    logoIcon?: string;
    tagline: string;
    foundedYear: string;
  };
  nav: { links: NavLink[]; cta: CTA; showCta: boolean };
  contactInfo: {
    email: string;
    emailSecondary?: string;
    phone: string;
    phoneLink: string;
    whatsapp: string;
    addressLine1: string;
    addressLine2: string;
    hours: string;
    responseTime: string;
    mapEmbedUrl: string;
    mapLink: string;
  };
  socials: { label: string; icon: string; href: string }[];
  announcementBar: { enabled: boolean; text: string; linkLabel: string; linkHref: string; icon?: string };
  footer: {
    about: string;
    newsletter: {
      enabled: boolean;
      heading: string;
      text: string;
      placeholder: string;
      buttonLabel: string;
      successMessage: string;
      note: string;
    };
    columns: { heading: string; links: NavLink[] }[];
    badges: { icon: string; label: string }[];
    copyright: string;
    legalLinks: NavLink[];
    credit: string;
  };
  floatingWhatsApp: { enabled: boolean; label: string; message: string };
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    description: string;
    keywords: string[];
    siteUrl: string;
    ogImage: string;
    twitterHandle: string;
    locale: string;
    themeColorMeta: string;
  };
};

export type SectionHeader = {
  eyebrow?: string;
  heading?: string;
  highlight?: string;
  subheading?: string;
  note?: string;
};

export type ServiceItem = {
  id: string;
  icon?: string;
  title: string;
  tagline?: string;
  description: string;
  image?: string;
  bullets?: string[];
  features?: string[];
  deliverables?: string[];
  idealFor?: string;
  priceFrom?: string;
  featured?: boolean;
};

export type WorkItem = {
  title: string;
  category: string;
  tags?: string[];
  image?: string;
  summary: string;
  results?: { value: string; label: string }[];
  link?: string;
  linkLabel?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number;
};

export type FaqItem = { question: string; answer: string };

export type ProcessStep = {
  number: string;
  icon?: string;
  title: string;
  duration?: string;
  description: string;
};

export type FormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | string;
  placeholder?: string;
  required?: boolean;
  width?: 'half' | 'full' | string;
  icon?: string;
  rows?: number;
  options?: string[];
};
