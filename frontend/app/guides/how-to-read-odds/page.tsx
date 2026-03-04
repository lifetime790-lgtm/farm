import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import AdBanner from "@/components/AdBanner";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://sbtaodds.com";

export const metadata: Metadata = {
  title: "How to Read Odds | SBTA Guides",
  description:
    "A clear walkthrough of moneyline, spread, and totals pricing with quick examples.",
  alternates: {
    canonical: `${SITE_URL}/guides/how-to-read-odds`,
  },
  openGraph: {
    title: "How to Read Odds",
    description:
      "A clear walkthrough of moneyline, spread, and totals pricing with quick examples.",
    url: `${SITE_URL}/guides/how-to-read-odds`,
    type: "article",
  },
};

export default function HowToReadOddsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl px-6 pb-20 pt-12">
        <header className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 p-10">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
            Guide
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            How to read odds
          </h1>
          <p className="mt-4 text-sm text-slate-300 md:text-base">
            A practical guide to moneyline, spread, and totals so you can compare
            sportsbook prices fast.
          </p>
        </header>

        <AdBanner slot="guide-odds-top" className="mt-8" />

        <section className="prose prose-invert mt-8 max-w-none text-slate-200">
          <h2>Moneyline basics</h2>
          <p>
            Moneyline odds show the payout for picking the winner outright. A minus
            number means the team is favored; a plus number means the team is an
            underdog.
          </p>
          <ul>
            <li>-150 means you risk $150 to win $100.</li>
            <li>+150 means you risk $100 to win $150.</li>
          </ul>

          <h2>Spread pricing</h2>
          <p>
            Point spreads balance the matchup. A favorite might be -4.5, meaning they
            must win by 5 or more. The underdog +4.5 can lose by 4 and still cover.
          </p>
          <ul>
            <li>H -4.5 (-110) means risk $110 to win $100.</li>
            <li>A +4.5 (-110) is the same price for the underdog.</li>
          </ul>

          <h2>Totals</h2>
          <p>
            Totals (Over/Under) are based on combined points. Odds pricing will shift
            as the market reacts to injuries, pace, and weather.
          </p>
          <ul>
            <li>O 224.5 (-110) means the total must be 225+ to win.</li>
            <li>U 224.5 (-110) means 224 or fewer points to win.</li>
          </ul>

          <h2>Quick checklist</h2>
          <ul>
            <li>Compare prices across books, not just the line.</li>
            <li>Look for moves caused by sharp money vs public volume.</li>
            <li>Track closing line value to judge long-term edge.</li>
          </ul>
        </section>

        <AdBanner slot="guide-odds-bottom" className="mt-10" />
      </main>
    </div>
  );
}
