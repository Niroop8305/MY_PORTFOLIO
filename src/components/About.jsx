import { motion } from "framer-motion";

/* ─── Profile Data ─── */
const PROFILE = {
  name: "Laxmi Niroop Papani",
  role: "Full-Stack Engineer & Hackathon Specialist",
  tagline: "Engineering Impact through Code & Innovation",
  vision: "I build robust, scalable architectures for the web, merging deep backend logic with immersive frontend experiences.",
  highlights: [
    {
      title: "NASA Space Apps Gold",
      desc: "Built NeoVision: 3D Near-Earth Object visualization using Three.js & NASA APIs.",
      impact: "1st Place Winner",
      accent: "emerald"
    },
    {
      title: "Paranox 2.0",
      desc: "Selected in the Top 200 out of 1500+ project submissions in a national-level engineering challenge.",
      impact: "Top 200 / 1500+",
      accent: "cyan"
    },
    {
      title: "CodeRush Innovation",
      desc: "Architected InnovateFund: A MERN-based startup-investor matching platform.",
      impact: "Best Innovation Award",
      accent: "violet"
    }
  ],
  stack: ["React", "Node.js", "Java (DSA)", "MySQL", "Three.js", "Python"],
  meta: [
    { label: "Competitions", value: "8+" },
    { label: "Major Wins", value: "2" },
    { label: "Rank", value: "Top 200" }
  ]
};

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="about" 
      className="bg-[#09090b] py-32 px-6 sm:px-12 relative overflow-hidden text-slate-100"
    >
      {/* ── Background Glows ── */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        
        {/* ── Header ── */}
        <motion.div variants={itemVariants} className="mb-20">
          <p className="text-[10px] font-black tracking-[0.6em] text-emerald-400 uppercase mb-4">
            01 / Professional Identity
          </p>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tight leading-none italic">
            Building systems that <br/>
            <span className="text-slate-700 not-italic">Scale and Win.</span>
          </h2>
        </motion.div>

        {/* ── Bento Matrix ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: The Engineer (Span 5) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-5 relative group overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-10 flex flex-col justify-between aspect-[4/5] transition-all duration-500"
          >
            <div className="relative z-20">
              <h3 className="text-4xl font-black leading-none mb-4">
                Laxmi Niroop <br/>
                <span className="text-slate-500 italic">Papani</span>
              </h3>
              <p className="text-sm font-medium text-emerald-400/80 tracking-widest uppercase mb-8">
                {PROFILE.role}
              </p>
              
              <div className="space-y-4">
                {PROFILE.meta.map((m) => (
                  <div key={m.label} className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{m.label}</span>
                    <span className="text-lg font-bold tabular-nums">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rotating Identity Geometry */}
            <div className="absolute -right-20 -bottom-20 h-96 w-96 opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
               <img 
                src="/abstract_3d_shape.png" 
                alt="3D Identity" 
                className="h-full w-full object-contain animate-float-rotate"
                style={{ mixBlendMode: 'lighten' }}
              />
            </div>

            <div className="relative z-20 pt-8 flex gap-8">
              <a href="https://github.com/Niroop8305" target="_blank" className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">GitHub</a>
              <a href="https://www.linkedin.com/in/niroop-papani-9864672b5/" target="_blank" className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">LinkedIn</a>
            </div>
          </motion.div>

          {/* Card 2: Strategy & Vision (Span 7) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-7 rounded-[2rem] border border-white/5 bg-white/[0.02] p-12 flex flex-col justify-center"
          >
            <p className="text-[11px] font-black tracking-[0.4em] text-slate-500 uppercase mb-8">
              Engineering Vision //
            </p>
            <p className="text-2xl sm:text-3xl font-medium text-slate-300 leading-relaxed mb-12 italic border-l-4 border-emerald-500/30 pl-8">
              "{PROFILE.vision}"
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
               {PROFILE.stack.map((tech) => (
                 <div key={tech} className="px-6 py-4 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center text-xs font-black text-slate-400 hover:border-emerald-500/30 hover:text-white transition-all cursor-default uppercase tracking-widest">
                   {tech}
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Card 3: Success Matrix (Span 12) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-12 rounded-[2rem] border border-white/5 bg-white/[0.02] p-12"
          >
            <p className="text-[11px] font-black tracking-[0.4em] text-slate-500 uppercase mb-12">
              The Success Matrix //
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROFILE.highlights.map((h, i) => (
                <div key={i} className="group relative">
                  <div className={`absolute -top-4 -left-4 text-4xl opacity-10 font-black group-hover:opacity-20 transition-opacity`}>0{i+1}</div>
                  <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    {h.title}
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
                  </h4>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    {h.desc}
                  </p>
                  <div className="inline-block text-[10px] font-black text-emerald-400 border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 rounded-full uppercase tracking-tighter">
                    {h.impact}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Custom Keyframes ── */}
      <style>{`
        @keyframes float-rotate {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }
        .animate-float-rotate {
          animation: float-rotate 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
