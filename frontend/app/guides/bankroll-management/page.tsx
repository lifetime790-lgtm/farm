import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import AdBanner from "@/components/AdBanner";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://sbtaodds.com";

export const metadata: Metadata = {
  title: "Bankroll Management | SBTA Guides",
  description:
    "A practical bankroll plan for unit sizing, variance control, and long-term edge.",
  alternates: {
    canonical: `${SITE_URL}/guides/bankroll-management`,
  },
  openGraph: {
    title: "Bankroll Management",
    description:
      "A practical bankroll plan for unit sizing, variance control, and long-term edge.",
    url: `${SITE_URL}/guides/bankroll-management`,
    type: "article",
  },
};

export default function BankrollManagementPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl px-6 pb-20 pt-12">
        <header className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/40 p-10">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
            Guide
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            Bankroll management
          </h1>
          <p className="mt-4 text-sm text-slate-300 md:text-base">
            Protect your capital, avoid tilt, and scale when the edge is real.
          </p>
        </header>

        <AdBanner slot="guide-bankroll-top" className="mt-8" />

        <section className="prose prose-invert mt-8 max-w-none text-slate-200">
          <h2>Define your unit size</h2>
          <p>
            Start with 1 unit = 1% of your bankroll. This keeps variance manageable
            and avoids large drawdowns.
          </p>

          <h2>Scale with confidence</h2>
          <p>
            Use tiered sizing (1u, 1.5u, 2u) based on edge strength. Avoid jumping
            to large bets without long-term data support.
          </p>

          <h2>Track every bet</h2>
          <ul>
            <li>Record line, price, stake, and result.</li>
            <li>Review performance weekly to identify strengths.</li>
            <li>Cut down high-variance markets if ROI is negative.</li>
          </ul>

          <h2>Control variance</h2>
          <p>
            Stick to your unit plan even during winning streaks. The goal is to stay
            in the game long enough for your edge to show.
          </p>
        </section>

        <AdBanner slot="guide-bankroll-bottom" className="mt-10" />
      </main>
    </div>
  );
}
