# TenantProof launch checklist

## A. Operator and legal identity

- [ ] Operator legal name or registered entity approved
- [ ] Public trading/display name approved
- [ ] Jurisdiction and business address requirements reviewed
- [x] Dedicated TenantProof business email created; agent Mail attachment remains unavailable, so no email outreach has been sent
- [ ] Privacy contact and deletion route configured
- [ ] Terms reviewed for governing law, liability, taxes, and statutory rights
- [ ] Evidence retention period approved

## B. Customer workflow

- [ ] HTTPS intake provider selected and owned by operator
- [ ] Public intake contains no file upload or credential field
- [ ] Statement of work reviewed
- [ ] Written authorization template reviewed
- [ ] Secure temporary-access exchange selected
- [ ] Invoice processor configured with multi-factor authentication
- [ ] Refund workflow reflected in customer agreement
- [ ] Capacity to deliver one pilot confirmed

## C. Product release

- [x] Responsive product site
- [x] Interactive fictional report
- [x] Product-first Focus Workbench with Scope → Matrix → Run → Repair → Report
- [x] Free fictional boundary-matrix page and CSV
- [x] Local report import
- [x] Local scope worksheet
- [x] CSP-compatible external scripts and styles
- [x] Social-preview image and app icons
- [x] Sitemap, robots, manifest, 404 page, and portable security headers
- [x] Functional and responsive QA
- [x] Demo runner locked against live targets
- [ ] Configure production site JSON
- [ ] Run strict release check
- [x] GitHub connection restored and authenticated
- [x] Inspect current `main` and pull-request template
- [x] Initial TenantProof publication: PR #23 and post-deployment reconciliation PR #24
- [x] Focus Workbench release branch created from inspected `main`
- [x] PR #25 exact 47-file diff, generated media, and exact-head CI reviewed
- [x] Automated review requested twice; no submitted review, thread, or actionable comment returned
- [x] Apply standing deployment authorization only after checks
- [x] Squash-merge PR #25 at `8ae0bea48491b1442b1181e2c1bed21b1f2479e1`
- [x] Verify successful main Pages workflow run #49 and the 26-file public-only contract
- [x] Fetch every primary live route plus fictional report JSON and boundary-matrix CSV
- [x] Reconcile publication records through PR #26 and verify successful unchanged Pages run #54
- [x] Prepare deterministic first-pilot readiness tooling with a fully blocked committed template
- [x] Publish and verify the v0.3.3 downloadable fictional report PDF through PR #28, main run #64, and the 27-file public-only contract
- [x] Prepare a private Notion request database, qualification form, and launch-control page
- [ ] Approve privacy/operator facts, then explicitly publish the Notion qualification form

## D. Marketing readiness

- [ ] Public operator identity matches profiles used for outreach
- [x] No fabricated client, case study, result, certification, or testimonial
- [x] Sample report remains labeled fictional
- [x] Ten named prospects meet the target profile
- [x] First five prepared messages reference current, explicit buyer triggers
- [ ] Outreach channel and account approved by the user
- [ ] Suppression list and response log ready
- [ ] No bulk scraping or spam automation
- [ ] Stop rule: no serious conversation after ten well-matched contacts means reassess the offer

## E. First-pilot readiness

- [x] Blocked committed readiness template and ignored private record path prepared
- [x] Non-strict readiness analysis included in `npm run quality`
- [ ] Every required private gate supported by a current evidence reference
- [ ] `npm run pilot:strict` passes before accepting a first pilot
- [ ] `npm run commercial:strict` passes before activating the ten-contact launch experiment
- [ ] Customer-specific SOW, authorization, target, window, and stop contacts verified before execution

## F. Launch decision

The closed technical preview is live and does not accept or transmit static-site requests. Commercial intake may open only after operator identity, privacy contact, intake handling, written authorization, and delivery capacity are ready.

Payment may open only after the buyer and scope are qualified. Technical publication, commercial intake, payment activation, outbound marketing, and target-specific authorization remain separate gates.
