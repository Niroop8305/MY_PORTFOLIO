import { useEffect, useRef, useState } from "react";

const EDUCATION_DATA = [
  {
    id: 1,
    degree: "Bachelors of Technology",
    institution: "Kakatiya Institute of Technology and Science, Warangal",
    period: "08/2023 – Present",
    grade: "CGPA: 9.00/10.0",
    description: "Pursuing a Bachelors of Technology at KITS Warangal, specializing in Computer Science and Engineering (CSE). Maintaining a strong academic trajectory with a 9.0 CGPA while focusing on advanced algorithm design, software architecture, and the intersection of theoretical computing with real-world impact.",
    courses: ["Data Structures & Algorithms", "Java (DSA)", "Database Management (MySQL)", "Operating Systems"],
    icon: "🎓",
    accent: "#10b981", // emerald
  }
];

function useReveal(threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function Education() {
  const [headerRef, headerVisible] = useReveal(0.1);

  return (
    <section
      id="education"
      className="bg-[#050505] py-32 px-6 sm:px-12 relative overflow-hidden border-t border-white/[0.02]"
    >
      {/* Ambient background glow */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-[0.03]"
        style={{ background: "radial-gradient(circle at 100% 0%, #10b981 0%, transparent 60%)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-20"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(28px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p className="text-[10px] font-black tracking-[0.6em] text-emerald-400/70 uppercase mb-5">
            04 &mdash; Education
          </p>
          <h2 className="text-5xl sm:text-[5.5rem] font-black tracking-tight leading-[0.92] text-white italic">
            Academic
            <br />
            <span className="text-slate-700 not-italic">Journey.</span>
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Track */}
          <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-white/[0.05] rounded-full hidden md:block" />

          <div className="space-y-12">
            {EDUCATION_DATA.map((item, index) => (
              <EducationItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationItem({ item, index }) {
  const [ref, visible] = useReveal(0.15);
  
  return (
    <div
      ref={ref}
      className="relative flex flex-col md:flex-row gap-8 md:gap-12 group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 150}ms`,
      }}
    >
      {/* Timeline Node (Desktop) */}
      <div className="hidden md:flex flex-col items-center z-10">
        <div 
          className="w-14 h-14 rounded-full border-4 border-[#050505] bg-white/[0.05] flex items-center justify-center text-xl transition-transform duration-500 group-hover:scale-110 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          style={{ 
            color: item.accent,
            boxShadow: visible ? `0 0 20px ${item.accent}20` : 'none'
          }}
        >
          {item.icon}
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 rounded-[2rem] border border-white/[0.05] bg-white/[0.02] p-8 sm:p-10 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.1] relative overflow-hidden">
        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle at 100% 100%, ${item.accent}15 0%, transparent 60%)` }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="md:hidden text-2xl">{item.icon}</span>
              <h3 className="text-2xl sm:text-4xl font-black text-white">{item.degree}</h3>
            </div>
            <p className="text-lg font-bold uppercase tracking-wider" style={{ color: item.accent }}>{item.institution}</p>
            <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-widest">CSE Department</p>
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            <span className="px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-black text-emerald-400 tracking-widest uppercase">
              {item.period}
            </span>
            <span className="text-sm font-black text-slate-400 mt-2">
              {item.grade}
            </span>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-8 italic max-w-3xl">
          "{item.description}"
        </p>

        {item.courses && item.courses.length > 0 && (
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Core Competencies //</p>
            <div className="flex flex-wrap gap-2">
              {item.courses.map((course) => (
                <span 
                  key={course}
                  className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-[10px] font-black text-slate-300 uppercase tracking-widest hover:border-emerald-500/30 transition-colors cursor-default"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
