# Handoff asset manifest

All media in this handoff is product/demo material. No customer evidence, credentials, private records, or real findings may be stored here.

## Current source assets

| Source | Dimensions | Purpose |
|---|---:|---|
| `public/assets/tenantproof-og.png` | 1200×630 | social/Open Graph preview |
| `public/assets/icon-192.png` | 192×192 | app/touch icon |
| `public/assets/icon-512.png` | 512×512 | large manifest icon |
| `public/assets/favicon.svg` | vector | browser icon |

## Current generated captures

| Source | Dimensions | Purpose |
|---|---:|---|
| `build/tenantproof-desktop.png` | 1440×7695 | full homepage visual QA |
| `build/tenantproof-hero-desktop.png` | 1440×1050 | first-viewport/product preview |
| `build/tenantproof-report-desktop.png` | 1440×1050 | report interface preview |
| `build/tenantproof-matrix-desktop.png` | 1440×4458 | free boundary-matrix preview |
| `build/tenantproof-mobile.png` | 390×11559 | full mobile homepage QA |
| `build/tenantproof-request-mobile.png` | 390×2629 | mobile scope flow preview |

Selected versions are copied to `handoff/assets/` with stable names so another operator can inspect the intended state without regenerating first.

## Planned handoff media names

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
```

A very tall full desktop capture may remain in `build/` rather than the repository if size is excessive; the first viewport and key flows are the required handoff media.

## Regeneration

```bash
npm run assets
npm test
node tools/capture-previews.mjs
node tools/record-walkthrough.mjs
npm run handoff:assets
```

The exact scripts must start and stop finite local servers; never leave a background port assumed to be active.

## Visual review checklist

- no clipping/overflow
- hero communicates buyer/problem/artifact/CTA
- report statuses and selection are legible
- sample matrix fits desktop/mobile and the download action is clear
- fictional label visible
- mobile pricing and form controls are readable
- focus/hover/selected states make sense
- OG subtitle does not collide with report card
- no personal contact/placeholder leak

## Media update rule

Regenerate and replace media when any of these change:

- hero/layout/brand tokens
- report table/evidence panel
- pricing or package copy
- request flow
- navigation/footer
- status vocabulary
- public legal/launch state

Update dimensions and checksums in this manifest after replacement.

## Video content plan

The generated walkthrough is a 20-second, 1440×900 VP9 visual sequence. The canonical handoff report is also generated as a styled PDF from `handoff/HANDOFF_REPORT.md` plus selected screenshots.

The walkthrough should show, without narration or customer data:

1. homepage hero and category claim
2. evidence section
3. before/after report switch
4. failed-check filter and evidence panel
5. full sample report page
6. local-only import notice
7. three-step scope worksheet
8. generated local brief and privacy language

Keep it under one minute, 1440×900 or similar, and include no external account/session UI.
