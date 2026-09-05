# TenantBoundary handoff index

This folder is the durable context package for a new AI or human operator. It is intentionally more explicit than a normal README so continuation does not depend on chat history.

## Start here

1. [`../AGENTS.md`](../AGENTS.md) — binding product and engineering instructions
2. [`HANDOFF_REPORT.md`](HANDOFF_REPORT.md) — executive continuation report
3. [`CURRENT_STATE.json`](CURRENT_STATE.json) — machine-readable state and blockers
4. [`PRODUCT_SPEC.md`](PRODUCT_SPEC.md) — buyer, problem, offer, scope, acceptance criteria
5. [`PAGE_AND_SECTION_SPECS.md`](PAGE_AND_SECTION_SPECS.md) — every current and planned page
6. [`UX_DESIGN_SYSTEM.md`](UX_DESIGN_SYSTEM.md) — visual system and interaction standards
7. [`TECHNICAL_ARCHITECTURE.md`](TECHNICAL_ARCHITECTURE.md) — runtime, data flow, configuration, build
8. [`FEATURE_AND_FUNCTION_INVENTORY.md`](FEATURE_AND_FUNCTION_INVENTORY.md) — implemented behaviors and code ownership
9. [`REPORT_ENGINE_SPEC.md`](REPORT_ENGINE_SPEC.md) — report schema and evidence semantics
10. [`SECURITY_PRIVACY_AND_SAFETY.md`](SECURITY_PRIVACY_AND_SAFETY.md) — authorization and handling boundaries
11. [`OPERATIONS_AND_INTAKE.md`](OPERATIONS_AND_INTAKE.md) — qualification through deletion
12. [`COMMERCIAL_AND_PAYMENTS.md`](COMMERCIAL_AND_PAYMENTS.md) — prices, invoicing, refunds, unit economics
13. [`GTM_AND_VALIDATION.md`](GTM_AND_VALIDATION.md) — ten-day acquisition experiment
14. [`ROADMAP_V1_V2_V3.md`](ROADMAP_V1_V2_V3.md) — sequenced future work
15. [`DECISION_LOG.md`](DECISION_LOG.md) — why major choices were made
16. [`REJECTED_IDEAS_AND_LEARNINGS.md`](REJECTED_IDEAS_AND_LEARNINGS.md) — frozen concepts
17. [`QUALITY_GATES.md`](QUALITY_GATES.md) — automated and manual release criteria
18. [`RELEASE_AND_REPOSITORY.md`](RELEASE_AND_REPOSITORY.md) — branch, deploy, rollback, artifact policy
19. [`ASSET_MANIFEST.md`](ASSET_MANIFEST.md) — screenshots, video, dimensions, regeneration
20. [`AI_CONTINUATION.md`](AI_CONTINUATION.md) — exact restart protocol for another model
21. [`SOURCE_MANIFEST.json`](SOURCE_MANIFEST.json) — machine-readable file roles, sizes, and SHA-256 hashes
22. [`GITHUB_PUBLICATION.md`](GITHUB_PUBLICATION.md) — observed repository state, media transport, CI, and rollback

## Supporting operational documents

The canonical executable templates are in [`../operations/`](../operations/):

- written authorization
- statement of work
- evidence handling
- delivery and stop conditions
- intake architecture
- payment/refund workflow
- launch checklist
- marketing experiment
- operator decisions
- first-pilot readiness gate
- GitHub release runbook

Handoff documents explain intent. Operational documents are the templates used during real work. If they conflict, stop and reconcile the inconsistency rather than choosing silently.

## Visual evidence

See [`assets/`](assets/) for desktop, mobile, report, social-preview, icon, and walkthrough media. The styled PDF is [`HANDOFF_REPORT.pdf`](HANDOFF_REPORT.pdf). These are product artifacts, not customer evidence.

## Update discipline

Update this index whenever a handoff file is added, renamed, or retired. `npm run docs:check` verifies the required set and internal links.
