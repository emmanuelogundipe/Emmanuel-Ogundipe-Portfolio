import { motion, useReducedMotion } from "framer-motion";

/**
 * Reveal — scroll-triggered entrance wrapper.
 * Respects `prefers-reduced-motion` (falls back to a plain fade).
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  duration = 0.7,
  once = true,
  amount = 0.25,
  className = "",
  as = "div",
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{
        duration: reduce ? 0.3 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Fade-up stagger container for lists of cards. */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
  as = "div",
}) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Child of <RevealGroup>. */
export const RevealItem = ({ children, className = "", y = 26, as = "div", ...rest }) => {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y, scale: 0.98 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

/** Small uppercase eyebrow label with a leading rule. */
export function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted ${className}`}
    >
      <span className="h-px w-8 bg-gradient-to-r from-brand to-transparent" />
      {children}
    </span>
  );
}