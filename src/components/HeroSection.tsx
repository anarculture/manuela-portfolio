import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const mono = "'DM Mono', monospace";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <div
      ref={ref}
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-5 md:px-10 bg-white"
    >
      {/* Centered hero image — ~60% viewport */}
      <motion.div
        className="w-full flex justify-center"
        style={{ y: imgY }}
      >
        <picture>
          <source media="(min-width: 768px)" srcSet="/hero-desktop.webp" />
          <img
            src="/hero-mobile.webp"
            alt="manuela zárate"
            className="block object-contain"
            style={{
              maxWidth: "60vw",
              maxHeight: "55vh",
              width: "auto",
              height: "auto",
            }}
          />
        </picture>
      </motion.div>


    </div>
  );
}
