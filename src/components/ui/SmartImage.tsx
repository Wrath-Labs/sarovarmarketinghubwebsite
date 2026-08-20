import NextImage from 'next/image';
import { cn } from '@/lib/utils';

/** Accepts a local path (/images/…) or any full URL pasted into the JSON. */
export default function SmartImage({
  src,
  alt,
  className,
  width = 1200,
  height = 900,
  priority,
  sizes = '100vw',
  fill,
}: {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}) {
  if (!src) return null;
  const isSvg = src.endsWith('.svg');

  if (fill) {
    return (
      <NextImage
        src={src}
        alt={alt || ''}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={isSvg}
        className={cn('object-cover', className)}
      />
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt || ''}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      unoptimized={isSvg}
      className={className}
    />
  );
}
