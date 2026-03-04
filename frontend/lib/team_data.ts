export type LeagueKey = "nfl" | "nba";

export type LeagueInfo = {
  key: LeagueKey;
  name: string;
  sportKey: string;
  description: string;
};

export type TeamInfo = {
  league: LeagueKey;
  name: string;
  slug: string;
  sportKey: string;
};

const LEAGUES: LeagueInfo[] = [
  {
    key: "nfl",
    name: "NFL",
    sportKey: "americanfootball_nfl",
    description: "National Football League matchup hub and team coverage.",
  },
  {
    key: "nba",
    name: "NBA",
    sportKey: "basketball_nba",
    description: "National Basketball Association slate and team insights.",
  },
];

const NFL_TEAMS = [
  "Arizona Cardinals",
  "Atlanta Falcons",
  "Baltimore Ravens",
  "Buffalo Bills",
  "Carolina Panthers",
  "Chicago Bears",
  "Cincinnati Bengals",
  "Cleveland Browns",
  "Dallas Cowboys",
  "Denver Broncos",
  "Detroit Lions",
  "Green Bay Packers",
  "Houston Texans",
  "Indianapolis Colts",
  "Jacksonville Jaguars",
  "Kansas City Chiefs",
  "Las Vegas Raiders",
  "Los Angeles Chargers",
  "Los Angeles Rams",
  "Miami Dolphins",
  "Minnesota Vikings",
  "New England Patriots",
  "New Orleans Saints",
  "New York Giants",
  "New York Jets",
  "Philadelphia Eagles",
  "Pittsburgh Steelers",
  "San Francisco 49ers",
  "Seattle Seahawks",
  "Tampa Bay Buccaneers",
  "Tennessee Titans",
  "Washington Commanders",
];

const NBA_TEAMS = [
  "Atlanta Hawks",
  "Boston Celtics",
  "Brooklyn Nets",
  "Charlotte Hornets",
  "Chicago Bulls",
  "Cleveland Cavaliers",
  "Dallas Mavericks",
  "Denver Nuggets",
  "Detroit Pistons",
  "Golden State Warriors",
  "Houston Rockets",
  "Indiana Pacers",
  "Los Angeles Clippers",
  "Los Angeles Lakers",
  "Memphis Grizzlies",
  "Miami Heat",
  "Milwaukee Bucks",
  "Minnesota Timberwolves",
  "New Orleans Pelicans",
  "New York Knicks",
  "Oklahoma City Thunder",
  "Orlando Magic",
  "Philadelphia 76ers",
  "Phoenix Suns",
  "Portland Trail Blazers",
  "Sacramento Kings",
  "San Antonio Spurs",
  "Toronto Raptors",
  "Utah Jazz",
  "Washington Wizards",
];

function slugifyTeam(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const NFL_TEAM_DATA: TeamInfo[] = NFL_TEAMS.map((name) => ({
  league: "nfl",
  name,
  slug: slugifyTeam(name),
  sportKey: "americanfootball_nfl",
}));

const NBA_TEAM_DATA: TeamInfo[] = NBA_TEAMS.map((name) => ({
  league: "nba",
  name,
  slug: slugifyTeam(name),
  sportKey: "basketball_nba",
}));

export function getLeagues(): LeagueInfo[] {
  return LEAGUES;
}

export function getLeagueInfo(key: LeagueKey): LeagueInfo | null {
  return LEAGUES.find((league) => league.key === key) ?? null;
}

export function getTeamsByLeague(key: LeagueKey): TeamInfo[] {
  return key === "nfl" ? NFL_TEAM_DATA : NBA_TEAM_DATA;
}

export function getTeamBySlug(key: LeagueKey, slug: string): TeamInfo | null {
  return getTeamsByLeague(key).find((team) => team.slug === slug) ?? null;
}

export function getAllTeams(): TeamInfo[] {
  return [...NFL_TEAM_DATA, ...NBA_TEAM_DATA];
}
