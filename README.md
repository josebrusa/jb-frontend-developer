# Jose Brusa Portfolio

Portfolio personal construido con Next.js App Router, React, TypeScript, Tailwind CSS v4, Drizzle, PostgreSQL/Neon, Cloudflare R2 e integraciones server-side con GitHub, Vercel y SMTP.

## Requisitos

- Node.js `24.x`
- PNPM `11.1.3`
- Variables de entorno basadas en `.env.example`

## Comandos

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm typecheck:scripts
pnpm build
pnpm start
```

## Variables De Entorno

Configura `.env.local` a partir de `.env.example`.

- `NEXT_PUBLIC_SITE_URL`: URL pública usada para canonical, robots y sitemap.
- `DATABASE_URL`: conexión PostgreSQL principal. Si no está definida, el sitio usa datos fallback.
- `CONTACT_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`: envío del formulario de contacto.
- `ADMIN_PASSWORD`: acceso privado a `/admin`.
- `GITHUB_USERNAME`, `GITHUB_TOKEN`: importación/listado de repositorios.
- `VERCEL_TOKEN`, `VERCEL_TEAM_ID`: lectura de proyectos y URLs de producción.
- `CLOUDFLARE_R2_ENDPOINT`, `CLOUDFLARE_R2_ACCESS_KEY_ID`, `CLOUDFLARE_R2_SECRET_ACCESS_KEY`, `CLOUDFLARE_R2_BUCKET`, `CLOUDFLARE_PUBLIC_ASSETS_URL`: subida y publicación de assets.

## Base De Datos

El esquema vive en `src/server/db/schema.ts` y las migraciones versionadas en `drizzle/`.

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

Para preparar una DB vacía:

```bash
pnpm db:setup
```

## Assets

Para subir el CV a R2 y registrar la URL en DB:

```bash
pnpm assets:upload-cv
```

Para capturar previews de deployments con Playwright y subirlas a R2:

```bash
pnpm exec playwright install chromium
pnpm assets:capture-deployments
```

## Admin

La ruta `/admin` permite importar proyectos desde GitHub/Vercel y decidir qué mostrar públicamente. Requiere `ADMIN_PASSWORD` y `DATABASE_URL` para persistir cambios.

## Verificación Antes De Deploy

```bash
pnpm lint
pnpm typecheck
pnpm typecheck:scripts
pnpm audit --audit-level moderate
pnpm build
```

## SEO Y Accesibilidad

- `app/sitemap.ts` genera el sitemap dinámico incluyendo blog y privacidad.
- `app/robots.ts` declara reglas de crawleo y bloquea `/admin/`.
- `app/layout.tsx` define metadata, Open Graph y JSON-LD de persona.
- El sitio incluye skip link, foco visible, navegación móvil con botón nativo y soporte para `prefers-reduced-motion`.
