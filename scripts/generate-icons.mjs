import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const SRC = join(process.cwd(), 'public', 'icons', 'icon-c-monogram.svg');

const SIZES = [16, 32, 48, 64, 180, 192, 512];

async function run() {
  const svg = await readFile(SRC);
  for (const size of SIZES) {
    const out = join(process.cwd(), 'public', `icon-${size}.png`);
    await sharp(svg).resize(size, size).png().toFile(out);
    console.log('Generated', out);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});


