'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Building2,
  Check,
  ChevronRight,
  HelpCircle,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  Sliders,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import {
  experts,
  insights,
  sessions as mockSessions,
  activity,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────────────────────────────────── */

type SearchResult = {
  type: 'expert' | 'session' | 'insight';
  href: string;
  title: string;
  subtitle: string;
};

function buildResults(q: string): SearchResult[] {
  if (!q.trim()) return [];
  const needle = q.toLowerCase();

  const expertHits: SearchResult[] = experts
    .filter(
      (e) =>
        e.name.toLowerCase().includes(needle) ||
        e.role.toLowerCase().includes(needle) ||
        e.department.toLowerCase().includes(needle)
    )
    .slice(0, 4)
    .map((e) => ({
      type: 'expert',
      href: '/dashboard/experts',
      title: e.name,
      subtitle: `${e.role} · ${e.department}`,
    }));

  const insightHits: SearchResult[] = insights
    .filter(
      (i) =>
        i.title.toLowerCase().includes(needle) ||
        i.body.toLowerCase().includes(needle)
    )
    .slice(0, 4)
    .map((i) => ({
      type: 'insight',
      href: '/dashboard/insights',
      title: i.title,
      subtitle: i.type,
    }));

  const sessionHits: SearchResult[] = mockSessions
    .filter((s) => s.type.toLowerCase().includes(needle))
    .slice(0, 3)
    .map((s) => {
      const e = experts.find((x) => x.id === s.expertId)!;
      return {
        type: 'session',
        href: '/dashboard/sessions',
        title: `${e.name} — ${s.type}`,
        subtitle: s.status,
      };
    });

  return [...expertHits, ...insightHits, ...sessionHits];
}

const typeIcon: Record<SearchResult['type'], LucideIcon> = {
  expert: Users,
  session: MessageSquare,
  insight: Sparkles,
};

/* ────────────────────────────────────────────────────────────────────────── */

type Notif = {
  id: string;
  text: string;
  ago: string;
  unread: boolean;
};

const initialNotifs: Notif[] = activity.slice(0, 6).map((a, i) => ({
  id: a.id,
  text: a.text,
  ago: a.ago,
  unread: i < 3,
}));

/* ────────────────────────────────────────────────────────────────────────── */

export function Topbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const router = useRouter();

  // — Search state
  const [q, setQ] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const results = buildResults(q);

  // — Filter popover
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState({
    activeOnly: true,
    last30Days: true,
    pinned: false,
  });

  // — Notifications popover
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const [notifs, setNotifs] = useState<Notif[]>(initialNotifs);
  const unreadCount = notifs.filter((n) => n.unread).length;

  // — Profile menu
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Universal click-outside + Escape to close
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (searchRef.current && !searchRef.current.contains(t)) setSearchOpen(false);
      if (filterRef.current && !filterRef.current.contains(t)) setFilterOpen(false);
      if (notifRef.current && !notifRef.current.contains(t)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(t)) setProfileOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setFilterOpen(false);
        setNotifOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <header className="flex flex-col items-stretch justify-between gap-3 px-1 py-2 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-[18px] font-semibold tracking-[-0.01em] text-ink-900">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-0.5 text-[12.5px] text-ink-400">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* ── Search ─────────────────────────── */}
        <div ref={searchRef} className="relative">
          <Search
            size={13}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300"
          />
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            placeholder="Search anything…"
            className="w-44 sm:w-64 rounded-full border border-[#E6E5E0] bg-white py-2 pl-8 pr-3 text-[12.5px] text-ink-700 placeholder:text-ink-300 focus:border-ink-700 focus:outline-none focus:ring-2 focus:ring-ink-100"
          />

          {searchOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-[380px] max-w-[90vw] overflow-hidden rounded-xl border border-[#E6E5E0] bg-white shadow-[0_18px_48px_-18px_rgba(15,23,42,0.18)]">
              {q.trim() === '' ? (
                <SearchEmpty />
              ) : results.length === 0 ? (
                <p className="p-5 text-center text-[12.5px] text-ink-400">
                  No matches for “{q}”.
                </p>
              ) : (
                <ul className="max-h-[320px] overflow-y-auto py-1">
                  {results.map((r, i) => {
                    const Icon = typeIcon[r.type];
                    return (
                      <li key={i}>
                        <button
                          onClick={() => {
                            router.push(r.href);
                            setSearchOpen(false);
                            setQ('');
                          }}
                          className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-[#FBFBF9]"
                        >
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#F4F4F1] text-ink-500">
                            <Icon size={13} strokeWidth={1.75} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-medium text-ink-900">
                              {r.title}
                            </p>
                            <p className="truncate text-[11.5px] text-ink-400">
                              {r.subtitle}
                            </p>
                          </div>
                          <span className="text-[10.5px] uppercase tracking-wider text-ink-300">
                            {r.type}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
              <div className="flex items-center justify-between border-t border-[#EFEEEA] bg-[#FBFBF9] px-3 py-2 text-[10.5px] text-ink-400">
                <span>
                  Press <kbd className="rounded border border-[#E6E5E0] bg-white px-1">↵</kbd> to open
                </span>
                <span>
                  <kbd className="rounded border border-[#E6E5E0] bg-white px-1">Esc</kbd> to close
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── Filter ─────────────────────────── */}
        <div ref={filterRef} className="relative hidden sm:block">
          <button
            type="button"
            aria-label="Filters"
            aria-expanded={filterOpen}
            onClick={() => setFilterOpen((o) => !o)}
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E6E5E0] bg-white transition-colors',
              filterOpen
                ? 'border-ink-900 text-ink-900'
                : 'text-ink-500 hover:text-ink-900'
            )}
          >
            <Sliders size={14} strokeWidth={1.75} />
          </button>

          {filterOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-[#E6E5E0] bg-white shadow-[0_18px_48px_-18px_rgba(15,23,42,0.18)]">
              <p className="border-b border-[#EFEEEA] px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                Filters
              </p>
              <ul className="p-1.5">
                <FilterToggle
                  label="Active twins only"
                  on={filters.activeOnly}
                  onChange={(v) =>
                    setFilters((f) => ({ ...f, activeOnly: v }))
                  }
                />
                <FilterToggle
                  label="Last 30 days"
                  on={filters.last30Days}
                  onChange={(v) =>
                    setFilters((f) => ({ ...f, last30Days: v }))
                  }
                />
                <FilterToggle
                  label="Pinned items"
                  on={filters.pinned}
                  onChange={(v) => setFilters((f) => ({ ...f, pinned: v }))}
                />
              </ul>
              <div className="flex items-center justify-between border-t border-[#EFEEEA] px-3 py-2.5">
                <button
                  onClick={() =>
                    setFilters({
                      activeOnly: false,
                      last30Days: false,
                      pinned: false,
                    })
                  }
                  className="text-[11.5px] text-ink-400 hover:text-ink-900"
                >
                  Reset
                </button>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="rounded-full bg-ink-900 px-3 py-1 text-[11.5px] font-semibold text-white hover:bg-black"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Settings (link) ─────────────────── */}
        <Link
          href="/dashboard/settings"
          aria-label="Settings"
          className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E6E5E0] bg-white text-ink-500 hover:text-ink-900"
        >
          <Settings size={14} strokeWidth={1.75} />
        </Link>

        {/* ── Notifications ───────────────────── */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={notifOpen}
            onClick={() => setNotifOpen((o) => !o)}
            className={cn(
              'relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E6E5E0] bg-white transition-colors',
              notifOpen
                ? 'border-ink-900 text-ink-900'
                : 'text-ink-500 hover:text-ink-900'
            )}
          >
            <Bell size={14} strokeWidth={1.75} />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-ink-900 px-1 text-[9px] font-semibold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-[340px] max-w-[90vw] overflow-hidden rounded-xl border border-[#E6E5E0] bg-white shadow-[0_18px_48px_-18px_rgba(15,23,42,0.18)]">
              <header className="flex items-center justify-between border-b border-[#EFEEEA] px-4 py-3">
                <p className="text-[13px] font-semibold text-ink-900">
                  Notifications
                </p>
                <button
                  onClick={() =>
                    setNotifs((ns) => ns.map((n) => ({ ...n, unread: false })))
                  }
                  className="text-[11.5px] font-medium text-ink-500 hover:text-ink-900"
                >
                  Mark all read
                </button>
              </header>
              <ul className="max-h-[360px] overflow-y-auto">
                {notifs.map((n) => (
                  <li
                    key={n.id}
                    className="flex items-start gap-3 border-b border-[#F1F0EC] px-4 py-3 last:border-b-0"
                  >
                    <span
                      className={cn(
                        'mt-1 h-1.5 w-1.5 shrink-0 rounded-full',
                        n.unread ? 'bg-ink-900' : 'bg-transparent'
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[12.5px] leading-snug text-ink-700">
                        {n.text}
                      </p>
                      <p className="mt-1 text-[10.5px] text-ink-400">
                        {n.ago}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-[#EFEEEA] bg-[#FBFBF9] px-4 py-2.5 text-center">
                <Link
                  href="#"
                  className="text-[11.5px] font-medium text-ink-700 hover:text-ink-900"
                >
                  View all activity →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── Profile ─────────────────────────── */}
        <div ref={profileRef} className="relative ml-1">
          <button
            type="button"
            aria-label="Account menu"
            aria-expanded={profileOpen}
            onClick={() => setProfileOpen((o) => !o)}
            className={cn(
              'rounded-full transition-shadow',
              profileOpen ? 'ring-2 ring-ink-900 ring-offset-2 ring-offset-[#F2F1ED]' : ''
            )}
          >
            <Avatar
              name="Zayd K"
              size="md"
              toneOverride="bg-ink-900 text-white"
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-[#E6E5E0] bg-white shadow-[0_18px_48px_-18px_rgba(15,23,42,0.18)]">
              <div className="flex items-center gap-3 border-b border-[#EFEEEA] p-4">
                <Avatar
                  name="Zayd K"
                  size="lg"
                  toneOverride="bg-ink-900 text-white"
                />
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-semibold text-ink-900">
                    Zayd K
                  </p>
                  <p className="truncate text-[11.5px] text-ink-400">
                    zayd@dms.example
                  </p>
                </div>
              </div>

              <ul className="p-1.5">
                <ProfileItem Icon={Users} label="View profile" href="/dashboard/settings" onSelect={() => setProfileOpen(false)} />
                <ProfileItem Icon={Settings} label="Settings" href="/dashboard/settings" onSelect={() => setProfileOpen(false)} />
                <ProfileItem Icon={Building2} label="Workspace" href="/dashboard/settings" onSelect={() => setProfileOpen(false)} />
                <ProfileItem Icon={HelpCircle} label="Help & support" href="#" onSelect={() => setProfileOpen(false)} />
              </ul>

              <div className="border-t border-[#EFEEEA] p-1.5">
                <Link
                  href="/"
                  onClick={() => setProfileOpen(false)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[12.5px] text-ink-700 hover:bg-[#F4F4F1]"
                >
                  <LogOut size={14} strokeWidth={1.75} className="text-ink-400" />
                  Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */

function FilterToggle({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <li>
      <button
        onClick={() => onChange(!on)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[12.5px] text-ink-700 hover:bg-[#FBFBF9]"
      >
        {label}
        <span
          className={cn(
            'inline-flex h-4 w-4 items-center justify-center rounded border transition-colors',
            on
              ? 'border-ink-900 bg-ink-900 text-white'
              : 'border-[#D4D3CE] bg-white'
          )}
        >
          {on && <Check size={11} strokeWidth={3} />}
        </span>
      </button>
    </li>
  );
}

function ProfileItem({
  Icon,
  label,
  href,
  onSelect,
}: {
  Icon: LucideIcon;
  label: string;
  href: string;
  onSelect: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onSelect}
        className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[12.5px] text-ink-700 hover:bg-[#F4F4F1]"
      >
        <Icon size={14} strokeWidth={1.75} className="text-ink-400 group-hover:text-ink-900" />
        <span className="flex-1">{label}</span>
        <ChevronRight size={12} className="text-ink-300" />
      </Link>
    </li>
  );
}

function SearchEmpty() {
  const examples = [
    { label: 'Sarah Chen', kind: 'expert' as const },
    { label: 'PostgreSQL decision', kind: 'insight' as const },
    { label: 'Deep Dive sessions', kind: 'session' as const },
  ];
  return (
    <div className="p-4">
      <p className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
        Try searching for
      </p>
      <ul className="mt-2 space-y-1">
        {examples.map((e) => {
          const Icon = typeIcon[e.kind];
          return (
            <li
              key={e.label}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px] text-ink-500"
            >
              <Icon size={13} strokeWidth={1.75} className="text-ink-300" />
              {e.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
