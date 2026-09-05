# Technical architecture

## Architecture decision

TenantProof V1 is a static, dependency-light web product plus a controlled service workflow. The browser experience uses semantic HTML, CSS, small vanilla JavaScript modules, and local JSON. This minimizes attack surface, privacy disclosures, operational cost, and release complexity before paid validation.

## Runtime topology

```text
Browser
├── eight static HTML pages
├── assets/styles.css              shared baseline
├── assets/workbench.css           home/workbench composition
├── assets/site-config.js          immutable preview/ready facts
├── assets/site.js                 global shell + local scope worksheet
├── assets/report.js               report data/filters/evidence engine
├── assets/workbench.js            stage rail + evidence dock + print bridge
├── assets/sample-report.json      fictional schema-1.0 sample
└── assets/tenantproof-fictional-report.pdf
                                    generated fictional buyer proof

Local/CI tooling
├── report schema + validator
├── deterministic fictional report PDF generator
├── demo-only matrix fixture/runner
├── HTML hardener + brand generator
├── preview/ready config builder + release checker
├── first-pilot readiness checker + ignored operator record
├── Chromium browser/static QA
├── preview and walkthrough capture
├── handoff media/PDF/source-manifest generation
└── public-only release builder

Service operations
├── public non-sensitive qualification form
├── private intake pipeline
├── written authorization + signed scope
├── secure access exchange outside the website
├── controlled staging-first execution
└── redacted evidence delivery
```

No public backend, customer account system, credential vault, database, analytics service, payment API, operational Connections page, or recurring monitor is part of V1.

## Public route responsibilities

### `index.html`

Product-first marketing route. It loads the shared shell plus `workbench.css` for the realistic fictional Run-stage preview. It has no report data engine and no external runtime dependency.

### `report.html`

Focus Workbench route. It loads `report.js` for sample loading, validation, filtering, metrics, evidence rendering, local import, and phase changes; it then loads `workbench.js` for the five-stage shell, temporary evidence dock, and workbench print control.

The two modules deliberately separate data semantics from presentation choreography. Report-derived strings still pass through the established escaping/text-content boundary.

The Report stage also links the four-page fictional PDF generated from the same canonical JSON. The file is built before QA and release bundling, carries deterministic metadata, and remains clearly labeled as demonstration material.

### Secondary routes

`methodology.html`, `sample-matrix.html`, `request.html`, `privacy.html`, `terms.html`, and `404.html` continue to use the shared stylesheet and small global script. This avoids turning every page into an application shell.

## Browser data flow

### Bundled fictional report

1. `report.js` fetches same-origin `assets/sample-report.json` with `cache: no-store`.
2. Runtime checks validate schema version, metadata, IDs, fields, and statuses.
3. Data stays in memory.
4. Metrics, filters, rows, and the evidence panel derive from the current phase.
5. Report strings are escaped or assigned with `textContent`.

### Local report import

1. The user chooses or drops a local `.json` file.
2. The browser rejects files above 2,000,000 bytes.
3. `File.text()`, JSON parsing, and runtime validation run locally.
4. A valid report replaces the in-memory sample.
5. No upload, POST, persistence, analytics event, or external request occurs.
6. Refresh clears imported data.

### Workbench navigation

1. `workbench.js` activates exactly one of Scope, Matrix, Run, Repair, or Report.
2. `aria-current="step"` follows the active control.
3. User-initiated changes can focus the panel H2.
4. Any open evidence dock closes on stage change.
5. Selecting a Run row opens the dock; Close hides it.
6. Scope, Matrix, and Repair content is an explicitly fictional workflow illustration, not executed customer state.

### Local scope worksheet

Query parameters may preselect a package, but form submission is prevented. Validation, brief generation, copy, and text download are local. No field value is sent, persisted, or serialized into the URL.

## Configuration model

```json
{
  "state": "preview | ready",
  "publicOrigin": "https://…/",
  "contactUrl": "https://…",
  "operatorDisplayName": "…",
  "contactEmail": "…",
  "paymentMode": "closed | invoice | payment_link",
  "paymentUrl": "",
  "evidenceRetentionDays": 14
}
```

The live release remains `preview` with `paymentMode: closed`. Ready state requires verified HTTPS contact/origin, operator facts, business email, legal copy, payment mode, and a 1–365 day retention value. `release-check.mjs` prefers ignored `config/site.release.json` when it exists, so real facts never require changing the committed preview source.

Commercial capability is tracked separately in ignored `config/pilot-readiness.json`. Its committed example is fully blocked. The checker reports outreach, intake, payment, first-pilot, and launch-experiment stages without exposing private evidence references.

## Security controls

- restrictive meta CSP on every HTML page; `_headers` documents compatible-host policy
- same-origin scripts, styles, images, manifest, and fetches only
- `form-action 'none'`, `object-src 'none'`, `base-uri 'none'`, and no frames/workers
- untrusted imported report strings rendered as text
- no public credentials, customer adapters, raw evidence, or production records in repository/browser intake
- 14-day default for raw working evidence after accepted delivery unless a signed scope or law requires less

## Build and deployment

The pull-request Pages job installs pinned Pillow/ReportLab and Playwright, downloads Chromium, installs FFmpeg, exposes Chromium at a stable executable path, and runs `npm run quality`.

The quality orchestrator:

1. generates brand assets and hardens HTML
2. builds preview configuration
3. validates the fictional JSON report and generates its downloadable PDF
4. regenerates the fictional report fixture while rejecting live mode
5. syntax-checks browser scripts
6. runs browser/static QA, including PDF signature and size checks
7. builds the public-only bundle
8. captures homepage, Workbench Run/Matrix, and mobile previews
9. records the walkthrough
10. synchronizes handoff media and builds the handoff PDF/source manifest
11. checks documentation, pilot readiness, release readiness, and secret/private-email patterns

GitHub Pages uploads only `dist/`, copied from `public/`. The v0.3.3 artifact contract is exactly 27 files, including the generated fictional report PDF. Handoff, operations, source tooling, local reports, logs, and raw evidence stay outside the deployment.

## Scaling thresholds

Keep the product static until repeated paid engagements demonstrate a need for shared history, scheduled regression runs, multiple-operator permissions, or customer-specific infrastructure. Before implementing Connections, Team, Activity, Plan, Continuous Verification, a portal, or a backend, write a new security/architecture decision covering credential custody, access control, auditability, retention, tenancy, incident response, and cost.

## Failure and rollback

- invalid configuration, CSP/console/mobile defect, missing artifact, documentation mismatch, or secret scan: fail the build
- broken intake: stay/return to closed preview
- incorrect claim/legal copy: roll back immediately
- schema change: support or explicitly reject old versions; never silently reinterpret
- Pages failure: retain the prior known-good published artifact and inspect the workflow
- this release has no migration or hosted state; rollback is a source revert
