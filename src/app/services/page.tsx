import type { Metadata } from 'next';

import PageHero from '@/components/sections/PageHero';
import ServicesDetail from '@/components/sections/ServicesDetail';
import Process from '@/components/sections/Process';
import Packages from '@/components/sections/Packages';
import AddOns from '@/components/sections/AddOns';
import Faq from '@/components/sections/Faq';
import CtaBanner from '@/components/sections/CtaBanner';
import LogoCloud from '@/components/sections/LogoCloud';

import { services } from '@/lib/content';

export const metadata: Metadata = {
  title: services.meta?.title,
  description: services.meta?.description,
};

export default function ServicesPage() {
  const hero = services.hero;

  return (
    <>
      <PageHero
        breadcrumb="Services"
        eyebrow={hero?.eyebrow}
        heading={hero?.heading}
        highlight={hero?.highlight}
        subheading={hero?.subheading}
        primaryCta={hero?.primaryCta}
        secondaryCta={hero?.secondaryCta}
        badges={hero?.badges}
      />
      <LogoCloud />
      <ServicesDetail />
      <Process data={services.process} />
      <Packages />
      <AddOns />
      <Faq data={services.faq} tone="section" />
      <CtaBanner data={services.cta} />
    </>
  );
}
