"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["features", "how-it-works", "pricing"];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveHash("#" + e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const links = [
    { href: "/#features", label: "Features" },
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#pricing", label: "Pricing" },
  ];

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: 72,
        background: "rgba(5,9,20,0.85)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(148,163,184,0.08)",
        transition: "box-shadow 0.28s ease",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.svg" alt="ListifyPH" style={{ height: 40, width: "auto" }} />
        </Link>

        <div className="hidden md:flex" style={{ alignItems: "center", gap: 32 }}>
          {links.map(({ href, label }) => {
            const active = !!activeHash && href.endsWith(activeHash);
            return (
              <a key={href} href={href}
                style={{
                  fontSize: 14, fontWeight: 500, textDecoration: "none",
                  color: active ? "var(--text-primary)" : "var(--text-secondary)",
                  transition: "color 0.28s ease",
                  position: "relative", paddingBottom: 2,
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
              >
                {label}
                {active && (
                  <span style={{
                    position: "absolute", bottom: -2, left: 0, right: 0, height: 2,
                    background: "linear-gradient(90deg,#1D4ED8,#3B82F6)",
                    borderRadius: 2,
                  }} />
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex" style={{ alignItems: "center", gap: 12 }}>
          <Link href="/login" style={{ fontSize: 14, fontWeight: 500, color: "var(--text-secondary)", textDecoration: "none", padding: "8px 16px", transition: "color 0.28s" }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"}
          >Log in</Link>
          <Link href="/signup" className="btn-gradient"
            style={{ fontSize: 14, fontWeight: 600, padding: "10px 22px", borderRadius: 10, textDecoration: "none" }}
          >Start free</Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)", padding: 8 }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div style={{
          background: "rgba(8,13,26,0.98)", backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(148,163,184,0.08)",
          padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16,
        }}>
          {links.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setOpen(false)}
              style={{ fontSize: 15, fontWeight: 500, color: (!!activeHash && href.endsWith(activeHash)) ? "var(--text-primary)" : "var(--text-secondary)", textDecoration: "none" }}
            >{label}</a>
          ))}
          <Link href="/login" style={{ fontSize: 15, fontWeight: 500, color: "var(--text-secondary)", textDecoration: "none" }}>Log in</Link>
          <Link href="/signup" className="btn-gradient"
            style={{ fontSize: 15, fontWeight: 600, padding: "12px 20px", borderRadius: 10, textDecoration: "none", textAlign: "center" }}
          >Start free</Link>
        </div>
      )}
    </nav>
  );
}
