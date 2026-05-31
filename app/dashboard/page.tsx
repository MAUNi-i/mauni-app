"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import MauniAssistantWidget from "@/components/MauniAssistantWidget";

type Reflection = { id: string; message: string; reply: string; created_at: string; };

const THEMES: Record<string, {
  primary: string; primaryHover: string; primaryLight: string; primaryBorder: string;
  bg: string; cardBg: string; accentBg: string;
  logo: string | null; logoAlt: string; orgName: string; orgSub: string;
  font: string;
}> = {
  "app.maunirecoverconnections.com": {
    primary: "#0f2a7a", primaryHover: "#1a3d9e", primaryLight: "#e8eef8", primaryBorder: "#c5d0e8",
    bg: "#f5f7fb", cardBg: "#ffffff", accentBg: "#e8eef8",
    logo: "https://recoveryconnections.org.uk/wp-content/uploads/2025/02/recovery-connections-logo.svg",
    logoAlt: "Recovery Connections", orgName: "Recovery Connections", orgSub: "Powered by MAUNi",
    font: "'Nunito', sans-serif",
  },
  default: {
    primary: "#f05a28", primaryHover: "#d94e20", primaryLight: "#fff7f0", primaryBorder: "#eadfd5",
    bg: "#f8f5ef", cardBg: "#ffffff", accentBg: "#fffaf5",
    logo: null, logoAlt: "MAUNi", orgName: "MAUNi", orgSub: "Recovery coaching dashboard",
    font: "inherit",
  },
};

export default function DashboardPage() {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [theme, setTheme] = useState(THEMES.default);
  const supabase = createClient();

  useEffect(() => {
    const host = window.location.hostname;
    const t = THEMES[host] ?? THEMES.default;
    setTheme(t);
    if (t.font !== "inherit") {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap";
      document.head.appendChild(link);
    }
    async function checkUserAndLoadReflections() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }
      const { data } = await supabase.from("reflections").select("id, message, reply, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5);
      setReflections(data || []);
    }
    checkUserAndLoadReflections();
  }, []);

  const t = theme;
  const p = t.primary;
  const pl = t.primaryLight;
  const pb = t.primaryBorder;

  const navItems = [
    { label: "Dashboard", href: "/dashboard", active: true },
    { label: "Journal", href: "/dashboard/journal" },
    { label: "Timeline", href: "/dashboard/timeline" },
    { label: "Goals", href: "/dashboard/goals" },
    { label: "Reflections", href: "/dashboard/reflections" },
    { label: "Learning", href: "/learning" },
  ];

  const externalItems = [
    { label: "Join Live Session", href: "https://meet.google.com/jsy-ydhn-nyx" },
    { label: "Case Management", href: "https://meet.google.com/eux-tpuw-ghk" },
    { label: "Community", href: "https://www.skool.com/london-recovery-coaching" },
  ];

  return (
    <>
      <style>{`
        .dash-layout {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 2rem;
          padding: 2.5rem 1.5rem;
        }
        .dash-sidebar {
          display: block;
          background: ${t.cardBg};
          border-radius: 20px;
          border: 1px solid ${pb};
          padding: 1.5rem;
          align-self: start;
        }
        .dash-mobile-nav {
          display: none;
        }
        .dash-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          background: ${t.cardBg};
          border-radius: 20px;
          border: 1px solid ${pb};
          padding: 2rem;
        }
        .dash-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 767px) {
          .dash-layout {
            grid-template-columns: 1fr;
            padding: 1rem;
            gap: 1rem;
          }
          .dash-sidebar {
            display: none;
          }
          .dash-mobile-nav {
            display: flex;
            overflow-x: auto;
            gap: 8px;
            padding: 0.75rem 1rem;
            background: ${t.cardBg};
            border-bottom: 1px solid ${pb};
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .dash-mobile-nav::-webkit-scrollbar {
            display: none;
          }
          .dash-hero-grid {
            grid-template-columns: 1fr;
            padding: 1.25rem;
          }
          .dash-stats-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .dash-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .dash-layout {
            grid-template-columns: 220px 1fr;
          }
        }
      `}</style>

      <main style={{ minHeight: "100vh", background: t.bg, color: "#111827", fontFamily: t.font }}>

        {/* HEADER */}
        <header style={{ borderBottom: `1px solid ${pb}`, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem" }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" }}>
              {t.logo ? (
                <img src={t.logo} alt={t.logoAlt} style={{ height: 40 }} />
              ) : (
                <>
                  <div style={{ position: "relative", height: 48, width: 48, overflow: "hidden", borderRadius: 12, background: "white" }}>
                    <Image src="/mauni-m.jpg" alt="MAUNi logo" fill style={{ objectFit: "contain", padding: 4 }} priority />
                  </div>
                  <div>
                    <p style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em" }}>MAUNi <span style={{ color: p }}>Platform</span></p>
                    <p style={{ fontSize: 13, color: "#64748b" }}>{t.orgSub}</p>
                  </div>
                </>
              )}
              {t.logo && <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>{t.orgSub}</div>}
            </a>
            <button
              onClick={async () => { await supabase.auth.signOut(); window.location.href = "/login"; }}
              style={{ background: p, color: "white", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: t.font }}
            >Logout</button>
          </div>
        </header>

        {/* MOBILE NAV — horizontal scroll pills */}
        <nav className="dash-mobile-nav">
          {[...navItems, ...externalItems].map(item => (
            <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} style={{
              flexShrink: 0, borderRadius: 100, padding: "8px 16px", fontSize: 13, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" as const,
              background: (item as { active?: boolean }).active ? p : pl,
              color: (item as { active?: boolean }).active ? "white" : p,
              border: `1px solid ${pb}`,
            }}>{item.label}</a>
          ))}
        </nav>

        <div className="dash-layout">

          {/* SIDEBAR — desktop only */}
          <aside className="dash-sidebar">
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: p, marginBottom: "1.25rem" }}>Navigation</p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
              {navItems.map(item => (
                <a key={item.label} href={item.href} style={{
                  display: "block", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontWeight: 600, textDecoration: "none",
                  background: item.active ? p : t.accentBg,
                  color: item.active ? "white" : "#374151",
                  border: item.active ? "none" : `1px solid ${pb}`,
                }}>{item.label}</a>
              ))}
              {externalItems.map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={{
                  display: "block", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontWeight: 700, textDecoration: "none", textAlign: "center" as const,
                  background: pl, color: p, border: `1px solid ${pb}`,
                }}>{item.label}</a>
              ))}
            </div>
          </aside>

          {/* MAIN */}
          <section style={{ display: "flex", flexDirection: "column" as const, gap: "1.5rem" }}>

            <div className="dash-hero-grid">
              <div>
                <span style={{ display: "inline-flex", borderRadius: 100, border: `1px solid ${p}30`, background: pl, padding: "6px 16px", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: p, marginBottom: "1rem" }}>
                  {t.orgName} Recovery Coaching
                </span>
                <h1 style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, lineHeight: 1.2, color: "#111827", marginBottom: "1rem" }}>Your recovery journey continues.</h1>
                <p style={{ fontSize: 16, lineHeight: 1.75, color: "#64748b" }}>Stay connected to your goals, coaching support, learning pathways, and personal recovery capital.</p>
              </div>
              <div style={{ background: t.accentBg, borderRadius: 14, border: `1px solid ${pb}`, padding: "1.5rem", display: "flex", flexDirection: "column" as const, justifyContent: "space-between" }}>
                <p style={{ fontSize: 15, fontStyle: "italic", lineHeight: 1.75, color: "#111827" }}>"A digital space for reflection, structure, and connection — designed to support recovery between sessions."</p>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: p, marginTop: "1rem" }}>{t.orgName}</p>
              </div>
            </div>

            <div className="dash-stats-grid">
              {[
                { label: "Recovery Goals", value: "3", text: "Active recovery goals in progress." },
                { label: "Reflections", value: String(reflections.length), text: "Recent saved reflections." },
                { label: "Learning", value: "3", text: "Learning modules available." },
              ].map(card => (
                <div key={card.label} style={{ background: t.cardBg, borderRadius: 20, border: `1px solid ${pb}`, padding: "1.5rem" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: p }}>{card.label}</p>
                  <h2 style={{ fontSize: 40, fontWeight: 700, color: "#111827", margin: "0.75rem 0 0.5rem" }}>{card.value}</h2>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "#64748b" }}>{card.text}</p>
                </div>
              ))}
            </div>

          </section>
        </div>

        <MauniAssistantWidget />
      </main>
    </>
  );
}
