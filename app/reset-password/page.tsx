"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) { setError(updateError.message); setLoading(false); return; }
    setSuccess(true);
    setTimeout(() => router.push("/login"), 3000);
  }

  const pageWrap: React.CSSProperties = { minHeight: "100vh", background: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" };
  const card: React.CSSProperties = { background: "#ffffff", borderRadius: 16, border: "1px solid #E2E8F0", padding: 32, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" };
  const inputStyle = (pr?: string): React.CSSProperties => ({ width: "100%", background: "#ffffff", color: "#0F172A", border: "1px solid #E2E8F0", borderRadius: 8, padding: pr ?? "12px 16px", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" });

  if (success) {
    return (
      <div style={pageWrap}>
        <div style={{ width: "100%", maxWidth: 448, textAlign: "center" }}>
          <Link href="/" style={{ display: "inline-flex", marginBottom: 24 }}>
            <img src="/logo-light.svg" alt="ListifyPH" style={{ height: 36, width: "auto" }} />
          </Link>
          <div style={card}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>Password updated!</h2>
            <p style={{ fontSize: "0.875rem", color: "#64748B", lineHeight: 1.7 }}>
              Your password has been changed successfully. Redirecting you to login…
            </p>
          </div>
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
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>Set new password</h1>
          <p style={{ color: "#64748B", marginTop: 4, fontSize: "0.875rem" }}>Choose a strong password for your account</p>
        </div>

        <div style={card}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#0F172A", marginBottom: 6 }}>New password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  style={inputStyle("12px 44px 12px 16px")}
                  onFocus={(e) => { e.currentTarget.style.borderColor="#3B82F6"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(59,130,246,0.12)"; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor="#E2E8F0"; e.currentTarget.style.boxShadow="none"; }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 0, display: "flex" }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#0F172A", marginBottom: 6 }}>Confirm new password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat your new password"
                  style={inputStyle("12px 44px 12px 16px")}
                  onFocus={(e) => { e.currentTarget.style.borderColor="#3B82F6"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(59,130,246,0.12)"; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor="#E2E8F0"; e.currentTarget.style.boxShadow="none"; }}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8", padding: 0, display: "flex" }}>
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <p style={{ color: "#EF4444", fontSize: 12, margin: 0 }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", background: "linear-gradient(135deg,#1D4ED8,#3B82F6)", color: "#ffffff", borderRadius: 10, padding: "13px 0", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Updating..." : "Update password"}
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
