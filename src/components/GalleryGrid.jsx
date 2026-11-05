import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Expand, Layers, SlidersHorizontal, Sparkles } from "lucide-react";

import { assetUrl } from "../lib/assets.js";
import { useLightbox } from "./Lightbox.jsx";

/**
 * GalleryGrid — the image wall for a portfolio section.
 *
 * Two layouts, both driven by `src/data/assets.js`:
 *   • grouped  — `section.groups[].itemIds` produces named, filterable groups;
 *   • flat     — no `groups` key means one undivided grid (used by Designs),
 *                because that section is deliberately not sub-sectioned.
 *
 * `section.compactTitles` strips the tile down to the title alone: no index
 * number, no caption and no tag chips. Several Designs tiles share the same
 * one-word title on purpose.
 *
 * Link tiles (`item.kind === "link"`) render as a call-to-action card and are
 * excluded from the lightbox, which only browses real images.
 */
export default function GalleryGrid({ section }) {
  const { openLightbox } = useLightbox();
  const reduce = useReducedMotion();
  const [active, setActive] = useState("all");

  const minimal = Boolean(section.compactTitles);
  const hideTitles = Boolean(section.hideTitles);

  const images = useMemo(
    () => section.items.filter((item) => item.kind !== "link"),
    [section],
  );

  const { groups, visible } = useMemo(() => {
    const definitions = section.groups ?? [];
    if (!definitions.length) return { groups: [], visible: null };

    const byId = new Map(section.items.map((item) => [item.id, item]));
    const grouped = definitions.map((group) => ({
      ...group,
      items: group.itemIds.map((id) => byId.get(id)).filter(Boolean),
    }));

    // Anything not claimed by a group still gets rendered, so adding an image
    // can never make it disappear.
    const claimed = new Set(grouped.flatMap((g) => g.itemIds));
    const orphans = section.items.filter((item) => !claimed.has(item.id));
    const all = [
      ...grouped,
      ...(orphans.length
        ? [{ id: "_other", label: "Other work", blurb: "", items: orphans }]
        : []),
    ];

    return { groups: all, visible: active === "all" ? all : all.filter((g) => g.id === active) };
  }, [section, active]);

  if (!section.items.length) return null;

  const tile = (item, order) => (
    <GalleryTile
      key={item.id}
      item={item}
      index={images.indexOf(item)}
      order={order}
      all={images}
      onOpen={openLightbox}
      minimal={minimal}
      hideTitle={hideTitles}
      reduce={reduce}
    />
  );

  /* ---------- Flat layout ---------- */
  if (!visible) {
    return (
      <div>
        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, i) => tile(item, i))}
        </ul>
        <p className="sr-only" aria-live="polite">
          Showing {section.items.length} pieces of work
        </p>
      </div>
    );
  }

  /* ---------- Grouped layout ---------- */
  return (
    <div>
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
            count={section.items.length}
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
            {group.items.map((item) => tile(item, images.indexOf(item)))}
          </ul>
        </section>
      ))}

      <p className="sr-only" aria-live="polite">
        Showing {visible.reduce((n, g) => n + g.items.length, 0)} of{" "}
        {section.items.length} projects
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function GalleryTile({ item, index, order, all, onOpen, minimal, hideTitle, reduce }) {
  const entrance = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 34, scale: 0.96 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: reduce ? 0.3 : 0.7,
      delay: reduce ? 0 : (order % 6) * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  if (item.kind === "link") {
    return (
      <motion.li {...entrance}>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex aspect-square w-full flex-col justify-between overflow-hidden rounded-2xl p-5 text-white shadow-soft transition-transform duration-300 hover:-translate-y-1.5"
          style={{
            background:
              "linear-gradient(150deg, var(--c-brand) 0%, var(--c-brand-2) 52%, var(--c-accent) 100%)",
          }}
          aria-label={`${item.title} — ${item.linkLabel || "open link"}`}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25 transition-opacity duration-500 group-hover:opacity-45"
            style={{
              backgroundImage:
                "linear-gradient(rgb(255 255 255 / 0.22) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.22) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/25 blur-2xl transition-transform duration-700 group-hover:scale-125"
          />

          <span className="relative z-10 flex items-center justify-between">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/18 ring-1 ring-white/35 backdrop-blur-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
              <Sparkles className="h-5 w-5" />
            </span>
            <ArrowUpRight className="h-5 w-5 opacity-80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>

          <span className="relative z-10 block">
            <span className="block font-display text-lg font-bold leading-tight tracking-tight">
              {item.title}
            </span>
            {item.linkLabel && (
              <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-white/85">
                {item.linkLabel}
              </span>
            )}
          </span>
        </a>
      </motion.li>
    );
  }

  const canOpen = Boolean(item.publicPath);

  return (
    <motion.li {...entrance}>
      <button
        type="button"
        onClick={() => canOpen && onOpen(all, index)}
        className="media media-3d media-zoom media-sharpen media-sheen group relative block w-full cursor-zoom-in !rounded-2xl text-left"
        style={{ aspectRatio: `${item.width} / ${item.height}` }}
        aria-label={`Open ${item.alt || item.title} in full screen`}
      >
        <img
          src={assetUrl(item.publicPath)}
          alt={item.alt || `${item.title} — portfolio project by Ogundipe Emmanuel Olamide`}
          width={item.width}
          height={item.height}
          loading={order < 3 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={order < 3 ? "high" : "auto"}
        />

        {/* Hover title bar (glass) */}
        {!hideTitle && (
          <span className="media-caption absolute inset-x-0 bottom-0 z-[2] flex items-center justify-between gap-2 rounded-b-2xl border-x-0 border-b-0 px-3 py-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <span className="text-xs font-semibold leading-tight text-white">
              {item.title}
            </span>
            <Expand className="h-4 w-4 shrink-0 text-white/80" />
          </span>
        )}

        {/* Zoom hint chip */}
        <span className="absolute right-3 top-3 z-[2] grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-focus-visible:opacity-100">
          <Expand className="h-4 w-4" />
        </span>

        {/* Tags */}
        {!minimal && item.tags?.length > 0 && (
          <span className="absolute left-3 top-3 z-[2] flex flex-wrap gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/12 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-white backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </span>
        )}
      </button>

      {/* Caption below the tile */}
      {hideTitle ? null : minimal ? (
        <p className="mt-2.5 px-0.5 font-display text-sm font-semibold tracking-tight">
          {item.title}
        </p>
      ) : (
        <div className="mt-3 px-0.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h5 className="font-display text-sm font-semibold tracking-tight">
              {item.title}
            </h5>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted">{item.caption}</p>
        </div>
      )}
    </motion.li>
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
