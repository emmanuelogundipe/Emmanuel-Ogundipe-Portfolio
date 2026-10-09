import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Cpu,
  Eye,
  FileText,
  GraduationCap,
  MapPin,
  Palette,
  Presentation,
  Sparkles,
} from "lucide-react";

import { documents, profile, profilePhoto } from "../data/assets.js";
import { assetUrl } from "../lib/assets.js";
import { PdfViewer } from "./DocumentViewer.jsx";
import { AnimatePresence } from "framer-motion";

/* Tone -> colour pairs for the four skill badges. */
const TONE = {
  amber: "from-amber-400/25 to-orange-500/10 text-amber-200 ring-amber-400/35",
  violet: "from-violet-500/25 to-fuchsia-500/10 text-violet-200 ring-violet-400/35",
  emerald:
    "from-emerald-400/25 to-teal-500/10 text-emerald-200 ring-emerald-400/35",
  sky: "from-sky-400/25 to-cyan-500/10 text-sky-200 ring-sky-400/35",
};

const TONE_ICON = {
  amber: Palette,
  violet: Sparkles,
  emerald: Cpu,
  sky: Presentation,
};

const STATS = [
  { value: "12+", label: "Design & brand assets" },
  { value: "2", label: "IoT systems built" },
  { value: "4", label: "Core disciplines" },
];

/** A download button with the classic red PDF document mark. */
function DocumentButton({ doc, variant = "ghost", onView }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={assetUrl(doc.publicPath)}
        download
        className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} group/doc relative overflow-hidden`}
        title={`${doc.label} (PDF)`}
      >
        <span className="relative z-10 grid h-8 w-8 place-items-center rounded-lg bg-rose-500/15 ring-1 ring-rose-400/40 transition-transform duration-300 group-hover/doc:scale-110">
          <FileText className="h-4 w-4 text-rose-300" />
          <span className="absolute -bottom-1.5 rounded-sm bg-rose-500 px-1 text-[0.42rem] font-bold tracking-wider text-white">
            PDF
          </span>
        </span>
        <span className="relative z-10 text-left leading-tight">
          <span className="block">{doc.label}</span>
          <span className="block text-[0.62rem] font-medium uppercase tracking-[0.14em] opacity-60">
            {doc.sublabel.split(" · ")[0]}
          </span>
        </span>
        <ArrowUpRight className="relative z-10 h-4 w-4 opacity-60 transition-transform duration-300 group-hover/doc:-translate-y-0.5 group-hover/doc:translate-x-0.5" />
      </a>

      <button
        type="button"
        onClick={() => onView(doc.id)}
        className={`btn ${variant === "primary" ? "btn-ghost" : "btn-ghost"}`}
        aria-haspopup="dialog"
      >
        <Eye className="h-4 w-4" />
        <span className="text-left leading-tight">
          <span className="block">View {doc.id === "cv" ? "CV" : "Résumé"}</span>
          <span className="block text-[0.62rem] font-medium uppercase tracking-[0.14em] opacity-60">
            Read in browser
          </span>
        </span>
      </button>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [viewingId, setViewingId] = useState(null);
  const words = profile.name.split(" ");

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  };
  const word = {
    hidden: { opacity: 0, y: reduce ? 0 : 28, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <header id="home" className="relative isolate overflow-hidden scroll-mt-28 pt-28 sm:pt-32 lg:pt-36">
      {/* Background layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0" />
        <div
          className="animate-aurora absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full opacity-45 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--aurora-a), transparent 65%)" }}
        />
        <div
          className="animate-aurora absolute -right-32 top-24 h-[32rem] w-[32rem] rounded-full opacity-35 blur-[120px]"
          style={{
            background: "radial-gradient(circle, var(--aurora-b), transparent 65%)",
            animationDelay: "-6s",
          }}
        />
        <div
          className="animate-aurora absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full opacity-25 blur-[110px]"
          style={{
            background: "radial-gradient(circle, var(--aurora-c), transparent 65%)",
            animationDelay: "-12s",
          }}
        />
        <div className="noise absolute inset-0" />
      </div>

      <div className="shell grid items-center gap-14 pb-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
        {/* ---------------- Left ---------------- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="chip"
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                style={{ animation: "pulse-ring 2.2s cubic-bezier(0,0,.2,1) infinite" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for freelance &amp; project work
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-7 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-[4.1rem]"
          >
            {words.map((w, i) => (
              <motion.span key={`${w}-${i}`} variants={word} className="mr-[0.25em] inline-block">
                {i === 0 ? <span className="text-gradient">{w}</span> : w}
              </motion.span>
            ))}
            <motion.span
              variants={word}
              className="mt-2 block text-base font-medium tracking-normal text-muted sm:text-lg"
            >
              {profile.roles.join(" · ")}
            </motion.span>
          </motion.h1>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted sm:text-sm"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-brand" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-brand" />
              {profile.institution}
            </span>
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-muted sm:text-[1.05rem]"
          >
            {profile.summary}
          </motion.p>

          {/* Skill badges */}
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.75 } },
            }}
            className="mt-8 flex list-none flex-wrap gap-2.5 p-0"
          >
            {profile.skills.map((skill) => {
              const Icon = TONE_ICON[skill.tone] || Sparkles;
              return (
                <motion.li
                  key={skill.label}
                  variants={{
                    hidden: { opacity: 0, y: 16, scale: 0.94 },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className={`chip !px-3.5 !py-2 bg-gradient-to-br ring-1 ${TONE[skill.tone]}`}
                >
                  <Icon className="h-4 w-4" />
                  {skill.label}
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Documents */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            {documents.map((doc, i) => (
              <DocumentButton
                key={doc.id}
                doc={doc}
                variant={i === 0 ? "primary" : "ghost"}
                onView={setViewingId}
              />
            ))}
            <a href="#work" className="btn btn-ghost">
              <ArrowDown className="h-4 w-4" />
              Explore my work
            </a>
          </motion.div>
        </div>

        {/* ---------------- Right: avatar ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          {/* Rotating conic glow ring */}
          <div
            className="animate-spin-slow absolute -inset-6 rounded-full opacity-70 blur-2xl"
            style={{
              background:
                "conic-gradient(from 0deg, var(--c-brand), var(--c-accent), var(--c-ember), var(--c-brand))",
            }}
          />
          <div
            className="animate-spin-slow absolute -inset-6 rounded-full opacity-40 blur-2xl"
            style={{
              background:
                "conic-gradient(from 180deg, var(--c-brand-2), transparent 55%, var(--c-accent))",
              animationDirection: "reverse",
              animationDuration: "22s",
            }}
          />

          <div className="relative">
            <div className="media media-3d relative aspect-[3/4] w-full !rounded-[2.25rem] p-1.5"
              style={{
                background:
                  "linear-gradient(140deg, var(--c-brand), var(--c-accent) 45%, var(--c-brand-2))",
              }}
            >
              <div className="media h-full w-full !rounded-[1.9rem]">
                <img
                  src={assetUrl(profilePhoto.publicPath)}
                  alt={profilePhoto.alt}
                  width={profilePhoto.width}
                  height={profilePhoto.height}
                  className="!object-cover object-[50%_28%]"
                  style={{
                    imageRendering: "auto",
                    filter: "url(#crispen) contrast(1.07) saturate(1.1) brightness(1.03)",
                  }}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>

            {/* Floating stat chips */}
            <motion.div
              className="absolute -left-4 top-10 hidden rounded-2xl glass px-4 py-3 shadow-soft sm:block"
              animate={reduce ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="font-display text-xl font-bold leading-none text-gradient">
                {STATS[0].value}
              </p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                {STATS[0].label}
              </p>
            </motion.div>

            <motion.div
              className="absolute -right-3 bottom-12 hidden rounded-2xl glass px-4 py-3 shadow-soft sm:block"
              animate={reduce ? {} : { y: [0, 14, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            >
              <p className="font-display text-xl font-bold leading-none text-gradient">
                {STATS[1].value}
              </p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                {STATS[1].label}
              </p>
            </motion.div>

            <motion.div
              className="absolute -right-2 top-6 hidden rounded-2xl glass px-4 py-3 shadow-soft lg:block"
              animate={reduce ? {} : { y: [0, -10, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.4,
              }}
            >
              <p className="font-display text-xl font-bold leading-none text-gradient">
                {STATS[2].value}
              </p>
              <p className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                {STATS[2].label}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Inline CV / Résumé preview */}
      <AnimatePresence>
        {viewingId && (
          <PdfViewer
            doc={documents.find((d) => d.id === viewingId)}
            onClose={() => setViewingId(null)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}