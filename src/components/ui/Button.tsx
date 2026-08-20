'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Icon from './Icon';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outlineLight';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  href?: string;
  label: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
  external?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white shadow-[0_14px_34px_-12px_var(--c-primary)] hover:shadow-[0_20px_44px_-12px_var(--c-primary)]',
  secondary:
    'bg-white text-heading border border-line hover:border-primary/40 hover:text-primary shadow-[0_2px_10px_-4px_rgba(28,28,28,.08)]',
  ghost: 'bg-primary/8 text-primary hover:bg-primary/14',
  light: 'bg-white text-primary hover:bg-white/90 shadow-[0_14px_34px_-14px_rgba(0,0,0,.45)]',
  outlineLight: 'border border-white/30 text-white hover:bg-white/10 hover:border-white/60',
};

const sizes: Record<Size, string> = {
  sm: 'text-[0.8125rem] px-4 py-2.5 gap-1.5',
  md: 'text-sm px-5 py-3 gap-2 sm:px-6 sm:py-3.5',
  lg: 'text-[0.9375rem] px-6 py-3.5 gap-2.5 sm:px-8 sm:py-4',
};

export default function Button({
  href,
  label,
  icon,
  iconPosition = 'right',
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  type = 'button',
  disabled,
  fullWidth,
  external,
}: Props) {
  const reduced = useReducedMotion();

  const classes = cn(
    'group relative inline-flex items-center justify-center overflow-hidden rounded-pill font-semibold',
    'transition-[color,background-color,border-color,box-shadow] duration-300 ease-out',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  );

  const inner = (
    <>
      {/* sheen sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      {icon && iconPosition === 'left' && (
        <Icon name={icon} size={17} className="relative transition-transform duration-300 group-hover:-translate-x-0.5" />
      )}
      <span className="relative whitespace-nowrap">{label}</span>
      {icon && iconPosition === 'right' && (
        <Icon name={icon} size={17} className="relative transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  const hover = reduced ? {} : { scale: 1.03, y: -2 };
  const tap = reduced ? {} : { scale: 0.98 };

  if (href) {
    const isHash = href.startsWith('#');
    const isExternal = external || /^https?:|^mailto:|^tel:/.test(href);

    if (isExternal) {
      return (
        <motion.a
          href={href}
          target={/^https?:/.test(href) ? '_blank' : undefined}
          rel={/^https?:/.test(href) ? 'noopener noreferrer' : undefined}
          className={classes}
          whileHover={hover}
          whileTap={tap}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
        >
          {inner}
        </motion.a>
      );
    }

    return (
      <motion.div
        className={cn('inline-flex', fullWidth && 'w-full')}
        whileHover={hover}
        whileTap={tap}
        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      >
        <Link href={href} scroll={!isHash} className={classes}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={disabled ? {} : hover}
      whileTap={disabled ? {} : tap}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
    >
      {inner}
    </motion.button>
  );
}
