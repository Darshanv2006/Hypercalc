"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [radius, set_radius] = useState<number | ''>(5);

  const hasValues = typeof radius === 'number';

  let result = null; if (radius >= 0) result = Math.PI * radius * radius;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Circle Characteristics"
        description="Calculate area and circumference."
        domainColorClass="text-mathematics"
        inputs={
          <>
            <InputField
              label="Radius"
              symbol="r"
              value={radius}
              onChange={set_radius}
              units={[{ value: 'm', label: 'm' }]}
              selectedUnit="m"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Area"
              symbol="A"
              value={result}
              unit="m²"
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="A = \\pi r^2" />}
      />
    </div>
  );
}
