import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  X,
  ZoomIn,
} from "lucide-react";

import { assetUrl } from "../lib/assets.js";

const LightboxContext = createContext(null);

/** Provider: wrap the app once, then call `openLightbox(items, index)` anywhere. */
export function LightboxProvider({ children }) {
  const [state, setState] = useState({ open: false, items: [], index: 0 });

  const openLightbox = useCallback((items, index = 0) => {
    setState({ open: true, items, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  const go = useCallback((delta) => {
    setState((s) => ({
      ...s,
      index: (s.index + delta + s.items.length) % s.items.length,
    }));
  }, []);

  const jumpTo = useCallback((index) => {
    setState((s) => ({ ...s, index }));
  }, []);

  const value = useMemo(
    () => ({ openLightbox }),
    [openLightbox],
  );

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <LightboxModal
        state={state}
        close={closeLightbox}
        go={go}
        jumpTo={jumpTo}
      />
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used inside <LightboxProvider>");
  return ctx;
}

/** The modal itself — mounted once, animated in/out with AnimatePresence. */
function LightboxModal({ state, close, go, jumpTo }) {
  const { open, items, index } = state;
  const reduce = useReducedMotion();
  const closeRef = useRef(null);
  const restoreFocusRef = useRef(null);
  const [zoomed, setZoomed] = useState(false);

  const item = items[index];

  // Close on Escape, navigate with arrows / Home / End.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Home") jumpTo(0);
      if (e.key === "End") jumpTo(items.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, jumpTo, items.length, close]);

  // Lock page scroll, move focus in, restore it on close.
  useEffect(() => {
    if (!open) return undefined;
    restoreFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(t);
      setZoomed(false);
      if (restoreFocusRef.current instanceof HTMLElement) {
        restoreFocusRef.current.focus({ preventScroll: true });
      }
    };
  }, [open]);

  const hasNav = items.length > 1;

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} — image ${index + 1} of ${items.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.28 }}
        >
          {/* Backdrop: heavy blur + dim */}
          <motion.button
            type="button"
            aria-label="Close lightbox"
            onClick={close}
            className="absolute inset-0 cursor-zoom-out bg-black/85"
            style={{ backdropFilter: "blur(26px)", WebkitBackdropFilter: "blur(26px)" }}
          />

          <motion.div
            className="relative z-10 flex max-h-full w-full max-w-6xl flex-col gap-3"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 rounded-2xl glass px-3 py-2 sm:px-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold sm:text-base">
                  {item.title}
                </p>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                  Image {index + 1} of {items.length}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <a
                  href={assetUrl(item.publicPath)}
                  download
                  className="btn btn-ghost !px-3 !py-2 text-xs"
                  title="Download this image"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  className="btn btn-ghost !px-3 !py-2"
                  aria-label="Close lightbox"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Image stage */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl">
              {hasNav && (
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="absolute left-1 z-10 grid h-11 w-11 place-items-center rounded-full glass-strong text-ink transition hover:scale-110 hover:bg-brand hover:text-white sm:left-3 sm:h-12 sm:w-12"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={item.id}
                  src={assetUrl(item.publicPath)}
                  alt={item.alt || item.title}
                  width={item.width}
                  height={item.height}
                  drag={reduce || zoomed ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -110) go(1);
                    if (info.offset.x > 110) go(-1);
                  }}
                  onDoubleClick={() => setZoomed((z) => !z)}
                  animate={{ scale: zoomed ? 1.7 : 1, x: 0 }}
                  className={`max-h-[58vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] sm:max-h-[64vh] ${
                    zoomed
                      ? "cursor-zoom-out overflow-y-auto"
                      : "cursor-zoom-in"
                  }`}
                  style={{
                    imageRendering: "auto",
                    filter: "url(#crispen) contrast(1.07) saturate(1.09)",
                    transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                  }}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>

              {hasNav && (
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="absolute right-1 z-10 grid h-11 w-11 place-items-center rounded-full glass-strong text-ink transition hover:scale-110 hover:bg-brand hover:text-white sm:right-3 sm:h-12 sm:w-12"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Caption + filmstrip */}
            <div className="rounded-2xl glass px-3 py-3 sm:px-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="flex-1 basis-full text-xs leading-relaxed text-muted sm:basis-auto sm:text-sm">
                  {item.caption}
                </p>
                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  className="btn btn-ghost !px-3 !py-1.5 text-xs"
                  aria-pressed={zoomed}
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                  {zoomed ? "Fit" : "Zoom"}
                </button>
              </div>

              {hasNav && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {items.map((thumb, i) => (
                    <button
                      key={thumb.id}
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-label={`View ${thumb.title}`}
                      aria-current={i === index}
                      className={`media media-3d h-12 w-16 shrink-0 !rounded-lg transition ${
                        i === index
                          ? "ring-2 ring-brand ring-offset-2 ring-offset-[#06070d]"
                          : "opacity-55 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={assetUrl(thumb.publicPath)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              )}

              <p className="mt-3 hidden items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted sm:flex">
                <Maximize2 className="h-3 w-3" /> Double-click to zoom · swipe or
                use ← → to browse · Esc to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}