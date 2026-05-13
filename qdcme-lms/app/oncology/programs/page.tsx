"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Program = {
  title: string;
  description: string;
  href: string;
  sampleHref?: string;
  programType: string;
  tumorType: string;
  modules: string;
  credits: string;
  duration: string;
  accreditor: string;
  badge1: string;
  badge2: string;
  isNew?: boolean;
};

export default function OncologyProgramsPage() {
  const [userEmail, setUserEmail] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [sortMode, setSortMode] = useState<"programType" | "tumorType">("programType");
  const [selectedTumor, setSelectedTumor] = useState("All Tumor Types");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const oncologyPrograms: Program[] = [
    {
      title: "Molecular Testing in NSCLC",
      description:
        "Focused oncology education built around biomarker testing, treatment selection, and practical application in lung cancer care.",
      href: "/oncology",
      sampleHref: "/oncology",
      programType: "Adaptive Digital Education",
      tumorType: "Lung Cancer",
      modules: "4 Modules",
      credits: "0.75 CME",
      duration: "30 mins",
      accreditor: "Montefiore",
      badge1: "Lung Cancer",
      badge2: "Precision Medicine",
      isNew: true,
    },
    {
      title: "Breast Cancer TNBC Case Series",
      description:
        "Case-based learning designed for oncology teams managing evolving treatment decisions in breast cancer care.",
      href: "/oncology",
      sampleHref: "/oncology",
      programType: "Case Based Learning",
      tumorType: "Breast Cancer",
      modules: "3 Modules",
      credits: "0.75 CME",
      duration: "30 mins",
      accreditor: "Montefiore",
      badge1: "Breast Cancer",
      badge2: "Case Based",
      isNew: true,
    },
    {
      title: "Managing Immunotherapy Toxicities",
      description:
        "Practical education for oncology clinicians focused on adverse event recognition, supportive care, and treatment decisions.",
      href: "/oncology",
      sampleHref: "/oncology",
      programType: "Microlearning",
      tumorType: "Supportive Care",
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
      sampleHref: "/oncology",
      programType: "Case Based Learning",
      tumorType: "GI Cancers",
      modules: "3 Modules",
      credits: "0.75 CME",
      duration: "30 mins",
      accreditor: "Montefiore",
      badge1: "GI Cancer",
      badge2: "Case Based",
    },
    {
      title: "HER2-Low and Evolving Treatment Decisions",
      description:
        "Education designed for breast oncology teams navigating current treatment changes and real-world clinical decisions.",
      href: "/oncology",
      sampleHref: "/oncology",
      programType: "Microlearning",
      tumorType: "Breast Cancer",
      modules: "2 Modules",
      credits: "0.50 CME",
      duration: "20 mins",
      accreditor: "Montefiore",
      badge1: "Breast Cancer",
      badge2: "Clinical Update",
    },
    {
      title: "Sequencing Therapy in Advanced NSCLC",
      description:
        "Focused oncology education for clinicians making sequencing and treatment decisions in advanced NSCLC.",
      href: "/oncology",
      sampleHref: "/oncology",
      programType: "Precision Medicine",
      tumorType: "Lung Cancer",
      modules: "3 Modules",
      credits: "0.75 CME",
      duration: "30 mins",
      accreditor: "Montefiore",
      badge1: "NSCLC",
      badge2: "Treatment Sequencing",
    },
    {
      title: "Managing Adverse Events in Melanoma Care",
      description:
        "Practical melanoma education focused on immunotherapy management, toxicity recognition, and supportive care.",
      href: "/oncology",
      sampleHref: "/oncology",
      programType: "Microlearning",
      tumorType: "Melanoma",
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
      sampleHref: "/oncology",
      programType: "Conference Highlights",
      tumorType: "GI Cancers",
      modules: "3 Modules",
      credits: "0.75 CME",
      duration: "30 mins",
      accreditor: "Montefiore",
      badge1: "GI Cancer",
      badge2: "Clinical Update",
    },
  ];

  const tumorTypes = [
    "All Tumor Types",
    "Breast Cancer",
    "Lung Cancer",
    "GI Cancers",
    "Melanoma",
    "GU Cancers",
    "Hematologic Malignancies",
    "Supportive Care",
  ];

  const filteredPrograms = useMemo(() => {
    if (selectedTumor === "All Tumor Types") return oncologyPrograms;
    return oncologyPrograms.filter((program) => program.tumorType === selectedTumor);
  }, [oncologyPrograms, selectedTumor]);

  const groupedPrograms = useMemo(() => {
    const groups: Record<string, Program[]> = {};

    filteredPrograms.forEach((program) => {
      const key = sortMode === "programType" ? program.programType : program.tumorType;
      if (!groups[key]) groups[key] = [];
      groups[key].push(program);
    });

    return groups;
  }, [filteredPrograms, sortMode]);

  const groupOrder =
    sortMode === "programType"
      ? [
          "Microlearning",
          "Case Based Learning",
          "Adaptive Digital Education",
          "Precision Medicine",
          "Conference Highlights",
          "Live Meetings",
        ]
      : [
          "Breast Cancer",
          "Lung Cancer",
          "GI Cancers",
          "Melanoma",
          "GU Cancers",
          "Hematologic Malignancies",
          "Supportive Care",
        ];

  const visibleGroupNames = groupOrder.filter((group) => groupedPrograms[group]?.length);

  const newlyLaunched = oncologyPrograms.find((program) => program.isNew) ?? oncologyPrograms[0];
  const otherNewPrograms = oncologyPrograms.filter(
    (program) => program.isNew && program.title !== newlyLaunched.title
  );

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
          Home / Oncology / Browse All Programs
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_320px]">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#DCC8B0] bg-white shadow-sm">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#C9EAE6] via-[#BDE5EA] to-[#B1E0E7]" />
            <div className="absolute right-[-36px] top-[-22px] h-24 w-24 rounded-full bg-[#BDE5EA]/25 blur-3xl" />
            <div className="absolute left-[-20px] bottom-[-20px] h-20 w-20 rounded-full bg-[#FF9933]/10 blur-2xl" />

            <div className="px-6 py-6 md:px-8 md:py-7">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-full border border-[#D6E9EC] bg-[#F1FAFB] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6E98A5]">
                  Oncology Program Catalog
                </div>
                <span className="rounded-full bg-[#EAF4F6] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#4E7D8A]">
                  Organized by Program Type
                </span>
                <span className="rounded-full bg-[#FFF3E6] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C96F12]">
                  Sort by Tumor Type
                </span>
              </div>

              <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-[#1F1A17] md:text-[2.15rem]">
                Browse All Oncology Programs
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#665E57]">
                Explore oncology education by program type, then narrow the catalog
                by tumor area to find programs most relevant to your audience.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700">
                  Microlearning
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700">
                  Case-Based Learning
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700">
                  Precision Medicine
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700">
                  Conference Highlights
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => setSortMode("programType")}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    sortMode === "programType"
                      ? "bg-[#6E98A5] text-white"
                      : "border border-[#B9D8DE] bg-white text-[#4E7D8A] hover:bg-[#F8FCFD]"
                  }`}
                >
                  View by Program Type
                </button>

                <button
                  onClick={() => setSortMode("tumorType")}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    sortMode === "tumorType"
                      ? "bg-[#6E98A5] text-white"
                      : "border border-[#B9D8DE] bg-white text-[#4E7D8A] hover:bg-[#F8FCFD]"
                  }`}
                >
                  View by Tumor Type
                </button>

                <Link
                  href="/oncology"
                  className="rounded-full border border-[#DCC8B0] bg-white px-5 py-3 text-sm font-semibold text-[#1F1A17] transition hover:bg-[#FBF8F3]"
                >
                  Back to Oncology Home
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
                  Newly Launched
                </span>
              </div>
            </div>

            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E98A5]">
                New Program
              </p>

              <h2 className="mt-3 text-xl font-bold leading-tight text-neutral-900">
                {newlyLaunched.title}
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#EAF4F6] px-3 py-1 text-xs font-semibold text-[#4E7D8A]">
                  {newlyLaunched.modules}
                </span>
                <span className="rounded-full bg-[#FFF3E6] px-3 py-1 text-xs font-semibold text-[#C96F12]">
                  {newlyLaunched.credits}
                </span>
                <span className="rounded-full bg-[#F3F7F8] px-3 py-1 text-xs font-semibold text-[#5F7880]">
                  {newlyLaunched.duration}
                </span>
              </div>

              <p className="mt-3 text-xs font-medium text-neutral-500">
                Accredited by {newlyLaunched.accreditor}
              </p>

              <p className="mt-4 text-sm leading-6 text-neutral-600">
                {newlyLaunched.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={newlyLaunched.href}
                  className="rounded-full bg-[#B0E0E6] px-4 py-2.5 text-sm font-semibold text-[#1E1A17] transition hover:opacity-90"
                >
                  Start Program
                </Link>

                {newlyLaunched.sampleHref && (
                  <button
                    type="button"
                    onClick={() => {
                      window.open(newlyLaunched.sampleHref, "_blank", "noopener,noreferrer");
                    }}
                    className="rounded-full border border-[#FF9933] bg-white px-4 py-2.5 text-sm font-semibold text-[#C96F12] transition hover:bg-[#FFF8F0]"
                  >
                    Sample View
                  </button>
                )}
              </div>

              {otherNewPrograms.length > 0 && (
                <div className="mt-5 border-t border-[#E8DDD0] pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8C837B]">
                    Other New Programs
                  </p>

                  <div className="mt-3 space-y-2">
                    {otherNewPrograms.map((program) => (
                      <button
                        key={program.title}
                        type="button"
                        onClick={() => {
                          setSelectedTumor(program.tumorType);
                          setSortMode("programType");
                          window.scrollTo({ top: 560, behavior: "smooth" });
                        }}
                        className="block text-left text-sm font-semibold text-[#4E7D8A] transition hover:text-[#C96F12]"
                      >
                        {program.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
            <div className="mt-1 text-3xl font-bold">{oncologyPrograms.length}+</div>
          </div>

          <div className="rounded-[16px] border border-[#DCC8B0] bg-white p-4 shadow-sm">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8C837B]">
              View Mode
            </div>
            <div className="mt-1 text-3xl font-bold">
              {sortMode === "programType" ? "Type" : "Tumor"}
            </div>
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
                  Tumor Type
                </div>
                <div className="mt-3 space-y-2 text-sm text-[#665E57]">
                  {tumorTypes.map((tumor) => (
                    <button
                      key={tumor}
                      type="button"
                      onClick={() => setSelectedTumor(tumor)}
                      className={`block text-left transition ${
                        selectedTumor === tumor
                          ? "font-semibold text-[#6E98A5]"
                          : "text-[#665E57] hover:text-[#C96F12]"
                      }`}
                    >
                      {tumor}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-[#E8DDD0] pt-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8C837B]">
                  Organize Catalog
                </div>
                <div className="mt-3 space-y-2 text-sm text-[#665E57]">
                  <button
                    type="button"
                    onClick={() => setSortMode("programType")}
                    className={`block text-left transition ${
                      sortMode === "programType"
                        ? "font-semibold text-[#6E98A5]"
                        : "hover:text-[#C96F12]"
                    }`}
                  >
                    By Program Type
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortMode("tumorType")}
                    className={`block text-left transition ${
                      sortMode === "tumorType"
                        ? "font-semibold text-[#6E98A5]"
                        : "hover:text-[#C96F12]"
                    }`}
                  >
                    By Tumor Type
                  </button>
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

          <div className="space-y-10">
            {visibleGroupNames.map((groupName) => (
              <section key={groupName}>
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-[#1F1A17]">
                      {groupName}
                    </h3>
                    <p className="mt-1 text-sm text-[#6A635C]">
                      {sortMode === "programType"
                        ? "Programs grouped by educational format."
                        : "Programs grouped by tumor and disease focus."}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-[#C96F12]">
                    {groupedPrograms[groupName].length} programs
                  </span>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                  {groupedPrograms[groupName].map((program) => (
                    <Link
                      key={program.title}
                      href={program.href}
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
                            {sortMode === "programType" ? program.programType : program.tumorType}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-8">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#6E98A5]">
                            {program.programType}
                          </p>
                          {program.isNew && (
                            <span className="rounded-full bg-[#FFF3E6] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#C96F12]">
                              New
                            </span>
                          )}
                        </div>

                        <h4 className="mt-4 text-3xl font-semibold leading-tight text-neutral-900">
                          {program.title}
                        </h4>

                        <p className="mt-2 text-sm font-medium text-[#6E98A5]">
                          {program.tumorType}
                        </p>

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
                          <div className="inline-block rounded-full bg-[#B0E0E6] px-5 py-3 text-sm font-semibold text-[#1E1A17] transition hover:opacity-90">
                            Start Program
                          </div>

                          {program.sampleHref && (
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
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}