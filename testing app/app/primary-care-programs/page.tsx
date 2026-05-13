import Link from "next/link";

export default function PrimaryCareProgramsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f6] text-neutral-900">
      <section className="mx-auto max-w-7xl px-8 py-16">
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600"
          >
            ← Back to Main Catalog
          </Link>

          <h1 className="mt-4 text-5xl font-bold tracking-tight">
            Primary Care Programs
          </h1>

          <p className="mt-4 max-w-4xl text-lg leading-8 text-neutral-600">
            Microlearning and digital education designed for primary care and
            specialty NPs and PAs.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.9fr]">
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
              Program
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Diabetes Therapy Update Microlearning
            </h2>

            <p className="mt-4 text-neutral-600 leading-7">
              A concise primary care microlearning experience focused on current
              therapy updates, treatment considerations, and practical clinical
              decision support.
            </p>

            <div className="mt-8 space-y-3 text-sm text-neutral-600">
              <div>
                <span className="font-semibold text-neutral-900">Format:</span>{" "}
                7taps Microlearning
              </div>
              <div>
                <span className="font-semibold text-neutral-900">Audience:</span>{" "}
                Primary Care NPs & PAs
              </div>
              <div>
                <span className="font-semibold text-neutral-900">Topic:</span>{" "}
                Diabetes / Primary Care
              </div>
            </div>

            <button className="mt-8 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600">
              Start Program
            </button>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
              7taps Microlearning
            </p>

            <h3 className="mt-3 text-2xl font-bold">
              Lesson Player
            </h3>

            <p className="mt-3 text-neutral-600">
              Replace the sample embed URL below with your live 7taps lesson URL.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200">
              <iframe
                src="https://www.7taps.com/"
                title="7taps Microlearning"
                className="h-[700px] w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}