---
name: Garber Squared
description: The Statement of Work. The home page is the fixed-price engagement document a founder would sign.
colors:
  stamp-red: "#c8102e"
  bond-paper: "#e4efe6"
  contract-ink: "#10203a"
  soft-ink: "#3a4a5f"
  stamp-reverse: "#ffffff"
typography:
  display:
    fontFamily: "'Libre Franklin Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.75rem, 13.5vw, 6rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Libre Franklin Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2rem, 8vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "'Libre Franklin Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  numeral:
    fontFamily: "'Libre Franklin Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "'tnum', 'lnum'"
  aside:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  autograph:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1
  label:
    fontFamily: "'Libre Franklin Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 800
    lineHeight: 1.5
    letterSpacing: "0.08em"
  control:
    fontFamily: "'Libre Franklin Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 800
    lineHeight: 1.15
  stamp:
    fontFamily: "'Libre Franklin Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.09em"
rounded:
  none: "0px"
spacing:
  margin: "3.25rem"
  margin-40: "5.5rem"
  margin-64: "6.5rem"
  margin-80: "9rem"
  gutter: "1rem"
  gutter-40: "1.5rem"
  gutter-64: "2rem"
  edge: "1rem"
  edge-40: "1.5rem"
  edge-64: "2rem"
  edge-80: "2.5rem"
components:
  button-booking:
    backgroundColor: "{colors.stamp-red}"
    textColor: "{colors.stamp-reverse}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "1.05rem 1.25rem"
  button-booking-hover:
    backgroundColor: "{colors.contract-ink}"
    textColor: "{colors.stamp-reverse}"
  button-booking-header:
    backgroundColor: "{colors.contract-ink}"
    textColor: "{colors.bond-paper}"
    rounded: "{rounded.none}"
    padding: "0.45rem 0.7rem"
  button-booking-header-hover:
    backgroundColor: "{colors.bond-paper}"
    textColor: "{colors.contract-ink}"
  stamp:
    backgroundColor: "{colors.bond-paper}"
    textColor: "{colors.stamp-red}"
    typography: "{typography.stamp}"
    rounded: "{rounded.none}"
    padding: "0.4rem 0.7rem 0.4rem 0.85rem"
  title-block:
    backgroundColor: "{colors.bond-paper}"
    textColor: "{colors.contract-ink}"
    padding: "0.875rem 1rem"
  promise-row:
    backgroundColor: "{colors.bond-paper}"
    textColor: "{colors.contract-ink}"
    typography: "{typography.display}"
    padding: "1rem 1rem 0 1rem"
  signature-line:
    backgroundColor: "{colors.bond-paper}"
    textColor: "{colors.contract-ink}"
    typography: "{typography.autograph}"
    height: "4.5rem"
  clause-row:
    backgroundColor: "{colors.bond-paper}"
    textColor: "{colors.contract-ink}"
    typography: "{typography.title}"
    padding: "1rem 0 1.125rem"
  schedule-index:
    backgroundColor: "{colors.bond-paper}"
    textColor: "{colors.contract-ink}"
    typography: "{typography.body}"
    padding: "0.5rem 0"
---

# Design System: Garber Squared

## Overview

**Creative North Star: "The Statement of Work"**

The home page is the fixed-price engagement document a founder would sign. It is laid out as that document: a title block across the top that doubles as navigation, numbered clauses hanging in a ruled margin, schedules that itemise services and exhibits, and a signature block where the firm has already signed and the visitor's line is the booking button. The promise "On Time. On Budget. On Demand." is set as clause 1 at display scale, each part with its clause number and the mechanism that keeps it.

The material is flat ink on pale green bond paper. Structure comes from ruled lines and a double margin rule, never from boxes, tints or depth. Two typefaces do all the work: a heavy grotesque for everything that is numbered, titled or pressed, and a text serif for everything that is read. One red exists, and it means "this is the commitment": the FIXED PRICE stamp and the booking buttons. The page is dense and plain on purpose; it should read as a document someone could print and sign, not as a marketing template.

**Scope.** This world covers every public page: the home page, `/contact`, `/privacy`, `/terms`, `/proof-of-consent` and the 404 page, all through `DocumentLayout` (Markdown pages via `MarkdownLayout`, long-form text styled by `.sow-prose`). The old AstroWind layout (`PageLayout`, Inter, blue, pill buttons) survives only behind the disabled blog routes; it is superseded and should not be extended. The site is light-only. All tokens are CSS custom properties prefixed `--sow-`, declared on `.sow` (not `:root`) in `src/assets/styles/document.css`.

**Key Characteristics:**

- A document, not a landing page: title block, numbered clauses, schedules, signature block, imprint.
- Flat ink on paper. No shadows, gradients, tints or cards.
- Ruled lines carry the structure: 1px between rows, 2px between clauses, 4px at the title block, signature block and footer.
- A double margin rule runs the full height of the sheet, with clause numbers hanging to its left.
- One red, reserved for the stamp and the large booking button.
- Square corners everywhere; the stamp is the only rotated element.
- One primary action, repeated: book the consultation.

## Colors

Four colours and a reversed white: paper, two inks, and one red that is kept rare.

### Primary

- **Stamp Red** (#c8102e): the FIXED PRICE stamp (text, 4px border and 2px outer outline) and the fill of the large booking button on the signature line. Nothing else.

### Neutral

- **Bond Paper** (#e4efe6): the ground of the whole page, including the body behind the sheet. Also the stamp's fill, so the stamp masks the rule it is struck across.
- **Contract Ink** (#10203a): all text, every ruled line, the margin rule, button borders, the button hover fill, focus outlines and text selection.
- **Soft Ink** (#3a4a5f): document asides only. The italic note beneath a clause and the reference prefixes in the title block navigation ("§2", "Sched. A").
- **Stamp Reverse** (#ffffff): text and arrow on the red booking button. An untokenised literal in the stylesheet; it appears nowhere else.

### Named Rules

**The One Red Rule.** Stamp Red appears on the FIXED PRICE stamp and the large booking button on the signature line only. Links never turn red; a link is ink with an underline that thickens on hover.

**The Two Inks Rule.** Text is Contract Ink. Soft Ink is for asides and reference prefixes, never for clause text, headings or links.

## Typography

**Display Font:** Libre Franklin Variable (with 'Helvetica Neue', Arial, sans-serif)
**Body Font:** Source Serif 4 Variable (with Georgia, 'Times New Roman', serif)

**Character:** A heavy, tight grotesque for what is numbered, titled or pressed; a bookish serif for what is read. Both are variable fonts, self-hosted as woff2 in `public/fonts/` (Libre Franklin upright; Source Serif 4 upright and italic). Numerals are tabular and lining throughout.

### Hierarchy

- **Display** (Libre Franklin 800, clamp(2.75rem, 13.5vw, 6rem), line-height 1, -0.035em): the three promise lines. Never wraps. From 40rem the clamp is clamp(3.5rem, 11vw, 6rem); from 64rem, clamp(4.25rem, 7.1vw, 6rem) at line-height 1.08.
- **Headline** (Libre Franklin 800, clamp(2rem, 8vw, 4.5rem), line-height 1, -0.035em, balanced wrap): clause and schedule titles.
- **Title** (Libre Franklin 800, 1.375rem, 1.625rem from 40rem, line-height 1.15, -0.015em): the name of a row inside a clause.
- **Numeral** (Libre Franklin 800, line-height 1, -0.02em, right-aligned): clause numbers in the margin. 1.5rem on small screens rising to 3.25rem at 80rem for clause numbers; sub-clause numbers 1.125rem rising to 2.5rem. Row references ("2.1", "A.3") are weight 700 at body size.
- **Lead** (Source Serif 4 400, 1.1875rem rising to 1.375rem at 80rem, line-height 1.4): the opening sentence of clause 1 and clause intros (line-height 1.45). Capped at 38rem to 40rem.
- **Body** (Source Serif 4 400, 1.125rem, 1.1875rem from 40rem, line-height 1.5): clause text. Row text is capped at 36rem.
- **Aside** (Source Serif 4 italic 400, 1rem): clause notes in Soft Ink, row references, the italic half of a section label, "Statement of Work" in the title block.
- **Autograph** (Source Serif 4 italic 600, 1.875rem, 2.375rem from 64rem, line-height 1): the typeset signature.
- **Label** (Libre Franklin 800, 1.0625rem, 0.08em, uppercase): the titles of the signature block and the schedule index, each followed by an italic serif aside. The firm name in the title block and footer uses the same style at 0.04em.
- **Control** (Libre Franklin 800, 1.0625rem rising to 1.25rem at 80rem, line-height 1.15): booking button. Navigation links are weight 700 at 0.9375rem.
- **Stamp** (Libre Franklin 800, 1.125rem rising to 2.25rem at 80rem, 0.09em, uppercase): FIXED PRICE.

### Named Rules

**The Pressed and Read Rule.** Libre Franklin at 800 is for clause numbers, headings and controls. Source Serif 4 is for sentences. A sentence is never set in the sans; a heading is never set in the serif.

**The Typeset Signature Rule.** The signature is Source Serif 4 italic. No script or handwriting face is ever used to fake a pen.

## Layout

The page is one sheet with a left margin. Three custom properties set the geometry and step up at each breakpoint: the margin column (3.25rem, then 5.5rem at 40rem, 6.5rem at 64rem, 9rem at 80rem), the gutter between the margin rule and the text (1rem, 1.5rem, 2rem) and the outer edge (1rem, 1.5rem, 2rem, 2.5rem). There is no centred container and no max-width on the sheet; text measures are capped per element instead (30rem to 40rem).

The double margin rule is two 1px ink lines 6px apart overall, running the full height of the sheet at the right edge of the margin column. Clause numbers sit in the margin column, right-aligned with 0.75rem of padding before the rule. Every clause is a two-column grid: margin, then body.

Clause 1 is the exception that defines the first viewport. Below 64rem it stacks: lead, then each promise line with its mechanism beneath, then the schedule index. From 64rem it becomes a four-column grid (margin, promise words at their natural width, mechanism at 10rem to 14rem, schedule index filling the rest), each promise row closed by a 1px rule and the index separated by a 1px vertical rule.

Rows inside a clause are a reference column (3rem, 4rem from 40rem) and text; from 40rem the name and its text sit side by side in a 5:7 split, baseline-aligned. The signature block uses the same 5:7 split from 40rem.

Vertical rhythm: clauses have 3.5rem above and 3rem below (5rem and 4rem from 64rem); rows have 1rem above and 1.125rem below; the signature block 2.25rem above and 3rem below.

The title block wraps to two lines below 64rem (name and booking button, then navigation) and becomes a single line from 64rem, aligned to the text column. "Statement of Work" appears from 40rem; the reference prefixes appear from 80rem.

## Elevation & Depth

None. This is flat ink on paper and depth is never used: no box-shadow, no text-shadow, no tonal layering, no overlapping surfaces. The one stacked element is the stamp, which sits over the title block's rule and uses a paper fill to mask it. Hierarchy is carried by rule weight (1px, 2px, 4px), type weight and size.

### Named Rules

**The Ruled Line Rule.** Separation is a line. 1px ink between rows and promise lines, 2px between clauses and under a signature, 4px for the title block, signature block and footer. If something needs separating and a line will not do it, the layout is wrong.

## Shapes

Square corners everywhere; no radius is declared anywhere in the world. Buttons are rectangles with a 2px ink border. The stamp is a rectangle with a 4px red border and a second 2px red outline 3px outside it, and is the only rotated element (-5deg). Icons are two inline line drawings in ink or white, stroked at 2.5 to 3: the signature cross and the button arrow.

## Components

### Title block navigation

The document header is the navigation. A flex row closed by a 4px ink rule: the logo (`src/assets/images/logo/09_cube-g-horizontal-ink.svg`, the cube-G lockup recoloured to Contract Ink with Soft Ink for the inner mark and the "SQUARED LLC" line; 2.75rem tall, 3.5rem from 40rem) with "Statement of Work" in serif italic beside it from 40rem, section links, and the small booking button. Links are Libre Franklin 700 at 0.9375rem with a 2px underline offset 0.3em that thickens to 4px on hover. From 80rem each link gains a Soft Ink reference prefix ("§2", "Sched. A", "Sched. B", "Ref."). Not sticky.

### Booking button

The one primary action, in two sizes with square corners and a 2px Contract Ink border. The large button is Stamp Red with white Libre Franklin 800; the small one in the title block is Contract Ink with Bond Paper text, so the stamp beside it stays the only red at the top of the sheet.

- **Large** (signature line): padding 1.05rem 1.25rem (1.2rem 1.4rem from 40rem, 1.25rem 1.5rem from 80rem), text 1.0625rem rising to 1.25rem, with a 1.375rem arrow after the label.
- **Small** (title block): Contract Ink fill, Bond Paper text, padding 0.45rem 0.7rem, text 0.9375rem, line-height 1, no arrow. Label "Book a call". On hover it inverts to Bond Paper fill with ink text.
- **Hover (large):** the fill changes to Contract Ink over 0.2s and the arrow moves 4px right.
- **Active:** the large button moves down 2px.
- **Focus:** 3px Contract Ink outline, offset 3px, as for every link.

### FIXED PRICE stamp

Struck across the title block's rule at the top right of clause 1. Stamp Red text, border and outer outline on a Bond Paper fill, rotated -5deg, uppercase at 0.09em. Decorative (hidden from assistive technology). This is the page's one authored motion: on load it lands over 0.7s with cubic-bezier(0.16, 1, 0.3, 1) after a 0.35s delay, from a larger, blurred, more rotated state, and only when the visitor has not asked for reduced motion.

### Promise row

A clause number in the margin, the promise words at display scale, and the mechanism in serif body text. Stacked with a 1px rule above each row below 64rem; from 64rem the words and mechanism sit on one line, the mechanism vertically centred, with a 1px rule beneath every row but the last.

### Signature line

A 2px ink rule with content resting on it, at least 4.5rem tall (5.5rem from 64rem). The firm's line carries the typeset signature; the visitor's line carries an ink cross (1.75rem) and the large booking button, which overlaps the rule by 0.375rem. Beneath each line, a party caption in 1rem serif with the name or role in Libre Franklin 700. The block sits under a 4px rule with an uppercase label and an italic aside.

### Clause / schedule row

A numbered row inside a clause: reference in Libre Franklin 700, name in Title style, text in serif body. 1px rule above each row and one beneath the list. Clauses themselves open with a 2px rule, a margin numeral and a Headline title, and may close with a Soft Ink italic note.

### Schedule index list

A short table of contents for a schedule. Uppercase label with an italic aside, then rows of reference (Libre Franklin 700, in a 2.75rem column) and linked name, each with a 1px rule above, line-height 1.3. Links are not underlined at rest and take a 2px underline on hover.

### Footer imprint

Firm name as a label, postal address, email and phone in 1rem serif, with legal and social links in Libre Franklin 600. Sits under a 4px rule, aligned to the text column.

## Do's and Don'ts

### Do:

- **Do** keep one primary action, the booking button, and repeat it rather than adding a second kind of call to action.
- **Do** separate things with ruled lines in Contract Ink: 1px for rows, 2px for clauses, 4px for the title block, signature block and footer.
- **Do** hang every clause number in the margin column, right-aligned against the double margin rule.
- **Do** set numbers, headings and controls in Libre Franklin 800 and sentences in Source Serif 4.
- **Do** use italic Source Serif 4 for document asides and the signature.
- **Do** keep links in ink with an underline that thickens on hover, and a 3px ink focus outline offset 3px.
- **Do** keep corners square and the page flat.
- **Do** gate motion behind `prefers-reduced-motion: no-preference`, and limit it to the stamp landing plus the button's colour change and 4px arrow nudge.
- **Do** read tokens from the `--sow-` custom properties on `.sow`, and build new pages in this world on `DocumentLayout`.
- **Do** leave exhibits empty until real case studies and testimonials are supplied.

### Don't:

- **Don't** use cards, pills, gradients or shadows.
- **Don't** use Stamp Red for anything but the FIXED PRICE stamp and the booking buttons. Links never turn red.
- **Don't** use a script or handwriting font for the signature.
- **Don't** round a corner or rotate anything other than the stamp.
- **Don't** invent clients, testimonials, dates, durations or prices, and don't state price figures.
- **Don't** add a second accent colour, a tinted panel or a dark theme; this world is light-only.
- **Don't** animate anything on scroll or add further entrance animations; the stamp is the one authored moment.
- **Don't** extend the old AstroWind look (Inter, blue #0161EF, pill buttons, centred hero over service cards) to new work.
- **Don't** centre the sheet in a max-width container; the margin rule and left alignment are the layout.
