"use client";

import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("onboarding_complete")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error(profileError);
        setMessage("Could not load profile.");
        return;
      }

      if (profile?.onboarding_complete) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/onboarding";
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbf7ef] px-6 py-12 text-[#15172f]">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#eadfd5] bg-white shadow-sm md:grid-cols-2">
        <section className="hidden bg-[#fff7f0] p-10 md:flex md:flex-col md:justify-between">
          <a href="/" className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white">
              <Image
                src="/mauni-m.jpg"
                alt="MAUNi logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <span className="text-2xl font-bold tracking-tight">MAUNi</span>
          </a>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#f05a28]">
              Recovery Coaching
            </p>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight">
              Continue your recovery journey with support and structure.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Sign in to access your dashboard, reflections, goals, learning
              pathways, and MAUNi coaching tools.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            Technology should amplify care, not replace it.
          </p>
        </section>

        <section className="p-8 md:p-12">
          <a
            href="/"
            className="mb-8 inline-block text-sm font-medium text-slate-500 hover:text-[#f05a28]"
          >
            ← Back to Home
          </a>

          <div className="mb-8 md:hidden">
            <div className="relative mb-4 h-14 w-14 overflow-hidden rounded-xl bg-white">
              <Image
                src="/mauni-m.jpg"
                alt="MAUNi logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-[#f05a28]">
            Welcome Back
          </p>

          <h2 className="text-4xl font-semibold tracking-tight">
            Sign in to MAUNi.
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Access your recovery coaching dashboard.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>

              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf5] px-4 py-4 text-[#15172f] outline-none placeholder:text-slate-400 focus:border-[#f05a28]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>

              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="••••••••"
                required
                className="w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf5] px-4 py-4 text-[#15172f] outline-none placeholder:text-slate-400 focus:border-[#f05a28]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#f05a28] py-4 font-bold text-white shadow-sm hover:bg-[#d94e20] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {message && (
            <div className="mt-6 rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-4 text-sm leading-6 text-slate-700">
              {message}
            </div>
          )}

          <div className="mt-8 text-center text-sm text-slate-500">
            New to MAUNi?{" "}
            <a href="/signup" className="font-semibold text-[#f05a28]">
              Create account
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}