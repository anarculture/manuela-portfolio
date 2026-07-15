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
const HERO_SRC = path.resolve('pics/670394457_18430436068188344_6106604958696401746_n.webp');
const HERO_OUT = path.resolve('public/hero-desktop.webp');

// Expos: per-exhibition flyer + photos, sourced from "fotos organizadas por expo/"
const EXPO_BASE = path.resolve('fotos organizadas por expo');
const EXPO_OUT = path.resolve('public/expos');
const EXPO_JSON = path.resolve('src/data/expos.json');
// flyer: static flyer image; photos: dir with expo photos; extra: extra flyers appended to carousel
const EXPOS = [
  { slug: 'picar-la-torta', flyer: 'flyers/individuales/475908772_18382756789109977_7656150332418247474_n.jpg', photos: 'picar la torta', extra: ['flyers/individuales/bg_manuela_z-rate_tarjeta_conversatorio_post_1080-1080px_v1.webp', 'flyers/individuales/img_7575.webp'] },
  { slug: 'el-guiso', flyer: 'flyers/individuales/649846573_18085401200240086_5546629869015172237_n.jpg', photos: 'El guiso', extra: ['flyers/individuales/622058016_18084368423164006_6032561812138075312_n.jpg', 'flyers/individuales/620729510_18093866770974828_2870712721248842701_n.jpg', 'flyers/individuales/628181065_18346747177234086_2339966967800601070_n.jpg'] },
  { slug: 'arqueologia-de-lo-encarnado', flyer: 'flyers/colectivas/nueva.jpg', photos: 'art week 2026 cdmx' },
  { slug: 'subasta-74', flyer: 'flyers/colectivas/653701760_18096296708068322_2910560731806592505_n.jpg' },
  { slug: 'creadoras', flyer: '622435421_18115053658720601_3431037816262540988_n.jpg', photos: 'Creadoras' },
  { slug: 'proxima-autorretratos', flyer: 'flyers/colectivas/650790021_18069985868243720_551346869165723899_n.webp', photos: 'Próxima', extra: ['flyers/colectivas/652864360_18102055045905570_7461788444524257565_n.webp'] },
  { slug: 'tierra-de-gracia', flyer: 'flyers/colectivas/617057528_18108387046646323_666347450774671982_n.jpg', extra: ['tierradegrcia.jpg'] },
  { slug: 'temporal-guadalajara', flyer: 'flyers/colectivas/WhatsApp Image 2026-05-20 at 2.07.13 AM.jpeg', photos: 'Guadalajara 2025' },
  { slug: 'pinta-miami-2024', flyer: 'flyers/colectivas/whatsapp-image-2024-11-21-at-14.12.34.webp', photos: 'Pinta Miami' },
];

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

async function processImage(inputPath, outputPath, maxWidth = 1600, quality = 80) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  let { width, height } = metadata;
  if (width > maxWidth) {
    image.resize({ width: maxWidth, withoutEnlargement: true });
    height = Math.round((maxWidth / width) * height);
    width = maxWidth;
  }
  await image.webp({ quality }).toFile(outputPath);
  const relPath = '/' + path.relative(path.resolve('public'), outputPath);
  return { src: relPath, alt: path.parse(inputPath).name, width, height };
}

async function processExpos() {
  const data = {};
  for (const expo of EXPOS) {
    const outDir = path.join(EXPO_OUT, expo.slug);
    ensureDir(outDir);
    const entry = { flyer: null, images: [] };

    if (expo.flyer) {
      entry.flyer = await processImage(path.join(EXPO_BASE, expo.flyer), path.join(outDir, 'flyer.webp'), 900, 85);
    }

    const photoFiles = [];
    if (expo.photos) {
      const dir = path.join(EXPO_BASE, expo.photos);
      for (const f of fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))) {
        photoFiles.push(path.join(dir, f));
      }
    }
    for (const f of expo.extra || []) photoFiles.push(path.join(EXPO_BASE, f));

    for (const inputPath of photoFiles) {
      const name = `${path.parse(inputPath).name}.webp`.replace(/\s+/g, '-').toLowerCase();
      try {
        entry.images.push(await processImage(inputPath, path.join(outDir, name)));
        console.log(`  ✓ ${expo.slug}/${name}`);
      } catch (err) {
        console.error(`  ✗ ${inputPath}: ${err.message}`);
      }
    }
    data[expo.slug] = entry;
  }
  fs.writeFileSync(EXPO_JSON, JSON.stringify(data, null, 2));
  console.log(`  → ${Object.keys(data).length} expos → expos.json`);
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

  // Expos
  console.log(`\nProcessing expos...`);
  await processExpos();

  console.log('\nDone.');
}

main().catch(console.error);
