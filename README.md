# SettleSift

**Local-first marketplace settlement reconciliation for smaller ecommerce sellers.**

SettleSift matches order, settlement, fee, and return/RTO CSV exports, then surfaces the small set of transactions that need investigation.

## Public product

- **Website:** https://undernonameyet.github.io/NoNameYet/
- **Complete app:** https://undernonameyet.github.io/NoNameYet/app.html
- **Download guide:** https://undernonameyet.github.io/NoNameYet/download.html
- **Tutorial:** https://undernonameyet.github.io/NoNameYet/tutorial.html

The current application is free. The online and downloaded builds contain the same functionality. The downloadable version is a self-contained HTML application that works in a modern browser without an installer, account, API key, or financial-file upload.

Verified application:

- Size: `84,108` bytes
- SHA-256: `1ab779e9af850e2ecbc43d2944a0aba38fd3fc73a459c2c8f73cc10331bd0fe0`

## Product capabilities

- CSV import, column mapping, and data-quality checks
- Marketplace-specific audit and fee rules
- Order ledger and prioritized exception queue
- Settlement equations and money-flow explanations
- Exception resolution with reviewer notes
- Evidence CSV, recovery report, and portable project export
- Local IndexedDB storage with localStorage fallback
- Built-in demo and responsive offline interface

## Professional product-led website

The homepage uses one coherent financial-product design system instead of a generic 3D or cyberpunk treatment.

- Warm ivory, deep ink, restrained emerald, and discrepancy coral
- Animated reconciliation map tied directly to orders, fees, returns, and payouts
- Explainable settlement card with expected, received, and unexplained values
- Scroll-directed journey from source export to bank settlement
- Detailed product control-room preview
- Equation, priority, portability, and local-first privacy stories
- Interactive exposure model with explicit non-guarantee language
- Responsive mobile navigation and layout
- Complete `prefers-reduced-motion` behavior
- No third-party runtime, tracking SDK, external font request, or video CDN

The page is delivered as one tested, self-contained HTML document. Its compressed source and final output are checksum-verified during every Pages deployment.

## Commercial wedge

- Complete self-audit: free
- Proposed founder-assisted audit: ₹1,499 for one closed period, one primary channel, and up to 5,000 order rows

Payment remains intentionally inactive until compatibility, operator identity, secure transfer, tax treatment, refund terms, and the user-approved payment flow are ready. SettleSift does not promise recovery.

## Go-to-market material

- [Ten-day acquisition plan](GO-TO-MARKET.md)
- [Seller and partner outreach copy](OUTREACH-COPY.md)
- [Real-data validation playbook](VALIDATION-PLAYBOOK.md)
- [Public launch checklist](PUBLIC-LAUNCH-CHECKLIST.md)
- [Lead tracker](LEAD-TRACKER.csv)

## Deployment

GitHub Pages deploys from `main` with `.github/workflows/pages.yml`.

1. The workflow reconstructs and verifies the tested base application bundle.
2. It reconstructs and verifies the complete product-site overlay.
3. It installs the checksum-pinned professional homepage from `homepage-v3/site.part-*`.
4. It validates the final homepage and standalone app hashes before upload.
5. GitHub Pages publishes the complete static artifact.

Never place credentials or payment secrets in `site-config.js`.

## Homepage validation

- Desktop viewport: `1440 / 1440`, with no horizontal overflow
- Mobile viewport: `390 / 390`, with no horizontal overflow
- Animated reconciliation map produced distinct frames
- Product tabs, mobile navigation, and exposure model passed
- Reduced-motion mode passed
- Browser console errors: 0
- Page errors: 0
- Failed requests: 0

Potential recovery is an investigation estimate, not an accounting conclusion or guarantee.
