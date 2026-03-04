import type { Game } from "@/types";
import { fetchFromSupabase, hasSupabaseServerConfig, supabaseServer } from "@/lib/supabase_server";

type GamesResult = {
  games: Game[];
  error: string | null;
};

function escapeTeam(team: string): string {
  return team.replace(/"/g, '\\"');
}

function buildTeamOrFilter(team: string): string {
  const escaped = escapeTeam(team);
  return `home_team.eq."${escaped}",away_team.eq."${escaped}"`;
}

const GAME_SELECT_FIELDS =
  "id, sport_key, home_team, away_team, commence_time, completed, home_score, away_score, last_update";

export async function fetchUpcomingGames(options?: {
  windowHours?: number;
  limit?: number;
  sportKey?: string;
  team?: string;
}): Promise<GamesResult> {
  if (!hasSupabaseServerConfig) {
    return { games: [], error: "Supabase server config missing." };
  }

  const now = new Date();
  const windowHours = options?.windowHours ?? 48;
  const limit = options?.limit ?? 60;
  const maxIso = new Date(
    now.getTime() + windowHours * 60 * 60 * 1000
  ).toISOString();
  const nowIso = now.toISOString();

  let query = supabaseServer
    .from("games")
    .select(GAME_SELECT_FIELDS)
    .gte("commence_time", nowIso)
    .lte("commence_time", maxIso)
    .order("commence_time", { ascending: true })
    .limit(limit);

  if (options?.sportKey) {
    query = query.eq("sport_key", options.sportKey);
  }
  if (options?.team) {
    query = query.or(buildTeamOrFilter(options.team));
  }

  const { data, error } = await query;
  if (!error) {
    return { games: (data ?? []) as Game[], error: null };
  }

  try {
    const params = new URLSearchParams({
      select: GAME_SELECT_FIELDS,
      order: "commence_time.asc",
      limit: String(limit),
    });
    params.append("commence_time", `gte.${nowIso}`);
    params.append("commence_time", `lte.${maxIso}`);
    if (options?.sportKey) {
      params.append("sport_key", `eq.${options.sportKey}`);
    }
    if (options?.team) {
      params.set("or", `(${buildTeamOrFilter(options.team)})`);
    }
    const games = await fetchFromSupabase<Game[]>(`games?${params.toString()}`);
    return { games, error: null };
  } catch (restError) {
    const message =
      restError instanceof Error ? restError.message : "Supabase REST error";
    return { games: [], error: message };
  }
}

export async function fetchRecentResults(options?: {
  daysBack?: number;
  limit?: number;
  sportKey?: string;
  team?: string;
}): Promise<GamesResult> {
  if (!hasSupabaseServerConfig) {
    return { games: [], error: "Supabase server config missing." };
  }

  const now = new Date();
  const daysBack = options?.daysBack ?? 7;
  const limit = options?.limit ?? 40;
  const minIso = new Date(
    now.getTime() - daysBack * 24 * 60 * 60 * 1000
  ).toISOString();
  const nowIso = now.toISOString();

  let query = supabaseServer
    .from("games")
    .select(GAME_SELECT_FIELDS)
    .gte("commence_time", minIso)
    .lte("commence_time", nowIso)
    .eq("completed", true)
    .order("commence_time", { ascending: false })
    .limit(limit);

  if (options?.sportKey) {
    query = query.eq("sport_key", options.sportKey);
  }
  if (options?.team) {
    query = query.or(buildTeamOrFilter(options.team));
  }

  const { data, error } = await query;
  if (!error) {
    return { games: (data ?? []) as Game[], error: null };
  }

  try {
    const params = new URLSearchParams({
      select: GAME_SELECT_FIELDS,
      order: "commence_time.desc",
      limit: String(limit),
    });
    params.append("commence_time", `gte.${minIso}`);
    params.append("commence_time", `lte.${nowIso}`);
    params.append("completed", "eq.true");
    if (options?.sportKey) {
      params.append("sport_key", `eq.${options.sportKey}`);
    }
    if (options?.team) {
      params.set("or", `(${buildTeamOrFilter(options.team)})`);
    }
    const games = await fetchFromSupabase<Game[]>(`games?${params.toString()}`);
    return { games, error: null };
  } catch (restError) {
    const message =
      restError instanceof Error ? restError.message : "Supabase REST error";
    return { games: [], error: message };
  }
}
