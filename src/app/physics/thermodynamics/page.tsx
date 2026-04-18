"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [n, set_n] = useState<number | ''>(1);
  const [t, set_t] = useState<number | ''>(298);
  const [v, set_v] = useState<number | ''>(0.0224);

  const hasValues = typeof n === 'number' && typeof t === 'number' && typeof v === 'number';

  let result = null; const R = 8.314; if (n > 0 && t > 0 && v > 0) result = (n * R * t) / v;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Ideal Gas Law"
        description="PV = nRT"
        domainColorClass="text-physics"
        inputs={
          <>
            <InputField
              label="Moles"
              symbol="n"
              value={n}
              onChange={set_n}
              units={[{ value: 'mol', label: 'mol' }]}
              selectedUnit="mol"
            />
            <InputField
              label="Temperature"
              symbol="T"
              value={t}
              onChange={set_t}
              units={[{ value: 'K', label: 'K' }]}
              selectedUnit="K"
            />
            <InputField
              label="Volume"
              symbol="V"
              value={v}
              onChange={set_v}
              units={[{ value: 'm³', label: 'm³' }]}
              selectedUnit="m³"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Pressure"
              symbol="P"
              value={result}
              unit="Pa"
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="P = \\frac{nRT}{V}" />}
      />
    </div>
  );
}
