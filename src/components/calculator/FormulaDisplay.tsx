"use client";

import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export interface FormulaDisplayProps {
  formula: string;
  className?: string;
  formulaId?: string;
}

export default function FormulaDisplay({
  formula,
  className,
  formulaId
}: FormulaDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(formula, containerRef.current, {
          displayMode: true,
          throwOnError: false,
          strict: false,
          output: 'html'
        });
      } catch (err) {
        console.error("KaTeX failed to render:", err);
      }
    }
  }, [formula]);

  return (
    <div className={cn("relative flex flex-col p-6 rounded-xl bg-surface border border-border mt-4 overflow-hidden shadow-inner", className)}>
      <div className="flex items-center justify-between mb-4">
         <span className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center">
            <span className="mr-2">📐</span> Formula
         </span>
         {formulaId && (
           <Link 
             href={`/formulas?id=${formulaId}`}
             className="text-xs font-medium text-mathematics flex items-center hover:underline focus:outline-none"
             title="View in Library"
           >
             <BookOpen className="h-3.5 w-3.5 mr-1" />
             Library reference
           </Link>
         )}
      </div>
      
      <div 
        ref={containerRef} 
        className="w-full overflow-x-auto overflow-y-hidden py-2 [&>.katex-display]:my-0 text-text-primary"
      />
    </div>
  );
}
