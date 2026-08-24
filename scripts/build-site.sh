#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
rm -rf "$ROOT/public"
mkdir -p "$ROOT/public"
cp -R "$ROOT/public-source/." "$ROOT/public/"
python3 - "$ROOT/public/index.html" <<'PY'
from pathlib import Path
import sys
path = Path(sys.argv[1])
text = path.read_text(encoding="utf-8")
if 'href="growth.css"' not in text:
    text = text.replace('<link rel="stylesheet" href="styles.css">', '<link rel="stylesheet" href="styles.css">\n  <link rel="stylesheet" href="growth.css">')
if 'src="growth.js"' not in text:
    text = text.replace('<script src="app.js"></script>', '<script src="app.js"></script>\n  <script src="growth.js"></script>')
path.write_text(text, encoding="utf-8")
PY
touch "$ROOT/public/.nojekyll"
printf 'Built RebuttalKit in %s/public\n' "$ROOT"
