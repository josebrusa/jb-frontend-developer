# AGENTS.md

## Commands
- Use pnpm; `packageManager` is pinned in `package.json` and `pnpm-lock.yaml` is the source of truth.
- Run `pnpm install` before scripts in a fresh checkout. `pnpm-workspace.yaml` explicitly allows native builds for `sharp` and `unrs-resolver`.
- Start local dev with `pnpm dev`; production check is `pnpm build`; run production server with `pnpm start` after a build.
- Type-check with `pnpm typecheck`; lint source with `pnpm lint`. There are no configured test scripts.
- Database workflow: edit `src/server/db/schema.ts`, run `pnpm db:generate`, apply with `pnpm db:migrate`, and seed initial content with `pnpm db:seed` after setting `DATABASE_URL`.
- Asset workflow: configure Cloudflare R2 env vars, then run `pnpm assets:upload-cv` to upload `jose cv actualizado.docx` and store the public CV URL in the `assets` table when `DATABASE_URL` is set.

## App Structure
- This is a single Next.js App Router app, not a monorepo. Runtime entry is `app/layout.tsx` -> `app/page.tsx`.
- `app/page.tsx` wires the page sections in order: `Sidenav`, `Header`, `Work`, `About`, `Projects`, `Contact`, `Footer`.
- Experience and project data are loaded server-side via `src/server/db/queries.ts`; fallback files under `src/server/db/fallback-*.ts` only keep build-safe seed sources until Neon has data.
- `Sidenav` and `AnimHeader` are client components; keep browser-only hooks/libraries behind `"use client"`.
- Static files that must be served publicly belong in `public/`, not the repository root.

## Tooling Notes
- Neon/Drizzle config lives in `drizzle.config.ts`; migrations are versioned under `drizzle/`. Do not read `DATABASE_URL` from client components.
- GitHub integration belongs in server-only code (`src/server/github.ts`) and uses `GITHUB_USERNAME`/`GITHUB_TOKEN`; do not call GitHub with tokens from client components.
- Vercel integration belongs in server-only code (`src/server/vercel.ts`) and uses `VERCEL_TOKEN` plus optional `VERCEL_TEAM_ID`; keep deploy matching/import logic in admin/server code.
- Cloudflare R2 integration belongs in server-only code (`src/server/storage/r2.ts`); never expose R2 access keys in client components or committed files.
- Tailwind CSS v4 is wired for Next through `@tailwindcss/postcss` in `postcss.config.mjs`; do not add Tailwind v3-style `tailwind.config.js` unless needed for custom theme/content config.
- ESLint uses flat config in `eslint.config.mjs` with `eslint-config-next`; `pnpm lint` intentionally checks only `app` and `src` to avoid generated output.
- Project files are ES modules (`"type": "module"`); keep Next/PostCSS/ESLint config files in ESM syntax.
