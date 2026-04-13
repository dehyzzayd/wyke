// Centralized mock data for the WYKE prototype.
// Internally consistent: experts, sessions, insights, queries, and activity
// all reference the same people and depths.

export type Department =
  | 'Engineering'
  | 'Sales'
  | 'Product'
  | 'Design'
  | 'Finance';

export type ExpertStatus = 'Twin Active' | 'In Progress' | 'Pending';

export type Expert = {
  id: string;
  name: string;
  role: string;
  department: Department;
  depth: number; // 0-100
  status: ExpertStatus;
  insights: number;
  sessions: number;
  lastSession: string; // ISO
  tagline: string;
};

export const experts: Expert[] = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Principal Engineer',
    department: 'Engineering',
    depth: 91,
    status: 'Twin Active',
    insights: 847,
    sessions: 3,
    lastSession: '2026-04-11',
    tagline:
      'Owns the core architecture. Made every load-bearing technical decision since 2019.',
  },
  {
    id: 'marcus-webb',
    name: 'Marcus Webb',
    role: 'VP of Sales',
    department: 'Sales',
    depth: 41,
    status: 'In Progress',
    insights: 312,
    sessions: 2,
    lastSession: '2026-04-12',
    tagline:
      'Closed 6 of the 10 largest accounts. Holds the political map of every key buyer.',
  },
  {
    id: 'priya-nair',
    name: 'Priya Nair',
    role: 'Founding PM',
    department: 'Product',
    depth: 100,
    status: 'Twin Active',
    insights: 1204,
    sessions: 5,
    lastSession: '2026-03-29',
    tagline:
      'Made 400+ early product calls on instinct. Knows why every feature exists.',
  },
  {
    id: 'james-obi',
    name: 'James Obi',
    role: 'Lead DevOps',
    department: 'Engineering',
    depth: 67,
    status: 'Twin Active',
    insights: 489,
    sessions: 2,
    lastSession: '2026-04-08',
    tagline:
      'Built the deploy pipeline from scratch. Knows every postmortem by heart.',
  },
  {
    id: 'elena-vasquez',
    name: 'Elena Vasquez',
    role: 'Head of Design',
    department: 'Design',
    depth: 23,
    status: 'Pending',
    insights: 41,
    sessions: 1,
    lastSession: '2026-04-02',
    tagline:
      'Set the design language. Every component pattern traces back to her decisions.',
  },
  {
    id: 'tom-kraft',
    name: 'Tom Kraft',
    role: 'Senior AE',
    department: 'Sales',
    depth: 0,
    status: 'Pending',
    insights: 0,
    sessions: 0,
    lastSession: '—',
    tagline: 'Six years of relationship intelligence with our top 12 accounts.',
  },
  {
    id: 'lisa-park',
    name: 'Lisa Park',
    role: 'Head of Finance',
    department: 'Finance',
    depth: 55,
    status: 'In Progress',
    insights: 198,
    sessions: 2,
    lastSession: '2026-04-09',
    tagline:
      'Authored the unit economics model. Knows every assumption by line item.',
  },
  {
    id: 'dev-patel',
    name: 'Dev Patel',
    role: 'Backend Lead',
    department: 'Engineering',
    depth: 88,
    status: 'Twin Active',
    insights: 612,
    sessions: 3,
    lastSession: '2026-04-10',
    tagline: 'Owns the data layer. Wrote the original consistency model.',
  },
];

export type SessionType =
  | 'Initial Extraction'
  | 'Deep Dive'
  | 'Scenario Probing'
  | 'Gap Fill';

export type SessionStatus = 'In Progress' | 'Completed' | 'Scheduled';

export type Session = {
  id: string;
  expertId: string;
  type: SessionType;
  startedAt: string; // ISO or "Scheduled" date
  durationMin: number;
  depth: number;
  status: SessionStatus;
};

export const sessions: Session[] = [
  {
    id: 'sess-001',
    expertId: 'sarah-chen',
    type: 'Deep Dive',
    startedAt: '2026-04-13T09:14:00Z',
    durationMin: 73,
    depth: 87,
    status: 'In Progress',
  },
  {
    id: 'sess-002',
    expertId: 'marcus-webb',
    type: 'Initial Extraction',
    startedAt: '2026-04-13T08:00:00Z',
    durationMin: 41,
    depth: 41,
    status: 'In Progress',
  },
  {
    id: 'sess-003',
    expertId: 'priya-nair',
    type: 'Gap Fill',
    startedAt: '2026-03-29T10:30:00Z',
    durationMin: 64,
    depth: 100,
    status: 'Completed',
  },
  {
    id: 'sess-004',
    expertId: 'dev-patel',
    type: 'Scenario Probing',
    startedAt: '2026-04-10T14:00:00Z',
    durationMin: 52,
    depth: 88,
    status: 'Completed',
  },
  {
    id: 'sess-005',
    expertId: 'james-obi',
    type: 'Deep Dive',
    startedAt: '2026-04-08T11:15:00Z',
    durationMin: 48,
    depth: 67,
    status: 'Completed',
  },
  {
    id: 'sess-006',
    expertId: 'lisa-park',
    type: 'Initial Extraction',
    startedAt: '2026-04-09T13:45:00Z',
    durationMin: 39,
    depth: 55,
    status: 'Completed',
  },
  {
    id: 'sess-007',
    expertId: 'elena-vasquez',
    type: 'Initial Extraction',
    startedAt: '2026-04-15T15:00:00Z',
    durationMin: 0,
    depth: 0,
    status: 'Scheduled',
  },
  {
    id: 'sess-008',
    expertId: 'tom-kraft',
    type: 'Initial Extraction',
    startedAt: '2026-04-16T10:00:00Z',
    durationMin: 0,
    depth: 0,
    status: 'Scheduled',
  },
];

export type InsightType =
  | 'Mental Model'
  | 'Decision Heuristic'
  | 'Domain Knowledge'
  | 'Risk Pattern'
  | 'Relationship Intelligence';

// Each insight type carries a small accent dot — restrained, monochrome chrome.
export const insightTypeColor: Record<
  InsightType,
  { dot: string; text: string }
> = {
  'Mental Model':            { dot: 'bg-ink-900',   text: 'text-ink-900' },
  'Decision Heuristic':      { dot: 'bg-[#6D28D9]', text: 'text-ink-700' },
  'Domain Knowledge':        { dot: 'bg-[#0F766E]', text: 'text-ink-700' },
  'Risk Pattern':            { dot: 'bg-[#B91C1C]', text: 'text-ink-700' },
  'Relationship Intelligence': { dot: 'bg-[#B45309]', text: 'text-ink-700' },
};

export type Insight = {
  id: string;
  expertId: string;
  type: InsightType;
  title: string;
  body: string;
  confidence: number;
  queriesUsed: number;
  extractedOn: string;
};

export const insights: Insight[] = [
  {
    id: 'in-001',
    expertId: 'sarah-chen',
    type: 'Decision Heuristic',
    title: 'Choose boring tech for stateful systems',
    body:
      'When evaluating any persistence layer, Sarah biases hard toward technologies with at least eight years of production maturity. The reasoning: novel databases optimize for the happy path, but at 3am the happy path does not matter — only the breadth of war stories on the public internet does.',
    confidence: 96,
    queriesUsed: 47,
    extractedOn: '2026-03-22',
  },
  {
    id: 'in-002',
    expertId: 'sarah-chen',
    type: 'Mental Model',
    title: 'Two-axis system maturity grid',
    body:
      'Sarah evaluates services along two axes: write-path complexity and operational age. Anything in the high-complexity / low-age quadrant is treated as a latent incident. This grid is implicit in every architecture review she runs.',
    confidence: 91,
    queriesUsed: 22,
    extractedOn: '2026-03-23',
  },
  {
    id: 'in-003',
    expertId: 'marcus-webb',
    type: 'Relationship Intelligence',
    title: 'Identify the silent blocker before the second meeting',
    body:
      'Marcus maps every enterprise account against three roles: the champion, the economic buyer, and the silent blocker. He has a near-perfect track record of identifying the silent blocker — usually a director-level person who was not in the original RFP — by the second meeting.',
    confidence: 88,
    queriesUsed: 31,
    extractedOn: '2026-04-01',
  },
  {
    id: 'in-004',
    expertId: 'marcus-webb',
    type: 'Decision Heuristic',
    title: 'Walk away when procurement leads',
    body:
      'If procurement is steering the deal before legal has reviewed the MSA, Marcus disqualifies. The pattern: procurement-led deals close 60% slower and renew at half the rate of champion-led deals. He has held this line through three pipeline reviews.',
    confidence: 84,
    queriesUsed: 19,
    extractedOn: '2026-04-02',
  },
  {
    id: 'in-005',
    expertId: 'priya-nair',
    type: 'Mental Model',
    title: 'Features earn their keep through retention, not adoption',
    body:
      'Priya rejects adoption metrics as a proxy for value. A feature only stays in the product if it materially shifts week-4 retention for the cohort that touches it. This explains why she has shipped 40% fewer features than peers — and why her cohorts retain better.',
    confidence: 95,
    queriesUsed: 58,
    extractedOn: '2026-02-14',
  },
  {
    id: 'in-006',
    expertId: 'priya-nair',
    type: 'Domain Knowledge',
    title: 'The 2021 onboarding rewrite was about trust, not UX',
    body:
      'The onboarding flow rewrite in Q3 2021 is widely remembered as a UX project. It was not. Priya pushed it to surface security posture earlier — enterprise prospects were churning during evaluation because the original flow buried SOC 2 details. Knowing this prevents future PMs from gutting the security-forward steps.',
    confidence: 99,
    queriesUsed: 12,
    extractedOn: '2026-02-15',
  },
  {
    id: 'in-007',
    expertId: 'james-obi',
    type: 'Risk Pattern',
    title: 'Friday afternoon deploys correlate with weekend incidents 4:1',
    body:
      'James has tracked every incident since 2020. Deploys shipped after 14:00 local on a Friday produce weekend pages at four times the baseline rate. He has informally enforced a Friday cutoff that is now part of team culture but has never been written down.',
    confidence: 92,
    queriesUsed: 28,
    extractedOn: '2026-03-30',
  },
  {
    id: 'in-008',
    expertId: 'dev-patel',
    type: 'Mental Model',
    title: 'Read paths are products; write paths are contracts',
    body:
      'Dev treats read paths as iterable surface area — they can be reshaped freely. Write paths he treats as contracts: once a column is being written, removing it is a months-long migration. This bias explains the conservative schema design across the data layer.',
    confidence: 93,
    queriesUsed: 34,
    extractedOn: '2026-03-18',
  },
  {
    id: 'in-009',
    expertId: 'dev-patel',
    type: 'Decision Heuristic',
    title: 'Prefer eventual consistency only when humans never observe both states',
    body:
      'Dev only allows eventual consistency between systems where no single user can observe both endpoints inside one session. The instant a UI surface reads from both, he forces a synchronous path. This is the unspoken rule behind the "no async between user-facing reads" lint rule.',
    confidence: 90,
    queriesUsed: 17,
    extractedOn: '2026-03-19',
  },
  {
    id: 'in-010',
    expertId: 'lisa-park',
    type: 'Domain Knowledge',
    title: 'CAC payback model assumes an 18-month gross margin ramp',
    body:
      'Lisa\u2019s CAC payback formula uses a non-obvious 18-month gross margin ramp tied to support cost decay. Anyone replacing this model without that ramp will overstate payback by roughly 4 months and over-spend on growth. The ramp is hard-coded in row 47 of the unit economics workbook.',
    confidence: 97,
    queriesUsed: 9,
    extractedOn: '2026-04-04',
  },
  {
    id: 'in-011',
    expertId: 'sarah-chen',
    type: 'Risk Pattern',
    title: 'Schema drift between staging and prod precedes 70% of P1s',
    body:
      'Sarah has a personal dashboard tracking column-level drift between staging and production. Every P1 of the past two years was preceded by drift that was visible for at least 48 hours. She checks it on Monday mornings — a ritual the team did not know was load-bearing.',
    confidence: 89,
    queriesUsed: 14,
    extractedOn: '2026-04-05',
  },
  {
    id: 'in-012',
    expertId: 'priya-nair',
    type: 'Decision Heuristic',
    title: 'Kill features in the quarter you ship them, not the next one',
    body:
      'Priya rejects the convention of giving a new feature "two quarters to find product-market fit." If a feature is not retaining by week six, she removes it the same quarter. The longer it sits, the more downstream code accretes around it, making removal politically expensive.',
    confidence: 86,
    queriesUsed: 21,
    extractedOn: '2026-03-11',
  },
];

export type RecentQuery = {
  id: string;
  text: string;
  expertId: string;
  askedBy: string;
  askedAgo: string;
};

export const recentQueries: RecentQuery[] = [
  {
    id: 'q-1',
    text: 'Why did we choose PostgreSQL over MongoDB in 2021?',
    expertId: 'sarah-chen',
    askedBy: 'Renee Kim',
    askedAgo: '14 min ago',
  },
  {
    id: 'q-2',
    text: 'How does Sarah evaluate a new infra vendor?',
    expertId: 'sarah-chen',
    askedBy: 'Owen Marsh',
    askedAgo: '38 min ago',
  },
  {
    id: 'q-3',
    text: "What's Marcus's objection handling for enterprise security pushback?",
    expertId: 'marcus-webb',
    askedBy: 'Hana Wright',
    askedAgo: '1 hr ago',
  },
];

export type Activity = {
  id: string;
  text: string;
  ago: string;
  kind: 'session' | 'query' | 'insight' | 'expert';
};

export const activity: Activity[] = [
  { id: 'a-1', text: "Sarah Chen's session reached 87% depth", ago: '2 min ago', kind: 'session' },
  { id: 'a-2', text: "New query answered: 'PostgreSQL decision rationale'", ago: '15 min ago', kind: 'query' },
  { id: 'a-3', text: 'Marcus Webb onboarding session started', ago: '1 hr ago', kind: 'session' },
  { id: 'a-4', text: '12 new insights extracted from Dev Patel', ago: '3 hr ago', kind: 'insight' },
  { id: 'a-5', text: 'Elena Vasquez added as expert (pending first session)', ago: '6 hr ago', kind: 'expert' },
  { id: 'a-6', text: "Priya Nair's twin reached 100% knowledge depth", ago: '1 day ago', kind: 'session' },
  { id: 'a-7', text: "Query: 'How does Lisa model CAC payback?' answered", ago: '1 day ago', kind: 'query' },
  { id: 'a-8', text: 'James Obi insight bookmarked by 4 team members', ago: '2 days ago', kind: 'insight' },
];

// 30-day session activity for AreaChart
export const sessionsTrend = Array.from({ length: 30 }).map((_, i) => {
  const base = 4 + Math.sin(i / 3) * 2 + i * 0.18;
  return {
    day: `D${i + 1}`,
    sessions: Math.max(0, Math.round(base + (i % 5 === 0 ? 3 : 0))),
  };
});

// Sparkline for the dark insights card
export const insightsSparkline = [
  { d: 1, v: 1820 },
  { d: 2, v: 1880 },
  { d: 3, v: 2010 },
  { d: 4, v: 2090 },
  { d: 5, v: 2210 },
  { d: 6, v: 2280 },
  { d: 7, v: 2410 },
  { d: 8, v: 2520 },
  { d: 9, v: 2640 },
  { d: 10, v: 2740 },
  { d: 11, v: 2790 },
  { d: 12, v: 2847 },
];

export const departmentCoverage = [
  { dept: 'Engineering', coverage: 89 },
  { dept: 'Sales', coverage: 67 },
  { dept: 'Product', coverage: 45 },
  { dept: 'Finance', coverage: 23 },
];

export const expertCoverageDonut = [
  { name: 'Engineering', value: 89, color: '#2563EB' },
  { name: 'Sales', value: 67, color: '#10B981' },
  { name: 'Product', value: 45, color: '#F59E0B' },
  { name: 'Finance', value: 23, color: '#EF4444' },
];

// Trust marquee
export const trustedCompanies = [
  'Meridian',
  'Stackflow',
  'Archetype',
  'Novela',
  'Crestline',
  'Paragon',
  'Vestry',
  'Solace',
];

// Hero trust circles
export const heroAvatars = [
  { initials: 'NV', tone: 'bg-[#DBEAFE] text-[#1D4ED8]' },
  { initials: 'TK', tone: 'bg-[#FCE7F3] text-[#BE185D]' },
  { initials: 'SR', tone: 'bg-[#D1FAE5] text-[#047857]' },
  { initials: 'AL', tone: 'bg-[#FEF3C7] text-[#B45309]' },
  { initials: 'JM', tone: 'bg-[#F3E8FF] text-[#6B21A8]' },
];

// Testimonials
export const testimonials = [
  {
    quote:
      'When our lead architect gave notice, we ran a WYKE session in 48 hours. Six months later, his replacement queries his twin weekly. We didn\u2019t lose a single architectural context thread.',
    name: 'Daniel Okafor',
    role: 'CTO',
    company: 'Crestline Labs',
  },
  {
    quote:
      'I\u2019ve been at this company 7 years. The WYKE interview took 4 hours and surfaced things I didn\u2019t even realize I knew. It was unsettling how accurate the twin became.',
    name: 'Maya Reyes',
    role: 'Principal Engineer',
    company: 'Stackflow',
  },
  {
    quote:
      'We lost our VP of Sales in Q2. His cognitive twin helped us onboard his replacement in 3 weeks instead of the usual 6 months. Two accounts that would have churned, didn\u2019t.',
    name: 'Tom Hargrove',
    role: 'CEO',
    company: 'Paragon',
  },
];

// Mock chat for /dashboard/query (Sarah Chen)
export type ChatMessage = {
  id: string;
  from: 'user' | 'twin';
  text: string;
  timestamp: string;
};

export const mockChat: ChatMessage[] = [
  {
    id: 'm-1',
    from: 'user',
    text: 'Why did the team choose a microservices architecture in 2022?',
    timestamp: '10:14 AM',
  },
  {
    id: 'm-2',
    from: 'twin',
    text:
      'The honest answer: we chose microservices for the wrong reason — org structure — and made it work despite that.\n\nAt the time we had three teams that shipped on incompatible release cadences. The frontend team deployed twice a day, infra deployed monthly behind a change-window, and the data team had a manual approval gate. A monolith forces those cadences to converge, and they were never going to converge culturally. Splitting the deploy boundary was the cheapest way to let each team move at the speed it actually wanted to move.\n\nWhat I\u2019d do differently: I\u2019d split exactly two services, not seven. We over-decomposed because we were optimistic about service ownership maturing, and most of the seven boundaries did not turn out to be real product boundaries — they were sprint-level boundaries that hardened. If I were doing it again I\u2019d draw the cuts only where ownership and on-call could plausibly be different.',
    timestamp: '10:14 AM',
  },
  {
    id: 'm-3',
    from: 'user',
    text: "What's the most common mistake junior engineers make here?",
    timestamp: '10:18 AM',
  },
  {
    id: 'm-4',
    from: 'twin',
    text:
      'The pattern I see most is treating the write path as if it were the read path. Junior engineers iterate freely on schemas because in their previous codebases the data was small enough to migrate over a weekend. Here it isn\u2019t.\n\nThe specific mistake: adding a column "for now" and writing to it before there is a documented owner. Six months later that column is being read by three downstream jobs, none of which were reviewed, and removing it becomes a cross-team negotiation. The fix isn\u2019t process — it\u2019s a habit. Before adding any persisted field, ask: who owns its removal? If the answer isn\u2019t a name, the field doesn\u2019t go in.',
    timestamp: '10:18 AM',
  },
];

// Available experts to query (only those with active twins)
export const queryableExperts = experts.filter((e) => e.status === 'Twin Active');
