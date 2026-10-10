/**
 * ---------------------------------------------------------------------------
 *  SINGLE SOURCE OF TRUTH — profile content + local asset mapping
 * ---------------------------------------------------------------------------
 *  `localPath` points at the file on THIS machine. `scripts/sync-assets.mjs`
 *  copies every `localPath` into `public/` using the matching `publicPath`,
 *  so the site always serves from its own folder (Vercel / GitHub Pages safe).
 *
 *  Run `npm run sync:assets` after editing or re-exporting any image.
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
  {
    id: "design",
    index: "01",
    kicker: "Visual, Graphic & UI Design",
    title: "Brand systems, marketing visuals & interface screens",
    blurb:
      "End-to-end visual production — from raw idea and AI-assisted layout generation to a polished, client-ready Figma file.",
    deliverables: [
      {
        title: "Visual Asset Creation",
        text: "Producing custom graphics, banners, and digital marketing materials.",
      },
      {
        title: "Static UI Page Design",
        text: "Designing visual interface screens, layouts, and page mockups.",
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
    groups: [
      {
        id: "brand",
        label: "Brand & Marketing",
        blurb: "Banners, adverts and promotional flyers produced for client campaigns.",
        itemIds: ["design-01", "design-02", "design-03", "design-10"],
      },
      {
        id: "ui",
        label: "App & Web UI",
        blurb: "Mobile app screens and e-commerce layouts, including AI-generated drafts refined by hand.",
        itemIds: ["design-04", "design-06"],
      },
      {
        id: "editorial",
        label: "Identity & Editorial",
        blurb: "Logo work, social creatives and long-form editorial poster design.",
        itemIds: ["design-05", "design-07", "design-08"],
      },
      {
        id: "print",
        label: "Product & Print",
        blurb: "Product visuals, price sheets and event flyers prepared for print.",
        itemIds: ["design-09", "design-11", "design-12"],
      },
    ],
    items: [
      {
        id: "design-01",
        title: "Quick Breakfast — Promo Banner",
        caption:
          "Warm café-toned promotional banner with product strip, opening hours and call-to-action for a breakfast brand.",
        tags: ["Banner", "Brand", "Marketing"],
        publicPath: "assets/work/design/quick-breakfast-banner.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.40.32.jpeg",
        width: 1080,
        height: 829,
      },
      {
        id: "design-02",
        title: "AFOD — Services Flyer",
        caption:
          "Purple-toned service flyer with circular product cut-outs and a stacked list of tailoring, sales and pension services.",
        tags: ["Flyer", "Layout", "Services"],
        publicPath: "assets/work/design/afod-services-flyer.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.39.03.jpeg",
        width: 1080,
        height: 671,
      },
      {
        id: "design-03",
        title: "Niyi Autos — Automotive Ad",
        caption:
          "Dark, high-contrast vehicle catalogue advert built around a single call-to-action button.",
        tags: ["Ad Creative", "CTA", "Dark UI"],
        publicPath: "assets/work/design/niyi-autos-advert.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.40.27.jpeg",
        width: 575,
        height: 528,
      },
      {
        id: "design-04",
        title: "LidLake — Mobile App UI",
        caption:
          "Three-screen mobile app mockup for a food-delivery interface: landing, sign-up and authentication states.",
        tags: ["Mobile UI", "App", "Mockup"],
        publicPath: "assets/work/design/lidlake-app-ui.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.39.04.jpeg",
        width: 1080,
        height: 1080,
      },
      {
        id: "design-05",
        title: "Quick Breakfast — Logo Identity",
        caption:
          "Minimal monochrome brand mark rendered as a dimensional sign mockup on a concrete studio wall.",
        tags: ["Logo", "Identity", "3D Mockup"],
        publicPath: "assets/work/design/quick-breakfast-logo.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.40.33.jpeg",
        width: 1006,
        height: 711,
      },
      {
        id: "design-06",
        title: "Unisex — Eyewear Storefront",
        caption:
          "AI-generated e-commerce layout for a sunglasses shop, refined by hand into a warm yellow product composition.",
        tags: ["AI-Assisted", "eCommerce", "UI"],
        publicPath: "assets/work/design/unisex-eyewear-ui.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.40.29.jpeg",
        width: 1080,
        height: 794,
      },
      {
        id: "design-07",
        title: "CWC — Faith Campaign Post",
        caption:
          "Square social-media creative built on a strict grid, geometric accents and high-contrast motivational copy.",
        tags: ["Social", "Grid", "Campaign"],
        publicPath: "assets/work/design/cwc-faith-campaign.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 08.55.07.jpeg",
        width: 1080,
        height: 1080,
      },
      {
        id: "design-08",
        title: "Author Spotlight — Editorial Poster",
        caption:
          "Long-form editorial poster featuring an author profile with navy-and-gold art direction and body copy layout.",
        tags: ["Editorial", "Poster", "Typography"],
        publicPath: "assets/work/design/author-spotlight-poster.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.38.53.jpeg",
        width: 1179,
        height: 1179,
      },
      {
        id: "design-09",
        title: "Odyssey — Product Visual",
        caption:
          "Minimal smartwatch product visual on a dark surface, used as a hero image for a digital campaign.",
        tags: ["Product", "Minimal", "Campaign"],
        publicPath: "assets/work/design/odyssey-product-visual.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.40.34.jpeg",
        width: 720,
        height: 1080,
      },
      {
        id: "design-10",
        title: "Meiruluxe — Product Range Flyer",
        caption:
          "Compact personal-care product flyer with a check-list layout, contact strip and circular ingredient cut-outs.",
        tags: ["Flyer", "Checklist", "Branding"],
        publicPath: "assets/work/design/meiruluxe-flyer.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.40.30.jpeg",
        width: 452,
        height: 358,
      },
      {
        id: "design-11",
        title: "Independence Discount — Price Sheet",
        caption:
          "Full price-list sheet for an Independence Day offer, with tiered packages and payment terms for partners.",
        tags: ["Price List", "Layout", "Offer"],
        publicPath: "assets/work/design/independence-discount-sheet.png",
        localPath: "C:\\Users\\itoha\\Downloads\\Frame 98 (1).png",
        width: 1330,
        height: 1669,
      },
      {
        id: "design-12",
        title: "Odyssey 2026 — Summer Flyer",
        caption:
          "Tall event flyer with flight-ticket framing, activity schedule and registration call-to-action.",
        tags: ["Event", "Flyer", "Schedule"],
        publicPath: "assets/work/design/odyssey-summer-flyer.png",
        localPath: "C:\\Users\\itoha\\Downloads\\Odyssey design (5).png",
        width: 1414,
        height: 2000,
      },
    ],
  },
  {
    id: "iot",
    index: "02",
    kicker: "IoT Educator",
    title: "Microcontrollers, sensors & hands-on STEM builds",
    blurb:
      "Building, programming and teaching physical computing systems — from breadboard prototypes to Raspberry Pi programs walked through with participants.",
    deliverables: [
      {
        title: "Microcontroller Integration",
        text: "Setting up and programming single-board computers (Raspberry Pi) and microcontrollers (Arduino Uno).",
      },
      {
        title: "Hardware & Sensor Interfacing",
        text: "Connecting electronic components, circuits, and sensors for IoT Projects.",
      },
      {
        title: "STEM Hardware Building",
        text: "Designing physical and electronic prototypes for hands-on technical projects.",
      },
    ],
    groups: [
      {
        id: "builds",
        label: "Hardware Builds",
        blurb: "Breadboard prototypes, sensor arrays and microcontroller bench work.",
        itemIds: ["iot-01"],
      },
      {
        id: "teaching",
        label: "Programs & Participant Sessions",
        blurb: "Live sessions where the Raspberry Pi IoT program is explained to participants, step by step.",
        itemIds: ["iot-02"],
      },
    ],
    items: [
      {
        id: "iot-01",
        title: "Arduino IoT Prototype Bench",
        caption:
          "Workbench build with a wired sensor array, breadboard, jump leads and a code test feed on a laptop — the prototype stage before enclosure.",
        tags: ["Arduino Uno", "Sensors", "Prototype"],
        publicPath: "assets/work/iot/arduino-prototype-bench.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-09-16 at 10.11.51.jpeg",
        width: 1280,
        height: 960,
      },
      {
        id: "iot-02",
        title: "IoT with Raspberry Pi — Participant Session",
        caption:
          "Running a Raspberry Pi IoT program and walking participants through it — explaining the hardware, the code behind it, and the live sensor readings from the setup.",
        tags: ["Raspberry Pi", "IoT", "Participants"],
        publicPath: "assets/work/iot/raspberry-pi-iot-program.jpg",
        localPath:
          "C:\\Users\\itoha\\OneDrive\\Desktop\\Pictures\\WhatsApp Image 2026-10-08 at 09.38.58.jpeg",
        width: 810,
        height: 1080,
      },
    ],
  },
  {
    id: "communication",
    index: "03",
    kicker: "Technical Communication & Project Management",
    title: "Decks, schedules & delivery coordination",
    blurb:
      "Turning complex technical work into clear presentations, tracked schedules and coordinated delivery.",
    deliverables: [
      {
        title: "Presentation & Deck Design",
        text: "Structuring information, visuals, and technical details into structured slide decks.",
      },
      {
        title: "Project Coordination",
        text: "Overseeing projects, operational schedules, or technical tasks within an organization.",
      },
    ],
    items: [],
  },
];