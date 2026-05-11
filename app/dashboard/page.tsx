"use client";

import { useState } from "react";
import Image from "next/image";

export default function DashboardPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("Your MAUNi reflection will appear here.");
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
    <main className="min-h-screen bg-[#f8f5ef] text-[#111827]">
      <header className="border-b border-[#eadfd5] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white">
              <Image
                src="/mauni-m.jpg"
                alt="MAUNi logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight">
                MAUNi
                <span className="text-[#f05a28]"> Platform</span>
              </p>
              <p className="text-sm text-slate-500">
                Recovery coaching dashboard
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="/" className="hover:text-[#f05a28]">
              Home
            </a>
            <a href="/login" className="hover:text-[#f05a28]">
              Login
            </a>
            <a href="/signup" className="hover:text-[#f05a28]">
              Signup
            </a>
          </nav>

          <button className="rounded-xl bg-[#f05a28] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#d94e20]">
            Profile
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-4">
        <aside className="rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm md:col-span-1">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f05a28]">
            Navigation
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl bg-[#f05a28] px-4 py-3 font-semibold text-white">
              Dashboard
            </div>

            {["Coaching", "Learning", "Community", "Reflections"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] px-4 py-3 text-slate-700"
                >
                  {item}
                </div>
              )
            )}
          </div>

          <div className="mt-8 rounded-2xl border-l-4 border-[#f05a28] bg-[#fff7f0] p-4">
            <p className="text-sm leading-6 text-slate-700">
              “Technology should amplify care, not replace it.”
            </p>
          </div>
        </aside>

        <section className="space-y-8 md:col-span-3">
          <section className="grid gap-8 rounded-3xl border border-[#eadfd5] bg-white p-8 shadow-sm md:grid-cols-2">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-[#f05a28]/30 bg-[#fff7f0] px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#f05a28]">
                MAUNi Recovery Coaching
              </p>

              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#15172f] md:text-5xl">
                Your recovery journey continues.
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Stay connected to your goals, coaching support, learning
                pathways, and personal recovery capital.
              </p>
            </div>

            <div className="rounded-3xl border border-[#eadfd5] bg-[#fffaf5] p-6">
              <p className="text-lg italic leading-8 text-[#15172f]">
                “A digital space for reflection, structure, and connection —
                designed to support recovery between sessions.”
              </p>

              <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-[#f05a28]">
                MAUNi Platform
              </p>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              {
                label: "Recovery Goals",
                value: "3",
                text: "Active recovery goals in progress.",
              },
              {
                label: "Coaching",
                value: "1",
                text: "Upcoming coaching check-in scheduled.",
              },
              {
                label: "Learning",
                value: "3",
                text: "Learning modules available.",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f05a28]">
                  {card.label}
                </p>

                <h2 className="mt-4 text-4xl font-bold text-[#15172f]">
                  {card.value}
                </h2>

                <p className="mt-3 leading-7 text-slate-600">{card.text}</p>
              </div>
            ))}
          </section>

          <section className="rounded-3xl border border-[#eadfd5] bg-white p-8 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f05a28]">
              MAUNi Reflection Assistant
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#15172f]">
              How are you feeling today?
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Share a reflection, challenge, thought, or recovery experience and
              receive supportive coaching-style guidance.
            </p>

            <div className="mt-6 space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your reflection here..."
                className="min-h-[150px] w-full rounded-3xl border border-[#eadfd5] bg-[#fffaf5] p-5 text-[#15172f] outline-none placeholder:text-slate-400 focus:border-[#f05a28]"
              />

              <button
                onClick={async () => {
                  try {
                    if (!message.trim()) {
                      setReply("Please write a reflection first.");
                      return;
                    }

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
                className="rounded-xl bg-[#f05a28] px-7 py-4 font-semibold text-white shadow-sm hover:bg-[#d94e20]"
              >
                {loading ? "Reflecting..." : "Ask MAUNi"}
              </button>

              <div className="rounded-3xl border border-[#eadfd5] bg-[#fffaf5] p-6 leading-8 text-slate-700">
                {reply}
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f05a28]">
                Current Goals
              </p>

              <div className="mt-6 space-y-4">
                {goals.map((goal) => (
                  <div
                    key={goal}
                    className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-4"
                  >
                    <span className="font-bold text-[#f05a28]">✓</span>{" "}
                    <span className="text-slate-700">{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f05a28]">
                Learning Modules
              </p>

              <div className="mt-6 space-y-4">
                {modules.map((module) => (
                  <div
                    key={module}
                    className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-4"
                  >
                    <p className="font-semibold text-[#15172f]">{module}</p>

                    <p className="mt-1 text-sm text-slate-500">
                      Continue learning pathway
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}