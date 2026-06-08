export type Plan = "free" | "pro" | "agency";
export type Language = "english" | "filipino" | "both";
export type AdStyle = "storytelling" | "direct" | "fomo" | "investment";
export type PropertyType =
  | "Condo"
  | "House & Lot"
  | "Townhouse"
  | "Apartment"
  | "Commercial Space"
  | "Lot Only"
  | "Office Space";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  plan: Plan;
  generations_used: number;
  generations_reset_at: string | null;
  created_at: string;
}

export interface Listing {
  id: string;
  user_id: string;
  property_type: PropertyType;
  location: string;
  price: string;
  bedrooms: number | null;
  bathrooms: number | null;
  size: string | null;
  amenities: string | null;
  special_notes: string | null;
  language: Language;
  ad_style: AdStyle;
  listing_description: string | null;
  facebook_post: string | null;
  facebook_ad_copy: string | null;
  instagram_caption: string | null;
  filipino_version: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  paymongo_subscription_id: string | null;
  plan: Plan;
  status: string;
  current_period_end: string | null;
  created_at: string;
}

export interface GenerateRequest {
  property_type: PropertyType;
  location: string;
  price: string;
  bedrooms: number | null;
  bathrooms: number | null;
  size: string | null;
  amenities: string[];
  special_notes: string | null;
  language: Language;
  ad_style: AdStyle;
}

export interface GenerateResponse {
  listing_description: string;
  facebook_post: string;
  facebook_ad_copy: string;
  instagram_caption: string;
  filipino_version?: string;
}
