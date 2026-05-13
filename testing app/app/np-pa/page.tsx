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
  return program.href || "#";
}
export default function NpPaPage() {
  const [userEmail, setUserEmail] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [accountForm, setAccountForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    profession: "NP",
    npi: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    mobile: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }

    const savedAccount = localStorage.getItem("accountProfile");
    if (savedAccount) {
      setAccountForm(JSON.parse(savedAccount));
    }
  }, []);

  const handleCreateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem("accountProfile", JSON.stringify(accountForm));
    localStorage.setItem("userEmail", accountForm.email);

    setUserEmail(accountForm.email);
    setShowCreateAccount(false);
  };

  const obesityLink = "https://qdcme.com/Tackling%20Obesity.html";

  const featuredPrograms = [
{
  title: "Tackling Obesity in Clinical Practice",
  description:
    "A practical program for NPs and PAs focused on obesity care in everyday clinical settings.",
  href: obesityLink,
  useLandingPage: "yes",
  landingPageLink: "/programs/treating-obesity-bible-belt",
  programType: "Micro Learning",
  credits: "0.25 Credits",
  duration: "15 mins",
  accreditor: "Montefiore",
  buttonText: "Launch Program",
},
    {
  title: "Primary Care Updates for Advanced Practice",
  description:
    "Focused learning built for nurse practitioners and physician assistants in modern primary care.",
  href: "/np-pa",
  useLandingPage: "no",
  landingPageLink: "",
  programType: "Micro Learning",
  credits: "0.50 Credits",
  duration: "20 mins",
  accreditor: "Montefiore",
  buttonText: "View Program",
},

    {
  title: "Specialty Clinical Pearls for APPs",
  description:
    "Short, useful education across specialty areas where APPs need practical decision support.",
  href: "/np-pa",
  useLandingPage: "no",
  landingPageLink: "",
  programType: "Micro Learning",
  credits: "0.50 Credits",
  duration: "20 mins",
  accreditor: "Montefiore",
  buttonText: "View Program",
},
  ];

  const specialtySpotlights = [
    {
      title: "Dermatology",
      description:
        "Concise clinical education for common and complex dermatology topics in practice.",
    },
    {
      title: "Neurology",
      description:
        "High-yield updates supporting patient care, diagnosis, and specialty decision-making.",
    },
    {
      title: "Emergency Medicine",
      description:
        "Fast, practical education designed for clinicians working in urgent and acute settings.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#f8f4ef] text-neutral-900">
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
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold shadow-sm transition hover:bg-neutral-100"
                  >
                    <span className="text-[#FF9933]">Login</span>
                  </Link>

                  <button
                    onClick={() => setShowCreateAccount(true)}
                    className="rounded-full bg-[#FFB366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#FFA94D]"
                  >
                    Create Account
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      <section className="w-full">
        <div className="mx-auto max-w-7xl px-8 py-8">
          <h1 className="text-4xl font-bold">NPs & PAs</h1>
          <p className="mt-4 text-lg text-neutral-600">
            Primary Care & Specialty Education for NPs and PAs
          </p>
        </div>
      </section>

      {showCreateAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-8 shadow-xl">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                  Create Account
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                  Create your learner profile
                </h2>
                <p className="mt-3 max-w-2xl text-neutral-600">
                  Set up your account to access programs, save progress, and manage
                  certificates.
                </p>
              </div>

              <button
                onClick={() => setShowCreateAccount(false)}
                className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700"
              >
                Close
              </button>
            </div>

            <form
              onSubmit={handleCreateAccount}
              className="grid gap-6 md:grid-cols-3"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={accountForm.firstName}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, firstName: e.target.value })
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Middle Name{" "}
                  <span className="font-normal text-neutral-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={accountForm.middleName}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, middleName: e.target.value })
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={accountForm.lastName}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, lastName: e.target.value })
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Profession
                </label>
                <select
                  value={accountForm.profession}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, profession: e.target.value })
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                >
                  <option>NP</option>
                  <option>PA</option>
                  <option>MD/DO</option>
                  <option>RN</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  NPI #{" "}
                  <span className="font-normal text-neutral-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={accountForm.npi}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, npi: e.target.value })
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Email
                </label>
                <input
                  type="email"
                  value={accountForm.email}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, email: e.target.value })
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Address
                </label>
                <input
                  type="text"
                  value={accountForm.address}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, address: e.target.value })
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  City
                </label>
                <input
                  type="text"
                  value={accountForm.city}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, city: e.target.value })
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  State
                </label>
                <input
                  type="text"
                  value={accountForm.state}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, state: e.target.value })
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Zip
                </label>
                <input
                  type="text"
                  value={accountForm.zip}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, zip: e.target.value })
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Mobile{" "}
                  <span className="font-normal text-neutral-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={accountForm.mobile}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, mobile: e.target.value })
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm"
                />
              </div>

              <div className="md:col-span-3 flex justify-start">
                <button
                  type="submit"
                  className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-7xl px-8 py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
          Home / NP / PA Clinical Education
        </p>

      <section className="mt-10">
  <div className="grid gap-6 lg:grid-cols-[1.45fr_0.9fr]">
    <div className="relative overflow-hidden rounded-[2rem] border border-[#E6DED3] bg-white px-8 py-10 shadow-[0_10px_35px_rgba(30,26,23,0.05)] lg:px-10">
      <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-r from-[#E68A3F] via-[#FF9933] to-[#F5B24D]" />
      

      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C96F12]">
          NP / PA Education
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#FFF3E6] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#C96F12]">
            Primary Care + Specialty
          </span>
          <span className="rounded-full bg-[#F3F1EE] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#5F5A54]">
            APP Learning
          </span>
        </div>

        <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#14110F] md:text-5xl">
          Programs for Nurse Practitioners & Physician Associates
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5B5650]">
          Practical clinical education built for advanced practice clinicians across
          primary care and specialty settings.
        </p>

        <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#EFE5D8] bg-[#FCF8F2] px-4 py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B36A1C]">
              Format
            </p>
            <p className="mt-2 text-sm font-semibold text-[#1D1916]">
              Microlearning
            </p>
          </div>

          <div className="rounded-2xl border border-[#EFE5D8] bg-[#FCF8F2] px-4 py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B36A1C]">
              Learning Style
            </p>
            <p className="mt-2 text-sm font-semibold text-[#1D1916]">
              Case-Based
            </p>
          </div>

          <div className="rounded-2xl border border-[#EFE5D8] bg-[#FCF8F2] px-4 py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B36A1C]">
              Audience
            </p>
            <p className="mt-2 text-sm font-semibold text-[#1D1916]">
              APP-Focused
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
  href="/np-pa/programs"
  className="inline-flex items-center rounded-full bg-[#EB7F15] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D97211]"
>
  Browse All NP / PA Programs
</Link>

          <Link
            href="/live-events"
            className="inline-flex items-center rounded-full border border-[#D7CEC2] bg-white px-6 py-3 text-sm font-semibold text-[#2F2A26] transition hover:bg-[#FAF7F2]"
          >
            View Upcoming Meetings
          </Link>
        </div>
      </div>
    </div>

    <div className="overflow-hidden rounded-[2rem] border border-[#E6DED3] bg-white shadow-[0_10px_35px_rgba(30,26,23,0.05)]">
      <div className="h-3 w-full bg-gradient-to-r from-[#E68A3F] via-[#FF9933] to-[#F5B24D]" />

      <div className="p-7">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#C96F12]">
          Featured Series
        </p>

        <h3 className="mt-4 text-3xl font-bold leading-tight text-[#14110F]">
          Short-form learning for busy APP teams
        </h3>

        <p className="mt-4 text-sm leading-7 text-[#625C56]">
          QD Bites delivers focused updates and quick clinical takeaways designed
          for real-world practice.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#FFF1E2] px-3 py-1.5 text-xs font-semibold text-[#C96F12]">
            Microlearning
          </span>
          <span className="rounded-full bg-[#F1EFEC] px-3 py-1.5 text-xs font-semibold text-[#5B5650]">
            15–20 mins
          </span>
        </div>

        <div className="mt-6 space-y-3">
          <div className="rounded-2xl border border-[#F1E7DA] bg-[#FCFAF7] px-4 py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B36A1C]">
              Designed For
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#1D1916]">
              Nurse Practitioners and Physician Associates
            </p>
          </div>

          <div className="rounded-2xl border border-[#F1E7DA] bg-[#FCFAF7] px-4 py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B36A1C]">
              Best For
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#1D1916]">
              Quick clinical refreshers and focused updates
            </p>
          </div>
        </div>

        <Link
          href="/np-pa"
          className="mt-7 inline-flex items-center rounded-full border border-[#EB7F15] px-5 py-2.5 text-sm font-semibold text-[#EB7F15] transition hover:bg-[#FFF4E9]"
        >
          Explore QD Bites
        </Link>
      </div>
    </div>
  </div>
</section>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Specialty Areas
            </p>
            <div className="mt-3 text-4xl font-bold text-neutral-900">12+</div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Microlearning Programs
            </p>
            <div className="mt-3 text-4xl font-bold text-neutral-900">25+</div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Live Events
            </p>
            <div className="mt-3 text-4xl font-bold text-neutral-900">8+</div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Profession
              </p>
              <div className="mt-4 space-y-3 text-sm text-orange-600">
                <button className="block text-left hover:underline">
                  Nurse Practitioner
                </button>
                <button className="block text-left hover:underline">
                  Physician Assistant
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Specialty Focus
              </p>
              <div className="mt-4 space-y-3 text-sm text-orange-600">
                <button className="block text-left hover:underline">
                  All Specialties
                </button>
                <button className="block text-left hover:underline">
                  Primary Care
                </button>
                <a
                  href={obesityLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-left hover:underline"
                >
                  Obesity
                </a>
                <button className="block text-left hover:underline">
                  Cardiology
                </button>
                <button className="block text-left hover:underline">
                  Dermatology
                </button>
                <button className="block text-left hover:underline">
                  Emergency Medicine
                </button>
                <button className="block text-left hover:underline">
                  Family Medicine
                </button>
                <button className="block text-left hover:underline">
                  Neurology
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Program Type
              </p>
              <div className="mt-4 space-y-3 text-sm text-orange-600">
                <button className="block text-left hover:underline">
                  Microlearning
                </button>
                <button className="block text-left hover:underline">
                  Adaptive Digital Education
                </button>
                <button className="block text-left hover:underline">
                  Case-Based Learning
                </button>
                <button className="block text-left hover:underline">
                  Clinical Updates
                </button>
                <button className="block text-left hover:underline">
                  Live Meetings
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                Get NP / PA Updates
              </p>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Subscribe for new clinical education and event announcements.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-4 w-full rounded-full border border-neutral-300 px-4 py-3 text-sm"
              />
              <button className="mt-4 w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600">
                Subscribe
              </button>
            </div>
          </aside>

          <div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                Practice-Focused Learning
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                Primary Care & Specialty Updates for Everyday Practice
              </h2>
              <p className="mt-4 max-w-4xl text-base leading-7 text-neutral-600">
                Clinical learning for the settings NPs and PAs work in every day —
                practical, concise, and designed to support confident decision-making.
              </p>
            </div>

            <section className="mt-10">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-3xl font-bold">Featured NP / PA Programs</h3>
                <Link
                  href="/np-pa"
                  className="text-sm font-semibold text-orange-600 hover:underline"
                >
                  View all NP / PA programs →
                </Link>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {featuredPrograms.map((program) => {
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
                        <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#C96F12]">
                          {program.programType}
                        </p>

                        <h4 className="mt-4 text-3xl font-semibold leading-tight text-neutral-900">
                          {program.title}
                        </h4>

                        <p className="mt-5 min-h-[110px] text-base leading-8 text-neutral-600">
                          {program.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          <span className="rounded-full bg-[#FFF3E6] px-4 py-2 text-sm font-semibold text-[#C96F12]">
                            {program.credits}
                          </span>

                          <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
                            {program.duration}
                          </span>

                          <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
                            {program.accreditor}
                          </span>
                        </div>

                        <div className="mt-auto pt-8">
                          <div className="inline-block rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white">
                            {program.buttonText}
                          </div>
                        </div>
                      </div>
                    </div>
                  );

               if (isExternal) {
  return (
    <a
      key={program.title}
      href={getProgramHref(program)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {CardInner}
    </a>
  );
}

return (
  <Link key={program.title} href={getProgramHref(program)}>
    {CardInner}
  </Link>
);   
                })}
              </div>
            </section>

            <section className="mt-10">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-3xl font-bold">Specialty Spotlights</h3>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {specialtySpotlights.map((spotlight) => (
                  <div
                    key={spotlight.title}
                    className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-24 w-full overflow-hidden">
                      <div className="flex h-full w-full">
                        <div className="w-1/3 bg-[#FF8B33]" />
                        <div className="w-1/3 bg-[#FF9933]" />
                        <div className="w-1/3 bg-[#FFAA33]" />
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold tracking-wide text-white">
                          Specialty
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-8">
                      <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#C96F12]">
                        NP / PA Focus
                      </p>

                      <h4 className="mt-4 text-3xl font-semibold leading-tight text-neutral-900">
                        {spotlight.title}
                      </h4>

                      <p className="mt-5 min-h-[110px] text-base leading-8 text-neutral-600">
                        {spotlight.description}
                      </p>

                      <div className="mt-auto pt-8">
                        <button className="rounded-full border border-[#FF9933] bg-white px-5 py-3 text-sm font-semibold text-[#FF9933] transition hover:bg-[#FFF3E6]">
                          View Specialty
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}