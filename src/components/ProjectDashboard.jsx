import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  CheckCheck,
  GanttChartSquare,
  ListChecks,
  Milestone,
  Target,
  Workflow,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Card frame                                                                */
/* -------------------------------------------------------------------------- */

function DashCard({ icon: Icon, title, caption, children, delay = 0, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl glass p-5 shadow-soft transition-colors duration-300 hover:border-line-strong"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand/12 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-display text-sm font-semibold tracking-tight sm:text-[0.95rem]">
            {title}
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-muted">{caption}</p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/12 text-brand ring-1 ring-brand/25">
          <Icon className="h-4.5 w-4.5" />
        </span>
      </div>

      <div className="mt-4">{children}</div>

      <span className="absolute bottom-3 right-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted/50">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  1. Gantt chart                                                            */
/* -------------------------------------------------------------------------- */

const GanttRows = [
  { label: "Research", from: 4, to: 46 },
  { label: "Design", from: 30, to: 78 },
  { label: "Build", from: 58, to: 100 },
  { label: "Test", from: 82, to: 118 },
];

function GanttCard({ start }) {
  return (
    <svg viewBox="0 0 132 108" className="h-auto w-full" role="img" aria-label="Animated Gantt chart of project tasks">
      {/* grid */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={0}
          x2={132}
          y1={16 + i * 22}
          y2={16 + i * 22}
          stroke="var(--c-line)"
          strokeWidth="1"
        />
      ))}

      {GanttRows.map((row, i) => (
        <g key={row.label} transform={`translate(0 ${12 + i * 22})`}>
          {/* NB: the animated rect carries its own transform-box so the CSS
              scale never fights the parent <g transform> attribute. */}
          <motion.rect
            height="9"
            rx="4.5"
            y="0"
            x={row.from}
            width={row.to - row.from}
            fill={i === 2 ? "var(--c-accent)" : "var(--c-brand)"}
            opacity={0.85}
            style={{ transformBox: "fill-box", transformOrigin: "left center" }}
            initial={{ scaleX: 0 }}
            animate={start ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.text
            x={2}
            y={7}
            fill="var(--c-muted)"
            fontSize="6"
            fontFamily="var(--font-mono)"
            initial={{ opacity: 0 }}
            animate={start ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 + i * 0.12 }}
          >
            {row.label}
          </motion.text>
        </g>
      ))}

      {/* today marker */}
      <motion.line
        x1="72"
        x2="72"
        y1="6"
        y2="100"
        stroke="var(--c-ember)"
        strokeWidth="1.2"
        strokeDasharray="3 3"
        initial={{ opacity: 0, y1: 100, y2: 100 }}
        animate={start ? { opacity: 0.85, y1: 6, y2: 100 } : {}}
        transition={{ duration: 0.6, delay: 0.85 }}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. Target nodes                                                           */
/* -------------------------------------------------------------------------- */

const NODES = [
  { x: 18, y: 62 },
  { x: 58, y: 34 },
  { x: 96, y: 60 },
  { x: 118, y: 26 },
];

function TargetCard({ start }) {
  return (
    <svg viewBox="0 0 132 96" className="h-auto w-full" role="img" aria-label="Animated project target nodes">
      {/* connections */}
      {NODES.slice(0, -1).map((node, i) => {
        const next = NODES[i + 1];
        return (
          <motion.line
            key={`${node.x}-${node.y}`}
            x1={node.x}
            y1={node.y}
            x2={next.x}
            y2={next.y}
            stroke="var(--c-brand)"
            strokeWidth="1.2"
            strokeOpacity="0.55"
            initial={{ pathLength: 0 }}
            animate={start ? { pathLength: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.2 + i * 0.16 }}
          />
        );
      })}

      {/* rotating outer ring */}
      <motion.circle
        cx="96"
        cy="60"
        r="15"
        fill="none"
        stroke="var(--c-accent)"
        strokeWidth="1.1"
        strokeDasharray="4 4"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          loop
            ? { opacity: 0.85, scale: 1, rotate: 360 }
            : start
              ? { opacity: 0.85, scale: 1 }
              : {}
        }
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        transition={{
          opacity: { duration: 0.5, delay: 0.5 },
          scale: { duration: 0.5, delay: 0.5 },
          rotate: { duration: 14, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* pulse rings */}
      {NODES.map((node, i) => (
        <motion.circle
          key={`pulse-${i}`}
          cx={node.x}
          cy={node.y}
          r="6"
          fill="var(--c-brand)"
          opacity="0.35"
          initial={{ scale: 0.4, opacity: 0.5 }}
          animate={loop ? { scale: 2.4, opacity: 0 } : {}}
          transition={{ duration: 2.2, delay: 0.6 + i * 0.45, repeat: Infinity, ease: "easeOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}

      {/* nodes */}
      {NODES.map((node, i) => (
        <motion.g
          key={`node-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={start ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 + i * 0.16, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx={node.x} cy={node.y} r={i === 2 ? 6.5 : 5} fill="var(--c-canvas-soft)" />
          <circle cx={node.x} cy={node.y} r={i === 2 ? 6.5 : 5} fill="none" stroke="var(--c-brand)" strokeWidth="1.6" />
          <circle cx={node.x} cy={node.y} r="1.8" fill="var(--c-brand)" />
        </motion.g>
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. Workflow diagram                                                        */
/* -------------------------------------------------------------------------- */

const FLOW = ["Brief", "Design", "Build", "Ship"];

function WorkflowCard({ start }) {
  return (
    <svg viewBox="0 0 132 72" className="h-auto w-full" role="img" aria-label="Animated workflow diagram">
      <line x1="14" y1="36" x2="118" y2="36" stroke="var(--c-line)" strokeWidth="1.4" />

      {/* travelling packet */}
      <motion.circle
        r="3"
        cy="36"
        fill="var(--c-ember)"
        initial={{ cx: 14, opacity: 0 }}
        animate={loop ? { cx: [14, 118], opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: 0.9 }}
      />

      {FLOW.map((step, i) => {
        const x = 14 + i * (104 / 3);
        return (
          <g key={step}>
            <motion.rect
              x={x - 13}
              y="22"
              width="26"
              height="28"
              rx="8"
              fill="var(--c-surface-2)"
              stroke="var(--c-line-strong)"
              strokeWidth="1"
              initial={{ opacity: 0, y: -14 }}
              animate={start ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.text
              x={x}
              y="39"
              textAnchor="middle"
              fontSize="5.4"
              fill="var(--c-muted)"
              fontFamily="var(--font-mono)"
              initial={{ opacity: 0 }}
              animate={start ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 + i * 0.18 }}
            >
              {step}
            </motion.text>
            <motion.circle
              cx={x}
              cy="36"
              r="2.4"
              fill="var(--c-accent)"
              initial={{ scale: 0 }}
              animate={start ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.18, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. Calendar schedule                                                      */
/* -------------------------------------------------------------------------- */

const CELLS = Array.from({ length: 28 }, (_, i) => i);
const BUSY = new Set([2, 5, 6, 9, 10, 13, 16, 17, 18, 21, 22, 26]);
const TODAY = 16;

function CalendarCard({ start }) {
  return (
    <svg viewBox="0 0 132 84" className="h-auto w-full" role="img" aria-label="Animated project schedule calendar">
      <rect x="0" y="0" width="132" height="84" rx="10" fill="var(--c-surface-2)" stroke="var(--c-line)" />

      <motion.rect
        x="0.5"
        y="0.5"
        width="131"
        height="16"
        rx="10"
        fill="var(--c-brand)"
        opacity="0.85"
        initial={{ scaleX: 0 }}
        animate={start ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5 }}
        style={{ transformBox: "fill-box", transformOrigin: "left center" }}
      />
      <motion.text
        x="8"
        y="11"
        fontSize="6"
        fill="#fff"
        fontFamily="var(--font-mono)"
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        OPERATIONAL SCHEDULE
      </motion.text>

      {CELLS.map((cell) => {
        const col = cell % 7;
        const row = Math.floor(cell / 7);
        const x = 7 + col * 17;
        const y = 24 + row * 17;
        const busy = BUSY.has(cell);
        const isToday = cell === TODAY;

        return (
          <motion.rect
            key={cell}
            x={x}
            y={y}
            width="13"
            height="13"
            rx="4"
            fill={isToday ? "var(--c-accent)" : busy ? "var(--c-brand)" : "var(--c-line)"}
            opacity={isToday ? 1 : busy ? 0.55 : 0.35}
            initial={{ scale: 0, opacity: 0 }}
            animate={start ? { scale: 1, opacity: isToday ? 1 : busy ? 0.55 : 0.35 } : {}}
            transition={{
              duration: 0.32,
              delay: 0.35 + cell * 0.017,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        );
      })}

      {/* today halo */}
      <motion.circle
        cx={7 + (TODAY % 7) * 17 + 6.5}
        cy={24 + Math.floor(TODAY / 7) * 17 + 6.5}
        r="10"
        fill="none"
        stroke="var(--c-accent)"
        strokeWidth="1.2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={start ? { opacity: 0.9, scale: [0.6, 1.15, 1] } : {}}
        transition={{ duration: 1.6, delay: 1, ease: "easeOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  5. Task checklist (animated checkmarks)                                   */
/* -------------------------------------------------------------------------- */

const TASKS = [
  "Requirements gathering",
  "Hardware procurement",
  "Sensor calibration",
  "Field demonstration",
];

function TaskCard({ start }) {
  return (
    <ul className="list-none space-y-2 p-0">
      {TASKS.map((task, i) => (
        <li key={task} className="flex items-center gap-3">
          <motion.span
            className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-emerald-400/12 ring-1 ring-emerald-400/30"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={start ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.18, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
              <motion.path
                d="M4 12.5 9.2 17.5 20 6.5"
                stroke="var(--c-accent)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={start ? { pathLength: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.35 + i * 0.18, ease: "easeOut" }}
              />
            </svg>
          </motion.span>
          <motion.span
            className="text-xs text-muted"
            initial={{ opacity: 0, x: -10 }}
            animate={start ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.45 + i * 0.18 }}
          >
            {task}
          </motion.span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/*  6. Milestone progression                                                  */
/* -------------------------------------------------------------------------- */

const MILESTONES = [
  { label: "Concept", value: 100 },
  { label: "Prototype", value: 100 },
  { label: "Field test", value: 68 },
  { label: "Handover", value: 25 },
];

function useCountUp(target, run) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return undefined;
    const controls = animate(0, target, {
      duration: 1.3,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [target, run]);
  return value;
}

function MilestoneRow({ label, value, index, start }) {
  const shown = useCountUp(value, start);

  return (
    <div>
      <div className="flex items-baseline justify-between text-[0.7rem]">
        <span className="text-muted">{label}</span>
        <span className="font-mono text-ink">{shown}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[var(--c-line)]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand to-accent"
          initial={{ width: 0 }}
          animate={start ? { width: `${value}%` } : {}}
          transition={{ duration: 1.1, delay: 0.25 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function MilestoneCard({ start }) {
  return (
    <div className="space-y-3.5">
      {MILESTONES.map((m, i) => (
        <MilestoneRow key={m.label} {...m} index={i} start={start} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dashboard                                                                 */
/* -------------------------------------------------------------------------- */

export default function ProjectDashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();
  // `start` drives entrance animations (always allowed so content is visible);
  // `loop` drives the perpetual ones (skipped when the user asks for less motion).
  const start = inView;
  const loop = start && !reduce;

  return (
    <div ref={ref} className="mt-14">
      {/* Dashboard header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={start ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl glass px-5 py-4 shadow-soft"
      >
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </span>
          <div>
            <p className="font-display text-sm font-semibold tracking-tight">
              Delivery dashboard
            </p>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
              live project coordination view
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand" /> In progress
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent" /> Milestone
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ember" /> Cut-off
          </span>
        </div>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashCard
          index={0}
          delay={0}
          icon={GanttChartSquare}
          title="Gantt timeline"
          caption="Task sequencing and overlap across delivery phases."
        >
          <GanttCard start={start} />
        </DashCard>

        <DashCard
          index={1}
          delay={0.06}
          icon={Target}
          title="Target nodes"
          caption="Milestone dependencies mapped node by node."
        >
          <TargetCard start={start} />
        </DashCard>

        <DashCard
          index={2}
          delay={0.12}
          icon={Workflow}
          title="Workflow pipeline"
          caption="A tracked packet moving through the delivery pipeline."
        >
          <WorkflowCard start={start} />
        </DashCard>

        <DashCard
          index={3}
          delay={0.18}
          icon={CalendarDays}
          title="Operational calendar"
          caption="Weekly schedules, busy days and the active cut-off."
        >
          <CalendarCard start={start} />
        </DashCard>

        <DashCard
          index={4}
          delay={0.24}
          icon={ListChecks}
          title="Task micro-checks"
          caption="Micro-interaction confirmations as each task completes."
        >
          <TaskCard start={start} />
        </DashCard>

        <DashCard
          index={5}
          delay={0.3}
          icon={CheckCheck}
          title="Milestone progression"
          caption="Live progress bars that fill as deliverables land."
        >
          <MilestoneCard start={start} />
        </DashCard>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-5 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted"
      >
        <Milestone className="h-3.5 w-3.5" />
        Dashboard renders on scroll · animations disabled under reduced-motion
      </motion.p>
    </div>
  );
}