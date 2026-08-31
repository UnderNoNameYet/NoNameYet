# GitHub publication record

## Observed repository state

- Repository: `UnderNoNameYet/NoNameYet`
- Authenticated GitHub user: `MYIndieDEV`
- Inspected at: 2026-08-31
- Default branch: `main`
- Inspected main SHA: `047691e35c6b8d38ba5540d1fe4de345ed752a6c`
- Release branch: `launch/tenantproof-v1`
- Existing deployed product: RebuttalKit v8, rejected and frozen
- Existing workflow: `.github/workflows/pages.yml`
- Existing source layout: `public-source/` plus generated `public/`

## Release intent

Replace the active Pages artifact with the approved TenantProof request-only preview. Keep payment closed, preserve fictional-demo labeling, and publish only the generated `dist/` contents. Source, operations, quality tooling, and handoff documents stay on `main` but never enter the public artifact.

## Final repository layout

The release materializes the complete source directly on `main`: public site, schema, tools, operations, handoff documents, selected screenshots, walkthrough video, styled PDF, and machine-readable manifests. Historical RebuttalKit source and bundle directories are removed in the materialization commit. Tests remain versioned for reproducibility but never enter the Pages artifact.

Only `dist/`, built exclusively from `public/`, is uploaded to GitHub Pages. No credentials, customer data, real findings, private contact information, environment secrets, build logs, or payment configuration are committed.

## Authorization

The owner provided standing authorization to create the branch, open the pull request, merge after required checks, and deploy the closed preview. No additional routine approval is required. This does not authorize opening payment, inventing operator facts, or collecting sensitive data.

## CI and deployment

The replacement workflow:

1. checks out the complete TenantProof source;
2. regenerates public brand assets;
3. hardens HTML and builds preview configuration;
4. validates the report contract and demo fixture;
5. rejects live matrix execution;
6. checks JavaScript syntax and documentation integrity;
7. builds a public-only `dist/` artifact;
8. confirms preview state and closed payment;
9. deploys only `dist/` on `main`.

## Rollback

If Pages verification fails, revert the release pull request or redeploy `047691e35c6b8d38ba5540d1fe4de345ed752a6c`. Verify routes, CSP, assets, request state, and fictional labels after rollback.
