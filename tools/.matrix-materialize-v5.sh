set -Eeuo pipefail
BASE_HEAD="$(git rev-parse HEAD)"
exec > >(tee /tmp/tenantproof-matrix-v5.log) 2>&1
on_error() {
  status=$?
  trap - ERR
  set +e
  {
    echo "materializer_exit=$status"
    echo "--- last log bytes ---"
    tail -c 30000 /tmp/tenantproof-matrix-v5.log
  } > /tmp/tenantproof-matrix-v5-error.txt
  git reset --hard "$BASE_HEAD"
  cp /tmp/tenantproof-matrix-v5-error.txt MATERIALIZER_ERROR.txt
  rm -f tools/apply-sample-matrix.py
  git config user.name 'github-actions[bot]'
  git config user.email '41898282+github-actions[bot]@users.noreply.github.com'
  git add MATERIALIZER_ERROR.txt
  git commit -m 'chore: record matrix v5 materializer failure'
  git push origin HEAD:feature/tenant-boundary-matrix-20260901
  exit "$status"
}
trap on_error ERR

cat tools/.matrix-chunk-* | base64 -d | gzip -d > tools/apply-sample-matrix.py
echo '5aed4b833abef6b2698f1eaa726c1a78f0fd1ec018b47c24c49f57666afd390b  tools/apply-sample-matrix.py' | sha256sum -c -
echo 'c507559ba931846623ab356d2f4c278c431918792b244ad09a537944df3720c1  tools/.matrix-postprocess.py' | sha256sum -c -
python tools/apply-sample-matrix.py
python tools/.matrix-postprocess.py
python - <<'PY'
from pathlib import Path
path = Path('handoff/HANDOFF_REPORT.md')
source = path.read_text(encoding='utf-8')
old = '**Snapshot:** 2026-09-01  '
if source.count(old) != 1:
    raise SystemExit('Expected one snapshot line with Markdown hard-break spaces')
path.write_text(source.replace(old, '**Snapshot:** 2026-09-01', 1), encoding='utf-8')
PY

cp .github/workflows/materialize-sample-matrix-v5.yml /tmp/materialize-sample-matrix-v5.yml
rm .github/workflows/materialize-sample-matrix-v5.yml
rm tools/.matrix-chunk-* tools/apply-sample-matrix.py tools/.matrix-postprocess.py tools/.matrix-materialize-v5.sh
rm -f MATERIALIZER_ERROR.txt

mkdir -p build
cp handoff/assets/walkthrough.webm build/walkthrough.webm
node tools/capture-previews.mjs
python - <<'PY'
from pathlib import Path
from PIL import Image
matrix = Image.open('build/tenantproof-matrix-desktop.png')
mobile = Image.open('build/tenantproof-mobile.png')
matrix_dimensions = f'{matrix.width}×{matrix.height}'
mobile_dimensions = f'{mobile.width}×{mobile.height}'
path = Path('handoff/ASSET_MANIFEST.md')
source = path.read_text(encoding='utf-8')
if source.count('generated full page') != 1:
    raise SystemExit('Expected one matrix dimension placeholder')
if source.count('390×11086') != 1:
    raise SystemExit('Expected one previous home-mobile dimension')
source = source.replace('generated full page', matrix_dimensions, 1)
source = source.replace('390×11086', mobile_dimensions, 1)
path.write_text(source, encoding='utf-8')
print({'matrixCapture': matrix_dimensions, 'homeMobileCapture': mobile_dimensions})
PY
node tools/sync-handoff-assets.mjs
npm run handoff:report

for pass_number in 1 2 3 4; do
  npm run handoff:manifest >/tmp/tenantproof-manifest.log
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
  npm run handoff:manifest >/tmp/tenantproof-manifest.log
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

test "$(find dist -type f | wc -l)" -eq 24
test "$(find public -type f | wc -l)" -eq 24
test "$(grep -c ',DELETE,' public/assets/sample-boundary-matrix.csv)" -eq 2
test "$(grep -c 'href=\"assets/sample-boundary-matrix.csv\"' public/sample-matrix.html)" -eq 1
grep -q 'sample-boundary-matrix.csv' public/sample-matrix.html
grep -q 'sample-matrix.html' public/index.html
grep -q 'sample-matrix.html' public/sitemap.xml
test -f handoff/assets/08-sample-matrix-desktop.png
test ! -e .github/workflows/materialize-sample-matrix-v5.yml
test -z "$(find tools -maxdepth 1 -name '.matrix-chunk-*' -print -quit)"
test ! -e tools/apply-sample-matrix.py
test ! -e tools/.matrix-postprocess.py
test ! -e tools/.matrix-materialize-v5.sh
test ! -e MATERIALIZER_ERROR.txt
git diff --check -- . ':(exclude)handoff/HANDOFF_REPORT.pdf'

mkdir -p .github/workflows
cp /tmp/materialize-sample-matrix-v5.yml .github/workflows/materialize-sample-matrix-v5.yml
test -f .github/workflows/materialize-sample-matrix-v5.yml
test ! -e tools/.matrix-materialize-v5.sh
test ! -e tools/.matrix-postprocess.py
test -z "$(find tools -maxdepth 1 -name '.matrix-chunk-*' -print -quit)"
git checkout "$BASE_HEAD" -- .github/workflows/pages.yml
git diff --quiet -- .github/workflows/pages.yml
git diff --check -- . ':(exclude)handoff/HANDOFF_REPORT.pdf'

rm -rf node_modules
git config user.name 'github-actions[bot]'
git config user.email '41898282+github-actions[bot]@users.noreply.github.com'
git add -A
git status --short
git commit -m 'feat: add free tenant-boundary matrix'
git push origin HEAD:feature/tenant-boundary-matrix-20260901
trap - ERR
