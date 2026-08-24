#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ARCHIVE="${TMPDIR:-/tmp}/rebuttalkit-site.tar.gz"
B64="${TMPDIR:-/tmp}/rebuttalkit-site.tar.gz.b64"
EXPECTED="8fa22131eb70cb2ce3ffca58096e1e369635afbcbf898044e060d6a9273fd131"

cat "$ROOT"/product/site.part-* > "$B64"
base64 --decode "$B64" > "$ARCHIVE"
echo "$EXPECTED  $ARCHIVE" | sha256sum --check -
rm -rf "$ROOT/public"
mkdir -p "$ROOT/public"
tar -xzf "$ARCHIVE" -C "$ROOT/public"
printf 'RebuttalKit unpacked to %s/public\n' "$ROOT"
