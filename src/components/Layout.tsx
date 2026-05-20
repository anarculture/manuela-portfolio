import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import Gallery from '../pages/Home';
import {
  BiografiaSection,
  EducacionSection,
  SoloShowsSection,
  GroupShowsSection,
  FairsSection,
  PressSection,
  Footer,
} from '../app/components/content-sections';

export function Layout() {
  return (
    <div className="w-full min-h-screen bg-white" style={{ scrollBehavior: "smooth" }}>
      <Navbar />
      <HeroSection />
      <main className="w-full">
        <section id="obras">
          <Gallery />
        </section>
        <section id="cv">
          <BiografiaSection />
          <EducacionSection />
          <SoloShowsSection />
          <GroupShowsSection />
          <FairsSection />
          <PressSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
