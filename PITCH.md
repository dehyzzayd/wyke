# WYKE — Pitch & Evaluation Brief

> **WYKE captures, preserves, and queries the tacit reasoning of your most critical employees — so when they leave, their judgment doesn't.**

A one-pager for investors, YC partners, and anyone evaluating the company. Last updated **2026-04-13**.

---

## 1. The Pitch In One Sentence

WYKE runs Socratic AI interviews with an organization's most critical experts, extracts the *reasoning patterns* underneath their answers, and turns each one into a queryable cognitive twin that the rest of the team can ask in plain English — forever.

---

## 2. The Problem

Companies lose ~3-5% of their workforce every quarter. The cost isn't replacing the seat — it's **what walked out the door with them**:

- The architectural decisions and the *why* behind them
- Vendor and customer relationship politics
- The "we tried that in 2021 and here's why it failed" knowledge
- The unwritten rules and 3am intuitions that came from a decade of pattern recognition

Existing solutions are broken:
- **Documentation** — nobody writes it, nobody reads it, and it never captures *why*.
- **Wikis (Notion / Confluence)** — graveyards of stale, surface-level facts.
- **LLMs over your docs (Glean, Guru, Mem)** — return search results, not judgment calls. They tell you *what was written*, not *how this person would think*.
- **Exit interviews** — too late, too generic, no structured extraction.

The replacement engineer spends 12-18 months relearning what the founding engineer knew on day one. The new VP of Sales loses 2-3 accounts in the first 90 days. There is no infrastructure layer that solves this — only painful, repeated re-discovery.

---

## 3. The Solution

WYKE is the **institutional memory layer** for modern companies. Three steps:

1. **Pick the expert.** Anyone whose judgment your team can't afford to lose.
2. **Run a Socratic AI interview.** A 90-minute structured conversation that probes the reasoning under each answer — not a form, not a survey.
3. **Anyone queries the cognitive twin.** Plain English questions return answers in the expert's reasoning style, with cited source patterns from the original interview.

A live twin is ready in **under 24 hours** from the first interview. Each twin gets richer with every follow-up session and every query the expert reviews.

---

## 4. Product

### What ships today

| Surface | What it does |
|---|---|
| **Marketing site** | Hero, value pillars, 4-step process, twin demo, testimonials, CTA, footer. Mobile-responsive. |
| **Auth** | Email/password (Zod-validated) + Apple + Google SSO, sign-in / sign-up tabs. |
| **Dashboard Overview** | Bento layout: Knowledge Captured, AI Extraction status, Knowledge Score gauge, Sessions Activity bar chart, in-line Twin chat, Recent Sessions table, Coverage donut, Knowledge Transfer widget. |
| **Experts** | Filterable, searchable grid of expert profiles with depth scores and twin status. |
| **Sessions** | Tabbed list (All / In Progress / Completed / Scheduled) of every interview, with a slide-out panel showing transcript highlights, top extracted insights, knowledge graph, and export options. |
| **Insights** | Masonry feed of every extracted insight tagged by type (Mental Model, Decision Heuristic, Domain Knowledge, Risk Pattern, Relationship Intelligence) with confidence + usage. |
| **Query Twin** | Per-expert chat with multi-phase "thinking" indicator, source citations on every answer, suggested follow-ups, expertise tags, and per-twin conversation persistence. |
| **Analytics** | Sessions trend + department coverage. |
| **Settings** | Profile, workspace, integrations, billing tabs. |
| **Cross-cutting** | Live search across experts/sessions/insights, real-time notifications, profile menu — all from the topbar. |

### Differentiating product principles

- **Reasoning > retrieval.** A WYKE answer reads like a 1:1 with the expert, not a Slack search result.
- **Cited patterns.** Every twin response surfaces the underlying captured patterns it drew from. Auditable, never a black box.
- **The expert stays in the loop.** Twins improve only through expert sign-off — companies (and the expert) stay in control of how their reasoning is represented.
- **24-hour activation.** From signup to a working twin in a single business day.

---

## 5. Why Now

1. **Frontier LLMs are finally good enough at structured Socratic dialogue** to conduct a real interview, not a chatbot transcript.
2. **Tenure is collapsing.** Median tech tenure is 2.1 years (down from 4.2 in 2010). The half-life of institutional knowledge has never been shorter.
3. **AI replaces junior pattern-recognition first.** Senior judgment (the kind WYKE captures) is the *most* valuable knowledge in the company precisely because it's now the hardest to grow organically.
4. **Companies are flattening.** Fewer mid-level engineers means fewer humans absorbing tacit knowledge through osmosis. Capture has to be deliberate.
5. **Compliance & succession-risk reporting** is moving from optional to required at growth-stage and PE-backed companies. WYKE produces an auditable artifact.

---

## 6. Target Customer (ICP)

**Primary:** 50-500 employee tech-forward companies who have:
- ≥ 1 critical individual contributor whose departure would meaningfully degrade the org (founding engineer, VP Sales, founding PM).
- Recent or anticipated turnover at director-or-above level.
- Active concerns about succession, M&A diligence, or compliance audits.

**Highest-pain personas:** CTO, Head of People, Chief of Staff, COO.

**Secondary:** PE / VC operators preserving knowledge across portfolio companies; consulting firms preserving partner expertise; specialized service firms (law, medicine, architecture).

---

## 7. Business Model

Pay-per-expert-profile SaaS with three plans:

| Plan | Price | Experts | For |
|---|---|---|---|
| Starter | $299 / mo | up to 3 | First-time buyers, single-team pilots |
| Scale | $899 / mo | up to 15 | Mid-market mainline plan |
| Enterprise | Custom | Unlimited | SSO, SCIM, compliance reviews, dedicated success |

- No per-seat fees on querying — the more the org queries, the stickier we get.
- No usage taxes on inference. Predictable.
- Free first expert (full 24h activation) is the wedge.

**Unit economics (target at scale):** ~80% gross margin. Inference cost amortized across query volume; the marginal cost of an additional query is near zero relative to the value delivered.

---

## 8. Competition & Moat

| Category | Examples | Why we're different |
|---|---|---|
| Enterprise search | Glean, Guru, Mem | They surface *documents*. We surface *judgment*. |
| Wikis | Notion, Confluence | They store what was written. We capture what was never written down. |
| AI meeting tools | Otter, Fireflies, Granola | They transcribe. We extract reasoning patterns. |
| HR / knowledge transfer | Lessonly, traditional KT | Manual, slow, surface-level. We're structured + AI-native. |

**Moat compounds across three dimensions:**

1. **Interview methodology** — our Socratic prompt library is the product. Years of interview craft baked into a system that gets better every cohort.
2. **Per-expert data flywheel** — a twin gets sharper every interview, every query review. Switching cost rises monotonically.
3. **Org-wide pattern graph** — patterns extracted across multiple experts in one company become a queryable reasoning graph. No single-employee tool can replicate it.

---

## 9. Traction

> *Numbers below are placeholders for the live deck. Replace before sharing externally.*

- **47** companies preserving institutional knowledge today
- **2,847** insights extracted this month (+23% MoM)
- **94%** knowledge retention vs. 12% industry average
- **4.9 / 5** Trustpilot, 47 reviews
- **$X ARR** | **Y%** quarter-over-quarter growth | **Z** logo retention

Notable customers (placeholder): **Crestline Labs · Stackflow · Paragon · Meridian · Vestry**.

---

## 10. Tech Stack

A pragmatic, modern, scalable stack with no lock-in beyond what's load-bearing.

### Application

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14** (App Router, Server Components, Route Handlers) | One stack for SSR marketing, dashboard SPA, and API routes. |
| Language | **TypeScript (strict)** | Catches the boring class of bugs at compile time. |
| Styling | **Tailwind CSS v3** with custom token palette | No theme lock-in, deterministic at scale. |
| UI primitives | shadcn/ui base, fully reskinned | Production-quality starting point, not the final aesthetic. |
| Animation | **Framer Motion** | Page entrances, dropdowns, slide-out panels, twin "thinking" indicator. |
| Forms | **React Hook Form + Zod** | Field-level validation that actually composes. |
| Data viz | **Recharts** | Lightweight, declarative, themeable. |
| Icons | **Lucide React** | Consistent, lightweight, semantic. |
| Typography | **Inter** + **Instrument Serif** via `next/font` | Self-hosted, zero CLS. |

### Backend (planned for production)

| Layer | Choice |
|---|---|
| API | Next.js Route Handlers + tRPC (or Hono on edge) |
| Database | Postgres (Supabase or Neon for managed) |
| Vector store | pgvector inside the same Postgres |
| Queue / jobs | Inngest or Trigger.dev for interview & extraction pipelines |
| Auth | Better Auth (own data) or Clerk (faster shipping) |
| File storage | S3-compatible (Cloudflare R2) |
| Observability | Sentry + PostHog |
| Hosting | Vercel (frontend) + Neon (db) for v1; portable to AWS later |

### AI / ML

| Component | Choice |
|---|---|
| Interview model | Frontier reasoning model (Claude Opus / GPT-class) for the Socratic interviewer agent |
| Extraction model | Smaller, fine-tuned model for converting transcripts → structured insights |
| Embedding | OpenAI / Cohere / open-source (BGE) — abstracted behind a provider interface |
| Twin runtime | Retrieval-augmented generation grounded in the expert's extracted patterns + recent insights |
| Eval | Per-expert eval harness — the expert reviews twin responses, generating supervised feedback |

**Provider abstraction is a deliberate design choice.** No single LLM dependency; we route by task.

### Architecture (high level)

```
[Marketing site]   [Dashboard SPA]
         \               /
          \             /
           Next.js (Edge + Node runtime)
           ├── Route handlers / tRPC
           ├── Auth (session + RBAC)
           └── Webhooks
                    │
   ┌────────────────┼─────────────────┐
   │                │                 │
[Postgres]    [Inngest queue]    [Object store]
+ pgvector    ├── Interview job  └── Audio / transcripts
              ├── Extraction job
              └── Twin training job
                    │
                [LLM router]
              ├── Interviewer
              ├── Extractor
              └── Twin runtime
```

### Security & compliance posture

- SOC 2 Type II planned by end of year 1.
- Per-customer data isolation; row-level security in Postgres.
- Customer data is never used to train shared models.
- Audit log for every twin response (which patterns were retrieved, which model produced the output, which version of the twin).
- Expert consent + revocation built into the data model — an expert can pull their twin offline at any time.

---

## 11. The Team

> Replace with real bios before sharing externally.

- **Founder & CEO** — [Name], [PM/eng background], previously [...]. Built [...].
- **Founding Engineer** — [Name], shipped [...] at [...].
- **Founding ML Engineer** — [Name], previously [...].
- **Advisors** — [Names].

What matters: **Founder is solving a problem they personally watched cost their previous company millions.** Domain conviction > generic AI conviction.

---

## 12. Roadmap

### Now (Q2 2026 — current quarter)
- ✅ Marketing site, auth, dashboard overview, experts, sessions, insights, query twin
- ✅ Polished prototype-grade UI across all surfaces
- 🟡 Live interview pipeline (Socratic agent → transcript → extraction)
- 🟡 First 10 paying customers

### Next (Q3 2026)
- Slack & Teams integration ("ask Sarah's twin from Slack")
- Per-twin eval dashboard for the expert
- Auto-suggest follow-up sessions to fill knowledge gaps
- API access (Scale plan)
- SOC 2 Type I

### Later (Q4 2026 → Q1 2027)
- Cross-twin pattern graph ("how does this company think about X?")
- Knowledge transfer mode (expert → successor structured handover)
- Marketplace of interview templates per role (founding eng, VP sales, etc.)
- Self-serve enterprise (SSO, SCIM, audit log export)
- SOC 2 Type II

---

## 13. The Ask

We're raising a **$X seed** to:

1. **Hire** — 2 engineers (one full-stack, one ML), 1 founding designer, 1 GTM hire (4 total).
2. **Ship** the live interview pipeline to GA across all customer cohorts.
3. **Reach $Y ARR** with 100+ paying customers by [date].
4. **Close SOC 2 Type I** to unlock mid-market and regulated buyers.

**Why YC / why this investor:**
- We need partners who have lived through company-scaling tenure crises and can introduce us to companies feeling the pain right now.
- Distribution wedge into early-stage portfolios is a natural fit; every YC company has founding ICs whose departure would be catastrophic.

---

## 14. Quick Links for Evaluators

- **Live prototype:** http://localhost:3009 (local dev) — pages: `/`, `/auth`, `/dashboard`, `/dashboard/experts`, `/dashboard/sessions`, `/dashboard/insights`, `/dashboard/query`, `/dashboard/analytics`, `/dashboard/settings`
- **Codebase:** this repo (`/`) — Next.js 14 App Router, fully typed, no backend dependencies for the prototype (mock data lives in `lib/mock-data.ts`).
- **Run locally:** `npm install && npm run dev` then open http://localhost:3000 (or `npx next dev -p 3009` for the local test port).
- **Design language:** white-first, mostly monochrome, single accent used surgically; Inter for UI, Instrument Serif for the marketing aesthetic. Spacing on a 4px grid.

---

## 15. The Closing Line

> **The next person to leave already has a twin.** That's the company we're building.

Contact: **founders@wyke.ai** · **[calendar link]**
