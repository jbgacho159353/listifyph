import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/login", request.url));

  const formData = await request.formData();
  const plan = formData.get("plan") as string;

  const prices: Record<string, number> = { pro: 49900, agency: 149900 };
  const amount = prices[plan];
  if (!amount) return NextResponse.redirect(new URL("/pricing", request.url));

  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;

  try {
    const encoded = Buffer.from(`${process.env.PAYMONGO_SECRET_KEY}:`).toString("base64");
    const res = await fetch("https://api.paymongo.com/v1/links", {
      method: "POST",
      headers: {
        Authorization: `Basic ${encoded}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount,
            description: `ListifyPH ${planLabel} Plan`,
            remarks: `user_id:${user.id} plan:${plan}`,
            metadata: { user_id: user.id, plan },
          },
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("PayMongo error:", JSON.stringify(err, null, 2));
      return NextResponse.redirect(`${origin}/pricing?error=payment_failed`);
    }

    const data = await res.json();
    const checkoutUrl = data?.data?.attributes?.checkout_url;

    if (!checkoutUrl) {
      console.error("PayMongo: no checkout_url in response:", JSON.stringify(data, null, 2));
      return NextResponse.redirect(`${origin}/pricing?error=payment_failed`);
    }

    return NextResponse.redirect(checkoutUrl, 303);
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.redirect(`${origin}/pricing?error=payment_failed`);
  }
}
