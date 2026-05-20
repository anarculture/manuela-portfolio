import { useState, useEffect } from "react";

const mono = "DM Mono, Courier, monospace";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="flex justify-between items-start px-4 md:px-10 pt-5 md:pt-8 pb-3 md:pb-4">
        {/* Name — hidden when over hero (hero has its own big name) */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="transition-all duration-500"
          style={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? "auto" : "none" }}
        >
          <span
            className="tracking-[-0.02em]"
            style={{
              fontFamily: "Inter, Helvetica, Arial, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              lineHeight: 1,
              color: scrolled ? "#1a1a1a" : "#fff",
              transition: "color 0.5s",
            }}
          >
            manuela zárate
          </span>
        </a>

        {/* Nav links */}
        <nav className="flex flex-col items-end gap-0.5 pt-0.5">
          <a
            href="#obras"
            className="transition-colors duration-500"
            style={{
              fontFamily: mono,
              fontSize: "13px",
              fontWeight: 400,
              lineHeight: 1.6,
              color: scrolled ? "#333" : "rgba(255,255,255,0.85)",
            }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("obras")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Obras
          </a>
          <a
            href="#cv"
            className="transition-colors duration-500"
            style={{
              fontFamily: mono,
              fontSize: "13px",
              fontWeight: 400,
              lineHeight: 1.6,
              color: scrolled ? "#333" : "rgba(255,255,255,0.85)",
            }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("cv")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            CV
          </a>
        </nav>
      </div>
    </header>
  );
}
