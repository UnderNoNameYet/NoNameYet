# Release and repository handoff

## Repository

- GitHub: `UnderNoNameYet/NoNameYet`
- default branch: `main`
- intended public origin: `https://undernonameyet.github.io/NoNameYet/`
- canonical source: repository root on current `main`

Current published `main` is `6bc99104bb91b32afb50c8c7d9b416d74566f8ed`. Historical SHA `047691e35c6b8d38ba5540d1fe4de345ed752a6c` is context and rollback only; inspect `main` again before every future release.

## Current publication state

GitHub access is operational. PR [#23](https://github.com/UnderNoNameYet/NoNameYet/pull/23) was squash-merged at `6bc99104bb91b32afb50c8c7d9b416d74566f8ed` and successful workflow [run #40](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33372340582) deployed the TenantProof request-only preview. The permanent workflow publishes only the validated `dist/` artifact. `047691e35c6b8d38ba5540d1fe4de345ed752a6c` is the pre-release rollback point.

## Owner authorization

The user explicitly authorized the agent to:

- choose implementation/release details
- put specs and handoff documents on `main`
- create branches and pull requests
- merge after quality checks
- avoid repeated routine permission prompts

This does not override connection permissions, legal identity, secret handling, third-party platform confirmations, or safe testing requirements.

## Completed first GitHub publication

1. Authenticated and inspected the old RebuttalKit `main`.
2. Created `launch/tenantproof-v1` from `047691e35c6b8d38ba5540d1fe4de345ed752a6c`.
3. Materialized direct TenantProof source and removed temporary transport.
4. Opened and inspected PR [#23](https://github.com/UnderNoNameYet/NoNameYet/pull/23).
5. Passed local quality, documentation, and PR build gates.
6. Reviewed the exact file delta and secret/transport patterns.
7. Squash-merged at `6bc99104bb91b32afb50c8c7d9b416d74566f8ed`.
8. Confirmed successful Pages run #40 and primary live routes.

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

## Historical first-publication commit plan

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
release readiness (non-strict for a closed preview; strict for commercial-ready config)
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
- `0.3.1` — published request-only technical preview
- `1.0.0` — first commercially ready public release after strict checks

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
