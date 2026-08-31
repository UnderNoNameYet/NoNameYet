# GitHub publication record

## Current status

- Repository: `UnderNoNameYet/NoNameYet`
- Authenticated GitHub user: `MYIndieDEV`
- Default branch: `main`
- Public origin: `https://undernonameyet.github.io/NoNameYet/`
- Pull request: [#23](https://github.com/UnderNoNameYet/NoNameYet/pull/23)
- Squash merge SHA: `6bc99104bb91b32afb50c8c7d9b416d74566f8ed`
- Merged at: `2026-08-31T08:19:02Z`
- Pages workflow: `.github/workflows/pages.yml`
- Deployment run: [#40](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33372340582) — success
- Deployment completed at: `2026-08-31T08:19:39Z`
- Live verification recorded at: `2026-08-31T08:51:01Z`
- Pre-release rollback SHA: `047691e35c6b8d38ba5540d1fe4de345ed752a6c`

Current `main` is direct TenantProof v0.3.x source. The public product is a request-only technical preview. Static intake is local-only, payment is closed, and Northstar CRM remains explicitly fictional.

## Publication outcome

PR #23 replaced the rejected RebuttalKit release and removed its generated-source trees. Current `main` contains the product source, schema, tools, operations, handoff documents, selected media, quality source, PR template, and one permanent Pages workflow.

The temporary source materializer, staging reference, diagnostic file, signed download URL, and legacy directories are absent from the final tree and final PR delta. No transfer token or attachment URL was retained in the release.

## Review evidence

- PR build completed successfully before merge.
- Mergeability was `clean`.
- Final delta: 198 files — 97 added, 3 modified, 97 removed, and 1 renamed.
- All 87 non-removed text patches (499,201 added-line bytes) passed targeted checks for AWS signatures, GitHub/OpenAI/Notion token forms, private keys, authorization headers, the private Outlook domain, staging identifiers, materializer names, and signed-source hosts.
- GitHub Advanced Security secret scanning was unavailable for this repository; the exact-diff scan and the repository's credential/private-email quality gate were used instead.
- Local release evidence remained 31/31 quality steps and 136 documentation checks before publication.

## CI and deployment boundary

The permanent workflow:

1. checks out direct TenantProof source;
2. regenerates public brand assets;
3. hardens HTML and builds preview configuration;
4. validates the report contract and fictional fixture;
5. rejects live matrix execution;
6. checks JavaScript syntax and documentation integrity;
7. builds `dist/` exclusively from `public/`;
8. confirms preview state, closed payment, and exactly 22 public files;
9. uploads and deploys only `dist/` after a push to `main`.

Source, operations, tests, handoff documents, media, and build logs are never part of the Pages artifact.

## Live verification

The successful post-merge workflow is tied to `6bc99104bb91b32afb50c8c7d9b416d74566f8ed`. Public fetches confirmed TenantProof content on:

- `/`
- `/report.html`
- `/methodology.html`
- `/request.html`
- `/privacy.html`
- `/terms.html`
- `/404.html`
- `/assets/sample-report.json`

The sample data exposed schema `1.0`, report `TP-DEMO-0830`, project `Northstar CRM`, and the label `Fictional demonstration only`. No RebuttalKit release marker appeared. A remote interactive browser could not resolve the GitHub Pages hostname from the sandbox; the exact deployed source had already passed local Chromium responsive, interaction, console, persistence, request, and external-runtime QA.

## Commercial boundary

This publication does not open customer work or payment. Before commercial intake or invoicing, require verified operator identity and jurisdiction, an owned business contact and HTTPS intake/deletion route, launch-state legal copy, retention approval, delivery capacity, processor/tax/refund configuration, and written authorization for every target.

## Rollback

For a critical routing, CSP, privacy, truth, or deployment defect, revert `6bc99104bb91b32afb50c8c7d9b416d74566f8ed` or restore `047691e35c6b8d38ba5540d1fe4de345ed752a6c`, then re-run Pages and verify routes, assets, configuration, and fictional labels. Do not open payment or real testing during rollback.
