"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type CreditType = "CME" | "CE" | "AAPA";

type Program = {
  title: string;
  audience: "NP / PA" | "Oncology";
  status: "In Progress" | "Completed" | "Not Started";
  programType: string;
  accreditor: string;
  credits: string;
  creditType: CreditType;
  modules: string;
  duration: string;
  progress: number;
  href: string;
  completedDate?: string;
  estimatedTimeRemaining?: string;
  certificateId?: string;
};

type Certificate = {
  programTitle: string;
  audience: "NP / PA" | "Oncology";
  creditAmount: string;
  creditType: CreditType;
  accreditor: string;
  completedDate: string;
  certificateId: string;
  pdfHref: string;
};

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState("");
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const firstName = userEmail ? userEmail.split("@")[0] : "Learner";

  const programs: Program[] = [
    {
      title: "Tackling Obesity in Clinical Practice",
      audience: "NP / PA",
      status: "In Progress",
      programType: "Micro Learning",
      accreditor: "Montefiore",
      credits: "0.25",
      creditType: "CE",
      modules: "4 Modules",
      duration: "15 mins",
      progress: 65,
      href: "https://qdcme.com/Tackling%20Obesity.html",
      estimatedTimeRemaining: "6 mins remaining",
    },
    {
      title: "Precision Oncology Updates",
      audience: "Oncology",
      status: "In Progress",
      programType: "Micro Learning",
      accreditor: "Montefiore",
      credits: "0.50",
      creditType: "CME",
      modules: "1 Module",
      duration: "20 mins",
      progress: 35,
      href: "/oncology",
      estimatedTimeRemaining: "12 mins remaining",
    },
    {
      title: "Primary Care Clinical Updates",
      audience: "NP / PA",
      status: "Completed",
      programType: "Micro Learning",
      accreditor: "Montefiore",
      credits: "0.50",
      creditType: "AAPA",
      modules: "1 Module",
      duration: "20 mins",
      progress: 100,
      href: "/np-pa",
      completedDate: "Mar 10, 2026",
      certificateId: "QD-2026-1042",
    },
    {
      title: "Tumor-Specific Learning Series",
      audience: "Oncology",
      status: "Completed",
      programType: "Micro Learning",
      accreditor: "Montefiore",
      credits: "0.75",
      creditType: "CME",
      modules: "1 Module",
      duration: "30 mins",
      progress: 100,
      href: "/oncology",
      completedDate: "Mar 14, 2026",
      certificateId: "QD-2026-1088",
    },
    {
      title: "Specialty APP Learning Series",
      audience: "NP / PA",
      status: "Not Started",
      programType: "Micro Learning",
      accreditor: "Montefiore",
      credits: "0.50",
      creditType: "CE",
      modules: "1 Module",
      duration: "20 mins",
      progress: 0,
      href: "/np-pa",
    },
    {
      title: "Molecular Testing in NSCLC",
      audience: "Oncology",
      status: "Not Started",
      programType: "Adaptive Digital Education",
      accreditor: "Montefiore",
      credits: "0.75",
      creditType: "CME",
      modules: "4 Modules",
      duration: "30 mins",
      progress: 0,
      href: "/oncology",
    },
  ];

  const certificates: Certificate[] = [
    {
      programTitle: "Primary Care Clinical Updates",
      audience: "NP / PA",
      creditAmount: "0.50",
      creditType: "AAPA",
      accreditor: "Montefiore",
      completedDate: "Mar 10, 2026",
      certificateId: "QD-2026-1042",
      pdfHref: "#",
    },
    {
      programTitle: "Tumor-Specific Learning Series",
      audience: "Oncology",
      creditAmount: "0.75",
      creditType: "CME",
      accreditor: "Montefiore",
      completedDate: "Mar 14, 2026",
      certificateId: "QD-2026-1088",
      pdfHref: "#",
    },
  ];

  const inProgressPrograms = useMemo(
    () => programs.filter((program) => program.status === "In Progress"),
    [programs]
  );

  const completedPrograms = useMemo(
    () => programs.filter((program) => program.status === "Completed"),
    [programs]
  );

  const recommendedPrograms = useMemo(
    () => programs.filter((program) => program.status === "Not Started"),
    [programs]
  );

  const creditTotals = useMemo(() => {
    const totals = {
      CME: 0,
      CE: 0,
      AAPA: 0,
    };

    completedPrograms.forEach((program) => {
      totals[program.creditType] += parseFloat(program.credits);
    });

    return {
      CME: totals.CME.toFixed(2),
      CE: totals.CE.toFixed(2),
      AAPA: totals.AAPA.toFixed(2),
    };
  }, [completedPrograms]);

  const getCertificateForProgram = (programTitle: string) =>
    certificates.find((certificate) => certificate.programTitle === programTitle) || null;

  return (
    <main className="min-h-screen bg-[#FCFBF9] text-[#1E1A17]">
      <header className="bg-[#FF9933]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-7">
          <Link href="/" className="flex items-center">
            <img
              src="/qd-logo-white.png"
              alt="QDcme"
              className="h-24 w-auto object-contain"
            />
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium text-white">
            <Link href="/" className="transition hover:opacity-80">
              Home
            </Link>
            <Link href="/np-pa" className="transition hover:opacity-80">
              NP / PA
            </Link>
            <Link href="/oncology" className="transition hover:opacity-80">
              Oncology
            </Link>
            <Link href="/live-events" className="transition hover:opacity-80">
              Live Events
            </Link>
            <Link
              href="/dashboard"
              className="font-semibold underline underline-offset-4"
            >
              My Dashboard
            </Link>

            {userEmail && (
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/85">
                  Welcome, {firstName}
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
            )}
          </nav>
        </div>
      </header>

      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-3xl rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C96F12]">
                  Certificate
                </p>
                <h2 className="mt-3 text-3xl font-bold">
                  {selectedCertificate.programTitle}
                </h2>
                <p className="mt-2 text-sm text-neutral-600">
                  Review, download, or print your certificate.
                </p>
              </div>

              <button
                onClick={() => setSelectedCertificate(null)}
                className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
              >
                Close
              </button>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-neutral-200 bg-[#FCFBF9] p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-600">
                  {selectedCertificate.creditType}
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-600">
                  {selectedCertificate.audience}
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                    Completed
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    {selectedCertificate.completedDate}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                    Credit Earned
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    {selectedCertificate.creditAmount} {selectedCertificate.creditType}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                    Accreditor
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    {selectedCertificate.accreditor}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                    Certificate ID
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    {selectedCertificate.certificateId}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={selectedCertificate.pdfHref}
                  className="rounded-full bg-[#FF9933] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#E8871E]"
                >
                 Download Certificate PDF
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-7xl px-8 py-12">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C96F12]">
            Learner Dashboard
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight">
            Welcome back, {firstName}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-600">
            Track CME, nursing CE, and AAPA credit hours, finish programs in
            progress, and view certificates from completed education.
          </p>

          <div className="mt-6">
            <Link
              href="/"
              className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C96F12]">
              Completed Programs
            </p>
            <div className="mt-2 text-4xl font-bold">{completedPrograms.length}</div>
          </div>

          <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-6 shadow-sm">
  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C96F12]">
    Total CME Hours to Date
  </p>
  <div className="mt-2 text-4xl font-bold">{creditTotals.CME}</div>
</div>

<div className="rounded-[1.5rem] border border-neutral-200 bg-white p-6 shadow-sm">
  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C96F12]">
    Total Nursing CE Hours to Date
  </p>
  <div className="mt-2 text-4xl font-bold">{creditTotals.CE}</div>
</div>

<div className="rounded-[1.5rem] border border-neutral-200 bg-white p-6 shadow-sm">
  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C96F12]">
    Total AAPA Hours to Date
  </p>
  <div className="mt-2 text-4xl font-bold">{creditTotals.AAPA}</div>
</div>
        </div>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C96F12]">
                In Progress
              </p>
              <h2 className="mt-3 text-3xl font-bold">Finish What You Started</h2>
              <p className="mt-2 text-sm text-neutral-600">
                Resume these programs to complete your credit and unlock certificates.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {inProgressPrograms.map((program) => {
              const isNpPa = program.audience === "NP / PA";
              const topBar = isNpPa
                ? "bg-gradient-to-r from-[#FF8B33] via-[#FF9933] to-[#FFD8B5]"
                : "bg-gradient-to-r from-[#C9EAE6] via-[#BDE5EA] to-[#B1E0E7]";
              const pillBg = isNpPa
                ? "bg-[#FFF3E6] text-[#C96F12]"
                : "bg-[#EAF4F6] text-[#4E7D8A]";
              const progressBar = isNpPa ? "bg-[#FF9933]" : "bg-[#7CC9D4]";

              return (
                <div
                  key={program.title}
                  className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-[#FCFBF9]"
                >
                  <div className={`h-3 w-full ${topBar}`} />

                  <div className="p-7">
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${pillBg}`}
                      >
                        {program.audience}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {program.programType}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        In Progress
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-bold leading-tight">
                      {program.title}
                    </h3>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                          Accrediting
                        </p>
                        <p className="mt-2 text-sm font-semibold">
                          {program.accreditor}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                          Credits
                        </p>
                        <p className="mt-2 text-sm font-semibold">
                          {program.credits} {program.creditType}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                          Modules
                        </p>
                        <p className="mt-2 text-sm font-semibold">
                          {program.modules}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                          Duration
                        </p>
                        <p className="mt-2 text-sm font-semibold">
                          {program.duration}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-neutral-700">
                          Progress
                        </span>
                        <span className="text-sm font-semibold text-neutral-700">
                          {program.progress}%
                        </span>
                      </div>

                      <div className="h-3 w-full rounded-full bg-neutral-200">
                        <div
                          className={`h-3 rounded-full ${progressBar}`}
                          style={{ width: `${program.progress}%` }}
                        />
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-neutral-600">
                      {program.estimatedTimeRemaining}
                    </p>

                    <Link
                      href={program.href}
                      className="mt-6 inline-block rounded-full bg-[#1E1A17] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Continue Program
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm">
  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C96F12]">
        Completed
      </p>

      <h2 className="mt-3 text-3xl font-bold">Completed Programs</h2>

      <p className="mt-2 text-sm font-semibold text-[#C96F12]">
        Get your certificates here
      </p>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
        Review your completed activities, open individual certificates, and
        download documentation for credit submission and record keeping.
      </p>
    </div>

    <div className="md:pt-1">
      <button
        type="button"
        className="rounded-full border border-[#FF9933] bg-[#FFF8F0] px-5 py-3 text-sm font-semibold text-[#C96F12] transition hover:bg-[#FFF3E6]"
      >
        Download All Certificates
      </button>
    </div>
  </div>

  <div className="mt-8 grid gap-4">
    {completedPrograms.map((program) => {
      const certificate = getCertificateForProgram(program.title);
      const isOncology = program.audience === "Oncology";

      return (
        <div
          key={program.title}
          className="rounded-[1.5rem] border border-neutral-200 bg-[#FCFBF9] p-5 transition hover:shadow-sm"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                    isOncology
                      ? "bg-[#EAF4F6] text-[#4E7D8A]"
                      : "bg-[#FFF3E6] text-[#C96F12]"
                  }`}
                >
                  {program.audience}
                </span>

                <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  Completed
                </span>

                <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  {program.creditType}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold leading-tight text-[#1E1A17]">
                {program.title}
              </h3>

              <p className="mt-2 text-sm text-neutral-600">
                {program.completedDate} • {program.credits} {program.creditType} •{" "}
                {program.accreditor}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  if (certificate) setSelectedCertificate(certificate);
                }}
                className="rounded-full bg-[#FF9933] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#E8871E]"
              >
                View Certificate
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</section>
        <section className="mt-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C96F12]">
                Things You Might Like
              </p>
              <h2 className="mt-3 text-3xl font-bold">Recommended Next Programs</h2>
              <p className="mt-2 text-sm text-neutral-600">
                Start something new after you finish your in-progress work.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {recommendedPrograms.map((program) => {
              const isNpPa = program.audience === "NP / PA";
              const topBar = isNpPa
                ? "bg-gradient-to-r from-[#FF8B33] via-[#FF9933] to-[#FFD8B5]"
                : "bg-gradient-to-r from-[#C9EAE6] via-[#BDE5EA] to-[#B1E0E7]";
              const audiencePill = isNpPa
                ? "bg-[#FFF3E6] text-[#C96F12]"
                : "bg-[#EAF4F6] text-[#4E7D8A]";
              const buttonClass = isNpPa
                ? "bg-[#FF9933] text-white"
                : "bg-[#B0E0E6] text-[#1E1A17]";

              return (
                <div
                  key={program.title}
                  className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`h-3 w-full ${topBar}`} />

                  <div className="p-7">
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${audiencePill}`}
                      >
                        {program.audience}
                      </span>
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        Not Started
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-bold leading-tight">
                      {program.title}
                    </h3>

                    <div className="mt-5 space-y-3 text-sm text-neutral-600">
                      <div className="flex items-center justify-between">
                        <span>Credit</span>
                        <span className="font-semibold text-[#1E1A17]">
                          {program.credits} {program.creditType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Modules</span>
                        <span className="font-semibold text-[#1E1A17]">
                          {program.modules}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Duration</span>
                        <span className="font-semibold text-[#1E1A17]">
                          {program.duration}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={program.href}
                      className={`mt-7 inline-block rounded-full px-5 py-3 text-sm font-semibold transition hover:opacity-90 ${buttonClass}`}
                    >
                      Start Program
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}