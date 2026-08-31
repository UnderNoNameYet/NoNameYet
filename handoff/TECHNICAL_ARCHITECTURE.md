# Technical architecture

## Architecture decision

TenantProof V1 is a static, dependency-light web product plus a controlled service workflow. The browser experience uses semantic HTML, one CSS file, small vanilla JavaScript modules, and local JSON. This is intentional: it minimizes attack surface, privacy disclosures, operational cost, and release complexity before paid validation.

## Runtime topology

```text
Browser
├── static HTML pages
├── assets/styles.css
├── assets/site-config.js
├── assets/site.js
├── assets/report.js
└── assets/sample-report.json

Local/operator tooling
├── report schema + validator
├── demo-only matrix definition/adapter/runner
├── HTML hardener
├── brand asset generator
├── release config builder/checker
├── browser QA
├── documentation checker
└── preview/walkthrough capture

Service operations
├── public non-sensitive qualification form
├── private intake pipeline
├── written authorization + SOW
├── secure access exchange outside website
├── controlled test execution
└── redacted evidence delivery
```

No public backend, customer account system, credential vault, database, analytics service, or payment API is part of the static site.

## Directory responsibilities

### `public/`

Only deployable content. GitHub Pages or another static host must use this directory as the artifact root.

### `public/assets/styles.css`

Single visual source of truth: tokens, layout, components, responsive behavior, status styles, reduced motion, print rules.

### `public/assets/site-config.js`

Generated runtime configuration exposed as immutable `window.TENANTPROOF_CONFIG`. It controls launch state, contact link visibility, operator metadata, payment mode, and retention value. Never hand-edit in a release; generate from an approved JSON config.

### `public/assets/site.js`

Global navigation, reveal enhancement, launch-state labels, request-page package selection, three-step worksheet, validation, brief generation, copy, and download.

### `public/assets/report.js`

Schema-aware browser report viewer. It validates minimal runtime shape, loads the bundled sample, imports local files, filters, computes metrics, renders rows/evidence, supports keyboard selection, and prints.

### `schema/report.schema.json`

Canonical report schema version 1.0. It is stricter than UI assumptions and rejects unknown top-level/state/check properties.

### `tools/validate-report.mjs`

Command-line structural validation for report files.

### `tools/run-matrix.mjs`

Orchestrates scenarios only when `--mode=demo`. It exits with code 2 for live mode. A real adapter must never be accepted from the public website; it belongs to an authorized customer workspace and separate operating procedure.

### `tools/demo-definition.json` and `tools/demo-adapter.mjs`

Fictional deterministic fixture. Used to prove pipeline shape without touching a network or real target.

### `tools/harden-html.mjs`

Adds/maintains security, canonical, social, manifest, and configuration metadata. Must remain idempotent.

### `tools/build-site-config.mjs`

Validates preview/ready configuration and writes browser JS. Ready state requires HTTPS origin/contact, display name, business email, valid payment mode, and 1–365 day evidence retention.

### `tools/release-check.mjs`

Checks release files, CSP compatibility, sitemap origin, launch configuration, legal placeholders, security contact, and a fresh GitHub verification marker.

### `qa.mjs`

Finite local Chromium suite. It starts/stops its own server and validates static files, claims, links, CSP, interactions, local import, form privacy, responsive behavior, console output, and external requests.

## Browser data flow

### Report sample

1. `report.js` fetches same-origin `assets/sample-report.json` with `cache: no-store`.
2. Runtime validator checks schema version, metadata, checks, IDs, and statuses.
3. `setReport` stores data in memory.
4. Renderer uses `textContent` and created DOM nodes.
5. No report data is persisted.

### Local report import

1. User selects/drops a local file.
2. Browser rejects size above 2,000,000 bytes.
3. `File.text()` reads into memory.
4. JSON parse and validation run locally.
5. Report replaces in-memory sample.
6. UI says nothing was uploaded.
7. Refresh clears imported data.

### Scope worksheet

1. Query parameter may preselect repair package.
2. Form submit is prevented.
3. Step navigation validates visible fields.
4. Final text is assembled from field values.
5. Copy uses Clipboard API with selection fallback.
6. Download uses an object URL revoked after click.
7. No fetch, POST, storage, or URL serialization occurs.

### Hosted qualification

The current public Notion form is operationally separate from the static worksheet. It collects only non-sensitive qualification fields into a private Notion database. The premium site’s secure-intake CTA remains hidden until a real HTTPS form URL is inserted in release configuration.

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

### Preview

- CTA hidden
- footer says pre-launch preview
- payment closed
- placeholders allowed only in non-public examples/docs

### Ready

- HTTPS intake CTA visible
- operator/contact/retention required
- legal copy must be launch-state
- strict release check must pass

### Payment modes

- `closed`: qualification only
- `invoice`: operator issues invoice after signed scope; no browser payment URL needed
- `payment_link`: requires owned HTTPS processor URL; not recommended for initial unrestricted use

## Security controls

### Meta CSP

```text
default-src 'self';
script-src 'self';
style-src 'self';
img-src 'self' data:;
font-src 'self';
connect-src 'self';
object-src 'none';
base-uri 'none';
form-action 'none';
frame-src 'none';
worker-src 'none';
manifest-src 'self'
```

Host headers additionally target frame denial, HSTS, nosniff, restricted Permissions Policy, and cache control. GitHub Pages may not honor `_headers`; meta CSP is the static fallback.

### Trust boundaries

- public browser is untrusted
- imported report is untrusted data
- report strings are rendered as text
- public form is non-sensitive only
- real credentials never transit the site/repository/Notion intake
- customer adapters and evidence stay outside the public repo

## Deployment architecture

Preferred GitHub Pages pipeline:

1. repository source and docs on `main`
2. workflow builds/validates from source
3. artifact contains `public/` only
4. Pages deploys artifact
5. post-deploy smoke check verifies canonical routes, assets, CSP, and CTA

Do not commit `node_modules`, raw customer evidence, release credentials, private config, temporary reports, or QA logs.

## Scaling thresholds

Stay static until one or more occur:

- at least three paid engagements need shared report history
- buyers repeatedly request scheduled regression runs
- manual report creation becomes the delivery bottleneck
- multiple operators need access controls and audit logs
- customer data residency or contractual controls require dedicated infrastructure

At that point, write a new architecture decision record before selecting a backend. Do not default to Supabase merely because customers use it; choose based on TenantProof’s own threat model.

## Failure and rollback

- invalid release config: build must fail
- CSP/console/mobile defect: do not deploy
- broken intake: revert CTA to closed preview and preserve public report/methodology
- incorrect claim/legal copy: rollback immediately
- GitHub Pages failure: retain prior known-good deployment and inspect workflow logs
- report schema change: support old version or clearly reject it; never silently reinterpret

## Future technical work

Prioritized only after launch blockers:

1. documentation/asset quality gate
2. deploy-only-public release builder
3. live form URL integration
4. post-deploy smoke test against public origin
5. optional privacy-respecting event counters after a decision need exists
6. signed report manifest/hash for customer handoff
7. customer-specific private adapter template
8. regression CI template inside customer repositories

Customer portal, automated scanning, and recurring SaaS remain evidence-gated V2/V3 decisions.
