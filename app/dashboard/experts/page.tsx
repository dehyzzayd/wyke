'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, Plus, Search } from 'lucide-react';
import { Topbar } from '@/components/dashboard/topbar';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { experts, type Department, type ExpertStatus } from '@/lib/mock-data';

const statusTone: Record<ExpertStatus, 'green' | 'amber' | 'neutral'> = {
  'Twin Active': 'green',
  'In Progress': 'amber',
  Pending: 'neutral',
};

const departments: ('All' | Department)[] = [
  'All',
  'Engineering',
  'Sales',
  'Product',
  'Design',
  'Finance',
];

export default function ExpertsPage() {
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState<(typeof departments)[number]>('All');

  const filtered = useMemo(() => {
    return experts.filter((e) => {
      const matchesQ =
        !query ||
        e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.role.toLowerCase().includes(query.toLowerCase());
      const matchesD = dept === 'All' || e.department === dept;
      return matchesQ && matchesD;
    });
  }, [query, dept]);

  return (
    <>
      <div className="px-4 lg:px-6">
        <Topbar
          title="Expert Profiles"
          subtitle="Everyone whose expertise we’re actively preserving."
        />
      </div>

      <main className="px-4 pb-8 pt-3 lg:px-6">
        <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 sm:max-w-sm">
              <Search
                size={13}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search experts by name or role…"
                className="w-full rounded-lg border border-[#EBEAE6] bg-white py-2 pl-8 pr-3 text-[12.5px] focus:border-ink-700 focus:outline-none focus:ring-2 focus:ring-ink-100"
              />
            </div>

            <div className="relative">
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value as Department | 'All')}
                className="appearance-none rounded-lg border border-[#EBEAE6] bg-white py-2 pl-3 pr-8 text-[12.5px] text-ink-700 focus:border-ink-700 focus:outline-none focus:ring-2 focus:ring-ink-100"
              >
                {departments.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-400"
              />
            </div>
          </div>

          <button className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-ink-900 px-3.5 py-2 text-[12.5px] font-medium text-white transition-colors hover:bg-black">
            <Plus size={13} strokeWidth={2} />
            Add expert
          </button>
        </div>

        <section className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((e) => (
            <article
              key={e.id}
              className="group rounded-xl border border-[#EBEAE6] bg-white p-5 transition-shadow hover:shadow-card"
            >
              <header className="flex items-start gap-3.5">
                <Avatar name={e.name} size="lg" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[15px] font-semibold text-ink-900">
                    {e.name}
                  </h3>
                  <p className="mt-0.5 truncate text-[12px] text-ink-400">
                    {e.role} · {e.department}
                  </p>
                </div>
                <Badge tone={statusTone[e.status]}>
                  {e.status === 'Twin Active' && (
                    <span className="h-1 w-1 rounded-full bg-[#0F766E]" />
                  )}
                  {e.status === 'In Progress' && (
                    <span className="h-1 w-1 rounded-full bg-[#B45309]" />
                  )}
                  {e.status}
                </Badge>
              </header>

              <ul className="mt-5 grid grid-cols-3 gap-3 border-y border-[#F0EFEB] py-4">
                <Stat label="Sessions" value={String(e.sessions)} />
                <Stat label="Insights" value={String(e.insights)} />
                <Stat label="Depth" value={`${e.depth}%`} />
              </ul>

              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] text-ink-400">
                  <span className="uppercase tracking-wider">
                    Knowledge Coverage
                  </span>
                  <span className="font-semibold tabular-nums text-ink-700">
                    {e.depth}%
                  </span>
                </div>
                <Progress className="mt-2" value={e.depth} />
              </div>

              <div className="mt-5 flex items-center justify-end gap-1">
                <button className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-ink-500 hover:bg-[#F6F6F4] hover:text-ink-900">
                  Start Session
                </button>
                <button
                  disabled={e.status !== 'Twin Active'}
                  className="rounded-lg bg-ink-900 px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-black disabled:bg-[#EFEEEA] disabled:text-ink-300"
                >
                  View Twin
                </button>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-[#EBEAE6] bg-white p-12 text-center text-ink-400">
              No experts match your filters.
            </div>
          )}
        </section>
      </main>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <li>
      <p className="text-[10px] uppercase tracking-wider text-ink-400">
        {label}
      </p>
      <p className="mt-1 text-[15px] font-semibold tabular-nums text-ink-900">
        {value}
      </p>
    </li>
  );
}
