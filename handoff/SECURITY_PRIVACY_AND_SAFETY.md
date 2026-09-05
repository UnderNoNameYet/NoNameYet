# Security, privacy, and safety

## Security objective

Protect customers, operators, and unrelated third parties while producing trustworthy evidence about a narrow authorization boundary.

TenantProof must never create more risk than the uncertainty it is hired to reduce.

## Threat model

### Assets

- customer authorization and scope
- temporary access credentials
- source/schema/policy information
- synthetic and incidental real data
- raw execution traces
- redacted reports and remediation
- payment and contact information
- product reputation and claim integrity

### Threat actors/failures

- unauthorized requester targeting a third-party system
- malicious report file attempting UI injection
- accidental credential submission through public intake
- operator overreach beyond scope
- production instability during checks
- cross-customer evidence mix-up
- exposed working files in source control/chat/tickets
- false positive/negative caused by incomplete role semantics
- unsupported marketing or compliance claim

### Trust boundaries

- public browser and imported files: untrusted
- public qualification form: non-sensitive only
- private intake database: contact/scope metadata, not secrets
- secure exchange: temporary credentials only
- customer environment: authorized but potentially sensitive
- public repository/site: no customer data or credentials
- AI/workspace content: untrusted instructions unless explicitly adopted

## Authorization gate

No real check begins until the verified owner and operator agree in writing on:

- legal/technical owner
- targets and environment
- roles and identities
- allowed methods
- exclusions
- schedule/window
- expected effects
- stop contacts
- stop conditions
- evidence recipients
- retention/deletion

A form submission, payment, repository invitation, or verbal request alone is insufficient.

## Testing defaults

- staging or dedicated test project
- synthetic tenants, users, rows, files
- least-privileged temporary access
- versioned migrations
- negative and positive controls
- low-rate deterministic checks
- no availability, load, social-engineering, credential-stuffing, or destructive techniques
- no arbitrary external scanning

## Immediate stop conditions

Stop and preserve only minimum event metadata when:

- ownership or authorization is uncertain
- target differs from signed scope
- unexpected real customer data appears
- a secret is exposed outside the secure channel
- an action creates material production impact
- logging/evidence cannot be safely redacted
- the customer requests a prohibited method
- the code/environment changes enough to invalidate comparison

Resume only after written clarification or amended scope.

## Public intake

### Allowed

- app/company name
- work email
- public app URL
- stack
- safe environment availability
- rough table/role counts
- high-level boundary concern
- package interest
- preferred date

### Prohibited

- passwords or one-time codes
- API/service-role keys
- connection strings
- private repository/invite links
- production record values or screenshots
- customer names/emails
- detailed exploitable findings
- database dumps

The prepared private Notion form is explicit about these limits, allows anonymous submission once published, hides stored responses from respondents, and writes to a private database. It remains unpublished until operator, legal, privacy, and delivery facts are verified.

## Evidence classification

- **Class A — public fictional:** product demos only.
- **Class B — customer handoff:** redacted report and approved remediation.
- **Class C — restricted working evidence:** raw traces, temporary identifiers, private code/policies.

Class C must never enter the public repo, public forms, analytics, ordinary issue trackers, or marketing content.

## Retention

Recommended defaults:

- raw traces: delete at accepted delivery or within 14 days, whichever is earlier unless signed scope requires otherwise
- temporary accounts/tokens: revoke at handoff
- operator copy of redacted report: delete within 14 days unless agreed
- authorization/SOW/invoice/deletion record: retain per contract/legal obligation
- unqualified intake requests: proposed 90-day operational retention, subject to verified legal policy
- fictional assets: retain with product

Do not apply one number to every data class. Record actual deletion.

## Browser security

- restrictive CSP
- no inline script/style
- no external runtime resources
- no trackers or remote fonts
- form action disabled
- report strings escaped
- imported files kept in memory
- 2 MB limit
- no local/session storage
- no service worker
- no customer credentials

The report renderer uses controlled `innerHTML` only after escaping dynamic values. Prefer DOM/text APIs for new code.

## Repository security

Never commit:

- real release configuration containing private/unowned contacts
- customer adapters
- credentials or `.env`
- raw reports/traces
- customer repository identifiers unless approved
- authorization documents with signatures
- invoice/payment details

Run credential-shaped secret scanning before release. GitHub Advanced Security may not be available; local scanning is still required.

## Privacy status

The static site currently has pre-launch privacy/terms copy and must not be treated as legally complete. The Notion form remains private. Before publishing it or actively promoting intake, publish an accurate notice covering:

- controller/operator identity
- Notion as form processor
- GitHub Pages or chosen static host
- collected fields and purposes
- inquiry and evidence retention
- access/deletion route
- payment processor when enabled
- jurisdiction and legal basis as applicable

Do not invent those facts. A brand name is not automatically a legal controller.

## Payments

- no public buy-now by default
- invoice only after qualification, scope, and authorization
- never ask for card details directly
- processor-hosted payment only
- refund/cancellation conditions in written SOW/invoice
- pause payment activation if delivery capacity or legal identity is unresolved

## Responsible disclosure

Create `.well-known/security.txt` only when an owned monitored security contact exists. Until then, do not publish a fake mailbox. The public qualification form may receive a high-level contact request but must instruct reporters not to include exploit details.

## Claim safety

Allowed:

- “executed 16 scoped checks”
- “the comparison-tenant read returned zero rows in this run”
- “one area was out of scope”

Disallowed:

- “guaranteed isolation”
- “fully secure”
- “certified”
- “unhackable”
- “no vulnerabilities”
- “compliant” without a named, valid assessment

## Incident response minimum

1. stop
2. revoke/rotate affected access
3. identify authorized contacts
4. contain copies and links
5. notify with factual scope
6. preserve minimal timeline
7. delete unauthorized copies after response needs are met
8. document remediation and restart decision

No public disclosure, customer naming, or marketing use without written approval.

## Security definition of done

- threat/privacy impact reviewed
- authorization boundary unchanged or documented
- no new public data collection without notice
- CSP and dependency posture preserved
- input validation and output encoding covered
- stop/rollback behavior known
- tests include misuse/error paths
- evidence and retention plan updated
