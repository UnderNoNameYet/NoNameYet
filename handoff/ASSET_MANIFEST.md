# Handoff asset manifest

All media is product/demo material. No customer evidence, credentials, private records, or real findings may be stored here.

## Source assets

| Source | Dimensions | Purpose |
|---|---:|---|
| `public/assets/tenantproof-og.png` | 1200×630 | social/Open Graph preview |
| `public/assets/icon-192.png` | 192×192 | app/touch icon |
| `public/assets/icon-512.png` | 512×512 | large manifest icon |
| `public/assets/favicon.svg` | vector | browser icon |

## Generated captures

`tools/capture-previews.mjs` regenerates deterministic review images from the exact public source:

| Stable handoff name | View |
|---|---|
| `handoff/assets/01-home-desktop.png` | product-first homepage/Run preview at desktop width |
| `handoff/assets/02-report-desktop.png` | Focus Workbench Run stage |
| `handoff/assets/03-request-mobile.png` | local request worksheet on mobile |
| `handoff/assets/04-home-mobile-full.png` | complete mobile homepage |
| `handoff/assets/08-sample-matrix-desktop.png` | Focus Workbench Matrix stage |

`tools/sync-handoff-assets.mjs` copies generated captures to stable names, copies the social image/icons, and writes `handoff/assets/SHA256SUMS`.

## Complete stable media set

```text
handoff/assets/
├── 01-home-desktop.png
├── 02-report-desktop.png
├── 03-request-mobile.png
├── 04-home-mobile-full.png
├── 05-social-preview.png
├── 06-icon-192.png
├── 07-icon-512.png
├── 08-sample-matrix-desktop.png
├── walkthrough.webm
└── SHA256SUMS

handoff/HANDOFF_REPORT.pdf
handoff/SOURCE_MANIFEST.json
```

## Regeneration

```bash
npm run assets
npm test
node tools/capture-previews.mjs
node tools/record-walkthrough.mjs
npm run handoff:assets
npm run handoff:report
npm run handoff:manifest
npm run docs:check
```

`npm run quality` runs the canonical sequence, including capture before media synchronization. Scripts start and stop finite local servers; no background port is assumed.

## Review checklist

- product-first hero communicates problem, workflow, artifact, and next step
- Workbench Run and Matrix stages are spacious and legible
- no permanent generic sidebar or inspector
- report statuses, selection, and temporary evidence dock are understandable
- Northstar CRM is visibly fictional on desktop and mobile
- mobile pages have no document-level horizontal overflow
- request controls and local-only language remain readable
- focus, hover, selected, reduced-motion, and print states make sense
- no personal contact, placeholder, session reference, or customer data leaks

## Update rule

Regenerate media after changes to the hero, workbench stages, report table/dock, pricing, request flow, navigation, status vocabulary, or public launch/legal state. Never hand-edit generated screenshots, checksums, PDF, or source manifest.

## Walkthrough

The generated VP9 walkthrough is a short, silent 1440×900 sequence showing:

1. product-first homepage
2. Workbench Run with before/after evidence
3. Workbench Matrix paired controls
4. mobile/request context where included by the generator

It contains no external account/session UI, customer data, credentials, narration, or implied live execution.
