import type { Metadata } from 'next';

import PageHero from '@/components/sections/PageHero';
import About from '@/components/sections/About';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet the senior team behind Sarovar Marketing Hub — a full-funnel growth partner for ambitious brands.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow="About us"
        heading="The team behind your growth"
        highlight="your growth"
        subheading="Senior operators, honest reporting and one accountable team across every channel."
      />
      <About />
    </>
  );
}
