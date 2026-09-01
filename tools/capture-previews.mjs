#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { chromium } from 'playwright';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'build');
fs.mkdirSync(out, { recursive: true });
const log = fs.openSync(path.join(out, 'preview-server.log'), 'w');
const server = spawn('python3', ['-m', 'http.server', '4174', '--bind', '127.0.0.1', '--directory', path.join(root, 'public')], { stdio: ['ignore', log, log] });
const base = 'http://127.0.0.1:4174';

async function ready() {
  for (let i = 0; i < 40; i += 1) {
    try { if ((await fetch(`${base}/index.html`)).ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error('Preview server did not start');
}

let browser;
try {
  await ready();
  browser = await chromium.launch({ executablePath: execFileSync('which', ['chromium'], { encoding: 'utf8' }).trim(), headless: true, args: ['--no-sandbox'] });
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 1050 }, deviceScaleFactor: 1 });
  const page = await desktop.newPage();
  await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(out, 'tenantproof-hero-desktop.png') });
  await page.goto(`${base}/report.html`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelector('[data-metric="total"]')?.textContent === '16');
  await page.screenshot({ path: path.join(out, 'tenantproof-report-desktop.png') });
  await page.goto(`${base}/sample-matrix.html`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(out, 'tenantproof-matrix-desktop.png'), fullPage: true });
  await desktop.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${base}/request.html?package=repair`, { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: path.join(out, 'tenantproof-request-mobile.png'), fullPage: true });
  await mobilePage.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: path.join(out, 'tenantproof-mobile.png'), fullPage: true });
  await mobile.close();
  console.log(JSON.stringify({ files: ['tenantproof-hero-desktop.png', 'tenantproof-report-desktop.png', 'tenantproof-matrix-desktop.png', 'tenantproof-request-mobile.png', 'tenantproof-mobile.png'] }, null, 2));
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
  fs.closeSync(log);
}
