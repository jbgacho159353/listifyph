import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import { Plus, FileText, ChevronRight, TrendingUp } from "lucide-react";
import type { Profile, Listing } from "@/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  const { data: recentListings } = await supabase
    .from("listings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)
    .returns<Listing[]>();

  const plan = profile?.plan ?? "free";
  const used = profile?.generations_used ?? 0;
  const limit = 3;
  const name = profile?.full_name ?? user.email?.split("@")[0] ?? "there";

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar plan={plan} />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-navy">Hi {name}!</h1>
              <p className="text-text-secondary text-sm mt-1">Ready to generate your next listing?</p>
            </div>
            <Link
              href="/generate"
              className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-navy/90 transition-colors"
            >
              <Plus size={16} />
              Generate New Listing
            </Link>
          </div>

          {/* Plan & Usage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-brand-border p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-text-secondary">Current Plan</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide ${
                  plan === "free" ? "bg-gray-100 text-gray-600" :
                  plan === "pro" ? "bg-accent-blue/10 text-accent-blue" :
                  "bg-navy/10 text-navy"
                }`}>
                  {plan}
                </span>
              </div>
              <p className="text-2xl font-bold text-navy capitalize">{plan} Plan</p>
            </div>

            {plan === "free" && (
              <div className="bg-white rounded-2xl border border-brand-border p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-text-secondary">Generations this month</span>
                  <span className="text-sm font-bold text-navy">{used}/{limit}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                  <div
                    className="bg-accent-blue rounded-full h-2 transition-all"
                    style={{ width: `${Math.min((used / limit) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-text-secondary text-xs">{limit - used} generations remaining</p>
              </div>
            )}

            {plan !== "free" && (
              <div className="bg-white rounded-2xl border border-brand-border p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-text-secondary">Generations</span>
                </div>
                <p className="text-2xl font-bold text-navy">Unlimited</p>
                <p className="text-text-secondary text-xs mt-1">All content types unlocked</p>
              </div>
            )}
          </div>

          {/* Upgrade Banner */}
          {plan === "free" && (
            <div className="bg-gradient-to-r from-navy to-accent-blue rounded-2xl p-6 mb-8 text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <TrendingUp size={24} className="text-white/80" />
                <div>
                  <p className="font-semibold">Upgrade to Pro for unlimited listings</p>
                  <p className="text-white/70 text-sm">All 4 content types, English + Filipino, all ad styles</p>
                </div>
              </div>
              <Link
                href="/pricing"
                className="bg-white text-navy px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap hover:bg-white/90 transition-colors"
              >
                Upgrade — ₱499/mo
              </Link>
            </div>
          )}

          {/* Recent Listings */}
          <div className="bg-white rounded-2xl border border-brand-border">
            <div className="flex items-center justify-between p-6 border-b border-brand-border">
              <h2 className="font-semibold text-navy">Recent Listings</h2>
              <Link href="/history" className="text-sm text-accent-blue hover:underline flex items-center gap-1">
                View all <ChevronRight size={14} />
              </Link>
            </div>
            {!recentListings || recentListings.length === 0 ? (
              <div className="p-12 text-center">
                <FileText size={40} className="text-brand-border mx-auto mb-4" />
                <p className="text-navy font-medium mb-2">No listings yet</p>
                <p className="text-text-secondary text-sm mb-6">Generate your first property listing to get started.</p>
                <Link
                  href="/generate"
                  className="inline-flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-navy/90 transition-colors"
                >
                  <Plus size={16} />
                  Generate your first listing
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-brand-border">
                {recentListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-4 hover:bg-surface transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-accent-blue/10 rounded-lg flex items-center justify-center">
                        <FileText size={16} className="text-accent-blue" />
                      </div>
                      <div>
                        <p className="font-medium text-navy text-sm">{listing.property_type} · {listing.location}</p>
                        <p className="text-text-secondary text-xs">
                          {new Date(listing.created_at).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/history/${listing.id}`}
                      className="text-sm text-accent-blue hover:underline font-medium"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
