"use client";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { useEffect, useRef, useState } from "react";
import { FileText, Share2, Target, Camera } from "lucide-react";

/* ── data ─────────────────────────────────────────────── */
const features = [
  { icon: FileText, title: "Listing Description", desc: "SEO-optimised property descriptions that convert browsers into buyers.", num: "01" },
  { icon: Share2,   title: "Facebook Post",        desc: "Ready-to-copy Facebook posts with the perfect hook and call to action.",    num: "02" },
  { icon: Target,   title: "Facebook Ad Copy",     desc: "Three variations of high-converting ad copy for paid campaigns.",           num: "03" },
  { icon: Camera,   title: "Instagram Caption",    desc: "Scroll-stopping captions with relevant hashtags for maximum reach.",        num: "04" },
];

const steps = [
  { n: "01", title: "Fill in property details",     desc: "Enter location, price, size, amenities — takes under a minute." },
  { n: "02", title: "Choose language & style",       desc: "English, Filipino, or both. Pick storytelling, direct, FOMO, or investment." },
  { n: "03", title: "Copy and post instantly",       desc: "Four types of content generated in 30 seconds. Ready to use." },
];

const adStyles = [
  { name: "Storytelling",    tag: "Luxury",      tagColor: "#3B82F6", tagBg: "rgba(59,130,246,0.15)",  desc: "Paint a picture of the buyer's future life. Open with a scene, build desire, then reveal the property." },
  { name: "Direct Response", tag: "Fast Sale",   tagColor: "#F97316", tagBg: "rgba(249,115,22,0.15)",  desc: "Lead with the strongest benefit. Bullet points. Urgency. Best for foreclosed properties." },
  { name: "FOMO",            tag: "Pre-Selling", tagColor: "#A855F7", tagBg: "rgba(168,85,247,0.15)",  desc: 'Emphasize scarcity and exclusivity. "Only X units left." "Prices going up next month."' },
  { name: "Investment Pitch",tag: "Investors",   tagColor: "#22C55E", tagBg: "rgba(34,197,94,0.15)",   desc: "Focus on ROI, rental income, capital appreciation, and location value data." },
];

const plans = [
  { name: "FREE",   price: "₱0",     period: "/mo", num: "01", badge: "Start free",  badgeGreen: true,  features: ["3 generations/month","Listing description only","English only"],                                              cta: "Get started", highlight: false },
  { name: "PRO",    price: "₱499",   period: "/mo", num: "02", badge: "Most Popular", badgeGreen: false, features: ["Unlimited generations","All 4 content types","English + Filipino","All ad styles","Full listing history"], cta: "Start Pro",    highlight: true  },
  { name: "AGENCY", price: "₱1,499", period: "/mo", num: "03", badge: undefined,      badgeGreen: false, features: ["Everything in Pro","5 team members","Bulk generation","Priority support"],                                cta: "Contact us",  highlight: false },
];

const testimonials = [
  { name: "Maria Santos",   role: "Real Estate Broker, Quezon City", body: "I used to spend 2 hours writing one listing. Now I generate 10 listings in the same time. ListifyPH is a game-changer.",                      initials: "MS", grad: "linear-gradient(135deg,#1D4ED8,#3B82F6)" },
  { name: "Carlo Reyes",    role: "Property Developer, BGC",         body: "The Filipino version feature is brilliant. My clients respond so much better to Tagalog copy. Sales conversions are up 40%.",                  initials: "CR", grad: "linear-gradient(135deg,#7C3AED,#A855F7)" },
  { name: "Ana Dela Cruz",  role: "Solo Agent, Cebu",                body: "As a one-person team I needed to scale. ListifyPH lets me look like a full marketing agency. Worth every peso.",                               initials: "AD", grad: "linear-gradient(135deg,#059669,#10B981)" },
];

const stats = [
  { value: 50,   suffix: "+",    label: "Active Agents" },
  { value: 1000, suffix: "+",    label: "Listings Generated" },
  { value: 3,    suffix: " hrs", label: "Saved Per Agent" },
  { value: 4,    suffix: "",     label: "Content Types" },
];

const marqueeItems = [
  "✓ Agents from BGC","✓ Makati","✓ Cebu","✓ Davao","✓ Bacolod",
  "✓ Quezon City","✓ Taguig","✓ Pasig","✓ Mandaluyong",
  "✓ Paranaque","✓ Las Pinas","✓ Antipolo","✓ Iloilo","✓ Cagayan de Oro",
];

const faqs = [
  { q: "Is ListifyPH free to use?",             a: "Yes! We have a free plan that gives you 3 listing description generations per month — no credit card required. Upgrade to Pro when you're ready for unlimited access and all content types." },
  { q: "What types of content can I generate?", a: "ListifyPH generates four types: listing descriptions (SEO-optimised), Facebook posts, Facebook ad copy (3 variations), and Instagram captions. All from a single property input." },
  { q: "Can it write in Filipino (Tagalog)?",   a: "Absolutely. Pro and Agency subscribers can generate content in English, Filipino (Tagalog), or both at once. Great for reaching local buyers in their preferred language." },
  { q: "How accurate is AI-generated content?", a: "The AI generates compelling, professional content based on the details you provide. Always review and verify property details like price and size before publishing." },
  { q: "Can I cancel my subscription anytime?", a: "Yes, anytime from your Settings page. Your subscription stays active until the end of the billing period, then reverts to free. No penalties, no questions asked." },
  { q: "What payment methods are accepted?",    a: "Payments are processed by PayMongo. We accept GCash, Maya, and all major credit and debit cards (Visa, Mastercard)." },
  { q: "Is my property data kept private?",     a: "Yes. Property details you enter are used only to generate your content. We don't share or sell your data. All data is encrypted and stored on Supabase infrastructure." },
  { q: "Can I use this for pre-selling?",       a: "Yes — ListifyPH includes a FOMO ad style specifically for pre-selling and off-plan properties. It emphasises scarcity, exclusivity, and upcoming price increases to drive inquiries." },
];

const demoTabs = [
  {
    label: "Listing",
    content: "Imagine waking up to a panoramic view of the BGC skyline. This stunning 2-bedroom, 2-bathroom condo at The Fort Residences is the life you've been working toward. Every detail — from floor-to-ceiling windows framing the city lights to the Italian marble kitchen — whispers of quiet luxury. Fully fitted and move-in ready. Priced at ₱8,500,000, this is your moment to own a piece of BGC's most coveted address before prices move higher.",
  },
  {
    label: "Facebook",
    content: "🏙️ BGC CONDO ALERT — ₱8.5M only!\n\n2BR at The Fort Residences, Taguig — now available.\n\n✅ Panoramic BGC skyline views\n✅ Fully fitted & move-in ready\n✅ Steps from BGC High Street & Bonifacio Stopover\n✅ Flexible payment terms available\n\nThis one won't sit long. DM me for a private viewing today 🔑\n\n#BGCCondo #RealEstatePH #CondoForSale #ListifyPH",
  },
  {
    label: "Ad Copy",
    content: "STOP RENTING. Own the BGC skyline.\n\nThis 2BR condo at The Fort is everything you've been waiting for — and at ₱8.5M, it won't last long.\n\n→ Panoramic views you'll never get tired of\n→ Italian marble finishes throughout\n→ Prime BGC location, zero compromise\n→ Flexible payment terms\n\nOnly serious inquiries. Book your private viewing now.",
  },
  {
    label: "Instagram",
    content: "Life looks different from the 28th floor. ✨\n\nThis 2BR at The Fort, BGC is available now — and it's everything. Floor-to-ceiling windows. Italian marble kitchen. The city glittering at your feet every single night.\n\n₱8.5M · Move-in ready · Fully fitted\n\nDM for a private tour 🏙️\n\n#BGCLiving #CondoForSale #RealEstatePH #ManilaCondo #ListifyPH #PropertyPH #BGCCondo",
  },
];

/* ── hooks ────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── page ─────────────────────────────────────────────── */
export default function LandingPage() {
  useReveal();
  const [activeTab, setActiveTab] = useState(0);
  const typingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const text = demoTabs[activeTab].content;
    let i = 0;
    const el = typingRef.current;
    if (!el) return;
    el.textContent = "";
    const timer = setInterval(() => {
      if (i < text.length) { el.textContent += text[i]; i++; }
      else clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [activeTab]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", overflowX: "hidden" }}>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────── */}
      <section style={{ position: "relative", paddingTop: 172, paddingBottom: 128, textAlign: "center", overflow: "hidden" }}>
        <div className="grid-overlay" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 62% 52% at 50% 38%, rgba(59,130,246,0.13) 0%, transparent 62%)", pointerEvents: "none" }} />

        {[
          { w:340, h:340, top:"8%",   left:"6%",   anim:"float 10s ease-in-out infinite",  delay:"0s"   },
          { w:260, h:260, top:"20%",  right:"5%",  anim:"float2 12s ease-in-out infinite", delay:"1.5s" },
          { w:180, h:180, bottom:"15%",left:"18%", anim:"float 14s ease-in-out infinite",  delay:"3s"   },
          { w:220, h:220, bottom:"10%",right:"14%",anim:"float2 11s ease-in-out infinite", delay:"0.8s" },
          { w:140, h:140, top:"50%",  left:"50%",  anim:"float3 9s ease-in-out infinite",  delay:"2s"   },
        ].map((o, i) => (
          <div key={i} style={{ position:"absolute", width:o.w, height:o.h, top:(o as any).top, bottom:(o as any).bottom, left:(o as any).left, right:(o as any).right, borderRadius:"50%", background:"radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)", filter:"blur(9px)", animation:o.anim, animationDelay:o.delay, pointerEvents:"none" }} />
        ))}

        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(59,130,246,0.10)", border:"1px solid rgba(59,130,246,0.3)", color:"#3B82F6", borderRadius:99, padding:"6px 18px", fontSize:12, fontWeight:600, marginBottom:32 }}>
            <span style={{ fontSize:14 }}>⚡</span>Powered by Claude AI
          </div>

          <h1 className="font-syne" style={{ fontSize:"clamp(2.8rem, 5.5vw, 5rem)", fontWeight:800, lineHeight:1.08, color:"var(--text-primary)", marginBottom:28, letterSpacing:"-0.03em" }}>
            Property listings in{" "}
            <span className="animated-underline">30 seconds.</span>
            <br />Not 3 hours.
          </h1>

          <p style={{ fontSize:"1.15rem", color:"var(--text-secondary)", maxWidth:540, margin:"0 auto 44px", lineHeight:1.75 }}>
            ListifyPH generates professional listing descriptions, Facebook posts, ad copy,
            and Instagram captions — instantly.
          </p>

          <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap", marginBottom:32 }}>
            <Link href="/signup" className="btn-gradient" style={{ padding:"15px 36px", borderRadius:12, fontWeight:700, fontSize:15, textDecoration:"none" }}>
              Try for free
            </Link>
            <a href="#how-it-works"
              style={{ padding:"15px 36px", borderRadius:12, fontWeight:600, fontSize:15, color:"var(--text-primary)", background:"transparent", border:"1px solid rgba(148,163,184,0.15)", textDecoration:"none", transition:"border-color 0.28s, color 0.28s" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor="var(--accent)"; el.style.color="var(--accent)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor="rgba(148,163,184,0.15)"; el.style.color="var(--text-primary)"; }}
            >See how it works</a>
          </div>

          <p style={{ fontSize:13, color:"var(--text-secondary)", marginBottom:72 }}>
            50+ agents saving time<span style={{ margin:"0 10px", opacity:0.4 }}>·</span>No credit card<span style={{ margin:"0 10px", opacity:0.4 }}>·</span>Free to start
          </p>

          {/* Demo card */}
          <div className="reveal" style={{ background:"var(--bg-card)", border:"1px solid rgba(59,130,246,0.35)", borderRadius:18, boxShadow:"0 0 0 1px rgba(59,130,246,0.12), 0 24px 72px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.05)", padding:32, textAlign:"left", maxWidth:700, margin:"0 auto" }}>
            {/* Traffic lights */}
            <div style={{ display:"flex", gap:8, marginBottom:20 }}>
              {["#FF5F57","#FEBC2E","#28C840"].map((c) => (<div key={c} style={{ width:12, height:12, borderRadius:"50%", background:c }} />))}
            </div>

            {/* Input fields */}
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
              {[{label:"Property",value:"2BR Condo, BGC Taguig"},{label:"Price",value:"₱8,500,000"},{label:"Style",value:"Storytelling"}].map(({label,value}) => (
                <div key={label} style={{ display:"flex", gap:16 }}>
                  <span style={{ fontSize:13, color:"var(--text-secondary)", width:72, flexShrink:0 }}>{label}:</span>
                  <span style={{ fontSize:13, color:"var(--text-primary)", fontWeight:500 }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Output tabs */}
            <div style={{ borderTop:"1px solid rgba(148,163,184,0.1)", paddingTop:20 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:10 }}>
                <div style={{ display:"flex", gap:6 }}>
                  {demoTabs.map((tab, i) => (
                    <button key={tab.label} onClick={() => setActiveTab(i)}
                      style={{ padding:"10px 20px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer", border:"none", transition:"background 0.28s, color 0.28s",
                        background: activeTab === i ? "linear-gradient(135deg,#1D4ED8,#3B82F6)" : "var(--bg-elevated)",
                        color: activeTab === i ? "#fff" : "var(--text-secondary)",
                      }}
                    >{tab.label}</button>
                  ))}
                </div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, color:"var(--accent)", fontSize:12, fontWeight:700, background:"rgba(59,130,246,0.12)", padding:"4px 12px", borderRadius:99 }}>
                  ⚡ Generated in 2.3s
                </div>
              </div>
              <p ref={typingRef} style={{ fontSize:"0.9rem", color:"var(--text-secondary)", lineHeight:1.75, minHeight:80, whiteSpace:"pre-line" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ──────────────────────────── */}
      <div style={{ background:"var(--bg-surface)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"20px 0", overflow:"hidden" }}>
        <div style={{ maskImage:"linear-gradient(to right,transparent,black 10%,black 90%,transparent)", WebkitMaskImage:"linear-gradient(to right,transparent,black 10%,black 90%,transparent)" }}>
          <div style={{ display:"flex", gap:48, animation:"marquee 30s linear infinite", width:"max-content" }}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} style={{ fontSize:13, fontWeight:600, color:"var(--text-secondary)", whiteSpace:"nowrap" }}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ─────────────────────────────────────── */}
      <section style={{ background:"var(--bg-primary)", padding:"80px 24px" }}>
        <div style={{ maxWidth:960, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:24, justifyContent:"center" }}>
          {stats.map(({ value, suffix, label }) => (
            <StatCard key={label} value={value} suffix={suffix} label={label} />
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── FEATURES ──────────────────────────────────── */}
      <section id="features" style={{ background:"var(--bg-surface)", padding:"110px 24px", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 50% 40% at 80% 50%, rgba(59,130,246,0.06) 0%, transparent 60%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1160, margin:"0 auto", position:"relative" }}>
          <SectionHeader label="What you get" title="One input. Four types of content." sub="Stop writing the same property from scratch for every platform. ListifyPH does it all at once." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:28 }}>
            {features.map(({ icon:Icon, title, desc, num }, idx) => (
              <FeatureCard key={title} Icon={Icon} title={title} desc={desc} num={num} delay={idx*0.08} />
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section id="how-it-works" style={{ background:"var(--bg-primary)", padding:"110px 24px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <SectionHeader label="Process" title="From property to post in 3 steps" sub="No training. No templates. Just fill, choose, and copy." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:28 }}>
            {steps.map(({ n, title, desc }, idx) => (
              <StepCard key={n} n={n} title={title} desc={desc} delay={idx*0.12} />
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── BEFORE / AFTER ────────────────────────────── */}
      <section style={{ background:"var(--bg-surface)", padding:"110px 24px" }}>
        <div style={{ maxWidth:1060, margin:"0 auto" }}>
          <SectionHeader label="The Difference" title="Generic AI vs ListifyPH" sub="See what actually happens when you use a tool built specifically for Philippine real estate." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:28 }}>
            <div className="reveal" style={{ background:"rgba(239,68,68,0.04)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:16, padding:"36px 32px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24 }}>
                <span style={{ fontSize:20 }}>❌</span>
                <span className="font-syne" style={{ fontSize:16, fontWeight:700, color:"#EF4444" }}>Generic AI Output</span>
              </div>
              <p style={{ fontSize:14, color:"rgba(240,244,255,0.38)", lineHeight:1.8, marginBottom:28, fontStyle:"italic" }}>
                "This is a 2 bedroom, 2 bathroom condominium unit located in BGC, Taguig. The unit is priced at 8,500,000 pesos. It has a nice view and modern amenities. Contact us for more information."
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 16px", background:"rgba(239,68,68,0.08)", borderRadius:8, fontSize:13, color:"#EF4444", fontWeight:600 }}>
                <span>⏱</span> 20 mins of manual editing needed
              </div>
            </div>
            <div className="reveal" style={{ background:"rgba(59,130,246,0.05)", border:"1px solid rgba(59,130,246,0.25)", borderRadius:16, padding:"36px 32px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24 }}>
                <span style={{ fontSize:20 }}>✅</span>
                <span className="font-syne" style={{ fontSize:16, fontWeight:700, color:"#3B82F6" }}>ListifyPH Output</span>
              </div>
              <p style={{ fontSize:14, color:"rgba(240,244,255,0.78)", lineHeight:1.8, marginBottom:28, fontStyle:"italic" }}>
                "Imagine waking up to a panoramic view of the BGC skyline every single morning. This 2BR at The Fort Residences is the life you've been working toward — floor-to-ceiling windows, Italian marble kitchen, and the city glittering at your feet. Priced at ₱8.5M. Move-in ready. Yours to claim."
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 16px", background:"rgba(59,130,246,0.10)", borderRadius:8, fontSize:13, color:"#3B82F6", fontWeight:600 }}>
                <span>⚡</span> Generated in 2.3 seconds
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── AD STYLES ─────────────────────────────────── */}
      <section style={{ background:"var(--bg-surface)", padding:"110px 24px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <SectionHeader label="Ad Styles" title="Match the style to the property" sub="Four proven ad frameworks, each designed for a different type of buyer and listing." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:28 }}>
            {adStyles.map(({ name, tag, tagColor, tagBg, desc }, idx) => (
              <AdCard key={name} name={name} tag={tag} tagColor={tagColor} tagBg={tagBg} desc={desc} delay={idx*0.08} />
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── PRICING ───────────────────────────────────── */}
      <section id="pricing" style={{ background:"var(--bg-primary)", padding:"110px 24px", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 50% at 50% 60%, rgba(59,130,246,0.08) 0%, transparent 65%)", pointerEvents:"none" }} />
        <div style={{ maxWidth:1060, margin:"0 auto", position:"relative" }}>
          <SectionHeader label="Pricing" title="Simple, transparent pricing" sub="Start free. Upgrade when you are ready to scale." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(290px, 1fr))", gap:28, alignItems:"start" }}>
            {plans.map((plan, idx) => (
              <PricingCard key={plan.name} plan={plan} delay={idx*0.08} />
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"center", marginTop:52 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.2)", color:"#22C55E", borderRadius:99, padding:"12px 28px", fontSize:14, fontWeight:600 }}>
              🛡️ 30-day satisfaction guarantee · Cancel anytime · No questions asked
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── TESTIMONIALS ──────────────────────────────── */}
      <section style={{ background:"var(--bg-surface)", padding:"110px 24px" }}>
        <div style={{ maxWidth:1060, margin:"0 auto" }}>
          <SectionHeader label="Testimonials" title="Trusted by agents across the Philippines" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(290px, 1fr))", gap:28 }}>
            {testimonials.map(({ name, role, body, initials, grad }, idx) => (
              <TestimonialCard key={name} name={name} role={role} body={body} initials={initials} grad={grad} delay={idx*0.08} />
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── FAQ ───────────────────────────────────────── */}
      <section style={{ background:"var(--bg-primary)", padding:"110px 24px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <SectionHeader label="FAQ" title="Frequently asked questions" sub="Everything you need to know about ListifyPH." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(380px, 1fr))", gap:16 }}>
            {faqs.map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ── CTA ───────────────────────────────────────── */}
      <section style={{ background:"radial-gradient(ellipse 70% 60% at 50% 50%, #0a1628 0%, var(--bg-primary) 100%)", padding:"128px 24px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", width:560, height:560, borderRadius:"50%", background:"radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", filter:"blur(40px)", pointerEvents:"none" }} />
        <div className="reveal" style={{ position:"relative", maxWidth:640, margin:"0 auto" }}>
          <h2 className="font-syne" style={{ fontSize:"clamp(2rem, 4.5vw, 3.4rem)", fontWeight:800, color:"#fff", letterSpacing:"-0.03em", marginBottom:20 }}>
            Start writing listings in 30 seconds
          </h2>
          <p style={{ color:"var(--text-secondary)", fontSize:16, marginBottom:44 }}>Try free — no credit card needed</p>
          <Link href="/signup" className="btn-gradient"
            style={{ display:"inline-block", padding:"17px 48px", borderRadius:12, fontWeight:700, fontSize:15, textDecoration:"none" }}
          >Get started for free</Link>
        </div>
      </section>

      {/* ── WHATSAPP BUTTON ───────────────────────────── */}
      <a href="https://wa.me/639666358012?text=Hi%20Joel!%20I%27m%20interested%20in%20ListifyPH"
        target="_blank" rel="noopener noreferrer"
        title="Chat with us on WhatsApp"
        style={{ position:"fixed", bottom:28, left:28, zIndex:100, width:56, height:56, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", animation:"waPulse 2.5s ease-in-out infinite", textDecoration:"none", cursor:"pointer" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ── FOOTER ────────────────────────────────────── */}
      <footer className="dot-grid" style={{ background:"#030609", borderTop:"1px solid rgba(148,163,184,0.08)", position:"relative" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#1D4ED8,#3B82F6)" }} />
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"52px 24px", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <img src="/logo.svg" alt="ListifyPH" style={{ height:34, width:"auto" }} />
            <span style={{ color:"var(--text-secondary)", fontSize:13 }}>— Write less. Sell more.</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:28 }}>
            {[{href:"/privacy-policy",label:"Privacy Policy"},{href:"/terms",label:"Terms"},{href:"mailto:joelgacho.ffseo@gmail.com",label:"Contact"}].map(({ href, label }) => (
              <a key={label} href={href}
                style={{ fontSize:13, color:"var(--text-secondary)", textDecoration:"none", transition:"color 0.28s" }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.color="var(--text-primary)"}
                onMouseLeave={(e) => (e.target as HTMLElement).style.color="var(--text-secondary)"}
              >{label}</a>
            ))}
          </div>
          <div style={{ fontSize:13, color:"var(--text-secondary)" }}>© 2026 ListifyPH</div>
        </div>
      </footer>
    </div>
  );
}

/* ── shared section header ────────────────────────────── */
function SectionHeader({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div className="reveal" style={{ textAlign:"center", marginBottom:70 }}>
      <p style={{ fontSize:"0.72rem", fontWeight:700, letterSpacing:"4px", textTransform:"uppercase", color:"var(--accent)", textShadow:"0 0 24px rgba(59,130,246,0.7)", marginBottom:18 }}>
        {label}
      </p>
      <h2 className="font-syne" style={{ fontSize:"clamp(1.75rem, 3.8vw, 2.6rem)", fontWeight:700, color:"var(--text-primary)", letterSpacing:"-0.02em", marginBottom: sub ? 16 : 0 }}>
        {title}
      </h2>
      {sub && <p style={{ color:"var(--text-secondary)", maxWidth:500, margin:"0 auto", lineHeight:1.7 }}>{sub}</p>}
    </div>
  );
}

/* ── feature card ─────────────────────────────────────── */
function FeatureCard({ Icon, title, desc, num, delay }: { Icon: any; title: string; desc: string; num: string; delay: number }) {
  return (
    <div className="reveal"
      style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:"40px 36px", transition:"transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease", transitionDelay:`${delay}s`, cursor:"default", position:"relative", overflow:"hidden" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform="translateY(-10px)"; el.style.borderColor="var(--accent)";
        el.style.boxShadow="0 28px 64px rgba(59,130,246,0.14), 0 0 0 1px rgba(59,130,246,0.2)";
        const bar = el.querySelector(".feat-bar") as HTMLElement;
        if (bar) bar.style.transform="scaleX(1)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform="translateY(0)"; el.style.borderColor="var(--border)";
        el.style.boxShadow="none";
        const bar = el.querySelector(".feat-bar") as HTMLElement;
        if (bar) bar.style.transform="scaleX(0)";
      }}
    >
      {/* Gradient top bar */}
      <div className="feat-bar" style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#1D4ED8,#3B82F6)", transform:"scaleX(0)", transformOrigin:"left", transition:"transform 0.45s ease", borderRadius:"14px 14px 0 0" }} />
      {/* Ghost number */}
      <span className="font-syne" style={{ position:"absolute", top:12, right:18, fontSize:"4rem", fontWeight:800, color:"rgba(255,255,255,0.08)", lineHeight:1, userSelect:"none" }}>{num}</span>
      {/* Icon */}
      <div style={{ width:72, height:72, borderRadius:"50%", background:"linear-gradient(135deg,#1D4ED8,#3B82F6)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22 }}>
        <Icon size={28} color="white" />
      </div>
      <h3 className="font-syne" style={{ fontSize:"1.1rem", fontWeight:700, color:"var(--text-primary)", marginBottom:10 }}>{title}</h3>
      <p style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.7 }}>{desc}</p>
    </div>
  );
}

/* ── step card ────────────────────────────────────────── */
function StepCard({ n, title, desc, delay }: { n: string; title: string; desc: string; delay: number }) {
  return (
    <div className="reveal"
      style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:36, position:"relative", overflow:"hidden", transitionDelay:`${delay}s` }}
    >
      <span className="font-syne" style={{ position:"absolute", top:12, right:18, fontSize:"4.5rem", fontWeight:800, color:"rgba(255,255,255,0.04)", lineHeight:1, userSelect:"none" }}>{n}</span>
      <span className="font-syne gradient-text" style={{ fontSize:"3.5rem", fontWeight:800, display:"block", marginBottom:18 }}>{n}</span>
      <h3 className="font-syne" style={{ fontSize:"1.1rem", fontWeight:700, color:"var(--text-primary)", marginBottom:10 }}>{title}</h3>
      <p style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.7 }}>{desc}</p>
    </div>
  );
}

/* ── ad card ──────────────────────────────────────────── */
function AdCard({ name, tag, tagColor, tagBg, desc, delay }: { name: string; tag: string; tagColor: string; tagBg: string; desc: string; delay: number }) {
  return (
    <div className="reveal"
      style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:"30px 30px 34px", transition:"transform 0.28s ease, border-color 0.28s ease", transitionDelay:`${delay}s`, cursor:"default" }}
      onMouseEnter={(e) => { const el=e.currentTarget as HTMLElement; el.style.transform="translateY(-8px)"; el.style.borderColor="var(--accent)"; }}
      onMouseLeave={(e) => { const el=e.currentTarget as HTMLElement; el.style.transform="translateY(0)"; el.style.borderColor="var(--border)"; }}
    >
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
        <h3 className="font-syne" style={{ fontSize:"1rem", fontWeight:700, color:"var(--text-primary)" }}>{name}</h3>
        <span style={{ fontSize:11, fontWeight:700, color:tagColor, background:tagBg, padding:"3px 10px", borderRadius:99 }}>{tag}</span>
      </div>
      <p style={{ fontSize:13, color:"var(--text-secondary)", lineHeight:1.7 }}>{desc}</p>
    </div>
  );
}

/* ── pricing card ─────────────────────────────────────── */
function PricingCard({ plan, delay }: { plan: typeof plans[0]; delay: number }) {
  const { name, price, period, num, badge, badgeGreen, features: f, cta, highlight } = plan;
  return (
    <div className="reveal"
      style={{
        background: highlight ? "linear-gradient(135deg,#0f2460 0%,#0c1a40 100%)" : "var(--bg-card)",
        border: highlight ? "2px solid rgba(59,130,246,0.6)" : "1px solid var(--border)",
        borderRadius:16, padding:"40px 32px",
        animation: highlight ? "borderPulse 3s ease-in-out infinite" : "none",
        position:"relative", transitionDelay:`${delay}s`,
        transform: highlight ? "scale(1.04)" : "scale(1)",
        transition:"border-color 0.28s ease, box-shadow 0.28s ease",
      }}
      onMouseEnter={(e) => { if (!highlight) { const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(59,130,246,0.35)"; el.style.boxShadow="0 16px 48px rgba(59,130,246,0.10)"; }}}
      onMouseLeave={(e) => { if (!highlight) { const el=e.currentTarget as HTMLElement; el.style.borderColor="var(--border)"; el.style.boxShadow="none"; }}}
    >
      <span className="font-syne" style={{ position:"absolute", top:14, right:20, fontSize:"3.5rem", fontWeight:800, color:"rgba(255,255,255,0.06)", lineHeight:1, userSelect:"none" }}>{num}</span>
      {badge && (
        <div style={{ display:"inline-block", background: badgeGreen ? "rgba(34,197,94,0.15)" : "linear-gradient(135deg,#1D4ED8,#3B82F6)", color: badgeGreen ? "#22C55E" : "#fff", border: badgeGreen ? "1px solid rgba(34,197,94,0.3)" : "none", fontSize:11, fontWeight:700, padding:"4px 14px", borderRadius:99, marginBottom:18 }}>{badge}</div>
      )}
      <div style={{ fontSize:11, fontWeight:700, color:"var(--text-secondary)", marginBottom:10, letterSpacing:"2px", textTransform:"uppercase" }}>{name}</div>
      <div style={{ display:"flex", alignItems:"baseline", gap:6, marginBottom:8 }}>
        <span className={highlight ? "font-syne gradient-text" : "font-syne"} style={{ fontSize:"3.5rem", fontWeight:800, color:highlight ? undefined : "var(--text-primary)" }}>{price}</span>
        <span style={{ fontSize:13, color:"var(--text-secondary)" }}>{period}</span>
        {highlight && <span style={{ fontSize:11, fontWeight:700, background:"rgba(34,197,94,0.15)", color:"#22C55E", padding:"2px 8px", borderRadius:99, marginLeft:4 }}>Save 20% annually</span>}
      </div>
      <ul style={{ listStyle:"none", padding:0, margin:"20px 0 32px", display:"flex", flexDirection:"column", gap:12 }}>
        {f.map((feat) => (
          <li key={feat} style={{ display:"flex", alignItems:"center", gap:10, fontSize:14 }}>
            <span style={{ width:20, height:20, borderRadius:"50%", background:"rgba(34,197,94,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:11, color:"#22C55E" }}>✓</span>
            <span style={{ color:"var(--text-secondary)" }}>{feat}</span>
          </li>
        ))}
      </ul>
      <Link href="/signup" className={highlight ? "btn-gradient" : ""}
        style={{ display:"block", textAlign:"center", padding:"14px 24px", borderRadius:10, fontWeight:700, fontSize:14, textDecoration:"none", border:highlight ? "none" : "1px solid rgba(148,163,184,0.15)", color:highlight ? "#fff" : "var(--text-primary)", transition:"border-color 0.28s, color 0.28s" }}
      >{cta}</Link>
    </div>
  );
}

/* ── stat card ────────────────────────────────────────── */
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        const steps = 50, stepTime = 1500 / steps, inc = value / steps;
        let cur = 0;
        const timer = setInterval(() => {
          cur = Math.min(cur + inc, value);
          setCount(Math.floor(cur));
          if (cur >= value) clearInterval(timer);
        }, stepTime);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, started]);

  return (
    <div ref={ref} style={{ textAlign:"center", padding:"36px 24px", background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, flex:"1 1 200px" }}>
      <div className="font-syne gradient-text" style={{ fontSize:"2.5rem", fontWeight:800, lineHeight:1.1, marginBottom:10 }}>
        {count >= 1000 ? count.toLocaleString() : count}{suffix}
      </div>
      <div style={{ fontSize:14, color:"var(--text-secondary)", fontWeight:500 }}>{label}</div>
    </div>
  );
}

/* ── faq item ─────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background:"var(--bg-card)", border:`1px solid ${open ? "rgba(59,130,246,0.4)" : "var(--border)"}`, borderRadius:12, overflow:"hidden", transition:"border-color 0.28s" }}>
      <button onClick={() => setOpen(!open)}
        style={{ width:"100%", textAlign:"left", background:"none", border:"none", cursor:"pointer", padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}
      >
        <span className="font-syne" style={{ fontSize:15, fontWeight:700, color:"var(--text-primary)", lineHeight:1.4 }}>{q}</span>
        <span style={{ fontSize:22, color:"var(--accent)", flexShrink:0, transition:"transform 0.28s", transform:open ? "rotate(45deg)" : "rotate(0deg)", display:"inline-block", fontWeight:300, lineHeight:1 }}>+</span>
      </button>
      <div style={{ overflow:"hidden", maxHeight:open ? "300px" : "0", transition:"max-height 0.38s ease" }}>
        <p style={{ padding:"0 24px 20px", fontSize:14, color:"var(--text-secondary)", lineHeight:1.75, margin:0 }}>{a}</p>
      </div>
    </div>
  );
}

/* ── testimonial card ─────────────────────────────────── */
function TestimonialCard({ name, role, body, initials, grad, delay }: { name: string; role: string; body: string; initials: string; grad: string; delay: number }) {
  return (
    <div className="reveal"
      style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:14, padding:36, position:"relative", transition:"transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease", transitionDelay:`${delay}s`, cursor:"default" }}
      onMouseEnter={(e) => { const el=e.currentTarget as HTMLElement; el.style.transform="translateY(-6px)"; el.style.borderColor="var(--accent)"; el.style.boxShadow="0 20px 48px rgba(59,130,246,0.12)"; }}
      onMouseLeave={(e) => { const el=e.currentTarget as HTMLElement; el.style.transform="translateY(0)"; el.style.borderColor="var(--border)"; el.style.boxShadow="none"; }}
    >
      <div className="font-syne" style={{ fontSize:"5rem", lineHeight:1, color:"var(--accent)", opacity:0.15, position:"absolute", top:14, left:24, userSelect:"none" }}>"</div>
      <div style={{ display:"flex", gap:3, marginBottom:18, marginTop:8 }}>
        {[...Array(5)].map((_, i) => (<span key={i} style={{ color:"var(--accent)", fontSize:15 }}>★</span>))}
      </div>
      <p style={{ fontSize:14, color:"var(--text-secondary)", lineHeight:1.8, fontStyle:"italic", marginBottom:28 }}>"{body}"</p>
      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
        {/* Avatar with gradient border */}
        <div style={{ padding:2, borderRadius:"50%", background:grad }}>
          <div style={{ width:48, height:48, borderRadius:"50%", background:"var(--bg-card)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:14, fontWeight:800, color:"var(--text-primary)" }}>{initials}</span>
          </div>
        </div>
        <div>
          <div className="font-syne" style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)" }}>{name}</div>
          <div style={{ fontSize:12, color:"var(--accent)", marginTop:2 }}>{role}</div>
        </div>
      </div>
    </div>
  );
}
