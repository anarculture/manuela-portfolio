import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <div ref={ref} className="relative w-full min-h-screen bg-white">
      {/* Mobile: full-bleed cover | Desktop: centered with whitespace */}
      <motion.div
        className="w-full min-h-screen flex items-center justify-center md:px-10"
        style={{ y: imgY }}
      >
        <picture className="contents">
          <source media="(min-width: 768px)" srcSet="/hero-desktop.webp" />
          <img
            src="/hero-mobile.webp"
            alt="manuela zárate"
            className="
              w-full h-screen object-cover
              md:w-auto md:h-auto md:object-contain md:max-w-[60vw] md:max-h-[55vh]
            "
          />
        </picture>
      </motion.div>
    </div>
  );
}
