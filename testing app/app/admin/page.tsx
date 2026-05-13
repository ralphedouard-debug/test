"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type ProgramItem = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  audience: "NP / PA" | "Oncology";
  programType:
    | "Microlearning"
    | "Case-Based Learning"
    | "Adaptive Digital Education"
    | "Live Meeting"
    | "Conference Highlights"
    | "Precision Medicine";
  diseaseState: string;
  tumorType: string;
  therapeuticArea: string;
  accreditor: string;
  credits: string;
  modules: string;
  timeToComplete: string;
  accreditationStartDate: string;
  accreditationExpirationDate: string;
  status: "published" | "draft" | "archived";
  isFeatured: "yes" | "no";
  isNew: "yes" | "no";
  featuredRank: string;
  startUrl: string;
  sampleUrl: string;
  landingPageUrl: string;
  useLandingPage: "yes" | "no";
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  image: string;
};

type EventItem = {
  id: string;
  timestamp: string;
  eventType: "email_capture" | "program_click" | "progress_50" | "certificate_complete";
  programId: string;
  programTitle: string;
  learnerEmail?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

const PROGRAMS_KEY = "adminProgramsV2";
const EVENTS_KEY = "adminEventsV2";

const audienceOptions = ["NP / PA", "Oncology"] as const;
const programTypeOptions = [
  "Microlearning",
  "Case-Based Learning",
  "Adaptive Digital Education",
  "Live Meeting",
  "Conference Highlights",
  "Precision Medicine",
] as const;

const npPaDiseaseStates = [
  "Obesity",
  "Diabetes",
  "Cardiology",
  "Pulmonology",
  "Immunizations",
  "Mental Health",
  "Women's Health",
  "Primary Care",
  "Dermatology",
  "Gastroenterology",
  "General",
];

const oncologyDiseaseStates = [
  "Breast Cancer",
  "Lung Cancer",
  "GI Cancers",
  "GU Cancers",
  "Melanoma",
  "Hematologic Malignancies",
  "Gynecologic Cancers",
  "Supportive Care",
  "General Oncology",
];

const oncologyTumorTypes = [
  "General",
  "Breast Cancer",
  "Lung Cancer",
  "GI Cancers",
  "GU Cancers",
  "Melanoma",
  "Hematologic Malignancies",
  "Gynecologic Cancers",
  "Pancreatic Cancer",
  "Supportive Care",
];

const defaultProgram: ProgramItem = {
  id: "",
  title: "",
  shortTitle: "",
  description: "",
  audience: "NP / PA",
  programType: "Microlearning",
  diseaseState: "General",
  tumorType: "General",
  therapeuticArea: "",
  accreditor: "Montefiore",
  credits: "",
  modules: "",
  timeToComplete: "",
  accreditationStartDate: "",
  accreditationExpirationDate: "",
  status: "draft",
  isFeatured: "no",
  isNew: "no",
  featuredRank: "",
  startUrl: "",
  sampleUrl: "",
  landingPageUrl: "",
  useLandingPage: "yes",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  image: "",
};

const starterPrograms: ProgramItem[] = [
  {
    id: "1",
    title: "Tackling Obesity in Clinical Practice",
    shortTitle: "Obesity",
    description:
      "Practical obesity education designed for everyday NP and PA care settings.",
    audience: "NP / PA",
    programType: "Microlearning",
    diseaseState: "Obesity",
    tumorType: "General",
    therapeuticArea: "Primary Care",
    accreditor: "Montefiore",
    credits: "0.25 Credits",
    modules: "4 Modules",
    timeToComplete: "15 mins",
    accreditationStartDate: "2026-01-01",
    accreditationExpirationDate: "2026-12-31",
    status: "published",
    isFeatured: "yes",
    isNew: "yes",
    featuredRank: "1",
    startUrl: "/programs/treating-obesity-bible-belt",
    sampleUrl:
      "https://qdbites.qdcme.com/rmoB7SRnd6sOp?_gl=1*16w679g*_gcl_au*MTI0MjE2NTI1MS4xNzczNjEzMjMx*_ga*OTk2MTQyNDA0LjE3NzM2MTMyMzI.*_ga_ZXF9H46RNY*czE3NzQzODIxNzIkbzI0JGcxJHQxNzc0MzgyNjM4JGo1MyRsMCRoMA..",
    landingPageUrl: "/programs/treating-obesity-bible-belt",
    useLandingPage: "yes",
    utmSource: "mailchimp",
    utmMedium: "email",
    utmCampaign: "obesity_launch_2026",
    image: "/np-pa-card.png",
  },
  {
    id: "2",
    title: "Community Oncology in Practice",
    shortTitle: "Community Oncology",
    description:
      "Programs tailored to real-world oncology care delivery and team-based practice.",
    audience: "Oncology",
    programType: "Case-Based Learning",
    diseaseState: "General Oncology",
    tumorType: "General",
    therapeuticArea: "Oncology",
    accreditor: "Montefiore",
    credits: "0.50 Credits",
    modules: "1 Module",
    timeToComplete: "20 mins",
    accreditationStartDate: "2026-02-01",
    accreditationExpirationDate: "2026-11-30",
    status: "published",
    isFeatured: "yes",
    isNew: "yes",
    featuredRank: "1",
    startUrl: "/oncology/programs",
    sampleUrl: "",
    landingPageUrl: "/oncology/programs",
    useLandingPage: "yes",
    utmSource: "linkedin",
    utmMedium: "social",
    utmCampaign: "oncology_launch_q1",
    image: "/oncology-card.png",
  },
];

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

function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function safeLoadPrograms() {
  try {
    const raw = localStorage.getItem(PROGRAMS_KEY);
    if (!raw) return starterPrograms;
    return JSON.parse(raw) as ProgramItem[];
  } catch {
    return starterPrograms;
  }
}

function safeLoadEvents() {
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as EventItem[];
  } catch {
    return [];
  }
}

function percent(numerator: number, denominator: number) {
  if (!denominator) return 0;
  return Math.round((numerator / denominator) * 100);
}

function getExpirationState(expirationDate: string) {
  if (!expirationDate) return "No Date";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiry = new Date(`${expirationDate}T00:00:00`);
  if (Number.isNaN(expiry.getTime())) return "No Date";

  const diffMs = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Expired";
  if (diffDays <= 60) return "Expiring Soon";
  return "Active";
}

function getExpirationBadgeClass(state: string) {
  if (state === "Expired") return "bg-[#FEE2E2] text-red-600";
  if (state === "Expiring Soon") return "bg-[#FFF7ED] text-[#C96F12]";
  if (state === "Active") return "bg-[#EEF6EA] text-[#3C7A32]";
  return "bg-neutral-100 text-neutral-600";
}

function getTrackedDestination(program: ProgramItem) {
  const base =
    program.useLandingPage === "yes" && program.landingPageUrl
      ? program.landingPageUrl
      : program.startUrl;

  if (!base) return "—";

  const params = new URLSearchParams();
  if (program.utmSource) params.set("utm_source", program.utmSource);
  if (program.utmMedium) params.set("utm_medium", program.utmMedium);
  if (program.utmCampaign) params.set("utm_campaign", program.utmCampaign);

  const query = params.toString();
  if (!query) return base;

  return `${base}${base.includes("?") ? "&" : "?"}${query}`;
}

function getDiseaseOptions(audience: ProgramItem["audience"]) {
  return audience === "Oncology" ? oncologyDiseaseStates : npPaDiseaseStates;
}

function getFallbackImage(audience: ProgramItem["audience"]) {
  return audience === "Oncology" ? "/oncology-card.png" : "/np-pa-card.png";
}

export default function AdminPage() {
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [form, setForm] = useState<ProgramItem>(defaultProgram);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadedPrograms = safeLoadPrograms();
    const loadedEvents = safeLoadEvents();

    setPrograms(loadedPrograms);
    setEvents(loadedEvents);

    localStorage.setItem(PROGRAMS_KEY, JSON.stringify(loadedPrograms));
    localStorage.setItem(EVENTS_KEY, JSON.stringify(loadedEvents));
  }, []);

  function savePrograms(nextPrograms: ProgramItem[]) {
    setPrograms(nextPrograms);
    localStorage.setItem(PROGRAMS_KEY, JSON.stringify(nextPrograms));
  }

  function saveEvents(nextEvents: EventItem[]) {
    setEvents(nextEvents);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(nextEvents));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => {
      if (name === "audience") {
        return {
          ...prev,
          audience: value as ProgramItem["audience"],
          diseaseState:
            value === "Oncology" ? "General Oncology" : "General",
          tumorType: "General",
          therapeuticArea: value === "Oncology" ? "Oncology" : "Primary Care",
          image: prev.image || getFallbackImage(value as ProgramItem["audience"]),
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter a program title.");
      return;
    }

    const cleaned: ProgramItem = {
      ...form,
      title: form.title.trim(),
      shortTitle: form.shortTitle.trim(),
      description: form.description.trim(),
      therapeuticArea: form.therapeuticArea.trim(),
      credits: form.credits.trim(),
      modules: form.modules.trim(),
      timeToComplete: form.timeToComplete.trim(),
      startUrl: form.startUrl.trim(),
      sampleUrl: form.sampleUrl.trim(),
      landingPageUrl: form.landingPageUrl.trim(),
      utmSource: form.utmSource.trim(),
      utmMedium: form.utmMedium.trim(),
      utmCampaign: form.utmCampaign.trim(),
      image: form.image.trim() || getFallbackImage(form.audience),
    };

    if (editingId) {
      const updated = programs.map((program) =>
        program.id === editingId ? { ...cleaned, id: editingId } : program
      );
      savePrograms(updated);
      setEditingId(null);
    } else {
      savePrograms([{ ...cleaned, id: Date.now().toString() }, ...programs]);
    }

    setForm(defaultProgram);
  }

  function handleEdit(program: ProgramItem) {
    setForm(program);
    setEditingId(program.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm("Delete this program?");
    if (!confirmed) return;

    savePrograms(programs.filter((p) => p.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setForm(defaultProgram);
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(defaultProgram);
  }

  function resetPrograms() {
    const confirmed = window.confirm("Reset starter programs?");
    if (!confirmed) return;
    savePrograms(starterPrograms);
  }

  function clearEvents() {
    const confirmed = window.confirm("Clear monitoring events?");
    if (!confirmed) return;
    saveEvents([]);
  }

  function addDemoEvent(program: ProgramItem, eventType: EventItem["eventType"]) {
    const event: EventItem = {
      id: `${eventType}-${program.id}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      eventType,
      programId: program.id,
      programTitle: program.title,
      learnerEmail: `demo${Math.floor(Math.random() * 999)}@sample.com`,
      utmSource: program.utmSource,
      utmMedium: program.utmMedium,
      utmCampaign: program.utmCampaign,
    };

    saveEvents([event, ...events]);
  }

  function seedFunnel(program: ProgramItem) {
    addDemoEvent(program, "email_capture");
    addDemoEvent(program, "program_click");
    addDemoEvent(program, "progress_50");
    addDemoEvent(program, "certificate_complete");
  }

  const filteredPrograms = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return programs;

    return programs.filter((program) => {
      return (
        program.title.toLowerCase().includes(q) ||
        program.shortTitle.toLowerCase().includes(q) ||
        program.audience.toLowerCase().includes(q) ||
        program.programType.toLowerCase().includes(q) ||
        program.diseaseState.toLowerCase().includes(q) ||
        program.tumorType.toLowerCase().includes(q) ||
        program.therapeuticArea.toLowerCase().includes(q) ||
        program.status.toLowerCase().includes(q)
      );
    });
  }, [programs, searchTerm]);

  const monitoring = useMemo(() => {
    const emailCaptures = events.filter((e) => e.eventType === "email_capture").length;
    const learners = events.filter((e) => e.eventType === "program_click").length;
    const completers = events.filter((e) => e.eventType === "progress_50").length;
    const certificateCompleters = events.filter(
      (e) => e.eventType === "certificate_complete"
    ).length;

    return {
      emailCaptures,
      learners,
      completers,
      certificateCompleters,
      emailToLearnerRate: percent(learners, emailCaptures),
      learnerTo50Rate: percent(completers, learners),
      learnerToCertRate: percent(certificateCompleters, learners),
    };
  }, [events]);

  const programRows = useMemo(() => {
    return programs.map((program) => {
      const emailCaptures = events.filter(
        (e) => e.programId === program.id && e.eventType === "email_capture"
      ).length;

      const learners = events.filter(
        (e) => e.programId === program.id && e.eventType === "program_click"
      ).length;

      const completers = events.filter(
        (e) => e.programId === program.id && e.eventType === "progress_50"
      ).length;

      const certificateCompleters = events.filter(
        (e) => e.programId === program.id && e.eventType === "certificate_complete"
      ).length;

      return {
        ...program,
        emailCaptures,
        learners,
        completers,
        certificateCompleters,
        completionRate: percent(completers, learners),
        certificateRate: percent(certificateCompleters, learners),
        expirationState: getExpirationState(program.accreditationExpirationDate),
      };
    });
  }, [programs, events]);

  const recentEvents = useMemo(() => {
    return [...events]
      .sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 8);
  }, [events]);

  const expiringSoonPrograms = useMemo(() => {
    return programRows.filter((p) => p.expirationState === "Expiring Soon");
  }, [programRows]);

  const expiredPrograms = useMemo(() => {
    return programRows.filter((p) => p.expirationState === "Expired");
  }, [programRows]);

  return (
    <main className="min-h-screen bg-[#FCFBF9] text-[#1E1A17]">
      <header className="border-b border-[#E9E0D5] bg-[#FF9933]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center">
            <img
              src="/qd-logo-white.png"
              alt="QDcme"
              className="h-14 w-auto cursor-pointer"
            />
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium text-white">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/admin" className="underline underline-offset-4">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
            Admin
          </p>
          <h1 className="mt-3 text-4xl font-bold">Program Management + Monitoring</h1>
          <p className="mt-3 max-w-4xl text-neutral-600">
            Top section is for posting programs correctly and managing expiration,
            audience, disease state, tumor type, landing pages, and links. Monitoring
            sits below as the second panel.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={resetPrograms}
              className="rounded-full border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700"
            >
              Reset Starter Programs
            </button>

            <button
              type="button"
              onClick={clearEvents}
              className="rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-600"
            >
              Clear Monitoring Events
            </button>

            <Link
              href="/"
              className="rounded-full bg-[#FF9933] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              View LMS
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {editingId ? "Edit Program" : "Add / Post Program"}
              </h2>
              <span className="text-sm text-neutral-500">Priority #1</span>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Program Title
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Short Title
                  </label>
                  <input
                    name="shortTitle"
                    value={form.shortTitle}
                    onChange={handleChange}
                    placeholder="Example: Obesity"
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Audience
                  </label>
                  <select
                    name="audience"
                    value={form.audience}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  >
                    {audienceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Program Type
                  </label>
                  <select
                    name="programType"
                    value={form.programType}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  >
                    {programTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Disease State
                  </label>
                  <select
                    name="diseaseState"
                    value={form.diseaseState}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  >
                    {getDiseaseOptions(form.audience).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Tumor Type
                  </label>
                  <select
                    name="tumorType"
                    value={form.tumorType}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  >
                    {oncologyTumorTypes.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Therapeutic Area
                  </label>
                  <input
                    name="therapeuticArea"
                    value={form.therapeuticArea}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Credits
                  </label>
                  <input
                    name="credits"
                    value={form.credits}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Modules
                  </label>
                  <input
                    name="modules"
                    value={form.modules}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Time to Complete
                  </label>
                  <input
                    name="timeToComplete"
                    value={form.timeToComplete}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Accreditor
                  </label>
                  <input
                    name="accreditor"
                    value={form.accreditor}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Accreditation Start
                  </label>
                  <input
                    type="date"
                    name="accreditationStartDate"
                    value={form.accreditationStartDate}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Accreditation Expiration
                  </label>
                  <input
                    type="date"
                    name="accreditationExpirationDate"
                    value={form.accreditationExpirationDate}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  >
                    <option value="published">published</option>
                    <option value="draft">draft</option>
                    <option value="archived">archived</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Featured
                  </label>
                  <select
                    name="isFeatured"
                    value={form.isFeatured}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  >
                    <option value="no">no</option>
                    <option value="yes">yes</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Newly Launched
                  </label>
                  <select
                    name="isNew"
                    value={form.isNew}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  >
                    <option value="no">no</option>
                    <option value="yes">yes</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Featured Rank
                  </label>
                  <input
                    name="featuredRank"
                    value={form.featuredRank}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Start Program URL
                  </label>
                  <input
                    name="startUrl"
                    value={form.startUrl}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Sample URL
                  </label>
                  <input
                    name="sampleUrl"
                    value={form.sampleUrl}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Landing Page URL
                  </label>
                  <input
                    name="landingPageUrl"
                    value={form.landingPageUrl}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Use Landing Page First?
                  </label>
                  <select
                    name="useLandingPage"
                    value={form.useLandingPage}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  >
                    <option value="yes">yes</option>
                    <option value="no">no</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Image Path
                  </label>
                  <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="/np-pa-card.png"
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    UTM Source
                  </label>
                  <input
                    name="utmSource"
                    value={form.utmSource}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    UTM Medium
                  </label>
                  <input
                    name="utmMedium"
                    value={form.utmMedium}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    UTM Campaign
                  </label>
                  <input
                    name="utmCampaign"
                    value={form.utmCampaign}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  className="rounded-full bg-[#FF9933] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {editingId ? "Save Changes" : "Post Program"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="rounded-full border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Program Preview</h2>
                <span className="text-sm text-neutral-500">Before posting</span>
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
                <img
                  src={form.image || getFallbackImage(form.audience)}
                  alt={form.title || "Program preview"}
                  className="h-52 w-full object-cover"
                />

                <div className="p-8">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#FFF3E6] px-3 py-1 text-xs font-semibold text-[#C96F12]">
                      {form.programType}
                    </span>
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                      {form.audience}
                    </span>
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                      {form.diseaseState || "Disease State"}
                    </span>
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                      {form.tumorType || "Tumor Type"}
                    </span>
                  </div>

                  <h3 className="mt-4 text-3xl font-bold">
                    {form.title || "Program Title"}
                  </h3>

                  <p className="mt-4 text-base leading-7 text-neutral-600">
                    {form.description || "Program description preview."}
                  </p>

                  <div className="mt-5 grid gap-2 text-sm text-neutral-600">
                    <p>Therapeutic Area: {form.therapeuticArea || "—"}</p>
                    <p>Credits: {form.credits || "—"}</p>
                    <p>Modules: {form.modules || "—"}</p>
                    <p>Time to Complete: {form.timeToComplete || "—"}</p>
                    <p>Accreditor: {form.accreditor || "—"}</p>
                    <p>
                      Accreditation Window: {formatDate(form.accreditationStartDate)} -{" "}
                      {formatDate(form.accreditationExpirationDate)}
                    </p>
                  </div>

                  <div className="mt-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getExpirationBadgeClass(
                        getExpirationState(form.accreditationExpirationDate)
                      )}`}
                    >
                      {getExpirationState(form.accreditationExpirationDate)}
                    </span>
                  </div>

                  <div className="mt-5 rounded-2xl bg-[#FAF7F2] p-4 text-sm text-neutral-600">
                    <p className="font-semibold text-neutral-800">Launch setup</p>
                    <p className="mt-2">Start URL: {form.startUrl || "—"}</p>
                    <p>Sample URL: {form.sampleUrl || "—"}</p>
                    <p>Landing Page URL: {form.landingPageUrl || "—"}</p>
                    <p>Use Landing Page First: {form.useLandingPage}</p>
                  </div>

                  <div className="mt-4 rounded-2xl bg-[#FAF7F2] p-4 text-sm text-neutral-600">
                    <p className="font-semibold text-neutral-800">Tracked destination</p>
                    <p className="mt-2 break-all">{getTrackedDestination(form)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">Expiration Watch</h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-[#FFF7ED] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C96F12]">
                    Expiring Soon
                  </p>
                  <p className="mt-2 text-3xl font-bold">{expiringSoonPrograms.length}</p>
                </div>

                <div className="rounded-2xl bg-[#FEE2E2] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red-600">
                    Expired
                  </p>
                  <p className="mt-2 text-3xl font-bold">{expiredPrograms.length}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {[...expiredPrograms, ...expiringSoonPrograms].slice(0, 6).map((program) => (
                  <div
                    key={program.id}
                    className="rounded-2xl border border-neutral-200 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{program.title}</p>
                        <p className="text-sm text-neutral-500">
                          Expires {formatDate(program.accreditationExpirationDate)}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getExpirationBadgeClass(
                          program.expirationState
                        )}`}
                      >
                        {program.expirationState}
                      </span>
                    </div>
                  </div>
                ))}

                {expiredPrograms.length === 0 && expiringSoonPrograms.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-neutral-300 p-4 text-sm text-neutral-500">
                    No programs need expiration action right now.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                Program Library
              </p>
              <h2 className="mt-2 text-2xl font-bold">Posted programs</h2>
            </div>

            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search title, disease, tumor, audience"
              className="w-full max-w-sm rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-[#FF9933]"
            />
          </div>

          <div className="mt-6 space-y-4">
            {filteredPrograms.map((program) => {
              const row = programRows.find((r) => r.id === program.id);
              const expirationState = row?.expirationState || "No Date";

              return (
                <div
                  key={program.id}
                  className="rounded-3xl border border-neutral-200 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#FFF3E6] px-3 py-1 text-xs font-semibold text-[#C96F12]">
                          {program.programType}
                        </span>
                        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                          {program.audience}
                        </span>
                        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                          {program.diseaseState}
                        </span>
                        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                          {program.tumorType}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getExpirationBadgeClass(
                            expirationState
                          )}`}
                        >
                          {expirationState}
                        </span>
                      </div>

                      <h3 className="mt-3 text-2xl font-bold">{program.title}</h3>

                      <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-600">
                        {program.description}
                      </p>

                      <div className="mt-4 grid gap-2 text-sm text-neutral-500 md:grid-cols-3">
                        <div>Therapeutic Area: {program.therapeuticArea || "—"}</div>
                        <div>Credits: {program.credits || "—"}</div>
                        <div>Modules: {program.modules || "—"}</div>
                        <div>Time: {program.timeToComplete || "—"}</div>
                        <div>Status: {program.status}</div>
                        <div>Featured: {program.isFeatured}</div>
                        <div>Accreditor: {program.accreditor || "—"}</div>
                        <div>Start: {formatDate(program.accreditationStartDate)}</div>
                        <div>Expiration: {formatDate(program.accreditationExpirationDate)}</div>
                      </div>

                      <div className="mt-4 rounded-2xl bg-[#FAF7F2] p-4 text-sm text-neutral-600">
                        <p>Start URL: {program.startUrl || "—"}</p>
                        <p>Sample URL: {program.sampleUrl || "—"}</p>
                        <p>Landing Page URL: {program.landingPageUrl || "—"}</p>
                        <p>Tracked Destination: {getTrackedDestination(program)}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(program)}
                        className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(program.id)}
                        className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredPrograms.length === 0 && (
              <div className="rounded-2xl border border-dashed border-neutral-300 p-6 text-sm text-neutral-500">
                No programs match your search.
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                Monitoring Dashboard
              </p>
              <h2 className="mt-2 text-2xl font-bold">Performance panel</h2>
            </div>
            <span className="text-sm text-neutral-500">Priority #2</span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-[#F7DFC3] bg-[#FFF7ED] p-6 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C96F12]">
                Email Captures
              </p>
              <p className="mt-3 text-4xl font-bold">{monitoring.emailCaptures}</p>
            </div>

            <div className="rounded-3xl border border-[#DDEFF2] bg-[#F6FBFC] p-6 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4E7D8A]">
                Learners
              </p>
              <p className="mt-3 text-4xl font-bold">{monitoring.learners}</p>
            </div>

            <div className="rounded-3xl border border-[#DCEFD7] bg-[#F5FBF2] p-6 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3C7A32]">
                Completers
              </p>
              <p className="mt-3 text-4xl font-bold">{monitoring.completers}</p>
            </div>

            <div className="rounded-3xl border border-[#EADCFB] bg-[#FAF7FF] p-6 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7C3AED]">
                Certificate Completers
              </p>
              <p className="mt-3 text-4xl font-bold">{monitoring.certificateCompleters}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-[#FCFBF9] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Email → Learner
              </p>
              <p className="mt-2 text-3xl font-bold">{monitoring.emailToLearnerRate}%</p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-[#FCFBF9] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Learner → 50%
              </p>
              <p className="mt-2 text-3xl font-bold">{monitoring.learnerTo50Rate}%</p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-[#FCFBF9] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Learner → Certificate
              </p>
              <p className="mt-2 text-3xl font-bold">{monitoring.learnerToCertRate}%</p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  <th className="px-4 py-2">Program</th>
                  <th className="px-4 py-2">Audience</th>
                  <th className="px-4 py-2">UTM Campaign</th>
                  <th className="px-4 py-2">Emails</th>
                  <th className="px-4 py-2">Learners</th>
                  <th className="px-4 py-2">50%</th>
                  <th className="px-4 py-2">Certificates</th>
                  <th className="px-4 py-2">Demo</th>
                </tr>
              </thead>
              <tbody>
                {programRows.map((program) => (
                  <tr key={program.id} className="rounded-2xl bg-[#FCFBF9]">
                    <td className="rounded-l-2xl px-4 py-4">
                      <div className="font-semibold text-neutral-900">{program.title}</div>
                      <div className="text-sm text-neutral-500">{program.programType}</div>
                    </td>
                    <td className="px-4 py-4 text-sm">{program.audience}</td>
                    <td className="px-4 py-4 text-sm">{program.utmCampaign || "—"}</td>
                    <td className="px-4 py-4 text-sm font-semibold">{program.emailCaptures}</td>
                    <td className="px-4 py-4 text-sm font-semibold">{program.learners}</td>
                    <td className="px-4 py-4 text-sm font-semibold">{program.completers}</td>
                    <td className="px-4 py-4 text-sm font-semibold">
                      {program.certificateCompleters}
                    </td>
                    <td className="rounded-r-2xl px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => addDemoEvent(program, "email_capture")}
                          className="rounded-full border border-[#FF9933] px-3 py-1.5 text-xs font-semibold text-[#C96F12]"
                        >
                          Email
                        </button>
                        <button
                          type="button"
                          onClick={() => addDemoEvent(program, "program_click")}
                          className="rounded-full border border-[#7CC6D4] px-3 py-1.5 text-xs font-semibold text-[#4E7D8A]"
                        >
                          Learner
                        </button>
                        <button
                          type="button"
                          onClick={() => addDemoEvent(program, "progress_50")}
                          className="rounded-full border border-[#70B45B] px-3 py-1.5 text-xs font-semibold text-[#3C7A32]"
                        >
                          50%
                        </button>
                        <button
                          type="button"
                          onClick={() => addDemoEvent(program, "certificate_complete")}
                          className="rounded-full border border-[#A66BFF] px-3 py-1.5 text-xs font-semibold text-[#7C3AED]"
                        >
                          Cert
                        </button>
                        <button
                          type="button"
                          onClick={() => seedFunnel(program)}
                          className="rounded-full bg-[#FF9933] px-3 py-1.5 text-xs font-semibold text-white"
                        >
                          Full Funnel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h3 className="text-xl font-bold">Recent Events</h3>
              <div className="mt-4 space-y-3">
                {recentEvents.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-neutral-300 p-5 text-sm text-neutral-500">
                    No monitoring events yet.
                  </div>
                ) : (
                  recentEvents.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-2xl border border-neutral-200 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold">{event.programTitle}</p>
                        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
                          {event.eventType}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-neutral-600">
                        {event.learnerEmail || "Unknown learner"}
                      </p>

                      <p className="mt-2 text-xs text-neutral-500">
                        {formatDateTime(event.timestamp)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold">Tracked Events in V1</h3>
              <div className="mt-4 rounded-2xl bg-[#FAF7F2] p-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-700">
                    email_capture
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-700">
                    program_click
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-700">
                    progress_50
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-700">
                    certificate_complete
                  </span>
                </div>

                <p className="mt-4 text-sm text-neutral-600">
                  This page is structured so program posting and expiration management
                  come first. Monitoring lives below and uses these core events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}