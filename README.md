# Ogundipe Emmanuel Olamide — Portfolio

A modern, responsive, highly interactive personal portfolio built with **React 19 + Vite + Tailwind CSS v4 + Framer Motion**.

It presents three professional domains — **visual/graphic & UI design**, **IoT education**, and **technical communication & project management** — with animated galleries, a full-screen lightbox, and a contact footer whose buttons perform real actions (WhatsApp chat, `mailto:` draft, LinkedIn, X, GitHub).

---

## ✨ Feature highlights

| Area | What it does |
| --- | --- |
| **Hero** | Word-by-word name reveal, drifting aurora background, conic-gradient glow ring around the profile photo, floating stat chips, four colour-coded skill badges |
| **Documents** | *Download CV* / *Download Resume* buttons with red PDF marks, hover elevation and file download |
| **Gallery** | 14 responsive image tiles, staggered fade-up/scale on scroll, `backdrop-blur` caption bars, aspect-ratio reserved to prevent layout shift |
| **Lightbox** | Full-screen modal, arrow-key / Esc / swipe navigation, filmstrip, double-click zoom, per-image download, focus trapping + scroll lock |
| **Section 03** | Six hand-built animated SVG panels: Gantt bars, pulsing target nodes, workflow pipeline, operational calendar, animated task checkmarks, milestone progress bars |
| **Contact** | Five live action channels with brand colours, glow-on-hover, plus a pre-filled WhatsApp CTA |
| **Global** | Dark ⇄ light theme with no flash-of-wrong-theme, scroll progress bar, back-to-top FAB, marquee toolkit, full keyboard support and `prefers-reduced-motion` fallbacks |

---

## 🗂️ Project structure

```
ogundipe-portfolio/
├─ .github/workflows/deploy.yml   # GitHub Pages auto-deploy
├─ .gitignore                     # secrets, node_modules, dist, logs, OS junk
├─ LICENSE                        # MIT — allows public reuse
├─ README.md
├─ SECURITY.md                    # secret-handling + public-access guidelines
├─ render.yaml                    # Render Blueprint (static site + headers)
├─ index.html                     # shell, fonts, theme bootstrap, SVG sharpen filter
├─ vite.config.js                 # relative base ('./') + Tailwind plugin
├─ package.json
│
├─ public/                        # copied verbatim into the build
│  ├─ favicon.svg
│  ├─ documents/
│  │  ├─ ogundipe-emmanuel-olamide-cv.pdf
│  │  └─ ogundipe-emmanuel-olamide-resume.pdf
│  └─ assets/
│     ├─ profile/portrait.jpg
│     └─ work/
│        ├─ design/  (12 files)
│        └─ iot/     (2 files)
│
├─ scripts/
│  └─ sync-assets.mjs             # copies local files → public/ using the manifest
│
└─ src/
   ├─ main.jsx                    # React entry
   ├─ App.jsx                     # page composition
   ├─ index.css                   # theme tokens, components, image rules, keyframes
   ├─ data/assets.js              # ← SINGLE SOURCE OF TRUTH (content + local paths)
   ├─ hooks/useTheme.js           # theme toggle + active-section observer
   ├─ lib/assets.js               # assetUrl() — BASE_URL-safe path resolution
   └─ components/
      ├─ Navbar.jsx               # glass nav, scroll progress, mobile menu
      ├─ Hero.jsx                 # profile photo, badges, CV/Resume buttons
      ├─ Toolkit.jsx              # tools marquee + stats strip
      ├─ SectionShell.jsx         # shared section layout
      ├─ GalleryGrid.jsx          # animated image grid
      ├─ Lightbox.jsx             # modal provider + viewer
      ├─ ProjectDashboard.jsx     # animated SVG dashboard (section 03)
      ├─ Contact.jsx              # action channels + footer bar
      ├─ BackToTop.jsx
      ├─ BrandIcons.jsx           # WhatsApp / LinkedIn / X / GitHub marks
      └─ Reveal.jsx               # scroll-reveal helpers (Reveal, RevealGroup…)
```

---

## 🚀 Run it locally

**Requirements:** Node.js 20+ (22/24 recommended) and npm.

```bash
cd ogundipe-portfolio

npm install          # install dependencies
npm run sync:assets  # copy your local images + PDFs into public/
npm run dev          # http://localhost:5173
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server with hot module replacement |
| `npm run build` | Lint + render smoke test + production build → `dist/` |
| `npm run lint` | `no-undef` / `react/jsx-no-undef` scope checking |
| `npm run smoke` | Render the whole app in Node and assert every section renders |
| `npm run preview` | Serve the production build locally |
| `npm run sync:assets` | Re-copy every `localPath` from `src/data/assets.js` |
| `npm run sync:assets:dry` | Print the copy plan without touching files |
| `npm run clean` | Delete `dist/` |

---

## 🖼️ Asset mapping

`src/data/assets.js` is the only file that knows where your originals live.
Each entry carries both a `localPath` (on this machine) and a `publicPath`
(inside the site). `npm run sync:assets` copies the first to the second.

| # | Local source (this PC) | Served as |
| --- | --- | --- |
| — | `…\Pictures\WhatsApp Image 2026-10-06 at 06.54.08.jpeg` | `assets/profile/portrait.jpg` |
| — | `…\Downloads\OGUNDIPE EMMANUEL OLAMIDE CV (1).pdf.pdf.pdf` | `documents/ogundipe-emmanuel-olamide-cv.pdf` |
| — | `…\Downloads\OGUNDIPE EMMANUEL OLAMIDE RESUME (2).pdf` | `documents/ogundipe-emmanuel-olamide-resume.pdf` |
| 1 | `…\Pictures\WhatsApp Image 2026-10-08 at 09.40.32.jpeg` | `assets/work/design/quick-breakfast-banner.jpg` |
| 2 | `…\Pictures\WhatsApp Image 2026-10-08 at 09.39.03.jpeg` | `assets/work/design/afod-services-flyer.jpg` |
| 3 | `…\Pictures\WhatsApp Image 2026-10-08 at 09.40.27.jpeg` | `assets/work/design/niyi-autos-advert.jpg` |
| 4 | `…\Pictures\WhatsApp Image 2026-10-08 at 09.39.04.jpeg` | `assets/work/design/lidlake-app-ui.jpg` |
| 5 | `…\Pictures\WhatsApp Image 2026-10-08 at 09.40.33.jpeg` | `assets/work/design/quick-breakfast-logo.jpg` |
| 6 | `…\Pictures\WhatsApp Image 2026-10-08 at 09.40.29.jpeg` | `assets/work/design/unisex-eyewear-ui.jpg` |
| 7 | `…\Pictures\WhatsApp Image 2026-10-08 at 08.55.07.jpeg` | `assets/work/design/cwc-faith-campaign.jpg` |
| 8 | `…\Pictures\WhatsApp Image 2026-10-08 at 09.38.53.jpeg` | `assets/work/design/author-spotlight-poster.jpg` |
| 9 | `…\Pictures\WhatsApp Image 2026-10-08 at 09.40.34.jpeg` | `assets/work/design/odyssey-product-visual.jpg` |
| 10 | `…\Pictures\WhatsApp Image 2026-10-08 at 09.40.30.jpeg` | `assets/work/design/meiruluxe-flyer.jpg` |
| 11 | `…\Downloads\Frame 98 (1).png` | `assets/work/design/independence-discount-sheet.png` |
| 12 | `…\Downloads\Odyssey design (5).png` | `assets/work/design/odyssey-summer-flyer.png` |
| 13 | `…\Pictures\WhatsApp Image 2026-09-16 at 10.11.51.jpeg` | `assets/work/iot/arduino-prototype-bench.jpg` |
| 14 | `…\Pictures\WhatsApp Image 2026-10-08 at 09.38.58.jpeg` | `assets/work/iot/raspberry-pi-iot-program.jpg` |

**Adding or replacing work:** edit the `items` array for the relevant section in
`src/data/assets.js` (title, caption, tags, `publicPath`, `localPath`, `width`,
`height`), then run `npm run sync:assets`. The grid, the lightbox and the
counting badge update automatically.

**Grouping and filtering:** each section also has a `groups` array that names
its sub-categories and lists which items belong to them via `itemIds`. Add a new
image and drop its id into a group (or leave it out — ungrouped items render
under an automatic "Other work" heading, so an image can never silently vanish).

```js
groups: [
  {
    id: "brand",
    label: "Brand & Marketing",
    blurb: "Banners, adverts and promotional flyers produced for client campaigns.",
    itemIds: ["design-01", "design-02", "design-03", "design-10"],
  },
],
```

**Serving from another machine:** because the site only ever references
`publicPath` values through `assetUrl()`, you can drop the files into `public/`
by hand and delete the `localPath` fields — nothing else changes.

---

## 🎨 Image enhancement & sharpening rules

All photography rules live in one place: `src/index.css` → `@layer components`.

```css
.media img {
  image-rendering: auto;                 /* crisp, never pixelated */
  -webkit-optimize-contrast: high;
  filter: contrast(1.06) saturate(1.08) brightness(1.02);  /* CSS sharpening */
  transform: scale(1.001) translateZ(0); /* GPU layer, kills sub-pixel softness */
  backface-visibility: hidden;
}

.media            { border-radius: 1rem; overflow: hidden; isolation: isolate; }
.media-3d         { box-shadow: inset highlight + 0 26px 60px -30px rgba(0,0,0,.85); }
.media-zoom:hover img { transform: scale(1.07); filter: contrast(1.1) saturate(1.14); }
.media-caption    { background: rgb(6 7 14 / .42);
                    backdrop-filter: blur(18px) saturate(190%); }  /* glass caption */
.media-sheen::after{ background: linear-gradient(150deg, rgb(255 255 255 / .16), transparent 42%);
                    mix-blend-mode: soft-light; }                  /* lit sheen */
.media-sharpen:hover img { filter: url(#crispen) contrast(1.1) saturate(1.14); }
```

`#crispen` is an SVG `feConvolveMatrix` kernel declared once in `index.html`
(mild unsharp mask, `preserveAlpha`). It is applied **only on interaction** —
hover, focus and the lightbox — so a page full of photos never pays for a
full-surface convolution while scrolling. The profile photo and the lightbox
image apply it permanently for maximum clarity.

Every tile also declares `width`/`height` and an `aspect-ratio`, so images never
cause layout shift while loading.

---

## 🎛️ Customising

| Want to change… | Edit |
| --- | --- |
| Name, summary, skill badges | `src/data/assets.js` → `profile` |
| Projects, captions, images | `src/data/assets.js` → `workSections` |
| **GitHub link** (`github.com/emmanuelogundipe`) | `src/components/Contact.jsx` → `CHANNELS` entry `id: "github"` |
| Colours / radii / shadows | `src/index.css` → `:root` + `[data-theme="light"]` |
| Section 03 dashboard data | `src/components/ProjectDashboard.jsx` (`GanttRows`, `MILESTONES`, `TASKS`, `BUSY`, `FLOW`) |
| Fonts | the `<link>` in `index.html` + `--font-display` / `--font-sans` in `index.css` |

> **Live repo:** <https://github.com/emmanuelogundipe/Emmanuel-Ogundipe-Portfolio> — the
> GitHub contact button already points at that handle, so nothing else to
> swap before you deploy.

---

### ⚠️ Never use `color-mix()` with `var()` in this project

Tailwind v4's minifier (Lightning CSS) **cannot resolve `color-mix()` that
references custom properties**. It doesn't error — it silently drops the whole
declaration, or discards the alpha. Both happened here and broke every glow,
shadow and tinted border on the site while the CSS still "compiled".

```css
/* ✗ silently dropped — the background, glow and shadow vanish */
border: 1px solid color-mix(in oklab, var(--c-brand) 40%, transparent);
box-shadow: 0 0 30px -4px color-mix(in oklab, var(--c-brand) 75%, transparent);

/* ✓ use the raw channel variables instead */
border: 1px solid rgb(var(--c-brand-rgb) / 0.4);
box-shadow: 0 0 30px -4px rgb(var(--c-brand-rgb) / 0.75);
```

Channel variables (`--c-brand-rgb`, `--c-brand-2-rgb`, `--c-accent-rgb`,
`--c-ember-rgb`, `--c-ink-rgb`) are declared for both themes in `:root` and
`[data-theme="light"]`. To tint a surface, layer a gradient over a solid
`background-color` rather than mixing:

```css
background-color: #090c18;
background-image: linear-gradient(145deg, rgb(var(--c-brand-rgb) / 0.34), rgb(var(--c-brand-rgb) / 0));
```

**After any CSS change, confirm the rule survived** — search the built file:

```bash
npm run build && grep -o '[^{}]*\.stat-float{[^}]*}' dist/assets/index-*.css
```

**Another trap:** the `background` **shorthand resets `background-clip`**. If a
rule sets `background-clip: text; color: transparent` and any later override
re-declares `background`, the text stays transparent but stops being clipped to
the glyphs — and the text disappears completely. This is why the profile stat
chips use a **solid colour + `text-shadow`** instead of the gradient-clip
technique. If you add a dark-mode override to `.text-gradient`, re-declare
`background-clip: text` in it too.

---

## 🌐 Deployment

### Render (static, global CDN, free)

The repo ships a [`render.yaml`](render.yaml) **Blueprint**, so this is one click:

1. Sign in at <https://dashboard.render.com>.
2. **New → Blueprint** → connect `emmanuelogundipe/Emmanuel-Ogundipe-Portfolio` → **Apply**.
3. Wait for the build, then open the `onrender.com` URL Render assigns.

Render reads the Blueprint and sets everything itself:

| Setting | Value |
| --- | --- |
| Type / runtime | `web` / `static` (CDN-hosted, no server) |
| Build command | `npm ci && npm run build` |
| Publish path | `./dist` |
| Node | `22.12.0` (pinned — Vite 8 needs `^20.19 \|\| >=22.12`) |
| Auto-deploy | on every commit to `main` |
| Headers | CSP, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, cache rules |

Customise it in the repo or the dashboard — e.g. add a domain under the
service's **Settings → Custom Domains**.

> The Blueprint intentionally skips `npm run sync:assets`: that script reads
> Windows paths from `src/data/assets.js`, and the images/PDFs it copies are
> already committed under `public/`.

### Vercel (recommended — instant global CDN)

1. Push this folder to GitHub, then import it at <https://vercel.com/new>.
2. Framework preset **Vite**, build command `npm run build`, output `dist`.
3. No environment variables are needed — the site is fully static.
4. Every push to `main` redeploys; add a custom domain under *Settings → Domains*.

### GitHub Pages (free, tied to the repo)

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: GitHub Actions**.
`.github/workflows/deploy.yml` builds and publishes `dist/` automatically.
Your site lands at `https://<user>.github.io/<repo>/` — the relative `base: './'`
in `vite.config.js` means no rebuild is needed for the sub-path.

### Netlify

- **Base directory** `/` · **Build command** `npm run build` · **Publish directory** `dist`
- Or drop the folder in manually: `base` is already relative.

### Local production check

```bash
npm run build
npm run preview      # http://localhost:4173
```

> Don't open `dist/index.html` with `file://` — ES modules need HTTP. Use
> `npm run preview`.

### Blank-page protection — `npm run lint` + `npm run smoke`

A bundler will happily compile code that throws at runtime. A component
referencing a variable from a sibling scope compiles fine, ships fine, deploys
fine — and shows your visitor a **blank page**. That is not hypothetical: it
happened here, once. Two independent guards now run inside `npm run build`:

**1. `npm run lint`** — ESLint flat config with `no-undef` and
`react/jsx-no-undef`. Re-introducing that exact bug produces:

```
170:11  error  'loop' is not defined  no-undef
194:20  error  'loop' is not defined  no-undef
✖ 2 problems (2 errors, 0 warnings)
```

**2. `npm run smoke`** — `scripts/smoke.mjs` renders the entire `<App />` in
Node with lightweight browser stubs and asserts the hero, all three sections,
all 15 images and every contact link are present:

```
✓ hero name renders      ✓ WhatsApp action link
✓ section 01 renders     ✓ mailto action link
✓ section 02 renders     ✓ GitHub handle
✓ section 03 dashboard   ✓ CV / Resume download links
2,439 tags · 15 images · 126,354 chars
```

Both exit non-zero on failure, so **a blank page cannot be built, let alone
deployed**. Currently: `0 errors, 0 warnings`.

---

## 🔐 Security & public access

See **[SECURITY.md](SECURITY.md)** for the full policy. Summary:

- `.gitignore` excludes `.env*`, keys, certificates, credentials, database
  dumps, `node_modules/` and `dist/` from every commit.
- Treat `VITE_*` / `NEXT_PUBLIC_*` values as **public** — they are bundled into
  client-side JavaScript.
- Rotate any credential that was ever pushed; deleting the line is not enough.
- Public repos stay fully readable: `README.md`, source browsing, `git clone`
  and release downloads all work with **no sign-in**.

---

## ♿ Accessibility & performance

- Semantic landmarks, a skip link, visible `:focus-visible` rings, and
  `aria-label`/`aria-current` on every interactive control.
- The lightbox is a real `role="dialog"` with `aria-modal`, focus restore,
  scroll lock and full keyboard control.
- Colour contrast meets WCAG AA in both themes; images carry descriptive `alt`
  text.
- `prefers-reduced-motion` disables the looping auroras, marquee, pulse rings
  and travelling dashboard elements.
- Build output: ~57 kB CSS (11 kB gzip) + ~443 kB JS (139 kB gzip); all images
  are lazy-loaded except the first three tiles.

---

MIT © Ogundipe Emmanuel Olamide