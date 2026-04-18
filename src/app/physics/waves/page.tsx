"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [f, set_f] = useState<number | ''>(50);
  const [lambda, set_lambda] = useState<number | ''>(2);

  const hasValues = typeof f === 'number' && typeof lambda === 'number';

  let result = null; if (f >= 0 && lambda >= 0) result = f * lambda;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Wave Speed"
        description="v = f * λ"
        domainColorClass="text-physics"
        inputs={
          <>
            <InputField
              label="Frequency"
              symbol="f"
              value={f}
              onChange={set_f}
              units={[{ value: 'Hz', label: 'Hz' }]}
              selectedUnit="Hz"
            />
            <InputField
              label="Wavelength"
              symbol="λ"
              value={lambda}
              onChange={set_lambda}
              units={[{ value: 'm', label: 'm' }]}
              selectedUnit="m"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Velocity"
              symbol="v"
              value={result}
              unit="m/s"
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="v = f \\lambda" />}
      />
    </div>
  );
}
