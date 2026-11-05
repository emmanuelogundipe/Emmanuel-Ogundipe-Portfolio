import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Radio, Wifi } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Animated SVG marks — one per IoT / Robotics & STEM highlight               */
/*  All three are hand-drawn SVGs (not icon fonts) so each part can move       */
/*  independently. Loops are skipped under `prefers-reduced-motion`.           */
/* -------------------------------------------------------------------------- */

function SolarHouseIcon({ loop }) {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
      {/* sun with rotating rays */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={loop ? { rotate: 360 } : {}}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="72"
            y1="5"
            x2="72"
            y2="11"
            stroke="var(--c-ember)"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.9"
            transform={`rotate(${i * 45} 72 21)`}
          />
        ))}
      </motion.g>
      <motion.circle
        cx="72"
        cy="21"
        r="7"
        fill="var(--c-ember)"
        animate={loop ? { opacity: [0.75, 1, 0.75] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* roof */}
      <motion.path
        d="M10 50 L42 24 L74 50"
        fill="none"
        stroke="var(--c-brand)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      {/* body */}
      <motion.rect
        x="18"
        y="50"
        width="48"
        height="34"
        rx="3"
        fill="rgb(var(--c-brand-rgb) / 0.14)"
        stroke="var(--c-brand)"
        strokeWidth="2.5"
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
      />

      {/* ESP chip on the wall */}
      <motion.rect
        x="36"
        y="58"
        width="16"
        height="12"
        rx="2.5"
        fill="var(--c-canvas-soft)"
        stroke="var(--c-accent)"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      />
      <motion.circle
        cx="44"
        cy="64"
        r="2"
        fill="var(--c-accent)"
        animate={loop ? { opacity: [1, 0.25, 1] } : {}}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* wireless arcs */}
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M${58 + i * 5} ${64 - i * 6} q${5 + i * 3} ${-5 - i * 3} ${10 + i * 6} 0`}
          fill="none"
          stroke="var(--c-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          animate={loop ? { opacity: [0.15, 0.95, 0.15] } : {}}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </svg>
  );
}

function ArduinoIcon({ loop }) {
  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
      <motion.rect
        x="10"
        y="24"
        width="76"
        height="50"
        rx="8"
        fill="rgb(var(--c-brand-rgb) / 0.12)"
        stroke="var(--c-brand)"
        strokeWidth="2.5"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />

      {/* pin headers */}
      {[0, 1].map((row) =>
        Array.from({ length: 10 }).map((_, i) => (
          <motion.rect
            key={`${row}-${i}`}
            x={18 + i * 6.4}
            y={row === 0 ? 29 : 63}
            width="3.4"
            height="3.4"
            rx="1"
            fill="var(--c-muted)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.75 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.03, duration: 0.3 }}
          />
        )),
      )}

      {/* microcontroller */}
      <rect
        x="32"
        y="38"
        width="30"
        height="22"
        rx="3"
        fill="var(--c-surface-2)"
        stroke="var(--c-line-strong)"
        strokeWidth="1.6"
      />
      <motion.circle
        cx="47"
        cy="49"
        r="4"
        fill="none"
        stroke="var(--c-accent)"
        strokeWidth="1.6"
        animate={loop ? { scale: [1, 1.5, 1], opacity: [0.9, 0.2, 0.9] } : {}}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
      <circle cx="47" cy="49" r="2" fill="var(--c-accent)" />

      {/* blinking LED */}
      <motion.circle
        cx="72"
        cy="49"
        r="3.4"
        fill="var(--c-ember)"
        animate={loop ? { opacity: [1, 0.15, 1] } : {}}
        transition={{ duration: 1.1, repeat: Infinity, ease: "steps(2, end)" }}
      />
      <motion.circle
        cx="72"
        cy="49"
        r="3.4"
        fill="var(--c-ember)"
        animate={loop ? { scale: [1, 2.6], opacity: [0.55, 0] } : {}}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />

      {/* drawn-in circuit trace */}
      <motion.path
        d="M18 71 H28 V58 H32"
        fill="none"
        stroke="var(--c-accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
      />
    </svg>
  );
}

function StemIcon({ loop }) {
  const ORBITS = [
    { rotate: 0, duration: 9 },
    { rotate: 60, duration: 13 },
    { rotate: 120, duration: 7 },
  ];

  return (
    <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden="true">
      {ORBITS.map((orbit, i) => (
        <g key={i}>
          <ellipse
            cx="48"
            cy="48"
            rx="34"
            ry="14"
            fill="none"
            stroke="var(--c-brand)"
            strokeWidth="1.3"
            strokeOpacity="0.45"
            transform={`rotate(${orbit.rotate} 48 48)`}
          />
          <motion.g
            style={{ transformBox: "view-box", transformOrigin: "48px 48px" }}
            initial={{ rotate: orbit.rotate }}
            animate={loop ? { rotate: orbit.rotate + 360 } : { rotate: orbit.rotate }}
            transition={{
              duration: orbit.duration,
              repeat: loop ? Infinity : 0,
              ease: "linear",
              delay: i * 0.4,
            }}
          >
            <circle
              cx="82"
              cy="48"
              r="3.4"
              fill={i === 1 ? "var(--c-accent)" : "var(--c-brand-2)"}
            />
          </motion.g>
        </g>
      ))}

      <motion.circle
        cx="48"
        cy="48"
        r="10"
        fill="rgb(var(--c-brand-rgb) / 0.16)"
        stroke="var(--c-brand)"
        strokeWidth="2.4"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
      <motion.circle
        cx="48"
        cy="48"
        r="9"
        fill="none"
        stroke="var(--c-accent)"
        strokeWidth="1.4"
        animate={loop ? { scale: [1, 1.6], opacity: [0.7, 0] } : {}}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
      <circle cx="48" cy="48" r="3.4" fill="var(--c-accent)" />
    </svg>
  );
}

const ICONS = {
  solar: SolarHouseIcon,
  arduino: ArduinoIcon,
  stem: StemIcon,
};

const TONE = {
  solar: {
    ring: "ring-ember/35",
    glow: "rgb(var(--c-ember-rgb) / 0.16)",
    chip: "bg-ember/12 text-ember",
    Icon: Wifi,
  },
  arduino: {
    ring: "ring-accent/35",
    glow: "rgb(var(--c-accent-rgb) / 0.16)",
    chip: "bg-accent/12 text-accent",
    Icon: Cpu,
  },
  stem: {
    ring: "ring-brand-2/35",
    glow: "rgb(var(--c-brand-2-rgb) / 0.16)",
    chip: "bg-brand-2/12 text-brand-2",
    Icon: Radio,
  },
};

export default function IoTHighlights({ highlights = [] }) {
  const reduce = useReducedMotion();
  const loop = !reduce;

  return (
    <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {highlights.map((item, i) => {
        const Mark = ICONS[item.icon] ?? StemIcon;
        const tone = TONE[item.icon] ?? TONE.stem;
        const Badge = tone.Icon;

        return (
          <motion.article
            key={item.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={reduce ? undefined : { y: -8 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.65,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative cursor-default overflow-hidden rounded-2xl glass p-5 text-center shadow-soft transition-colors duration-300 hover:border-line-strong"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-16 h-32 opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
              style={{ background: `radial-gradient(circle, ${tone.glow}, transparent 70%)` }}
            />

            <span
              className={`relative mx-auto grid h-24 w-24 place-items-center rounded-2xl bg-canvas-soft/60 ring-1 ${tone.ring} transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3`}
            >
              <span className="h-16 w-16">
                <Mark loop={loop} />
              </span>
            </span>

            <h3 className="relative mt-5 font-display text-base font-semibold leading-snug tracking-tight">
              {item.label}
            </h3>
            <p className="relative mt-1.5 text-xs leading-relaxed text-muted">
              {item.detail}
            </p>

            <span
              className={`relative mt-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${tone.chip}`}
            >
              <Badge className="h-3 w-3" />
              {item.icon === "solar" ? "ESP" : item.icon === "arduino" ? "Arduino" : "STEM"}
            </span>
          </motion.article>
        );
      })}
    </div>
  );
}
