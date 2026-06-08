"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 72,
        background: "rgba(5,9,20,0.82)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(148,163,184,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.svg" alt="ListifyPH" style={{ height: 36, width: "auto" }} />
        </Link>

        {/* Desktop nav */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: 32 }}
        >
          {[
            { href: "#features", label: "Features" },
            { href: "#how-it-works", label: "How it works" },
            { href: "#pricing", label: "Pricing" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text-primary)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-secondary)")}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 12 }}>
          <Link
            href="/login"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "color 0.2s",
              padding: "8px 16px",
            }}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="btn-gradient"
            style={{
              fontSize: 14,
              fontWeight: 600,
              padding: "10px 22px",
              borderRadius: 10,
              textDecoration: "none",
            }}
          >
            Start free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-primary)",
            padding: 8,
          }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: "rgba(8,13,26,0.98)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(148,163,184,0.08)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {["#features", "#how-it-works", "#pricing"].map((href) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
              }}
            >
              {href === "#features" ? "Features" : href === "#how-it-works" ? "How it works" : "Pricing"}
            </a>
          ))}
          <Link
            href="/login"
            style={{ fontSize: 15, fontWeight: 500, color: "var(--text-secondary)", textDecoration: "none" }}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="btn-gradient"
            style={{
              fontSize: 15,
              fontWeight: 600,
              padding: "12px 20px",
              borderRadius: 10,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Start free
          </Link>
        </div>
      )}
    </nav>
  );
}
