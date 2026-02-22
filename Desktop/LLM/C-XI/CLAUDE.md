# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ExI 3.0 (Executive Intelligence 3.0) is a browser-based assessment platform for evaluating executive leadership through case-based scenario scoring. It replaces a paper-based scoring protocol with a web application while preserving psychometric integrity.

All application code lives in `exi-platform/`. Run all commands from that directory.

## Commands

```bash
cd exi-platform

# Development
npm run dev              # Next.js dev server with Turbopack (localhost:3000)
npm run build            # Production build
npm run lint             # ESLint

# Testing (Vitest, 103 tests)
npm run test             # Single run
npm run test:watch       # Watch mode
npm run test -- src/lib/scoring/engine.test.ts   # Single test file
npm run test:coverage    # With coverage report
npm run test:e2e         # Playwright E2E (not yet configured)
```

## Architecture

**Stack:** Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, Radix UI, Supabase, Vitest, Zod 4, Framer Motion

**Path alias:** `@/*` maps to `./src/*`

### Scoring Engine (`src/lib/scoring/`)

Pure-function 10-step pipeline in `engine.ts`. No side effects. This is the most tested part of the codebase (103 tests). Steps: raw collection → SEA adjustments → weight multipliers → deduplication → dimension sums → conceptual thinking → construct combination → composite → percentile lookup → labels.

Key modules:
- `engine.ts` — Main pipeline (44 tests)
- `sea-rules.ts` — Self-evaluation/adjustment: credit-taken cap, dismissed handling (17 tests)
- `dedup.ts` — Highest-score-wins across dedup groups, used in Case D (9 tests)
- `norms.ts` — Percentile lookup with linear interpolation (17 tests)
- `labels.ts` — Percentile → Low/Moderate/High mapping (16 tests)

### Case Content (`src/lib/case-content/`)

Four hardcoded case definitions (`_case_a.ts` through `_case_d.ts`), each defining questions, rubric items, probe configs, and scoring types. Validated by `validator.ts` (8 rules from PRD Section 7.6). `schema.ts` has Zod schemas for all case content types.

Cases at a glance:
- **A (Novex):** 9Q, 40 items. Info rating probes, emotional trigger, CCT Critical focus
- **B (Whitfield):** 8Q, 30 items. SEA items, one double-weight item
- **C (CleanSpin):** 4Q, 16 items. ISA Social SEA mirror
- **D (Kelston):** 10Q, 70 items. 11 dedup groups, action choice selector (Q1 & Q9)

### Scoring UI State (`src/hooks/useScoringReducer.ts`)

Complex reducer with 20+ action types managing: current case/question selection, scores, grades (write-once), notes, info ratings, emotional responses, action choices, conceptual thinking ratings, and UI state. **Currently in-memory only** — Supabase persistence is not yet wired.

### Routing

- `/` — Dashboard (session list)
- `/sessions/new` — Create session
- `/sessions/[sessionId]` — Main scoring interface
- `/sessions/[sessionId]/review` — Review before finalize
- `/sessions/[sessionId]/report` — Post-finalization report
- `/admin/cases|norms|users` — Admin pages
- `/calibration/[sessionId]` — Dual-score comparison
- `/api/*` — RESTful API routes (sessions, scores, cases, norms, calibration, export, users, health)

Auth middleware (`src/middleware.ts`) protects all routes except `/login`, `/callback`, `/api/health`.

### Auth & RBAC

Supabase Auth (SSO not yet configured). Three roles enforced via `src/lib/auth/rbac.ts`:
- **Assessor:** Own sessions only
- **Calibrator:** All sessions + calibration
- **Administrator:** Everything + case/norm/user management

### Database

Supabase PostgreSQL. 7 migrations in `supabase/migrations/`. Tables: users, sessions, scores, cases, norm_tables, computed_results, audit_log. Row-level security in `006_rls_policies.sql`.

### Types (`src/types/`)

Core types: `Session`, `CaseSlot` (A|B|C|D), `Score`, `ScoreLevel` (clear|adequate|partial|not_present), `CaseContent`, `Question`, `RubricItem`, `NormTable`, `ComputedResults`, `User`, `UserRole`.

Scoring types: `Dimension` (cct_critical|cct_conceptual|isa_interpersonal|isa_social|sea), `Construct` (CCT|ISA|SEA), `ScoringType` (standard|emotional_scale|conceptual_1to4|action_choice|grade_only).

## Key Patterns

- Scoring engine functions are **pure** — pass data in, get results out. Keep them side-effect-free.
- Case content files export `CaseContent` objects validated against Zod schemas. When modifying case content, run the validator and all scoring tests.
- Supabase client creation: `src/lib/supabase/client.ts` (browser), `server.ts` (server components/routes), `service.ts` (admin/service-role operations).
- UI primitives are Radix-based in `src/components/ui/`. Scoring-specific components are in `src/components/scoring/` (20 components).
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_APP_URL`. See `.env.example`.

### Offline Architecture (Planned — Milestone 5 in ROADMAP.md)

The app must work without internet. Design: Service Worker + IndexedDB as a PWA. IndexedDB is the primary local store; Supabase syncs when online. Key decisions:
- IndexedDB database `exi-offline` with stores: `sessions`, `scores`, `cases`, `sync-queue`, `sync-meta`
- `useAutoSave` writes to IndexedDB first, pushes to Supabase when online (replaces current localStorage queue)
- Sessions can be created offline with client-side UUIDs
- Co-scorer conflicts avoided by keying scores per assessor — calibration page compares separate score sets
- Finalization is online-only
- Service worker caches app shell for fully offline launches

### Sandbox Mode (Planned — Milestone 0 in ROADMAP.md)

Set `NEXT_PUBLIC_SANDBOX=true` in `.env.local` to run the full app without Supabase. Mock data layer in `src/lib/sandbox/` provides in-memory auth, sessions, scores, users, and norms. Includes a role-switcher widget to test all 3 permission levels. Design doc: `exi-platform/docs/plans/2026-02-22-sandbox-mode-design.md`

### Master Dashboard (Planned — Milestone 0.4 in ROADMAP.md)

`/admin/dashboard` — administrators-only operations view showing all sessions across consultants, analytics cards, consultant workload, norm/case status, and user activity. Separate from the per-consultant dashboard at `/`.

## Current State

The scoring engine is production-ready (103 passing tests). The UI is feature-complete for scoring workflows. **The critical gap is Supabase persistence** — scores are stored in the reducer but not yet saved to the database. See `ROADMAP.md` for remaining milestones.

## PRD Reference

`CxI_3_0_PRD_v03.md` in the repo root is the complete product requirements document. Reference it for measurement model details, scoring rules, and UI specifications.
