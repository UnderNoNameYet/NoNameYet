# TenantProof evidence-handling policy

Status: pre-launch operational draft  
Owner: `{{OPERATOR}}`  
Approved retention period: `{{RETENTION_DAYS}}` days

## Principles

1. Collect the minimum evidence needed to support an in-scope conclusion.
2. Prefer staging, synthetic identities, and synthetic records.
3. Never request credentials through the public website.
4. Separate customer-facing redacted evidence from restricted technical traces.
5. Treat untested paths as unknown, not passed.
6. Remove access and delete temporary evidence after the agreed handoff period.

## Evidence classes

### Class A — public demonstration

Fictional fixtures, fictional findings, product screenshots, and sample reports. No customer content.

### Class B — customer handoff

Redacted check results, expectations, code-state reference, remediation status, and residual scope. Suitable only for the customer's approved recipients.

### Class C — restricted working evidence

Raw response traces, temporary identifiers, repository excerpts, policy definitions, and debugging output. Limited to the operator and named technical contacts. Do not place these in public issue trackers, analytics, chat transcripts, or the marketing site.

### Prohibited collection

- Production database dumps unless separately necessary and approved
- Passwords in documents or ordinary messages
- Long-lived service-role keys
- Unrelated personal or customer records
- Secrets embedded in screenshots or report JSON
- Third-party data outside the authorization

## Storage and transfer

- Use the approved encrypted transfer channel for temporary credentials.
- Use least-privileged, revocable accounts.
- Store working evidence in the customer-specific encrypted workspace.
- Do not place secrets in source control, browser storage, URL parameters, support tickets, or public forms.
- Redact identifiers and data values before generating the customer-facing report.

## Retention

| Item | Default action |
|---|---|
| Public fictional demonstration | Retain with the product |
| Redacted final report | Deliver to customer; operator copy deleted after `{{RETENTION_DAYS}}` days unless agreed otherwise |
| Raw traces | Delete at accepted delivery or no later than `{{RETENTION_DAYS}}` days |
| Temporary accounts / tokens | Revoke at handoff |
| Access logs and deletion record | Retain according to the service agreement |

The public site cannot state a final number until the operator approves a retention period.

## Redaction review

Before delivery, verify that the report contains no:

- API keys, access tokens, cookies, authorization headers, or passwords
- Real customer names, emails, file names, record IDs, or message content
- Private repository URLs or branch names unless required by the recipient
- Internal hostnames or unrestricted technical traces
- Unsupported claims about certification or complete security

## Incident handling

If unexpected real data or a secret appears:

1. Stop the check.
2. Preserve only the minimum event metadata needed for notification.
3. Notify the approved technical and stop contacts.
4. Revoke or rotate affected access.
5. Record where the material was stored or transmitted.
6. Delete unauthorized copies after the customer confirms the required response.
7. Resume only under an amended written scope.

## Marketing restriction

Customer names, logos, findings, screenshots, metrics, testimonials, and case studies remain private unless the customer separately approves the exact material and audience in writing.
