/**
 * ---------------------------------------------------------------------------
 *  SINGLE SOURCE OF TRUTH — profile content + local asset mapping
 * ---------------------------------------------------------------------------
 *  `localPath` points at the file on THIS machine. `scripts/sync-assets.mjs`
 *  copies every `localPath` into `public/` using the matching `publicPath`,
 *  so the site always serves from its own folder (Vercel / GitHub Pages safe).
 *
 *  Run `npm run sync:assets` after editing or re-exporting any image.
 *
 *  Gallery items may also be pure links (`kind: "link"` + `href`) — those are
 *  rendered as a call-to-action tile and never enter the image lightbox, so
 *  they need no `localPath` / `publicPath`.
 * ---------------------------------------------------------------------------
 */

/** Personal details --------------------------------------------------- */
export const profile = {
  name: "Ogundipe Emmanuel Olamide",
  shortName: "Emmanuel O.",
  roles: [
    "Visual & Graphic Designer",
    "UI Designer",
    "IoT Educator",
    "Technical Project Coordinator",
  ],
  location: "Abuja, Nigeria",
  institution: "Computer Science Graduate · Ekiti State University",
  summary:
    "I am a Computer Science graduate from Ekiti State University operating at the intersection of hardware, design, and STEM project execution. My work spans designing visual assets and UI layouts in Figma, developing and teaching hands-on IoT systems using Arduino microcontrollers, and leading technical project planning and operational schedules. Driven by a practical, systems-focused approach, I specialize in bridging technical hardware builds with clean visual design and clear project communication.",
  skills: [
    { label: "Visual & Graphic Design", tone: "amber" },
    { label: "User Interface (UI) Design", tone: "violet" },
    { label: "IoT Educator", tone: "emerald" },
    {
      label: "Technical Communication & Project Management",
      tone: "sky",
    },
  ],
};

/** Profile photo ------------------------------------------------------ */
export const profilePhoto = {
  alt: "Portrait of Ogundipe Emmanuel Olamide smiling outdoors",
  publicPath: "assets/profile/portrait.jpg",
  localPath:
    "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-06 at 06.54.08.jpeg",
  width: 960,
  height: 1280,
};

/** Downloadable documents (CV + Resume) ------------------------------- */
export const documents = [
  {
    id: "cv",
    label: "Download CV",
    sublabel: "Full curriculum vitae · PDF",
    publicPath: "documents/ogundipe-emmanuel-olamide-cv.pdf",
    localPath:
      "C:\\Users\\itoha\\Downloads\\OGUNDIPE EMMANUEL OLAMIDE CV (1).pdf.pdf.pdf",
  },
  {
    id: "resume",
    label: "Download Resume",
    sublabel: "One-page professional summary · PDF",
    publicPath: "documents/ogundipe-emmanuel-olamide-resume.pdf",
    localPath:
      "C:\\Users\\itoha\\Downloads\\OGUNDIPE EMMANUEL OLAMIDE RESUME (2).pdf",
  },
];

/** Portfolio sections ------------------------------------------------- */
export const workSections = [
  /* ------------------------------------------------------------------ */
  /*  01 · Designs — one flat gallery, no sub-grouping                    */
  /* ------------------------------------------------------------------ */
  {
    id: "design",
    index: "01",
    kicker: "Designs",
    title: "UI Design, brand visuals & campaign work",
    blurb:
      "A single, flat archive of visual work — app and web interfaces, social creatives, flyers and print pieces. Every piece is produced end to end, from the first layout to the client-ready file.",
    galleryTitle: "Design",
    compactTitles: true,
    deliverables: [
      {
        title: "UI Design",
        text: "Designing app and web screens, layouts, and page mock-ups.",
      },
      {
        title: "Visual Asset Creation",
        text: "Producing custom graphics, banners, and digital marketing materials.",
      },
      {
        title: "AI-Assisted UI Generation",
        text: "Prompting AI design engines to generate UI layouts and importing them into design tools.",
      },
      {
        title: "Figma Workflow & Flow Mapping",
        text: "Organizing imported UI assets into a prototype flow within Figma.",
      },
    ],
    items: [
      {
        id: "design-13",
        title: "Logo Design",
        caption: "",
        alt: "Logo design — brand mark presented on a dark background",
        tags: [],
        publicPath: "assets/work/design/logo-design.jpg",
        localPath: "C:\\Users\\itoha\\Downloads\\Logo Design.jpeg",
        width: 866,
        height: 847,
      },
      {
        id: "design-14",
        kind: "link",
        title: "AI-Assisted UI Concept",
        caption: "",
        alt: "",
        tags: [],
        href: "https://www.figma.com/make/4QotzUo6xyL4RoZU3P3sDB/Agrofreeze-Storage-Platform?t=ruDwcXRdvhkcrjXl-20&fullscreen=1",
        linkLabel: "Open the Figma prototype",
      },
      {
        id: "design-01",
        title: "design",
        caption: "",
        alt: "Warm café-toned promotional banner for a breakfast brand, with a product strip, opening hours and a call to action.",
        tags: [],
        publicPath: "assets/work/design/quick-breakfast-banner.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.40.32.jpeg",
        width: 1080,
        height: 829,
      },
      {
        id: "design-02",
        title: "design",
        caption: "",
        alt: "Purple-toned services flyer with circular product cut-outs and a stacked list of tailoring, sales and pension services.",
        tags: [],
        publicPath: "assets/work/design/afod-services-flyer.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.39.03.jpeg",
        width: 1080,
        height: 671,
      },
      {
        id: "design-03",
        title: "design",
        caption: "",
        alt: "Dark, high-contrast automotive catalogue advert built around a single call-to-action button.",
        tags: [],
        publicPath: "assets/work/design/niyi-autos-advert.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.40.27.jpeg",
        width: 575,
        height: 528,
      },
      {
        id: "design-04",
        title: "UI design in a mock-up",
        caption: "",
        alt: "Three-screen mobile app mock-up for a food-delivery interface: landing, sign-up and authentication states.",
        tags: [],
        publicPath: "assets/work/design/lidlake-app-ui.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.39.04.jpeg",
        width: 1080,
        height: 1080,
      },
      {
        id: "design-05",
        title: "design",
        caption: "",
        alt: "Minimal monochrome logo rendered as a dimensional sign mock-up on a concrete studio wall.",
        tags: [],
        publicPath: "assets/work/design/quick-breakfast-logo.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.40.33.jpeg",
        width: 1006,
        height: 711,
      },
      {
        id: "design-06",
        title: "UI design in a mock-up",
        caption: "",
        alt: "AI-generated e-commerce layout for a sunglasses shop, refined by hand into a warm yellow product composition.",
        tags: [],
        publicPath: "assets/work/design/unisex-eyewear-ui.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.40.29.jpeg",
        width: 1080,
        height: 794,
      },
      {
        id: "design-07",
        title: "design",
        caption: "",
        alt: "Square social-media creative built on a strict grid, with geometric accents and high-contrast motivational copy.",
        tags: [],
        publicPath: "assets/work/design/cwc-faith-campaign.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 08.55.07.jpeg",
        width: 1080,
        height: 1080,
      },
      {
        id: "design-08",
        title: "design",
        caption: "",
        alt: "Long-form editorial poster featuring an author profile with navy-and-gold art direction.",
        tags: [],
        publicPath: "assets/work/design/author-spotlight-poster.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.38.53.jpeg",
        width: 1179,
        height: 1179,
      },
      {
        id: "design-09",
        title: "design",
        caption: "",
        alt: "Minimal smartwatch product visual on a dark surface, used as a hero image for a digital campaign.",
        tags: [],
        publicPath: "assets/work/design/odyssey-product-visual.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.40.34.jpeg",
        width: 720,
        height: 1080,
      },
      {
        id: "design-10",
        title: "design",
        caption: "",
        alt: "Compact personal-care product flyer with a check-list layout, contact strip and circular ingredient cut-outs.",
        tags: [],
        publicPath: "assets/work/design/meiruluxe-flyer.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.40.30.jpeg",
        width: 452,
        height: 358,
      },
      {
        id: "design-11",
        title: "design",
        caption: "",
        alt: "Full price-list sheet for an Independence Day offer, with tiered packages and payment terms.",
        tags: [],
        publicPath: "assets/work/design/independence-discount-sheet.png",
        localPath: "C:\\Users\\itoha\\Downloads\\Frame 98 (1).png",
        width: 1330,
        height: 1669,
      },
      {
        id: "design-12",
        title: "design",
        caption: "",
        alt: "Tall event flyer with flight-ticket framing, an activity schedule and a registration call to action.",
        tags: [],
        publicPath: "assets/work/design/odyssey-summer-flyer.png",
        localPath: "C:\\Users\\itoha\\Downloads\\Odyssey design (5).png",
        width: 1414,
        height: 2000,
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  02 · IoT / Robotics & STEM                                          */
  /* ------------------------------------------------------------------ */
  {
    id: "iot",
    index: "02",
    kicker: "IoT / Robotics & STEM",
    title: "Smart builds, microcontrollers & hands-on teaching",
    blurb:
      "Building, programming and teaching physical computing systems — ESP-based smart builds, Arduino prototypes and STEM sessions run with real participants.",
    galleryTitle: "Build log",
    compactTitles: true,
    highlights: [
      {
        id: "solar",
        label: "Smart Solar House project",
        detail: "ESP microcontroller · sensor-driven automation",
        icon: "solar",
      },
      {
        id: "arduino",
        label: "Arduino Uno",
        detail: "Breadboard circuits, sensors & code tests",
        icon: "arduino",
      },
      {
        id: "stem",
        label: "STEM projects",
        detail: "Hands-on sessions built around real hardware",
        icon: "stem",
      },
    ],
    items: [
      {
        id: "iot-02",
        title: "Raspberry Pi IoT session",
        caption: "",
        alt: "Presenting a Raspberry Pi IoT program to participants at an exhibition booth.",
        tags: [],
        publicPath: "assets/work/iot/raspberry-pi-iot-program.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.38.58.jpeg",
        width: 810,
        height: 1080,
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  03 · AI-Assisted Pro — live web applications                        */
  /* ------------------------------------------------------------------ */
  {
    id: "ai",
    index: "03",
    kicker: "AI-Assisted Pro",
    title: "Live web applications, built with an AI-assisted workflow",
    blurb:
      "Production apps I have designed, prompted, assembled and shipped. Each card shows the product flow only — no accounts, records or personal data are displayed.",
    galleryTitle: "",
    deliverables: [
      {
        title: "Prompt-to-Prototype",
        text: "Turning a brief into a working interface with AI-assisted generation and hand refinement.",
      },
      {
        title: "Full-Stack Assembly",
        text: "Wiring authentication, data models and responsive layouts into a deployable app.",
      },
      {
        title: "Secure Access Design",
        text: "Role-gated entry points so only the right people reach protected content.",
      },
    ],
    projects: [
      {
        id: "fcet",
        title: "FCET Constitutional Review Portal",
        tag: "Institution · workflow app",
        href: "https://fcet-constitutional-review.onrender.com/",
        summary:
          "A gated review workspace for institutional governance documents. The application content is access-controlled — only the abstract flow is shown here.",
        note: "Content is private · flow preview only",
        steps: ["Secure sign-in", "Review workspace", "Member input", "Adoption"],
        tone: "violet",
      },
      {
        id: "odyssey",
        title: "Odyssey Scheduler",
        tag: "Scheduling · dashboard",
        href: "https://odyssey-scheduler.onrender.com/login",
        summary:
          "An AI-assisted timetable builder: staff sign in, define constraints, generate a schedule and publish it to the team.",
        note: "Sign-in required · no personal data shown",
        steps: ["Sign in", "Set constraints", "Generate plan", "Publish"],
        tone: "emerald",
      },
    ],
    items: [],
  },
];
