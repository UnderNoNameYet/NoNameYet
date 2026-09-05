# TenantProof GitHub release runbook

Target repository: `UnderNoNameYet/NoNameYet`  
Target base branch: `main`  
Public origin: `https://undernonameyet.github.io/NoNameYet/`

## Current state

GitHub access is operational. The v0.3.3 buyer-proof release shipped through PR [#28](https://github.com/UnderNoNameYet/NoNameYet/pull/28) at `0be0d8d1009619d4abc5a48d7c08f68392c93967` and successful main [workflow run #64](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33949379579). The request-only preview and generated four-page fictional report PDF are live in an exact 27-file public-only artifact. Direct fetch verification passed on 2026-09-05. `88cdf9837780b864a3527f3b568b10512f170461` is the immediate rollback, while `047691e35c6b8d38ba5540d1fe4de345ed752a6c` remains the legacy pre-TenantProof reference.

The separate Notion qualification form remains private. Publication of product proof is not permission to open intake, payment, outreach, or real testing.

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
