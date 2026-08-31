# TenantProof intake architecture

## Goal

Collect enough information to qualify an authorized review without collecting secrets, production records, or unnecessary personal data.

## Public fields

Allowed in the public intake:

- Contact name and business email
- Application name and public product URL if the owner chooses
- Stack category
- Staging or test-environment availability
- Approximate number of tables and roles
- Whether functions and storage are in use
- Plain-language authorization concern
- Selected starting package

Public intake must reject or warn against credentials and customer records.

## Fields that never belong in the public intake

- Supabase service-role key
- Database password or connection string
- GitHub, hosting, billing, or analytics credentials
- Access token, cookie, session identifier, or one-time code
- Database exports or real customer records
- A third-party target without proof of authority

## Recommended launch flow

1. **Local worksheet:** visitor produces a scope brief in the browser.
2. **Owned secure intake URL:** a configured HTTPS form receives the brief and displays the privacy notice and deletion request route.
3. **Qualification:** operator verifies authority, fit, package limits, and staging availability.
4. **Written scope:** statement of work and authorization record are approved.
5. **Secure access exchange:** use a separate credential manager or temporary invitation—not the intake form.
6. **Invoice:** issue only after scope acceptance.

## Technical configuration

`config/site.preview.json` controls the public state. The contact link remains hidden unless all of these are true:

- `state` is `ready`
- `contactUrl` is HTTPS
- the release check passes

The browser does not persist worksheet data and the form's default submit action is disabled. Copy and download are local user actions.

## Provider selection requirements

Before selecting a hosted form provider, verify:

- Operator ownership and multi-factor authentication
- Data region and subprocessors
- Encryption in transit and at rest
- Spam and abuse controls
- Export and deletion functions
- Configurable retention
- No public response index
- A privacy-policy link and consent record
- Ability to prohibit file uploads initially
- Webhook/API security if later integrated

## Current launch blocker

No owned business intake URL, operator identity, retention period, or approved processor has been configured. The preview therefore generates a local brief but cannot transmit it.
