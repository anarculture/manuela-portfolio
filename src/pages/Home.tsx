import { motion } from "motion/react";
import galleryData from "../data/gallery.json";

type ImageItem = { src: string; alt: string; width: number; height: number };

// Clean up the alt text for display as caption
function formatCaption(alt: string): string {
  return alt
    .replace(/[-_]/g, " ")
    .replace(/\b(copy|img|maz|webp)\b/gi, "")
    .replace(/\d{5,}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function Gallery() {
  // Filter out hero/landing image
  const images = (galleryData as ImageItem[]).filter(
    (img) => !img.src.includes("landing")
  );

  return (
    <div className="w-full bg-white pt-10 md:pt-16 pb-16 md:pb-24 px-3 md:px-6 lg:px-8">
      <div
        className="max-w-[1400px] mx-auto"
        style={{
          columnCount: 2,
          columnGap: "12px",
        }}
      >
        <style>{`
          @media (min-width: 640px) {
            .gallery-columns { column-count: 3 !important; }
          }
          @media (min-width: 1024px) {
            .gallery-columns { column-count: 4 !important; }
          }
          @media (min-width: 1280px) {
            .gallery-columns { column-count: 5 !important; }
          }
        `}</style>
        <div
          className="gallery-columns"
          style={{
            columnCount: 2,
            columnGap: "14px",
          }}
        >
          {images.map((image, index) => {
            const caption = formatCaption(image.alt);
            return (
              <motion.div
                key={image.src}
                className="mb-4 break-inside-avoid"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: (index % 8) * 0.06,
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto block"
                  loading="lazy"
                  style={{
                    aspectRatio: `${image.width} / ${image.height}`,
                  }}
                />
                {caption && (
                  <p
                    className="text-[#888] mt-1.5 mb-2"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      fontWeight: 400,
                      lineHeight: 1.4,
                    }}
                  >
                    {caption}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
