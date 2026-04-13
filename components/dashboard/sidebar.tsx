'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  ChevronsUpDown,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type NavItem = { href: string; label: string; Icon: LucideIcon };

const main: NavItem[] = [
  { href: '/dashboard', label: 'Overview', Icon: LayoutDashboard },
  { href: '/dashboard/experts', label: 'Experts', Icon: Users },
  { href: '/dashboard/sessions', label: 'Sessions', Icon: MessageSquare },
  { href: '/dashboard/insights', label: 'Insights', Icon: Sparkles },
  { href: '/dashboard/query', label: 'Query Twin', Icon: Search },
  { href: '/dashboard/analytics', label: 'Analytics', Icon: BarChart3 },
];

const prefs: NavItem[] = [
  { href: '/dashboard/settings', label: 'Settings', Icon: Settings },
  { href: '#', label: 'Help Center', Icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-3 left-3 z-30 hidden w-60 flex-col rounded-2xl border border-[#E6E5E0] bg-white lg:flex lg:inset-y-4 lg:left-4">
      {/* Logo */}
      <div className="flex h-14 items-center px-5">
        <Logo size="sm" />
      </div>

      {/* Workspace switcher */}
      <div className="mx-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl border border-[#E6E5E0] bg-[#FBFBF9] p-2.5 text-left transition-colors hover:border-ink-200"
        >
          <Avatar name="Zayd K" size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-semibold text-ink-900">
              Zayd K
            </p>
            <p className="truncate text-[10.5px] text-ink-400">
              Personal workspace
            </p>
          </div>
          <ChevronsUpDown size={13} className="text-ink-300" />
        </button>
      </div>

      {/* Main menu */}
      <nav className="mt-5 flex-1 px-3">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-300">
          Main menu
        </p>
        <ul className="mt-2 space-y-0.5">
          {main.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-colors',
                    active
                      ? 'bg-ink-900 text-white font-medium'
                      : 'text-ink-500 hover:bg-[#F4F4F1] hover:text-ink-900'
                  )}
                >
                  <item.Icon
                    size={15}
                    strokeWidth={1.75}
                    className={
                      active
                        ? 'text-white'
                        : 'text-ink-400 group-hover:text-ink-900'
                    }
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-300">
          Preference
        </p>
        <ul className="mt-2 space-y-0.5">
          {prefs.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '#' && pathname.startsWith(item.href));
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-colors',
                    active
                      ? 'bg-ink-900 text-white font-medium'
                      : 'text-ink-500 hover:bg-[#F4F4F1] hover:text-ink-900'
                  )}
                >
                  <item.Icon
                    size={15}
                    strokeWidth={1.75}
                    className={
                      active
                        ? 'text-white'
                        : 'text-ink-400 group-hover:text-ink-900'
                    }
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Upgrade promo */}
      <div className="m-3 overflow-hidden rounded-xl bg-ink-900 p-4 text-white">
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-white/80" />
          <p className="text-[12px] font-semibold">Upgrade to Scale</p>
        </div>
        <p className="mt-2 text-[11.5px] leading-snug text-white/65">
          Unlock 15 expert profiles, API access and team analytics.
        </p>
        <Link
          href="#"
          className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-white py-1.5 text-[12px] font-semibold text-ink-900 hover:bg-white/95"
        >
          Upgrade plan
        </Link>
      </div>
    </aside>
  );
}
