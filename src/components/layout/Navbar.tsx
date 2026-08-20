'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Logo from './Logo';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { site } from '@/lib/content';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { nav, brand, announcementBar, contactInfo, socials } = site;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      {announcementBar?.enabled && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-[65] overflow-hidden bg-linear-135 from-primary-dark via-primary to-primary text-white"
        >
          <div className="container-page flex items-center justify-center gap-2 py-2 text-center text-[0.75rem] font-medium sm:text-[0.8125rem]">
            <Icon name={announcementBar.icon} size={14} className="hidden sm:block" />
            <span className="opacity-90">{announcementBar.text}</span>
            {announcementBar.linkLabel && (
              <Link
                href={announcementBar.linkHref}
                className="group inline-flex items-center gap-1 font-bold underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
              >
                {announcementBar.linkLabel}
                <Icon name="arrow-right" size={13} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </motion.div>
      )}

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'sticky top-0 z-[64] transition-[background-color,box-shadow,backdrop-filter,padding] duration-400',
          scrolled
            ? 'bg-page/80 py-2.5 shadow-[0_10px_40px_-24px_rgba(28,28,28,.35)] backdrop-blur-xl'
            : 'bg-transparent py-4',
        )}
      >
        <div className="container-page flex items-center justify-between gap-6">
          <Logo />

          {/* desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.links.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={cn(
                  'group relative rounded-pill px-4 py-2.5 text-[0.875rem] font-semibold transition-colors duration-300',
                  isActive(link.href) ? 'text-primary' : 'text-heading/75 hover:text-primary',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-primary transition-transform duration-400 ease-out',
                    isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {nav.showCta && (
              <Button
                href={nav.cta.href}
                label={nav.cta.label}
                icon="arrow-right"
                size="sm"
                className="hidden md:inline-flex"
              />
            )}

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              // While the drawer is open it sits underneath it — hand focus and
              // screen readers over to the drawer's own close button.
              aria-hidden={open}
              tabIndex={open ? -1 : 0}
              className="relative grid size-11 place-items-center rounded-[0.9rem] border border-line bg-white/70 text-heading backdrop-blur transition-colors hover:border-primary/40 hover:text-primary lg:hidden"
            >
              <span className="flex flex-col items-center justify-center gap-[5px]">
                <motion.span
                  animate={open ? { rotate: 45, y: 6.5, width: 20 } : { rotate: 0, y: 0, width: 20 }}
                  transition={{ duration: 0.3 }}
                  className="block h-[2px] rounded bg-current"
                />
                <motion.span
                  animate={open ? { opacity: 0, width: 0 } : { opacity: 1, width: 14 }}
                  transition={{ duration: 0.25 }}
                  className="block h-[2px] self-end rounded bg-current"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -6.5, width: 20 } : { rotate: 0, y: 0, width: 20 }}
                  transition={{ duration: 0.3 }}
                  className="block h-[2px] rounded bg-current"
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[66] bg-ink/45 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              id="mobile-menu"
              aria-label="Mobile navigation"
              className="fixed inset-y-0 right-0 z-[67] flex w-[min(21rem,88vw)] flex-col overflow-y-auto bg-page px-6 pb-8 pt-6 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-full bg-section text-heading transition hover:bg-primary hover:text-white"
                >
                  <Icon name="x" size={19} />
                </button>
              </div>

              <nav className="mt-9 flex flex-col gap-1.5">
                {nav.links.map((link, i) => (
                  <motion.div
                    key={link.href + link.label}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center justify-between rounded-soft px-4 py-3.5 font-heading text-[1.0625rem] font-semibold transition-colors',
                        isActive(link.href)
                          ? 'bg-primary/8 text-primary'
                          : 'text-heading hover:bg-section hover:text-primary',
                      )}
                    >
                      {link.label}
                      <Icon name="arrow-up-right" size={16} className="opacity-40" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.45 }}
                className="mt-8 flex flex-col gap-4 border-t border-line pt-7"
              >
                <Button href={nav.cta.href} label={nav.cta.label} icon="arrow-right" fullWidth />

                <div className="flex flex-col gap-2.5 text-sm">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-2.5 text-body transition hover:text-primary"
                  >
                    <Icon name="mail" size={16} className="text-primary" />
                    {contactInfo.email}
                  </a>
                  <a
                    href={`tel:${contactInfo.phoneLink}`}
                    className="flex items-center gap-2.5 text-body transition hover:text-primary"
                  >
                    <Icon name="phone" size={16} className="text-primary" />
                    {contactInfo.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid size-9 place-items-center rounded-full bg-section text-heading/70 transition hover:bg-primary hover:text-white"
                    >
                      <Icon name={s.icon} size={16} />
                    </a>
                  ))}
                </div>

                <p className="pt-2 text-xs text-body/70">{brand.tagline}</p>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
