import { motion } from "motion/react";
import { FlyerCarousel } from "../../components/FlyerCarousel";
import expos from "../../data/expos.json";

const mono = "DM Mono, Courier, monospace";
const monoSize = "13px";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function SectionRow({
  label,
  children,
  id,
}: {
  label: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      className="border-t border-[#e0e0e0] py-12 md:py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 flex flex-col md:flex-row gap-6 md:gap-0">
        <div className="md:w-[240px] shrink-0">
          <span
            className="text-[#333]"
            style={{
              fontFamily: mono,
              fontSize: monoSize,
              fontWeight: 400,
            }}
          >
            {label}
          </span>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </motion.div>
  );
}

export function BiografiaSection() {
  return (
    <SectionRow label="Biografía" id="biografia">
      <div className="space-y-8">
        <p
          className="text-[#333]"
          style={{
            fontFamily: mono,
            fontSize: monoSize,
            fontWeight: 400,
            lineHeight: 1.7,
          }}
        >
          1994, San Fernando, VE
          <br />
          Vive y trabaja entre Caracas – CDMX
        </p>
        <p
          className="text-[#333]"
          style={{
            fontFamily: mono,
            fontSize: monoSize,
            fontWeight: 400,
            lineHeight: 1.7,
          }}
        >
          Egresada de artes visuales mención Cerámica (UNEARTE, Caracas 2024). Investiga las intersecciones entre la historia colonial y republicana en las zonas intertropicales americanas, con énfasis en la cerámica, creando un diálogo multimedia que reflexiona críticamente sobre mitos históricos, y acontecimientos contemporáneos.
        </p>
        <p
          className="text-[#333]"
          style={{
            fontFamily: mono,
            fontSize: monoSize,
            fontWeight: 400,
            lineHeight: 1.7,
          }}
        >
          El desarrollo de este cuerpo de trabajo fija su mirada en tótems, venus, relieves y figuras antropomorfas, construyendo un atlas de las migraciones e intercambios simbólicos, la ecología, el cuerpo, lo glocal, y las cosmogonías desde lo femenino.
        </p>
        <p
          className="text-[#333]"
          style={{
            fontFamily: mono,
            fontSize: monoSize,
            fontWeight: 400,
            lineHeight: 1.7,
          }}
        >
          Actualmente, está desarrollando una serie de reflexiones alrededor de Potosí, una investigación histórica de la minería en América Latina y su impacto en el paisaje.
        </p>
      </div>
    </SectionRow>
  );
}

export function EducacionSection() {
  const education = [
    {
      lines: ["2025", "Premio GEGO, Artista Emergente", "Fundación Gego, CAV, AICA y AVAP"],
    },
    {
      lines: ["2023", "Licenciatura en Artes Plásticas mención Cerámica", "Universidad Experimental de las Artes (UNEARTE)", "Caracas, VE"],
    },
  ];

  return (
    <SectionRow label="Formación y Premios" id="educacion">
      <div className="space-y-6">
        {education.map((item, i) => (
          <div key={i}>
            {item.lines.map((line, j) => (
              <p
                key={j}
                className="text-[#333]"
                style={{
                  fontFamily: mono,
                  fontSize: monoSize,
                  fontWeight: 400,
                  lineHeight: 1.7,
                }}
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </SectionRow>
  );
}

interface ShowEntry {
  year: string;
  title: string;
  gallery: string;
  location: string;
  catalogUrl?: string;
  slug?: keyof typeof expos;
}

function ExpoMedia({ slug }: { slug: keyof typeof expos }) {
  const expo = expos[slug];
  if (!expo || (!expo.flyer && expo.images.length === 0)) return null;
  return (
    <div className="flex flex-col md:flex-row gap-5 md:gap-8 mt-4 items-start">
      {expo.flyer && (
        <img
          src={expo.flyer.src}
          alt={expo.flyer.alt}
          loading="lazy"
          className="w-full md:w-[300px] shrink-0 h-auto rounded-sm"
          style={{ aspectRatio: `${expo.flyer.width} / ${expo.flyer.height}` }}
        />
      )}
      {expo.images.length > 0 && (
        <div className="flex-1 w-full min-w-0">
          <FlyerCarousel images={expo.images} />
        </div>
      )}
    </div>
  );
}

function ShowsList({ shows }: { shows: ShowEntry[] }) {
  return (
    <div className="space-y-10">
      {shows.map((show, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <p
            className="text-[#333]"
            style={{ fontFamily: mono, fontSize: monoSize, fontWeight: 400, lineHeight: 1.7 }}
          >
            {show.year}
          </p>
          <p
            className="text-[#333]"
            style={{ fontFamily: mono, fontSize: monoSize, fontWeight: 400, lineHeight: 1.7 }}
          >
            {show.title}
          </p>
          {show.gallery && (
            <p
              className="text-[#333]"
              style={{ fontFamily: mono, fontSize: monoSize, fontWeight: 400, lineHeight: 1.7 }}
            >
              {show.gallery}
            </p>
          )}
          {show.location && (
            <p
              className="text-[#333]"
              style={{ fontFamily: mono, fontSize: monoSize, fontWeight: 400, lineHeight: 1.7 }}
            >
              {show.location}
            </p>
          )}
          {show.catalogUrl && (
            <a
              href={show.catalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 text-[#666] hover:text-[#333] transition-colors"
              style={{ fontFamily: mono, fontSize: monoSize, fontWeight: 400, textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Catálogo ↗
            </a>
          )}
          {show.slug && <ExpoMedia slug={show.slug} />}
        </motion.div>
      ))}
    </div>
  );
}

export function SoloShowsSection() {
  const shows: ShowEntry[] = [
    { year: "2024", title: "Picar la torta", gallery: "Galería Beatriz Gil", location: "Caracas, Venezuela", catalogUrl: "http://website-artlogicwebsite1873.artlogic.net/usr/library/documents/catalogo/bg_manuela_z-rate_2024_cat-logo_digital_rgb_final.pdf", slug: "picar-la-torta" },
    { year: "2021", title: "El Guiso", gallery: "Galería Abra Caracas", location: "Caracas, Venezuela", catalogUrl: "https://abracaracas.com/wp-content/uploads/2021/09/HojaSala_ELGUISO_MANUELAZARATE_WEB.pdf", slug: "el-guiso" },
  ];

  return (
    <SectionRow label="Exposiciones Individuales" id="exposiciones">
      <ShowsList shows={shows} />
    </SectionRow>
  );
}

export function GroupShowsSection() {
  const shows: ShowEntry[] = [
    { year: "2026", title: "Arqueología de lo encarnado", gallery: "Mooni", location: "Art Week CDMX", slug: "arqueologia-de-lo-encarnado" },
    { year: "2025", title: "Cerámica Ayer y hoy", gallery: "Galería de Arte Nacional", location: "" },
    { year: "2024", title: "24º Salón Jóvenes Con FIA", gallery: "", location: "" },
    { year: "2024", title: "Materia de fondo", gallery: "Cabinet Gallery", location: "Curaduría Tahia Rivero" },
    { year: "2023", title: "Subasta 74", gallery: "Sala Mendoza", location: "", slug: "subasta-74" },
    { year: "2023", title: "Concurso de Arte Contemporáneo CREADORAS", gallery: "CAF, Volante Studio y GBG Arts", location: "", slug: "creadoras" },
    { year: "2022", title: "Autorretratos, Próxima", gallery: "Hacienda la Trinidad", location: "Caracas, Venezuela", slug: "proxima-autorretratos" },
    { year: "2019", title: "Tierra de gracia, naturaleza-paisaje-territorio", gallery: "Galería Beatriz Gil", location: "Caracas, Venezuela", slug: "tierra-de-gracia" },
  ];

  return (
    <SectionRow label="Exposiciones Colectivas" id="group-shows">
      <ShowsList shows={shows} />
    </SectionRow>
  );
}

export function FairsSection() {
  const fairs: ShowEntry[] = [
    { year: "2025", title: "Feria Temporal Guadalajara", gallery: "", location: "", slug: "temporal-guadalajara" },
    { year: "2024", title: "Pinta Miami", gallery: "", location: "", slug: "pinta-miami-2024" },
    { year: "2023", title: "Pinta Miami", gallery: "", location: "" },
  ];

  return (
    <SectionRow label="Ferias" id="ferias">
      <ShowsList shows={fairs} />
    </SectionRow>
  );
}

export function PressSection() {
  const press = [
    { lines: ["2024", "Artishock Revista", "Manuela Zárate: Picar la torta", "artishockrevista.com"] },
    { lines: ["2024", "Revista AD", "Talentos escena creativa", "revistaad.es"] },
    { lines: ["2022", "Hoja de Artista: Manuela Zárate", "Fundación Sala Mendoza (online)"] },
    { lines: ["2021", "El guiso. Platos típicos, palabras locales...", "Tráfico Visual, Caracas"] },
    { lines: ["2021", 'Doble tanda expositiva en ABRA: "Inestable" y "El guiso"', "El Universal, Caracas"] },
    { lines: ["2021", "Obras de Leonardo Nieves y Manuela Zárate se exponen en la Galería ABRA", "Analítica, Caracas"] },
  ];

  return (
    <SectionRow label="Prensa / Publicaciones" id="publicaciones">
      <div className="space-y-6">
        {press.map((item, i) => (
          <div key={i}>
            {item.lines.map((line, j) => (
              <p
                key={j}
                className="text-[#333]"
                style={{ fontFamily: mono, fontSize: monoSize, fontWeight: 400, lineHeight: 1.7 }}
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </SectionRow>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#e0e0e0] py-8">
      <div className="px-5 md:px-10 flex flex-col md:flex-row justify-between items-center gap-3">
        <span
          className="text-[#999]"
          style={{ fontFamily: mono, fontSize: "11px", fontWeight: 400 }}
        >
          &copy; {new Date().getFullYear()} manuela zárate
        </span>
        <div className="flex gap-6">
          <a
            href="mailto:manuelazarateg@gmail.com"
            className="text-[#333] hover:text-[#999] transition-colors"
            style={{ fontFamily: mono, fontSize: "12px", fontWeight: 400 }}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}