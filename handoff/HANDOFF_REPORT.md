# TenantBoundary handoff report

- **Snapshot:** 2026-09-05
- **Product stage:** TenantBoundary v0.4.0 request-only technical preview live and verified
- **Commercial stage:** no customer or revenue yet; private qualification form, static intake, and payment closed
- **Next objective:** use the zero-cost Upwork path for one highly matched proposal, then validate one safely authorized paid pilot before expanding the product surface

## Executive summary

TenantBoundary is a productized Supabase/PostgreSQL tenant-isolation verification and repair service. It turns a buyer-approved authorization model into paired controls and produces redacted before/after evidence. The promise remains narrow: **Prove that Customer A cannot read or modify Customer B’s data.**

The live v0.4.0 TenantBoundary release preserves the actual workflow rather than abstract positioning. The public homepage shows a concise fictional Run preview, while `report.html` is a spacious Focus Workbench organized as **Scope → Matrix → Run → Repair → Report**. The interface preserves local report import, schema 1.0, filters, keyboard selection, print, contextual result limits, and an explicit unresolved state.

PR [#30](https://github.com/UnderNoNameYet/NoNameYet/pull/30) passed exact-head CI and was squash-merged at `bc5ed44111084cea80dc157a3cfbabacf30eec61`. Main Pages [run #68](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33952234143) completed successfully and published the exact 29-file `public/` artifact. Direct public fetches confirmed the homepage, Workbench, matrix, supporting routes, fictional JSON/CSV, canonical PDF/social assets, and both former-path aliases.

The deterministic four-page fictional report PDF is generated from the same canonical JSON as the interactive Workbench. It gives proposals and buyer conversations a compact proof artifact without adding a backend, customer data, a claim of real work, or commercial activation. The live PDF is visibly fictional on every page.

## Product thesis

RLS presence does not encode an application’s tenant and role semantics. TenantBoundary records those semantics as:

`actor × tenant × resource × operation × expected result`

It executes the agreed positive and negative paths in a controlled environment, records the observation, repairs the root rule when in scope, reruns the same contract, and hands off evidence with limitations. The deliverable is an engineering decision artifact—not a scanner score, badge, certification, or guarantee.

## v0.4.0 TenantBoundary public product

### Homepage

- direct “verify tenant isolation before you ship” promise
- realistic fictional Workbench Run preview
- concise boundary questions, controlled method, before/after artifact, fixed prices, service boundaries, and local scope CTA
- no abstract hero illustration, stock art, generic app sidebar, or essay-length marketing wall

### Focus Workbench

- compact product/review header and prominent fictional labeling
- horizontal Scope → Matrix → Run → Repair → Report rail
- Scope guardrails and agreed ceilings
- paired allow/deny Matrix contracts
- Run with 11/4/1 before and 15/0/1 after counts, combined filters, and keyboard-selectable checks
- temporary bottom evidence dock with redacted trace and remediation
- fictional reviewable SQL Repair state and retest timeline
- local JSON Report import, 2 MB maximum, browser memory only, and print
- direct download of a four-page fictional PDF generated from the canonical sample

### Supporting routes

- methodology/authorization
- free fictional matrix and local CSV download
- three-step local scope worksheet
- pre-commercial privacy and terms
- branded 404

## Architecture and safety

V1 remains semantic HTML, two CSS layers, small vanilla JavaScript modules, and local JSON. There is no public backend, hosted account, credential vault, analytics service, payment API, arbitrary target scanner, or operational recurring monitor.

- written authorization before any real execution
- staging or a dedicated test project by default
- synthetic identities and records
- no credentials through the public site or repository
- imported report data stays in browser memory and clears on refresh
- same-origin runtime under restrictive CSP
- raw working evidence default: 14 days after accepted delivery unless a signed scope or law requires less
- Northstar CRM and every public finding are fictional

Connections, Team, Activity, Plan, hosted customer workspaces, and Continuous Verification are deferred. Continuous Verification is optional, unpriced, and must not be represented as operating until repeated paid demand and a new security/architecture decision exist.

## Quality state

Local deterministic Chromium QA passed for the released implementation:

- exactly 29 public files and 8 HTML pages expected
- 16 fictional sample checks
- before: 11 pass, 4 fail, 1 unresolved
- after: 15 pass, 0 fail, 1 unresolved
- five-stage navigation, phase changes, filters, local import, row selection, dock open/close, and print hooks covered
- fictional label retained on desktop/mobile
- reduced-motion and 390 px overflow checks covered
- zero console/page errors, external runtime requests, browser persistence calls, and POST requests
- demo runner rejects live mode

The v0.4.0 local run, exact-head PR build, and main deployment passed the complete quality orchestrator with Playwright Chromium, FFmpeg, Pillow, and ReportLab against the 29-file public-only contract. After every material source change, rerun and inspect the generated captures, walkthrough, PDFs, source manifest, documentation result, and public-only bundle.

The gate validates the generated sample PDF’s signature, minimum size, source linkage, fictional labeling, browser download filename, and deployment isolation. The live four-page A4 file was fetched successfully at 53,287 bytes with SHA-256 `8ef66a08cddcc7e877441aa006e7815d7fc84c9e87f5f9e7778c1a74f700fd84`; its former-path alias is byte-identical.

## Commercial model

- Boundary Verification: $349
- Verification + Repair: $649
- larger, regulated, production-only, or unusually sensitive scope: manual quote
- request and qualification only; no unrestricted checkout
- invoice/escrow only after qualification, written authorization, and signed scope
- customers: 0; revenue: $0; testimonials: 0; published real findings: 0

Business/security contact and delivery capacity are verified privately. Payment stays closed until an actual contract also has the required identity, payout/tax, SOW, authorization, secure-access, and refund facts. None of those are required to keep the static app published.

A private Notion request database, qualification form, and launch-control page are prepared. The user explicitly kept the form private; do not describe or operate it as public until the same commercial facts and privacy handling are approved.

## Continuation plan

1. Preserve the verified TenantBoundary v0.4.0 request-only release and its 29-file public-only deployment boundary.
2. Create or finish only the free Upwork Basic profile; complete identity details privately inside Upwork if the platform requires them.
3. Recheck the single best-fit India-eligible Supabase review and apply once only if free Connects are available.
4. Keep `state: preview`, `paymentMode: closed`, the Notion form private, and all fictional labels until the corresponding commercial gates are ready.
5. Do not buy a domain, paid tool, paid lead, or proposal credits before revenue.
6. Prefer one safely authorized paid pilot over speculative workspace, billing, connection, or recurring-monitoring features.
7. For any product change, use a focused branch, exact-head CI, changed-file/secret review, generated-artifact reconciliation, and live route verification after merge.
8. Keep customer evidence, credentials, authorization records, and engagement workspaces outside this public repository.

## Design direction to preserve

- purpose-built engineering workbench, not generic SaaS chrome
- one workflow stage at a time
- concise copy, authentic product details, generous working space
- horizontal stage rail; no permanent sidebar or inspector
- temporary evidence dock only after selection
- warm paper, graphite/ink structure, restrained product accent, semantic result colors
- no abstract tenant circles, jagged seams, decorative boundary paths, hacker clichés, or “Watch the boundary hold” concept

## Historical context

RebuttalKit, Stay5, the App Store screenshot service/ClearCal proposal, and Relay migration concepts are frozen or rejected. Do not revive them as TenantBoundary proof, merge their positioning into this product, or use their artifacts as customer evidence.

## Handoff integrity

This repository records product strategy, implementation, decisions, limitations, and operational safeguards. It contains no customer secrets, production credentials, private evidence, or fabricated work. Future changes must preserve that standard and the public-only deploy boundary.
