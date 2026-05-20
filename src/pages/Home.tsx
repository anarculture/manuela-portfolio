import { motion } from "motion/react";
import galleryData from "../data/gallery.json";

// Classify by aspect ratio
type ImageItem = { src: string; alt: string; width: number; height: number };

function classifyImage(img: ImageItem): "landscape" | "portrait" | "square" {
  const ratio = img.width / img.height;
  if (ratio > 1.3) return "landscape";
  if (ratio < 0.75) return "portrait";
  return "square";
}

// Build editorial rows: landscape = full width, portraits/squares pair up
function buildRows(images: ImageItem[]): ImageItem[][] {
  const rows: ImageItem[][] = [];
  const queue = [...images];
  let i = 0;

  while (i < queue.length) {
    const img = queue[i];
    const type = classifyImage(img);

    if (type === "landscape") {
      rows.push([img]);
      i++;
    } else {
      // Try to pair with next non-landscape
      if (i + 1 < queue.length && classifyImage(queue[i + 1]) !== "landscape") {
        rows.push([img, queue[i + 1]]);
        i += 2;
      } else {
        rows.push([img]);
        i++;
      }
    }
  }
  return rows;
}

export default function Gallery() {
  // Filter out the hero/landing image from gallery
  const filtered = (galleryData as ImageItem[]).filter(
    (img) => !img.src.includes("landing")
  );
  const rows = buildRows(filtered);

  return (
    <div className="w-full bg-white py-16 md:py-24 px-3 md:px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-3 md:gap-4">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`flex flex-col ${row.length === 2 ? "md:flex-row" : ""} gap-3 md:gap-4`}
          >
            {row.map((image, imgIdx) => (
              <motion.div
                key={image.src}
                className={`overflow-hidden ${row.length === 2 ? "md:w-1/2" : "w-full"}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: imgIdx * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <div className="relative group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out"
                    loading="lazy"
                    style={{
                      maxHeight: row.length === 1 ? "75vh" : "60vh",
                      objectFit: "cover",
                    }}
                    onMouseEnter={(e) => {
                      if (window.matchMedia("(hover: hover)").matches) {
                        (e.target as HTMLElement).style.transform = "scale(1.02)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.transform = "scale(1)";
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
