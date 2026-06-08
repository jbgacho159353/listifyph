import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import { ChevronRight, Plus } from "lucide-react";
import type { Profile, Listing } from "@/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles").select("*").eq("id", user.id).single<Profile>();

  const { data: allListings } = await supabase
    .from("listings").select("id").eq("user_id", user.id);

  const { data: recentListings } = await supabase
    .from("listings").select("*").eq("user_id", user.id)
    .order("created_at", { ascending: false }).limit(5).returns<Listing[]>();

  const plan = profile?.plan ?? "free";
  const used = profile?.generations_used ?? 0;
  const total = allListings?.length ?? 0;
  const name = profile?.full_name ?? user.email?.split("@")[0] ?? "there";

  const statCards = [
    { label: "Generations Used", value: plan === "free" ? `${used}/3` : "∞", icon: "✨", glow: "rgba(59,130,246,0.18)" },
    { label: "Total Listings",   value: String(total),                        icon: "📄", glow: "rgba(34,197,94,0.18)" },
    { label: "Time Saved",       value: `${(total * 2.5).toFixed(1)}h`,       icon: "⏱", glow: "rgba(168,85,247,0.18)" },
    { label: "Current Plan",     value: plan.toUpperCase(),                   icon: "👑", glow: "rgba(245,158,11,0.18)" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#050914" }}>
      <Sidebar plan={plan} userEmail={user.email ?? undefined} userName={profile?.full_name ?? undefined} />
      <main style={{ flex: 1, padding: "40px 32px", overflowY: "auto" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#F0F4FF", margin: 0 }}>
                Good day, {name}! 👋
              </h1>
              <p style={{ color: "#7A8BA8", marginTop: 6, fontSize: "0.95rem", margin: "6px 0 0" }}>
                Here&rsquo;s your listing activity
              </p>
            </div>
            <Link href="/generate" className="btn-grad-sm" style={{ fontSize: "0.95rem", padding: "14px 24px", borderRadius: 12 }}>
              ✨ Generate New Listing
            </Link>
          </div>

          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 32 }}>
            {statCards.map((card) => (
              <div key={card.label} className="dash-card">
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: card.glow,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem", marginBottom: 16,
                }}>
                  {card.icon}
                </div>
                <div style={{
                  fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "2rem",
                  background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text", lineHeight: 1, marginBottom: 8,
                }}>
                  {card.value}
                </div>
                <div style={{
                  fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.72rem",
                  textTransform: "uppercase", letterSpacing: "2px", color: "#7A8BA8",
                }}>
                  {card.label}
                </div>
              </div>
            ))}
          </div>

          {/* Upgrade Banner */}
          {plan === "free" && (
            <div style={{
              background: "linear-gradient(135deg, #0f2460, #0c1a40)",
              border: "1px solid rgba(59,130,246,0.4)",
              borderRadius: 14, padding: "24px 28px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 16, marginBottom: 32,
            }}>
              <div>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#F0F4FF", margin: 0 }}>
                  ⚡ Upgrade to Pro
                </p>
                <p style={{ color: "#7A8BA8", fontSize: "0.875rem", margin: "4px 0 0" }}>
                  Get unlimited generations + all 4 content types
                </p>
              </div>
              <Link href="/pricing" className="btn-grad-sm">
                Upgrade — ₱499/mo
              </Link>
            </div>
          )}

          {/* Recent Listings */}
          <div style={{ background: "#0c1220", border: "1px solid rgba(148,163,184,0.08)", borderRadius: 14, overflow: "hidden" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 24px", borderBottom: "1px solid rgba(148,163,184,0.08)",
            }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, color: "#F0F4FF", margin: 0, fontSize: "1rem" }}>
                Recent Listings
              </h2>
              <Link href="/history" style={{ display: "flex", alignItems: "center", gap: 4, color: "#3B82F6", fontSize: "0.875rem", textDecoration: "none", fontWeight: 500 }}>
                View all <ChevronRight size={14} />
              </Link>
            </div>

            {!recentListings || recentListings.length === 0 ? (
              <div style={{ padding: "48px 24px", textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>📋</div>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, color: "#F0F4FF", margin: "0 0 8px" }}>
                  No listings yet
                </p>
                <p style={{ color: "#7A8BA8", fontSize: "0.875rem", margin: "0 0 24px" }}>
                  Generate your first property listing to get started.
                </p>
                <Link href="/generate" className="btn-grad-sm">
                  <Plus size={16} /> Generate your first listing
                </Link>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(148,163,184,0.08)" }}>
                      {["Property", "Location", "Price", "Date", "Language", "Style", ""].map((h) => (
                        <th key={h} style={{
                          padding: "12px 20px", textAlign: "left",
                          fontFamily: "Inter, sans-serif", fontWeight: 600,
                          fontSize: "0.72rem", textTransform: "uppercase",
                          letterSpacing: "2px", color: "#7A8BA8", whiteSpace: "nowrap",
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentListings.map((listing) => (
                      <tr key={listing.id} className="dash-table-row" style={{ borderBottom: "1px solid rgba(148,163,184,0.05)" }}>
                        <td style={{ padding: "14px 20px", color: "#F0F4FF", fontWeight: 500, fontSize: "0.875rem" }}>
                          {listing.property_type}
                        </td>
                        <td style={{ padding: "14px 20px", color: "#7A8BA8", fontSize: "0.875rem" }}>
                          {listing.location}
                        </td>
                        <td style={{ padding: "14px 20px", color: "#7A8BA8", fontSize: "0.875rem" }}>
                          {listing.price}
                        </td>
                        <td style={{ padding: "14px 20px", color: "#7A8BA8", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                          {new Date(listing.created_at).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td style={{ padding: "14px 20px" }}>
                          <span style={{ background: "rgba(59,130,246,0.1)", color: "#3B82F6", fontSize: "0.72rem", fontWeight: 600, padding: "3px 10px", borderRadius: 100, textTransform: "capitalize" }}>
                            {listing.language}
                          </span>
                        </td>
                        <td style={{ padding: "14px 20px", color: "#7A8BA8", fontSize: "0.875rem", textTransform: "capitalize" }}>
                          {listing.ad_style}
                        </td>
                        <td style={{ padding: "14px 20px" }}>
                          <Link href={`/history/${listing.id}`} style={{
                            color: "#3B82F6", fontSize: "0.8rem", fontWeight: 600,
                            textDecoration: "none", border: "1px solid rgba(59,130,246,0.3)",
                            padding: "4px 12px", borderRadius: 6,
                          }}>
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
