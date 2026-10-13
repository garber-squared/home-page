# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Startup founders and CTOs: technical or semi-technical leaders who need senior engineering capacity for a product, an API, or an AI feature, and who are deciding whether to book a first conversation.

## Product Purpose

This is the marketing site for Garber Squared LLC, a software consultancy. It exists to explain what the consultancy builds and to get a qualified visitor to book a consultation or make contact. Success is a booked call through the Google Calendar scheduling link, or an enquiry by email.

## Positioning

The delivery promise: "On Time, On Budget, On Demand." Garber Squared is chosen for predictable delivery, and the site must make that commitment credible rather than merely state it.

## Operating Context

- Visitors arrive to evaluate a consultancy before committing to a call.
- Primary conversion path: a free 30-minute consultation with Alexander Garber, booked through the Google Calendar appointment link. The secondary path is email to alex@garbersquared.com. The `/contact` form does not submit anywhere and is not linked from the home page.
- The blog lives off-site at alexandergarber.com and is linked from the header.
- The site also hosts compliance pages that third parties review: `/privacy`, `/terms`, and `/proof-of-consent` (SMS and messaging consent documentation).

## Capabilities and Constraints

Core services, as listed by the owner:

- Cross-platform application development (web, Android, iOS)
- APIs and integration: Google Cloud, RESTful APIs, MCP
- Business solutions: Google Workspace automation, knowledge base, process improvements
- Web development and DevOps: AWS, Heroku, Vercel, Supabase and similar
- Agentic AI and machine learning

How the promise is kept (confirmed by the owner):

- On Time: dated milestones, with working software at each one.
- On Budget: fixed scope and fixed price, agreed up front.
- On Demand: engagements start within days.

Constraints:

- Static Astro 5 + Tailwind CSS 3 site built from the AstroWind template; pages are compositions of widgets (see `CLAUDE.md`).
- No backend. Booking is delegated to Google Calendar appointment scheduling.
- Legal and consent copy on `/privacy`, `/terms`, and `/proof-of-consent` is factual and must not be reworded without the owner's approval.
- Contact details are fixed facts: alex@garbersquared.com and P.O. Box 321, Walkersville, MD 21793, USA. No phone number is published: the previous one is commented out in the source until the owner supplies a business number.

Undecided:

- Price figures and rates are not published. Do not state or imply amounts.
- Whether the ~260 draft posts in `src/content/drafts/` will be published on this site.
- Production domain: `src/config.yaml` still points at `https://garbersquared.vercel.app`.

## Brand Commitments

- Name: Garber Squared LLC ("Garber Squared" in running copy).
- Voice: "we" for the firm, with Alexander Garber named as the principal engineer the client works with.
- Promise line: "On Time, On Budget, On Demand."
- Existing voice in the live copy is brisk and launch-themed ("Production--Ready--Go!", "3, 2, 1...").

## Evidence on Hand

The owner confirmed that the following real proof exists:

- Named clients and case studies
- Testimonials
- Blog and open source work: alexandergarber.com, github.com/clockworkpc, and the draft posts in `src/content/drafts/`

None of the client names, case studies, or testimonials are in this repository yet. The owner must supply them; future work must not invent client names, quotes, metrics, or logos, and must leave a clearly marked gap where they are missing.

Template leftovers that are not evidence and must not be presented as Garber Squared's own: the AstroWind demo posts in `src/data/post/`, the demo pages under `src/pages/homes/` and `src/pages/landing/`, `src/assets/images/hero-image.png` (alt text still reads "AstroWind Hero Image"), the onWidget footer credit, and the `%s — AstroWind` title template.

## Product Principles

1. Prove the promise. "On Time, On Budget, On Demand" is the reason to choose Garber Squared, so every claim about delivery needs real evidence beside it.
2. Speak to a technical buyer. Founders and CTOs can tell specific engineering from generic service copy; be concrete about what gets built.
3. One next step. The visitor should always know how to book a conversation.
4. Only real proof. No fabricated clients, testimonials, numbers, or stock template content standing in for the company's own work.
5. Compliance pages stay accurate. Legal and consent content is a record, not marketing.
