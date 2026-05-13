"use client";

import Link from "next/link";

export default function MyProgramsPage() {
  const programs = [
    {
      title: "Precision Oncology Updates for APPs",
      progress: "50%",
      status: "In Progress",
    },
    {
      title: "Immunotherapy Treatment Insights",
      progress: "0%",
      status: "Not Started",
    },
    {
      title: "Managing Oncology Toxicities",
      progress: "100%",
      status: "Completed",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f4f1] p-8 text-neutral-900">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-bold mb-6">
          My Programs
        </h1>

        <p className="text-neutral-600 mb-10">
          Continue your active learning programs.
        </p>

        <div className="grid gap-6">

          {programs.map((program) => (
            <div
              key={program.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{program.title}</h2>
                <p className="text-sm text-neutral-500 mt-1">
                  {program.status} • {program.progress} complete
                </p>
              </div>

              <Link
                href="/programs"
                className="rounded-full bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
              >
                Continue
              </Link>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}