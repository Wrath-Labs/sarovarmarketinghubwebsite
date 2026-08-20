'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { contact, site } from '@/lib/content';
import { cn } from '@/lib/utils';
import type { FormField } from '@/lib/types';

type Status = 'idle' | 'sending' | 'success' | 'error';

/* Fields, labels and options all come from content/contact.json → form.fields.
   Add a field there and it renders here automatically. */
export default function ContactForm() {
  const form = contact.form;
  const fields: FormField[] = form?.fields || [];

  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');

  const setValue = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    fields.forEach((f) => {
      const value = (values[f.name] || '').trim();
      if (f.required && !value) next[f.name] = `${f.label} is required`;
      else if (f.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))
        next[f.name] = 'Please enter a valid email address';
      else if (f.type === 'tel' && value && value.replace(/\D/g, '').length < 7)
        next[f.name] = 'Please enter a valid phone number';
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    const endpoint = (form.endpoint || '').trim();

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error('Request failed');
      } else {
        // No backend: hand the message to the visitor's email client.
        const body = fields
          .map((f) => `${f.label}: ${values[f.name] || '—'}`)
          .join('\n');
        const subject = `New enquiry from ${values.name || 'the website'}`;
        window.location.href = `mailto:${site.contactInfo.email}?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(body)}`;
        await new Promise((r) => setTimeout(r, 600));
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues({});
    setErrors({});
    setStatus('idle');
  };

  const baseField =
    'w-full rounded-soft border bg-white px-4 py-3.5 text-[0.9375rem] text-heading transition-all duration-300 placeholder:text-body/45 focus:outline-none';

  return (
    <div
      id="contact-form"
      className="relative scroll-mt-28 overflow-hidden rounded-card border border-line bg-white p-6 shadow-card sm:p-9"
    >
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-primary/8 blur-3xl" />

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            className="relative flex flex-col items-center py-12 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
              className="grid size-16 place-items-center rounded-full bg-emerald-500/12 text-emerald-600"
            >
              <Icon name="check-check" size={30} />
            </motion.span>
            <h3 className="mt-6 font-heading text-2xl font-bold text-heading">{form.successHeading}</h3>
            <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-body">{form.successMessage}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-7 inline-flex items-center gap-2 text-[0.875rem] font-bold text-primary hover:underline"
            >
              <Icon name="rotate-ccw" size={15} />
              {form.resetLabel}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <h2 className="font-heading text-2xl font-bold text-heading sm:text-[1.75rem]">{form.heading}</h2>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">{form.subheading}</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {fields.map((field, i) => {
                const error = errors[field.name];
                const value = values[field.name] || '';
                const full = field.width !== 'half';

                return (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.05 + i * 0.05 }}
                    className={cn('flex flex-col gap-2', full && 'sm:col-span-2')}
                  >
                    <label
                      htmlFor={`field-${field.name}`}
                      className="flex items-center gap-2 text-[0.8125rem] font-bold text-heading"
                    >
                      {field.icon && <Icon name={field.icon} size={14} className="text-primary" />}
                      {field.label}
                      {field.required && <span className="text-primary">*</span>}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea
                        id={`field-${field.name}`}
                        name={field.name}
                        rows={field.rows || 5}
                        placeholder={field.placeholder}
                        value={value}
                        onChange={(e) => setValue(field.name, e.target.value)}
                        aria-invalid={!!error}
                        className={cn(
                          baseField,
                          'resize-y',
                          error
                            ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                            : 'border-line focus:border-primary focus:ring-4 focus:ring-primary/10',
                        )}
                      />
                    ) : field.type === 'select' ? (
                      <div className="relative">
                        <select
                          id={`field-${field.name}`}
                          name={field.name}
                          value={value}
                          onChange={(e) => setValue(field.name, e.target.value)}
                          aria-invalid={!!error}
                          className={cn(
                            baseField,
                            'cursor-pointer pr-11',
                            !value && 'text-body/50',
                            error
                              ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                              : 'border-line focus:border-primary focus:ring-4 focus:ring-primary/10',
                          )}
                        >
                          <option value="">{field.placeholder || 'Select an option'}</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <Icon
                          name="chevron-down"
                          size={17}
                          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-body/60"
                        />
                      </div>
                    ) : (
                      <input
                        id={`field-${field.name}`}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={value}
                        onChange={(e) => setValue(field.name, e.target.value)}
                        aria-invalid={!!error}
                        className={cn(
                          baseField,
                          error
                            ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                            : 'border-line focus:border-primary focus:ring-4 focus:ring-primary/10',
                        )}
                      />
                    )}

                    <AnimatePresence>
                      {error && (
                        <motion.span
                          initial={{ opacity: 0, y: -6, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -6, height: 0 }}
                          className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-red-500"
                        >
                          <Icon name="circle-alert" size={13} />
                          {error}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-start gap-2.5 rounded-soft border border-red-200 bg-red-50 p-4 text-[0.875rem] text-red-600"
              >
                <Icon name="circle-alert" size={17} className="mt-0.5 shrink-0" />
                {form.errorMessage}
              </motion.p>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="submit"
                label={status === 'sending' ? form.submittingLabel : form.submitLabel}
                icon={status === 'sending' ? 'loader-circle' : 'send'}
                disabled={status === 'sending'}
                size="lg"
                className={cn('sm:w-auto', status === 'sending' && '[&_svg]:animate-spin')}
              />
              <p className="max-w-xs text-[0.6875rem] leading-relaxed text-body/70">{form.privacyNote}</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
