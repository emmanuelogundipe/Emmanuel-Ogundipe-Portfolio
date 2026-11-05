import { renderToStaticMarkup } from "react-dom/server";

import App from "../src/App.jsx";

/**
 * Smoke test entry. Built with `vite build --ssr`, then executed by
 * `scripts/smoke.mjs`. Rendering the whole tree in Node catches render-phase
 * crashes (e.g. an out-of-scope variable) that a production bundle happily
 * compiles — the browser then just shows a blank page.
 */
export function check() {
  const html = renderToStaticMarkup(<App />);

  const assertions = {
    "hero name renders": html.includes("Ogundipe"),
    // ---- Three portfolio sections -------------------------------------
    "section 01: Designs": html.includes("Designs"),
    "section 02: IoT / Robotics & STEM": html.includes("IoT / Robotics &amp; STEM"),
    "section 03: AI-Assisted Pro": html.includes("AI-Assisted Pro"),
    "dashboard still renders": html.includes("Milestone progression"),
    // ---- Designs: flat gallery, minimal titles ------------------------
    "design title: Logo Design": html.includes("Logo Design"),
    "design title: AI-Assisted UI Concept": html.includes("AI-Assisted UI Concept"),
    "design title: UI design in a mock-up": html.includes("UI design in a mock-up"),
    "design title: design": html.includes(">design<"),
    "figma prototype link": html.includes(
      "figma.com/make/4QotzUo6xyL4RoZU3P3sDB",
    ),
    "flat gallery (no sub-sections)": !html.includes("Brand &amp; Marketing"),
    "no filter chips": !html.includes("All work"),
    "logo image shipped": html.includes("assets/work/design/logo-design.jpg"),
    // ---- IoT / Robotics & STEM ---------------------------------------
    "IoT highlight: solar house": html.includes("Smart Solar House project"),
    "IoT highlight: Arduino Uno": html.includes("Arduino Uno"),
    "IoT highlight: STEM projects": html.includes("STEM projects"),
    "IoT photo kept": html.includes("raspberry-pi-iot-program.jpg"),
    "Arduino photo removed": !html.includes("arduino-prototype-bench"),
    // ---- AI-Assisted Pro ----------------------------------------------
    "FCET portal link": html.includes("fcet-constitutional-review.onrender.com"),
    "Odyssey scheduler link": html.includes("odyssey-scheduler.onrender.com/login"),
    "flow previews are abstract": html.includes("Flow previews only"),
    "no embedded portal content": !html.includes("<iframe"),
    // ---- Contact actions ---------------------------------------------
    "WhatsApp action link": html.includes("wa.me/2349117639108"),
    "mailto action link": html.includes("mailto:emmanuelogundipe4@gmail.com"),
    "GitHub handle": html.includes("github.com/emmanuelogundipe"),
    "footer admin button": html.includes("Admin"),
    "removed build credit": !html.includes("React + Vite"),
    // ---- Documents ----------------------------------------------------
    "CV download link": html.includes("ogundipe-emmanuel-olamide-cv.pdf"),
    "Resume download link": html.includes("ogundipe-emmanuel-olamide-resume.pdf"),
    "CV view button": html.includes("View CV"),
    "Resume view button": html.includes("View Résumé"),
    // ---- Identity -----------------------------------------------------
    "profile photo": html.includes("assets/profile/portrait.jpg"),
    "stat chip: design assets": html.includes("Design &amp; brand assets"),
    "stat chip: IoT builds": html.includes("IoT &amp; STEM builds"),
    "stat chip: core disciplines": html.includes("Core disciplines"),
    "location: Abuja, Nigeria": html.includes("Abuja, Nigeria"),
    // `nav-scrim` is always rendered; `nav-solid` only applies after scroll,
    // so assert on the one that is guaranteed to be in the markup.
    "opaque navbar stylesheet": html.includes("nav-scrim"),
  };

  return {
    chars: html.length,
    tags: (html.match(/</g) || []).length,
    images: (html.match(/<img/g) || []).length,
    assertions,
    allPassed: Object.values(assertions).every(Boolean),
  };
}
