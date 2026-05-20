import { useState, useEffect } from "react";

const mono = "'DM Mono', monospace";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkColor = scrolled ? "#333" : "rgba(255,255,255,0.9)";
  const nameColor = scrolled ? "#1a1a1a" : "#fff";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <nav className="flex items-baseline justify-between px-4 md:px-8 py-4 md:py-5">
        {/* Name — left */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="transition-colors duration-500 shrink-0"
          style={{
            fontFamily: mono,
            fontSize: "clamp(13px, 1.6vw, 16px)",
            fontWeight: 500,
            color: nameColor,
            letterSpacing: "-0.01em",
          }}
        >
          Manuela Zárate
        </a>

        {/* Center links */}
        <div className="hidden md:flex gap-5 items-baseline">
          <NavLink href="#obras" label="Obras" color={linkColor} />
          <NavLink href="#cv" label="CV" color={linkColor} />
        </div>

        {/* Right links */}
        <div className="flex gap-3 md:gap-5 items-baseline">
          <NavLink href="#obras" label="Obras" color={linkColor} className="md:hidden" />
          <NavLink href="#cv" label="CV" color={linkColor} className="md:hidden" />
          <NavLink
            href="https://www.instagram.com/manuelazarate_"
            label="Instagram"
            color={linkColor}
            external
          />
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  label,
  color,
  external,
  className = "",
}: {
  href: string;
  label: string;
  color: string;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`transition-colors duration-500 hover:opacity-60 ${className}`}
      style={{
        fontFamily: mono,
        fontSize: "12px",
        fontWeight: 400,
        color,
        textDecoration: "underline",
        textUnderlineOffset: "3px",
        textDecorationColor: "currentColor",
      }}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {
            onClick: (e: React.MouseEvent) => {
              e.preventDefault();
              const id = href.replace("#", "");
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            },
          })}
    >
      {label}
    </a>
  );
}
