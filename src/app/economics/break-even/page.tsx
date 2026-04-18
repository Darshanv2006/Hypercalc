"use client";

import React, { useState } from 'react';
import {
  CalculatorShell, InputField, OutputField, FormulaDisplay, StepByStep
} from '@/components/calculator';

export default function CalculatorPage() {
  const [fc, set_fc] = useState<number | ''>(50000);
  const [price, set_price] = useState<number | ''>(50);
  const [vc, set_vc] = useState<number | ''>(30);

  const hasValues = typeof fc === 'number' && typeof price === 'number' && typeof vc === 'number';

  let result = null; if (price > vc) result = fc / (price - vc);

  return (
    <div className="p-4 sm:p-8">
      <CalculatorShell
        title="Break-Even Analysis"
        description="Calculate the break-even unit volume."
        domainColorClass="text-economics"
        inputs={
          <>
            <InputField
              label="Fixed Costs"
              symbol="FC"
              value={fc}
              onChange={set_fc}
              units={[{ value: '$', label: '$' }]}
              selectedUnit="$"
            />
            <InputField
              label="Price per Unit"
              symbol="P"
              value={price}
              onChange={set_price}
              units={[{ value: '$', label: '$' }]}
              selectedUnit="$"
            />
            <InputField
              label="Variable Cost per Unit"
              symbol="VC"
              value={vc}
              onChange={set_vc}
              units={[{ value: '$', label: '$' }]}
              selectedUnit="$"
            />
          </>
        }
        outputs={
          <>
            <OutputField
              label="Break-even Units"
              symbol="Q_{BE}"
              value={result}
              unit="units"
              sigFigs={4}
            />
          </>
        }
        formula={<FormulaDisplay formula="Q_{BE} = \\frac{FC}{P - VC}" />}
      />
    </div>
  );
}
