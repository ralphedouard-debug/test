"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LiveEventsPage() {
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

  
const featuredEvents = [
  {
    title: "Anaheim Oncology Summit",
    date: "October 12, 2026",
    location: "Anaheim, CA",
    audience: "Oncology",
    description:
      "A live educational forum focused on current oncology treatment decisions and practical clinical updates.",
  },
  {
    title: "Chicago Advanced Practice Clinical Forum",
    date: "November 4, 2026",
    location: "Chicago, IL",
    audience: "NP / PA",
    description:
      "Clinical learning for nurse practitioners and physician associates across modern practice settings.",
  },
  {
    title: "New York Oncology Practice Update",
    date: "December 2, 2026",
    location: "New York, NY",
    audience: "Oncology",
    description:
      "A live oncology education event focused on current treatment updates, real-world care decisions, and faculty-led clinical discussion.",
  },
];
  const upcomingSeries = [
  {
    title: "Oncology Leadership Roundtable",
    description:
      "A faculty-led live meeting series designed for oncologists, community oncology teams, and oncology APPs focused on evolving treatment strategy and practical decision-making.",
  },
  {
    title: "Primary Care Microlearning Live",
    description:
      "Interactive live sessions built for nurse practitioners and physician associates who want concise, practical education for real-world clinical care.",
  },
  {
    title: "Specialty Spotlight Events",
    description:
      "Live programs organized by therapeutic area and designed to highlight focused clinical updates, expert commentary, and application to practice.",
  },
];

  return (
    <main className="min-h-screen bg-[#f8f4ef] text-neutral-900">
    <header className="relative">
  <div className="h-[110px] w-full bg-gradient-to-r from-[#FF8B33] via-[#D9C6A8] to-[#B1E0E7]" />

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
        <Link href="/np-pa">NP / PA</Link>
        <Link href="/oncology">Oncology</Link>
        <Link href="/live-events" className="underline underline-offset-4">
          Live Events
        </Link>

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
              <span className="text-[#FF8B33]">Login</span>
            </Link>

            <button
              onClick={() => setShowCreateAccount(true)}
              className="rounded-full bg-[#B1E0E7] px-5 py-2.5 text-sm font-semibold text-[#1E1A17] shadow-sm transition hover:opacity-90"
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

 <div className="overflow-hidden rounded-[2.25rem] border border-[#d7c4ad] bg-white shadow-sm">
  <div className="grid gap-0 lg:grid-cols-[1.35fr_0.9fr]">
    <div className="px-8 py-10 md:px-12 md:py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#C87F2D]">
        Live In-Person & Virtual Meetings
      </p>

      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FFF3E6] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#C96F12]">
        <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
        Live Events
      </div>

      <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight text-neutral-900 md:text-6xl">
        Live Clinical Education Events
      </h1>

      <p className="mt-6 max-w-3xl text-xl leading-9 text-neutral-600">
        Join QDcme live meetings, virtual faculty sessions, and audience-specific
        education designed for NPs, PAs, oncologists, and oncology APPs.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <button className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600">
          View Upcoming Events
        </button>
        <button className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-50">
          Join Event Updates
        </button>
      </div>
    </div>

    <div className="relative overflow-hidden border-t border-[#eadfce] bg-gradient-to-br from-[#f6ede2] via-[#eef3f3] to-[#e2edf0] px-8 py-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-12">
      <div className="absolute right-[-40px] top-[-40px] h-40 w-40 rounded-full bg-[#E68A3F]/12 blur-2xl" />
      <div className="absolute bottom-[-50px] left-[-30px] h-44 w-44 rounded-full bg-[#8FB7C4]/18 blur-2xl" />

      <div className="relative">
        <div className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-600 shadow-sm">
          QDcme Live
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-white/60">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6E98A5]">
              Format
            </p>
            <p className="mt-2 text-2xl font-bold text-neutral-900">
              In-Person + Virtual
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-white/60">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C96F12]">
              Audiences
            </p>
            <p className="mt-2 text-lg font-semibold leading-8 text-neutral-900">
              Oncology<br />
              NP / PA<br />
              Oncology APPs
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-white/60">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
              Experience
            </p>
            <p className="mt-2 text-lg font-semibold leading-8 text-neutral-900">
              Faculty-led sessions<br />
              Practice-focused education<br />
              Real-time clinical discussion
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 <div className="mt-10 grid gap-8 md:grid-cols-3">
  {featuredEvents.map((event) => {
    const isOncology = event.audience === "Oncology";

    return (
      <div
        key={event.title}
        className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
      >
        <div
          className={`h-2 w-full ${
            isOncology
              ? "bg-gradient-to-r from-[#8FB7C4] via-[#BFD2D8] to-[#DCE7EA]"
              : "bg-gradient-to-r from-[#E68A3F] via-[#D9C6A8] to-[#F3E3CF]"
          }`}
        />

        <div className="flex flex-1 flex-col p-8">
          <div
            className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-extrabold uppercase tracking-[0.24em] ${
              isOncology
                ? "bg-[#EAF4F6] text-[#4E7D8A]"
                : "bg-[#FFF3E6] text-[#C96F12]"
            }`}
          >
            {event.audience}
          </div>

          <h3 className="mt-5 text-2xl md:text-3xl font-bold leading-tight text-neutral-900">
            {event.title}
          </h3>

          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-neutral-500">
            {event.date} • {event.location}
          </p>

          <p className="mt-5 text-base leading-8 text-neutral-600">
            {event.description}
          </p>

          <div className="mt-auto pt-8">
            <button
              className={`rounded-full px-5 py-3 text-sm font-semibold text-white ${
                isOncology
                  ? "bg-[#6E98A5] hover:bg-[#5E8793]"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    );
  })}
</div>

<div className="mt-12"></div>

           <div className="mt-12">
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-3xl font-bold">Event Series</h2>
  </div>

  <div className="grid gap-8 md:grid-cols-3">
    {upcomingSeries.map((series, index) => (
      <div
        key={series.title}
        className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm"
      >
        <div
          className={`h-2 w-full ${
            index === 0
              ? "bg-gradient-to-r from-[#A9C7CF] via-[#D9C6A8] to-[#E68A3F]"
              : index === 1
              ? "bg-[#E68A3F]"
              : "bg-[#D9C6A8]"
          }`}
        />

        <div className="p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            QDcme Series
          </p>

          <h3 className="mt-4 text-2xl font-bold leading-tight text-neutral-900">
            {series.title}
          </h3>

          <p className="mt-5 text-base leading-8 text-neutral-600">
            {series.description}
          </p>

          <button className="mt-8 rounded-full border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-50">
            View Series
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
            Stay Updated
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            Get notified about upcoming live events
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-600">
            Join the QDcme list for announcements on future meetings, event
            registrations, and live education opportunities.
          </p>

          <div className="mt-6 flex max-w-2xl flex-col gap-4 md:flex-row">
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
      </div>
    </section>
  </main>
);
}