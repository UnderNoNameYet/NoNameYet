# RebuttalKit

**Turn scattered proof into a response a bank can scan.**

RebuttalKit is a local-first chargeback evidence packet builder for freelancers, solo operators, digital sellers, coaches, studios, and small merchants handling occasional disputes.

It turns case details, supporting evidence, and a dated timeline into a structured response draft, evidence index, final checks, and a print-ready packet. It does not submit disputes, fabricate evidence, give legal advice, or guarantee an outcome.

## Why this product

Chargebacks have an explicit dollar value and a deadline. Small merchants often have the right facts spread across email, invoices, contracts, delivery records, and messages—but no fast way to organize them into a response an issuer can scan. RebuttalKit addresses that narrow, urgent job without requiring account access or a recurring subscription.

## Product status

- Complete static beta
- Payment intentionally disabled
- Runs entirely in the browser
- No account required
- No server upload
- Works offline after the first load
- Ready for group review at the GitHub Pages URL

## Included workflow

1. Enter the case, processor, dispute reason, sale type, amount, and deadline.
2. Follow a reason-specific evidence checklist with critical, strong, and supporting items.
3. Build a chronological timeline.
4. Generate a factual response from only the records entered.
5. Review the evidence index and final checks.
6. Print the packet to PDF, copy/export the response, or export the case as JSON.

## Coverage

**Processors**
- Stripe
- Shopify Payments
- Other

**Dispute categories**
- Product or service not received
- Duplicate charge
- Fraudulent / cardholder does not recognize
- Credit not processed
- Canceled recurring transaction
- Product unacceptable / not as described
- General

**Sale types**
- Service
- Digital product
- Physical product
- Subscription

## Privacy and safety

- Case data is stored locally with IndexedDB and a limited localStorage fallback.
- Attachments remain on the device and are embedded only in locally generated print output.
- Attachments are limited to about 1.5 MB each and 6 MB total.
- User-entered content is escaped before rendering.
- The app clearly distinguishes packet readiness from the probability of winning a dispute.
- No payment code, API keys, analytics, or production credentials are included.

Use a trusted device. Export a JSON backup before clearing browser data. Do not add evidence you cannot substantiate.

## Run locally

```bash
./scripts/unpack-rebuttalkit.sh
python3 -m http.server 4173 --directory public
```

Then open `http://127.0.0.1:4173`.

## Reproducible build

The deployable static site is stored as split Base64 text files under `product/`. The unpack script:

1. Concatenates `product/site.part-*`.
2. Decodes the archive.
3. Verifies SHA-256 `8fa22131eb70cb2ce3ffca58096e1e369635afbcbf898044e060d6a9273fd131`.
4. Extracts the site into `public/`.

GitHub Actions performs the same verification before deploying to Pages.

Run the dependency-free integrity smoke test with:

```bash
node test.mjs
```

## Validation already completed

- Automated browser flow passed without console or page errors.
- Desktop horizontal overflow: `0`.
- Mobile horizontal overflow: `0`.
- Demo case readiness score: `94`.
- Reason-specific checklist switching passed.
- JSON export, response generation, print packet, and local persistence paths were exercised.

## Monetization hypothesis

The beta stays free while the product is reviewed. If approved, the first paid offer is a **$59 founder-reviewed packet**: the customer uses RebuttalKit, sends the export and supporting files through an approved secure channel, and receives one factual organization/clarity pass. Two sales equal $118 gross.

That service must not launch until a public business identity, business email, secure upload method, payment link, refund terms, turnaround commitment, retention policy, and invoice/tax details are in place. See [GO-TO-MARKET.md](GO-TO-MARKET.md).

## Important limitations

RebuttalKit is an organizational tool, not legal advice. Processor and card-network rules change. The merchant is responsible for checking the live dispute portal, deadline, accepted formats, evidence limits, and applicable rules before submission. Issuers and networks decide outcomes.
