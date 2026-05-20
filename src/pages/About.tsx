import {
  BiografiaSection,
  EducacionSection,
  SoloShowsSection,
  GroupShowsSection,
  FairsSection,
  PressSection,
} from "../app/components/content-sections";
import { motion } from "motion/react";

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <BiografiaSection />
      <EducacionSection />
      <SoloShowsSection />
      <GroupShowsSection />
      <FairsSection />
      <PressSection />
    </motion.div>
  );
}
