import { useState, useEffect } from "react";

const mono = "DM Mono, Courier, monospace";

const navItems = [
  { label: "Obras", href: "#obras" },
  { label: "Biografia", href: "#biografia" },
  { label: "Exposiciones", href: "#exposiciones" },
  { label: "Publicaciones", href: "#publicaciones" },
  { label: "Contacto", href: "#contacto" },
];

export function StickyHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-300"
      style={{ backgroundColor: scrolled ? "transparent" : "white" }}
    >
      <div
        className="flex justify-between items-start px-6 md:px-10 pt-8 pb-4 transition-opacity duration-300"
        style={{ pointerEvents: scrolled ? "none" : "auto" }}
      >
        {/* Name */}
        <h1
          className="text-[#1a1a1a] tracking-[-0.02em]"
          style={{
            fontFamily: "Inter, Helvetica, Arial, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            lineHeight: 0.95,
          }}
        >
          manuela
          <br />
          z&aacute;rate
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-col items-start gap-0 pt-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-[#333] hover:text-[#999] transition-colors"
              style={{
                fontFamily: mono,
                fontSize: "13px",
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#333] pt-2 bg-transparent border-0 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col items-start px-6 pb-4 gap-0.5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-[#333]"
              style={{
                fontFamily: mono,
                fontSize: "13px",
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}