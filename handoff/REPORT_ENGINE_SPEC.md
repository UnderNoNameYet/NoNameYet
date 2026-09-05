# Report engine and evidence specification

## Purpose

The TenantProof report is the commercial artifact. It must let a technical buyer trace every conclusion to a scoped expectation and observed execution without exposing customer secrets.

## Schema authority

- canonical file: `schema/report.schema.json`
- current version: `1.0`
- browser validator: defensive fast feedback
- command-line validator: release/delivery authority

Do not change semantics without versioning. Adding a required field is breaking. Removing a status is breaking. Reinterpreting a status is breaking.

## Top-level object

```json
{
  "schemaVersion": "1.0",
  "reportId": "TP-…",
  "project": {
    "name": "…",
    "environment": "…",
    "client": "…"
  },
  "scope": {
    "generatedAt": "ISO-8601",
    "tables": 0,
    "roles": 0,
    "functions": 0,
    "storageBuckets": 0
  },
  "checks": []
}
```

No unknown top-level properties are accepted.

## Check contract

```json
{
  "id": "TP-001",
  "actor": "member",
  "area": "Table",
  "resource": "customer_notes",
  "operation": "read",
  "expectation": "A member cannot read another tenant's notes.",
  "before": { "status": "fail", "observed": "…", "evidence": "…", "remediation": "…" },
  "after": { "status": "pass", "observed": "…", "evidence": "…", "remediation": "…" }
}
```

### Identity rules

- IDs match `^TP-[A-Z0-9-]+$` and are unique in one report.
- Actor is an application role or explicit anonymous/service context.
- Area is a surface such as Table, Function, Storage, API, or Edge Function.
- Resource is a named in-scope asset; redact only when the customer handoff requires it.
- Operation is the attempted action: read, insert, update, delete, invoke, upload, download, list, etc.
- Expectation is written before execution and describes allowed or denied behavior.

## State semantics

### `pass`

Observed behavior matched the documented expectation for that actor, operation, environment, code state, and time. A denied negative control is not enough; include a positive control where a legitimate path should remain functional.

### `fail`

Observed behavior contradicted the expectation. State the observed effect without exaggerating beyond evidence.

### `untested`

The planned check was not executed or could not produce a reliable observation. Explain why in observed/evidence text. It is not neutral proof.

### `out_of_scope`

The check was explicitly excluded from the engagement. Record the scope reason. It is not a pass.

## Matrix design

Before access, construct:

| Actor | Tenant relation | Resource | Operation | Expected | Positive control |
|---|---|---|---|---|---|
| member | foreign | customer_notes | read | deny/zero rows | own-tenant read succeeds |
| member | foreign proposed tenant | customer_notes | update | reject/no change | same-tenant update succeeds |
| manager | foreign | archive_project | invoke | reject/no mutation | own-tenant archive succeeds |

The matrix is agreed by the verified owner. TenantProof does not invent business authorization semantics and then label deviations vulnerabilities.

## Evidence requirements

Minimum evidence for executed checks:

- timestamp or run identity
- test actor/role alias
- source and comparison tenant aliases
- resource and operation
- request class or SQL/API action summary
- response/status
- row/object mutation effect
- positive control outcome where relevant
- environment/code reference
- redaction statement

Customer-facing reports should use concise summaries. Restricted raw traces live separately and are never embedded by default.

## Redaction

Remove or replace:

- access tokens, cookies, authorization headers, passwords, keys
- real user/customer names and emails
- production record values
- private URLs and repository paths not needed by recipients
- object names/IDs when their disclosure adds risk
- unrelated logs

Retain enough structure to support the conclusion. “Sensitive information removed” without an observable count/status is weak evidence.

## Before/after comparability

A remediation retest must preserve:

- same expectation
- equivalent actor and tenant relationship
- same resource/operation
- controlled fixture
- code/environment reference
- positive control

If those change materially, create a new check or explain why results are not directly comparable.

## Fictional sample

`public/assets/sample-report.json` is Northstar CRM, report `TP-DEMO-0830`. It is fictional and contains 16 checks.

- before: 11 pass, 4 fail, 1 untested
- after: 15 pass, 0 fail, 1 out of scope

The sample demonstrates structure only. It cannot be presented as client work, a testimonial, a case study, or proof of revenue.

### Downloadable fictional PDF

`tools/build-sample-report-pdf.py` renders the canonical sample into
`public/assets/tenantproof-fictional-report.pdf`.

- four A4 pages: decision summary, contradictions/repair/retest, complete matrix, and method/limits
- deterministic PDF metadata and content
- prominently fictional on every page
- generated from the same JSON used by the interactive Workbench
- contains no customer data, authorization, production evidence, testimonial, or revenue claim
- validated for PDF signature and minimum size before entering the public-only artifact

## Demo runner

`tools/run-matrix.mjs`:

- accepts only `--mode=demo`
- loads a local definition and adapter
- executes each scenario before and after
- validates the report
- writes local output
- exits with code 2 for any non-demo mode

A real execution adapter must be created per authorized engagement in a private workspace. Never make a public endpoint that accepts arbitrary URLs, keys, or adapters.

## Browser viewer behavior

- loads same-origin sample
- validates report before render
- keeps imported report in memory
- 2 MB local file limit
- no upload, storage, or telemetry
- filters by query/actor/area/operation/status
- phase toggle recalculates metrics and evidence
- rows are keyboard selectable
- report is printable
- fictional sample is downloadable as a compact PDF
- all report strings are escaped

## Delivery bundle — future paid engagement

Recommended customer handoff:

```text
TenantProof-<project>-<date>/
├── README.md
├── authorization-and-scope.pdf
├── report.json
├── report.pdf
├── matrix.csv
├── remediation/
│   ├── migrations/
│   └── pull-request.txt
├── regression/
│   └── checks/
├── evidence/
│   └── redacted/
├── residual-scope.md
├── deletion-record.md
└── SHA256SUMS
```

Do not include raw credentials or unrestricted traces.

## Planned schema evolution

### 1.1 candidate

Evidence-gated additions only:

- code revision identifier
- check execution timestamp
- positive-control field
- severity/impact classification separate from pass/fail
- evidence attachment manifest with hashes
- retest linkage

### 2.0 candidate

Only if repeated paid use requires:

- multiple executions per check
- environment history
- signed report manifest
- customer approval metadata
- machine-readable residual scope

Maintain a migration/view strategy for old reports. The browser must reject unsupported versions clearly rather than guessing.
