# TenantProof GitHub release runbook

Target repository: `UnderNoNameYet/NoNameYet`  
Target base branch: `main`  
Public candidate: `https://undernonameyet.github.io/NoNameYet/`

## Current state

GitHub access is operational. The v0.3.2 product release shipped through PR [#25](https://github.com/UnderNoNameYet/NoNameYet/pull/25) at `8ae0bea48491b1442b1181e2c1bed21b1f2479e1` and successful main workflow run #49. Documentation-only PR [#26](https://github.com/UnderNoNameYet/NoNameYet/pull/26) reconciled the handoff at `2a2fdba942bdd7c8e49d7486e866ddbdaaebd77b`; run #54 redeployed the unchanged 26-file public artifact successfully. The request-only preview is live at `https://undernonameyet.github.io/NoNameYet/`. `f17ff3476735f423445cb37cb6084b3763c42269` is the immediate pre-v0.3.2 rollback, while `047691e35c6b8d38ba5540d1fe4de345ed752a6c` remains the legacy pre-TenantProof reference.

The v0.3.3 buyer-proof candidate adds a generated fictional report PDF and raises the candidate public-only contract to 27 files. It remains unpublished until exact-head quality, changed-file review, merge, main deployment, and direct PDF fetch verification pass.

## Completed first-publication sequence

1. Authenticated as `MYIndieDEV` and inspected the prior `main`.
2. Created `launch/tenantproof-v1` from `047691e35c6b8d38ba5540d1fe4de345ed752a6c`.
3. Materialized direct source without retaining a signed URL or staging token.
4. Removed temporary transport and legacy RebuttalKit trees before review.
5. Opened PR [#23](https://github.com/UnderNoNameYet/NoNameYet/pull/23) with risk, truth, artifact, and rollback notes.
6. Inspected all 198 changed files and scanned exact added text for secret/transport patterns.
7. Fixed the preview-config CI assertion and obtained a successful PR build.
8. Squash-merged under the owner's standing authorization.
9. Confirmed successful Pages [run #40](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33372340582) and fetched every primary public route.

## Pull-request intent

- Replace the previously rejected public product with the approved TenantProof request-only release.
- Keep payment and customer intake closed until operator configuration is complete.
- Preserve clear fictional-demo labeling.
- Include rollback instructions to the current `main` SHA observed at release time.

## Required checks

- Static link and content validation
- JavaScript syntax validation
- Report schema validation
- Desktop/mobile browser QA
- No horizontal mobile overflow
- No console errors or external runtime requests
- CSP-compatible HTML
- Credential-shaped secret scan
- Launch-state configuration check
- GitHub Pages build and deploy checks

## No-go conditions

Do not merge if:

- The operator/contact/legal blockers remain unresolved for the selected launch mode.
- Any customer-facing route accepts secrets.
- The fictional sample is not clearly labeled.
- The current repository layout has not been inspected.
- CI fails or GitHub Pages points at a different source.
- The selected release would open payment or collect sensitive data without verified operator facts.
