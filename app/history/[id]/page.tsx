import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import type { Listing, Profile } from "@/types";
import { ArrowLeft } from "lucide-react";
import CopyButton from "./copy-button";

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { data: listing }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single<Profile>(),
    supabase.from("listings").select("*").eq("id", id).eq("user_id", user.id).single<Listing>(),
  ]);

  if (!listing) redirect("/history");

  const tabs = [
    { key: "listing_description", label: "Listing Description", content: listing.listing_description },
    { key: "facebook_post", label: "Facebook Post", content: listing.facebook_post },
    { key: "facebook_ad_copy", label: "Facebook Ad", content: listing.facebook_ad_copy },
    { key: "instagram_caption", label: "Instagram", content: listing.instagram_caption },
    ...(listing.language !== "english" && listing.filipino_version
      ? [{ key: "filipino_version", label: "Filipino Version", content: listing.filipino_version }]
      : []),
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar plan={profile?.plan} />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/history" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-navy mb-6 transition-colors">
            <ArrowLeft size={15} />
            Back to History
          </Link>
          <div className="bg-white rounded-2xl border border-brand-border p-6 mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div><p className="text-text-secondary text-xs mb-1">Property Type</p><p className="font-medium text-navy">{listing.property_type}</p></div>
              <div><p className="text-text-secondary text-xs mb-1">Location</p><p className="font-medium text-navy">{listing.location}</p></div>
              <div><p className="text-text-secondary text-xs mb-1">Price</p><p className="font-medium text-navy">{listing.price}</p></div>
              {listing.bedrooms && <div><p className="text-text-secondary text-xs mb-1">Bedrooms</p><p className="font-medium text-navy">{listing.bedrooms}</p></div>}
              {listing.bathrooms && <div><p className="text-text-secondary text-xs mb-1">Bathrooms</p><p className="font-medium text-navy">{listing.bathrooms}</p></div>}
              {listing.size && <div><p className="text-text-secondary text-xs mb-1">Floor Area</p><p className="font-medium text-navy">{listing.size}</p></div>}
              <div><p className="text-text-secondary text-xs mb-1">Language</p><p className="font-medium text-navy capitalize">{listing.language}</p></div>
              <div><p className="text-text-secondary text-xs mb-1">Ad Style</p><p className="font-medium text-navy capitalize">{listing.ad_style}</p></div>
              <div><p className="text-text-secondary text-xs mb-1">Generated</p><p className="font-medium text-navy">{new Date(listing.created_at).toLocaleDateString("en-PH")}</p></div>
            </div>
          </div>
          <div className="space-y-4">
            {tabs.map(({ key, label, content }) => content && (
              <div key={key} className="bg-white rounded-2xl border border-brand-border overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-brand-border">
                  <h3 className="font-medium text-navy text-sm">{label}</h3>
                  <CopyButton text={content} />
                </div>
                <div className="p-5">
                  <p className="text-navy text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}