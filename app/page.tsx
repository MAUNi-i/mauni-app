import Image from "next/image";

export default function Home() {
  const features = [
    {
      label: "Recovery",
      title: "Personal Growth",
      text: "Track goals, reflect on progress, and strengthen recovery capital.",
      icon: "🌱",
    },
    {
      label: "Coaching",
      title: "Human Connection",
      text: "Structured support between coaches, peers, and communities.",
      icon: "👥",
    },
    {
      label: "Learning",
      title: "Guided Pathways",
      text: "Digital tools, learning modules, and practical recovery resources.",
      icon: "📖",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#15172f]">
      <header className="border-b border-[#eadfd5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white">
              <Image
                src="/mauni-m.jpg"
                alt="MAUNi logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <span className="text-2xl font-bold tracking-tight">MAUNi</span>
          </a>

          <nav className="hidden items-center gap-10 text-sm font-medium text-slate-700 md:flex">
            <a href="#about" className="hover:text-[#f05a28]">
              About
            </a>
            <a href="#features" className="hover:text-[#f05a28]">
              Features
            </a>
            <a href="#tools" className="hover:text-[#f05a28]">
              Tools
            </a>
            <a href="#coaching" className="hover:text-[#f05a28]">
              Coaching
            </a>
            <a href="#contact" className="hover:text-[#f05a28]">
              Contact
            </a>
          </nav>

          <a
            href="/signup"
            className="rounded-full bg-[#f05a28] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#d94e20]"
          >
            Get Started
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[#eadfd5]">
        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
          <div className="relative z-10">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.45em] text-[#f05a28]">
              U-ACT Recovery Coaching
            </p>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight text-[#15172f] md:text-7xl">
              A digital platform for recovery, growth, and connection
              <span className="text-[#f05a28]">.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-600">
              MAUNi supports people, coaches, organisations, and communities
              through recovery coaching tools, learning pathways, and human
              connection.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/dashboard"
                className="rounded-full bg-[#f05a28] px-9 py-4 text-center font-bold text-white shadow-sm hover:bg-[#d94e20]"
              >
                Explore Platform
              </a>

              <a
                href="#tools"
                className="rounded-full border border-[#f05a28] bg-white px-9 py-4 text-center font-bold text-[#f05a28] hover:bg-[#fff4eb]"
              >
                View Tools
              </a>
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[560px]">
            <div className="absolute -right-24 top-0 h-[620px] w-[620px] rounded-full border border-[#eadfd5]" />

            <div className="relative ml-auto h-[520px] w-full overflow-hidden rounded-l-[220px] rounded-r-[2rem] border border-[#eadfd5] bg-white shadow-sm lg:w-[620px]">
              <Image
                src="/mauni-hero.jpg"
                alt="MAUNi recovery community"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-[#eadfd5] bg-white p-8 shadow-sm"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1e7] text-3xl">
                {feature.icon}
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.35em] text-[#f05a28]">
                {feature.label}
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#15172f]">
                {feature.title}
              </h2>

              <div className="mt-5 h-0.5 w-10 bg-[#f05a28]" />

              <p className="mt-5 max-w-sm leading-8 text-slate-600">
                {feature.text}
              </p>

              <a
                href="/dashboard"
                className="mt-8 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#f05a28] text-[#f05a28] hover:bg-[#f05a28] hover:text-white"
              >
                →
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 rounded-3xl border border-[#eadfd5] bg-white p-8 shadow-sm md:grid-cols-2 md:p-12">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#f05a28]">
              About MAUNi
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#15172f] md:text-5xl">
              Built around dignity, recovery capital, and real-world support.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-9 text-slate-600">
            <p>
              MAUNi is being developed as a digital recovery coaching ecosystem
              — helping people access support, learn practical tools, track
              growth, and stay connected to coaches and communities that
              understand the recovery journey.
            </p>

            <p>
              Technology should strengthen human connection, not replace it.
              MAUNi creates continuity between coaching conversations and daily
              life.
            </p>
          </div>
        </div>
      </section>

      <section id="tools" className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#f05a28]">
              Platform Tools
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-[#15172f] md:text-5xl">
              Practical tools for everyday recovery support.
            </h2>

            <p className="mt-6 text-lg leading-9 text-slate-600">
              MAUNi brings together digital tools that help users reflect,
              learn, connect, plan, and keep moving forward.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              "Personal recovery dashboard",
              "AI reflection assistant",
              "Coaching session notes",
              "Goal setting and reflections",
              "Learning modules",
              "Progress check-ins",
            ].map((tool) => (
              <div
                key={tool}
                className="rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5 text-slate-700"
              >
                <span className="font-bold text-[#f05a28]">✓</span>{" "}
                <span>{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="coaching" className="px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-3xl border border-[#eadfd5] bg-[#fffaf5] p-8 shadow-sm md:p-12">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#f05a28]">
            Recovery Coaching
          </p>

          <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[#15172f] md:text-5xl">
            Recovery support should be accessible, human, practical, and
            connected.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-600">
            MAUNi is built to support the coaching relationship by creating
            structure, visibility, and continuity between sessions.
          </p>
        </div>
      </section>

      <section id="contact" className="border-t border-[#eadfd5] bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#f05a28]">
            Coming Soon
          </p>

          <h2 className="text-4xl font-semibold tracking-tight text-[#15172f] md:text-5xl">
            A recovery coaching platform built for real impact.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            MAUNi is in development as a digital home for learning, coaching,
            connection, reflection, and recovery growth.
          </p>

          <a
            href="mailto:david@uact.org.za"
            className="mt-8 inline-block rounded-full bg-[#f05a28] px-8 py-4 font-bold text-white hover:bg-[#d94e20]"
          >
            Contact David
          </a>
        </div>
      </section>

      <footer className="border-t border-[#eadfd5] bg-[#fbf7ef] px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 MAUNi. Built with U-ACT Recovery Coaching.</p>

          <div className="flex gap-6">
            <a href="#about" className="hover:text-[#f05a28]">
              About
            </a>
            <a href="#features" className="hover:text-[#f05a28]">
              Features
            </a>
            <a href="#tools" className="hover:text-[#f05a28]">
              Tools
            </a>
            <a href="#coaching" className="hover:text-[#f05a28]">
              Coaching
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}