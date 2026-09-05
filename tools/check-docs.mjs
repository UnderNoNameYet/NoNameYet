#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const buildDir = path.join(root, 'build');
const required = [
  'AGENTS.md', 'agent.md', 'README.md', 'ARCHITECTURE.md', 'ROADMAP.md', 'SECURITY.md', 'CHANGELOG.md', 'CONTRIBUTING.md', '.github/pull_request_template.md',
  'handoff/README.md', 'handoff/HANDOFF_REPORT.md', 'handoff/PRODUCT_SPEC.md', 'handoff/PAGE_AND_SECTION_SPECS.md', 'handoff/UX_DESIGN_SYSTEM.md', 'handoff/TECHNICAL_ARCHITECTURE.md', 'handoff/FEATURE_AND_FUNCTION_INVENTORY.md', 'handoff/REPORT_ENGINE_SPEC.md', 'handoff/SECURITY_PRIVACY_AND_SAFETY.md', 'handoff/OPERATIONS_AND_INTAKE.md', 'handoff/COMMERCIAL_AND_PAYMENTS.md', 'handoff/GTM_AND_VALIDATION.md', 'handoff/ROADMAP_V1_V2_V3.md', 'handoff/DECISION_LOG.md', 'handoff/REJECTED_IDEAS_AND_LEARNINGS.md', 'handoff/QUALITY_GATES.md', 'handoff/RELEASE_AND_REPOSITORY.md', 'handoff/AI_CONTINUATION.md', 'handoff/CURRENT_STATE.json', 'handoff/ASSET_MANIFEST.md', 'handoff/GITHUB_PUBLICATION.md',
  'operations/pilot-readiness-gate.md', 'config/pilot-readiness.example.json', 'tools/check-pilot-readiness.mjs', 'tools/build-sample-report-pdf.py',
  'handoff/assets/01-home-desktop.png', 'handoff/assets/02-report-desktop.png', 'handoff/assets/03-request-mobile.png', 'handoff/assets/04-home-mobile-full.png', 'handoff/assets/05-social-preview.png', 'handoff/assets/06-icon-192.png', 'handoff/assets/07-icon-512.png', 'handoff/assets/08-sample-matrix-desktop.png', 'handoff/assets/walkthrough.webm', 'handoff/assets/SHA256SUMS', 'handoff/HANDOFF_REPORT.pdf', 'handoff/SOURCE_MANIFEST.json'
];
const failures = [], warnings = [], checks = [];
const add = (condition, message) => { checks.push({ message, ok: Boolean(condition) }); if (!condition) failures.push(message); };
for (const relative of required) add(fs.existsSync(path.join(root, relative)), `Required handoff file exists: ${relative}`);
function walk(dir) { if (!fs.existsSync(dir)) return []; return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => { const full = path.join(dir, entry.name); return entry.isDirectory() ? walk(full) : [full]; }); }
const markdownFiles = [...fs.readdirSync(root, { withFileTypes: true }).filter(entry => entry.isFile() && entry.name.endsWith('.md')).map(entry => path.join(root, entry.name)), ...walk(path.join(root, 'handoff')).filter(file => file.endsWith('.md')), ...walk(path.join(root, 'operations')).filter(file => file.endsWith('.md')), path.join(root, '.github/pull_request_template.md')].filter((file, index, files) => fs.existsSync(file) && files.indexOf(file) === index);
for (const file of markdownFiles) { const source = fs.readFileSync(file, 'utf8'); const withoutFences = source.replace(/```[\s\S]*?```/g, ''); const links = [...withoutFences.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)].map(match => match[1].trim()); for (const target of links) { if (!target || /^(https?:|mailto:|tel:|#)/i.test(target)) continue; const clean = decodeURIComponent(target.split('#')[0].split('?')[0]); if (!clean) continue; const destination = path.resolve(path.dirname(file), clean); add(destination.startsWith(root) && fs.existsSync(destination), `Internal link resolves: ${path.relative(root, file)} -> ${target}`); } }
const agents = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8');
add(agents.includes('Prove that Customer A cannot read or modify Customer B’s data.'), 'AGENTS contains canonical promise');
add(agents.includes('Never fabricate buyers'), 'AGENTS contains truth rules');
add(agents.includes('publish **only** `public/`'), 'AGENTS defines deploy boundary');
const current = JSON.parse(fs.readFileSync(path.join(root, 'handoff/CURRENT_STATE.json'), 'utf8'));
add(current.product === 'TenantBoundary', 'Current state identifies TenantBoundary');
add(current.repository?.publicProductDeployed === true && /^[a-f0-9]{40}$/.test(current.repository?.mergeSha || '') && current.repository?.workflowConclusion === 'success' && current.repository?.deployedUrl === 'https://undernonameyet.github.io/NoNameYet/', 'Current state records verified GitHub Pages deployment');
add(current.commercialTruth?.customers === 0 && current.commercialTruth?.revenueUsd === 0, 'Current state preserves commercial truth');
add(current.safety?.writtenAuthorizationRequired === true, 'Current state requires authorization');
const sourceManifest = JSON.parse(fs.readFileSync(path.join(root, 'handoff/SOURCE_MANIFEST.json'), 'utf8'));
add(sourceManifest.product === 'TenantBoundary' && sourceManifest.version === '0.4.0', 'Source manifest identifies handoff release');
add(sourceManifest.deployRoot === 'public/' && sourceManifest.files >= 60, 'Source manifest covers repository and public-only deploy root');
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
add(packageJson.version === '0.4.0', 'Package version matches handoff release');
add(Boolean(packageJson.scripts?.['sample:pdf']), 'Package exposes fictional sample PDF generation');
add(Boolean(packageJson.scripts?.quality), 'Package exposes quality command');
add(Boolean(packageJson.scripts?.['docs:check']), 'Package exposes documentation check');
add(Boolean(packageJson.scripts?.['release:bundle']), 'Package exposes public-only release builder');
add(Boolean(packageJson.scripts?.['pilot:check']), 'Package exposes pilot readiness check');
add(Boolean(packageJson.scripts?.['pilot:strict']), 'Package exposes strict first-pilot gate');
add(Boolean(packageJson.scripts?.['commercial:strict']), 'Package exposes combined commercial gate');
const pilotTemplate = JSON.parse(fs.readFileSync(path.join(root, 'config/pilot-readiness.example.json'), 'utf8'));
add(pilotTemplate.schemaVersion === 1 && Object.values(pilotTemplate.gates || {}).length === 12, 'Pilot readiness template contains all gates');
add(Object.values(pilotTemplate.gates || {}).every(gate => gate?.status === 'blocked'), 'Committed pilot readiness template remains blocked');
const gitignore = fs.readFileSync(path.join(root, '.gitignore'), 'utf8');
add(gitignore.split(/\r?\n/).includes('config/pilot-readiness.json'), 'Private pilot readiness record is ignored');
function pngDimensions(file) { const data = fs.readFileSync(file); if (data.toString('ascii', 1, 4) !== 'PNG') return null; return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) }; }
const dimensions = { '05-social-preview.png': [1200, 630], '06-icon-192.png': [192, 192], '07-icon-512.png': [512, 512] };
for (const [name, expected] of Object.entries(dimensions)) { const file = path.join(root, 'handoff/assets', name); if (!fs.existsSync(file)) continue; const actual = pngDimensions(file); add(actual?.width === expected[0] && actual?.height === expected[1], `${name} dimensions are ${expected[0]}x${expected[1]}`); }
const video = path.join(root, 'handoff/assets/walkthrough.webm'); if (fs.existsSync(video)) add(fs.statSync(video).size > 100_000, 'Walkthrough video is non-empty');
const handoffPdf = path.join(root, 'handoff/HANDOFF_REPORT.pdf'); if (fs.existsSync(handoffPdf)) add(fs.statSync(handoffPdf).size > 50_000, 'Handoff PDF is non-empty');
const sessionUrlPattern = /\{\{(?:notion|page|database|data-source|view|user|agent|file|thread|integration)-\d+\}\}/i;
for (const file of [...markdownFiles, path.join(root, 'handoff/CURRENT_STATE.json')]) { const source = fs.readFileSync(file, 'utf8'); add(!sessionUrlPattern.test(source), `No session-only compressed URL in ${path.relative(root, file)}`); }
const large = walk(path.join(root, 'handoff')).filter(file => fs.statSync(file).size > 20_000_000);
add(large.length === 0, 'No handoff file exceeds 20 MB');
fs.mkdirSync(buildDir, { recursive: true });
const result = { generatedAt: new Date().toISOString(), checkedFiles: required.length, markdownFiles: markdownFiles.length, checks: checks.length, warnings, failures, ok: failures.length === 0 };
fs.writeFileSync(path.join(buildDir, 'docs-check.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exit(1);
