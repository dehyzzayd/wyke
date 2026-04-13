'use client';

import { useState } from 'react';
import { Topbar } from '@/components/dashboard/topbar';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const sections = [
  { id: 'profile', label: 'Profile' },
  { id: 'workspace', label: 'Workspace' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'billing', label: 'Billing' },
];

export default function SettingsPage() {
  const [active, setActive] = useState('profile');

  return (
    <>
      <div className="px-4 lg:px-6">
        <Topbar
          title="Settings"
          subtitle="Profile, workspace, integrations and billing."
        />
      </div>
      <main className="px-4 pb-8 pt-3 lg:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
          <nav className="space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  'w-full rounded-xl px-4 py-2.5 text-left text-[14px] transition-colors',
                  active === s.id
                    ? 'bg-brand-50 text-brand-600 font-medium'
                    : 'text-ink-500 hover:bg-white hover:text-ink-900'
                )}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <section className="rounded-2xl border border-surface-100 bg-white p-8">
            <header>
              <h2 className="text-[18px] font-bold text-ink-900">
                Profile information
              </h2>
              <p className="mt-1 text-[13px] text-ink-400">
                This is how teammates and twins identify your queries.
              </p>
            </header>

            <div className="mt-7 flex items-center gap-5">
              <Avatar name="Zayd K" size="xl" />
              <div>
                <p className="text-[14px] font-semibold text-ink-900">Zayd K</p>
                <p className="text-[12.5px] text-ink-400">
                  PM · Document Management Systems
                </p>
                <button className="mt-2 rounded-full border border-surface-200 px-3 py-1.5 text-[12px] font-medium text-ink-700 hover:bg-surface-50">
                  Replace photo
                </button>
              </div>
            </div>

            <form
              className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Field label="Full name" defaultValue="Zayd K" />
              <Field label="Work email" defaultValue="zayd@dms.example" />
              <Field label="Title" defaultValue="Product Manager" />
              <Field label="Team" defaultValue="DMS Core" />
            </form>

            <div className="mt-8 flex justify-end gap-2">
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
              <Button variant="accent" size="sm">
                Save changes
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function Field({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-[12.5px] font-medium text-ink-500">{label}</span>
      <Input className="mt-1.5" defaultValue={defaultValue} />
    </label>
  );
}
