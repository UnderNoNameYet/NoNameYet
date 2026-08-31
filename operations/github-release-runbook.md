# TenantProof GitHub release runbook

Target repository: `UnderNoNameYet/NoNameYet`  
Target base branch: `main`  
Public candidate: `https://undernonameyet.github.io/NoNameYet/`

## Current state

GitHub access was restored on 2026-08-31. The authenticated user is `MYIndieDEV`. Current `main` was inspected at `047691e35c6b8d38ba5540d1fe4de345ed752a6c`; it deploys rejected RebuttalKit v8 from a generated `public/` directory. The focused branch `launch/tenantproof-v1` was created from that exact SHA. TenantProof is not yet merged or deployed.

## Required order after reapproval

1. Load the authenticated GitHub user.
2. Inspect the current `main` branch root and latest commit.
3. Search for `pull_request_template.md` and `.github/PULL_REQUEST_TEMPLATE/`.
4. Inspect the existing Pages workflow and build layout.
5. Confirm whether the live source is `public-source`, `docs`, or another directory.
6. Use `launch/tenantproof-v1`, created from the inspected current `main`.
7. Push the minimum coherent file set in one or more reviewable commits.
8. Open a pull request structured from the repository template.
9. Run and inspect all checks.
10. Inspect the rendered preview and compare its release marker.
11. Scan the exact diff for secrets.
12. Apply the owner's standing authorization: merge after required checks and diff inspection without asking for another routine approval.
13. Verify the deployed origin and roll back on a critical defect.

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
