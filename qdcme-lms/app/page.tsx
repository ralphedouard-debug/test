"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
function getProgramHref(program: {
  useLandingPage?: string;
  landingPageLink?: string;
  href: string;
}) {
  if (program.useLandingPage === "yes" && program.landingPageLink) {
    return program.landingPageLink;
  }

  return program.href;
}
function formatProgramDate(dateString: string) {
  if (!dateString) return "—";

  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Home() {
  const [userEmail, setUserEmail] = useState("");
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
const [popupEmail, setPopupEmail] = useState("");
const pathname = usePathname();
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

  const hasSeenPopup = localStorage.getItem("qdcmeEmailPopupSeen");

  if (!hasSeenPopup) {
    const timer = setTimeout(() => {
      setShowEmailPopup(true);
    }, 15000);

    return () => clearTimeout(timer);
  }
}, []);

  const handleCreateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem("accountProfile", JSON.stringify(accountForm));
    localStorage.setItem("userEmail", accountForm.email);

    setUserEmail(accountForm.email);
    setShowCreateAccount(false);
  };

  const npPaPrograms = [
  {
  title: "Tackling Obesity in Clinical Practice",
  description:
    "Practical obesity education designed for everyday NP and PA care settings.",
  programType: "Micro Learning",
  modules: "4 Modules",
  creditDetail: "0.25 each",
  credits: "0.25 Credits",
  duration: "15 mins",
  accreditor: "Montefiore",
  buttonText: "Start Program",

  useLandingPage: "no",

  href: "https://qdcme.com/Tackling%20Obesity.html",

  sampleHref: "https://qdbites.qdcme.com/rmoB7SRnd6sOp?_gl=1*16w679g*_gcl_au*MTI0MjE2NTI1MS4xNzczNjEzMjMx*_ga*OTk2MTQyNDA0LjE3NzM2MTMyMzI.*_ga_ZXF9H46RNY*czE3NzQzODIxNzIkbzI0JGcxJHQxNzc0MzgyNjM4JGo1MyRsMCRoMA..",
},
{
  title: "Primary Care Clinical Updates",
  description:
    "Short, practical updates built for primary care nurse practitioners and physician assistants.",
  programType: "Micro Learning",
  modules: "1 Module",
  creditDetail: "0.50 Credits",
  credits: "0.50 Credits",
  duration: "20 mins",
  accreditor: "Montefiore",
  accreditationStartDate: "2026-02-01",
  accreditationExpirationDate: "2026-11-30",
  buttonText: "START Program",
  href: "/np-pa",
},
 {
  title: "Specialty APP Learning Series",
  description:
    "Focused learning for specialty NPs and PAs across fast-moving therapeutic areas.",
  programType: "Micro Learning",
  modules: "1 Module",
  creditDetail: "0.50 Credits",
  credits: "0.50 Credits",
  duration: "20 mins",
  accreditor: "Montefiore",
  accreditationStartDate: "2026-03-01",
  accreditationExpirationDate: "2026-12-31",
  buttonText: "START Program",
  href: "/np-pa",
},
];

  const oncologyPrograms = [
    {
  title: "Precision Oncology Updates",
  description:
    "Clinical learning designed for treatment decisions and evolving oncology standards of care.",
  programType: "Micro Learning",
  credits: "0.50 Credits",
  duration: "20 mins",
  accreditor: "Montefiore",
  accreditationStartDate: "2026-01-15",
  accreditationExpirationDate: "2026-12-31",
  buttonText: "START Program",
  href: "/oncology",
},
    {
  title: "Community Oncology in Practice",
  description:
    "Programs tailored to real-world oncology care delivery and team-based practice.",
  programType: "Micro Learning",
  credits: "0.50 Credits",
  duration: "20 mins",
  accreditor: "Montefiore",
  accreditationStartDate: "2026-02-01",
  accreditationExpirationDate: "2026-11-30",
  buttonText: "START Program",
  href: "/oncology",
},
    {
  title: "Tumor-Specific Learning Series",
  description:
    "Focused oncology education across major tumor areas and treatment settings.",
  programType: "Micro Learning",
  credits: "0.75 Credits",
  duration: "30 mins",
  accreditor: "Montefiore",
  accreditationStartDate: "2026-03-01",
  accreditationExpirationDate: "2026-12-31",
  buttonText: "START Program",
  href: "/oncology",
},
  ];

  const liveEvents = [
  {
    title: "Anaheim Oncology Summit",
    description:
      "Live clinical education event featuring current oncology updates.",
    meetingDate: "September 18, 2026",
    hotel: "JW Marriott Anaheim Resort",
    city: "Anaheim",
    state: "CA",
    href: "/live-events",
    agendaHref: "/live-events",
    facultyHref: "/live-events",
  },
  {
    title: "Chicago Clinical Symposium",
    description:
      "A focused meeting for modern practice and applied clinical education.",
    meetingDate: "October 9, 2026",
    hotel: "The Langham",
    city: "Chicago",
    state: "IL",
    href: "/live-events",
    agendaHref: "/live-events",
    facultyHref: "/live-events",
  },
  {
    title: "New York Clinical Update",
    description:
      "In-person learning designed for practical care-team decision-making.",
    meetingDate: "November 13, 2026",
    hotel: "The Plaza",
    city: "New York",
    state: "NY",
    href: "/live-events",
    agendaHref: "/live-events",
    facultyHref: "/live-events",
  },
];
const handleCloseEmailPopup = () => {
  setShowEmailPopup(false);
  localStorage.setItem("qdcmeEmailPopupSeen", "true");
};

const handleEmailPopupSubmit = () => {
  if (!popupEmail.trim()) return;

  localStorage.setItem("qdcmeEmailSignup", popupEmail);
  localStorage.setItem("qdcmeEmailPopupSeen", "true");
  setShowEmailPopup(false);

  alert("Thanks for joining QDcme updates.");
};
  return (
  <main className="min-h-screen bg-[#FCFBF9] text-[#1E1A17]">
   <header className="border-b border-[#e68a3f] bg-[#FF9933]">
  <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-5">
    <Link href="/" className="flex shrink-0 items-center">
      <img
        src="/qd-logo-white.png"
        alt="QDcme"
        className="h-20 w-auto object-contain cursor-pointer"
      />
    </Link>

    {userEmail ? (
      <div className="flex items-center gap-6">
        <nav className="flex items-center gap-5 text-sm font-medium text-white">
          <Link href="/" className="group relative leading-none">
            <span className={`${pathname === "/" ? "opacity-100" : "opacity-90"} transition`}>
              Home
            </span>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          <Link href="/np-pa" className="group relative leading-none">
            <span className={`${pathname === "/np-pa" ? "opacity-100" : "opacity-90"} transition`}>
              NP / PA
            </span>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                pathname === "/np-pa" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          <Link href="/oncology" className="group relative leading-none">
            <span className={`${pathname === "/oncology" ? "opacity-100" : "opacity-90"} transition`}>
              Oncology
            </span>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                pathname === "/oncology" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          <Link href="/live-events" className="group relative leading-none">
            <span className={`${pathname === "/live-events" ? "opacity-100" : "opacity-90"} transition`}>
              Live Events
            </span>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                pathname === "/live-events" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          <Link href="/dashboard" className="leading-none">
            My Dashboard
          </Link>
        </nav>

        <div className="flex flex-col items-end">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
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
      </div>
    ) : (
      <div className="flex items-center gap-6">
        <nav className="flex items-center gap-5 text-sm font-medium text-white">
          <Link href="/" className="group relative leading-none">
            <span className={`${pathname === "/" ? "opacity-100" : "opacity-90"} transition`}>
              Home
            </span>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          <Link href="/np-pa" className="group relative leading-none">
            <span className={`${pathname === "/np-pa" ? "opacity-100" : "opacity-90"} transition`}>
              NP / PA
            </span>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                pathname === "/np-pa" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          <Link href="/oncology" className="group relative leading-none">
            <span className={`${pathname === "/oncology" ? "opacity-100" : "opacity-90"} transition`}>
              Oncology
            </span>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                pathname === "/oncology" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          <Link href="/live-events" className="group relative leading-none">
            <span className={`${pathname === "/live-events" ? "opacity-100" : "opacity-90"} transition`}>
              Live Events
            </span>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                pathname === "/live-events" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>

          <a
            href="https://qdcme.com"
            target="_blank"
            rel="noopener noreferrer"
            className="leading-none text-white/85 transition hover:text-white"
          >
            About QDcme
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-full bg-white/90 px-4 text-sm font-semibold text-[#FF9933] shadow-sm transition hover:bg-white"
          >
            Login
          </Link>

          <button
            onClick={() => setShowCreateAccount(true)}
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#FFB366] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#FFA94D]"
          >
            Create Account
          </button>
        </div>
      </div>
    )}
  </div>
</header>

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
                  className="rounded-full bg-[#FF9933] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-7xl px-8 py-16">
        <div className="mx-auto max-w-6xl text-center">
  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
    Modern Clinical Learning
  </p>

 <h1
  className="animate-[fadeUp_1.2s_ease-out_forwards] text-5xl font-bold leading-tight tracking-tight text-[#1E1A17] opacity-0 md:text-6xl"
>
  Continuing Clinical Education <br />
  for Modern Practice
</h1>

 <p
  className="mt-6 animate-[fadeUp_1s_ease-out_.5s_forwards] text-lg leading-8 text-neutral-600 opacity-0"
>
  Programs designed specifically for modern clinicians across{" "}
 <span className="font-semibold text-[#FF9933]">
    APP primary care
  </span>
  ,{" "}
 <span className="font-semibold text-[#FF9933]">
    APP specialty care
  </span>
  , and{" "}
 <span className="font-semibold text-[#FF9933]">
    MD/APP oncology care
  </span>.
</p>
</div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="relative flex h-52 w-full overflow-hidden">
              <div className="w-1/3 bg-[#FF8B33]" />
              <div className="w-1/3 bg-[#FF9933]" />
              <div className="w-1/3 bg-[#FFAA33]" />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold tracking-wide text-white">
                  NPs & PAs
                </span>
              </div>
            </div>

            <div className="p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                NPs & PAs
              </p>
              <h2 className="mt-4 text-3xl font-bold">
                Primary Care & Specialty Education for NPs and PAs
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                Practical continuing education for primary care and specialty NPs
                and PAs, built for real-world clinical settings and modern practice
                needs.
              </p>
              <Link
                href="/np-pa"
                className="mt-8 inline-flex items-center rounded-full bg-[#FF9933] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Explore NP / PA Programs
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="relative flex h-52 w-full overflow-hidden">
              <div className="w-1/3 bg-[#C9EAE6]" />
              <div className="w-1/3 bg-[#BDE5EA]" />
              <div className="w-1/3 bg-[#B1E0E7]" />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold tracking-wide text-[#1E1A17]">
                  Oncology
                </span>
              </div>
            </div>

            <div className="p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                Oncology
              </p>
              <h2 className="mt-4 text-3xl font-bold">
                Oncology Education for Community & Academic Care Teams
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                Advanced clinical education for oncologists, NPs, PAs, and care teams
                managing complex cancer treatment across real-world settings.
              </p>
              <Link
                href="/oncology"
                className="mt-8 inline-flex items-center rounded-full bg-[#B0E0E6] px-6 py-3 text-sm font-semibold text-[#1E1A17] transition hover:opacity-90"
              >
                Explore Oncology Programs
              </Link>
            </div>
          </div>
        </div>

        <section className="mt-16">
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
  {npPaPrograms.map((program) => (
    <div
      key={program.title}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
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
    {program.modules || program.credits}
  </span>

  <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
    {program.creditDetail || program.duration}
  </span>
</div>

<div className="mt-4 grid gap-1 text-sm text-neutral-500">
  <p>Accredited by {program.accreditor}</p>
  <p>
    <span className="font-semibold text-neutral-700">Start:</span>{" "}
    {formatProgramDate(program.accreditationStartDate)}
  </p>
  <p>
    <span className="font-semibold text-neutral-700">Expiration:</span>{" "}
    {formatProgramDate(program.accreditationExpirationDate)}
  </p>
</div>

        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <Link
  href={getProgramHref(program)}
  className="inline-block rounded-full bg-[#FF9933] px-5 py-3 text-sm font-semibold text-white"
>
  {program.buttonText}
</Link>

    {program.sampleHref && (
  <button
    type="button"
    onClick={() =>
      window.open(program.sampleHref, "_blank", "noopener,noreferrer")
    }
    className="inline-block rounded-full border border-[#FF9933] bg-white px-5 py-3 text-sm font-semibold text-[#FF9933] hover:bg-[#FFF3E6]"
  >
    Launch Sample
  </button>
)}     
        </div>
      </div>
    </div>
  ))}
</div>
        </section>

        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-3xl font-bold">Featured Oncology Programs</h3>
            <Link
              href="/oncology"
              className="text-sm font-semibold text-orange-600 hover:underline"
            >
              View all oncology programs →
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
  {oncologyPrograms.map((program) => (
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
    {program.credits}
  </span>

  <span className="rounded-full bg-[#F3F7F8] px-4 py-2 text-sm font-semibold text-[#5F7880]">
    {program.duration}
  </span>
</div>

<div className="mt-4 grid gap-1 text-sm text-neutral-500">
  <p>Accredited by {program.accreditor}</p>
  <p>
    <span className="font-semibold text-neutral-700">Start:</span>{" "}
    {formatProgramDate(program.accreditationStartDate)}
  </p>
  <p>
    <span className="font-semibold text-neutral-700">Expiration:</span>{" "}
    {formatProgramDate(program.accreditationExpirationDate)}
  </p>
</div>

        <div className="mt-auto pt-8">
          <div className="inline-block rounded-full bg-[#B0E0E6] px-5 py-3 text-sm font-semibold text-[#1E1A17] transition hover:opacity-90">
            {program.buttonText}
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>
        </section>

        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-3xl font-bold">Upcoming Live Events</h3>
            <Link
              href="/live-events"
              className="text-sm font-semibold text-orange-600 hover:underline"
            >
              View all live events →
            </Link>
          </div>

        <div className="grid gap-8 md:grid-cols-3">
  {liveEvents.map((event) => (
    <Link
      key={event.title}
      href={event.href}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-28 w-full overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-[#FF8B33] via-[#D9C6A8] to-[#B1E0E7]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold tracking-wide text-white">
            Live Event
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8">
  <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#C96F12]">
    Live In-Person Meeting
  </p>

  <h4 className="mt-4 text-3xl font-semibold leading-tight text-neutral-900">
    {event.title}
  </h4>

  <div className="mt-5 rounded-2xl border border-[#FFD8B5] bg-[#FFF7ED] px-5 py-4">
    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C96F12]">
      Meeting Date
    </p>
    <p className="mt-2 text-3xl font-bold leading-tight text-neutral-900">
      {event.meetingDate}
    </p>
  </div>

  <div className="mt-4 rounded-2xl border border-neutral-200 bg-[#FAFAF9] px-5 py-4">
    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
      Hotel
    </p>
    <p className="mt-2 text-lg font-semibold text-neutral-900">
      {event.hotel}
    </p>

    <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
      Location
    </p>
    <p className="mt-2 text-lg font-semibold text-neutral-900">
      {event.city}, {event.state}
    </p>
  </div>

  <p className="mt-5 text-base leading-8 text-neutral-600">
    {event.description}
  </p>

  <div className="mt-6 flex flex-wrap gap-2">
    <span className="rounded-full bg-[#FFF3E6] px-4 py-2 text-sm font-semibold text-[#C96F12]">
      QDcme Live
    </span>

    <span className="rounded-full bg-[#EEF5F6] px-4 py-2 text-sm font-semibold text-[#5F7880]">
      In Person
    </span>
  </div>

  <div className="mt-auto pt-8">
    <div className="flex flex-wrap gap-3">
      <div className="inline-flex items-center rounded-full bg-[#FF9933] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#E8871E]">
        See Event Details →
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = event.agendaHref;
        }}
        className="inline-flex items-center rounded-full border border-[#FF9933] bg-white px-5 py-3 text-sm font-semibold text-[#C96F12] transition hover:bg-[#FFF8F0]"
      >
        View Agenda
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = event.facultyHref;
        }}
        className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
      >
        View Faculty
      </button>
    </div>
  </div>
</div>
    </Link>
  ))}
</div>
        </section>

        <section className="mt-16 rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
              Stay Updated
            </p>
            <h3 className="mt-3 text-3xl font-bold">
              Get updates on new programs and live events
            </h3>
            <p className="mt-4 text-neutral-600">
              Subscribe for clinical education updates from QDcme.
            </p>

            <div className="mt-8 flex flex-col gap-4 md:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full border border-neutral-300 px-5 py-3 text-sm"
              />
              <button className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </section>
   {showEmailPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="w-full max-w-md rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C96F12]">
        Stay Connected
      </p>

      <h2 className="mt-3 text-3xl font-bold leading-tight text-neutral-900">
        Join our email list for newly launched programs and topic updates
      </h2>

      <p className="mt-4 text-sm leading-6 text-neutral-600">
        Receive updates on new CME programs, live events, and emerging clinical
        topics across NP / PA and oncology education.
      </p>

      <input
        type="email"
        value={popupEmail}
        onChange={(e) => setPopupEmail(e.target.value)}
        placeholder="Enter your email"
        className="mt-6 w-full rounded-full border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
      />

      <button
        type="button"
        onClick={handleEmailPopupSubmit}
        className="mt-4 w-full rounded-full bg-[#FF9933] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#E8871E]"
      >
        Join Updates
      </button>

      <button
        type="button"
        onClick={handleCloseEmailPopup}
        className="mt-4 w-full text-sm font-medium text-neutral-500 underline underline-offset-2"
      >
        No thanks
      </button>
    </div>
  </div>
)}
    </main>
  );
}