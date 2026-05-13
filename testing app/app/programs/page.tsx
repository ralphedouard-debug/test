export default function ProgramsPage() {
  const programs = [
    {
      title: "Precision Oncology Updates for APPs",
      description:
        "Microlearning-based oncology education designed for advanced practice providers.",
    },
    {
      title: "Immunotherapy Treatment Insights",
      description:
        "Clinical updates and treatment strategy education for oncology care teams.",
    },
    {
      title: "Managing Oncology Toxicities",
      description:
        "Practical education for identifying and managing therapy-related toxicities.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf8f6] text-neutral-900 p-10">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-bold mb-6">
          Clinical Education Programs
        </h1>

        <p className="text-lg text-neutral-600 mb-10">
          Explore microlearning programs designed for oncology clinicians
          and advanced practice providers.
        </p>

        <div className="grid gap-8 md:grid-cols-3">

          {programs.map((program) => (
            <div
              key={program.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-3">
                {program.title}
              </h2>

              <p className="text-neutral-600 mb-6">
                {program.description}
              </p>

              <button className="rounded-full bg-orange-500 px-5 py-2 text-white hover:bg-orange-600">
                Start Program
              </button>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}