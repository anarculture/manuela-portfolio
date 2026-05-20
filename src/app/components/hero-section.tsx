import heroImage from "figma:asset/cbf363b168e8a82740169d373e1a323b13fba144.png";

export function HeroSection() {
  return (
    <section className="w-full bg-white pt-4 pb-8">
      <div className="flex justify-center px-8 md:px-16 pb-4">
        <img
          src={heroImage}
          alt="Obra de Manuela Zárate"
          className="max-w-full max-h-[60vh] object-contain"
        />
      </div>
    </section>
  );
}
