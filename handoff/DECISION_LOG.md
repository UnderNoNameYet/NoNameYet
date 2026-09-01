# Decision log

Append new decisions; do not silently rewrite prior rationale. Dates use Asia/Calcutta context unless otherwise noted.

## 2026-08-30 — Optimize for one high-value pilot

**Decision:** prefer a service with a single-sale path above $100 over a low-priced consumer app.

**Why:** ten-day target, no existing audience, and need for fast buyer feedback make current paid demand more reliable than speculative virality.

## 2026-08-30 — Reject App Store screenshot service

**Decision:** freeze the screenshot conversion sprint and ClearCal proposal.

**Why:** easy DIY/AI/template substitution, inexpensive design alternatives, weak urgency, and no credible reason to pay the proposed $149.

## 2026-08-30 — Reject RebuttalKit as active product

**Decision:** keep checkout closed and stop polishing.

**Why:** technically built did not equal commercially compelling; the user found the product and presentation unattractive and low-value.

## 2026-08-30 — Reject Stay5 as active product

**Decision:** freeze locally and do not deploy.

**Why:** another speculative product without sufficient buyer evidence; continuing would repeat build-first behavior.

## 2026-08-30 — Select TenantProof

**Decision:** build a productized Supabase tenant-isolation verification and repair service.

**Why:** recent paid requests at $300–$700, launch-critical risk, concrete evidence artifact, technically differentiated fulfillment, and one-sale path above target.

## 2026-08-30 — Narrow the promise

**Decision:** use “Prove that Customer A cannot read or modify Customer B’s data.”

**Why:** specific buyer outcome, easy to understand, and testable. Avoid broad “secure your app” positioning.

## 2026-08-30 — Sell evidence, not a badge

**Decision:** center the expectation matrix and before/after report.

**Why:** RLS presence does not encode application-specific roles; executed controls and residual scope are more decision-useful than a score.

## 2026-08-30 — Fixed starting packages

**Decision:** $349 verification and $649 verification + repair.

**Why:** match observed budget neighborhood, make purchase legible, enforce scope, and allow one pilot to exceed experiment target.

## 2026-08-30 — Static-first architecture

**Decision:** semantic HTML, CSS, vanilla JS, local JSON; no hosted backend/account system in V1.

**Why:** speed, privacy, reliability, CSP simplicity, zero credential custody, and no evidence yet for SaaS complexity.

## 2026-08-30 — Local-only report import

**Decision:** parse reports in memory with a 2 MB limit and no upload/storage.

**Why:** lets buyers inspect the artifact without creating a sensitive-data service.

## 2026-08-30 — Local-only scope worksheet

**Decision:** generate/copy/download a brief without form submission.

**Why:** protect early privacy and demonstrate scope before an owned intake route exists. Enter submission is explicitly prevented.

## 2026-08-30 — Staging and synthetic defaults

**Decision:** staging/dedicated test environment and synthetic identities/records by default.

**Why:** reduce impact and unrelated-data exposure while preserving meaningful authorization behavior.

## 2026-08-30 — Demo runner locked to demo mode

**Decision:** public runner rejects any non-demo mode.

**Why:** prevent the product from becoming an arbitrary scanner or credential entry point.

## 2026-08-30 — Request-only commercial launch

**Decision:** no unrestricted buy-now; qualify, scope, authorize, then invoice.

**Why:** authorization, capacity, sensitive/production scope, and fixed-package limits require review.

## 2026-08-30 — Raw evidence retention default

**Decision:** recommend 14 days after accepted delivery.

**Why:** enough for handoff/retest questions while minimizing restricted trace retention. Final customer/legal requirements can shorten/change it.

## 2026-08-30 — Public Notion soft launch

**Decision:** create a public non-sensitive qualification form, private pipeline, public launch page, and fictional sample report while GitHub access is blocked.

**Why:** preserve momentum and create an honest request path without exposing a personal email or waiting for static deployment.

## 2026-08-30 — No invented legal owner

**Decision:** agent owns product decisions but does not claim to be the legal contracting party.

**Why:** legal identity, jurisdiction, processor accounts, and signatures are factual capabilities that cannot be fabricated. Payment remains closed.

## 2026-08-30 — Premium visual direction

**Decision:** dark forest/ink plus warm paper, editorial typography, compact evidence UI, minimal motion, system fonts.

**Why:** communicate serious engineering evidence without hacker clichés or generic SaaS aesthetics.

## 2026-08-30 — Truthful status vocabulary

**Decision:** pass, fail, untested, out of scope.

**Why:** preserve uncertainty and prevent absence of evidence from becoming a green claim.

## 2026-08-30 — Autonomous quality-controlled merging

**Decision:** user authorized the agent to branch, merge, and publish without repeated routine permission requests.

**Constraint:** connection-level admin approval, real legal/account facts, platform confirmations, and safety boundaries still cannot be bypassed. Inspect `main`, run checks, and preserve rollback.

## 2026-08-30 — Canonical handoff package

**Decision:** root `AGENTS.md` plus `handoff/` becomes the durable source for any future AI or developer.

**Why:** avoid quality loss from chat truncation, undocumented intent, or implementation-only handoff.

## 2026-08-31 — Publish the closed GitHub Pages preview

**Decision:** squash-merge PR [#23](https://github.com/UnderNoNameYet/NoNameYet/pull/23) and publish TenantProof from direct source while preserving `state: preview`, local-only static intake, and `paymentMode: closed`.

**Why:** the exact 198-file delta was inspected, the PR build passed, the public-only artifact boundary was enforced, the source-transfer workflow was removed, and live public routes showed the intended TenantProof and fictional Northstar CRM content.

**Evidence:** merge `6bc99104bb91b32afb50c8c7d9b416d74566f8ed`; deployment [run #40](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33372340582) succeeded; pre-release rollback `047691e35c6b8d38ba5540d1fe4de345ed752a6c` remains documented.

**Constraint:** technical publication is not commercial readiness. Operator identity, jurisdiction, owned contact/intake, legal copy, retention, delivery capacity, processor, and written customer authorization remain mandatory.

## 2026-09-01 — Publish a free boundary-matrix acquisition asset

**Decision:** add a static fictional matrix page and downloadable CSV before expanding the product or adding a scanner.

**Why:** current paid requests repeatedly ask for explicit tenant/role authorization validation. A matrix lets buyers experience the core method, improves scope quality, and creates an educational inbound artifact without credentials, tracking, uploads, or unsupported security claims.

**Constraint:** the template is unexecuted planning material, not evidence, certification, or a public testing tool.
