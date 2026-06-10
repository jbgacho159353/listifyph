"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import { RefreshCw, Copy, Save, Check, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { GenerateRequest, GenerateResponse, PropertyType, Language, AdStyle, Profile } from "@/types";

const propertyTypes: PropertyType[] = [
  "Condo", "House & Lot", "Townhouse", "Apartment",
  "Commercial Space", "Lot Only", "Office Space",
];

const amenitiesList = [
  "Pool", "Gym", "Parking", "24/7 Security", "CCTV", "Balcony",
  "Garden", "Near Mall", "Near School", "Near Hospital", "Pet Friendly",
  "Furnished", "Semi-Furnished", "City View", "Beach View", "Mountain View",
];

const adStyleOptions: { value: AdStyle; label: string; desc: string }[] = [
  { value: "storytelling", label: "Storytelling",     desc: "Luxury properties" },
  { value: "direct",       label: "Direct Response",  desc: "Fast sales" },
  { value: "fomo",         label: "FOMO",             desc: "Pre-selling" },
  { value: "investment",   label: "Investment Pitch", desc: "For investors" },
];

const languageOptions: { value: Language; label: string }[] = [
  { value: "english",  label: "English only" },
  { value: "filipino", label: "Filipino only" },
  { value: "both",     label: "Both" },
];

type Tab = "listing_description" | "facebook_post" | "facebook_ad_copy" | "instagram_caption" | "filipino_version";

const labelStyle: React.CSSProperties = {
  display: "block", color: "#F0F4FF", fontWeight: 500,
  fontSize: "0.875rem", fontFamily: "Inter, sans-serif", marginBottom: 8,
};

const sectionHeadStyle: React.CSSProperties = {
  fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "1rem",
  color: "#F0F4FF", paddingBottom: 12,
  borderBottom: "1px solid rgba(59,130,246,0.25)", marginBottom: 20,
};

export default function GeneratePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<GenerateRequest>({
    property_type: "Condo", location: "", price: "",
    bedrooms: null, bathrooms: null, size: null,
    amenities: [], special_notes: null,
    language: "english", ad_style: "storytelling",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("listing_description");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(data);
    })();
  }, [router]);

  const reachedLimit = profile?.plan === "free" && (profile?.generations_used ?? 0) >= 3;

  async function handleGenerate() {
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 403) { setError("Free plan limit reached. Upgrade to Pro for unlimited generations."); setLoading(false); return; }
      if (!res.ok) { setError("Generation failed. Please try again."); setLoading(false); return; }
      const data = await res.json();
      setResult(data);
      setActiveTab("listing_description");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!result) return;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("listings").insert({
      user_id: user.id, ...form,
      amenities: form.amenities.join(", "), ...result,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result[activeTab as keyof GenerateResponse] ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function toggleAmenity(a: string) {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a],
    }));
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "listing_description", label: "Listing" },
    { key: "facebook_post",       label: "Facebook Post" },
    { key: "facebook_ad_copy",    label: "Ad Copy" },
    { key: "instagram_caption",   label: "Instagram" },
    ...(form.language !== "english" ? [{ key: "filipino_version" as Tab, label: "Filipino" }] : []),
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#050914" }}>
      <Sidebar plan={profile?.plan} userName={profile?.full_name ?? undefined} />
      <main style={{ flex: 1, padding: "40px 32px", overflowY: "auto" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#F0F4FF", margin: 0 }}>
              ✨ Generate Listing
            </h1>
            <p style={{ color: "#7A8BA8", margin: "6px 0 0", fontSize: "0.95rem" }}>
              Fill in the property details below
            </p>
          </div>

          {/* Limit Banner */}
          {reachedLimit && (
            <div style={{
              background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)",
              borderRadius: 12, padding: "14px 18px", marginBottom: 24,
              display: "flex", alignItems: "flex-start", gap: 12,
            }}>
              <AlertCircle size={18} style={{ color: "#F59E0B", flexShrink: 0, marginTop: 1 }} />
              <div>
                <p style={{ color: "#FCD34D", fontWeight: 600, fontSize: "0.875rem", margin: 0 }}>Free plan limit reached</p>
                <p style={{ color: "#B45309", fontSize: "0.8rem", margin: "3px 0 0" }}>
                  All 3 free generations used.{" "}
                  <a href="/pricing" style={{ color: "#FCD34D", textDecoration: "underline" }}>Upgrade to Pro</a>{" "}
                  for unlimited.
                </p>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div style={{ background: "#0c1220", border: "1px solid rgba(148,163,184,0.08)", borderRadius: 14, padding: 32, marginBottom: 24 }}>

            {/* Property Details */}
            <div style={{ marginBottom: 32 }}>
              <p style={sectionHeadStyle}>Property Details</p>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Property Type</label>
                <select
                  value={form.property_type}
                  onChange={(e) => setForm((f) => ({ ...f, property_type: e.target.value as PropertyType }))}
                  className="form-select-dark"
                >
                  {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Location</label>
                  <input
                    type="text" placeholder="e.g. BGC, Taguig"
                    value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    className="form-input-dark"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Price</label>
                  <input
                    type="text" placeholder="e.g. ₱8,500,000"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    className="form-input-dark"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Bedrooms</label>
                  <input
                    type="number" min={0} max={20} placeholder="2"
                    value={form.bedrooms ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, bedrooms: e.target.value ? Number(e.target.value) : null }))}
                    className="form-input-dark"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Bathrooms</label>
                  <input
                    type="number" min={0} max={20} placeholder="2"
                    value={form.bathrooms ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, bathrooms: e.target.value ? Number(e.target.value) : null }))}
                    className="form-input-dark"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Floor Area</label>
                  <input
                    type="text" placeholder="65 sqm"
                    value={form.size ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, size: e.target.value || null }))}
                    className="form-input-dark"
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div style={{ marginBottom: 32 }}>
              <p style={sectionHeadStyle}>Amenities</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {amenitiesList.map((a) => {
                  const sel = form.amenities.includes(a);
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toggleAmenity(a)}
                      style={{
                        padding: "7px 14px", borderRadius: 8,
                        fontSize: "0.8rem", fontWeight: 500, fontFamily: "Inter, sans-serif",
                        cursor: "pointer",
                        border: sel ? "1px solid #3B82F6" : "1px solid rgba(148,163,184,0.15)",
                        background: sel ? "rgba(59,130,246,0.15)" : "#111827",
                        color: sel ? "#60A5FA" : "#7A8BA8",
                        transition: "all 0.18s ease",
                      }}
                    >
                      {a}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Notes */}
            <div style={{ marginBottom: 32 }}>
              <label style={labelStyle}>Special Notes</label>
              <textarea
                rows={3}
                placeholder="Anything else to highlight (e.g. 'Corner unit', 'Rent-to-own available')..."
                value={form.special_notes ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, special_notes: e.target.value || null }))}
                className="form-textarea-dark"
              />
            </div>

            {/* Language & Style */}
            <div style={{ marginBottom: 28 }}>
              <p style={sectionHeadStyle}>Language &amp; Style</p>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Language</label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {languageOptions.map(({ value, label }) => {
                    const active = form.language === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, language: value }))}
                        style={{
                          padding: "10px 18px", borderRadius: 8,
                          fontSize: "0.875rem", fontWeight: 500, fontFamily: "Inter, sans-serif",
                          cursor: "pointer",
                          border: active ? "1px solid #3B82F6" : "1px solid rgba(148,163,184,0.15)",
                          background: active ? "rgba(59,130,246,0.1)" : "#111827",
                          color: active ? "#3B82F6" : "#7A8BA8",
                          transition: "all 0.18s ease",
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Ad Style</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
                  {adStyleOptions.map(({ value, label, desc }) => {
                    const active = form.ad_style === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, ad_style: value }))}
                        style={{
                          padding: "12px 14px", borderRadius: 8, textAlign: "left", cursor: "pointer",
                          border: active ? "1px solid #3B82F6" : "1px solid rgba(148,163,184,0.15)",
                          background: active ? "rgba(59,130,246,0.1)" : "#111827",
                          transition: "all 0.18s ease",
                        }}
                      >
                        <p style={{ color: active ? "#3B82F6" : "#F0F4FF", fontWeight: 600, fontSize: "0.875rem", margin: 0, fontFamily: "Inter, sans-serif" }}>
                          {label}
                        </p>
                        <p style={{ color: "#7A8BA8", fontSize: "0.75rem", margin: "3px 0 0", fontFamily: "Inter, sans-serif" }}>
                          {desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 10, padding: "12px 16px", color: "#FCA5A5",
                fontSize: "0.875rem", marginBottom: 20,
              }}>
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading || reachedLimit || !form.location || !form.price}
              style={{
                width: "100%",
                background: reachedLimit ? "#374151" : "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                color: "#fff", border: "none", borderRadius: 12,
                padding: "16px 24px", fontSize: "1rem", fontWeight: 600,
                fontFamily: "Syne, sans-serif",
                cursor: (loading || reachedLimit || !form.location || !form.price) ? "not-allowed" : "pointer",
                opacity: (loading || (!form.location || !form.price)) ? 0.65 : 1,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "opacity 0.2s",
              }}
            >
              {loading ? (
                <><RefreshCw size={18} className="spin-anim" /> Generating...</>
              ) : reachedLimit ? (
                "Upgrade to generate more"
              ) : (
                "✨ Generate Listing"
              )}
            </button>
          </div>

          {/* Result */}
          {result && (
            <div style={{ background: "#0c1220", border: "1px solid rgba(148,163,184,0.08)", borderRadius: 14, overflow: "hidden" }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "16px 20px", borderBottom: "1px solid rgba(148,163,184,0.08)",
                flexWrap: "wrap", gap: 10,
              }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {tabs.map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`generate-tab-btn${activeTab === key ? " active" : ""}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <button
                    onClick={handleCopy}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "8px 14px", borderRadius: 8,
                      background: "transparent",
                      border: "1px solid rgba(148,163,184,0.2)",
                      color: copied ? "#4ADE80" : "#7A8BA8",
                      fontSize: "0.8rem", fontWeight: 500, cursor: "pointer",
                    }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied!" : "📋 Copy"}
                  </button>
                  <button
                    onClick={handleSave}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "8px 14px", borderRadius: 8,
                      background: saved ? "rgba(34,197,94,0.2)" : "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                      border: "none", color: "#fff",
                      fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                    }}
                  >
                    {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> 💾 Save</>}
                  </button>
                </div>
              </div>

              <div style={{ padding: 24 }}>
                <p style={{ color: "#F0F4FF", fontSize: "0.95rem", lineHeight: 1.8, whiteSpace: "pre-wrap", margin: 0 }}>
                  {result[activeTab as keyof GenerateResponse]}
                </p>
              </div>

              <div style={{ padding: "0 24px 20px" }}>
                <button
                  onClick={handleGenerate}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "transparent", border: "1px solid rgba(148,163,184,0.15)",
                    borderRadius: 8, padding: "8px 14px",
                    color: "#7A8BA8", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer",
                  }}
                >
                  <RefreshCw size={13} /> Regenerate
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

    </div>
  );
}
