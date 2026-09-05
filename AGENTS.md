# TenantProof — canonical agent instructions

This is the primary instruction file for any AI or human continuing this repository. Read it before editing code, copy, operations, pricing, or launch configuration. Then follow the ordered handoff reading list below.

## Mission

TenantProof is a productized Supabase/PostgreSQL tenant-isolation verification and repair service. Its core promise is deliberately narrow:

> Prove that Customer A cannot read or modify Customer B’s data.

The product sells executed authorization evidence, remediation, and regression protection. It does **not** sell visual polish, generic checklists, automated badges, vague reassurance, or guaranteed security.

The commercial experiment is to earn at least $100 within ten days of public launch. This is a target, never a promise or forecast.

## Product ownership

The user delegated product, UX, engineering, pricing, release, and go-to-market decisions to the agent and authorized merging after quality gates pass. Do not ask for routine product approvals. Make a reasoned choice, document it, implement it, and test it.

This delegation does not permit fabrication. An AI cannot become the legal contracting party, create a legal identity, invent an owned email/domain/payment account, sign customer authorization, or claim credentials it does not possess. Keep payment closed until real operator and processor facts are configured.

## Required reading order

1. `AGENTS.md`
2. `handoff/HANDOFF_REPORT.md`
3. `handoff/CURRENT_STATE.json`
4. `handoff/PRODUCT_SPEC.md`
5. `handoff/PAGE_AND_SECTION_SPECS.md`
6. `handoff/UX_DESIGN_SYSTEM.md`
7. `handoff/TECHNICAL_ARCHITECTURE.md`
8. `handoff/FEATURE_AND_FUNCTION_INVENTORY.md`
9. `handoff/SECURITY_PRIVACY_AND_SAFETY.md`
10. `handoff/QUALITY_GATES.md`
11. `handoff/ROADMAP_V1_V2_V3.md`
12. `operations/` documents relevant to the task

Use `handoff/README.md` as the complete index.

## Current state — 2026-09-04

- Product specification, static MVP, production-preparation assets, and operating safeguards: complete.
- Product UI: v0.3.2 is live with the concise product-first homepage, free boundary matrix, and sidebar-free Focus Workbench organized as Scope → Matrix → Run → Repair → Report.
- Buyer proof: a v0.3.3 candidate adds a deterministic four-page fictional PDF generated from the canonical sample; do not call it live until pull-request, deployment, and public-file verification pass.
- GitHub release: PR [#25](https://github.com/UnderNoNameYet/NoNameYet/pull/25) was squash-merged to `main` at `8ae0bea48491b1442b1181e2c1bed21b1f2479e1` on 2026-09-03.
- Deployment: main workflow run #49 completed successfully. The exact commit check reports a successful build, and public verification on 2026-09-04 returned the v0.3.2 homepage, workbench, matrix, methodology, request, privacy, terms, 404, report JSON, and matrix CSV.
- Deployment boundary: the live v0.3.2 artifact contains exactly 26 files; the v0.3.3 candidate contains 27 after generating the fictional PDF. Repository handoff, operations, tests, and build output remain unpublished.
- Runtime state: request-only preview, `state: preview`, `paymentMode: closed`, local worksheet/report import, and no hosted account, analytics, scanner, or credential collection.
- First-pilot readiness: a deterministic private-configuration gate is prepared; the committed template remains fully blocked and does not authorize outreach, intake, payment, or testing.
- Payment, commercial intake, customer work, testimonials, revenue, and real findings: none; never imply otherwise.
- Immediate prior known-good main is `f17ff3476735f423445cb37cb6084b3763c42269`; the older pre-TenantProof rollback reference is `047691e35c6b8d38ba5540d1fe4de345ed752a6c`.

The canonical machine source is the current repository root on `main`; local `/data/` paths are release-session mirrors only. Historical paths for RebuttalKit, Stay5, screenshot concepts, or ClearCal are not active products.

## Offer and pricing

### Boundary Verification — $349

- Up to 12 named tables
- Up to three application roles
- Agreed read/write isolation matrix
- Redacted evidence report
- Remediation guidance
- One retest

### Verification + Repair — $649

- Up to 25 named tables
- Up to three application roles
- Selected functions and one storage bucket
- SQL/RLS migrations
- Reviewable pull request
- Regression checks
- One retest

Larger, production-only, regulated, or unusually sensitive scopes require a manual quote.

## Non-negotiable truth rules

- Never promise traffic, conversion, revenue, total security, compliance, platform approval, or prevention of every vulnerability.
- Never fabricate buyers, clients, revenue, testimonials, portfolio history, credentials, findings, approvals, or scarcity.
- The Northstar CRM report is fictional. Label it prominently every time.
- A `pass` applies only to the recorded expectation, actor, operation, environment, code state, and execution time.
- `untested` and `out_of_scope` never imply safety.
- Do not use “guarantee,” “100% secure,” “unhackable,” or equivalent language.
- Do not revive rejected products without new buyer evidence and an explicit decision-log entry.

## Security and authorization boundaries

- Test only systems with written authorization from a verified owner.
- Default to staging or a dedicated test project and synthetic identities/data.
- Never turn the public website into an arbitrary target scanner.
- Never request credentials, service-role keys, private repositories, production records, customer data, or vulnerability details through a public form.
- Use least-privileged, revocable, time-bounded access through an agreed secure channel.
- Stop on scope ambiguity, unexpected real data, evidence of impact, unstable production behavior, or uncertain ownership.
- Default raw-working-evidence retention is 14 days after accepted delivery unless a signed scope requires less or applicable law requires otherwise.
- Customer names, logos, findings, screenshots, and testimonials remain private without separate written approval of exact content and audience.

## UX principles

1. Lead with the buyer’s feared failure, not the technology.
2. Show an evidence artifact before asking for trust.
3. Make uncertainty explicit and useful.
4. Keep the first conversion request low-risk: qualification, not checkout.
5. Preserve privacy: local worksheet, local report import, no trackers, no hidden transmission.
6. Every primary page gets one dominant next action.
7. Responsive, keyboard, reduced-motion, print, empty, error, and loading states are part of the feature.
8. Premium means clarity, restraint, speed, and proof—not animation volume.

## Repository architecture

- `public/` — deployable static site only.
- `public/assets/` — CSS, browser JS, report data, icons, manifest, social image.
- `schema/` — versioned report contract.
- `tools/` — deterministic build, validation, demo, release, capture, and quality tooling.
- `operations/` — customer authorization, SOW, evidence, delivery, intake, payment, launch, marketing, and repository runbooks.
- `handoff/` — complete product and continuation context, including visual assets.
- `build/` — generated local outputs; do not deploy.
- `quality/` — test-only source if introduced; never include in the public deployment artifact.
- `config/` — preview config plus ignored real release config.

The production host must publish **only** `public/`. Documentation belongs on `main` but not in the web artifact. Generated screenshots, videos, reports, logs, and QA output belong in `build/` or `handoff/assets/` as documented.

## Commands

```bash
npm run assets
npm run harden
npm run config:preview
npm run validate:report
npm run sample:pdf
npm run demo:report
npm run pilot:check
npm run pilot:strict
npm run commercial:strict
npm run release:check
npm run docs:check
npm test
npm run quality
```

`npm run pilot:strict`, `npm run release:strict`, and `npm run commercial:strict` are expected to fail until their required operator, launch, and GitHub facts exist.

## Editing rules

- Keep the site dependency-light and framework-free until measured needs justify a migration.
- No inline styles or inline scripts in public HTML.
- Maintain the restrictive Content Security Policy.
- Do not add analytics, cookies, fingerprinting, session replay, remote fonts, or third-party scripts without an explicit privacy and performance decision.
- Sanitize all report values by assigning text through `textContent`; never inject report strings as HTML.
- Keep local report imports in browser memory and enforce the 2 MB limit.
- Keep the scope form non-submitting; Enter must not leak values into the URL.
- When adding report fields, update schema, validator, sample, renderer, fixtures, docs, and QA together.
- When changing a page, update `handoff/PAGE_AND_SECTION_SPECS.md` and any affected acceptance criteria.
- When changing a decision, append to `handoff/DECISION_LOG.md`; do not silently rewrite history.
- When shipping a release, update `CHANGELOG.md`, `handoff/CURRENT_STATE.json`, screenshots, checksums, and handoff report.

## Git and release policy

The owner authorized autonomous branching, merging, and deployment after checks pass. Use this workflow:

1. Inspect current `main`; never rely on historical SHAs.
2. Search for repository instructions and pull-request templates.
3. Create a focused branch.
4. Add the smallest coherent release.
5. Run `npm run quality`; run `npm run commercial:strict` only when verified operator, pilot, public-release, and GitHub facts exist.
6. Open a pull request with risk, evidence, screenshots, and rollback notes.
7. Merge only when required checks pass and the diff matches the release manifest.
8. Inspect the deployed URL after merge; rollback on content, privacy, CSP, routing, or conversion defects.

Do not bypass a connection-level administrator block. Record it as a blocker and continue deterministic local work.

## Definition of done

A feature is done only when:

- The user problem and acceptance criteria are documented.
- Default, empty, error, loading, mobile, keyboard, reduced-motion, and print behavior are considered where relevant.
- Copy is truthful, specific, and free of unsupported claims.
- Privacy and authorization implications are reviewed.
- Automated checks pass.
- Critical interactions are manually inspected in Chromium.
- Page specs, function inventory, current state, and changelog are updated.
- Deployment and rollback paths are known.

## Commercial learning loop

The first launch targets no more than ten highly matched public buyer requests. Prefer one paid pilot over vanity traffic. Record:

- source and buyer problem
- qualification result
- objection
- package and price discussed
- serious conversation or paid outcome
- fulfillment time and margin

If ten well-matched contacts produce no serious conversation, revise positioning, channel, proof, or offer before adding product surface area. Never compensate with bulk spam, fake social proof, or blind discounting.

## Frozen concepts

Do not spend further product time on RebuttalKit, Stay5, App Store screenshot services, ClearCal proposals, or Relay migration. Their failure modes and lessons are documented in `handoff/REJECTED_IDEAS_AND_LEARNINGS.md`.

## Final operating mindset

TenantProof wins by being narrower, more honest, and more evidentiary than generic scanners or broad “security audits.” Preserve that advantage. The goal is not to claim every competitor is obsolete; it is to make the right buyer see a lower-risk, more decision-useful purchase.
