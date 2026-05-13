"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Temporary MVP behavior:
    // stores the email locally and sends user to dashboard.
    // Later this can be replaced with Supabase magic link auth.
    localStorage.setItem("userEmail", email);
    setSubmitted(true);

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#FCFBF9] text-[#1E1A17]">
      <header className="bg-[#FF9933]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6 md:py-7">
          <Link href="/" className="flex items-center">
            <img
              src="/qd-logo-white.png"
              alt="QDcme"
              className="h-24 w-auto object-contain"
            />
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium text-white">
            <Link href="/" className="hover:opacity-80 transition">
              Home
            </Link>
            <Link href="/np-pa" className="hover:opacity-80 transition">
              NP / PA
            </Link>
            <Link href="/oncology" className="hover:opacity-80 transition">
              Oncology
            </Link>
            <Link href="/live-events" className="hover:opacity-80 transition">
              Live Events
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto flex max-w-7xl items-center justify-center px-8 py-20">
        <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C96F12]">
              Welcome Back
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight text-[#1E1A17]">
              Sign in to continue
              <br />
              your learning
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
              Access your programs, saved progress, and certificates through a
              simple secure email login. No password required.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C96F12]">
                  Continue
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Resume active programs without friction.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C96F12]">
                  Track
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  View progress, completions, and learning history.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C96F12]">
                  Access
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Retrieve certificates and upcoming education.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-xl rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-sm">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C96F12]">
                  QDcme Login
                </p>
                <h2 className="mt-3 text-3xl font-bold text-[#1E1A17]">
                  Welcome back
                </h2>
                <p className="mt-3 text-base leading-7 text-neutral-600">
                  Enter your email and we’ll securely sign you in.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-neutral-300 px-5 py-4 text-base outline-none transition focus:border-[#FF9933] focus:ring-2 focus:ring-[#FFD7AD]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#FF9933] px-6 py-4 text-base font-semibold text-white transition hover:opacity-90"
                >
                  {submitted ? "Signing you in..." : "Send Secure Login Link"}
                </button>
              </form>

              <div className="mt-6 rounded-2xl bg-[#FFF7ED] px-5 py-4 text-sm leading-6 text-neutral-600">
                No password required. For this MVP, signing in will take you
                directly to your dashboard. Later we can connect this to
                Supabase magic-link authentication.
              </div>

              <div className="mt-8 border-t border-neutral-200 pt-6 text-center">
                <p className="text-sm text-neutral-600">
                  New to QDcme?
                </p>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="mt-3 rounded-full border border-[#FF9933] px-5 py-2.5 text-sm font-semibold text-[#FF9933] transition hover:bg-[#FFF3E6]"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}