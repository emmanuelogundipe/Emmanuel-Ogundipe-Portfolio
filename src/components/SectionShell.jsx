import { motion, useReducedMotion } from "framer-motion";
import { Images, Sparkles } from "lucide-react";

import GalleryGrid from "./GalleryGrid.jsx";
import { Eyebrow, Reveal } from "./Reveal.jsx";

/**
 * SectionShell — the shared layout for every portfolio section:
 * numbered header, deliverable cards and (optionally) an image gallery.
 */
export default function SectionShell({
  section,
  icon: Icon,
  children,
  showCount = true,
}) {
  const reduce = useReducedMotion();
  const { index, kicker, title, blurb, deliverables, items } = section;

  return (
    <section id={section.id} className="scroll-mt-28 py-20 sm:py-28">
      <div className="shell">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end">
          <div>
            <Eyebrow>{`Section ${index}`}</Eyebrow>

            <div className="mt-5 flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl glass text-brand shadow-soft">
                {Icon ? <Icon className="h-6 w-6" /> : null}
              </span>
              <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">
                {kicker}
              </h2>
            </div>

            <Reveal delay={0.08}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {title}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted/90 sm:text-base">
                {blurb}
              </p>
            </Reveal>
          </div>

          {/* Right rail — quick facts */}
          <Reveal delay={0.14} className="lg:justify-self-end">
            <div className="flex items-center gap-3 rounded-2xl glass px-5 py-4 shadow-soft">
              <motion.span
                animate={reduce ? {} : { rotate: [0, 6, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-2 text-white"
              >
                {items?.length ? (
                  <Images className="h-5 w-5" />
                ) : (
                  <Sparkles className="h-5 w-5" />
                )}
              </motion.span>
              <div>
                {showCount && items?.length > 0 && (
                  <p className="font-display text-2xl font-bold leading-none">
                    {items.length}
                  </p>
                )}
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                  {items?.length
                    ? "Projects documented below"
                    : "Live animated dashboard below"}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Deliverables */}
        <ul className="mt-12 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((d, i) => (
            <Reveal
              key={d.title}
              as="li"
              delay={0.06 * i}
              y={24}
              className="group relative overflow-hidden rounded-2xl glass p-5 shadow-soft transition-colors duration-300 hover:border-line-strong"
            >
              <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold leading-snug">
                {d.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.text}</p>
            </Reveal>
          ))}
        </ul>

        {children}

        {/* Gallery */}
        {items?.length > 0 && (
          <div className="mt-14">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                Project gallery
              </h3>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                Click any image to expand
              </span>
            </div>
            <GalleryGrid section={section} />
          </div>
        )}
      </div>
    </section>
  );
}