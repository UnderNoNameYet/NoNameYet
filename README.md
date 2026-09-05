# TenantProof

TenantProof is a productized Supabase/PostgreSQL tenant-isolation verification and repair service.

> Prove that Customer A cannot read or modify Customer B’s data.

It sells an agreed authorization matrix, executed before/after evidence, remediation, and regression protection—not a generic scanner badge or a guarantee that an application has no vulnerabilities.

## Current status

| Area | State |
|---|---|
| Product specification | complete |
| Local static MVP | complete |
| Production preparation | complete for the closed technical preview |
| Browser/responsive/privacy QA | passing; rerun after every change |
| Qualification workflow | private Notion database/form prepared; form intentionally unpublished |
| GitHub Pages request-only preview | v0.3.3 live from `0be0d8d10096` after PR [#28](https://github.com/UnderNoNameYet/NoNameYet/pull/28) and successful main [run #64](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33949379579) |
| Buyer proof pack | live deterministic four-page fictional PDF; generated from the canonical sample |
| Payments | closed |
| Customers/revenue/testimonials | none |

## Start here

Any AI agent or developer must read:

1. [`AGENTS.md`](AGENTS.md)
2. [`handoff/README.md`](handoff/README.md)
3. [`handoff/HANDOFF_REPORT.md`](handoff/HANDOFF_REPORT.md)
4. [`handoff/CURRENT_STATE.json`](handoff/CURRENT_STATE.json)

The handoff package documents every page, section, function, UX rule, safety boundary, commercial decision, rejected idea, roadmap, release procedure, and continuation protocol. Self-contained product previews are in `handoff/assets/`; the downloadable handoff archive also includes full-resolution screenshots, a 20-second walkthrough, and a styled PDF.

## Offer

### Boundary Verification — $349

Up to 12 named tables, three roles, agreed read/write matrix, redacted report, remediation guidance, and one retest.

### Verification + Repair — $649

Up to 25 named tables, three roles, selected functions, one storage bucket, SQL/RLS migrations, reviewable pull request, regression checks, and one retest.

Larger, production-only, regulated, or more sensitive work receives a manual quote.

## Included product surface

- premium responsive marketing site
- interactive fictional before/after report
- deterministic four-page fictional report PDF for buyer review and proposals
- local-only JSON report import and print view
- three-step local scope worksheet
- methodology and authorization page
- free fictional tenant-boundary matrix and downloadable CSV
- privacy, terms, and branded 404
- report schema 1.0 and validator
- demo-only matrix runner locked against real targets
- external preview/ready configuration
- CSP-compatible HTML and portable security headers
- sitemap, manifest, social image, and application icons
- authorization, SOW, evidence, delivery, payment, intake, launch, and marketing runbooks
- deterministic first-pilot readiness gate with a blocked committed template and ignored operator record
- deterministic browser/static/documentation/release quality gates
- public-only deployment artifact builder
- complete handoff package with screenshots/video

## Repository map

```text
.
├── AGENTS.md                  canonical continuation instructions
├── agent.md                   lowercase compatibility entry point
├── public/                    only deployable web artifact
├── schema/                    report contract
├── tools/                     build, validation, capture, and release tooling
├── operations/                real engagement templates and runbooks
├── handoff/                   full product/UX/technical/commercial context
├── config/                    preview and ignored release configuration
├── build/                     generated local outputs; not tracked/deployed
├── dist/                      generated public-only artifact; not tracked
└── qa.mjs                     finite Chromium/static QA source
```

Source tests and quality tooling belong in version control for professional delivery, but the deployed artifact contains only `public/`. Test logs, screenshots outside selected handoff media, and generated reports stay out of deployment.

## Run locally

```bash
cd /path/to/NoNameYet
npm run serve
```

Open `http://127.0.0.1:4173/`.

## Commands

```bash
npm run assets              # generate icons/social image
npm run harden              # normalize CSP/canonical/social metadata
npm run config:preview      # generate preview browser config
npm run validate:report     # validate fictional public report
npm run sample:pdf          # generate the fictional downloadable PDF
npm run demo:report         # generate fictional demo report
npm run pilot:check        # report current commercial blockers without opening the preview
npm run pilot:strict       # require first-pilot operating capability
npm run commercial:strict  # require launch-experiment and public-release readiness
npm run walkthrough         # create 20-second handoff video
npm run handoff:assets      # copy/hash selected media
npm run handoff:report      # build styled PDF handoff report
npm run handoff:manifest    # hash and classify repository source
npm run docs:check          # validate handoff files and links
npm test                    # finite browser/static QA
npm run release:check       # report launch blockers
npm run release:strict      # fail while any launch blocker remains
npm run release:bundle      # create dist/ from public/ only
npm run quality             # full non-strict quality gate
```

## Deliberate restrictions

- no arbitrary public target scanner
- no real-environment adapter in the public repository
- no credential, database dump, customer record, or private repository upload
- no imported-report storage or upload
- no browser persistence
- no analytics, trackers, remote fonts, or third-party runtime scripts
- no unrestricted checkout
- no real testing without verified written authorization
- no fabricated customer, revenue, testimonial, finding, approval, or scarcity
- all Northstar CRM evidence is explicitly fictional

## Quality and release

`npm run quality` validates source syntax, brand assets, HTML hardening, preview configuration, report schema, fictional PDF generation, demo generation, live-mode rejection, browser behavior, public-only artifact isolation, handoff media, documentation integrity, pilot-readiness reporting, release readiness, and credential/private-email scanning. Its non-strict readiness reports preserve honest blockers without treating the closed preview as a failure.

A public premium release additionally requires `npm run release:strict` with:

- ready HTTPS configuration and intake URL
- verified public operator/contact facts
- launch-state privacy/terms
- evidence-retention value
- fresh GitHub repository verification

Commercial activation also requires the ignored private pilot-readiness record and `npm run commercial:strict`; neither a green technical quality run nor the committed blocked template grants permission to accept work.

## Current blockers

- usable public form URL must be inserted into static release config
- legal contracting identity, jurisdiction, and owned business contact are required before taking payment
- static privacy/terms remain pre-launch
- security contact is required before publishing `security.txt`
- payment processor is not activated

The user authorized autonomous product decisions, branches, merging, and deployment after checks. That authority does not allow bypassing platform permissions, inventing legal/account facts, or weakening authorization and privacy controls.

## Commercial validation rule

After premium deployment, contact no more than ten highly matched current buyers through authenticated approved channels. Prefer one paid pilot to vanity traffic. If ten contacts produce no serious conversation, revise the offer/channel/proof before adding product surface area.

