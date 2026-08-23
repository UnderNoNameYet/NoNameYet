# SettleSift

**Local-first marketplace settlement reconciliation for smaller ecommerce sellers.**

SettleSift matches order, settlement, fee, and return/RTO CSV exports, then surfaces the small set of transactions that need investigation.

## Launch candidate

This branch contains the tested static product and its promotional website:

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

Payment is intentionally not active until a public business contact, hosted payment page, operator identity, tax treatment, and refund terms are approved.

## Deploy

After this branch is merged, select **GitHub Actions** as the Pages source in repository settings. The workflow rebuilds the tested static site from the deployment bundle and publishes it.

## Validation

- Marketing desktop and mobile overflow checks passed
- Pilot-request and calculator flows passed
- Full controlled application fixture passed
- Browser console errors: 0
- Failed requests: 0

Potential recovery is an investigation estimate, not an accounting conclusion or guarantee.
