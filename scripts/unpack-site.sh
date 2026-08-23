#!/usr/bin/env bash
set -euo pipefail
mkdir -p public
cat deploy/site.part-* | base64 --decode > site.tar.gz
tar -xzf site.tar.gz -C public
printf 'SettleSift site unpacked into public/\n'
