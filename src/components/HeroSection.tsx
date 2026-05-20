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

      {/* Name below image */}
      <motion.div
        className="mt-6 text-center"
        style={{ opacity }}
      >
        <h1
          className="text-[#1a1a1a]"
          style={{
            fontFamily: mono,
            fontWeight: 500,
            fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          manuela zárate
        </h1>
        <p
          className="text-[#999] mt-2"
          style={{
            fontFamily: mono,
            fontSize: "11px",
            fontWeight: 400,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          cerámica · escultura
        </p>
      </motion.div>
    </div>
  );
}
