#!/bin/sh
set -eu
rm -rf public site.tar.gz overrides.tar.gz immersive-overrides.tar.gz
mkdir -p public

cat deploy/site.part-* | base64 --decode --ignore-garbage > site.tar.gz
echo "c3fcfe72df6f6449a2d7d706bb24c6bbcc3c7009fcc4101e4100c3bcd07d8bfa  site.tar.gz" | sha256sum --check --strict
tar -xzf site.tar.gz -C public

cat public-overrides/site.part-* | base64 --decode --ignore-garbage > overrides.tar.gz
echo "d82cc19114dbe8a776290dc27488e46e080a24df2d3df1acd15eb3d839ec7572  overrides.tar.gz" | sha256sum --check --strict
tar -xzf overrides.tar.gz -C public

cat immersive-overrides/site.part-* | base64 --decode --ignore-garbage > immersive-overrides.tar.gz
echo "56b86baf24e3e0531c257fa3f65fba32bd6eeea8944687836a3688ad6d399b4f  immersive-overrides.tar.gz" | sha256sum --check --strict
tar -xzf immersive-overrides.tar.gz -C public

cp site-config.js public/site-config.js
test -f public/index.html
test -f public/immersive.css
test -f public/experience.js
test -f public/app.html
test -f public/download.html
test -f public/tutorial.html
echo "1ab779e9af850e2ecbc43d2944a0aba38fd3fc73a459c2c8f73cc10331bd0fe0  public/app.html" | sha256sum --check --strict
printf 'SettleSift immersive site unpacked into public/\n'
