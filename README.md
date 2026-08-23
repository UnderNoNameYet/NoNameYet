# SettleSift

**Local-first marketplace settlement reconciliation for smaller ecommerce sellers.**

SettleSift matches order, settlement, fee, and return/RTO CSV exports, then surfaces the small set of transactions that need investigation.

## Launch candidate

This repository contains the tested static product and its promotional website:

- Free browser-based self-audit
- Exception queue and order-level evidence
- Channel-specific fee and settlement rules
- Data-quality gate
- Recovery report and CSV exports
- Leakage estimator, pricing, privacy, and pilot-request funnel
- GitHub Pages deployment workflow

## Commercial wedge

- Free local self-audit
- ₹1,499 founder-assisted pilot for one closed statement period, one primary channel, and up to 5,000 order rows

Payment is intentionally inactive until a public business contact, hosted payment page, operator identity, tax treatment, and refund terms are approved.

## Go-to-market material

- [Ten-day acquisition plan](GO-TO-MARKET.md)
- [Seller and partner outreach copy](OUTREACH-COPY.md)
- [Real-data validation playbook](VALIDATION-PLAYBOOK.md)
- [Public launch checklist](PUBLIC-LAUNCH-CHECKLIST.md)
- [Lead tracker](LEAD-TRACKER.csv)

## Deploy

1. In repository **Settings → Pages**, select **GitHub Actions** as the source.
2. Add only approved, non-secret values to `site-config.js`.
3. Push to `main`; the included workflow publishes the static site.

The workflow rebuilds the tested site and copies the root configuration into the public artifact. Never put credentials or payment secrets in `site-config.js`.

## Validation completed

- Marketing desktop and mobile overflow checks passed
- Pilot-request and calculator flows passed
- Full controlled application fixture passed
- Browser console errors: 0
- Failed requests: 0

Potential recovery is an investigation estimate, not an accounting conclusion or guarantee.
