'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, ChevronDown, Search } from 'lucide-react';
import { Topbar } from '@/components/dashboard/topbar';
import { Avatar } from '@/components/ui/avatar';
import {
  experts,
  insights,
  insightTypeColor,
  type InsightType,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const TYPES: ('All' | InsightType)[] = [
  'All',
  'Mental Model',
  'Decision Heuristic',
  'Domain Knowledge',
  'Risk Pattern',
  'Relationship Intelligence',
];

export default function InsightsPage() {
  const [type, setType] = useState<(typeof TYPES)[number]>('All');
  const [expertId, setExpertId] = useState<string>('All');
  const [q, setQ] = useState('');
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({
    'in-005': true,
    'in-008': true,
  });

  const filtered = useMemo(() => {
    return insights.filter((i) => {
      const okT = type === 'All' || i.type === type;
      const okE = expertId === 'All' || i.expertId === expertId;
      const okQ =
        !q ||
        i.title.toLowerCase().includes(q.toLowerCase()) ||
        i.body.toLowerCase().includes(q.toLowerCase());
      return okT && okE && okQ;
    });
  }, [type, expertId, q]);

  return (
    <>
      <div className="px-4 lg:px-6">
        <Topbar
          title="Extracted Insights"
          subtitle="Mental models, heuristics and patterns lifted from your experts."
        />
      </div>

      <main className="px-4 pb-8 pt-3 lg:px-6">
        {/* Filters */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-sm">
            <Search
              size={13}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search insights…"
              className="w-full rounded-lg border border-[#EBEAE6] bg-white py-2 pl-8 pr-3 text-[12.5px] focus:border-ink-700 focus:outline-none focus:ring-2 focus:ring-ink-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <FilterSelect
              value={expertId}
              onChange={setExpertId}
              options={[
                { value: 'All', label: 'All experts' },
                ...experts.map((e) => ({ value: e.id, label: e.name })),
              ]}
            />
            <div className="scrollbar-none flex max-w-full items-center gap-0.5 overflow-x-auto rounded-lg border border-[#EBEAE6] bg-white p-1">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={cn(
                    'shrink-0 whitespace-nowrap rounded-md px-2.5 py-1 text-[11.5px] font-medium transition-colors',
                    type === t
                      ? 'bg-ink-900 text-white'
                      : 'text-ink-400 hover:text-ink-900'
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Masonry */}
        <div className="mt-6 columns-1 gap-4 md:columns-2 xl:columns-3">
          {filtered.map((i, idx) => {
            const expert = experts.find((e) => e.id === i.expertId)!;
            const tone = insightTypeColor[i.type];
            const bookmarked = !!bookmarks[i.id];

            return (
              <motion.article
                key={i.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="mb-3 break-inside-avoid rounded-xl border border-[#EBEAE6] bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider">
                    <span className={cn('h-1.5 w-1.5 rounded-full', tone.dot)} />
                    <span className={tone.text}>{i.type}</span>
                  </span>
                  <button
                    aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
                    onClick={() =>
                      setBookmarks((b) => ({ ...b, [i.id]: !b[i.id] }))
                    }
                    className="rounded-md p-1 text-ink-400 hover:bg-[#F6F6F4] hover:text-ink-900"
                  >
                    {bookmarked ? (
                      <BookmarkCheck size={14} className="text-ink-900" />
                    ) : (
                      <Bookmark size={14} />
                    )}
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Avatar name={expert.name} size="xs" />
                  <p className="text-[11.5px] text-ink-400">
                    From {expert.name} · {i.extractedOn}
                  </p>
                </div>

                <h3 className="mt-3 text-[16px] font-bold leading-snug text-ink-900">
                  {i.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.8] text-ink-700">
                  {i.body}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#F0EFEB] pt-3 text-[11px] text-ink-400">
                  <span>Confidence {i.confidence}%</span>
                  <span>{i.queriesUsed} queries</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </main>
    </>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-[#EBEAE6] bg-white py-2 pl-3 pr-8 text-[12px] text-ink-700 focus:border-ink-700 focus:outline-none focus:ring-2 focus:ring-ink-100"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={13}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400"
      />
    </div>
  );
}
