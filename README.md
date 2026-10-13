# Garber Squared

Marketing site for Garber Squared LLC. A static [Astro 5](https://astro.build) site with Tailwind CSS 3, deployed on Vercel.

## Commands

```shell
npm run dev            # dev server on :4321
npm run build          # static build to ./dist
npm run preview        # serve ./dist
npm run check          # astro check + eslint + prettier --check
npm run fix            # eslint --fix, then prettier -w
```

Docker: `docker compose up astrowind-dev` runs the dev server on port 4321 with the repo mounted.

## Where things are

- `src/pages/` — the pages: home, contact, privacy, terms, proof of consent, 404.
- `src/layouts/DocumentLayout.astro` — header, footer and page frame used by every page.
- `src/components/document/` — the building blocks of a page.
- `src/assets/styles/document.css` — all styling for the site's look.
- `src/navigation.ts` — the booking link and contact email.
- `src/data/exhibits.ts` — case studies and testimonials shown on the home page.
- `src/config.yaml` — site name, URL and SEO defaults.

`PRODUCT.md` describes who the site is for and what it must do. `DESIGN.md` describes the visual system. `CLAUDE.md` has architecture notes.

The site began as the [AstroWind](https://github.com/onwidget/astrowind) template (MIT licence, see `LICENSE.md`); its config integration in `vendor/integration/` is still in use.
