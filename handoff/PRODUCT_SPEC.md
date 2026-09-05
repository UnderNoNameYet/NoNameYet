# TenantProof product specification

## 1. Product definition

TenantProof is a productized professional service with supporting software. It verifies selected tenant and role authorization boundaries in Supabase/PostgreSQL applications and can repair agreed failures.

### Core promise

> Prove that Customer A cannot read or modify Customer B’s data.

### Job to be done

When a founder is preparing to launch or has discovered suspicious access behavior, help them replace “RLS looks enabled” with an executed, reviewable record of which cross-tenant and role-boundary actions were allowed or blocked.

### Product category

Executed authorization verification and remediation—not automated certification, generic security scanning, broad penetration testing, or compliance consulting.

## 2. Target customer

### Primary buyer

Founder or technical owner of a multi-tenant SaaS application using Supabase/PostgreSQL, often built with Lovable, Bolt, Replit, Cursor, or Next.js.

### Typical context

- application is near launch or already live
- role semantics are richer than `auth.uid() = user_id`
- RLS exists but confidence is low
- code was assembled quickly or by multiple contributors/agents
- buyer needs evidence for a launch decision
- staging or a dedicated test project can be provided

### Common roles

Organization owner, administrator, employee, manager, coach, client, student, member, teacher, supervisor.

### Disqualifiers

- no evidence of ownership or authority
- arbitrary target scan request
- production-only destructive testing without controls
- request to hide findings from an affected owner
- credential submission through public channels
- expectation of guaranteed security or legal certification
- scope too broad for available capacity

## 3. Buyer problem

RLS being enabled does not prove that policies implement the application’s intended tenant and role semantics. Common failure modes include:

- missing tenant predicates
- predicates based on user ownership when organization membership is required
- absent `WITH CHECK` rules on insert/update
- role rules that stop at tenant membership and ignore assignment
- `SECURITY DEFINER` or RPC logic that bypasses caller semantics
- storage policies inconsistent with table policies
- service-role usage in a user-facing path
- positive paths that work while negative cross-tenant controls were never executed

## 4. Value proposition

TenantProof provides:

- an agreed expectation matrix
- executed positive and negative controls
- redacted before/after evidence
- explicit pass/fail/untested/out-of-scope semantics
- actionable root-cause remediation
- reviewable SQL/RLS changes in the repair package
- regression checks and one retest

The value is reduced uncertainty at a launch-critical boundary—not saved design time or a score.

## 5. Packages

### Boundary Verification — $349

Scope ceiling:

- 12 named tables
- 3 application roles
- agreed read/write matrix
- redacted report
- remediation guidance
- one retest

Not included by default: broad application pentest, source-code rewrite, multiple storage buckets, large function estate, production-only work, compliance mapping.

### Verification + Repair — $649

Scope ceiling:

- 25 named tables
- 3 application roles
- selected functions
- 1 storage bucket
- verification matrix
- SQL/RLS migrations
- reviewable pull request
- regression checks
- redacted before/after report
- one retest

### Manual quote

Required for regulated data, production-only scope, more than three roles, unusually connected schemas, broad function estates, more storage buckets, urgent incident response, or general penetration testing.

## 6. Engagement lifecycle

1. **Qualification** — non-sensitive form submission.
2. **Boundary interview** — roles, tenants, resources, expected outcomes.
3. **Scope** — named assets, methods, exclusions, schedule, stop conditions.
4. **Authorization** — verified owner signs written permission.
5. **Access** — least-privileged temporary credentials through secure exchange.
6. **Fixture** — synthetic tenants, identities, rows, and controls.
7. **Before run** — execute and record observations.
8. **Triage** — classify failure, evidence, impact boundary, remediation.
9. **Repair** — guidance or migrations/PR depending on package.
10. **After run** — repeat same checks plus positive controls.
11. **Handoff** — redacted report, changes, residual scope, deletion date.
12. **Close** — revoke access, delete working evidence, retain agreed audit record.

## 7. Report model

### Check identity

Each check records:

- `id`
- actor
- area
- resource
- operation
- expectation
- before state
- after state

### State identity

Each phase records:

- status: `pass`, `fail`, `untested`, or `out_of_scope`
- observed behavior
- redacted evidence
- remediation text

### Semantics

- `pass`: behavior matched the scoped expectation in context
- `fail`: behavior contradicted expectation
- `untested`: execution did not occur
- `out_of_scope`: excluded from the engagement

## 8. Public experience

The public product must let a skeptical founder answer five questions quickly:

1. Is this specifically for my Supabase multi-tenant risk?
2. What does “proof” mean here?
3. What will I receive?
4. How much is the entry point?
5. Can I request scope without exposing credentials or committing to payment?

The sample report is the primary proof artifact. The free fictional matrix helps buyers define a testable boundary before qualification. The form is qualification only.

The same canonical fictional report is also available as a compact four-page PDF so a buyer can inspect or share the deliverable structure without operating the interactive Workbench.

## 9. Non-functional requirements

- static-first and fast
- usable at 320 px and above
- keyboard-operable interactive controls
- visible focus indicators
- reduced-motion support
- system fonts, no remote dependencies
- no analytics or tracking in V1
- no browser persistence of reports or scope fields
- no form POST from the static worksheet
- no external runtime request except same-origin assets
- restrictive CSP
- printable report
- local report import limit: 2 MB
- deterministic downloadable fictional report PDF

## 10. Acceptance criteria

### Marketing site

- one H1 per page
- clear primary CTA
- no unsupported commercial/security claims
- pricing and limits visible
- fictional artifacts labeled
- mobile navigation works
- no horizontal overflow

### Report viewer

- validates schema 1.0
- loads bundled sample
- switches before/after state
- filters by text/actor/area/operation/status
- selects rows by click, Enter, and Space
- renders evidence as text, never HTML
- imports local JSON without upload
- rejects files over 2 MB or invalid reports
- prints readable report
- downloads a prominently fictional PDF generated from the canonical sample

### Scope worksheet

- three steps
- validates current step
- package query parameter works
- calculates manual-quote threshold
- generates clear text brief
- copies/downloads locally
- Enter does not submit data
- no network transmission

### Release

- all public pages use external JS/CSS
- CSP and support files present
- no console errors, external runtime requests, or mobile overflow
- production config requires HTTPS intake, operator display name, contact email, and retention value
- deployment publishes only `public/`

## 11. Success and stop metrics

### Ten-day experiment success

Preferred: one legitimate paid pilot.  
Secondary: two serious buyer conversations with concrete scope and budget.

### Stop/revise rule

After ten well-matched, individualized contacts, revise the offer or channel if there is no serious conversation. Do not extend by sending generic volume.

### Fulfillment success

- scope signed before testing
- all report claims trace to evidence
- no unauthorized data access
- delivery within agreed schedule
- customer can act on the result
- access revoked and deletion recorded

## 12. Explicitly not V1

- automated public scanner
- hosted customer accounts
- continuous monitoring SaaS
- vulnerability certification badge
- compliance attestation
- production credential upload
- generic code scanner
- broad pentest marketplace
- subscription billing
- team dashboard
- AI-generated policy auto-deployment

These may be reconsidered only after real paid usage identifies a repeated need.
