"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField,
  FormulaDisplay, StepByStep, GraphPanel
} from '@/components/calculator';

export default function OhmsLawCalculator() {
  const [v, setV] = useState<number | ''>(12);
  const [i, setI] = useState<number | ''>(2);

  const hasValues = typeof v === 'number' && typeof i === 'number' && i !== 0;

  // R = V / I
  const resistance = hasValues ? (v as number) / (i as number) : null;
  
  // P = V * I
  const power = hasValues ? (v as number) * (i as number) : null;

  // Graph Data (V vs I for constant R)
  const graphData = hasValues ? Array.from({ length: 11 }, (_, idx) => {
    const currI = ((i as number) * 2 / 10) * idx; // 0 to 200% of I
    const currV = currI * (resistance as number);
    return {
      x: parseFloat(currI.toFixed(2)),
      y: parseFloat(currV.toFixed(2))
    };
  }) : [];

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Ohm's Law & Power Calculator"
        description="Calculate resistance and power from voltage and current."
        domainColorClass="text-electrical"
        inputs={
          <>
            <InputField
              label="Voltage"
              symbol="V"
              value={v}
              onChange={setV}
              units={[{ value: 'V', label: 'Volts (V)' }]}
              selectedUnit="V"
            />
            <InputField
              label="Current"
              symbol="I"
              value={i}
              onChange={setI}
              units={[{ value: 'A', label: 'Amperes (A)' }]}
              selectedUnit="A"
            />
          </>
        }
        outputs={
          <>
             <OutputField
               label="Resistance"
               symbol="R"
               value={resistance}
               unit="Ohms (Ω)"
               sigFigs={4}
             />
             <OutputField
               label="Electrical Power"
               symbol="P"
               value={power}
               unit="Watts (W)"
               sigFigs={4}
             />
          </>
        }
        formula={
          <FormulaDisplay 
            formula="R = \\frac{V}{I} \\quad \\text{and} \\quad P = V \\cdot I" 
            formulaId="elec_01"
          />
        }
        steps={hasValues ? (
          <StepByStep
            steps={[
              {
                description: 'Calculate Resistance (R) using Ohm\'s Law:',
                formula: 'R = \\frac{V}{I}',
                substitution: `R = \\frac{${v}}{${i}}`,
                result: `R = ${resistance} \\, \\Omega`
              },
              {
                description: 'Calculate Power (P):',
                formula: 'P = V \\cdot I',
                substitution: `P = (${v}) \\cdot (${i})`,
                result: `P = ${power} \\text{ W}`
              }
            ]}
          />
        ) : undefined}
        graph={hasValues ? (
          <GraphPanel
            title="Voltage vs Current (Constant R)"
            data={graphData}
            xKey="x"
            xAxisLabel="Current (I) [A]"
            yKey="y"
            yAxisLabel="Voltage (V) [V]"
            domainColor="#EAB308" // electrical yellow
          />
        ) : undefined}
      />
    </div>
  );
}