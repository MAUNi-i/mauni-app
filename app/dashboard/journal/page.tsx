"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Journal = {
  id: string;
  title: string | null;
  content: string;
  created_at: string;
};

export default function JournalPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadJournals() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data, error } = await supabase
      .from("journals")
      .select("id, title, content, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setJournals(data || []);
  }

  useEffect(() => {
    loadJournals();
  }, []);

  async function saveJournal() {
    if (!content.trim()) return;

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { error } = await supabase.from("journals").insert({
      user_id: user.id,
      title,
      content,
    });

    if (error) {
      console.error(error);
      alert("Could not save journal entry.");
      setLoading(false);
      return;
    }

    setTitle("");
    setContent("");
    await loadJournals();
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-10 text-[#111827]">
      <div className="mx-auto max-w-5xl">
        <a href="/dashboard" className="text-sm font-semibold text-[#f05a28]">
          ← Back to Dashboard
        </a>

        <section className="mt-6 rounded-3xl border border-[#eadfd5] bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f05a28]">
            MAUNi Journal
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#15172f]">
            Private recovery journal
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Use this space to record thoughts, progress, challenges, gratitude,
            goals, and moments of insight.
          </p>

          <div className="mt-8 space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Journal title optional"
              className="w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5 outline-none focus:border-[#f05a28]"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your journal entry..."
              className="min-h-[220px] w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5 outline-none focus:border-[#f05a28]"
            />

            <button
              onClick={saveJournal}
              disabled={loading}
              className="rounded-2xl bg-[#f05a28] px-8 py-4 font-semibold text-white shadow-sm hover:bg-[#d94e20] disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Journal Entry"}
            </button>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-[#eadfd5] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#15172f]">
            Recent journal entries
          </h2>

          <div className="mt-6 space-y-4">
            {journals.length === 0 ? (
              <p className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5 text-slate-600">
                No journal entries yet.
              </p>
            ) : (
              journals.map((journal) => (
                <div
                  key={journal.id}
                  className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f05a28]">
                    {new Date(journal.created_at).toLocaleString()}
                  </p>

                  {journal.title && (
                    <h3 className="mt-3 text-xl font-semibold text-[#15172f]">
                      {journal.title}
                    </h3>
                  )}

                  <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-700">
                    {journal.content}
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