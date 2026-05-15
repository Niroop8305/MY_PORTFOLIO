import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function LogoMark() {
  return (
    <a href="#hero" className="group flex items-center gap-3 shrink-0 mr-4">
      <div className="relative h-8 w-8 rounded-full border border-white/20 bg-gradient-to-br from-violet-500/20 to-emerald-500/20 flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-transform duration-300 group-hover:scale-110">
        <span className="text-[10px] font-black text-white select-none tracking-tighter">LN</span>
      </div>
      <div className="hidden sm:block leading-none">
        <p className="text-[12px] font-bold text-white tracking-tight">LaxmiNiroop</p>
      </div>
    </a>
  );
}

export default function Navbar({ onNavClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Scroll animation hooks
  const { scrollY } = useScroll();
  const rawProgress = useTransform(scrollY, [0, 500], [0, 1]);
  // easeOutCubic
  const easedProgress = useTransform(rawProgress, (p) => 1 - Math.pow(1 - p, 3));
  // Glide from right (180px) to center (0px)
  const translateX = useTransform(easedProgress, (p) => 180 * (1 - p));

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section tracker */
  useEffect(() => {
    const obs = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { rootMargin: "-45% 0px -45% 0px" }
      );
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  return (
    <header className="fixed top-6 inset-x-0 z-[100] flex justify-center pointer-events-none px-4">
      <motion.div 
        layout
        className={`pointer-events-auto flex items-center justify-between w-full max-w-7xl h-14 px-6 rounded-full transition-colors duration-500
          ${scrolled 
            ? "bg-zinc-950/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]" 
            : "bg-transparent"}`}
      >
        {/* Left: Logo and Name */}
        <div className="flex items-center shrink-0">
          <LogoMark />
        </div>

        {/* Center: Navigation Links (Glides on scroll) */}
        <motion.nav 
          aria-label="Main navigation" 
          style={{ x: translateX }}
          className="hidden lg:flex items-center"
        >
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button key={id}
                  onClick={() => onNavClick?.(id)}
                  className="relative rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.15em] transition-colors duration-200"
                >
                  <span className={`relative z-10 ${isActive ? "text-white" : "text-slate-400 hover:text-white"}`}>
                    {label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </motion.nav>

        {/* Right: Resume Button */}
        <div className="flex items-center shrink-0">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2
              text-[10px] font-black tracking-[0.15em] uppercase text-violet-300
              hover:bg-violet-500 hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all duration-300">
            Resume
            <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M1 11 11 1M11 1H4M11 1v7" />
            </svg>
          </a>
        </div>
      </motion.div>
    </header>
  );
}
