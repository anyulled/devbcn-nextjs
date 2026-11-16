# Architecture

This document describes the high-level architecture of the DevBcn website.
If you want to familiarize yourself with the codebase, this is a good place to start.

## Bird's Eye View

A Next.js 16 App Router application serving the DevBcn conference website.
Static and multi-year: every past and current edition lives under `/{year}`.
Speaker, talk, and schedule data come from the **Sessionize API** at runtime.
Edition-specific configuration (dates, feature flags, sponsors) is defined in code.
Deployed to Vercel with PWA support via `@ducanh2912/next-pwa`.

```
Sessionize API ──► hooks/ ──► app/[year]/ pages
                                  ▲
config/editions/ ─────────────────┘
```

## Module Map

### `app/`

Next.js App Router routes. Three routing areas:

- **Top-level** (`app/(global)/`, `app/about-devbcn/`, `app/kcd/`, …): year-independent pages.
- **`app/[year]/`** (plus `app/<CURRENT_EDITION>/` when needed for current-edition caching): year-scoped pages (speakers, talks, schedule, sponsors, etc.).
  Contains its own `layout.tsx` that resolves the edition navigation and uses `app/[year]/@modal/` parallel routes for modal intercepts.
- **Portals & APIs** (`app/admin/`, `app/sponsor/`, `app/auth/`, `app/api/revalidate/`): Supabase-authenticated admin and sponsor portals, auth callbacks, and on-demand Sessionize cache revalidation.

`app/layout.tsx` is the root layout: fonts, global CSS imports, analytics, PWA meta.

### `proxy.ts` and `worker/`

- **`proxy.ts`**: Next.js request proxy handling Supabase session refresh and legacy service-worker cleanup redirects.
- **`worker/`**: Custom service worker code type-checked via `tsconfig.worker.json`.

### `config/`

Static, compile-time configuration:

- **`config/editions/`**: Per-year config files (`2023.ts` … `2027.ts`) implementing
  `EditionConfig`. Controls feature flags, dates, sponsor data, Sessionize URLs.
  `CURRENT_EDITION` constant determines the default year.
- **`config/cfp/`**: Per-year CFP committee data (`cfpData2023.ts` … `cfpData2027.ts`) and `hasCfpCommittee()`.
- **`config/ama-mentoring/`**: AMA and mentoring session schedules and `hasAmaMentoring()`.
- **`config/navigation/`**: Centralized nav links consumed by header and mobile menu.
- **`config/job-offers/`**: Per-year job listing data (`2023.ts` … `2026.ts`).

**Constraint**: `config/` must remain pure data — no React, no side effects, no fetching, and no imports from other workspace modules.

### `hooks/`

Server-side data-fetching functions (despite the directory name, these are **not**
React hooks). Each wraps a Sessionize API endpoint via `fetchSessionizeEndpoint()` in `lib/server/sessionize.ts` and `react.cache()`:

- `useSpeakers.ts` → `/view/Speakers`
- `useTalks.ts` → `/view/Sessions`
- `useSchedule.ts` → `/view/GridSmart`

Types for Sessionize responses live in `hooks/types.ts`.

**Constraint**: these functions are designed for Server Components only. They use
`fetch` with `next: { revalidate }` — do not call them from Client Components.

### `components/`

React components, organized by purpose:

- **`layout/`**: Shell components — header, footer, mobile menu, breadcrumb, speaker/talk
  cards, filter bars. Most are Client Components (`'use client'`).
- **`elements/`**: Small interactive widgets — countdown, back-to-top, theme switch,
  video player, track badges, `Markdown` renderer.
- **`sections/`**: Full page sections composed for home page variants (`home8/`),
  AMA/mentoring, FAQ, and venue.
- **`admin/`**, **`job-offers/`**, **`speakers/`**, **`talks/`**, **`schedule/`**, **`slider/`**, **`skeletons/`**:
  Domain-specific component groups.

**Constraint**: components must not import from `app/`. Data flows down from route
pages through props.

### `context/`

Client-side React Context. Currently only `ScheduleContext` — manages saved sessions
via `localStorage`. Provided by `ClientLayout` at the root.

**Constraint**: contexts are always Client Components. Keep them minimal to avoid
unnecessary re-renders.

### `lib/`

Application utilities, split by runtime boundary:

- **`lib/shared/`**: Pure utility functions (JSON-LD generation, analytics helpers,
  slugification, speaker/talk filter & talk metadata helpers, job-offer slug lookup (`talk-metadata.ts`, `job-offers.ts`, etc.)).
  **Constraint**: no React imports, no server-only imports, no state, no side effects. Must be importable from both server and client code.
- **`lib/server/`**: Server-only helpers (`navigation.ts` for `getEditionNavigation`, `sessionize.ts` for `fetchSessionizeEndpoint`).
- **`lib/supabase/`**, **`lib/auth/`**, **`lib/admin/`**: Supabase SSR/admin/browser clients, public queries, storage helpers, and portal access control.
- **`lib/revalidate.ts`**, **`lib/og-logo.ts`**: Cache revalidation tag/TTL helpers (derived from `CURRENT_EDITION`) and OpenGraph logo utilities.

### `styles/`

SCSS-based styling system:

- `main.scss`: entry point.
- `theme/`: design tokens and variables.
- `components/`: component-specific styles.
- `layout/`: structural layout styles.
- `utils/`: mixins and helpers.
- `vendor/`: third-party CSS (Bootstrap, AOS, Slick, etc.).

**Constraint**: no CSS Modules, no Tailwind. All styles flow through the SCSS pipeline.

### `types/`

Shared TypeScript interfaces for component props (`HeaderProps`, `BreadcrumbProps`,
`BackToTopProps`). Sessionize domain types live in `hooks/types.ts` instead.

### `team/`

Static team member data (`TeamMembers.ts`).

### `__tests__/`

Jest unit tests mirroring the source tree structure.
Cypress E2E tests live in `cypress/`.

## Cross-Cutting Concerns

### Multi-Year Support

The `[year]` dynamic segment is the backbone of the site. Each year's page resolves
its `EditionConfig` via `getEditionConfig(year)` and passes it (or derived data)
down through props. Navigation links are prefixed with the active year.

### External Data

All speaker, talk, and schedule data comes from Sessionize. The API URL is stored
per-edition in `config/editions/`. Data is cached at the `fetch` level
(`revalidate: 3600`) and at the React level (`cache()`).

### Quality Tooling

- **ESLint** (flat config) + **Prettier** + **Stylelint** enforced via Husky pre-commit hooks.
- **lint-staged** runs formatters and linters on staged files.
- Git hooks must never be bypassed.

## Invariants

1. `config/` is pure data — no React, no fetching, no side effects.
2. `hooks/` fetch functions are server-only — never call from Client Components.
3. Components never import from `app/` — data flows down via props.
4. Styles use SCSS exclusively — no CSS Modules, no Tailwind.
5. Every edition must implement the full `EditionConfig` interface.
6. Git hooks (pre-commit, commit-msg, pre-push) are never bypassed.

## Module Boundaries

- `components/` never depends on `app/`.
- `hooks/` never depends on `components/` or `app/`.
- `config/` never depends on any other workspace module.
- `styles/` never depends on any other workspace module.
- `lib/` never depends on `app/` or `components/`.
