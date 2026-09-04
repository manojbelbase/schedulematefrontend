# scheduleGPT Frontend

Turborepo + pnpm monorepo for the scheduleGPT frontend.

## What's inside?

This monorepo includes the following apps and packages:

### Apps

- `apps/web`: main customer-facing application (port 3000)
- `apps/backoffice`: admin / back office panel (port 3001)
- `apps/website`: marketing / landing website (port 3002)

Each app is a [Next.js](https://nextjs.org/) application with `src/` structure, HTTPS dev certificates, environment validation, and shared package dependencies.

### Packages

- `@repo/ui`: shared React component library and design system (shadcn/ui based)
- `@repo/services`: generated API types and React Query components (openapi-codegen), generated separately per app:
  - `@repo/services/web` — types for the `web` app API
  - `@repo/services/backoffice` — types for the `backoffice` app API
  - `@repo/services/website` — types for the `website` app API
- `@repo/eslint-config`: shared eslint flat configs (`base`, `next-js`, `react-internal`)

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Turborepo](https://turborepo.com/) for task running and caching
- [pnpm](https://pnpm.io) as the package manager

## Getting started

```sh
pnpm install
pnpm dev
```

Run a single app:

```sh
pnpm dev --filter=web
pnpm dev --filter=backoffice
pnpm dev --filter=website
```

## Build

```sh
pnpm build
```

Build a specific app:

```sh
pnpm build --filter=web
```

## Other commands

```sh
pnpm lint          # lint all apps and packages
pnpm check-types   # type-check all apps and packages
pnpm format        # format the whole repo
pnpm generate-types # regenerate all API types (requires .env)
pnpm generate:web  # regenerate web API types
pnpm generate:backoffice # regenerate backoffice API types
pnpm generate:website # regenerate website API types
```

## Environment

Each app reads environment variables from its own `.env` file. Copy `.env.sample` to `.env` and fill in the values:

- `NEXT_PUBLIC_WEB_API_BASE_URL` / `NEXT_PUBLIC_BACKOFFICE_API_BASE_URL` / `NEXT_PUBLIC_WEBSITE_API_BASE_URL` — backend API URLs per app
- `DOCS_AUTH_TOKEN` — basic auth token used by `openapi-codegen` to fetch the backend OpenAPI docs

## Useful Links

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)