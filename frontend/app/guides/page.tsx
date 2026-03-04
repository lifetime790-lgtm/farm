import Link from "next/link";
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import AdBanner from "@/components/AdBanner";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://sbtaodds.com";

export const metadata: Metadata = {
  title: "Betting Guides",
  description:
    "Learn how to read odds, interpret line movement, and manage bankroll like a pro.",
  alternates: {
    canonical: `${SITE_URL}/guides`,
  },
  openGraph: {
    title: "Betting Guides",
    description:
      "Learn how to read odds, interpret line movement, and manage bankroll like a pro.",
    url: `${SITE_URL}/guides`,
    type: "website",
  },
};

const GUIDES = [
  {
    href: "/guides/how-to-read-odds",
    title: "How to Read Odds",
    summary:
      "Understand moneyline, spread, and totals pricing so you can compare sportsbooks with confidence.",
    tags: ["Moneyline", "Spread", "Totals"],
  },
  {
    href: "/guides/line-movement",
    title: "Line Movement 101",
    summary:
      "Track sharp vs public money, market timing, and how to spot mispriced numbers.",
    tags: ["Market", "Handle", "Steam"],
  },
  {
    href: "/guides/bankroll-management",
    title: "Bankroll Management",
    summary:
      "Build a staking plan, protect your downside, and scale units without chasing.",
    tags: ["Units", "Risk", "Discipline"],
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-12">
        <header className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 p-10 shadow-[0_30px_120px_-70px_rgba(45,212,191,0.45)]">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
            Guides
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            Learn the betting fundamentals
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
            Start here if you want to understand odds, market movement, and long-term
            bankroll growth before placing your next bet.
          </p>
        </header>

        <AdBanner slot="guides-top" className="mt-8" />

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {GUIDES.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-emerald-300/40"
            >
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                {guide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-700/70 bg-slate-950/60 px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-5 text-xl font-semibold text-white">
                {guide.title}
              </h2>
              <p className="mt-3 text-sm text-slate-300">{guide.summary}</p>
              <span className="mt-6 inline-flex text-xs uppercase tracking-[0.3em] text-emerald-300">
                Read guide
              </span>
            </Link>
          ))}
        </section>

        <AdBanner slot="guides-bottom" className="mt-10" />
      </main>
    </div>
  );
}
