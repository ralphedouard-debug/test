"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Provider = {
  npi: string;
  provider_type: string;
  provider_name: string | null;
  city: string | null;
  practice_state: string | null;
  state?: string | null;
  zip: string | null;
  already_approved?: boolean;
};

function csvSafe(value: unknown) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function googleUrl(query: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function displayName(p: Provider | null) {
  if (!p) return "";
  return p.provider_name && p.provider_name.trim() !== ""
    ? p.provider_name
    : `NPI ${p.npi}`;
}

export default function OncologyAppContactDiscoveryPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selected, setSelected] = useState<Provider | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [batchSize, setBatchSize] = useState(5);

  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [practiceUrl, setPracticeUrl] = useState("");
  const [fax, setFax] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [subspecialty, setSubspecialty] = useState("");
  const [oncologyFocus, setOncologyFocus] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadProviders();
  }, []);

  async function loadProviders() {
    const { data, error } = await supabase
      .from("v_oncology_app_contact_discovery_queue")
      .select("*")
      .eq("already_approved", false)
      .order("practice_state", { ascending: true })
      .order("provider_name", { ascending: true })
      .limit(500);

    if (error) {
      console.error(error);
      setMessage("Error loading discovery queue.");
      return;
    }

    const rows = (data ?? []) as Provider[];
    setProviders(rows);
    setSelected(rows[0] ?? null);
    setMessage(`Loaded ${rows.length} clean oncology APP records.`);
  }

  function clearInputs() {
    setEmail("");
    setLinkedin("");
    setFacebook("");
    setInstagram("");
    setPracticeUrl("");
    setFax("");
    setSpecialty("");
    setSubspecialty("");
    setOncologyFocus("");
    setSourceUrl("");
    setSourceName("");
    setNotes("");
  }

  const filteredProviders = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return providers;

    return providers.filter((p) =>
      [p.provider_name, p.npi, p.provider_type, p.city, p.practice_state, p.zip]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [providers, searchTerm]);

  function makeSearches(p: Provider) {
    const name = displayName(p);
    const city = p.city ?? "";
    const state = p.practice_state ?? p.state ?? "";
    const type = p.provider_type ?? "";
    const base = `"${name}" "${city}" "${state}" ${type}`;

    return {
      email_search_url: googleUrl(`${base} oncology email`),
      npi_search_url: googleUrl(`"${p.npi}" "${name}"`),
      linkedin_search_url: googleUrl(`${base} oncology site:linkedin.com`),
      pdf_search_url: googleUrl(`${base} oncology filetype:pdf`),
      hospital_profile_search_url: googleUrl(`${base} oncology hospital profile`),
      facebook_search_url: googleUrl(`${base} oncology facebook`),
      instagram_search_url: googleUrl(`${base} oncology instagram`),
      fax_search_url: googleUrl(`${base} oncology fax`),
      specialty_search_url: googleUrl(`${base} oncology specialty subspecialty`),
    };
  }

  function openSearch(type: keyof ReturnType<typeof makeSearches>) {
    if (!selected) return;
    window.open(makeSearches(selected)[type], "_blank", "noopener,noreferrer");
  }

  function exportBulkSearchPack() {
    const rows = filteredProviders.map((p) => {
      const searches = makeSearches(p);

      return {
        provider_name: displayName(p),
        npi: p.npi,
        provider_type: p.provider_type,
        city: p.city ?? "",
        state: p.practice_state ?? p.state ?? "",
        zip: p.zip ?? "",
        ...searches,
      };
    });

    if (!rows.length) {
      setMessage("No providers to export.");
      return;
    }

    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers.map((h) => csvSafe(row[h as keyof typeof row])).join(",")
      ),
    ].join("\n");

    const today = new Date().toISOString().slice(0, 10);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `oncology-app-bulk-search-pack-${rows.length}-${today}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setMessage(`Exported bulk search pack for ${rows.length} providers.`);
  }

  function openBatch(searchType: keyof ReturnType<typeof makeSearches>) {
    const batch = filteredProviders.slice(0, batchSize);

    if (!batch.length) {
      setMessage("No providers available for batch search.");
      return;
    }

    batch.forEach((p, index) => {
      setTimeout(() => {
        window.open(makeSearches(p)[searchType], "_blank", "noopener,noreferrer");
      }, index * 300);
    });

    setMessage(`Opened ${batch.length} ${searchType.replaceAll("_", " ")} tabs.`);
  }

  function selectProvider(p: Provider) {
    setSelected(p);
    clearInputs();
    setMessage("");
  }

  function skipSelected() {
    if (!selected) return;
    const idx = filteredProviders.findIndex((p) => p.npi === selected.npi);
    setSelected(filteredProviders[idx + 1] ?? filteredProviders[0] ?? null);
    clearInputs();
  }

  async function saveCandidate() {
    if (!selected) return;

    const { error } = await supabase.from("oncology_app_contact_candidates").insert({
      npi: selected.npi,
      provider_type: selected.provider_type,
      state: selected.practice_state,
      city: selected.city,
      provider_name: displayName(selected),
      source_url: sourceUrl,
      source_name: sourceName,
      found_email: email,
      linkedin_url: linkedin,
      facebook_url: facebook,
      practice_url: practiceUrl,
      fax_number: fax,
      specialty,
      subspecialty,
      oncology_focus: oncologyFocus,
      source_notes: notes,
      specialty_notes: notes,
      confidence_score: email || linkedin || practiceUrl ? 0.7 : 0.4,
      review_status: "pending",
    });

    if (error) {
      console.error(error);
      setMessage("Error saving candidate.");
      return;
    }

    setMessage(`Saved candidate for ${displayName(selected)}.`);
  }

  async function approveContact() {
    if (!selected) return;

    if (!email && !linkedin && !facebook && !instagram && !practiceUrl && !fax) {
      setMessage("Add email, social, practice URL, or fax before approving.");
      return;
    }

    const { error } = await supabase.from("oncology_app_contacts_approved").upsert(
      {
        npi: selected.npi,
        provider_type: selected.provider_type,
        state: selected.practice_state,
        city: selected.city,
        provider_name: displayName(selected),
        email: email || null,
        linkedin_url: linkedin || null,
        facebook_url: facebook || null,
        practice_url: practiceUrl || null,
        fax_number: fax || null,
        specialty,
        subspecialty,
        oncology_focus: oncologyFocus,
        source_url: sourceUrl,
        source_name: sourceName,
        source_notes: notes,
        status: "active",
        approved_by: "internal_user",
      },
      { onConflict: "npi" }
    );

    if (error) {
      console.error(error);
      setMessage("Error approving contact.");
      return;
    }

    const remaining = providers.filter((p) => p.npi !== selected.npi);
    setProviders(remaining);
    setSelected(remaining[0] ?? null);
    clearInputs();
    setMessage("Approved and removed from queue.");
  }

  return (
    <div className="min-h-screen bg-[#f7f8fb] p-6 text-[#111827]">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ef7d00]">
            QDcme Data Hive
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#12213f]">
            Oncology APP Contact Discovery
          </h1>
          <p className="mt-2 max-w-4xl text-sm text-slate-600">
            V2 bulk discovery for clean oncology APPs. Priority: email, socials,
            specialty, subspecialty, oncology focus, fax, and source evidence.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={exportBulkSearchPack}
              className="rounded-full bg-[#ef7d00] px-5 py-3 text-sm font-bold text-white hover:bg-[#d96f00]"
            >
              Export Bulk Search Pack
            </button>

            <button
              onClick={loadProviders}
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Refresh Queue
            </button>

            <div className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">
              Queue: {providers.length.toLocaleString()}
            </div>
          </div>

          {message && (
            <div className="mt-4 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-900">
              {message}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#12213f]">Bulk Search Controls</h2>
          <p className="mt-1 text-sm text-slate-600">
            Opens tabs for the first batch of currently filtered providers. Browser may block
            too many tabs; start with 5.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <select
              value={batchSize}
              onChange={(e) => setBatchSize(Number(e.target.value))}
              className="rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
            >
              <option value={5}>First 5</option>
              <option value={10}>First 10</option>
              <option value={20}>First 20</option>
            </select>

            <button onClick={() => openBatch("email_search_url")} className="rounded-full bg-[#12213f] px-4 py-3 text-sm font-bold text-white">
              Open Email Searches
            </button>
            <button onClick={() => openBatch("linkedin_search_url")} className="rounded-full bg-[#12213f] px-4 py-3 text-sm font-bold text-white">
              Open LinkedIn Searches
            </button>
            <button onClick={() => openBatch("hospital_profile_search_url")} className="rounded-full bg-[#12213f] px-4 py-3 text-sm font-bold text-white">
              Open Profile Searches
            </button>
            <button onClick={() => openBatch("pdf_search_url")} className="rounded-full bg-[#12213f] px-4 py-3 text-sm font-bold text-white">
              Open PDF Searches
            </button>
            <button onClick={() => openBatch("fax_search_url")} className="rounded-full bg-[#12213f] px-4 py-3 text-sm font-bold text-white">
              Open Fax Searches
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.45fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-[#12213f]">Queue Table</h2>
                <p className="text-sm text-slate-500">
                  Export all filtered rows or review one provider at a time.
                </p>
              </div>

              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, NPI, city, state..."
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#ef7d00] md:w-96"
              />
            </div>

            <div className="max-h-[650px] overflow-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[780px] text-sm">
                <thead className="sticky top-0 bg-slate-100 text-left text-slate-700">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">NPI</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">ZIP</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProviders.map((p) => (
                    <tr
                      key={p.npi}
                      className={`border-t border-slate-200 ${
                        selected?.npi === p.npi ? "bg-orange-50" : "bg-white"
                      }`}
                    >
                      <td className="px-4 py-4">
                        <div className="font-bold text-[#111827]">{displayName(p)}</div>
                        <div className="text-xs text-slate-500">{p.provider_type}</div>
                      </td>
                      <td className="px-4 py-4">{p.npi}</td>
                      <td className="px-4 py-4">{p.provider_type}</td>
                      <td className="px-4 py-4">
                        {p.city} {p.practice_state}
                      </td>
                      <td className="px-4 py-4">{p.zip}</td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => selectProvider(p)}
                          className="rounded-full bg-[#ef7d00] px-4 py-2 text-xs font-bold text-white hover:bg-[#d96f00]"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredProviders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                        No providers match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#12213f]">Candidate Review</h2>

            {!selected ? (
              <p className="mt-4 text-sm text-slate-500">No selected provider.</p>
            ) : (
              <>
                <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                  <p className="text-lg font-bold">{displayName(selected)}</p>
                  <p className="text-sm text-slate-700">
                    {selected.provider_type} · {selected.city}, {selected.practice_state}{" "}
                    {selected.zip}
                  </p>
                  <p className="text-xs text-slate-500">NPI: {selected.npi}</p>
                </div>

                <div className="mt-4 rounded-2xl border border-orange-200 bg-orange-50 p-4">
                  <p className="mb-3 text-sm font-bold text-orange-950">Search Assist</p>
                  <div className="grid grid-cols-1 gap-2">
                    <button onClick={() => openSearch("email_search_url")} className="rounded-full bg-[#12213f] px-4 py-2 text-sm font-bold text-white">Search Web / Email</button>
                    <button onClick={() => openSearch("npi_search_url")} className="rounded-full bg-[#12213f] px-4 py-2 text-sm font-bold text-white">Search NPI Match</button>
                    <button onClick={() => openSearch("linkedin_search_url")} className="rounded-full bg-[#12213f] px-4 py-2 text-sm font-bold text-white">Search LinkedIn</button>
                    <button onClick={() => openSearch("hospital_profile_search_url")} className="rounded-full bg-[#12213f] px-4 py-2 text-sm font-bold text-white">Search Hospital/Profile</button>
                    <button onClick={() => openSearch("pdf_search_url")} className="rounded-full bg-[#12213f] px-4 py-2 text-sm font-bold text-white">Search PDFs</button>
                    <button onClick={() => openSearch("facebook_search_url")} className="rounded-full bg-[#12213f] px-4 py-2 text-sm font-bold text-white">Search Facebook</button>
                    <button onClick={() => openSearch("instagram_search_url")} className="rounded-full bg-[#12213f] px-4 py-2 text-sm font-bold text-white">Search Instagram</button>
                    <button onClick={() => openSearch("fax_search_url")} className="rounded-full bg-[#12213f] px-4 py-2 text-sm font-bold text-white">Search Fax</button>
                    <button onClick={() => openSearch("specialty_search_url")} className="rounded-full bg-[#12213f] px-4 py-2 text-sm font-bold text-white">Search Specialty</button>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <input className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" placeholder="LinkedIn URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                  <input className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" placeholder="Facebook URL" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                  <input className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" placeholder="Instagram URL" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                  <input className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" placeholder="Practice / Profile URL" value={practiceUrl} onChange={(e) => setPracticeUrl(e.target.value)} />
                  <input className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" placeholder="Fax Number" value={fax} onChange={(e) => setFax(e.target.value)} />
                  <input className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" placeholder="Specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
                  <input className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" placeholder="Subspecialty" value={subspecialty} onChange={(e) => setSubspecialty(e.target.value)} />
                  <input className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" placeholder="Oncology Focus" value={oncologyFocus} onChange={(e) => setOncologyFocus(e.target.value)} />
                  <input className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" placeholder="Source URL" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} />
                  <input className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" placeholder="Source Name" value={sourceName} onChange={(e) => setSourceName(e.target.value)} />
                  <textarea className="min-h-24 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" placeholder="Notes / source evidence" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <button onClick={saveCandidate} className="rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
                    Save Candidate
                  </button>

                  <button onClick={approveContact} className="rounded-full bg-[#ef7d00] px-4 py-3 text-sm font-bold text-white hover:bg-[#d96f00]">
                    Approve Contact
                  </button>

                  <button onClick={skipSelected} className="rounded-full bg-slate-800 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700">
                    Skip
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}