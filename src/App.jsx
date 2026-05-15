import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Testimonials from "./components/Testimonials";
import Guestbook from "./components/Guestbook";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import { motion } from "framer-motion";

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

  /*
   * Circle-reveal animation using direct DOM manipulation.
   * Why not React state? setState batching means null→id never renders separately,
   * so the animation never re-triggers.
   *
   * Why direct px coords? clip-path percentages are relative to the ELEMENT's
   * bounding box, not the viewport. For a 3000px tall section, 50% 50% is 1500px
   * down — below the viewport. We compute the viewport center in px instead.
   */
  const handleNavClick = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    // 1. Jump to section instantly
    section.scrollIntoView({ behavior: "auto" });

    // 2. Get the reveal wrapper (fallback to section itself)
    const wrapper = section.querySelector("[data-reveal]") || section;

    // 3. Viewport center (origin of the expanding circle)
    const cx = Math.round(window.innerWidth / 2);
    const cy = Math.round(window.innerHeight / 2);

    // 4. Compute max radius to fully cover the screen from the center point
    //    Must use px→px so CSS can interpolate (px and % don't interpolate)
    const maxR = Math.ceil(
      Math.sqrt(
        Math.pow(Math.max(cx, window.innerWidth  - cx), 2) +
        Math.pow(Math.max(cy, window.innerHeight - cy), 2)
      )
    ) + 60;

    // 5. Snap to 0px clip, no transition
    wrapper.style.transition = "none";
    wrapper.style.clipPath = `circle(0px at ${cx}px ${cy}px)`;

    // 6. Force the browser to paint the clipped state before the transition starts
    //    (offsetHeight read triggers a synchronous reflow)
    void wrapper.offsetHeight;

    // 7. Apply transition and animate to full radius
    wrapper.style.transition = "clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
    wrapper.style.clipPath = `circle(${maxR}px at ${cx}px ${cy}px)`;

    // 8. Clean up after animation completes
    setTimeout(() => {
      wrapper.style.transition = "";
      wrapper.style.clipPath = "";
    }, 1300);
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

        <section id="guestbook">
          <SectionReveal><Guestbook /></SectionReveal>
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
