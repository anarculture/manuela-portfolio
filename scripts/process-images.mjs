import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PICS_DIR = path.resolve('pics');
const OUT_DIR = path.resolve('public/gallery');
const DATA_FILE = path.resolve('src/data/gallery.json');

// Ensure output directories exist
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

async function processImages() {
  const files = fs.readdirSync(PICS_DIR);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  
  const galleryData = [];

  console.log(`Found ${imageFiles.length} images to process...`);

  for (const file of imageFiles) {
    const inputPath = path.join(PICS_DIR, file);
    const outputFileName = `${path.parse(file).name}.webp`.replace(/\s+/g, '-').toLowerCase();
    const outputPath = path.join(OUT_DIR, outputFileName);
    
    try {
      console.log(`Processing: ${file} -> ${outputFileName}`);
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      
      let width = metadata.width;
      let height = metadata.height;
      
      // Resize only if width is greater than 1920
      if (width > 1920) {
        image.resize({ width: 1920, withoutEnlargement: true });
        // Recalculate aspect ratio
        height = Math.round((1920 / metadata.width) * metadata.height);
        width = 1920;
      }
      
      await image.webp({ quality: 80 }).toFile(outputPath);
      
      galleryData.push({
        src: `/gallery/${outputFileName}`,
        alt: path.parse(file).name,
        width,
        height
      });
      
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(galleryData, null, 2));
  console.log('Finished processing images. Data saved to src/data/gallery.json');
}

processImages();
