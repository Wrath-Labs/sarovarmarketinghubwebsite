import { notFound } from 'next/navigation';

/* Contact page disabled — contact now lives in the landing page's #contact section.
   Original implementation kept below; remove the stub and uncomment to restore.

import type { Metadata } from 'next';

import PageHero from '@/components/sections/PageHero';
import ContactForm from '@/components/sections/ContactForm';
import ContactSidebar from '@/components/sections/ContactSidebar';
import CallBooking from '@/components/sections/CallBooking';
import MapEmbed from '@/components/sections/MapEmbed';
import Faq from '@/components/sections/Faq';
import CtaBanner from '@/components/sections/CtaBanner';

import { contact } from '@/lib/content';

export const metadata: Metadata = {
  title: contact.meta?.title,
  description: contact.meta?.description,
};

export default function ContactPage() {
  const hero = contact.hero;

  return (
    <>
      <PageHero
        breadcrumb="Contact"
        eyebrow={hero?.eyebrow}
        heading={hero?.heading}
        highlight={hero?.highlight}
        subheading={hero?.subheading}
        badges={hero?.badges}
      />

      <section className="overflow-hidden bg-page pb-20 sm:pb-24">
        <div className="container-page grid items-start gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:gap-10">
          <div className="min-w-0">
            <ContactForm />
          </div>
          <div className="min-w-0">
            <ContactSidebar />
          </div>
        </div>
      </section>

      <CallBooking />
      <MapEmbed />
      <Faq data={contact.faq} tone="section" />
      <CtaBanner data={contact.cta} />
    </>
  );
}

*/

export default function ContactPage() {
  notFound();
}
