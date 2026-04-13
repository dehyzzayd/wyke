'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    n: '01',
    title: 'Pick the expert',
    body: 'Choose the person whose judgment your team can’t afford to lose. Founders, engineers, AEs, PMs.',
  },
  {
    n: '02',
    title: 'Run a Socratic interview',
    body: 'Our AI conducts a 90-minute structured conversation. They talk; we extract the patterns underneath.',
  },
  {
    n: '03',
    title: 'Review the cognitive twin',
    body: 'A living model of how they think. Your expert reviews and signs off — you stay in control.',
  },
  {
    n: '04',
    title: 'Query forever',
    body: 'Anyone on your team asks a question and gets an answer in your expert’s reasoning style.',
  },
];

export function Process() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <header className="max-w-2xl">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.18em] text-ink-400">
            How it works
          </p>
          <h2 className="mt-4 text-[28px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink-900">
            Four steps to make expertise permanent.
          </h2>
        </header>

        <ol className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:mt-14 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="relative border-t border-ink-900/10 pt-6"
            >
              <span className="text-[12px] font-semibold tracking-[0.12em] text-ink-300">
                STEP {s.n}
              </span>
              <h3 className="mt-3 text-[18px] font-semibold leading-snug text-ink-900">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.7] text-ink-500">
                {s.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
