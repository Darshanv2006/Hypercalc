"use client";

import { useEffect, useRef, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { BookOpen, ChevronDown, Calculator, Loader2, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getFormulasByDomain, type Formula } from "@/lib/api";
import { calculators } from "@/lib/calculators";

const KaTeXFormula = ({ math }: { math: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(math, ref.current, {
          displayMode: true,
          throwOnError: false,
          strict: false,
          output: "html",
        });
      } catch {
        if (ref.current) ref.current.textContent = math;
      }
    }
  }, [math]);
  return (
    <span
      ref={ref}
      className="block overflow-x-auto py-2 text-text-primary [&>.katex-display]:my-0"
    />
  );
};

const difficultyColors: Record<string, string> = {
  basic: "bg-civil/10 text-civil",
  intermediate: "bg-mechanical/10 text-mechanical",
  advanced: "bg-economics/10 text-economics",
};

const FormulaCard = ({
  formula,
  isOpen,
  onToggle,
}: {
  formula: Formula;
  isOpen: boolean;
  onToggle: () => void;
}) => {

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden transition-all duration-200">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between p-4 text-left focus:outline-none hover:bg-surface-elevated transition-colors"
      >
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-text-primary">
              {formula.name}
            </span>
            <span
              className={cn(
                "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                difficultyColors[formula.difficulty] ?? "bg-border text-text-secondary"
              )}
            >
              {formula.difficulty}
            </span>
          </div>
          <span className="text-xs text-text-secondary capitalize">
            {formula.category.replace(/_/g, " ")}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "ml-4 h-5 w-5 flex-shrink-0 text-text-secondary transition-transform duration-200 mt-0.5",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 flex flex-col gap-4 border-t border-border pt-4">
            <div className="bg-background rounded-lg px-4 py-2 overflow-x-auto border border-border/50">
              <KaTeXFormula math={formula.formula} />
            </div>

            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                Variables
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {Object.entries(formula.variables).map(([sym, desc]) => (
                  <div key={sym} className="flex items-start gap-2 text-sm">
                    <code className="font-mono text-mathematics flex-shrink-0">{sym}</code>
                    <span className="text-text-secondary">— {desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between gap-4 flex-wrap">
              {formula.applications?.length > 0 && (
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                    Applications
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {formula.applications.map((app) => (
                      <span
                        key={app}
                        className="text-xs bg-surface-elevated text-text-secondary px-2 py-0.5 rounded-full border border-border"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(() => {
                if (!formula.calculator_eligible || !formula.calculator_route) return null;
                const calcDef = calculators.find((c) => c.route === formula.calculator_route);
                const isImplemented = (calcDef?.implemented) || formula.calculator_route.startsWith('/calculator/');

                const destRoute = isImplemented ? formula.calculator_route : `/calculator/${formula.id}`;

                return (
                  <Link
                    href={destRoute}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-mathematics text-white text-sm font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
                  >
                    <Calculator className="h-4 w-4" />
                    Calculate
                  </Link>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DomainFormulasProps {
  domain: string;
  accentClass?: string;
}

export default function DomainFormulas({
  domain,
  accentClass = "text-mathematics",
}: DomainFormulasProps) {
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getFormulasByDomain(domain)
      .then(setFormulas)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [domain]);

  if (loading) {
    return (
      <div className="mt-10 flex items-center gap-3 text-text-secondary">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading formulas from database…</span>
      </div>
    );
  }

  if (error || formulas.length === 0) {
    return (
      <div className="mt-10 flex items-center gap-3 text-text-secondary">
        <WifiOff className="h-5 w-5" />
        <span>Could not load formulas. Make sure the backend is running.</span>
      </div>
    );
  }

  const grouped = formulas.reduce((acc, f) => {
    if (!acc[f.category]) acc[f.category] = [];
    acc[f.category].push(f);
    return acc;
  }, {} as Record<string, Formula[]>);

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className={cn("h-5 w-5", accentClass)} />
        <h2 className="text-2xl font-bold text-text-primary">Formula Reference</h2>
        <span className="ml-2 text-xs font-semibold bg-surface-elevated text-text-secondary px-2 py-1 rounded-full border border-border">
          {formulas.length} formulas
        </span>

      </div>

      <div className="flex flex-col gap-8">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3 capitalize">
              {category.replace(/_/g, " ")}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              {items.map((f) => (
                <FormulaCard
                  key={f.id}
                  formula={f}
                  isOpen={activeId === f.id}
                  onToggle={() => setActiveId(activeId === f.id ? null : f.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
