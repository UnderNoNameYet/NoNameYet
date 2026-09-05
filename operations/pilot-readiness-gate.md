# TenantBoundary first-pilot readiness gate

This gate separates a technically sound preview from permission to market, accept requests, invoice, or begin customer work. It records verified operational facts without placing identities, contracts, credentials, customer data, or evidence in the public repository.

## Files and commands

- Committed blocked template: `config/pilot-readiness.example.json`
- Ignored operator record: `config/pilot-readiness.json`
- Non-strict status report: `npm run pilot:check`
- Strict first-pilot infrastructure gate: `npm run pilot:strict`
- Full launch-experiment and public-release gate: `npm run commercial:strict`
- Generated local report: `build/pilot-readiness.json`

The non-strict command is part of `npm run quality`. It must report the current blockers accurately but does not make the closed preview fail. Strict commands exit non-zero until their selected stage is ready.

## Readiness stages

| Stage | What it permits | Important limit |
|---|---|---|
| `outreach` | Individualized contact through an approved authenticated channel | Does not permit intake, payment, or testing |
| `intake` | Opening the owned non-sensitive HTTPS qualification route | Does not permit credential exchange or technical work |
| `payment` | Issuing a processor-hosted invoice after accepted scope | Does not permit work before engagement-specific authorization |
| `firstPilot` | Operating capability for one controlled pilot | Customer SOW, authorization, target, window, and stop contacts are still required |
| `launchExperiment` | Running the bounded ten-contact commercial experiment | Does not permit bulk outreach, public checkout, or unsupported claims |

## Global gates

1. Verified contracting identity
2. Jurisdiction and tax position
3. Owned business contact
4. Owned HTTPS intake and deletion route
5. Launch-state privacy and terms
6. Approved evidence-retention policy
7. Monitored security contact
8. Capacity reserved for one pilot
9. Reviewed SOW and authorization templates
10. Approved secure access exchange
11. Processor, invoicing, tax, and refund workflow
12. Authenticated approved acquisition channel

Each verified gate needs a private `evidenceReference`. The checker reports only gate state and never prints that reference.

## Operator workflow

1. Copy `config/pilot-readiness.example.json` to `config/pilot-readiness.json`.
2. Keep the private file out of Git; it is ignored by default.
3. Change a gate to `verified` only after checking the underlying account, document, route, capacity, or decision.
4. Add a private evidence reference, reviewer, current review date, and attestation.
5. Run `npm run pilot:check` and review every stage independently.
6. Run `npm run pilot:strict` before accepting a first pilot.
7. Run `npm run commercial:strict` before activating the launch experiment or changing the public site to ready.
8. Re-run after any operator, processor, contact, legal, access, or capacity change.

Do not weaken or bypass a failed gate. Keep `state: preview` and `paymentMode: closed` while required facts remain blocked.

## Engagement-specific gate

A globally ready operator still cannot test a target until the specific customer has:

- verified ownership or authority
- accepted the statement of work
- signed the authorization matrix
- named the exact environment, resources, methods, dates, and stop contacts
- approved the secure access method and retention schedule
- supplied safe synthetic fixtures or approved their creation
- paid the applicable milestone when required

Global readiness is capability evidence, not target authorization.

## Repository boundary

Never commit the private readiness file, legal identity documents, processor records, contracts, customer names, private URLs, credentials, or evidence. The public website remains unchanged by this gate.
