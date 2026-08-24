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
for name in ['index.html', 'app.html']:
    path = root / name
    text = path.read_text(encoding='utf-8')
    if 'href="premium.css"' not in text:
        text = text.replace('</head>', '<link rel="stylesheet" href="premium.css"></head>')
    path.write_text(text, encoding='utf-8')
for name in ['sample-packet.html','privacy.html','terms.html','stripe-service-not-received.html','freelancer-chargeback-response.html','shopify-chargeback-evidence.html']:
    path = root / name
    if not path.exists(): continue
    text = path.read_text(encoding='utf-8').replace('index.html?demo=1#builder','app.html?demo=1').replace('index.html#builder','app.html')
    if 'href="guide-v2.css"' not in text: text = text.replace('</head>','<link rel="stylesheet" href="guide-v2.css"></head>')
    if 'href="premium.css"' not in text: text = text.replace('</head>','<link rel="stylesheet" href="premium.css"></head>')
    path.write_text(text, encoding='utf-8')
touch "$ROOT/public/.nojekyll"
printf 'Built RebuttalKit in %s/public\n' "$ROOT"
