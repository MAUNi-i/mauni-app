"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

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

const ALLOWED_COURSE_IDS = [2822126];

export default function LearningPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

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
      {/* Header */}
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
        {/* Sidebar */}
        <aside className="rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm md:col-span-1">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f05a28]">Navigation</p>
          <div className="mt-6 space-y-3">
            {[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Journal", href: "/dashboard/journal" },
              { label: "Timeline", href: "/dashboard/timeline" },
              { label: "Goals", href: "/dashboard/goals" },
              { label: "Reflections", href: "/dashboard/reflections" },
              { label: "Learning", href: "/learning", active: true },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`block rounded-2xl px-4 py-3 font-semibold ${
                  item.active
                    ? "bg-[#f05a28] text-white"
                    : "border border-[#eadfd5] bg-[#fffaf5] text-slate-700 hover:border-[#f05a28]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </aside>

        {/* Main */}
        <section className="space-y-8 md:col-span-3">
          {/* Hero */}
          <div className="rounded-3xl border border-[#eadfd5] bg-white p-8 shadow-sm">
            <p className="mb-4 inline-flex rounded-full border border-[#f05a28]/30 bg-[#fff7f0] px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#f05a28]">
              MAUNi Learning
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#15172f]">
              Your learning pathways.
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Explore recovery coaching programmes, professional training, and wellness courses designed to support your journey.
            </p>
          </div>

          {/* Courses */}
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2].map((i) => (
                <div key={i} className="h-64 animate-pulse rounded-3xl bg-[#eadfd5]" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex flex-col overflow-hidden rounded-3xl border border-[#eadfd5] bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {course.image_url ? (
                    <div className="relative h-40 w-full bg-[#f8f5ef]">
                      <img src={course.image_url} alt={course.name} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-40 items-center justify-center bg-[#fff7f0]">
                      <span className="text-4xl">📚</span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <span className="mb-3 inline-block rounded-full bg-[#fff7f0] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f05a28]">
                      {course.is_free ? "Free" : "Premium"}
                    </span>

                    <h3 className="text-lg font-bold leading-tight text-[#15172f]">{course.name}</h3>

                    {course.heading && (
                      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 line-clamp-3">{course.heading}</p>
                    )}

                    <a
                      href="/courses/uactlero"
                      className="mt-4 block rounded-2xl bg-[#f05a28] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#d94e20]"
                    >
                      {course.is_free ? "Start Course" : "View Course"}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
