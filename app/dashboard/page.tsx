'use client';

import { useState } from 'react';
import {
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  Brain,
  Check,
  ChevronRight,
  Download,
  MoreHorizontal,
  Play,
  Plus,
  Sparkles,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Topbar } from '@/components/dashboard/topbar';
import { Avatar } from '@/components/ui/avatar';
import { experts, queryableExperts } from '@/lib/mock-data';

/* ────────────────────────────────────────────────────────────────────────── */

const cashflow = [
  { m: 'Jan', sessions: 3, queries: 18 },
  { m: 'Feb', sessions: 5, queries: 32 },
  { m: 'Mar', sessions: 4, queries: 28 },
  { m: 'Apr', sessions: 7, queries: 41 },
  { m: 'May', sessions: 6, queries: 47 },
  { m: 'Jun', sessions: 9, queries: 62 },
  { m: 'Jul', sessions: 8, queries: 71 },
  { m: 'Aug', sessions: 11, queries: 84 },
  { m: 'Sep', sessions: 10, queries: 92 },
  { m: 'Oct', sessions: 13, queries: 108 },
  { m: 'Nov', sessions: 14, queries: 121 },
  { m: 'Dec', sessions: 16, queries: 137 },
];

const coverage = [
  { name: 'Engineering', value: 89, color: '#0F172A' },
  { name: 'Sales', value: 67, color: '#475569' },
  { name: 'Product', value: 45, color: '#94A3B8' },
  { name: 'Finance', value: 23, color: '#CBD5E1' },
];

const recentSessions = [
  {
    expertId: 'sarah-chen',
    type: 'Deep Dive',
    date: '2026-04-13',
    duration: '73m',
    status: 'Completed' as const,
  },
  {
    expertId: 'marcus-webb',
    type: 'Initial Extraction',
    date: '2026-04-13',
    duration: '41m',
    status: 'In Progress' as const,
  },
  {
    expertId: 'dev-patel',
    type: 'Scenario Probing',
    date: '2026-04-10',
    duration: '52m',
    status: 'Completed' as const,
  },
  {
    expertId: 'james-obi',
    type: 'Deep Dive',
    date: '2026-04-08',
    duration: '48m',
    status: 'Completed' as const,
  },
  {
    expertId: 'lisa-park',
    type: 'Initial Extraction',
    date: '2026-04-09',
    duration: '39m',
    status: 'Completed' as const,
  },
];

/* ────────────────────────────────────────────────────────────────────────── */

export default function DashboardPage() {
  return (
    <div className="px-4 lg:px-6">
      <Topbar
        title="Overview"
        subtitle="Track your team’s captured expertise — with live extraction insights."
      />

      <main className="mt-3 grid grid-cols-12 gap-3">
        {/* ── Row 1 ─────────────────────────────────────────────────── */}
        <div className="col-span-12 md:col-span-5">
          <KnowledgeCapturedCard />
        </div>
        <div className="col-span-12 md:col-span-4">
          <ExtractionStatusCard />
        </div>
        <div className="col-span-12 md:col-span-3">
          <KnowledgeScoreCard />
        </div>

        {/* ── Row 2 ─────────────────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-8">
          <SessionsActivityCard />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <TwinAssistantCard />
        </div>

        {/* ── Row 3 ─────────────────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-7">
          <RecentSessionsCard />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <CoverageDonutCard />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <KnowledgeTransferCard />
        </div>
      </main>
    </div>
  );
}

/* ──────────────────────── Card primitives ────────────────────────────────── */

function CardWrap({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`flex h-full flex-col rounded-2xl border border-[#E6E5E0] bg-white p-5 ${className ?? ''}`}
    >
      {children}
    </section>
  );
}

/* ──────────────────────── Hero metric (sky accent) ────────────────────── */

function KnowledgeCapturedCard() {
  return (
    <CardWrap>
      <header className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-ink-500">
          Knowledge Captured
        </p>
        <button className="text-ink-300 hover:text-ink-700">
          <MoreHorizontal size={14} />
        </button>
      </header>

      <p className="mt-6 font-sans text-[40px] sm:text-[44px] font-semibold tracking-[-0.025em] leading-none text-ink-900 tabular-nums">
        2,847{' '}
        <span className="text-[15px] font-medium align-middle text-ink-400">
          insights
        </span>
      </p>
      <p className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-[#0F766E]">
        <ArrowUpRight size={12} />
        +23% vs last month
      </p>

      <div className="mt-6 flex items-center gap-2">
        <button className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-3.5 py-1.5 text-[12.5px] font-semibold text-white hover:bg-black">
          <Plus size={12} />
          Start session
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-full border border-[#E6E5E0] bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-ink-700 hover:bg-[#FBFBF9]">
          <Download size={12} />
          Export
        </button>
      </div>
    </CardWrap>
  );
}

/* ──────────────────────── Dark sub-metrics card ───────────────────────── */

function ExtractionStatusCard() {
  const sub = [
    {
      label: 'Active sessions',
      value: '3',
      delta: '+2 today',
      tone: 'up' as const,
    },
    {
      label: 'Completed',
      value: '47',
      delta: '+12 this month',
      tone: 'up' as const,
    },
    {
      label: 'Scheduled',
      value: '8',
      delta: 'next 7 days',
      tone: 'flat' as const,
    },
  ];
  return (
    <CardWrap>
      <header className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-ink-500">AI Extraction</p>
        <button className="inline-flex items-center gap-1 rounded-full bg-ink-900 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-black">
          <Plus size={11} />
          Add session
        </button>
      </header>

      <div className="mt-5 grid flex-1 grid-cols-3 gap-2">
        {sub.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-[#EFEEEA] bg-[#FBFBF9] p-3"
          >
            <p className="text-[10.5px] text-ink-400">{s.label}</p>
            <p className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-ink-900 tabular-nums">
              {s.value}
            </p>
            <p
              className={`mt-2 inline-flex items-center gap-1 text-[10.5px] font-medium ${
                s.tone === 'up' ? 'text-[#0F766E]' : 'text-ink-400'
              }`}
            >
              {s.tone === 'up' && <ArrowUp size={9} />}
              {s.delta}
            </p>
          </div>
        ))}
      </div>
    </CardWrap>
  );
}

/* ──────────────────────── Knowledge score (gauge) ─────────────────────── */

function KnowledgeScoreCard() {
  const value = 78;
  const r = 32;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);

  return (
    <CardWrap>
      <header className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-ink-500">Knowledge Score</p>
        <button className="text-ink-300 hover:text-ink-700">
          <MoreHorizontal size={14} />
        </button>
      </header>

      <div className="mt-5 flex flex-1 flex-col items-start">
        <p className="text-[24px] font-semibold tracking-[-0.02em] text-ink-900">
          Excellent
        </p>
        <p className="text-[12px] text-ink-400">Org-wide retention quality</p>

        <div className="relative mt-4 h-[80px] w-full">
          <svg viewBox="0 0 100 60" className="h-full w-full">
            <path
              d="M10,55 A40,40 0 0 1 90,55"
              stroke="#EFEEEA"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M10,55 A40,40 0 0 1 90,55"
              stroke="#0F172A"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={offset}
            />
            <text
              x="50"
              y="52"
              textAnchor="middle"
              className="fill-ink-900"
              fontSize="14"
              fontWeight="700"
            >
              {value}%
            </text>
          </svg>
        </div>
      </div>
    </CardWrap>
  );
}

/* ──────────────────────── Sessions Activity (bar chart) ───────────────── */

function SessionsActivityCard() {
  return (
    <CardWrap>
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[14px] font-semibold text-ink-900">
            Sessions Activity
          </p>
          <p className="mt-0.5 text-[12px] text-ink-400">
            Sessions vs queries · last 12 months
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11.5px]">
          <Legend color="#0F172A" label="Sessions" />
          <Legend color="#CBD5E1" label="Queries" />
          <button className="rounded-full border border-[#E6E5E0] px-2.5 py-1 text-[11px] text-ink-500 hover:bg-[#F4F4F1]">
            This Year ▾
          </button>
        </div>
      </header>

      <p className="mt-5 text-[28px] font-semibold tracking-[-0.025em] text-ink-900 tabular-nums">
        841{' '}
        <span className="text-[12px] font-normal text-ink-400">
          total queries answered
        </span>
      </p>

      <div className="mt-5 h-[220px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cashflow} barGap={4} barCategoryGap="20%">
            <XAxis
              dataKey="m"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              width={28}
            />
            <Tooltip
              cursor={{ fill: '#FBFBF9' }}
              contentStyle={{
                borderRadius: 10,
                border: '1px solid #E6E5E0',
                fontSize: 12,
                boxShadow: '0 4px 14px rgba(15,23,42,0.06)',
              }}
            />
            <Bar dataKey="queries" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="sessions" fill="#0F172A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardWrap>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-ink-500">
      <span className="h-2 w-2 rounded-sm" style={{ background: color }} />
      {label}
    </span>
  );
}

/* ──────────────────────── Twin Assistant (mini chat) ──────────────────── */

function TwinAssistantCard() {
  const [active, setActive] = useState(queryableExperts[0].id);
  const [draft, setDraft] = useState('');
  const expert = experts.find((e) => e.id === active)!;

  return (
    <CardWrap>
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[14px] font-semibold text-ink-900">
            Query a Twin
          </p>
          <p className="mt-0.5 text-[12px] text-ink-400">
            Ask any active twin — answers stream in seconds.
          </p>
        </div>
        <button className="text-ink-300 hover:text-ink-700">
          <MoreHorizontal size={14} />
        </button>
      </header>

      {/* Twin selector chips */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {queryableExperts.slice(0, 4).map((e) => {
          const isActive = e.id === active;
          return (
            <button
              key={e.id}
              onClick={() => setActive(e.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11.5px] transition-colors ${
                isActive
                  ? 'bg-ink-900 text-white'
                  : 'border border-[#E6E5E0] text-ink-500 hover:text-ink-900'
              }`}
            >
              <Avatar name={e.name} size="xs" />
              {e.name.split(' ')[0]}
            </button>
          );
        })}
      </div>

      {/* Suggestion + sample reply */}
      <div className="mt-4 flex-1 space-y-3">
        <div className="flex items-start gap-2.5">
          <Avatar name={expert.name} size="xs" />
          <div className="flex-1 rounded-xl rounded-tl-sm border border-[#EFEEEA] bg-[#FBFBF9] px-3 py-2.5">
            <p className="text-[12.5px] leading-[1.65] text-ink-700">
              Hey — ask me anything about{' '}
              <span className="font-semibold text-ink-900">
                {expert.role.toLowerCase()}
              </span>{' '}
              decisions. I’ll answer the way I’d actually answer in a meeting.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            'Why PostgreSQL over Mongo?',
            'When to roll back?',
            'Hiring red flags?',
          ].map((s) => (
            <button
              key={s}
              onClick={() => setDraft(s)}
              className="rounded-full border border-[#E6E5E0] bg-white px-2.5 py-1 text-[11px] text-ink-500 hover:border-ink-300 hover:text-ink-900"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input row */}
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#E6E5E0] bg-[#FBFBF9] p-1.5 focus-within:border-ink-700">
        <Sparkles size={13} className="ml-2 text-ink-300" />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Ask ${expert.name.split(' ')[0]} anything…`}
          className="flex-1 bg-transparent px-1 py-1 text-[12.5px] text-ink-900 placeholder:text-ink-300 focus:outline-none"
        />
        <button
          aria-label="Send"
          className="inline-flex h-7 items-center gap-1 rounded-lg bg-ink-900 px-3 text-[11.5px] font-semibold text-white hover:bg-black"
        >
          <ArrowUp size={11} />
          Send
        </button>
      </div>
    </CardWrap>
  );
}

/* ──────────────────────── Recent Sessions (table-ish) ─────────────────── */

function RecentSessionsCard() {
  return (
    <CardWrap>
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[14px] font-semibold text-ink-900">
            Recent Sessions
          </p>
          <p className="mt-0.5 text-[12px] text-ink-400">
            Last interview activity across the org.
          </p>
        </div>
        <button className="rounded-full border border-[#E6E5E0] px-2.5 py-1 text-[11px] text-ink-500 hover:bg-[#F4F4F1]">
          This month ▾
        </button>
      </header>

      {/* md+: real table */}
      <table className="mt-4 hidden w-full text-left text-[12.5px] md:table">
        <thead>
          <tr className="text-[10.5px] uppercase tracking-wider text-ink-300">
            <th className="pb-2 font-medium">Expert</th>
            <th className="pb-2 font-medium">Type</th>
            <th className="pb-2 font-medium">Date</th>
            <th className="pb-2 font-medium tabular-nums">Duration</th>
            <th className="pb-2 font-medium text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F1F0EC]">
          {recentSessions.map((s, i) => {
            const e = experts.find((x) => x.id === s.expertId)!;
            return (
              <tr key={i} className="text-ink-700">
                <td className="py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={e.name} size="xs" />
                    <div>
                      <p className="text-[12.5px] font-semibold text-ink-900">
                        {e.name}
                      </p>
                      <p className="text-[10.5px] text-ink-400">{e.role}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-ink-500">{s.type}</td>
                <td className="py-3 tabular-nums text-ink-500">{s.date}</td>
                <td className="py-3 tabular-nums text-ink-500">
                  {s.duration}
                </td>
                <td className="py-3 text-right">
                  <StatusPill status={s.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile: card list */}
      <ul className="mt-4 space-y-2.5 md:hidden">
        {recentSessions.map((s, i) => {
          const e = experts.find((x) => x.id === s.expertId)!;
          return (
            <li
              key={i}
              className="rounded-xl border border-[#EFEEEA] bg-[#FBFBF9] p-3.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Avatar name={e.name} size="xs" />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-ink-900">
                      {e.name}
                    </p>
                    <p className="truncate text-[11px] text-ink-400">
                      {e.role}
                    </p>
                  </div>
                </div>
                <StatusPill status={s.status} />
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11.5px] text-ink-500">
                <span>{s.type}</span>
                <span className="text-ink-300">·</span>
                <span className="tabular-nums">{s.date}</span>
                <span className="text-ink-300">·</span>
                <span className="tabular-nums">{s.duration}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </CardWrap>
  );
}

function StatusPill({ status }: { status: 'Completed' | 'In Progress' }) {
  if (status === 'Completed') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#ECF6F2] px-2 py-0.5 text-[10.5px] font-medium text-[#0F766E]">
        <Check size={9} strokeWidth={3} />
        Completed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBF1E0] px-2 py-0.5 text-[10.5px] font-medium text-[#B45309]">
      <span className="h-1 w-1 rounded-full bg-[#B45309]" />
      In Progress
    </span>
  );
}

/* ──────────────────────── Coverage Donut ──────────────────────────────── */

function CoverageDonutCard() {
  const total = coverage.reduce((a, b) => a + b.value, 0);
  return (
    <CardWrap>
      <header className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-ink-500">Coverage</p>
        <button className="text-ink-300 hover:text-ink-700">
          <MoreHorizontal size={14} />
        </button>
      </header>

      <div className="relative mt-3 h-[110px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={coverage}
              dataKey="value"
              nameKey="name"
              innerRadius={36}
              outerRadius={50}
              paddingAngle={2}
              strokeWidth={0}
            >
              {coverage.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: '1px solid #E6E5E0',
                fontSize: 12,
              }}
              formatter={(v: number, n: string) => [`${v}%`, n]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[9px] uppercase tracking-wider text-ink-300">
            Avg
          </span>
          <span className="text-[16px] font-semibold tabular-nums text-ink-900">
            {Math.round(total / coverage.length)}%
          </span>
        </div>
      </div>

      <ul className="mt-3 space-y-1.5 text-[11.5px]">
        {coverage.map((d) => (
          <li key={d.name} className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-ink-500">
              <span
                className="inline-block h-1.5 w-1.5 rounded-sm"
                style={{ background: d.color }}
              />
              {d.name}
            </span>
            <span className="font-semibold tabular-nums text-ink-900">
              {d.value}%
            </span>
          </li>
        ))}
      </ul>
    </CardWrap>
  );
}

/* ──────────────────────── Knowledge Transfer ──────────────────────────── */

function KnowledgeTransferCard() {
  return (
    <CardWrap>
      <header className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-ink-500">
          Knowledge Transfer
        </p>
        <button className="text-ink-300 hover:text-ink-700">
          <MoreHorizontal size={14} />
        </button>
      </header>

      <div className="mt-4 flex items-center justify-between gap-2">
        <ExpertChip name="Sarah Chen" role="Eng" />
        <span className="rounded-full bg-[#F4F4F1] p-1 text-ink-400">
          <ChevronRight size={12} />
        </span>
        <ExpertChip name="Renee Kim" role="Eng" />
      </div>

      <div className="mt-4 space-y-2">
        <Row label="Patterns matched" value="34 / 47" />
        <Row label="Open gaps" value="13" />
        <Row label="Confidence" value="78%" />
      </div>

      <button className="mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-ink-900 py-2 text-[12px] font-semibold text-white hover:bg-black">
        <Play size={11} />
        Run gap session
      </button>
    </CardWrap>
  );
}

function ExpertChip({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#EFEEEA] bg-[#FBFBF9] p-2">
      <Avatar name={name} size="xs" />
      <div className="min-w-0">
        <p className="truncate text-[11.5px] font-semibold text-ink-900">
          {name.split(' ')[0]}
        </p>
        <p className="text-[10px] text-ink-400">{role}</p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-[11.5px]">
      <span className="text-ink-500">{label}</span>
      <span className="font-semibold tabular-nums text-ink-900">{value}</span>
    </div>
  );
}

// Suppress unused-warning for icons exported from lucide we may later use
void Brain;
void ArrowDownRight;
void Sparkles;
