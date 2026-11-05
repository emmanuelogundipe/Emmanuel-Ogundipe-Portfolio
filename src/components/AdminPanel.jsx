import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  FileText,
  Lock,
  RotateCcw,
  ShieldAlert,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { useDocuments } from "./DocumentsProvider.jsx";

/**
 * AdminPanel — the "Admin" button in the footer.
 *
 * Gate: PIN 5588 (client-side only — see the disclaimer inside the panel).
 * Actions: replace a document with a PDF, hide it from the site, or restore
 * the file that ships with the repository.
 */

const ADMIN_PIN = "5588";

export default function AdminPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn btn-ghost !px-4 !py-2.5 text-xs"
        aria-haspopup="dialog"
      >
        <Lock className="h-4 w-4" />
        Admin
      </button>

      <AnimatePresence>
        {open && <AdminDialog onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function AdminDialog({ onClose }) {
  const reduce = useReducedMotion();
  const { documents, upload, remove, restore } = useDocuments();

  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [attempt, setAttempt] = useState(0);

  const inputRef = useRef(null);
  const closeRef = useRef(null);
  const restoreFocusRef = useRef(null);

  useEffect(() => {
    restoreFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const focusTimer = window.setTimeout(() => {
      (authed ? closeRef.current : inputRef.current)?.focus();
    }, 80);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      if (restoreFocusRef.current instanceof HTMLElement) {
        restoreFocusRef.current.focus({ preventScroll: true });
      }
    };
  }, [onClose, authed]);

  const submitPin = (event) => {
    event.preventDefault();
    if (pin.trim() === ADMIN_PIN) {
      setAuthed(true);
      setError("");
      setPin("");
      return;
    }
    setError("Incorrect PIN. Try again.");
    setAttempt((value) => value + 1);
    setPin("");
    inputRef.current?.focus();
  };

  const run = async (id, action) => {
    setBusyId(id);
    setStatus("");
    try {
      await action();
      setStatus("Saved.");
    } catch (cause) {
      setStatus(cause?.message || "Something went wrong.");
    } finally {
      setBusyId(null);
    }
  };

  const onFile = (doc, event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    run(doc.id, () => upload(doc.id, file));
  };

  return (
    <motion.div
      className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.25 }}
    >
      <button
        type="button"
        aria-label="Close admin panel"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/85"
        style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
      />

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: reduce ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl glass-strong shadow-[0_50px_110px_-40px_rgba(0,0,0,0.95)]"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/12 text-brand ring-1 ring-brand/25">
              <Lock className="h-4 w-4" />
            </span>
            <div>
              <h2 id="admin-title" className="font-display text-sm font-semibold tracking-tight">
                Document admin
              </h2>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                CV &amp; résumé control
              </p>
            </div>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="btn btn-ghost !px-3 !py-2"
            aria-label="Close admin panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[72vh] overflow-y-auto px-5 py-5">
          {!authed ? (
            <motion.form
              key={`pin-${attempt}`}
              onSubmit={submitPin}
              initial={reduce ? {} : { x: 0 }}
              animate={reduce || attempt === 0 ? {} : { x: [0, -8, 8, -5, 5, 0] }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              <p className="text-sm leading-relaxed text-muted">
                Enter the 4-digit PIN to manage the documents shown on the site.
              </p>

              <label className="block">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                  PIN
                </span>
                <input
                  ref={inputRef}
                  type="password"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={4}
                  value={pin}
                  onChange={(event) => {
                    setPin(event.target.value.replace(/\D/g, "").slice(0, 4));
                    setError("");
                  }}
                  placeholder="••••"
                  className="mt-2 w-full rounded-xl border border-line bg-[var(--c-surface-2)] px-4 py-3 text-center font-mono text-2xl tracking-[0.5em] text-ink outline-none transition focus:border-brand"
                />
              </label>

              {error && (
                <p role="alert" className="text-xs font-medium text-rose-400">
                  {error}
                </p>
              )}

              <button type="submit" className="btn btn-primary w-full justify-center">
                Unlock
              </button>
            </motion.form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3.5">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <p className="text-[0.7rem] leading-relaxed text-muted">
                  <strong className="font-semibold text-ink">Browser-only changes.</strong>{" "}
                  Uploads are stored in this browser and swap the CV / résumé link on
                  this device only. To change the documents for{" "}
                  <em>every</em> visitor, replace the PDFs in{" "}
                  <code className="font-mono">public/documents/</code> and redeploy.
                </p>
              </div>

              <ul className="space-y-3">
                {documents.map((doc) => (
                  <li
                    key={doc.id}
                    className="rounded-xl border border-line bg-[var(--c-surface-2)]/50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 font-display text-sm font-semibold">
                          <FileText className="h-4 w-4 shrink-0 text-rose-300" />
                          {doc.id === "cv" ? "CV" : "Résumé"}
                        </p>
                        <p className="mt-1 truncate text-xs text-muted">
                          {doc.hidden
                            ? "Hidden from the site"
                            : doc.custom
                              ? doc.customName
                              : "Repository file (default)"}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.12em] ${
                          doc.hidden
                            ? "bg-rose-500/15 text-rose-300"
                            : doc.custom
                              ? "bg-emerald-400/15 text-emerald-300"
                              : "bg-white/8 text-muted"
                        }`}
                      >
                        {doc.hidden ? "Hidden" : doc.custom ? "Custom" : "Default"}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <label
                        className={`btn btn-ghost !px-3 !py-2 text-[0.68rem] ${
                          busyId === doc.id ? "pointer-events-none opacity-50" : "cursor-pointer"
                        }`}
                      >
                        <Upload className="h-3.5 w-3.5" />
                        Upload PDF
                        <input
                          type="file"
                          accept="application/pdf,.pdf"
                          className="sr-only"
                          onChange={(event) => onFile(doc, event)}
                          disabled={busyId === doc.id}
                        />
                      </label>

                      {!doc.hidden && (
                        <button
                          type="button"
                          onClick={() => run(doc.id, () => remove(doc.id))}
                          disabled={busyId === doc.id}
                          className="btn btn-ghost !px-3 !py-2 text-[0.68rem] text-rose-300 disabled:opacity-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      )}

                      {(doc.custom || doc.hidden) && (
                        <button
                          type="button"
                          onClick={() => run(doc.id, () => restore(doc.id))}
                          disabled={busyId === doc.id}
                          className="btn btn-ghost !px-3 !py-2 text-[0.68rem] disabled:opacity-50"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Restore default
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <p
                role="status"
                aria-live="polite"
                className="flex min-h-[1.1rem] items-center gap-1.5 text-[0.7rem] text-emerald-300"
              >
                {status && (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {status}
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
