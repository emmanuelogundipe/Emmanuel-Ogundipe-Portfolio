import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Heart,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
  XIcon,
} from "./BrandIcons.jsx";
import { Reveal } from "./Reveal.jsx";
import { profile } from "../data/assets.js";

/* -------------------------------------------------------------------------- */
/*  Direct action channels                                                    */
/*  `external: true` opens a new tab; mailto/whatsapp stay in place.          */
/* -------------------------------------------------------------------------- */
const CHANNELS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    handle: "+234 911 763 9108",
    hint: "Opens a direct chat",
    href: "https://wa.me/2349117639108",
    Icon: WhatsAppIcon,
    from: "#25D366",
    to: "#128C7E",
    external: true,
  },
  {
    id: "email",
    label: "Email",
    handle: "emmanuelogundipe4@gmail.com",
    hint: "Opens your mail app with the subject pre-filled",
    href: "mailto:emmanuelogundipe4@gmail.com?subject=Inquiry%20via%20Portfolio",
    Icon: Mail,
    from: "#FF6B6B",
    to: "#C0392B",
    external: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "/in/emmanuel-ogundipe",
    hint: "Opens my profile in a new tab",
    href: "https://www.linkedin.com/in/emmanuel-ogundipe-b597b71a4",
    Icon: LinkedInIcon,
    from: "#4AA8FF",
    to: "#0A66C2",
    external: true,
  },
  {
    id: "twitter",
    label: "X / Twitter",
    handle: "@Big_E_Olamide",
    hint: "Opens my timeline in a new tab",
    href: "https://twitter.com/Big_E_Olamide",
    Icon: XIcon,
    from: "#8B98A5",
    to: "#2F3336",
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    // TODO: swap for your personal handle once the repo is public, e.g.
    // href: "https://github.com/Big-E-Olamide"
    handle: "Public repositories",
    hint: "Read READMEs and download releases — no sign-in needed",
    href: "https://github.com/",
    Icon: GitHubIcon,
    from: "#B9C2CC",
    to: "#4A5560",
    external: true,
  },
];

function ChannelCard({ channel, index }) {
  const { label, handle, hint, href, Icon, from, to, external } = channel;

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex items-start gap-4 overflow-hidden rounded-2xl glass p-5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_28px_60px_-28px_var(--c-shadow-color,rgba(0,0,0,0.8))]"
      style={{ "--c-shadow-color": from }}
    >
      {/* channel-tinted hover wash */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${from}22, ${to}08)`,
        }}
      />
      {/* glow that follows the brand colour */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: from }}
      />

      <span
        className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        <Icon className="h-5.5 w-5.5" />
      </span>

      <span className="relative z-10 min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="font-display text-[0.98rem] font-semibold tracking-tight">
            {label}
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 opacity-40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
        </span>
        <span className="mt-1 block truncate text-sm text-ink/85">{handle}</span>
        <span className="mt-1.5 block text-xs leading-relaxed text-muted">{hint}</span>
      </span>
    </motion.a>
  );
}

/* -------------------------------------------------------------------------- */

export default function Contact() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer id="contact" className="relative isolate scroll-mt-28 overflow-hidden pt-20 sm:pt-28">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="animate-aurora absolute left-1/2 top-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full opacity-30 blur-[130px]"
          style={{ background: "radial-gradient(circle, var(--aurora-a), transparent 65%)" }}
        />
        <div className="grid-lines absolute inset-0 opacity-60" />
      </div>

      <div className="shell pb-10">
        {/* Headline */}
        <div className="text-center">
          <Reveal>
            <span className="chip">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              Let&apos;s build something
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              Have a design, an IoT build or a schedule that needs a{" "}
              <span className="text-gradient">technical owner</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              I&apos;m currently taking on freelance graphic &amp; UI design work, hands-on
              IoT/STEM training, and technical project coordination. Pick the channel
              that suits you — every button below is a live action.
            </p>
          </Reveal>
        </div>

        {/* Channels */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((channel, i) => (
            <ChannelCard key={channel.id} channel={channel} index={i} />
          ))}

          {/* Primary CTA fills the 6th grid cell */}
          <motion.a
            href="https://wa.me/2349117639108?text=Hi%20Emmanuel%2C%20I%27d%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 text-white shadow-soft transition-transform duration-300 hover:-translate-y-1.5"
            style={{
              background: "linear-gradient(135deg, var(--c-brand), var(--c-brand-2))",
            }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 80% 20%, var(--c-accent) 0%, transparent 55%)",
              }}
            />
            <span className="relative z-10">
              <span className="font-display text-lg font-bold leading-snug">
                Start a conversation
              </span>
              <span className="mt-2 block text-sm text-white/80">
                Pre-filled WhatsApp message — one tap to send.
              </span>
            </span>
            <span className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-semibold">
              Open chat
              <motion.span
                animate={reduce ? {} : { x: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowUpRight className="h-4 w-4" />
              </motion.span>
            </span>
          </motion.a>
        </div>

        {/* Public-access / security note */}
        <Reveal delay={0.1}>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-4 rounded-2xl glass px-5 py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-400/12 text-emerald-300 ring-1 ring-emerald-400/25">
                <BookOpen className="h-5 w-5" />
              </span>
              <p className="text-xs leading-relaxed text-muted">
                <strong className="font-semibold text-ink">Browse my code publicly.</strong>{" "}
                Repository READMEs, documentation and published releases are open to
                everyone — no account or sign-in required.
              </p>
            </div>
            <div className="flex items-start gap-4 rounded-2xl glass px-5 py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/12 text-brand ring-1 ring-brand/25">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <p className="text-xs leading-relaxed text-muted">
                <strong className="font-semibold text-ink">Secrets stay private.</strong>{" "}
                API keys, <code className="font-mono text-[0.7rem]">.env</code> files and
                database credentials are excluded from every commit — see{" "}
                <code className="font-mono text-[0.7rem]">SECURITY.md</code>.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="hairline my-10" />

        {/* Footer bar */}
        <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-display text-sm font-semibold tracking-tight">
              {profile.name}
            </p>
            <p className="mt-1 text-xs text-muted">
              {profile.location} · © {year} all rights reserved
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted">
            <a href="#design" className="transition-colors hover:text-ink">Design</a>
            <a href="#iot" className="transition-colors hover:text-ink">IoT</a>
            <a href="#communication" className="transition-colors hover:text-ink">Projects</a>
            <a
              href="https://wa.me/2349117639108"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 text-xs text-muted sm:inline-flex">
              Built with <Heart className="h-3.5 w-3.5 text-rose-400" /> in React + Vite
            </span>
            <button
              type="button"
              onClick={scrollTop}
              className="btn btn-ghost !px-4 !py-2.5 text-xs"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}