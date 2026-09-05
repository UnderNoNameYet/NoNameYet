#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root = path.resolve(import.meta.dirname, '..');
const output = path.join(root, 'handoff/SOURCE_MANIFEST.json');
const roots = ['AGENTS.md', 'agent.md', 'README.md', 'ARCHITECTURE.md', 'ROADMAP.md', 'SECURITY.md', 'CHANGELOG.md', 'CONTRIBUTING.md', '.gitignore', '.gitattributes', '.github', 'package.json', 'public', 'schema', 'tools', 'operations', 'handoff', 'config'];
const excluded = new Set([
  path.normalize(output),
  path.join(root, 'config/site.release.json'),
  path.join(root, 'config/pilot-readiness.json')
]);
function walk(relative) { const full = path.join(root, relative); if (!fs.existsSync(full) || excluded.has(path.normalize(full))) return []; const stat = fs.statSync(full); if (stat.isFile()) return [full]; return fs.readdirSync(full, { withFileTypes: true }).flatMap(entry => walk(path.join(relative, entry.name))); }
function role(relative) { if (relative.startsWith('public/')) return 'deployable-public'; if (relative.startsWith('handoff/assets/')) return 'handoff-media'; if (relative.startsWith('handoff/')) return 'handoff-source'; if (relative.startsWith('operations/')) return 'operations-private-template'; if (relative.startsWith('tools/') || relative === 'qa.mjs') return 'build-quality-tooling'; if (relative.startsWith('schema/')) return 'report-contract'; if (relative.startsWith('config/')) return 'release-configuration'; if (relative.startsWith('.github/')) return 'repository-workflow'; return 'repository-root'; }
const files = roots.flatMap(walk).filter((file, index, all) => all.indexOf(file) === index).sort().map(file => { const bytes = fs.readFileSync(file); const relative = path.relative(root, file).replaceAll(path.sep, '/'); return { path: relative, role: role(relative), bytes: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex') }; });
const grouped = files.reduce((result, file) => { result[file.role] = (result[file.role] || 0) + 1; return result; }, {});
const manifest = { generatedAt: new Date().toISOString(), product: 'TenantProof', version: '0.3.3', sourceOfTruth: 'AGENTS.md and handoff/README.md', deployRoot: 'public/', files: files.length, bytes: files.reduce((sum, file) => sum + file.bytes, 0), byRole: grouped, entries: files };
fs.writeFileSync(output, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ output, files: manifest.files, bytes: manifest.bytes, byRole: manifest.byRole }, null, 2));
