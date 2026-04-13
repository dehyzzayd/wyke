'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Topbar } from '@/components/dashboard/topbar';
import { departmentCoverage, sessionsTrend } from '@/lib/mock-data';

export default function AnalyticsPage() {
  return (
    <>
      <div className="px-4 lg:px-6">
        <Topbar
          title="Analytics"
          subtitle="Capture rate, query volume and coverage trends."
        />
      </div>
      <main className="px-4 pb-8 pt-3 lg:px-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Panel title="Sessions per day" subtitle="Rolling 30 days">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={sessionsTrend}>
                <defs>
                  <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#F1F5F9" vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8', fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8', fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #F1F5F9',
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stroke="#2563EB"
                  fill="url(#ag)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Department coverage" subtitle="% of critical roles captured">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={departmentCoverage}>
                <CartesianGrid stroke="#F1F5F9" vertical={false} />
                <XAxis
                  dataKey="dept"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8', fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8', fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #F1F5F9',
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="coverage" radius={[8, 8, 0, 0]}>
                  {departmentCoverage.map((d, i) => (
                    <Cell
                      key={d.dept}
                      fill={
                        i === 0
                          ? '#2563EB'
                          : i === 1
                            ? '#3B82F6'
                            : i === 2
                              ? '#60A5FA'
                              : '#93C5FD'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Panel>
        </div>
      </main>
    </>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-surface-100 bg-white p-7">
      <header>
        <h2 className="text-[15px] font-bold text-ink-900">{title}</h2>
        <p className="mt-1 text-[12.5px] text-ink-400">{subtitle}</p>
      </header>
      <div className="mt-4">{children}</div>
    </section>
  );
}
