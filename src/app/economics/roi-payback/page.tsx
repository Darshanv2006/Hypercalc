"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [gain, set_gain] = useState<number | ''>(1500);
  const [cost, set_cost] = useState<number | ''>(1000);

  const hasValues = typeof gain === 'number' && typeof cost === 'number';

  let result = null; if (cost > 0) result = ((gain - cost) / cost) * 100;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Return on Investment"
        description="Calculate ROI percentage."
        domainColorClass="text-economics"
        inputs={
          <>
            <InputField
              label="Gain from Investment"
              symbol="G"
              value={gain}
              onChange={set_gain}
              units={[{ value: '$', label: '$' }]}
              selectedUnit="$"
            />
            <InputField
              label="Cost of Investment"
              symbol="C"
              value={cost}
              onChange={set_cost}
              units={[{ value: '$', label: '$' }]}
              selectedUnit="$"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="ROI"
              symbol="ROI"
              value={result}
              unit="%"
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="ROI = \\frac{G - C}{C} \\times 100" />}
      />
    </div>
  );
}
