import type { Metadata } from 'next';

import PageHero from '@/components/sections/PageHero';
import AboutDetail from '@/components/sections/AboutDetail';

import { aboutPage } from '@/lib/content';

export const metadata: Metadata = {
  title: aboutPage.meta?.title,
  description: aboutPage.meta?.description,
};

export default function AboutPage() {
  const hero = aboutPage.hero;

  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow={hero?.eyebrow}
        heading={hero?.heading}
        highlight={hero?.highlight}
      />
      <AboutDetail />
    </>
  );
}
