import { cn } from '@/lib/utils';

/** Pulsing brand mark with an orbiting dot. Pure CSS, so it paints before any JS. */
export function BrandSpinner({ className, label = 'Loading' }: { className?: string; label?: string }) {
  return (
    <div role="status" aria-live="polite" className={cn('flex flex-col items-center gap-5', className)}>
      <div className="relative grid size-20 place-items-center">
        <span aria-hidden className="absolute inset-0 rounded-full border-2 border-primary/15" />
        <span aria-hidden className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
        <span aria-hidden className="absolute inset-3 animate-pulse-ring rounded-full bg-primary/20" />
        <span aria-hidden className="relative size-7 animate-pulse rounded-[0.6rem] bg-linear-135 from-primary to-primary-dark" />
      </div>
      <p className="text-[0.75rem] font-bold tracking-[0.22em] text-primary/70 uppercase">{label}</p>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'animate-shimmer rounded-soft bg-[linear-gradient(110deg,var(--c-section)_30%,color-mix(in_oklab,var(--c-primary)_10%,var(--c-section))_50%,var(--c-section)_70%)] bg-[length:200%_100%]',
        className,
      )}
    />
  );
}

/** Page-shaped placeholder shown while a route streams in. */
export function PageSkeleton({ cards = 0 }: { cards?: number }) {
  return (
    <div className="container-page py-16 sm:py-24" role="status" aria-label="Loading page">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <Skeleton className="h-7 w-36 rounded-pill" />
        <Skeleton className="h-12 w-full max-w-xl" />
        <Skeleton className="h-12 w-2/3" />
        <Skeleton className="mt-2 h-5 w-full max-w-lg" />
        <Skeleton className="h-5 w-4/5 max-w-md" />
        <div className="mt-4 flex gap-3">
          <Skeleton className="h-12 w-44 rounded-pill" />
          <Skeleton className="h-12 w-36 rounded-pill" />
        </div>
      </div>
      {cards > 0 && (
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: cards }).map((_, i) => (
            <Skeleton key={i} className="h-56 rounded-card" />
          ))}
        </div>
      )}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
