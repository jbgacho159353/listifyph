import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { CheckCircle, Zap, FileText, Share2, Camera, Target } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Listing Description",
    desc: "SEO-optimised property descriptions that convert browsers into buyers.",
  },
  {
    icon: Share2,
    title: "Facebook Post",
    desc: "Ready-to-copy Facebook posts with the perfect hook and call to action.",
  },
  {
    icon: Target,
    title: "Facebook Ad Copy",
    desc: "Three variations of high-converting ad copy for paid campaigns.",
  },
  {
    icon: Camera,
    title: "Instagram Caption",
    desc: "Scroll-stopping captions with relevant hashtags for maximum reach.",
  },
];

const steps = [
  {
    n: "01",
    title: "Fill in property details",
    desc: "Enter location, price, size, amenities � takes under a minute.",
  },
  {
    n: "02",
    title: "Choose language & style",
    desc: "English, Filipino, or both. Pick storytelling, direct, FOMO, or investment.",
  },
  {
    n: "03",
    title: "Copy and post instantly",
    desc: "Four types of content generated in 30 seconds. Ready to use.",
  },
];

const adStyles = [
  {
    name: "Storytelling",
    tag: "Luxury",
    desc: "Paint a picture of the buyer's future life. Open with a scene, build desire, then reveal the property.",
  },
  {
    name: "Direct Response",
    tag: "Fast Sales",
    desc: "Lead with the strongest benefit. Bullet points. Urgency. Best for foreclosed properties.",
  },
  {
    name: "FOMO",
    tag: "Pre-Selling",
    desc: "Emphasize scarcity and exclusivity. \"Only X units left.\" \"Prices going up next month.\"",
  },
  {
    name: "Investment Pitch",
    tag: "Investors",
    desc: "Focus on ROI, rental income, capital appreciation, and location value data.",
  },
];

const plans = [
  {
    name: "FREE",
    price: "?0",
    period: "/mo",
    features: ["3 generations/month", "Listing description only", "English only"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "PRO",
    price: "?499",
    period: "/mo",
    badge: "Most Popular",
    features: [
      "Unlimited generations",
      "All 4 content types",
      "English + Filipino",
      "All ad styles",
      "Full listing history",
    ],
    cta: "Start Pro",
    highlight: true,
  },
  {
    name: "AGENCY",
    price: "?1,499",
    period: "/mo",
    features: [
      "Everything in Pro",
      "5 team members",
      "Bulk generation",
      "Priority support",
    ],
    cta: "Contact us",
    highlight: false,
  },
];

const testimonials = [
  {
    name: "Maria Santos",
    role: "Real Estate Broker, Quezon City",
    body: "I used to spend 2 hours writing one listing. Now I generate 10 listings in the same time. ListifyPH is a game-changer.",
    initials: "MS",
  },
  {
    name: "Carlo Reyes",
    role: "Property Developer, BGC",
    body: "The Filipino version feature is brilliant. My clients respond so much better to Tagalog copy. Sales conversions are up 40%.",
    initials: "CR",
  },
  {
    name: "Ana Dela Cruz",
    role: "Solo Agent, Cebu",
    body: "As a one-person team I needed to scale. ListifyPH lets me look like a full marketing agency. Worth every peso.",
    initials: "AD",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent-blue/10 text-accent-blue px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Zap size={14} />
            Powered by Claude AI
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6">
            Property listings in{" "}
            <span className="text-accent-blue">30 seconds.</span>
            <br />
            Not 3 hours.
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
            ListifyPH generates professional listing descriptions, Facebook posts, Facebook Ad
            copy, and Instagram captions � instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-navy text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-navy/90 transition-colors"
            >
              Try for free
            </Link>
            <a
              href="#how-it-works"
              className="border border-brand-border text-navy px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-surface transition-colors"
            >
              See how it works
            </a>
          </div>

          {/* Demo mockup */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl border border-brand-border p-6 text-left max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-text-secondary text-sm w-32 shrink-0">Property:</span>
                <span className="text-navy text-sm font-medium">2BR Condo, BGC Taguig</span>
              </div>
              <div className="flex gap-3">
                <span className="text-text-secondary text-sm w-32 shrink-0">Price:</span>
                <span className="text-navy text-sm font-medium">?8,500,000</span>
              </div>
              <div className="flex gap-3">
                <span className="text-text-secondary text-sm w-32 shrink-0">Style:</span>
                <span className="text-navy text-sm font-medium">Storytelling</span>
              </div>
              <div className="border-t border-brand-border pt-3 mt-3">
                <div className="inline-flex items-center gap-2 text-accent-blue text-sm font-medium mb-2">
                  <Zap size={14} />
                  Generated in 2.3s
                </div>
                <p className="text-navy text-sm leading-relaxed">Imagine waking up to a panoramic view of the BGC skyline. This stunning 2BR condo at The Fort is the life you have been working toward.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy mb-4">One input. Four types of content.</h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Stop writing the same property from scratch for every platform. ListifyPH does it all at once.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-surface rounded-2xl p-6 border border-brand-border hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-accent-blue/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-accent-blue" />
                </div>
                <h3 className="font-semibold text-navy mb-2">{title}</h3>
                <p className="text-text-secondary text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-navy">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">From property to post in 3 steps</h2>
            <p className="text-white/60 max-w-xl mx-auto">No training. No templates. Just fill, choose, and copy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="text-center">
                <div className="w-12 h-12 bg-accent-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-sm">{n}</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-white/60 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad styles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy mb-4">Match the style to the property</h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Four proven ad frameworks, each designed for a different type of buyer and listing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {adStyles.map(({ name, tag, desc }) => (
              <div key={name} className="border border-brand-border rounded-2xl p-6 hover:border-accent-blue hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-navy">{name}</h3>
                  <span className="text-xs font-medium text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-full">{tag}</span>
                </div>
                <p className="text-text-secondary text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy mb-4">Simple, transparent pricing</h2>
            <p className="text-text-secondary">Start free. Upgrade when you are ready to scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map(({ name, price, period, badge, features: f, cta, highlight }) => (
              <div
                key={name}
                className={`rounded-2xl p-8 border ${
                  highlight
                    ? "bg-navy border-navy text-white shadow-2xl scale-105"
                    : "bg-white border-brand-border"
                }`}
              >
                {badge && (
                  <div className="inline-block bg-accent-blue text-white text-xs font-medium px-3 py-1 rounded-full mb-4">
                    {badge}
                  </div>
                )}
                <div className={`text-sm font-medium mb-1 ${highlight ? "text-white/60" : "text-text-secondary"}`}>{name}</div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-bold ${highlight ? "text-white" : "text-navy"}`}>{price}</span>
                  <span className={`text-sm ${highlight ? "text-white/60" : "text-text-secondary"}`}>{period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {f.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className={highlight ? "text-success-green" : "text-success-green"} />
                      <span className={highlight ? "text-white/80" : "text-text-secondary"}>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                    highlight
                      ? "bg-accent-blue text-white hover:bg-accent-blue/90"
                      : "border border-brand-border text-navy hover:bg-surface"
                  }`}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy mb-4">Trusted by agents across the Philippines</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, body, initials }) => (
              <div key={name} className="bg-surface rounded-2xl p-6 border border-brand-border">
                <p className="text-navy text-sm leading-relaxed mb-6">{`"${body}"`}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{initials}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy text-sm">{name}</div>
                    <div className="text-text-secondary text-xs">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-navy text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start writing listings in 30 seconds</h2>
          <p className="text-white/60 mb-8">Try free � no credit card needed</p>
          <Link
            href="/signup"
            className="inline-block bg-accent-blue text-white px-10 py-4 rounded-xl font-semibold text-base hover:bg-accent-blue/90 transition-colors"
          >
            Get started for free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-brand-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
            <Image src="/assets/logo-dark.png" alt="ListifyPH" width={140} height={36} className="h-8 w-auto" />
            <span className="text-text-secondary text-sm">&#8212; Write less. Sell more.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <Link href="/privacy" className="hover:text-navy transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-navy transition-colors">Terms</Link>
            <a href="mailto:joelgacho.ffseo@gmail.com" className="hover:text-navy transition-colors">Contact</a>
          </div>
          <div className="text-text-secondary text-sm">� 2026 ListifyPH</div>
        </div>
      </footer>
    </div>
  );
}


