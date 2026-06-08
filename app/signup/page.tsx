"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) { setError("Please accept the terms to continue."); return; }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });
    if (signUpError) { setError(signUpError.message); setLoading(false); return; }
    router.push("/dashboard");
  }

  async function handleGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback` },
    });
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ width: "100%", maxWidth: 448 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/" style={{ display: "inline-flex", marginBottom: 24 }}>
            <img src="/logo-light.svg" alt="ListifyPH" style={{ height: 36, width: "auto" }} />
          </Link>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>Create your account</h1>
          <p style={{ color: "#64748B", marginTop: 4, fontSize: "0.875rem" }}>Start with 3 free generations</p>
        </div>

        <div style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", padding: 32, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <button
            onClick={handleGoogle}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, background: "#ffffff", border: "1px solid #E2E8F0", borderRadius: 12, padding: "12px 0", fontSize: "0.875rem", fontWeight: 500, color: "#0F172A", cursor: "pointer", marginBottom: 24, transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "#F8FAFC"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "#ffffff"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ position: "relative", marginBottom: 24 }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
              <div style={{ width: "100%", borderTop: "1px solid #E2E8F0" }} />
            </div>
            <div style={{ position: "relative", display: "flex", justifyContent: "center", fontSize: 12, color: "#94A3B8", background: "#ffffff", padding: "0 12px" }}>or continue with email</div>
          </div>

          <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#0F172A", marginBottom: 6 }}>Full name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Maria Santos"
                style={{ width: "100%", background: "#ffffff", color: "#0F172A", border: "1px solid #E2E8F0", borderRadius: 8, padding: "12px 16px", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }}
                onFocus={(e) => { e.currentTarget.style.borderColor="#3B82F6"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(59,130,246,0.12)"; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor="#E2E8F0"; e.currentTarget.style.boxShadow="none"; }}
              />
            </div>
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
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#0F172A", marginBottom: 6 }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  style={{ width: "100%", background: "#ffffff", color: "#0F172A", border: "1px solid #E2E8F0", borderRadius: 8, padding: "12px 44px 12px 16px", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor="#3B82F6"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(59,130,246,0.12)"; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor="#E2E8F0"; e.currentTarget.style.boxShadow="none"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 0, display: "flex" }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{ marginTop: 2, accentColor: "#3B82F6" } as React.CSSProperties}
              />
              <label htmlFor="terms" style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>
                I agree to the{" "}
                <Link href="/terms" style={{ color: "#3B82F6", textDecoration: "none" }}>Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy-policy" style={{ color: "#3B82F6", textDecoration: "none" }}>Privacy Policy</Link>
              </label>
            </div>
            {error && <p style={{ color: "#EF4444", fontSize: 12, margin: 0 }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", background: "linear-gradient(135deg,#1D4ED8,#3B82F6)", color: "#ffffff", borderRadius: 10, padding: "13px 0", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition: "opacity 0.2s" }}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#64748B", marginTop: 24 }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#3B82F6", fontWeight: 500, textDecoration: "none" }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
