"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("AI reflections will appear here.");
  const [loading, setLoading] = useState(false);

  const goals = [
    "Attend weekly recovery coaching session",
    "Complete reflection journal",
    "Connect with peer support group",
  ];

  const modules = [
    "Recovery Foundations",
    "Building Recovery Capital",
    "Goal Setting and Reflection",
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-black">
              M
            </div>

            <div>
              <p className="text-lg font-bold">MAUNi Dashboard</p>
              <p className="text-sm text-gray-400">
                Recovery Coaching Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:bg-white hover:text-black"
            >
              Home
            </a>

            <button className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-black">
              Profile
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-4">
        <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:col-span-1">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
            Navigation
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-orange-500 px-4 py-3 font-semibold text-black">
              Dashboard
            </div>

            <div className="rounded-xl border border-white/10 px-4 py-3 text-gray-300">
              Coaching
            </div>

            <div className="rounded-xl border border-white/10 px-4 py-3 text-gray-300">
              Learning
            </div>

            <div className="rounded-xl border border-white/10 px-4 py-3 text-gray-300">
              Community
            </div>

            <div className="rounded-xl border border-white/10 px-4 py-3 text-gray-300">
              Reflections
            </div>
          </div>
        </aside>

        <section className="space-y-6 md:col-span-3">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/20 to-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
              Welcome Back
            </p>

            <h1 className="mt-4 text-4xl font-bold">
              Your recovery journey continues.
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-300">
              MAUNi helps you stay connected to your goals, coaching support,
              learning pathways, and personal growth.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-orange-400">
                Recovery Goals
              </p>

              <h2 className="mt-3 text-3xl font-bold">3</h2>

              <p className="mt-2 text-gray-400">
                Active recovery goals in progress.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-orange-400">
                Coaching
              </p>

              <h2 className="mt-3 text-3xl font-bold">1</h2>

              <p className="mt-2 text-gray-400">
                Upcoming coaching check-in scheduled.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-orange-400">
                Learning
              </p>

              <h2 className="mt-3 text-3xl font-bold">3</h2>

              <p className="mt-2 text-gray-400">
                Learning modules available.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
              MAUNi Reflection Assistant
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              How are you feeling today?
            </h2>

            <p className="mt-3 max-w-2xl text-gray-400">
              Share a reflection, challenge, thought, or recovery experience and
              receive supportive coaching-style guidance.
            </p>

            <div className="mt-6 space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your reflection here..."
                className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none placeholder:text-gray-500 focus:border-orange-400"
              />

              <button
                onClick={async () => {
                  try {
                    setLoading(true);

                    const response = await fetch("/api/coach", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        message,
                      }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                      setReply(data.error || "The AI route returned an error.");
                      return;
                    }

                    setReply(data.reply);
                  } catch (error) {
                    console.error(error);
                    setReply("Something went wrong.");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-black hover:bg-orange-400"
              >
                {loading ? "Thinking..." : "Ask MAUNi"}
              </button>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-5 leading-7 text-gray-300">
                {reply}
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
                Current Goals
              </p>

              <div className="mt-6 space-y-4">
                {goals.map((goal) => (
                  <div
                    key={goal}
                    className="rounded-2xl border border-white/10 bg-black/40 p-4"
                  >
                    <span className="text-orange-400">✓</span>{" "}
                    <span className="text-gray-300">{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-400">
                Learning Modules
              </p>

              <div className="mt-6 space-y-4">
                {modules.map((module) => (
                  <div
                    key={module}
                    className="rounded-2xl border border-white/10 bg-black/40 p-4"
                  >
                    <p className="font-semibold">{module}</p>

                    <p className="mt-1 text-sm text-gray-400">
                      Continue learning pathway
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}