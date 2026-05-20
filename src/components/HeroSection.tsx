import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const mono = "'DM Mono', monospace";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <div ref={ref} className="relative w-full h-[85vh] md:h-screen overflow-hidden">
      {/* Desktop: untitled.webp (landscape), Mobile: portrait sculpture */}
      <motion.picture style={{ y }} className="absolute inset-0 w-full h-full">
        <source media="(min-width: 768px)" srcSet="/gallery/untitled.webp" />
        <img
          src="/hero-mobile.webp"
          alt="manuela zárate"
          className="w-full h-full object-cover"
        />
      </motion.picture>

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Artist name — DM Mono bold */}
      <motion.div
        className="absolute bottom-0 left-0 w-full px-5 md:px-10 pb-8 md:pb-12"
        style={{ opacity, y: textY }}
      >
        <h1
          className="text-white"
          style={{
            fontFamily: mono,
            fontWeight: 500,
            fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          manuela zárate
        </h1>
        <p
          className="text-white/60 mt-2"
          style={{
            fontFamily: mono,
            fontSize: "11px",
            fontWeight: 400,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Cerámica · Escultura
        </p>
      </motion.div>
    </div>
  );
}
