"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

interface Course {
  id: number;
  name: string;
  heading: string;
  image_url: string;
  is_free: boolean;
  price: number;
  currency: string;
  url: string;
}

const CPD_MODULES = [
  { num: "01", title: "Ubuntu Foundation", slug: "module-ubuntu-foundation", free: true },
  { num: "02", title: "Where Coaching Sits", slug: "module-where-coaching-sits", free: true },
  { num: "03", title: "Collins Window", slug: "module-collins-window", free: false },
  { num: "04", title: "Wellness Continuums", slug: "module-wellness-continuums", free: false },
  { num: "05", title: "Well Brain", slug: "module-well-brain", free: false },
  { num: "06", title: "Systems", slug: "module-systems", free: false },
  { num: "07", title: "Values & Purpose", slug: "module-values-purpose", free: false },
  { num: "08", title: "Archetypes", slug: "module-archetypes", free: false },
  { num: "09", title: "Trauma & Resilience", slug: "module-trauma-resilience", free: false },
  { num: "10", title: "Crucial Conversations", slug: "module-crucial-conversations", free: false },
  { num: "11", title: "12-Step", slug: "module-12-step", free: false },
  { num: "12", title: "Working with Families", slug: "module-working-with-families", free: false },
  { num: "13", title: "Culture of Recovery", slug: "module-culture-of-recovery", free: false },
  { num: "14", title: "Decolonising Recovery", slug: "module-decolonising-recovery", free: false },
  { num: "15", title: "Recovery Capital", slug: "module-recovery-capital", free: false },
  { num: "16", title: "Case Management", slug: "module-case-management", free: false },
  { num: "17", title: "Philosophy of Coaching", slug: "module-philosophy-of-coaching", free: false },
  { num: "18", title: "Reflective Practice", slug: "module-reflective-practice", free: false },
];

const ALLOWED_COURSE_IDS = [2822126];

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Journal", href: "/dashboard/journal" },
  { label: "Timeline", href: "/dashboard/timeline" },
  { label: "Goals", href: "/dashboard/goals" },
  { label: "Reflections", href: "/dashboard/reflections" },
  { label: "Learning", href: "/learning", active: true },
];

export default function LearningPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"mauni" | "cpd">("mauni");
  const supabase = createClient();

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }
      const res = await fetch("/api/teachable/courses");
      const data = await res.json();
      const filtered = (data.courses ?? []).filter((c: Course) => ALLOWED_COURSE_IDS.includes(c.id));
      setCourses(filtered);
      setLoading(false);
    }
    init();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#111827]">

      {/* HEADER */}
      <header className="border-b border-[#eadfd5] bg-white/90 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 md:py-5">
          <a href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-xl bg-white flex-shrink-0">
              <Image src="/mauni-m.jpg" alt="MAUNi logo" fill className="object-contain p-1" priority />
            </div>
            <div className="hidden sm:block">
              <p className="text-lg font-bold tracking-tight">MAUNi <span className="text-[#f05a28]">Platform</span></p>
              <p className="text-sm text-slate-500">Recovery coaching dashboard</p>
            </div>
            <p className="sm:hidden text-base font-bold tracking-tight">MAUNi <span className="text-[#f05a28]">Platform</span></p>
          </a>
          <button
            onClick={async () => { await supabase.auth.signOut(); window.location.href = "/login"; }}
            className="rounded-xl bg-[#f05a28] px-4 py-2.5 md:px-5 md:py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#d94e20]"
          >
            Logout
          </button>
        </div>
      </header>

      {/* MOBILE NAV — horizontal scroll pills, hidden on md+ */}
      <nav className="flex md:hidden overflow-x-auto gap-2 px-4 py-3 bg-white border-b border-[#eadfd5] scrollbar-none" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
        {NAV_ITEMS.map(item => (
          <a key={item.href} href={item.href} className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap border ${item.active ? "bg-[#f05a28] text-white border-[#f05a28]" : "bg-[#fff7f0] text-[#f05a28] border-[#eadfd5]"}`}>
            {item.label}
          </a>
        ))}
        <a href="https://meet.google.com/jsy-ydhn-nyx" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap border bg-[#fff7f0] text-[#f05a28] border-[#eadfd5]">
          Live Session
        </a>
        <a href="https://ai-davidcollins.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap border bg-[#15172f] text-[#c4a882] border-[#15172f]">
          CPD Portal ↗
        </a>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-6 md:px-6 md:py-10 md:grid-cols-4">

        {/* SIDEBAR — desktop only */}
        <aside className="hidden md:block rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm md:col-span-1 self-start">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f05a28]">Navigation</p>
          <div className="mt-6 space-y-3">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className={`block rounded-2xl px-4 py-3 font-semibold ${item.active ? "bg-[#f05a28] text-white" : "border border-[#eadfd5] bg-[#fffaf5] text-slate-700 hover:border-[#f05a28]"}`}>
                {item.label}
              </a>
            ))}
            <a href="https://meet.google.com/jsy-ydhn-nyx" target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-[#f05a28] bg-[#fff7f0] px-4 py-3 text-center font-semibold text-[#f05a28] hover:bg-[#f05a28] hover:text-white transition-colors">
              Join Live Session
            </a>
            <a href="https://ai-davidcollins.com" target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-[#15172f] bg-[#15172f] px-4 py-3 text-center font-semibold text-[#c4a882] hover:bg-[#0a1628] transition-colors">
              CPD Portal ↗
            </a>
          </div>
        </aside>

        {/* MAIN — full width on mobile, 3 cols on md+ */}
        <section className="space-y-6 col-span-4 md:col-span-3">

          <div className="rounded-3xl border border-[#eadfd5] bg-white p-6 md:p-8 shadow-sm">
            <p className="mb-4 inline-flex rounded-full border border-[#f05a28]/30 bg-[#fff7f0] px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#f05a28]">MAUNi Learning</p>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-[#15172f]">Your learning pathways.</h1>
            <p className="mt-4 text-base md:text-lg leading-8 text-slate-600">Explore recovery coaching programmes, professional CPD training, and wellness courses designed to support your journey.</p>
          </div>

          <div className="flex gap-2 rounded-2xl border border-[#eadfd5] bg-white p-2 shadow-sm">
            <button onClick={() => setTab("mauni")} className={`flex-1 rounded-xl px-3 py-3 text-sm font-bold transition-colors ${tab === "mauni" ? "bg-[#f05a28] text-white shadow-sm" : "text-slate-600 hover:text-[#f05a28]"}`}>
              MAUNi Courses
            </button>
            <button onClick={() => setTab("cpd")} className={`flex-1 rounded-xl px-3 py-3 text-sm font-bold transition-colors ${tab === "cpd" ? "bg-[#15172f] text-[#c4a882] shadow-sm" : "text-slate-600 hover:text-[#15172f]"}`}>
              CPD — 18 Modules
            </button>
          </div>

          {tab === "mauni" && (
            loading ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {[1, 2].map((i) => (<div key={i} className="h-64 animate-pulse rounded-3xl bg-[#eadfd5]" />))}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {courses.map((course) => (
                  <div key={course.id} className="flex flex-col overflow-hidden rounded-3xl border border-[#eadfd5] bg-white shadow-sm transition-shadow hover:shadow-md">
                    {course.image_url ? (
                      <div className="relative h-40 w-full bg-[#f8f5ef]">
                        <img src={course.image_url} alt={course.name} className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="flex h-40 items-center justify-center bg-[#fff7f0]"><span className="text-4xl">📚</span></div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <span className="mb-3 inline-block rounded-full bg-[#fff7f0] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f05a28]">{course.is_free ? "Free" : "Premium"}</span>
                      <h3 className="text-lg font-bold leading-tight text-[#15172f]">{course.name}</h3>
                      {course.heading && (<p className="mt-2 flex-1 text-sm leading-6 text-slate-600 line-clamp-3">{course.heading}</p>)}
                      <a href="/courses/uactlero" className="mt-4 block rounded-2xl bg-[#f05a28] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#d94e20]">
                        {course.is_free ? "Start Course" : "View Course"}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {tab === "cpd" && (
            <div className="space-y-4">
              <div className="rounded-3xl border border-[#c4a882]/40 bg-[#0a1628] p-6 text-white shadow-sm">
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.3em] text-[#c4a882]">David Collins CPD</p>
                <h2 className="text-xl md:text-2xl font-bold text-white">18 Accredited Modules</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">ISO 17024 accredited training. 25 years of lived experience and clinical practice — delivered as structured CPD for healthcare professionals, coaches, and organisations.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href="https://ai-davidcollins.com" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#c4a882] px-5 py-2.5 text-sm font-bold text-[#0a1628] hover:bg-[#d4b892] transition-colors">Open CPD Portal ↗</a>
                  <a href="https://buy.stripe.com/8x2fZg8mT0P92qdc5D53O02" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#c4a882]/50 px-5 py-2.5 text-sm font-bold text-[#c4a882] hover:border-[#c4a882] transition-colors">Full Course £299</a>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {CPD_MODULES.map((mod) => (
                  <a key={mod.num} href={`https://ai-davidcollins.com/${mod.slug}`} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 rounded-2xl border border-[#eadfd5] bg-white p-4 shadow-sm transition-all hover:border-[#0a1628] hover:shadow-md">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0a1628] text-xs font-bold text-[#c4a882]">{mod.num}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#15172f] leading-snug group-hover:text-[#0a1628]">{mod.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{mod.free ? "Free preview" : "1 CPD hour"}</p>
                    </div>
                    <span className="text-slate-300 group-hover:text-[#c4a882] transition-colors">↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}

        </section>
      </div>
    </main>
  );
}
