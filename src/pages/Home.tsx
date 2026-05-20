import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Lightbox } from "../components/Lightbox";
import galleryData from "../data/gallery.json";

type ImageItem = { src: string; alt: string; width: number; height: number };

function formatCaption(alt: string): string {
  return alt
    .replace(/[-_]/g, " ")
    .replace(/\b(copy|img|maz|webp)\b/gi, "")
    .replace(/\d{5,}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function Gallery() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null);
  }, []);

  // Filter out hero/landing images
  const images = (galleryData as ImageItem[]).filter(
    (img) => !img.src.includes("landing") && !img.src.includes("untitled")
  );

  return (
    <>
      <div className="w-full bg-white pt-10 md:pt-16 pb-16 md:pb-24 px-3 md:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <style>{`
            .gallery-columns { column-count: 2; column-gap: 14px; }
            @media (min-width: 640px) { .gallery-columns { column-count: 3; } }
            @media (min-width: 1024px) { .gallery-columns { column-count: 4; } }
            @media (min-width: 1280px) { .gallery-columns { column-count: 5; } }
          `}</style>
          <div className="gallery-columns">
            {images.map((image, index) => {
              const caption = formatCaption(image.alt);
              return (
                <motion.div
                  key={image.src}
                  className="mb-4 break-inside-avoid cursor-pointer"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (index % 8) * 0.06 }}
                  onClick={() => openLightbox(image.src, image.alt)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto block transition-opacity duration-300 hover:opacity-80"
                    loading="lazy"
                    style={{ aspectRatio: `${image.width} / ${image.height}` }}
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

      <Lightbox src={lightboxSrc} alt={lightboxAlt} onClose={closeLightbox} />
    </>
  );
}
