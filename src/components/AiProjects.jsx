import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Lock, ShieldCheck } from "lucide-react";

/**
 * AiProjects — the two shipped AI-assisted web applications.
 *
 * Neither card embeds or screenshots the live product. Both show an
 * abstract, animated flow diagram instead, so nothing private (accounts,
 * records, review content) can ever be read from the portfolio.
 */

function FlowDiagram({ steps, loop, gradientId }) {
  const width = 340;
  const padX = 34;
  const y = 30;
  const gap = (width - padX * 2) / (steps.length - 1);

  return (
    <svg
      viewBox={`0 0 ${width} 82`}
      className="h-auto w-full"
      role="img"
      aria-label={`Application flow: ${steps.join(" → ")}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--c-brand)" />
          <stop offset="100%" stopColor="var(--c-accent)" />
        </linearGradient>
      </defs>

      {/* base rail */}
      <line
        x1={padX}
        y1={y}
        x2={width - padX}
        y2={y}
        stroke="var(--c-line-strong)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* drawn-in rail */}
      <motion.line
        x1={padX}
        y1={y}
        x2={width - padX}
        y2={y}
        stroke={`url(#${gradientId})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* travelling packet */}
      <motion.circle
        r="4"
        cy={y}
        fill="var(--c-accent)"
        initial={{ cx: padX, opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        animate={loop ? { cx: [padX, width - padX], opacity: [0, 1, 1, 0] } : { cx: padX }}
        transition={{
          cx: { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
          opacity: { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
        }}
      />

      {steps.map((step, i) => {
        const x = padX + i * gap;
        const last = i === steps.length - 1;

        return (
          <g key={step}>
            {/* pulse ring */}
            <motion.circle
              cx={x}
              cy={y}
              r="9"
              fill="none"
              stroke={last ? "var(--c-accent)" : "var(--c-brand)"}
              strokeWidth="1.4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.55 }}
              viewport={{ once: true }}
              animate={loop ? { scale: [1, 1.8], opacity: [0.55, 0] } : {}}
              transition={{
                scale: { duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 0.9 + i * 0.55 },
                opacity: { duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 0.9 + i * 0.55 },
              }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />

            <motion.circle
              cx={x}
              cy={y}
              r="8"
              fill="var(--c-canvas-soft)"
              stroke={last ? "var(--c-accent)" : "var(--c-brand)"}
              strokeWidth="2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: 0.15 + i * 0.14,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <motion.circle
              cx={x}
              cy={y}
              r="3"
              fill={last ? "var(--c-accent)" : "var(--c-brand)"}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.3 + i * 0.14 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />

            <motion.text
              x={x}
              y="56"
              textAnchor="middle"
              fontSize="7.4"
              fontWeight="600"
              fill="var(--c-ink)"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.14 }}
            >
              {step}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

export default function AiProjects({ projects = [] }) {
  const reduce = useReducedMotion();
  const loop = !reduce;

  return (
    <div className="mt-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
          Live applications
        </h3>
        <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-accent" />
          Flow previews only · no personal data
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col overflow-hidden rounded-2xl glass p-5 shadow-soft transition-colors duration-300 hover:border-line-strong sm:p-6"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
              style={{
                background:
                  project.tone === "emerald"
                    ? "radial-gradient(circle, var(--c-accent), transparent 70%)"
                    : "radial-gradient(circle, var(--c-brand-2), transparent 70%)",
              }}
            />

            <div className="relative flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand">
                  {project.tag}
                </span>
                <h4 className="mt-2 font-display text-lg font-bold leading-snug tracking-tight">
                  {project.title}
                </h4>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/12 text-brand ring-1 ring-brand/25">
                <Lock className="h-4.5 w-4.5" />
              </span>
            </div>

            <p className="relative mt-3 text-sm leading-relaxed text-muted">
              {project.summary}
            </p>

            <div className="relative mt-5 rounded-xl border border-line bg-[var(--c-surface-2)]/55 px-3 py-2">
              <FlowDiagram
                steps={project.steps}
                loop={loop}
                gradientId={`flow-${project.id}`}
              />
            </div>

            <div className="relative mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                {project.note}
              </span>

              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost !px-4 !py-2.5 text-xs"
              >
                Visit live app
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
