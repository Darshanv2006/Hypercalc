"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export interface CalculationStep {
  description: string;
  formula?: string;
  substitution?: string;
  result?: string;
}

export interface StepByStepProps {
  steps: CalculationStep[];
  className?: string;
}

const KatexSnippet = ({ math }: { math: string }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: false,
          throwOnError: false,
          strict: false,
          output: 'html'
        });
      } catch (err) {
        console.error("KaTeX inline fail:", err);
      }
    }
  }, [math]);

  return <span ref={containerRef} className="ml-2 font-mono text-[1.1em] text-text-primary" />;
};

export default function StepByStep({ steps, className }: StepByStepProps) {
  const [isExpanded, setIsExpanded] = useState(true); // Default open so steps are visible

  if (!steps || steps.length === 0) return null;

  return (
    <div className={cn("mt-6 overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300", className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between bg-surface-elevated px-4 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
      >
        <span className="flex items-center text-sm font-semibold text-text-primary">
          <ListChecks className="mr-2 h-4 w-4 text-mathematics" />
          {isExpanded ? 'Hide Steps' : 'Show Step-by-Step Solution'}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-text-muted transition-transform duration-300",
            isExpanded ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <ul className="space-y-6 p-4 sm:p-6 pb-6">
            {steps.map((step, idx) => (
              <li key={idx} className="relative pl-6">
                <span className="absolute left-0 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-border text-[10px] font-bold text-text-secondary">
                  {idx + 1}
                </span>
                
                <p className="text-sm text-text-secondary mb-2 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="flex flex-col space-y-2 mt-2 bg-background rounded-lg p-4 font-mono overflow-x-auto text-[13px] border border-border/50">
                  {step.formula && (
                    <div className="flex text-text-muted">
                      <span className="w-8 shrink-0 select-none">Eq:</span>
                      <KatexSnippet math={step.formula} />
                    </div>
                  )}
                  {step.substitution && (
                    <div className="flex text-text-secondary">
                      <span className="w-8 shrink-0 select-none">Sub:</span>
                      <KatexSnippet math={step.substitution} />
                    </div>
                  )}
                  {step.result && (
                    <div className="flex font-medium text-text-primary pt-2 mt-1 border-t border-border/50">
                      <span className="w-8 shrink-0 select-none text-mathematics">Ans:</span>
                      <KatexSnippet math={step.result} />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
