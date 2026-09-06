# GitHub publication record

## Current status

- Repository: `UnderNoNameYet/NoNameYet`
- Authenticated GitHub user: `MYIndieDEV`
- Default branch: `main`
- Public origin: `https://undernonameyet.github.io/NoNameYet/`
- Current release pull request: [#32](https://github.com/UnderNoNameYet/NoNameYet/pull/32)
- Exact pull-request head: `2ebcbe68456ae829b67bb2be800f4b2591c95bcd`
- Squash merge SHA: `8eec4b9efde9707ae132b7ae22e6a0e1747be1ac`
- Merged at: `2026-09-06T08:32:00Z`
- Pages workflow: `.github/workflows/pages.yml`
- Release deployment: main [workflow run #72](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/34022114404) — success
- Exact commit checks: `https://github.com/UnderNoNameYet/NoNameYet/commit/8eec4b9efde9707ae132b7ae22e6a0e1747be1ac/checks`
- Live verification recorded at: `2026-09-06T08:35:00Z`
- Immediate pre-release rollback main: `b5bec82967b51c3f9a00be06a25150c744cc613f`
- Older pre-TenantProof rollback reference: `047691e35c6b8d38ba5540d1fe4de345ed752a6c`

Current `main` contains the live TenantBoundary v0.4.0 marketplace-linked preview. The approved $349 Upwork Project Catalog offer is the external booking path. The static worksheet and report import remain local-only, the separate Notion qualification form remains private, direct website payment is closed, and Northstar CRM remains explicitly fictional.

## Publication outcome

PR #30 rebranded the product and deterministic four-page fictional verification PDF from TenantProof to TenantBoundary after a same-category naming collision. It preserved the schema-1.0 Workbench, offer, safety boundary, and request-only state without adding a backend, account, credential flow, customer data, analytics, or commercial activation.

PR #32 added the approved Upwork URL to seven public pages, five homepage locations, the runtime config, and handoff. It updated privacy and terms to distinguish Upwork processing from the no-submit website, while preserving preview state, closed direct payment, and engagement-specific written authorization.

The merge changed 88 expected product, handoff, quality, workflow, release, and generated-media files. v0.4.0 keeps CI-generated PDFs and expands the contract to exactly 29 files generated exclusively from `public/`: canonical TenantBoundary assets plus byte-identical compatibility aliases. Repository handoff, operations, tests, tooling, and build output stay outside the artifact.

## Review evidence

- Exact marketplace-link head `2ebcbe68456ae829b67bb2be800f4b2591c95bcd` passed [workflow run #71](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/34021970749); its deploy job was correctly skipped.
- PR #32 was cleanly mergeable with 34 expected text files, 307 additions, 193 deletions, and one commit.
- Local and exact-head CI both passed all 37 quality steps, including URL validation, safe external-link attributes, no external runtime requests, and desktop/mobile visual QA.

- Exact PR head `984272c83cc5077dc27c8a0ec7c74404b403f265` passed build job [101268717192](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33952105496/job/101268717192).
- Pull-request deploy job [101268945114](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33952105496/job/101268945114) was correctly skipped.
- The pull request was cleanly mergeable; submitted reviews, review threads, and general comments were empty before merge.
- All 88 changed files were reviewed; the focused credential/private-key/private-email scan returned zero hits.
- GitHub Advanced Security secret scanning was unavailable for the repository; this was disclosed rather than represented as a pass.
- All four rendered PDF pages, desktop/mobile captures, social image, and the Workbench Report stage were directly inspected before publication.
- A guarded branch-only workflow reconciled deterministic binaries, committed only 12 expected generated paths, and was removed before the pull request.

## CI and deployment boundary

The v0.4.0 workflow uses Node 20, Python 3.12, pinned Playwright/Pillow/ReportLab, and FFmpeg. It runs `npm run quality`, confirms `state: preview`, confirms `paymentMode: closed`, requires exactly 29 files in `dist/`, and deploys only outside pull-request events.

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

The live homepage exposes five copies of the exact approved Upwork URL. `site-config.js` contains the same URL; `site.js` restricts the configured marketplace host/path; privacy and terms distinguish platform processing from direct-site behavior; the request page remains no-submit; and the Workbench retains its fictional label.

The homepage returned “Verify tenant isolation before you ship,” the Workbench exposed the five-stage fictional Northstar CRM review and PDF download, the sample report retained schema `1.0` with report ID `TB-DEMO-0830`, and the matrix CSV returned the fictional starter checks. The live PDF was a valid four-page A4 document, 53,287 bytes, visibly labeled as a fictional demonstration, with SHA-256 `8ef66a08cddcc7e877441aa006e7815d7fc84c9e87f5f9e7778c1a74f700fd84`. Its former-path alias was byte-identical. The canonical and former-path social images were also byte-identical at 68,225 bytes.

Live pointer and keyboard behavior were not relabeled as directly tested against GitHub Pages. That boundary is covered by the exact-source Chromium interaction suite, successful pull-request/main jobs, and direct deployed-content fetches.

## Historical publication

PR [#25](https://github.com/UnderNoNameYet/NoNameYet/pull/25) published the v0.3.2 Focus Workbench at `8ae0bea48491b1442b1181e2c1bed21b1f2479e1` through successful main run #49. Documentation-only PR [#26](https://github.com/UnderNoNameYet/NoNameYet/pull/26) reconciled that state and run #54 redeployed the unchanged 26-file artifact.

PR [#23](https://github.com/UnderNoNameYet/NoNameYet/pull/23) originally published TenantProof v0.3.1 at `6bc99104bb91b32afb50c8c7d9b416d74566f8ed` through successful Pages [run #40](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33372340582). PR [#24](https://github.com/UnderNoNameYet/NoNameYet/pull/24) reconciled that publication at `f17ff3476735f423445cb37cb6084b3763c42269`. These are historical records, not the current release.

## Commercial boundary

This publication opens only the approved external Upwork order path; it does not open direct website intake or payment and does not itself authorize customer work. The private Notion form remains unpublished until its HTTPS intake/deletion and direct-launch privacy gates are ready. Platform identity/payout/tax requirements remain private operator tasks. Every real target still requires customer-specific written authorization.

## Rollback

For a critical marketplace-link, routing, PDF, CSP, privacy, truth, or deployment defect, revert release merge `8eec4b9efde9707ae132b7ae22e6a0e1747be1ac` or restore known-good main `b5bec82967b51c3f9a00be06a25150c744cc613f`, then rerun Pages and verify routes, assets, configuration, the 29-file artifact count, and fictional labels. Keep direct intake/payment and real testing closed during rollback.
