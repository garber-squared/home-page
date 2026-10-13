# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing site for Garber Squared LLC: a static Astro 5 + Tailwind CSS 3 site built from the [AstroWind](https://github.com/onwidget/astrowind) template. The public pages no longer use the template's look: they are styled as a "statement of work" document (see `DESIGN.md`; product context is in `PRODUCT.md`). The template's widgets, old layout, blog routes and theme scripts have been deleted; what remains of AstroWind is the config integration in `vendor/integration/`, the metadata components and a few utilities.

## Commands

```shell
npm run dev            # dev server on :4321 (binds all hosts)
npm run build          # static build to ./dist
npm run preview        # serve ./dist
npm run check          # astro check + eslint + prettier --check (what CI runs)
npm run check:astro    # type-check only; check:eslint / check:prettier likewise
npm run fix            # eslint --fix, then prettier -w
```

There is no test suite. `npm run check` and `npm run build` are the only verification available.

Docker (use `docker compose`, not `docker-compose`):

- `astrowind-dev` runs `npm run dev` with the repo mounted, on port 4321.
- `astrowind-prod` builds the site and serves `dist/` from nginx on port 8080 (`nginx/nginx.conf`).
- `make restart` rebuilds `astrowind-prod` and brings the stack up.

## Architecture

### Site config flows through a virtual module

`src/config.yaml` is the single source for site name/URL, SEO defaults, blog routing and theme. It is not imported directly. The local integration in `vendor/integration/` reads it at `astro:config:setup`, normalises it with `utils/configBuilder.ts`, sets Astro's `site`/`base`/`trailingSlash`, and exposes the result as the virtual module `astrowind:config` (`SITE`, `I18N`, `METADATA`, `APP_BLOG`, `UI`, `ANALYTICS`). Code reads config via `import { SITE } from 'astrowind:config'`. Adding a config key means updating `configBuilder.ts` and `vendor/integration/types.d.ts` as well as the YAML. The same integration appends the sitemap URL to `robots.txt` after build.

### Pages are compositions of document components

A page in `src/pages/` imports `~/layouts/DocumentLayout.astro`, passes a `metadata` object, and stacks components from `src/components/document/` (`Undertaking`, `Clause`, `SignatureBlock`) configured through props. `src/pages/index.astro` is the reference. All styling for this look lives in `src/assets/styles/document.css`, scoped under `.sow` with `--sow-*` custom properties; fonts are self-hosted in `public/fonts/`. `.md` pages (`privacy.md`, `terms.md`) use `MarkdownLayout.astro` via frontmatter, which wraps `DocumentLayout` and styles long-form text with `.sow-prose`.

Layout chain: `Layout.astro` (html/head, metadata, analytics) → `DocumentLayout.astro` (adds `DocumentHeader`/`DocumentFooter`) → page. The site is light-only; there is no theme toggle or dark mode.

`src/navigation.ts` exports `bookingUrl` (the Google Calendar appointment link) and `contactEmail`, used by the document components. Build internal links with `getPermalink()` / `getAsset()` from `src/utils/permalinks.ts` so `base` and `trailingSlash` are respected.

### Blog

There is no on-site blog: the routes, components, `post` collection and RSS feed were removed, and `apps.blog.isEnabled` is `false` in `src/config.yaml`. The real blog is external (alexandergarber.com). `src/content/drafts/` still holds ~260 Markdown posts with Jekyll-style frontmatter; nothing loads or builds them.

### Conventions

- `~` aliases `src/` (set in both `tsconfig.json` and the Vite config).
- Icons are inline SVG in the components. The `astro-icon` integration is still configured in `astro.config.ts` but nothing uses it.
- Tailwind base styles are disabled in the integration and loaded from `src/assets/styles/tailwind.css` instead. Only a handful of utilities are used (`sr-only`, `not-italic`, `whitespace-nowrap`); `tailwind.config.js` has no theme extensions.
- Prettier: 120 columns, single quotes, semicolons, `es5` trailing commas. ESLint allows unused variables prefixed with `_`.
- There are no third-party scripts; booking is a plain link to Google Calendar. The layouts declare no `head` slot. The partytown integration is switched off by `hasExternalScripts = false` in `astro.config.ts`.

## Repo notes

- Remote is `garber-squared/home-page`; long-lived branches are `master` and `staging`, with feature branches named `<issue-number>-<slug>`.
- `.github/workflows/actions.yaml` triggers on `main`, which does not exist here, so CI does not currently run on pushes or PRs.
- `src/config.yaml` sets `site` to `https://garbersquared.vercel.app`; `netlify.toml` and `vercel.json` are both present from the template.
- `.github/skills/impeccable/` is a frontend design skill with a post-edit hook (`.github/hooks/impeccable.json`); `.github` is excluded from ESLint and Prettier.
