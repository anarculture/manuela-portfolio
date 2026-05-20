import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from "motion/react";
import galleryData from "../data/gallery.json";

const mono = "DM Mono, Courier, monospace";

export default function Home() {
  return (
    <div className="w-full bg-white px-2 md:px-6">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}>
        <Masonry gutter="16px">
          {galleryData.map((image, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 10) * 0.1 }}
            >
              <div className="w-full overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="px-2 py-2">
                <p
                  className="text-[#333] leading-tight"
                  style={{
                    fontFamily: mono,
                    fontSize: "10px",
                    fontWeight: 400,
                  }}
                >
                  {image.alt.replace(/-/g, " ")}
                </p>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
