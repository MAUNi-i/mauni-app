import Image from "next/image";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbf7ef] px-6 py-12 text-[#15172f]">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#eadfd5] bg-white shadow-sm md:grid-cols-2">
        <section className="hidden bg-[#fff7f0] p-10 md:flex md:flex-col md:justify-between">
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

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#f05a28]">
              Start Your Journey
            </p>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight">
              Create a space for reflection, growth, and connection.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Join MAUNi to access recovery coaching tools, learning pathways,
              personal goals, and supportive AI reflection.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            Built around dignity, recovery capital, and human connection.
          </p>
        </section>

        <section className="p-8 md:p-12">
          <a
            href="/"
            className="mb-8 inline-block text-sm font-medium text-slate-500 hover:text-[#f05a28]"
          >
            ← Back to Home
          </a>

          <div className="mb-8 md:hidden">
            <div className="relative mb-4 h-14 w-14 overflow-hidden rounded-xl bg-white">
              <Image
                src="/mauni-m.jpg"
                alt="MAUNi logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-[#f05a28]">
            Create Account
          </p>

          <h2 className="text-4xl font-semibold tracking-tight">
            Begin with MAUNi.
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Create your account to begin your recovery coaching journey.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf5] px-4 py-4 text-[#15172f] outline-none placeholder:text-slate-400 focus:border-[#f05a28]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf5] px-4 py-4 text-[#15172f] outline-none placeholder:text-slate-400 focus:border-[#f05a28]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf5] px-4 py-4 text-[#15172f] outline-none placeholder:text-slate-400 focus:border-[#f05a28]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#f05a28] py-4 font-bold text-white shadow-sm hover:bg-[#d94e20]"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-[#f05a28]">
              Sign in
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}