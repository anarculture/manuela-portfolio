import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Parallax background */}
      <motion.img
        src="/hero.webp"
        alt="Manuela Zárate"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ y }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {/* Name at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 w-full px-6 md:px-10 pb-10 md:pb-16"
        style={{ opacity }}
      >
        <h1
          className="text-white tracking-[-0.03em]"
          style={{
            fontFamily: "Inter, Helvetica, Arial, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.8rem, 8vw, 7rem)",
            lineHeight: 0.9,
          }}
        >
          manuela
          <br />
          zárate
        </h1>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-[1px] h-8 bg-white/50"
        />
      </motion.div>
    </div>
  );
}
