# TenantBoundary payment and refund workflow

Status: recommendation for launch approval; no payment channel is currently open.

## Recommended first-sale model

Do not use an unrestricted “buy now” checkout. Authorization work varies by role model and environment, so payment should follow qualification and written scope.

1. Buyer completes a non-secret scope brief.
2. Operator confirms fit, authority, package limits, and staging availability.
3. Parties approve the statement of work and authorization record.
4. Operator issues an invoice through the approved processor.
5. Work starts only after the relevant milestone clears.

## Milestones

### Boundary Verification — $349

- One invoice for $349 after scope acceptance.
- Full amount starts the verification milestone.

### Verification + Repair — $649

- Milestone 1: $324.50 to start modeling, verification, and draft findings.
- Milestone 2: $324.50 after draft findings are delivered and before the repair branch and retest are finalized.

A customer can choose one full invoice if the processor and agreement support it.

## Refund rules for the written agreement

- **Before work begins:** refund the paid milestone in full.
- **Operator cannot safely begin or lacks the agreed capability:** refund the unstarted milestone in full.
- **Customer cannot provide authorized access:** offer one reschedule; if no work began, refund in full.
- **After a milestone begins:** deliver completed work and refund only the unused milestone allocation described in the statement of work.
- **No vulnerability found:** not a refund event; the purchased output is verification evidence.
- **Platform approval, certification, revenue, or complete security:** never offered as a guaranteed outcome.

Processor fees, taxes, statutory cancellation rights, chargeback handling, invoice wording, and refund timing require jurisdiction-specific review.

## Processor recommendation

Use an operator-owned Stripe account or another reputable invoice processor after the operator identity and jurisdiction are confirmed. Prefer invoices over public payment links for the first pilots because an invoice can reference the accepted scope and customer entity.

Do not:

- Use the user's personal mailbox for cold outreach.
- Accept card details directly.
- Put secret access instructions in invoice notes.
- Open payment before an intake route, written authorization, privacy notice, refund terms, and delivery capacity are ready.
- Claim scarcity or a buyer that does not exist.

## Reconciliation record

For every payment, retain:

- Customer legal entity
- Statement-of-work version
- Authorization reference
- Invoice and milestone
- Payment date and amount
- Tax treatment
- Work-start timestamp
- Refund or dispute record
- Delivery acknowledgment

Keep payment records according to law and the approved accounting policy, separately from temporary technical evidence.
