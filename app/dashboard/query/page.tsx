'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUp,
  Bookmark,
  Brain,
  Copy,
  Lightbulb,
  RotateCcw,
  Search,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  type LucideIcon,
} from 'lucide-react';
import { Topbar } from '@/components/dashboard/topbar';
import { Avatar } from '@/components/ui/avatar';
import {
  experts,
  insights,
  mockChat,
  queryableExperts,
  type ChatMessage,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────────────────────────────────── */

const expertiseTags: Record<string, string[]> = {
  'sarah-chen': ['Architecture', 'Reliability', 'Schema Design'],
  'priya-nair': ['Product Strategy', 'Retention', 'Roadmapping'],
  'james-obi': ['DevOps', 'Incident Response', 'Deploy Pipelines'],
  'dev-patel': ['Data Layer', 'Consistency', 'Migrations'],
};

const suggestionsByExpert: Record<string, string[]> = {
  'sarah-chen': [
    'Why did we pick PostgreSQL over MongoDB?',
    'What’s your bar for adopting a new vendor?',
    'When should we split a service vs. extend it?',
  ],
  'priya-nair': [
    'How do you decide what to kill from the roadmap?',
    'What metric tells you a feature is failing fast?',
    'Why was the 2021 onboarding rewrite about trust, not UX?',
  ],
  'james-obi': [
    'Why is Friday afternoon deploys a bad idea here?',
    'What pre-flight check do you actually trust?',
    'Who should own the runbook for the auth service?',
  ],
  'dev-patel': [
    'When is eventual consistency safe?',
    'Why do you treat the write path as a contract?',
    'What schema change would you reject in review?',
  ],
};

const thinkingPhases = [
  { label: 'Recalling related sessions', delay: 350 },
  { label: 'Matching reasoning patterns', delay: 700 },
  { label: 'Composing response', delay: 950 },
];

/* ────────────────────────────────────────────────────────────────────────── */

type EnrichedMessage = ChatMessage & {
  citations?: { type: string; title: string }[];
  confidence?: number;
};

const seedChat: EnrichedMessage[] = mockChat.map((m, i) =>
  m.from === 'twin'
    ? {
        ...m,
        confidence: 91 - i,
        citations: insights.slice(i, i + 2).map((ins) => ({
          type: ins.type,
          title: ins.title,
        })),
      }
    : m
);

/* ────────────────────────────────────────────────────────────────────────── */

export default function QueryPage() {
  const [activeId, setActiveId] = useState(queryableExperts[0].id);
  const [filter, setFilter] = useState('');
  const [conversations, setConversations] = useState<
    Record<string, EnrichedMessage[]>
  >({
    [queryableExperts[0].id]: seedChat,
  });
  const [draft, setDraft] = useState('');
  const [thinkingIdx, setThinkingIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const expert = experts.find((e) => e.id === activeId)!;
  const messages = conversations[activeId] ?? [];
  const tags = expertiseTags[activeId] ?? [];
  const suggestions = suggestionsByExpert[activeId] ?? [];

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, thinkingIdx]);

  const filteredExperts = useMemo(
    () =>
      queryableExperts.filter(
        (e) =>
          !filter ||
          e.name.toLowerCase().includes(filter.toLowerCase()) ||
          e.role.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter]
  );

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setDraft('');

    const userMsg: EnrichedMessage = {
      id: 'u-' + Date.now(),
      from: 'user',
      text: t,
      timestamp: nowTime(),
    };
    setConversations((c) => ({
      ...c,
      [activeId]: [...(c[activeId] ?? []), userMsg],
    }));

    // Multi-phase "thinking"
    setThinkingIdx(0);
    thinkingPhases.forEach((p, idx) => {
      setTimeout(() => setThinkingIdx(idx), p.delay);
    });

    setTimeout(() => {
      setThinkingIdx(-1);
      const reply: EnrichedMessage = {
        id: 't-' + Date.now(),
        from: 'twin',
        text:
          "Good question — and the framing matters. The pattern I'd point to first is the one that bit us in 2022: every time a decision feels obvious in the moment, it's because we're under-weighting the operational tail. I'd push back on the assumption that the cheapest path is the safest, and I'd want to see who carries the pager when this breaks before signing off.",
        timestamp: nowTime(),
        confidence: 88,
        citations: [
          {
            type: 'Decision Heuristic',
            title: 'Choose boring tech for stateful systems',
          },
          {
            type: 'Risk Pattern',
            title: 'Schema drift between staging and prod precedes 70% of P1s',
          },
        ],
      };
      setConversations((c) => ({
        ...c,
        [activeId]: [...(c[activeId] ?? []), reply],
      }));
    }, 1500);
  };

  const reset = () => {
    setConversations((c) => ({ ...c, [activeId]: [] }));
    setThinkingIdx(-1);
  };

  return (
    <>
      <div className="px-4 lg:px-6">
        <Topbar
          title="Query a Twin"
          subtitle="Ask your team’s extracted experts. Responses reflect captured patterns."
        />
      </div>

      <div className="px-4 pb-4 pt-3 lg:px-6">
        <div className="grid h-[calc(100vh-7.5rem)] grid-cols-1 gap-3 overflow-hidden rounded-2xl border border-[#E6E5E0] bg-white md:grid-cols-[280px_1fr]">
          {/* ─── LEFT — twin picker ─────────────────────────── */}
          <aside className="hidden flex-col border-r border-[#EFEEEA] md:flex">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-[13px] font-semibold text-ink-900">
                  Active Twins
                </h2>
                <span className="rounded-full bg-[#F4F4F1] px-2 py-0.5 text-[10.5px] font-medium text-ink-500">
                  {queryableExperts.length}
                </span>
              </div>

              <div className="relative mt-3">
                <Search
                  size={12}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300"
                />
                <input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Find a twin…"
                  className="w-full rounded-lg border border-[#E6E5E0] bg-[#FBFBF9] py-1.5 pl-7 pr-3 text-[12px] text-ink-700 placeholder:text-ink-300 focus:border-ink-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ink-100"
                />
              </div>
            </div>

            <ul className="flex-1 overflow-y-auto px-3 pb-3">
              {filteredExperts.map((e) => {
                const active = e.id === activeId;
                return (
                  <li key={e.id}>
                    <button
                      onClick={() => setActiveId(e.id)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors',
                        active
                          ? 'bg-[#F4F4F1]'
                          : 'hover:bg-[#FBFBF9]'
                      )}
                    >
                      <span className="relative">
                        <Avatar name={e.name} size="md" />
                        <span className="absolute -bottom-0.5 -right-0.5 inline-flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-[#22A06B]" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-semibold text-ink-900">
                          {e.name}
                        </p>
                        <p className="truncate text-[11px] text-ink-400">
                          {e.role}
                        </p>
                      </div>
                      {active && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-900">
                          ●
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}

              {filteredExperts.length === 0 && (
                <li className="px-3 py-6 text-center text-[12px] text-ink-400">
                  No twins match “{filter}”.
                </li>
              )}
            </ul>

            <div className="border-t border-[#EFEEEA] p-3">
              <div className="rounded-xl bg-[#FBFBF9] p-3">
                <div className="flex items-center gap-2 text-ink-700">
                  <Lightbulb size={13} />
                  <p className="text-[12px] font-semibold">Did you know?</p>
                </div>
                <p className="mt-1.5 text-[11.5px] leading-snug text-ink-500">
                  Every answer cites the underlying patterns it drew from.
                  Click a citation to open the source insight.
                </p>
              </div>
            </div>
          </aside>

          {/* ─── RIGHT — conversation ───────────────────────── */}
          <section className="flex min-h-0 flex-col bg-[#FBFBF9]">
            {/* Twin header */}
            <header className="flex flex-wrap items-start justify-between gap-3 border-b border-[#EFEEEA] bg-white px-6 py-5">
              <div className="flex items-start gap-4">
                <span className="relative shrink-0">
                  <Avatar name={expert.name} size="xl" />
                  <span className="absolute -bottom-0.5 -right-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-[#22A06B]" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[16px] font-semibold text-ink-900">
                      {expert.name}
                    </h2>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#E6E5E0] bg-white px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-ink-500">
                      <Sparkles size={9} className="text-ink-400" />
                      Twin
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-ink-400">
                    {expert.role} · {expert.insights} insights · last interview 2 days ago
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full bg-[#F4F4F1] px-2 py-0.5 text-[10.5px] font-medium text-ink-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6E5E0] bg-white px-2.5 py-1.5 text-[11.5px] font-medium text-ink-500 hover:text-ink-900"
                >
                  <RotateCcw size={11} />
                  Reset
                </button>
              </div>
            </header>

            {/* Conversation */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-7">
              <div className="mx-auto flex max-w-3xl flex-col gap-7">
                {messages.length === 0 && (
                  <EmptyState
                    expertName={expert.name}
                    suggestions={suggestions}
                    onPick={(s) => send(s)}
                  />
                )}

                {messages.map((m) => (
                  <Bubble
                    key={m.id}
                    message={m}
                    expertName={expert.name}
                  />
                ))}

                <AnimatePresence>
                  {thinkingIdx >= 0 && (
                    <Thinking
                      key="thinking"
                      expertName={expert.name}
                      phaseIndex={thinkingIdx}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Suggested follow-ups */}
            {messages.length > 0 && thinkingIdx < 0 && (
              <div className="border-t border-[#EFEEEA] bg-white px-6 py-3">
                <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-1.5">
                  <span className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-300">
                    Try
                  </span>
                  {suggestions.slice(0, 3).map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#E6E5E0] bg-white px-2.5 py-1 text-[11.5px] text-ink-600 transition-colors hover:border-ink-900 hover:text-ink-900"
                    >
                      <Lightbulb size={10} className="text-ink-400" />
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-[#EFEEEA] bg-white px-6 pb-5 pt-4">
              <div className="mx-auto max-w-3xl">
                <div className="flex items-end gap-2 rounded-2xl border border-[#E6E5E0] bg-white p-2 transition-all focus-within:border-ink-700 focus-within:ring-2 focus-within:ring-ink-100">
                  <span className="ml-1.5 mb-2.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#F4F4F1] text-ink-500">
                    <Brain size={13} strokeWidth={1.75} />
                  </span>
                  <textarea
                    rows={1}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onInput={(e) => {
                      const t = e.currentTarget;
                      t.style.height = 'auto';
                      t.style.height = Math.min(t.scrollHeight, 160) + 'px';
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        send(draft);
                      }
                    }}
                    placeholder={`Ask ${expert.name.split(' ')[0]} anything about ${tags[0]?.toLowerCase() ?? 'their work'}…`}
                    className="flex-1 resize-none bg-transparent px-1 py-2 text-[14px] text-ink-900 placeholder:text-ink-300 focus:outline-none"
                  />
                  <button
                    onClick={() => send(draft)}
                    disabled={!draft.trim() || thinkingIdx >= 0}
                    aria-label="Send"
                    className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-ink-900 px-3 text-[12.5px] font-semibold text-white transition-all hover:bg-black disabled:bg-[#E6E5E0] disabled:text-ink-300"
                  >
                    <ArrowUp size={13} strokeWidth={2.5} />
                    Send
                  </button>
                </div>
                <p className="mt-2 px-1 text-[10.5px] text-ink-300">
                  Shift+Enter for new line · Responses reflect extracted patterns, not live data.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */

function nowTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function EmptyState({
  expertName,
  suggestions,
  onPick,
}: {
  expertName: string;
  suggestions: string[];
  onPick: (s: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-[#EFEEEA] bg-white p-7 text-center"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F4F1] text-ink-700">
        <Sparkles size={16} />
      </span>
      <p className="mt-4 text-[14px] font-semibold text-ink-900">
        Start a conversation with {expertName.split(' ')[0]}.
      </p>
      <p className="mx-auto mt-2 max-w-md text-[12.5px] leading-relaxed text-ink-500">
        Ask anything you’d ask in a 1:1. The twin answers in their reasoning
        style and cites the source patterns it drew from.
      </p>
      <div className="mx-auto mt-5 grid max-w-md grid-cols-1 gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onPick(s)}
            className="inline-flex items-center gap-2 rounded-xl border border-[#EFEEEA] bg-[#FBFBF9] px-3.5 py-2.5 text-left text-[12.5px] text-ink-700 transition-colors hover:border-ink-900 hover:bg-white hover:text-ink-900"
          >
            <Lightbulb size={12} className="shrink-0 text-ink-400" />
            {s}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function Thinking({
  expertName,
  phaseIndex,
}: {
  expertName: string;
  phaseIndex: number;
}) {
  const phase = thinkingPhases[Math.min(phaseIndex, thinkingPhases.length - 1)];
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-end gap-2.5"
    >
      <Avatar name={expertName} size="xs" />
      <div className="rounded-2xl rounded-bl-sm border border-[#EFEEEA] bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={phase.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-[11.5px] text-ink-500"
            >
              {phase.label}…
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function Bubble({
  message,
  expertName,
}: {
  message: EnrichedMessage;
  expertName: string;
}) {
  const isUser = message.from === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        'flex w-full items-end gap-2.5',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && <Avatar name={expertName} size="xs" />}
      <div className={cn('max-w-[82%]', isUser ? 'order-first' : '')}>
        {!isUser && (
          <div className="mb-1 flex items-center gap-2 px-1 text-[11px] text-ink-400">
            <span className="font-semibold text-ink-700">{expertName}</span>
            <span className="rounded bg-[#F4F4F1] px-1 py-px text-[9.5px] uppercase tracking-wider">
              Twin
            </span>
            <span>·</span>
            <span>{message.timestamp}</span>
            {message.confidence != null && (
              <>
                <span>·</span>
                <span className="text-[#0F766E] font-medium">
                  {message.confidence}% confidence
                </span>
              </>
            )}
          </div>
        )}

        <div
          className={cn(
            'whitespace-pre-line text-[14px] leading-[1.75]',
            isUser
              ? 'rounded-2xl rounded-br-sm bg-ink-900 px-5 py-3.5 text-white'
              : 'rounded-2xl rounded-bl-sm border border-[#EFEEEA] bg-white px-5 py-4 text-ink-700'
          )}
        >
          {message.text}
        </div>

        {/* Citations */}
        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.citations.map((c) => (
              <button
                key={c.title}
                className="group inline-flex items-center gap-1.5 rounded-md border border-[#EFEEEA] bg-white px-2 py-1 text-[10.5px] text-ink-500 hover:border-ink-300 hover:text-ink-900"
              >
                <span className="text-ink-300 group-hover:text-ink-700">
                  Source ↗
                </span>
                <span className="font-medium text-ink-700">{c.type}:</span>
                <span className="max-w-[200px] truncate">{c.title}</span>
              </button>
            ))}
          </div>
        )}

        {/* Twin actions */}
        {!isUser && (
          <div className="mt-2 flex items-center gap-0.5 text-ink-300">
            <ActionBtn Icon={Copy} label="Copy" />
            <ActionBtn Icon={Bookmark} label="Save" />
            <ActionBtn Icon={ThumbsUp} label="Helpful" />
            <ActionBtn Icon={ThumbsDown} label="Not helpful" />
          </div>
        )}

        {isUser && (
          <p className="mt-1 px-1 text-right text-[11px] text-ink-400">
            {message.timestamp}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function ActionBtn({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <button
      aria-label={label}
      title={label}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-[#F4F4F1] hover:text-ink-700"
    >
      <Icon size={12} strokeWidth={1.75} />
    </button>
  );
}
