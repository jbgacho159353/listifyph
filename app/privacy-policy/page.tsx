"use client";
import Link from "next/link";
import Navbar from "@/components/navbar";

const sections = [
  {
    title: "1. Introduction",
    content: `ListifyPH ("we", "our", "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your data when you use our AI-powered property listing platform at listifyph.com.

By creating an account and using ListifyPH, you consent to the practices described in this policy.`,
  },
  {
    title: "2. Information We Collect",
    content: "",
    list: [
      "Email address and name (collected on signup)",
      "Property listing data you enter into the generator",
      "Generated content saved to your account history",
      "Payment information — processed and stored by PayMongo, not by us",
      "Usage data and analytics to improve the platform",
      "Device and browser information for security purposes",
    ],
  },
  {
    title: "3. How We Use Your Information",
    content: "We use the information we collect to:",
    list: [
      "Provide and maintain the ListifyPH service",
      "Process your payments securely via PayMongo",
      "Send transactional and account emails via Resend",
      "Improve the quality of our AI-generated content",
      "Send product updates and announcements (you may opt out at any time)",
      "Detect and prevent fraudulent or abusive activity",
    ],
  },
  {
    title: "4. Data Storage & Security",
    content: "",
    list: [
      "All data is stored securely on Supabase infrastructure",
      "Servers are located in Southeast Asia for low-latency access",
      "We use industry-standard encryption (TLS) for all data in transit",
      "We never sell your personal data to third parties",
      "Payment data is handled exclusively by PayMongo, which is PCI-DSS compliant",
      "We conduct regular security reviews of our systems",
    ],
  },
  {
    title: "5. AI & Generated Content",
    content: "When you generate content using ListifyPH:",
    list: [
      "Property details you enter are transmitted to Anthropic's Claude API for AI processing",
      "Anthropic's privacy policy applies to this processing — see anthropic.com/privacy",
      "We do not store your prompts beyond what is necessary to generate and save your listings",
      "Generated content is stored in your account so you can access it later",
      "We may use aggregated, anonymised usage patterns to improve our system prompts",
    ],
  },
  {
    title: "6. Cookies",
    content: "",
    list: [
      "We use essential cookies for authentication and session management",
      "We do not use advertising, tracking, or third-party analytics cookies",
      "You can disable cookies in your browser settings, but this may affect functionality",
      "Our cookies do not contain personally identifiable information",
    ],
  },
  {
    title: "7. Your Rights",
    content: "You have the following rights regarding your personal data:",
    list: [
      "Access — request a copy of all personal data we hold about you",
      "Deletion — delete your account and all associated data at any time",
      "Export — download your full listing history in a portable format",
      "Correction — update or correct any inaccurate personal information",
      "Opt-out — unsubscribe from marketing emails at any time",
      "Contact us at joelgacho.ffseo@gmail.com to exercise any of these rights",
    ],
  },
  {
    title: "8. Third-Party Services",
    content: "We work with the following trusted third-party services to operate ListifyPH:",
    list: [
      "Supabase — database storage and user authentication",
      "Anthropic Claude API — AI content generation",
      "PayMongo — secure payment processing (GCash, Maya, credit/debit cards)",
      "Resend — transactional email delivery",
      "Vercel — platform hosting and deployment",
    ],
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons.

We will notify you of any significant changes via email to the address associated with your account. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of ListifyPH after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:

Joel B. Gacho
ListifyPH
Bacolod City, Negros Occidental, Philippines
joelgacho.ffseo@gmail.com

We will respond to all privacy-related inquiries within 5 business days.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#050914", color: "#F0F4FF" }}>
      <Navbar />

      <main style={{ paddingTop: 120, paddingBottom: 100, padding: "120px 24px 100px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>

          {/* Back link + header */}
          <div style={{ marginBottom: 56 }}>
            <Link href="/"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#7A8BA8", fontSize: 13, textDecoration: "none", marginBottom: 32, transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#F0F4FF"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "#7A8BA8"}
            >
              ← Back to home
            </Link>
            <h1 className="font-syne" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, color: "#F0F4FF", letterSpacing: "-0.02em", marginBottom: 12 }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: 14, color: "#7A8BA8" }}>Last updated: June 8, 2026</p>
          </div>

          {/* Callout */}
          <div style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 12, padding: "18px 22px", marginBottom: 52, fontSize: 14, color: "#7A8BA8", lineHeight: 1.75 }}>
            Your privacy matters to us. We built ListifyPH to help real estate agents work smarter — and we handle your data with the same care you put into every listing.
          </div>

          {/* Content sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
            {sections.map(({ title, content, list }) => (
              <section key={title}>
                <h2 className="font-syne" style={{ fontSize: "1.05rem", fontWeight: 700, color: "#3B82F6", marginBottom: 14, letterSpacing: "-0.01em" }}>
                  {title}
                </h2>
                {content && (
                  <p style={{ fontSize: 15, color: "#7A8BA8", lineHeight: 1.85, marginBottom: list ? 16 : 0, whiteSpace: "pre-line" }}>
                    {content}
                  </p>
                )}
                {list && (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {list.map((item) => (
                      <li key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6", flexShrink: 0, marginTop: 9 }} />
                        <span style={{ fontSize: 15, color: "#7A8BA8", lineHeight: 1.75 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(148,163,184,0.1) 30%,rgba(148,163,184,0.1) 70%,transparent)", margin: "64px 0 32px" }} />
          <p style={{ fontSize: 13, color: "#7A8BA8", textAlign: "center" }}>
            © 2026 ListifyPH ·{" "}
            <Link href="/terms" style={{ color: "#3B82F6", textDecoration: "none" }}>Terms & Conditions</Link>
          </p>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}

function PageFooter() {
  return (
    <footer className="dot-grid" style={{ background: "#030609", borderTop: "1px solid rgba(148,163,184,0.08)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#1D4ED8,#3B82F6)" }} />
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "48px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/logo.svg" alt="ListifyPH" style={{ height: 32, width: "auto" }} />
          <span style={{ color: "#7A8BA8", fontSize: 13 }}>— Write less. Sell more.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[
            { href: "/privacy-policy", label: "Privacy Policy" },
            { href: "/terms", label: "Terms" },
            { href: "mailto:joelgacho.ffseo@gmail.com", label: "Contact" },
          ].map(({ href, label }) => (
            <a key={label} href={href}
              style={{ fontSize: 13, color: "#7A8BA8", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = "#F0F4FF"}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = "#7A8BA8"}
            >{label}</a>
          ))}
        </div>
        <div style={{ fontSize: 13, color: "#7A8BA8" }}>© 2026 ListifyPH</div>
      </div>
    </footer>
  );
}
