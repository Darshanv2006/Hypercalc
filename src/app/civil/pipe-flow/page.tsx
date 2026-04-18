"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [f, set_f] = useState<number | ''>(0.02);
  const [L, set_L] = useState<number | ''>(100);
  const [D, set_D] = useState<number | ''>(0.5);
  const [v, set_v] = useState<number | ''>(2);

  const hasValues = typeof f === 'number' && typeof L === 'number' && typeof D === 'number' && typeof v === 'number';

  const g = 9.81; let result = null; if (f > 0 && L > 0 && D > 0 && v >= 0) result = f * (L/D) * (v*v)/(2*g);

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Darcy-Weisbach Head Loss"
        description="Calculate head loss due to friction in a pipe."
        domainColorClass="text-civil"
        inputs={
          <>
            <InputField
              label="Friction factor"
              symbol="f"
              value={f}
              onChange={set_f}
              units={[{ value: '', label: '' }]}
              selectedUnit=""
            />
            <InputField
              label="Pipe Length"
              symbol="L"
              value={L}
              onChange={set_L}
              units={[{ value: 'm', label: 'm' }]}
              selectedUnit="m"
            />
            <InputField
              label="Diameter"
              symbol="D"
              value={D}
              onChange={set_D}
              units={[{ value: 'm', label: 'm' }]}
              selectedUnit="m"
            />
            <InputField
              label="Velocity"
              symbol="v"
              value={v}
              onChange={set_v}
              units={[{ value: 'm/s', label: 'm/s' }]}
              selectedUnit="m/s"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Head Loss"
              symbol="h_f"
              value={result}
              unit="m"
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="h_f = f \\frac{L}{D} \\frac{v^2}{2g}" />}
      />
    </div>
  );
}
