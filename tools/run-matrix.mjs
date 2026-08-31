#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { validateReport } from './validate-report.mjs';

function argument(name, fallback = '') {
  const prefix = `--${name}=`;
  const inline = process.argv.find(value => value.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

const mode = argument('mode');
if (mode !== 'demo') {
  console.error('This MVP runner is intentionally locked to demo mode. Real environment adapters require a separately authorized engagement and are not accepted by the public site.');
  process.exit(2);
}

const root = path.resolve(import.meta.dirname, '..');
const definitionPath = path.resolve(argument('definition', path.join(root, 'tools/demo-definition.json')));
const adapterPath = path.resolve(argument('adapter', path.join(root, 'tools/demo-adapter.mjs')));
const outPath = path.resolve(argument('out', path.join(root, 'build/demo-generated-report.json')));

const definition = JSON.parse(fs.readFileSync(definitionPath, 'utf8'));
const adapter = await import(pathToFileURL(adapterPath));
if (typeof adapter.executeScenario !== 'function') throw new Error('Adapter must export executeScenario(scenario, phase).');

const checks = [];
for (const scenario of definition.scenarios) {
  const before = await adapter.executeScenario(scenario, 'before');
  const after = await adapter.executeScenario(scenario, 'after');
  checks.push({ ...scenario, before, after });
}

const report = {
  schemaVersion: '1.0',
  reportId: `TP-LAB-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}`,
  project: definition.project,
  scope: { ...definition.scope, generatedAt: new Date().toISOString() },
  checks
};
const errors = validateReport(report);
if (errors.length) throw new Error(`Generated report failed validation:\n${errors.join('\n')}`);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ mode, report: outPath, checks: checks.length, note: 'Fictional local fixture only' }, null, 2));
