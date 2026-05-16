"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Goal = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
};

export default function GoalsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadGoals() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data, error } = await supabase
      .from("goals")
      .select("id, title, description, completed, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setGoals(data || []);
  }

  useEffect(() => {
    loadGoals();
  }, []);

  async function saveGoal() {
    if (!title.trim()) return;

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { error } = await supabase.from("goals").insert({
      user_id: user.id,
      title,
      description,
    });

    if (error) {
      console.error(error);
      alert("Could not save goal.");
      setLoading(false);
      return;
    }

    setTitle("");
    setDescription("");
    await loadGoals();
    setLoading(false);
  }

  async function toggleGoal(goal: Goal) {
    const { error } = await supabase
      .from("goals")
      .update({ completed: !goal.completed })
      .eq("id", goal.id);

    if (error) {
      console.error(error);
      alert("Could not update goal.");
      return;
    }

    await loadGoals();
  }

  const completedCount = goals.filter((goal) => goal.completed).length;

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-10 text-[#111827]">
      <div className="mx-auto max-w-5xl">
        <a href="/dashboard" className="text-sm font-semibold text-[#f05a28]">
          ← Back to Dashboard
        </a>

        <section className="mt-6 rounded-3xl border border-[#eadfd5] bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f05a28]">
            MAUNi Goals
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#15172f]">
            Recovery goals and accountability
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Create meaningful goals, track progress, and build recovery capital
            through small consistent actions.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f05a28]">
                Active Goals
              </p>
              <p className="mt-3 text-4xl font-bold text-[#15172f]">
                {goals.length}
              </p>
            </div>

            <div className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f05a28]">
                Completed
              </p>
              <p className="mt-3 text-4xl font-bold text-[#15172f]">
                {completedCount}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Goal title"
              className="w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5 outline-none focus:border-[#f05a28]"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the goal or next step..."
              className="min-h-[140px] w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5 outline-none focus:border-[#f05a28]"
            />

            <button
              onClick={saveGoal}
              disabled={loading}
              className="rounded-2xl bg-[#f05a28] px-8 py-4 font-semibold text-white shadow-sm hover:bg-[#d94e20] disabled:opacity-60"
            >
              {loading ? "Saving..." : "Create Goal"}
            </button>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-[#eadfd5] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#15172f]">
            Your recovery goals
          </h2>

          <div className="mt-6 space-y-4">
            {goals.length === 0 ? (
              <p className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5 text-slate-600">
                No goals yet.
              </p>
            ) : (
              goals.map((goal) => (
                <div
                  key={goal.id}
                  className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f05a28]">
                        {new Date(goal.created_at).toLocaleString()}
                      </p>

                      <h3 className="mt-3 text-xl font-semibold text-[#15172f]">
                        {goal.title}
                      </h3>

                      {goal.description && (
                        <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-700">
                          {goal.description}
                        </p>
                      )}

                      <p className="mt-3 text-sm font-semibold text-slate-600">
                        Status: {goal.completed ? "Completed" : "In progress"}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleGoal(goal)}
                      className="rounded-xl border border-[#f05a28] px-4 py-2 text-sm font-semibold text-[#f05a28] hover:bg-[#fff1e8]"
                    >
                      {goal.completed ? "Mark active" : "Complete"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}