import Link from 'next/link';
import Button from '@/components/ui/Button';
import { site } from '@/lib/content';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-page">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/4 size-[30rem] rounded-full bg-primary/15 blur-[120px]" />
      </div>

      <div className="container-page flex flex-col items-center text-center">
        <p className="font-heading text-[clamp(5rem,18vw,11rem)] leading-none font-bold text-gradient">404</p>
        <h1 className="mt-4 text-[clamp(1.6rem,4vw,2.5rem)]">This page took a different route</h1>
        <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-body">
          The link is broken or the page has moved. Head back home, or tell us what you were looking for.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <Button href="/" label="Back to home" icon="arrow-left" iconPosition="left" size="lg" />
          <Button href="/contact" label="Contact us" icon="arrow-right" variant="secondary" size="lg" />
        </div>
        <p className="mt-8 text-[0.8125rem] text-body/70">
          Or email us at{' '}
          <Link href={`mailto:${site.contactInfo.email}`} className="font-semibold text-primary hover:underline">
            {site.contactInfo.email}
          </Link>
        </p>
      </div>
    </section>
  );
}
