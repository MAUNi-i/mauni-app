"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const THEMES: Record<string, {
  primary: string;
  primaryHover: string;
  bg: string;
  panelBg: string;
  inputBg: string;
  inputBorder: string;
  logo: string | null;
  logoType: "img" | "mauni";
  orgName: string;
  tagline: string;
  headline: string;
  subline: string;
  footer: string;
  font: string;
}> = {
  "app.maunirecoverconnections.com": {
    primary: "#0f2a7a",
    primaryHover: "#1a3d9e",
    bg: "#f5f7fb",
    panelBg: "#e8eef8",
    inputBg: "#f5f7fb",
    inputBorder: "#c5d0e8",
    logo: "https://recoveryconnections.org.uk/wp-content/uploads/2025/02/recovery-connections-logo.svg",
    logoType: "img",
    orgName: "Recovery Connections",
    tagline: "Powered by MAUNi",
    headline: "Your recovery journey continues between sessions.",
    subline: "Sign in to access your goals, reflections, learning, and coaching tools.",
    footer: "Free · Lived-experience led · No referral needed",
    font: "'Nunito', sans-serif",
  },
  default: {
    primary: "#f05a28",
    primaryHover: "#d94e20",
    bg: "#fbf7ef",
    panelBg: "#fff7f0",
    inputBg: "#fffaf5",
    inputBorder: "#eadfd5",
    logo: null,
    logoType: "mauni",
    orgName: "MAUNi",
    tagline: "Recovery Coaching",
    headline: "Continue your recovery journey with support and structure.",
    subline: "Sign in to access your dashboard, reflections, goals, learning pathways, and MAUNi coaching tools.",
    footer: "Technology should amplify care, not replace it.",
    font: "inherit",
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(THEMES.default);

  useEffect(() => {
    const host = window.location.hostname;
    setTheme(THEMES[host] ?? THEMES.default);
    if (THEMES[host]?.font !== "inherit") {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      setMessage("");
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setMessage(error.message); return; }
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }
      const { data: profile, error: profileError } = await supabase.from("profiles").select("onboarding_complete").eq("id", user.id).single();
      if (profileError) { setMessage("Could not load profile."); return; }
      window.location.href = profile?.onboarding_complete ? "/dashboard" : "/onboarding";
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  }

  const t = theme;

  return (
    <main style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: t.bg, padding: "3rem 1.5rem", fontFamily: t.font }}>
      <div style={{ display: "grid", width: "100%", maxWidth: 960, overflow: "hidden", borderRadius: 24, border: `1px solid ${t.inputBorder}`, background: "white", boxShadow: "0 4px 32px rgba(0,0,0,0.06)", gridTemplateColumns: "1fr 1fr" }}>

        {/* LEFT PANEL */}
        <section style={{ background: t.panelBg, padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {/* Logo */}
          <div>
            {t.logoType === "img" && t.logo ? (
              <div style={{ marginBottom: "2.5rem" }}>
                <img src={t.logo} alt={t.orgName} style={{ height: 44, display: "block" }} />
                <div style={{ marginTop: 8, fontSize: 12, color: t.primary, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{t.tagline}</div>
              </div>
            ) : (
              <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2.5rem", textDecoration: "none", color: "inherit" }}>
                <div style={{ position: "relative", height: 56, width: 56, overflow: "hidden", borderRadius: 12, background: "white" }}>
                  <Image src="/mauni-m.jpg" alt="MAUNi logo" fill style={{ objectFit: "contain" }} priority />
                </div>
                <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>MAUNi</span>
              </a>
            )}

            <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: t.primary }}>{t.tagline}</div>
            <h1 style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 700, lineHeight: 1.25, color: "#111827", marginBottom: "1.25rem" }}>{t.headline}</h1>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "#64748b" }}>{t.subline}</p>
          </div>
          <p style={{ fontSize: 13, color: "#94a3b8" }}>{t.footer}</p>
        </section>

        {/* RIGHT PANEL */}
        <section style={{ padding: "2.5rem 3rem" }}>
          <a href="/" style={{ display: "inline-block", marginBottom: "2rem", fontSize: 13, fontWeight: 600, color: "#94a3b8", textDecoration: "none" }}>← Back to Home</a>

          <div style={{ marginBottom: 6, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: t.primary }}>Welcome Back</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 2.5vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#111827", marginBottom: 6 }}>Sign in to {t.orgName}.</h2>
          <p style={{ fontSize: 15, color: "#64748b", marginBottom: "2rem", lineHeight: 1.6 }}>Access your recovery coaching dashboard.</p>

          <button
            onClick={handleGoogleLogin}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, borderRadius: 12, border: `1px solid ${t.inputBorder}`, background: "white", padding: "14px 16px", fontSize: 15, fontWeight: 700, color: "#374151", cursor: "pointer", marginBottom: "1.5rem", fontFamily: t.font, transition: "background 0.2s" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: 1, background: t.inputBorder }} />
            <span style={{ fontSize: 13, color: "#94a3b8" }}>or sign in with email</span>
            <div style={{ flex: 1, height: 1, background: t.inputBorder }} />
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#374151" }}>Email Address</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" required
                style={{ width: "100%", borderRadius: 10, border: `1px solid ${t.inputBorder}`, background: t.inputBg, padding: "13px 16px", fontSize: 15, color: "#111827", outline: "none", fontFamily: t.font }} />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#374151" }}>Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" required
                style={{ width: "100%", borderRadius: 10, border: `1px solid ${t.inputBorder}`, background: t.inputBg, padding: "13px 16px", fontSize: 15, color: "#111827", outline: "none", fontFamily: t.font }} />
            </div>
            <button type="submit" disabled={loading}
              style={{ width: "100%", borderRadius: 10, background: t.primary, padding: "14px", fontSize: 15, fontWeight: 700, color: "white", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, fontFamily: t.font, transition: "background 0.2s" }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {message && (
            <div style={{ marginTop: "1.25rem", borderRadius: 10, border: `1px solid ${t.inputBorder}`, background: t.inputBg, padding: "12px 16px", fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{message}</div>
          )}

          <div style={{ marginTop: "2rem", textAlign: "center", fontSize: 13, color: "#94a3b8" }}>
            New to {t.orgName}?{" "}
            <a href="/signup" style={{ fontWeight: 700, color: t.primary, textDecoration: "none" }}>Create account</a>
          </div>
        </section>
      </div>
    </main>
  );
}
