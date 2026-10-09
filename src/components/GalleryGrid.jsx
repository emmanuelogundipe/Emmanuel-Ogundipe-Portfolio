import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Expand, Layers, SlidersHorizontal } from "lucide-react";

import { assetUrl } from "../lib/assets.js";
import { useLightbox } from "./Lightbox.jsx";

/**
 * GalleryGrid — images structured into named, filterable groups.
 *
 * Group definitions live in `src/data/assets.js` (`groups[].itemIds`), so the
 * layout is driven by data, not by hard-coded markup.
 *
 * Every tile:
 *   • reveals on scroll (fade + scale),
 *   • carries the CSS sharpening/contrast rules from index.css,
 *   • opens the shared lightbox on click / Enter,
 *   • reserves space via width/height to avoid layout shift.
 */
export default function GalleryGrid({ section }) {
  const { openLightbox } = useLightbox();
  const reduce = useReducedMotion();
  const [active, setActive] = useState("all");

  const { items, groups, visible, visibleCount } = useMemo(() => {
    const byId = new Map(section.items.map((item) => [item.id, item]));
    const grouped = (section.groups ?? []).map((group) => ({
      ...group,
      items: group.itemIds.map((id) => byId.get(id)).filter(Boolean),
    }));

    // Anything not claimed by a group still gets rendered, so adding an image
    // can never make it disappear.
    const claimed = new Set(grouped.flatMap((g) => g.itemIds));
    const orphans = section.items.filter((item) => !claimed.has(item.id));
    const all = [...grouped, ...(orphans.length ? [{ id: "_other", label: "Other work", blurb: "", items: orphans }] : [])];

    const shown = active === "all" ? all : all.filter((g) => g.id === active);
    const flat = shown.flatMap((g) => g.items);

    return {
      items: section.items,
      groups: all,
      visible: shown,
      visibleCount: flat.length,
    };
  }, [section, active]);

  if (!items.length) return null;

  return (
    <div>
      {/* ---------- Filter bar ---------- */}
      {groups.length > 1 && (
        <div className="mb-8 flex flex-wrap items-center gap-2.5">
          <span className="mr-1 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter
          </span>

          <FilterChip
            active={active === "all"}
            onClick={() => setActive("all")}
            label="All work"
            count={items.length}
          />
          {groups.map((group) => (
            <FilterChip
              key={group.id}
              active={active === group.id}
              onClick={() => setActive(group.id)}
              label={group.label}
              count={group.items.length}
            />
          ))}
        </div>
      )}

      {/* ---------- Groups ---------- */}
      {visible.map((group) => (
        <section key={group.id} className="mb-12 last:mb-0">
          <header className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h4 className="inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
              <Layers className="h-4 w-4 text-brand" />
              {group.label}
            </h4>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
              {group.items.length} {group.items.length === 1 ? "project" : "projects"}
            </span>
            {group.blurb && (
              <p className="w-full text-xs leading-relaxed text-muted sm:w-auto sm:flex-1">
                {group.blurb}
              </p>
            )}
          </header>

          <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item, index) => {
              const flatIndex = items.indexOf(item);
              return (
                <motion.li
                  key={item.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 34, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: reduce ? 0.3 : 0.7,
                    delay: reduce ? 0 : (index % 6) * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <button
                    type="button"
                    onClick={() => openLightbox(visible.flatMap((g) => g.items), flatIndex)}
                    className="media media-3d media-zoom media-sharpen media-sheen group relative block w-full cursor-zoom-in !rounded-2xl text-left"
                    style={{ aspectRatio: `${item.width} / ${item.height}` }}
                    aria-label={`Open ${item.title} in full screen`}
                  >
                    <img
                      src={assetUrl(item.publicPath)}
                      alt={
                        item.alt ||
                        `${item.title} — portfolio project by Ogundipe Emmanuel Olamide`
                      }
                      width={item.width}
                      height={item.height}
                      loading={flatIndex < 3 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={flatIndex < 3 ? "high" : "auto"}
                    />

                    {/* Always-visible title bar (glass) */}
                    <span className="media-caption absolute inset-x-0 bottom-0 z-[2] flex items-center justify-between gap-2 rounded-b-2xl border-x-0 border-b-0 px-3 py-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="text-xs font-semibold leading-tight text-white">
                        {item.title}
                      </span>
                      <Expand className="h-4 w-4 shrink-0 text-white/80" />
                    </span>

                    {/* Zoom hint chip */}
                    <span className="absolute right-3 top-3 z-[2] grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Expand className="h-4 w-4" />
                    </span>

                    {/* Tags */}
                    <span className="absolute left-3 top-3 z-[2] flex flex-wrap gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {item.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/12 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-white backdrop-blur-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  </button>

                  {/* Caption below the tile (visible without hover) */}
                  <div className="mt-3 px-0.5">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h5 className="font-display text-sm font-semibold tracking-tight">
                        {item.title}
                      </h5>
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                        {String(flatIndex + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {item.caption}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </section>
      ))}

      {/* Screen-reader status for the active filter */}
      <p className="sr-only" aria-live="polite">
        Showing {visibleCount} of {items.length} projects
      </p>
    </div>
  );
}

function FilterChip({ active, onClick, label, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`chip cursor-pointer !px-3.5 !py-1.5 ${
        active
          ? "!border-brand/50 !bg-brand/15 text-ink shadow-[0_10px_24px_-14px_var(--c-brand)]"
          : "text-muted"
      }`}
    >
      {label}
      <span className="font-mono text-[0.6rem] opacity-60">{count}</span>
    </button>
  );
}