import type { Metadata } from 'next';

import Hero from '@/components/sections/Hero';
// import LogoCloud from '@/components/sections/LogoCloud';
import ServicesPreview from '@/components/sections/ServicesPreview';
// import About from '@/components/sections/About';
import WhyUs from '@/components/sections/WhyUs';
// import Stats from '@/components/sections/Stats';
// import Work from '@/components/sections/Work';
// import Process from '@/components/sections/Process';
// Testimonials disabled: no real client testimonials yet.
// import Testimonials from '@/components/sections/Testimonials';
// import Faq from '@/components/sections/Faq';
import ContactCta from '@/components/sections/ContactCta';

import { home, site } from '@/lib/content';

export const metadata: Metadata = {
  // Next only applies seo.titleTemplate to child routes, so compose it here too.
  title: site.seo.titleTemplate.replace('%s', home.meta?.title || ''),
  description: home.meta?.description,
};

/* The order of sections comes from content/home.json → sectionOrder.
   Reorder or delete entries there to restructure the page. */
const registry: Record<string, () => React.ReactNode> = {
  hero: () => <Hero />,
  // logos: () => <LogoCloud />,
  services: () => <ServicesPreview />,
  // about: () => <About />,
  whyUs: () => <WhyUs />,
  // stats: () => <Stats />,
  // work: () => <Work />,
  // process: () => <Process />,
  // testimonials: () => <Testimonials />,
  // faq: () => <Faq />,
  contact: () => <ContactCta />,
};

export default function HomePage() {
  const order: string[] = home.sectionOrder?.length ? home.sectionOrder : Object.keys(registry);

  return (
    <>
      {order.map((key) => {
        const render = registry[key];
        if (!render) return null;
        return <div key={key}>{render()}</div>;
      })}
    </>
  );
}
