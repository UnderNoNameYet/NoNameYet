# Page and section specifications

This file defines the contract for every public page. A page change is incomplete until this specification, QA, screenshots, decision log, and changelog agree.

## Global marketing shell

Applies to every route except the dedicated workbench shell on `report.html`.

### Header

- TenantProof wordmark/home link
- Sample workbench, Matrix, Method, and Pricing links
- one primary `Scope a review` action
- mobile menu with `aria-expanded` and an owned navigation ID
- visible keyboard focus; menu closes after navigation or desktop resize

### Footer

Product, Trust, and Start links; dynamic year; launch-state label; factual safety line. Never add invented addresses, registrations, customers, social accounts, or outcomes.

## `index.html` — product-first marketing page

### Page job

Let a Supabase SaaS founder understand the failure, workflow, deliverable, fixed starting scope, and next action without reading a long sales page.

### Sections

1. **Hero**
   - direct promise: verify tenant isolation before shipping
   - short explanation of an approved matrix, controlled run, repair, rerun, and retained evidence
   - primary action opens the sample workbench; secondary action prepares scope
   - realistic fictional Run-stage preview, not abstract decoration
   - staging, synthetic-data, and written-authorization safeguards

2. **Deliverable strip**
   - approved matrix
   - executed controls
   - reviewable repair
   - before/after evidence

3. **Boundary questions**
   - cross-tenant read
   - tenant-reassignment write
   - function and storage boundary

4. **Controlled review method**
   - define the contract
   - run paired controls
   - repair the root rule
   - rerun and hand off

5. **Decision artifact**
   - fictional before/after counts: 11/4/1 → 15/0/1
   - explicit contextual-result limitation

6. **Pricing**
   - Boundary Verification: $349
   - Verification + Repair: $649
   - manual-quote boundary for larger, production-only, regulated, or unusually sensitive work

7. **Service boundaries and CTA**
   - no credentials through the public site
   - written authorization, staging, synthetic data, and no certification claim
   - local scope brief before access is discussed

### Acceptance criteria

- first viewport identifies buyer, failure, artifact, workflow, and primary next step
- copy remains concise; no repeated essay-length explanation
- preview looks and behaves like the product
- Northstar CRM remains visibly fictional
- one dominant action hierarchy
- no generic sidebar, abstract tenant circles, decorative paths, stock art, or performance-heavy hero media
- desktop and 390 px mobile have no document-level horizontal overflow

## `report.html` — Focus Workbench

### Page job

Let a buyer inspect the complete fictional workflow and open a compatible redacted report locally without creating a hosted account or upload surface.

### Shell

- compact product header with project, fictional label, review ID, Method, and Scope action
- horizontal stage rail: **Scope → Matrix → Run → Repair → Report**
- Run opens by default
- no permanent left navigation, account sidebar, or always-open inspector
- changing stage closes the temporary evidence dock and focuses the new stage heading when activated by pointer/keyboard

### Stage 1 — Scope

- approved environment, role/resource ceilings, selected functions/bucket, and production-host count
- written authorization, synthetic fixtures, stop conditions, and temporary-access guardrails
- clear statement that the workflow is fictional and not authorization

### Stage 2 — Matrix

- paired allow/deny contracts for read, write, RPC, and storage examples
- each contract names actor, resource, operation, and expected outcome
- unresolved storage path remains open rather than presented as a pass
- link to the free planning matrix

### Stage 3 — Run

- before/after phase toggle
- total, pass, fail, and open counts
- text, actor, area, operation, and status filters
- focusable horizontal table region on small screens
- pointer, Enter, and Space row selection
- selected row opens a dismissible bottom evidence dock
- dock shows expectation, observed output, redacted evidence, remediation, and phase-appropriate state

### Stage 4 — Repair

- root-rule finding, affected path, observed contradiction, and exact retest contract
- concise fictional SQL diff and branch/review state
- timeline distinguishes reproduced, prepared, owner review, and controlled retest
- never present a patch as merged or customer-approved

### Stage 5 — Report

- handoff contents and result limits
- deterministic downloadable fictional PDF generated from the canonical sample report
- local `.json` import only
- schema 1.0 and 2,000,000-byte maximum
- no upload, persistence, or external request
- print action for the bundled sample or valid local report

### States

- sample loading and valid sample
- valid local report
- invalid JSON/runtime shape
- oversized file
- no filter matches
- active row removed by filter
- before/after evidence
- dock open/closed
- print

### Acceptance criteria

- all report values render with escaped text or `textContent`
- local import causes no upload or network request
- downloadable PDF remains prominently fictional and contains no customer evidence
- stage, phase, filter, selection, close, and print controls are keyboard operable
- result color always has a text label
- fictional labeling remains visible on desktop and mobile
- reduced motion removes non-essential transitions
- no document-level horizontal overflow at 390 px

## `sample-matrix.html` — free planning artifact

Static fictional matrix and local CSV download. It plans paired controls but executes nothing, collects nothing, stores nothing, and requests no credentials. The table must remain usable in a labeled focusable scroll region.

## `methodology.html` — method and authorization

Explain the intended boundary, synthetic test state, observable outcomes, repair discipline, uncertainty, written authorization, stop conditions, evidence handling, report vocabulary, and limitations without providing an arbitrary-target testing recipe.

## `request.html` — local scope worksheet

Three steps: package, application surface, and generated brief. Submit is prevented; nothing is sent or stored. Query parameter `?package=repair` may preselect the repair package. The secure-intake CTA appears only in a verified `ready` configuration with an HTTPS contact URL.

## `privacy.html` and `terms.html`

Remain accurate for the static pre-commercial preview. Do not invent legal identity, jurisdiction, processor, contact, or launch readiness. Update them with verified facts and appropriate review before accepting money or customer evidence.

## `404.html`

Clear recovery message, home/workbench actions, shared marketing shell, and no search or telemetry.

## Production support files

- `robots.txt` and `sitemap.xml` reflect intentional indexing and all eight public HTML pages
- `_headers` documents policy for compatible hosts; meta CSP remains the GitHub Pages fallback
- `site.webmanifest`, icons, social image, downloadable fictional report PDF, `.nojekyll`, and `llms.txt` make no customer or certification claim

## Deferred product pages

Connections, Team, Activity, Plan, a customer portal, and Continuous Verification may be explored only after repeated paid demand and a new security/architecture decision. They are not public V1 routes or operating capabilities.

## Change checklist

- page job and target reader remain clear
- heading hierarchy and focus movement remain valid
- dominant action and fictional labels remain truthful
- mobile, keyboard, reduced-motion, print, and empty/error states reviewed
- privacy, authorization, and retention claims reviewed
- canonical/social metadata and sitemap updated when needed
- automated QA, screenshots, function inventory, decision log, and changelog updated
