import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";

function SectionReveal({ children }) {
  return (
    <motion.div
      data-reveal="true"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export default function App() {

  /**
   * Center reveal animation logic
   */
  const triggerReveal = (target) => {
    if (!target) return;
    const wrapper = target.querySelector("[data-reveal]") || target;
    const cx = Math.round(window.innerWidth / 2);
    const cy = Math.round(window.innerHeight / 2);
    const maxR = Math.ceil(Math.sqrt(Math.pow(Math.max(cx, window.innerWidth - cx), 2) + Math.pow(Math.max(cy, window.innerHeight - cy), 2))) + 60;

    wrapper.style.transition = "none";
    wrapper.style.clipPath = `circle(0px at ${cx}px ${cy}px)`;
    void wrapper.offsetHeight;
    wrapper.style.transition = "clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
    wrapper.style.clipPath = `circle(${maxR}px at ${cx}px ${cy}px)`;

    setTimeout(() => {
      wrapper.style.transition = "";
      wrapper.style.clipPath = "";
    }, 1300);
  };

  /**
   * Updated handleNavClick to use vertical scrolling and the center-reveal animation
   */
  const handleNavClick = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    // Scroll instantly then reveal
    window.scrollTo({ top: section.offsetTop, behavior: "auto" });
    triggerReveal(section);
  };

  return (
    <div className="bg-zinc-950 text-slate-100 min-h-screen">
      <CustomCursor />
      <Navbar onNavClick={handleNavClick} />

      <main>
        <section id="hero">
          <div data-reveal="true"><Hero /></div>
        </section>

        <section id="about">
          <SectionReveal><About /></SectionReveal>
        </section>

        <section id="skills">
          <SectionReveal><Skills /></SectionReveal>
        </section>

        <section id="projects">
          <div data-reveal="true"><Projects /></div>
        </section>

        <section id="education">
          <SectionReveal><Education /></SectionReveal>
        </section>

        <section id="achievements">
          <SectionReveal><Achievements /></SectionReveal>
        </section>

        <section id="testimonials">
          <SectionReveal><Testimonials /></SectionReveal>
        </section>

        <section id="contact">
          <SectionReveal><Contact /></SectionReveal>
        </section>
      </main>

      <style>{`
        html { scroll-behavior: auto; }
        body { cursor: none !important; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #09090b; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
      `}</style>
    </div>
  );
}
