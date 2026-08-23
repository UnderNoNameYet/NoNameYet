#!/usr/bin/env bash
set -euo pipefail
mkdir -p public
cat deploy/site.part-* | base64 --decode > site.tar.gz
tar -xzf site.tar.gz -C public
cp site-config.js public/site-config.js
printf 'SettleSift site unpacked into public/\n'
