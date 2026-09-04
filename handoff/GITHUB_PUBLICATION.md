# GitHub publication record

## Current status

- Repository: `UnderNoNameYet/NoNameYet`
- Authenticated GitHub user: `MYIndieDEV`
- Default branch: `main`
- Public origin: `https://undernonameyet.github.io/NoNameYet/`
- Release pull request: [#25](https://github.com/UnderNoNameYet/NoNameYet/pull/25)
- Squash merge SHA: `8ae0bea48491b1442b1181e2c1bed21b1f2479e1`
- Merged at: `2026-09-03T06:24:19Z`
- Pages workflow: `.github/workflows/pages.yml`
- Deployment: main workflow run #49 — success, duration 1m 54s
- Workflow history: `https://github.com/UnderNoNameYet/NoNameYet/actions/workflows/pages.yml?query=branch%3Amain`
- Exact commit checks: `https://github.com/UnderNoNameYet/NoNameYet/commit/8ae0bea48491b1442b1181e2c1bed21b1f2479e1/checks`
- Live verification recorded at: `2026-09-04T04:45:58Z`
- Immediate prior known-good main: `f17ff3476735f423445cb37cb6084b3763c42269`
- Older pre-TenantProof rollback reference: `047691e35c6b8d38ba5540d1fe4de345ed752a6c`

Current `main` contains direct TenantProof v0.3.2 source. The public product remains a request-only technical preview. Static intake and report import are local-only, payment is closed, and Northstar CRM remains explicitly fictional.

## Publication outcome

PR #25 shipped the concise product-first homepage, the sidebar-free Scope → Matrix → Run → Repair → Report Focus Workbench, the free fictional matrix/CSV, expanded interaction QA, and a corrected capture-before-sync quality sequence.

The release changed 47 expected product, handoff, quality, workflow, and operations files: 1,484 additions and 2,512 deletions. No temporary materializer/finalizer path remained in the release tree. GitHub Pages published exactly 26 files generated exclusively from `public/`; repository handoff, operations, tests, tooling, and build output stayed outside the artifact.

## Review evidence

- Exact PR head: `1d474a8eaeb58c8202562c1f58366c9b520385ec`.
- Exact-head build job `100542681642` completed successfully.
- Pull-request deploy job `100543081610` was correctly skipped.
- PR mergeability was `clean`; submitted reviews, review threads, and general review comments remained empty after automated review was requested twice.
- All 38 patch-bearing files (325,173 characters) passed the compensating credential/private-key/private-email scan with zero hits.
- GitHub Advanced Security secret scanning was unavailable; this was disclosed rather than represented as a pass.
- Repository-generated homepage, Matrix, and mobile request captures were directly reviewed. The final Run capture was signed off through approved source-backed state plus matching manifest/checksum evidence; it was not falsely represented as directly opened.

## CI and deployment boundary

The permanent workflow uses Node 20, Python 3.12, pinned Playwright/Pillow/ReportLab, and FFmpeg. It runs `npm run quality`, confirms `state: preview`, confirms `paymentMode: closed`, requires exactly 26 files in `dist/`, and deploys only outside pull-request events.

`npm run quality` validates static and browser behavior, captures product media, records the walkthrough, synchronizes stable handoff assets, regenerates the PDF/source manifest, checks documentation, runs the release-readiness baseline, and builds `dist/` from `public/` only.

## Live verification

Public fetches returned the v0.3.2 content on:

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

The homepage returned “Verify tenant isolation before you ship,” the workbench returned the five-stage fictional Northstar CRM review, the sample report exposed schema `1.0`, and the matrix CSV returned ten fictional starter checks. The request page remained a private local worksheet and explicitly rejected secrets.

The sandbox’s interactive browser could not resolve the GitHub Pages/GitHub host, so live pointer/keyboard behavior was not re-labeled as directly browser-tested. That limitation is bounded by the exact-source Chromium interaction suite, successful main build/deploy, and direct deployed-content fetches.

## Historical publication

PR [#23](https://github.com/UnderNoNameYet/NoNameYet/pull/23) originally published TenantProof v0.3.1 at `6bc99104bb91b32afb50c8c7d9b416d74566f8ed` through successful Pages [run #40](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33372340582). PR [#24](https://github.com/UnderNoNameYet/NoNameYet/pull/24) reconciled that publication at `f17ff3476735f423445cb37cb6084b3763c42269`. These are historical records, not the current release.

## Commercial boundary

This publication does not open customer work or payment. Before commercial intake or invoicing, require verified operator identity and jurisdiction, an owned business contact and HTTPS intake/deletion route, launch-state legal copy, approved retention, delivery capacity, processor/tax/refund configuration, security contact, and written authorization for every target.

## Rollback

For a critical routing, CSP, privacy, truth, or deployment defect, revert `8ae0bea48491b1442b1181e2c1bed21b1f2479e1` or restore prior known-good `f17ff3476735f423445cb37cb6084b3763c42269`, then rerun Pages and verify routes, assets, configuration, and fictional labels. Keep payment and real testing closed during rollback.
