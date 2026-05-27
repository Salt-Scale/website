// One-time generator for /public/headshot-square.jpg.
// Run with: node scripts/generate-headshot-square.mjs
//
// Produces an 800x800 center-cropped, mozjpeg-encoded square crop of the
// founder headshot for use as the canonical Person.image in JSON-LD.

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const src = resolve(repoRoot, 'src/assets/headshot.jpeg');
const dest = resolve(repoRoot, 'public/headshot-square.jpg');

const SIZE = 800;
// Bias the crop toward the upper portion of the frame so the face stays in
// the square. Matches the same `origin-[50%_18%]` bias the on-page Image uses.
const VERTICAL_BIAS = 0.18;

const meta = await sharp(src).metadata();
const minSide = Math.min(meta.width, meta.height);
const left = Math.round((meta.width - minSide) / 2);
// Bias the vertical crop up so the face is centered, not the torso.
const top = Math.max(0, Math.round((meta.height - minSide) * VERTICAL_BIAS));

await mkdir(dirname(dest), { recursive: true });

await sharp(src)
  .extract({ left, top, width: minSide, height: minSide })
  .resize(SIZE, SIZE)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(dest);

console.log(`Wrote ${dest} (${SIZE}x${SIZE})`);
