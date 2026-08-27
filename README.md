# RebuttalKit

**Dispute evidence, assembled.**

RebuttalKit is a local-first chargeback evidence workspace for freelancers, agencies, studios, coaches, digital sellers, and small merchants handling occasional disputes.

- Product website: https://undernonameyet.github.io/NoNameYet/
- Application: https://undernonameyet.github.io/NoNameYet/app.html
- Fictional packet: https://undernonameyet.github.io/NoNameYet/sample-packet.html
- Founder review: https://undernonameyet.github.io/NoNameYet/premium.html

## Product

The free application guides a merchant through four deliberate stages:

1. **Case** — copy the exact processor reason, deadline, transaction, and sale facts.
2. **Evidence** — work through a reason- and sale-specific proof checklist.
3. **Timeline** — connect factual events to dated records.
4. **Packet** — generate a response draft, evidence index, final checks, and exports.

Case data stays in local browser storage. There is no RebuttalKit account, processor connection, case-data backend, analytics tracker, or automatic submission.

## Founder packet review

The revenue release introduces an optional **$69 one-time review** for one accepted, active dispute. The free workspace remains complete.

The review includes:

- chronology and factual-consistency pass;
- evidence order and filename plan;
- one revised factual response;
- visible gaps and questions to resolve;
- one correction round.

It excludes legal advice, processor representation, account access, invented evidence, submission, and outcome guarantees. Payment is requested only after a non-sensitive compatibility check is accepted.

Two reviews produce **$138 gross**, which is the first-10-day target—not a promise.

## Commercial safety gate

`public-source/site-config.js` intentionally keeps the public business identity, review inbox, and payment URL blank until the operator approves them. With those fields blank, the browser can prepare a compatibility request but clearly says applications are not open.

Never commit API keys, payment secrets, bank details, credentials, or customer files. A hosted checkout URL is public configuration, not a credential.

## Run locally

```bash
bash scripts/build-site.sh
python3 -m http.server 4173 --directory public
```

Open `/` for the product website, `/app.html` for the workspace, and `/premium.html` for the review offer.

Validate the release:

```bash
node test.mjs
```

## Repository map

- `public-source/index.html`, `site.css`, `site.js` — product website
- `public-source/app.html`, `app-v2.css`, `app.js`, `app-shell.js` — working application
- `public-source/premium.html`, `founder-review.css`, `founder-review.js` — paid-review funnel
- `public-source/site-config.js` — non-secret public commercial settings
- `GO-TO-MARKET.md` — ten-day acquisition plan
- `OUTREACH-COPY.md` — permission-aware conversation templates
- `OPERATIONS-RUNBOOK.md` — intake, delivery, deletion, and refund process
- `VALIDATION-PLAYBOOK.md` — evidence-based continue or stop rules
- `LEAD-TRACKER.csv` — manually qualified signal tracker
- `.github/workflows/pages.yml` — deterministic GitHub Pages deployment

## Boundaries

RebuttalKit organizes records. It does not provide legal advice, fabricate evidence, predict outcomes, claim affiliation with Stripe or Shopify, or control a bank or issuer decision.
