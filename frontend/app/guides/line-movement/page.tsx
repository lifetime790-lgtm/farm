import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import AdBanner from "@/components/AdBanner";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://sbtaodds.com";

export const metadata: Metadata = {
  title: "Line Movement 101 | SBTA Guides",
  description:
    "Learn how to read line movement, handle vs ticket splits, and sharp market signals.",
  alternates: {
    canonical: `${SITE_URL}/guides/line-movement`,
  },
  openGraph: {
    title: "Line Movement 101",
    description:
      "Learn how to read line movement, handle vs ticket splits, and sharp market signals.",
    url: `${SITE_URL}/guides/line-movement`,
    type: "article",
  },
};

export default function LineMovementPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl px-6 pb-20 pt-12">
        <header className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 p-10">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
            Guide
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            Line movement 101
          </h1>
          <p className="mt-4 text-sm text-slate-300 md:text-base">
            Follow the money. Learn how spreads and totals shift, and what that
            tells you about market sentiment.
          </p>
        </header>

        <AdBanner slot="guide-line-top" className="mt-8" />

        <section className="prose prose-invert mt-8 max-w-none text-slate-200">
          <h2>Handle vs ticket split</h2>
          <p>
            Tickets show the number of bets. Handle shows the amount of money. A
            small ticket share with a large handle often indicates sharp money.
          </p>

          <h2>Steam moves</h2>
          <p>
            Rapid movement across multiple books usually signals respected money
            or injury news. Reacting quickly is key, but always compare prices.
          </p>

          <h2>Reverse line movement</h2>
          <p>
            When the line moves against public betting percentages, it is often
            driven by professional action. Use it as a cue, not a guarantee.
          </p>

          <h2>Tracking edge</h2>
          <ul>
            <li>Log the opening and closing line every game you bet.</li>
            <li>Positive closing line value indicates long-term edge.</li>
            <li>Don&apos;t chase steam without context or injury confirmation.</li>
          </ul>
        </section>

        <AdBanner slot="guide-line-bottom" className="mt-10" />
      </main>
    </div>
  );
}
