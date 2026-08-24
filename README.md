# RebuttalKit

**Dispute evidence, assembled.**

RebuttalKit is a local-first chargeback evidence workspace for freelancers, agencies, studios, coaches, digital sellers, and small merchants handling occasional disputes.

- Product website: https://undernonameyet.github.io/NoNameYet/
- Application: https://undernonameyet.github.io/NoNameYet/app.html
- Fictional output: https://undernonameyet.github.io/NoNameYet/sample-packet.html

## Product structure

The marketing website and working application are intentionally separate.

### Website

The homepage explains the product through a modern product narrative, interactive workflow preview, real interface visualization, local-first architecture map, and complete fictional output. It contains no fake logos, customers, testimonials, usage counts, or win-rate claims.

### Application

The application is a dedicated productivity workspace with four focused stages:

1. Case — exact processor reason, deadline, transaction, and sale facts
2. Evidence — reason- and sale-specific proof checklist
3. Timeline — dated chronology
4. Packet — response draft, evidence index, final checks, and export

The workspace supports Stripe, Shopify Payments, and other processors; seven dispute categories; four sale types; local persistence; print-to-PDF; text and JSON export; and fictional demo data.

## Visual system

- Marketing: near-black canvas, cool blue/cyan signal color, large editorial typography, product-led interface storytelling
- Application: light neutral productivity canvas, compact navigation, high-contrast forms, cobalt progress states
- Supporting pages: the same neutral/cobalt system with long-form reading layouts
- No external font, image, analytics, or UI dependency

## Privacy and boundaries

Case form values stay in local browser storage. RebuttalKit has no account system, processor integration, case-data backend, analytics tracker, or active payment flow. GitHub Pages still serves the static assets and may process ordinary web request information.

RebuttalKit does not submit disputes, provide legal advice, fabricate evidence, predict outcomes, or claim processor affiliation.

## Run locally

```bash
bash scripts/build-site.sh
python3 -m http.server 4173 --directory public
```

Open `/` for the product website and `/app.html` for the workspace.

Validate the complete build with:

```bash
node test.mjs
```

## Repository layout

- `public-source/index.html`, `site.css`, `site.js` — product website
- `public-source/app.html`, `app-v2.css`, `app.js`, `app-shell.js` — working application
- `public-source/guide-v2.css` — supporting-page visual system
- `public-source/sw.js`, `manifest.webmanifest` — installable offline shell
- `scripts/build-site.sh` — deterministic static build
- `test.mjs` — structure, syntax, link, manifest, payment, and credential checks
- `.github/workflows/pages.yml` — GitHub Pages deployment

## Commercial status

The complete self-service beta is free. Payment remains intentionally disabled. A possible future one-time $59 founder review is a hypothesis that still requires approved business identity, secure document intake, payment and refund operations, and real-user validation. Revenue and dispute outcomes are not guaranteed.
