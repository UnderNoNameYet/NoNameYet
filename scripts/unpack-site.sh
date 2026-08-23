#!/bin/sh
set -eu
rm -rf public site.tar.gz overrides.tar.gz immersive-overrides.tar.gz
mkdir -p public

python3 scripts/decode-bundle.py \
  --output site.tar.gz \
  --sha c3fcfe72df6f6449a2d7d706bb24c6bbcc3c7009fcc4101e4100c3bcd07d8bfa \
  deploy/site.part-*
tar -xzf site.tar.gz -C public

python3 scripts/decode-bundle.py \
  --output overrides.tar.gz \
  --sha d82cc19114dbe8a776290dc27488e46e080a24df2d3df1acd15eb3d839ec7572 \
  --repair-one-missing-in-first \
  public-overrides/site.part-*
tar -xzf overrides.tar.gz -C public

cp site-config.js public/site-config.js
test -f public/index.html
test -f public/app.html
test -f public/download.html
test -f public/tutorial.html
test -f public/privacy.html
test -f public/terms.html
echo "1ab779e9af850e2ecbc43d2944a0aba38fd3fc73a459c2c8f73cc10331bd0fe0  public/app.html" | sha256sum --check --strict
printf 'SettleSift stable site unpacked into public/\n'
