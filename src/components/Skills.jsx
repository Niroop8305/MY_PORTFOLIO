import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

/* ─── Data: Filtered strictly to original skills ─── */
const ALL_SKILLS = [
  { name: "React.js", icon: "react" },
  { name: "JavaScript", icon: "javascript" },
  { name: "HTML5", icon: "html5" },
  { name: "CSS3", icon: "css3" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Three.js", icon: "threejs" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Express.js", icon: "express" },
  { name: "Python", icon: "python" },
  { name: "Spring Boot", icon: "spring" },
  { name: "MySQL", icon: "mysql" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Firebase", icon: "firebase" },
  { name: "Oracle", icon: "oracle" },
  { name: "Java", icon: "java" },
  { name: "C", icon: "c" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "Postman", icon: "postman" },
  { name: "VS Code", icon: "vscode" },
  { name: "Linux", icon: "linux" },
  { name: "Docker", icon: "docker" },
];

/* Devicon URL helper */
function iconUrl(slug) {
  if (!slug) return null;
  const map = {
    threejs:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg",
    vscode:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
    postman:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
    tailwindcss:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    amazonwebservices:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    express:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    github:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  };
  return (
    map[slug] ||
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`
  );
}

/* ─── Individual Skill Node ─── */
function SkillNode({ skill }) {
  const [imgError, setImgError] = useState(false);
  const url = iconUrl(skill.icon);

  const invert = ["github", "threejs", "express"].includes(skill.icon);

  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer transition-all duration-300 hover:scale-110">
      <div className="w-10 h-10 flex items-center justify-center relative">
        {/* Glow effect behind icon on hover */}
        <div className="absolute inset-0 bg-violet-500/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {!imgError && url ? (
          <img
            src={url}
            alt={skill.name}
            className="w-full h-full object-contain relative z-10 drop-shadow-lg"
            onError={() => setImgError(true)}
            style={{ filter: invert ? "invert(1)" : "none" }}
          />
        ) : (
          <span className="font-bold text-lg text-white relative z-10 drop-shadow-lg">
            {skill.name.charAt(0)}
          </span>
        )}
      </div>
      {/* Label: Minimalist, visible on hover */}
      <span className="text-[11px] font-bold text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap absolute top-full mt-2 pointer-events-none drop-shadow-md">
        {skill.name}
      </span>
    </div>
  );
}

/* ─── Inner Globe Component ─── */
function SkillsGlobe() {
  const groupRef = useRef();

  // Increased radius for a larger globe
  const radius = 9;
  const count = ALL_SKILLS.length;

  const points = useMemo(() => {
    const pts = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);

      const theta = phi * i;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      pts.push(new THREE.Vector3(x * radius, y * radius, z * radius));
    }
    return pts;
  }, [count, radius]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Adjusted rotation speeds
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />

      <group ref={groupRef}>
        {/* Outer Geodesic Wireframe */}
        <mesh>
          <icosahedronGeometry args={[radius * 0.95, 2]} />
          <meshBasicMaterial
            color="#a78bfa"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>


        {/* Orbiting Nodes */}
        {points.map((pos, i) => (
          <Html key={i} position={pos} center zIndexRange={[100, 0]}>
            <SkillNode skill={ALL_SKILLS[i]} />
          </Html>
        ))}
      </group>
    </>
  );
}

/* ─── Main Component ─── */
export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-[#050505] py-32 px-6 sm:px-12 relative overflow-hidden flex flex-col items-center min-h-screen justify-center"
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient blob removed as requested (cleaner background) */}

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-black tracking-[0.6em] text-violet-400/70 uppercase mb-5">
            02 &mdash; Skills Universe
          </p>
          <h2 className="text-5xl sm:text-[5.5rem] font-black tracking-tight leading-[0.92] text-white">
            The Stack
            <br />
            <span className="text-slate-700">I Ship With.</span>
          </h2>
        </div>

        {/* 3D Canvas */}
        <div className="w-full h-[700px] sm:h-[800px] relative cursor-grab active:cursor-grabbing">
          {/* Pulled camera back slightly to accommodate larger radius */}
          <Canvas camera={{ position: [0, 0, 22], fov: 60 }}>
            <ambientLight intensity={1} />
            <SkillsGlobe />
          </Canvas>

          {/* Instruction Badge */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-violet-400"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
              Drag to explore skills universe
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
