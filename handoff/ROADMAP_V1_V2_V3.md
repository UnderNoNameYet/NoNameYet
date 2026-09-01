# Roadmap — V1 to V3

Roadmap items are ordered by evidence and risk, not excitement. Dates are intentionally absent until dependencies and capacity are real.

## V1 — prove the purchase

### V1.0 local MVP — complete

- premium static marketing site
- interactive fictional report viewer
- local JSON import
- local scope brief wizard
- methodology/privacy/terms/404
- report schema 1.0 and validator
- demo-only matrix runner
- responsive/privacy/browser QA

### V1.1 launch preparation — complete locally

- external release configuration
- CSP-compatible HTML
- security/canonical/social metadata
- icons, manifest, sitemap, robots, headers
- operational authorization/SOW/evidence/delivery/payment/intake templates
- launch and marketing plan
- release-readiness checker
- public Notion qualification form and private pipeline
- public launch hub and fictional report
- free fictional tenant-boundary matrix and downloadable CSV
- repository handoff/agent specification

### V1.2 premium public release — next

Blockers first:

- restore GitHub administrator approval
- inspect current `main` and workflow
- resolve production source layout
- integrate usable HTTPS form URL
- configure honest operator/contact/retention facts
- update static privacy/terms
- add monitored security contact or document omission
- build deploy-only-public artifact
- full quality gate and live smoke test
- merge and verify GitHub Pages

### V1.3 first paid pilot

- qualify one buyer
- sign authorization/SOW
- create private customer workspace and adapter
- execute matrix in staging with synthetic data
- deliver redacted report/remediation/retest
- record actual time, objections, and economics
- request feedback; no testimonial publication without exact consent

## V1 backlog — only if it improves conversion/delivery now

- public static link to hosted qualification form
- downloadable fictional report PDF
- deployment smoke-test script
- signed checksum manifest for handoff
- print polish across Chromium/Safari
- small FAQ populated from real buyer questions
- trust page with verified operator/processors/contact

## V2 — repeatable service system

Entry gate: at least three paid engagements with a repeated operational need.

Potential capabilities:

- reusable private customer adapter template
- standard fixture generator
- richer matrix authoring tool
- report schema 1.1 with code revision, execution time, positive control, evidence manifest
- customer-repository regression test template
- deterministic PDF and ZIP delivery builder
- engagement checklist automation
- per-engagement encryption/access log
- internal capacity and deletion dashboard
- agency/partner package

### V2 pages

- trust center
- real approved case studies
- FAQ based on repeated objections
- customer-specific delivery instructions
- optional sample-matrix builder

### V2 exclusions

Still no public arbitrary scanner, automatic policy deployment, or “secure” certification badge.

## V3 — productization after recurring demand

Entry gate: repeated paid requests for reruns/history and evidence that software improves margin/trust.

Possible directions:

### Regression service

- scheduled authorized runs against customer-owned staging
- signed execution manifests
- change-aware matrix selection
- alert on boundary regression

### Customer portal

- isolated organization accounts
- report history
- access-controlled stakeholder sharing
- evidence expiry/deletion controls
- audit log
- billing and engagement status

### CI integration

- customer-hosted runner
- pull-request checks
- synthetic fixture provisioning
- artifacts retained in customer environment
- clear failure semantics

### Partner/agency operations

- separate authorization per end customer
- delegated workspace roles
- white-label only with strict truth/consent rules

## Architecture gate before V3

Write a new threat model and architecture decision covering:

- tenant isolation for TenantProof itself
- secrets management
- data residency
- encryption and key ownership
- authentication/MFA
- report/evidence access control
- audit logs
- deletion guarantees
- incident response
- processor/legal obligations
- secure runner model

Do not turn the current static site into a credential-handling backend incrementally.

## Competitive strategy

### Win now

- narrower promise
- stronger evidence artifact
- clearer limits
- safer intake
- fixed entry price
- repair/retest continuity

### Do not chase

- breadth of automated scanner findings
- free scan volume
- compliance logo count
- generic pentest feature lists
- low-price marketplace catalogs

### Durable moat candidates

Only real work can validate these:

- high-quality role/tenant expectation libraries
- repeatable positive/negative control design
- evidence quality and redaction discipline
- remediation patterns tied to regression checks
- buyer trust earned through precise delivery
- partner distribution

## Feature prioritization score

Before adding a feature, score 0–2 on:

- improves paid conversion
- reduces authorization/privacy risk
- reduces delivery time
- improves evidence quality
- requested by real buyer/customer
- low maintenance/attack surface

Features below 7/12 should normally be deferred. Any feature that introduces credential custody or public scanning requires separate architecture/security review regardless of score.

## Roadmap kill criteria

Pause or reposition TenantProof if:

- ten matched contacts produce no serious conversation after one evidence-based revision
- buyers consistently prefer broader services and reject the narrow artifact
- safe delivery cannot fit price/capacity
- legal/insurance requirements exceed feasible pilot economics
- evidence cannot be produced without unacceptable customer-data exposure

Do not confuse sunk development effort with market validation.
