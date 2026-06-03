import { useEffect, useRef, useState } from "react";

const HARDCODED_TESTIMONIALS = [
  {
    id: 1,
    name: "SARAH CHEN",
    role: "SENIOR DEVELOPER",
    company: "TECHCORP",
    text: "NIROOP'S ATTENTION TO DETAIL AND FOCUS ON CREATING SMOOTH INTERFACES HELPED REFINE OUR WORK SIGNIFICANTLY. HIS FULL-STACK SKILLS STAND OUT CLEARLY.",
    avatar: "https://i.pravatar.cc/150?u=1",
    companyIcon: "🚀", 
  },
  {
    id: 2,
    name: "ALEX RIVERA",
    role: "ENGINEERING MANAGER",
    company: "STARTUP X",
    text: "WORKING WITH NIROOP HAS BEEN GENUINELY POSITIVE. HE BRINGS STRONG MERN KNOWLEDGE AND FRESH PERSPECTIVE TO EVERY PROBLEM, MAKING COLLABORATION SMOOTH.",
    avatar: "https://i.pravatar.cc/150?u=2",
    companyIcon: "⚡",
  },
  {
    id: 3,
    name: "DAVID KIM",
    role: "PRODUCT LEAD",
    company: "INNOVATE",
    text: "NIROOP BRINGS BALANCED TECHNICAL UNDERSTANDING AND PRACTICAL THINKING. HIS ABILITY TO SIMPLIFY COMPLEX IDEAS INTO USABLE, ELEGANT INTERFACES IS REMARKABLE.",
    avatar: "https://i.pravatar.cc/150?u=3",
    companyIcon: "🌐",
  },
  {
    id: 4,
    name: "EMMA WATSON",
    role: "CTO",
    company: "NEXTGEN",
    text: "I'VE WORKED WITH NIROOP ON CHALLENGING TASKS. HIS STRUCTURED, CALM APPROACH AND DEEP UNDERSTANDING OF BACKEND CONCEPTS HELPS MOVE WORK FORWARD EFFICIENTLY.",
    avatar: "https://i.pravatar.cc/150?u=4",
    companyIcon: "💡",
  },
  {
    id: 5,
    name: "MICHAEL CHANG",
    role: "LEAD DESIGNER",
    company: "CREATIVE CO",
    text: "NIROOP BRIDGES THE GAP BETWEEN DESIGN AND ENGINEERING PERFECTLY. HIS IMPLEMENTATION OF COMPLEX ANIMATIONS IN REACT IS FLAWLESS.",
    avatar: "https://i.pravatar.cc/150?u=5",
    companyIcon: "🎨",
  },
  {
    id: 6,
    name: "PRIYA PATEL",
    role: "FOUNDER",
    company: "TECHSTART",
    text: "A RARE TALENT WHO NOT ONLY WRITES CLEAN, SCALABLE CODE BUT ALSO UNDERSTANDS THE PRODUCT VISION. DELIVERED OUR MVP WEEKS AHEAD OF SCHEDULE.",
    avatar: "https://i.pravatar.cc/150?u=6",
    companyIcon: "⭐",
  }
];

function useReveal(threshold = 0.1) {
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

export default function Testimonials() {
  const [headerRef, headerVisible] = useReveal(0.1);
  const testimonials = HARDCODED_TESTIMONIALS;

  // Split into two rows for the marquee
  const mid = Math.ceil(testimonials.length / 2);
  const row1Data = testimonials.slice(0, mid);
  const row2Data = testimonials.slice(mid);

  const row1 = [...row1Data, ...row1Data, ...row1Data];
  const row2 = [...row2Data, ...row2Data, ...row2Data];

  return (
    <section
      id="testimonials"
      className="bg-[#050505] py-32 relative overflow-hidden border-t border-white/[0.02]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 mb-20">
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(28px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p className="text-[10px] font-black tracking-[0.6em] text-fuchsia-400/70 uppercase mb-5">
            06 &mdash; Testimonials
          </p>
          <h2 className="text-5xl sm:text-[5.5rem] font-black tracking-tight leading-[0.92] text-white italic">
            Words from
            <br />
            <span className="text-slate-700 not-italic">Colleagues.</span>
          </h2>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative flex flex-col gap-6 w-full max-w-[2400px] mx-auto overflow-hidden py-10">
        
        {/* Row 1 - Left to Right */}
        <div className="flex gap-6 w-max animate-marquee-left hover:[animation-play-state:paused]">
          {row1.map((item, idx) => (
            <TestimonialCard key={`${item.id}-${idx}`} item={item} />
          ))}
        </div>

        {/* Row 2 - Right to Left */}
        <div className="flex gap-6 w-max animate-marquee-right hover:[animation-play-state:paused]">
          {row2.map((item, idx) => (
            <TestimonialCard key={`${item.id}-${idx}`} item={item} />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 60s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 60s linear infinite;
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({ item }) {
  return (
    <div className="w-[350px] sm:w-[450px] flex-shrink-0 rounded-2xl bg-[#0a0a0a] border border-white/[0.05] p-8 flex flex-col justify-between transition-all hover:bg-[#0c0c0c] hover:border-white/[0.1] hover:scale-[1.02] duration-500">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 relative bg-zinc-900">
            {item.avatar ? (
              <img 
                src={item.avatar} 
                alt={item.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs font-black text-slate-700">
                {item.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider">{item.name}</h4>
            <div className="flex flex-col mt-0.5">
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">{item.role || "Professional"}</p>
               {item.company && (
                 <p className="text-[9px] font-black text-fuchsia-400 uppercase tracking-widest leading-tight mt-0.5">@ {item.company}</p>
               )}
            </div>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center text-xl grayscale opacity-50">
          {item.companyIcon || "✨"}
        </div>
      </div>

      {/* Body */}
      <div>
        <p className="text-slate-300 font-bold leading-snug sm:text-lg tracking-wide italic">
          "{item.text}"
        </p>
      </div>

    </div>
  );
}
