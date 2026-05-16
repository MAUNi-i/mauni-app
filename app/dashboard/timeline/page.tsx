"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type TimelineItem = {
  type: "reflection" | "journal" | "goal";
  title: string;
  content: string;
  created_at: string;
};

export default function TimelinePage() {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTimeline() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const [reflectionsResult, journalsResult, goalsResult] =
      await Promise.all([
        supabase
          .from("reflections")
          .select("message, reply, created_at")
          .eq("user_id", user.id),

        supabase
          .from("journals")
          .select("title, content, created_at")
          .eq("user_id", user.id),

        supabase
          .from("goals")
          .select("title, description, completed, created_at")
          .eq("user_id", user.id),
      ]);

    const reflections =
      reflectionsResult.data?.map((item) => ({
        type: "reflection" as const,
        title: "Reflection",
        content: item.message,
        created_at: item.created_at,
      })) || [];

    const journals =
      journalsResult.data?.map((item) => ({
        type: "journal" as const,
        title: item.title || "Journal Entry",
        content: item.content,
        created_at: item.created_at,
      })) || [];

    const goals =
      goalsResult.data?.map((item) => ({
        type: "goal" as const,
        title: item.completed ? "Completed Goal" : "Recovery Goal",
        content: item.title,
        created_at: item.created_at,
      })) || [];

    const combined = [...reflections, ...journals, ...goals].sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    );

    setItems(combined);
    setLoading(false);
  }

  useEffect(() => {
    loadTimeline();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-10 text-[#111827]">
      <div className="mx-auto max-w-5xl">
        <a href="/dashboard" className="text-sm font-semibold text-[#f05a28]">
          ← Back to Dashboard
        </a>

        <section className="mt-6 rounded-3xl border border-[#eadfd5] bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f05a28]">
            MAUNi Timeline
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#15172f]">
            Your recovery journey timeline
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            View your reflections, journals, and goals together as part of your
            ongoing recovery journey.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-[#eadfd5] bg-white p-8 shadow-sm">
          <div className="space-y-5">
            {loading ? (
              <p className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5 text-slate-600">
                Loading timeline...
              </p>
            ) : items.length === 0 ? (
              <p className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5 text-slate-600">
                Your recovery timeline is empty.
              </p>
            ) : (
              items.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f05a28]">
                    {item.type}
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold text-[#15172f]">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {new Date(item.created_at).toLocaleString()}
                  </p>

                  <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-700">
                    {item.content}
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