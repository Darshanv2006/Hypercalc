"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

// Atomic masses (g/mol)
const atomicMasses: Record<string, number> = {
  H: 1.008,
  He: 4.003,
  Li: 6.941,
  Be: 9.012,
  B: 10.811,
  C: 12.011,
  N: 14.007,
  O: 15.999,
  F: 18.998,
  Ne: 20.180,
  Na: 22.990,
  Mg: 24.305,
  Al: 26.982,
  Si: 28.086,
  P: 30.974,
  S: 32.065,
  Cl: 35.453,
  K: 39.098,
  Ca: 40.078,
  Fe: 55.845,
  // Add more as needed
};

function parseFormula(formula: string): Record<string, number> {
  const elements: Record<string, number> = {};
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match;
  while ((match = regex.exec(formula)) !== null) {
    const element = match[1];
    const count = match[2] ? parseInt(match[2]) : 1;
    elements[element] = (elements[element] || 0) + count;
  }
  return elements;
}

export default function MolarMassPage() {
  const [formula, setFormula] = useState<string>('H2O');

  const elements = parseFormula(formula);
  const molarMass = Object.entries(elements).reduce((sum, [el, count]) => {
    const mass = atomicMasses[el];
    return mass ? sum + mass * count : sum;
  }, 0);

  const steps = Object.entries(elements).map(([el, count]) => {
    const mass = atomicMasses[el];
    return {
      description: `Atomic mass of ${el}:`,
      formula: `M_${el} = ${mass}`,
      substitution: `${count} \\times ${mass} = ${mass * count}`,
      result: `${mass * count} g/mol`
    };
  });

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Molar Mass Calculator"
        description="Calculate the molar mass of a chemical compound."
        domainColorClass="text-chemical"
        inputs={
          <>
            <div className="col-span-full">
              <label className="block text-sm font-medium text-text-secondary mb-2">Chemical Formula</label>
              <input
                type="text"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                placeholder="e.g. H2O, CO2, NaCl"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-border font-mono"
              />
            </div>
          </>
        }
        outputs={
          <>
            <OutputField
              label="Molar Mass"
              symbol="M"
              value={molarMass || null}
              unit="g/mol"
              sigFigs={4}
            />
          </>
        }
        formula={
          <FormulaDisplay formula="M = \\sum (\\text{atomic mass} \\times \\text{count})" />
        }
        steps={molarMass ? (
          <StepByStep
            steps={[
              ...steps,
              {
                description: 'Total molar mass:',
                result: `M = ${molarMass} g/mol`
              }
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}