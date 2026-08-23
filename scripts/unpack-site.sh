#!/usr/bin/env bash
set -euo pipefail
mkdir -p public
cat deploy/site.part-* | base64 --decode > site.tar.gz
tar -xzf site.tar.gz -C public
cat public-overrides/site.part-* | base64 --decode > overrides.tar.gz
echo "d82cc19114dbe8a776290dc27488e46e080a24df2d3df1acd15eb3d839ec7572  overrides.tar.gz" | sha256sum --check --strict
tar -xzf overrides.tar.gz -C public
cp site-config.js public/site-config.js
test -f public/index.html
test -f public/app.html
test -f public/download.html
test -f public/tutorial.html
echo "1ab779e9af850e2ecbc43d2944a0aba38fd3fc73a459c2c8f73cc10331bd0fe0  public/app.html" | sha256sum --check --strict
printf 'SettleSift site unpacked into public/\n'
