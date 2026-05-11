'use client';

import { useEffect } from 'react';

export default function Home() {
  const features = [
    {
      title: "Learning Pathways",
      text: "Guided content, exercises, and recovery-focused education.",
    },
    {
      title: "Coach Connection",
      text: "Tools for meaningful engagement between coaches and participants.",
    },
    {
      title: "Progress Tracking",
      text: "Reflective tools to support growth, accountability, and change.",
    },
    {
      title: "Community Support",
      text: "Safe spaces for connection, belonging, and encouragement.",
    },
    {
      title: "Recovery Capital",
      text: "Support for building personal, social, and community resources.",
    },
    {
      title: "Organisational Tools",
      text: "A foundation for programmes, teams, reporting, and support systems.",
    },
  ];

  const audiences = [
    "People in recovery",
    "Recovery coaches",
    "Treatment centres",
    "Community organisations",
    "Training providers",
    "Peer support networks",
  ];

  const platformTools = [
    "Personal recovery dashboard",
    "Coaching session notes",
    "Goal setting and reflections",
    "Learning modules",
    "Progress check-ins",
    "Community support spaces",
  ];

  useEffect(() => {
    const loader = document.getElementById('loader');

    const hideLoader = () => {
      loader?.classList.add('hide');
    };

    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
    }

    return () => {
      window.removeEventListener('load', hideLoader);
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section');

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          target.classList.add('in-view');
        } else {
          target.classList.remove('in-view');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach((section) => obs.observe(section));

    return () => {
      obs.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <div id="loader"></div>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-black">
              M
            </div>
            <div className="text-xl font-bold tracking-wide">MAUNi</div>
          </div>

          <div className="hidden gap-8 text-sm text-gray-300 md:flex">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#tools" className="hover:text-white">Tools</a>
            <a href="#coaching" className="hover:text-white">Coaching</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/dashboard"
              className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-black hover:bg-orange-400"
            >
              Get Started
            </a>

            <button className="rounded-full border border-white/20 px-4 py-2 text-sm text-white md:hidden">
              Menu
            </button>
          </div>
        </div>
      </nav>

      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-orange-400">
          U-ACT Recovery Coaching
        </p>

        <h1 className="max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
          A digital platform for recovery, growth, and connection.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 md:text-2xl">
          MAUNi supports people, coaches, organisations, and communities through
          recovery coaching tools, learning pathways, and human connection.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/dashboard"
            className="rounded-full bg-orange-500 px-8 py-4 font-semibold text-black hover:bg-orange-400"
          >
            Explore Platform
          </a>

          <a
            href="#tools"
            className="rounded-full border border-white/30 px-8 py-4 font-semibold hover:bg-white hover:text-black"
          >
            View Tools
          </a>
        </div>

        <div className="mobile-cta mt-6 text-center sm:hidden">
          <a
            href="#connect"
            className="inline-block rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10"
          >
            Partner With Us
          </a>
        </div>

        <div className="mt-20 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-orange-400">
                Recovery
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                Personal Growth
              </h3>

              <p className="mt-4 text-gray-400">
                Track goals, reflect on progress, and strengthen recovery capital.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-orange-400">
                Coaching
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                Human Connection
              </h3>

              <p className="mt-4 text-gray-400">
                Structured support between coaches, peers, and communities.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-orange-400">
                Learning
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                Guided Pathways
              </h3>

              <p className="mt-4 text-gray-400">
                Digital tools, learning modules, and practical recovery resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-orange-400">
              About MAUNi
            </p>
            <h2 className="text-3xl font-bold md:text-5xl">
              Built around dignity, recovery capital, and real-world support.
            </h2>
          </div>

          <p className="text-lg leading-8 text-gray-300">
            MAUNi is being developed as a digital recovery coaching ecosystem —
            helping people access support, learn practical tools, track growth,
            and stay connected to coaches and communities that understand the
            recovery journey.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-orange-400">
            Platform Vision
          </p>

          <h2 className="max-w-3xl text-3xl font-bold md:text-5xl">
            Built to support recovery between sessions, not only during them.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-lg leading-8 text-gray-300">
                “MAUNi gives people a place to return to — a digital space for
                reflection, structure, and encouragement.”
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-lg leading-8 text-gray-300">
                “The platform is designed to strengthen the coaching
                relationship and keep recovery goals visible.”
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-lg leading-8 text-gray-300">
                “Recovery support should be accessible, human, practical, and
                connected.”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-orange-500 px-6 py-8 text-black">
        <div className="mx-auto grid max-w-6xl gap-6 text-center md:grid-cols-3">
          <div>
            <p className="text-3xl font-bold">01</p>
            <p className="mt-2 font-semibold">Reflect</p>
          </div>

          <div>
            <p className="text-3xl font-bold">02</p>
            <p className="mt-2 font-semibold">Connect</p>
          </div>

          <div>
            <p className="text-3xl font-bold">03</p>
            <p className="mt-2 font-semibold">Grow</p>
          </div>
        </div>
      </section>

      <section className="bg-white/[0.03] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-orange-400">
            Who It Supports
          </p>

          <h2 className="max-w-3xl text-3xl font-bold md:text-5xl">
            Built for the people and organisations shaping recovery.
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {audiences.map((audience) => (
              <div
                key={audience}
                className="rounded-2xl border border-white/10 bg-black/40 p-5 text-gray-300"
              >
                {audience}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-orange-400">
            Platform Features
          </p>

          <h2 className="max-w-3xl text-3xl font-bold md:text-5xl">
            Designed for people in recovery and the coaches who walk beside them.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-gray-400">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-orange-400">
              Why MAUNi
            </p>

            <h2 className="text-3xl font-bold md:text-5xl">
              Recovery needs continuity.
            </h2>
          </div>

          <div className="space-y-6 md:col-span-2">
            <p className="text-lg leading-8 text-gray-300">
              Real change happens between conversations, between sessions, and
              inside daily life. MAUNi creates a digital bridge that helps
              people stay connected to their goals, their support network, and
              their own growth.
            </p>

            <p className="text-lg leading-8 text-gray-300">
              The platform is designed to bring structure, reflection, learning,
              and coaching support into one accessible place.
            </p>
          </div>
        </div>
      </section>

      <section id="tools" className="bg-white/[0.03] px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-orange-400">
              Platform Tools
            </p>

            <h2 className="text-3xl font-bold md:text-5xl">
              Practical tools for everyday recovery support.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              MAUNi brings together digital tools that help users reflect,
              learn, connect, plan, and keep moving forward.
            </p>
          </div>

          <div className="grid gap-4">
            {platformTools.map((tool) => (
              <div
                key={tool}
                className="rounded-2xl border border-white/10 bg-black/40 p-5"
              >
                <span className="text-orange-400">✓</span>{" "}
                <span className="text-gray-300">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="coaching" className="px-6 py-24">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/20 to-white/5 p-8 md:p-12">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-orange-300">
            Recovery Coaching
          </p>

          <h2 className="max-w-4xl text-3xl font-bold md:text-5xl">
            Technology should strengthen human connection — not replace it.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            MAUNi is built to support the coaching relationship by creating
            structure, visibility, and continuity between sessions. It helps
            people stay engaged in their growth while giving coaches practical
            tools to support meaningful change.
          </p>
        </div>
      </section>

      <section id="contact" className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-orange-400">
            Coming Soon
          </p>

          <h2 className="text-3xl font-bold md:text-5xl">
            A recovery coaching platform built for real impact.
          </h2>

          <p className="mt-5 text-lg text-gray-300">
            MAUNi is in development as a digital home for learning, coaching,
            connection, reflection, and recovery growth.
          </p>

          <form
            className="cta-form mt-10 grid gap-4"
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
          >
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className="w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us how we can support you"
              className="w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-orange-500 px-8 py-4 font-semibold text-black transition hover:bg-orange-400"
            >
              Contact David
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 MAUNi. Built with U-ACT Recovery Coaching.</p>

          <div className="flex flex-wrap gap-6">
            <a href="https://uact.org.za" className="hover:text-white">
              uact.org.za
            </a>
            <a href="https://mauni.app" className="hover:text-white">
              mauni.app
            </a>
            <a href="https://mauni-ggz.nl" className="hover:text-white">
              mauni-ggz.nl
            </a>
            <a
              href="https://www.skool.com/london-recovery-coaching"
              className="hover:text-white"
            >
              Community
            </a>
            <a href="/privacy-policy.html" className="hover:text-white">
              Privacy
            </a>
            <a href="/terms.html" className="hover:text-white">
              Terms
            </a>
            <a href="/safeguarding.html" className="hover:text-white">
              Safeguarding
            </a>
            <a href="/governance.html" className="hover:text-white">
              Governance
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}