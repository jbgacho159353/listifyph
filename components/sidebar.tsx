"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Wand2, History, Settings, LogOut, Zap, Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/generate", label: "Generate", icon: Wand2 },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  plan?: string;
  userEmail?: string;
  userName?: string;
}

export default function Sidebar({ plan = "free", userEmail, userName }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  const initials = userName
    ? userName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
    : userEmail?.[0]?.toUpperCase() ?? "U";

  const sidebarContent = (
    <aside
      style={{
        width: 260,
        minHeight: "100vh",
        background: "#080d1a",
        borderRight: "1px solid rgba(148,163,184,0.08)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(148,163,184,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/dashboard" style={{ display: "inline-flex" }}>
          <img src="/logo.svg" alt="ListifyPH" style={{ height: 36, width: "auto" }} />
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="sidebar-close-btn"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#7A8BA8", padding: 4, display: "none" }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`sidebar-nav-link${active ? " active" : ""}`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}

        {plan === "free" && (
          <Link href="/pricing" onClick={() => setMobileOpen(false)} className="sidebar-upgrade-link">
            <Zap size={18} />
            Upgrade to Pro
          </Link>
        )}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(148,163,184,0.08)" }}>
        {(userEmail || userName) && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", marginBottom: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.75rem", fontWeight: 700, color: "#fff", flexShrink: 0,
            }}>
              {initials}
            </div>
            <div style={{ overflow: "hidden", minWidth: 0 }}>
              {userName && (
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#F0F4FF", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {userName}
                </p>
              )}
              {userEmail && (
                <p style={{ fontSize: "0.72rem", color: "#7A8BA8", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {userEmail}
                </p>
              )}
            </div>
          </div>
        )}
        <button onClick={handleLogout} className="sidebar-logout-btn">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="sidebar-hamburger"
        style={{
          position: "fixed", top: 16, left: 16, zIndex: 60,
          background: "#0c1220", border: "1px solid rgba(148,163,184,0.15)",
          borderRadius: 8, padding: "8px 10px", cursor: "pointer", color: "#F0F4FF",
          display: "none", alignItems: "center",
        }}
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="sidebar-overlay"
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
            zIndex: 49, display: "none",
          }}
        />
      )}

      {/* Sidebar wrapper — desktop static, mobile fixed/slide-in */}
      <div className={`sidebar-wrapper${mobileOpen ? " mobile-open" : ""}`} style={{ display: "contents" }}>
        {sidebarContent}
      </div>

    </>
  );
}
