# RebuttalKit

**Turn scattered proof into a response a bank can scan.**

RebuttalKit is a local-first chargeback evidence packet builder for freelancers, agencies, studios, coaches, digital sellers, and small merchants handling occasional disputes.

**Live beta:** https://undernonameyet.github.io/NoNameYet/

## Why it exists

Small merchants often have the right records spread across invoices, contracts, delivery logs, files, and messages—but no fast way to organize them around the processor's dispute reason. RebuttalKit turns those records into a reason-specific checklist, dated chronology, factual response, evidence index, final checks, and print-ready packet.

The product does not submit disputes, access processor accounts, fabricate evidence, provide legal advice, or predict an issuer outcome.

## Product status

- Complete installable web beta
- Payment intentionally disabled
- No account or case-data server
- Local browser persistence
- Offline interface after the first successful visit
- Direct, reviewable static source under `public-source/`
- GitHub Pages deployment with syntax and secret-pattern checks

## Main workflow

1. Record the processor reason, deadline, amount, transaction, and sale type.
2. Follow a reason- and sale-specific evidence checklist.
3. Mark each record `Have`, `Missing`, or `N/A` and add a factual reference note.
4. Build a dated chronology.
5. Generate a response draft, evidence index, and final checks.
6. Print to PDF, export text, or export/import a portable JSON case.

## Coverage

**Processors:** Stripe, Shopify Payments, and Other.

**Reasons:** not received, duplicate, cardholder does not recognize, credit not processed, canceled recurring, not as described, and general.

**Sale types:** service, digital product, physical product, and subscription.

## Conversion and trust surfaces

- Immediate evidence-list preview before case entry
- Complete fictional sample packet
- Explicit local-data explanation and beta terms
- Installable PWA and offline cache
- Narrow educational pages for high-intent searches
- Proposed one-time founder review shown as unavailable until approval
- No fake testimonial, win rate, countdown, or outcome claim

## Run locally

```bash
bash scripts/build-site.sh
python3 -m http.server 4173 --directory public
```

Open `http://127.0.0.1:4173`.

Run dependency-free validation with:

```bash
node test.mjs
```

## Repository layout

- `public-source/` — direct product and public guidance source
- `scripts/build-site.sh` — reproducible static build
- `.github/workflows/pages.yml` — validated Pages deployment
- `test.mjs` — source, syntax, content, and secret-pattern checks
- `GO-TO-MARKET.md` — first-$100 validation plan

## Privacy and limitations

Case fields and evidence notes are kept in local browser storage. The application has no case-data backend and no analytics tracker. GitHub Pages still delivers the static files and may process standard web request information under GitHub's own practices.

Use a trusted device. Export a backup before clearing site data. Check the live processor portal for the current deadline, reason, accepted evidence, formats, and size limits.

## Monetization hypothesis

The self-service beta remains free. If the product and operations are approved, the proposed first paid offer is a **one-time $59 founder-reviewed packet**, not a subscription. Two sales would equal $118 gross. That is a validation target, not a revenue or dispute-outcome guarantee.
