"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Reflection = {
  id: string;
  message: string;
  reply: string;
  created_at: string;
};

export default function ReflectionsPage() {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadReflections() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data, error } = await supabase
      .from("reflections")
      .select("id, message, reply, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setReflections(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadReflections();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-10 text-[#111827]">
      <div className="mx-auto max-w-5xl">
        <a href="/dashboard" className="text-sm font-semibold text-[#f05a28]">
          ← Back to Dashboard
        </a>

        <section className="mt-6 rounded-3xl border border-[#eadfd5] bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f05a28]">
            MAUNi Reflections
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#15172f]">
            Your reflection history
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Review your AI-assisted recovery reflections, insights, and
            coaching-style responses over time.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-[#eadfd5] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#15172f]">
            Saved reflections
          </h2>

          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5 text-slate-600">
                Loading reflections...
              </p>
            ) : reflections.length === 0 ? (
              <p className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5 text-slate-600">
                No reflections saved yet. Use the MAUNi Reflection Assistant on
                your dashboard to create your first reflection.
              </p>
            ) : (
              reflections.map((reflection) => (
                <div
                  key={reflection.id}
                  className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f05a28]">
                    {new Date(reflection.created_at).toLocaleString()}
                  </p>

                  <p className="mt-4 font-semibold text-[#15172f]">
                    You reflected:
                  </p>

                  <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">
                    {reflection.message}
                  </p>

                  <p className="mt-5 font-semibold text-[#15172f]">
                    MAUNi responded:
                  </p>

                  <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">
                    {reflection.reply}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}