"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
function getProgramHref(program: {
  useLandingPage?: string;
  landingPageLink?: string;
  href?: string;
}) {
  if (program.useLandingPage === "yes" && program.landingPageLink) {
    return program.landingPageLink;
  }

  return program.landingPageLink || program.href || "#";
}
export default function OncologyPage() {
  const [userEmail, setUserEmail] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

    const oncologyPrograms = [
    {
  title: "Molecular Testing in NSCLC",
  description:
    "Focused oncology education built around biomarker testing, treatment selection, and practical application in lung cancer care.",
  href: "https://qdcme.com/nsclc.html",
  useLandingPage: "yes",
  landingPageLink: "https://qdcme.com/nsclc.html",
  sampleHref: "https://qdcme.com/nsclc.html",
  programType: "Adaptive Digital Education",
  modules: "4 Modules",
  credits: "0.75 CME",
  duration: "30 mins",
  accreditor: "Montefiore",
  badge1: "Lung Cancer",
  badge2: "Precision Medicine",
},
    {
      title: "Breast Cancer TNBC Case Series",
      description:
        "Case-based learning designed for oncology teams managing evolving treatment decisions in breast cancer care.",
      href: "/oncology",
      useLandingPage: "yes",
      landingPageLink: "/programs/breast-cancer-tnbc-case-series",
      sampleHref: "/oncology",
      programType: "Case Based Learning",
      modules: "3 Modules",
      credits: "0.75 CME",
      duration: "30 mins",
      accreditor: "Montefiore",
      badge1: "Breast Cancer",
      badge2: "Case Based",
    },
    {
      title: "Managing Immunotherapy Toxicities",
      description:
        "Practical education for oncology clinicians focused on adverse event recognition, supportive care, and treatment decisions.",
      href: "/oncology",
      useLandingPage: "yes",
      landingPageLink: "/programs/managing-immunotherapy-toxicities",
      sampleHref: "/oncology",
      programType: "Microlearning",
      modules: "2 Modules",
      credits: "0.50 CME",
      duration: "20 mins",
      accreditor: "Montefiore",
      badge1: "Immunotherapy",
      badge2: "Supportive Care",
    },
    {
      title: "GI Oncology Case Series",
      description:
        "Case-based education focused on treatment decisions, sequencing strategies, and real-world GI oncology care.",
      href: "/oncology",
      useLandingPage: "yes",
      landingPageLink: "/programs/gi-oncology-case-series",
      sampleHref: "/oncology",
      programType: "Case Based Learning",
      modules: "3 Modules",
      credits: "0.75 CME",
      duration: "30 mins",
      accreditor: "Montefiore",
      badge1: "GI Cancer",
      badge2: "Case Based",
    },
  ];

    const tumorSpotlights = [
    {
      title: "Sequencing Therapy in Advanced NSCLC",
      description:
        "Focused oncology education for clinicians making sequencing and treatment decisions in advanced NSCLC.",
      href: "/oncology",
      useLandingPage: "yes",
      landingPageLink: "/programs/sequencing-therapy-advanced-nsclc",
      sampleHref: "/oncology",
      area: "Lung Cancer",
      modules: "3 Modules",
      credits: "0.75 CME",
      duration: "30 mins",
      accreditor: "Montefiore",
      badge1: "NSCLC",
      badge2: "Treatment Sequencing",
    },
    {
      title: "HER2-Low and Evolving Treatment Decisions",
      description:
        "Education designed for breast oncology teams navigating current treatment changes and real-world clinical decisions.",
      href: "/oncology",
      useLandingPage: "yes",
      landingPageLink: "/programs/her2-low-evolving-treatment-decisions",
      sampleHref: "/oncology",
      area: "Breast Cancer",
      modules: "2 Modules",
      credits: "0.50 CME",
      duration: "20 mins",
      accreditor: "Montefiore",
      badge1: "Breast Cancer",
      badge2: "Clinical Update",
    },
    {
      title: "Managing Adverse Events in Melanoma Care",
      description:
        "Practical melanoma education focused on immunotherapy management, toxicity recognition, and supportive care.",
      href: "/oncology",
      useLandingPage: "yes",
      landingPageLink: "/programs/managing-adverse-events-melanoma-care",
      sampleHref: "/oncology",
      area: "Melanoma",
      modules: "2 Modules",
      credits: "0.50 CME",
      duration: "20 mins",
      accreditor: "Montefiore",
      badge1: "Melanoma",
      badge2: "Immunotherapy",
    },
    {
      title: "GI Cancer Treatment Updates",
      description:
        "Focused education on evolving treatment strategies and real-world clinical decisions in GI oncology.",
      href: "/oncology",
      useLandingPage: "yes",
      landingPageLink: "/programs/gi-cancer-treatment-updates",
      sampleHref: "/oncology",
      area: "GI Cancers",
      modules: "3 Modules",
      credits: "0.75 CME",
      duration: "30 mins",
      accreditor: "Montefiore",
      badge1: "GI Cancer",
      badge2: "Clinical Update",
    },
  ];
  return (
    <main className="min-h-screen bg-[#F7F4EF] text-[#1F1A17]">
      <header className="relative">
        <div className="grid h-[110px] grid-cols-3 overflow-hidden">
          <div className="bg-[#C9EAE6]" />
          <div className="bg-[#BDE5EA]" />
          <div className="bg-[#B1E0E7]" />
        </div>

        <div className="absolute inset-0">
          <div className="mx-auto flex h-[110px] max-w-7xl items-center justify-between px-8">
            <Link href="/" className="flex items-center">
              <img
                src="/qd-logo-white.png"
                alt="QDcme"
                className="h-24 w-auto cursor-pointer"
              />
            </Link>

            <nav className="flex items-center gap-6 text-sm font-medium text-[#1E1A17]">
              <Link href="/">Home</Link>
              <Link href="/np-pa">NP / PA</Link>
              <Link href="/oncology" className="underline underline-offset-4">
                Oncology
              </Link>
              <Link href="/live-events">Live Events</Link>

              {userEmail ? (
                <>
                  <Link href="/dashboard" className="font-semibold">
                    My Dashboard
                  </Link>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1E1A17]/80">
                      Welcome, {userEmail.split("@")[0]}
                    </span>
                    <button
                      onClick={() => {
                        localStorage.removeItem("userEmail");
                        window.location.href = "/";
                      }}
                      className="mt-1 rounded-full bg-white/40 px-4 py-2 text-xs font-semibold text-[#1E1A17] transition hover:bg-white/60"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold shadow-sm transition hover:bg-neutral-100"
                  >
                    <span className="text-[#6E98A5]">Login</span>
                  </Link>

                  <button
                    onClick={() => setShowCreateAccount(true)}
                    className="rounded-full bg-[#A9DCE2] px-5 py-2.5 text-sm font-semibold text-[#1E1A17] shadow-sm transition hover:bg-[#9FD3DA]"
                  >
                    Create Account
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {showCreateAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6E98A5]">
                  Create Account
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                  Create your learner profile
                </h2>
              </div>

              <button
                onClick={() => setShowCreateAccount(false)}
                className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700"
              >
                Close
              </button>
            </div>

            <p className="mt-4 text-neutral-600">
              Set up your account to access oncology programs, save progress, and
              manage certificates.
            </p>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-7xl px-6 py-7 lg:px-8">
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B46E22]">
          Home / Oncology Education
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_320px]">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#DCC8B0] bg-white shadow-sm">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#C9EAE6] via-[#BDE5EA] to-[#B1E0E7]" />
            <div className="absolute right-[-36px] top-[-22px] h-24 w-24 rounded-full bg-[#BDE5EA]/25 blur-3xl" />
            <div className="absolute left-[-20px] bottom-[-20px] h-20 w-20 rounded-full bg-[#FF9933]/10 blur-2xl" />

            <div className="px-6 py-6 md:px-8 md:py-7">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-full border border-[#D6E9EC] bg-[#F1FAFB] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E98A5]">
                  Oncology Education
                </div>
                <span className="rounded-full bg-[#EAF4F6] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#4E7D8A]">
                  Tumor-Specific
                </span>
                <span className="rounded-full bg-[#FFF3E6] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C96F12]">
                  Community + Academic
                </span>
              </div>

              <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-[#1F1A17] md:text-[2.15rem]">
                Programs for Oncologists, Community Oncologists &amp; Oncology
                APPs
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#665E57]">
                Tumor-specific education in precision medicine, immunotherapy,
                molecular testing, case-based learning, and conference-driven
                clinical updates.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700">
                  Precision Medicine
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700">
                  Case-Based Learning
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700">
                  Oncology APP-Focused
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
              <Link
  href="/oncology/programs"
  className="inline-flex items-center justify-center rounded-full bg-[#6E98A5] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
>
  Browse All Oncology Programs
</Link>
                <Link
                  href="/live-events"
                  className="rounded-full border border-[#B9D8DE] bg-white px-5 py-2.5 text-sm font-semibold text-[#4E7D8A] transition hover:bg-[#F8FCFD]"
                >
                  Upcoming Meetings
                </Link>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#DCC8B0] bg-white shadow-sm">
            <div className="relative h-16 w-full overflow-hidden">
              <div className="flex h-full w-full">
                <div className="w-1/3 bg-[#C9EAE6]" />
                <div className="w-1/3 bg-[#BDE5EA]" />
                <div className="w-1/3 bg-[#B1E0E7]" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold tracking-wide text-[#1E1A17]">
                  Oncology onPoint
                </span>
              </div>
            </div>

            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E98A5]">
                Featured Series
              </p>

              <h2 className="mt-3 text-xl font-bold leading-tight text-neutral-900">
                Focused oncology education for real workflow
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#EAF4F6] px-3 py-1 text-xs font-semibold text-[#4E7D8A]">
                  4 Modules
                </span>
                <span className="rounded-full bg-[#FFF3E6] px-3 py-1 text-xs font-semibold text-[#C96F12]">
                  0.75 CME
                </span>
                <span className="rounded-full bg-[#F3F7F8] px-3 py-1 text-xs font-semibold text-[#5F7880]">
                  30 mins
                </span>
              </div>

              <p className="mt-3 text-xs font-medium text-neutral-500">
                Accredited by Montefiore
              </p>

              <p className="mt-4 text-sm leading-6 text-neutral-600">
                Tumor-specific education, clinical updates, and practical decision
                support for oncologists and oncology APPs.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <button className="rounded-full bg-[#B0E0E6] px-4 py-2.5 text-sm font-semibold text-[#1E1A17] transition hover:opacity-90">
                  Start Program
                </button>
                <button className="rounded-full border border-[#FF9933] bg-white px-4 py-2.5 text-sm font-semibold text-[#C96F12] transition hover:bg-[#FFF8F0]">
                  Sample View
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-[16px] border border-[#DCC8B0] bg-white p-4 shadow-sm">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C837B]">
              Tumor Areas
            </div>
            <div className="mt-1 text-3xl font-bold">10+</div>
          </div>

          <div className="rounded-[16px] border border-[#DCC8B0] bg-white p-4 shadow-sm">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C837B]">
              Oncology Programs
            </div>
            <div className="mt-1 text-3xl font-bold">50+</div>
          </div>

          <div className="rounded-[16px] border border-[#DCC8B0] bg-white p-4 shadow-sm">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C837B]">
              Live Meetings
            </div>
            <div className="mt-1 text-3xl font-bold">Quarterly</div>
          </div>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="space-y-4">
            <div className="rounded-[18px] border border-[#DCC8B0] bg-white p-5 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8C837B]">
                Audience
              </div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="font-semibold text-[#6E98A5]">Oncologists</div>
                <div className="text-[#665E57]">Community Oncologists</div>
                <div className="text-[#665E57]">Oncology APP’s</div>
              </div>

              <div className="mt-5 border-t border-[#E8DDD0] pt-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8C837B]">
                  Tumor Area
                </div>
                <div className="mt-3 space-y-2 text-sm text-[#665E57]">
                  <div className="font-semibold text-[#6E98A5]">All Oncology</div>
                  <div>Breast Cancer</div>
                  <div>Lung Cancer</div>
                  <div>Melanoma</div>
                  <div>GI Cancers</div>
                  <div>GU Cancers</div>
                  <div>Hematologic Malignancies</div>
                </div>
              </div>

              <div className="mt-5 border-t border-[#E8DDD0] pt-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8C837B]">
                  Program Type
                </div>
                <div className="mt-3 space-y-2 text-sm text-[#665E57]">
                  <div className="font-semibold text-[#6E98A5]">Microlearning</div>
                  <div>Adaptive Digital Education</div>
                  <div>Case Based Learning</div>
                  <div>Conference Highlights</div>
                  <div>Live Meetings</div>
                </div>
              </div>
            </div>

            <div className="rounded-[18px] border border-[#DCC8B0] bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-[#6E98A5]">
                Get oncology updates
              </div>
              <p className="mt-2 text-xs leading-5 text-[#6A635C]">
                Capture email or NPI so oncology programs, tumor-area updates,
                and meeting invites can be personalized.
              </p>

              <input
                type="text"
                placeholder="Email or NPI"
                className="mt-4 w-full rounded-full border border-[#DCC8B0] px-4 py-2 text-sm outline-none focus:border-[#6E98A5]"
              />

              <button className="mt-4 w-full rounded-full bg-[#6E98A5] px-4 py-2 text-sm font-semibold text-white">
                Subscribe
              </button>
            </div>
          </aside>

          <div className="space-y-8">
            <section>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-bold tracking-tight text-[#1F1A17]">
                    Featured Oncology Programs
                  </h3>
                  <p className="mt-1 text-sm text-[#6A635C]">
                    Programs designed for oncologists, community oncology, and
                    oncology APPs.
                  </p>
                </div>

                <a href="#" className="text-sm font-semibold text-[#C96F12]">
                  View all →
                </a>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
             {oncologyPrograms.map((program) => (
  <div
    key={program.title}
    className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    <div className="relative h-28 w-full overflow-hidden">
      <div className="flex h-full w-full">
        <div className="w-1/3 bg-[#C9EAE6]" />
        <div className="w-1/3 bg-[#BDE5EA]" />
        <div className="w-1/3 bg-[#B1E0E7]" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold tracking-wide text-[#1E1A17]">
          Oncology
        </span>
      </div>
    </div>

    <div className="flex flex-1 flex-col p-8">
      <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#6E98A5]">
        {program.programType}
      </p>

      <h4 className="mt-4 text-3xl font-semibold leading-tight text-neutral-900">
        {program.title}
      </h4>

      <p className="mt-5 min-h-[110px] text-base leading-8 text-neutral-600">
        {program.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#EAF4F6] px-4 py-2 text-sm font-semibold text-[#4E7D8A]">
          {program.modules}
        </span>
        <span className="rounded-full bg-[#FFF3E6] px-4 py-2 text-sm font-semibold text-[#C96F12]">
          {program.credits}
        </span>
        <span className="rounded-full bg-[#F3F7F8] px-4 py-2 text-sm font-semibold text-[#5F7880]">
          {program.duration}
        </span>
      </div>

      <p className="mt-4 text-sm font-medium text-neutral-500">
        Accredited by {program.accreditor}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-semibold">
        <span className="rounded-full bg-[#EAF4F6] px-2 py-1 text-[#4E7D8A]">
          {program.badge1}
        </span>
        <span className="rounded-full bg-[#EAF4F6] px-2 py-1 text-[#4E7D8A]">
          {program.badge2}
        </span>
      </div>

      {/* ✅ BUTTONS FIXED HERE */}
      <div className="mt-auto flex flex-wrap gap-3 pt-8">
        {/* Start Program */}
        <a
          href={
            program.useLandingPage === "yes"
              ? program.landingPageLink
              : program.href
          }
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#FF9933] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e68a1f]"
        >
          Start Program
        </a>

        {/* Sample View */}
        {program.sampleHref && (
          <a
            href={program.sampleHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#FF9933] bg-white px-5 py-3 text-sm font-semibold text-[#C96F12] transition hover:bg-[#FFF8F0]"
          >
            Sample View
          </a>
        )}
      </div>
    </div>
  </div>
))}
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-bold tracking-tight text-[#1F1A17]">
                    Tumor Area Spotlights
                  </h3>
                  <p className="mt-1 text-sm text-[#6A635C]">
                    Programs grouped by the disease and treatment areas most
                    relevant to your oncology audience.
                  </p>
                </div>

                <a href="#" className="text-sm font-semibold text-[#C96F12]">
                  Browse all tumor areas →
                </a>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {tumorSpotlights.map((program) => (
                  <Link
                    key={program.title}
                    href={getProgramHref(program)}
                    className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-28 w-full overflow-hidden">
                      <div className="flex h-full w-full">
                        <div className="w-1/3 bg-[#C9EAE6]" />
                        <div className="w-1/3 bg-[#BDE5EA]" />
                        <div className="w-1/3 bg-[#B1E0E7]" />
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold tracking-wide text-[#1E1A17]">
                          {program.area}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-8">
                      <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#6E98A5]">
                        Tumor Spotlight
                      </p>

                      <h4 className="mt-4 text-3xl font-semibold leading-tight text-neutral-900">
                        {program.title}
                      </h4>

                      <p className="mt-5 min-h-[110px] text-base leading-8 text-neutral-600">
                        {program.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#EAF4F6] px-4 py-2 text-sm font-semibold text-[#4E7D8A]">
                          {program.modules}
                        </span>
                        <span className="rounded-full bg-[#FFF3E6] px-4 py-2 text-sm font-semibold text-[#C96F12]">
                          {program.credits}
                        </span>
                        <span className="rounded-full bg-[#F3F7F8] px-4 py-2 text-sm font-semibold text-[#5F7880]">
                          {program.duration}
                        </span>
                      </div>

                      <p className="mt-4 text-sm font-medium text-neutral-500">
                        Accredited by {program.accreditor}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-semibold">
                        <span className="rounded-full bg-[#EAF4F6] px-2 py-1 text-[#4E7D8A]">
                          {program.badge1}
                        </span>
                        <span className="rounded-full bg-[#EAF4F6] px-2 py-1 text-[#4E7D8A]">
                          {program.badge2}
                        </span>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-3 pt-8">
                        <div className="rounded-full bg-[#B0E0E6] px-5 py-3 text-sm font-semibold text-[#1E1A17] transition hover:opacity-90">
                          Start Program
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              program.sampleHref,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }}
                          className="rounded-full border border-[#FF9933] bg-white px-5 py-3 text-sm font-semibold text-[#C96F12] transition hover:bg-[#FFF8F0]"
                        >
                          Sample View
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}