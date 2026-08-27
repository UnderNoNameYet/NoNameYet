# RebuttalKit

**Dispute evidence, assembled.**

RebuttalKit is a local-first chargeback evidence workspace for independent service businesses handling occasional disputes. The strongest use case is a high-value service dispute where delivery proof is spread across contracts, calls, approvals, messages, shared files, and invoices.

- Product website: https://undernonameyet.github.io/NoNameYet/
- Application: https://undernonameyet.github.io/NoNameYet/app.html
- Fictional workspace packet: https://undernonameyet.github.io/NoNameYet/sample-packet.html
- Fictional founder-review example: https://undernonameyet.github.io/NoNameYet/review-sample.html
- Founder review: https://undernonameyet.github.io/NoNameYet/premium.html

## Product

The free application guides a merchant through four deliberate stages:

1. **Case** — copy the exact processor reason, deadline, transaction, and sale facts.
2. **Evidence** — work through a reason- and sale-specific proof checklist.
3. **Timeline** — connect factual events to dated records.
4. **Packet** — generate a response draft, evidence index, final checks, and exports.

Case data stays in local browser storage. There is no RebuttalKit account, processor connection, case-data backend, analytics tracker, or automatic submission.

## When to use platform automation first

Stripe Smart Disputes and Shopify Payments automation can be the best option when a case is eligible and the platform already has all relevant evidence. RebuttalKit does not pretend to replace those systems.

The free workspace and optional review are designed for:

- manual or ineligible disputes;
- high-value service delivery that is difficult to represent with platform data alone;
- records distributed across several tools;
- an independent chronology and consistency check before the customer decides what to submit.

## Founder packet review

The optional **$69 one-time review** is for one accepted, active service dispute, normally with **$750–$5,000 at stake** and a verified deadline at least three days away.

The review includes:

- chronology and factual-consistency pass;
- evidence order and filename plan;
- one revised factual response;
- visible gaps and questions to resolve;
- one correction round.

It excludes legal advice, processor representation, account access, invented evidence, submission, and outcome guarantees. Payment is requested only after a non-sensitive compatibility check is accepted.

Two reviews produce **$138 gross**, which is the first-10-day target—not a promise.

## Commercial safety gate

`public-source/site-config.js` intentionally keeps the public business identity, country, review inbox, and payment URL blank, with `applicationsOpen: false`, until the operator approves them. In the closed state, the browser can prepare a local compatibility request but cannot expose application email or checkout.

Never commit API keys, payment secrets, bank details, credentials, or customer files. A hosted checkout URL is public configuration, not a credential.

## Run locally

```bash
bash scripts/build-site.sh
python3 -m http.server 4173 --directory public
```

Open `/` for the product website, `/app.html` for the workspace, `/review-sample.html` for the fictional review, and `/premium.html` for the review offer.

Validate the release:

```bash
node test.mjs
```

## Repository map

- `public-source/index.html`, `site.css`, `site.js` — product website
- `public-source/app.html`, `app-v2.css`, `app.js`, `app-shell.js` — working application
- `public-source/premium.html`, `founder-review.css`, `founder-review.js` — paid-review funnel
- `public-source/review-sample.html`, `review-sample.css` — fictional before/after proof
- `public-source/privacy.html`, `terms.html`, `service-legal.*` — product and service boundaries
- `public-source/site-config.js` — non-secret public commercial settings
- `MARKET-POSITIONING.md` — target segment and competitive wedge
- `GO-TO-MARKET.md` — ten-day acquisition plan
- `OUTREACH-COPY.md` — permission-aware conversation templates
- `FOUNDER-REVIEW-TEMPLATE.md` — controlled fulfillment structure
- `LAUNCH-DEMO-STORYBOARD.md` — fictional 60-second launch demo
- `OPERATIONS-RUNBOOK.md` — intake, delivery, deletion, and refund process
- `VALIDATION-PLAYBOOK.md` — evidence-based continue or stop rules
- `LEAD-TRACKER.csv` — manually qualified signal tracker
- `.github/workflows/pages.yml` — deterministic GitHub Pages deployment

## Boundaries

RebuttalKit organizes records. It does not provide legal advice, fabricate evidence, predict outcomes, claim affiliation with Stripe, Shopify, PayPal, or any card network, or control a bank or issuer decision.
