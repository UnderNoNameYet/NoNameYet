# Changelog

All notable product changes are recorded here. The project has not reached a commercially ready 1.0 release.

## [Unreleased]

### Operations

- added a deterministic 12-gate first-pilot readiness checker with separate outreach, intake, payment, first-pilot, and launch-experiment results
- added a fully blocked committed template and ignored private operator record
- added `pilot:check`, `pilot:strict`, and combined `commercial:strict` commands
- made release readiness prefer the ignored real release configuration when present

### Safety and truth

- technical quality continues to pass for the closed preview while non-strict readiness reports real blockers
- strict readiness fails until verified operator, legal, intake, payment, capacity, channel, and access facts exist
- global readiness does not replace customer-specific written authorization
- no public product or runtime file changed

## [0.3.2] — 2026-09-03 — product-first Focus Workbench

### Added

- sidebar-free Focus Workbench at `report.html` with the real Scope → Matrix → Run → Repair → Report sequence
- paired authorization contracts, before/after run evidence, reviewable fictional repair state, and a dismissible evidence dock
- route-scoped `assets/workbench.css` and `assets/workbench.js`
- public `sample-matrix.html` planning page and downloadable fictional `sample-boundary-matrix.csv`
- automated coverage for stage navigation, filters, local import, keyboard row selection, evidence-dock behavior, mobile labels, reduced motion, and overflow

### Changed

- rebuilt the homepage around the executed product workflow instead of abstract artwork or long-form marketing copy
- made the fictional workbench the primary product preview and preserved the concise fixed-scope pricing path
- reordered the quality pipeline so screenshots and walkthrough media are generated before handoff synchronization
- upgraded the Pages pull-request build to run the complete deterministic quality gate and verify a 26-file public-only artifact

### Safety and truth

- Northstar CRM and every finding remain explicitly fictional
- the site remains static, request-only, same-origin, and closed to payment
- no hosted account, credential collection, live scanner, operational Connections page, team administration, or recurring monitoring was added
- Continuous Verification remains optional, unpriced, and evidence-gated
- raw working evidence retention remains 14 days after accepted delivery unless a signed scope or law requires less

### Release state

- released through squash-merged PR [#25](https://github.com/UnderNoNameYet/NoNameYet/pull/25) at `8ae0bea48491b1442b1181e2c1bed21b1f2479e1`
- deployed by successful main Pages workflow run #49 with an exact 26-file public-only artifact
- live v0.3.2 routes and fictional JSON/CSV artifacts verified on 2026-09-04 at `https://undernonameyet.github.io/NoNameYet/`

## [0.3.1] — 2026-08-31 — request-only GitHub Pages preview

### Published

- squash-merged PR [#23](https://github.com/UnderNoNameYet/NoNameYet/pull/23) to `main` at `6bc99104bb91b32afb50c8c7d9b416d74566f8ed`
- replaced rejected RebuttalKit with direct, browsable TenantProof source
- deployed the 22-file public-only artifact through successful workflow [run #40](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33372340582)
- verified the home, report, methodology, request, privacy, terms, 404, and fictional report-data routes at `https://undernonameyet.github.io/NoNameYet/`

### Quality and safety

- preserved `state: preview` and `paymentMode: closed`
- kept Northstar CRM explicitly fictional and customer intake local-only on the static site
- retained `047691e35c6b8d38ba5540d1fe4de345ed752a6c` as the pre-release rollback reference

## [0.3.0] — 2026-08-30 — canonical handoff release

### Added

- root `AGENTS.md` and compatibility `agent.md`
- complete product, UX, architecture, commercial, security, roadmap, quality, and continuation handoff
- selected screenshots, walkthrough plan, schema-aware report viewer, and deterministic quality tooling

## [0.2.0] — 2026-08-30 — production preparation

### Added

- external preview/ready runtime configuration
- CSP-compatible HTML and portable security headers
- canonical/social metadata, brand assets, manifest, sitemap, robots, `.nojekyll`, `llms.txt`, and 404
- release-readiness checker and operating runbooks

## [0.1.0] — 2026-08-30 — local MVP

### Added

- responsive marketing site, fictional before/after report, local JSON import, local scope worksheet, schema validator, demo-only runner, and Chromium QA

### Safety

- no external runtime requests, browser persistence, form POST, arbitrary target scanning, or unlabeled customer evidence
