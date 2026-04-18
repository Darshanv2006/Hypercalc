"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import InputField from "@/components/calculator/InputField";
import OutputField from "@/components/calculator/OutputField";
import FormulaDisplay from "@/components/calculator/FormulaDisplay";
import formulasData from "@/data/formulas.json";
import { Formula } from "@/lib/api";

type ExtendedFormula = Formula & { compute_logic?: string };

export default function GenericFormulaCalculatorClient({ formulaId }: { formulaId: string }) {
  const router = useRouter();
  
  const [formula, setFormula] = useState<ExtendedFormula | null>(null);
  const [inputs, setInputs] = useState<Record<string, number | "">>({});
  const [result, setResult] = useState<string | number | null>(null);

  useEffect(() => {
    const f = formulasData.find((item) => item.id === formulaId);
    if (!f) {
      router.push("/formulas");
      return;
    }
    setFormula(f as unknown as ExtendedFormula);
    
    // Initialize inputs
    const initialInputs: Record<string, number | ""> = {};
    Object.keys(f.variables).forEach((v) => {
      // Create a simplified friendly key without slashes or backslashes if possible
      const safeKey = v.replace(/[\\]/g, '').replace(/[/]/g, '_');
      initialInputs[safeKey] = "";
    });
    setInputs(initialInputs);
  }, [formulaId, router]);

  if (!formula) return null;

  const handleCalculate = () => {
    if (!formula.compute_logic) {
      setResult("Calculation logic not generated yet.");
      return;
    }
    
    // Attempt evaluation
    try {
      // Map inputs to numeric dictionary
      const parsedInputs: Record<string, number | ""> = { ...inputs };
      
      // Some variables might be strings if it's BigInt (like RSA)
      if (formula.compute_logic.includes('BigInt')) {
         Object.keys(inputs).forEach((k) => {
            parsedInputs[k] = String(inputs[k]) as any; 
         });
      }

      // Execute compute_logic
      // Using new Function to safely evaluate instead of raw eval
      const evaluator = new Function('inputs', `return ${formula.compute_logic}`);
      const res = evaluator(parsedInputs);
      
      if (typeof res === 'number' && isNaN(res)) {
        setResult("Invalid input. Please enter numbers.");
      } else {
        setResult(res);
      }
    } catch (e: any) {
      console.error(e);
      setResult("Advanced Math Required: " + formula.compute_logic?.replace(/inputs\./g, ''));
    }
  };

  const domainAccent = formula.domain || "mathematics";

  return (
    <CalculatorShell
      title={formula.name}
      description={`Advanced computation module for the ${formula.category.replace(/_/g, ' ')} category.`}
      domainColorClass={`text-${domainAccent}`}
      formula={
        <FormulaDisplay formula={formula.formula} />
      }
      inputs={
        <>
          {/* Dynamic Inputs */}
          {Object.entries(formula.variables || {}).map(([sym, desc]) => {
             const safeKey = sym.replace(/[\\]/g, '').replace(/[/]/g, '_');
             return (
              <InputField
                key={safeKey}
                label={`${desc} (${sym})`}
                value={inputs[safeKey] ?? ""}
                onChange={(val) => setInputs((prev) => ({ ...prev, [safeKey]: val }))}
                placeholder={`Enter ${sym}...`}
              />
             )
          })}
    
          <button
            onClick={handleCalculate}
            className={`w-full py-4 px-6 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all mt-4 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5`}
            style={{
              backgroundColor: `var(--${domainAccent})` // Simple fallback for tailwind dynamic class issue if any
            }}
          >
            Calculate
          </button>
        </>
      }
      outputs={
        <>
          {result !== null ? (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
               {typeof result === 'string' && result.includes('Symbolic') ? (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 rounded-lg text-sm text-center">
                     {result}
                  </div>
               ) : typeof result === 'string' && result.includes('logic not generated') ? (
                  <div className="p-4 bg-surface-elevated border border-border text-text-muted rounded-lg text-sm text-center">
                     {result}
                  </div>
               ) : (
                 <OutputField
                   label="Calculation Result"
                   value={String(result)}
                   unit=""
                 />
               )}
            </div>
          ) : (
            <div className="w-full flex items-center justify-center py-8 text-text-muted text-sm">
              Enter values and calculate to see output.
            </div>
          )}
        </>
      }
    />
  );
}
