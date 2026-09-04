# Quality gates

A material release is not complete because it looks good. It must pass deterministic checks and a manual evidence review.

## One-command gate

```bash
npm run quality
```

The v0.3.2 orchestrator runs, in order:

1. brand asset generation
2. HTML hardening
3. preview configuration
4. report validation
5. deterministic fictional report generation
6. explicit live-mode rejection
7. JavaScript syntax checks
8. browser/static QA
9. public-only release build
10. preview capture
11. walkthrough generation
12. handoff-media synchronization
13. handoff PDF generation
14. source-manifest generation
15. documentation integrity
16. pilot-readiness analysis
17. release-readiness analysis
18. credential/private-email scan

Capture must happen before handoff synchronization. The non-strict pilot and release analyses must accurately report blockers without failing the closed preview. A first pilot requires `npm run pilot:strict`; the launch experiment additionally requires `npm run commercial:strict` with verified private readiness, real release configuration, and a fresh GitHub marker.

## Gate 1 — repository hygiene

- no `node_modules`, `.env`, secret, customer report, private adapter, signed agreement, raw evidence, or QA log
- no failed-materializer/finalizer artifact
- required handoff files and internal links resolve
- no merge marker, unexpected large binary, or session-only compressed URL
- `AGENTS.md` and `agent.md` exist

## Gate 2 — syntax and deterministic tooling

- Node scripts parse under Node 20+
- Python brand/PDF tools run with pinned Pillow and ReportLab
- Playwright Chromium and FFmpeg are available in CI
- JSON and schema files parse
- demo report structure is deterministic
- live mode exits non-zero
- hardener is idempotent
- configuration builder rejects unsafe ready state

## Gate 3 — public artifact

The v0.3.2 artifact contains exactly 26 files and eight HTML pages, including:

- shared CSS/JS/config/sample data
- `assets/workbench.css` and `assets/workbench.js`
- favicon, 192/512 icons, and 1200×630 social image
- sample matrix CSV
- manifest, robots, sitemap, `_headers`, `.nojekyll`, and `llms.txt`

Checks:

- one H1 and one main landmark per page
- no inline script or style attribute
- restrictive meta CSP and external runtime config
- same-origin runtime assets only
- internal links/canonical URLs resolve
- no forbidden product, customer, legal, or commercial claim
- GitHub Pages upload source is `dist/`, copied only from `public/`

## Gate 4 — Focus Workbench behavior

- Run is the default stage
- Scope → Matrix → Run → Repair → Report navigation activates one panel
- active stage has `aria-current="step"`
- user stage changes focus the panel H2 and close the evidence dock
- before counts: 11 pass, 4 fail, 1 unresolved
- after counts: 15 pass, 0 fail, 1 unresolved
- phase change updates metrics and evidence
- text/actor/area/operation/status filters combine correctly
- pointer, Enter, and Space select rows
- selected rows open the temporary evidence dock; Close dismisses it
- local sample import succeeds and states that nothing was uploaded
- invalid/oversized/no-match states are understandable
- both print controls invoke print
- report-derived values cannot inject markup

## Gate 5 — request privacy

- repair query parameter preselects package
- step validation and heading focus work
- Enter cannot submit or alter the URL
- final brief and manual-quote thresholds are correct
- copy/download stay local
- no browser persistence or POST request
- secure-intake link is hidden in preview and requires HTTPS in ready state
- no credential or production-data field

## Gate 6 — browser and responsive

Run Chromium at minimum at 1440×960/1050 and 390×844:

- every page returns success
- no console/page error or external runtime request
- no document-level horizontal overflow
- stage rail/table overflow stays inside announced regions
- mobile fictional-demo banner remains visible
- navigation and all critical controls are keyboard operable
- reduced motion removes non-essential transitions without hiding content
- focus is visible and unobscured
- print layout remains readable

Safari/Firefox manual spot checks are required before commercial launch when available.

## Gate 7 — visual review

Inspect regenerated:

- product-first desktop homepage
- Focus Workbench Run stage
- Focus Workbench Matrix stage
- mobile homepage
- mobile request page
- social image and 192/512 icons
- walkthrough video
- styled handoff PDF

Reject for cramped simultaneous panes, a generic permanent sidebar, a permanent inspector, clipped text, weak contrast, misleading status, stale fictional labeling, abstract boundary decoration, placeholder/operator data, or any customer evidence.

## Gate 8 — accessibility

- skip link, landmarks, valid heading order, and one H1
- visible focus and keyboard-only critical flow
- `aria-expanded`, `aria-current`, `aria-pressed`, status/live regions
- stage headings focusable with `tabindex="-1"`
- status independent of color
- labeled focusable table scroll region
- import/button labels and errors
- 200% zoom, reduced motion, mobile, and print review

Automated checks supplement but do not replace manual review. Do not claim formal WCAG conformance without an audit.

## Gate 9 — security, privacy, and truth

- CSP remains restrictive; no third-party script/font/tracker
- no public credential upload or arbitrary scanner
- imports stay local and untrusted values render as text
- repository scan is clean of credentials and private emails
- Northstar CRM and every result remain explicitly fictional
- no customer/revenue/testimonial/certification/guarantee claim
- prices and limits agree everywhere
- retention remains 14 days after accepted delivery unless scope/law requires less
- `state: preview` and `paymentMode: closed` remain true for this release
- Connections, Team, Activity, Plan, hosted accounts, and Continuous Verification are not represented as live

## Gate 10 — pilot readiness, release readiness, and deploy isolation

`check-pilot-readiness.mjs` separates outreach, intake, payment, first-pilot, and launch-experiment capability. The committed template must remain fully blocked; verified evidence references belong only in the ignored private record. A green non-strict quality run is not commercial authorization.

`release-check.mjs` may report known blockers for a closed technical preview, but the blockers must be accurate. When present, it prefers the ignored real release configuration instead of requiring edits to the committed preview configuration. A ready release requires verified HTTPS intake/deletion, operator identity/contact, legal copy, retention, processor state, delivery capacity, and GitHub verification.

`commercial:strict` combines the launch-experiment gate and public-release gate. It still does not replace customer-specific SOW, written authorization, target verification, or stop conditions.

Only `public/` enters `dist/`. Tests, docs, operations, handoff, private configs, customer material, and build logs remain non-public source.

## Pull request and post-deploy gates

Before merge:

- inspect changed-file list and focused diff
- complete workflow is green
- generated screenshots/video/PDF/source manifest correspond to current source
- target artifact contains exactly 26 files
- no unresolved review thread or blocker
- rollback remains known

After merge:

- root and seven secondary routes load
- `workbench.css`, `workbench.js`, sample JSON, CSV, icons, and social image resolve
- Focus Workbench stage/phase/filter/dock/local-import behavior works
- canonical URLs/CSP are correct
- no old product content or unexpected request appears
- v0.3.2 state is recorded only after successful deployment verification

## QA evidence retention

Commit small deterministic source/tests and selected fictional screenshots/video. Keep generated logs local/ephemeral. Never include customer evidence.
