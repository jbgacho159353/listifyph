import Sidebar from "@/components/sidebar";
import { createClient } from "@/lib/supabase/server";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "FREE",
    price: "₱0",
    period: "/mo",
    features: ["3 generations/month", "Listing description only", "English only"],
    cta: "Current Plan",
    planKey: "free",
    highlight: false,
  },
  {
    name: "PRO",
    price: "₱499",
    period: "/mo",
    badge: "Most Popular",
    features: [
      "Unlimited generations",
      "All 4 content types",
      "English + Filipino",
      "All ad styles",
      "Full listing history",
    ],
    cta: "Upgrade to Pro",
    planKey: "pro",
    highlight: true,
  },
  {
    name: "AGENCY",
    price: "₱1,499",
    period: "/mo",
    features: [
      "Everything in Pro",
      "5 team members",
      "Bulk generation",
      "Priority support",
    ],
    cta: "Contact Us",
    planKey: "agency",
    highlight: false,
  },
];

export default async function PricingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let currentPlan = "free";
  if (user) {
    const { data: profile } = await supabase.from("profiles").select("plan").eq("id", user.id).single();
    currentPlan = profile?.plan ?? "free";
  }

  return (
    <div className="flex min-h-screen bg-surface">
      {user && <Sidebar plan={currentPlan} />}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-navy mb-3">Simple, transparent pricing</h1>
            <p className="text-text-secondary">Start free. Upgrade when you are ready to scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map(({ name, price, period, badge, features, cta, planKey, highlight }) => {
              const isCurrent = currentPlan === planKey;
              return (
                <div
                  key={name}
                  className={`rounded-2xl p-8 border ${
                    highlight
                      ? "bg-navy border-navy text-white shadow-2xl md:scale-105"
                      : "bg-white border-brand-border"
                  }`}
                >
                  {badge && (
                    <div className="inline-block bg-accent-blue text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                      {badge}
                    </div>
                  )}
                  {isCurrent && (
                    <div className="inline-block bg-success-green text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                      Current Plan
                    </div>
                  )}
                  <div className={`text-sm font-medium mb-1 ${highlight ? "text-white/60" : "text-text-secondary"}`}>{name}</div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-4xl font-bold ${highlight ? "text-white" : "text-navy"}`}>{price}</span>
                    <span className={`text-sm ${highlight ? "text-white/60" : "text-text-secondary"}`}>{period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm">
                        <CheckCircle size={16} className="text-success-green shrink-0" />
                        <span className={highlight ? "text-white/80" : "text-text-secondary"}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  {isCurrent ? (
                    <div className={`text-center py-3 rounded-xl text-sm font-semibold ${highlight ? "bg-white/10 text-white" : "bg-surface text-text-secondary"}`}>
                      Current Plan
                    </div>
                  ) : planKey === "agency" ? (
                    <a
                      href="mailto:joelgacho.ffseo@gmail.com?subject=ListifyPH Agency Plan"
                      className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors border border-brand-border text-navy hover:bg-surface`}
                    >
                      {cta}
                    </a>
                  ) : (
                    <form action="/api/checkout" method="POST">
                      <input type="hidden" name="plan" value={planKey} />
                      <button
                        type="submit"
                        className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                          highlight
                            ? "bg-accent-blue text-white hover:bg-accent-blue/90"
                            : "border border-brand-border text-navy hover:bg-surface"
                        }`}
                      >
                        {cta}
                      </button>
                    </form>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-center text-text-secondary text-sm mt-8">
            Payments processed securely via PayMongo. GCash, Maya, and credit/debit cards accepted.
          </p>
        </div>
      </main>
    </div>
  );
}
