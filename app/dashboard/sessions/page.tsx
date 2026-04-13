'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Download,
  FileText,
  Network,
  Sparkles,
  X,
} from 'lucide-react';
import { Topbar } from '@/components/dashboard/topbar';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  experts,
  sessions,
  type Expert,
  type Session,
  type SessionStatus,
} from '@/lib/mock-data';

const tabs: ('All' | SessionStatus)[] = [
  'All',
  'In Progress',
  'Completed',
  'Scheduled',
];

const statusTone: Record<SessionStatus, 'amber' | 'green' | 'brand'> = {
  'In Progress': 'amber',
  Completed: 'green',
  Scheduled: 'brand',
};

function expertOf(id: string) {
  return experts.find((e) => e.id === id)!;
}

function fmtTime(iso: string) {
  if (!iso || iso === '—') return '—';
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function SessionsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('All');
  const [open, setOpen] = useState<Session | null>(null);

  const list = useMemo(
    () => (tab === 'All' ? sessions : sessions.filter((s) => s.status === tab)),
    [tab]
  );

  return (
    <>
      <div className="px-4 lg:px-6">
        <Topbar
          title="Knowledge Sessions"
          subtitle="Every interview, in flight or scheduled."
        />
      </div>

      <main className="px-4 pb-8 pt-3 lg:px-6">
        {/* Tabs */}
        <div className="scrollbar-none inline-flex max-w-full overflow-x-auto rounded-lg border border-[#EBEAE6] bg-white p-1">
          {tabs.map((t) => {
            const active = t === tab;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`shrink-0 whitespace-nowrap rounded-md px-3 py-1 text-[12px] font-medium transition-all ${
                  active
                    ? 'bg-ink-900 text-white'
                    : 'text-ink-400 hover:text-ink-900'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Header row */}
        <div className="mt-6 hidden grid-cols-[2fr_1.2fr_1.4fr_0.8fr_1fr_1fr_0.8fr] items-center gap-4 px-6 text-[11px] font-semibold uppercase tracking-wider text-ink-300 lg:grid">
          <span>Expert</span>
          <span>Session Type</span>
          <span>Started</span>
          <span>Duration</span>
          <span>Depth</span>
          <span>Status</span>
          <span className="text-right">Action</span>
        </div>

        {/* Rows */}
        <ul className="mt-3 space-y-2">
          {list.map((s) => {
            const e = expertOf(s.expertId);
            return (
              <li
                key={s.id}
                className="rounded-xl border border-[#EBEAE6] bg-white p-4 sm:px-5 sm:py-3.5"
              >
                {/* ── Mobile card ─────────────────────────────── */}
                <div className="lg:hidden">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar name={e.name} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-semibold text-ink-900">
                          {e.name}
                        </p>
                        <p className="truncate text-[11.5px] text-ink-400">
                          {e.role}
                        </p>
                      </div>
                    </div>
                    <Badge tone={statusTone[s.status]}>
                      {s.status === 'In Progress' && (
                        <span className="h-1 w-1 rounded-full bg-[#B45309]" />
                      )}
                      {s.status === 'Completed' && (
                        <span className="h-1 w-1 rounded-full bg-[#0F766E]" />
                      )}
                      {s.status}
                    </Badge>
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11.5px] text-ink-500">
                    <span className="text-ink-700">{s.type}</span>
                    <span className="text-ink-300">·</span>
                    <span>
                      {s.status === 'Scheduled'
                        ? `Scheduled · ${fmtTime(s.startedAt)}`
                        : fmtTime(s.startedAt)}
                    </span>
                    {s.durationMin > 0 && (
                      <>
                        <span className="text-ink-300">·</span>
                        <span className="tabular-nums">{s.durationMin}m</span>
                      </>
                    )}
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <Progress value={s.depth} className="flex-1" />
                    <span className="text-[11.5px] font-medium tabular-nums text-ink-700">
                      {s.depth}%
                    </span>
                    <button
                      onClick={() =>
                        s.status === 'Completed' ? setOpen(s) : null
                      }
                      disabled={s.status !== 'Completed'}
                      className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-medium text-ink-700 hover:bg-[#F6F6F4] hover:text-ink-900 disabled:cursor-not-allowed disabled:text-ink-300 disabled:hover:bg-transparent"
                    >
                      View
                      <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>

                {/* ── Desktop row (lg+) ───────────────────────── */}
                <div className="hidden items-center gap-4 lg:grid lg:grid-cols-[2fr_1.2fr_1.4fr_0.8fr_1fr_1fr_0.8fr]">
                  <div className="flex items-center gap-3">
                    <Avatar name={e.name} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-ink-900">
                        {e.name}
                      </p>
                      <p className="truncate text-[11.5px] text-ink-400">
                        {e.role}
                      </p>
                    </div>
                  </div>
                  <span className="text-[13px] text-ink-700">{s.type}</span>
                  <span className="text-[13px] text-ink-500">
                    {s.status === 'Scheduled'
                      ? `Scheduled · ${fmtTime(s.startedAt)}`
                      : fmtTime(s.startedAt)}
                  </span>
                  <span className="text-[13px] text-ink-500 tabular-nums">
                    {s.durationMin > 0 ? `${s.durationMin}m` : '—'}
                  </span>
                  <div className="flex items-center gap-2">
                    <Progress value={s.depth} className="max-w-[120px]" />
                    <span className="text-[12px] tabular-nums text-ink-500">
                      {s.depth}%
                    </span>
                  </div>
                  <Badge tone={statusTone[s.status]}>
                    {s.status === 'In Progress' && (
                      <span className="h-1 w-1 rounded-full bg-[#B45309]" />
                    )}
                    {s.status === 'Completed' && (
                      <span className="h-1 w-1 rounded-full bg-[#0F766E]" />
                    )}
                    {s.status}
                  </Badge>
                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        s.status === 'Completed' ? setOpen(s) : null
                      }
                      disabled={s.status !== 'Completed'}
                      className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[12px] font-medium text-ink-700 hover:bg-[#F6F6F4] hover:text-ink-900 disabled:cursor-not-allowed disabled:text-ink-300 disabled:hover:bg-transparent"
                    >
                      View
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </main>

      <SessionPanel session={open} expertOf={expertOf} onClose={() => setOpen(null)} />
    </>
  );
}

function SessionPanel({
  session,
  expertOf,
  onClose,
}: {
  session: Session | null;
  expertOf: (id: string) => Expert;
  onClose: () => void;
}) {
  const open = !!session;
  return (
    <AnimatePresence>
      {open && session && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink-900/40"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[600px] flex-col overflow-y-auto bg-white shadow-2xl"
          >
            <header className="flex items-start justify-between border-b border-surface-100 p-7">
              <div className="flex items-center gap-3">
                <Avatar name={expertOf(session.expertId).name} size="lg" />
                <div>
                  <p className="text-[16px] font-bold text-ink-900">
                    {expertOf(session.expertId).name}
                  </p>
                  <p className="text-[12.5px] text-ink-400">
                    {session.type} · {session.durationMin}m · Depth {session.depth}%
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-ink-400 hover:bg-surface-50 hover:text-ink-900"
              >
                <X size={18} />
              </button>
            </header>

            <section className="space-y-7 p-7">
              <div>
                <h3 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-ink-400">
                  <FileText size={13} />
                  Transcript Highlights
                </h3>
                <div className="mt-3 space-y-4 text-[14px] leading-[1.7] text-ink-700">
                  <QA
                    q="Walk me through how you decided on the read replica topology."
                    a="I started from the failure mode I was scared of — a regional outage during a write spike. The naive answer was multi-master, but I'd been burned by split-brain before. So I worked backward from 'what gets paged at 3am' and landed on read replicas with a single primary. The cost is write latency. The win is that nobody on call has to think on a Sunday."
                  />
                  <QA
                    q="What would you change about that decision today?"
                    a="I'd push for a managed failover service rather than the script we wrote. The script worked twice and then drifted. The lesson isn't 'don't write scripts' — it's 'don't keep operational scripts that only run quarterly.' They rot silently."
                  />
                  <QA
                    q="If a junior engineer inherits this, what's the trap?"
                    a="They will assume the read replicas are eventually consistent within seconds. They are — except for the bulk reindex job, which can push lag to 4 minutes. That detail is in nobody's runbook because I never wrote it down. Now you have it."
                  />
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-ink-400">
                  <Sparkles size={13} />
                  Top Insights Extracted
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {[
                    'Bias toward boring tech for stateful systems',
                    'Operational scripts must run weekly or be deleted',
                    'Read-replica lag spikes are tied to bulk reindex windows',
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 rounded-xl border border-surface-100 bg-surface-50 p-3.5 text-[13.5px] text-ink-700"
                    >
                      <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-ink-400">
                  <Network size={13} />
                  Knowledge Graph Preview
                </h3>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    'Reliability',
                    'Vendor Choice',
                    'On-call Habits',
                    'Schema Design',
                    'Cost Tradeoffs',
                    'Postmortems',
                  ].map((node, i) => (
                    <div
                      key={node}
                      className={`rounded-xl border px-3 py-3 text-center text-[12.5px] font-medium ${
                        i % 2 === 0
                          ? 'border-brand-200 bg-brand-50 text-brand-700'
                          : 'border-surface-100 bg-white text-ink-700'
                      }`}
                    >
                      {node}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <footer className="mt-auto flex items-center justify-between gap-3 border-t border-surface-100 bg-surface-50 p-5">
              <p className="text-[12px] text-ink-400">
                Exports respect SOC 2 audit trails.
              </p>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-full border border-surface-200 bg-white px-3.5 py-2 text-[12.5px] font-medium text-ink-700 hover:bg-surface-100">
                  <Download size={13} />
                  PDF
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-3.5 py-2 text-[12.5px] font-medium text-white hover:bg-ink-700">
                  <Download size={13} />
                  Markdown
                </button>
              </div>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-surface-100 bg-surface-50 p-5">
      <p className="text-[12.5px] font-semibold uppercase tracking-wider text-brand-600">
        Interviewer
      </p>
      <p className="mt-1.5 text-[14px] text-ink-900">{q}</p>
      <p className="mt-4 text-[12.5px] font-semibold uppercase tracking-wider text-ink-400">
        Expert
      </p>
      <p className="mt-1.5 text-[14px] text-ink-700">{a}</p>
    </div>
  );
}
