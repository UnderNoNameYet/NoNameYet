#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const targetDir = path.join(root, 'handoff/assets');
const copies = [
  ['build/tenantproof-hero-desktop.png', '01-home-desktop.png'],
  ['build/tenantproof-report-desktop.png', '02-report-desktop.png'],
  ['build/tenantproof-request-mobile.png', '03-request-mobile.png'],
  ['build/tenantproof-mobile.png', '04-home-mobile-full.png'],
  ['public/assets/tenantproof-og.png', '05-social-preview.png'],
  ['public/assets/icon-192.png', '06-icon-192.png'],
  ['public/assets/icon-512.png', '07-icon-512.png'],
  ['build/tenantproof-matrix-desktop.png', '08-sample-matrix-desktop.png'],
  ['build/walkthrough.webm', 'walkthrough.webm']
];

fs.mkdirSync(targetDir, { recursive: true });
for (const [source, name] of copies) {
  const from = path.join(root, source);
  if (!fs.existsSync(from)) throw new Error(`Missing handoff asset source: ${source}`);
  fs.copyFileSync(from, path.join(targetDir, name));
}

const lines = copies.map(([, name]) => {
  const data = fs.readFileSync(path.join(targetDir, name));
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return `${hash}  ${name}`;
});
fs.writeFileSync(path.join(targetDir, 'SHA256SUMS'), `${lines.join('\n')}\n`);
console.log(JSON.stringify({ copied: copies.length, target: targetDir }, null, 2));
