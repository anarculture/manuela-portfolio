import { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface FlyerCarouselProps {
  images: { src: string; alt: string }[];
}

export function FlyerCarousel({ images }: FlyerCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  // Force reInit when images change
  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, images]);

  if (!images.length) return null;

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-sm" ref={emblaRef}>
        <div className="flex">
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-[0_0_100%] min-w-0"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-contain"
                loading="lazy"
                style={{ maxHeight: "420px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#ccc] hover:bg-[#666] transition-colors"
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
