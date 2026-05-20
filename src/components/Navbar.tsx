import { Link, useLocation } from 'react-router';

const mono = "DM Mono, Courier, monospace";

export function Navbar() {
  const location = useLocation();
  const isGallery = location.pathname === '/';
  const isAbout = location.pathname === '/about';

  return (
    <header className="sticky top-0 z-50 transition-colors duration-300 bg-white">
      <div className="flex justify-between items-start px-6 md:px-10 pt-8 pb-4">
        {/* Name */}
        <Link to="/" className="text-[#1a1a1a] tracking-[-0.02em] hover:opacity-70 transition-opacity">
          <h1
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
        </Link>

        {/* Desktop Nav */}
        <nav className="flex flex-col items-end md:items-start gap-1 pt-1">
          <Link 
            to="/" 
            className={`transition-colors ${isGallery ? 'text-[#999]' : 'text-[#333] hover:text-[#999]'}`}
            style={{ fontFamily: mono, fontSize: "13px", fontWeight: 400, lineHeight: 1.6 }}
          >
            Obras
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors ${isAbout ? 'text-[#999]' : 'text-[#333] hover:text-[#999]'}`}
            style={{ fontFamily: mono, fontSize: "13px", fontWeight: 400, lineHeight: 1.6 }}
          >
            CV
          </Link>
        </nav>
      </div>
    </header>
  );
}
