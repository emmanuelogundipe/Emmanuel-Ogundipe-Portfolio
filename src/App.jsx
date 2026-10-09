import { Cpu, Palette, Presentation } from "lucide-react";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Toolkit from "./components/Toolkit.jsx";
import SectionShell from "./components/SectionShell.jsx";
import ProjectDashboard from "./components/ProjectDashboard.jsx";
import Contact from "./components/Contact.jsx";
import BackToTop from "./components/BackToTop.jsx";
import { LightboxProvider } from "./components/Lightbox.jsx";
import { workSections } from "./data/assets.js";

const [design, iot, communication] = workSections;

const SECTION_ICONS = {
  design: Palette,
  iot: Cpu,
  communication: Presentation,
};

export default function App() {
  return (
    <LightboxProvider>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-xl focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to portfolio
      </a>

      <Navbar />

      <main>
        <Hero />
        <Toolkit />

        {/* Portfolio work */}
        <div id="work" className="scroll-mt-28">
          <div className="shell pt-6">
            <div className="hairline" />
          </div>

          <SectionShell
            section={design}
            icon={SECTION_ICONS[design.id]}
          />
          <div className="shell">
            <div className="hairline" />
          </div>
          <SectionShell section={iot} icon={SECTION_ICONS[iot.id]} />
          <div className="shell">
            <div className="hairline" />
          </div>
          <SectionShell
            section={communication}
            icon={SECTION_ICONS[communication.id]}
          >
            <ProjectDashboard />
          </SectionShell>
        </div>
      </main>

      <Contact />
      <BackToTop />
    </LightboxProvider>
  );
}