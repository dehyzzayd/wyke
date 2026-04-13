'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/lib/mock-data';
import { Avatar } from '@/components/ui/avatar';

export function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex flex-col rounded-3xl border border-surface-100 bg-surface-50 p-10"
            >
              <span
                aria-hidden
                className="absolute left-8 top-3 font-serif text-[80px] leading-none text-brand-200 select-none"
              >
                &ldquo;
              </span>
              <blockquote className="relative z-10 mt-8 text-[16px] leading-[1.8] text-ink-700">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <Avatar name={t.name} size="md" />
                <div>
                  <p className="text-[14px] font-semibold text-ink-900">
                    {t.name}
                  </p>
                  <p className="text-[12.5px] text-ink-400">
                    {t.role}, {t.company}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
