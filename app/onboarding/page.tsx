"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function OnboardingPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [recoveryGoal, setRecoveryGoal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      }
    }

    checkUser();
  }, [router]);

  async function handleSaveProfile() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: fullName,
        recovery_goal: recoveryGoal,
        onboarding_complete: true,
      });

      if (error) {
        console.error(error);
        alert("Could not save profile.");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-12 text-[#111827]">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#eadfd5] bg-white p-10 shadow-sm">
        <div className="mb-8 flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-white">
            <Image
              src="/mauni-m.jpg"
              alt="MAUNi logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#15172f]">
              Welcome to MAUNi
            </h1>

            <p className="mt-1 text-slate-600">
              Let’s personalise your recovery coaching experience.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#f05a28]">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5 outline-none focus:border-[#f05a28]"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#f05a28]">
              Recovery Goal
            </label>

            <textarea
              value={recoveryGoal}
              onChange={(e) => setRecoveryGoal(e.target.value)}
              placeholder="What would you like MAUNi to support you with?"
              className="min-h-[160px] w-full rounded-2xl border border-[#eadfd5] bg-[#fffaf5] p-5 outline-none focus:border-[#f05a28]"
            />
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={loading}
            className="rounded-2xl bg-[#f05a28] px-8 py-4 font-semibold text-white shadow-sm hover:bg-[#d94e20]"
          >
            {loading ? "Saving..." : "Continue to Dashboard"}
          </button>
        </div>
      </div>
    </main>
  );
}