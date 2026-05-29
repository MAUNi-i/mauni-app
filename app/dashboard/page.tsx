"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import MauniAssistantWidget from "@/components/MauniAssistantWidget";

type Reflection = {
  id: string;
  message: string;
  reply: string;
  created_at: string;
};

export default function DashboardPage() {
  const [reflections, setReflections] = useState<Reflection[]>([]);

  useEffect(() => {
    async function checkUserAndLoadReflections() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }

      const { data } = await supabase
        .from("reflections")
        .select("id, message, reply, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      setReflections(data || []);
    }
    checkUserAndLoadReflections();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#111827]">
      <header className="border-b border-[#eadfd5] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white">
              <Image src="/mauni-m.jpg" alt="MAUNi logo" fill className="object-contain p-1" priority />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">MAUNi <span className="text-[#f05a28]">Platform</span></p>
              <p className="text-sm text-slate-500">Recovery coaching dashboard</p>
            </div>
          </a>
          <button
            onClick={async () => { await supabase.auth.signOut(); window.location.href = "/login"; }}
            className="rounded-xl bg-[#f05a28] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#d94e20]"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-4">
        <aside className="rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm md:col-span-1">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f05a28]">Navigation</p>
          <div className="mt-6 space-y-3">
            <a href="/dashboard" className="block rounded-2xl bg-[#f05a28] px-4 py-3 font-semibold text-white">Dashboard</a>
            <a href="/dashboard/journal" className="block rounded-2xl border border-[#eadfd5] bg-[#fffaf5] px-4 py-3 text-slate-700 hover:border-[#f05a28]">Journal</a>
            <a href="/dashboard/timeline" className="block rounded-2xl border border-[#eadfd5] bg-[#fffaf5] px-4 py-3 text-slate-700 hover:border-[#f05a28]">Timeline</a>
            <a href="/dashboard/goals" className="block rounded-2xl border border-[#eadfd5] bg-[#fffaf5] px-4 py-3 text-slate-700 hover:border-[#f05a28]">Goals</a>
            <a href="/dashboard/reflections" className="block rounded-2xl border border-[#eadfd5] bg-[#fffaf5] px-4 py-3 text-slate-700 hover:border-[#f05a28]">Reflections</a>
            <a href="/learning" className="block rounded-2xl border border-[#eadfd5] bg-[#fffaf5] px-4 py-3 text-slate-700 hover:border-[#f05a28]">Learning</a>
            <a href="https://meet.google.com/jsy-ydhn-nyx" target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-[#f05a28] bg-[#fff7f0] px-4 py-3 text-[#f05a28] font-semibold hover:bg-[#f05a28] hover:text-white transition-colors text-center">Join Live Session</a>
            <a href="https://meet.google.com/eux-tpuw-ghk" target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-[#f05a28] bg-[#fff7f0] px-4 py-3 text-[#f05a28] font-semibold hover:bg-[#f05a28] hover:text-white transition-colors text-center">Case Management</a>
          </div>
        </aside>

        <section className="space-y-8 md:col-span-3">
          <section className="grid gap-8 rounded-3xl border border-[#eadfd5] bg-white p-8 shadow-sm md:grid-cols-2">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-[#f05a28]/30 bg-[#fff7f0] px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#f05a28]">MAUNi Recovery Coaching</p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#15172f] md:text-5xl">Your recovery journey continues.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Stay connected to your goals, coaching support, learning pathways, and personal recovery capital.</p>
            </div>
            <div className="rounded-3xl border border-[#eadfd5] bg-[#fffaf5] p-6">
              <p className="text-lg italic leading-8 text-[#15172f]">"A digital space for reflection, structure, and connection - designed to support recovery between sessions."</p>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-[#f05a28]">MAUNi Platform</p>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              { label: "Recovery Goals", value: "3", text: "Active recovery goals in progress." },
              { label: "Reflections", value: String(reflections.length), text: "Recent saved reflections." },
              { label: "Learning", value: "3", text: "Learning modules available." },
            ].map((card) => (
              <div key={card.label} className="rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f05a28]">{card.label}</p>
                <h2 className="mt-4 text-4xl font-bold text-[#15172f]">{card.value}</h2>
                <p className="mt-3 leading-7 text-slate-600">{card.text}</p>
              </div>
            ))}
          </section>
        </section>
      </div>
      <MauniAssistantWidget />
    </main>
  );
}
