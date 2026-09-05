# Changelog

All notable product changes are recorded here. The project has not reached a commercially ready 1.0 release.

## [Unreleased] — v0.4.0 TenantBoundary rebrand candidate

### Brand

- renamed all visible public product copy from TenantProof to TenantBoundary after finding an active same-category open-source project using the former name
- changed new fictional report and check identifiers from `TP-` to `TB-`
- updated the site, report, generated PDF, metadata, manifest, icons, social image, operations, and handoff without changing the offer or safety boundary

### Compatibility

- added canonical `tenantboundary-fictional-report.pdf` and `tenantboundary-og.png` assets
- retained the former PDF and social-image paths as byte-identical aliases so existing links do not break
- kept schema 1.0 compatible with both `TP-` and `TB-` check identifiers
- expanded the candidate public-only artifact contract from 27 to 29 files

### Commercial state

- kept the site request-only, payment closed, the Notion form private, and customer/revenue/testimonial counts at zero
- recorded 3 of 12 private operator-readiness gates as verified: business contact, security contact, and delivery capacity
- selected a zero-cost acquisition constraint; do not buy a domain or paid lead before revenue

### Release state

- candidate branch: `product/tenantboundary-rebrand-v040`
- previous live baseline: v0.3.3, published under the former TenantProof name
- exact-head CI, merge, deployment, and live route verification are still required before v0.4.0 is called live

## [0.3.3] — 2026-09-05 — buyer-ready fictional proof pack

This release was published under the former TenantProof name.

### Product

- added a deterministic four-page fictional verification PDF generated from the canonical Northstar CRM report
- added a direct PDF download inside the Focus Workbench Report stage for proposals and buyer review
- expanded the public-only artifact contract from 26 to 27 files

### Quality

- added PDF signature, minimum-size, release-presence, and public-artifact isolation checks
- kept the PDF generated from the report source so the web sample and downloadable evidence cannot drift silently

### Operations

- added a deterministic 12-gate first-pilot readiness checker with separate outreach, intake, payment, first-pilot, and launch-experiment results
- added a fully blocked committed template and ignored private operator record
- added `pilot:check`, `pilot:strict`, and combined `commercial:strict` commands
- made release readiness prefer the ignored real release configuration when present

### Safety and truth

- technical quality continues to pass for the closed preview while non-strict readiness reports real blockers
- strict readiness fails until verified operator, legal, intake, payment, capacity, channel, and access facts exist
- global readiness does not replace customer-specific written authorization
- the commercial state remains preview/request-only and payment remains closed
- the separate Notion request form and pipeline remain private until operator, legal, privacy, and delivery facts are verified

### Release state

- released through squash-merged PR [#28](https://github.com/UnderNoNameYet/NoNameYet/pull/28) at `0be0d8d1009619d4abc5a48d7c08f68392c93967`
- deployed by successful main Pages [run #64](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33949379579) with an exact 27-file public-only artifact
- live routes, fictional JSON/CSV artifacts, and the four-page fictional PDF were verified on 2026-09-05
- live PDF: 53,284 bytes; SHA-256 `ced694b73a81d98630f31ee283f0120605bd2431bf9aca5911acedb3d80ca07e`

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
- retained `047691e35c6b8d38ba5540d1fe4de345ed752a6c` as the pre-TenantProof rollback reference

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
