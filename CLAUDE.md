# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing site for Garber Squared LLC: a static Astro 5 + Tailwind CSS 3 site built from the [AstroWind](https://github.com/onwidget/astrowind) template. The public pages no longer use the template's look: they are styled as a "statement of work" document (see `DESIGN.md`; product context is in `PRODUCT.md`). `README.md` is still the upstream AstroWind README, and the template's widget library is still in the tree but unused by any built page.

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

Layout chain: `Layout.astro` (html/head, metadata, analytics, theme) → `DocumentLayout.astro` (adds `DocumentHeader`/`DocumentFooter`) → page. `PageLayout.astro` and `src/components/widgets/` are the old AstroWind layout and widgets; only the disabled blog routes still reference them.

`src/navigation.ts` exports `bookingUrl` (the Google Calendar appointment link) and `contactEmail`, used by the document components; its `headerData`/`footerData` feed only the old layout. Build internal links with `getPermalink()` / `getAsset()` from `src/utils/permalinks.ts` so `base` and `trailingSlash` are respected.

### Blog

- The blog is switched off (`apps.blog.isEnabled: false` in `src/config.yaml`), so none of the routes below are built and `/rss.xml` returns nothing. The real blog is external (alexandergarber.com).
- The `post` collection (`src/content/config.ts`) loads from `src/data/post/`, which no longer exists; the demo posts were deleted.
- `src/content/drafts/` holds ~260 Markdown posts with Jekyll-style frontmatter (`layout`, `date` as a free-form string). No collection loads them and their frontmatter does not match the `post` schema (`pubDate`, etc.), so they are not built.
- Routes come from `src/pages/[...blog]/`, whose static paths are generated in `src/utils/blog.ts` from `APP_BLOG` in the config: the list lives at `/articles`, posts at `/%slug%`, plus `/category/*` and `/tag/*`.

### Conventions

- `~` aliases `src/` (set in both `tsconfig.json` and the Vite config).
- Icons use `astro-icon` names. All of `tabler:*` is available; only the `flat-color-icons` listed in `astro.config.ts` are bundled, so add new ones there.
- Tailwind base styles are disabled in the integration; global styles and theme CSS variables come from `src/assets/styles/tailwind.css` and `src/components/CustomStyles.astro`.
- Prettier: 120 columns, single quotes, semicolons, `es5` trailing commas. ESLint allows unused variables prefixed with `_`.
- There are no third-party scripts; booking is a plain link to Google Calendar. The layouts declare no `head` slot. The partytown integration is switched off by `hasExternalScripts = false` in `astro.config.ts`.

## Repo notes

- Remote is `garber-squared/home-page`; long-lived branches are `master` and `staging`, with feature branches named `<issue-number>-<slug>`.
- `.github/workflows/actions.yaml` triggers on `main`, which does not exist here, so CI does not currently run on pushes or PRs.
- `src/config.yaml` sets `site` to `https://garbersquared.vercel.app`; `netlify.toml` and `vercel.json` are both present from the template.
- `.github/skills/impeccable/` is a frontend design skill with a post-edit hook (`.github/hooks/impeccable.json`); `.github` is excluded from ESLint and Prettier.
