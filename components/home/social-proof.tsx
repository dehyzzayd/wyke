'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

type T = {
  quote: string;
  name: string;
  role: string;
  company: string;
  photo: string;
};

const items: T[] = [
  {
    quote:
      'When our lead architect gave notice, we ran a WYKE session in 48 hours. Six months later his replacement still queries the twin weekly.',
    name: 'Daniel Okafor',
    role: 'CTO',
    company: 'Crestline Labs',
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  },
  {
    quote:
      'Four-hour interview. The twin surfaced things I didn’t even realize I knew. It was unsettling how accurate it became.',
    name: 'Maya Reyes',
    role: 'Principal Engineer',
    company: 'Stackflow',
    photo:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
  },
  {
    quote:
      'We lost our VP of Sales in Q2. His twin onboarded the replacement in three weeks instead of six months. Two accounts didn’t churn.',
    name: 'Tom Hargrove',
    role: 'CEO',
    company: 'Paragon',
    photo:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
  },
];

export function SocialProof() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <header className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end sm:gap-6">
          <div className="max-w-xl">
            <p className="text-[11.5px] font-medium uppercase tracking-[0.18em] text-ink-400">
              Customer stories
            </p>
            <h2 className="mt-4 text-[28px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink-900">
              Teams who don’t lose context anymore.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="fill-[#22A06B] text-[#22A06B]"
                />
              ))}
            </div>
            <p className="text-[13px] text-ink-500">
              <span className="font-semibold text-ink-900">4.9</span> on
              Trustpilot · 47 reviews
            </p>
          </div>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="flex flex-col rounded-2xl border border-[#EBEAE6] bg-white p-7"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star
                    key={k}
                    size={12}
                    className="fill-ink-900 text-ink-900"
                  />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-[14.5px] leading-[1.75] text-ink-700">
                “{t.quote}”
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-[#F0EFEB] pt-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.photo}
                  alt=""
                  aria-hidden
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-[13.5px] font-semibold text-ink-900">
                    {t.name}
                  </p>
                  <p className="text-[12px] text-ink-400">
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
