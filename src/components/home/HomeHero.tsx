"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Layers,
  Sparkles,
} from "lucide-react";

type HomeHeroProps = {
  formulaTotal: number;
  domainCount: number;
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

export default function HomeHero({ formulaTotal, domainCount }: HomeHeroProps) {
  const hasStats = formulaTotal > 0 && domainCount > 0;

  return (
    <section
      className="relative isolate -mx-4 -mt-4 mb-4 flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden rounded-none border-b border-border/60 bg-surface/40 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.25)] backdrop-blur-md dark:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.45)]"
      aria-label="Introduction"
    >
      {/* Ambient orbs — domain palette */}
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-mathematics/25 blur-[100px] dark:bg-mathematics/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-chemical/20 blur-[110px] dark:bg-chemical/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-96 -translate-x-1/2 rounded-full bg-physics/15 blur-[90px] dark:bg-physics/12"
        aria-hidden
      />

      {/* Fine grid + top accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 0%, black 20%, transparent 75%)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mathematics/50 to-transparent" />

      <div className="relative flex flex-1 flex-col justify-center px-5 py-10 sm:px-10 sm:py-12">
        <motion.div
          className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/80 px-3 py-1.5 text-xs font-medium text-text-secondary shadow-sm backdrop-blur-sm sm:text-sm"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-mathematics" aria-hidden />
            <span>Interactive calculators · KaTeX formulas · Step-by-step</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-[3.5rem] lg:leading-[1.08]"
          >
            Engineering math,
            <br />
            <span className="bg-gradient-to-r from-mathematics via-chemical to-physics bg-clip-text text-transparent">
              solved clearly.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            HyperCalc unifies calculators, rendered equations, and guided solutions
            across mechanical, electrical, civil, and more — built for students and
            working engineers.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center"
          >
            <Link
              href="/#explore"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-text-primary px-6 py-3.5 text-sm font-semibold text-background shadow-lg transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mathematics focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:ring-offset-background"
            >
              <Calculator className="h-4 w-4 transition group-hover:scale-110" aria-hidden />
              Browse calculators
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="/formulas"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-elevated/90 px-6 py-3.5 text-sm font-semibold text-text-primary backdrop-blur-sm transition hover:border-mathematics/40 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mathematics/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <BookOpen className="h-4 w-4 text-mathematics" aria-hidden />
              Formula library
            </Link>
          </motion.div>

          {hasStats && (
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border/90 bg-background/60 px-4 py-2 text-sm text-text-secondary backdrop-blur-md dark:bg-surface/50">
                <BookOpen className="h-4 w-4 text-mathematics" aria-hidden />
                <span>
                  <span className="font-bold tabular-nums text-text-primary">
                    {formulaTotal.toLocaleString()}
                  </span>{" "}
                  formulas
                </span>
                <span className="text-border">·</span>
                <span>
                  <span className="font-bold tabular-nums text-text-primary">
                    {domainCount}
                  </span>{" "}
                  domains
                </span>
              </div>
            </motion.div>
          )}

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-wider text-text-secondary/80 sm:text-xs"
          >
            {["Matrices", "Circuits", "Thermo", "Structures", "Finance"].map((label) => (
              <span
                key={label}
                className="rounded-md border border-border/60 bg-surface-elevated/50 px-2.5 py-1 text-text-secondary"
              >
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom strip — pinned to foot of viewport block */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="mx-auto mt-auto flex w-full max-w-2xl shrink-0 items-center justify-between gap-4 border-t border-border/40 bg-background/30 px-5 py-4 text-xs text-text-secondary backdrop-blur-sm dark:bg-surface/20 sm:px-8 sm:text-sm md:rounded-t-2xl md:border md:border-b-0 md:border-border/50"
      >
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 shrink-0 text-civil" aria-hidden />
          <span className="text-left leading-snug">
            Pick a domain below — each card links to calculators for that field.
          </span>
        </div>
      </motion.div>
    </section>
  );
}
