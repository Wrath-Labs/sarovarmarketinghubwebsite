'use client';

import Marquee from '@/components/ui/Marquee';
import Reveal from '@/components/ui/Reveal';
import SmartImage from '@/components/ui/SmartImage';
import { home } from '@/lib/content';

export default function LogoCloud() {
  const data = home.logos;
  if (!data?.enabled || !data.items?.length) return null;

  return (
    <section className="relative border-y border-line bg-section py-12 sm:py-16">
      <div className="container-page">
        <Reveal>
          <p className="text-center text-[0.6875rem] font-bold tracking-[0.24em] text-body/60 uppercase">
            {data.heading}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-9">
        <Marquee speedSeconds={data.speedSeconds || 28}>
          {data.items.map((logo: any, i: number) => (
            <div
              key={logo.name + i}
              className="flex shrink-0 items-center justify-center px-7 opacity-40 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 sm:px-11"
            >
              <SmartImage
                src={logo.image}
                alt={logo.name}
                width={220}
                height={40}
                className="h-6 w-auto sm:h-7"
              />
            </div>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
