import type { Metadata, Viewport } from 'next';
import './globals.css';

import ThemeVars from '@/components/layout/ThemeVars';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import CursorGlow from '@/components/layout/CursorGlow';
import WhatsAppFab from '@/components/layout/WhatsAppFab';

import { site, theme } from '@/lib/content';
import { googleFontsHref } from '@/lib/utils';
import { cn } from '@/lib/utils';

const { seo, brand } = site;

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.defaultTitle,
    template: seo.titleTemplate,
  },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: brand.name,
  authors: [{ name: brand.name }],
  creator: brand.name,
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: seo.locale,
    url: seo.siteUrl,
    siteName: brand.name,
    title: seo.defaultTitle,
    description: seo.description,
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: brand.name }],
  },
  twitter: {
    card: 'summary_large_image',
    site: seo.twitterHandle,
    title: seo.defaultTitle,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: seo.themeColorMeta,
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MarketingAgency',
  name: brand.name,
  description: seo.description,
  url: seo.siteUrl,
  email: site.contactInfo.email,
  telephone: site.contactInfo.phone,
  foundingDate: brand.foundedYear,
  slogan: brand.tagline,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.contactInfo.addressLine1,
    addressLocality: site.contactInfo.addressLine2,
  },
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontsHref = googleFontsHref([theme.fonts.heading, theme.fonts.body]);

  return (
    <html lang="en" id="top">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={fontsHref} />
        <ThemeVars />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={cn('relative min-h-screen antialiased', theme.effects.enableGrainTexture && 'grain')}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99] focus:rounded-pill focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>

        {theme.effects.enableScrollProgressBar && <ScrollProgress />}
        {theme.effects.enableCursorGlow && <CursorGlow />}

        <Navbar />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
