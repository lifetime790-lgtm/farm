import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import { buildGamePath } from "@/lib/game_routes";
import {
  fetchFromSupabase,
  hasSupabaseServerConfig,
  supabaseServer,
} from "@/lib/supabase_server";
import { getTeamBySlug } from "@/lib/team_data";
import type { Game } from "@/types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://sbtaodds.com";
const SPORT_KEY = "americanfootball_nfl" as const;
const LEAGUE_LABEL = "NFL";
const UPCOMING_WINDOW_HOURS = 72;
const RECENT_LIMIT = 8;

const ET_TIME_LABEL = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const team = getTeamBySlug(SPORT_KEY, params.slug);
  if (!team) {
    return {
      title: "Team Not Found | SBTA",
      robots: { index: false, follow: false },
    };
  }

  const title = `${team.name} Odds, Schedule & Analysis | SBTA`;
  const description = `Upcoming ${LEAGUE_LABEL} matchups and recent results for ${team.name}.`;
  const url = `${SITE_URL}/nfl/teams/${team.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
  };
}

function formatEt(value: string | null): string {
  if (!value) {
    return "TBD";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "TBD";
  }
  return ET_TIME_LABEL.format(date);
}

async function getTeamGames(teamName: string): Promise<{
  upcoming: Game[];
  recent: Game[];
  error: string | null;
}> {
  if (!hasSupabaseServerConfig) {
    return { upcoming: [], recent: [], error: "Supabase server config missing." };
  }

  const escaped = teamName.replace(/"/g, '\\"');
  const orFilter = `home_team.eq."${escaped}",away_team.eq."${escaped}"`;
  const now = new Date();
  const nowIso = now.toISOString();
  const maxIso = new Date(
    now.getTime() + UPCOMING_WINDOW_HOURS * 60 * 60 * 1000
  ).toISOString();

  const { data: upcomingData, error: upcomingError } = await supabaseServer
    .from("games")
    .select("id, sport_key, home_team, away_team, commence_time")
    .eq("sport_key", SPORT_KEY)
    .gte("commence_time", nowIso)
    .lte("commence_time", maxIso)
    .or(orFilter)
    .order("commence_time", { ascending: true })
    .limit(12);

  let upcoming = (upcomingData ?? []) as Game[];
  if (upcomingError && upcoming.length === 0) {
    try {
      const params = new URLSearchParams({
        select: "id, sport_key, home_team, away_team, commence_time",
        order: "commence_time.asc",
        sport_key: `eq.${SPORT_KEY}`,
        limit: "12",
      });
      params.append("commence_time", `gte.${nowIso}`);
      params.append("commence_time", `lte.${maxIso}`);
      params.set("or", `(${orFilter})`);
      upcoming = await fetchFromSupabase<Game[]>(`games?${params.toString()}`);
    } catch {
      upcoming = [];
    }
  }

  const { data: recentData, error: recentError } = await supabaseServer
    .from("games")
    .select(
      "id, sport_key, home_team, away_team, commence_time, completed, home_score, away_score"
    )
    .eq("sport_key", SPORT_KEY)
    .eq("completed", true)
    .or(orFilter)
    .order("commence_time", { ascending: false })
    .limit(RECENT_LIMIT);

  let recent = (recentData ?? []) as Game[];
  if (recentError && recent.length === 0) {
    try {
      const params = new URLSearchParams({
        select:
          "id, sport_key, home_team, away_team, commence_time, completed, home_score, away_score",
        completed: "eq.true",
        sport_key: `eq.${SPORT_KEY}`,
        order: "commence_time.desc",
        limit: String(RECENT_LIMIT),
      });
      params.set("or", `(${orFilter})`);
      recent = await fetchFromSupabase<Game[]>(`games?${params.toString()}`);
    } catch {
      recent = [];
    }
  }

  return { upcoming, recent, error: null };
}

export default async function NflTeamPage({ params }: Props) {
  const team = getTeamBySlug(SPORT_KEY, params.slug);
  if (!team) {
    notFound();
  }

  const { upcoming, recent, error } = await getTeamGames(team.name);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-12">
        <header className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 p-10">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
            {LEAGUE_LABEL}
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            {team.name}
          </h1>
          <p className="mt-4 text-sm text-slate-300 md:text-base">
            Upcoming matchups, recent results, and SBTA analysis links.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-300">
            <Link
              className="rounded-full border border-slate-800/70 bg-slate-900/60 px-3 py-1"
              href="/nfl"
            >
              NFL hub
            </Link>
            <Link
              className="rounded-full border border-slate-800/70 bg-slate-900/60 px-3 py-1"
              href="/nfl/teams"
            >
              Team directory
            </Link>
            <Link
              className="rounded-full border border-slate-800/70 bg-slate-900/60 px-3 py-1"
              href="/slate"
            >
              Daily slate
            </Link>
          </div>
        </header>

        {error ? (
          <div className="mt-8 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-6 py-4 text-sm text-rose-100">
            Failed to load team games. {error}
          </div>
        ) : null}

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Upcoming games</h2>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Next {UPCOMING_WINDOW_HOURS} hours
            </span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {upcoming.length === 0 ? (
              <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 px-6 py-8 text-sm text-slate-300">
                No upcoming games inside the current window.
              </div>
            ) : (
              upcoming.map((game) => (
                <Link
                  key={game.id}
                  href={buildGamePath(game)}
                  className="rounded-2xl border border-slate-800/70 bg-slate-900/60 px-5 py-4 transition hover:border-emerald-300/50"
                >
                  <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {formatEt(game.commence_time)}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">
                    {game.home_team} vs {game.away_team}
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Recent results</h2>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Last {RECENT_LIMIT}
            </span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {recent.length === 0 ? (
              <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 px-6 py-8 text-sm text-slate-300">
                No completed games yet.
              </div>
            ) : (
              recent.map((game) => (
                <Link
                  key={game.id}
                  href={buildGamePath(game)}
                  className="rounded-2xl border border-slate-800/70 bg-slate-900/60 px-5 py-4 transition hover:border-emerald-300/50"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                    <span>{formatEt(game.commence_time)}</span>
                    <span>
                      {game.home_score ?? "-"} - {game.away_score ?? "-"}
                    </span>
                  </div>
                  <div className="mt-2 text-lg font-semibold text-white">
                    {game.home_team} vs {game.away_team}
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
