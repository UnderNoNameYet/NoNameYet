# GitHub publication record

## Current status

- Repository: `UnderNoNameYet/NoNameYet`
- Authenticated GitHub user: `MYIndieDEV`
- Default branch: `main`
- Public origin: `https://undernonameyet.github.io/NoNameYet/`
- Release pull request: [#34](https://github.com/UnderNoNameYet/NoNameYet/pull/34)
- Exact pull-request head: `dea36c813fe58748051e73988cdf6049bdaf37ec`
- Squash merge SHA: `c3b2f8461bec92b28d97e0696f15c602c8044bb2`
- Merged at: `2026-09-06T10:53:20Z`
- Pages workflow: `.github/workflows/pages.yml`
- Release deployment: main [workflow run #76](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/34028664281) — success
- Exact commit checks: `https://github.com/UnderNoNameYet/NoNameYet/commit/c3b2f8461bec92b28d97e0696f15c602c8044bb2/checks`
- Live verification recorded at: `2026-09-06T11:00:57Z`
- Immediate safe rollback main: `b5bec82967b51c3f9a00be06a25150c744cc613f`
- Older pre-TenantProof rollback reference: `047691e35c6b8d38ba5540d1fe4de345ed752a6c`

Current `main` contains the live TenantBoundary v0.4.0 portfolio-only safety release. Every public Upwork booking path is removed. The static worksheet and report import are local-only, the separate Notion qualification form remains private, payment is closed, customer work is paused, and Northstar CRM remains explicitly fictional.

## Publication outcome

PR #34 removed the marketplace booking integration after platform account eligibility became unresolved. It restored local portfolio-only calls to action, preserved the schema-1.0 Workbench and fictional proof pack, and added a regression assertion that rejects any `upwork.com` URL in the public artifact.

The source merge changed 37 expected product, handoff, quality, release, and operations files. The deployment still contains exactly 29 files generated exclusively from `public/`: canonical TenantBoundary assets plus byte-identical compatibility aliases. Repository handoff, operations, tests, tooling, and build output stay outside the artifact.

## Review evidence

- Exact PR head `dea36c813fe58748051e73988cdf6049bdaf37ec` passed build job [101473808631](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/34028555503/job/101473808631).
- The pull-request deploy job was correctly skipped.
- The pull request was cleanly mergeable and squash-merged only after the exact-head build passed.
- All 37 changed files were reviewed; the local credential/private-key/private-email scan returned zero hits.
- GitHub Advanced Security secret scanning was unavailable for the repository; this was disclosed rather than represented as a pass.
- Desktop and 390 px mobile captures were directly inspected before publication.
- The complete local quality orchestrator passed all 37 steps before the pull request.

## CI and deployment boundary

The v0.4.0 workflow uses Node 20, Python 3.12, pinned Playwright/Pillow/ReportLab, and FFmpeg. It runs `npm run quality`, confirms `state: preview`, confirms `paymentMode: closed`, rejects public Upwork URLs, requires exactly 29 files in `dist/`, and deploys only outside pull-request events.

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
- `/assets/tenantproof-fictional-report.pdf`
- `/assets/tenantboundary-og.png`
- `/assets/tenantproof-og.png`

The homepage disclosed “Bookings and customer work are paused,” exposed only local portfolio actions, and contained no Upwork URL. The scope worksheet disclosed that bookings, customer work, and payment are paused. The Workbench, matrix, and configuration also contained no marketplace URL. The live PDF remained a valid four-page A4 fictional demonstration at 53,287 bytes with SHA-256 `8ef66a08cddcc7e877441aa006e7815d7fc84c9e87f5f9e7778c1a74f700fd84`; its former-path alias was byte-identical. The canonical and former-path social images remained byte-identical at 68,225 bytes.

Live pointer and keyboard behavior were not relabeled as directly tested against GitHub Pages. That boundary is covered by the exact-source Chromium interaction suite, successful pull-request/main jobs, and direct deployed-content fetches.

## Historical publication

PR [#30](https://github.com/UnderNoNameYet/NoNameYet/pull/30) published the TenantBoundary v0.4.0 working-name release at `bc5ed44111084cea80dc157a3cfbabacf30eec61` through successful main run #68. PR #32 temporarily added the marketplace booking path, and documentation PR #33 recorded it; both were superseded by safety PR #34.

PR [#25](https://github.com/UnderNoNameYet/NoNameYet/pull/25) published the v0.3.2 Focus Workbench at `8ae0bea48491b1442b1181e2c1bed21b1f2479e1` through successful main run #49. Documentation-only PR [#26](https://github.com/UnderNoNameYet/NoNameYet/pull/26) reconciled that state and run #54 redeployed the unchanged 26-file artifact.

PR [#23](https://github.com/UnderNoNameYet/NoNameYet/pull/23) originally published TenantProof v0.3.1 at `6bc99104bb91b32afb50c8c7d9b416d74566f8ed` through successful Pages [run #40](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33372340582). PR [#24](https://github.com/UnderNoNameYet/NoNameYet/pull/24) reconciled that publication at `f17ff3476735f423445cb37cb6084b3763c42269`. These are historical records, not the current release.

## Commercial boundary

This publication does not open customer work or payment. Publishing the static app does not require a contracting identity. The private Notion form remains unpublished until its HTTPS intake/deletion and launch-state privacy gates are ready; accepting a contract or payment additionally requires platform/payout/tax facts. Business/security contact and delivery capacity are already verified privately. Every real target still requires customer-specific written authorization.

## Rollback

For a critical routing, PDF, CSP, privacy, truth, or deployment defect, fix forward from safety merge `c3b2f8461bec92b28d97e0696f15c602c8044bb2` or restore the known-safe pre-marketplace main `b5bec82967b51c3f9a00be06a25150c744cc613f`. Do not restore the marketplace-linked release. Rerun Pages and verify routes, assets, configuration, the 29-file artifact count, the absence of booking URLs, and fictional labels. Keep intake, payment, and real testing closed during rollback.
