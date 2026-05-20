import { motion } from "motion/react";
import { FlyerCarousel } from "../../components/FlyerCarousel";
import flyersIndividuales from "../../data/flyers-individuales.json";
import flyersColectivas from "../../data/flyers-colectivas.json";

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
          Estudió Artes plásticas, mención Cerámica, en la Universidad Experimental
          de las Artes (UNEARTE). También es técnico medio en la Escuela de Arte
          Cristóbal Rojas, mención Artes del fuego (2012). Realizó sus pasantías
          en el Museo de Arte Afroamericano Fundación Nelson Sánchez Chapellín (2011-
          2012).
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
          La actual propuesta cerámica de Manuela Zárate (1994) se concibe a partir
          de narrativas y relatos que trazan nuevas configuraciones formales, las
          cuales problematizan y cuestionan argumentos recurrentes de la cultura
          social venezolana: los iconos populares, los estereotipos humanos, la
          identidad, la historia y el territorio, vistos bajo una óptica
          particular. Su trabajo traspasa los límites del material para tornarse en
          objeto escultórico de inmensa expresividad y estética bizarra; en cada
          planteamiento, humor y sátira se traducen en un sistema de significantes
          simbólicos que hacen de su quehacer un proyecto singular. El archivo de
          imágenes y representaciones acumulados por la investigación acuciosa y
          una curiosidad desbordada quedan impresos en su subconsciente para
          manifestarse en novedosas estrategias formales y contenidos temáticos,
          ahora afectados por un presente incierto. Como toda obra que trasciende,
          la suya emerge ingeniosamente como un manifiesto político y una postura
          crítica a su entorno y a las demostraciones neocolonialistas.
        </p>
        <div>
          <p
            className="text-[#333]"
            style={{
              fontFamily: mono,
              fontSize: monoSize,
              fontWeight: 400,
              lineHeight: 1.7,
            }}
          >
            Ya desde su experiencia académica y posteriormente en su primera muestra
            individual, <em>El guiso</em> (Abra Caracas, 2021), su planteamiento manifiesta un
            especial interés por explorar las civilizaciones primigenias
            latinoamericanas, el influjo de la conquista y los discursos
            fundacionales del nuevo mundo en la cultura contemporánea venezolana.
            Configura así una indagación que desde su perspectiva revisa y examina
            temas transversales sobre nuestro imaginario de riqueza, exuberancia
            caribeña y territorio salvaje. &ldquo;La investigación &mdash;comenta Manuela&mdash; me ha
            llevado a crear una relación de múltiples recursos simbólicos y plásticos
            para desarrollar propuestas que reflexionen sobre las complejas
            hibridaciones culturales y los desafíos que estas implican para el
            desarrollo de nuestros países, comunidades, familias e individualidades.&rdquo;
          </p>
          <p
            className="text-[#333] mt-4"
            style={{
              fontFamily: mono,
              fontSize: monoSize,
              fontWeight: 400,
              lineHeight: 1.7,
              textAlign: "right",
            }}
          >
            Ruth Auerbach
          </p>
        </div>
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
}

function ShowsList({ shows }: { shows: ShowEntry[] }) {
  return (
    <div className="space-y-6">
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
          <p
            className="text-[#333]"
            style={{ fontFamily: mono, fontSize: monoSize, fontWeight: 400, lineHeight: 1.7 }}
          >
            {show.gallery}
          </p>
          {show.location && (
            <p
              className="text-[#333]"
              style={{ fontFamily: mono, fontSize: monoSize, fontWeight: 400, lineHeight: 1.7 }}
            >
              {show.location}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export function SoloShowsSection() {
  const shows: ShowEntry[] = [
    { year: "2024", title: "Picar la torta", gallery: "Galería Beatriz Gil", location: "Caracas, Venezuela" },
    { year: "2021", title: "El Guiso", gallery: "Galería Abra Caracas", location: "Caracas, Venezuela" },
  ];

  return (
    <SectionRow label="Exposiciones Individuales" id="exposiciones">
      <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-10">
        <div className="md:w-1/2">
          <ShowsList shows={shows} />
        </div>
        <div className="md:w-1/2">
          <FlyerCarousel images={flyersIndividuales} />
        </div>
      </div>
    </SectionRow>
  );
}

export function GroupShowsSection() {
  const shows: ShowEntry[] = [
    { year: "2026", title: "Arqueología de lo encarnado", gallery: "Mooni", location: "Art Week CDMX" },
    { year: "2025", title: "Cerámica Ayer y hoy", gallery: "Galería de Arte Nacional", location: "" },
    { year: "2024", title: "24º Salón Jóvenes Con FIA", gallery: "", location: "" },
    { year: "2024", title: "Materia de fondo", gallery: "Cabinet Gallery", location: "Curaduría Tahia Rivero" },
    { year: "2023", title: "Subasta 74", gallery: "Sala Mendoza", location: "" },
    { year: "2023", title: "Concurso de Arte Contemporáneo CREADORAS", gallery: "CAF, Volante Studio y GBG Arts", location: "" },
    { year: "2022", title: "Autorretratos, Próxima", gallery: "Hacienda la Trinidad", location: "Caracas, Venezuela" },
    { year: "2019", title: "Tierra de gracia, naturaleza-paisaje-territorio", gallery: "Galería Beatriz Gil", location: "Caracas, Venezuela" },
  ];

  return (
    <SectionRow label="Exposiciones Colectivas" id="group-shows">
      <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-10">
        <div className="md:w-1/2">
          <ShowsList shows={shows} />
        </div>
        <div className="md:w-1/2">
          <FlyerCarousel images={flyersColectivas} />
        </div>
      </div>
    </SectionRow>
  );
}

export function FairsSection() {
  const fairs = [
    { year: "2025", title: "Feria Temporal Guadalajara" },
    { year: "2024", title: "Pinta Miami" },
    { year: "2023", title: "Pinta Miami" },
  ];

  return (
    <SectionRow label="Ferias" id="ferias">
      <div className="space-y-6">
        {fairs.map((fair, i) => (
          <div key={i}>
            <p className="text-[#333]" style={{ fontFamily: mono, fontSize: monoSize, fontWeight: 400 }}>{fair.year}</p>
            <p className="text-[#333]" style={{ fontFamily: mono, fontSize: monoSize, fontWeight: 400 }}>{fair.title}</p>
          </div>
        ))}
      </div>
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