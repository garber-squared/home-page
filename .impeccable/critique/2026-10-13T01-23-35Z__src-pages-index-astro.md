---
target: src/pages/index.astro
total_score: 11
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 3
target_identity: "file:/home/alexanderg/Development/garber-squared/src/pages/index.astro"
target_fingerprint: "sha256:3abcf202d53c8451a1d49f646a3d23542ecc0c6779a2f9ffc96ff06201260848"
target_path: /home/alexanderg/Development/garber-squared/src/pages/index.astro
timestamp: 2026-10-13T01-23-35Z
slug: src-pages-index-astro
---
Method: dual-agent (A: independent design review · B: detector and browser evidence)

# Critique: home page (`src/pages/index.astro`)

Assessment A reviewed source and the served HTML, with no screenshots. Assessment B ran the detector and took headless screenshots at 1440 and 390 wide against the dev container on port 4321. No detector overlay was injected.

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Header links have no hover colour in light mode (`hover:text-link` is undefined); nothing signals which links open new tabs |
| 2 | Match System / Real World | 2 | Services sit under a "Features" label; "3, 2, 1..." and "Production--Ready--Go!" mean nothing out of context |
| 3 | User Control and Freedom | 2 | "Contact Us" opens an internal page in a new tab, which breaks Back |
| 4 | Consistency and Standards | 1 | Three different headlines across title, h1 and description; every button is primary |
| 5 | Error Prevention | 1 | Main button leads to a form that submits nowhere; booking URL is malformed |
| 6 | Recognition Rather Than Recall | 2 | Booking exists only as a header text link, behind the hamburger on phones |
| 7 | Flexibility and Efficiency | n/a | Single-scroll marketing page |
| 8 | Aesthetic and Minimalist Design | 2 | Sparse but not purposeful: template promo bar, decorative astronaut, eight equal blurbs |
| 9 | Error Recovery | 1 | The two failure paths (booking embed, contact form) fail with no message |
| 10 | Help and Documentation | n/a | No task that needs documentation |
| **Total** | | **11/32** | **Poor (34%)** |

## Design Specificity Verdict

**Design review.** The page is the AstroWind demo with the nouns swapped, and any company could use it unchanged.
- The hero image is AstroWind's astronaut, with alt text "AstroWind Hero Image".
- At desktop width the page opens with a black bar reading "NEW Astro v5.7 is now available!" and an AstroWind GitHub stars badge.
- The logo is a rocket emoji plus the site name, while 14 real logo SVGs sit unused in `src/assets/images/logo/`.
- The positioning line, "On Time, On Budget, On Demand", gets the smallest treatment on the page.

**Deterministic scan.** Three advisory findings, no errors:
- `src/pages/index.astro:32` — colour `#039BE5` is outside the `DESIGN.md` palette.
- `src/components/widgets/Features.astro:31` — `1.3rem` is off the type ramp.
- `src/components/widgets/Header.astro:86` — `0.9375rem` is off the type ramp.

All three are real but minor. The detector found none of the serious problems; those came from reading the served HTML.

**Measured in the browser.** No horizontal overflow, no clipped text, no console errors and no failed requests at either width. `/contact`, `/terms` and `/privacy` return 200.

## Overall Impression

A founder or CTO lands on a page that says "reliable delivery" while showing an unfinished template, and the one action the site exists for is not offered in the page body. The biggest opportunity is to rebuild the page around three things: the promise, real proof of it, and a booking button that works.

## What's Working

- **The promise line.** "On Time, On Budget, On Demand" is short, memorable and a real position.
- **Sound structure.** Four sections, a correct heading outline, light and dark themes on tokens, motion gated behind `motion-safe`, and token colours that pass AA contrast (white on the primary blue is about 5.3:1).
- **A few honest service lines.** "From a simple landing page to a complex web application" and the Google Workspace item name real, scoped work.

## Priority Issues

**[P0] No working path from the page to a conversation**
- **What:**
  - The Google Calendar booking script never reaches the page. `index.astro:23-39` passes a `head` slot, but neither layout declares one, so the served HTML contains none of it.
  - "Book a Consultation" is only a header text link, hidden behind the hamburger on phones. Its URL ends `?gv: true` instead of `?gv=true` (`src/navigation.ts:51`).
  - The most prominent button, "Contact Us", goes to `/contact`, whose form is a bare `<form>` with no action (`src/components/ui/Form.astro:8`).
- **Why it matters:** a convinced visitor who presses the big blue button writes a message that goes nowhere, and a phone visitor never sees a booking option.
- **Fix:** make "Book a Consultation" the single primary button in the hero and closing section, with the corrected URL. Delete the dead head block or add a real `head` slot and target element. Do not link to the form until it submits somewhere.
- **Suggested command:** `/impeccable harden`

**[P1] Template residue undermines the delivery promise**
- **What:**
  - The Astro announcement bar, the astronaut hero image and the rocket-emoji logo.
  - RSS icons that lead to a feed of AstroWind demo posts.
  - A share image (`default.png`) that is a screenshot of the AstroWind demo.
  - `twitter:site` set to `@onwidget`, and a title template that renders `/contact` as "Contact — AstroWind".
- **Why it matters:** the buyer is judging whether this firm finishes things.
- **Fix:** empty the `announcement` slot, remove the hero image until there is a real artefact, use one of the existing logo SVGs, drop both RSS links, and replace the share image, handle and title template.
- **Suggested command:** `/impeccable distill`

**[P1] The promise is asserted and never proven**
- **What:** the promise is a one-line strip with an info icon (`index.astro:86`). The page has no clients, case studies, testimonials, process or named person. GitHub is a footer icon and the blog is a nav label.
- **Why it matters:** every vendor says "on time, on budget"; a CTO believes it only with evidence.
- **Fix:** make the promise the hero headline, give each of its three clauses a mechanism, and add a clearly marked slot for the case studies and testimonials the owner said exist. Nothing gets invented.
- **Suggested command:** `/impeccable shape`

**[P1] No primary action and no consistent message**
- **What:**
  - All five buttons are primary, and "Find us on LinkedIn" sends a warm visitor off-site twice.
  - At 1440 wide the three hero buttons are squeezed to roughly 130–145px each, so labels wrap onto two or three lines.
  - The headline changes between "Software Solutions for the Modern World", "AI Solutions For The Modern Business" and "Boutique Software Solutions".
  - The services subtitle addresses a small-business owner, not a founder.
- **Why it matters:** equal emphasis gives no guidance, and the mixed audience signal reads as a local IT shop.
- **Fix:** one primary (book), one secondary (email), LinkedIn in the footer only, "Learn more" removed, one headline used everywhere.
- **Suggested command:** `/impeccable clarify`

**[P2] Services are generic, flat and mis-weighted**
- **What:** eight equal items (`index.astro:96-145`). SEO and "Computer and Smartphone Integration" carry the same weight as agentic AI and APIs, and the descriptions define categories, not what gets built. The SEO line is not a sentence.
- **Why it matters:** the long tail dilutes the senior-engineering signal.
- **Fix:** four groups matching `PRODUCT.md`, AI and API first, business tooling as one compact line, each with a concrete deliverable.
- **Suggested command:** `/impeccable layout`

## Persona Red Flags

**Jordan (first-timer):** cannot tell which of three identical blue buttons is the next step. "Book a Consultation" looks like a nav item. Nothing says what a consultation is, how long it takes or whether it is free.

**Riley (stress tester):** submits the contact form and nothing is sent. Clicks RSS and gets AstroWind tutorials under the Garber Squared name. Finds `/pricing`, `/services`, `/about`, `/homes/*` and `/landing/*` still built and indexable. Shares the link and gets the AstroWind preview image.

**Casey (mobile):** the sentence that says what the company is gets hidden at phone width (`hidden sm:inline`, `index.astro:76`), leaving a slogan and a keyword list. Three stacked full-width buttons follow, two of which open new tabs, and none of them books a call.

**Startup CTO (from `PRODUCT.md`):** sees the Astro release banner and concludes the firm does not finish things. Looks for who the engineers are, the stack and past systems, and finds a footer icon. Reads "leveraging advanced AI technologies" as filler.

## Minor Observations

- `/contact` still carries AstroWind copy about "purchased templates" and lists `support@garbersquared.com`, against `alex@garbersquared.com` in `PRODUCT.md`.
- The header booking link has `target="_blank"` with no `rel`.
- The meta description starts with a rocket emoji; canonical and `og:url` point at `garbersquared.vercel.app`.
- The footer shows no contact details, and its bottom bar is an empty div.
- `index.astro` imports seven unused widgets and carries about 270 lines of commented-out template markup.
- The h1 contains an empty `<span>`, and its violet second half turns white in dark mode.
- Unconfirmed: with JavaScript blocked at desktop width, every block may stay at opacity 0. The full-page desktop screenshot also came out near-transparent, which is probably a capture artefact of the same scroll-reveal.

## Questions to Consider

- If the promise is the position, why is the largest element an astronaut and the smallest the promise?
- This is effectively one senior engineer's practice. Would "Alexander Garber, here is what I shipped" persuade a CTO more than an anonymous "we"?
- What would be missed if the page held only the promise, the proof and a booking button?
- Are SEO, maintenance and device integration winning founder work, or signalling a different kind of firm?
