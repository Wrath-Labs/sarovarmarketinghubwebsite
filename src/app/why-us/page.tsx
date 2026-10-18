import type { Metadata } from 'next';

import PageHero from '@/components/sections/PageHero';
import WhyUsDetail from '@/components/sections/WhyUsDetail';

import { whyUsPage } from '@/lib/content';

export const metadata: Metadata = {
  title: whyUsPage.meta?.title,
  description: whyUsPage.meta?.description,
};

export default function WhyUsPage() {
  const hero = whyUsPage.hero;

  return (
    <>
      <PageHero
        breadcrumb="Why Us"
        eyebrow={hero?.eyebrow}
        heading={hero?.heading}
        highlight={hero?.highlight}
        subheading={hero?.subheading}
      />
      <WhyUsDetail />
    </>
  );
}
