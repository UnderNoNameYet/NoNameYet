#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const buildDir = path.join(root, 'build');
const output = path.join(buildDir, 'walkthrough.webm');
const inputs = [
  path.join(buildDir, 'tenantproof-hero-desktop.png'),
  path.join(buildDir, 'tenantproof-report-desktop.png'),
  path.join(buildDir, 'tenantproof-desktop.png'),
  path.join(buildDir, 'tenantproof-request-mobile.png'),
  path.join(root, 'public/assets/tenantproof-og.png')
];
for (const input of inputs) {
  if (!fs.existsSync(input)) throw new Error(`Missing walkthrough frame: ${path.relative(root, input)}`);
}

const args = ['-y', '-hide_banner', '-loglevel', 'error'];
for (const input of inputs) args.push('-loop', '1', '-t', '4', '-i', input);
args.push(
  '-filter_complex',
  [
    '[0:v]scale=1440:900:force_original_aspect_ratio=increase,crop=1440:900,setsar=1,fps=24,fade=t=in:st=0:d=0.35,fade=t=out:st=3.65:d=0.35[v0]',
    '[1:v]scale=1440:900:force_original_aspect_ratio=increase,crop=1440:900,setsar=1,fps=24,fade=t=in:st=0:d=0.35,fade=t=out:st=3.65:d=0.35[v1]',
    '[2:v]crop=1440:900:0:2600,setsar=1,fps=24,fade=t=in:st=0:d=0.35,fade=t=out:st=3.65:d=0.35[v2]',
    '[3:v]scale=1440:900:force_original_aspect_ratio=decrease,pad=1440:900:(ow-iw)/2:(oh-ih)/2:color=0x0c1815,setsar=1,fps=24,fade=t=in:st=0:d=0.35,fade=t=out:st=3.65:d=0.35[v3]',
    '[4:v]scale=1440:900:force_original_aspect_ratio=decrease,pad=1440:900:(ow-iw)/2:(oh-ih)/2:color=0x0c1815,setsar=1,fps=24,fade=t=in:st=0:d=0.35,fade=t=out:st=3.65:d=0.35[v4]',
    '[v0][v1][v2][v3][v4]concat=n=5:v=1:a=0[out]'
  ].join(';'),
  '-map', '[out]',
  '-an',
  '-c:v', 'libvpx-vp9',
  '-crf', '34',
  '-b:v', '0',
  '-row-mt', '1',
  '-pix_fmt', 'yuv420p',
  output
);

const result = spawnSync('ffmpeg', args, { cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
if (result.status !== 0) throw new Error(`ffmpeg failed:\n${result.stderr || result.stdout}`);
const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,size', '-show_entries', 'stream=width,height,codec_name,r_frame_rate', '-of', 'json', output], { encoding: 'utf8' });
if (probe.status !== 0) throw new Error(`ffprobe failed: ${probe.stderr}`);
console.log(JSON.stringify({ output, bytes: fs.statSync(output).size, probe: JSON.parse(probe.stdout) }, null, 2));
