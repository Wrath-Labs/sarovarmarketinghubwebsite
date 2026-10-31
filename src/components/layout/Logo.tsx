import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import SmartImage from '@/components/ui/SmartImage';
import { site } from '@/lib/content';
import { cn } from '@/lib/utils';

/** Mark: brand.logoImage from site.json when set (else a generated icon tile), beside the text wordmark. */
export default function Logo({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const { brand } = site;
  const image = tone === 'dark' ? brand.logoImageDark || brand.logoImage : brand.logoImage;
  const dark = tone === 'dark';

  return (
    <Link href="/" aria-label={brand.name} className={cn('group inline-flex items-center gap-2.5', className)}>
      {image ? (
        <span className="relative size-10 shrink-0 overflow-hidden rounded-[0.9rem] shadow-[0_10px_24px_-10px_var(--c-primary)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 sm:size-11">
          <SmartImage src={image} alt="" width={88} height={88} priority sizes="44px" className="size-full object-cover" />
        </span>
      ) : (
        <span className="relative grid size-10 place-items-center overflow-hidden rounded-[0.9rem] bg-linear-135 from-primary to-primary-dark text-white shadow-[0_10px_24px_-10px_var(--c-primary)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-6">
          <Icon name={brand.logoIcon || 'waves'} size={21} strokeWidth={2.2} />
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
        </span>
      )}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-heading text-[1.0625rem] font-bold tracking-[-0.02em] sm:text-lg',
            dark ? 'text-white' : 'text-heading',
          )}
        >
          {brand.logoText}
        </span>
        <span
          className={cn(
            'mt-0.5 text-[0.625rem] font-semibold tracking-[0.2em] uppercase',
            dark ? 'text-white/55' : 'text-primary/70',
          )}
        >
          {brand.logoTextAccent}
        </span>
      </span>
    </Link>
  );
}
