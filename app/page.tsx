"use client";

import { useState } from "react";
import Image from "next/image";
import MauniPublicChat from "@/components/MauniPublicChat";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    { label: "Recovery", title: "Personal Growth", text: "Track goals, reflect on progress, and strengthen recovery capital.", icon: "🌱" },
    { label: "Coaching", title: "Human Connection", text: "Structured support between coaches, peers, and communities.", icon: "👥" },
    { label: "Learning", title: "Guided Pathways", text: "Digital tools, learning modules, and practical recovery resources.", icon: "📖" },
  ];

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "Tools", href: "#tools" },
    { label: "Recovery Coach", href: "#coach" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#15172f]">

      {/* HEADER */}
      <header className="border-b border-[#eadfd5] bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 md:py-5">
          <a href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-11 md:h-14 md:w-14 overflow-hidden rounded-xl bg-white flex-shrink-0">
              <Image src="/mauni-m.jpg" alt="MAUNi logo" fill className="object-contain" priority />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight">MAUNi</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-10 text-sm font-medium text-slate-700 md:flex">
            {navLinks.map(l => <a key={l.href} href={l.href} className="hover:text-[#f05a28]">{l.label}</a>)}
          </nav>

          <div className="flex items-center gap-3">
            <a href="/login" className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-[#f05a28]">Sign In</a>
            <a href="/signup" className="rounded-full bg-[#f05a28] px-5 py-2.5 md:px-6 md:py-3 text-sm font-bold text-white shadow-sm hover:bg-[#d94e20]">Get Started</a>
            {/* Hamburger — mobile only */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-lg border border-[#eadfd5] bg-white" aria-label="Toggle menu">
              <span className={`block h-0.5 w-5 bg-[#15172f] transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-5 bg-[#15172f] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-[#15172f] transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#eadfd5] bg-white px-4 py-4 flex flex-col gap-1">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#fff7f0] hover:text-[#f05a28]">
                {l.label}
              </a>
            ))}
            <a href="/login" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-[#fff7f0] hover:text-[#f05a28]">
              Sign In
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#eadfd5]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-2 lg:min-h-[680px] lg:gap-12">
          <div className="relative z-10">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.45em] text-[#f05a28]">U-ACT Recovery Coaching</p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-[#15172f] sm:text-5xl md:text-6xl lg:text-7xl">
              A digital platform for recovery, growth, and connection<span className="text-[#f05a28]">.</span>
            </h1>
            <p className="mt-6 md:mt-8 text-lg md:text-xl leading-8 md:leading-9 text-slate-600">
              MAUNi supports people, coaches, organisations, and communities through recovery coaching tools, learning pathways, and human connection.
            </p>
            <div className="mt-8 md:mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="/dashboard" className="rounded-full bg-[#f05a28] px-7 py-3.5 text-center font-bold text-white shadow-sm hover:bg-[#d94e20]">Explore Platform</a>
              <a href="#tools" className="rounded-full border border-[#f05a28] bg-white px-7 py-3.5 text-center font-bold text-[#f05a28] hover:bg-[#fff4eb]">View Tools</a>
              <a href="https://us06web.zoom.us/j/3155095001" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#15172f] bg-white px-7 py-3.5 text-center font-bold text-[#15172f] hover:bg-[#15172f] hover:text-white">Private Room</a>
            </div>
          </div>

          {/* Hero image — hidden on mobile to keep things clean, shown lg+ */}
          <div className="relative hidden lg:block min-h-[560px]">
            <div className="absolute -right-24 top-0 h-[620px] w-[620px] rounded-full border border-[#eadfd5]" />
            <div className="relative ml-auto h-[520px] w-[620px] overflow-hidden rounded-l-[220px] rounded-r-[2rem] border border-[#eadfd5] bg-white shadow-sm">
              <Image src="/mauni-hero.jpg" alt="MAUNi recovery community" fill className="object-cover" priority />
            </div>
          </div>

          {/* Hero image — simple version on mobile/tablet */}
          <div className="relative lg:hidden h-64 sm:h-80 w-full overflow-hidden rounded-3xl border border-[#eadfd5] bg-white shadow-sm">
            <Image src="/mauni-hero.jpg" alt="MAUNi recovery community" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-[#eadfd5] bg-white p-6 md:p-8 shadow-sm">
              <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#fff1e7] text-3xl">{feature.icon}</div>
              <p className="mt-6 md:mt-8 text-xs font-bold uppercase tracking-[0.35em] text-[#f05a28]">{feature.label}</p>
              <h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-[#15172f]">{feature.title}</h2>
              <div className="mt-5 h-0.5 w-10 bg-[#f05a28]" />
              <p className="mt-5 leading-8 text-slate-600">{feature.text}</p>
              <a href="/dashboard" className="mt-8 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#f05a28] text-[#f05a28] hover:bg-[#f05a28] hover:text-white">→</a>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm md:grid-cols-2 md:gap-12 md:p-12">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#f05a28]">About MAUNi</p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#15172f] md:text-4xl lg:text-5xl">Built around dignity, recovery capital, and real-world support.</h2>
          </div>
          <div className="space-y-6 text-lg leading-9 text-slate-600">
            <p>MAUNi is being developed as a digital recovery coaching ecosystem — helping people access support, learn practical tools, track growth, and stay connected to coaches and communities that understand the recovery journey.</p>
            <p>Technology should strengthen human connection, not replace it. MAUNi creates continuity between coaching conversations and daily life.</p>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" className="bg-white px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#f05a28]">Platform Tools</p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#15172f] md:text-4xl lg:text-5xl">Practical tools for everyday recovery support.</h2>
            <p className="mt-6 text-lg leading-9 text-slate-600">MAUNi brings together digital tools that help users reflect, learn, connect, plan, and keep moving forward.</p>
          </div>
          <div className="grid gap-4">
            {["Personal recovery dashboard","AI reflection assistant","Coaching session notes","Goal setting and reflections","Learning modules","Progress check-ins"].map((tool) => (
              <div key={tool} className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-4 md:p-5 text-slate-700">
                <span className="font-bold text-[#f05a28]">✓</span> <span>{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COACH */}
      <section id="coach" className="bg-[#fff7f0] px-4 py-20 md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-center text-sm font-bold uppercase tracking-[0.35em] text-[#f05a28]">Recovery Coach</p>
          <h2 className="mb-3 text-center text-3xl md:text-4xl font-semibold tracking-tight text-[#15172f]">Ask the MAUNi Recovery Coach.</h2>
          <p className="mb-10 text-center text-lg leading-8 text-slate-600">Available 24/7. Trained in the MAUNi methodology. Ask about recovery, referrals, or finding the right pathway.</p>
          <MauniPublicChat />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-[#eadfd5] bg-white px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#f05a28]">Coming Soon</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#15172f] md:text-4xl lg:text-5xl">A recovery coaching platform built for real impact.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">MAUNi is in development as a digital home for learning, coaching, connection, reflection, and recovery growth.</p>
          <a href="mailto:david@uact.org.za" className="mt-8 inline-block rounded-full bg-[#f05a28] px-8 py-4 font-bold text-white hover:bg-[#d94e20]">Contact David</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#eadfd5] bg-[#fbf7ef] px-4 py-8 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 MAUNi. Built with U-ACT Recovery Coaching.</p>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {navLinks.map(l => <a key={l.href} href={l.href} className="hover:text-[#f05a28]">{l.label}</a>)}
          </div>
        </div>
      </footer>

    </main>
  );
}
