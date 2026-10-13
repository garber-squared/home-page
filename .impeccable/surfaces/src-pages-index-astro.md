---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Surface brief: home page

Scope: `src/pages/index.astro`, with its own layout, header and footer. Visitor mode: Persuade.

- Audience and job: a startup founder or CTO judging whether Garber Squared delivers reliably, deciding whether to book a call.
- Action: "Book a free 30-minute consultation" (Google Calendar appointment link). Secondary: mailto alex@garbersquared.com. No link to the contact form.
- Proof and content: the promise with its three mechanisms (dated milestones with working software; fixed scope and price agreed up front; engagements start within days); five service groups in the owner's order (see PRODUCT.md); GitHub and writing as exhibits; client case studies and testimonials come from `src/data/exhibits.ts` once the owner supplies them.
- Voice: "we" for the firm, Alexander Garber named as the principal the client works with.
- Constraints: no price figures or rates, no invented clients, dates or durations. Legal pages, contact page and blog routes untouched. Light only.
- Memorable moment: the signature line, where Alexander has signed and the visitor's line is the booking button.
- Unresolved: whether a dark theme is wanted; real typical milestone durations.

## Direction contract

THESIS: The home page is the fixed-price statement of work a founder would sign. It refuses the centred hero over a grid of service cards.

OWN-WORLD: Pale green bond paper ground (#E4EFE6), blue-black ink (#10203A), stamp red (#C8102E) only for the FIXED PRICE stamp and the booking button. Libre Franklin for clause numbers and headings, Source Serif 4 for clause text. Square corners, ruled lines, a double margin rule with clause numbers hanging left of it. No cards, pills, gradients or shadows.

STORY: The visitor reads what is promised, sees how each part is kept, and signs by booking.

FIRST VIEWPORT: Title block as navigation across the top. Clause 1 below: a one-sentence statement of who Garber Squared is, then "On Time. / On Budget. / On Demand." stacked at display scale, each with its clause number in the margin and its mechanism beside it; Schedule A services index in a narrow right column; red FIXED PRICE stamp angled at top right. Signature block beneath with the red booking button on the visitor's line.

FORM: Statement of work; position 1 on the ordered list (the pick card, chosen by the user over the roll); seed key d654ea6a. Signature interaction: the stamp lands on load. Motion grammar: one press-and-settle, nothing else animated.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
