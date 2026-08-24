import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const expected = '8fa22131eb70cb2ce3ffca58096e1e369635afbcbf898044e060d6a9273fd131';
const parts = readdirSync('product')
  .filter((name) => name.startsWith('site.part-'))
  .sort();

assert.equal(parts.length, 5, 'Expected five archive parts');
const encoded = parts.map((name) => readFileSync(join('product', name), 'utf8')).join('');
const archive = Buffer.from(encoded, 'base64');
assert.equal(createHash('sha256').update(archive).digest('hex'), expected, 'Archive checksum mismatch');

const work = mkdtempSync(join(tmpdir(), 'rebuttalkit-test-'));
try {
  const archivePath = join(work, 'site.tar.gz');
  const publicPath = join(work, 'public');
  writeFileSync(archivePath, archive);
  execFileSync('mkdir', ['-p', publicPath]);
  execFileSync('tar', ['-xzf', archivePath, '-C', publicPath]);

  for (const file of ['index.html', 'styles.css', 'app.js', 'sw.js', 'manifest.webmanifest', '.nojekyll']) {
    assert.ok(readFileSync(join(publicPath, file)).length >= 0, `Missing ${file}`);
  }

  execFileSync(process.execPath, ['--check', join(publicPath, 'app.js')], { stdio: 'inherit' });

  const index = readFileSync(join(publicPath, 'index.html'), 'utf8');
  const app = readFileSync(join(publicPath, 'app.js'), 'utf8');
  assert.match(index, /RebuttalKit/);
  assert.match(index, /Turn scattered proof into a response a bank can scan/);
  assert.match(app, /Stripe/);
  assert.match(app, /Shopify Payments/);
  assert.doesNotMatch(index + app, /sk_live_|pk_live_|AKIA[0-9A-Z]{16}|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY/);

  console.log(JSON.stringify({
    ok: true,
    parts: parts.length,
    archiveBytes: archive.length,
    sha256: expected,
    requiredFiles: 6
  }, null, 2));
} finally {
  rmSync(work, { recursive: true, force: true });
}
