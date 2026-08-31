# Release and repository handoff

## Repository

- GitHub: `UnderNoNameYet/NoNameYet`
- default branch: `main`
- intended public origin: `https://undernonameyet.github.io/NoNameYet/`
- current local source: `/data/tenantproof`

Historical repository SHAs and workflows are context only. Inspect current `main` after access returns.

## Current publication state

GitHub access is restored. `main` was inspected at `047691e35c6b8d38ba5540d1fe4de345ed752a6c`; the existing Pages workflow builds and deploys rejected RebuttalKit v8. The branch `launch/tenantproof-v1` was created from that SHA. TenantProof has not yet been merged or deployed.

The release replaces the deployment workflow and points Pages only at the validated TenantProof `dist/` artifact. The inspected main SHA is the rollback point.

## Owner authorization

The user explicitly authorized the agent to:

- choose implementation/release details
- put specs and handoff documents on `main`
- create branches and pull requests
- merge after quality checks
- avoid repeated routine permission prompts

This does not override connection permissions, legal identity, secret handling, third-party platform confirmations, or safe testing requirements.

## Required first GitHub sequence

1. Call `get_me`.
2. Inspect current `main` tree and latest SHA.
3. Locate `AGENTS.md`, repository instructions, PR templates, Pages workflow, and configured publish directory.
4. Inspect current live/release source; assume historical RebuttalKit content may remain.
5. Compare repository files with local TenantProof tree.
6. Decide whether to replace, migrate, or preserve archival content.
7. Create a focused branch, suggested `launch/tenantproof-v1`.
8. Commit the smallest coherent source + docs + workflow change.
9. Run quality and build in CI.
10. Open PR with screenshots, risks, rollback, and release manifest.
11. Merge after required checks.
12. Verify deployed public origin.

## Main-branch contents

Include:

- `AGENTS.md` and `agent.md`
- root README/architecture/roadmap/security/changelog/contributing
- `public/`
- `schema/`
- `tools/`
- `operations/`
- `handoff/` and selected media
- package scripts
- CI/workflow and PR template
- deterministic test source where repository policy permits

Exclude:

- `node_modules`
- environment secrets
- real release/customer configuration if private
- raw evidence or customer reports
- customer-specific adapters
- signed authorization/SOW
- payment credentials/invoices
- generated server logs
- ephemeral QA output
- local archives

## Deployment artifact

Publish only the contents of `public/`.

The phrase “everything in main other than testers” must not lead to deleting quality controls. The professional default is:

- source tests/checkers remain versioned but are not deployed
- generated test artifacts/logs remain untracked
- public sample stays because it is a product artifact and clearly fictional

If current repository policy truly requires tests off `main`, create a dedicated protected quality branch/workflow only after inspecting the repo; do not silently weaken CI.

## Branch and commit plan

Suggested commits:

1. `feat: add TenantProof static product`
2. `docs: add canonical product and handoff specifications`
3. `ops: add authorization and delivery runbooks`
4. `test: add deterministic release quality gates`
5. `ci: publish validated public artifact`

Use fewer commits if the GitHub API makes atomic coherent commits safer. Never split a build so `main` can deploy an incomplete mix.

## Pull-request body requirements

- problem and scope
- page/feature inventory
- claim and safety boundaries
- before/after repository map
- QA output
- screenshots/video links
- config/legal blockers resolved
- deployment artifact contents
- rollback steps
- explicit note that sample is fictional

## CI order

```text
checkout
node 20 + python
install only if dependencies exist
assets
harden
config
report validation
fixture generation
live-mode rejection
syntax/docs/static/browser QA
release strict
artifact = public/
deploy
post-deploy smoke
```

Do not expose release config secrets through build logs or client JS. Only public facts belong in `site-config.js`.

## Rollback

- retain previous known-good Pages artifact or merge SHA
- revert the release PR or redeploy prior artifact
- switch site config to preview/closed if intake/payment is unsafe
- verify rollback routes/assets/CSP
- document incident and corrective action

## Release versions

- `0.1.0` — local MVP
- `0.2.0` — production preparation + public Notion soft launch
- `0.3.0` — canonical handoff/spec/quality release
- `1.0.0` — first premium public static release after strict checks

Do not label 1.0 until the deployed origin and intake path are verified.

## Release marker

`release/github-verification.json` is local/ignored until GitHub inspection succeeds. Required shape:

```json
{
  "repository": "UnderNoNameYet/NoNameYet",
  "mainSha": "40 lowercase hex characters",
  "verifiedAt": "ISO-8601",
  "workflow": ".github/workflows/..."
}
```

The readiness checker validates repository and SHA shape; the operator must ensure the marker reflects the current inspected main.
