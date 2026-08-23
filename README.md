# SettleSift

**Local-first marketplace settlement reconciliation for smaller ecommerce sellers.**

SettleSift matches order, settlement, fee, and return/RTO CSV exports, then surfaces the small set of transactions that need investigation.

## Public product

- **Website:** https://undernonameyet.github.io/NoNameYet/
- **Open the complete app:** https://undernonameyet.github.io/NoNameYet/app.html
- **Download guide:** https://undernonameyet.github.io/NoNameYet/download.html
- **Full tutorial:** https://undernonameyet.github.io/NoNameYet/tutorial.html

The application is free for the current build. The online and downloaded versions contain the same features. The downloadable file is a self-contained HTML application named `SettleSift-offline.html`; it works in a modern browser without an installer, account, API key, or financial-file upload.

Verified application:

- Size: `84,108` bytes
- SHA-256: `1ab779e9af850e2ecbc43d2944a0aba38fd3fc73a459c2c8f73cc10331bd0fe0`

## Product capabilities

- CSV import, column mapping, and data-quality gate
- Marketplace-specific audit and fee rules
- Order ledger and prioritized exception queue
- Settlement equations and money-flow explanations
- Exception resolution with reviewer notes
- Evidence CSV, recovery report, and portable project export
- Local IndexedDB storage with localStorage fallback
- Built-in demo for learning without private data
- Responsive web and offline interfaces

## Immersive website experience

The homepage is an original, real-time generative WebGL experience rather than a pre-rendered template or heavy third-party embed. Scroll directs a five-act financial-data narrative from source exports to evidence. Pointer movement changes the 3D camera, anomalous settlement nodes surface in red, and an optional sound control synthesizes ambient audio only after a visitor clicks it.

The experience also includes:

- Cinematic loader with a failure-safe timeout
- Custom WebGL ray-marched settlement core and orbiting data paths
- Scroll-directed story chapters and scene progress
- Pointer parallax, magnetic actions, 3D interface tilt, and kinetic typography
- Interactive unexplained-value signal model
- Product UI reveal, capability system, and privacy architecture
- Responsive mobile composition and navigation
- Static visual fallback when WebGL is unavailable
- Complete `prefers-reduced-motion` alternative
- No external runtime library, model host, video CDN, or tracking SDK

## Commercial wedge

- Free complete self-audit
- Proposed ₹1,499 founder-assisted audit for one closed period, one primary channel, and up to 5,000 order rows

Payment remains intentionally inactive until compatibility, operator identity, secure transfer, tax treatment, refund terms, and the user-approved payment flow are ready. SettleSift does not promise recovery.

## Go-to-market material

- [Ten-day acquisition plan](GO-TO-MARKET.md)
- [Seller and partner outreach copy](OUTREACH-COPY.md)
- [Real-data validation playbook](VALIDATION-PLAYBOOK.md)
- [Public launch checklist](PUBLIC-LAUNCH-CHECKLIST.md)
- [Lead tracker](LEAD-TRACKER.csv)

## Deployment

GitHub Pages deploys from `main` with `.github/workflows/pages.yml`.

1. The workflow rebuilds the tested base bundle from `deploy/site.part-*`.
2. The deterministic product overlay in `public-overrides/site.part-*` restores the full marketing, tutorial, legal, and discovery site.
3. The checksum-verified immersive layer in `immersive-overrides/site.b64` applies the WebGL homepage.
4. Root `site-config.js` is copied into the public artifact.
5. The workflow verifies the standalone app checksum before publishing.

Never place credentials or payment secrets in `site-config.js`.

## Validation completed

- WebGL initialized and animated frames were visually distinct
- Five scroll chapters rendered correctly on desktop and mobile
- Pointer, mobile navigation, tilt, reveal, calculator, and download interactions passed
- Reduced-motion and no-WebGL fallbacks are present
- Desktop and mobile overflow checks passed on every public page
- Complete audit-app regression passed
- Offline application checksum and size verified
- Browser console errors: 0
- Page errors: 0
- Failed requests: 0

Potential recovery is an investigation estimate, not an accounting conclusion or guarantee.
