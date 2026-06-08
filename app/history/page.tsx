import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import type { Listing, Profile } from "@/types";
import { FileText, Trash2 } from "lucide-react";

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
    .from("listings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: params.sort === "oldest" });

  if (params.q) {
    query = query.or(`location.ilike.%${params.q}%,property_type.ilike.%${params.q}%`);
  }

  const { data: listings } = await query.returns<Listing[]>();

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar plan={profile?.plan} />
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-navy">Listing History</h1>
            <p className="text-text-secondary text-sm mt-1">All your generated listings in one place.</p>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <form className="flex-1">
              <input
                name="q"
                defaultValue={params.q}
                type="search"
                placeholder="Search by location or property type..."
                className="w-full max-w-sm border border-brand-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue"
              />
            </form>
            <select
              name="sort"
              defaultValue={params.sort}
              className="border border-brand-border rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent-blue/30"
              onChange={(e) => {
                const url = new URL(window.location.href);
                url.searchParams.set("sort", e.target.value);
                window.location.href = url.toString();
              }}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl border border-brand-border overflow-hidden">
            {!listings || listings.length === 0 ? (
              <div className="p-16 text-center">
                <FileText size={40} className="text-brand-border mx-auto mb-4" />
                <p className="text-navy font-medium mb-2">No listings found</p>
                <p className="text-text-secondary text-sm mb-6">
                  {params.q ? "Try a different search term." : "Generate your first listing to see it here."}
                </p>
                <Link href="/generate" className="bg-navy text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-navy/90 transition-colors">
                  Generate a listing
                </Link>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-border bg-surface">
                    <th className="text-left py-3 px-4 font-medium text-text-secondary">Property</th>
                    <th className="text-left py-3 px-4 font-medium text-text-secondary hidden md:table-cell">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-text-secondary hidden lg:table-cell">Language</th>
                    <th className="text-left py-3 px-4 font-medium text-text-secondary hidden lg:table-cell">Style</th>
                    <th className="text-left py-3 px-4 font-medium text-text-secondary hidden sm:table-cell">Date</th>
                    <th className="py-3 px-4" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {listings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-surface transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-medium text-navy">{listing.property_type}</p>
                        <p className="text-text-secondary text-xs">{listing.location}</p>
                      </td>
                      <td className="py-3.5 px-4 text-text-secondary hidden md:table-cell">{listing.price}</td>
                      <td className="py-3.5 px-4 hidden lg:table-cell">
                        <span className="bg-accent-blue/10 text-accent-blue text-xs font-medium px-2 py-0.5 rounded-full capitalize">{listing.language}</span>
                      </td>
                      <td className="py-3.5 px-4 text-text-secondary capitalize hidden lg:table-cell">{listing.ad_style}</td>
                      <td className="py-3.5 px-4 text-text-secondary text-xs hidden sm:table-cell">
                        {new Date(listing.created_at).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2 justify-end">
                          <Link href={`/history/${listing.id}`} className="text-accent-blue text-xs font-medium hover:underline">View</Link>
                          <DeleteButton id={listing.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function DeleteButton({ id }: { id: string }) {
  return (
    <form action={`/api/listings/${id}/delete`} method="POST">
      <button type="submit" className="text-text-secondary hover:text-red-500 transition-colors p-1">
        <Trash2 size={14} />
      </button>
    </form>
  );
}
