'use client';

import { useMemo } from 'react';
import {
  Activity,
  Globe,
  Sparkles,
  ThumbsUp,
  type LucideIcon,
} from 'lucide-react';
import DottedMap from 'dotted-map';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

const insightsOverTime = [
  { month: 'Oct', insights: 210 },
  { month: 'Nov', insights: 340 },
  { month: 'Dec', insights: 480 },
  { month: 'Jan', insights: 860 },
  { month: 'Feb', insights: 1340 },
  { month: 'Mar', insights: 2020 },
  { month: 'Apr', insights: 2847 },
];

export function Capabilities() {
  return (
    <section className="bg-white px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-2xl px-1">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.18em] text-ink-400">
            The platform
          </p>
          <h2 className="mt-4 text-[28px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink-900">
            An infrastructure layer for judgment.
          </h2>
        </header>

        <div className="mt-12 grid overflow-hidden rounded-2xl border border-[#EFEEEA] md:grid-cols-2">
          {/* Top-left — Global coverage map */}
          <div className="flex flex-col">
            <div className="p-6 sm:p-10">
              <SectionLabel Icon={Globe} label="Global coverage" />
              <p className="mt-7 text-[20px] font-semibold leading-snug text-ink-900">
                Twins active across 23 countries. Reasoning intact in every
                language they think in.
              </p>
            </div>

            <div aria-hidden className="relative flex-1">
              <div className="absolute inset-x-0 z-10 m-auto w-fit">
                <div className="relative flex w-fit items-center gap-2 rounded-lg border border-[#EFEEEA] bg-white px-3 py-1.5 text-[11.5px] font-medium text-ink-900 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.2)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[#0F766E] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0F766E]" />
                  </span>
                  Last twin activated in Lagos, NG
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-white via-transparent to-transparent" />
                <DotMap />
              </div>
            </div>
          </div>

          {/* Top-right — Expert in the loop */}
          <div className="overflow-hidden border-t border-[#EFEEEA] bg-[#FBFBF9] p-6 sm:p-10 md:border-0 md:border-l">
            <div className="relative z-10">
              <SectionLabel Icon={ThumbsUp} label="Expert in the loop" />
              <p className="my-7 text-[20px] font-semibold leading-snug text-ink-900">
                Your experts review answers. Twins get sharper every week.
              </p>
            </div>
            <div aria-hidden className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex size-5 items-center justify-center rounded-full border border-[#EFEEEA]">
                    <span className="size-2.5 rounded-full bg-ink-900" />
                  </span>
                  <span className="text-[11px] text-ink-400">
                    Mon 12 Apr · Sarah’s twin
                  </span>
                </div>
                <div className="mt-1.5 w-4/5 rounded-xl border border-[#EFEEEA] bg-white p-3 text-[12.5px] leading-[1.65] text-ink-700">
                  “I’d pick Postgres — we had on-call experience with it.”
                </div>
              </div>

              <div>
                <div className="mb-1 ml-auto w-4/5 rounded-xl bg-ink-900 p-3 text-[12.5px] leading-[1.65] text-white">
                  Close, but I’d emphasize the reason: we picked the <em>war stories</em>.
                  Retrain on “operational maturity” phrasing.
                </div>
                <span className="block text-right text-[11px] text-ink-400">
                  Sarah · just now
                </span>
              </div>
            </div>
          </div>

          {/* Middle full-width — Headline stat */}
          <div className="col-span-full border-y border-[#EFEEEA] p-10 sm:p-12">
            <p className="text-center font-sans text-[42px] sm:text-[60px] lg:text-[84px] font-semibold leading-[0.95] tracking-[-0.03em] text-ink-900 tabular-nums">
              94% knowledge retention.
            </p>
            <p className="mt-3 text-center text-[13px] text-ink-400">
              Across 47 companies · vs. 12% industry baseline
            </p>
          </div>

          {/* Bottom full-width — Insights captured */}
          <div className="relative col-span-full">
            <div className="absolute z-10 max-w-lg px-6 pr-12 pt-6 sm:px-12 sm:pt-12">
              <SectionLabel Icon={Activity} label="Insights captured" />
              <p className="my-7 text-[20px] font-semibold leading-snug text-ink-900">
                Watch your institutional memory compound.{' '}
                <span className="text-ink-400">
                  Every interview adds patterns your team can query forever.
                </span>
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EFEEEA] bg-white/90 px-2.5 py-1 text-[11px] font-medium text-ink-700 backdrop-blur">
                <Sparkles size={11} className="text-ink-400" />
                +140% in 90 days
              </span>
            </div>
            <InsightsChart />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <span className="flex items-center gap-2 text-[12px] font-medium text-ink-400">
      <Icon size={14} strokeWidth={1.75} />
      {label}
    </span>
  );
}

function DotMap() {
  const points = useMemo(() => {
    const map = new DottedMap({ height: 44, grid: 'diagonal' });
    return map.getPoints();
  }, []);

  return (
    <svg
      viewBox="0 0 120 60"
      className="h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={0.18}
          fill="#CBD5E1"
        />
      ))}
    </svg>
  );
}

function InsightsChart() {
  return (
    <div className="h-[320px] w-full md:h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={insightsOverTime}
          margin={{ top: 160, right: 0, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="fillInsights" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F172A" stopOpacity={0.22} />
              <stop offset="80%" stopColor="#0F172A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#F1F0EC" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94A3B8', fontSize: 11 }}
          />
          <Tooltip
            cursor={{ stroke: '#E2E8F0', strokeWidth: 1 }}
            contentStyle={{
              borderRadius: 10,
              border: '1px solid #EFEEEA',
              fontSize: 12,
              boxShadow: '0 8px 24px -12px rgba(15,23,42,0.18)',
            }}
            formatter={(v: number) => [v.toLocaleString() + ' insights', 'Captured']}
          />
          <Area
            type="monotone"
            strokeWidth={2}
            dataKey="insights"
            stroke="#0F172A"
            fill="url(#fillInsights)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
