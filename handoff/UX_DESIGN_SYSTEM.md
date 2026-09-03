# UX and design system

## Design intent

TenantProof should feel like a purpose-built engineering workbench: calm, exact, spacious, and credible. It must not resemble a generic admin template, a sketch, or an ornamental security landing page.

The interface exists to make a boundary contract, execution, repair, and evidence easy to inspect. Visual novelty must come from the product’s structure—not abstract shapes.

## Non-negotiable direction

- product behavior before marketing decoration
- concise copy and strong information hierarchy
- horizontal Scope → Matrix → Run → Repair → Report flow
- no permanent generic SaaS sidebar
- no permanently visible inspector
- no abstract tenant circles, jagged seams, decorative boundary paths, hacker motifs, neon dashboards, or stock padlocks
- no headline or concept resembling “Watch the boundary hold”
- secondary operational concepts belong on separate future pages, not crowded into the core workbench

## Brand personality

- precise, not academic
- confident, not absolute
- premium, not ornamental
- security-conscious, not fear-driven
- technical, but founder-readable
- restrained, not sterile

## Visual sources

- `public/assets/styles.css` supplies the shared marketing/legal baseline, global shell, forms, and existing status vocabulary
- `public/assets/workbench.css` supplies route-scoped home and Focus Workbench composition
- system fonts only; no external font or runtime dependency

### Color rules

- graphite/ink establishes structure
- warm paper keeps dense evidence readable
- restrained violet identifies product controls, not security success
- green means a recorded pass, red an observed contradiction, amber/open an unresolved state
- never rely on color alone and never derive an aggregate “secure” badge
- maintain WCAG AA text/control contrast; target AAA for body copy where practical

## Typography and content density

- one H1 per page
- short declarative headings; concrete nouns and verbs
- compact metadata labels support scanning but never replace headings
- body copy should normally stay within 60–75 characters per line
- do not repeat the same value proposition across multiple long sections
- use authentic details—check ID, resource, actor, operation, observation—rather than filler copy

## Layout

### Marketing page

- compact editorial hero with an actual Run-stage preview
- bounded section rhythm and visible deliverable/pricing choices
- no oversized dead space or endless sales-page copy

### Focus Workbench

- compact global header
- full-width horizontal stage rail
- one primary stage surface at a time
- tables, cards, and diffs use the width needed by the current task
- evidence opens in a temporary bottom dock only after row selection
- never compress navigation, table, and inspector into a permanent three-column layout

### Responsive behavior

- marketing navigation collapses at 760 px
- stage rail may scroll horizontally inside its own region
- matrix contracts and repair panes stack before becoming cramped
- report tables may scroll only inside an explicit labeled focusable region
- no document-level horizontal overflow at 390 px
- mobile retains a prominent fictional-demo label
- practical controls target at least a 44 px hit area

## Components

### Buttons

One dominant action per section. Labels state outcomes: `Open sample workbench`, `Prepare scope`, `Choose report`, `Print report`. Secondary actions use quieter treatments. No fake urgency.

### Stage rail

- five ordered controls with numeric/completed states
- active stage uses `aria-current="step"`
- stage switch reveals exactly one panel and can move focus to its H2
- rail is workflow navigation, not a sitewide SaaS sidebar

### Matrix contracts

Pair an allowed path with the corresponding denied comparison. Name the actor, resource, operation, and expectation. Preserve open/untested scope explicitly.

### Evidence table and dock

- keyboard-selectable rows with visible selected state
- text labels for status
- selected row opens a bottom dock containing redacted evidence and remediation
- dock is dismissible, closes on stage change, and is not needed to understand the table

### Repair diff

Use a compact reviewable change with affected path, observed contradiction, branch/review state, and retest contract. A fictional patch must never look merged or owner-approved.

### Forms and imports

- labels remain visible
- help text says what not to submit where risk exists
- local report import states browser-memory-only behavior and 2 MB limit
- scope form uses native validation and focuses the first invalid field
- no credential or customer-record field

## Motion

- motion is optional feedback, never the product idea
- use brief opacity/position transitions for stage and dock changes only
- no looping hero video, parallax, cursor effect, glitch effect, or decorative path animation
- `prefers-reduced-motion: reduce` removes non-essential movement
- content remains visible without IntersectionObserver or animation

## Accessibility

Required for every release:

- semantic landmarks, one H1, and valid heading order
- skip link and visible focus
- keyboard navigation, phase controls, report rows, dock close, import, and print
- `aria-expanded`, `aria-current`, `aria-pressed`, and live/status regions where applicable
- status independent of color
- stage headings focusable with `tabindex="-1"`
- labeled table scroll region
- 200% zoom inspection for critical pages
- reduced-motion and print review

Do not claim formal WCAG conformance without an appropriate audit.

## Voice

Prefer concrete observations such as “four comparison-tenant rows returned” or “the mutation was rejected.” Avoid “military-grade,” “unbreakable,” “bulletproof,” “AI-powered security” without a mechanism, and “guaranteed isolation.”

## Fictional proof rules

- label the artifact before interaction on desktop and mobile
- use only the fictional Northstar CRM sample in public examples
- never say “we found” without fictional context
- no fake buyer, quote, logo, rating, result, or urgency

## Competitive quality bar

TenantProof must outperform through scope clarity, evidence traceability, honest uncertainty, privacy-safe first contact, fixed entry pricing, and a reviewable remediation handoff. A proposed UI feature that improves none of these should be rejected.
