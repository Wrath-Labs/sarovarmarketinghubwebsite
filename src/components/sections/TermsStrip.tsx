'use client';

import Marquee from '@/components/ui/Marquee';
import Icon from '@/components/ui/Icon';
import { terms } from '@/lib/content';
import { cn } from '@/lib/utils';

type Alias = { label: string; region?: string };
type Item = { id: string; icon: string; name: string; aliases: Alias[] };

/** Sideways-scrolling strip of every service and the other names people search for it.
    Copy lives in content/terms.json. `variant` picks the hero or services-page wording. */
export default function TermsStrip({ variant = 'hero' }: { variant?: 'hero' | 'services' }) {
  const items: Item[] = terms.items || [];
  const copy = terms[variant];
  if (!items.length || !copy) return null;

  // Split into rows so each row carries a mix of services (not one service per row).
  const rowCount = Math.max(1, Math.min(copy.rows ?? 1, 3));
  const rows: Item[][] = Array.from({ length: rowCount }, () => []);
  items.forEach((it, i) => rows[i % rowCount].push(it));

  return (
    <section
      aria-label="Services and the other names they are known by"
      className={cn(
        'relative z-10 border-y border-line bg-section/60 py-8 sm:py-10',
        variant === 'hero' && '-mt-px',
      )}
    >
      <div className="container-page mb-6 text-center sm:mb-7">
        <p className="text-[0.75rem] font-bold tracking-[0.2em] text-primary uppercase">{copy.eyebrow}</p>
        {copy.heading && <h2 className="mt-2 text-[clamp(1.4rem,3.2vw,2rem)]">{copy.heading}</h2>}
      </div>

      <div className="flex flex-col gap-4">
        {rows.map((row, ri) => (
          <Marquee key={ri} reverse={ri % 2 === 1} speedSeconds={row.length * 22} className="py-1">
            {row.map((it) => (
              <div key={it.id} className="mr-10 flex shrink-0 items-center gap-2.5 sm:mr-14">
                <span className="inline-flex items-center gap-2 rounded-pill bg-linear-135 from-primary to-primary-dark py-2 pr-4 pl-2.5 text-[0.8125rem] font-bold text-white shadow-[0_10px_24px_-12px_var(--c-primary)]">
                  <Icon name={it.icon} size={15} />
                  {it.name}
                </span>
                <span aria-hidden className="text-primary/40">→</span>
                {it.aliases.map((a) => (
                  <span
                    key={a.label}
                    className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-white px-3.5 py-1.5 text-[0.8125rem] font-semibold whitespace-nowrap text-heading/75"
                  >
                    {a.label}
                    {a.region === 'in' && (
                      <span className="rounded-sm bg-primary/10 px-1 text-[0.5625rem] font-bold tracking-wider text-primary">IN</span>
                    )}
                  </span>
                ))}
              </div>
            ))}
          </Marquee>
        ))}
      </div>

      <p className="container-page mt-5 text-center text-[0.6875rem] text-body/70">
        <span className="mr-1 rounded-sm bg-primary/10 px-1 text-[0.5625rem] font-bold tracking-wider text-primary">IN</span>
        = a name commonly used in India
      </p>
    </section>
  );
}
