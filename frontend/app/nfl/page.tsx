import Link from "next/link";
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import AdBanner from "@/components/AdBanner";
import { buildGamePath } from "@/lib/game_routes";
import { fetchRecentResults, fetchUpcomingGames } from "@/lib/game_queries";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://sbtaodds.com";

export const metadata: Metadata = {
  title: "NFL Odds & Matchups | SBTA",
  description: "Upcoming NFL games, recent results, and betting coverage from SBTA.",
  alternates: {
    canonical: `${SITE_URL}/nfl`,
  },
  openGraph: {
    title: "NFL Odds & Matchups",
    description: "Upcoming NFL games, recent results, and betting coverage from SBTA.",
    url: `${SITE_URL}/nfl`,
    type: "website",
  },
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const SPORT_KEY = "americanfootball_nfl";
const UPCOMING_HOURS = 48;
const RESULTS_HOURS = 48;

const ET_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  weekday: "short",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

function formatEt(value: string | null): string {
  if (!value) {
    return "TBD";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "TBD";
  }
  return ET_FORMATTER.format(date);
}

export default async function NflHubPage() {
  const upcoming = await fetchUpcomingGames({
    sportKey: SPORT_KEY,
    hours: UPCOMING_HOURS,
    limit: 6,
  });
  const results = await fetchRecentResults({
    sportKey: SPORT_KEY,
    hours: RESULTS_HOURS,
    limit: 6,
  });
  const error = upcoming.error ?? results.error ?? null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-12">
        <header className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 p-10">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
            NFL Hub
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            NFL matchups and market pulse
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
            Follow the upcoming slate and recent NFL results. Use team pages to
            track form, injuries, and market movement.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-300">
            <Link
              href="/nfl/teams"
              className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-emerald-200 transition hover:border-emerald-300"
            >
              Browse all NFL teams
            </Link>
            <Link
              href="/slate"
              className="rounded-full border border-slate-700/70 bg-slate-900/60 px-4 py-2 transition hover:border-slate-500"
            >
              Full slate
            </Link>
            <Link
              href="/results"
              className="rounded-full border border-slate-700/70 bg-slate-900/60 px-4 py-2 transition hover:border-slate-500"
            >
              Recent results
            </Link>
          </div>
        </header>

        <AdBanner slot="nfl-top" className="mt-8" />

        {error ? (
          <div className="mt-8 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-6 py-5 text-sm text-rose-100">
            Failed to load NFL data. {error}
          </div>
        ) : null}

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Upcoming games</h2>
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Next {UPCOMING_HOURS}h
              </span>
            </div>
            <div className="mt-4 space-y-4">
              {upcoming.games.length === 0 ? (
                <p className="text-sm text-slate-400">No upcoming NFL games.</p>
              ) : (
                upcoming.games.map((game) => (
                  <Link
                    key={game.id}
                    href={buildGamePath(game)}
                    className="flex items-center justify-between rounded-xl border border-slate-800/70 bg-slate-950/40 px-4 py-3 transition hover:border-emerald-300/40"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-100">
                        {game.home_team} vs {game.away_team}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatEt(game.commence_time)}
                      </p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                      View
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent results</h2>
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Last {RESULTS_HOURS}h
              </span>
            </div>
            <div className="mt-4 space-y-4">
              {results.games.length === 0 ? (
                <p className="text-sm text-slate-400">No completed NFL games.</p>
              ) : (
                results.games.map((game) => {
                  const homeScore = game.home_score ?? null;
                  const awayScore = game.away_score ?? null;
                  const homeWin = homeScore !== null && awayScore !== null && homeScore > awayScore;
                  const awayWin = homeScore !== null && awayScore !== null && awayScore > homeScore;
                  return (
                    <Link
                      key={game.id}
                      href={buildGamePath(game)}
                      className="flex items-center justify-between rounded-xl border border-slate-800/70 bg-slate-950/40 px-4 py-3 transition hover:border-emerald-300/40"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-100">
                          {game.home_team} vs {game.away_team}
                        </p>
                        <p className="text-xs text-slate-400">
                          {formatEt(game.commence_time)}
                        </p>
                      </div>
                      <div className="text-right text-sm font-semibold">
                        <p className={homeWin ? "text-emerald-200" : "text-slate-300"}>
                          {homeScore ?? "-"}
                        </p>
                        <p className={awayWin ? "text-emerald-200" : "text-slate-300"}>
                          {awayScore ?? "-"}
                        </p>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </section>

        <AdBanner slot="nfl-bottom" className="mt-10" />
      </main>
    </div>
  );
}
