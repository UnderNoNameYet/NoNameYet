# Feature and function inventory

Status legend: **implemented**, **prepared**, **blocked**, **evidence-gated**, **rejected**.

## Public experience

| Capability | Status | Source | Notes |
|---|---|---|---|
| Responsive marketing page | implemented | `public/index.html` | Problem, proof, method, pricing, boundaries, CTA |
| Interactive report preview | implemented | `public/index.html`, `assets/report.js` | Bundled fictional data |
| Full report viewer | implemented | `public/report.html` | Local JSON import and print |
| Methodology/authorization | implemented | `public/methodology.html` | Scope, evidence, stop rules |
| Local scope worksheet | implemented | `public/request.html`, `assets/site.js` | Three steps, no submission |
| Free boundary matrix | implemented | `public/sample-matrix.html`, `public/assets/sample-boundary-matrix.csv` | Fictional paired controls; static local download |
| Privacy page | implemented/pre-launch | `public/privacy.html` | Must be updated before premium launch |
| Terms page | implemented/pre-launch | `public/terms.html` | Must be updated before taking payment |
| Branded 404 | implemented | `public/404.html` | Recovery links |
| Public qualification form | implemented | Notion | Anonymous, non-sensitive, private responses |
| Public launch hub | implemented | Notion | Search-indexable request-only page |
| Public sample report | implemented | Notion | Fictional and explicitly labeled |
| Static-site intake link | blocked | release config | Requires usable owned HTTPS form URL in config |
| Checkout | intentionally closed | config/operations | Invoice after scope is recommended |
| Customer portal | evidence-gated | none | Do not build before repeated paid need |

## `assets/site.js`

### Navigation

- `closeMenu()` — closes mobile navigation and resets `aria-expanded`.
- menu click handler — toggles `data-open` and ARIA state.
- link click/resize handlers — close menu after navigation and above 760 px.

### Global metadata and motion

- dynamic year populates `[data-year]`.
- reveal observer progressively adds `.is-visible`.
- reduced-motion and missing-IntersectionObserver paths show content immediately.
- runtime config reads `window.TENANTPROOF_CONFIG`.
- secure contact link appears only when `state === 'ready'` and `contactUrl` is HTTPS.
- `[data-launch-state]` reports preview or public state.

### Scope wizard

- package query parser supports `?package=repair`.
- native submit is prevented.
- `showStep(index)` clamps step, toggles visibility, updates indicators/status, and moves heading focus.
- `validateCurrentStep()` checks visible enabled fields and focuses/reports first failure.
- delegated click handler handles next/previous controls.
- `value(name)` normalizes text, radio, and checkbox values.
- `selectedText(name)` returns visible select label.
- `buildBrief()` creates the non-sensitive text artifact and manual-quote flag.
- `renderSummary()` writes the brief and scope-fit message.
- input/change listeners keep final summary current.
- copy handler uses Clipboard API with selection fallback.
- download handler creates/revokes a text object URL.

### Invariants

- no fetch, form submission, URL serialization, localStorage, or sessionStorage
- no credential fields
- generated brief always states that it is local and not authorization

## `assets/report.js`

### Constants and validation

- `STATUS_LABELS` is the sole browser label map.
- `safeText(value)` normalizes null/undefined.
- `validateReport(report)` checks object shape, schema version 1.0, project metadata, non-empty checks, unique IDs, required fields, and valid phase statuses.

The command-line JSON-schema validator is stricter and remains release authority.

### `ReportViewer`

- constructor initializes phase, report, active ID, filters, binds events, and loads sample.
- `bind()` attaches phase, filter, row pointer/keyboard, print, file input, and drag/drop handlers.
- `loadSample()` fetches same-origin sample with no-store.
- `importFile(file)` enforces 2 MB, parses locally, validates, and discloses no upload.
- `showNotice(message, error)` handles import/load feedback.
- `setReport(report, sample)` resets state, sample label, metadata, filters, and render.
- `populateFilters()` derives actor/area/operation/status choices from report data.
- `visibleChecks()` combines all active filters.
- `render()` coordinates metrics/table/evidence and generated date.
- `renderMetrics()` calculates total/pass/fail/unresolved for current phase.
- `renderTable()` rebuilds keyboard-focusable rows and empty/visible-count states.
- `select(id)` updates ARIA selected state and evidence.
- `renderEvidence()` shows expectation, status, observed output, redacted evidence, and remediation.
- `escape(value)` converts untrusted values to escaped text before controlled templates.

### Security invariant

Any value from a report must pass through `escape()` or be assigned with `textContent`. Do not interpolate raw report values into `innerHTML`.

## Report pipeline tools

| Tool | Responsibility | Status |
|---|---|---|
| `validate-report.mjs` | validate a report against 1.0 contract | implemented |
| `demo-definition.json` | fictional scenario definitions | implemented |
| `demo-adapter.mjs` | deterministic before/after fixture | implemented |
| `run-matrix.mjs` | orchestrate demo report generation | implemented, demo-locked |
| real adapter template | customer-specific execution | evidence-gated; keep private |
| signed report manifest | hash/version handoff | planned V1.2 |

## Build and release tools

| Tool | Responsibility | Status |
|---|---|---|
| `generate-brand-assets.py` | icons/social image | implemented |
| `harden-html.mjs` | CSP/canonical/social/config metadata | implemented |
| `build-site-config.mjs` | validate/generate browser config | implemented |
| `release-check.mjs` | launch-readiness report | implemented |
| `capture-previews.mjs` | deterministic visual captures | implemented |
| `qa.mjs` | finite Chromium/static QA | implemented |
| `check-docs.mjs` | handoff/link/placeholder checks | to be implemented in this handoff release |
| `quality-gate.mjs` | orchestrated quality pass | to be implemented in this handoff release |
| deploy artifact builder | copy only public output | planned before repository publish |
| post-deploy smoke test | verify live origin | planned before repository publish |

## Production support

- meta CSP on every HTML page
- `_headers` for compatible static hosts
- canonical URLs
- Open Graph/Twitter metadata
- 1200×630 social image
- 192/512 icons
- web manifest
- sitemap
- robots
- `.nojekyll`
- `llms.txt`

## Operational assets

| Document | Job |
|---|---|
| `authorization-template.md` | written owner authorization and stop contacts |
| `statement-of-work-template.md` | scope, deliverables, acceptance, exclusions |
| `evidence-handling-policy.md` | classification, storage, redaction, deletion |
| `delivery-runbook.md` | engagement execution and handoff |
| `payment-refund-workflow.md` | request-only invoicing and exceptions |
| `intake-architecture.md` | public vs secure intake boundaries |
| `launch-checklist.md` | release facts and checks |
| `marketing-experiment.md` | ten-day acquisition test |
| `operator-decisions.md` | unresolved real-world inputs |
| `github-release-runbook.md` | inspect/branch/PR/merge/deploy |

## Notion soft-launch system

### Intake database

Properties: app/company, work email, public URL, stack, safe environment, table count, role count, boundary concern, package interest, requested date, safety acknowledgement, pipeline status, submission time.

Views: requests table, status pipeline board, public form editor.

Statuses: New, Qualified, Scope sent, Authorized, In review, Delivered, Closed.

### Public form

Required: app/company, work email, stack, test environment, boundary concern, package interest, non-sensitive acknowledgement.

Optional: public URL, approximate tables/roles, desired date.

Respondents cannot view their stored response and are told not to submit secrets.

## Feature-change protocol

For any added behavior:

1. state buyer problem and success metric
2. add/update specification
3. identify privacy and authorization impact
4. implement smallest coherent path
5. cover error/empty/mobile/keyboard/reduced-motion/print as applicable
6. add automated QA
7. update screenshots and function inventory
8. append decision and changelog
9. run full quality gate
