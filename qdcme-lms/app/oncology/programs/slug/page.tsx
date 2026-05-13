"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type ProgramItem = {
  id: string;
  programTypeTitle: string;
  programTitle: string;
  description: string;
  audience: string;
  programFormat: string;
  credits: string;
  modules: string;
  accreditor: string;
  accreditationStartDate: string;
  accreditationExpirationDate: string;
  timeToComplete: string;
  link: string;
  sampleLink: string;
  landingPageLink: string;
  useLandingPage: string;
  image: string;
  section: string;
  status: string;
  tumorType: string;
  isNew: string;
  featuredRank: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

function formatDate(dateString: string) {
  if (!dateString) return "—";
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function buildTrackedUrl(program: ProgramItem) {
  const baseUrl = program.link;
  if (!baseUrl) return "#";

  const params = new URLSearchParams();
  if (program.utmSource) params.set("utm_source", program.utmSource);
  if (program.utmMedium) params.set("utm_medium", program.utmMedium);
  if (program.utmCampaign) params.set("utm_campaign", program.utmCampaign);

  const query = params.toString();
  if (!query) return baseUrl;

  return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${query}`;
}

function getProgramSlug(program: ProgramItem) {
  if (program.landingPageLink?.startsWith("/programs/")) {
    return program.landingPageLink.replace("/programs/", "").trim().toLowerCase();
  }

  return program.programTitle
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function trackProgramEvent(program: ProgramItem, eventType: string) {
  const existing = JSON.parse(localStorage.getItem("programEvents") || "[]");

  existing.unshift({
    id: `${program.id}-${Date.now()}`,
    eventType,
    programId: program.id,
    programTitle: program.programTitle,
    audience: program.audience,
    timestamp: new Date().toISOString(),
    utmSource: program.utmSource,
    utmMedium: program.utmMedium,
    utmCampaign: program.utmCampaign,
  });

  localStorage.setItem("programEvents", JSON.stringify(existing));
}

export default function ProgramLandingPage() {
  const params = useParams();
  const slug = String(params.slug || "").toLowerCase();

  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const savedPrograms = localStorage.getItem("adminPrograms");
    if (savedPrograms) {
      try {
        setPrograms(JSON.parse(savedPrograms));
      } catch {
        setPrograms([]);
      }
    }

    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const program = useMemo(() => {
    return programs.find((item) => getProgramSlug(item) === slug);
  }, [programs, slug]);

  useEffect(() => {
    if (program) {
      trackProgramEvent(program, "landing_page_viewed");
    }
  }, [program]);

  if (!program) {
    return (
      <main className="min-h-screen bg-[#FCFBF9] text-[#1E1A17]">
        <header className="bg-[#FF9933]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-7">
            <Link href="/">
              <img
                src="/qd-logo-white.png"
                alt="QDcme"
                className="h-20 w-auto"
              />
            </Link>
          </div>
        </header>

        <section className="mx-auto max-w-4xl px-8 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
            Program Not Found
          </p>
          <h1 className="mt-4 text-4xl font-bold">This landing page is not set up yet</h1>
          <p className="mt-4 text-neutral-600">
            Check the landing page link in Admin or return to the catalog.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-[#FF9933] px-6 py-3 text-sm font-semibold text-white"
          >
            Return Home
          </Link>
        </section>
      </main>
    );
  }

  const isOncology = program.audience === "Oncology";
  const headerBars = isOncology
    ? ["#5DA9B3", "#3E8FA0", "#2F6F7D"]
    : ["#E68A3F", "#FF9933", "#FFAA33"];

  const accentPill = isOncology
    ? "bg-[#EAF4F6] text-[#4E7D8A]"
    : "bg-[#FFF3E6] text-[#C96F12]";

  const startButton = isOncology
    ? "bg-[#3E8FA0] text-white"
    : "bg-[#FF9933] text-white";

  const trackedUrl = buildTrackedUrl(program);

  return (
    <main className="min-h-screen bg-[#FCFBF9] text-[#1E1A17]">
      <header className="relative">
        <div className="grid h-[110px] grid-cols-3 overflow-hidden">
          <div style={{ backgroundColor: headerBars[0] }} />
          <div style={{ backgroundColor: headerBars[1] }} />
          <div style={{ backgroundColor: headerBars[2] }} />
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
              <Link href="/np-pa">NP / PA</Link>
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
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-neutral-100"
                >
                  <span style={{ color: headerBars[1] }}>Login</span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-8 py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
          Home / Programs / {program.programTitle}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-neutral-200 bg-white p-10 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${accentPill}`}>
                {program.audience}
              </span>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-600">
                {program.programFormat}
              </span>
              {program.isNew === "yes" && (
                <span className="rounded-full bg-[#FFF3E6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#C96F12]">
                  New
                </span>
              )}
            </div>

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
              {program.programTypeTitle}
            </p>

            <h1 className="mt-3 text-5xl font-bold leading-tight tracking-tight">
              {program.programTitle}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
              {program.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-[#FAF7F2] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  Accreditor
                </p>
                <p className="mt-2 text-sm font-semibold">{program.accreditor || "—"}</p>
              </div>

              <div className="rounded-2xl bg-[#FAF7F2] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  Credits
                </p>
                <p className="mt-2 text-sm font-semibold">{program.credits || "—"}</p>
              </div>

              <div className="rounded-2xl bg-[#FAF7F2] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  Modules
                </p>
                <p className="mt-2 text-sm font-semibold">{program.modules || "—"}</p>
              </div>

              <div className="rounded-2xl bg-[#FAF7F2] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  Time
                </p>
                <p className="mt-2 text-sm font-semibold">{program.timeToComplete || "—"}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-neutral-600">
              <p>
                <span className="font-semibold text-neutral-800">Accreditation Start:</span>{" "}
                {formatDate(program.accreditationStartDate)}
              </p>
              <p>
                <span className="font-semibold text-neutral-800">Accreditation Expiration:</span>{" "}
                {formatDate(program.accreditationExpirationDate)}
              </p>
              <p>
                <span className="font-semibold text-neutral-800">Tumor / Focus Area:</span>{" "}
                {program.tumorType || "General"}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={trackedUrl}
                onClick={() => trackProgramEvent(program, "start_program_clicked")}
                target={program.link.startsWith("http") ? "_blank" : "_self"}
                rel={program.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`inline-flex rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-90 ${startButton}`}
              >
                Start Program
              </a>

              {program.sampleLink && (
                <a
                  href={program.sampleLink}
                  onClick={() => trackProgramEvent(program, "sample_view_clicked")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50"
                >
                  Launch Sample
                </a>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
              {program.image ? (
                <img
                  src={program.image}
                  alt={program.programTitle}
                  className="h-64 w-full object-cover"
                />
              ) : (
                <div className="flex h-64 items-center justify-center bg-neutral-100 text-neutral-400">
                  No image
                </div>
              )}
            </div>

            <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                Tracking Preview
              </p>
              <p className="mt-4 text-sm leading-7 text-neutral-600">
                This landing page will send learners to the program with UTM parameters attached.
              </p>

              <div className="mt-5 space-y-2 text-sm text-neutral-600">
                <p>
                  <span className="font-semibold text-neutral-800">UTM Source:</span>{" "}
                  {program.utmSource || "—"}
                </p>
                <p>
                  <span className="font-semibold text-neutral-800">UTM Medium:</span>{" "}
                  {program.utmMedium || "—"}
                </p>
                <p>
                  <span className="font-semibold text-neutral-800">UTM Campaign:</span>{" "}
                  {program.utmCampaign || "—"}
                </p>
              </div>

              <div className="mt-5 rounded-2xl bg-[#FAF7F2] p-4 text-xs leading-6 text-neutral-600 break-all">
                {trackedUrl}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}