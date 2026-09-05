# TenantBoundary operator decisions required before commercial intake

Everything below is a factual account, legal, or identity decision that cannot be invented by product design.

## Required before customer intake opens

1. **Public operator display name**  
   Recommended product display: `TenantBoundary`. Confirm whether a legal personal or company name must also appear.

2. **Operator legal name and jurisdiction**  
   Needed for enforceable terms, invoices, tax treatment, governing law, and required business disclosures.

3. **Owned business contact email**  
   A dedicated temporary mailbox exists but is not committed to this public repository. Confirm whether it may be used for public inquiries, privacy/deletion requests, and security contact; an owned-domain mailbox remains preferred.

4. **Owned HTTPS intake URL**  
   Must collect only the approved non-secret fields and provide a privacy/deletion route. File upload should remain disabled for the first pilots.

5. **Evidence retention period**  
   Product recommendation: 14 days after accepted delivery for raw technical evidence, unless customer agreement or law requires otherwise.

6. **Secure access exchange**  
   Choose an operator-owned password manager or temporary platform invitation workflow. Never use the public intake form.

7. **Delivery availability**  
   Confirm capacity to respond to a qualified inquiry and execute one pilot.

## Required before payment opens

8. **Invoice processor**  
   Product recommendation: an operator-owned Stripe account using invoices, not an unrestricted public checkout, for initial customers.

9. **Bank, tax, and refund configuration**  
   Must match the operator's jurisdiction and customer agreement.

10. **Final legal review**  
    Review operator identity, privacy, retention, liability, tax, cancellation, refund, and statutory-right language.

## Repository status

The v0.3.3 request-only GitHub Pages preview remains live under the former TenantProof name. Branch `product/tenantboundary-rebrand-v040` is the v0.4.0 TenantBoundary candidate with canonical PDF/social assets, byte-identical former-path aliases, and an exact 29-file public-only contract. Repository access and portable buyer proof are no longer blockers; candidate CI, deployment, and live verification remain open.

A private Notion request database, qualification form, and launch-control page are prepared. The form remains intentionally unpublished. Commercial intake, payment, outreach, and real testing remain blocked by the factual decisions above.

## Readiness record

Use `operations/pilot-readiness-gate.md` as the controlling workflow. Copy the blocked example to the ignored `config/pilot-readiness.json`, verify each underlying fact privately, and run `npm run pilot:check`. The committed example must remain blocked.

`npm run pilot:strict` covers first-pilot operating capability. `npm run commercial:strict` additionally requires the approved acquisition channel and public release facts. Neither command replaces customer-specific written authorization.

## Recommended launch mode

Start in **request-only mode**:

- Publish the product and fictional report.
- Route qualified prospects to the owned intake or an approved marketplace conversation.
- Confirm scope and authorization manually.
- Issue an invoice only after fit and written scope.
- Do not expose a buy-now payment link.

This minimizes access mistakes and supports a credible first pilot without pretending the service is an automated scanner.
