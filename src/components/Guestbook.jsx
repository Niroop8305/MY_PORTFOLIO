import { useEffect, useRef, useState } from "react";

const CONTACT_EMAIL = "nirooppapani.work@gmail.com";

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

export default function Guestbook() {
  const [ref, visible] = useReveal(0.1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", company: "", text: "", avatar: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, avatar: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;
    setStatus("sending");

    try {
      // 1. Save to LocalStorage for instant local visibility
      const localSignatures = JSON.parse(localStorage.getItem("user_signatures") || "[]");
      const newSignature = { 
        ...formData, 
        id: Date.now(), 
        date: new Date().toLocaleDateString(),
        isLocal: true 
      };
      localStorage.setItem("user_signatures", JSON.stringify([...localSignatures, newSignature]));

      // 2. Send Email to Owner (You) via Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "2cdc43c7-378f-4251-b79b-b03587f872bd",
          name: formData.name,
          subject: `New Guestbook Signature from ${formData.name}`,
          message: `Name: ${formData.name}\nRole: ${formData.role || 'N/A'}\nCompany: ${formData.company || 'N/A'}\n\nMessage:\n${formData.text}`,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        console.error("Web3Forms Error:", result);
      }

      setStatus("sent");
      setTimeout(() => {
        setIsFormOpen(false);
        setStatus("idle");
        setFormData({ name: "", role: "", company: "", text: "", avatar: "" });
        // Trigger a custom event to refresh Testimonials
        window.dispatchEvent(new Event("new-signature"));
      }, 2000);
    } catch (error) {
      console.error("Signature error:", error);
      setStatus("sent"); // Still mark as sent locally
      setTimeout(() => setIsFormOpen(false), 2000);
    }
  };

  return (
    <section id="guestbook" className="bg-[#050505] py-32 px-6 sm:px-12 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={ref}
          className="rounded-[2rem] border border-white/[0.05] bg-[#0a0a0a] p-10 sm:p-16 relative overflow-hidden"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.95)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Subtle background glow */}
          <div 
            className="absolute -right-20 -bottom-20 w-[300px] h-[300px] pointer-events-none opacity-20"
            style={{ background: "radial-gradient(circle, #f59e0b 0%, #ec4899 50%, transparent 70%)", filter: "blur(40px)" }}
          />

          <div className="relative z-10 flex flex-col md:flex-row gap-12 justify-between">
            {/* Left side text */}
            <div className="flex-1">
              <p className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase mb-8">
                VISITORS
              </p>
              
              <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tight leading-[1.1] mb-2">
                Leave your<br/>
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-amber-500 pr-2">
                  signature
                </span>
              </h2>

              <p className="text-lg font-medium text-slate-400 mt-6">
                Let me know you were here. Share your thoughts or feedback.
              </p>
            </div>

            {/* Right side interaction */}
            <div className="flex-1 flex flex-col justify-end items-start md:items-end">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/100?img=11" className="w-10 h-10 rounded-full border-2 border-[#0a0a0a]" alt="avatar" />
                  <img src="https://i.pravatar.cc/100?img=12" className="w-10 h-10 rounded-full border-2 border-[#0a0a0a]" alt="avatar" />
                  <img src="https://i.pravatar.cc/100?img=13" className="w-10 h-10 rounded-full border-2 border-[#0a0a0a]" alt="avatar" />
                </div>
                <span className="text-sm font-bold text-slate-500">Join other contributors</span>
              </div>

              {!isFormOpen ? (
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="group relative px-8 py-4 rounded-full bg-[#111] border border-white/10 hover:border-amber-500/50 transition-colors"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-3 text-sm font-bold text-white tracking-wide">
                    Sign Guestbook
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              ) : (
                <form onSubmit={handleSubmit} className="w-full space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Name" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="Designation" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50"
                      value={formData.role}
                      onChange={e => setFormData(p => ({ ...p, role: e.target.value }))}
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Company (Optional)" 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50"
                    value={formData.company}
                    onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                  />
                  <textarea 
                    placeholder="Write your review..." 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 h-24 resize-none"
                    value={formData.text}
                    onChange={e => setFormData(p => ({ ...p, text: e.target.value }))}
                    required
                  />
                  
                  <div className="flex items-center justify-between gap-4">
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*" 
                        id="avatar-upload" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                      <label 
                        htmlFor="avatar-upload" 
                        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white cursor-pointer transition-colors"
                      >
                        {formData.avatar ? "✅ Photo selected" : "📸 Upload Photo"}
                      </label>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        type="button" 
                        onClick={() => setIsFormOpen(false)}
                        className="px-6 py-2 text-xs font-bold text-slate-500 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        disabled={status !== "idle"}
                        className="px-6 py-2 rounded-full bg-white text-zinc-950 text-xs font-black uppercase tracking-widest hover:bg-amber-400 transition-colors disabled:opacity-50"
                      >
                        {status === "idle" ? "Sign" : status === "sending" ? "Sending..." : "✓ Done"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
