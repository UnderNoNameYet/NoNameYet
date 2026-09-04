#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

function arg(name, fallback) {
  const prefix = `--${name}=`;
  const inline = process.argv.find(value => value.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

const root = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(root, 'public');
const previewConfigPath = path.join(root, 'config/site.preview.json');
const releaseConfigPath = path.join(root, 'config/site.release.json');
const configPath = path.resolve(arg('config', fs.existsSync(releaseConfigPath) ? releaseConfigPath : previewConfigPath));
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const required = [
  'index.html', 'report.html', 'methodology.html', 'sample-matrix.html', 'request.html', 'privacy.html', 'terms.html', '404.html',
  'assets/styles.css', 'assets/site.js', 'assets/report.js', 'assets/site-config.js', 'assets/sample-report.json', 'assets/sample-boundary-matrix.csv',
  'assets/tenantproof-og.png', 'assets/icon-192.png', 'assets/icon-512.png', 'assets/site.webmanifest',
  'robots.txt', 'sitemap.xml', '_headers', '.nojekyll', 'llms.txt'
];
const blockers = [];
const warnings = [];
const passed = [];

function pass(name) { passed.push(name); }
function block(name) { blockers.push(name); }
function warn(name) { warnings.push(name); }

const missing = required.filter(file => !fs.existsSync(path.join(publicDir, file)));
missing.length ? block(`Missing release files: ${missing.join(', ')}`) : pass('Required release files exist');

const htmlFiles = required.filter(file => file.endsWith('.html'));
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(publicDir, file), 'utf8');
  if (/style=/.test(html)) block(`${file} contains inline styles`);
  if (/<script(?![^>]*src=)/s.test(html)) block(`${file} contains inline script`);
  if (!html.includes('Content-Security-Policy')) block(`${file} lacks meta CSP`);
  if (!html.includes('assets/site-config.js')) block(`${file} lacks external site config`);
}
if (!blockers.some(item => /inline|CSP|site config/.test(item))) pass('HTML is CSP-compatible');

const sitemap = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf8');
if (!sitemap.includes(config.publicOrigin.replace(/\/$/, ''))) block('Sitemap does not match publicOrigin'); else pass('Sitemap matches public origin');

if (config.state !== 'ready') block('Site configuration is still preview'); else pass('Site configuration state is ready');
if (!/^https:\/\//.test(config.contactUrl || '')) block('Owned HTTPS intake URL is not configured'); else pass('HTTPS intake URL configured');
if (!String(config.operatorDisplayName || '').trim()) block('Public operator display name is not configured'); else pass('Operator display name configured');
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail || '')) block('Public business contact email is not configured'); else pass('Business contact email configured');
if (!Number.isInteger(config.evidenceRetentionDays)) block('Evidence retention period is not configured'); else pass('Evidence retention period configured');
if (config.paymentMode === 'closed') warn('Payment remains closed; acceptable only for request-only launch');

const legal = [fs.readFileSync(path.join(publicDir, 'privacy.html'), 'utf8'), fs.readFileSync(path.join(publicDir, 'terms.html'), 'utf8')].join('\n');
if (/pre-launch|will be published before|must be updated/i.test(legal)) block('Public privacy/terms still contain pre-launch placeholders'); else pass('Public legal copy is launch-state copy');
if (!fs.existsSync(path.join(publicDir, '.well-known/security.txt'))) warn('security.txt awaits an owned security contact');

const githubMarker = path.resolve(arg('verification', path.join(root, 'release/github-verification.json')));
if (!fs.existsSync(githubMarker)) {
  block('Fresh GitHub repository verification record is not present in this checkout');
} else {
  try {
    const verification = JSON.parse(fs.readFileSync(githubMarker, 'utf8'));
    if (verification.repository !== 'UnderNoNameYet/NoNameYet' || !/^[a-f0-9]{40}$/.test(verification.mainSha || '')) {
      block('GitHub verification record is invalid');
    } else {
      pass(`GitHub repository verified at ${verification.mainSha.slice(0, 12)}`);
    }
  } catch {
    block('GitHub verification record could not be parsed');
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  config: path.relative(root, configPath).replaceAll(path.sep, '/'),
  usingPreviewConfig: path.normalize(configPath) === path.normalize(previewConfigPath),
  ready: blockers.length === 0,
  releaseMode: config.paymentMode === 'closed' ? 'request-only candidate' : 'payment candidate',
  passed,
  warnings,
  blockers
};
fs.mkdirSync(path.join(root, 'build'), { recursive: true });
fs.writeFileSync(path.join(root, 'build/release-readiness.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (process.argv.includes('--strict') && blockers.length) process.exit(1);
