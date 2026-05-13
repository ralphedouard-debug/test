"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type TargetAppsRow = {
  state: string;
  np_count: number | null;
  pa_count: number | null;
  total_apps: number | null;
};

type TargetHemOncRow = {
  state: string;
  med_onc_count: number | null;
  hem_onc_count: number | null;
  total_hemonc: number | null;
};

type TargetOncAppsRow = {
  state: string;
  onc_np_count: number | null;
  onc_pa_count: number | null;
  total_onc_apps: number | null;
};

const DEFAULT_VISIBLE = 8;

function safeNumber(value: number | null | undefined) {
  return value ?? 0;
}

function formatNumber(value: number | null | undefined) {
  return safeNumber(value).toLocaleString();
}

function Tooltip({
  lines,
}: {
  lines: { label: string; value: number | null | undefined }[];
}) {
  return (
    <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden min-w-[180px] rounded-2xl border border-neutral-200 bg-white p-3 text-xs shadow-lg group-hover:block">
      <div className="space-y-1.5">
        {lines.map((line) => (
          <div key={line.label} className="flex items-center justify-between gap-4">
            <span className="text-neutral-500">{line.label}</span>
            <span className="font-semibold text-neutral-900">
              {formatNumber(line.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge: string;
}) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
      </div>

      <div className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
        {badge}
      </div>
    </div>
  );
}

function AppsStateChart({ rows }: { rows: TargetAppsRow[] }) {
  const [expanded, setExpanded] = useState(false);

  const sortedRows = useMemo(
    () => [...rows].sort((a, b) => safeNumber(b.total_apps) - safeNumber(a.total_apps)),
    [rows]
  );

  const visibleRows = expanded ? sortedRows : sortedRows.slice(0, DEFAULT_VISIBLE);
  const maxTotal = sortedRows.length ? safeNumber(sortedRows[0].total_apps) : 0;

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <SectionHeader
        title="Target APPs by State"
        subtitle="NP + PA counts by state"
        badge={`${sortedRows.length} states`}
      />

      <div className="space-y-4">
        {visibleRows.map((row) => {
          const np = safeNumber(row.np_count);
          const pa = safeNumber(row.pa_count);
          const total = safeNumber(row.total_apps);

          const npWidth = maxTotal > 0 ? (np / maxTotal) * 100 : 0;
          const paWidth = maxTotal > 0 ? (pa / maxTotal) * 100 : 0;

          return (
            <div key={row.state} className="group relative">
              <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-neutral-700">{row.state}</span>
                <span className="font-semibold text-neutral-900">{total.toLocaleString()}</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-neutral-100">
                <div className="flex h-full w-full">
                  <div
                    className="h-full bg-[#FF9933]"
                    style={{ width: `${npWidth}%` }}
                  />
                  <div
                    className="h-full bg-[#FFD6A8]"
                    style={{ width: `${paWidth}%` }}
                  />
                </div>
              </div>

              <Tooltip
                lines={[
                  { label: "NP", value: row.np_count },
                  { label: "PA", value: row.pa_count },
                  { label: "Total", value: row.total_apps },
                ]}
              />
            </div>
          );
        })}
      </div>

      {sortedRows.length > DEFAULT_VISIBLE ? (
        <div className="mt-5 border-t border-neutral-100 pt-4">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-[#FF9933] hover:text-[#FF9933]"
          >
            {expanded ? "Show top states only" : "View all states"}
          </button>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF9933]" />
          <span>NP</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FFD6A8]" />
          <span>PA</span>
        </div>
      </div>
    </div>
  );
}

function HemOncStateChart({ rows }: { rows: TargetHemOncRow[] }) {
  const [expanded, setExpanded] = useState(false);

  const sortedRows = useMemo(
    () => [...rows].sort((a, b) => safeNumber(b.total_hemonc) - safeNumber(a.total_hemonc)),
    [rows]
  );

  const visibleRows = expanded ? sortedRows : sortedRows.slice(0, DEFAULT_VISIBLE);
  const maxTotal = sortedRows.length ? safeNumber(sortedRows[0].total_hemonc) : 0;

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <SectionHeader
        title="Target Hem / Onc by State"
        subtitle="Medical oncology + hematology / oncology"
        badge={`${sortedRows.length} states`}
      />

      <div className="space-y-4">
        {visibleRows.map((row) => {
          const medOnc = safeNumber(row.med_onc_count);
          const hemOnc = safeNumber(row.hem_onc_count);
          const total = safeNumber(row.total_hemonc);

          const medWidth = maxTotal > 0 ? (medOnc / maxTotal) * 100 : 0;
          const hemWidth = maxTotal > 0 ? (hemOnc / maxTotal) * 100 : 0;

          return (
            <div key={row.state} className="group relative">
              <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-neutral-700">{row.state}</span>
                <span className="font-semibold text-neutral-900">{total.toLocaleString()}</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-neutral-100">
                <div className="flex h-full w-full">
                  <div
                    className="h-full bg-[#0F766E]"
                    style={{ width: `${medWidth}%` }}
                  />
                  <div
                    className="h-full bg-[#99F6E4]"
                    style={{ width: `${hemWidth}%` }}
                  />
                </div>
              </div>

              <Tooltip
                lines={[
                  { label: "Medical Oncology", value: row.med_onc_count },
                  { label: "Hematology / Oncology", value: row.hem_onc_count },
                  { label: "Total", value: row.total_hemonc },
                ]}
              />
            </div>
          );
        })}
      </div>

      {sortedRows.length > DEFAULT_VISIBLE ? (
        <div className="mt-5 border-t border-neutral-100 pt-4">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-[#0F766E] hover:text-[#0F766E]"
          >
            {expanded ? "Show top states only" : "View all states"}
          </button>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#0F766E]" />
          <span>Medical Oncology</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#99F6E4]" />
          <span>Hematology / Oncology</span>
        </div>
      </div>
    </div>
  );
}

function OncAppsStateChart({ rows }: { rows: TargetOncAppsRow[] }) {
  const [expanded, setExpanded] = useState(false);

  const sortedRows = useMemo(
    () => [...rows].sort((a, b) => safeNumber(b.total_onc_apps) - safeNumber(a.total_onc_apps)),
    [rows]
  );

  const visibleRows = expanded ? sortedRows : sortedRows.slice(0, DEFAULT_VISIBLE);
  const maxTotal = sortedRows.length ? safeNumber(sortedRows[0].total_onc_apps) : 0;

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <SectionHeader
        title="APPs in Oncology by State"
        subtitle="Oncology NP + PA target counts"
        badge={`${sortedRows.length} states`}
      />

      <div className="space-y-4">
        {visibleRows.map((row) => {
          const oncNp = safeNumber(row.onc_np_count);
          const oncPa = safeNumber(row.onc_pa_count);
          const total = safeNumber(row.total_onc_apps);

          const npWidth = maxTotal > 0 ? (oncNp / maxTotal) * 100 : 0;
          const paWidth = maxTotal > 0 ? (oncPa / maxTotal) * 100 : 0;

          return (
            <div key={row.state} className="group relative">
              <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-neutral-700">{row.state}</span>
                <span className="font-semibold text-neutral-900">{total.toLocaleString()}</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-neutral-100">
                <div className="flex h-full w-full">
                  <div
                    className="h-full bg-[#2563EB]"
                    style={{ width: `${npWidth}%` }}
                  />
                  <div
                    className="h-full bg-[#BFDBFE]"
                    style={{ width: `${paWidth}%` }}
                  />
                </div>
              </div>

              <Tooltip
                lines={[
                  { label: "Oncology NP", value: row.onc_np_count },
                  { label: "Oncology PA", value: row.onc_pa_count },
                  { label: "Total", value: row.total_onc_apps },
                ]}
              />
            </div>
          );
        })}
      </div>

      {sortedRows.length > DEFAULT_VISIBLE ? (
        <div className="mt-5 border-t border-neutral-100 pt-4">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-[#2563EB] hover:text-[#2563EB]"
          >
            {expanded ? "Show top states only" : "View all states"}
          </button>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#2563EB]" />
          <span>Oncology NP</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#BFDBFE]" />
          <span>Oncology PA</span>
        </div>
      </div>
    </div>
  );
}

export default function GeographicDistributionTiles() {
  const [targetApps, setTargetApps] = useState<TargetAppsRow[]>([]);
  const [targetHemOnc, setTargetHemOnc] = useState<TargetHemOncRow[]>([]);
  const [targetOncApps, setTargetOncApps] = useState<TargetOncAppsRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const [appsRes, hemRes, oncAppsRes] = await Promise.all([
        supabase
          .from("v_state_counts_target_apps")
          .select("state, np_count, pa_count, total_apps")
          .order("total_apps", { ascending: false }),
        supabase
          .from("v_state_counts_target_hemonc")
          .select("state, med_onc_count, hem_onc_count, total_hemonc")
          .order("total_hemonc", { ascending: false }),
        supabase
          .from("v_state_counts_target_apps_oncology")
          .select("state, onc_np_count, onc_pa_count, total_onc_apps")
          .order("total_onc_apps", { ascending: false }),
      ]);

      if (!appsRes.error && appsRes.data) setTargetApps(appsRes.data);
      if (!hemRes.error && hemRes.data) setTargetHemOnc(hemRes.data);
      if (!oncAppsRes.error && oncAppsRes.data) setTargetOncApps(oncAppsRes.data);

      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 px-6 py-10 text-center text-sm text-neutral-500">
          Loading state distribution...
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF9933]">
          Geographic Distribution
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">
          Main states first
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Showing the top states by default to keep the dashboard cleaner. Hover over bars for detail and expand when needed.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <AppsStateChart rows={targetApps} />
        <HemOncStateChart rows={targetHemOnc} />
        <OncAppsStateChart rows={targetOncApps} />
      </div>
    </section>
  );
}