"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [cost, set_cost] = useState<number | ''>(10000);
  const [salvage, set_salvage] = useState<number | ''>(1000);
  const [life, set_life] = useState<number | ''>(5);

  const hasValues = typeof cost === 'number' && typeof salvage === 'number' && typeof life === 'number';

  let result = null; if (life > 0) result = (cost - salvage) / life;

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Straight-Line Depreciation"
        description="Calculate annual depreciation expense."
        domainColorClass="text-economics"
        inputs={
          <>
            <InputField
              label="Asset Cost"
              symbol="C"
              value={cost}
              onChange={set_cost}
              units={[{ value: '$', label: '$' }]}
              selectedUnit="$"
            />
            <InputField
              label="Salvage Value"
              symbol="S"
              value={salvage}
              onChange={set_salvage}
              units={[{ value: '$', label: '$' }]}
              selectedUnit="$"
            />
            <InputField
              label="Useful Life"
              symbol="L"
              value={life}
              onChange={set_life}
              units={[{ value: 'years', label: 'years' }]}
              selectedUnit="years"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Annual Expense"
              symbol="D"
              value={result}
              unit="$/yr"
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="D = \\frac{C - S}{L}" />}
      />
    </div>
  );
}
