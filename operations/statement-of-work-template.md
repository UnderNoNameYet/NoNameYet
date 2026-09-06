# TenantBoundary statement of work template

> Draft operational template. Obtain jurisdiction-specific legal review before using it with a paying customer.

## Parties and references

- Customer: `{{CUSTOMER_LEGAL_NAME}}`
- Operator: `{{OPERATOR_LEGAL_NAME}}`
- Application: `{{APPLICATION_NAME}}`
- Authorization record: `{{AUTHORIZATION_REFERENCE}}`
- Code-state reference / commit: `{{COMMIT_SHA}}`
- Start window: `{{START_WINDOW}}`

## Selected package

Choose one and delete the other.

### Boundary Verification — USD 349

- Up to 12 named tables
- Up to three application roles
- Agreed read and write isolation matrix
- Redacted evidence report
- Remediation guidance
- One retest of failed checks after customer remediation

### Verification + Repair — USD 649

- Up to 25 named tables
- Up to three application roles
- Agreed table checks, named functions, and one storage bucket
- Redacted evidence report
- Versioned SQL/RLS and relevant application patches
- Reviewable pull request or patch archive
- Regression checks for the approved matrix
- One retest

## Customer-specific access model

`{{SHORT_DESCRIPTION_OF_TENANTS_ROLES_ASSIGNMENTS_AND_ADMIN_PATHS}}`

The signed authorization matrix is the controlling scope. A listed package limit does not add unlisted targets.

## Deliverables

1. Approved test matrix with expectations.
2. Before-state result for every completed check.
3. Severity and remediation notes for failures.
4. Repair patch when included.
5. After-state retest for remediated checks.
6. Residual-scope list for untested or excluded paths.
7. Access-removal and evidence-deletion confirmation.

## Customer responsibilities

- Supply accurate architecture and role information.
- Provide staging or a dedicated test project and synthetic records.
- Maintain current backups and recovery capability.
- Provide repository access appropriate to the repair package.
- Designate a technical contact and stop contact.
- Review and deploy changes; TenantBoundary does not deploy to production by default.
- Avoid sending credentials through the public website or ordinary email.

## Schedule

- Scope confirmation: `{{DATE}}`
- Authorized execution window: `{{DATE_RANGE}}`
- Draft report target: `{{DATE}}`
- Customer review window: `{{DAYS}}` business days
- Retest target: `{{DATE_OR_TRIGGER}}`

Dates depend on timely access and responses. No platform approval, security outcome, or absence of defects is guaranteed.

## Fees and payment

- Fee: `{{FEE_USD}}`
- Milestones: `{{MILESTONES}}`
- Payment method: operator-issued invoice through `{{PROCESSOR}}`
- Taxes: `{{TAX_HANDLING}}`

The public website does not collect payment. An invoice is issued only after this scope and the authorization record are accepted.

## Cancellation and refund

- Before work begins: full refund of amounts paid.
- If TenantBoundary cannot safely begin or cannot work within the agreed authorization: full refund of the unstarted milestone.
- After a milestone begins: completed work and evidence are delivered; any unused milestone amount is refunded according to the written milestone allocation.
- Finding no boundary failure is still completion of a verification milestone.
- Refunds are not conditioned on finding a vulnerability, obtaining certification, or achieving a business outcome.

## Confidentiality and evidence

Use the separate evidence-handling policy and any signed confidentiality agreement. Customer-facing reports are redacted. Raw traces, temporary accounts, and access are handled according to the agreed retention period.

## Intellectual property

- Customer retains ownership of customer code and data.
- Customer receives the engagement-specific patch and regression checks upon payment.
- TenantBoundary retains pre-existing methodology, generic templates, and non-customer-specific tooling.
- No customer finding, name, logo, or testimonial may be published without separate written permission.

## Limitations

The service is a bounded authorization verification, not a comprehensive penetration test, legal opinion, compliance certification, or warranty that no vulnerability exists. Results apply to the agreed scope, environment, identities, code state, and execution time.

Liability cap, indemnity, governing law, dispute process, and required notices: `{{JURISDICTION_SPECIFIC_TERMS}}`

## Acceptance

**Customer**  
Name / title: `{{NAME_AND_TITLE}}`  
Signature / date: `{{SIGNATURE_AND_DATE}}`

**TenantBoundary operator**  
Name / title: `{{NAME_AND_TITLE}}`  
Signature / date: `{{SIGNATURE_AND_DATE}}`
