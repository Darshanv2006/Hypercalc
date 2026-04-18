"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function StoichiometryPage() {
  const [molesH2, setMolesH2] = useState<number | ''>(2); // mol
  const [molesO2, setMolesO2] = useState<number | ''>(1); // mol
  const [actualYield, setActualYield] = useState<number | ''>(''); // mol

  // Reaction: 2H2 + O2 -> 2H2O
  // For H2: moles H2O = moles H2 / 2
  // For O2: moles H2O = moles O2
  const hasValues = typeof molesH2 === 'number' && typeof molesO2 === 'number';
  const theoreticalH2OFromH2 = hasValues ? molesH2 / 2 : null;
  const theoreticalH2OFromO2 = hasValues ? molesO2 : null;
  const limitingReagent = hasValues ? (theoreticalH2OFromH2! <= theoreticalH2OFromO2! ? 'H2' : 'O2') : null;
  const theoreticalYield = hasValues ? Math.min(theoreticalH2OFromH2!, theoreticalH2OFromO2!) : null;

  const percentYield = theoreticalYield && typeof actualYield === 'number' && actualYield > 0 ?
                       (actualYield / theoreticalYield) * 100 : null;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Stoichiometry Calculator"
        description="Calculate limiting reagent and yield for 2H₂ + O₂ → 2H₂O."
        domainColorClass="text-chemical"
        inputs={
          <>
            <InputField
              label="Moles of H₂"
              value={molesH2}
              onChange={setMolesH2}
              units={[{ value: 'mol', label: 'Moles (mol)' }]}
              selectedUnit="mol"
            />
            <InputField
              label="Moles of O₂"
              value={molesO2}
              onChange={setMolesO2}
              units={[{ value: 'mol', label: 'Moles (mol)' }]}
              selectedUnit="mol"
            />
            <InputField
              label="Actual Yield of H₂O"
              value={actualYield}
              onChange={setActualYield}
              units={[{ value: 'mol', label: 'Moles (mol)' }]}
              selectedUnit="mol"
              placeholder="Optional"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Theoretical H₂O from H₂"
              value={theoreticalH2OFromH2}
              unit="mol"
              sigFigs={4}
            />
            <OutputField
              label="Theoretical H₂O from O₂"
              value={theoreticalH2OFromO2}
              unit="mol"
              sigFigs={4}
            />
            <OutputField
              label="Limiting Reagent"
              value={limitingReagent}
              unit=""
            />
            <OutputField
              label="Theoretical Yield"
              value={theoreticalYield}
              unit="mol"
              sigFigs={4}
            />
            {percentYield && (
              <OutputField
                label="Percent Yield"
                value={percentYield}
                unit="%"
                sigFigs={4}
              />
            )}
          </>
        }
        formula={
          <FormulaDisplay formula="2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}" />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Determine moles of H₂O from H₂:',
                formula: `\\frac{2}{2} \\text{H}_2 \\rightarrow 2 \\text{H}_2\\text{O}, \\quad \\text{moles H}_2\\text{O} = \\frac{${molesH2}}{2}`,
                result: `Moles H₂O from H₂ = ${theoreticalH2OFromH2} mol`
              },
              {
                description: 'Determine moles of H₂O from O₂:',
                formula: `2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}, \\quad \\text{moles H}_2\\text{O} = ${molesO2}`,
                result: `Moles H₂O from O₂ = ${theoreticalH2OFromO2} mol`
              },
              {
                description: 'Limiting reagent is the one producing less H₂O:',
                result: `Limiting reagent = ${limitingReagent}`
              },
              {
                description: 'Theoretical yield:',
                result: `Theoretical yield = ${theoreticalYield} mol H₂O`
              },
              ...(percentYield ? [
                {
                  description: 'Percent yield:',
                  formula: '\\% \\text{yield} = \\frac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100',
                  substitution: `\\% \\text{yield} = \\frac{${actualYield}}{${theoreticalYield}} \\times 100`,
                  result: `\\% \\text{yield} = ${percentYield}\\%`
                }
              ] : [])
            ]}
          />
        ) : undefined}
      />
    </div>
  );
}