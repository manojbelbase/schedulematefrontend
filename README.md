# scheduleGPT Frontend

Monorepo for the **scheduleGPT** frontend — an AI-powered scheduling assistant built on [Next.js](https://nextjs.org/). It uses [Turborepo](https://turborepo.com/) for task orchestration and [pnpm](https://pnpm.io) workspaces for package management.

## What's inside?

```
.
├── apps/
│   ├── web/          # Customer-facing scheduling assistant (chat UI)
│   ├── backoffice/   # Admin / back-office panel
│   └── website/      # Marketing / landing site
├── packages/
│   ├── ui/               # @repo/ui — shared React component library & design system
│   ├── services/         # @repo/services — generated API types + React Query hooks
│   └── eslint-config/    # @repo/eslint-config — shared ESLint flat configs
├── turbo.json            # Turborepo task pipeline
├── openapi-codegen.config.ts
└── pnpm-workspace.yaml
```

### Apps

Every app is a standalone [Next.js](https://nextjs.org/) application with a `src/` layout, its own `tailwind.config.ts`, runtime environment validation (`src/config/env.ts`), and 100% TypeScript.

| App | Purpose | Port | HTTPS |
| --- | --- | --- | --- |
| `apps/web` | Main customer app — AI chat assistant, Google Calendar connect, request access, auth (email/Google), legal pages | `3000` | No |
| `apps/backoffice` | Admin panel — dashboard, users, access requests, LLM & embedding configuration | `3001` | Yes (`--experimental-https`) |
| `apps/website` | Public marketing/landing site with legal pages | `3002` | Yes (`--experimental-https`) |

The `web` app also ships unit/component tests via [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) (see `apps/web/vitest.config.ts` and `apps/web/src/components/**/__tests__`).

### Packages

- **`@repo/ui`** — internal React component library. UI primitives built on [Radix UI](https://radix-ui.com) (shadcn/ui style), styled with Tailwind CSS v4, plus shared hooks, zustand stores, contexts, table/data-grid building blocks, and the global stylesheet (`src/globals.css`).
- **`@repo/services`** — generated OpenAPI types and [TanStack Query](https://tanstack.com/query) components produced by `openapi-codegen`. Code is generated per backend into scoped sub-paths:
  - `@repo/services/web`
  - `@repo/services/backoffice`
  - `@repo/services/website`
- **`@repo/eslint-config`** — shared ESLint flat configs (`base`, `next-js`, `react-internal`) used across all workspaces.

## Tech stack

- **Next.js 16** + **React 19** (App Router)
- **TypeScript 5.9** — strict, type-checked monorepo-wide
- **Tailwind CSS 4** — utility-first styling
- **TanStack Query** — server state & API data fetching
- **Zustand** — lightweight client state
- **React Hook Form + Zod** — forms and validation
- **Radix UI / shadcn/ui** — accessible component primitives
- **openapi-codegen** — typesafe API clients generated from backend OpenAPI docs
- **Vitest + Testing Library** — unit/component tests (`web`)
- **Turborepo + pnpm** — build orchestration and workspace management

## Getting started

### Prerequisites

- **Node.js** `>= 18`
- **pnpm** `10.8.1` (this repo is managed with `corepack`, see `packageManager` in root `package.json`)

Enable pnpm via Corepack:

```sh
corepack enable
```

### Install

```sh
pnpm install
```

### Run the dev servers

Start all apps concurrently (watch mode):

```sh
pnpm dev
```

Run a single app:

```sh
pnpm dev --filter=web
pnpm dev --filter=backoffice
pnpm dev --filter=website
```

## Common commands

Run from the repo root; Turborepo executes the task in every workspace.

| Command | Description |
| --- | --- |
| `pnpm dev` | Start all dev servers (ports 3000–3002) |
| `pnpm build` | Production build for all apps & packages |
| `pnpm start` | Run a built app (per workspace: `pnpm start --filter=web`) |
| `pnpm lint` | Lint all workspaces (`eslint --max-warnings 0`) |
| `pnpm check-types` | Type-check all workspaces (`next typegen && tsc --noEmit`) |
| `pnpm test` | Run Vitest tests (`web` app only) |
| `pnpm format` | Format the whole repo with Prettier |
| `pnpm generate-types` | Regenerate API types for all apps (requires `.env`) |

Scope commands to a single workspace with `--filter`, e.g.:

```sh
pnpm build --filter=backoffice
pnpm lint --filter=@repo/ui
pnpm check-types --filter=web
```

## Regenerating API types

The `@repo/services` package is generated from the backend's OpenAPI JSON endpoints. Generation is configured in `openapi-codegen.config.ts` and reads API URLs plus `DOCS_AUTH_TOKEN` from the environment.

```sh
pnpm generate-types                     # all three apps
pnpm generate:web                       # only web
pnpm generate:backoffice                # only backoffice
pnpm generate:website                   # only website
```

Output is written under `packages/services/src/<app>/` (`types.*.ts` schemas + `queries.*.ts` React Query components).

## Git workflow & code quality

Husky Git hooks run on commit/push and are wired to `lint-staged` and `commitlint`:

- **Prettier** — formatting (imports sorted via `@ianvs/prettier-plugin-sort-imports`)
- **ESLint** — auto-fixes staged JS/TS files
- **commitlint** — enforces [Conventional Commits](https://www.conventionalcommits.org)

Example commit:

```sh
feat: add chat history persistence
fix(web): handle empty message state
```

## Useful links

- [Turborepo — running tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Turborepo — caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Turborepo — filters](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Next.js docs](https://nextjs.org/docs)
- [openapi-codegen](https://github.com/dphilipson/openapi-codegen)
