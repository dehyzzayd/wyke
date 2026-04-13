'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FeaturedStory() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <p className="text-[11.5px] font-medium uppercase tracking-[0.18em] text-ink-400">
          Customer story · Crestline Labs
        </p>
        <h2 className="mt-4 max-w-3xl text-[28px] sm:text-[36px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink-900">
          Their lead architect resigned on a Thursday.
          <br className="hidden sm:inline" />
          <span className="text-ink-400"> On Monday, his twin was taking questions.</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mt-12 grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-[#EFEEEA] lg:grid-cols-[0.9fr_1.1fr]"
        >
          {/* LEFT — portrait */}
          <div className="relative aspect-[4/5] lg:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1600&auto=format&fit=crop"
              alt="Daniel Okafor, CTO at Crestline Labs"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-tr from-ink-900/30 via-transparent to-transparent"
            />
            {/* Name card overlay */}
            <div className="absolute bottom-5 left-5 rounded-xl bg-white/95 px-4 py-3 backdrop-blur">
              <p className="text-[13.5px] font-semibold text-ink-900">
                Daniel Okafor
              </p>
              <p className="mt-0.5 text-[11.5px] text-ink-500">
                CTO, Crestline Labs
              </p>
            </div>
          </div>

          {/* RIGHT — story */}
          <div className="flex flex-col justify-between gap-8 bg-[#FBFBF9] p-8 sm:p-12">
            <div>
              <p
                aria-hidden
                className="font-serif text-[72px] leading-none text-ink-300 select-none"
              >
                &ldquo;
              </p>
              <div className="space-y-4 text-[15px] leading-[1.75] text-ink-700">
                <p>
                  We learned he was leaving on a Thursday afternoon. He gave
                  four weeks. My first call wasn&rsquo;t to a recruiter, it was
                  to WYKE.
                </p>
                <p>
                  By Monday morning his cognitive twin was in production.
                  The replacement started six weeks later and has been
                  querying the twin every single week — architecture
                  reviews, incident postmortems, even vendor calls.
                </p>
                <p className="font-semibold text-ink-900">
                  Six months in, we still have context we would have lost.
                  That&rsquo;s unprecedented for us.
                </p>
              </div>
            </div>

            {/* Outcome stat + CTA */}
            <div className="flex flex-col gap-5 border-t border-[#EFEEEA] pt-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="font-sans text-[32px] font-semibold leading-none tracking-[-0.02em] text-ink-900 tabular-nums">
                    0
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-tight text-ink-400">
                    Architectural decisions
                    <br />
                    lost in transition
                  </p>
                </div>
                <div>
                  <p className="font-sans text-[32px] font-semibold leading-none tracking-[-0.02em] text-ink-900 tabular-nums">
                    48h
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-tight text-ink-400">
                    From resignation
                    <br />
                    to live twin
                  </p>
                </div>
              </div>
              <Link
                href="#"
                className="inline-flex items-center gap-1 self-start text-[13px] font-medium text-ink-900 underline decoration-ink-200 underline-offset-4 hover:decoration-ink-900 sm:self-auto"
              >
                Read the full story <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
