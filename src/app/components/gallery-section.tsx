const mono = "DM Mono, Courier, monospace";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1693948568453-a3564f179a84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFua3MlMjB3b29kJTIwY29uY3JldGUlMjBmbG9vciUyMGFydCUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3NzMxODgxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["sexy sushi"],
  },
  {
    src: "https://images.unsplash.com/photo-1601119868146-5e620bf3405f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMHdpcmUlMjBzcGlyYWwlMjBzY3VscHR1cmUlMjBhcnR8ZW58MXx8fHwxNzczMTg4MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Carl Andre", "Margit Endormie", "Photo Ronald Amstutz", "Dia Art Foundation, New York", "1989"],
  },
  {
    src: "https://images.unsplash.com/photo-1734273291574-5cc2b04589be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3VuZCUyMHdvb2RlbiUyMHRhYmxlJTIwYW50aXF1ZSUyMGZ1cm5pdHVyZXxlbnwxfHx8fDE3NzMxODgxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Tony Cragg", "Element/stone", "Mixed Materials", "120 × 160 × 160 cm", "Photo Salvatore Licitra", "1983"],
  },
  {
    src: "https://images.unsplash.com/photo-1585411821516-4267944c8dcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9vbSUyMHN0YW5kaW5nJTIwZmxvb3IlMjBtaW5pbWFsJTIwYXJ0fGVufDF8fHx8MTc3MzE4ODExNnww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Joseph Beuys", "Silver Broom and Broom without Bristles", "Wood and horsehair encased in a shod, with solid copper and felt.", "Measurements: 130,00 x 51,00 cm", "1972"],
  },
  {
    src: "https://images.unsplash.com/photo-1771599940657-f9f151abed45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwdHdpc3RlZCUyMGFic3RyYWN0JTIwc2N1bHB0dXJlfGVufDF8fHx8MTc3MzE4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Anish Kapoor", "Untitled", "Fibreglass and pigment", "200 × 200 × 75 cm", "1996"],
  },
  {
    src: "https://images.unsplash.com/photo-1755426225472-c91c439170a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjB3b29kZW4lMjBjaGFpciUyMGRldGVyaW9uYXRlZHxlbnwxfHx8fDE3NzMxODgxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Doris Salcedo", "Untitled", "Wood, cement, and steel", "80 × 41 × 38 cm", "1998"],
  },
  {
    src: "https://images.unsplash.com/photo-1536464011938-5d87c1e6394a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b29kZW4lMjBjaGFpciUyMHRlYWwlMjBjdXNoaW9ufGVufDF8fHx8MTc3MzE4ODExN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Franz West", "Onkel Stuhl", "Metal and lacquer", "87 × 57 × 64 cm", "2005"],
  },
  {
    src: "https://images.unsplash.com/photo-1661698050635-3babb2d36a2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdHVkaW8lMjB3YWxsJTIwdG9vbHMlMjBsZWFuaW5nfGVufDF8fHx8MTc3MzE4ODEyNXww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Michael Dean", "Analogue Series", "Concrete, steel, found objects", "Dimensions variable", "2016"],
  },
  // Row 3
  {
    src: "https://images.unsplash.com/photo-1562868198-be7fbd14123d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFzc2VtYmxhZ2UlMjBzY3VscHR1cmUlMjBwaWxlJTIwb2JqZWN0c3xlbnwxfHx8fDE3NzMxODgxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Tony Cragg", "Mortar and Pestle", "Mixed media, 1985", "225 × 120 × 350cm"],
  },
  {
    src: "https://images.unsplash.com/photo-1590673114591-3bd141230d6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZ2VvbWV0cmljJTIwbWluaW1hbGlzdCUyMHNjdWxwdHVyZSUyMGZsb29yfGVufDF8fHx8MTc3MzE4ODExOXww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Bruce Nauman", "Untitled", "Fibreglass", "15 × 28 × 197cm", "1967"],
  },
  {
    src: "https://images.unsplash.com/photo-1685094344259-76b6d5e514c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3ZlbiUyMHJvcGUlMjB0dWJlJTIwc2N1bHB0dXJlJTIwb3JnYW5pY3xlbnwxfHx8fDE3NzMxODgxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Tony Cragg", "George and the Dragon", "1984"],
  },
  {
    src: "https://images.unsplash.com/photo-1771354959667-96360bf59eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGRvb3IlMjBlbnRyYW5jZSUyMGRvb3J3YXklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzMxODgxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Blinky Palermo", "installation view", "Zigzag Incisione at CRAC Alsace", "2017"],
  },
  // Row 4 & 5
  {
    src: "https://images.unsplash.com/photo-1604237454453-c895f4ef98d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBwbGFuayUyMHJ1c3RpYyUyMHRleHR1cmUlMjBhcnR8ZW58MXx8fHwxNzczMTg4MTIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Richard Serra", "One Ton Prop", "Lead antimony", "122 × 122 × 2.5 cm each", "1969"],
  },
  {
    src: "https://images.unsplash.com/photo-1742037144993-5f538ac285b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5ZWxsb3clMjBwb3dkZXIlMjBwaWxlJTIwZ3JvdW5kJTIwYXJ0fGVufDF8fHx8MTc3MzE4ODEyMXww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Wolfgang Laib", "Pollen from Hazelnut", "Hazelnut pollen", "Dimensions variable", "1992"],
  },
  {
    src: "https://images.unsplash.com/photo-1761482769317-97f8caf7e34c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGdsYXNzJTIwYm90dGxlJTIwc3RpbGwlMjBsaWZlJTIwdmludGFnZXxlbnwxfHx8fDE3NzMxODgxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Giorgio Morandi", "Natura Morta", "Oil on canvas", "25.5 × 30 cm", "1956"],
  },
  {
    src: "https://images.unsplash.com/photo-1707670467825-f407393bf9d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXJyb3clMjBjb3JyaWRvciUyMGludGVyaW9yJTIwd2FybSUyMGxpZ2h0fGVufDF8fHx8MTc3MzE4ODEyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Gordon Matta-Clark", "Splitting", "Gelatin silver print", "101.6 × 76.2 cm", "1974"],
  },
  {
    src: "https://images.unsplash.com/photo-1763046224153-4916e0f7c61d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBzY3VscHR1cmUlMjBtaXhlZCUyMG1lZGlhJTIwZ2FsbGVyeXxlbnwxfHx8fDE3NzMxODgxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Rachel Whiteread", "Untitled (Stairs)", "Plaster and fibreglass", "375 × 220 × 280 cm", "2001"],
  },
  {
    src: "https://images.unsplash.com/photo-1693269276499-5d71d866785f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHJvb20lMjBibHVlJTIwdHJpYW5nbGUlMjBnZW9tZXRyaWMlMjBhcnR8ZW58MXx8fHwxNzczMTg4MTIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Lygia Pape", "Tteia 1, C", "Gold thread and light", "Dimensions variable", "2002"],
  },
  {
    src: "https://images.unsplash.com/photo-1706821856764-4e85de5482d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwc2N1bHB0dXJlJTIwY29udGVtcG9yYXJ5JTIwYXJ0fGVufDF8fHx8MTc3MzE4NzcyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Theaster Gates", "Vessel #12", "Stoneware and wood ash", "38 × 32 × 32 cm", "2020"],
  },
  {
    src: "https://images.unsplash.com/photo-1767032485319-07e2dae76bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGF5JTIwcG90dGVyeSUyMGhhbmRtYWRlJTIwYXJ0fGVufDF8fHx8MTc3MzE4NzcyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: ["Simone Leigh", "Cupboard VIII", "Stoneware and raffia", "91 × 53 × 47 cm", "2019"],
  },
];

export function GallerySection() {
  return (
    <section id="obras" className="w-full bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {galleryImages.map((image, index) => (
          <div key={index} className="flex flex-col">
            <div className="w-full aspect-[4/5] overflow-hidden">
              <img
                src={image.src}
                alt={image.caption[0] || `Obra ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {image.caption.length > 0 && (
              <div className="px-2 py-2">
                {image.caption.map((line, lineIdx) => (
                  <p
                    key={lineIdx}
                    className="text-[#333] leading-tight"
                    style={{
                      fontFamily: mono,
                      fontSize: "10px",
                      fontWeight: 400,
                      fontStyle: lineIdx === 1 ? "italic" : "normal",
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}