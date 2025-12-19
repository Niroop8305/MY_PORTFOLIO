import { useState, useEffect, useRef } from "react";

// Custom hook for animated counters
function useCounter(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) {
      setHasStarted(true);
      let startTime = null;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [end, duration, start, hasStarted]);

  return count;
}

// Custom hook for 3D tilt effect
function useTiltEffect() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = ((y - centerY) / centerY) * -10;
      const tiltY = ((x - centerX) / centerX) * 10;
      setTilt({ x: tiltX, y: tiltY });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return [cardRef, tilt];
}

// Custom hook for scroll animations
function useScrollAnimation() {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return [elementRef, isVisible];
}

const PROFILE = {
  name: "Laxmi Niroop Papani",
  headline: "Full-Stack Developer",
  tagline:
    "Full-stack developer with strong problem-solving and hackathon experience — I build scalable web applications with clean architecture and solid engineering practices.",
  photo: "/images/profile-photo.jpeg",
  resumeUrl: "/resume.pdf",
  availability: {
    status: "available",
    message: "Available for Full-time Opportunities",
    responseTime: "Usually responds within 24 hours",
  },
  interests: [
    "Full-time Roles",
    "Hackathons",
    "Open Source",
    "Freelance Projects",
  ],
  location: "India",
  links: {
    email: "nirooppapani8305@gmail.com",
    github: "https://github.com/Niroop8305",
    linkedin: "https://www.linkedin.com/in/niroop-papani-9864672b5/",
    leetcode: "https://leetcode.com/u/LaxmiNiroop/",
    hackerrank: "https://www.hackerrank.com/profile/nirooppapani8305",
  },
};

const SKILL_GROUPS = [
  {
    title: "Programming Languages",
    icon: "💻",
    color: "cyan",
    skills: [
      { name: "Java", level: "expert", description: "DSA, OOP" },
      {
        name: "JavaScript",
        level: "expert",
        description: "ES6+, Frontend + Backend",
      },
      {
        name: "Python",
        level: "intermediate",
        description: "ML workflows, automation, scripting",
      },
      {
        name: "SQL",
        level: "expert",
        description: "MySQL, joins, transactions, schema design",
      },
      {
        name: "C",
        level: "intermediate",
        description: "Fundamentals, pointers, memory",
      },
    ],
  },
  {
    title: "Core Computer Science",
    icon: "🧠",
    color: "fuchsia",
    skills: [
      {
        name: "OOP",
        level: "expert",
        description: "Object-Oriented Programming",
      },
      {
        name: "DBMS",
        level: "expert",
        description: "Schema design, normalization, ACID",
      },
      {
        name: "Operating Systems",
        level: "intermediate",
        description: "Processes, threads, scheduling",
      },
      {
        name: "Computer Networks",
        level: "intermediate",
        description: "HTTP, TCP/IP",
      },
      {
        name: "DSA",
        level: "expert",
        description: "Problem-solving & algorithms",
      },
    ],
  },
  {
    title: "Web Development",
    icon: "🌐",
    color: "emerald",
    featured: true,
    skills: [
      {
        name: "React",
        level: "expert",
        description: "Functional components, hooks, state",
      },
      {
        name: "Node.js",
        level: "expert",
        description: "Express.js, REST APIs",
      },
      {
        name: "HTML5 & CSS3",
        level: "expert",
        description: "Responsive, modern UI",
      },
      {
        name: "Tailwind CSS",
        level: "expert",
        description: "Utility-first styling",
      },
      {
        name: "Three.js",
        level: "intermediate",
        description: "3D visualization (NASA project)",
      },
      {
        name: "Auth & Security",
        level: "expert",
        description: "JWT, bcrypt, RBAC",
      },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "🛠️",
    color: "violet",
    skills: [
      {
        name: "Git & GitHub",
        level: "expert",
        description: "Version control, collaboration",
      },
      { name: "VS Code", level: "expert", description: "Primary IDE" },
      {
        name: "Postman",
        level: "expert",
        description: "API testing & debugging",
      },
      {
        name: "Firebase",
        level: "intermediate",
        description: "Cloud storage, OAuth, real-time database",
      },
      {
        name: "Linux",
        level: "intermediate",
        description: "CLI, shell scripting",
      },
    ],
  },
];

const PROJECTS = {
  flagship: [
    {
      title: "NeoVision",
      subtitle: "NASA Space Apps Hackathon — Gold Medal",
      tech: ["React", "Node.js", "Three.js", "APIs"],
      problem:
        "Near‑Earth Object data is high-volume and hard to reason about quickly.",
      solution:
        "An interactive 3D experience that turns raw space data into an intuitive, explorable view.",
      bullets: [
        "Built an interactive 3D visualization for Near-Earth Objects.",
        "Integrated real-time space data APIs for dynamic updates.",
        "Designed frontend interaction logic and smooth user flows.",
      ],
      impact: "Won Gold Medal at NASA Space Apps Hackathon.",
      // Detailed modal content
      fullDescription:
        "NeoVision transforms complex astronomical data into an accessible 3D experience. Users can explore Near-Earth Objects, visualize orbital paths, and understand potential threats through interactive simulations. The project integrates NASA's API data with Three.js rendering to create a real-time educational platform.",
      challenges: [
        "Processing and rendering large datasets in real-time without performance degradation",
        "Creating intuitive 3D controls for users unfamiliar with space visualization",
        "Integrating multiple NASA APIs with different data formats and update frequencies",
      ],
      learnings: [
        "Advanced Three.js optimization techniques for handling thousands of objects",
        "Real-time data streaming and WebSocket implementation",
        "User experience design for 3D interfaces",
      ],
      github: "https://github.com/Niroop8305/neovision",
      demo: "#",
      images: [
        "/projects/neovision-1.jpg",
        "/projects/neovision-2.jpg",
        "/projects/neovision-3.jpg",
      ],
      date: "October 2024",
      team: "Team of 4",
    },
    {
      title: "HR Management System",
      subtitle: "Secure HR workflows with role-based access",
      tech: ["React", "Node.js", "Express", "MySQL", "JWT", "bcrypt"],
      problem:
        "HR processes (attendance, leave, payroll) are error-prone without a consistent schema and access control.",
      solution:
        "A MySQL-first system with JWT auth, role-based permissions, and clearly separated modules.",
      bullets: [
        "Designed a MySQL schema for core HR workflows and data integrity.",
        "Built authentication and role-based authorization using JWT.",
        "Implemented attendance, leave, and payroll modules end-to-end.",
      ],
      impact:
        "Demonstrates strong architecture, database design, and security implementation skills.",
      // Detailed modal content
      fullDescription:
        "A comprehensive HR Management System built with security and scalability in mind. Features role-based access control for Admin, HR, and Employee roles, with complete audit trails for all operations. The system handles employee lifecycle management, attendance tracking, leave management, and payroll processing.",
      challenges: [
        "Designing a normalized database schema that balances performance with data integrity",
        "Implementing secure authentication with JWT refresh token rotation",
        "Creating flexible RBAC system that can adapt to different organizational structures",
      ],
      learnings: [
        "Database design patterns for complex business logic",
        "Security best practices for authentication and authorization",
        "Transaction management and ACID compliance in MySQL",
      ],
      github: "https://github.com/Niroop8305/hr-management",
      demo: "#",
      images: [
        "/projects/hr-1.jpg",
        "/projects/hr-2.jpg",
        "/projects/hr-3.jpg",
      ],
      date: "August 2024",
      team: "Solo Project",
    },
  ],
  secondary: [
    {
      title: "InnovateFund",
      subtitle: "CodeRush Hackathon — Best Innovation Award",
      tech: ["MERN"],
      bullets: [
        "Demonstrates product thinking and rapid prototyping capabilities.",
        "Implemented clear user flows from idea pitching to feedback and iteration.",
      ],
      impact: "Won Best Innovation Award at CodeRush Hackathon.",
      problem:
        "Startups struggle to connect with the right investors and get meaningful feedback on their ideas.",
      solution:
        "A platform connecting entrepreneurs with investors through structured pitch sessions and feedback mechanisms.",
      fullDescription:
        "InnovateFund is a crowdfunding platform specifically designed for tech startups. It includes pitch deck uploads, investor matching algorithms, milestone-based funding, and community feedback features. Built during a 48-hour hackathon.",
      challenges: [
        "Building a full MERN application in 48 hours",
        "Creating an intuitive pitch submission flow",
        "Implementing real-time notification system for investor interest",
      ],
      learnings: [
        "Rapid prototyping under time constraints",
        "Product thinking and user flow design",
        "MongoDB aggregation for complex queries",
      ],
      github: "https://github.com/Niroop8305/innovatefund",
      demo: "#",
      images: ["/projects/innovatefund-1.jpg", "/projects/innovatefund-2.jpg"],
      date: "September 2024",
      team: "Team of 3",
    },
    {
      title: "Walmart Sparkathon 2025",
      subtitle: "AI-Powered Retail Analytics Platform",
      tech: ["React", "Node.js", "MongoDB", "JWT", "ML", "Recharts"],
      bullets: [
        "Built AI-powered platform for inventory, pricing, and marketing optimization.",
        "Achieved 95% prediction accuracy in product demand forecasting.",
        "Implemented dynamic pricing reducing costs by 30% and waste by 25%.",
      ],
      problem:
        "Retailers face inventory mismanagement, suboptimal pricing strategies, ineffective marketing, and waste generation from unsold products.",
      solution:
        "An integrated AI platform combining predictive analytics, dynamic pricing, and marketing insights to drive profitability and reduce waste.",
      fullDescription:
        "AI-Powered Retail Analytics Platform revolutionizing how Walmart manages operations through machine learning and real-time data analysis. Features include smart product trend analysis with 95% accuracy, dynamic pricing optimization reducing costs by 30%, AI-driven marketing insights improving ROI by 40%, and waste reduction strategies cutting waste by 25%. Built with React, Node.js, MongoDB, and custom ML algorithms.",
      challenges: [
        "Building predictive ML models with 95% accuracy for demand forecasting",
        "Implementing real-time data analysis for thousands of products",
        "Creating intuitive dashboards for complex business metrics",
        "Integrating authentication, pricing algorithms, and marketing automation",
      ],
      learnings: [
        "Machine learning integration with MERN stack applications",
        "Advanced data visualization with Recharts and Framer Motion",
        "Secure authentication and role-based access control",
        "Business impact measurement and KPI tracking",
      ],
      impact:
        "30% cost reduction, 40% marketing ROI improvement, 25% waste reduction",
      github: "https://github.com/Niroop8305/Sparkathon-2025---website",
      demo: "https://sparkathon-website.vercel.app/auth",
      images: [
        "/images/Sparkathon-1.png",
        "/images/Sparkathon-2.png",
        "/images/Sparkathon-3.png",
        "/images/Sparkathon-4.png",
      ],
      date: "January 2025",
      team: "Solo Project",
    },
  ],
};

const ACHIEVEMENTS = {
  major: [
    {
      title: "Gold Medal",
      event: "NASA Space Apps Hackathon",
      date: "September 2024",
      location: "Chandigarh",
      team: "Team of 4",
      project: "NeoVision",
      ranking: "1st Place - Regional",
      description:
        "Won gold medal for building an interactive 3D visualization platform for Near-Earth Objects using React, Node.js, and Three.js.",
      techStack: ["React", "Node.js", "Three.js", "Express", "MongoDB"],
      github: "https://github.com/Niroop8305/NeoVision",
      demo: "",
      proof: "/certificates/nasa-medal-photo.jpeg",
      proofType: "photo",
      icon: "🏆",
      color: "emerald",
    },
    {
      title: "Best Innovation Award",
      event: "CodeRush Hackathon",
      date: "August 2025",
      location: "Nagpur",
      team: "Team of 5",
      project: "InnovateFund",
      ranking: "Best Innovation - Top 3",
      description:
        "Received Best Innovation Award for creating a crowdfunding platform connecting tech startups with investors using the MERN stack.",
      techStack: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      github: "https://github.com/Niroop8305/InnovateFund",
      demo: "",
      proof: "/certificates/coderush-innovation.jpeg",
      proofType: "certificate",
      icon: "💡",
      color: "cyan",
    },
  ],
  participations: [
    {
      event: "NASA Space Apps Challenge",
      date: "September 2024",
      status: "Finalist",
      description: "Global competition for space exploration solutions",
      certificate:
        "/certificates/NASA_Hackathon_Nationals_ParticipationCertificate (1).pdf",
    },
    {
      event: "Odoo x Amalthea",
      date: "August 2024",
      status: "Finalist",
      description: "Enterprise resource planning hackathon",
      certificate: "/certificates/Odoo.pdf",
    },
    {
      event: "CodeRush Hackathon",
      date: "August 2025",
      status: "Finalist",
      description: "Innovation-focused development competition",
      certificate: "/certificates/CodeRush_Participation.pdf",
    },
    {
      event: "Paranox 2.0",
      date: "July 2024",
      status: "Top 200",
      description: "Selected in Top 200 out of 1500+ project submissions",
      certificate: "/certificates/Paranox_2.0_Achievement.pdf",
    },
    {
      event: "Hackfinity",
      date: "June 2024",
      status: "Shortlisted",
      description: "Multi-domain hackathon competition",
      certificate: "/certificates/Hackfinity.pdf",
    },
    {
      event: "UNESCO Youth Hackathon",
      date: "May 2024",
      status: "Participated",
      description: "Youth-focused social impact hackathon",
      certificate: "/certificates/Unesco.pdf",
    },
    {
      event: "Walmart Sparkathon",
      date: "April 2024",
      status: "Participated",
      description: "Retail technology and innovation challenge",
      certificate: "/certificates/Niroop_Papani_sparkathon_WM_2025.pdf",
    },
    {
      event: "Hackwave 1.0",
      date: "March 2024",
      status: "Participated",
      description: "Technology and problem-solving competition",
      certificate: "/certificates/HackWave_1.0.pdf",
    },
  ],
  stats: {
    totalHackathons: 8,
    majorWins: 2,
    teamProjects: 6,
  },
};

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

function MonogramMark({ name }) {
  const [imageError, setImageError] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/5">
      {!imageError && PROFILE.photo ? (
        <>
          <img
            src={PROFILE.photo}
            alt={name}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br from-cyan-400/20 via-fuchsia-400/20 to-emerald-400/20 opacity-30"
          />
        </>
      ) : (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br from-cyan-400/20 via-fuchsia-400/20 to-emerald-400/20 opacity-70"
          />
          <div className="relative grid h-full w-full place-items-center text-sm font-semibold text-slate-50">
            <span>{initials || "LN"}</span>
          </div>
        </>
      )}
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <a href="#hero" className="inline-flex items-center gap-3">
          <MonogramMark name={PROFILE.name} />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-50">
              {PROFILE.name}
            </div>
            <div className="text-xs text-slate-300">{PROFILE.headline}</div>
          </div>
        </a>

        <nav className="hidden items-center gap-2 sm:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200/90 transition hover:bg-white/5 hover:text-slate-50"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={PROFILE.resumeUrl}
          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-50 transition hover:bg-white/10"
        >
          Resume
        </a>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-3 sm:hidden">
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-200/90 transition hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

function SectionHeading({ eyebrow, title, subtitle }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold tracking-[0.35em] text-slate-300/80">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-pretty text-base leading-7 text-slate-300 sm:text-lg">
          {subtitle}
        </p>
      ) : null}

      <div className="mx-auto mt-7 h-px w-24 bg-linear-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

function TechIcon({ name, icon }) {
  return (
    <div className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/10 hover:scale-105">
      <span className="text-lg transition-transform group-hover:scale-110">
        {icon}
      </span>
      <span>{name}</span>
    </div>
  );
}

function SkillBadge({ skill, color }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const colorMap = {
    cyan: "border-cyan-400/30 bg-cyan-400/5 hover:bg-cyan-400/10 hover:border-cyan-400/50",
    fuchsia:
      "border-fuchsia-400/30 bg-fuchsia-400/5 hover:bg-fuchsia-400/10 hover:border-fuchsia-400/50",
    emerald:
      "border-emerald-400/30 bg-emerald-400/5 hover:bg-emerald-400/10 hover:border-emerald-400/50",
    violet:
      "border-violet-400/30 bg-violet-400/5 hover:bg-violet-400/10 hover:border-violet-400/50",
  };

  const levelMap = {
    expert: {
      dots: 3,
      color: "bg-emerald-400",
      label: "Expert",
      percentage: 90,
      barColor: "bg-emerald-400",
    },
    intermediate: {
      dots: 2,
      color: "bg-cyan-400",
      label: "Intermediate",
      percentage: 75,
      barColor: "bg-cyan-400",
    },
  };

  const level = levelMap[skill.level];

  return (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`group relative inline-flex flex-col items-start overflow-hidden rounded-lg border px-3 transition-all duration-300 hover:scale-105 ${
        colorMap[color]
      } ${isExpanded ? "py-3" : "py-2"}`}
    >
      <div className="flex w-full items-center justify-between gap-2.5">
        <span className="text-sm font-semibold text-slate-200">
          {skill.name}
        </span>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-all ${
                  i < level.dots ? level.color : "bg-slate-600"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-slate-400">
            {level.percentage}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full mt-2 h-1 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className={`h-full ${level.barColor} transition-all duration-500 ease-out`}
          style={{
            width: isExpanded ? `${level.percentage}%` : "0%",
          }}
        />
      </div>

      {/* Expandable description */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-xs text-slate-400 leading-relaxed border-t border-white/10 pt-2">
          {skill.description}
        </div>
        <div className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium">
          <span className={`h-1 w-1 rounded-full ${level.color}`}></span>
          <span className="text-slate-500">{level.label}</span>
        </div>
      </div>
    </button>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
      {children}
    </span>
  );
}

function CertificateModal({
  certificate,
  title,
  proofType = "certificate",
  onClose,
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!certificate) return null;

  const isPDF = certificate.toLowerCase().endsWith(".pdf");

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/95 text-slate-400 backdrop-blur transition hover:bg-white/10 hover:text-slate-50"
          aria-label="Close"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Proof Image/PDF */}
        <div className="rounded-2xl border border-white/20 bg-slate-800/50 p-8">
          <div className="aspect-[1.414/1] rounded-xl overflow-hidden bg-slate-900/50">
            {isPDF ? (
              <embed
                src={certificate}
                type="application/pdf"
                className="h-full w-full"
              />
            ) : (
              <img
                src={certificate}
                alt={title}
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
            )}
            <div className="hidden h-full flex-col items-center justify-center text-slate-400 border-2 border-dashed border-white/20">
              <svg
                className="h-16 w-16 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d={
                    proofType === "photo"
                      ? "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      : "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  }
                />
              </svg>
              <p className="text-lg font-semibold">{title}</p>
              <p className="mt-2 text-sm">
                {proofType === "photo" ? "Award Photo" : "Certificate"} not
                found
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href={certificate}
              download
              className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-white"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download {proofType === "photo" ? "Photo" : "Certificate"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose, onNext, onPrev]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 rounded-2xl border border-white/10 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/95 text-slate-400 backdrop-blur transition hover:bg-white/10 hover:text-slate-50"
          aria-label="Close"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-50">
                {project.title}
              </h2>
              <p className="mt-2 text-lg text-slate-300">{project.subtitle}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                <span>📅 {project.date}</span>
                <span>•</span>
                <span>👥 {project.team}</span>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-sm font-semibold text-cyan-200"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Image Gallery */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {project.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${project.title} screenshot ${i + 1}`}
                className="aspect-video w-full rounded-xl border border-white/10 bg-slate-800/50 object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                  const parent = e.target.parentElement;
                  const placeholder = document.createElement("div");
                  placeholder.className =
                    "aspect-video rounded-xl border border-white/10 bg-slate-800/50 flex items-center justify-center text-slate-500";
                  placeholder.innerHTML = `
                    <div class="text-center">
                      <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p class="mt-2 text-sm">Image ${i + 1}</p>
                    </div>
                  `;
                  parent.appendChild(placeholder);
                }}
              />
            ))}
          </div>

          {/* Full Description */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-slate-50">
              About This Project
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-300">
              {project.fullDescription}
            </p>
          </div>

          {/* Problem & Solution */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h4 className="font-semibold text-slate-50">🎯 Problem</h4>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {project.problem}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h4 className="font-semibold text-slate-50">💡 Solution</h4>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Challenges */}
          {project.challenges && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-slate-50">
                💪 Challenges Overcome
              </h3>
              <ul className="mt-4 space-y-3">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex gap-3 text-base text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-400" />
                    <span className="leading-7">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Learnings */}
          {project.learnings && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-slate-50">
                📚 Key Learnings
              </h3>
              <ul className="mt-4 space-y-3">
                {project.learnings.map((learning, i) => (
                  <li key={i} className="flex gap-3 text-base text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                    <span className="leading-7">{learning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What I Did */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-slate-50">
              ⚙️ What I Did
            </h3>
            <ul className="mt-4 space-y-3">
              {project.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-3 text-base text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span className="leading-7">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          {project.impact && (
            <div className="mt-8 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-5">
              <h4 className="font-semibold text-emerald-200">🎯 Impact</h4>
              <p className="mt-2 text-base leading-7 text-slate-300">
                {project.impact}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-white hover:shadow-lg"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View on GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-base font-semibold text-slate-50 backdrop-blur transition hover:bg-white/10"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Live Demo
              </a>
            )}
          </div>

          {/* Navigation arrows */}
          {(onPrev || onNext) && (
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <button
                onClick={onPrev}
                disabled={!onPrev}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous Project
              </button>
              <button
                onClick={onNext}
                disabled={!onNext}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next Project
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SignatureCard({ children }) {
  const [tiltRef, tilt] = useTiltEffect();
  const [scrollRef, isVisible] = useScrollAnimation();

  return (
    <div
      ref={(node) => {
        tiltRef.current = node;
        scrollRef.current = node;
      }}
      className={`group relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-white/3 p-6 shadow-sm ring-1 ring-cyan-400/10 backdrop-blur transition-all duration-700 sm:p-7 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.1s ease-out, opacity 700ms, translate 700ms",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <div className="absolute -inset-16 rounded-full bg-linear-to-br from-cyan-500/10 via-fuchsia-500/10 to-emerald-500/10 blur-2xl" />
      </div>
      <div className="relative" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </div>
  );
}

function Card({ children, variant = "default", delay = 0 }) {
  const [ref, isVisible] = useScrollAnimation();
  const base =
    "group relative overflow-hidden rounded-2xl border bg-white/[0.03] p-6 shadow-sm ring-1 ring-white/5 backdrop-blur transition-all duration-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 sm:p-7";
  const border =
    variant === "flagship"
      ? "border-cyan-400/20 ring-1 ring-cyan-400/10"
      : "border-white/10";

  const animationClass = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-8";

  return (
    <div
      ref={ref}
      className={`${base} ${border} ${animationClass}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <div className="absolute -inset-16 rounded-full bg-linear-to-br from-cyan-500/10 via-fuchsia-500/10 to-emerald-500/10 blur-2xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function QuickWinsBar() {
  const wins = [
    { icon: "🏆", label: "Major Wins", value: "2" },
    { icon: "📊", label: "Hackathons", value: "8+" },
    { icon: "💻", label: "Full-Stack", value: "Expert" },
    { icon: "⚡", label: "Top Ranking", value: "200/1500+" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-cyan-500/20">
      <div className="mx-auto max-w-7xl px-6 py-3">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {wins.map((win, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-sm group hover:scale-105 transition-transform"
            >
              <span className="text-xl">{win.icon}</span>
              <span className="text-gray-400">{win.label}:</span>
              <span className="font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                {win.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [certificateTitle, setCertificateTitle] = useState("");
  const [certificateProofType, setCertificateProofType] =
    useState("certificate");
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState([]);

  const allProjects = [...PROJECTS.flagship, ...PROJECTS.secondary];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleCertificateClick = (
    certificate,
    title,
    proofType = "certificate"
  ) => {
    setSelectedCertificate(certificate);
    setCertificateTitle(title);
    setCertificateProofType(proofType);
  };

  const handleCloseCertificate = () => {
    setSelectedCertificate(null);
    setCertificateTitle("");
    setCertificateProofType("certificate");
  };

  const handleNextProject = () => {
    const currentIndex = allProjects.findIndex(
      (p) => p.title === selectedProject.title
    );
    if (currentIndex < allProjects.length - 1) {
      setSelectedProject(allProjects[currentIndex + 1]);
    }
  };

  const handlePrevProject = () => {
    const currentIndex = allProjects.findIndex(
      (p) => p.title === selectedProject.title
    );
    if (currentIndex > 0) {
      setSelectedProject(allProjects[currentIndex - 1]);
    }
  };

  // Konami Code Easter Egg
  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];

    const handleKeyPress = (e) => {
      const newSequence = [...konamiSequence, e.key].slice(-10);
      setKonamiSequence(newSequence);

      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 5000);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [konamiSequence]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      >
        <div className="absolute -top-32 left-1/2 h-160 w-160 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-40 right-[-10%] h-136 w-136 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[72px_72px] opacity-[0.05]" />

        {/* Cursor-following gradient spotlight */}
        <div
          className="absolute h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl transition-all duration-300 ease-out"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute h-64 w-64 rounded-full bg-fuchsia-400/15 blur-2xl transition-all duration-500 ease-out"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Easter Egg Notification */}
      {showEasterEgg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-100 animate-bounce">
          <div className="rounded-xl bg-linear-to-r from-cyan-500 to-purple-500 p-1 shadow-2xl">
            <div className="rounded-lg bg-gray-900 px-8 py-4 text-center">
              <p className="text-xl font-bold text-cyan-400 mb-2">
                🎮 Achievement Unlocked! 🎮
              </p>
              <p className="text-sm text-gray-300">
                You found the secret Konami Code!
              </p>
              <p className="text-xs text-gray-400 mt-2">
                True gamers never forget the classics 👾
              </p>
            </div>
          </div>
        </div>
      )}

      <QuickWinsBar />

      <main className="relative pt-16">
        <Nav />

        <section
          id="hero"
          className="scroll-mt-28 px-6 pt-14 sm:scroll-mt-24 sm:pt-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      Full-Stack Developer • Hackathon Builder • Problem Solver
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200">
                    <span>📍</span>
                    <span>Open to Opportunities</span>
                  </div>
                </div>

                <h1 className="mt-8 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                  <span className="bg-linear-to-r from-slate-50 via-cyan-100 to-slate-50 bg-clip-text text-transparent">
                    {PROFILE.name}
                  </span>
                </h1>
                <p className="mt-3 text-base font-medium tracking-wide text-cyan-200/90 sm:text-lg">
                  {PROFILE.headline}
                </p>
                <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-slate-300 sm:text-lg">
                  {PROFILE.tagline}
                </p>

                {/* Animated Stats */}
                <div className="mt-9 grid grid-cols-3 gap-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                    <div className="text-2xl font-bold text-cyan-300">
                      {useCounter(8)}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-slate-300">
                      Projects
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                    <div className="text-2xl font-bold text-fuchsia-300">
                      {useCounter(2)}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-slate-300">
                      Major Awards
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                    <div className="text-2xl font-bold text-emerald-300">
                      {useCounter(10)}+
                    </div>
                    <div className="mt-1 text-xs font-semibold text-slate-300">
                      Technologies
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 flex items-center gap-3">
                  <a
                    href={PROFILE.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-cyan-300"
                    aria-label="GitHub"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href={PROFILE.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-cyan-300"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:${PROFILE.links.email}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-cyan-300"
                    aria-label="Email"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </a>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#projects"
                    className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50 px-6 py-3.5 text-base font-semibold text-slate-950 shadow-sm transition hover:bg-white hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105 active:scale-95 sm:w-auto"
                  >
                    <span className="absolute inset-0 bg-linear-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    <span className="relative flex items-center gap-2">
                      View Projects
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </a>
                  <a
                    href={PROFILE.resumeUrl}
                    className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-base font-semibold text-slate-50 backdrop-blur transition hover:bg-white/10 hover:border-cyan-300/50 hover:shadow-lg hover:shadow-cyan-500/10 hover:scale-105 active:scale-95 sm:w-auto"
                  >
                    <span className="absolute inset-0 bg-linear-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    <span className="relative">Download Resume</span>
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <TechIcon name="JavaScript" icon="⚡" />
                  <TechIcon name="React" icon="⚛️" />
                  <TechIcon name="Node.js" icon="🟢" />
                  <TechIcon name="MySQL" icon="🐬" />
                  <TechIcon name="Java" icon="☕" />
                </div>
              </div>

              <div className="lg:col-span-5">
                {/* Floating geometric shapes */}
                <div className="pointer-events-none absolute right-0 top-20 h-32 w-32 animate-float opacity-30">
                  <svg viewBox="0 0 100 100" className="text-cyan-400">
                    <polygon
                      points="50,10 90,90 10,90"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div
                  className="pointer-events-none absolute right-20 top-60 h-24 w-24 animate-float-delayed opacity-20"
                  style={{ animationDelay: "1s" }}
                >
                  <svg viewBox="0 0 100 100" className="text-fuchsia-400">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div
                  className="pointer-events-none absolute -right-10 top-96 h-20 w-20 animate-float opacity-25"
                  style={{ animationDelay: "2s" }}
                >
                  <svg viewBox="0 0 100 100" className="text-emerald-400">
                    <rect
                      x="20"
                      y="20"
                      width="60"
                      height="60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      transform="rotate(45 50 50)"
                    />
                  </svg>
                </div>

                <SignatureCard>
                  <div className="flex items-start gap-6 mb-6">
                    {/* Profile Photo */}
                    <div className="relative group shrink-0">
                      <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <img
                        src={PROFILE.photo}
                        alt={PROFILE.name}
                        className="relative w-20 h-20 rounded-full object-cover border-2 border-gray-900"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                        loading="lazy"
                      />
                    </div>

                    {/* Signature Text */}
                    <div className="flex-1">
                      <p className="text-sm font-semibold tracking-[0.35em] text-slate-300/80">
                        SIGNATURE
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-slate-50">
                        Professional & Production-Ready
                      </h3>
                    </div>
                  </div>

                  <p className="text-base leading-7 text-slate-300">
                    Clean architecture, defensive security defaults, and fast
                    delivery under constraints.
                  </p>

                  <div className="mt-7 grid gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-slate-200">
                        Highlight
                      </span>
                      <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-1.5 text-sm font-semibold text-emerald-100">
                        NASA Space Apps — Gold Medal
                      </span>
                    </div>
                    <div className="grid gap-3 text-base text-slate-200">
                      <div className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80" />
                        <span className="leading-7">
                          Full-stack delivery: React + Node/Express + MySQL.
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-300/80" />
                        <span className="leading-7">
                          Security basics: JWT auth, RBAC, bcrypt hashing.
                        </span>
                      </div>
                    </div>
                  </div>
                </SignatureCard>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 flex justify-center">
              <a
                href="#skills"
                className="inline-flex flex-col items-center gap-2 text-slate-400 transition hover:text-cyan-300"
              >
                <span className="text-xs font-semibold tracking-wider">
                  SCROLL TO EXPLORE
                </span>
                <svg
                  className="h-6 w-6 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="scroll-mt-28 px-6 pt-24 sm:scroll-mt-24 sm:pt-32"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="SKILLS"
              title="Technical Expertise"
              subtitle="Strong foundation in computer science fundamentals, modern web development, system architecture, and security best practices."
            />

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {SKILL_GROUPS.map((group, index) => (
                <Card
                  key={group.title}
                  delay={index * 100}
                  variant={group.featured ? "flagship" : "default"}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{group.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-50">
                        {group.title}
                      </h3>
                      <p className="mt-0.5 text-xs font-semibold text-slate-400">
                        {group.skills.length} skills
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <SkillBadge
                        key={skill.name}
                        skill={skill}
                        color={group.color}
                      />
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="scroll-mt-28 px-6 pt-24 sm:scroll-mt-24 sm:pt-32"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="PROJECTS"
              title="Featured Work"
              subtitle="Showcasing flagship projects with real-world impact and technical depth."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {PROJECTS.flagship.map((p, index) => (
                <Card key={p.title} variant="flagship" delay={index * 150}>
                  <button
                    onClick={() => handleProjectClick(p)}
                    className="w-full text-left transition hover:opacity-90"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-50">
                          {p.title}
                        </h3>
                        <p className="mt-1 text-base text-slate-300">
                          {p.subtitle}
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-1.5 text-sm font-semibold text-cyan-100">
                        Flagship
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <Pill key={t}>{t}</Pill>
                      ))}
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                        <p className="text-sm font-semibold tracking-wide text-slate-200">
                          Problem
                        </p>
                        <p className="mt-2 text-base leading-7 text-slate-300">
                          {p.problem}
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                        <p className="text-sm font-semibold tracking-wide text-slate-200">
                          Solution
                        </p>
                        <p className="mt-2 text-base leading-7 text-slate-300">
                          {p.solution}
                        </p>
                      </div>
                    </div>

                    <p className="mt-7 text-sm font-semibold tracking-[0.35em] text-slate-300/80">
                      WHAT I DID
                    </p>

                    <ul className="mt-4 space-y-3 text-base text-slate-300">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-300/80" />
                          <span className="leading-7">{b}</span>
                        </li>
                      ))}
                    </ul>

                    {p.impact ? (
                      <p className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-200">
                        <span className="font-semibold text-slate-50">
                          Impact:
                        </span>{" "}
                        {p.impact}
                      </p>
                    ) : null}
                  </button>
                </Card>
              ))}

              {PROJECTS.secondary.map((p, index) => (
                <Card
                  key={p.title}
                  delay={(PROJECTS.flagship.length + index) * 150}
                >
                  <button
                    onClick={() => handleProjectClick(p)}
                    className="w-full text-left transition hover:opacity-90"
                  >
                    <h3 className="text-xl font-semibold text-slate-50">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-base text-slate-300">
                      {p.subtitle}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <Pill key={t}>{t}</Pill>
                      ))}
                    </div>

                    <ul className="mt-6 space-y-3 text-base text-slate-300">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80" />
                          <span className="leading-7">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="achievements"
          className="scroll-mt-28 px-6 pt-24 sm:scroll-mt-24 sm:pt-32"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="ACHIEVEMENTS"
              title="Recognition & Awards"
              subtitle="Measurable outcomes and competition results demonstrating excellence in technical challenges."
            />

            {/* Stats Counter */}
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-6 py-4 text-center">
                <div className="text-3xl font-bold text-emerald-300">
                  {ACHIEVEMENTS.stats.majorWins}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-300">
                  Major Awards Won
                </div>
              </div>
              <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-6 py-4 text-center">
                <div className="text-3xl font-bold text-cyan-300">
                  {ACHIEVEMENTS.stats.totalHackathons}+
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-300">
                  Hackathons Participated
                </div>
              </div>
              <div className="rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/5 px-6 py-4 text-center">
                <div className="text-3xl font-bold text-fuchsia-300">
                  {ACHIEVEMENTS.stats.teamProjects}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-300">
                  Team Projects Led
                </div>
              </div>
            </div>

            {/* Major Awards */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-slate-50 mb-6">
                🏆 Major Awards
              </h3>
              <div className="grid gap-6 lg:grid-cols-2">
                {ACHIEVEMENTS.major.map((award, index) => (
                  <Card
                    key={award.title}
                    variant="flagship"
                    delay={index * 150}
                  >
                    <button
                      onClick={() =>
                        handleCertificateClick(
                          award.proof,
                          `${award.title} - ${award.event}`,
                          award.proofType
                        )
                      }
                      className="w-full text-left group"
                    >
                      {/* Proof Image */}
                      <div className="aspect-video rounded-xl border border-white/10 bg-slate-800/50 overflow-hidden transition group-hover:border-cyan-400/30">
                        <img
                          src={award.proof}
                          alt={`${award.title} - ${award.event}`}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextElementSibling.style.display = "flex";
                          }}
                        />
                        <div className="hidden h-full flex-col items-center justify-center text-slate-500">
                          <span className="text-5xl mb-3">{award.icon}</span>
                          <p className="text-sm font-semibold">
                            {award.proofType === "photo"
                              ? "Award Photo"
                              : "Certificate"}
                          </p>
                          <p className="text-xs mt-1">Click to view</p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-slate-50">
                              {award.title}
                            </h4>
                            <p className="mt-1 text-base text-cyan-300">
                              {award.event}
                            </p>
                            {award.ranking && (
                              <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300">
                                <svg
                                  className="h-4 w-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {award.ranking}
                              </p>
                            )}
                          </div>
                          <span
                            className={`inline-flex items-center rounded-full border border-${award.color}-300/20 bg-${award.color}-300/10 px-3 py-1 text-xs font-semibold text-${award.color}-100`}
                          >
                            Winner
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                          <span>📅 {award.date}</span>
                          <span>•</span>
                          <span>📍 {award.location}</span>
                          <span>•</span>
                          <span>👥 {award.team}</span>
                        </div>

                        <p className="mt-4 text-base leading-7 text-slate-300">
                          {award.description}
                        </p>

                        {/* Tech Stack */}
                        {award.techStack && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {award.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Project Links */}
                        {(award.github || award.demo) && (
                          <div className="mt-5 flex flex-wrap gap-3">
                            {award.github && (
                              <a
                                href={award.github}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/10"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                GitHub
                              </a>
                            )}
                            {award.demo && award.demo !== "" && (
                              <a
                                href={award.demo}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/20"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                                Live Demo
                              </a>
                            )}
                          </div>
                        )}

                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 group-hover:gap-3 transition-all">
                          <span>
                            {award.proofType === "photo"
                              ? "View Photo"
                              : "View Certificate"}
                          </span>
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Participations */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-slate-50 mb-6">
                🎯 Hackathon Participations
              </h3>
              <Card>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {ACHIEVEMENTS.participations.map((participation, index) => (
                    <button
                      key={participation.event}
                      onClick={() =>
                        handleCertificateClick(
                          participation.certificate,
                          `${participation.event} Participation`
                        )
                      }
                      className="group flex flex-col gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-left transition hover:border-cyan-400/30 hover:bg-white/10"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 group-hover:border-cyan-400/30 group-hover:text-cyan-300 transition">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-200">
                              {participation.event}
                            </p>
                            <p className="text-xs text-slate-400">
                              {participation.date}
                            </p>
                          </div>
                        </div>
                        {participation.status && (
                          <span className="shrink-0 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-300">
                            {participation.status}
                          </span>
                        )}
                      </div>
                      {participation.description && (
                        <p className="text-xs leading-relaxed text-slate-400">
                          {participation.description}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="scroll-mt-28 px-6 pb-24 pt-24 sm:scroll-mt-24 sm:pb-32 sm:pt-32"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="TESTIMONIALS"
              title="What Teammates Say"
              subtitle="Feedback from collaborators and team members from hackathons and projects."
            />

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <Card delay={0}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-linear-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-white font-bold">
                      AS
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">
                        Aarav Sharma
                      </p>
                      <p className="text-xs text-slate-400">
                        Team Lead • NASA Hackathon
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">
                    "Niroop's problem-solving skills and ability to work under
                    pressure were exceptional during the NASA hackathon. He
                    delivered clean, production-ready code on tight deadlines."
                  </p>
                </div>
              </Card>

              {/* Testimonial 2 */}
              <Card delay={100}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-linear-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-white font-bold">
                      PK
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">
                        Priya Kapoor
                      </p>
                      <p className="text-xs text-slate-400">
                        Frontend Developer • CodeRush
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">
                    "Great collaborator! Niroop's understanding of full-stack
                    architecture and API design helped us win Best Innovation.
                    His code reviews were always insightful."
                  </p>
                </div>
              </Card>

              {/* Testimonial 3 */}
              <Card delay={200}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                      RV
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">
                        Rohan Verma
                      </p>
                      <p className="text-xs text-slate-400">
                        Backend Developer • Paranox 2.0
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">
                    "Niroop's technical expertise and leadership helped us rank
                    in Top 200 out of 1500+ teams. His focus on security and
                    scalability is impressive."
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-28 px-6 pb-24 pt-24 sm:scroll-mt-24 sm:pb-32 sm:pt-32"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="CONTACT"
              title="Let's Connect"
              subtitle="Open to opportunities, collaborations, and interesting projects. Let's build something great together."
            />

            {/* Availability Banner */}
            <div className="mt-12">
              <Card variant="flagship">
                <div className="flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                    </span>
                    {PROFILE.availability.message}
                  </div>
                  <p className="mt-4 text-base text-slate-300">
                    {PROFILE.availability.responseTime}
                  </p>
                </div>
              </Card>
            </div>

            {/* Main Content - Two Column */}
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {/* Left Column - Primary Contact */}
              <div className="space-y-6">
                {/* Email Card */}
                <Card variant="flagship">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                      <svg
                        className="h-6 w-6 text-cyan-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-50">
                        Email
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        Fastest way to reach me
                      </p>
                      <a
                        href={`mailto:${PROFILE.links.email}`}
                        className="mt-3 inline-flex items-center gap-2 text-base font-semibold text-cyan-300 transition hover:text-cyan-200"
                      >
                        {PROFILE.links.email}
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Card>

                {/* Resume Card */}
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <svg
                        className="h-6 w-6 text-slate-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-50">
                        Resume
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        Download a PDF copy
                      </p>
                      <a
                        href={PROFILE.resumeUrl}
                        className="mt-3 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download Resume
                      </a>
                    </div>
                  </div>
                </Card>

                {/* Location */}
                <Card>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <svg
                      className="h-5 w-5 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Based in {PROFILE.location}</span>
                  </div>
                </Card>
              </div>

              {/* Right Column - Social Links & Interests */}
              <div className="space-y-6">
                {/* Social Profiles */}
                <Card>
                  <h3 className="text-lg font-semibold text-slate-50 mb-4">
                    Social Profiles
                  </h3>
                  <div className="space-y-3">
                    <a
                      href={PROFILE.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/20 hover:bg-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-950">
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-200">
                            GitHub
                          </p>
                          <p className="text-xs text-slate-400">
                            Check out my repositories
                          </p>
                        </div>
                      </div>
                      <svg
                        className="h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>

                    <a
                      href={PROFILE.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-blue-400/30 hover:bg-blue-400/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A66C2]">
                          <svg
                            className="h-4 w-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-200">
                            LinkedIn
                          </p>
                          <p className="text-xs text-slate-400">
                            Let's connect professionally
                          </p>
                        </div>
                      </div>
                      <svg
                        className="h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>

                    {/* LeetCode */}
                    <a
                      href={PROFILE.links.leetcode}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-orange-400/30 hover:bg-orange-400/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
                          <span className="text-sm font-bold text-white">
                            LC
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-200">
                            LeetCode
                          </p>
                          <p className="text-xs text-slate-400">
                            Competitive programming
                          </p>
                        </div>
                      </div>
                      <svg
                        className="h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>

                    {/* HackerRank */}
                    <a
                      href={PROFILE.links.hackerrank}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-green-400/30 hover:bg-green-400/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500">
                          <span className="text-sm font-bold text-white">
                            HR
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-200">
                            HackerRank
                          </p>
                          <p className="text-xs text-slate-400">
                            Problem solving skills
                          </p>
                        </div>
                      </div>
                      <svg
                        className="h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </div>
                </Card>

                {/* Work Interests */}
                <Card>
                  <h3 className="text-lg font-semibold text-slate-50 mb-4">
                    Open To
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {PROFILE.interests.map((interest) => (
                      <span
                        key={interest}
                        className="inline-flex items-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-sm font-semibold text-cyan-300"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* GitHub Stats - Full Width */}
            <div className="mt-12">
              <Card>
                <h3 className="text-lg font-semibold text-slate-50 mb-6 text-center">
                  GitHub Activity
                </h3>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="flex items-center justify-center">
                    <img
                      src="https://github-readme-stats.vercel.app/api?username=Niroop8305&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=67e8f9&icon_color=67e8f9&text_color=c9d1d9&rank_icon=github"
                      alt="GitHub Stats"
                      className="w-full rounded-lg"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const parent = e.target.parentElement;
                        const fallback = document.createElement("div");
                        fallback.className = "text-center text-slate-400 py-8";
                        fallback.innerHTML =
                          '<p>Unable to load GitHub stats</p><p class="text-sm mt-2">Visit <a href="https://github.com/Niroop8305" class="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>';
                        parent.appendChild(fallback);
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <img
                      src="https://github-readme-stats.vercel.app/api/top-langs/?username=Niroop8305&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=67e8f9&text_color=c9d1d9"
                      alt="Most Used Languages"
                      className="w-full rounded-lg"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const parent = e.target.parentElement;
                        const fallback = document.createElement("div");
                        fallback.className = "text-center text-slate-400 py-8";
                        fallback.innerHTML =
                          '<p>Unable to load language stats</p><p class="text-sm mt-2">Visit <a href="https://github.com/Niroop8305" class="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>';
                        parent.appendChild(fallback);
                      }}
                    />
                  </div>
                </div>

                {/* Manual GitHub Stats as Backup */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-400">63</div>
                    <div className="mt-1 text-sm text-slate-400">
                      Total Commits
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">3</div>
                    <div className="mt-1 text-sm text-slate-400">
                      Repositories
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-400">1</div>
                    <div className="mt-1 text-sm text-slate-400">
                      Pull Requests
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400">3</div>
                    <div className="mt-1 text-sm text-slate-400">
                      Stars Earned
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <a
                    href="https://github.com/Niroop8305"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/10"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    View Full GitHub Profile
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-slate-950/50 px-6 py-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-sm text-slate-500">
              © {new Date().getFullYear()} {PROFILE.name}
            </p>
          </div>
        </footer>
      </main>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
          onNext={
            allProjects.findIndex((p) => p.title === selectedProject.title) <
            allProjects.length - 1
              ? handleNextProject
              : null
          }
          onPrev={
            allProjects.findIndex((p) => p.title === selectedProject.title) > 0
              ? handlePrevProject
              : null
          }
        />
      )}

      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          title={certificateTitle}
          proofType={certificateProofType}
          onClose={handleCloseCertificate}
        />
      )}
    </div>
  );
}

export default App;
