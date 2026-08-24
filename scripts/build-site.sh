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
guides = [
    'sample-packet.html', 'privacy.html', 'terms.html',
    'stripe-service-not-received.html',
    'freelancer-chargeback-response.html',
    'shopify-chargeback-evidence.html'
]
for name in guides:
    path = root / name
    if not path.exists():
        continue
    text = path.read_text(encoding='utf-8')
    text = text.replace('index.html?demo=1#builder', 'app.html?demo=1')
    text = text.replace('index.html#builder', 'app.html')
    if 'href="guide-v2.css"' not in text:
        text = text.replace('</head>', '  <link rel="stylesheet" href="guide-v2.css">\n</head>')
    path.write_text(text, encoding='utf-8')
PY
rm -f "$ROOT/public/app-preview.html" "$ROOT/public/app-preview.js"
touch "$ROOT/public/.nojekyll"
printf 'Built RebuttalKit in %s/public\n' "$ROOT"
