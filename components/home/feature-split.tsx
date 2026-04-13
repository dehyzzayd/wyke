'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Check } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

const points = [
  'Answers in your expert’s actual reasoning style',
  'Cited back to the source interview moments',
  'Improves every time the expert reviews a response',
];

export function FeatureSplit() {
  return (
    <section className="border-y border-[#EFEEEA] bg-[#FBFBF9] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* LEFT — copy */}
        <div>
          <p className="text-[11.5px] font-medium uppercase tracking-[0.18em] text-ink-400">
            The Twin
          </p>
          <h2 className="mt-4 text-[28px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink-900">
            Ask. Don’t search.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-ink-500">
            DEhy doesn’t return documents — it returns a judgment call, made
            the way your most experienced person would have made it. Three years
            of pattern recognition, on tap, in plain English.
          </p>

          <ul className="mt-7 space-y-3.5">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-[14.5px] text-ink-700"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink-900 text-white">
                  <Check size={11} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — chat preview */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[#EBEAE6] bg-white p-5 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)]"
        >
          {/* Twin header */}
          <header className="flex items-center justify-between border-b border-[#F0EFEB] pb-4">
            <div className="flex items-center gap-3">
              <Avatar name="Sarah Chen" size="sm" />
              <div>
                <p className="text-[13px] font-semibold text-ink-900">
                  Sarah Chen <span className="font-normal text-ink-400">· Twin</span>
                </p>
                <p className="text-[11px] text-ink-400">
                  Principal Engineer · 847 insights
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#D6E5E2] px-1.5 py-0.5 text-[10px] font-medium text-[#0F766E]">
              <span className="h-1 w-1 rounded-full bg-[#0F766E]" />
              Active
            </span>
          </header>

          {/* Messages */}
          <div className="space-y-4 px-1 py-5">
            <div className="ml-auto max-w-[78%] rounded-2xl rounded-br-sm bg-ink-900 px-4 py-2.5 text-[13.5px] text-white">
              Why did we choose PostgreSQL over MongoDB in 2021?
            </div>

            <div className="flex max-w-[88%] gap-2.5">
              <Avatar name="Sarah Chen" size="xs" />
              <div className="rounded-2xl rounded-bl-sm border border-[#EBEAE6] bg-white px-4 py-3 text-[13.5px] leading-[1.7] text-ink-700">
                Honestly — operational maturity. We had three engineers who
                had been on call for Mongo before and could name every failure
                mode. That war-story depth was the whole reason. The schema
                rigidity wasn’t a feature, it was acceptable cost.
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-[#EBEAE6] bg-[#FBFBF9] p-2">
            <input
              disabled
              placeholder="Ask Sarah anything…"
              className="flex-1 bg-transparent px-2 py-1 text-[13px] text-ink-700 placeholder:text-ink-300 focus:outline-none"
            />
            <button
              aria-label="Send"
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-ink-900 text-white"
            >
              <ArrowUp size={13} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
