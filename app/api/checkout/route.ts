import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/login", request.url));

  const formData = await request.formData();
  const plan = formData.get("plan") as string;

  const prices: Record<string, number> = { pro: 49900, agency: 149900 }; // in centavos
  const amount = prices[plan];
  if (!amount) return NextResponse.redirect(new URL("/pricing", request.url));

  const res = await fetch("https://api.paymongo.com/v1/checkout_sessions", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY + ":").toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        attributes: {
          billing: { name: user.email },
          line_items: [{
            currency: "PHP",
            amount,
            description: `ListifyPH ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
            name: `ListifyPH ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
            quantity: 1,
          }],
          payment_method_types: ["gcash", "maya", "card"],
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
          metadata: { user_id: user.id, plan },
        },
      },
    }),
  });

  const data = await res.json();
  const checkoutUrl = data?.data?.attributes?.checkout_url;

  if (checkoutUrl) {
    return NextResponse.redirect(checkoutUrl);
  }

  return NextResponse.redirect(new URL("/pricing?error=payment_failed", request.url));
}
