import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';

execFileSync('bash', ['scripts/build-site.sh'], { stdio: 'inherit' });

const required = [
  'index.html', 'styles.css', 'growth.css', 'app.js', 'growth.js',
  'manifest.webmanifest', 'sw.js', 'icon.svg', 'sample-packet.html',
  'privacy.html', 'terms.html', 'stripe-service-not-received.html',
  'freelancer-chargeback-response.html', 'shopify-chargeback-evidence.html',
  'robots.txt', 'sitemap.xml', '.nojekyll'
];

for (const file of required) {
  assert.ok(statSync(`public/${file}`).isFile(), `Missing public/${file}`);
}

execFileSync(process.execPath, ['--check', 'public/app.js'], { stdio: 'inherit' });
execFileSync(process.execPath, ['--check', 'public/growth.js'], { stdio: 'inherit' });
execFileSync(process.execPath, ['--check', 'public/sw.js'], { stdio: 'inherit' });
JSON.parse(readFileSync('public/manifest.webmanifest', 'utf8'));

const index = readFileSync('public/index.html', 'utf8');
const sample = readFileSync('public/sample-packet.html', 'utf8');
const privacy = readFileSync('public/privacy.html', 'utf8');
const terms = readFileSync('public/terms.html', 'utf8');
const deployable = required.filter(file => !file.endsWith('.svg') && file !== '.nojekyll').map(file => readFileSync(`public/${file}`, 'utf8')).join('\n');

assert.match(index, /RebuttalKit/);
assert.match(index, /Turn scattered proof into a response a bank can scan/);
assert.match(index, /growth\.css/);
assert.match(index, /growth\.js/);
assert.match(sample, /FICTIONAL EXAMPLE/);
assert.match(privacy, /stays in your browser/i);
assert.match(terms, /No outcome guarantee/i);
assert.doesNotMatch(deployable, /sk_live_|pk_live_|AKIA[0-9A-Z]{16}|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY/);

console.log(JSON.stringify({
  ok: true,
  requiredFiles: required.length,
  appBytes: statSync('public/app.js').size,
  conversionBytes: statSync('public/growth.js').size,
  sampleBytes: statSync('public/sample-packet.html').size
}, null, 2));
