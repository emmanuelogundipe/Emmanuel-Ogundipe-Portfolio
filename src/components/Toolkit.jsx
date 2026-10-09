import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow, Reveal } from "./Reveal.jsx";

const TOOLS = [
  "Figma",
  "Adobe Illustrator",
  "Adobe Photoshop",
  "Canva",
  "Arduino IDE",
  "Raspberry Pi OS",
  "Tinkercad",
  "Proteus",
  "MS Project",
  "PowerPoint",
  "Google Workspace",
  "Git & GitHub",
  "Python",
  "HTML / CSS / JS",
];

function Pill({ label }) {
  return (
    <span className="chip !px-4 !py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em]">
      {label}
    </span>
  );
}

export default function Toolkit() {
  const reduce = useReducedMotion();

  return (
    <section aria-label="Tools and technologies" className="relative py-12">
      <div className="shell">
        <div className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>Daily toolkit</Eyebrow>
          <Reveal>
            <p className="max-w-xl text-sm text-muted">
              The software behind the design work, the hardware builds and the
              project schedules.
            </p>
          </Reveal>
        </div>
      </div>

      <div
        className="relative mt-8 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="flex px-4">
          <div className={`flex w-max gap-3 ${reduce ? "" : "marquee-track"}`}>
            {[...TOOLS, ...TOOLS].map((tool, i) => (
              <Pill key={`${tool}-${i}`} label={tool} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="shell mt-12">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { value: "12+", label: "Design deliverables" },
            { value: "2", label: "IoT systems demonstrated" },
            { value: "4", label: "Practice areas" },
            { value: "100%", label: "Hands-on STEM training" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl glass px-5 py-4 text-center shadow-soft"
            >
              <p className="font-display text-2xl font-bold tracking-tight text-gradient">
                {stat.value}
              </p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}