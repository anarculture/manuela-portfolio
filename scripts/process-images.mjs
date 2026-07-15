import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

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

[EXPO_OUT, path.dirname(EXPO_JSON)].forEach(ensureDir);

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
  await processHero();

  console.log(`\nProcessing expos...`);
  await processExpos();

  console.log('\nDone.');
}

main().catch(console.error);
