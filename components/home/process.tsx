'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageSquareText, Sparkles } from 'lucide-react';

type Step = {
  n: string;
  title: string;
  interview: { role: 'ai' | 'expert'; text: string }[];
  extracted: { type: string; title: string; body: string };
};

const steps: Step[] = [
  {
    n: '01',
    title: 'The question beneath the question',
    interview: [
      {
        role: 'ai',
        text: 'When you picked Postgres over Mongo in 2021, what were you actually optimizing for?',
      },
      {
        role: 'expert',
        text: 'Operational maturity. Three of us had been on call for Mongo and could name every failure mode. I wasn\u2019t picking a database, I was picking war stories.',
      },
    ],
    extracted: {
      type: 'Decision Heuristic',
      title: 'Pick boring tech for stateful systems.',
      body: 'Sarah biases toward technologies with 8+ years of production maturity. Novel databases optimize for the happy path; at 3am only the breadth of war stories matters.',
    },
  },
  {
    n: '02',
    title: 'The unspoken rule',
    interview: [
      {
        role: 'ai',
        text: 'Walk me through a deploy you would never have shipped. Why?',
      },
      {
        role: 'expert',
        text: 'Anything after 2pm on a Friday. I\u2019ve tracked it — weekend incidents are 4x higher on Friday afternoon deploys. I just don\u2019t let them through review.',
      },
    ],
    extracted: {
      type: 'Risk Pattern',
      title: 'Friday afternoon deploys correlate with weekend incidents 4:1.',
      body: 'Never written down. Now it\u2019s queryable — the next engineer asks "is this a safe time to ship?" and gets the real answer.',
    },
  },
  {
    n: '03',
    title: 'The shape of judgment',
    interview: [
      {
        role: 'ai',
        text: 'What\u2019s the most common mistake a junior engineer makes on this system?',
      },
      {
        role: 'expert',
        text: 'They treat the write path like the read path. They add a column "for now" and six months later three downstream jobs read from it. There\u2019s no owner, so removing it becomes a cross-team negotiation.',
      },
    ],
    extracted: {
      type: 'Mental Model',
      title: 'Read paths are products. Write paths are contracts.',
      body: 'Before adding any persisted field: who owns its removal? If the answer isn\u2019t a name, the field doesn\u2019t go in.',
    },
  },
  {
    n: '04',
    title: 'The living twin',
    interview: [
      {
        role: 'ai',
        text: 'Final review — your twin just answered three questions. How would you grade each?',
      },
      {
        role: 'expert',
        text: 'First two are spot on. The third missed a nuance — we changed the consistency model in 2023. I\u2019ll flag it, the twin retrains, and it won\u2019t make that mistake again.',
      },
    ],
    extracted: {
      type: 'Continuous learning',
      title: 'Expert-signed responses train the twin in-place.',
      body: 'Every thumbs-up or correction from the expert improves the model. Your team queries it forever; the expert is only in the loop at review time.',
    },
  },
];

export function Process() {
  return (
    <section id="how-it-works" className="bg-[#FBFBF9] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <header className="max-w-2xl">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.18em] text-ink-400">
            How it works
          </p>
          <h2 className="mt-4 text-[28px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink-900">
            A real interview. A real extraction. Every time.
          </h2>
          <p className="mt-4 max-w-xl text-[14.5px] leading-[1.7] text-ink-500">
            A 90-minute Socratic conversation. Below, exactly what gets asked —
            and exactly what WYKE extracts from each answer.
          </p>
        </header>

        <ol className="mt-14 space-y-12">
          {steps.map((s, idx) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="relative"
            >
              {/* Step header */}
              <div className="mb-5 flex items-center gap-3">
                <span className="text-[11.5px] font-semibold tracking-[0.16em] text-ink-300">
                  STEP {s.n}
                </span>
                <span className="h-px flex-1 bg-[#EFEEEA]" />
                <span className="text-[13px] font-semibold text-ink-900">
                  {s.title}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
                {/* LEFT — interview */}
                <div className="rounded-2xl border border-[#EFEEEA] bg-white p-5 sm:p-6">
                  <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-400">
                    <MessageSquareText size={11} />
                    In the interview
                  </p>
                  <div className="mt-4 space-y-3">
                    {s.interview.map((m, i) => (
                      <div
                        key={i}
                        className={
                          m.role === 'ai'
                            ? 'flex items-start gap-2.5'
                            : 'flex items-start gap-2.5'
                        }
                      >
                        <span
                          className={
                            m.role === 'ai'
                              ? 'mt-0.5 inline-flex h-5 shrink-0 items-center rounded bg-[#F4F4F1] px-1.5 text-[9.5px] font-semibold uppercase tracking-wider text-ink-500'
                              : 'mt-0.5 inline-flex h-5 shrink-0 items-center rounded bg-ink-900 px-1.5 text-[9.5px] font-semibold uppercase tracking-wider text-white'
                          }
                        >
                          {m.role === 'ai' ? 'AI' : 'Expert'}
                        </span>
                        <p className="text-[13.5px] leading-[1.7] text-ink-700">
                          {m.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow (desktop) */}
                <div className="hidden md:flex md:items-center md:justify-center md:px-1">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-white shadow-[0_8px_24px_-8px_rgba(15,23,42,0.3)]">
                    <ArrowRight size={14} strokeWidth={2} />
                  </span>
                </div>

                {/* RIGHT — extracted */}
                <div className="rounded-2xl border border-[#EFEEEA] bg-ink-900 p-5 sm:p-6 text-white">
                  <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/60">
                    <Sparkles size={11} />
                    What WYKE extracts
                  </p>

                  <div className="mt-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[10.5px] font-medium text-white/80">
                      <span className="h-1 w-1 rounded-full bg-white/80" />
                      {s.extracted.type}
                    </span>
                    <h3 className="mt-3 text-[16px] font-semibold leading-snug text-white">
                      {s.extracted.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.7] text-white/70">
                      {s.extracted.body}
                    </p>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
