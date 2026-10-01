---
name: Forest International School Paris
description: A practical school prospectus built around the published campus, curriculum and people.
colors:
  forest-green: "#2d5a3d"
  forest-light: "#4a7c5c"
  forest-dark: "#1e3d29"
  cream: "#faf8f5"
  gold: "#c9a962"
  gold-ink: "#72591e"
  surface: "#f1f5f2"
  text: "#35483b"
  text-muted: "#526258"
  line: "#d9e2dc"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.25rem, 5.2vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2rem, 3.1vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.18
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "14px"
    fontWeight: 600
rounded:
  control: "8px"
  media: "12px"
spacing:
  section: "clamp(3.5rem, 7vw, 6rem)"
  action-gap: "12px"
components:
  button-primary:
    backgroundColor: "{colors.forest-green}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.forest-dark}"
    textColor: "{colors.white}"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.forest-dark}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  text-link:
    textColor: "{colors.forest-green}"
  navigation:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text}"
  announcement:
    backgroundColor: "{colors.white}"
    textColor: "{colors.forest-dark}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
---

# Design System: Forest International School Paris

## Overview

**Creative North Star: "The school prospectus"**

A parent is comparing schools on a phone during the day, looking for the age range, location, curriculum, fees and a way to visit. Clear light surfaces support that reading; the established forest green gives the school a recognisable presence. The reference is this site's published school material and existing identity, rather than a borrowed marketing template.

The voice is warm, grounded and expert, as defined in `PRODUCT.md`. Lead with information a family can use. Use the school's existing photographs, video, staff portraits and campus overview with accurate descriptions. An illustration is not evidence of a photographed place.

The homepage uses a maximum 72rem container, fluid section spacing, short introductory text and varied layouts suited to each subject. Programme links use images with copy beneath them; school-life topics use a keyboard-accessible photo selector; parent quotations remain verbatim. Shared navigation uses an 80rem container to accommodate its links.

**Key Characteristics:**

- School information before promotional language.
- Published imagery with clear, readable captions and supporting text.
- Solid actions, flat surfaces and restrained motion.
- Keyboard access and readable text at every viewport.

This document records the cleaned homepage and shared components. Older interior-page layouts still contain legacy utility styles; this is the reference for bringing them into line, not a claim that every page has been redesigned. `CLAUDE.md` remains authoritative for school facts and publication.

## Colors

Preserve the existing forest palette. Values above map to custom properties in `src/styles/global.css`; update code and this reference together.

Forest green is the primary action colour. Forest dark carries the hero, parent quotations and visit invitation. Gold provides a limited accent on dark backgrounds and the visit button, where the label is dark green. Never use pale gold for small text on white; use gold ink or forest green.

Cream is an existing brand background, retained for continuity. White and the green-tinted surface separate content without decorative gradients. Text and text-muted provide readable green neutrals. The line colour divides related content and outlines disclosure panels.

Photo overlays are permitted when they make text readable. Decorative gradients, gradient text and patterned backgrounds do not belong in this system. Check contrast against the actual rendered background: at least 4.5:1 for ordinary text and 3:1 for large text.

## Typography

Retain Playfair Display for headings and Inter for body text and controls. Both predate this cleanup and are preserved as part of the existing identity. Do not add another font family to distinguish a new section.

Homepage display type tops out at 4.5rem, with a 1.12 line height and −0.025em tracking. Section headings range from 2rem to 2.75rem. Body text is 1rem with a 1.75 line height; supporting labels are at least 0.875rem. Limit prose to 65–75 characters per line. Balance headings and use pretty wrapping on paragraphs.

Headings should name the subject or answer a parent's question. Use sentence case in controls and headings, preserving proper programme names. Avoid vague superlatives, repeated rhetorical questions, section eyebrows and artificial numbered markers. Numbers are appropriate for an actual sequence or a factual age range.

## Elevation

The cleaned surfaces are flat. Use spacing, solid backgrounds and single borders to show grouping. Do not combine an outline with a wide soft shadow. The existing article-table wrapper has a small 0 4px 8px shadow; it is not a general card style.

Stacking tokens define dropdown, sticky navigation, floating contact, modal and skip-link layers. Announcements use native modal dialogs so focus containment and the browser's top layer work together. Never introduce arbitrary z-index values.

State transitions use `--duration-fast` (180ms), `--duration-slow` (350ms) and `--ease-out`. A programme image can enlarge gently on hover. Content is visible without entrance animations, and reduced-motion preferences disable movement and smooth scrolling.

## Components

### Actions

Use `.btn-primary` for a solid green action, `.btn-gold` for the primary action on a dark section, and `.text-link` for supporting navigation. Controls have an 8px radius and at least a 44px target; primary buttons are at least 48px high. Keep labels specific: “Book a visit”, “View school fees”, “How to apply”.

Keyboard focus uses a 3px forest-green outline, a 4px offset and a white separation ring. Never remove it. Underline text links so meaning does not depend on colour. External form links announce that they open in a new tab.

### Navigation

The solid white header stays at the top of the viewport. The School disclosure is a native `details` element, activated by click, touch or keyboard. Its links have current-page states. Escape closes it and returns focus; clicking outside or moving focus away closes it.

Below 820px, use the mobile disclosure. From 820–1199px, tighten navigation spacing while keeping all desktop links visible. The forest-dark contact strip with telephone and email links appears above the navigation at every width. On phones, it centres the two links and omits the location line. There is no separate call button beside the menu; the open mobile menu ends with a direct-dial link. The menu button exposes its expanded state and controlled region. The panel scrolls within the viewport, closes on Escape and resets when crossing the desktop breakpoint. The brand name remains visible on small screens.

### Content and media

Programme links have 12px image corners, a visible age range and an ordinary text description. Keep text below the image. Use semantic tables for fee comparisons and unboxed figures for parent quotations and staff portraits. Match the layout to the content instead of creating another grid of identical cards.

Images need meaningful alt text, explicit dimensions or an aspect ratio, and lazy loading below the fold. The decorative hero image has empty alt text. The school film uses native video controls and does not preload the film. Do not describe existing illustrative material as a documentary photograph.

### Announcements and contact

The announcement is a native `dialog` labelled by its title. Close, Escape, backdrop dismissal and focus return must work. Its date, time, message and links come from `Layout.astro`; visual changes must not silently change those facts. The compact reopening button uses a single border and readable date text.

Floating contact actions and the announcement button must stay separate on narrow screens. They are hidden while mobile navigation is open so they cannot cover its links. Footer email addresses wrap without forcing horizontal scrolling. Telephone and email details are actionable links. Keep a visible skip-to-content link for keyboard users.

## Do's and Don'ts

### Do

- Do build trust with concrete school evidence, published material and practical details.
- Do structure information around age fit, curriculum, location, fees and how to visit.
- Do preserve school facts, parent quotations, names, links and policy commitments.
- Do keep the school warm, grounded and expert, with natural British English.
- Do test navigation, dialogs, focus, reduced motion and widths from 320px through desktop.
- Do review the rendered page as well as the automated detector results.

### Don't

- Don't use generic AI school marketing, vague benefits of bilingual education, abstract claims about nurturing potential, stock-sounding education copy or unsupported superlatives.
- Don't use repeated identical card grids, pill labels above every section, oversized rounded cards, soft-shadow decoration, generic green nature branding or design flourishes that do not help a parent make a decision.
- Don't invent facts, retain stale dates as current, introduce inconsistent contact details, add new photos of children without explicit approval, expose pupil personal data or make claims without a canonical source.
- Don't make the site feel like a luxury school brochure, a corporate SaaS landing page, a playful children's brand or a formal government institution.
- Don't use decorative leaf motifs, glass panels, metric tiles, animated bouncing arrows, gradient text or coloured side-stripe borders.
- Don't silently change fees, dates, staff, ages, hours or policies during a visual cleanup. Follow `CLAUDE.md`.


## Audit remediation — 1 October 2026

Interior-page actions and surfaces use the shared forest palette and media-radius tokens. Small gold text uses gold-ink on light surfaces; dark sections use white labels. Decorative side stripes, large shadows, pill-shaped section labels and patterned hero backgrounds have been removed from the main information pages. Existing words, dates, fee amounts and booking destinations are preserved.

The tuition comparison is a native table with a caption, column headers and row headers. Its named, focusable scroll region supports keyboard and touch navigation. The year-group column stays visible while scrolling on a phone; the hint explains both input methods.

The homepage campus photograph has AVIF and WebP variants at 640, 960, 1440 and 1829 pixels. Retain high fetch priority, explicit dimensions and the approved crop. Do not lazy-load the hero. The original PNG remains available as source material.

The navigation row may wrap when text is enlarged, retaining the menu without horizontal overflow.

## Open House post-registration page — 1 October 2026

`/open-house/thank-you/` is a noindex utility page, excluded from the sitemap. It shares the existing campus photograph, typography and green/gold tokens. The page offers Google Calendar, an Apple/Outlook ICS download, school directions and a mailto contact for changes of plan. It does not verify a registration, send a reminder email, confirm attendance or automatically cancel/change a booking. Do not count a page visit as a completed registration.

Event dates and the registration URL now live in `seo/_registry.json` under `open_house`, shared by the announcement and the calendar/page. Times are displayed in Europe/Paris; calendar timestamps are UTC. The ICS contains a one-day display reminder, subject to the user's calendar settings. Refresh this event configuration before reusing the page for a future event.

Parking wording was updated following explicit user confirmation on 1 October 2026: spaces are available at the school entrance, and an additional car park is approximately three minutes away. Its user-supplied map link is https://maps.app.goo.gl/4vN2Wg99WENBhhwX9 and is stored in the event registry. The travel mode was not specified, so the copy does not label this a walking or driving time. The parking-specific telephone prompt has been removed. Address and event details were checked against https://forest-international.com/contact/ on 1 October 2026.

### Connect the existing Google Form after deployment

The existing registration form remains unchanged. Once the new page is deployed and its public URL works, the form owner can set Settings → Presentation → Confirmation message to:

> Thank you for registering for our Open House. Save the date to your calendar and find directions for your visit: https://forest-international.com/open-house/thank-you/

Google documents the confirmation-message setting at https://support.google.com/docs/answer/2839588?hl=en. This provides a post-submission link, not an automatic redirect. No live form settings were changed and no attendee messages were sent as part of this implementation.

### Embedded registration preview

`/open-house/register/` embeds the existing form with `embedded=true&hl=en` in a full-viewport shell without the school navigation or contact strip. Below 1000px, the form fills the space beneath a compact top row: the return link on the left and a calendar icon with “Save date” on the right. There is no bottom action bar. At 1000px and wider, the form sits beside a forest-dark sidebar with the event date, an Add to calendar chooser, directions and parking details from the shared event registry. Only one calendar trigger is visible at each width; an open chooser closes when its trigger becomes hidden at the breakpoint. The sidebar scrolls independently in short windows; its calendar popover follows internal scrolling. The separate thank-you page remains available after registration. No success wording is shown on the registration sidebar. A compact arrow link above the form returns to the referring same-origin school page, with the homepage as fallback; its destination survives reloads via history state. It navigates directly rather than stepping through Google Forms iframe history. Registration-page map and Google Calendar links use the current tab; Apple/Outlook remain ICS downloads. The regular site footer and contact bubbles are omitted. It is noindex and excluded from the sitemap. No iframe load event is treated as a successful submission or used to redirect visitors.

Google's cross-origin document height is not available to the parent. Instead of guessing heights or disabling form scrolling, the shell uses viewport flex sizing: the iframe is the sole scroll surface and the action bar reserves its own space. Calendar links open an event draft/import that the visitor must save; they do not silently add an event.

The public form inspected on 1 October 2026 still says “26th September 2026”, whereas the site's event is 5 December. The user requested removal of the visible preview notice. The existing homepage registration destination remains unchanged. Before promoting this route, the form owner must correct the date, verify all form sections, and add the post-submission link described above. Then switch the announcement destination to `/open-house/register/`. No test registration was submitted.

### Calendar provider chooser

Both Open House pages use `CalendarButton.astro`: a native popover with Google Calendar, Apple Calendar and Outlook links. It positions above the pinned action bar and below the confirmation-page button when there is room; keyboard Tab, Escape and outside dismissal are supported. Google opens an event draft; Apple and Outlook download the same compatible ICS file. Provider selection is not proof of the app eventually used or of a saved event.

The shared Analytics component captures `calendar_option_click` with `provider`, `event_id` and `path`; PostHog's standard device properties support device breakdowns. It is an engagement event, not a registration/attendance conversion. The standalone registration page now includes Analytics, retaining the existing production-host guard, so local previews do not send events.

Calendar entries include the event date, Paris time, school address, visit-details URL, directions and nearby parking link in both Google Calendar and the ICS description. Calendar choices include simple icons from the existing Lucide set. The visit-details link is no longer displayed alongside the form; no automatic post-submit detection is implemented.

### Homepage rhythm — October 2026

The homepage now introduces campus → school film → school life → teachers → programmes. The approved welcome B and school-life C structures remain; Nature-Based Learning is the initial tab. A wider film with an explicit play control provides the main invitation into school life. Native video controls remain the no-JavaScript and playback-error fallback; playback requires a click. Teacher portraits appear before programme selection, mobile programmes use compact image-and-text rows, and the first existing parent quotation has greater typographic emphasis. The campus hero retains its responsive assets and SEO heading, with a larger heading and lighter overlay toward the building. Shared identity tokens and existing approved photographs are retained.

Validation: production build, 320/390/768/1440px overflow checks, desktop/mobile WCAG A/AA automated checks, keyboard topic navigation, and actual video playback passed locally. This is a local preview, not a deployment.

## Legal pages and third-party content — 1 October 2026

`/legal/` (mentions légales) and `/privacy/` share `LegalPage.astro` and are linked from the footer. They are noindex and excluded from the sitemap. Company details are stored in `seo/_registry.json` under `legal_entity`. Contact details are read from `nap` via `src/lib/site.ts`. Neither should be copied into page text.

Google Calendar booking and Google Maps iframes load directly with the page, at the user's request. The privacy policy discloses that they may set cookies. Fonts are self-hosted through `@fontsource`. PostHog runs with `cookieless_mode: 'always'` and session recording turned off. "Cookieless server hash mode" must remain enabled in the PostHog project. Any new embed, analytics feature or form provider requires an update to `/privacy/` in the same change.

## Interior pages — October 2026

Interior pages follow the homepage system and use shared building blocks rather than page-specific copies:

- `PageHero.astro` provides the page title, an optional factual kicker line (sentence case, for example "Ages 6–11 · Mareil-Marly"), an intro and actions. With `image`, it uses a photograph with left-side shading, as on the homepage; without `image`, it uses a solid forest-dark band.
- `VisitBand.astro` is the closing forest-dark invitation, with a gold primary action and a `.link-on-dark` secondary action.
- `PortraitList.astro` shows staff portraits at a 5:6 crop. Its `compact` grid uses 6/4/3/2 columns.
- Global classes in `global.css` include `.page-section` (with `.surface` for the pale green band), `.prose-copy`, `.lead-copy`, `.fact-list` (label/value rows), `.row-list` (titled paragraphs separated by rules), `.split-layout` and `.media-rounded`.

- `CampList.astro` displays the camp schedule. Facts that are identical for every camp, such as food and transport, appear once in a panel labelled "For every camp". Each camp shows only its season, dates (set large), name, hours and rate on a single line, description, any extras, and its own registration link. Its English and French data stay on their own pages.
- `SectionChooser.astro`, placed in the `PageHero` `aside` slot, links directly to sections when a page serves more than one purpose. `/holiday-camps/` uses it for "Holiday camps" and "Wednesday MasterClasses". It sits in the hero's right-hand column on desktop and directly below the title on one-column screens.

The navigation label for `/holiday-camps/` is "Holidays & Wednesdays"; its URL is unchanged. The hero title on that page uses colour coding to match its two choices: "Holidays" is gold (`--color-gold`, with a sun icon), and "Wednesdays" is leaf green (`--color-leaf: #a7d7b5`, a light green for text on forest-dark, with a calendar icon). The choice panels use matching tints. Use `--color-leaf` only on dark backgrounds. Between 820 and 899px, the sun icon is hidden so the label stays on one line.

Use rule-separated rows or fact lists instead of grids of identical cards, icon tiles or checkmark lists. Do not use uppercase tracked eyebrows above headings, pill-shaped buttons or hard-coded hex colours. Write headings in sentence case. Alternate backgrounds only when this separates distinct subjects: the default background, then `.surface`, then the forest-dark visit band. `about.astro` and `team.astro` are the reference implementations.
