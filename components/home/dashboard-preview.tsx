'use client';

import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from './section-header';
import { Avatar } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  insightsSparkline,
  departmentCoverage,
  recentQueries,
  experts,
} from '@/lib/mock-data';

function ActiveSessionsCard() {
  const featured = [
    experts.find((e) => e.id === 'sarah-chen')!,
    experts.find((e) => e.id === 'marcus-webb')!,
    experts.find((e) => e.id === 'priya-nair')!,
  ];
  const progresses = [73, 41, 100];
  const labels = ['In Progress', 'In Progress', 'Complete'];
  return (
    <div className="flex h-full flex-col rounded-3xl border border-surface-100 bg-white p-8 shadow-sm">
      <header className="flex items-center justify-between">
        <h3 className="text-[16px] font-bold text-ink-900">
          Active Knowledge Sessions
        </h3>
        <Badge tone="green" className="font-medium">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#10B981]" />
          </span>
          3 active
        </Badge>
      </header>

      <ul className="mt-6 flex-1 space-y-5">
        {featured.map((e, i) => (
          <li
            key={e.id}
            className="flex items-center gap-4 rounded-2xl border border-surface-100 bg-surface-50/60 px-4 py-3"
          >
            <Avatar name={e.name} size="md" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-[14px] font-semibold text-ink-900">
                  {e.name}{' '}
                  <span className="font-normal text-ink-400">· {e.role}</span>
                </p>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                    progresses[i] === 100
                      ? 'bg-[#D1FAE5] text-[#047857]'
                      : 'bg-brand-50 text-brand-700'
                  }`}
                >
                  {labels[i]}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <Progress value={progresses[i]} />
                <span className="text-[11px] tabular-nums text-ink-400">
                  Depth: {progresses[i] === 100 ? 100 : 87 - i * 14}%
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InsightsDarkCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-3xl bg-ink-900 p-8 text-white">
      <div>
        <p className="font-sans text-[48px] font-bold leading-none">2,847</p>
        <p className="mt-2 text-[13px] text-ink-300">
          Insights extracted this month
        </p>
      </div>

      <div className="-mx-2 mt-6 h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={insightsSparkline}>
            <Line
              type="monotone"
              dataKey="v"
              stroke="#ffffff"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-[13px] font-medium text-[#10B981]">
        +23% vs last month
      </p>
    </div>
  );
}

function HealthScoreCard() {
  const value = 78;
  const r = 38;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  return (
    <div className="flex h-full flex-col rounded-3xl border border-surface-100 bg-white p-8">
      <div className="flex items-center gap-5">
        <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
          <circle
            cx="50"
            cy="50"
            r={r}
            stroke="#EFF6FF"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r={r}
            stroke="#2563EB"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
          />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="central"
            transform="rotate(90 50 50)"
            className="fill-ink-900 font-sans font-bold"
            fontSize="20"
          >
            78%
          </text>
        </svg>
        <div>
          <p className="text-[14px] text-ink-400">Org Knowledge Health</p>
          <p className="mt-1.5 text-[13px] font-medium text-[#F59E0B]">
            4 experts pending review
          </p>
        </div>
      </div>
    </div>
  );
}

function RecentQueriesCard() {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-surface-100 bg-white p-8">
      <h3 className="text-[16px] font-bold text-ink-900">
        Recent Twin Queries
      </h3>
      <ul className="mt-5 space-y-4">
        {recentQueries.map((q) => (
          <li key={q.id} className="flex items-start gap-3">
            <Avatar name={q.askedBy} size="sm" />
            <div className="min-w-0">
              <p className="line-clamp-2 text-[13.5px] leading-snug text-ink-900">
                {q.text}
              </p>
              <p className="mt-1 text-[11px] text-ink-400">
                {q.askedBy} · {q.askedAgo}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CoverageBarCard() {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-surface-100 bg-white p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-bold text-ink-900">
          Knowledge Coverage by Department
        </h3>
        <a
          href="#"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-brand-600 hover:text-brand-700"
        >
          Identify coverage gaps <ArrowRight size={14} />
        </a>
      </div>

      <div className="mt-4 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={departmentCoverage}
            layout="vertical"
            margin={{ left: 0, right: 24, top: 8, bottom: 0 }}
          >
            <XAxis type="number" hide domain={[0, 100]} />
            <YAxis
              type="category"
              dataKey="dept"
              axisLine={false}
              tickLine={false}
              width={90}
              tick={{ fill: '#64748B', fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: '#F8FAFC' }}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #F1F5F9',
                fontSize: 12,
              }}
              formatter={(v: number) => [`${v}%`, 'Coverage']}
            />
            <Bar dataKey="coverage" radius={[6, 6, 6, 6]}>
              {departmentCoverage.map((d, i) => (
                <Cell
                  key={d.dept}
                  fill={i === 0 ? '#2563EB' : i === 1 ? '#3B82F6' : i === 2 ? '#60A5FA' : '#93C5FD'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function DashboardPreview() {
  return (
    <section className="bg-surface-50 py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="The Product"
          titleTop="A command center for"
          titleAccent="your organization's mind."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 grid grid-cols-12 gap-4"
        >
          <div className="col-span-12 row-span-2 lg:col-span-8 min-h-[360px]">
            <ActiveSessionsCard />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 min-h-[200px]">
            <InsightsDarkCard />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 min-h-[200px]">
            <HealthScoreCard />
          </div>
          <div className="col-span-12 lg:col-span-5 min-h-[260px]">
            <RecentQueriesCard />
          </div>
          <div className="col-span-12 lg:col-span-7 min-h-[260px]">
            <CoverageBarCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
