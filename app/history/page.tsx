import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import { Suspense } from "react";
import type { Listing, Profile } from "@/types";
import HistoryFilters from "./history-filters";
import DeleteButton from "./delete-button";

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single<Profile>();

  let query = supabase
    .from("listings").select("*").eq("user_id", user.id)
    .order("created_at", { ascending: params.sort === "oldest" });

  if (params.q) {
    query = query.or(`location.ilike.%${params.q}%,property_type.ilike.%${params.q}%`);
  }

  const { data: listings } = await query.returns<Listing[]>();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#050914" }}>
      <Sidebar plan={profile?.plan} userEmail={user.email ?? undefined} userName={profile?.full_name ?? undefined} />
      <main style={{ flex: 1, padding: "40px 32px", overflowY: "auto" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#F0F4FF", margin: 0 }}>
              📋 Listing History
            </h1>
            <p style={{ color: "#7A8BA8", margin: "6px 0 0", fontSize: "0.95rem" }}>
              All your generated listings in one place.
            </p>
          </div>

          {/* Filters */}
          <Suspense fallback={null}>
            <HistoryFilters defaultQ={params.q} defaultSort={params.sort} />
          </Suspense>

          {/* Empty state */}
          {!listings || listings.length === 0 ? (
            <div style={{
              background: "#0c1220", border: "1px solid rgba(148,163,184,0.08)",
              borderRadius: 14, padding: "64px 24px", textAlign: "center",
            }}>
              <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>📄</div>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, color: "#F0F4FF", margin: "0 0 8px", fontSize: "1.1rem" }}>
                {params.q ? "No listings found" : "No listings yet"}
              </p>
              <p style={{ color: "#7A8BA8", fontSize: "0.875rem", margin: "0 0 28px" }}>
                {params.q ? "Try a different search term." : "Generate your first listing to see it here."}
              </p>
              <Link href="/generate" className="btn-grad-sm">
                ✨ Generate a listing
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
              {listings.map((listing) => (
                <div key={listing.id} className="history-card">
                  {/* Type badge + date */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{
                      background: "rgba(59,130,246,0.1)", color: "#3B82F6",
                      fontSize: "0.7rem", fontWeight: 700,
                      padding: "4px 10px", borderRadius: 100,
                      textTransform: "uppercase", letterSpacing: "0.5px",
                    }}>
                      {listing.property_type}
                    </span>
                    <span style={{ color: "#7A8BA8", fontSize: "0.75rem" }}>
                      {new Date(listing.created_at).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>

                  {/* Location */}
                  <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, color: "#F0F4FF", fontSize: "1rem", margin: "0 0 4px" }}>
                    {listing.location}
                  </p>

                  {/* Price */}
                  <p style={{ color: "#3B82F6", fontWeight: 600, fontSize: "0.95rem", margin: "0 0 14px", fontFamily: "Inter, sans-serif" }}>
                    {listing.price}
                  </p>

                  {/* Language + Style badges */}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                    <span style={{ background: "rgba(168,85,247,0.1)", color: "#C084FC", fontSize: "0.7rem", fontWeight: 600, padding: "3px 8px", borderRadius: 6, textTransform: "capitalize" }}>
                      {listing.language}
                    </span>
                    <span style={{ background: "rgba(34,197,94,0.1)", color: "#4ADE80", fontSize: "0.7rem", fontWeight: 600, padding: "3px 8px", borderRadius: 6, textTransform: "capitalize" }}>
                      {listing.ad_style}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link
                      href={`/history/${listing.id}`}
                      style={{
                        display: "inline-flex", alignItems: "center",
                        padding: "6px 14px", borderRadius: 6,
                        border: "1px solid rgba(59,130,246,0.3)",
                        color: "#3B82F6", fontSize: "0.8rem", fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      View
                    </Link>
                    <DeleteButton id={listing.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
