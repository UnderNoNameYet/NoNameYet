# TenantProof written authorization template

> Operational template for review before use. It is not legal advice and must be adapted to the operator's jurisdiction and customer agreement.

## 1. Parties

- **System owner / customer legal name:** `{{CUSTOMER_LEGAL_NAME}}`
- **Authorized representative:** `{{NAME_AND_TITLE}}`
- **TenantProof operator legal name:** `{{OPERATOR_LEGAL_NAME}}`
- **Technical contact:** `{{TECHNICAL_CONTACT}}`
- **Emergency stop contact:** `{{STOP_CONTACT}}`

The customer representative states that the customer owns the target or has authority to authorize this work.

## 2. Authorized target

- **Application:** `{{APPLICATION_NAME}}`
- **Environment:** `{{STAGING_OR_TEST_ENVIRONMENT}}`
- **Supabase project reference:** `{{REFERENCE_ONLY_NO_SECRET}}`
- **Repository and branch:** `{{REPOSITORY_AND_BRANCH}}`
- **Approved dates and time zone:** `{{WINDOW}}`
- **Approved source identities / IPs if applicable:** `{{SOURCES}}`

Production is excluded unless it is named explicitly above.

## 3. Approved identities and synthetic data

List every synthetic tenant, test user, and role approved for the engagement. Do not include passwords in this document.

| Synthetic identity | Tenant | Role | Owner-created? | Permitted use |
|---|---|---|---|---|
| `{{IDENTITY}}` | `{{TENANT}}` | `{{ROLE}}` | Yes/No | `{{USE}}` |

## 4. In-scope resources and operations

| Area | Resource | Operations | Expected boundary |
|---|---|---|---|
| Table / function / storage / auth flow | `{{RESOURCE}}` | Read / insert / update / delete / invoke | `{{EXPECTATION}}` |

Only listed resources and directly necessary positive controls are authorized.

## 5. Explicit exclusions

Unless added in writing, the following are excluded:

- Denial-of-service, load, stress, or availability testing
- Social engineering, phishing, credential guessing, or password attacks
- Third-party vendors and unrelated domains
- Production customer records
- Infrastructure, network, host, employee-device, or physical testing
- Persistence, destructive modification, or deletion outside synthetic fixtures
- Any action that bypasses the agreed application identities or stop conditions

Additional exclusions: `{{ADDITIONAL_EXCLUSIONS}}`

## 6. Allowed methods

- Positive and negative authorization controls using approved synthetic identities
- Read, insert, update, delete, function, and storage checks listed in the matrix
- Static review of relevant repository code and versioned migrations
- Redacted evidence capture
- Remediation in a reviewable branch when included in the statement of work

## 7. Stop conditions

Work stops immediately if:

1. The observed target differs from the authorized environment.
2. Real personal or customer data appears unexpectedly.
3. Service availability or unrelated user activity is affected.
4. A check would exceed the approved matrix.
5. The customer or stop contact requests suspension.

## 8. Evidence and access handling

- Secrets are exchanged only through the separately approved secure method.
- Access must be least-privileged and time-bounded.
- Customer-facing evidence is redacted.
- Raw evidence retention: `{{RETENTION_DAYS}}` days after accepted delivery unless law or agreement requires otherwise.
- Temporary accounts and access are removed or disabled at handoff.

## 9. Acknowledgment

Authorization applies only to the target, dates, identities, methods, and scope above. It does not authorize testing against another environment or third party.

**Customer representative**  
Name: `{{NAME}}`  
Title: `{{TITLE}}`  
Signature: `{{SIGNATURE}}`  
Date: `{{DATE}}`

**TenantProof operator**  
Name: `{{NAME}}`  
Signature: `{{SIGNATURE}}`  
Date: `{{DATE}}`
