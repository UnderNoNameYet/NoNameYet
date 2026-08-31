#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const source = path.join(root, 'public');
const target = path.join(root, 'dist');
const build = path.join(root, 'build');
fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(source, target, { recursive: true });

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const files = walk(target).sort();
const forbidden = files.filter(file => /(^|\/)(qa|test|handoff|operations|schema|tools|node_modules)(\/|\.|$)/i.test(path.relative(target, file)) || /\.(log|env|zip)$/i.test(file));
if (forbidden.length) throw new Error(`Forbidden files entered public artifact: ${forbidden.map(file => path.relative(target, file)).join(', ')}`);

const manifest = files.map(file => {
  const data = fs.readFileSync(file);
  return {
    path: path.relative(target, file).replaceAll(path.sep, '/'),
    bytes: data.length,
    sha256: crypto.createHash('sha256').update(data).digest('hex')
  };
});
fs.mkdirSync(build, { recursive: true });
fs.writeFileSync(path.join(build, 'release-manifest.json'), `${JSON.stringify({ generatedAt: new Date().toISOString(), root: 'public/', files: manifest }, null, 2)}\n`);
console.log(JSON.stringify({ output: target, files: manifest.length, bytes: manifest.reduce((sum, item) => sum + item.bytes, 0), forbidden: 0 }, null, 2));
