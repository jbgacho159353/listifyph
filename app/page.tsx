"use client";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { useEffect, useRef } from "react";
import { FileText, Share2, Target, Camera } from "lucide-react";

/* ── data ─────────────────────────────────────────────── */
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
    desc: "Enter location, price, size, amenities — takes under a minute.",
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
    tagColor: "#3B82F6",
    tagBg: "rgba(59,130,246,0.15)",
    desc: "Paint a picture of the buyer's future life. Open with a scene, build desire, then reveal the property.",
  },
  {
    name: "Direct Response",
    tag: "Fast Sale",
    tagColor: "#F97316",
    tagBg: "rgba(249,115,22,0.15)",
    desc: "Lead with the strongest benefit. Bullet points. Urgency. Best for foreclosed properties.",
  },
  {
    name: "FOMO",
    tag: "Pre-Selling",
    tagColor: "#A855F7",
    tagBg: "rgba(168,85,247,0.15)",
    desc: 'Emphasize scarcity and exclusivity. "Only X units left." "Prices going up next month."',
  },
  {
    name: "Investment Pitch",
    tag: "Investors",
    tagColor: "#22C55E",
    tagBg: "rgba(34,197,94,0.15)",
    desc: "Focus on ROI, rental income, capital appreciation, and location value data.",
  },
];

const plans = [
  {
    name: "FREE",
    price: "₱0",
    period: "/mo",
    features: ["3 generations/month", "Listing description only", "English only"],
    cta: "Get started",
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
    cta: "Start Pro",
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
    grad: "linear-gradient(135deg,#1D4ED8,#3B82F6)",
  },
  {
    name: "Carlo Reyes",
    role: "Property Developer, BGC",
    body: "The Filipino version feature is brilliant. My clients respond so much better to Tagalog copy. Sales conversions are up 40%.",
    initials: "CR",
    grad: "linear-gradient(135deg,#7C3AED,#A855F7)",
  },
  {
    name: "Ana Dela Cruz",
    role: "Solo Agent, Cebu",
    body: "As a one-person team I needed to scale. ListifyPH lets me look like a full marketing agency. Worth every peso.",
    initials: "AD",
    grad: "linear-gradient(135deg,#059669,#10B981)",
  },
];

/* ── scroll reveal hook ───────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── typing demo hook ─────────────────────────────────── */
function useTyping(ref: React.RefObject<HTMLParagraphElement | null>) {
  useEffect(() => {
    const text =
      "Imagine waking up to a panoramic view of the BGC skyline. This stunning 2BR condo at The Fort is the life you have been working toward. Every detail — from the floor-to-ceiling windows to the designer kitchen — speaks of quiet luxury.";
    let i = 0;
    const el = ref.current;
    if (!el) return;
    el.textContent = "";
    const timer = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
      } else {
        clearInterval(timer);
      }
    }, 28);
    return () => clearInterval(timer);
  }, [ref]);
}

/* ── page ─────────────────────────────────────────────── */
export default function LandingPage() {
  useReveal();
  const typingRef = useRef<HTMLParagraphElement>(null);
  useTyping(typingRef);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", overflowX: "hidden" }}>
      <Navbar />

      {/* ── HERO ────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          paddingTop: 160,
          paddingBottom: 120,
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Grid overlay */}
        <div
          className="grid-overlay"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        />
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 62% 52% at 50% 40%, rgba(59,130,246,0.12) 0%, transparent 62%)",
            pointerEvents: "none",
          }}
        />
        {/* Orbs */}
        {[
          { w: 340, h: 340, top: "8%", left: "6%", anim: "float 10s ease-in-out infinite", delay: "0s" },
          { w: 260, h: 260, top: "20%", right: "5%", anim: "float2 12s ease-in-out infinite", delay: "1.5s" },
          { w: 180, h: 180, bottom: "15%", left: "18%", anim: "float 14s ease-in-out infinite", delay: "3s" },
          { w: 220, h: 220, bottom: "10%", right: "14%", anim: "float2 11s ease-in-out infinite", delay: "0.8s" },
          { w: 140, h: 140, top: "50%", left: "50%", anim: "float3 9s ease-in-out infinite", delay: "2s" },
        ].map((o, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: o.w,
              height: o.h,
              top: (o as any).top,
              bottom: (o as any).bottom,
              left: (o as any).left,
              right: (o as any).right,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
              filter: "blur(9px)",
              animation: o.anim,
              animationDelay: o.delay,
              pointerEvents: "none",
            }}
          />
        ))}

        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(59,130,246,0.10)",
              border: "1px solid rgba(59,130,246,0.3)",
              color: "#3B82F6",
              borderRadius: 99,
              padding: "6px 16px",
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 28,
            }}
          >
            <span style={{ fontSize: 14 }}>⚡</span>
            Powered by Claude AI
          </div>

          {/* H1 */}
          <h1
            className="font-syne"
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "var(--text-primary)",
              marginBottom: 24,
              letterSpacing: "-0.03em",
            }}
          >
            Property listings in{" "}
            <span className="gradient-text">30 seconds.</span>
            <br />
            Not 3 hours.
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              maxWidth: 520,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            ListifyPH generates professional listing descriptions, Facebook posts, ad copy,
            and Instagram captions — instantly.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
            <Link
              href="/signup"
              className="btn-gradient"
              style={{
                padding: "14px 32px",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Try for free
            </Link>
            <a
              href="#how-it-works"
              style={{
                padding: "14px 32px",
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 15,
                color: "var(--text-primary)",
                background: "transparent",
                border: "1px solid rgba(148,163,184,0.15)",
                textDecoration: "none",
                transition: "border-color 0.25s, color 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(148,163,184,0.15)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
              }}
            >
              See how it works
            </a>
          </div>

          {/* Stats bar */}
          <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            50+ agents saving time
            <span style={{ margin: "0 10px", opacity: 0.4 }}>·</span>
            No credit card
            <span style={{ margin: "0 10px", opacity: 0.4 }}>·</span>
            Free to start
          </p>

          {/* Demo card */}
          <div
            className="reveal"
            style={{
              marginTop: 64,
              background: "var(--bg-card)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 16,
              boxShadow: "0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
              padding: "28px 32px",
              textAlign: "left",
              maxWidth: 620,
              margin: "64px auto 0",
            }}
          >
            {/* Traffic lights */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {["#FF5F57","#FEBC2E","#28C840"].map((c) => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Property", value: "2BR Condo, BGC Taguig" },
                { label: "Price", value: "₱8,500,000" },
                { label: "Style", value: "Storytelling" },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", gap: 16 }}>
                  <span style={{ fontSize: 13, color: "var(--text-secondary)", width: 80, flexShrink: 0 }}>{label}:</span>
                  <span style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 500 }}>{value}</span>
                </div>
              ))}

              <div
                style={{
                  borderTop: "1px solid rgba(148,163,184,0.1)",
                  paddingTop: 16,
                  marginTop: 4,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "var(--accent)",
                    fontSize: 12,
                    fontWeight: 700,
                    marginBottom: 10,
                    background: "rgba(59,130,246,0.12)",
                    padding: "4px 12px",
                    borderRadius: 99,
                  }}
                >
                  ⚡ Generated in 2.3s
                </div>
                <p
                  ref={typingRef}
                  style={{
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    minHeight: 60,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────── */}
      <section
        id="features"
        style={{ background: "var(--bg-surface)", padding: "100px 24px", position: "relative" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 50% 40% at 80% 50%, rgba(59,130,246,0.06) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "var(--accent)",
                textShadow: "0 0 18px rgba(59,130,246,0.5)",
                marginBottom: 16,
              }}
            >
              What you get
            </p>
            <h2
              className="font-syne"
              style={{
                fontSize: "clamp(1.75rem, 3.8vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: 16,
                letterSpacing: "-0.02em",
              }}
            >
              One input. Four types of content.
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: 480, margin: "0 auto" }}>
              Stop writing the same property from scratch for every platform. ListifyPH does it all at once.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {features.map(({ icon: Icon, title, desc }, idx) => (
              <FeatureCard key={title} Icon={Icon} title={title} desc={desc} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────── */}
      <section
        id="how-it-works"
        style={{ background: "var(--bg-primary)", padding: "100px 24px" }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "var(--accent)",
                textShadow: "0 0 18px rgba(59,130,246,0.5)",
                marginBottom: 16,
              }}
            >
              Process
            </p>
            <h2
              className="font-syne"
              style={{
                fontSize: "clamp(1.75rem, 3.8vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: 14,
              }}
            >
              From property to post in 3 steps
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              No training. No templates. Just fill, choose, and copy.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
              position: "relative",
            }}
          >
            {steps.map(({ n, title, desc }, idx) => (
              <StepCard key={n} n={n} title={title} desc={desc} delay={idx * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* ── AD STYLES ───────────────────────────────────── */}
      <section style={{ background: "var(--bg-surface)", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "var(--accent)",
                textShadow: "0 0 18px rgba(59,130,246,0.5)",
                marginBottom: 16,
              }}
            >
              Ad Styles
            </p>
            <h2
              className="font-syne"
              style={{
                fontSize: "clamp(1.75rem, 3.8vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: 14,
              }}
            >
              Match the style to the property
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: 480, margin: "0 auto" }}>
              Four proven ad frameworks, each designed for a different type of buyer and listing.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {adStyles.map(({ name, tag, tagColor, tagBg, desc }, idx) => (
              <AdCard key={name} name={name} tag={tag} tagColor={tagColor} tagBg={tagBg} desc={desc} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────── */}
      <section
        id="pricing"
        style={{ background: "var(--bg-primary)", padding: "100px 24px", position: "relative" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(59,130,246,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "var(--accent)",
                textShadow: "0 0 18px rgba(59,130,246,0.5)",
                marginBottom: 16,
              }}
            >
              Pricing
            </p>
            <h2
              className="font-syne"
              style={{
                fontSize: "clamp(1.75rem, 3.8vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: 14,
              }}
            >
              Simple, transparent pricing
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Start free. Upgrade when you are ready to scale.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              alignItems: "start",
            }}
          >
            {plans.map((plan, idx) => (
              <PricingCard key={plan.name} plan={plan} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────── */}
      <section style={{ background: "var(--bg-surface)", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "var(--accent)",
                textShadow: "0 0 18px rgba(59,130,246,0.5)",
                marginBottom: 16,
              }}
            >
              Testimonials
            </p>
            <h2
              className="font-syne"
              style={{
                fontSize: "clamp(1.75rem, 3.8vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Trusted by agents across the Philippines
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: 24,
            }}
          >
            {testimonials.map(({ name, role, body, initials, grad }, idx) => (
              <TestimonialCard key={name} name={name} role={role} body={body} initials={initials} grad={grad} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, #0a1628 0%, var(--bg-primary) 100%)",
          padding: "120px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Large glow orb */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            filter: "blur(32px)",
            pointerEvents: "none",
          }}
        />
        <div className="reveal" style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
          <h2
            className="font-syne"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: 18,
            }}
          >
            Start writing listings in 30 seconds
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, marginBottom: 40 }}>
            Try free — no credit card needed
          </p>
          <Link
            href="/signup"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#0F172A",
              padding: "16px 44px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              transition: "transform 0.25s, box-shadow 0.25s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Get started for free
          </Link>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer
        className="dot-grid"
        style={{
          background: "#030609",
          borderTop: "1px solid rgba(148,163,184,0.08)",
          position: "relative",
        }}
      >
        {/* Gradient top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, #1D4ED8, #3B82F6)",
          }}
        />
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            padding: "48px 24px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/logo.svg" alt="ListifyPH" style={{ height: 32, width: "auto" }} />
            <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>— Write less. Sell more.</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms" },
              { href: "mailto:joelgacho.ffseo@gmail.com", label: "Contact" },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text-primary)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-secondary)")}
              >
                {label}
              </a>
            ))}
          </div>

          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>© 2026 ListifyPH</div>
        </div>
      </footer>
    </div>
  );
}

/* ── sub-components ───────────────────────────────────── */

function FeatureCard({ Icon, title, desc, delay }: { Icon: any; title: string; desc: string; delay: number }) {
  return (
    <div
      className="reveal"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "40px 36px",
        transition: "transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
        transitionDelay: `${delay}s`,
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-10px)";
        el.style.borderColor = "var(--accent)";
        el.style.boxShadow = "0 28px 64px rgba(59,130,246,0.14)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "var(--border)";
        el.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Icon size={24} color="white" />
      </div>
      <h3
        className="font-syne"
        style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}

function StepCard({ n, title, desc, delay }: { n: string; title: string; desc: string; delay: number }) {
  return (
    <div
      className="reveal"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: 32,
        position: "relative",
        overflow: "hidden",
        transitionDelay: `${delay}s`,
      }}
    >
      {/* Ghost number */}
      <span
        className="font-syne"
        style={{
          position: "absolute",
          top: 12,
          right: 18,
          fontSize: "4.5rem",
          fontWeight: 800,
          color: "rgba(255,255,255,0.04)",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {n}
      </span>
      <span
        className="font-syne gradient-text"
        style={{ fontSize: "3.5rem", fontWeight: 800, display: "block", marginBottom: 16 }}
      >
        {n}
      </span>
      <h3
        className="font-syne"
        style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}

function AdCard({ name, tag, tagColor, tagBg, desc, delay }: {
  name: string; tag: string; tagColor: string; tagBg: string; desc: string; delay: number;
}) {
  return (
    <div
      className="reveal"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "28px 28px 32px",
        transition: "transform 0.35s ease, border-color 0.35s ease",
        transitionDelay: `${delay}s`,
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-8px)";
        el.style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "var(--border)";
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <h3 className="font-syne" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
          {name}
        </h3>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: tagColor,
            background: tagBg,
            padding: "3px 10px",
            borderRadius: 99,
          }}
        >
          {tag}
        </span>
      </div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}

function PricingCard({ plan, delay }: { plan: typeof plans[0]; delay: number }) {
  const { name, price, period, badge, features: f, cta, highlight } = plan;
  return (
    <div
      className="reveal"
      style={{
        background: highlight
          ? "linear-gradient(135deg, #0f2460 0%, #0c1a40 100%)"
          : "var(--bg-card)",
        border: highlight
          ? "2px solid rgba(59,130,246,0.6)"
          : "1px solid var(--border)",
        borderRadius: 16,
        padding: "40px 36px",
        boxShadow: highlight ? "0 0 60px rgba(59,130,246,0.2)" : "none",
        position: "relative",
        transitionDelay: `${delay}s`,
        transform: highlight ? "scale(1.04)" : "scale(1)",
      }}
    >
      {badge && (
        <div
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 14px",
            borderRadius: 99,
            marginBottom: 18,
          }}
        >
          {badge}
        </div>
      )}
      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 8, letterSpacing: "2px" }}>
        {name}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 28 }}>
        <span
          className={highlight ? "font-syne gradient-text" : "font-syne"}
          style={{ fontSize: "3rem", fontWeight: 800, color: highlight ? undefined : "var(--text-primary)" }}
        >
          {price}
        </span>
        <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{period}</span>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 12 }}>
        {f.map((feat) => (
          <li key={feat} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "rgba(34,197,94,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 10,
                color: "#22C55E",
              }}
            >
              ✓
            </span>
            <span style={{ color: "var(--text-secondary)" }}>{feat}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/signup"
        className={highlight ? "btn-gradient" : ""}
        style={{
          display: "block",
          textAlign: "center",
          padding: "13px 24px",
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 14,
          textDecoration: "none",
          border: highlight ? "none" : "1px solid rgba(148,163,184,0.15)",
          color: highlight ? "#fff" : "var(--text-primary)",
          transition: "border-color 0.25s, color 0.25s",
        }}
      >
        {cta}
      </Link>
    </div>
  );
}

function TestimonialCard({ name, role, body, initials, grad, delay }: {
  name: string; role: string; body: string; initials: string; grad: string; delay: number;
}) {
  return (
    <div
      className="reveal"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: 32,
        position: "relative",
        transition: "transform 0.35s ease, border-color 0.35s ease",
        transitionDelay: `${delay}s`,
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-4px)";
        el.style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "var(--border)";
      }}
    >
      {/* Quote mark */}
      <div
        className="font-syne"
        style={{
          fontSize: "4rem",
          lineHeight: 1,
          color: "var(--accent)",
          opacity: 0.18,
          position: "absolute",
          top: 16,
          left: 24,
          userSelect: "none",
        }}
      >
        "
      </div>
      {/* Stars */}
      <div style={{ display: "flex", gap: 3, marginBottom: 16, marginTop: 8 }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: "var(--accent)", fontSize: 14 }}>★</span>
        ))}
      </div>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 24 }}>
        "{body}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: grad,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 800,
            color: "#fff",
          }}
        >
          {initials}
        </div>
        <div>
          <div className="font-syne" style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{name}</div>
          <div style={{ fontSize: 12, color: "var(--accent)" }}>{role}</div>
        </div>
      </div>
    </div>
  );
}
