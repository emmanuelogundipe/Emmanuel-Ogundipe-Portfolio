import { motion, useReducedMotion } from "framer-motion";
import { Expand } from "lucide-react";

import { assetUrl } from "../lib/assets.js";
import { useLightbox } from "./Lightbox.jsx";

/**
 * GalleryGrid — responsive, masonry-feel grid of portfolio images.
 * Every tile:
 *   • reveals on scroll (fade + scale),
 *   • carries the CSS sharpening/contrast rules from index.css,
 *   • opens the shared lightbox on click / Enter,
 *   • reserves space via width/height to avoid layout shift.
 */
export default function GalleryGrid({ items, columns = 3 }) {
  const { openLightbox } = useLightbox();
  const reduce = useReducedMotion();

  const openAt = (index) => openLightbox(items, index);

  const spanFor = (index) => {
    // A gentle editorial rhythm: every 7th tile spans two columns.
    if (columns < 2) return "";
    if ((index + 1) % 7 === 0) return "sm:col-span-2";
    return "";
  };

  return (
    <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <motion.li
          key={item.id}
          className={spanFor(index)}
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
            onClick={() => openAt(index)}
            className="media media-3d media-zoom media-sharpen media-sheen group relative block w-full cursor-zoom-in !rounded-2xl text-left"
            style={{ aspectRatio: `${item.width} / ${item.height}` }}
            aria-label={`Open ${item.title} in full screen`}
          >
            <img
              src={assetUrl(item.publicPath)}
              alt={item.alt || `${item.title} — portfolio project by Ogundipe Emmanuel Olamide`}
              width={item.width}
              height={item.height}
              loading={index < 3 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index < 3 ? "high" : "auto"}
            />

            {/* Always-visible title bar (glass) */}
            <span className="media-caption absolute inset-x-0 bottom-0 z-[2] flex items-center justify-between gap-2 rounded-b-2xl border-x-0 border-b-0 px-3 py-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="text-xs font-semibold leading-tight text-white">
                {item.title}
              </span>
              <Expand className="h-4 w-4 shrink-0 text-white/80" />
            </span>

            {/* Zoom hint chip */}
            <span className="absolute right-3 top-3 z-[2] grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:scale-110">
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
              <h4 className="font-display text-sm font-semibold tracking-tight">
                {item.title}
              </h4>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {item.caption}
            </p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}