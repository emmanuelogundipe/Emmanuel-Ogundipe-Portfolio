import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, ExternalLink, FileText, X } from "lucide-react";

import { assetUrl } from "../lib/assets.js";

/**
 * In-page PDF preview.
 *
 * Renders the document inside a same-origin <iframe> so visitors can read the
 * CV / résumé without downloading it. Falls back gracefully: if a browser can't
 * display the PDF inline, the toolbar's "Open in new tab" always works.
 */
export function PdfViewer({ doc, onClose }) {
  const reduce = useReducedMotion();
  const closeRef = useRef(null);
  const restoreFocusRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    restoreFocusRef.current = document.activeElement;
    const t = window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      if (restoreFocusRef.current instanceof HTMLElement) {
        restoreFocusRef.current.focus({ preventScroll: true });
      }
    };
  }, [onClose]);

  const url = assetUrl(doc.publicPath);

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${doc.label} preview`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.25 }}
    >
      <button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out bg-black/85"
        style={{ backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)" }}
      />

      <motion.div
        className="relative z-10 flex h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl glass-strong shadow-[0_50px_110px_-40px_rgba(0,0,0,0.95)]"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 12 }}
        transition={{ duration: reduce ? 0.15 : 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-rose-500/15 ring-1 ring-rose-400/40">
              <FileText className="h-4 w-4 text-rose-300" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold tracking-tight">
                {doc.label.replace("Download ", "")}
              </p>
              <p className="truncate font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                {doc.sublabel}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <a
              href={url}
              download
              className="btn btn-ghost !px-3 !py-2 text-xs"
              title="Download a copy"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost !px-3 !py-2 text-xs"
              title="Open in a new tab"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">New tab</span>
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="btn btn-ghost !px-3 !py-2"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Document */}
        <div className="min-h-0 flex-1 bg-[#1a1a1a]">
          <iframe
            src={url}
            title={`${doc.label} preview`}
            className="h-full w-full"
          />
        </div>

        {/* Mobile fallback note */}
        <p className="border-t border-line px-4 py-2 text-center font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted sm:hidden">
          If the preview is blank, tap “New tab”
        </p>
      </motion.div>
    </motion.div>
  );
}