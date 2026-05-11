export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">
        <div className="mb-6">
          <a
            href="/"
            className="text-sm text-gray-400 hover:text-white"
          >
            ← Back to Home
          </a>
        </div>

        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-black">
            M
          </div>

          <h1 className="mt-6 text-4xl font-bold">
            Create Account
          </h1>

          <p className="mt-3 text-gray-400">
            Begin your MAUNi recovery journey.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-orange-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-orange-500 py-3 font-semibold text-black transition hover:bg-orange-400"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-orange-400 hover:text-orange-300">
            Sign in
          </a>
        </div>
      </div>
    </main>
  );
}