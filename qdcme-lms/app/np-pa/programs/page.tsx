"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Program = {
  title: string;
  description: string;
  href: string;
  sampleHref?: string;
  programType:
    | "Microlearning"
    | "Adaptive Digital Education"
    | "Case-Based Learning"
    | "Clinical Updates"
    | "Live Meetings";
  specialty:
    | "Primary Care"
    | "Obesity"
    | "Cardiology"
    | "Dermatology"
    | "Emergency Medicine"
    | "Family Medicine"
    | "Neurology";
  audience: "NP / PA";
  modules: string;
  credits: string;
  duration: string;
  accreditor: string;
};

export default function NpPaProgramsPage() {
  const [userEmail, setUserEmail] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const programs: Program[] = [
    {
      title: "Tackling Obesity in Clinical Practice",
      description:
        "A practical obesity program designed for everyday NP and PA care settings.",
      href: "https://qdcme.com/Tackling%20Obesity.html",
      sampleHref:
        "https://qdbites.qdcme.com/rmoB7SRnd6sOp?_gl=1*12vrr1j*_gcl_au*MTI0MjE2NTI1MS4xNzczNjEzMjMx*_ga*OTk2MTQyNDA0LjE3NzM2MTMyMzI.*_ga_ZXF9H46RNY*czE3NzQwMjA0MjckbzE2JGcxJHQxNzc0MDIxMDUyJGoxNSRsMCRoMA..",
      programType: "Microlearning",
      specialty: "Obesity",
      audience: "NP / PA",
      modules: "4 Modules",
      credits: "0.25 CE",
      duration: "15 mins",
      accreditor: "Montefiore",
    },
    {
      title: "Primary Care Clinical Updates",
      description:
        "Short, practical updates built for primary care nurse practitioners and physician assistants.",
      href: "/np-pa",
      programType: "Clinical Updates",
      specialty: "Primary Care",
      audience: "NP / PA",
      modules: "1 Module",
      credits: "0.50 AAPA",
      duration: "20 mins",
      accreditor: "Montefiore",
    },
    {
      title: "Cardiology Pearls for Advanced Practice",
      description:
        "Focused cardiology education supporting practical patient care decisions for APPs.",
      href: "/np-pa",
      programType: "Microlearning",
      specialty: "Cardiology",
      audience: "NP / PA",
      modules: "2 Modules",
      credits: "0.50 CE",
      duration: "20 mins",
      accreditor: "Montefiore",
    },
    {
      title: "Dermatology Diagnosis and Treatment Updates",
      description:
        "Concise dermatology education for common and complex conditions seen in clinical practice.",
      href: "/np-pa",
      programType: "Clinical Updates",
      specialty: "Dermatology",
      audience: "NP / PA",
      modules: "2 Modules",
      credits: "0.50 CE",
      duration: "20 mins",
      accreditor: "Montefiore",
    },
    {
      title: "Neurology Clinical Cases for APP Practice",
      description:
        "Case-based neurology learning focused on practical diagnosis and treatment decision-making.",
      href: "/np-pa",
      programType: "Case-Based Learning",
      specialty: "Neurology",
      audience: "NP / PA",
      modules: "3 Modules",
      credits: "0.75 CE",
      duration: "30 mins",
      accreditor: "Montefiore",
    },
    {
      title: "Adaptive Learning for Family Medicine",
      description:
        "Adaptive digital education designed for family medicine NPs and PAs managing broad patient needs.",
      href: "/np-pa",
      programType: "Adaptive Digital Education",
      specialty: "Family Medicine",
      audience: "NP / PA",
      modules: "3 Modules",
      credits: "0.75 CE",
      duration: "30 mins",
      accreditor: "Montefiore",
    },
    {
      title: "Emergency Medicine Rapid Decision Series",
      description:
        "Fast, practical education for clinicians working in urgent and acute care settings.",
      href: "/np-pa",
      programType: "Microlearning",
      specialty: "Emergency Medicine",
      audience: "NP / PA",
      modules: "2 Modules",
      credits: "0.50 CE",
      duration: "20 mins",
      accreditor: "Montefiore",
    },
    {
      title: "Primary Care Live APP Forum",
      description:
        "A live learning experience designed for APPs seeking relevant and practical primary care education.",
      href: "/live-events",
      programType: "Live Meetings",
      specialty: "Primary Care",
      audience: "NP / PA",
      modules: "Live Event",
      credits: "0.50 AAPA",
      duration: "60 mins",
      accreditor: "Montefiore",
    },
  ];

  const specialties = [
    "All Specialties",
    "Primary Care",
    "Obesity",
    "Cardiology",
    "Dermatology",
    "Emergency Medicine",
    "Family Medicine",
    "Neurology",
  ];

  const programTypes: Program["programType"][] = [
    "Microlearning",
    "Adaptive Digital Education",
    "Case-Based Learning",
    "Clinical Updates",
    "Live Meetings",
  ];

  const filteredPrograms = useMemo(() => {
    if (selectedSpecialty === "All Specialties") return programs;
    return programs.filter((program) => program.specialty === selectedSpecialty);
  }, [programs, selectedSpecialty]);

  const groupedPrograms = useMemo(() => {
    return programTypes
      .map((type) => ({
        type,
        items: filteredPrograms.filter((program) => program.programType === type),
      }))
      .filter((group) => group.items.length > 0);
  }, [filteredPrograms]);

  return (
    <main className="min-h-screen bg-[#f8f4ef] text-neutral-900">
      <header className="relative">
        <div className="grid h-[110px] grid-cols-3 overflow-hidden">
          <div className="bg-[#E68A3F]" />
          <div className="bg-[#FF9933]" />
          <div className="bg-[#FFAA33]" />
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

            <nav className="flex items-center gap-6 text-sm font-medium text-white">
              <Link href="/">Home</Link>
              <Link href="/np-pa" className="underline underline-offset-4">
                NP / PA
              </Link>
              <Link href="/oncology">Oncology</Link>
              <Link href="/live-events">Live Events</Link>

              {userEmail ? (
                <>
                  <Link href="/dashboard" className="font-semibold">
                    My Dashboard
                  </Link>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/85">
                      Welcome, {userEmail.split("@")[0]}
                    </span>
                    <button
                      onClick={() => {
                        localStorage.removeItem("userEmail");
                        window.location.href = "/";
                      }}
                      className="mt-1 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/30"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold shadow-sm transition hover:bg-neutral-100"
                >
                  <span className="text-[#FF9933]">Login</span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-8 py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
          Home / NP / PA Programs
        </p>

       <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
  <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
  <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-[#FF8B33] via-[#FF9933] to-[#FFAA33]" />
  <div className="absolute right-[-30px] top-[-20px] h-28 w-28 rounded-full bg-[#FFB366]/15 blur-2xl" />
  <div className="absolute bottom-[-30px] left-[-20px] h-28 w-28 rounded-full bg-[#FFD8B5]/20 blur-2xl" />

  <div className="relative px-8 py-8 md:px-10 md:py-10">
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
        Browse All NP / PA Programs
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <span className="rounded-full bg-[#FFF3E6] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#C96F12]">
          Program Catalog
        </span>
        <span className="rounded-full bg-neutral-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-neutral-600">
          APP Learning
        </span>
      </div>

      <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-neutral-900 md:text-5xl">
        <span className="block">Programs Created</span>
        <span className="mt-2 block text-[#C96F12]">By NPs and PAs</span>
        <span className="mt-2 block">For NPs and PAs</span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-neutral-600">
        Browse all available NP and PA programs organized by program type,
        with specialty filters on the left to quickly narrow the catalog by
        clinical area.
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
          Microlearning
        </span>
        <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
          Case-Based Learning
        </span>
        <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
          Adaptive Digital Education
        </span>
        <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
          Live Meetings
        </span>
      </div>
    </div>

    <div className="mt-8 grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl bg-[#FFF8F1] px-5 py-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C96F12]">
          Created By
        </p>
        <p className="mt-2 text-sm font-semibold text-neutral-900">
          NPs and PAs
        </p>
      </div>

      <div className="rounded-2xl bg-neutral-50 px-5 py-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
          Organized By
        </p>
        <p className="mt-2 text-sm font-semibold text-neutral-900">
          Program Type
        </p>
      </div>

      <div className="rounded-2xl bg-neutral-50 px-5 py-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
          Filter By
        </p>
        <p className="mt-2 text-sm font-semibold text-neutral-900">
          Specialty Area
        </p>
      </div>
    </div>
  </div>
</div>

  <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
    <div className="h-24 w-full bg-gradient-to-r from-[#FF8B33] via-[#FF9933] to-[#FFAA33]" />

    <div className="absolute inset-x-0 top-0 flex h-24 items-center justify-center">
      <span className="text-2xl font-bold tracking-wide text-white">
        Newly Launched Programs
      </span>
    </div>

    <div className="p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
        Featured Launch
      </p>

      <h2 className="mt-4 text-3xl font-bold leading-tight text-neutral-900">
        Tackling Obesity in Clinical Practice
      </h2>

      <p className="mt-5 text-base leading-8 text-neutral-600">
        A newly launched program built for NPs and PAs seeking practical,
        real-world education in obesity care and day-to-day clinical decision-making.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#FFF3E6] px-3 py-1 text-xs font-semibold text-[#C96F12]">
          Microlearning
        </span>
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
          4 Modules
        </span>
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
          0.25 CE
        </span>
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
          Montefiore
        </span>
      </div>

      <div className="mt-7 space-y-3">
        <div className="rounded-2xl bg-[#FFF8F1] px-4 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C96F12]">
            Why it matters
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-neutral-800">
            High-interest APP topic with practical relevance for primary care and specialty settings
          </p>
        </div>

        <div className="rounded-2xl bg-neutral-50 px-4 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
            Launch focus
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-neutral-800">
            Newly released learning, highlighted here before users browse the full catalog
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="https://qdcme.com/Tackling%20Obesity.html"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Start Program
        </a>

        <button
          type="button"
          onClick={() =>
            window.open(
              "https://qdbites.qdcme.com/rmoB7SRnd6sOp?_gl=1*12vrr1j*_gcl_au*MTI0MjE2NTI1MS4xNzczNjEzMjMx*_ga*OTk2MTQyNDA0LjE3NzM2MTMyMzI.*_ga_ZXF9H46RNY*czE3NzQwMjA0MjckbzE2JGcxJHQxNzc0MDIxMDUyJGoxNSRsMCRoMA..",
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="rounded-full border border-[#FF9933] bg-white px-5 py-3 text-sm font-semibold text-[#FF9933] transition hover:bg-[#FFF3E6]"
        >
          Sample View
        </button>
      </div>

      <div className="mt-7">
        <button
          type="button"
          onClick={() => setSelectedSpecialty("All Specialties")}
          className="text-sm font-semibold text-[#C96F12] hover:underline"
        >
          View other newly launched programs →
        </button>
      </div>
    </div>
  </div>
</div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Specialty Focus
              </p>

              <div className="mt-4 space-y-3 text-sm">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => setSelectedSpecialty(specialty)}
                    className={`block text-left transition hover:underline ${
                      selectedSpecialty === specialty
                        ? "font-semibold text-orange-600"
                        : "text-neutral-700"
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Program Type
              </p>

              <div className="mt-4 space-y-3 text-sm text-orange-600">
                {programTypes.map((type) => (
                  <div key={type}>{type}</div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                APP Education
              </p>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                This page starts by showing all available NP / PA programs grouped
                by learning format. Use specialty focus to narrow what appears.
              </p>
            </div>
          </aside>

          <div className="space-y-12">
            {groupedPrograms.map((group) => (
              <section key={group.type}>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold">{group.type}</h2>
                    <p className="mt-2 text-sm text-neutral-600">
                      {selectedSpecialty === "All Specialties"
                        ? `All available NP / PA programs in ${group.type.toLowerCase()}.`
                        : `${group.type} programs filtered for ${selectedSpecialty}.`}
                    </p>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((program) => {
                    const isExternal = program.href.startsWith("http");

                    const CardInner = (
                      <div className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="relative h-28 w-full overflow-hidden">
                          <div className="flex h-full w-full">
                            <div className="w-1/3 bg-[#FF8B33]" />
                            <div className="w-1/3 bg-[#FF9933]" />
                            <div className="w-1/3 bg-[#FFAA33]" />
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold tracking-wide text-white">
                              NP / PA
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col p-8">
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-[#FFF3E6] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C96F12]">
                              {program.programType}
                            </span>
                            <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                              {program.specialty}
                            </span>
                          </div>

                          <h3 className="mt-4 text-3xl font-semibold leading-tight text-neutral-900">
                            {program.title}
                          </h3>

                          <p className="mt-5 min-h-[110px] text-base leading-8 text-neutral-600">
                            {program.description}
                          </p>

                          <div className="mt-6 flex flex-wrap gap-2">
                            <span className="rounded-full bg-[#FFF3E6] px-4 py-2 text-sm font-semibold text-[#C96F12]">
                              {program.modules}
                            </span>
                            <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
                              {program.credits}
                            </span>
                            <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
                              {program.duration}
                            </span>
                            <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
                              {program.accreditor}
                            </span>
                          </div>

                          <div className="mt-auto flex flex-wrap gap-3 pt-8">
                            <div className="inline-block rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white">
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
                                className="inline-block rounded-full border border-[#FF9933] bg-white px-5 py-3 text-sm font-semibold text-[#FF9933] hover:bg-[#FFF3E6]"
                              >
                                Launch Sample
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );

                    if (isExternal) {
                      return (
                        <a
                          key={program.title}
                          href={program.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {CardInner}
                        </a>
                      );
                    }

                    return (
                      <Link key={program.title} href={program.href}>
                        {CardInner}
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}