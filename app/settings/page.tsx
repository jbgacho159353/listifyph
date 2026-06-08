"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/client";
import { Save, AlertTriangle } from "lucide-react";
import type { Profile } from "@/types";

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
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

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar plan={profile?.plan} />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-navy">Settings</h1>
            <p className="text-text-secondary text-sm mt-1">Manage your account and subscription.</p>
          </div>

          {/* Profile */}
          <div className="bg-white rounded-2xl border border-brand-border p-6 mb-6">
            <h2 className="font-semibold text-navy mb-5">Profile</h2>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={profile?.email ?? ""}
                  disabled
                  className="w-full border border-brand-border rounded-xl px-4 py-2.5 text-sm bg-surface text-text-secondary cursor-not-allowed"
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-navy/90 disabled:opacity-60 transition-colors"
              >
                <Save size={15} />
                {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Subscription */}
          <div className="bg-white rounded-2xl border border-brand-border p-6 mb-6">
            <h2 className="font-semibold text-navy mb-5">Subscription</h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium text-navy capitalize">{profile?.plan ?? "free"} Plan</p>
                <p className="text-text-secondary text-sm">
                  {profile?.plan === "free"
                    ? "3 generations/month · Listing description only"
                    : profile?.plan === "pro"
                    ? "Unlimited generations · All content types"
                    : "Everything in Pro + team members"}
                </p>
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase ${
                profile?.plan === "free" ? "bg-gray-100 text-gray-600" :
                profile?.plan === "pro" ? "bg-accent-blue/10 text-accent-blue" :
                "bg-navy/10 text-navy"
              }`}>
                {profile?.plan ?? "free"}
              </span>
            </div>
            {profile?.plan === "free" ? (
              <a
                href="/pricing"
                className="inline-block bg-accent-blue text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-accent-blue/90 transition-colors"
              >
                Upgrade to Pro — ₱499/mo
              </a>
            ) : (
              <button className="text-sm text-red-500 hover:underline">Cancel subscription</button>
            )}
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl border border-red-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={16} className="text-red-500" />
              <h2 className="font-semibold text-red-600">Danger Zone</h2>
            </div>
            <p className="text-text-secondary text-sm mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="border border-red-300 text-red-500 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-red-50 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
