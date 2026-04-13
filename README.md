# WYKE

> **Capture, preserve, and query the tacit reasoning of your most critical employees — so when they leave, their judgment doesn't.**

WYKE is the institutional-memory layer for modern companies. It runs Socratic AI interviews with an organization's most critical experts, extracts the *reasoning patterns* underneath their answers, and turns each one into a queryable cognitive twin that the rest of the team can ask in plain English — forever.

This repository contains the marketing site, authentication flow, and full operator dashboard for the product.

---

## Table of Contents

- [Live preview](#live-preview)
- [What's in the box](#whats-in-the-box)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Routes](#routes)
- [Design system](#design-system)
- [Mock data](#mock-data)
- [Roadmap](#roadmap)
- [License](#license)

---

## Live preview

Run the dev server (defaults to `http://localhost:3000`):

```bash
npm install
npm run dev
```

…or pin a different port (used during development):

```bash
npx next dev -p 3009
```

---

## What's in the box

| Surface | What it does |
| --- | --- |
| **Marketing site** (`/`) | Full-bleed sky hero, value pillars, 4-step process, twin demo, photo testimonials, CTA, footer. Mobile-responsive with a hamburger menu. |
| **Auth** (`/auth`) | Tabbed sign-in / sign-up with RHF + Zod, password visibility toggle, Apple + Google SSO, sky-photo brand panel on the right. |
| **Dashboard overview** (`/dashboard`) | Bento layout: Knowledge Captured, AI Extraction status, Knowledge Score gauge, Sessions Activity bar chart, in-line Twin chat, Recent Sessions table, Coverage donut, Knowledge Transfer widget. |
| **Experts** (`/dashboard/experts`) | Filterable, searchable grid of expert profiles with depth scores and twin status. |
| **Sessions** (`/dashboard/sessions`) | Tabbed list of every interview, with a slide-out panel showing transcript highlights, top extracted insights, knowledge-graph preview, and export options. |
| **Insights** (`/dashboard/insights`) | Masonry feed of every extracted insight tagged by type (Mental Model, Decision Heuristic, Domain Knowledge, Risk Pattern, Relationship Intelligence) with confidence + usage counters. |
| **Query Twin** (`/dashboard/query`) | Per-expert chat with multi-phase "thinking" indicator, source citations on every answer, suggested follow-ups, expertise tags, and per-twin conversation persistence. |
| **Analytics** (`/dashboard/analytics`) | Sessions trend + department coverage. |
| **Settings** (`/dashboard/settings`) | Profile, workspace, integrations, billing tabs. |
| **Cross-cutting** | Live search across experts/sessions/insights, real-time notification dropdown, profile menu — all from the topbar. |

---

## Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 14** (App Router, Server Components, Route Handlers) | One stack for SSR marketing, dashboard SPA, and API. |
| Language | **TypeScript** (strict) | Catches the boring class of bugs at compile time. |
| Styling | **Tailwind CSS v3** with custom token palette | Deterministic at scale. |
| UI primitives | shadcn/ui base, fully reskinned | Production starting point, not the final aesthetic. |
| Animation | **Framer Motion** | Page entrances, dropdowns, slide-out panels, twin "thinking" indicator. |
| Forms | **React Hook Form + Zod** | Field-level validation that composes. |
| Data viz | **Recharts** | Lightweight, declarative, themeable. |
| Icons | **Lucide React** | Consistent, lightweight, semantic. |
| Typography | **Inter** + **Instrument Serif** via `next/font` | Self-hosted, zero CLS. |

The prototype ships with **no backend dependencies** — all data lives in `lib/mock-data.ts` so anyone can clone, install, and explore the full surface area immediately.

---

## Project structure

```
.
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout — fonts, metadata
│   ├── page.tsx                    # Marketing homepage
│   ├── globals.css                 # Tailwind base + small component layer
│   ├── auth/
│   │   └── page.tsx                # Sign-in / sign-up
│   └── dashboard/
│       ├── layout.tsx              # Floating-card sidebar shell
│       ├── page.tsx                # Overview (bento)
│       ├── experts/page.tsx
│       ├── sessions/page.tsx
│       ├── insights/page.tsx
│       ├── query/page.tsx
│       ├── analytics/page.tsx
│       └── settings/page.tsx
├── components/
│   ├── home/                       # Hero, value props, process, feature split, social proof, CTA
│   ├── dashboard/                  # Sidebar, topbar, stat card
│   ├── shared/                     # Logo, navbar, footer, node graph (auth visual)
│   └── ui/                         # Avatar, badge, button, input, progress
├── lib/
│   ├── mock-data.ts                # All demo data — experts, sessions, insights, chat
│   ├── use-count-up.ts             # IntersectionObserver-driven number animation
│   └── utils.ts                    # cn(), avatar color helpers
├── public/
│   ├── favicon.svg
│   └── hero-sky.jpg                # Hero / auth / dashboard accent imagery
├── tailwind.config.ts              # Custom palette, fonts, animations
├── tsconfig.json
├── PITCH.md                        # Investor / YC evaluation brief
└── README.md
```

---

## Getting started

**Requirements:** Node ≥ 18.

```bash
git clone https://github.com/your-org/wyke.git
cd wyke
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

There is **no auth gate** on the dashboard in the prototype — sign-in is decorative — so you can navigate straight to `/dashboard` to explore.

---

## Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Next.js dev server with Turbopack-fast hot reload. |
| `npm run build` | Production build. |
| `npm run start` | Serve a built production bundle. |
| `npm run lint` | Run Next/ESLint over the codebase. |

---

## Routes

| Path | What's there |
| --- | --- |
| `/` | Marketing homepage |
| `/auth` | Sign in (default tab) |
| `/auth?tab=signup` | Sign up |
| `/dashboard` | Overview bento |
| `/dashboard/experts` | Expert profiles grid |
| `/dashboard/sessions` | Session list + slide-out detail panel |
| `/dashboard/insights` | Masonry insights feed |
| `/dashboard/query` | Twin conversation interface |
| `/dashboard/analytics` | Trends |
| `/dashboard/settings` | Profile / workspace / integrations / billing |

---

## Design system

WYKE's visual language is a deliberately restrained, mostly-monochrome system with one accent reserved for moments of genuine signal.

- **Surface stack:** `#FFFFFF` cards on a warm `#F2F1ED` page background (dashboard) or pure white (marketing).
- **Borders:** `#E6E5E0` for everything; no harder lines.
- **Type:** Inter for UI; Instrument Serif reserved for hero lockups and rare brand moments.
- **Spacing:** strict 4 px grid.
- **Radius:** `rounded-xl` for cards, `rounded-2xl` for hero containers, `rounded-full` for pills and buttons.
- **Iconography:** Lucide, used semantically — every icon means something.
- **Motion:** Framer Motion for staggered entrances on viewport intersect; Tailwind animations for ambient details (typing dots, marquees).

Tailwind tokens live in [`tailwind.config.ts`](./tailwind.config.ts).

---

## Mock data

All product data is centralized in [`lib/mock-data.ts`](./lib/mock-data.ts) and is internally consistent across pages — Sarah Chen's depth, insight count, and quoted answers are the same in the dashboard widgets, experts grid, sessions detail, insights feed, and query twin chat.

Replace the file (or wrap it behind a fetch layer) to point the UI at a real backend.

---

## Roadmap

The prototype is the front-end for the platform described in [`PITCH.md`](./PITCH.md). Production roadmap lives there — short version:

- **Now** — Live interview pipeline (Socratic agent → transcript → extraction).
- **Next** — Slack / Teams integration, per-twin eval dashboard for experts, API access, SOC 2 Type I.
- **Later** — Cross-twin pattern graph, knowledge-transfer mode, marketplace of interview templates, self-serve enterprise (SSO / SCIM / audit log export), SOC 2 Type II.

---

## License

© 2026 WYKE. All rights reserved. Internal source; not licensed for external use without written permission.
