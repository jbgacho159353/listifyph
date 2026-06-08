"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import { Wand2, Copy, RefreshCw, Save, Check, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { GenerateRequest, GenerateResponse, PropertyType, Language, AdStyle, Profile } from "@/types";

const propertyTypes: PropertyType[] = [
  "Condo", "House & Lot", "Townhouse", "Apartment",
  "Commercial Space", "Lot Only", "Office Space"
];

const amenitiesList = [
  "Pool", "Gym", "Parking", "24/7 Security", "CCTV", "Balcony",
  "Garden", "Near Mall", "Near School", "Near Hospital", "Pet Friendly",
  "Furnished", "Semi-Furnished", "City View", "Beach View", "Mountain View"
];

const adStyleOptions: { value: AdStyle; label: string; desc: string }[] = [
  { value: "storytelling", label: "Storytelling", desc: "For luxury properties" },
  { value: "direct", label: "Direct Response", desc: "For fast sales" },
  { value: "fomo", label: "FOMO", desc: "For pre-selling" },
  { value: "investment", label: "Investment Pitch", desc: "For investors" },
];

const languageOptions: { value: Language; label: string }[] = [
  { value: "english", label: "English only" },
  { value: "filipino", label: "Filipino only" },
  { value: "both", label: "Both" },
];

type Tab = "listing_description" | "facebook_post" | "facebook_ad_copy" | "instagram_caption" | "filipino_version";

export default function GeneratePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<GenerateRequest>({
    property_type: "Condo",
    location: "",
    price: "",
    bedrooms: null,
    bathrooms: null,
    size: null,
    amenities: [],
    special_notes: null,
    language: "english",
    ad_style: "storytelling",
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
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 403) { setError("You have reached your free plan limit. Upgrade to Pro for unlimited generations."); setLoading(false); return; }
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
      user_id: user.id,
      ...form,
      amenities: form.amenities.join(", "),
      ...result,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleCopy() {
    if (!result) return;
    const text = result[activeTab as keyof GenerateResponse] ?? "";
    navigator.clipboard.writeText(text);
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
    { key: "listing_description", label: "Listing Description" },
    { key: "facebook_post", label: "Facebook Post" },
    { key: "facebook_ad_copy", label: "Facebook Ad" },
    { key: "instagram_caption", label: "Instagram" },
    ...(form.language !== "english" ? [{ key: "filipino_version" as Tab, label: "Filipino" }] : []),
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar plan={profile?.plan} />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-navy">Generate Listing</h1>
            <p className="text-text-secondary text-sm mt-1">Fill in the details and let AI craft your content.</p>
          </div>

          {reachedLimit && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center gap-3">
              <AlertCircle size={18} className="text-amber-500 shrink-0" />
              <div>
                <p className="text-amber-800 font-medium text-sm">Free plan limit reached</p>
                <p className="text-amber-700 text-xs">You have used all 3 free generations this month. <a href="/pricing" className="underline">Upgrade to Pro</a> for unlimited generations.</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-brand-border p-6 space-y-6">
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Property Type</label>
              <select
                value={form.property_type}
                onChange={(e) => setForm((f) => ({ ...f, property_type: e.target.value as PropertyType }))}
                className="w-full border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue bg-white"
              >
                {propertyTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Location & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Location</label>
                <input
                  type="text"
                  placeholder="e.g. BGC, Taguig"
                  value={form.location}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  className="w-full border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Price</label>
                <input
                  type="text"
                  placeholder="e.g. ₱8,500,000"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className="w-full border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue"
                />
              </div>
            </div>

            {/* Beds, Baths, Size */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Bedrooms</label>
                <input
                  type="number"
                  min={0}
                  max={20}
                  placeholder="2"
                  value={form.bedrooms ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, bedrooms: e.target.value ? Number(e.target.value) : null }))}
                  className="w-full border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Bathrooms</label>
                <input
                  type="number"
                  min={0}
                  max={20}
                  placeholder="2"
                  value={form.bathrooms ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, bathrooms: e.target.value ? Number(e.target.value) : null }))}
                  className="w-full border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Floor Area</label>
                <input
                  type="text"
                  placeholder="65 sqm"
                  value={form.size ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, size: e.target.value || null }))}
                  className="w-full border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue"
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {amenitiesList.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAmenity(a)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      form.amenities.includes(a)
                        ? "bg-accent-blue text-white border-accent-blue"
                        : "bg-white text-text-secondary border-brand-border hover:border-accent-blue"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Special Notes</label>
              <textarea
                rows={3}
                placeholder="Anything else to highlight (e.g. 'Corner unit', 'Rent-to-own available', 'Near Makati CBD')..."
                value={form.special_notes ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, special_notes: e.target.value || null }))}
                className="w-full border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue resize-none"
              />
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Language</label>
              <div className="flex gap-3">
                {languageOptions.map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="language"
                      value={value}
                      checked={form.language === value}
                      onChange={() => setForm((f) => ({ ...f, language: value }))}
                      className="accent-accent-blue"
                    />
                    <span className="text-sm text-navy">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ad Style */}
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Ad Style</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {adStyleOptions.map(({ value, label, desc }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, ad_style: value }))}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      form.ad_style === value
                        ? "border-accent-blue bg-accent-blue/5"
                        : "border-brand-border hover:border-accent-blue"
                    }`}
                  >
                    <p className="text-sm font-medium text-navy">{label}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">{error}</div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading || reachedLimit || !form.location || !form.price}
              className="w-full bg-navy text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-navy/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Generating your listing...
                </>
              ) : (
                <>
                  <Wand2 size={16} />
                  Generate Listing
                </>
              )}
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="bg-white rounded-2xl border border-brand-border mt-6">
              <div className="flex items-center justify-between p-4 border-b border-brand-border">
                <div className="flex gap-1 overflow-x-auto">
                  {tabs.map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                        activeTab === key
                          ? "bg-navy text-white"
                          : "text-text-secondary hover:text-navy hover:bg-surface"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-brand-border text-xs font-medium text-navy hover:bg-surface transition-colors"
                  >
                    {copied ? <Check size={14} className="text-success-green" /> : <Copy size={14} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-accent-blue text-white text-xs font-medium hover:bg-accent-blue/90 transition-colors"
                  >
                    {saved ? <Check size={14} /> : <Save size={14} />}
                    {saved ? "Saved!" : "Save"}
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-navy text-sm leading-relaxed whitespace-pre-wrap">
                  {result[activeTab as keyof GenerateResponse]}
                </p>
              </div>
              <div className="px-6 pb-4 flex items-center justify-between">
                <button
                  onClick={handleGenerate}
                  className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-navy transition-colors"
                >
                  <RefreshCw size={13} />
                  Regenerate
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
