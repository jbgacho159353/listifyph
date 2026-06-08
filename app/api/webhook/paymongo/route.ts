import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { sendProUpgradeEmail } from "@/lib/emails";
import crypto from "crypto";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-paymongo-signature") ?? "";

  // Verify webhook signature
  const secret = process.env.PAYMONGO_SECRET_KEY ?? "";
  const hmac = crypto.createHmac("sha256", secret).update(body).digest("hex");
  if (hmac !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);
  const eventType = event?.data?.attributes?.type;

  if (eventType === "payment.paid" || eventType === "checkout_session.payment.paid") {
    const metadata = event?.data?.attributes?.data?.attributes?.metadata ?? {};
    const userId = metadata?.user_id;
    const plan = metadata?.plan ?? "pro";

    if (!userId) return NextResponse.json({ error: "No user_id in metadata" }, { status: 400 });

    const supabase = await createClient();

    // Update profile plan
    await supabase.from("profiles").update({ plan }).eq("id", userId);

    // Upsert subscription record
    await supabase.from("subscriptions").upsert({
      user_id: userId,
      plan,
      status: "active",
      paymongo_subscription_id: event?.data?.id ?? null,
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }, { onConflict: "user_id" });

    // Get user email for confirmation
    const { data: profile } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", userId)
      .single();

    if (profile?.email) {
      await sendProUpgradeEmail(profile.email, profile.full_name ?? "there");
    }
  }

  return NextResponse.json({ received: true });
}
