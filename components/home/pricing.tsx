'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { SectionHeader } from './section-header';
import { cn } from '@/lib/utils';

type Tier = {
  name: string;
  price: string;
  cadence?: string;
  blurb: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
};

const tiers: Tier[] = [
  {
    name: 'Starter',
    price: '$299',
    cadence: '/mo',
    blurb: 'Up to 3 Expert Profiles',
    features: [
      '3 Cognitive Twins',
      'Unlimited queries',
      'Slack integration',
      'Basic analytics',
      'Email support',
    ],
    ctaLabel: 'Start Free',
  },
  {
    name: 'Scale',
    price: '$899',
    cadence: '/mo',
    blurb: 'Up to 15 Expert Profiles',
    features: [
      'Everything in Starter',
      'API access',
      'Custom interview templates',
      'Priority support',
      'Team permissions',
      'Retention analytics',
    ],
    ctaLabel: 'Start 14-day Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    blurb: 'Unlimited experts',
    features: [
      'Unlimited Expert Profiles',
      'Dedicated success manager',
      'SSO + SCIM',
      'Custom deployment',
      'Compliance reviews (SOC 2 / HIPAA)',
    ],
    ctaLabel: 'Talk to us →',
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-surface-50 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Pricing"
          titleTop="Transparent pricing."
          titleAccent="No surprises."
          subtitle="Pay per expert profile. No seat fees, no query taxes, no usage gotchas."
        />

        <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={cn(
                'group relative flex flex-col rounded-3xl p-10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl',
                t.highlighted
                  ? 'bg-ink-900 text-white shadow-glow lg:scale-[1.03] lg:-my-2'
                  : 'border border-surface-100 bg-white text-ink-900'
              )}
            >
              {t.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-md">
                  Most Popular
                </span>
              )}

              <p
                className={cn(
                  'text-[13px] font-semibold uppercase tracking-[0.12em]',
                  t.highlighted ? 'text-brand-200' : 'text-brand-600'
                )}
              >
                {t.name}
              </p>

              <div className="mt-5 flex items-baseline gap-1">
                <span
                  className={cn(
                    'font-serif text-[52px] leading-none',
                    t.highlighted ? 'text-white' : 'text-ink-900'
                  )}
                >
                  {t.price}
                </span>
                {t.cadence && (
                  <span
                    className={cn(
                      'text-[14px]',
                      t.highlighted ? 'text-ink-300' : 'text-ink-400'
                    )}
                  >
                    {t.cadence}
                  </span>
                )}
              </div>
              <p
                className={cn(
                  'mt-2 text-[14px]',
                  t.highlighted ? 'text-ink-300' : 'text-ink-500'
                )}
              >
                {t.blurb}
              </p>

              <ul
                className={cn(
                  'mt-8 flex-1 space-y-3.5 border-t pt-8',
                  t.highlighted ? 'border-ink-700' : 'border-surface-100'
                )}
              >
                {t.features.map((f) => (
                  <li
                    key={f}
                    className={cn(
                      'flex items-start gap-3 text-[14.5px]',
                      t.highlighted ? 'text-ink-200' : 'text-ink-700'
                    )}
                  >
                    <Check
                      size={16}
                      className={cn(
                        'mt-0.5 shrink-0',
                        t.highlighted ? 'text-brand-500' : 'text-brand-600'
                      )}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={t.name === 'Enterprise' ? '#contact' : '/auth?tab=signup'}
                className={cn(
                  'mt-10 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[14px] font-semibold transition-all',
                  t.highlighted
                    ? 'bg-white text-ink-900 hover:bg-surface-50'
                    : 'border border-surface-200 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-white'
                )}
              >
                {t.ctaLabel}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
