'use client';

import Reveal from '@/components/ui/Reveal';
import Icon from '@/components/ui/Icon';
import { contact, site } from '@/lib/content';

export default function MapEmbed() {
  const data = contact.map;
  if (!data?.enabled || !site.contactInfo.mapEmbedUrl) return null;

  return (
    <section className="bg-page pb-20 sm:pb-24">
      <div className="container-page">
        <Reveal className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-[clamp(1.4rem,3vw,2rem)] font-bold text-heading">{data.heading}</h2>
            <p className="mt-2 text-[0.9375rem] text-body">{data.subheading}</p>
          </div>
          <a
            href={site.contactInfo.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 rounded-pill border border-line bg-white px-4 py-2.5 text-[0.8125rem] font-bold text-heading transition-colors hover:border-primary hover:text-primary"
          >
            <Icon name="navigation" size={15} className="text-primary" />
            Get directions
            <Icon name="arrow-up-right" size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative overflow-hidden rounded-card border border-line bg-section shadow-card"
            style={{ height: `${data.height || 420}px` }}
          >
            <iframe
              title={data.heading || 'Our location'}
              src={site.contactInfo.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0 grayscale-[0.25] transition-all duration-700 hover:grayscale-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
