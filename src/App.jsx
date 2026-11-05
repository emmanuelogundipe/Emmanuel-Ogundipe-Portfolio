import { Cpu, Palette, Sparkles } from "lucide-react";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Toolkit from "./components/Toolkit.jsx";
import SectionShell from "./components/SectionShell.jsx";
import IoTHighlights from "./components/IoTHighlights.jsx";
import AiProjects from "./components/AiProjects.jsx";
import ProjectDashboard from "./components/ProjectDashboard.jsx";
import Contact from "./components/Contact.jsx";
import BackToTop from "./components/BackToTop.jsx";
import { LightboxProvider } from "./components/Lightbox.jsx";
import { DocumentsProvider } from "./components/DocumentsProvider.jsx";
import { workSections } from "./data/assets.js";

const [design, iot, ai] = workSections;

const SECTION_ICONS = {
  design: Palette,
  iot: Cpu,
  ai: Sparkles,
};

export default function App() {
  return (
    <DocumentsProvider>
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

            <SectionShell section={design} icon={SECTION_ICONS[design.id]} />
            <div className="shell">
              <div className="hairline" />
            </div>

            <SectionShell section={iot} icon={SECTION_ICONS[iot.id]}>
              <IoTHighlights highlights={iot.highlights} />
            </SectionShell>
            <div className="shell">
              <div className="hairline" />
            </div>

            <SectionShell section={ai} icon={SECTION_ICONS[ai.id]}>
              <AiProjects projects={ai.projects} />

              <div className="mt-20">
                <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                  How these were delivered
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                  The coordination view behind the work — task sequencing, dependencies,
                  schedules and milestones tracked from brief to handover.
                </p>
                <ProjectDashboard />
              </div>
            </SectionShell>
          </div>
        </main>

        <Contact />
        <BackToTop />
      </LightboxProvider>
    </DocumentsProvider>
  );
}
