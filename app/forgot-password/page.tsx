"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    });
    if (resetError) { setError(resetError.message); setLoading(false); return; }
    setSent(true);
    setLoading(false);
  }

  const pageWrap: React.CSSProperties = { minHeight: "100vh", background: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" };
  const card: React.CSSProperties = { background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", padding: 32, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" };

  if (sent) {
    return (
      <div style={pageWrap}>
        <div style={{ width: "100%", maxWidth: 448, textAlign: "center" }}>
          <Link href="/" style={{ display: "inline-flex", marginBottom: 24 }}>
            <img src="/logo-light.svg" alt="ListifyPH" style={{ height: 36, width: "auto" }} />
          </Link>
          <div style={card}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(59,130,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 26 }}>📧</div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>Check your email</h2>
            <p style={{ fontSize: "0.875rem", color: "#64748B", lineHeight: 1.7, marginBottom: 16 }}>
              We sent a password reset link to{" "}
              <strong style={{ color: "#0F172A" }}>{email}</strong>.
              Click the link in that email to set a new password.
            </p>
            <p style={{ fontSize: 12, color: "#94A3B8" }}>
              Didn&apos;t receive it? Check your spam folder or{" "}
              <button
                onClick={() => setSent(false)}
                style={{ background: "none", border: "none", color: "#3B82F6", cursor: "pointer", fontSize: 12, padding: 0 }}
              >
                try again
              </button>.
            </p>
          </div>
          <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#64748B", marginTop: 24 }}>
            <Link href="/login" style={{ color: "#3B82F6", fontWeight: 500, textDecoration: "none" }}>← Back to login</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrap}>
      <div style={{ width: "100%", maxWidth: 448 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/" style={{ display: "inline-flex", marginBottom: 24 }}>
            <img src="/logo-light.svg" alt="ListifyPH" style={{ height: 36, width: "auto" }} />
          </Link>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>Forgot your password?</h1>
          <p style={{ color: "#64748B", marginTop: 4, fontSize: "0.875rem" }}>Enter your email and we&apos;ll send you a reset link</p>
        </div>

        <div style={card}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#0F172A", marginBottom: 6 }}>Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maria@example.com"
                style={{ width: "100%", background: "#ffffff", color: "#0F172A", border: "1px solid #E2E8F0", borderRadius: 8, padding: "12px 16px", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }}
                onFocus={(e) => { e.currentTarget.style.borderColor="#3B82F6"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(59,130,246,0.12)"; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor="#E2E8F0"; e.currentTarget.style.boxShadow="none"; }}
              />
            </div>
            {error && <p style={{ color: "#EF4444", fontSize: 12, margin: 0 }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", background: "linear-gradient(135deg,#1D4ED8,#3B82F6)", color: "#ffffff", borderRadius: 10, padding: "13px 0", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#64748B", marginTop: 24 }}>
          <Link href="/login" style={{ color: "#3B82F6", fontWeight: 500, textDecoration: "none" }}>← Back to login</Link>
        </p>
      </div>
    </div>
  );
}
