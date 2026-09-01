# Page and section specifications

This file defines the contract for every public page. A page change is incomplete until this specification and its acceptance criteria are updated.

## Global shell

### Header

**Purpose:** orient users and keep the conversion path persistent without dominating content.

**Contains:**

- TenantProof wordmark/home link
- Sample report
- Methodology
- Pricing anchor
- primary `Scope a review` button
- mobile menu button with `aria-expanded` and controlled navigation ID

**Behavior:**

- desktop links remain visible
- at 760 px and below, menu collapses
- menu closes after navigation or desktop resize
- keyboard focus remains visible

### Footer

**Contains:** product summary, Product/Trust/Start link groups, dynamic year, launch-state label, and page-specific safety line.

**Rules:** no fake address, registration, social account, or customer logo. Launch state comes from external configuration.

## `index.html` — primary marketing page

### Page job

Convince the right founder that application-specific boundary evidence is worth requesting while disqualifying buyers seeking a generic badge or unauthorized scan.

### Sections

1. **Hero — “A green RLS badge is not proof.”**
   - core category statement
   - concise explanation of executed tenant-boundary evidence
   - primary CTA to scope page
   - secondary CTA to sample report
   - evidence dashboard preview
   - must communicate value within first viewport

2. **Problem — “RLS is enabled answers the wrong question.”**
   - three concrete buyer questions:
     - can Tenant A retrieve Tenant B rows?
     - can an owned row move across tenants?
     - do functions/storage preserve the boundary?
   - avoid abstract fear or sensational breach language

3. **Before/after evidence**
   - fictional 16-check matrix summary
   - show failures before and passing retest after
   - preserve one unresolved state
   - label demonstration prominently

4. **Interactive report preview**
   - phase controls
   - filters
   - matrix table
   - evidence panel
   - link to full sample

5. **Method — four stages**
   - scope access model
   - run positive and negative controls
   - repair root rule
   - rerun and hand off

6. **Pricing**
   - $349 and $649 packages
   - limits and included outputs
   - no fake discount, countdown, or “most popular” claim without data
   - manual quote boundary

7. **Service boundaries**
   - written authorization
   - staging/synthetic default
   - not a comprehensive pentest/certification/guarantee
   - no credentials through public site

8. **Closing CTA**
   - restate transformation from assumption to testable statement
   - one primary CTA to request page

### Acceptance criteria

- buyer, problem, artifact, price, and next action are visible without reading every section
- sample remains fictional
- one dominant CTA style
- report interactions function on desktop/mobile
- no performance-heavy hero media

## `report.html` — report viewer

### Page job

Show the exact output and allow a buyer/customer to inspect a redacted local report without uploading it.

### Sections

1. **Hero** — evidence traceability and report limitations.
2. **Import zone** — choose or drag a `.json` report; 2 MB maximum; local-only notice.
3. **Report shell**
   - project name/report ID/environment
   - fictional-demo badge when bundled sample is active
   - before/after phase toggle
   - total/pass/fail/unresolved metrics
   - text/actor/area/operation/status filters
   - visible count
   - keyboard-selectable rows
   - evidence detail panel
   - print action
4. **Interpretation notice** — pass is contextual, not permanent security.
5. **Redaction explanation** — why customer-facing evidence excludes secrets and raw data.

### States

- sample loading
- valid sample
- valid local report
- invalid JSON/schema
- file too large
- no filter matches
- active row removed by filter
- print layout

### Acceptance criteria

- no report value is inserted as HTML
- local import creates no upload/network request
- row selection works with pointer, Enter, and Space
- filters combine deterministically
- selected evidence follows phase
- empty result is understandable

## `methodology.html` — method and authorization

### Page job

Reduce trust friction by making method, limitations, and stop conditions legible before access is discussed.

### Sections

1. Hero: narrow authorization claim, not the whole universe.
2. Model intended boundary.
3. Build synthetic test state.
4. Record observable outcomes.
5. Repair through versioned changes.
6. Preserve uncertainty.
7. Authorization policy.
8. Default engagement boundary.
9. Evidence handling.
10. Stop conditions.
11. Report vocabulary.
12. CTA to private scope brief.

### Acceptance criteria

- no offensive testing recipe for arbitrary targets
- authorization and scope precede execution
- `untested` and `out_of_scope` semantics are explicit
- staging and synthetic defaults are visible

## `request.html` — local scope worksheet

### Page job

Help a founder prepare a useful non-sensitive scope before entering the hosted qualification form.

### Step 1 — package

- verification or verification + repair
- query parameter `?package=repair` preselects repair
- package limits displayed

### Step 2 — application surface

- app name
- stack
- environment
- approximate tables and roles
- functions/RPC and Storage indicators
- main boundary concern

### Step 3 — local brief

- contact name and work email used only in local text
- generated package/scope summary
- manual-quote warning when limits exceeded
- copy and download actions
- secure-intake CTA appears only when release config is `ready` with HTTPS contact URL

### Privacy contract

- form submit is always prevented
- no GET/POST transmission
- no local/session storage
- no credentials or production data requested
- generated text states that it is local and is not authorization

### Acceptance criteria

- step validation focuses the first invalid field
- headings receive focus after navigation
- Enter never changes the URL
- brief updates when final-step fields change
- fallback selection works if clipboard permission fails

## `privacy.html` — privacy and handling

### Current role

Pre-launch/static behavior notice. Before premium public deployment it must accurately name:

- static host
- public form processor
- categories collected
- purposes
- inquiry retention
- evidence retention
- deletion/access contact route
- operator/controller identity available at that time
- any payment processor when activated

### Required principle

Do not invent legal identity, jurisdiction, processor, or contact. The page may state that contracting details are supplied before work/payment, but it must not claim launch readiness while placeholders remain.

## `terms.html` — terms and limitations

### Current role

Describe non-engagement status, authorization requirement, service nature, result meaning, customer responsibilities, pricing limits, fictional demo, and pre-launch legal review.

### Before accepting payment

Add verified contracting party, jurisdiction, payment/refund terms, tax treatment, liability allocation, acceptance criteria, dispute path, and effective version. Obtain appropriate legal review; agent copy is not legal advice.

## `404.html` — recovery route

### Page job

Recover an invalid route without creating anxiety.

**Contains:** clear not-found message, home CTA, report CTA, same header/footer, no search field or telemetry.

## `sample-matrix.html` — free boundary-planning artifact

### Page job

Help a Supabase SaaS team define a falsifiable tenant/role authorization matrix before requesting access or paying for a review.

### Sections

1. Hero: free local CSV download and method link.
2. Fictional starter matrix with paired allowed and denied controls.
3. Operation-specific guidance for SELECT, INSERT, UPDATE, DELETE, RPC, and storage paths.
4. Reproducibility fields and evidence requirements.
5. Pass/fail/untested/out-of-scope vocabulary.
6. Authorization, staging, synthetic-data, and stop-condition reminder.
7. CTA to the local scope worksheet.

### Privacy contract

- static page and CSV only
- no upload, form submission, execution, browser storage, or external runtime request
- no credentials, private repository data, production records, or real findings
- all example rows explicitly fictional and unexecuted

### Acceptance criteria

- downloadable CSV resolves from the public artifact
- one H1, one main landmark, canonical/social metadata, and restrictive CSP
- table remains usable inside an announced keyboard-focusable scroll region
- no status is represented as executed evidence
- mobile page has no horizontal document overflow
- CTA prepares a non-sensitive brief rather than opening checkout

## Production support files

### `robots.txt`

Allows the intended static site. Update only with intentional indexing decisions.

### `sitemap.xml`

Lists canonical public HTML pages. Must match `publicOrigin`.

### `_headers`

Portable policy for hosts that support it: CSP, referrer, nosniff, frame denial, Permissions Policy, HSTS, caching. GitHub Pages may ignore it, so meta CSP remains necessary.

### `site.webmanifest`

Brand metadata and icons. No PWA/offline claims unless a service worker is deliberately added and tested.

### `llms.txt`

Concise machine-readable description and claim boundaries.

## Planned pages after paid validation

### `/trust.html`

Only after operator facts exist. Consolidate authorization, evidence handling, retention, subprocessors, security contact, and change history.

### `/case-studies/<slug>.html`

Only after a real customer approves exact content and audience in writing. Include context, scoped matrix, remediation, limitations, and measurable outcome; never expose architecture or sensitive findings.

### `/faq.html`

Add only from repeated buyer questions, not imagined objections. Likely subjects: access requirements, staging, timing, report use, retest, production-only scopes.

### Customer delivery portal

Not planned for V1. Consider after multiple paid engagements prove recurring needs around report history, regression runs, or stakeholder sharing.

## Change checklist for any page

- job and target reader still clear
- headings preserve hierarchy
- dominant CTA unchanged or decision logged
- mobile/keyboard/reduced-motion/print reviewed
- privacy/authorization claims reviewed
- canonical/social metadata updated
- sitemap updated if route changes
- QA and screenshots regenerated
- this file and changelog updated
