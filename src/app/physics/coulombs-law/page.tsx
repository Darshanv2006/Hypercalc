"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [q1, set_q1] = useState<number | ''>(1);
  const [q2, set_q2] = useState<number | ''>(1);
  const [r, set_r] = useState<number | ''>(0.1);

  const hasValues = typeof q1 === 'number' && typeof q2 === 'number' && typeof r === 'number';

  let result = null; const k = 8.987e9; if (r > 0) result = k * Math.abs((q1*1e-6) * (q2*1e-6)) / (r*r);

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Coulomb's Law"
        description="Calculate electrostatic force between point charges."
        domainColorClass="text-physics"
        inputs={
          <>
            <InputField
              label="Charge 1"
              symbol="q₁"
              value={q1}
              onChange={set_q1}
              units={[{ value: 'μC', label: 'μC' }]}
              selectedUnit="μC"
            />
            <InputField
              label="Charge 2"
              symbol="q₂"
              value={q2}
              onChange={set_q2}
              units={[{ value: 'μC', label: 'μC' }]}
              selectedUnit="μC"
            />
            <InputField
              label="Distance"
              symbol="r"
              value={r}
              onChange={set_r}
              units={[{ value: 'm', label: 'm' }]}
              selectedUnit="m"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Force Magnitude"
              symbol="|F|"
              value={result}
              unit="N"
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="F = k_e \\frac{|q_1 q_2|}{r^2}" />}
      />
    </div>
  );
}
