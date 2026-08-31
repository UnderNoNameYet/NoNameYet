# Quality gates

No material release is complete because it “looks good.” It must pass deterministic checks and a manual evidence review.

## One-command target

```bash
npm run quality
```

The orchestrator should run asset generation, HTML hardening, preview config generation, report validation, demo generation, documentation checks, static/browser QA, release-readiness analysis, and credential scan. A launch build additionally runs `npm run release:strict` with real configuration and a fresh GitHub verification marker.

## Gate 1 — repository hygiene

- no `node_modules`
- no `.env` or release secrets
- no customer reports, adapters, credentials, signed documents, or raw evidence
- generated logs excluded from deploy artifact
- all handoff files present
- internal Markdown links resolve
- no unresolved merge markers
- no unexpected large binary
- `AGENTS.md` and `agent.md` exist

## Gate 2 — syntax and deterministic tooling

- Node scripts parse under Node 20+
- Python asset generator runs
- JSON files parse
- report schema validates
- demo report is deterministic in structure
- live mode exits non-zero
- hardener is idempotent
- config builder rejects invalid/unsafe ready state

## Gate 3 — public static files

Required:

- seven HTML pages
- CSS, browser JS, config JS, sample report
- favicon, 192/512 icons, 1200×630 social image
- manifest, robots, sitemap, `_headers`, `.nojekyll`, `llms.txt`

Checks:

- no inline `style=`
- no inline script
- meta CSP present
- external site config present
- one H1 and one main landmark per page
- internal links resolve
- canonical URLs match public origin
- no remote runtime assets
- no forbidden claims/placeholders

## Gate 4 — report behavior

- sample loads
- before counts: 11 pass, 4 fail, 1 unresolved
- after counts: 15 pass, 0 fail, 1 unresolved
- status filter returns expected rows
- phase change updates metrics/evidence
- row activation works with pointer/keyboard
- local sample import succeeds and says nothing uploaded
- invalid/large file path is understandable
- print action produces readable layout
- dynamic report values cannot inject markup

## Gate 5 — request privacy

- repair query parameter preselects package
- step validation works
- Enter cannot submit or alter URL
- final brief contains expected fields
- manual-quote thresholds are correct
- copy/download stay local
- no browser persistence
- no POST requests
- secure-intake link stays hidden in preview
- ready state shows only HTTPS contact URL

## Gate 6 — browser and responsive

Run Chromium at minimum:

- desktop 1440×1050
- mobile 390 px wide

Verify:

- all pages return success
- no console/page errors
- no external runtime requests
- no page horizontal overflow
- mobile menu opens/closes and ARIA state matches
- critical CTA is visible
- forms remain usable with keyboard
- reduced motion shows all content
- focus is not obscured

Manual spot-check in Safari/Firefox is required before a commercial launch when available.

## Gate 7 — visual review

Capture and inspect:

- desktop full page
- desktop first viewport
- desktop report
- mobile full page
- mobile scope worksheet
- social-preview image
- 192/512 icons
- walkthrough video

Reject release for:

- clipped copy
- invisible reveal content
- overlapping controls
- weak contrast
- broken status color/label
- unreadable table/evidence panel
- accidental placeholder/operator data
- misleading fictional proof

## Gate 8 — accessibility

Minimum manual checks:

- keyboard-only full critical flow
- visible focus
- skip link
- heading/landmark structure
- menu and phase ARIA states
- form labels/help/errors
- status not color-only
- 200% zoom
- reduced motion
- print report

Automated scans may supplement but not replace manual checks. Do not claim formal conformance without a real audit.

## Gate 9 — security/privacy

- CSP remains restrictive
- no new third-party script/font/tracker
- no public credential field/upload
- imported reports remain local
- source/evidence is escaped
- secret scan is clean
- privacy notice matches actual processors/collection
- form and evidence retention are documented
- security contact is real before `security.txt`

## Gate 10 — commercial truth

- prices and limits consistent everywhere
- no revenue/customer/testimonial claim without source
- fictional Northstar CRM label visible
- no guarantee/certification/unhackable wording
- result limitations visible
- payment mode matches actual processor state
- capacity and acceptance are not implied by checkout

## Gate 11 — release readiness

`release-check.mjs` must report no blockers for a public premium release:

- config state ready
- HTTPS origin/intake
- operator display name
- owned business contact
- retention value
- launch-state privacy/terms
- fresh GitHub verification record
- required files/CSP/sitemap

Warnings must be reviewed, not ignored.

## Gate 12 — deploy isolation

The public artifact contains `public/` contents only. Tests, docs, operations, handoff, build logs, configs, customer material, and source tooling are not web-accessible unless explicitly copied for a public reason.

“Testers not in main” is interpreted as: test tooling may live in source control for professional quality, but no test harness/log/fixture beyond the labeled public sample may enter the deployed website artifact. If the repository owner instead requires tests on a separate branch, document and enforce that in the inspected repository workflow before merge.

## Post-deploy gate

Against the real public origin:

- root and six secondary routes load
- assets have correct content type
- canonical/social image URLs resolve
- no old RebuttalKit/Stay5 content appears
- report sample and interactions work
- mobile menu works
- intake CTA reaches the owned qualification form
- no console/CSP errors
- no unexpected external requests
- 404 route recovers
- rollback commit/workflow is known

## Evidence retention for QA

Commit small deterministic source/tests. Store generated logs locally. Include selected product screenshots/video in `handoff/assets/`; do not include customer evidence.
