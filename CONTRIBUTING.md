# Contributing to TenantBoundary

Read [`AGENTS.md`](AGENTS.md) and [`handoff/README.md`](handoff/README.md) before opening a change.

## Workflow

1. State the buyer/operational problem.
2. Update the relevant specification and acceptance criteria.
3. Implement the smallest coherent change.
4. Add or update deterministic QA.
5. Run `npm run quality`.
6. Inspect affected screenshots and critical keyboard/mobile paths.
7. Update changelog, decision log, current state, and handoff media where relevant.
8. Open a pull request using the repository template.

## Restrictions

- no customer data, credentials, private reports, or customer adapters
- no arbitrary scanning/live target support
- no unsupported security/compliance/revenue claims
- no third-party trackers/scripts/fonts without a documented decision
- no silent report-schema semantic changes
- no publication of fictional proof as real work

## Source vs deployment

Source control may include deterministic test and quality tooling. The deployed artifact must contain only `public/`.

## Style

Prefer semantic HTML, small dependency-free modules, clear text, explicit states, and documented limits. Do not introduce a framework or backend until the architecture gate in the roadmap is met.
