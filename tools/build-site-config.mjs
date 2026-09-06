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
const configPath = path.resolve(arg('config', path.join(root, 'config/site.preview.json')));
const outputPath = path.resolve(arg('output', path.join(root, 'public/assets/site-config.js')));
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const errors = [];

if (!['preview', 'ready'].includes(config.state)) errors.push('state must be preview or ready');
try {
  const origin = new URL(config.publicOrigin);
  if (origin.protocol !== 'https:') errors.push('publicOrigin must use HTTPS');
  if (!config.publicOrigin.endsWith('/')) errors.push('publicOrigin must end with /');
} catch { errors.push('publicOrigin must be an absolute URL'); }
if (!['closed', 'invoice', 'payment_link'].includes(config.paymentMode)) errors.push('paymentMode must be closed, invoice, or payment_link');
if (config.paymentMode === 'payment_link' && !/^https:\/\//.test(config.paymentUrl || '')) errors.push('paymentUrl must be HTTPS for payment_link mode');

if (config.state === 'ready') {
  if (!/^https:\/\//.test(config.contactUrl || '')) errors.push('ready state requires an HTTPS contactUrl');
  if (!String(config.operatorDisplayName || '').trim()) errors.push('ready state requires operatorDisplayName');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail || '')) errors.push('ready state requires a valid contactEmail');
  if (!Number.isInteger(config.evidenceRetentionDays) || config.evidenceRetentionDays < 1 || config.evidenceRetentionDays > 365) errors.push('ready state requires evidenceRetentionDays from 1 to 365');
}

if (errors.length) {
  console.error(JSON.stringify({ valid: false, config: configPath, errors }, null, 2));
  process.exit(1);
}
const serialized = JSON.stringify(config, null, 2).replaceAll('<', '\\u003c');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `window.TENANTBOUNDARY_CONFIG = Object.freeze(${serialized});\n`);
console.log(JSON.stringify({ valid: true, state: config.state, output: outputPath, paymentMode: config.paymentMode }, null, 2));
