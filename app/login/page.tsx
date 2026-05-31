"use client";

import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const THEMES: Record<string, {
  primary: string; primaryHover: string;
  bg: string; panelBg: string; inputBg: string; inputBorder: string;
  logo: string | null; logoType: "img" | "mauni";
  orgName: string; tagline: string; headline: string; subline: string; footer: string;
  font: string;
}> = {
  "app.maunirecoverconnections.com": {
    primary: "#0f2a7a", primaryHover: "#1a3d9e",
    bg: "#f5f7fb", panelBg: "#e8eef8", inputBg: "#f5f7fb", inputBorder: "#c5d0e8",
    logo: "https://recoveryconnections.org.uk/wp-content/uploads/2025/02/recovery-connections-logo.svg",
    logoType: "img", orgName: "Recovery Connections", tagline: "Powered by MAUNi",
    headline: "Your recovery journey continues between sessions.",
    subline: "Sign in to access your goals, reflections, learning, and coaching tools.",
    footer: "Free · Lived-experience led · No referral needed",
    font: "'Nunito', sans-serif",
  },
  default: {
    primary: "#f05a28", primaryHover: "#d94e20",
    bg: "#fbf7ef", panelBg: "#fff7f0", inputBg: "#fffaf5", inputBorder: "#eadfd5",
    logo: null, logoType: "mauni", orgName: "MAUNi", tagline: "Recovery Coaching",
    headline: "Continue your recovery journey with support and structure.",
    subline: "Sign in to access your dashboard, reflections, goals, learning pathways, and MAUNi coaching tools.",
    footer: "Technology should amplify care, not replace it.",
    font: "inherit",
  },
};

function LoginForm() {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(THEMES.default);
  const supabase = createClient();

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
      if (!user) { setMessage("Sign in failed. Pleas
