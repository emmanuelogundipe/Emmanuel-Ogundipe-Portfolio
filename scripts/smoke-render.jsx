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
    "section 01 renders": html.includes("Visual, Graphic"),
    "section 02 renders": html.includes("IoT Educator"),
    "section 03 dashboard": html.includes("Milestone progression"),
    "WhatsApp action link": html.includes("wa.me/2349117639108"),
    "mailto action link": html.includes("mailto:emmanuelogundipe4@gmail.com"),
    "GitHub handle": html.includes("github.com/emmanuelogundipe"),
    "CV download link": html.includes("ogundipe-emmanuel-olamide-cv.pdf"),
    "Resume download link": html.includes("ogundipe-emmanuel-olamide-resume.pdf"),
    "profile photo": html.includes("assets/profile/portrait.jpg"),
    // Gallery grouping + filtering
    "group: Brand & Marketing": html.includes("Brand &amp; Marketing"),
    "group: App & Web UI": html.includes("App &amp; Web UI"),
    "group: Identity & Editorial": html.includes("Identity &amp; Editorial"),
    "group: Product & Print": html.includes("Product &amp; Print"),
    "group: Hardware Builds": html.includes("Hardware Builds"),
    "gallery filter chips": html.includes("All work"),
    // CV / Resume preview
    "CV view button": html.includes("View CV"),
    "Resume view button": html.includes("View Résumé"),
    // Floating stat chips beside the profile photo
    "stat chip: design assets": html.includes("stat-value") && html.includes("Design &amp; brand assets"),
    "stat chip: IoT builds": html.includes("IoT systems built"),
    "stat chip: core disciplines": html.includes("Core disciplines"),
  };

  return {
    chars: html.length,
    tags: (html.match(/</g) || []).length,
    images: (html.match(/<img/g) || []).length,
    assertions,
    allPassed: Object.values(assertions).every(Boolean),
  };
}