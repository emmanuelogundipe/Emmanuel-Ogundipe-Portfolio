import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";

import { useActiveSection, useTheme } from "../hooks/useTheme.js";
import { profile } from "../data/assets.js";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "design", label: "Design" },
  { id: "iot", label: "IoT" },
  { id: "communication", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = LINKS.map((l) => l.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const active = useActiveSection(SECTION_IDS);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when a section is chosen.
  useEffect(() => setOpen(false), [active]);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-brand via-brand-2 to-accent"
        aria-hidden="true"
      />

      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="shell">
          <nav
            className={`flex items-center justify-between gap-4 rounded-2xl px-3 py-2.5 transition-all duration-300 sm:px-4 ${
              scrolled
                ? "glass-strong shadow-soft"
                : "border border-transparent"
            }`}
            aria-label="Primary"
          >
            {/* Logo */}
            <a href="#home" className="group flex items-center gap-3">
              <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-brand to-brand-2 font-display text-sm font-bold text-white shadow-[0_10px_26px_-10px_var(--c-brand)]">
                <span className="relative z-10">EO</span>
                <span className="absolute inset-0 translate-y-full bg-gradient-to-tr from-accent to-brand transition-transform duration-500 group-hover:translate-y-0" />
              </span>
              <span className="hidden leading-tight sm:block">
                <span className="block font-display text-sm font-bold tracking-tight">
                  {profile.shortName}
                </span>
                <span className="block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                  Designer · IoT Educator
                </span>
              </span>
            </a>

            {/* Desktop links */}
            <ul className="hidden list-none items-center gap-1 p-0 md:flex">
              {LINKS.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className={`relative block rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                        isActive ? "text-ink" : "text-muted hover:text-ink"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-xl bg-brand/12 ring-1 ring-brand/30"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggle}
                aria-label={`Switch to ${
                  theme === "dark" ? "light" : "dark"
                } theme`}
                className="grid h-10 w-10 place-items-center rounded-xl glass text-ink transition hover:scale-105 hover:text-brand"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                    transition={{ duration: 0.25 }}
                    className="grid place-items-center"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4.5 w-4.5" />
                    ) : (
                      <Moon className="h-4.5 w-4.5" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>

              <a
                href="#contact"
                className="btn btn-primary hidden !px-4 !py-2.5 text-sm sm:inline-flex"
              >
                Hire me
              </a>

              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="grid h-10 w-10 place-items-center rounded-xl glass text-ink md:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>

          {/* Mobile panel */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -12, height: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 overflow-hidden rounded-2xl glass-strong p-2 shadow-soft md:hidden"
              >
                <ul className="list-none p-0">
                  {LINKS.map((link, i) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05 }}
                    >
                      <a
                        href={`#${link.id}`}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                          active === link.id
                            ? "bg-brand/12 text-ink ring-1 ring-brand/30"
                            : "text-muted hover:bg-brand/8 hover:text-ink"
                        }`}
                      >
                        {link.label}
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-brand">
                          0{i + 1}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}