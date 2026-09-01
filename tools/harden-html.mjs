#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(root, 'public');
const origin = 'https://undernonameyet.github.io/NoNameYet';
const pages = {
  'index.html': {
    title: 'TenantProof — Prove every tenant boundary',
    description: 'TenantProof verifies and repairs Supabase tenant boundaries with synthetic identities, executed evidence, and regression tests.',
    imageAlt: 'TenantProof authorization boundary report preview'
  },
  'report.html': {
    title: 'Sample authorization report — TenantProof',
    description: 'Explore a fictional TenantProof authorization report or open a redacted report locally in your browser.',
    imageAlt: 'TenantProof redacted report viewer'
  },
  'methodology.html': {
    title: 'Methodology and authorization — TenantProof',
    description: 'TenantProof methodology, authorization requirements, scope boundaries, evidence handling, and remediation workflow.',
    imageAlt: 'TenantProof authorization verification methodology'
  },
  'sample-matrix.html': {
    title: 'Supabase tenant-boundary matrix template — TenantProof',
    description: 'Download a free fictional CSV template for mapping Supabase tenant, role, resource, operation, and expected authorization outcomes.',
    imageAlt: 'TenantProof tenant-boundary matrix template'
  },
  'request.html': {
    title: 'Scope a review — TenantProof',
    description: 'Create a private TenantProof scope brief without submitting credentials or customer data.',
    imageAlt: 'TenantProof private review scope worksheet'
  },
  'privacy.html': {
    title: 'Privacy — TenantProof',
    description: 'TenantProof pre-launch privacy and data-handling notice.',
    imageAlt: 'TenantProof privacy and data handling'
  },
  'terms.html': {
    title: 'Terms and limitations — TenantProof',
    description: 'TenantProof pre-launch terms, authorization requirements, and service limitations.',
    imageAlt: 'TenantProof service boundaries and limitations'
  }
};

const csp = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-src 'none'; worker-src 'none'; manifest-src 'self'";

for (const [fileName, meta] of Object.entries(pages)) {
  const file = path.join(publicDir, fileName);
  let html = fs.readFileSync(file, 'utf8');

  html = html
    .replace('<strong style="color:#ffaca1">4</strong>', '<strong class="text-fail-light">4</strong>')
    .replace('<strong style="color:#9fe1c2">11</strong>', '<strong class="text-pass-light">11</strong>')
    .replace('<p style="color:#9fb5ac">Production credentials', '<p class="dark-muted">Production credentials')
    .replace('<h2 style="font-size:clamp(2.1rem,4vw,3.4rem);margin-bottom:30px">', '<h2 class="faq-heading">')
    .replace('<h2 style="font-size:1.35rem">', '<h2 class="import-title">')
    .replace('<div class="button-row" style="margin-top:16px">', '<div class="button-row mt-16">')
    .replace('<section class="section-sm" style="padding-top:0">', '<section class="section-sm pt-0">')
    .replace('<div style="display:flex;align-items:center;gap:12px">', '<div class="toolbar-cluster">')
    .replace('<div class="notice" style="margin-top:18px">', '<div class="notice mt-18">')
    .replace('<div style="display:flex;gap:10px;flex-wrap:wrap">', '<div class="inline-actions">')
    .replace(/<script>const p=new URLSearchParams\(location\.search\)[\s\S]*?<\/script>/, '')
    .replaceAll('Pre-launch local MVP.', '<span data-launch-state>Pre-launch preview.</span>');

  if (!html.includes('data-contact-link') && fileName === 'request.html') {
    html = html.replace(
      '<button class="button" type="button" data-download-brief>Download brief</button>',
      '<button class="button" type="button" data-download-brief>Download brief</button><a class="button" data-contact-link href="request.html" target="_blank" rel="noopener noreferrer" hidden>Open secure intake</a>'
    );
  }

  if (!html.includes('assets/site-config.js')) {
    html = html.replace(/<script src="assets\/site\.js" defer><\/script>/g, '<script src="assets/site-config.js" defer></script><script src="assets/site.js" defer></script>');
  }

  if (!html.includes('data-production-meta')) {
    const canonical = fileName === 'index.html' ? `${origin}/` : `${origin}/${fileName}`;
    const metaBlock = `\n  <!-- data-production-meta -->\n  <meta http-equiv="Content-Security-Policy" content="${csp}">\n  <meta name="referrer" content="no-referrer">\n  <meta name="robots" content="index,follow,max-image-preview:large">\n  <meta property="og:type" content="website">\n  <meta property="og:site_name" content="TenantProof">\n  <meta property="og:title" content="${meta.title}">\n  <meta property="og:description" content="${meta.description}">\n  <meta property="og:url" content="${canonical}">\n  <meta property="og:image" content="${origin}/assets/tenantproof-og.png">\n  <meta property="og:image:width" content="1200">\n  <meta property="og:image:height" content="630">\n  <meta property="og:image:alt" content="${meta.imageAlt}">\n  <meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:title" content="${meta.title}">\n  <meta name="twitter:description" content="${meta.description}">\n  <meta name="twitter:image" content="${origin}/assets/tenantproof-og.png">\n  <link rel="canonical" href="${canonical}">\n  <link rel="manifest" href="assets/site.webmanifest">\n  <link rel="apple-touch-icon" href="assets/icon-192.png">`;
    html = html.replace(/(<meta name="viewport"[^>]*>)/, `$1${metaBlock}`);
  }

  fs.writeFileSync(file, html);
}

const remaining = [];
for (const fileName of Object.keys(pages)) {
  const html = fs.readFileSync(path.join(publicDir, fileName), 'utf8');
  if (/style=/.test(html)) remaining.push(`${fileName}: inline style`);
  if (/<script(?![^>]*src=)/s.test(html)) remaining.push(`${fileName}: inline script`);
  if (!html.includes('assets/site-config.js')) remaining.push(`${fileName}: missing site config`);
}
if (remaining.length) {
  console.error(remaining.join('\n'));
  process.exit(1);
}
console.log(JSON.stringify({ hardened: Object.keys(pages), csp, inlineStyles: 0, inlineScripts: 0 }, null, 2));
