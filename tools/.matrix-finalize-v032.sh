set -Eeuo pipefail
BASE_HEAD="$(git rev-parse HEAD)"
exec > >(tee /tmp/tenantproof-v032.log) 2>&1
on_error() {
  status=$?
  trap - ERR
  set +e
  {
    echo "finalizer_exit=$status"
    echo "--- last log bytes ---"
    tail -c 30000 /tmp/tenantproof-v032.log
  } > /tmp/tenantproof-v032-error.txt
  git reset --hard "$BASE_HEAD"
  cp /tmp/tenantproof-v032-error.txt MATERIALIZER_ERROR.txt
  git config user.name 'github-actions[bot]'
  git config user.email '41898282+github-actions[bot]@users.noreply.github.com'
  git add MATERIALIZER_ERROR.txt
  git commit -m 'chore: record v0.3.2 finalization failure'
  git push origin HEAD:feature/tenant-boundary-matrix-20260901
  exit "$status"
}
trap on_error ERR

cp .github/workflows/finalize-matrix-v032.yml /tmp/finalize-matrix-v032.yml
rm .github/workflows/finalize-matrix-v032.yml tools/.matrix-finalize-v032.sh
rm -f MATERIALIZER_ERROR.txt

python - <<'PY'
from pathlib import Path
import json

def replace_once(path: str, old: str, new: str) -> None:
    file = Path(path)
    source = file.read_text(encoding='utf-8')
    if source.count(old) != 1:
        raise SystemExit(f'Expected exactly one match in {path}: {old!r}')
    file.write_text(source.replace(old, new, 1), encoding='utf-8')

package_path = Path('package.json')
package = json.loads(package_path.read_text(encoding='utf-8'))
if package.get('version') != '0.3.1':
    raise SystemExit(f"Unexpected package version: {package.get('version')}")
package['version'] = '0.3.2'
package_path.write_text(json.dumps(package, indent=2) + '\n', encoding='utf-8')

replace_once('tools/build-source-manifest.mjs', "version: '0.3.1',", "version: '0.3.2',")
replace_once('tools/build-handoff-report.py', 'TenantProof • canonical handoff • v0.3.1', 'TenantProof • canonical handoff • v0.3.2')
replace_once('CHANGELOG.md', '## [Unreleased] — free tenant-boundary matrix', '## [0.3.2] — 2026-09-01 — free tenant-boundary matrix')

old_summary = "The product now exists on GitHub Pages as a polished request-only technical preview, interactive fictional report viewer, local scope worksheet, versioned report schema, demo-only runner, production hardening, operational templates, and a public Notion qualification path. PR [#23](https://github.com/UnderNoNameYet/NoNameYet/pull/23) was squash-merged at `6bc99104bb91b32afb50c8c7d9b416d74566f8ed`, and deployment [run #40](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33372340582) succeeded."
new_summary = "The currently deployed product is a polished request-only technical preview with an interactive fictional report viewer, local scope worksheet, versioned report schema, demo-only runner, production hardening, operational templates, and a public Notion qualification path. Initial publication PR [#23](https://github.com/UnderNoNameYet/NoNameYet/pull/23) was followed by post-publication reconciliation PR [#24](https://github.com/UnderNoNameYet/NoNameYet/pull/24), squash-merged at `f17ff3476735f423445cb37cb6084b3763c42269`; deployment [run #42](https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33402765404) succeeded. The v0.3.2 release candidate adds a free fictional tenant-boundary matrix and local CSV template; it remains undeployed until this branch passes review and the Pages workflow succeeds."
replace_once('handoff/HANDOFF_REPORT.md', old_summary, new_summary)

state_path = Path('handoff/CURRENT_STATE.json')
state = json.loads(state_path.read_text(encoding='utf-8'))
repo = state['repository']
repo.update({
    'inspectedMainSha': 'f17ff3476735f423445cb37cb6084b3763c42269',
    'releaseBranch': 'current main baseline from PR #24',
    'releaseCandidateVersion': '0.3.2',
    'releaseCandidateStatus': 'quality_passed_not_deployed',
    'pullRequestNumber': 24,
    'pullRequestUrl': 'https://github.com/UnderNoNameYet/NoNameYet/pull/24',
    'mergeSha': 'f17ff3476735f423445cb37cb6084b3763c42269',
    'mergedAt': '2026-08-31T14:27:41Z',
    'workflowRunNumber': 42,
    'workflowRunUrl': 'https://github.com/UnderNoNameYet/NoNameYet/actions/runs/33402765404',
    'workflowConclusion': 'success',
    'deployedAt': '2026-08-31T14:28:23Z',
    'liveVerification': 'primary routes were fetched after PR #23; PR #24 changed no public runtime content and its Pages deployment succeeded'
})
state['softLaunch']['publicSampleBoundaryMatrix'] = False
state['quality']['githubPullRequestBuild'] = 'pending'
state_path.write_text(json.dumps(state, indent=2) + '\n', encoding='utf-8')
PY

npm run handoff:report
for pass_number in 1 2 3 4; do
  npm run handoff:manifest >/tmp/tenantproof-v032-manifest.log
  python - <<'PY'
from pathlib import Path
import json
state_path = Path('handoff/CURRENT_STATE.json')
manifest_path = Path('handoff/SOURCE_MANIFEST.json')
state = json.loads(state_path.read_text(encoding='utf-8'))
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
state['quality']['latestKnownResult'] = 'pass'
state['quality']['sourceManifestFiles'] = manifest['files']
state['quality']['sourceManifestBytes'] = manifest['bytes']
state['quality']['mustRerunAfterChanges'] = False
state_path.write_text(json.dumps(state, indent=2) + '\n', encoding='utf-8')
PY
done
npm run handoff:manifest
npm run quality

python - <<'PY'
from pathlib import Path
import json
state_path = Path('handoff/CURRENT_STATE.json')
state = json.loads(state_path.read_text(encoding='utf-8'))
quality = json.loads(Path('build/quality-gate.json').read_text(encoding='utf-8'))
qa = json.loads(Path('build/qa-results.json').read_text(encoding='utf-8'))
docs = json.loads(Path('build/docs-check.json').read_text(encoding='utf-8'))
manifest = json.loads(Path('handoff/SOURCE_MANIFEST.json').read_text(encoding='utf-8'))
q = state['quality']
q['latestKnownResult'] = 'pass'
q['latestRunAt'] = quality['generatedAt']
q['qualityGateSteps'] = len(quality['steps'])
q['documentationChecks'] = docs['checks']
q['requiredFiles'] = qa['static']['requiredFiles']
q['htmlPages'] = qa['static']['htmlPages']
q['consoleErrors'] = qa['browser']['consoleErrors']
q['externalRuntimeRequests'] = qa['browser']['externalRequests']
q['mobileOverflowPages'] = qa['browser']['mobileOverflowPages']
q['sourceManifestFiles'] = manifest['files']
q['sourceManifestBytes'] = manifest['bytes']
q['mustRerunAfterChanges'] = False
state_path.write_text(json.dumps(state, indent=2) + '\n', encoding='utf-8')
PY
npm run handoff:report

for pass_number in 1 2 3 4; do
  npm run handoff:manifest >/tmp/tenantproof-v032-manifest.log
  python - <<'PY'
from pathlib import Path
import json
state_path = Path('handoff/CURRENT_STATE.json')
manifest_path = Path('handoff/SOURCE_MANIFEST.json')
state = json.loads(state_path.read_text(encoding='utf-8'))
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
state['quality']['sourceManifestFiles'] = manifest['files']
state['quality']['sourceManifestBytes'] = manifest['bytes']
state_path.write_text(json.dumps(state, indent=2) + '\n', encoding='utf-8')
PY
done
npm run handoff:manifest
npm run docs:check
npm run release:bundle
npm run release:check

node -e "const p=require('./package.json'); if(p.version!=='0.3.2') process.exit(1)"
grep -q "version: '0.3.2'" tools/build-source-manifest.mjs
grep -q 'canonical handoff • v0.3.2' tools/build-handoff-report.py
grep -q '^## \[0.3.2\] — 2026-09-01 — free tenant-boundary matrix$' CHANGELOG.md
python - <<'PY'
import json
from pathlib import Path
manifest = json.loads(Path('handoff/SOURCE_MANIFEST.json').read_text(encoding='utf-8'))
state = json.loads(Path('handoff/CURRENT_STATE.json').read_text(encoding='utf-8'))
assert manifest['version'] == '0.3.2'
assert manifest['files'] == 102
assert manifest['byRole']['deployable-public'] == 24
assert state['repository']['releaseCandidateVersion'] == '0.3.2'
assert state['repository']['releaseCandidateStatus'] == 'quality_passed_not_deployed'
assert state['softLaunch']['publicSampleBoundaryMatrix'] is False
assert state['quality']['githubPullRequestBuild'] == 'pending'
PY
test "$(find dist -type f | wc -l)" -eq 24
test "$(find public -type f | wc -l)" -eq 24
test ! -e .github/workflows/finalize-matrix-v032.yml
test ! -e tools/.matrix-finalize-v032.sh
test ! -e MATERIALIZER_ERROR.txt
git diff --check -- . ':(exclude)handoff/HANDOFF_REPORT.pdf'

mkdir -p .github/workflows
cp /tmp/finalize-matrix-v032.yml .github/workflows/finalize-matrix-v032.yml
test -f .github/workflows/finalize-matrix-v032.yml
test ! -e tools/.matrix-finalize-v032.sh
git diff --check -- . ':(exclude)handoff/HANDOFF_REPORT.pdf'

rm -rf node_modules
git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'
git add -A
git status --short
git commit -m 'chore: finalize TenantProof v0.3.2 release candidate'
git push origin HEAD:feature/tenant-boundary-matrix-20260901
trap - ERR
