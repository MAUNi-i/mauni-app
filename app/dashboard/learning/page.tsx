"use client";

const modules = [
  {
    title: "Recovery Foundations",
    description:
      "Explore the foundations of recovery, personal change, hope, identity, and support.",
    status: "Available",
  },
  {
    title: "Building Recovery Capital",
    description:
      "Understand the personal, social, community, and cultural resources that support recovery.",
    status: "Available",
  },
  {
    title: "Goal Setting and Reflection",
    description:
      "Use structured reflection and realistic goals to strengthen your recovery journey.",
    status: "Available",
  },
  {
    title: "Connection and Belonging",
    description:
      "Reflect on relationships, community, peer support, and meaningful connection.",
    status: "Coming soon",
  },
  {
    title: "Sustaining Change",
    description:
      "Develop practices for maintaining progress, managing setbacks, and staying connected.",
    status: "Coming soon",
  },
];

export default function LearningPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-10 text-[#111827]">
      <div className="mx-auto max-w-5xl">
        <a href="/dashboard" className="text-sm font-semibold text-[#f05a28]">
          ← Back to Dashboard
        </a>

        <section className="mt-6 rounded-3xl border border-[#eadfd5] bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f05a28]">
            MAUNi Learning
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#15172f]">
            Recovery learning pathways
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Explore learning modules designed to support reflection, recovery
            capital, personal growth, and meaningful change.
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          {modules.map((module) => (
            <div
              key={module.title}
              className="rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f05a28]">
                {module.status}
              </p>

              <h2 className="mt-4 text-2xl font-semibold text-[#15172f]">
                {module.title}
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                {module.description}
              </p>

              <button
                disabled={module.status !== "Available"}
                className="mt-6 rounded-2xl bg-[#f05a28] px-6 py-3 font-semibold text-white shadow-sm hover:bg-[#d94e20] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {module.status === "Available"
                  ? "Open Module"
                  : "Coming Soon"}
              </button>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}