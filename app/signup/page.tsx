"use client";

import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleGoogleSignup() {
    try {
      setGoogleLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) setMessage(error.message);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage(
        "Account created. Please check your email to confirm your signup."
      );
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
              Start Your Journey
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight">
              Create a space for reflection, growth, and connection.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Join MAUNi to access recovery coaching tools, learning pathways,
              personal goals, and supportive AI reflection.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            Built around dignity, recovery capital, and human connection.
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
            Create Account
          </p>

          <h2 className="text-4xl font-semibold tracking-tight">
            Begin with MAUNi.
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Create your account to begin your recovery coaching journey.
          </p>

          {/* Google Sign-in */}
          <button
            onClick={handleGoogleSignup}
            disabled={googleLoading}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-[#eadfd5] bg-white py-4 text-sm font-semibold text-[#15172f] shadow-sm hover:bg-[#fffaf5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
            </svg>
            {googleLoading ? "Redirecting..." : "Continue with Google"}
          </button>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#eadfd5]" />
            <span className="text-xs font-medium text-slate-400">or sign up with email</span>
            <div className="h-px flex-1 bg-[#eadfd5]" />
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Your name"
                required
                className="w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf5] px-4 py-4 text-[#15172f] outline-none placeholder:text-slate-400 focus:border-[#f05a28]"
              />
            </div>

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
                minLength={6}
                className="w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf5] px-4 py-4 text-[#15172f] outline-none placeholder:text-slate-400 focus:border-[#f05a28]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#f05a28] py-4 font-bold text-white shadow-sm hover:bg-[#d94e20] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {message && (
            <div className="mt-6 rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-4 text-sm leading-6 text-slate-700">
              {message}
            </div>
          )}

          <div className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-[#f05a28]">
              Sign in
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
