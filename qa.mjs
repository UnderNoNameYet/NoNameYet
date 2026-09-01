#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync, execFileSync } from 'node:child_process';
import { chromium } from 'playwright';

const root = path.resolve(import.meta.dirname);
const publicDir = path.join(root, 'public');
const buildDir = path.join(root, 'build');
fs.mkdirSync(buildDir, { recursive: true });
const base = 'http://127.0.0.1:4173';
const pages = ['index.html', 'report.html', 'methodology.html', 'sample-matrix.html', 'request.html', 'privacy.html', 'terms.html', '404.html'];
const results = {
  generatedAt: new Date().toISOString(),
  static: {},
  browser: {},
  screenshots: [],
  failures: []
};

function assert(condition, message) {
  if (!condition) {
    results.failures.push(message);
    throw new Error(message);
  }
}

async function waitForText(locator, expected, attempts = 50) {
  for (let index = 0; index < attempts; index += 1) {
    if ((await locator.textContent())?.includes(expected)) return;
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  throw new Error(`Timed out waiting for text: ${expected}`);
}

async function waitForCount(locator, expected, attempts = 50) {
  for (let index = 0; index < attempts; index += 1) {
    if (await locator.count() === expected) return;
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  throw new Error(`Timed out waiting for count: ${expected}`);
}

function staticChecks() {
  const required = [
    ...pages,
    'assets/styles.css', 'assets/site.js', 'assets/report.js', 'assets/site-config.js',
    'assets/sample-report.json', 'assets/sample-boundary-matrix.csv', 'assets/favicon.svg', 'assets/tenantproof-og.png',
    'assets/icon-192.png', 'assets/icon-512.png', 'assets/site.webmanifest',
    'robots.txt', 'sitemap.xml', '_headers', '.nojekyll', 'llms.txt'
  ];
  required.forEach(file => assert(fs.existsSync(path.join(publicDir, file)), `Missing ${file}`));

  const allPublic = [];
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(target); else allPublic.push(target);
    }
  }
  walk(publicDir);
  const publicText = allPublic.filter(file => !file.endsWith('.svg')).map(file => fs.readFileSync(file, 'utf8')).join('\n');
  const forbidden = [
    /hello@tenantproof/i,
    /example\.com/i,
    /lorem ipsum/i,
    /guaranteed security/i,
    /(?:is|becomes|makes? (?:an?|your)) unhackable/i,
    /100% secure/i,
    /typeform|calendly|stripe\.com\/pay/i
  ];
  forbidden.forEach(pattern => assert(!pattern.test(publicText), `Forbidden placeholder or claim: ${pattern}`));
  assert(!/<(?:script|img|iframe|source)[^>]+src=["']https?:\/\//i.test(publicText), 'Public build contains a remote executable or image asset');
  assert(!/<link[^>]+rel=["']stylesheet["'][^>]+href=["']https?:\/\//i.test(publicText), 'Public build contains a remote stylesheet');
  assert(!/localStorage|sessionStorage/i.test(publicText), 'Public scripts use browser persistence');
  assert(!/fetch\([^)]*method\s*:\s*["']POST/i.test(publicText), 'Public scripts contain a POST request');

  for (const pageName of pages) {
    const html = fs.readFileSync(path.join(publicDir, pageName), 'utf8');
    assert((html.match(/<h1\b/gi) || []).length === 1, `${pageName} must contain exactly one h1`);
    assert(/<main\b[^>]*id=["']main["']/i.test(html), `${pageName} is missing main landmark`);
    assert(/<title>[^<]+<\/title>/i.test(html), `${pageName} is missing a title`);
    assert(/Content-Security-Policy/i.test(html), `${pageName} is missing its CSP`);
    assert(!/style=/i.test(html), `${pageName} contains an inline style`);
    assert(!/<script(?![^>]*src=)/is.test(html), `${pageName} contains an inline script`);
    assert(/assets\/site-config\.js/i.test(html), `${pageName} is missing the external site config`);
    const hrefs = [...html.matchAll(/href=["']([^"'#?]+)(?:[?#][^"']*)?["']/gi)].map(match => match[1]);
    for (const href of hrefs) {
      if (/^(https?:|mailto:|tel:|data:|javascript:)/i.test(href)) continue;
      const destination = path.resolve(path.dirname(path.join(publicDir, pageName)), href);
      assert(destination.startsWith(publicDir), `${pageName} links outside public directory: ${href}`);
      assert(fs.existsSync(destination), `${pageName} has broken link: ${href}`);
    }
  }

  for (const script of ['assets/site.js', 'assets/report.js', 'assets/site-config.js', '../tools/validate-report.mjs', '../tools/run-matrix.mjs', '../tools/demo-adapter.mjs', '../tools/build-site-config.mjs', '../tools/release-check.mjs', '../tools/harden-html.mjs']) {
    const check = spawnSync(process.execPath, ['--check', path.resolve(publicDir, script)], { encoding: 'utf8' });
    assert(check.status === 0, `Syntax error in ${script}: ${check.stderr}`);
  }

  const validator = spawnSync(process.execPath, ['tools/validate-report.mjs', 'public/assets/sample-report.json'], { cwd: root, encoding: 'utf8' });
  assert(validator.status === 0, `Sample report validation failed: ${validator.stderr}`);
  const report = JSON.parse(fs.readFileSync(path.join(publicDir, 'assets/sample-report.json'), 'utf8'));
  assert(report.checks.length === 16, 'Sample report must contain 16 checks');
  assert(report.project.client.toLowerCase().includes('fictional'), 'Sample report must identify fictional client');

  const demo = spawnSync(process.execPath, ['tools/run-matrix.mjs', '--mode=demo', '--out=build/demo-generated-report.json'], { cwd: root, encoding: 'utf8' });
  assert(demo.status === 0, `Demo runner failed: ${demo.stderr}`);
  const locked = spawnSync(process.execPath, ['tools/run-matrix.mjs', '--mode=live'], { cwd: root, encoding: 'utf8' });
  assert(locked.status !== 0 && /locked to demo mode/i.test(locked.stderr), 'Runner did not reject live mode');

  results.static = {
    requiredFiles: required.length,
    htmlPages: pages.length,
    sampleChecks: report.checks.length,
    cspCompatiblePages: pages.length,
    productionSupportFiles: required.length - pages.length,
    remoteAssets: 0,
    browserStorageCalls: 0,
    postRequests: 0,
    demoRunnerLocked: true
  };
}

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${base}/index.html`);
      if (response.ok) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error('Local server did not become ready');
}

async function browserChecks() {
  const serverLog = fs.openSync(path.join(buildDir, 'qa-server.log'), 'w');
  const server = spawn('python3', ['-m', 'http.server', '4173', '--bind', '127.0.0.1', '--directory', publicDir], {
    stdio: ['ignore', serverLog, serverLog]
  });
  let browser;
  try {
    await waitForServer();
    const executablePath = execFileSync('which', ['chromium'], { encoding: 'utf8' }).trim();
    browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
    const context = await browser.newContext({ viewport: { width: 1440, height: 1050 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const errors = [];
    const externalRequests = [];
    page.on('console', message => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
    page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
    page.on('request', request => {
      const url = new URL(request.url());
      if (url.hostname !== '127.0.0.1') externalRequests.push(request.url());
    });

    const titles = {};
    for (const pageName of pages) {
      const response = await page.goto(`${base}/${pageName}`, { waitUntil: 'networkidle' });
      assert(response?.ok(), `${pageName} returned ${response?.status()}`);
      titles[pageName] = await page.title();
      assert((await page.locator('h1').count()) === 1, `${pageName} browser DOM has wrong h1 count`);
      assert((await page.locator('main').count()) === 1, `${pageName} browser DOM has wrong main count`);
    }

    await page.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
    await waitForText(page.locator('[data-metric="total"]'), '16');
    assert(await page.locator('[data-metric="pass"]').textContent() === '11', 'Before phase pass count should be 11');
    assert(await page.locator('[data-metric="fail"]').textContent() === '4', 'Before phase fail count should be 4');
    assert(await page.locator('[data-metric="unknown"]').textContent() === '1', 'Before phase unresolved count should be 1');
    await page.selectOption('[data-filter="status"]', 'fail');
    await waitForCount(page.locator('[data-report-rows] tr'), 4);
    await page.selectOption('[data-filter="status"]', '');
    await page.locator('[data-phase="after"]').click();
    await waitForText(page.locator('[data-metric="pass"]'), '15');
    assert(await page.locator('[data-metric="fail"]').textContent() === '0', 'After phase fail count should be 0');
    await page.locator('[data-report-rows] tr').first().click();
    assert((await page.locator('[data-evidence-panel]').innerText()).toLowerCase().includes('after'), 'Evidence panel did not render selected after state');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(buildDir, 'tenantproof-desktop.png'), fullPage: true });
    results.screenshots.push('build/tenantproof-desktop.png');

    await page.goto(`${base}/report.html`, { waitUntil: 'networkidle' });
    await waitForText(page.locator('[data-metric="total"]'), '16');
    await page.setInputFiles('[data-report-file]', path.join(publicDir, 'assets/sample-report.json'));
    await waitForText(page.locator('[data-report-notice]'), 'Opened');
    assert((await page.locator('[data-report-notice]').innerText()).includes('Nothing was uploaded'), 'Local import notice missing');

    await page.goto(`${base}/request.html?package=repair`, { waitUntil: 'networkidle' });
    assert(await page.locator('input[value="repair"]').isChecked(), 'Repair query parameter did not select package');
    assert(await page.locator('[data-contact-link]').isHidden(), 'Secure intake link must stay hidden in preview state');
    await page.getByRole('button', { name: 'Describe application' }).click();
    await page.locator('#app-name').fill('Fictional Boundary Lab');
    const requestUrlBeforeEnter = page.url();
    await page.locator('#app-name').press('Enter');
    assert(page.url() === requestUrlBeforeEnter, 'Pressing Enter submitted private scope data into the URL');
    await page.locator('#stack').selectOption({ label: 'Lovable + Supabase' });
    await page.locator('#environment').selectOption({ label: 'Staging available' });
    await page.locator('#tables').fill('14');
    await page.locator('#roles').fill('3');
    await page.locator('#rpc').selectOption({ label: 'Yes' });
    await page.locator('#storage').selectOption({ label: 'Yes' });
    await page.locator('#concern').fill('Managers must not access another organization’s projects.');
    await page.getByRole('button', { name: 'Prepare brief' }).click();
    await page.locator('#contact-name').fill('Sample Founder');
    await page.locator('#contact-email').fill('sample@invalid.test');
    const brief = await page.locator('[data-brief-output]').innerText();
    assert(brief.includes('Fictional Boundary Lab'), 'Scope brief missing application name');
    assert(brief.includes('Sample Founder'), 'Scope brief did not update local contact name');
    assert(brief.includes('has not been transmitted'), 'Scope brief missing non-transmission statement');

    await context.close();

    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const mobile = await mobileContext.newPage();
    const mobileErrors = [];
    mobile.on('console', message => { if (message.type() === 'error') mobileErrors.push(message.text()); });
    mobile.on('pageerror', error => mobileErrors.push(error.message));
    for (const pageName of ['index.html', 'report.html', 'sample-matrix.html', 'request.html']) {
      await mobile.goto(`${base}/${pageName}`, { waitUntil: 'networkidle' });
      const overflow = await mobile.evaluate(() => ({ width: window.innerWidth, scroll: document.documentElement.scrollWidth }));
      assert(overflow.scroll <= overflow.width + 1, `${pageName} has mobile horizontal overflow: ${JSON.stringify(overflow)}`);
    }
    await mobile.goto(`${base}/index.html`, { waitUntil: 'networkidle' });
    await mobile.locator('[data-menu-button]').click();
    assert(await mobile.locator('[data-nav-links]').getAttribute('data-open') === 'true', 'Mobile menu did not open');
    await mobile.locator('[data-menu-button]').click();
    assert(await mobile.locator('[data-nav-links]').getAttribute('data-open') === 'false', 'Mobile menu did not close');
    await mobile.evaluate(() => window.scrollTo(0, 0));
    await mobile.waitForTimeout(150);
    await mobile.screenshot({ path: path.join(buildDir, 'tenantproof-mobile.png'), fullPage: true });
    results.screenshots.push('build/tenantproof-mobile.png');
    await mobileContext.close();

    assert(errors.length === 0, `Desktop browser errors: ${errors.join(' | ')}`);
    assert(mobileErrors.length === 0, `Mobile browser errors: ${mobileErrors.join(' | ')}`);
    assert(externalRequests.length === 0, `Unexpected external requests: ${externalRequests.join(', ')}`);

    results.browser = {
      pagesLoaded: pages.length,
      titles,
      reportBefore: { total: 16, pass: 11, fail: 4, unresolved: 1 },
      reportAfter: { total: 16, pass: 15, fail: 0, unresolved: 1 },
      statusFilter: true,
      localFileImport: true,
      scopeWizard: true,
      mobileMenu: true,
      mobileOverflowPages: 0,
      consoleErrors: 0,
      externalRequests: 0
    };
  } finally {
    if (browser) await browser.close();
    server.kill('SIGTERM');
    fs.closeSync(serverLog);
  }
}

try {
  staticChecks();
  await browserChecks();
  results.ok = true;
  fs.writeFileSync(path.join(buildDir, 'qa-results.json'), `${JSON.stringify(results, null, 2)}\n`);
  console.log(JSON.stringify(results, null, 2));
} catch (error) {
  results.ok = false;
  results.error = error.stack || error.message;
  fs.writeFileSync(path.join(buildDir, 'qa-results.json'), `${JSON.stringify(results, null, 2)}\n`);
  console.error(JSON.stringify(results, null, 2));
  process.exit(1);
}
