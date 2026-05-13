import { supabase } from "@/lib/supabase/client";

export type OncologyAppSummary = {
  np_total: number;
  pa_total: number;
  total_apps: number;
};

export type OncologyAppStateCount = {
  state: string;
  onc_np_count: number;
  onc_pa_count: number;
  total_onc_apps: number;
};

export async function getOncologyAppSummary(): Promise<OncologyAppSummary> {
  const { data, error } = await supabase
    .from("v_target_oncology_apps_clean")
    .select("provider_type");

  if (error) throw error;

  const rows = data ?? [];

  const np_total = rows.filter((r) => r.provider_type === "NP").length;
  const pa_total = rows.filter((r) => r.provider_type === "PA").length;

  return {
    np_total,
    pa_total,
    total_apps: np_total + pa_total,
  };
}

export async function getOncologyAppStateCounts(): Promise<OncologyAppStateCount[]> {
  const { data, error } = await supabase
    .from("v_state_counts_target_apps_oncology")
    .select("state, onc_np_count, onc_pa_count, total_onc_apps")
    .order("total_onc_apps", { ascending: false });

  if (error) throw error;

  return (data ?? []) as OncologyAppStateCount[];
}