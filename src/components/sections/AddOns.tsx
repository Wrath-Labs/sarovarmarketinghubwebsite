'use client';

import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Icon from '@/components/ui/Icon';
import { Stagger, StaggerItem } from '@/components/ui/Stagger';
import { services } from '@/lib/content';

export default function AddOns() {
  const data = services.addOns;
  if (!data?.enabled || !data.items?.length) return null;

  return (
    <Section tone="page" compact>
      <SectionHeading heading={data.heading} subheading={data.subheading} eyebrow="Extras" icon="plus" />

      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {data.items.map((item: any) => (
          <StaggerItem key={item.title} className="h-full">
            <div className="group flex h-full flex-col rounded-card border border-line bg-white p-6 transition-all duration-400 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-card">
              <span className="grid size-11 place-items-center rounded-[0.85rem] bg-primary/8 text-primary transition-colors duration-400 group-hover:bg-primary group-hover:text-white">
                <Icon name={item.icon} size={20} />
              </span>
              <h3 className="mt-5 font-heading text-[1.0625rem] font-bold text-heading">{item.title}</h3>
              <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-body">{item.text}</p>
              <p className="mt-5 font-heading text-[0.9375rem] font-bold text-primary">{item.price}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
