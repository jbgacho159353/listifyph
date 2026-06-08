"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/client";
import { Check, AlertTriangle } from "lucide-react";
import type { Profile } from "@/types";

const labelStyle: React.CSSProperties = {
  display: "block", color: "#F0F4FF", fontWeight: 500,
  fontSize: "0.875rem", fontFamily: "Inter, sans-serif", marginBottom: 8,
};

const cardStyle: React.CSSProperties = {
  background: "#0c1220",
  border: "1px solid rgba(148,163,184,0.08)",
  borderRadius: 14, padding: 28, marginBottom: 20,
};

const cardHeadStyle: React.CSSProperties = {
  fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "1rem",
  color: "#F0F4FF", marginBottom: 24, paddingBottom: 14,
  borderBottom: "1px solid rgba(148,163,184,0.08)",
};

const planFeatures: Record<string, string[]> = {
  free:   ["3 generations / month", "Listing description only", "English language"],
  pro:    ["Unlimited generations", "All 4 content types", "English + Filipino", "All ad styles"],
  agency: ["Everything in Pro", "Team members", "Priority support"],
};

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserEmail(user.email ?? "");
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single<Profile>();
      if (data) { setProfile(data); setName(data.full_name ?? ""); }
    })();
  }, [router]);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    await supabase.from("profiles").update({ full_name: name }).eq("id", profile!.id);
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleDeleteAccount() {
    if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  const plan = profile?.plan ?? "free";
  const used = profile?.generations_used ?? 0;
  const initials = name
    ? name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : userEmail[0]?.toUpperCase() ?? "U";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#050914" }}>
      <Sidebar plan={plan} userEmail={userEmail || undefined} userName={name || undefined} />
      <main style={{ flex: 1, padding: "40px 32px", overflowY: "auto" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#F0F4FF", margin: 0 }}>
              ⚙️ Settings
            </h1>
            <p style={{ color: "#7A8BA8", margin: "6px 0 0", fontSize: "0.95rem" }}>
              Manage your account and subscription.
            </p>
          </div>

          {/* Profile Card */}
          <div style={cardStyle}>
            <p style={cardHeadStyle}>Profile</p>

            {/* Avatar row */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.4rem", fontWeight: 700, color: "#fff", flexShrink: 0,
              }}>
                {initials}
              </div>
              <div>
                <p style={{ color: "#F0F4FF", fontWeight: 600, margin: 0, fontFamily: "Inter, sans-serif" }}>
                  {name || "Your Name"}
                </p>
                <p style={{ color: "#7A8BA8", fontSize: "0.8rem", margin: "2px 0 0", fontFamily: "Inter, sans-serif" }}>
                  {userEmail}
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="form-input-dark"
                />
              </div>
              <div>
                <label style={{ ...labelStyle, color: "#4B5563" }}>Email Address</label>
                <input
                  type="email"
                  value={userEmail}
                  disabled
                  className="form-input-dark"
                  style={{ opacity: 0.5, cursor: "not-allowed" }}
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: saved ? "rgba(34,197,94,0.2)" : "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                    color: "#fff", border: "none", borderRadius: 10,
                    padding: "12px 24px", fontSize: "0.875rem", fontWeight: 600,
                    fontFamily: "Syne, sans-serif",
                    cursor: saving ? "wait" : "pointer",
                    opacity: saving ? 0.7 : 1, transition: "all 0.2s",
                  }}
                >
                  {saved ? <><Check size={15} /> Saved!</> : saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>

          {/* Subscription Card */}
          <div style={cardStyle}>
            <p style={cardHeadStyle}>Subscription</p>

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#F0F4FF", margin: 0, textTransform: "capitalize" }}>
                    {plan} Plan
                  </p>
                  <span style={{
                    fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px", borderRadius: 100,
                    textTransform: "uppercase", letterSpacing: "1px",
                    background: plan === "free" ? "rgba(148,163,184,0.1)" : plan === "pro" ? "rgba(59,130,246,0.15)" : "rgba(245,158,11,0.15)",
                    color: plan === "free" ? "#7A8BA8" : plan === "pro" ? "#3B82F6" : "#F59E0B",
                  }}>
                    {plan}
                  </span>
                </div>
                <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                  {(planFeatures[plan] ?? planFeatures.free).map((f) => (
                    <li key={f} style={{ color: "#7A8BA8", fontSize: "0.875rem", fontFamily: "Inter, sans-serif", marginBottom: 3 }}>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Usage bar (free only) */}
            {plan === "free" && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "#7A8BA8", fontSize: "0.8rem", fontFamily: "Inter, sans-serif" }}>Usage this month</span>
                  <span style={{ color: "#F0F4FF", fontSize: "0.8rem", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>{used}/3</span>
                </div>
                <div style={{ width: "100%", height: 6, background: "rgba(148,163,184,0.1)", borderRadius: 100, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 100,
                    background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                    width: `${Math.min((used / 3) * 100, 100)}%`,
                    transition: "width 0.4s ease",
                  }} />
                </div>
              </div>
            )}

            {plan === "free" ? (
              <a href="/pricing" className="btn-grad-sm" style={{ display: "inline-flex" }}>
                ⚡ Upgrade to Pro — ₱499/mo
              </a>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={{ color: "#7A8BA8", fontSize: "0.875rem", fontFamily: "Inter, sans-serif" }}>
                  Active subscription
                </span>
                <button style={{
                  background: "transparent", border: "1px solid rgba(239,68,68,0.3)",
                  color: "#F87171", borderRadius: 8, padding: "8px 16px",
                  fontSize: "0.8rem", fontWeight: 500, cursor: "pointer",
                }}>
                  Cancel subscription
                </button>
              </div>
            )}
          </div>

          {/* Danger Zone */}
          <div style={{
            ...cardStyle,
            background: "rgba(239,68,68,0.04)",
            border: "1px solid rgba(239,68,68,0.2)",
            marginBottom: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <AlertTriangle size={16} style={{ color: "#F87171" }} />
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "1rem", color: "#F87171", margin: 0 }}>
                Danger Zone
              </p>
            </div>
            <p style={{ color: "#7A8BA8", fontSize: "0.875rem", fontFamily: "Inter, sans-serif", margin: "0 0 20px", lineHeight: 1.6 }}>
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button
              onClick={handleDeleteAccount}
              style={{
                background: "transparent",
                border: "1px solid rgba(239,68,68,0.4)",
                color: "#F87171", borderRadius: 8, padding: "10px 20px",
                fontSize: "0.875rem", fontWeight: 500, cursor: "pointer",
                fontFamily: "Inter, sans-serif", transition: "all 0.2s",
              }}
            >
              Delete Account
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
