import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ─── Profile data (can later be imported from a shared constants file) ─── */
const PROFILE = {
  firstName: "Niroop",
  lastName: "Papani",
  roles: [
    "Full Stack Developer",
    "MERN Stack Engineer",
    "React Specialist",
    "Node.js Developer",
    "Problem Solver",
  ],
  tagline: "I design and build products that",
  taglineAccent: "deliver real impact.",
  location: "India",
  available: true,
  availabilityText: "Open to Full-time Opportunities",
  links: {
    github: "https://github.com/Niroop8305",
    linkedin: "https://www.linkedin.com/in/niroop-papani-9864672b5/",
    email: "nirooppapani.work@gmail.com",
    resume: "/resume.pdf",
  },
};

function GmailLink({ email, children, className }) {
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  return (
    <a href={gmailUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

/* ─── SVG Icons ─── */
function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M7 17 17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

/* ─── Typewriter hook ─── */
function useTypewriter(words, typingSpeed = 80, deletingSpeed = 50, pauseMs = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // "typing" | "pausing" | "deleting"
  const timeoutRef = useRef(null);

  useEffect(() => {
    const word = words[wordIndex % words.length];

    if (phase === "typing") {
      if (display.length < word.length) {
        timeoutRef.current = setTimeout(
          () => setDisplay(word.slice(0, display.length + 1)),
          typingSpeed
        );
      } else {
        timeoutRef.current = setTimeout(() => setPhase("pausing"), pauseMs);
      }
    } else if (phase === "pausing") {
      setPhase("deleting");
    } else if (phase === "deleting") {
      if (display.length > 0) {
        timeoutRef.current = setTimeout(
          () => setDisplay(display.slice(0, -1)),
          deletingSpeed
        );
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [display, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return display;
}

/* ─── Animated counter ─── */
function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Main Hero component ─── */
export default function Hero() {
  const role = useTypewriter(PROFILE.roles);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-zinc-950 flex flex-col"
    >
      {/* ── Grid texture overlay ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />


      {/* ── Decorative corner brackets ── */}
      <div aria-hidden className="absolute top-8 left-8 opacity-20"><div className="h-8 w-8 border-l-2 border-t-2 border-white" /></div>
      <div aria-hidden className="absolute top-8 right-8 opacity-20"><div className="h-8 w-8 border-r-2 border-t-2 border-white" /></div>
      <div aria-hidden className="absolute bottom-8 left-8 opacity-20"><div className="h-8 w-8 border-l-2 border-b-2 border-white" /></div>
      <div aria-hidden className="absolute bottom-8 right-8 opacity-20"><div className="h-8 w-8 border-r-2 border-b-2 border-white" /></div>

      {/* ── Main content ── */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Step 1: Availability badge */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-slate-300 tracking-wide text-xs font-medium uppercase">{PROFILE.availabilityText}</span>
          </div>
        </motion.div>

        {/* Step 2: Name */}
        <motion.div variants={itemVariants} className="leading-none select-none mb-6">
          <h1 className="block text-white font-black uppercase drop-shadow-2xl"
            style={{ fontSize: "clamp(3.5rem, 13vw, 10rem)", lineHeight: 0.88, letterSpacing: "-0.03em" }}>
            {PROFILE.firstName}
          </h1>
        </motion.div>

        {/* Step 3: Tagline */}
        <motion.div variants={itemVariants} className="mt-8 max-w-xl">
          <p className="text-slate-400 text-base tracking-[0.25em] uppercase font-medium">{PROFILE.tagline}</p>
          <p className="mt-1 font-serif italic text-white drop-shadow-lg" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}>
            {PROFILE.taglineAccent}
          </p>
        </motion.div>

        {/* Step 4: Typewriter role */}
        <motion.div variants={itemVariants} className="mt-6 flex items-center gap-2 text-sm font-mono bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
          <span className="text-violet-400">&gt;</span>
          <span className="text-slate-200 font-semibold">{role}</span>
          <span className="inline-block h-4 w-[2px] bg-violet-400 animate-pulse" />
        </motion.div>

        {/* Step 5: CTA buttons */}
        <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href={PROFILE.links.resume} target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-zinc-950 transition-all duration-300 hover:bg-zinc-100 hover:scale-105 hover:shadow-[0_0_32px_rgba(255,255,255,0.25)]">
            View Resume <IconArrow />
          </a>
          <a href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:scale-105 hover:shadow-[0_0_24px_rgba(255,255,255,0.1)]">
            Hire Me <IconArrow />
          </a>
        </motion.div>

        {/* Step 6: Social links */}
        <motion.div variants={itemVariants} className="mt-8 flex items-center gap-5">
          {[
            { href: PROFILE.links.github, icon: <IconGitHub />, label: "GitHub" },
            { href: PROFILE.links.linkedin, icon: <IconLinkedIn />, label: "LinkedIn" },
            { href: `https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE.links.email}`, icon: <IconMail />, label: "Email" },
          ].map(({ href, icon, label }) => (
            <a key={label} href={href} target="_blank"
              rel="noopener noreferrer" aria-label={label}
              className="group flex items-center gap-2 text-slate-500 transition-all duration-200 hover:text-slate-200">
              <span className="transition-transform duration-200 group-hover:-translate-y-0.5">{icon}</span>
              <span className="text-xs font-medium tracking-widest uppercase opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">{label}</span>
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Bottom info strip ── */}
      <motion.div 
        className="relative z-10 w-full border-t border-white/5 px-8 py-5 backdrop-blur-sm bg-black/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          {/* Location */}
          <div className="flex items-center gap-2 text-slate-500">
            <IconMapPin />
            <div className="leading-tight">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-300">
                Based In
              </p>
              <p className="text-xs tracking-wider text-slate-500 uppercase">
                {PROFILE.location}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden sm:flex items-center gap-8">
            {[
              { value: 8, suffix: "+", label: "Hackathons" },
              { value: 2, suffix: "", label: "Major Wins" },
              { value: 4, suffix: "+", label: "Projects" },
            ].map(({ value, suffix, label }) => (
              <div key={label} className="text-center">
                <p className="text-base font-black text-white tabular-nums drop-shadow-md">
                  <AnimatedCounter target={value} suffix={suffix} />
                </p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Role badge */}
          <div className="flex items-center gap-2 text-slate-500">
            <div className="text-right leading-tight">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-300">
                Full Stack Dev
              </p>
              <p className="text-xs tracking-wider text-slate-500 uppercase">
                &amp; Engineer
              </p>
            </div>
            <IconCode />
          </div>
        </div>
      </motion.div>

    </section>
  );
}
