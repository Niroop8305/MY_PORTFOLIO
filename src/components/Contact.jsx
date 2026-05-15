import { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';

const CONTACT_INFO = {
  email: "nirooppapani.work@gmail.com",
  github: "https://github.com/Niroop8305",
  linkedin: "https://www.linkedin.com/in/niroop-papani-9864672b5/",
  location: "India",
};

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

function IconArrow() {
  return (
    <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M1 11 11 1M11 1H4M11 1v7" />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* Contact form with status */
function ContactForm({ visible }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setStatus("sending");

    try {
      // NOTE: You need to set up your own EmailJS service, template, and public key
      // Go to https://www.emailjs.com/ to create a free account
      await emailjs.send(
        'service_default', // Replace with your Service ID
        'template_default', // Replace with your Template ID
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: CONTACT_INFO.email,
        },
        'YOUR_PUBLIC_KEY' // Replace with your Public Key
      );

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      // Fallback to direct Gmail compose if EmailJS fails or isn't configured
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_INFO.email}&su=Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`;
      window.open(gmailUrl, '_blank');
      setStatus("sent");
    }
  };

  const inputClass = "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-sm text-slate-200 placeholder-slate-700 outline-none focus:border-violet-500/50 focus:bg-white/[0.05] transition-all duration-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-4"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "all 0.8s ease 0.4s" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" name="name" placeholder="Your name" value={form.name}
          onChange={handleChange} className={inputClass} required />
        <input type="email" name="email" placeholder="Your email" value={form.email}
          onChange={handleChange} className={inputClass} required />
      </div>
      <textarea name="message" placeholder="What's on your mind?" value={form.message}
        onChange={handleChange} rows={5} className={`${inputClass} resize-none`} required />
      <button type="submit" disabled={status === "sending" || status === "sent"}
        className={`group w-full flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-black uppercase tracking-[0.2em] transition-all duration-300
          ${status === "sent"
            ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
            : "bg-white text-zinc-950 hover:bg-zinc-100 hover:shadow-[0_0_32px_rgba(255,255,255,0.15)]"}`}>
        {status === "idle"   && <><span>Send Message</span><IconArrow /></>}
        {status === "sending" && <span>Sending...</span>}
        {status === "sent"   && <span>✓ Message sent!</span>}
      </button>
    </form>
  );
}

export default function Contact() {
  const [headerRef, headerVisible] = useReveal(0.1);
  const [cardRef, cardVisible] = useReveal(0.08);

  return (
    <section id="contact" className="bg-[#010101] py-32 px-6 sm:px-12 relative overflow-hidden">

      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none opacity-[0.05]"
        style={{ background: "radial-gradient(ellipse at 50% 100%, #a78bfa 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headerRef} className="mb-20"
          style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? "none" : "translateY(28px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <p className="text-[10px] font-black tracking-[0.6em] text-violet-400/70 uppercase mb-5">
            05 &mdash; Contact
          </p>
          <h2 className="text-5xl sm:text-[5.5rem] font-black tracking-tight leading-[0.92] text-white italic">
            Let's Build<br />
            <span className="text-slate-700 not-italic">Something Real.</span>
          </h2>
          <p className="mt-8 text-slate-500 max-w-lg leading-relaxed text-[15px]">
            Open to full-time roles, freelance contracts, and interesting collaborations. Drop a message — I respond fast.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Direct links */}
          <div ref={cardRef} className="lg:col-span-4 flex flex-col gap-4"
            style={{ opacity: cardVisible ? 1 : 0, transform: cardVisible ? "none" : "translateY(24px)", transition: "all 0.8s ease 0.2s" }}>

            {/* Availability card */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Available</span>
              </div>
              <p className="text-white font-bold text-sm">Open to Full-time Opportunities</p>
              <p className="text-slate-500 text-xs mt-1">India · Remote-friendly</p>
            </div>

            {/* Direct contact links */}
            {[
              { icon: <IconMail />, label: "Email", value: CONTACT_INFO.email, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_INFO.email}`, short: "Send an email" },
              { icon: <IconLinkedIn />, label: "LinkedIn", value: "niroop-papani", href: CONTACT_INFO.linkedin, short: "Connect on LinkedIn" },
              { icon: <IconGitHub />, label: "GitHub", value: "Niroop8305", href: CONTACT_INFO.github, short: "View my code" },
            ].map(({ icon, label, short, href }) => (
              <a key={label} href={href} target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.03] flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-white/10 transition-all">
                    {icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-200">{label}</p>
                    <p className="text-xs text-slate-600">{short}</p>
                  </div>
                </div>
                <span className="text-slate-700 group-hover:text-slate-400 transition-colors"><IconArrow /></span>
              </a>
            ))}

            {/* Location */}
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
              <IconMapPin />
              <span className="text-xs text-slate-600">Based in India — open to remote worldwide</span>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="lg:col-span-8 rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10">
            <h3 className="text-xl font-black text-white mb-2">Send a message</h3>
            <p className="text-sm text-slate-600 mb-8">I'll get back to you within 24 hours.</p>
            <ContactForm visible={cardVisible} />
          </div>
        </div>

        {/* Footer strip */}
        <div className="mt-20 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ opacity: headerVisible ? 1 : 0, transition: "opacity 0.8s ease 0.8s" }}>
          <p className="text-xs text-slate-700">
            © {new Date().getFullYear()} LaxmiNiroop Papani. Built with React + Vite.
          </p>
          <p className="text-xs text-slate-700">Designed & coded from scratch.</p>
        </div>

      </div>
    </section>
  );
}
