# TenantProof delivery runbook

This runbook covers an authorized tenant-boundary engagement. It intentionally excludes instructions for arbitrary-target scanning.

## Gate 0 — commercial and authorization checks

- [ ] Verified customer and operator identities
- [ ] Signed statement of work
- [ ] Signed authorization matrix
- [ ] Invoice milestone paid
- [ ] Technical and emergency stop contacts confirmed
- [ ] Evidence retention period confirmed
- [ ] Target, dates, exclusions, and source identities confirmed

No technical work begins until Gate 0 passes.

## Gate 1 — environment preflight

1. Confirm the hostname and Supabase project reference match the authorization.
2. Confirm the code-state or commit reference.
3. Confirm the environment is staging or the specifically approved test project.
4. Confirm current backup and recovery ownership with the customer.
5. Create or verify two synthetic tenants and the approved roles.
6. Confirm test fixtures contain no real customer records.
7. Test the emergency stop channel.
8. Record any deviation; do not silently broaden scope.

## Gate 2 — matrix approval

For each proposed check, record:

- Check ID
- Actor and role
- Source tenant
- Target tenant
- Resource and operation
- Expected allowed or blocked behavior
- Positive control
- Negative control
- Evidence to retain
- Stop condition

The customer technical contact approves the matrix before execution.

## Gate 3 — execution

1. Run positive controls to confirm the synthetic workflows are functional.
2. Run negative controls only for approved resources and operations.
3. Record status as pass, fail, untested, or out of scope.
4. Capture redacted evidence and a restricted technical trace where necessary.
5. Stop on environment mismatch, real data, instability, or scope ambiguity.
6. Never convert an execution error into a pass.

## Gate 4 — triage

For every failure:

- Reproduce once with the same synthetic fixture.
- Confirm the intended business rule with the technical contact.
- Identify whether the boundary belongs in grants, RLS policy, function logic, storage policy, or application authorization.
- Record affected operation and role without overclaiming blast radius.
- Do not access additional records merely to demonstrate impact.

## Gate 5 — repair package

- Create a dedicated branch from the agreed code state.
- Express database changes as versioned migrations.
- Add a positive and negative regression check.
- Avoid dashboard-only edits that cannot be reviewed.
- Run existing application tests.
- Submit a pull request or patch archive; do not deploy to production by default.
- Document any manual customer action separately.

## Gate 6 — retest and report

- Re-run the exact failed checks.
- Re-run relevant positive controls to detect over-restriction.
- Preserve unresolved checks as untested or out of scope.
- Validate the redacted report against report schema version 1.0.
- Run the secret scan against the report and patch material.
- Deliver the matrix, patch, regression checks, residual scope, and deployment notes.

## Gate 7 — handoff and deletion

- Customer acknowledges delivery and reviews the patch.
- Customer controls production deployment.
- Revoke temporary identities, repository access, and tokens.
- Delete raw traces according to the agreed schedule.
- Send a deletion/access-removal confirmation.
- Do not request a testimonial as a condition of delivery or refund.

## Service completion definition

Verification is complete when every in-scope check has a supported state and the customer receives the agreed report. Repair is complete when the agreed patch, regression checks, and retest are delivered. Finding no failure is a valid verification result.
