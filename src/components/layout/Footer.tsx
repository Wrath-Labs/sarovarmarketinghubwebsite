'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './Logo';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/lib/content';

export default function Footer() {
  const { footer, socials, contactInfo, brand } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      {/* glow decor */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/4 size-[34rem] rounded-full bg-primary/22 blur-[130px]" />
        <div className="absolute -bottom-52 right-0 size-[28rem] rounded-full bg-primary-dark/45 blur-[130px]" />
      </div>

      <div className="container-page pt-20 pb-24 sm:pt-24 sm:pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2.15fr]">
          {/* brand */}
          <Reveal className="flex flex-col gap-7">
            <Logo tone="dark" />
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-white/60">{footer.about}</p>

            {/* Newsletter signup hidden for now. Restore by uncommenting (content stays in site.json → footer.newsletter).
            {footer.newsletter?.enabled && (
              <div className="max-w-md rounded-card border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                <h3 className="font-heading text-lg text-white">{footer.newsletter.heading}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-white/55">{footer.newsletter.text}</p>

                {subscribed ? (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 flex items-center gap-2 text-[0.875rem] font-semibold text-emerald-300"
                  >
                    <Icon name="check-check" size={17} />
                    {footer.newsletter.successMessage}
                  </motion.p>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (email.trim()) setSubscribed(true);
                    }}
                    className="mt-5 flex flex-col gap-2.5 sm:flex-row"
                  >
                    <label className="sr-only" htmlFor="footer-newsletter">
                      Email address
                    </label>
                    <input
                      id="footer-newsletter"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={footer.newsletter.placeholder}
                      className="min-w-0 flex-1 rounded-pill border border-white/15 bg-white/[0.06] px-5 py-3 text-sm text-white placeholder:text-white/35 transition focus:border-white/40 focus:bg-white/10 focus:outline-none"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="rounded-pill bg-white px-6 py-3 text-sm font-bold text-primary transition hover:bg-white/90"
                    >
                      {footer.newsletter.buttonLabel}
                    </motion.button>
                  </form>
                )}
                <p className="mt-3 text-[0.6875rem] text-white/35">{footer.newsletter.note}</p>
              </div>
            )}
            */}
          </Reveal>

          {/* link columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.45fr]">
            {footer.columns.map((col, ci) => (
              <Reveal key={col.heading} delay={0.06 * ci} className="flex flex-col gap-4">
                <h4 className="font-heading text-[0.75rem] font-bold tracking-[0.18em] text-white/45 uppercase">
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label + link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-white/65 transition-colors hover:text-white"
                      >
                        <span className="h-px w-0 bg-white transition-all duration-300 group-hover:w-3" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}

            <Reveal delay={0.24} className="flex flex-col gap-4">
              <h4 className="font-heading text-[0.75rem] font-bold tracking-[0.18em] text-white/45 uppercase">
                Get in touch
              </h4>
              <ul className="flex flex-col gap-3.5 text-[0.9375rem]">
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="group flex items-start gap-2.5 text-white/65 transition hover:text-white"
                  >
                    <Icon name="mail" size={16} className="mt-0.5 text-primary" />
                    <span className="break-all">{contactInfo.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${contactInfo.phoneLink}`}
                    className="group flex items-start gap-2.5 text-white/65 transition hover:text-white"
                  >
                    <Icon name="phone" size={16} className="mt-0.5 text-primary" />
                    {contactInfo.phone}
                  </a>
                </li>
                {/* No physical office or map link — operating remotely. Opening hours removed (unverified).
                <li>
                  <a href={contactInfo.mapLink} ...>…</a>
                </li>
                <li>{contactInfo.hours}</li> */}
                <li className="flex items-start gap-2.5 text-white/65">
                  <Icon name="map-pin" size={16} className="mt-0.5 text-primary" />
                  <span>
                    {contactInfo.addressLine1}
                    <br />
                    {contactInfo.addressLine2}
                  </span>
                </li>
              </ul>

            </Reveal>
          </div>
        </div>

        {/* badges */}
        <Reveal className="mt-16 flex flex-col gap-6 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {footer.badges?.map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-2 rounded-pill border border-white/12 bg-white/[0.04] px-4 py-2 text-[0.8125rem] font-medium text-white/65"
              >
                <Icon name={b.icon} size={15} className="text-emerald-300" />
                {b.label}
              </span>
            ))}
          </div>

          {socials.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -3, scale: 1.06 }}
                className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/[0.05] text-white/70 transition-colors hover:border-white/40 hover:bg-primary hover:text-white"
              >
                <Icon name={s.icon} size={16} />
              </motion.a>
            ))}
          </div>
          )}
        </Reveal>

        {/* giant wordmark */}
        <div aria-hidden className="mt-14 overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-[clamp(2.4rem,11vw,9rem)] leading-none font-bold tracking-[-0.05em] text-transparent"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.12)' }}
          >
            {brand.name}
          </motion.p>
        </div>

        {/* bottom bar */}
        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-5 border-t border-white/8 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-[0.8125rem] text-white/40">
            © {year} {footer.copyright} <span className="mx-1.5 hidden sm:inline">·</span>
            <br />
            <span className="text-white/30">
              Developed by{' '}
              <a
                href="https://wrathlabs.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white/55 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white"
              >
                Wrath Labs
              </a>{' '}
              2026
            </span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {/* Privacy Policy / Terms pages are not live yet. Restore this block (links in site.json → _disabled.footer_legalLinks) once they exist.
            {footer.legalLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[0.8125rem] text-white/45 transition hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            */}
            <a
              href="#top"
              className="group inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-white/60 transition hover:text-white"
            >
              Back to top
              <Icon name="arrow-up" size={14} className="transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
