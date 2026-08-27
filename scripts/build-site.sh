#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
rm -rf "$ROOT/public"
mkdir -p "$ROOT/public"
cp -R "$ROOT/public-source/." "$ROOT/public/"
python3 - "$ROOT/public" <<'PY'
from pathlib import Path
import sys
root = Path(sys.argv[1])
app = root / 'app.html'
text = app.read_text(encoding='utf-8')
if 'href="premium.css"' not in text:
    text = text.replace('</head>', '<link rel="stylesheet" href="premium.css"></head>')
app.write_text(text, encoding='utf-8')
legacy = ['sample-packet.html','stripe-service-not-received.html','freelancer-chargeback-response.html','shopify-chargeback-evidence.html']
for name in legacy:
    path = root / name
    if not path.exists():
        continue
    text = path.read_text(encoding='utf-8').replace('index.html?demo=1#builder','app.html?demo=1').replace('index.html#builder','app.html')
    for stylesheet in ['guide-v2.css','premium.css','pages.css']:
        marker = f'href="{stylesheet}"'
        if marker not in text:
            text = text.replace('</head>', f'<link rel="stylesheet" href="{stylesheet}"></head>')
    path.write_text(text, encoding='utf-8')
PY
printf 'RebuttalKit Revenue Release v8\n' > "$ROOT/public/release-v8.txt"
touch "$ROOT/public/.nojekyll"
printf 'Built RebuttalKit revenue release v8 in %s/public\n' "$ROOT"
