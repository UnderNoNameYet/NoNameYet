# GitHub publication record

## Current status

- Repository: `UnderNoNameYet/NoNameYet`
- Authenticated GitHub user: `MYIndieDEV`
- Default branch: `main`
- Public origin: `https://undernonameyet.github.io/NoNameYet/`
- Release pull request: [#28](https://github.com/UnderNoNameYet/NoNameYet/pull/28)
- Exact pull-request head: `10068fd64305995553eabe3c93c90642fec2ecb6`
- Squash merge SHA: `0be0d8d1009619d4abc5a48d7c08f68392c93967`
- Merged at: `2026-09-05T06:16:46Z`
- Pages workflow: `.github/workflows/pages.yml`
- Latest verified baseline deployment: main [workflow run #66](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33950062374) — success
- Exact commit checks: `https://github.com/UnderNoNameYet/NoNameYet/commit/0be0d8d1009619d4abc5a48d7c08f68392c93967/checks`
- Live verification recorded at: `2026-09-05T06:20:00Z`
- Immediate prior known-good main: `88cdf9837780b864a3527f3b568b10512f170461`
- Older pre-TenantBoundary rollback reference: `047691e35c6b8d38ba5540d1fe4de345ed752a6c`

Current `main` contains the v0.3.3 baseline published under the former TenantProof name. Branch `product/tenantboundary-rebrand-v040` is the TenantBoundary v0.4.0 candidate. The public product remains a request-only technical preview. The static worksheet and report import are local-only, the separate Notion qualification form remains private, payment is closed, and Northstar CRM remains explicitly fictional.

## Publication outcome

PR #28 added a deterministic four-page fictional verification PDF under the former product name, generated from the same canonical schema-1.0 sample as the interactive Workbench. The v0.4.0 candidate rebrands that artifact without adding a backend, account, credential flow, customer data, analytics, or commercial activation.

The v0.3.3 merge changed 32 expected product, handoff, quality, workflow, and release files. The v0.4.0 candidate keeps CI-generated PDFs and expands the contract to exactly 29 files generated exclusively from `public/`: canonical TenantBoundary assets plus byte-identical compatibility aliases. Repository handoff, operations, tests, tooling, and build output stay outside the artifact.

## Review evidence

- Exact PR head `10068fd64305995553eabe3c93c90642fec2ecb6` passed build job [101260859764](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33949272284/job/101260859764).
- Pull-request deploy job [101261064743](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33949272284/job/101261064743) was correctly skipped.
- The pull request was cleanly mergeable; submitted reviews, review threads, and general comments were empty before merge.
- All 32 changed files were reviewed; the focused credential/private-key/private-email scan returned zero hits.
- GitHub Advanced Security secret scanning was unavailable for the repository; this was disclosed rather than represented as a pass.
- All four rendered PDF pages and the Workbench Report stage were directly inspected before publication.

## CI and deployment boundary

The v0.4.0 candidate workflow uses Node 20, Python 3.12, pinned Playwright/Pillow/ReportLab, and FFmpeg. It runs `npm run quality`, confirms `state: preview`, confirms `paymentMode: closed`, requires exactly 29 files in `dist/`, and deploys only outside pull-request events.

`npm run quality` validates static and browser behavior, the canonical sample and fictional PDF, product media, the walkthrough, stable handoff assets, source manifest, documentation, pilot-readiness reporting, release readiness, secret/private-email patterns, and the `public/`-only bundle.

## Live verification

Direct public fetches returned successful responses for:

- `/`
- `/report.html`
- `/methodology.html`
- `/sample-matrix.html`
- `/request.html?package=repair`
- `/privacy.html`
- `/terms.html`
- `/404.html`
- `/assets/sample-report.json`
- `/assets/sample-boundary-matrix.csv`
- `/assets/tenantboundary-fictional-report.pdf`

The homepage returned “Verify tenant isolation before you ship,” the Workbench exposed the five-stage fictional Northstar CRM review and PDF download, the sample report retained schema `1.0`, and the matrix CSV returned the fictional starter checks. The live PDF was a valid four-page A4 document, 53,284 bytes, visibly labeled as a fictional demonstration, with SHA-256 `ced694b73a81d98630f31ee283f0120605bd2431bf9aca5911acedb3d80ca07e`.

Live pointer and keyboard behavior were not relabeled as directly tested against GitHub Pages. That boundary is covered by the exact-source Chromium interaction suite, successful pull-request/main jobs, and direct deployed-content fetches.

## Historical publication

PR [#25](https://github.com/UnderNoNameYet/NoNameYet/pull/25) published the v0.3.2 Focus Workbench at `8ae0bea48491b1442b1181e2c1bed21b1f2479e1` through successful main run #49. Documentation-only PR [#26](https://github.com/UnderNoNameYet/NoNameYet/pull/26) reconciled that state and run #54 redeployed the unchanged 26-file artifact.

PR [#23](https://github.com/UnderNoNameYet/NoNameYet/pull/23) originally published TenantBoundary v0.3.1 at `6bc99104bb91b32afb50c8c7d9b416d74566f8ed` through successful Pages [run #40](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33372340582). PR [#24](https://github.com/UnderNoNameYet/NoNameYet/pull/24) reconciled that publication at `f17ff3476735f423445cb37cb6084b3763c42269`. These are historical records, not the current release.

## Commercial boundary

This publication does not open customer work or payment. Publishing the static app does not require a contracting identity. The private Notion form remains unpublished until its HTTPS intake/deletion and launch-state privacy gates are ready; accepting a contract or payment additionally requires platform/payout/tax facts. Business/security contact and delivery capacity are already verified privately. Every real target still requires customer-specific written authorization.

## Rollback

For a critical rebrand, routing, PDF, CSP, privacy, truth, or deployment defect, restore known-good main `a1baa9ebde9bf1b1a05d7a0563ee9927ff96f9af` (or release merge `0be0d8d1009619d4abc5a48d7c08f68392c93967`), then rerun Pages and verify routes, assets, configuration, the expected artifact count, and fictional labels. Keep intake, payment, and real testing closed during rollback.
