import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PICS_DIR = path.resolve('pics');
const OUT_DIR = path.resolve('public/gallery');
const DATA_FILE = path.resolve('src/data/gallery.json');

// Flyer dirs
const FLYER_INDIV_SRC = path.resolve('pics/flyers/individuales');
const FLYER_COLECT_SRC = path.resolve('pics/flyers/colectivas');
const FLYER_INDIV_OUT = path.resolve('public/flyers/individuales');
const FLYER_COLECT_OUT = path.resolve('public/flyers/colectivas');
const FLYER_INDIV_JSON = path.resolve('src/data/flyers-individuales.json');
const FLYER_COLECT_JSON = path.resolve('src/data/flyers-colectivas.json');

// Hero
const HERO_SRC = path.resolve('pics/landing ocn sombra.png');
const HERO_OUT = path.resolve('public/hero.webp');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

[OUT_DIR, FLYER_INDIV_OUT, FLYER_COLECT_OUT, path.dirname(DATA_FILE)].forEach(ensureDir);

async function processDir(srcDir, outDir, maxWidth = 1920, quality = 80) {
  const files = fs.readdirSync(srcDir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  const data = [];

  for (const file of imageFiles) {
    const inputPath = path.join(srcDir, file);
    const outputFileName = `${path.parse(file).name}.webp`.replace(/\s+/g, '-').toLowerCase();
    const outputPath = path.join(outDir, outputFileName);

    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      let width = metadata.width;
      let height = metadata.height;

      if (width > maxWidth) {
        image.resize({ width: maxWidth, withoutEnlargement: true });
        height = Math.round((maxWidth / metadata.width) * metadata.height);
        width = maxWidth;
      }

      await image.webp({ quality }).toFile(outputPath);

      // Build relative path from public/
      const relPath = '/' + path.relative(path.resolve('public'), outputPath);
      data.push({ src: relPath, alt: path.parse(file).name, width, height });
      console.log(`  ✓ ${file} → ${outputFileName}`);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
  }
  return data;
}

async function processHero() {
  console.log('Processing hero image...');
  await sharp(HERO_SRC).webp({ quality: 85 }).toFile(HERO_OUT);
  console.log('  ✓ hero.webp');
}

async function main() {
  // Hero
  await processHero();

  // Gallery
  console.log(`\nProcessing gallery (${PICS_DIR})...`);
  const galleryData = await processDir(PICS_DIR, OUT_DIR);
  fs.writeFileSync(DATA_FILE, JSON.stringify(galleryData, null, 2));
  console.log(`  → ${galleryData.length} images → gallery.json`);

  // Flyers individuales
  console.log(`\nProcessing flyers/individuales...`);
  const indivData = await processDir(FLYER_INDIV_SRC, FLYER_INDIV_OUT, 800, 85);
  fs.writeFileSync(FLYER_INDIV_JSON, JSON.stringify(indivData, null, 2));
  console.log(`  → ${indivData.length} images → flyers-individuales.json`);

  // Flyers colectivas
  console.log(`\nProcessing flyers/colectivas...`);
  const colectData = await processDir(FLYER_COLECT_SRC, FLYER_COLECT_OUT, 800, 85);
  fs.writeFileSync(FLYER_COLECT_JSON, JSON.stringify(colectData, null, 2));
  console.log(`  → ${colectData.length} images → flyers-colectivas.json`);

  console.log('\nDone.');
}

main().catch(console.error);
