# UX and design system

## Design intent

TenantProof should feel like a premium engineering dossier: calm, exact, legible, and trustworthy. It must avoid hacker clichés, neon dashboards, generic AI gradients, stock padlocks, fake enterprise logos, and over-animated SaaS patterns.

The visual experience supports the commercial argument: evidence is structured, uncertainty is visible, and important actions are controlled.

## Brand personality

- precise, not academic
- confident, not absolute
- premium, not ornamental
- security-conscious, not fear-driven
- technical, but founder-readable
- restrained, not sterile

## Core palette

Defined in `public/assets/styles.css`:

| Token | Value | Use |
|---|---|---|
| `--ink` | `#11231e` | primary text, dark accents |
| `--paper` | `#f5f2e9` | warm page background |
| `--surface` | `#fffdf7` | cards and reading surfaces |
| `--green` | `#187552` | primary action/pass accent |
| `--green-soft` | `#ddefe6` | positive background |
| `--red` | `#b8483f` | failed evidence only |
| `--red-soft` | `#f8e1dd` | failed-state background |
| `--amber` | `#a86d12` | unresolved/warning |
| `--amber-soft` | `#f5ead2` | warning background |
| `--dark` | `#0c1815` | hero/footer/report shell |

### Color rules

- Green is not proof by itself; pair status color with text and context.
- Red means observed contradiction, not generic danger decoration.
- Amber means uncertainty or action required.
- Never rely on color alone.
- Maintain WCAG AA contrast for text and controls; target AAA for body copy where practical.

## Typography

- System-font stack only for speed, privacy, and platform coherence.
- Editorial display scale for category statements.
- Compact uppercase/letter-spaced labels for evidence metadata.
- Body line length: approximately 60–75 characters on reading pages.
- Avoid all-caps paragraphs or tiny security/legal copy.

### Hierarchy

- one H1 per page
- H1 communicates the page’s buyer job, not merely its title
- H2 separates decision sections
- H3 names concrete questions, stages, or findings
- labels support scanning but never replace headings

## Layout

### Containers

- wide container for navigation, marketing grids, and report UI
- narrow container for methodology/legal prose
- generous vertical rhythm between conceptual sections
- evidence density may increase inside the report shell, never across the whole page

### Grids

- desktop: asymmetric editorial hero and 2–4-column evidence/pricing grids
- tablet: collapse gracefully before text becomes cramped
- mobile: single-column reading flow; controls remain at least 44 px in practical hit area

### Breakpoint behavior

- primary navigation collapses at 760 px
- grids should collapse based on content fit, not device names
- no horizontal page overflow at 390 px or narrower supported viewport
- decorative elements may clip only inside intentional overflow-hidden containers

## Components

### Buttons

- one visually dominant primary action per section
- secondary actions use outline/text treatments
- labels state outcome: `Scope a review`, `Open sample report`, `Prepare brief`
- no fake urgency or disabled-looking links

### Cards

- use cards for bounded evidence, stages, packages, or constraints
- avoid nested cards deeper than one level
- borders and surface changes should communicate grouping, not decoration

### Status chips

- pass, fail, untested, out-of-scope always include text
- labels map exactly to report schema
- no “secure” aggregate badge

### Notices and callouts

- green: method or safe next step
- amber: uncertainty, handling rule, or pre-launch limitation
- red: actual validation error or observed failed check
- neutral: local-only/privacy explanation

### Forms

- group fields by decision stage
- labels always visible
- help text says what not to submit where risk exists
- errors use native validation where sufficient and focus the failing field
- collect only what is needed for qualification
- do not request credentials or customer records

### Evidence table

- supports scanning and keyboard row activation
- keeps actor/resource/operation/expectation/status visible
- mobile behavior must preserve meaning; horizontal table treatment is acceptable inside an explicit scroll region if announced and tested
- selected row state must be visible beyond color

## Motion

- reveal motion is optional enhancement, never required for content visibility
- `.reveal` content is visible by default
- IntersectionObserver adds the visible class as elements enter the viewport
- `prefers-reduced-motion: reduce` disables non-essential movement
- avoid parallax, looping video backgrounds, cursor effects, and security-themed glitch effects

## Accessibility

Required for every release:

- semantic landmarks and heading order
- skip link
- keyboard-operable navigation and report rows
- visible focus style
- `aria-expanded` on mobile menu
- `aria-pressed` on report phase controls
- form status text and focused step heading
- status labels independent of color
- images with accurate alt text or empty alt when decorative
- 200% zoom inspection for critical pages
- reduced-motion behavior
- print-readable report

Do not claim formal WCAG conformance until an appropriate audit is completed.

## Content design

### Voice

Use short declarative sentences and concrete nouns. Prefer:

- “four foreign rows were returned”
- “the comparison-tenant update was rejected”
- “this check was not executed”

Avoid:

- “military-grade”
- “unbreakable”
- “bulletproof”
- “AI-powered security” without a specific mechanism
- “guaranteed isolation”

### Trust sequence

1. Name the feared failure.
2. Distinguish badge from evidence.
3. Show a fictional but structurally real deliverable.
4. Explain the method and limits.
5. Show fixed starting scope and price.
6. Ask for non-sensitive qualification.

### Fictional proof rules

- label above the artifact, not in a buried footer
- use fictional company/project/client labels
- never say “we found” without the fictional context
- no fake quote, logo, rating, or before/after customer result

## UX metrics after launch

Without invasive analytics, measure manually at first:

- qualified requests / targeted contacts
- sample-report opens from individualized outreach where the channel exposes click data
- form completion count
- serious conversations
- objections by category
- paid pilot conversion
- time from request to signed scope

Do not add tracking merely to create a dashboard. Add privacy-respecting measurement only after a concrete decision depends on it.

## Competitive quality bar

TenantProof does not need every feature competitors have. It must outperform on:

- clarity of scope
- evidence traceability
- honest uncertainty
- privacy-safe first contact
- fixed entry price
- quality of remediation handoff
- speed from qualification to decision artifact

Every proposed UI feature should improve one of those dimensions or be rejected.
