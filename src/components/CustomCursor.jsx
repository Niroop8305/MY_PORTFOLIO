import { useState, useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const [cursorText, setCursorText] = useState("");
  const rafId = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e) => {
      const t = e.target;
      const hoverable = t.tagName === "BUTTON" || t.tagName === "A" || t.closest("button") || t.closest("a");
      isHovering.current = !!hoverable;
      
      const customText = t.getAttribute("data-cursor-text") || t.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");
      setCursorText(customText || "");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    const animate = () => {
      const { x: mx, y: my } = mousePos.current;
      const DOT = 4;   // half of w-2 (8px)
      const RING = 16; // half of w-8 (32px)

      // Dot — zero lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - DOT}px, ${my - DOT}px)`;
      }

      // Ring — lerp for organic trailing
      ringPos.current.x += (mx - ringPos.current.x) * 0.12;
      ringPos.current.y += (my - ringPos.current.y) * 0.12;

      if (ringRef.current) {
        const rx = ringPos.current.x;
        const ry = ringPos.current.y;
        const scale = isHovering.current ? 2.5 : 1;
        ringRef.current.style.transform =
          `translate(${rx - RING}px, ${ry - RING}px) scale(${scale})`;
      }

      if (textRef.current) {
        textRef.current.style.transform = `translate(${mx + 20}px, ${my + 20}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Dot — precise, zero lag */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      />

      {/* Ring — trailing, reacts to hover */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[9998]"
        style={{
          willChange: "transform",
          transition: "transform 0.15s ease, border-color 0.2s ease, background 0.2s ease",
          background: isHovering.current ? "rgba(255,255,255,0.05)" : "transparent",
        }}
      />

      {/* Cursor Text Label */}
      {cursorText && (
        <div
          ref={textRef}
          className="fixed top-0 left-0 px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full pointer-events-none z-[9999] whitespace-nowrap shadow-2xl"
          style={{ willChange: "transform" }}
        >
          {cursorText}
        </div>
      )}

      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
}
