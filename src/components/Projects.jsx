import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";

/* ─── Projects Data ─── */
const PROJECTS = [
  {
    id: "innovatefund",
    title: "InnovateFund",
    tagline: "Bridging the Gap: Startups & Investors",
    description: "💡 InnovateFund is a structured platform that simplifies the fundraising journey. It allows entrepreneurs to pitch their ideas to a vetted network of investors, facilitating growth through feedback and capital.",
    bullets: [
      "Matchmaking algorithm connecting startups to relevant investors",
      "Structured pitch deck management and feedback cycles",
      "Secure deal-room environment for due diligence"
    ],
    stack: [
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "nodejs" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Framer", icon: "framer" }
    ],
    links: { github: "https://github.com/Niroop8305/innovatefund", live: "https://innovate-fund.vercel.app/" },
    accent: "#8b5cf6", // violet
    image: "/images/InnovateFund.png"
  },
  {
    id: "hr-management",
    title: "WorkZen HRMS",
    tagline: "Enterprise-Grade Human Resource Workflows",
    description: "🏢 A comprehensive HR Management System built for security and scalability. Featuring advanced role-based access control (RBAC), end-to-end payroll processing, and automated employee onboarding workflows.",
    bullets: [
      "Secure JWT-based authentication with granular role permissions",
      "Full payroll cycle management with automated slip generation",
      "Real-time attendance tracking and leave management dashboards"
    ],
    stack: [
      { name: "React", icon: "react" },
      { name: "Express", icon: "express" },
      { name: "MySQL", icon: "mysql" },
      { name: "Docker", icon: "docker" }
    ],
    links: { github: "https://github.com/Niroop8305/Odoo-x-Amalthea-2025-Hackathon", live: "https://odoo-hrms.vercel.app/" },
    accent: "#3b82f6", // blue
    image: "/images/WorkZen.png"
  },
  {
    id: "neovision",
    title: "NeoVision",
    tagline: "NASA Space Apps Hackathon — Gold Medal",
    description: "🚀 NeoVision is an immersive 3D experience that transforms raw celestial data into an intuitive, explorable universe. Built for the NASA Space Apps Challenge, it bridges the gap between complex astronomical datasets and public engagement.",
    bullets: [
      "Real-time tracking of 30,000+ Near-Earth Objects using NASA APIs",
      "Interactive 3D orbital visualization powered by Three.js",
      "Educational modules detailing asteroid composition and risk levels"
    ],
    stack: [
      { name: "React", icon: "react" },
      { name: "Three.js", icon: "threejs" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Tailwind", icon: "tailwindcss" }
    ],
    links: { github: "https://github.com/Niroop8305/NeoVision", live: "https://neo-vision-hr.vercel.app/" },
    accent: "#10b981", // emerald
    image: "/images/NeoVision.png"
  },
  {
    id: "sparkathon",
    title: "Sparkathon 2025",
    tagline: "AI-Powered Retail Analytics Platform",
    description: "🛍️ An integrated AI platform designed for the modern retail landscape. It combines predictive analytics, dynamic pricing engines, and hyper-personalized marketing insights to drive growth and efficiency.",
    bullets: [
      "95% accuracy in sales forecasting using proprietary ML models",
      "Dynamic pricing engine that adjusts in real-time based on demand",
      "Automated marketing campaigns driven by customer behavior analysis"
    ],
    stack: [
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "nodejs" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Python", icon: "python" },
      { name: "Vercel", icon: "vercel" }
    ],
    links: { github: "https://github.com/Niroop8305/Sparkathon-2025---website", live: "https://sparkathon-website.vercel.app/auth" },
    accent: "#f59e0b", // amber
    image: "/images/Sparkathon.png"
  }
];

const EXTRA_PROJECTS = [
  {
    id: "expense-management",
    title: "Expense Management",
    tagline: "Enterprise Expense Management System",
    description: "💰 A highly scalable, multi-tenant Expense Management System designed for enterprises. Features robust role-based access control, customizable multi-step approval workflows, and an elegant dark/light mode UI.",
    bullets: [
      "Multi-Tenant Architecture for separate company data isolation",
      "Custom approval workflows and Role-Based Access Control",
      "Analytics & Dashboards detailing expense trends and breakdowns"
    ],
    stack: [
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "nodejs" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Tailwind", icon: "tailwindcss" }
    ],
    links: { github: "https://github.com/Niroop8305/Expense-Management" },
    accent: "#ec4899", // pink
    image: "/images/ExpenseManagement.png"
  },
  {
    id: "leave-management",
    title: "Leave Management",
    tagline: "AI-Powered Employee Leave System",
    description: "🌴 A comprehensive, AI-powered full-stack application to streamline employee leave workflows. Provides an end-to-end solution for HR teams, managers, and employees with secure role-based access control.",
    bullets: [
      "Role-Based Access Control with distinct dashboards for Admins, Managers, and Employees",
      "AI-Powered Predictions using Python/Flask to identify high-risk leave patterns",
      "Advanced Analytics & Reporting with automated SMTP email notifications"
    ],
    stack: [
      { name: "React", icon: "react" },
      { name: "Spring Boot", icon: "spring" },
      { name: "MySQL", icon: "mysql" },
      { name: "Python", icon: "python" },
      { name: "Docker", icon: "docker" }
    ],
    links: { github: "https://github.com/Niroop8305/Employee_Leave_Management_System" },
    accent: "#06b6d4", // cyan
    image: "/images/LeaveManagement.png"
  }
];

/* Devicon Helper */
function getIconUrl(slug) {
  const map = {
    threejs: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
    vercel: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    framer: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
    express: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    spring: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
  };
  return map[slug] || `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`;
}

/* ── Components ── */
function TechPill({ name, icon }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group cursor-default">
      <img src={getIconUrl(icon)} alt={name} className="w-3.5 h-3.5 grayscale group-hover:grayscale-0 transition-all" />
      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{name}</span>
    </div>
  );
}

function SpotlightCard({ children, accent }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div onMouseMove={handleMouseMove} className="relative group w-full h-full rounded-[2.5rem] overflow-hidden glass-card border border-white/5 bg-zinc-900/40">
      <motion.div className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${accent}22, transparent 80%)` }} />
      {children}
    </div>
  );
}

export default function Projects() {
  const [showMore, setShowMore] = useState(false);
  const displayedProjects = showMore ? [...PROJECTS, ...EXTRA_PROJECTS] : PROJECTS;

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const progressThumbTop = useTransform(smoothProgress, [0, 1], ["0px", "400px"]);

  const [activeProject, setActiveProject] = useState(0);
  
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setActiveProject(Math.round(latest * (displayedProjects.length - 1)));
    });
  }, [scrollYProgress, displayedProjects.length]);

  const current = displayedProjects[activeProject] || displayedProjects[0];

  // Variants for staggered reveals
  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="projects" ref={sectionRef} className="relative w-full bg-zinc-950">
      {/* Title */}
      <div className="pt-32 pb-20 text-center">
        <p className="text-[10px] font-black tracking-[0.6em] text-emerald-400 uppercase mb-4">03 &mdash; Portfolio</p>
        <h2 className="text-6xl sm:text-8xl font-black tracking-tight text-white italic">Selected <span className="text-slate-800 not-italic">Works.</span></h2>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start relative">
        
        {/* Sticky Left: Content */}
        <div className="lg:w-[45%] lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: 20 }}
              className="pr-0 lg:pr-16"
            >
              <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                <div className="h-0.5 w-12" style={{ background: current.accent }} />
                <h3 className="text-5xl sm:text-6xl font-black text-white tracking-tighter">{current.title}</h3>
              </motion.div>

              <motion.p variants={itemVariants} className="text-slate-400 text-lg mb-8 leading-relaxed font-medium max-w-xl">
                {current.description}
              </motion.p>

              <motion.div variants={itemVariants} className="space-y-4 mb-10">
                {current.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <span className="mt-1.5 w-2 h-2 rounded-full shrink-0 transition-transform group-hover:scale-125" style={{ background: current.accent }} />
                    <p className="text-slate-300 text-sm font-medium leading-relaxed">{bullet}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-12">
                {current.stack.map((s) => (
                  <TechPill key={s.name} {...s} />
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-5">
                <a href={current.links.github} target="_blank" rel="noopener noreferrer" 
                  className="px-8 py-3.5 rounded-full bg-white text-black text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Github Code
                </a>
                {current.links.live && (
                  <a href={current.links.live} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white text-[11px] font-black uppercase tracking-widest hover:text-emerald-400 transition-colors">
                    Live Demo 
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2"><path d="M1 11 11 1M11 1H4M11 1v7" /></svg>
                  </a>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sticky Middle: Scroll Indicator */}
        <div className="hidden lg:flex lg:w-[10%] lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] flex-col items-center justify-center">
          <div className="relative w-1 h-[400px] bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div className="absolute top-0 left-0 w-full rounded-full" style={{ height: progressHeight, background: current.accent }} />
          </div>
          <motion.div 
            className="absolute rounded-full border border-white/20 bg-zinc-950 w-10 h-10 shadow-2xl flex items-center justify-center z-10" 
            style={{ top: `calc(50% - 200px)`, y: progressThumbTop, translateY: '-50%' }}
          >
             <span className="text-xs font-black text-white">{activeProject + 1}</span>
          </motion.div>
        </div>

        {/* Scroll Right: Images */}
        <div className="lg:w-[45%] space-y-32 pb-[20vh] lg:pl-16">
          {displayedProjects.map((proj, idx) => (
            <div key={proj.id} className="min-h-[60vh] lg:h-[calc(100vh-8rem)] flex items-center">
              <motion.div 
                className="w-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <a 
                  href={proj.links.live || proj.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-cursor-text="Visit Project"
                  className="block cursor-none"
                >
                  <SpotlightCard accent={proj.accent}>
                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 flex items-center justify-center">
                      {/* Browser Mockup Shell */}
                      <div className="w-full h-full border border-white/10 bg-zinc-800 shadow-2xl overflow-hidden flex flex-col">
                        <div className="h-7 w-full bg-zinc-800/80 border-b border-white/5 flex items-center px-4 gap-1.5 shrink-0">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
                          <div className="ml-4 px-3 py-0.5 rounded bg-white/5 text-[9px] text-slate-500 font-mono tracking-tighter">
                            {proj.id}.app
                          </div>
                        </div>
                        <div className="flex-1 relative bg-zinc-950 overflow-hidden group flex items-center justify-center">
                           <img 
                            src={proj.image} 
                            alt={proj.title} 
                            className="w-full h-full object-contain grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700" 
                            onError={(e) => { e.target.src = "https://via.placeholder.com/800x600/09090b/ffffff?text=" + proj.title }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 to-transparent pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </a>
              </motion.div>
            </div>
          ))}

          {/* View More Button */}
          {!showMore && (
            <div className="flex justify-center pb-20">
              <button 
                onClick={() => setShowMore(true)}
                className="px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 text-[11px] font-black uppercase tracking-widest text-white shadow-lg backdrop-blur-md"
              >
                View More Projects
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
