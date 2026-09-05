# Feature and function inventory

Status legend: **implemented**, **prepared**, **blocked**, **evidence-gated**, **rejected**.

## Public experience

| Capability | Status | Source | Notes |
|---|---|---|---|
| Product-first marketing page | implemented | `public/index.html`, `assets/workbench.css` | Compact value, realistic Run preview, method, price, boundaries |
| Focus Workbench | implemented | `public/report.html` | Scope → Matrix → Run → Repair → Report; Run opens by default |
| Paired boundary contracts | implemented/fictional | Workbench Matrix | Examples only; no execution |
| Before/after report viewer | implemented | `assets/report.js` | 16 bundled fictional checks |
| Temporary evidence dock | implemented | `assets/workbench.js` | Opens from selected Run row; dismissible; closes on stage change |
| Reviewable repair state | implemented/fictional | Workbench Repair | Example SQL diff; never presented as merged/approved |
| Local JSON report import | implemented | Workbench Report | Schema 1.0; 2 MB; browser memory only |
| Downloadable fictional report PDF | implemented | Workbench Report, `tools/build-sample-report-pdf.py` | Four-page buyer proof asset generated from the canonical sample; no customer evidence |
| Print report | implemented | report/workbench scripts | No upload or hosted state |
| Methodology/authorization | implemented | `public/methodology.html` | Scope, evidence, stop rules |
| Local scope worksheet | implemented | `public/request.html`, `assets/site.js` | Three steps; no submission/storage |
| Free boundary matrix | implemented | `public/sample-matrix.html`, CSV | Fictional paired controls; local download |
| Privacy and terms | implemented/pre-commercial | public HTML | Must be updated with verified facts before payment |
| Branded 404 | implemented | `public/404.html` | Recovery links |
| Qualification form and private pipeline | prepared/private | Notion | Non-sensitive; intentionally unpublished until commercial facts and privacy handling are verified |
| Static-site secure intake link | blocked | release config | Requires verified owned HTTPS endpoint |
| Checkout | intentionally closed | config/operations | Qualify, authorize, then invoice |
| First-pilot readiness gate | implemented/blocked | `tools/check-pilot-readiness.mjs`, private config | Reports stage blockers; strict modes fail until verified facts exist |
| Hosted customer account | evidence-gated | none | Not V1 |
| Connections/Team/Activity/Plan pages | evidence-gated | none | Design direction only, not operating product |
| Continuous Verification | evidence-gated | none | Optional, unpriced, and not marketed as live |

## `assets/site.js`

- responsive marketing navigation with ARIA state
- dynamic year and configuration-driven launch labels
- optional reveal enhancement with reduced-motion fallback
- HTTPS-only secure contact link in verified ready state
- request-package query parser
- three-step local scope navigation/validation with heading focus
- local brief generation, clipboard fallback, and text download

**Invariants:** no form transmission, field serialization, storage, credentials, or customer records.

## `assets/report.js`

- `STATUS_LABELS` maps schema states to browser labels
- runtime validation checks schema 1.0, metadata, non-empty unique checks, fields, and phase states
- sample fetch is same-origin and `no-store`
- local import enforces 2,000,000 bytes and stays in memory
- before/after phase, metrics, combined filters, visible count, keyboard-selectable rows, empty states, evidence, and print
- any report-derived value is escaped or assigned with `textContent`

The command-line JSON-schema validator remains stricter release authority.

## `assets/workbench.js`

- discovers stage controls/panels and activates exactly one stage
- maintains `aria-current="step"`
- focuses active panel H2 after user stage activation
- scrolls the stage surface to its start
- closes evidence on stage change
- opens the evidence dock on pointer, Enter, or Space row selection
- closes the evidence dock on explicit action
- bridges the Workbench Report print control to `window.print()`
- initializes the Run stage

## Report pipeline

| Tool | Responsibility | Status |
|---|---|---|
| `validate-report.mjs` | validate schema 1.0 reports | implemented |
| `build-sample-report-pdf.py` | generate buyer-ready fictional PDF from the canonical sample | implemented |
| `demo-definition.json` | fictional scenario contracts | implemented |
| `demo-adapter.mjs` | deterministic before/after fixture | implemented |
| `run-matrix.mjs` | generate demo report | implemented; rejects live mode |
| real adapter template | customer-specific execution | evidence-gated/private |
| signed report manifest | hash/version handoff | planned after paid validation |

## Build and release

| Tool | Responsibility | Status |
|---|---|---|
| `generate-brand-assets.py` | icons/social image | implemented |
| `harden-html.mjs` | CSP/canonical/social/config metadata | implemented |
| `build-site-config.mjs` | preview/ready config | implemented |
| `release-check.mjs` | release facts/placeholder checks | implemented; prefers ignored release config when present |
| `check-pilot-readiness.mjs` | outreach/intake/payment/first-pilot/launch gate | implemented; committed template remains blocked |
| `capture-previews.mjs` | deterministic home/workbench/mobile captures | implemented |
| `record-walkthrough.mjs` | generated product walkthrough | implemented |
| `sync-handoff-assets.mjs` | stable handoff media names/checksums | implemented |
| `build-handoff-report.py` | styled PDF handoff | implemented |
| `build-source-manifest.mjs` | source role/hash manifest | implemented |
| `check-docs.mjs` | handoff/link/truth checks | implemented |
| `qa.mjs` | finite Chromium/static QA | implemented |
| `quality-gate.mjs` | ordered end-to-end gate | implemented |
| `build-release.mjs` | copy only public output | implemented |
| GitHub Pages workflow | PR validation + main deployment | implemented |

## Production support

Eight HTML pages, restrictive meta CSP, `_headers`, canonical/social metadata, icons, social image, manifest, sitemap, robots, `.nojekyll`, `llms.txt`, schema/sample JSON, CSV template, downloadable fictional PDF, and route-scoped workbench assets. The v0.3.3 public artifact contains exactly 27 files.

## Operational documents

Authorization, statement of work, evidence handling, delivery, payment/refund, intake architecture, first-pilot readiness, launch checklist, marketing experiment, operator decisions, and GitHub release runbook remain private repository guidance—not deployed pages.

## Feature-change protocol

1. state buyer problem and success metric
2. update the page/function/architecture specification
3. identify privacy, authorization, retention, and credential impact
4. implement the smallest coherent path
5. cover error, empty, mobile, keyboard, reduced-motion, and print states as applicable
6. add automated QA
7. regenerate screenshots and walkthrough
8. append decision and changelog
9. run the full quality gate
10. inspect the public-only artifact before merge
