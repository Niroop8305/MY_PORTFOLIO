import { useEffect, useRef, useState } from "react";

const ACHIEVEMENTS = [
  {
    id: "nasa",
    index: "01",
    title: "NASA Space Apps Challenge",
    subtitle: "Gold Award — 1st Place",
    description:
      "Won first place at the NASA Space Apps Challenge — one of the world's largest hackathons. Built a space-data visualization platform that processed real NASA datasets to surface actionable insights.",
    stat: { value: "1st", label: "Place" },
    tags: ["Hackathon", "NASA", "Gold Award"],
    accent: "#f59e0b",
    year: "2024",
  },
  {
    id: "paranox",
    index: "02",
    title: "Paranox 2.0",
    subtitle: "Top 200 of 1500+ Submissions",
    description:
      "Selected in the Top 200 out of 1500+ project submissions in a national-level engineering challenge. Competed against teams from premier engineering institutions across India.",
    stat: { value: "200", label: "/ 1500+" },
    tags: ["National", "Competitive", "Engineering"],
    accent: "#34d399",
    year: "2024",
  },
  {
    id: "coderush",
    index: "03",
    title: "CodeRush Innovation",
    subtitle: "Best Innovation Award",
    description:
      "Received the Best Innovation Award at CodeRush for engineering a novel solution that stood out for its originality, technical depth, and real-world applicability.",
    stat: { value: "Best", label: "Innovation" },
    tags: ["Innovation", "Award", "Engineering"],
    accent: "#a78bfa",
    year: "2024",
  },
  {
    id: "hackathons",
    index: "04",
    title: "8+ Hackathons",
    subtitle: "Consistent Competitor",
    description:
      "Participated in over 8 hackathons spanning AI, web, and systems domains — consistently placing in competitive tiers. Each event sharpened problem-solving speed and team delivery.",
    stat: { value: "8+", label: "Events" },
    tags: ["Consistency", "Track Record"],
    accent: "#60a5fa",
    year: "2023–24",
  },
];

function useReveal(threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AchievCard({ item, delay }) {
  const [ref, visible] = useReveal(0.08);
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8 overflow-hidden cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}>

      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at 20% 50%, ${item.accent}10 0%, transparent 60%)` }} />

      {/* Top row */}
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black tracking-[0.5em] text-slate-700 uppercase">{item.index}</span>
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{item.year}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end">
          {item.tags.map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full border border-white/[0.05] text-[10px] font-black tracking-widest text-slate-600 uppercase">{t}</span>
          ))}
        </div>
      </div>

      {/* Big stat */}
      <div className="relative z-10 mb-6 flex items-baseline gap-3">
        <span className="font-black leading-none" style={{ fontSize: "clamp(3rem, 7vw, 5rem)", color: item.accent }}>
          {item.stat.value}
        </span>
        <span className="text-slate-600 font-black text-lg">{item.stat.label}</span>
      </div>

      {/* Title */}
      <div className="relative z-10 mb-4">
        <h3 className="text-2xl font-black text-white tracking-tight">{item.title}</h3>
        <p className="text-sm mt-1 font-bold" style={{ color: item.accent }}>{item.subtitle}</p>
      </div>

      {/* Description */}
      <p className="relative z-10 text-slate-500 leading-relaxed text-sm">{item.description}</p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-[2px] transition-all duration-700 ease-out"
        style={{ background: item.accent, width: hovered ? "100%" : "0%", opacity: 0.5 }} />
    </div>
  );
}

export default function Achievements() {
  const [headerRef, headerVisible] = useReveal(0.1);

  return (
    <section id="achievements" className="bg-[#020202] py-32 px-6 sm:px-12 relative overflow-hidden">

      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none opacity-[0.04]"
        style={{ background: "radial-gradient(circle at 100% 0%, #f59e0b 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headerRef} className="mb-20"
          style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? "none" : "translateY(28px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <p className="text-[10px] font-black tracking-[0.6em] text-amber-400/70 uppercase mb-5">
            04 &mdash; Achievements
          </p>
          <h2 className="text-5xl sm:text-[5.5rem] font-black tracking-tight leading-[0.92] text-white">
            Won in<br />
            <span className="text-slate-700">The Arena.</span>
          </h2>
          <p className="mt-8 text-slate-500 max-w-lg leading-relaxed text-[15px]">
            Competitive wins and recognitions earned under pressure, on the clock, against strong competition.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ACHIEVEMENTS.map((item, i) => (
            <AchievCard key={item.id} item={item} delay={i * 100} />
          ))}
        </div>

      </div>
    </section>
  );
}
