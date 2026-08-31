#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const buildDir = path.join(root, 'build');
fs.mkdirSync(buildDir, { recursive: true });
const steps = [];
let failed = false;

function run(name, command, args = [], options = {}) {
  const started = Date.now();
  const result = spawnSync(command, args, { cwd: root, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  const expected = options.expectedStatus ?? 0;
  const ok = result.status === expected;
  steps.push({ name, ok, status: result.status, expectedStatus: expected, durationMs: Date.now() - started });
  if (!ok) {
    failed = true;
    console.error(`\n[${name}] failed\n${result.stdout || ''}${result.stderr || ''}`);
  } else {
    console.log(`[pass] ${name}`);
  }
  return result;
}

run('generate brand assets', 'python3', ['tools/generate-brand-assets.py']);
run('harden HTML', process.execPath, ['tools/harden-html.mjs']);
run('build preview config', process.execPath, ['tools/build-site-config.mjs']);
run('validate public sample report', process.execPath, ['tools/validate-report.mjs', 'public/assets/sample-report.json']);
run('generate fictional demo report', process.execPath, ['tools/run-matrix.mjs', '--mode=demo', '--out=build/demo-generated-report.json']);
run('reject live matrix mode', process.execPath, ['tools/run-matrix.mjs', '--mode=live'], { expectedStatus: 2 });

const scriptFiles = [];
function walkScripts(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'build', 'dist'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkScripts(full);
    else if (/\.(mjs|js)$/.test(entry.name)) scriptFiles.push(path.relative(root, full));
  }
}
walkScripts(root);
for (const file of scriptFiles) run(`syntax ${file}`, process.execPath, ['--check', file]);

run('browser and static QA', process.execPath, ['qa.mjs']);
run('build public-only artifact', process.execPath, ['tools/build-release.mjs']);
run('sync handoff media', process.execPath, ['tools/sync-handoff-assets.mjs']);
run('build handoff PDF', 'python3', ['tools/build-handoff-report.py']);
run('build source manifest', process.execPath, ['tools/build-source-manifest.mjs']);
run('documentation integrity', process.execPath, ['tools/check-docs.mjs']);
run('release-readiness analysis', process.execPath, ['tools/release-check.mjs']);

const textRoots = ['AGENTS.md', 'agent.md', 'README.md', 'ARCHITECTURE.md', 'ROADMAP.md', 'SECURITY.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'public', 'schema', 'tools', 'operations', 'handoff', 'config', 'package.json'];
const credentialPatterns = [
  /sk-[A-Za-z0-9]{20,}/,
  /BEGIN (?:RSA|OPENSSH|EC) PRIVATE KEY/,
  /service[_-]?role[^\n]{0,40}[A-Za-z0-9._-]{24,}/i,
  /@outlook\.com/i
];
function collectText(target) {
  const full = path.join(root, target);
  if (!fs.existsSync(full)) return [];
  const stat = fs.statSync(full);
  if (stat.isFile()) return [full];
  return fs.readdirSync(full, { withFileTypes: true }).flatMap(entry => collectText(path.join(target, entry.name)));
}
const secretHits = [];
for (const file of textRoots.flatMap(collectText)) {
  if (/\.(png|webm|svg|ico|zip|pdf)$/i.test(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  for (const pattern of credentialPatterns) {
    if (pattern.test(content)) secretHits.push({ file: path.relative(root, file), pattern: String(pattern) });
  }
}
steps.push({ name: 'credential and private-email scan', ok: secretHits.length === 0, hits: secretHits.length });
if (secretHits.length) {
  failed = true;
  console.error(JSON.stringify(secretHits, null, 2));
} else console.log('[pass] credential and private-email scan');

const summary = {
  generatedAt: new Date().toISOString(),
  ok: !failed,
  steps,
  note: 'Release strict remains a separate launch gate while preview blockers exist.'
};
fs.writeFileSync(path.join(buildDir, 'quality-gate.json'), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify({ ok: summary.ok, steps: steps.length, failed: steps.filter(step => !step.ok).map(step => step.name) }, null, 2));
if (failed) process.exit(1);
